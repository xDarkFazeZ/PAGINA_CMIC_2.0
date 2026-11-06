import { cmicClasses } from '../styles/recipes';
import type { CmsImage, Afiliado, AfiliadoLogo } from '../types/content';
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { client, urlFor } from "../lib/sanity";
import { useNavigate } from "react-router-dom";
/* ===== Seguridad y validaciones (MANTENIDAS) ===== */
const isNonEmptyString = (v: unknown) => typeof v === "string" && v.trim().length > 0;
const isAfiliado = (x: Afiliado): x is Afiliado & {logo: CmsImage} => {
  if (!x || typeof x !== "object") return false;
  const idRegex = /^[a-zA-Z0-9\-_]+$/;
  if (!isNonEmptyString(x._id) || !idRegex.test(x._id)) return false;
  if (!isNonEmptyString(x.nombre)) return false;
  return Boolean(x.logo?.asset);
};

const safeHttpsUrl = (maybeUrl: string) => {
  try {
    const u = new URL(maybeUrl);
    if (u.protocol !== "https:") return null;
    const allowed = ["cdn.sanity.io"];
    if (!allowed.some((d) => u.hostname.includes(d))) return null;
    return u.toString();
  } catch {
    return null;
  }
};

/* ===== Helpers Sanity OPTIMIZADOS (manteniendo seguridad) ===== */

// Mover DPR fuera para evitar recálculos
const getDeviceDPR = () => Math.min(2, window.devicePixelRatio || 1);

const buildSrc = (logo: CmsImage, w: number) => {
  const dpr = getDeviceDPR();
  const url = urlFor(logo)
    .width(Math.min(w, 800)) // ✅ LIMIT manteniendo seguridad
    .fit("max")
    .auto("format") // ✅ Sanity elegirá WebP automáticamente
    .quality(75) // ✅ Reducido de 80 para mejor performance
    .dpr(dpr)
    .url();
  return safeHttpsUrl(url); // ✅ Seguridad mantenida
};

// ✅ OPTIMIZADO: Reducir variantes de imágenes
const buildSrcSet = (logo: CmsImage, widths = [320, 480, 640, 800]) =>
  widths
    .map((w) => {
      const u = urlFor(logo)
        .width(w)
        .fit("max")
        .auto("format") // ✅ WebP automático
        .quality(70) // ✅ Ligeramente más bajo para srcSet
        .url();
      const s = safeHttpsUrl(u);
      return s ? `${s} ${w}w` : "";
    })
    .filter(Boolean)
    .join(", ");

