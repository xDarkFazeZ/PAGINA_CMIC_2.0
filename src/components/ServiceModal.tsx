import { cmicClasses } from '../styles/recipes';
import type { CmsImage, Service, ServiceImages } from '../types/content';
import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { urlFor } from "../lib/sanity";

// Fallbacks
import cesco from "../lib/cesco.webp";
import observalogo from "../lib/observalogo.webp";
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

/* Utils */
const isInternalUrl = (url: unknown) => typeof url === "string" && /^\/(?!\/)/.test(url);
const buildSanityImage = (img: CmsImage, w = 120, h = 120, q = 80) =>
  urlFor(img).width(w).height(h).auto("format").fit("max").quality(q).url();

/* Maps */
const IMG_MAP: Readonly<Record<string, string>> = Object.freeze({
  "oportunidades-obra-privada": colaborarImg,
  "portal-licitaciones": observalogo,
  "estudios-economicos": cesco,
  "medio-ambiente": ambientecmic,
  "ceico": ceicoLogo,
  "desarrollo-empresarial": desarrolloempresarial,
  "rse": rse,
  "competitividad": competitividad,
  "seguros-fianzas": presupuesto,
  "itc": itc,
  "icic": icic,
  "fic": fic,
  "alianzas": alianzas,
  "financiamiento": financiar,
  "bolsa-trabajo": trabajo,
  "gestion-vivienda": empleado,
  "vinculacion-juridica": experto,
});

const LINKS_MAP: Readonly<Record<string, {title: string; url: string; icon: string}[]>> = Object.freeze({
  "oportunidades-obra-privada": [{ title: "Oportunidades de Obra Privada", url: "https://www.cmic.org.mx/cmic/eventos/oprivada/", icon: "📊" }],
  "portal-licitaciones": [{ title: "Portal de Licitaciones", url: "https://www.cmic.org.mx/cmic/eventos/opublica/", icon: "📑" }],
  "estudios-economicos": [{ title: "CEESCO - Estudios Económicos", url: "https://www.cmic.org.mx/ceesco/", icon: "📈" }],
  "medio-ambiente": [{ title: "Medio Ambiente", url: "https://www.cmic.org.mx/sectores/medioambiente/", icon: "🌱" }],
  "ceico": [
    { title: "Catálogos de Costos Directos", url: "https://www.cmic.org.mx/servicios/ceico/costosnacionales/", icon: "📋" },
    { title: "Catálogo de Costos Regionales", url: "https://www.cmic.org.mx/servicios/ceico/costosregionales/", icon: "🗺️" },
    { title: "Video curso E-Learning", url: "https://www.cmic.org.mx/servicios/ceico/videocurso/", icon: "🎓" },
    { title: "Libro Ingeniería de Costos", url: "https://www.cmic.org.mx/servicios/ceico/librodecostos/", icon: "📚" },
    { title: "FASAR - Salario Real", url: "https://www.cmic.org.mx/servicios/ceico/fasar/", icon: "💰" },
    { title: "Tabulador Servicios Profesionales", url: "https://www.cmic.org.mx/servicios/ceico/tabulador/", icon: "⚖️" },
  ],
  "desarrollo-empresarial": [{ title: "Programa de Desarrollo Empresarial", url: "https://www.cmic.org.mx/cmic/eventos/programamipymes/", icon: "🚀" }],
  "competitividad": [{ title: "Programa de Competitividad", url: "https://www.cmic.org.mx/cmic/eventos/pdc/", icon: "🏆" }],
  "rse": [
    { title: "Videocurso Inducción a la RSE", url: "https://www.cmic.org.mx/cmic/eventos/videocursosrs/", icon: "🎬" },
    { title: "Programa de RSE", url: "https://www.cmic.org.mx/cmic/eventos/programarse/", icon: "🤝" },
    { title: "Programa de Integridad", url: "https://www.cmic.org.mx/cmic/eventos/modelolgra/", icon: "🛡️" },
    { title: "Asesoría en RSE", url: "https://www.cmic.org.mx/cmic/eventos/serviciosrse/", icon: "💼" },
  ],
  "seguros-fianzas": [{ title: "Seguros y Fianzas", url: "https://www.cmic.org.mx/servicios/seguros/", icon: "🛡️" }],
  "alianzas": [{ title: "Alianzas Comerciales", url: "https://www.cmic.org.mx/servicios/alianzas/", icon: "🤝" }],
  "itc": [{ title: "Ver ITC", url: "/itc", icon: "🎓" }],
  "icic": [{ title: "Ver ICIC", url: "/icic", icon: "🧰" }],
  "fic": [{ title: "Ver FIC", url: "https://www.fic.org.mx/#!/-inicio/", icon: "🌐" }],
  "financiamiento": [{ title: "Acceso a Financiamiento", url: "https://www.cmic.org.mx/sectores/financiamiento/", icon: "💳" }],
  "bolsa-trabajo": [{ title: "Bolsa de Trabajo", url: "https://bolsadetrabajo.cmicservicios.com/", icon: "👥" }],
  "gestion-vivienda": [{ title: "Gestión y Asesoría en Vivienda", url: "https://www.cmic.org.mx/servicios/vivienda/", icon: "🏠" }],
  "vinculacion-juridica": [{ title: "Vinculación Jurídica", url: "https://www.cmic.org.mx/cmic/servicios/DirJuridica/", icon: "⚖️" }],
});

