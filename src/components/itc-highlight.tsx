import { cmicClasses } from '../styles/recipes';
import type { CmsImage, Maestria, Course, CourseState, SafeImageProps } from '../types/content';
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { client, urlFor } from "../lib/sanity";
import { useNavigate } from "react-router-dom";
// Imagen local - considerar usar WebP si es posible
import itcLogo from "../lib/itc-logo.jpg";

/* ===================== CONSTANTES Y UTILIDADES OPTIMIZADAS ===================== */
const SECURITY = Object.freeze({
  MAX_STRING_LENGTH: 140,
  MAX_DESCRIPTION_LENGTH: 200,
  MAX_REQUISITO_LENGTH: 120,
  MAX_DURACION_LENGTH: 40,
  ALLOWED_DOMAINS: Object.freeze(['cdn.sanity.io']),
  QUALITY: 70,
  MAX_WIDTH: 400,
  TIMEOUT: 5000,
  MAX_COURSES: 3
});

// ✅ Cache simple para URLs de imágenes con límite de tamaño
const createLRUCache = (maxSize = 50) => {
  const cache = new Map<string, string>();
  return {
    get: (key: string) => cache.get(key),
    set: (key: string, value: string) => {
      if (cache.size >= maxSize) {
        const firstKey = cache.keys().next().value;
        if (firstKey !== undefined) cache.delete(firstKey);
      }
      cache.set(key, value);
    },
    clear: () => cache.clear()
  };
};

const imageUrlCache = createLRUCache(30); // ✅ Reducido de 50

// ✅ Utilidades puras optimizadas
const clamp = (s: unknown, n: number = SECURITY.MAX_STRING_LENGTH) => 
  typeof s === 'string' ? s.slice(0, n).trim() : '';

// ✅ Regex pre-compilados para mejor performance
const DANGEROUS_PATTERNS = /javascript:|data:|vbscript:|on\w+=|<\/?script>/gi;
const SLUG_REGEX = /^[a-zA-Z0-9\-_]+$/;
const URL_REGEX = /^https:\/\/[a-zA-Z0-9][a-zA-Z0-9.-]+[.][a-zA-Z]{2,}[/]?/;

const sanitizeString = (s = '') => {
  if (typeof s !== 'string') return '';
  return s.replace(DANGEROUS_PATTERNS, '').trim();
};

const isNonEmpty = (v: unknown) => typeof v === "string" && v.trim().length > 0;

// ✅ Validación de URL ultra-optimizada
const safeHttpsUrl = (() => {
  const domainRegex = new RegExp(`^https://([a-zA-Z0-9.-]+\\.)?(${SECURITY.ALLOWED_DOMAINS.join('|')})/`);
  
  return (raw: unknown) => {
    if (typeof raw !== 'string') return null;
    
    const sanitized = raw.trim();
    if (!sanitized || !URL_REGEX.test(sanitized) || !domainRegex.test(sanitized)) {
      return null;
    }

    try {
      const u = new URL(sanitized);
      return u.protocol === "https:" ? u.toString() : null;
    } catch {
      return null;
    }
  };
})();

// ✅ Image URL builder con cache y optimizaciones
const getDeviceDPR = () => Math.min(1.5, window.devicePixelRatio || 1);

const buildSafeImageUrl = (asset: CmsImage | null | undefined, { w = SECURITY.MAX_WIDTH, q = SECURITY.QUALITY } = {}) => {
  if (!asset?.asset?._ref) return null;
  
  const cacheKey = `${asset.asset._ref}-${w}-${q}`;
  const cached = imageUrlCache.get(cacheKey);
  if (cached) return cached;

  try {
    const dpr = getDeviceDPR();
    const url = urlFor(asset)
      .width(w)
      .fit("max")
      .auto("format")
      .quality(q)
      .dpr(dpr)
      .url();
      
    const safeUrl = safeHttpsUrl(url);
    if (safeUrl) {
      imageUrlCache.set(cacheKey, safeUrl);
    }
    return safeUrl;
  } catch {
    return null;
  }
};