/* ===== Imagen segura OPTIMIZADA ===== */
const SafeImage = React.memo(function SafeImage({
  logo,
  name,
  width,
  height,
  className = "",
  isHero = false,
}: { logo: CmsImage; name: string; width?: number; height?: number; className?: string; isHero?: boolean }) {
  const [error, setError] = useState(false);
  
  // ✅ OPTIMIZADO: Un solo useMemo para src y srcSet
  const { src, srcSet } = useMemo(() => {
    const calculatedWidth = Math.min(width || 240, 800);
    return {
      src: buildSrc(logo, calculatedWidth),
      srcSet: buildSrcSet(logo)
    };
  }, [logo, width]);

  if (!src || error) {
    return (
      <div className={cmicClasses("image-placeholder")} role="img" aria-label={`Logo no disponible para ${name}`}>
        <span>{name?.charAt(0) || "?"}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes="(min-width:1200px) 220px, (min-width:768px) 180px, 45vw"
      alt={`Logo de ${name}`}
      width={Math.max(1, Math.round(width || 200))}
      height={Math.max(1, Math.round(height || 100))}
      loading={isHero ? "eager" : "lazy"}
      decoding={isHero ? "sync" : "async"}
      referrerPolicy="no-referrer" // ✅ Seguridad mantenida
      className={cmicClasses(`afiliado-image ${className}`)}
      onError={() => setError(true)}
    />
  );
});

export default function Afiliados() {
  const [afiliados, setAfiliados] = useState<AfiliadoLogo[]>([]);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setStatus("loading");
        
        // ✅ OPTIMIZADO: Query más eficiente
        const query = /* groq */ `
          *[_type == "afiliados"] | order(nombre asc) {
            _id,
            nombre,
            logo,
            "aspectRatio": logo.asset->metadata.dimensions.aspectRatio,
            "width": logo.asset->metadata.dimensions.width,
            "height": logo.asset->metadata.dimensions.height
          }
        `;
        
        const data = await client.fetch<Afiliado[]>(query, {}, { 
          signal: ctrl.signal, 
          timeout: 8000 // ✅ Reducido de 10000
        });
        
        if (!Array.isArray(data)) throw new Error("Formato de datos inválido");

        // ✅ OPTIMIZADO: Transformación más eficiente
        const cleaned = data
          .filter(isAfiliado)
          .map((a) => {
            const nombre = String(a.nombre).trim().slice(0, 100).replace(/[<>]/g, ""); // ✅ Más corto
            const ar = Number(a.aspectRatio) || 1;

            return {
              id: a._id,
              nombre,
              logo: a.logo,
              ar,
              isWide: ar > 1.6,
              isUltraWide: ar > 2.2,
              originalWidth: a.width, // ✅ Para referencia futura
              originalHeight: a.height
            };
          });

        setAfiliados(cleaned);
        setStatus("ok");
      } catch (err) {
        if (!ctrl.signal.aborted) {
          console.error("[Afiliados] Error:", err);
          setStatus("error");
        }
      }
    })();
    return () => ctrl.abort();
  }, []);

  const handleNavigation = useCallback(() => {
    try {
      navigate("/asociado-proveedor");
    } catch (e) {
      console.error("Error de navegación:", e);
    }
  }, [navigate]);

  const content = useMemo(() => {
    if (status === "loading" || status === "idle") {
      return (
        <div className={cmicClasses("afiliados-loading")} role="status" aria-live="polite">
          <div className={cmicClasses("loading-spinner")}></div>
          Cargando afiliados…
        </div>
      );
    }
    if (status === "error") {
      return (
        <div className={cmicClasses("afiliados-error")} role="alert">
          No se pudieron cargar los afiliados. Intenta más tarde.
        </div>
      );
    }
    if (!afiliados.length) {
      return (
        <div className={cmicClasses("afiliados-empty")} role="status" aria-live="polite">
          Aún no hay afiliados para mostrar.
        </div>
      );
    }

    return (
      <div className={cmicClasses("logos-grid")} aria-label="Logotipos de afiliados">
        {afiliados.map((a) => (
          <div
            key={a.id}
            className={
              cmicClasses("logo-item" +
              (a.isUltraWide ? " logo-item--ultrawide" : 
               a.isWide ? " logo-item--wide" : " logo-item--regular"))
            }
            title={a.nombre}
          >
            <SafeImage
              logo={a.logo}
              name={a.nombre}
              width={a.isUltraWide ? 200 : a.isWide ? 160 : 120} // ✅ Reducido ligeramente
              height={a.isUltraWide ? 60 : a.isWide ? 70 : 80}
            />
          </div>
        ))}
      </div>
    );
  }, [status, afiliados]);

  return (
    <section className={cmicClasses("afiliados")} aria-labelledby="afiliados-title">
      <h2 id="afiliados-title">Nuestros Afiliados</h2>
      <p>
        Gracias al apoyo de nuestros afiliados, podemos ofrecer servicios de alta calidad a nuestra comunidad.
      </p>

      {content}

      <button
        className={cmicClasses("btn-nosotros")}
        onClick={handleNavigation}
        aria-label="Conocer más sobre nuestros afiliados"
        type="button"
      >
        Conoce más sobre nuestros afiliados
      </button>
    </section>
  );
}