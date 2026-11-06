import { cmicClasses } from '../styles/recipes';
import type { CmsImage, GalleryDocument, GalleryItem, CarouselProps, SafeImageProps } from '../types/content';
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { client, urlFor } from "../lib/sanity";
import icicLogo from "../lib/icic-logo.png";

/* ===================== CONSTANTES Y UTILIDADES ===================== */
// ✅ MOVER fuera del componente
const CLAMP_LENGTH = 240;
const CAROUSEL_INTERVAL = 4000;
const IMAGE_QUALITY = 75; // ✅ Reducido de 80

const clamp = (s: unknown, n = CLAMP_LENGTH) => (typeof s === "string" ? s.slice(0, n) : "");
const stripJsProto = (s = "") => s.replace(/javascript:/gi, "");
const isNonEmpty = (v: unknown) => typeof v === "string" && v.trim().length > 0;

const safeHttpsUrl = (raw: string) => {
  try {
    const u = new URL(raw);
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
};

// ✅ OPTIMIZADO: Pre-calcular DPR
const getDeviceDPR = () => Math.min(2, window.devicePixelRatio || 1);

const buildSafeImageUrl = (asset: CmsImage | null | undefined, { w = 1200, h, q = IMAGE_QUALITY }: {w?: number; h?: number; q?: number} = {}) => {
  try {
    let b = urlFor(asset || "")
      .width(w)
      .fit("max")
      .auto("format")
      .quality(q)
      .dpr(getDeviceDPR());
    if (h) b = b.height(h);
    return safeHttpsUrl(b.url());
  } catch {
    return null;
  }
};

// ✅ COMPONENTE MEMOIZADO
const ImageOrNothing = React.memo(({ src, alt = "", className, onError, ...props }: SafeImageProps) => {
  const [visible, setVisible] = useState(Boolean(src));
  
  useEffect(() => setVisible(Boolean(src)), [src]);
  
  const handleError = useCallback(() => {
    if (visible) {
      setVisible(false);
      onError?.();
    }
  }, [visible, onError]);
  
  if (!visible) return null;
  
  return (
    <img
      src={src || undefined}
      alt={alt}
      className={cmicClasses(className)}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleError}
      {...props}
    />
  );
});

// ✅ COMPONENTES MEMOIZADOS PARA UI
const StatsGrid = React.memo(() => (
  <div className={cmicClasses("stats-grid")} role="region" aria-label="Estadísticas del instituto">
    {[
      { number: "50+", label: "Cursos disponibles" },
      { number: "2,000+", label: "Estudiantes capacitados" },
      { number: "98%", label: "Tasa de satisfacción" }
    ].map((stat, index) => (
      <div key={index} className={cmicClasses("stat")}>
        <span className={cmicClasses("stat-number")}>{stat.number}</span>
        <span className={cmicClasses("stat-label")}>{stat.label}</span>
      </div>
    ))}
  </div>
));

const FeaturesGrid = React.memo(() => (
  <div className={cmicClasses("features-grid")} role="region" aria-label="Características del instituto">
    {[
      { icon: "📚", title: "Cursos Técnicos", desc: "Programas especializados en todas las áreas de construcción" },
      { icon: "🏆", title: "Certificaciones", desc: "Diplomas con validez oficial y reconocimiento sectorial" },
      { icon: "👥", title: "Profesores Expertos", desc: "Instructores con amplia experiencia en la industria" }
    ].map((feature, index) => (
      <div key={index} className={cmicClasses("feature-card")}>
        <div className={cmicClasses("feature-icon")} aria-hidden="true">{feature.icon}</div>
        <div className={cmicClasses("feature-content")}>
          <h4>{feature.title}</h4>
          <p>{feature.desc}</p>
        </div>
      </div>
    ))}
  </div>
));

const CarouselControls = React.memo(({ onPrev, onNext, itemsLength }: CarouselProps) => {
  if (itemsLength <= 1) return null;
  
  return (
    <div className={cmicClasses("carousel-controls")} role="group" aria-label="Controles de galería">
      <button
        type="button"
        className={cmicClasses("carousel-btn prev")}
        aria-label="Anterior"
        onClick={onPrev}
      >
        ◀
      </button>
      <button
        type="button"
        className={cmicClasses("carousel-btn next")}
        aria-label="Siguiente"
        onClick={onNext}
      >
        ▶
      </button>
    </div>
  );
});

