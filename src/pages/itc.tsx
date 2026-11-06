import { cmicClasses } from '../styles/recipes';
import type { CmsImage, Maestria, RetryProps } from '../types/content';
import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { client, urlFor } from "../lib/sanity";
import itcLogo from "../lib/itc-logo.jpg";
import { Link } from "react-router-dom";

/* ===================== Error Boundary ===================== */
class ErrorBoundary extends React.Component<React.PropsWithChildren, {hasError: boolean; error: unknown}> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: unknown) { return { hasError: true, error }; }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) { console.error("Error en ServiciosITC:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className={cmicClasses("error-container")} role="alert" aria-live="polite">
          <h2>Algo salió mal</h2>
          <p>No se pudieron cargar las maestrías. Por favor, intenta recargar la página.</p>
          <button onClick={() => window.location.reload()} className={cmicClasses("reload-button")} aria-label="Recargar página">
            Recargar página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ===================== Helpers de seguridad/perf ===================== */
const clamp = (s: unknown, n = 240) => (typeof s === "string" ? s.slice(0, n) : "");
const escapeHtml = (s = "") =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" }[c] || c));
const sanitizeInput = (text: unknown, n = 240) => escapeHtml(clamp(String(text ?? ""), n));

/** Respeta tu tamaño: NO añadimos width/height params ni fit() a urlFor */
const safeSanityUrl = (image: CmsImage | null | undefined) => {
  try {
    if (!image) return "";
    const raw = urlFor(image).url();
    const u = new URL(raw);
    if (u.protocol !== "https:") return "";
    if (!/cdn\.sanity\.io$/i.test(u.hostname)) return "";
    return u.toString();
  } catch { return ""; }
};

/* ===================== Detección móvil ===================== */
/* ===================== UI básicos ===================== */
const LoadingSpinner = React.memo(() => (
  <div className={cmicClasses("loading-container")} aria-live="polite" aria-busy="true">
    <div className={cmicClasses("loading-spinner")} aria-hidden="true"></div>
    <p className={cmicClasses("loading")}>Cargando maestrías...</p>
  </div>
));
const ErrorMessage = React.memo(({ error, onRetry }: RetryProps) => (
  <div className={cmicClasses("error-container")} role="alert" aria-live="assertive">
    <h2>Error</h2>
    <p>{error}</p>
    <button onClick={onRetry} className={cmicClasses("reload-button")} aria-label="Reintentar carga de maestrías">Reintentar</button>
  </div>
));
const ImagePlaceholder = React.memo(() => (
  <div className={cmicClasses("image-placeholder")} aria-hidden="true"><span>Imagen no disponible</span></div>
));

function sanitizeMaestriaList(data: Maestria[]) {
    if (!Array.isArray(data)) return [];
    return data.map((m, idx) => ({
      _id: m._id || `temp-${idx}`,
      nombre_maestria: sanitizeInput(m.nombre_maestria, 120) || "Nombre no disponible",
      imagen: m.imagen || null,
      requisitos: Array.isArray(m.requisitos) ? m.requisitos.map((r) => sanitizeInput(r, 200)) : [],
      detalles_maestria: {
        duracion: sanitizeInput(m?.detalles_maestria?.duracion, 80) || "No especificado",
        horario: sanitizeInput(m?.detalles_maestria?.horario, 80) || "No especificado",
        modalidad_asignaturas: sanitizeInput(m?.detalles_maestria?.modalidad_asignaturas, 120) || "No especificado",
        plataforma_tecnologica: sanitizeInput(m?.detalles_maestria?.plataforma_tecnologica, 120) || "No especificado",
        titulacion: sanitizeInput(m?.detalles_maestria?.titulacion, 160) || "No especificado",
      },
    }));
  }

/* ===================== Página ===================== */
const ServiciosITC = () => {
  const [maestrias, setMaestrias] = useState<ReturnType<typeof sanitizeMaestriaList>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sanitizeData = useCallback(sanitizeMaestriaList, []);
  const fetchMaestrias = useCallback(async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    try {
      setLoading(true); setError(null);
      const query = `*[_type == "maestrias"]{
        _id, nombre_maestria, imagen, requisitos,
        detalles_maestria{ duracion, horario, modalidad_asignaturas, plataforma_tecnologica, titulacion }
      }`;
      const data = await client.fetch<Maestria[]>(query, {}, { signal: abortRef.current.signal });
      if (!Array.isArray(data)) throw new Error("Datos recibidos no válidos");
      setMaestrias(sanitizeData(data));
    } catch (err) {
      if (!(err instanceof Error && err.name === "AbortError")) {
        console.error("Error fetching maestrías:", err);
        setError("No se pudieron cargar las maestrías. Intenta nuevamente.");
      }
    } finally { setLoading(false); }
  }, [sanitizeData]);

  useEffect(() => { fetchMaestrias(); return () => abortRef.current?.abort(); }, [fetchMaestrias]);

  const toggleFlip = useCallback((id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={fetchMaestrias} />;
  if (!maestrias.length) {
    return (
      <div className={cmicClasses("no-data-container")} aria-live="polite">
        <h2>No hay maestrías disponibles</h2>
        <p>No se encontraron maestrías en este momento.</p>
      </div>
    );
  }

  return (
    <div className={cmicClasses("servicios-page")}>
      <header className={cmicClasses("servicios-header")}>
        <h1>Maestrías ITC</h1>
        <p>El Tecnológico de la Construcción es la única Institución especializada en construcción en América Latina y es por ello que contamos con catedráticos profesionales.</p>
        <div className={cmicClasses("imagen-container")}>
          <img
            src={itcLogo}
            alt="Logo del Instituto Tecnológico de la Construcción"
            className={cmicClasses("itc-logo")}
            loading="lazy"
            decoding="async"
            width="200"
            height="200"
            draggable="false"
          />
        </div>
      </header>

      <section className={cmicClasses("servicios-container")} aria-label="Lista de maestrías disponibles" role="list">
        {maestrias.map((maestria, index) => (
          <MaestriaCard
            key={maestria._id}
            maestria={maestria}
            index={index}
            isFlipped={activeCardId === maestria._id}
            onToggleFlip={toggleFlip}
          />
        ))}
      </section>
    </div>
  );
};

/* ===================== Tarjeta ===================== */
const MaestriaCard = React.memo(function MaestriaCard({
  maestria, index, isFlipped, onToggleFlip,
}: {maestria: ReturnType<typeof sanitizeMaestriaList>[number]; index: number; isFlipped: boolean; onToggleFlip: (id: string) => void}) {
  const [imgOk, setImgOk] = useState(true);
  const src = useMemo(() => safeSanityUrl(maestria.imagen), [maestria.imagen]);

  const onImgError = useCallback(() => { setImgOk(false); }, []);

  return (
    <article
      className={cmicClasses(`flip-card ${isFlipped ? "flipped" : ""}`)}
      aria-label={`Maestría en ${maestria.nombre_maestria}`}
      role="listitem"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1025px) and (hover: hover)').matches && !isFlipped) onToggleFlip(maestria._id);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1025px) and (hover: hover)').matches && isFlipped) onToggleFlip(maestria._id);
      }}
    >
      <div className={cmicClasses("flip-card-inner")} aria-live="off">
        {/* Frente */}
        <div className={cmicClasses("flip-card-front")} aria-hidden={isFlipped}>
          <div className={cmicClasses("imagen-contenedor")} aria-hidden={!imgOk}>
            {imgOk && src ? (
              <img
                src={src}
                alt={`Imagen de la maestría ${maestria.nombre_maestria}`}
                loading="lazy"
                decoding="async"
                width="300"
                height="200"
                onError={onImgError}
                referrerPolicy="no-referrer"
                draggable="false"
              />
            ) : (
              <ImagePlaceholder />
            )}
          </div>

