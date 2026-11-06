import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

// ✅ Hook ultra-simplificado
const useScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rafRef = useRef<number | undefined>(undefined);

  const scrollToTop = useCallback(() => {
    const scroller = document.scrollingElement || document.documentElement;
    scroller.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const scrollToHash = useCallback((hash: string) => {
    if (!hash) return false;
    
    const id = hash.replace(/^#/, "").trim();
    const target = document.getElementById(id);
    
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
    
    return false;
  }, []);

  useEffect(() => {
    // Cleanup previo
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    // Scroll logic
    rafRef.current = requestAnimationFrame(() => {
      if (!scrollToHash(hash)) {
        if (hash) {
          // Reintento después de 300ms para contenido lazy
          timeoutRef.current = setTimeout(() => {
            if (!scrollToHash(hash)) {
              scrollToTop();
            }
          }, 300);
        } else {
          scrollToTop();
        }
      }
    });

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathname, hash, scrollToTop, scrollToHash]);

  return null;
};

export default useScrollToTop;