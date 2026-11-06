import { cmicClasses } from '../styles/recipes';
// src/pages/asociadoEstudiantil.js
import React, { useCallback, useMemo, useEffect } from "react";
// ✅ CORREGIDO: Importación directa de imágenes
import trabajo from "../lib/trabajo.webp";
import empleado from "../lib/profesional.webp";
import experto from "../lib/experto.webp";
import estudiante from "../lib/estudiante.jpg";
import cmic from "../lib/cmic.jpg";

// ✅ CONSTANTES inmutables
const CONFIG = Object.freeze({
  correoAfiliacion: "afiliacion@cmicags.mx",
  telefono: "+524491454288",
  whatsapp: "5214494401155",
  title: "Asociado Estudiantil",
  subtitle: "Si cursas Arquitectura, Ingeniería Civil o carrera afín, intégrate a la comunidad universitaria CMIC y aprovecha estos beneficios."
});

// ✅ Helper de seguridad
const safeText = (s = "") => {
  if (typeof s !== 'string') return '';
  return s
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "")
    .replace(/on\w+=/gi, "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
};

// ✅ Hook para preload
const useImagePreload = (src: string | null | undefined) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && src) {
      const img = new Image();
      img.src = src;
    }
  }, [src]);
};

// ✅ Componente ContactButtons
const ContactButtons = React.memo(function ContactButtons() {
  const handleWhatsAppClick = useCallback(() => {
    const message = "Hola, me interesa ser *Asociado Estudiantil 2025* de CMIC Aguascalientes. ¿Podrían brindarme más información?";
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  }, []);

  return (
    <div className={cmicClasses("ase-actions")} role="group" aria-label="Opciones de contacto">
      <button
        className={cmicClasses("btn btn-primary")}
        onClick={handleWhatsAppClick}
        aria-label="Contactar por WhatsApp para asociado estudiantil"
        type="button"
      >
        <span className={cmicClasses("btn-icon")} aria-hidden="true">💬</span>
        Contactar por WhatsApp
      </button>
    </div>
  );
});

