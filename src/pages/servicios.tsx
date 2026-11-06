import { cmicClasses } from '../styles/recipes';
import type { CmsImage, Service, ServiceImages } from '../types/content';
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// Sanity
import { client, urlFor } from "../lib/sanity";

// Modal optimizado
import ServiceModal from "../components/ServiceModal";

// Imágenes críticas (fallbacks locales)
import observalogo from "../lib/observalogo.webp";
import cesco from "../lib/cesco.webp";
import ambientecmic from "../lib/ambientecmic.webp";
import ceicoLogo from "../lib/ceico-logo.webp";
import colaborarImg from "../lib/colaborar.webp";
import desarrolloempresarial from "../lib/desarrollo-empresarial.webp";
import competitividad from "../lib/programa-competitividad.webp";
import rse from "../lib/rse.webp";
import itc from "../lib/itc-logo.webp";
import icic from "../lib/icic-logo.webp";
import fic from "../lib/fic-logo.webp";
import alianzas from "../lib/alianzas.webp";
import financiar from "../lib/financiar.webp";
import trabajo from "../lib/trabajo.webp";
import empleado from "../lib/profesional.webp";
import experto from "../lib/experto.webp";
import presupuesto from "../lib/presupuesto.webp";
import folletoPDF from "../pdf/servicios-cmic.pdf";

/* ===================== CONFIG ===================== */
const CONFIG = Object.freeze({
  WHATSAPP_NUMBER: "5214494401155",
  SCROLL_OFFSET: 96,
  IO_THRESHOLD: 0.1,
  IO_ROOT_MARGIN: "50px 0px",
  GRID_MIN: 260,
});

/* ===================== DATA ===================== */
const RAW_SERVICES: Readonly<Record<string, Service[]>> = Object.freeze({
  productos: [
    { id: "oportunidades-obra-privada", title: "Oportunidades en Obra Privada", icon: colaborarImg, summary: "Representa nuevas oportunidades para ser proveedores de productos y servicios de construcción del sector privado.", tags: ["Negocio", "Privado"] },
    { id: "portal-licitaciones", title: "Portal de Licitaciones", icon: "observalogo", summary: "Este portal facilita el acceso a licitaciones en diversas especialidades de construcción, con informes sobre avances y cumplimiento. ", tags: ["Público", "Licitaciones"] },
    { id: "estudios-economicos", title: "Estudios Económicos", icon: cesco, summary: "realiza un seguimiento continuo de indicadores clave como producción, inversión, empleo e inflación, con datos por entidad federativa.", tags: ["Datos", "Economía"] },
    { id: "medio-ambiente", title: "Medio Ambiente", icon: ambientecmic, summary: "Mediante esta coordinación se proporciona información sobre innovación en equipos, materiales y tecnologías de bajo impacto ambiental.", tags: ["Sostenibilidad"] },
    { id: "ceico", title: "CEICO", icon: ceicoLogo, summary: "emite información especializada para estimar los costos de las obras.", tags: ["Costos", "Presupuestos"] },
    { id: "desarrollo-empresarial", title: "Desarrollo Empresarial", icon: desarrolloempresarial, summary: "Este programa virtual tiene como objetivo fortalecer a las empresas afiliadas a la CMIC.", tags: ["Crecimiento"] },
    { id: "rse", title: "Responsabilidad Social", icon: rse, summary: "brindando a las empresas videocursos, programas especializados y asesoría; fomenta estrategias éticas y sostenibles", tags: ["RSE", "Certificación"] },
    { id: "competitividad", title: "Competitividad", icon: competitividad, summary: "Los participantes conocerán las estrategias de crecimiento empleadas por empresarios líderes", tags: ["Liderazgo"] },
  ],
  beneficios: [
    { id: "seguros-fianzas", title: "Seguros y Fianzas", icon: presupuesto, summary: " Atención personalizada para garantizar las mejores condiciones en la contratación de soluciones de administración de riesgos y prevención.", tags: ["Seguros"] },
    { id: "itc", title: "ITC", icon: itc, summary: " El Instituto Tecnológico de la Construcción (ITC) ofrece una amplia oferta educativa que cuenta con Registro de Validez Oficial SEP", tags: ["Educación"], link: "/itc" },
    { id: "icic", title: "ICIC", icon: icic, summary: " El ICIC proporciona capacitación especializada para mejorar las competencias técnicas y gerenciales de las empresas constructoras.", tags: ["Capacitación"], link: "/icic" },
    { id: "fic", title: "FIC", icon: fic, summary: " La FIC ofrece a las empresas constructoras servicios que fortalecen su competitividad y sostenibilidad, como programas de validación empresarial, certificaciones ISO, diplomados BIM y Curso Lean Construction.", tags: ["Certificación"], externalLink: "https://www.fic.org.mx/#!/-inicio/" },
    { id: "alianzas", title: "Alianzas Comerciales", icon: alianzas, summary: " Nuestras alianzas comerciales forman una red de proveedores que ofrecen productos y servicios innovadores para el sector de la construcción", tags: ["Descuentos"] },
  ],
  facilidades: [
    { id: "financiamiento", title: "Financiamiento", icon: financiar, summary: " La CMIC acerca a las empresas constructoras afiliadas con excelentes opciones de financiamiento adaptado a las necesidades de cada empresa", tags: ["Créditos"] },
    { id: "bolsa-trabajo", title: "Bolsa de Trabajo", icon: trabajo, summary: " Plataforma especializada del sector construcción que facilita la vinculación laboral", tags: ["Empleo"] },
    { id: "gestion-vivienda", title: "Gestión de Vivienda", icon: empleado, summary: "Ofrece a sus afiliados servicios diseñados para facilitar las actividades empresariales en el sector.", tags: ["Vivienda"] },
    { id: "vinculacion-juridica", title: "Vinculación Jurídica", icon: experto, summary: " CMIC conecta a sus afiliados con despachos jurídicos especializados en el sector construcción, que brindan atención personalizada. ", tags: ["Legal"] },
  ],
});

