import { cmicClasses } from '../styles/recipes';
import React, { useMemo } from "react";
/* ========= Utilidad OPTIMIZADA ========= */
function getPublicWhatsAppNumber() {
  return import.meta.env.VITE_WHATSAPP_NUMBER;
}

// ✅ CONSTANTES fuera del componente
const DEFAULT_PHONE = "+5214494401155";
const DEFAULT_MESSAGE = "Hola, me gustaría obtener más información de ustedes.";
const MAX_MESSAGE_LENGTH = 500;

/** Valida E.164: + y 8-15 dígitos */
const isE164 = (raw: unknown) => /^\+?[1-9]\d{7,14}$/.test(String(raw).trim());

/** Normaliza a E.164 (optimizada) */
const normalizePhone = (raw: unknown) => String(raw).replace(/[^\d+]/g, "");

/** Acota mensaje (optimizada) */
const clampMessage = (msg: unknown, max = MAX_MESSAGE_LENGTH) => String(msg || "").slice(0, max);

// ✅ SVG COMO CONSTANTE fuera del componente
const WhatsAppSVG = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
  </svg>
);

// ✅ PRE-CALCULAR valores por defecto fuera del componente
const defaultPhone = getPublicWhatsAppNumber() || DEFAULT_PHONE;

export default function WhatsAppBubble({
  phone = defaultPhone,
  defaultMessage = DEFAULT_MESSAGE,
  className = "",
}) {
  // ✅ CORREGIDO: Solo devolver href, eliminar normalizedPhone no usado
  const href = useMemo(() => {
    const normalized = normalizePhone(phone);
    
    if (!isE164(normalized)) {
      console.warn("[WhatsAppBubble] Teléfono inválido:", normalized);
      return null;
    }

    const safeMsg = clampMessage(defaultMessage);
    const url = new URL(`https://wa.me/${normalized}`);
    url.search = new URLSearchParams({ text: safeMsg }).toString();
    
    return url.toString();
  }, [phone, defaultMessage]);

  // ✅ EARLY RETURN optimizado
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cmicClasses(`whatsapp-bubble ${className}`)}
      aria-label="Abrir WhatsApp para enviarnos un mensaje"
      role="button"
      tabIndex={0}
      draggable={false}
    >
      <div className={cmicClasses("whatsapp-icon")} aria-hidden="true">
        <WhatsAppSVG />
      </div>
      <div className={cmicClasses("whatsapp-tooltip")}>¿Necesitas ayuda? ¡Escríbenos!</div>
    </a>
  );
}