/* ===================== HOOK PERSONALIZADO ===================== */
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => 
    typeof window !== "undefined" && window.matchMedia 
      ? window.matchMedia(query).matches 
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    
    setMatches(mediaQuery.matches);
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [query]);

  return matches;
};

/* ===================== COMPONENTE PRINCIPAL ===================== */
export default function IcicHighlight() {
  const [icicImages, setIcicImages] = useState<GalleryItem[]>([]);
  const [calendarImage, setCalendarImage] = useState<GalleryItem | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  // ✅ HOOKS PERSONALIZADOS
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Refs
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ===================== SANITIZACIÓN OPTIMIZADA ===================== */
  const sanitizeData = useCallback((arr: GalleryDocument[]) => {
    return (Array.isArray(arr) ? arr : [])
      .map((item) => ({
        id: String(item._id || "").trim(),
        titulo: clamp(stripJsProto(item.titulo || "")),
        descripcion: clamp(stripJsProto(typeof item.descripcion === "string" ? item.descripcion : "")),
        img: buildSafeImageUrl(item.imagen, { w: 1200 }), // ✅ Reducido de 1400
      }))
      .filter((x) => x.id && x.img)
      .slice(0, 10); // ✅ LIMITE para performance
  }, []);

  /* ===================== FETCH OPTIMIZADO ===================== */
  const fetchData = useCallback(
    async (signal: AbortSignal) => {
      setStatus("loading");
      setErrMsg(null);
      try {
        // ✅ QUERIES OPTIMIZADAS con límites
        const galleryQuery = /* groq */ `*[_type == "icicGallery"] | order(_createdAt desc)[0...10] {
          _id, titulo, imagen,
          "descripcion": select(defined(descripcion[0].children[0].text) => descripcion[0].children[0].text, "")
        }`;

        const calendarQuery = /* groq */ `*[_type == "calendarioCursos"][0]{
          _id, titulo, imagen,
          "descripcion": select(defined(descripcion[0].children[0].text) => descripcion[0].children[0].text, "")
        }`;

        const [galleryData, calendarData] = await Promise.all([
          client.fetch<GalleryDocument[]>(galleryQuery, {}, { signal, timeout: 8000 }),
          client.fetch<GalleryDocument | null>(calendarQuery, {}, { signal, timeout: 8000 }),
        ]);

        const gallery = sanitizeData(galleryData);
        const calSanRaw = calendarData ? sanitizeData([calendarData])[0] : null;
        const calSan = calSanRaw?.img ? calSanRaw : null;

        setIcicImages(gallery);
        setCalendarImage(calSan);
        setStatus(gallery.length || calSan ? "ok" : "empty");
      } catch (err) {
        if (signal?.aborted) return;
        console.error("[ICIC] Error de carga:", err);
        setErrMsg("No se pudieron cargar los datos. Intenta nuevamente.");
        setStatus("error");
      }
    },
    [sanitizeData]
  );

  useEffect(() => {
    const ctrl = new AbortController();
    fetchData(ctrl.signal);
    return () => ctrl.abort();
  }, [fetchData]);

  /* ===================== CARRUSEL OPTIMIZADO ===================== */
  const stopCarousel = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startCarousel = useCallback(() => {
    if (reducedMotion || !carouselRef.current) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (icicImages.length <= 1) return;
    
    intervalRef.current = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % icicImages.length);
    }, CAROUSEL_INTERVAL);
  }, [icicImages.length, reducedMotion]);

  useEffect(() => {
    startCarousel();
    return () => stopCarousel();
  }, [startCarousel, stopCarousel]);

  // ✅ OPTIMIZADO: Un solo efecto para visibility
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) stopCarousel();
      else startCarousel();
    };
    
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [startCarousel, stopCarousel]);

  /* ===================== HANDLERS OPTIMIZADOS ===================== */
  const handleNavigate = useCallback(() => navigate("/icic"), [navigate]);

  const handleRetry = useCallback(() => {
    const ctrl = new AbortController();
    fetchData(ctrl.signal);
    return () => ctrl.abort();
  }, [fetchData]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((p) => (p - 1 + icicImages.length) % icicImages.length);
  }, [icicImages.length]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((p) => (p + 1) % icicImages.length);
  }, [icicImages.length]);

  // ✅ MEMOIZADO: Contenido del carrusel
  const carouselContent = useMemo(() => {
    if (icicImages.length === 0) {
      return (
        <div className={cmicClasses("gallery-placeholder")} aria-label="Galería en carga">
          <div className={cmicClasses("placeholder-image")}></div>
          <div className={cmicClasses("placeholder-image")}></div>
          <div className={cmicClasses("placeholder-image")}></div>
        </div>
      );
    }

    return (
      <div className={cmicClasses("gallery-carousel")}>
        <div
          className={cmicClasses("carousel-container")}
          ref={carouselRef}
          aria-label="Galería de estudiantes"
          onMouseEnter={stopCarousel}
          onMouseLeave={startCarousel}
        >
          {icicImages.map((image, index) => (
            <div
              key={image.id}
              className={cmicClasses(`carousel-slide ${index === currentSlide ? "active" : ""}`)}
              aria-hidden={index !== currentSlide}
            >
              <ImageOrNothing
                src={image.img}
                alt={image.titulo || "Estudiantes ICIC"}
                className={cmicClasses("carousel-image")}
                width={1200} // ✅ Reducido
                height={700} // ✅ Reducido
              />
              {isNonEmpty(image.titulo) && (
                <div className={cmicClasses("carousel-caption")}>
                  <span>{image.titulo}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <CarouselControls 
          onPrev={handlePrevSlide}
          onNext={handleNextSlide}
          itemsLength={icicImages.length}
        />
      </div>
    );
  }, [icicImages, currentSlide, stopCarousel, startCarousel, handlePrevSlide, handleNextSlide]);

  // ✅ MEMOIZADO: Sección de calendario
  const calendarSection = useMemo(() => {
    if (!calendarImage) return null;
    
    return (
      <div className={cmicClasses("calendar-section")}>
        <h4>{calendarImage.titulo || "Calendario de Cursos"}</h4>
        <div className={cmicClasses("calendar-preview")}>
          <ImageOrNothing
            src={calendarImage.img}
            alt={calendarImage.titulo || "Calendario de Cursos"}
            className={cmicClasses("calendar-image")}
            width={1000} // ✅ Reducido
            height={750} // ✅ Reducido
          />
        </div>
      </div>
    );
  }, [calendarImage]);

  /* ===================== RENDERIZADO CONDICIONAL ===================== */
  if (status === "loading" || status === "idle") {
    return (
      <section className={cmicClasses("icic-highlight")} aria-labelledby="loading-heading">
        <h2 id="loading-heading" className={cmicClasses("visually-hidden")}>Cargando</h2>
        <div className={cmicClasses("loading-container")}>
          <div className={cmicClasses("loading-spinner")} aria-label="Cargando contenido"></div>
          <p>Cargando contenido...</p>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className={cmicClasses("icic-highlight")} aria-labelledby="error-heading">
        <h2 id="error-heading" className={cmicClasses("visually-hidden")}>Error</h2>
        <div className={cmicClasses("error-container")}>
          <p role="alert">{errMsg}</p>
          <button className={cmicClasses("retry-btn")} onClick={handleRetry} aria-label="Reintentar cargar contenido" type="button">
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="icic" className={cmicClasses("icic-highlight")} aria-labelledby="icic-heading">
      <div className={cmicClasses("icic-contenedor")}>
        <div className={cmicClasses("icic-header")}>
          <div className={cmicClasses("icic-logo-container")}>
            <ImageOrNothing
              src={icicLogo}
              alt="Logo ICIC"
              className={cmicClasses("icic-logoHead")}
              width={180} // ✅ Reducido
              height={180} // ✅ Reducido
            />
          </div>
          <h2 id="icic-heading" className={cmicClasses("section-title")}>ICIC - Instituto de Capacitación</h2>
          <p className={cmicClasses("section-subtitle")}>
            Formamos a los profesionales del futuro en la industria de la construcción
          </p>
        </div>

        <div className={cmicClasses("icic-grid")}>
          <div className={cmicClasses("icic-info")}>
            <div className={cmicClasses("icic-description")}>
              <p>
                El Instituto de Capacitación de la Industria de la Construcción (ICIC) ofrece
                programas de formación especializada con certificaciones reconocidas a nivel
                nacional e internacional.
              </p>

              <StatsGrid />
            </div>

            <FeaturesGrid />

            <div className={cmicClasses("button-container")}>
              <button className={cmicClasses("cta-button")} onClick={handleNavigate} aria-label="Conoce ICIC" type="button">
                <span>Conoce al ICIC</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>

          <div className={cmicClasses("icic-gallery")}>
            <h3>Nuestros estudiantes en acción</h3>
            {carouselContent}
            {calendarSection}
          </div>
        </div>
      </div>
    </section>
  );
}