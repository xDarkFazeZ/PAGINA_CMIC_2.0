import { cmicClasses } from '../styles/recipes';
// src/pages/afiliacion2025.js
import React, { useCallback, useMemo } from "react";
// ✅ Preload crítico para imágenes above-the-fold
import alianzas from "../lib/alianzas.webp";
import financiar from "../lib/financiar.webp";
import empleado from "../lib/profesional.webp";
import experto from "../lib/experto.webp";
import presupuesto from "../lib/presupuesto.webp";
import cmic from "../lib/cmic.jpg";

// ✅ Imagen principal con preload
import afiliacion from "../lib/afiliacion.jpg";

// ✅ CONSTANTES inmutables para mejor performance
const CONFIG = Object.freeze({
  correoAfiliacion: "afiliacion@cmicags.mx",
  telefono: "+524491454288",
  whatsapp: "5214494401155"
});

// ✅ Helpers optimizados y seguros
const safeText = (s = "", n = 180) => {
  if (typeof s !== 'string') return '';
  return s.replace(/javascript:/gi, "").slice(0, n);
};

// ✅ Preload de imágenes críticas
if (typeof window !== 'undefined') {
  const preloadImages = [afiliacion, cmic];
  preloadImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
}

// ✅ Componente de ContactButtons memoizado con handlers optimizados
const ContactButtons = React.memo(function ContactButtons() {
  const handleWhatsAppClick = useCallback(() => {
    const message = `Hola, me interesa la *Afiliación 2025* a CMIC Aguascalientes. ¿Podrían brindarme más información?`;
    const whatsappURL = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  }, []);

  const handleEmail = useCallback(() => {
    const subject = "Afiliación 2025 - Solicitud de información";
    const body = "Hola, me interesa la Afiliación 2025 a CMIC Aguascalientes.\n\nNombre:\nEmpresa:\nTeléfono:\n\nGracias.";
    window.location.href = `mailto:${CONFIG.correoAfiliacion}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, []);

  const handleCall = useCallback(() => {
    window.location.href = `tel:${CONFIG.telefono}`;
  }, []);

  return (
    <div className={cmicClasses("afi-actions")} role="group" aria-label="Opciones de contacto">
      <button 
        className={cmicClasses("btn btn-primary")} 
        onClick={handleWhatsAppClick}
        aria-label="Contactar por WhatsApp"
        type="button"
      >
        <span className={cmicClasses("btn-icon")} aria-hidden="true">💬</span>
        Contactar por WhatsApp
      </button>
      <button 
        className={cmicClasses("btn btn-secondary")} 
        onClick={handleEmail}
        aria-label="Enviar correo electrónico"
        type="button"
      >
        <span className={cmicClasses("btn-icon")} aria-hidden="true">✉️</span>
        Enviar correo
      </button>
      <button 
        className={cmicClasses("btn btn-tertiary")} 
        onClick={handleCall}
        aria-label="Llamar por teléfono"
        type="button"
      >
        <span className={cmicClasses("btn-icon")} aria-hidden="true">☎️</span>
        Llamar
      </button>
    </div>
  );
});

ContactButtons.displayName = 'ContactButtons';

// ✅ Datos inmutables fuera del componente
const BENEFICIOS = Object.freeze([
  { 
    icon: alianzas, 
    alt: "Icono de alianzas estratégicas", 
    title: "Oportunidades de negocio", 
    desc: "Impulsa el crecimiento de tu empresa." 
  },
  { 
    icon: empleado, 
    alt: "Icono de capacitación profesional", 
    title: "Capacitación y certificación", 
    desc: "Educación profesional ICIC." 
  },
  { 
    icon: financiar, 
    alt: "Icono de asesoría financiera", 
    title: "Asesoría jurídica, fiscal y financiamiento", 
    desc: "Acompañamiento especializado." 
  },
  { 
    icon: presupuesto, 
    alt: "Icono de ingeniería de costos", 
    title: "Ingeniería de costos", 
    desc: "Herramientas para presupuestación." 
  },
  { 
    icon: experto, 
    alt: "Icono de información sectorial", 
    title: "Información privilegiada del sector", 
    desc: "Tendencias y oportunidades." 
  }
]);

const Afiliacion2025 = React.memo(function Afiliacion2025() {
  const title = "¡Afíliate a la CMIC!";
  const subtitle = "Afiliarte a la CMIC tiene grandes beneficios";

  // ✅ useMemo para datos estáticos
  const beneficiosLista = useMemo(() => BENEFICIOS, []);

  return (
    <section 
      className={cmicClasses("afi-wrap")} 
      aria-labelledby="afi-heading"
      itemScope 
      itemType="https://schema.org/Organization"
    >
      {/* ✅ Metadatos estructurados para SEO */}
      <meta itemProp="name" content="CMIC Aguascalientes" />
      <meta itemProp="email" content={CONFIG.correoAfiliacion} />
      <meta itemProp="telephone" content={CONFIG.telefono} />
      
      <div className={cmicClasses("afi-main")}>
        {/* Hero Section */}
        <header className={cmicClasses("afi-hero")}>
          <div className={cmicClasses("afi-hero-content")}>
            <div className={cmicClasses("afi-hero-text")}>
              <h1 id="afi-heading" className={cmicClasses("afi-title")} itemProp="name">
                {safeText(title)}
              </h1>
              <p className={cmicClasses("afi-subtitle")} itemProp="description">
                {safeText(subtitle)}
              </p>
              <ContactButtons />
            </div>

            <figure className={cmicClasses("afi-hero-media")}>
              <div className={cmicClasses("afi-image-container")}>
                <img
                  src={afiliacion}
                  alt="Profesional de la construcción revisando planos - Afiliación CMIC 2025"
                  loading="eager" // ✅ Cambiado a eager para LCP
                  decoding="sync"
                  className={cmicClasses("afi-hero-image")}
                  width="600"
                  height="400"
                  itemProp="image"
                />
                <div className={cmicClasses("afi-image-overlay")}></div>
              </div>
            </figure>
          </div>
        </header>

        {/* Beneficios Grid */}
        <section 
          className={cmicClasses("afi-benefits")} 
          aria-label="Beneficios de la afiliación"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          <div className={cmicClasses("afi-benefits-header")}>
            <h2 className={cmicClasses("afi-benefits-title")}>Beneficios Exclusivos</h2>
            <p className={cmicClasses("afi-benefits-subtitle")}>Descubre todo lo que tenemos para ti</p>
          </div>
          
          <div className={cmicClasses("afi-benefits-grid")}>
            {beneficiosLista.map((beneficio, index) => (
              <article 
                className={cmicClasses("afi-card")} 
                key={beneficio.title}
                itemScope
                itemProp="itemListElement"
                itemType="https://schema.org/Service"
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className={cmicClasses("afi-card-icon")}>
                  <img
                    src={beneficio.icon}
                    alt={beneficio.alt}
                    width="64"
                    height="64"
                    loading="lazy"
                    decoding="async"
                    itemProp="image"
                  />
                </div>
                <div className={cmicClasses("afi-card-body")}>
                  <h3 className={cmicClasses("afi-card-title")} itemProp="name">
                    {beneficio.title}
                  </h3>
                  <p className={cmicClasses("afi-card-desc")} itemProp="description">
                    {beneficio.desc}
                  </p>
                </div>
                <div className={cmicClasses("afi-card-hover")} aria-hidden="true"></div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section 
          className={cmicClasses("afi-contact")}
          itemScope
          itemType="https://schema.org/ContactPoint"
        >
          <div className={cmicClasses("afi-contact-content")}>
            <div className={cmicClasses("afi-contact-text")}>
              <div className={cmicClasses("afi-contact-badge")}>Listo para comenzar</div>
              <h2 className={cmicClasses("afi-contact-title")}>¡Contáctanos!</h2>
              <p className={cmicClasses("afi-contact-subtitle")}>
                Estamos aquí para ayudarte en tu proceso de afiliación
              </p>
              
              <div className={cmicClasses("afi-contact-info")}>
                <div className={cmicClasses("afi-contact-item")}>
                  <span className={cmicClasses("contact-icon")} aria-hidden="true">📧</span>
                  <a
                    href={`mailto:${CONFIG.correoAfiliacion}`}
                    className={cmicClasses("afi-contact-link")}
                    rel="noopener noreferrer"
                    itemProp="email"
                  >
                    {CONFIG.correoAfiliacion}
                  </a>
                </div>
                <div className={cmicClasses("afi-contact-item")}>
                  <span className={cmicClasses("contact-icon")} aria-hidden="true">📞</span>
                  <a 
                    href={`tel:${CONFIG.telefono}`} 
                    className={cmicClasses("afi-contact-link")}
                    itemProp="telephone"
                  >
                    449 145 4288
                  </a>
                  <span className={cmicClasses("afi-note")}>(al 93)</span>
                </div>
              </div>

              <ContactButtons />
            </div>

            <div className={cmicClasses("afi-contact-media")}>
              <div className={cmicClasses("afi-contact-image-container")}>
                <img
                  src={cmic}
                  alt="Edificio CMIC Aguascalientes - Afíliate y colabora con la industria de la construcción"
                  loading="lazy"
                  decoding="async"
                  className={cmicClasses("afi-contact-image")}
                  width="400"
                  height="300"
                />
                <div className={cmicClasses("afi-contact-overlay")}></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
});

Afiliacion2025.displayName = 'Afiliacion2025';

export default Afiliacion2025;