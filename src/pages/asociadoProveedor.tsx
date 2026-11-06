import { cmicClasses } from '../styles/recipes';
import type { CmsImage, Afiliado, Proveedor, SafeImageProps } from '../types/content';
// src/pages/AsociadoProveedor.js
import React, { useCallback, useEffect, useMemo, useRef, useState, useDeferredValue } from "react";
import { client, urlFor } from "../lib/sanity";
/* ===================== Utils seguros ===================== */
const clamp = (s: unknown, n = 300) => (typeof s === "string" ? s.slice(0, n) : "");
const stripJsProto = (s = "") => s.replace(/javascript:/gi, "");
const escapeHtml = (s = "") =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] || c));
const safeText = (s: unknown, n = 180) => escapeHtml(clamp(stripJsProto(String(s || "")), n));

/** Solo permite http: en dev; en producción fuerza https/mailto/tel */
const safeHref = (href: string | undefined, { allowHttp = import.meta.env.DEV } = {}) => {
  try {
    const u = new URL(href || "");
    const allowed = ["https:"];
    if (allowHttp) allowed.push("http:");
    return allowed.includes(u.protocol) ? u.toString() : null;
  } catch {
    if (typeof href === "string" && (href.startsWith("mailto:") || href.startsWith("tel:"))) return href;
    return null;
  }
};

/** URL sin recortes (fit: clip), auto formato y DPR-aware */
const logoUrl = (asset: CmsImage | null, { w = 800, q = 90 } = {}) => {
  try {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const u = urlFor(asset || "").width(w).fit("clip").auto("format").quality(q).dpr(dpr).url();
    return safeHref(u, { allowHttp: import.meta.env.DEV });
  } catch {
    return null;
  }
};

/** srcset helper (no cambia estilos; solo reduce KB descargados) */
const makeSrcSet = (asset: CmsImage | null, widths = [320, 480, 700, 900, 1200]) => {
  try {
    return widths
      .map((w) =>
        urlFor(asset || "").width(w).fit("clip").auto("format").quality(w <= 480 ? 80 : 90).url() + ` ${w}w`
      )
      .join(", ");
  } catch {
    return undefined;
  }
};

/* ===================== GROQ ===================== */
const AFILIADOS_QUERY = `*[_type == "afiliados"] | order(nombre asc){
  _id,
  nombre,
  logo,
  contacto { email, telefono },
  ubicacion { direccion, googleMaps },
  sitioWeb,
  redesSociales {
    tieneFacebook, facebook,
    tieneInstagram, instagram,
    tieneX, x,
    tieneTikTok, tiktok
  }
}`;

/* ===================== Iconos ===================== */
const Icon = {
  Facebook: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 2 6.36 2 11.94 2 16.9 5.66 21 10.38 22v-7h-2.5v-2.9h2.5V9.2c0-2.47 1.47-3.84 3.72-3.84 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.22 0-1.6.76-1.6 1.54v1.85h2.72l-.43 2.9h-2.29V22C18.34 21 22 16.9 22 12.06Z"/>
    </svg>
  ),
  Instagram: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.75-2.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z"/>
    </svg>
  ),
  X: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M18.3 3H21l-7.3 8.35L22 21h-5.8l-4.53-5.39L6.4 21H3.7l7.8-8.92L2 3h5.9l4.12 4.9L18.3 3Zm-2.02 16h1.6L7.8 5H6.17l10.1 14Z"/>
    </svg>
  ),
  TikTok: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M12.5 2h3.1c.22 2.13 1.51 3.8 3.7 4.2v3.06c-1.33-.03-2.6-.39-3.7-1.02v6.62c0 3.44-2.44 6.22-6.1 6.22-3.7 0-6.5-2.96-6.5-6.66s2.9-6.66 6.6-6.66c.4 0 .78.04 1.16.11v3.25a3.62 3.62 0 0 0-1.16-.2c-1.83 0-3.3 1.47-3.3 3.5s1.47 3.5 3.3 3.5c1.86 0 3.1-1.46 3.1-3.22V2Z"/>
    </svg>
  ),
};

