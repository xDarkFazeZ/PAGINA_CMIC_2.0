import { cmicClasses } from '../styles/recipes';
import type { CmsImage, Maestria, RetryProps, SafeImageProps } from '../types/content';
import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client, urlFor } from "../lib/sanity";
/* ===================== UI básicos ===================== */
const LoadingSpinner = React.memo(() => (
  <div className={cmicClasses("loading-container")} aria-live="polite" aria-busy="true">
    <div className={cmicClasses("loading-spinner")} aria-hidden="true"></div>
    <p className={cmicClasses("loading")}>Cargando detalles de la maestría...</p>
  </div>
));

const ErrorMessage = React.memo(({ error, onRetry }: RetryProps) => (
  <div className={cmicClasses("error-container")} role="alert" aria-live="assertive">
    <h2>Error al cargar los detalles</h2>
    <p>{error}</p>
    <button onClick={onRetry} className={cmicClasses("reload-button")} aria-label="Reintentar carga de detalles">
      Reintentar
    </button>
  </div>
));

/* ===================== Seguridad & helpers ===================== */
const clamp = (s: unknown, n = 500) => (typeof s === "string" ? s.slice(0, n) : "");

const escapeHtml = (s = "") =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" }[c] || c));

const sanitizeInput = (text: unknown, n = 500) => escapeHtml(clamp(String(text ?? ""), n));

// Función mejorada para sanitizar URLs con validación estricta
const sanitizeUrl = (url: string) => {
  if (!url || typeof url !== 'string') return "";
  
  try {
    const u = new URL(url);
    
    // Validar protocolo - solo HTTPS
    if (u.protocol !== "https:") {
      console.warn('URL rechazada: protocolo no seguro');
      return "";
    }
    
    // Validar hostname - solo cdn.sanity.io
    if (!/^cdn\.sanity\.io$/i.test(u.hostname)) {
      console.warn('URL rechazada: dominio no autorizado');
      return "";
    }
    
    // Validar extensión de archivo
    if (!/\.(jpe?g|png|webp|gif|svg)$/i.test(u.pathname)) {
      console.warn('URL rechazada: extensión de archivo no permitida');
      return "";
    }
    
    // Verificar que no haya caracteres peligrosos en el pathname
    if (/[<>"'`]/.test(u.pathname)) {
      console.warn('URL rechazada: caracteres peligrosos detectados');
      return "";
    }
    
    // Construir URL segura con encoding
    const safePath = u.pathname.split('/').map(encodeURIComponent).join('/');
    const safeUrl = `https://${u.hostname}${safePath}`;
    
    return safeUrl;
  } catch (err) {
    console.warn('URL rechazada: formato inválido', err);
    return "";
  }
};

const safeSanityUrl = (image: CmsImage | null | undefined, build: (builder: ReturnType<typeof urlFor>) => ReturnType<typeof urlFor> = (b) => b) => {
  try {
    if (!image) return "";
    const raw = build(urlFor(image)).url();
    const sanitized = sanitizeUrl(raw);
    
    // Doble verificación
    if (!sanitized || sanitized.length === 0) {
      console.warn('safeSanityUrl: URL no pudo ser sanitizada');
      return "";
    }
    
    return sanitized;
  } catch (err) {
    console.error('Error en safeSanityUrl:', err);
    return "";
  }
};

const normalizePhoneForWa = (phone: unknown) => {
  const digits = String(phone || "").replace(/\D/g, "");
  // Validar que solo contenga dígitos y tenga longitud razonable
  if (digits.length < 10 || digits.length > 15) {
    console.warn('Número de teléfono con formato inválido');
    return "";
  }
  return digits;
};

/* ===================== Validación de datos ===================== */
const validateMaestriaData = (data: Maestria | null) => {
  if (!data || typeof data !== 'object') return null;
  
  return {
    nombre_maestria: sanitizeInput(data.nombre_maestria, 160) || "Nombre no disponible",
    imagen: data.imagen || null,
    objetivo_itc: sanitizeInput(data.objetivo_itc, 2000) || "Objetivo no disponible",
    requisitos: Array.isArray(data.requisitos) 
      ? data.requisitos.filter(r => r).map((r) => sanitizeInput(r, 320)) 
      : [],
    mapa_curricular: Array.isArray(data.mapa_curricular)
      ? data.mapa_curricular
          .filter(s => s && typeof s === 'object')
          .map((s) => ({
            titulo_semestre: sanitizeInput(s?.titulo_semestre, 120) || "Semestre",
            materias: Array.isArray(s?.materias) 
              ? s.materias.filter(m => m).map((m) => sanitizeInput(m, 160)) 
              : [],
          }))
      : [],
    detalles_maestria: {
      duracion: sanitizeInput(data.detalles_maestria?.duracion, 120) || "No especificado",
      horario: sanitizeInput(data.detalles_maestria?.horario, 120) || "No especificado",
      modalidad_asignaturas: sanitizeInput(data.detalles_maestria?.modalidad_asignaturas, 160) || "No especificado",
      plataforma_tecnologica: sanitizeInput(data.detalles_maestria?.plataforma_tecnologica, 160) || "No especificado",
      titulacion: sanitizeInput(data.detalles_maestria?.titulacion, 200) || "No especificado",
    },
  };
};

/* ===================== Componente de Imagen Segura ===================== */
const SecureImage = React.memo(({ src, alt, onError, className = "hero-imagen" }: SafeImageProps) => {
  const [isValid, setIsValid] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Validar la URL antes de renderizar
    if (src && typeof src === 'string' && src.startsWith('https://cdn.sanity.io/')) {
      setIsValid(true);
      setHasError(false);
    } else {
      setIsValid(false);
      setHasError(true);
    }
  }, [src]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsValid(false);
    if (onError) onError();
  }, [onError]);

  if (!src || hasError || !isValid) {
    return (
      <div className={cmicClasses(className)}>
        <div className={cmicClasses("image-placeholder")} aria-hidden="true">
          <span>Imagen no disponible</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cmicClasses(className)}>
      <img
        src={src || undefined}
        alt={alt}
        loading="lazy"
        decoding="async"
        width="600"
        height="400"
        onError={handleError}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        draggable="false"
      />
    </div>
  );
});