/* ===================== UTILS ===================== */
const buildSanityImage = (img: CmsImage, w = 200, h = 160, q = 80) =>
  urlFor(img).width(w).height(h).auto("format").fit("max").quality(q).url();

/* ===================== CARD ===================== */
const ServiceCard = React.memo(function ServiceCard({ service, sanityImages, isLoading, onCardClick }: {service: Service; sanityImages: ServiceImages; isLoading: boolean; onCardClick: (service: Service) => void}) {
  const imgSrc = useMemo(() => {
    if (service.icon === "observalogo" && !isLoading && sanityImages?.observalogo) {
      return buildSanityImage(sanityImages.observalogo);
    }
    if (typeof service.icon === "string" && service.icon !== "observalogo") return service.icon;
    return observalogo;
  }, [service.icon, isLoading, sanityImages]);

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onCardClick?.(service);
    },
    [onCardClick, service]
  );

  return (
    <article id={service.id} className={cmicClasses("service-card glass reveal")} tabIndex={-1}>
      <button className={cmicClasses("card-link")} onClick={handleCardClick} aria-label={`Ver detalles de ${service.title}`}>
        <div className={cmicClasses("card-media")}>
          <img
            src={imgSrc}
            alt={service.title}
            loading="lazy"
            decoding="async"
            width={200}
            height={160}
            sizes="(max-width: 640px) 160px, 200px"
          />
        </div>

        <div className={cmicClasses("card-content")}>
          <h3 className={cmicClasses("card-title")}>{service.title}</h3>

          <div className={cmicClasses("card-tags")} aria-label="Etiquetas">
            {service.tags.map((tag) => (
              <span key={tag} className={cmicClasses("tag")}>{tag}</span>
            ))}
          </div>

          <p className={cmicClasses("card-summary")}>{service.summary}</p>

          {Array.isArray(service.links) && (
            <ul className={cmicClasses("card-links")} aria-label="Recursos">
              {service.links.map((link, i) => (
                <li key={i}><span className={cmicClasses("link-bullet")} aria-hidden>→</span>{link}</li>
              ))}
            </ul>
          )}

          {Array.isArray(service.highlights) && (
            <ul className={cmicClasses("card-highlights")} aria-label="Puntos destacados">
              {service.highlights.map((hl, i) => (
                <li key={i}>✓ {hl}</li>
              ))}
            </ul>
          )}
        </div>
      </button>
    </article>
  );
});