/* ===================== Img optimizada ===================== */
const OptimizedImage = React.memo(function OptimizedImage({
  src,
  alt,
  className = "",
  placeholder = null,
  priority = false,
  isRectangular = false,
  srcSet,       // <- opcional, para performance
  sizes         // <- opcional, para performance
}: SafeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) { setError(true); return; }
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [src, priority]);

  if (error || !src) {
    return placeholder || (
      <div className={cmicClasses(`image-placeholder ${className}`)} aria-hidden="true">
        {alt?.[0]?.toUpperCase() || "?"}
      </div>
    );
  }

  return (
    <>
      {!loaded && <div className={cmicClasses(`image-skeleton ${className}`)} aria-hidden="true" />}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cmicClasses(`${className} ${loaded ? "image-loaded" : "image-loading"} ${
          isRectangular ? "image-rectangular" : "image-square"
        }`)}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        referrerPolicy="no-referrer"
        draggable="false"
      />
    </>
  );
});

/* ===================== Card ===================== */
const AfiliadoCard = React.memo(function AfiliadoCard({ afiliado, onSelect }: {afiliado: Proveedor; onSelect: (afiliado: Proveedor) => void}) {
  const handleClick = useCallback(() => onSelect(afiliado), [afiliado, onSelect]);
  const isRectangularLogo = afiliado.nombre?.toLowerCase().includes("decogarden");

  return (
    <article className={cmicClasses("afiliado-card")} aria-label={`Afiliado ${afiliado.nombre}`}>
      <div className={cmicClasses(`afiliado-card__media ${isRectangularLogo ? "media-rectangular" : ""}`)}>
        <OptimizedImage
          src={afiliado.logoCard}
          srcSet={afiliado.logoAsset ? makeSrcSet(afiliado.logoAsset) : undefined}
          sizes="(max-width: 480px) 90vw, (max-width: 768px) 50vw, 360px"
          alt={`Logo de ${afiliado.nombre}`}
          className={cmicClasses("afiliado-logo")}
          isRectangular={isRectangularLogo}
          placeholder={
            <div className={cmicClasses("afiliado-logo-placeholder")} aria-hidden="true">
              {afiliado.nombre?.[0]?.toUpperCase() || "?"}
            </div>
          }
        />
      </div>

      <h3 className={cmicClasses("afiliado-nombre")}>{afiliado.nombre}</h3>

      <button
        onClick={handleClick}
        className={cmicClasses("ver-mas-btn")}
        aria-label={`Ver más información sobre ${afiliado.nombre}`}
        type="button"
      >
        Ver más información
      </button>
    </article>
  );
});