          <h2>{maestria.nombre_maestria}</h2>

          <div className={cmicClasses("mobile-info-button")}>
            <button type="button" onClick={() => onToggleFlip(maestria._id)} aria-expanded={isFlipped} aria-controls={`maestria-details-${index}`}>
              Ver detalles
            </button>
          </div>
        </div>

        {/* Reverso (desktop) */}
        <div id={`maestria-details-${index}`} className={cmicClasses("flip-card-back")} aria-hidden={!isFlipped}>
          <button type="button" className="tw:mb-2 tw:shrink-0 tw:cursor-pointer tw:rounded-lg tw:border tw:border-solid tw:border-[#720000] tw:bg-white tw:px-4 tw:py-2 tw:text-[#720000]" onClick={() => onToggleFlip(maestria._id)}>Volver</button>
          <div className={cmicClasses("contenido-scroll")}>
            <section aria-labelledby={`requisitos-${index}`}>
              <h3 id={`requisitos-${index}`}>Requisitos</h3>
              {maestria.requisitos.length ? (
                <ul>
                  {maestria.requisitos.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
              ) : (
                <p>No se especificaron requisitos</p>
              )}
            </section>

            <section aria-labelledby={`detalles-${index}`}>
              <h3 id={`detalles-${index}`}>Detalles</h3>
              <p><strong>Duración:</strong> {maestria.detalles_maestria.duracion}</p>
              <p><strong>Horario:</strong> {maestria.detalles_maestria.horario}</p>
              <p><strong>Modalidad:</strong> {maestria.detalles_maestria.modalidad_asignaturas}</p>
              <p><strong>Plataforma:</strong> {maestria.detalles_maestria.plataforma_tecnologica}</p>
              <p><strong>Titulación:</strong> {maestria.detalles_maestria.titulacion}</p>
            </section>
          </div>

          <div className={`${cmicClasses("boton-detalles")} tw:[&_a]:rounded-lg tw:[&_a]:bg-[#720000] tw:[&_a]:px-4 tw:[&_a]:py-3 tw:[&_a]:text-white`}>
            <Link
              to={`/maestria/${encodeURIComponent(maestria.nombre_maestria)}`}
              aria-label={`Ver más detalles sobre ${maestria.nombre_maestria}`}
              onClick={(e) => e.stopPropagation()}
              preventScrollReset={true}
            >
              Ver maestría completa <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
});

/* ===================== Export ===================== */
export default function ServiciosITCWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <ServiciosITC />
    </ErrorBoundary>
  );
}