/* ===================== MAIN ===================== */
export default function ServiciosOptimizado() {
  const [activeSection, setActiveSection] = useState("productos");
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  const [sanityImages, setSanityImages] = useState<ServiceImages>({});
  const [imagesLoading, setImagesLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const ioRef = useRef<IntersectionObserver | null>(null);

  const SERVICES = useMemo(() => RAW_SERVICES, []);

  // Carga imágenes Sanity
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const query = `*[_type=="imagenesServicios"]{nombre, imagen{asset->{_id,url,metadata{dimensions}}, alt}}`;
        const result = await client.fetch<{nombre: string; imagen: CmsImage}[]>(query, {}, { signal: ctrl.signal });
        const map: ServiceImages = {};
        for (const item of result || []) map[item.nombre] = item.imagen;
        setSanityImages(map);
      } catch (e) {
        if (!(e instanceof Error && e.name === "AbortError")) console.error("Sanity fetch error:", e);
      } finally {
        setImagesLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  // IntersectionObserver (reveal)
  useEffect(() => {
    ioRef.current = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && en.target.classList.add("reveal-in")),
      { threshold: CONFIG.IO_THRESHOLD, rootMargin: CONFIG.IO_ROOT_MARGIN }
    );
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => ioRef.current?.observe(el));
    return () => ioRef.current?.disconnect();
  }, []);

  // Scroll-spy
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const ids = ["productos", "beneficios", "facilidades"];
        const y = window.scrollY + window.innerHeight / 3;
        for (const id of ids) {
          const el = document.getElementById(`section-${id}`);
          if (!el) continue;
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (y >= top) setActiveSection(id);
        }
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // ⬇️⬇️ NUEVO: calcula offsets del header para que service-nav suba más al hacer scroll
  useEffect(() => {
    const root = document.documentElement;

    const computeOffsets = () => {
      const header = document.querySelector(".header");
      if (!header) return;

      const h = Math.max(0, header.getBoundingClientRect().height || 0);

      // Altura “normal”
      root.style.setProperty("--header-offset", `${h}px`);

      // Altura compacta cuando el header está scrolled (ajusta el factor si quieres subir más)
      const compact = Math.max(44, Math.round(h * 0.62));
      root.style.setProperty("--header-offset-scrolled", `${compact}px`);
    };

    computeOffsets();
    window.addEventListener("resize", computeOffsets);
    window.addEventListener("scroll", computeOffsets, { passive: true });

    const header = document.querySelector(".header");
    let mo: MutationObserver | undefined;
    if (header && "MutationObserver" in window) {
      mo = new MutationObserver(computeOffsets);
      mo.observe(header, { attributes: true, attributeFilter: ["class", "style"] });
    }

    return () => {
      window.removeEventListener("resize", computeOffsets);
      window.removeEventListener("scroll", computeOffsets);
      mo?.disconnect?.();
    };
  }, []);
  // ⬆️⬆️ FIN NUEVO

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(`section-${sectionId}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - CONFIG.SCROLL_OFFSET;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
    setActiveSection(sectionId);
    if (window.innerWidth < 1024) setIsIndexOpen(false);
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    try {
      const url = new URL(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}`);
      url.searchParams.set("text", "Hola, estoy interesado en los Servicios CMIC 2025. ¿Podrían darme más información?");
      window.open(url.toString(), "_blank", "noopener,noreferrer");
    } catch {
      window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}`, "_blank", "noopener,noreferrer");
    }
  }, []);

  const onCardClick = useCallback((service: Service) => {
    setSelectedService(service);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedService(null);
  }, []);

  const Productos = useMemo(
    () => SERVICES.productos.map((s) => (
      <ServiceCard key={s.id} service={s} sanityImages={sanityImages} isLoading={imagesLoading} onCardClick={onCardClick} />
    )),
    [SERVICES.productos, sanityImages, imagesLoading, onCardClick]
  );

  const Beneficios = useMemo(
    () => SERVICES.beneficios.map((s) => (
      <ServiceCard key={s.id} service={s} sanityImages={sanityImages} isLoading={imagesLoading} onCardClick={onCardClick} />
    )),
    [SERVICES.beneficios, sanityImages, imagesLoading, onCardClick]
  );

  const Facilidades = useMemo(
    () => SERVICES.facilidades.map((s) => (
      <ServiceCard key={s.id} service={s} sanityImages={sanityImages} isLoading={imagesLoading} onCardClick={onCardClick} />
    )),
    [SERVICES.facilidades, sanityImages, imagesLoading, onCardClick]
  );

  return (
    <>
      <a href="#main-content" className={cmicClasses("skip-link")}>Saltar al contenido</a>

      <div className={cmicClasses("servicios-page-v2")} role="region" aria-label="Servicios CMIC 2025">
        {/* HERO */}
        <header className={cmicClasses("hero-compact")}>
          <h1 className={cmicClasses("hero-title")}>
            Servicios de Alto Valor <span className={cmicClasses("highlight")}>CMIC 2025</span>
          </h1>
          <p className={cmicClasses("hero-desc")}>
            Nuestro compromiso es acompañar a tu empresa
            en cada etapa de su crecimiento, proporcionando
            las herramientas necesarias para enfrentar los
            desafíos del sector con éxito.
          </p>
        </header>

        {/* NAV */}
        <nav className={cmicClasses(`service-nav glass ${isIndexOpen ? "open" : ""}`)} aria-label="Navegación de secciones">
          <button
            className={cmicClasses("nav-toggle")}
            onClick={() => setIsIndexOpen((v) => !v)}
            aria-expanded={isIndexOpen}
            aria-controls="nav-items"
          >
            ☰ Categorías
          </button>

          <div id="nav-items" className={cmicClasses("nav-items")} role="tablist" aria-label="Categorías">
            {["productos", "beneficios", "facilidades"].map((section) => (
              <button
                key={section}
                role="tab"
                aria-selected={activeSection === section}
                className={cmicClasses(`nav-btn ${activeSection === section ? "active" : ""}`)}
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        {/* MAIN */}
        <main id="main-content" className={cmicClasses("services-container")}>
          {/* Productos */}
          <section id="section-productos" className={cmicClasses("services-section")} aria-labelledby="titulo-productos">
            <div className={cmicClasses("section-header")}>
              <h2 id="titulo-productos" className={cmicClasses("section-title")}>Productos y Servicios</h2>
              <p className={cmicClasses("section-desc")}>Soluciones especializadas para impulsar tu negocio</p>
            </div>
            <div className={cmicClasses("services-grid")} style={{ "--min": `${CONFIG.GRID_MIN}px` } as React.CSSProperties}>
              {Productos}
            </div>
          </section>

          {/* Beneficios */}
          <section id="section-beneficios" className={cmicClasses("services-section")} aria-labelledby="titulo-beneficios">
            <div className={cmicClasses("section-header")}>
              <h2 id="titulo-beneficios" className={cmicClasses("section-title")}>Beneficios Exclusivos</h2>
              <p className={cmicClasses("section-desc")}>Ventajas únicas para socios CMIC</p>
            </div>
            <div className={cmicClasses("services-grid")} style={{ "--min": `${CONFIG.GRID_MIN}px` } as React.CSSProperties}>
              {Beneficios}
            </div>
          </section>

          {/* Facilidades */}
          <section id="section-facilidades" className={cmicClasses("services-section")} aria-labelledby="titulo-facilidades">
            <div className={cmicClasses("section-header")}>
              <h2 id="titulo-facilidades" className={cmicClasses("section-title")}>Facilidades</h2>
              <p className={cmicClasses("section-desc")}>Herramientas para simplificar tu operación</p>
            </div>
            <div className={cmicClasses("services-grid")} style={{ "--min": `${CONFIG.GRID_MIN}px` } as React.CSSProperties}>
              {Facilidades}
            </div>
          </section>

          {/* CTA */}
          <section className={cmicClasses("cta-section")} aria-labelledby="cta-title">
            <h2 id="cta-title">¿Listo para aprovechar estos beneficios?</h2>
            <p className={cmicClasses("cta-desc")}>Únete a CMIC y accede a todos estos servicios exclusivos para impulsar tu empresa constructora</p>
            <div className={cmicClasses("cta-actions")}>
              <a
                href={folletoPDF}
                download="Servicios-CMIC-2025.pdf"
                className={cmicClasses("btn-cta btn-primary")}
              >
                📄 Descargar Folleto
              </a>
              <button onClick={handleWhatsAppClick} className={cmicClasses("btn-cta btn-whatsapp")}>
                💬 Contactar por WhatsApp
              </button>
            </div>
          </section>
        </main>

        {/* MODAL */}
        <ServiceModal
          isOpen={modalOpen}
          onClose={closeModal}
          service={selectedService}
          sanityImages={sanityImages}
          imagesLoading={imagesLoading}
        />
      </div>
    </>
  );
}