/* ===================== Modal ===================== */
const ModalDetalles = React.memo(function ModalDetalles({ afiliado, onClose }: {afiliado: Proveedor; onClose: () => void}) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastFocusRef = useRef<Element | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    lastFocusRef.current = document.activeElement;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const f = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!f?.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => () => {
    if (lastFocusRef.current instanceof HTMLElement) lastFocusRef.current.focus();
  }, []);

  const isRectangularLogo = afiliado.nombre?.toLowerCase().includes("decogarden");

  return (
    <div className={cmicClasses("modal-overlay")} onClick={onClose}>
      <div
        className={cmicClasses("modal-content")}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button className={cmicClasses("close-btn")} onClick={onClose} aria-label="Cerrar detalles" type="button">×</button>

        <div className={cmicClasses("modal-layout")}>
          <div
            className={cmicClasses(`modal-image-section ${
              isRectangularLogo ? "modal-image-section--rectangular" : "modal-image-section--square"
            }`)}
          >
            <OptimizedImage
              src={afiliado.logoModal}
              srcSet={afiliado.logoAsset ? makeSrcSet(afiliado.logoAsset, [480, 700, 900, 1200, 1600]) : undefined}
              sizes="(max-width: 768px) 90vw, 400px"
              alt={`Logo de ${afiliado.nombre}`}
              className={cmicClasses(`modal-image ${isRectangularLogo ? "modal-image--rectangular" : "modal-image--square"}`)}
              priority={true}
              isRectangular={isRectangularLogo}
              placeholder={
                <div className={cmicClasses("modal-image-placeholder")} aria-hidden="true">
                  {afiliado.nombre?.[0]?.toUpperCase() || "?"}
                </div>
              }
            />
          </div>

          <div className={cmicClasses("modal-content-section")} ref={contentRef}>
            <header className={cmicClasses("modal-header")}>
              <h2 id="modal-title" className={cmicClasses("modal-title")}>{afiliado.nombre}</h2>
            </header>

            <div className={cmicClasses("modal-body")}>
              <div className={cmicClasses("contact-info")}>
                {afiliado.contacto?.rawEmail && (
                  <div className={cmicClasses("contact-item")}>
                    <span className={cmicClasses("contact-icon")}>📧</span>
                    <div className={cmicClasses("contact-details")}>
                      <span className={cmicClasses("contact-label")}>Email</span>
                      <a href={afiliado.contacto.email || undefined} className={cmicClasses("contact-value")} rel="noopener noreferrer">
                        {afiliado.contacto.rawEmail}
                      </a>
                    </div>
                  </div>
                )}

                {afiliado.contacto?.rawTel && (
                  <div className={cmicClasses("contact-item")}>
                    <span className={cmicClasses("contact-icon")}>📞</span>
                    <div className={cmicClasses("contact-details")}>
                      <span className={cmicClasses("contact-label")}>Teléfono</span>
                      <a href={afiliado.contacto.telefono || undefined} className={cmicClasses("contact-value")} rel="noopener noreferrer">
                        {afiliado.contacto.rawTel}
                      </a>
                    </div>
                  </div>
                )}

                {afiliado.ubicacion?.direccion && (
                  <div className={cmicClasses("contact-item")}>
                    <span className={cmicClasses("contact-icon")}>🏢</span>
                    <div className={cmicClasses("contact-details")}>
                      <span className={cmicClasses("contact-label")}>Dirección</span>
                      <span className={cmicClasses("contact-value")}>{afiliado.ubicacion.direccion}</span>
                      {afiliado.ubicacion.googleMaps && (
                        <a
                          href={afiliado.ubicacion.googleMaps}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className={cmicClasses("maps-link")}
                        >
                          Ver en Google Maps
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {afiliado.sitioWeb && (
                <div className={cmicClasses("website-section")}>
                  <a
                    href={afiliado.sitioWeb}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className={cmicClasses("website-link")}
                  >
                    <span className={cmicClasses("website-icon")}>🌐</span>
                    Visitar Sitio Web
                  </a>
                </div>
              )}

              {(afiliado.redes?.fb || afiliado.redes?.ig || afiliado.redes?.x || afiliado.redes?.tk) && (
                <div className={cmicClasses("social-section")}>
                  <h3 className={cmicClasses("social-title")}>Síguelos en:</h3>
                  <div className={cmicClasses("social-links")}>
                    {afiliado.redes?.fb && (
                      <a
                        href={afiliado.redes.fb}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label="Facebook"
                        className={cmicClasses("social-link")}
                      >
                        <Icon.Facebook className={cmicClasses("social-svg")} />
                      </a>
                    )}
                    {afiliado.redes?.ig && (
                      <a
                        href={afiliado.redes.ig}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label="Instagram"
                        className={cmicClasses("social-link")}
                      >
                        <Icon.Instagram className={cmicClasses("social-svg")} />
                      </a>
                    )}
                    {afiliado.redes?.x && (
                      <a
                        href={afiliado.redes.x}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label="X (Twitter)"
                        className={cmicClasses("social-link")}
                      >
                        <Icon.X className={cmicClasses("social-svg")} />
                      </a>
                    )}
                    {afiliado.redes?.tk && (
                      <a
                        href={afiliado.redes.tk}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label="TikTok"
                        className={cmicClasses("social-link")}
                      >
                        <Icon.TikTok className={cmicClasses("social-svg")} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/* ===================== Página ===================== */
export default function AsociadoProveedor() {
  const [afiliados, setAfiliados] = useState<Proveedor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Proveedor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [debounced, setDebounced] = useState("");
  const searchRef = useRef<HTMLInputElement | null>(null);

  /* Fetch con abort + sanitización estricta */
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const data = await client.fetch<Afiliado[]>(AFILIADOS_QUERY, {}, { signal: controller.signal });
        if (controller.signal.aborted) return;

        const sanitized = (Array.isArray(data) ? data : []).map((a) => ({
          _id: String(a._id || ""),
          nombre: safeText(a.nombre, 120),
          logoAsset: a.logo || null, // <- guardamos el asset para srcSet
          // misma URL en dos tamaños (sin height) — NO CORTA
          logoCard: a.logo ? logoUrl(a.logo, { w: 700 }) : null,
          logoModal: a.logo ? logoUrl(a.logo, { w: 1200 }) : null,
          contacto: {
            email: a.contacto?.email ? safeHref(`mailto:${a.contacto.email}`) : null,
            telefono: a.contacto?.telefono ? safeHref(`tel:${a.contacto.telefono}`) : null,
            rawEmail: safeText(a.contacto?.email, 150),
            rawTel: safeText(a.contacto?.telefono, 60),
          },
          ubicacion: {
            direccion: safeText(a.ubicacion?.direccion, 220),
            googleMaps: a.ubicacion?.googleMaps ? safeHref(a.ubicacion.googleMaps) : null,
          },
          sitioWeb: a.sitioWeb ? safeHref(a.sitioWeb) : null,
          redes: {
            fb: a.redesSociales?.tieneFacebook ? safeHref(a.redesSociales.facebook) : null,
            ig: a.redesSociales?.tieneInstagram ? safeHref(a.redesSociales.instagram) : null,
            x:  a.redesSociales?.tieneX        ? safeHref(a.redesSociales.x)        : null,
            tk: a.redesSociales?.tieneTikTok   ? safeHref(a.redesSociales.tiktok)   : null,
          },
        }));

        setAfiliados(sanitized);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Error cargando afiliados:", err);
          setError("Error al cargar los afiliados. Por favor, intenta nuevamente.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  /* Debounce + Defer para suavizar renders */
  useEffect(() => {
    const t = setTimeout(() => setDebounced(searchTerm.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);
  const deferred = useDeferredValue(debounced);

  /* Filtrado memoizado */
  const filtered = useMemo(() => {
    if (!deferred) return afiliados;
    const t = deferred;
    return afiliados.filter((a) => a.nombre?.toLowerCase().includes(t));
  }, [afiliados, deferred]);

  /* Handlers */
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value), []);
  const handleSelectAfiliado = useCallback((afiliado: Proveedor) => setSelected(afiliado), []);
  const handleCloseModal = useCallback(() => setSelected(null), []);

  /* Focus inicial */
  useEffect(() => {
    if (!loading && searchRef.current) searchRef.current.focus();
  }, [loading]);

  /* Estados de carga/err */
  if (loading) {
    return (
      <div className={cmicClasses("asociado-proveedor-container")}>
        <div className={cmicClasses("loader-container")}>
          <div className={cmicClasses("loader")} aria-live="polite">Cargando afiliados...</div>
          <div className={cmicClasses("skeleton-grid")}>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className={cmicClasses("skeleton-card")}>
                <div className={cmicClasses("skeleton-media")} />
                <div className={cmicClasses("skeleton-content")}>
                  <div className={cmicClasses("skeleton-title")} />
                  <div className={cmicClasses("skeleton-button")} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cmicClasses("asociado-proveedor-container")}>
        <div className={cmicClasses("error-container")} role="alert">
          <div className={cmicClasses("error-message")}>{error}</div>
          <button onClick={() => window.location.reload()} className={cmicClasses("retry-btn")} type="button">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  /* Render */
  return (
    <div className={cmicClasses("asociado-proveedor-container")}>
      <header className={cmicClasses("asociado-header")}>
        <h1 className={cmicClasses("text-titulo")}>Asociados y Proveedores</h1>
        <p className={cmicClasses("subtitle")}>Encuentra nuestros afiliados y proveedores de confianza</p>
      </header>

      <div className={cmicClasses("search-container")}>
        <input
          ref={searchRef}
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por nombre..."
          aria-label="Buscar afiliado o proveedor"
          className={cmicClasses("search-input")}
        />
      </div>

      <div className={cmicClasses("results-count")} aria-live="polite">
        {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}{deferred && ` para "${deferred}"`}
      </div>

      <div className={cmicClasses("afiliados-grid")}>
        {filtered.map((afiliado) => (
          <AfiliadoCard key={afiliado._id} afiliado={afiliado} onSelect={handleSelectAfiliado} />
        ))}
      </div>

      {selected && <ModalDetalles afiliado={selected} onClose={handleCloseModal} />}
    </div>
  );
}