const DESC_MAP: Readonly<Record<string, string>> = Object.freeze({
  "oportunidades-obra-privada":
    "A través de este programa de la CMIC, los afiliados tienen acceso a participar en los proyectos de obra de: cadenas comerciales, empresas tractoras e incluso, compañías extranjeras, lo que representa nuevas oportunidades para ser proveedores de productos y servicios de construcción del sector privado en áreas como remodelación, mantenimiento, proyecto y construcción de obra nueva",
  "portal-licitaciones":
    " Mediante el análisis de contratación pública y seguimiento de presupuestos, este portal facilita el acceso a licitaciones en diversas especialidades de construcción, con informes sobre avances y cumplimiento. Además, se promueve la transparencia en el presupuesto de infraestructura.",
  "estudios-economicos":
    " La CMIC, a través del CEESCO, realiza un seguimiento continuo de indicadores clave como producción, inversión, empleo e inflación, con datos por entidad federativa. Los informes mensuales proporcionan información actualizada para respaldar la toma de decisiones en el sector.",
  "medio-ambiente":
    "La CMIC promueve la conservación del medio ambiente y el cumplimiento de la legislación ambiental, orientando a las empresas hacia prácticas sostenibles alineadas con los Objetivos de Desarrollo Sostenible y la Agenda 2030. Mediante esta coordinación se proporciona información sobre innovación en equipos, materiales y tecnologías de bajo impacto ambiental.",
  "ceico":
    "El CEICO emite información especializada para estimar los costos de las obras, facilitando la elaboración de presupuestos con análisis de precios unitarios a costo directo. También proporciona herramientas para asegurar el cumplimiento normativo en el cálculo de prestaciones laborales, y el acceso a datos actualizados sobre salarios y honorarios técnicos. Lo anterior se traduce en recursos para elevar el nivel de competitividad de las empresas constructoras afiliadas a la CMIC",
  "desarrollo-empresarial":
    "Este programa virtual tiene como objetivo fortalecer a las empresas afiliadas a la CMIC, proporcionando apoyo integral para el crecimiento de micro y pequeñas empresas constructoras. Los participantes tendrán acceso a información sobre cómo obtener financiamiento y nuevas oportunidades de negocio, así como a herramientas para mejorar la gestión de proyectos.",
  "rse":
    "La CMIC promueve la Responsabilidad Social Empresarial (RSE) brindando a las empresas videocursos, programas especializados y asesoría; fomenta estrategias éticas y sostenibles, respaldando además la obtención de reconocimientos que fortalecen la reputación corporativa de las empresas constructoras afiliadas y elevan su nivel de competitividad en el mercado. Estos servicios te ofrecen la posibilidad de avanzar hacia la sostenibilidad de acuerdo al nivel de desarrollo de Responsabilidad Social Empresarial con el que cuenta actualmente tu empresa",
  "competitividad":
    "Los participantes conocerán las estrategias de crecimiento empleadas por empresarios líderes de las empresas: IDINSA, ICA, PRODEMEX, VISE, GP, MARNHOS, HERMES INFRAESTRUCTURA y TECHINT. A través de sus testimonios, se abordan temas clave como competitividad, liderazgo, innovación, marketing y ventas.",
  "seguros-fianzas":
    "Atención personalizada para garantizar las mejores condiciones en la contratación de soluciones de administración de riesgos y prevención, incluyendo fianzas, seguros de maquinaria, responsabilidad civil para obras, autos, camiones, tractocamiones, edificios y gastos médicos mayores.",
  "alianzas":
    " Nuestras alianzas comerciales forman una red de proveedores que ofrecen productos y servicios innovadores para el sector de la construcción, así como precios competitivos, capacitación, asesoría técnica, acceso a tecnologías de última generación y soluciones sostenibles que mejoran la rentabilidad y eficiencia de los proyectos. Todo con beneficios exclusivos para los Afiliados a la CMIC.",
  "financiamiento":
    " La CMIC acerca a las empresas constructoras afiliadas con excelentes opciones de financiamiento adaptado a las necesidades de cada empresa, con créditos para capital de trabajo, compra de equipo y proyectos estratégicos, acompañado de asesoría especializada a cargo de un ejecutivo asignado, que facilita la selección de las mejores alternativas, condiciones preferenciales y montos adecuados.",
  "bolsa-trabajo":
    " Plataforma especializada del sector construcción que facilita la vinculación laboral, en donde CMIC conecta a candidatos que se registran con vacantes que publican las empresas en este portal. Los candidatos pueden registrarse y postularse de forma gratuita, y participar en programas de capacitación. Por su parte, las empresas pueden publicar sus vacantes sin costo y encontrar candidatos interesados en su oferta laboral.",
  "gestion-vivienda":
    " La Gerencia de Vivienda de la CMIC ofrece a sus afiliados servicios diseñados para facilitar las actividades empresariales en el sector, con el objetivo de promover su profesionalización y mantenerlas actualizadas en los temas más relevantes de la industria de la vivienda",
  "vinculacion-juridica":
    "Conexión con despachos jurídicos especializados con cobertura nacional.",
});

