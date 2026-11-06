import { cmicClasses } from '../styles/recipes';
import type { CmsImage, Convenio, ConvenioLogo } from '../types/content';
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { client, urlFor } from "../lib/sanity";
/* ===================== Utilidades de seguridad ===================== */
const isNonEmpty = (v: unknown) => typeof v === "string" && v.trim().length > 0;

const isConvenio = (x: Convenio) =>
  x &&
  typeof x === "object" &&
  isNonEmpty(x._id) &&
  isNonEmpty(x.nombre) &&
  x.logo;

const safeHttpsUrl = (maybe: string | undefined) => {
  try {
    const u = new URL(maybe || "");
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
};

// ✅ OPTIMIZADO: Pre-calcular DPR fuera del componente
const getDeviceDPR = () => Math.min(2, window.devicePixelRatio || 1);

/** Genera URL del logo optimizada */
const safeImageUrl = (logo: CmsImage | null | undefined) => {
  try {
    const dpr = getDeviceDPR();
    const built = urlFor(logo?.asset || "")
      .width(600)          // ✅ REDUCIDO de 900px
      .fit("max")
      .auto("format")
      .quality(75)         // ✅ REDUCIDO de 82
      .dpr(dpr)
      .url();
    return safeHttpsUrl(built) || safeHttpsUrl(logo?.asset?.url);
  } catch {
    return safeHttpsUrl(logo?.asset?.url) || null;
  }
};

export default function ConveniosCarouselLogos({
  title = "Convenios y Representación",
  subtitle = "Aliados que respaldan nuestros servicios.",
  fadeEdges = true,
}) {
  const [items, setItems] = useState<ConvenioLogo[]>([]);
  const [status, setStatus] = useState("idle");
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const navigate = useNavigate();

  const railRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const anim = useRef({ x: 0, speed: 0.55 });
  const drag = useRef({ active: false, startX: 0, startPos: 0, pointerId: null as number | null });

  /* ===================== Carga OPTIMIZADA ===================== */
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setStatus("loading");
        // ✅ OPTIMIZADO: Query más específica
        const query = /* groq */ `*[_type == "convenio" && esPublico == true && defined(logo)]{
          _id, nombre, logo, orden
        } | order(orden asc, nombre asc)[0...20]`; // ✅ LIMIT a 20 items

        const data = await client.fetch<Convenio[]>(query, {}, { 
          signal: ctrl.signal,
          timeout: 8000 // ✅ Timeout agregado
        });
        
        // ✅ OPTIMIZADO: Transformación más eficiente
        const cleaned = (Array.isArray(data) ? data : [])
          .filter(isConvenio)
          .map((d) => ({
            id: d._id,
            nombre: String(d.nombre).trim().slice(0, 100), // ✅ REDUCIDO de 140
            img: safeImageUrl(d.logo),
            orden: typeof d.orden === "number" ? d.orden : 0,
          }))
          .filter((d) => d.img)
          .slice(0, 15); // ✅ LIMITE adicional por seguridad

        setItems(cleaned);
        setStatus(cleaned.length ? "ok" : "empty");
      } catch (e) {
        if (!ctrl.signal.aborted) {
          console.error("[Convenios] Error al cargar:", e);
          setStatus("error");
        }
      }
    })();
    return () => ctrl.abort();
  }, []);

  /* ===================== Reduced motion / visibility OPTIMIZADOS ===================== */
  useEffect(() => {
    // ✅ OPTIMIZADO: Verificar soporte primero
    if (!window.matchMedia) {
      setReduced(false);
      return;
    }
    
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    
    update();
    
    // ✅ OPTIMIZADO: Usar addEventListener estándar
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
  }, []);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  /* ===================== Animación OPTIMIZADA ===================== */
  const animate = useCallback(() => {
    if (paused || reduced || !railRef.current || !items.length) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    
    const rail = railRef.current;
    anim.current.x -= anim.current.speed;
    
    // ✅ OPTIMIZADO: Calcular resetAt una sola vez
    const resetAt = rail.scrollWidth / 2;
    if (Math.abs(anim.current.x) >= resetAt) {
      anim.current.x = 0;
    }
    
    rail.style.transform = `translateX(${anim.current.x}px)`;
    rafRef.current = requestAnimationFrame(animate);
  }, [paused, reduced, items.length]);

  useEffect(() => {
    if (items.length && !reduced) {
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, items.length, reduced]);

  /* ===================== Drag OPTIMIZADOS ===================== */
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!railRef.current) return;
    
    const rail = e.currentTarget;
    drag.current.active = true;
    drag.current.startX = e.clientX;
    drag.current.startPos = anim.current.x;
    
    if (rail.setPointerCapture) {
      try {
        rail.setPointerCapture(e.pointerId);
        drag.current.pointerId = e.pointerId;
      } catch (err) {
        // Fallback silencioso
      }
    }
    
    setPaused(true);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !railRef.current) return;
    
    const dx = e.clientX - drag.current.startX;
    anim.current.x = drag.current.startPos + dx;
    railRef.current.style.transform = `translateX(${anim.current.x}px)`;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    
    drag.current.active = false;
    setPaused(false);
    
    if (drag.current.pointerId && e.currentTarget.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(drag.current.pointerId);
      } catch (err) {
        // Fallback silencioso
      }
    }
    
    drag.current.pointerId = null;
  }, []);

  /* ===================== Duplicado para loop ===================== */
  const logos = useMemo(() => {
    if (!items.length) return [];
    return [...items, ...items];
  }, [items]);

  /* ===================== UI OPTIMIZADA ===================== */
  
  // ✅ OPTIMIZADO: Early returns primero
  if (status === "loading" || status === "idle") {
    return (
      <div className={cmicClasses("convenios-loading")} role="status" aria-live="polite">
        Cargando convenios…
      </div>
    );
  }
  
  if (status === "error") {
    return (
      <div className={cmicClasses("convenios-error")} role="alert">
        No se pudieron cargar los convenios. Intenta más tarde.
      </div>
    );
  }

  if (status === "empty") {
    return (
      <section className={cmicClasses("convenios logos-only")} aria-labelledby="convenios-title">
        <header className={cmicClasses("convenios-head")}>
          <h2 id="convenios-title" className={cmicClasses("convenios-title")}>{title}</h2>
          <p className={cmicClasses("convenios-subtitle")}>{subtitle}</p>
        </header>
        <p className={cmicClasses("convenios-empty")} role="status" aria-live="polite">
          Aún no hay convenios para mostrar.
        </p>
      </section>
    );
  }

  // ✅ OPTIMIZADO: Componente de imagen memoizado
  const LogoImage = React.memo(({ it, isClone }: {it: ConvenioLogo; isClone: boolean}) => (
    <div className={cmicClasses("convenio-logo")} key={`${it.id}-${isClone ? 'clone' : 'original'}`} aria-hidden={isClone}>
      <img
        src={it.img || undefined}
        alt={`Logo de ${it.nombre}`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        sizes="(max-width: 640px) 52vw, (max-width: 1024px) 30vw, 240px" // ✅ REDUCIDO
        onError={(e) => {
          const logoElement = e.currentTarget.closest<HTMLElement>(".convenio-logo");
          if (logoElement) {
            logoElement.style.display = "none";
          }
        }}
      />
    </div>
  ));

  return (
    <section className={cmicClasses(`convenios logos-only ${fadeEdges ? "" : "no-fade"}`)} aria-labelledby="convenios-title">
      <header className={cmicClasses("convenios-head")}>
        <h2 id="convenios-title" className={cmicClasses("convenios-title")}>{title}</h2>
        <p className={cmicClasses("convenios-subtitle")}>{subtitle}</p>
      </header>

      <div
        className={cmicClasses("convenios-strip")}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="Carrusel continuo de convenios (usa arrastre para mover manualmente)"
        role="region"
      >
        <div className={cmicClasses("convenios-rail")} ref={railRef}>
          {logos.map((it, i) => (
            <LogoImage 
              key={`${it.id}-${i}`}
              it={it} 
              isClone={i >= items.length} 
            />
          ))}
        </div>
      </div>

      <div className={cmicClasses("convenios-cta")}>
        <button
          className={cmicClasses("btn-convenios-buscador")}
          onClick={() => navigate("/convenios")}
          aria-label="Explorar todos los convenios disponibles"
          type="button"
        >
          Explorar todos los convenios
        </button>
      </div>
    </section>
  );
}