/* ===================== COMPONENTE DE IMAGEN ULTRA-OPTIMIZADO ===================== */
const OptimizedImage = React.memo(({
  src,
  alt = "",
  className = "",
  width,
  height,
  onError,
  loading = "lazy",
  ...props
}: SafeImageProps) => {
  const [imageStatus, setImageStatus] = useState(src ? 'loading' : 'error');

  useEffect(() => {
    setImageStatus(src ? 'loading' : 'error');
  }, [src]);

  const handleError = useCallback(() => {
    setImageStatus('error');
    onError?.();
  }, [onError]);

  const handleLoad = useCallback(() => {
    setImageStatus('loaded');
  }, []);

  if (imageStatus === 'error') return null;

  return (
    <img
      src={src || undefined}
      alt={alt}
      width={width}
      height={height}
      className={cmicClasses(`${className} ${imageStatus === 'loaded' ? 'loaded' : 'loading'}`)}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

/* ===================== COMPONENTES MEMOIZADOS AUXILIARES ===================== */
const RequirementsList = React.memo(({ requisitos, courseName }: {requisitos: string[]; courseName: string}) => (
  <div className={cmicClasses("requirements-container")}>
    <h4 className={cmicClasses("requirements-title")}>Requisitos</h4>
    <ul aria-label={`Requisitos para ${courseName || "este programa"}`}>
      {requisitos.map((req, idx) => (
        <li key={idx}>{req}</li>
      ))}
      {requisitos.length > 3 && (
        <li className={cmicClasses("more-items")}>+{requisitos.length - 3} más</li>
      )}
    </ul>
  </div>
));

RequirementsList.displayName = 'RequirementsList';

const CourseCard = React.memo(({ 
  course, 
  index, 
  onCourseClick,
  cardRef 
}: { course: Course; index: number; onCourseClick: (course: Course) => void; cardRef: React.RefCallback<HTMLElement> }) => {
  const handleClick = useCallback(() => {
    onCourseClick(course);
  }, [course, onCourseClick]);

  return (
    <article
      className={cmicClasses("course-card")}
      ref={cardRef}
      style={{ animationDelay: `${index * 0.05}s` }}
      role="listitem"
      aria-labelledby={`course-title-${course.id}`}
    >
      <div className={cmicClasses("course-image")}>
        <OptimizedImage
          src={course.img}
          alt={course.nombre ? `Imagen de ${course.nombre}` : "Imagen del programa"}
          width={400}
          height={300}
          loading={index < 2 ? "eager" : "lazy"}
        />
        {isNonEmpty(course.duracion) && (
          <span className={cmicClasses("course-duration")}>{course.duracion}</span>
        )}
      </div>

      <div className={cmicClasses("course-info")}>
        <h3 id={`course-title-${course.id}`}>
          {course.nombre || "Programa académico"}
        </h3>

        {isNonEmpty(course.desc) && (
          <p className={cmicClasses("course-description")}>{course.desc}</p>
        )}

        {course.requisitos.length > 0 && (
          <RequirementsList 
            requisitos={course.requisitos} 
            courseName={course.nombre} 
          />
        )}

        <button
          className={cmicClasses("info-btn")}
          onClick={handleClick}
          aria-label={`Más información sobre ${course.nombre || "este programa"}`}
          type="button"
        >
          Más información
        </button>
      </div>
    </article>
  );
});

CourseCard.displayName = 'CourseCard';

/* ===================== COMPONENTE PRINCIPAL OPTIMIZADO ===================== */
const Servicios = () => {
  const [state, setState] = useState<CourseState>({
    courses: [],
    status: "idle",
    errMsg: null
  });
  
  const navigate = useNavigate();
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // ✅ Estado unificado para reducir re-renders
  const setStateField = useCallback((updates: Partial<CourseState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  /* ============== PRELOAD OPTIMIZADO ============== */
  useEffect(() => {
    // Solo preload en conexiones rápidas
    const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
    if (!connection || connection.effectiveType !== 'slow-2g') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = itcLogo;
      document.head.appendChild(link);

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, []);

  /* ============== SANITIZACIÓN OPTIMIZADA ============== */
  const sanitizeCourses = useCallback((arr: Maestria[]) => {
    if (!Array.isArray(arr)) return [];

    const result = [];
    const maxCourses = Math.min(arr.length, SECURITY.MAX_COURSES);
    
    for (let i = 0; i < maxCourses; i++) {
      const c = arr[i];
      if (!c?._id) continue;

      const nombre = clamp(sanitizeString(c.nombre_maestria || ""));
      const desc = clamp(sanitizeString(c.descripcion_corta || ""), SECURITY.MAX_DESCRIPTION_LENGTH);
      const duracion = clamp(sanitizeString(c.duracion || ""), SECURITY.MAX_DURACION_LENGTH);

      // Procesamiento más eficiente de requisitos
      const reqs = [];
      if (Array.isArray(c.requisitos)) {
        for (let j = 0; j < Math.min(c.requisitos.length, 3); j++) {
          const req = clamp(sanitizeString(String(c.requisitos[j] || "")), SECURITY.MAX_REQUISITO_LENGTH);
          if (isNonEmpty(req)) {
            reqs.push(req);
          }
        }
      }

      let slug = null;
      if (c.slug?.current && typeof c.slug.current === 'string') {
        const cleanSlug = sanitizeString(c.slug.current);
        if (SLUG_REGEX.test(cleanSlug)) {
          slug = cleanSlug;
        }
      }

      const img = buildSafeImageUrl(c.imagen, { w: 400 });

      if (img) {
        result.push({
          id: String(c._id).trim(),
          nombre,
          desc,
          requisitos: reqs,
          duracion,
          img,
          slug,
        });
      }
    }

    return result;
  }, []);

  /* ============== FETCH ULTRA-OPTIMIZADO ============== */
  const fetchCourses = useCallback(async () => {
    // ✅ Cancelar request anterior
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    setStateField({ status: "loading", errMsg: null });

    try {
      // Query más ligera
      const query = `*[_type=="maestrias"]|order(_createdAt desc)[0...${SECURITY.MAX_COURSES}]{_id,nombre_maestria,requisitos,descripcion_corta,duracion,imagen,slug}`;
      
      const data = await client.fetch<Maestria[]>(query, {}, { 
        signal: controller.signal,
        timeout: SECURITY.TIMEOUT 
      });

      const cleaned = sanitizeCourses(data);
      setStateField({ 
        courses: cleaned, 
        status: cleaned.length ? "ok" : "empty" 
      });
    } catch (err) {
      if (controller.signal.aborted) return;
      
      console.error("[ITC] Error:", err);
      setStateField({ 
        status: "error", 
        errMsg: "No se pudieron cargar los cursos. Intenta nuevamente.",
        courses: [] 
      });
    }
  }, [sanitizeCourses, setStateField]);

  // ✅ Effect optimizado con cleanup robusto
  useEffect(() => {
    fetchCourses();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchCourses]);

  /* ============== INTERSECTION OBSERVER MEJORADO ============== */
  useEffect(() => {
    if (state.status !== "ok" || state.courses.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.05,
        rootMargin: "100px 0px"
      }
    );

    observerRef.current = observer;
    const currentObserver = observer;

    cardRefs.current.forEach((el) => el && currentObserver.observe(el));
    
    return () => {
      currentObserver.disconnect();
    };
  }, [state.status, state.courses.length]);

  /* ============== HANDLERS OPTIMIZADOS ============== */
  const handleCourseClick = useCallback((course: Course) => {
    const target = course?.slug ? `/itc/${course.slug}` : "/itc";
    navigate(target);
  }, [navigate]);

  const handleRetry = useCallback(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleSeeAll = useCallback(() => {
    navigate("/itc");
  }, [navigate]);

  // ✅ REFS OPTIMIZADOS para cards
  const setCardRef = useCallback((index: number) => (el: HTMLElement | null) => {
    cardRefs.current[index] = el;
  }, []);

  /* ============== RENDER ULTRA-OPTIMIZADO ============== */
  const { status, courses, errMsg } = state;

  const renderContent = useMemo(() => {
    switch (status) {
      case "loading":
      case "idle":
        return (
          <div className={cmicClasses("loading-container")} aria-live="polite">
            <div className={cmicClasses("loading-spinner")} aria-label="Cargando cursos" />
            <p>Cargando cursos...</p>
          </div>
        );

      case "error":
        return (
          <div className={cmicClasses("error-container")}>
            <p role="alert">{errMsg}</p>
            <button
              className={cmicClasses("retry-btn")}
              onClick={handleRetry}
              aria-label="Reintentar cargar cursos"
              type="button"
            >
              Reintentar
            </button>
          </div>
        );

      case "empty":
        return (
          <div className={cmicClasses("empty-container")}>
            <p>No hay cursos disponibles en este momento.</p>
          </div>
        );

      case "ok":
        return (
          <>
            <div
              className={cmicClasses("courses-grid-three")}
              role="list"
              aria-label="Lista de programas académicos"
            >
              {courses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  index={index}
                  onCourseClick={handleCourseClick}
                  cardRef={setCardRef(index)}
                />
              ))}
            </div>

            <div className={cmicClasses("see-more")}>
              <button
                className={cmicClasses("more-courses-btn")}
                onClick={handleSeeAll}
                aria-label="Ver todos los programas disponibles"
                type="button"
              >
                Ver todos los programas
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  }, [status, courses, errMsg, handleRetry, handleCourseClick, handleSeeAll, setCardRef]);

  return (
    <section className={cmicClasses("courses-section")} aria-labelledby="courses-heading">
      <div className={cmicClasses("logo-containerITC")}>
        <OptimizedImage
          src={itcLogo}
          alt="Logo ITC"
          className={cmicClasses("itcLogo")}
          width={120}
          height={120}
          loading="eager"
        />
      </div>

      <h2 id="courses-heading" className={cmicClasses("section-titleITC")}>
        Nuestros Programas
      </h2>

      <p className={cmicClasses("section-subtitleITC")}>
        Descubre nuestras maestrías y especializaciones de alto nivel
      </p>

      {renderContent}
    </section>
  );
};

export default React.memo(Servicios);