import { cmicClasses } from '../styles/recipes';
import React, { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

// ✅ CONSTANTES fuera del componente
const DEFAULT_HEIGHT = 3;
const MIN_HEIGHT = 1;
const MAX_HEIGHT = 8;
const TRANSITION_DURATION = 120; // ms
const Z_INDEX = 99999;

// ✅ Hook personalizado para prefers-reduced-motion
const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mediaQuery) return;

    setPrefersReduced(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  return prefersReduced;
};

// ✅ Hook personalizado para scroll progress logic
const useScrollProgress = (prefersReduced: boolean, onProgressUpdate: (progress: number) => void) => {
  const rafRef = useRef<number | null>(null);
  const observersRef = useRef<ResizeObserver[]>([]);

  const getScroller = useCallback(() => 
    document.scrollingElement || document.documentElement || document.body,
    []
  );

  const updateProgress = useCallback(() => {
    if (prefersReduced) {
      onProgressUpdate(0);
      return;
    }

    const scroller = getScroller();
    const total = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    const y = Math.max(0, Math.min(scroller.scrollTop, total));
    const pct = total > 0 ? y / total : 0;
    
    onProgressUpdate(pct);
  }, [prefersReduced, getScroller, onProgressUpdate]);

  const throttledUpdate = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        updateProgress();
        rafRef.current = null;
      });
    }
  }, [updateProgress]);

  const setupListeners = useCallback(() => {
    // ✅ Event listeners pasivos
    window.addEventListener("scroll", throttledUpdate, { passive: true });
    window.addEventListener("resize", throttledUpdate, { passive: true });

    // ✅ ResizeObserver para cambios de contenido
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(throttledUpdate);
      const scroller = getScroller();
      if (scroller) {
        ro.observe(scroller);
        observersRef.current.push(ro);
      }

      // Observar body también para cambios estructurales
      if (document.body) {
        ro.observe(document.body);
      }
    }

    // ✅ Initial update
    throttledUpdate();
  }, [throttledUpdate, getScroller]);

  const cleanupListeners = useCallback(() => {
    window.removeEventListener("scroll", throttledUpdate);
    window.removeEventListener("resize", throttledUpdate);

    observersRef.current.forEach(observer => {
      observer.disconnect();
    });
    observersRef.current = [];

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, [throttledUpdate]);

  return { setupListeners, cleanupListeners };
};

export default function ScrollProgress({ height = DEFAULT_HEIGHT }) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const prefersReduced = usePrefersReducedMotion();

  // ✅ Normalización segura del height
  const normalizedHeight = React.useMemo(() => {
    const numHeight = Number(height);
    return Number.isFinite(numHeight) 
      ? Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, numHeight)) 
      : DEFAULT_HEIGHT;
  }, [height]);

  // ✅ Callback optimizado para actualizar el progress
  const updateProgress = React.useCallback((progress: number) => {
    const el = barRef.current;
    if (!el) return;

    el.style.transform = `scaleX(${progress})`;
  }, []);

  // ✅ Hook personalizado para la lógica de scroll
  const { setupListeners, cleanupListeners } = useScrollProgress(
    prefersReduced, 
    updateProgress
  );

  useEffect(() => {
    // ✅ SSR guard
    if (typeof window === "undefined") return;
    
    const el = barRef.current;
    if (!el) return;

    // ✅ Configuración inicial del elemento
    el.style.height = `${normalizedHeight}px`;
    el.style.willChange = "transform";

    // ✅ Configurar listeners
    setupListeners();

    // ✅ Cleanup
    return () => {
      cleanupListeners();
    };
  }, [pathname, normalizedHeight, setupListeners, cleanupListeners]);

  // ✅ Estilos memoizados
  const barStyles = React.useMemo<React.CSSProperties>(() => ({
    position: "fixed",
    top: 0,
    left: 0,
    height: `${normalizedHeight}px`,
    width: "100%",
    transformOrigin: "0 50%",
    transform: "scaleX(0)",
    background: "linear-gradient(90deg, var(--colorPrincipal), color-mix(in srgb, var(--colorPrincipal) 55%, #ffb3b3))",
    zIndex: Z_INDEX,
    pointerEvents: "none",
    transition: `transform ${TRANSITION_DURATION}ms ease`
  }), [normalizedHeight]);

  return (
    <div
      ref={barRef}
      className={cmicClasses("app-scroll-progress")}
      aria-hidden="true"
      style={barStyles}
    />
  );
}