SecureImage.displayName = 'SecureImage';

/* ===================== Página ===================== */
const MaestriaDetalle = () => {
  const { nombre } = useParams();
  const navigate = useNavigate();

  const [maestria, setMaestria] = useState<ReturnType<typeof validateMaestriaData>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchMaestria = useCallback(async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      const decoded = decodeURIComponent(nombre || "");
      if (!decoded.trim()) throw new Error("Nombre de maestría no válido");

      const data = await client.fetch<Maestria | null>(
        `*[_type == "maestrias" && nombre_maestria == $nombre][0]{
          nombre_maestria,
          imagen,
          objetivo_itc,
          requisitos,
          mapa_curricular[]{ titulo_semestre, materias },
          detalles_maestria{ duracion, horario, modalidad_asignaturas, plataforma_tecnologica, titulacion }
        }`,
        { nombre: decoded },
        { signal: abortRef.current.signal }
      );

      if (!data) throw new Error("No se encontró la maestría solicitada");
      
      const validatedData = validateMaestriaData(data);
      if (!validatedData) throw new Error("Datos de maestría inválidos");
      
      setMaestria(validatedData);
    } catch (err) {
      if ((err instanceof Error && err.name === "AbortError")) return;
      console.error("Error fetching maestría details:", err);
      setError(err instanceof Error ? err.message : "No se pudieron cargar los detalles de la maestría");
    } finally {
      setLoading(false);
    }
  }, [nombre]);

  useEffect(() => {
    fetchMaestria();
    return () => abortRef.current?.abort();
  }, [fetchMaestria]);

  // Generar URL de imagen de forma segura
  const imgSrc = useMemo(() => {
    if (!maestria?.imagen) return "";
    
    const url = safeSanityUrl(maestria.imagen);
    
    // Validación final antes de usar
    if (!url || !url.startsWith('https://cdn.sanity.io/')) {
      console.warn('URL de imagen no válida después de sanitización');
      return "";
    }
    
    return url;
  }, [maestria?.imagen]);

  const handleWhatsAppClick = useCallback(() => {
    const phone = normalizePhoneForWa("+5214494401155");
    
    if (!phone) {
      console.error('Número de teléfono inválido');
      return;
    }
    
    const message = `Hola, estoy interesado en la Maestría en ${maestria?.nombre_maestria}. ¿Podrían proporcionarme más información?`;
    
    try {
      const url = new URL(`https://wa.me/${phone}`);
      url.searchParams.set("text", message);

      const win = window.open(url.toString(), "_blank", "noopener,noreferrer");
      if (win) win.opener = null;
    } catch (err) {
      console.error('Error al abrir WhatsApp:', err);
    }
  }, [maestria?.nombre_maestria]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={fetchMaestria} />;

  if (!maestria) {
    return (
      <div className={cmicClasses("no-data-container")} aria-live="polite">
        <h2>Maestría no encontrada</h2>
        <p>No se encontraron detalles para la maestría solicitada.</p>
        <button onClick={() => navigate(-1)} className={cmicClasses("back-button")} aria-label="Volver a la página anterior">
          Volver atrás
        </button>
      </div>
    );
  }

  return (
    <div className={cmicClasses("maestria-detalle-grid")}>
      {/* HERO SECTION */}
      <section className={cmicClasses("grid-hero")} aria-labelledby="hero-heading">
        <div className={cmicClasses("hero-content")}>
          <div className={cmicClasses("hero-columna-izquierda")}>
            <div className={cmicClasses("hero-texto")}>
              <h1 id="hero-heading">{maestria.nombre_maestria}</h1>
              <p className={cmicClasses("objetivo-text")}>{maestria.objetivo_itc}</p>
            </div>

            <div className={cmicClasses("detalles-hero")}>
              <h2>
                <span aria-hidden="true">🔎</span>
                Detalles del Programa
              </h2>
              <div className={cmicClasses("detalles-lista")}>
                <div className={cmicClasses("detalle-item")}>
                  <span className={cmicClasses("detalle-icono")} aria-hidden="true"></span>
                  <div className={cmicClasses("detalle-contenido")}>
                    <h3>Duración</h3>
                    <p>{maestria.detalles_maestria.duracion}</p>
                  </div>
                </div>
                <div className={cmicClasses("detalle-item")}>
                  <span className={cmicClasses("detalle-icono")} aria-hidden="true"></span>
                  <div className={cmicClasses("detalle-contenido")}>
                    <h3>Horario</h3>
                    <p>{maestria.detalles_maestria.horario}</p>
                  </div>
                </div>
                <div className={cmicClasses("detalle-item")}>
                  <span className={cmicClasses("detalle-icono")} aria-hidden="true"></span>
                  <div className={cmicClasses("detalle-contenido")}>
                    <h3>Modalidad</h3>
                    <p>{maestria.detalles_maestria.modalidad_asignaturas}</p>
                  </div>
                </div>
                <div className={cmicClasses("detalle-item")}>
                  <span className={cmicClasses("detalle-icono")} aria-hidden="true"></span>
                  <div className={cmicClasses("detalle-contenido")}>
                    <h3>Plataforma</h3>
                    <p>{maestria.detalles_maestria.plataforma_tecnologica}</p>
                  </div>
                </div>
                <div className={cmicClasses("detalle-item")}>
                  <span className={cmicClasses("detalle-icono")} aria-hidden="true"></span>
                  <div className={cmicClasses("detalle-contenido")}>
                    <h3>Titulación</h3>
                    <p>{maestria.detalles_maestria.titulacion}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Uso del componente SecureImage */}
          {imgSrc && (
            <SecureImage
              src={imgSrc}
              alt={`Imagen representativa de ${maestria.nombre_maestria}`}
            />
          )}
        </div>
      </section>

      {/* REQUISITOS */}
      <section className={cmicClasses("requisitos-extendidos")} aria-labelledby="requisitos-heading">
        <div className={cmicClasses("requisitos-contenedor")}>
          <h2 id="requisitos-heading">
            <span aria-hidden="true">📋</span>
            Requisitos de Admisión
          </h2>
          <div className={cmicClasses("requisitos-lista")}>
            {maestria.requisitos.length > 0 ? (
              maestria.requisitos.map((req, i) => (
                <div key={`req-${i}`} className={cmicClasses("requisito-item")}>
                  <div className={cmicClasses("requisito-marcador")} aria-hidden="true"></div>
                  <p>{req}</p>
                </div>
              ))
            ) : (
              <p className={cmicClasses("no-requisitos")}>No se especificaron requisitos de admisión</p>
            )}
          </div>
        </div>
      </section>

      {/* MAPA CURRICULAR */}
      <section className={cmicClasses("grid-mapa")} aria-labelledby="mapa-heading">
        <h2 id="mapa-heading">
          <span aria-hidden="true">📚</span>
          Mapa Curricular
        </h2>
        <div className={cmicClasses("semestres-grid")}>
          {maestria.mapa_curricular.length > 0 ? (
            maestria.mapa_curricular.map((semestre, i) => (
              <div key={`sem-${i}`} className={cmicClasses("semestre-card")}>
                <h3>{semestre.titulo_semestre}</h3>
                {semestre.materias.length > 0 ? (
                  <ul>
                    {semestre.materias.map((materia, j) => (
                      <li key={`mat-${i}-${j}`}>{materia}</li>
                    ))}
                  </ul>
                ) : (
                  <p className={cmicClasses("no-materias")}>No hay materias asignadas para este semestre</p>
                )}
              </div>
            ))
          ) : (
            <p className={cmicClasses("no-mapa")}>No se ha definido el mapa curricular para esta maestría</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={cmicClasses("grid-cta")} aria-labelledby="cta-heading">
        <h2 id="cta-heading">¿Interesado en esta maestría?</h2>
        <p>Solicita más información y comienza tu proceso de admisión</p>
        <div className={cmicClasses("boton-whatsapp-container")}>
          <button
            className={cmicClasses("boton-whatsapp")}
            onClick={handleWhatsAppClick}
            aria-label={`Contactar por WhatsApp sobre ${maestria.nombre_maestria}`}
            type="button"
          >
            <span className={cmicClasses("icono-whatsapp")}>💬</span>
            Contactar por WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
};

export default React.memo(MaestriaDetalle);