function ServiceModalOptimizado({ isOpen, onClose, service, sanityImages, imagesLoading }: {isOpen: boolean; onClose: () => void; service: Service | null; sanityImages: ServiceImages; imagesLoading: boolean}) {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocused = useRef<Element | null>(null);

  const titleId = "service-dialog-title";
  const descId = "service-dialog-desc";

  const serviceImage = useMemo(() => {
    if (!service) return colaborarImg;
    if (service.id === "portal-licitaciones" && !imagesLoading && sanityImages?.observalogo) {
      return buildSanityImage(sanityImages.observalogo);
    }
    return IMG_MAP[service.id] || colaborarImg;
  }, [service, sanityImages, imagesLoading]);

  const serviceLinks = useMemo(() => (service ? LINKS_MAP[service.id] || [] : []), [service]);
  const serviceDescription = useMemo(() => (service ? DESC_MAP[service.id] || "" : ""), [service]);

  // A11y & UX
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusables).filter((el) => !el.hasAttribute("disabled"));
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };

    if (isOpen) {
      lastFocused.current = document.activeElement;
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus();
    };
  }, [isOpen, onClose]);

  const goInternal = (url: string) => {
    navigate(url);
    onClose?.();
  };

  if (!isOpen || !service) return null;

  const shouldScroll = serviceLinks.length > 3;

  return (
    <div
      className={cmicClasses(`service-overlay ${isOpen ? "active" : ""}`)}
      onClick={onClose}
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        className={cmicClasses("service-container")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={cmicClasses("service-header")}>
          <div className={cmicClasses("service-header-content")}>
            <div className={cmicClasses("service-logo")} aria-hidden>
              <img
                src={serviceImage}
                alt=""
                loading="lazy"
                decoding="async"
                width={60}
                height={60}
              />
            </div>
            <div className={cmicClasses("service-title-section")}>
              <h2 id={titleId} className={cmicClasses("service-title")}>{service.title}</h2>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            className={cmicClasses("service-close")}
            onClick={onClose}
            aria-label="Cerrar ventana"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className={cmicClasses("service-content")}>
          <div className={cmicClasses("service-body")}>
            <p id={descId} className={cmicClasses("service-description")}>{serviceDescription}</p>

            {serviceLinks.length > 0 && (
              <div
                className={cmicClasses(`service-links-wrap ${shouldScroll ? "has-fade" : ""}`)}
                role="region"
                aria-label="Enlaces relacionados"
              >
                <h3 className={cmicClasses("service-links-title")}>Enlaces relacionados</h3>

                <div
                  className={cmicClasses(`service-links ${shouldScroll ? "service-links--scroller" : ""}`)}
                  tabIndex={shouldScroll ? 0 : -1}
                >
                  {serviceLinks.map((link, idx) => {
                    const internal = isInternalUrl(link.url);
                    return internal ? (
                      <button
                        key={idx}
                        type="button"
                        className={cmicClasses("service-link-item service-link-button")}
                        onClick={() => goInternal(link.url)}
                        aria-label={`Ir a ${link.title}`}
                      >
                        <span className={cmicClasses("service-link-icon")}>{link.icon}</span>
                        <span className={cmicClasses("service-link-text")}>{link.title}</span>
                        <span className={cmicClasses("service-link-arrow")} aria-hidden>→</span>
                      </button>
                    ) : (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cmicClasses("service-link-item")}
                      >
                        <span className={cmicClasses("service-link-icon")}>{link.icon}</span>
                        <span className={cmicClasses("service-link-text")}>{link.title}</span>
                        <span className={cmicClasses("service-link-arrow")} aria-hidden>→</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ServiceModalOptimizado);