// ✅ Componente de imagen optimizado
const OptimizedImage = React.memo(({
  src,
  alt,
  className,
  loading = "lazy",
  fetchPriority = "auto",
  width,
  height,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  useImagePreload(src);

  return (
    <img
      src={src}
      alt={alt}
      className={cmicClasses(className)}
      loading={loading}
      fetchPriority={fetchPriority}
      width={width}
      height={height}
      decoding={loading === "eager" ? "sync" : "async"}
      {...props}
    />
  );
});

// ✅ Datos inmutables
const BENEFICIOS = Object.freeze([
  {
    icon: empleado,
    alt: "Icono de capacitación especializada para estudiantes",
    title: "Capacitación especializada",
    desc: "Acceso a cursos y certificaciones ICIC con enfoque práctico."
  },
  {
    icon: trabajo,
    alt: "Icono de bolsa de trabajo para estudiantes de construcción",
    title: "Bolsa de trabajo para estudiantes",
    desc: "Vinculación con empresas del sector construcción."
  },
  {
    icon: experto,
    alt: "Icono de networking con líderes de la industria",
    title: "Networking con líderes",
    desc: "Conecta con directivos, especialistas e instituciones aliadas."
  }
]);

const AsociadoEstudiantil = React.memo(function AsociadoEstudiantil() {
  const cards = useMemo(() => BENEFICIOS, []);

  // ✅ Preload crítico para LCP
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = estudiante;
      link.fetchPriority = 'high';
      document.head.appendChild(link);

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, []);

  return (
    <section
      className={cmicClasses("ase-wrap")}
      aria-labelledby="ase-heading"
      itemScope
      itemType="https://schema.org/EducationalOrganization"
    >
      <meta itemProp="name" content="CMIC Aguascalientes - Asociado Estudiantil" />
      <meta itemProp="email" content={CONFIG.correoAfiliacion} />
      <meta itemProp="telephone" content={CONFIG.telefono} />

      <div className={cmicClasses("ase-main")}>
        {/* HERO SECTION */}
        <header className={cmicClasses("ase-hero")}>
          <div className={cmicClasses("ase-hero-content")}>
            <div className={cmicClasses("ase-hero-text")}>
              <span className={cmicClasses("ase-badge")} aria-hidden="true">CMIC Aguascalientes</span>
              <h1 id="ase-heading" className={cmicClasses("ase-title")} itemProp="name">
                {safeText(CONFIG.title)}
              </h1>
              <p className={cmicClasses("ase-subtitle")} itemProp="description">
                {safeText(CONFIG.subtitle)}
              </p>
              <ContactButtons />
            </div>

            <figure className={cmicClasses("ase-hero-media")}>
              <div className={cmicClasses("ase-image-container")}>
                <OptimizedImage
                  src={estudiante}
                  alt="Estudiante universitario revisando planos de construcción - Programa Asociado Estudiantil CMIC"
                  loading="eager"
                  fetchPriority="high"
                  className={cmicClasses("ase-hero-image")}
                  width="600"
                  height="400"
                  itemProp="image"
                />
              </div>
            </figure>
          </div>
        </header>

        {/* BENEFICIOS SECTION */}
        <section
          className={cmicClasses("ase-benefits")}
          aria-label="Beneficios del programa de asociado estudiantil"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          <div className={cmicClasses("ase-benefits-header")}>
            <h2 className={cmicClasses("ase-benefits-title")}>Beneficios clave</h2>
            <p className={cmicClasses("ase-benefits-subtitle")}>Comienza tu camino profesional hoy</p>
          </div>

          <div className={cmicClasses("ase-benefits-grid")}>
            {cards.map((beneficio, index) => (
              <article
                className={cmicClasses("ase-card")}
                key={beneficio.title}
                itemScope
                itemProp="itemListElement"
                itemType="https://schema.org/EducationalOccupationalCredential"
              >
                <div className={cmicClasses("ase-card-icon")}>
                  <OptimizedImage
                    src={beneficio.icon}
                    alt={beneficio.alt}
                    width="80"
                    height="80"
                    loading="lazy"
                    className={cmicClasses("ase-card-img")}
                  />
                </div>
                <div className={cmicClasses("ase-card-body")}>
                  <h3 className={cmicClasses("ase-card-title")} itemProp="name">
                    {beneficio.title}
                  </h3>
                  <p className={cmicClasses("ase-card-desc")} itemProp="description">
                    {beneficio.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACTO SECTION */}
        <section
          className={cmicClasses("ase-contact")}
          itemScope
          itemType="https://schema.org/ContactPoint"
        >
          <div className={cmicClasses("ase-contact-content")}>
            <div className={cmicClasses("ase-contact-text")}>
              <div className={cmicClasses("ase-contact-badge")}>¿Listo para afiliarte?</div>
              <h2 className={cmicClasses("ase-contact-title")}>¡Contáctanos!</h2>
              <p className={cmicClasses("ase-contact-subtitle")}>
                Resolveremos tus dudas y te guiaremos en el proceso
              </p>

              <ul
                className={cmicClasses("ase-contact-info")}
                aria-label="Información de contacto para asociado estudiantil"
              >
                <li className={cmicClasses("ase-contact-item")}>
                  <span className={cmicClasses("contact-icon")} aria-hidden="true">📧</span>
                  <a
                    className={cmicClasses("ase-contact-link")}
                    href={`mailto:${CONFIG.correoAfiliacion}`}
                    rel="noopener noreferrer"
                    itemProp="email"
                  >
                    {CONFIG.correoAfiliacion}
                  </a>
                </li>
                <li className={cmicClasses("ase-contact-item")}>
                  <span className={cmicClasses("contact-icon")} aria-hidden="true">📞</span>
                  <a
                    className={cmicClasses("ase-contact-link")}
                    href={`tel:${CONFIG.telefono}`}
                    itemProp="telephone"
                  >
                    449 145 4288
                  </a>
                  <span className={cmicClasses("ase-note")} aria-label="extensiones del 88 al 93">&nbsp;(al 93)</span>
                </li>
              </ul>

              <ContactButtons />
            </div>

            <div className={cmicClasses("ase-contact-media")}>
              <div className={cmicClasses("ase-contact-image-container")}>
                <OptimizedImage
                  src={cmic}
                  alt="Sede CMIC Aguascalientes - Centro de desarrollo profesional para estudiantes de construcción"
                  loading="lazy"
                  className={cmicClasses("ase-contact-image")}
                  width="400"
                  height="300"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
});

export default AsociadoEstudiantil;