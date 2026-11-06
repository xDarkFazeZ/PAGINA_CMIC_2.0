import { cmicClasses } from '../styles/recipes';
import React, { useCallback } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

/* ================== Utilidades de seguridad ================== */
const SAFE_HOSTS = new Set([
  "www.google.com",
  "google.com",
  "www.google.com.mx",
  "google.com.mx",
  "www.facebook.com",
  "facebook.com",
  "www.instagram.com",
  "instagram.com",
]);

const safeExternal = (raw: string) => {
  try {
    const u = new URL(raw);
    if (!SAFE_HOSTS.has(u.hostname)) return null;
    if (u.protocol !== "https:") return null;
    return u.toString();
  } catch {
    return null;
  }
};

const normalizeTel = (raw: unknown) => String(raw).replace(/[^\d+]/g, "").trim();
const isE164 = (v: string) => /^\+?[1-9]\d{7,14}$/.test(v);

/* ================== CONSTANTES PRE-CALCULADAS ================== */
// ✅ MOVER fuera del componente para evitar recreación
const CURRENT_YEAR = new Date().getFullYear();
const TEL_RAW = "+524491454288";
const TEL_HREF = isE164(normalizeTel(TEL_RAW)) ? `tel:${normalizeTel(TEL_RAW)}` : undefined;
const MAIL_HREF = "mailto:presidenciacmic@cmicags.mx";

// ✅ ENLACES EXTERNOS pre-calculados
const MAPS_HREF = safeExternal(
  "https://www.google.com/maps/place/Cmic+ags/@21.8818961,-102.2694192,17z/data=!3m1!4b1!4m6!3m5!1s0x8429ee0f8f798e1d:0xabd27585855b1c7f!8m2!3d21.8818961!4d-102.2668443!16s%2Fg%2F11b6d50fsl?entry=ttu"
) || "https://www.google.com/maps";

const FACEBOOK_HREF = safeExternal("https://www.facebook.com/cmicaguascalientes") || "https://www.facebook.com/";
const INSTAGRAM_HREF = safeExternal("https://www.instagram.com/cmicags/") || "https://www.instagram.com/";

// ✅ ENLACES DE NAVEGACIÓN pre-definidos
const NAV_ITEMS = [
  { path: "/", label: "Inicio" },
  { path: "/servicios", label: "CMIC" },
  { path: "/nosotros", label: "Nosotros" },
  { path: "/icic", label: "ICIC" },
  { path: "/itc", label: "ITC" },
];

/* ============================================================= */

const Footer = () => {
  const navigate = useNavigate();

  // ✅ OPTIMIZADO: scrollTop como constante fuera de las funciones
  const scrollTop = useCallback(() => {
    if (typeof window !== "undefined" && window.scrollTo) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  // ✅ OPTIMIZADO: Una sola función de navegación
  const handleNavigation = useCallback((path: string) => {
    navigate(path);
    scrollTop();
  }, [navigate, scrollTop]);

  // ✅ OPTIMIZADO: Manejo de teclado unificado
  const handleKeyPress = useCallback((event: React.KeyboardEvent, path: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigation(path);
    }
  }, [handleNavigation]);

  // ✅ OPTIMIZADO: Componente memoizado para enlaces de navegación
  const NavLink = React.memo(({ item }: { item: {path: string; label: string} }) => (
    <li>
      <button
        className={cmicClasses("footer-enlace")}
        onClick={() => handleNavigation(item.path)}
        onKeyDown={(e) => handleKeyPress(e, item.path)}
        aria-label={`Ir a ${item.label}`}
        tabIndex={0}
        type="button"
      >
        {item.label}
      </button>
    </li>
  ));

  // ✅ OPTIMIZADO: Componente memoizado para enlaces de contacto
  const ContactLink = React.memo(({ href, label, ariaLabel, children, rel = "nofollow" }: {href: string; label?: string; ariaLabel: string; children?: React.ReactNode; rel?: string}) => (
    <a
      href={href}
      className={cmicClasses("contacto-link")}
      aria-label={ariaLabel}
      rel={href.startsWith("http") ? `${rel} noopener noreferrer` : rel}
      {...(href.startsWith('http') ? { 
        target: "_blank", 
        
        referrerPolicy: "no-referrer" 
      } : {})}
    >
      {children || label}
    </a>
  ));

  // ✅ OPTIMIZADO: Componente memoizado para redes sociales
  const SocialLink = React.memo(({ href, ariaLabel, className, Icon, platform }: {href: string; ariaLabel: string; className: string; Icon: import("react-icons").IconType; platform: string}) => (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer nofollow"
      referrerPolicy="no-referrer"
      className={cmicClasses(`social-link ${className}`)}
    >
      <Icon aria-hidden="true" focusable="false" />
      <span className={cmicClasses("sr-only")}>{platform}</span>
    </a>
  ));

  return (
    <footer className={cmicClasses("footer")} role="contentinfo" aria-label="Pie de página">
      <div className={cmicClasses("footer-contenido")}>
        <div className={cmicClasses("footer-seccion")}>
          <h3 className={cmicClasses("footer-titulo")}>CMIC Aguascalientes</h3>
          <p>
            La Cámara Mexicana de la Industria de la Construcción (CMIC) Delegación
            Aguascalientes es un organismo empresarial de interés público que representa,
            apoya y promueve a las empresas y profesionales del sector de la construcción
            en el estado.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div className={cmicClasses("footer-seccion")}>
          <h3 className={cmicClasses("footer-titulo")}>Enlaces rápidos</h3>
          <ul className={cmicClasses("footer-enlaces")}>
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div className={cmicClasses("footer-seccion")}>
          <h3 className={cmicClasses("footer-titulo")}>Contacto</h3>
          <address className={cmicClasses("footer-contacto")}>
            <ContactLink
              href={MAPS_HREF}
              ariaLabel="Ver ubicación en Google Maps"
            >
              Dirección: Av Tecnológico 110, Ojocaliente, 20190 Aguascalientes, Ags.
            </ContactLink>

            {TEL_HREF && (
              <p>
                <ContactLink
                  href={TEL_HREF}
                  ariaLabel="Llamar al teléfono (449) 145 4288 al 93"
                >
                  Teléfono: (449) 145 4288 al 93
                </ContactLink>
              </p>
            )}

            <p>
              <ContactLink
                href={MAIL_HREF}
                ariaLabel="Enviar correo a presidenciacmic@cmicags.mx"
              >
                Email: presidenciacmic@cmicags.mx
              </ContactLink>
            </p>
          </address>
        </div>

        {/* Redes */}
        <div className={cmicClasses("footer-seccion")}>
          <h3 className={cmicClasses("footer-titulo")}>Síguenos</h3>
          <div className={cmicClasses("footer-social-container")}>
            <div className={cmicClasses("footer-redes")}>
              <SocialLink
                href={FACEBOOK_HREF}
                ariaLabel="Síguenos en Facebook (se abre en ventana nueva)"
                className={cmicClasses("facebook-link")}
                Icon={FaFacebookF}
                platform="Facebook"
              />
              <SocialLink
                href={INSTAGRAM_HREF}
                ariaLabel="Síguenos en Instagram (se abre en ventana nueva)"
                className={cmicClasses("instagram-link")}
                Icon={FaInstagram}
                platform="Instagram"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={cmicClasses("footer-derechos")}>
        <p>
          &copy; {CURRENT_YEAR} CMIC Delegación Aguascalientes. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);