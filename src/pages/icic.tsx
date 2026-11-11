import { cmicClasses } from '../styles/recipes';
import type { CmsImage, GalleryDocument, GalleryItem, IcicEvent, EventItem, SafeImageProps } from '../types/content';
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { client, urlFor } from "../lib/sanity";
import icicLogo from "../lib/icic-logo.webp";

/* ===================== CONSTANTES Y UTILIDADES ===================== */
const CLAMP_LENGTH = 240;
const CAROUSEL_INTERVAL = 5000;
const IMAGE_QUALITY = 85;

const clamp = (s: unknown, n = CLAMP_LENGTH) => {
    if (typeof s !== "string") return "";
    return s.slice(0, n) + (s.length > n ? "..." : "");
};

const stripJsProto = (s = "") => {
    if (typeof s !== "string") return "";
    return s.replace(/javascript:/gi, "");
};


const safeHttpsUrl = (raw: string) => {
    if (!raw) return null;
    try {
        const u = new URL(raw);
        return u.protocol === "https:" ? u.toString() : null;
    } catch {
        return null;
    }
};

const getDeviceDPR = () => Math.min(2, window.devicePixelRatio || 1);

const buildSafeImageUrl = (asset: CmsImage | null | undefined, { w = 1200, h, q = IMAGE_QUALITY }: {w?: number; h?: number; q?: number} = {}) => {
    if (!asset) return null;
    try {
        let b = urlFor(asset)
            .width(w)
            .fit("max")
            .auto("format")
            .quality(q)
            .dpr(getDeviceDPR());
        if (h) b = b.height(h);
        const url = b.url();
        return safeHttpsUrl(url);
    } catch {
        return null;
    }
};

const formatDate = (dateString: string) => {
    if (!dateString) return 'Fecha no disponible';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch {
        return 'Fecha no disponible';
    }
};

// Función para extraer texto de blocks de Sanity
const extractTextFromBlocks = (blocks: GalleryDocument["descripcion"]) => {
    if (!blocks || !Array.isArray(blocks)) return "";
    try {
        return blocks
            .map(block => {
                if (!block || !block.children) return "";
                return block.children
                    .map(child => child?.text || "")
                    .join(" ");
            })
            .join(" ")
            .trim();
    } catch {
        return "";
    }
};

/* ===================== COMPONENTES MEMOIZADOS ===================== */
const ImageOrNothing = React.memo(({ src, alt = "", className, onError, ...props }: SafeImageProps) => {
    const [visible, setVisible] = useState(Boolean(src));

    useEffect(() => setVisible(Boolean(src)), [src]);

    const handleError = useCallback(() => {
        if (visible) {
            setVisible(false);
            onError?.();
        }
    }, [visible, onError]);

    if (!visible) return null;

    return (
        <img
            src={src || undefined}
            alt={alt}
            className={cmicClasses(className)}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={handleError}
            {...props}
        />
    );
});

const FeaturesGrid = React.memo(() => (
    <div className={cmicClasses("icic-features-grid")} role="region" aria-label="Características del instituto">
        {[
            { icon: "📚", title: "Cursos Técnicos", desc: "Programas especializados en todas las áreas de construcción" },
            { icon: "🏆", title: "Certificaciones", desc: "Diplomas con validez oficial y reconocimiento sectorial" },
            { icon: "👥", title: "Profesores Expertos", desc: "Instructores con amplia experiencia en la industria" },
        ].map((feature, index) => (
            <div key={index} className={cmicClasses("icic-feature-card")}>
                <div className={cmicClasses("icic-feature-icon")} aria-hidden="true">{feature.icon}</div>
                <div className={cmicClasses("icic-feature-content")}>
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                </div>
            </div>
        ))}
    </div>
));

const EventCard = React.memo(({ event }: {event: EventItem}) => {
    return (
        <div className={cmicClasses("icic-event-card")}>
            <div className={cmicClasses("icic-event-image-container")}>
                <ImageOrNothing
                    src={event.img}
                    alt={event.title || "Evento ICIC"}
                    className={cmicClasses("icic-event-image")}
                    width={400}
                    height={250}
                />

            </div>
            <div className={cmicClasses("icic-event-info")}>
                <h4 className={cmicClasses("icic-event-title")}>{event.title}</h4>
                {event.description && (
                    <p className={cmicClasses("icic-event-description")}>{event.description}</p>
                )}
                <time className={cmicClasses("icic-course-date")} dateTime={event.rawDate}>{event.date}</time>
                <div className={cmicClasses("icic-event-actions")}>
                    <button
                        className={cmicClasses("icic-event-details-btn")}
                        onClick={() => {
                            if (event.img) {
                                window.open(event.img.replace(/\?.*$/, '?w=1200&auto=format'), '_blank');
                            }
                        }}
                        aria-label={`Ver detalles del evento ${event.title}`}
                        type="button"
                    >
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    );
});

/* ===================== COMPONENTE DE CONTACTO ===================== */
const ContactSection = React.memo(() => {
    const handleWhatsAppClick = useCallback(() => {
        const phoneNumber = "+5214494401155";
        const message = "Hola, estoy interesado en obtener más información sobre los cursos del ICIC. ¿Podrían proporcionarme más detalles?";
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    }, []);

    const handleEmailClick = useCallback(() => {
        const email = "icicaguascalientes@gmail.com";
        const subject = "Consulta sobre ICIC - Más Información";
        const body = `Hola, me gustaría obtener más información sobre los cursos del ICIC.

Por favor envíenme información sobre:
- Programas disponibles
- Fechas de inicio
- Costos
- Requisitos de inscripción

Quedo atento(a) a su respuesta.

Saludos cordiales`;
        const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoURL;
    }, []);

    const handleCallClick = useCallback(() => {
        window.open('tel:+524491454288', '_self');
    }, []);

    return (
        <div className={cmicClasses("icic-contact-section")}>
            <h3 className={cmicClasses("icic-contact-title")}>¿Interesado en Nuestros Cursos?</h3>
            <p className={cmicClasses("icic-contact-subtitle")}>
                Contáctanos para más información sobre nuestros programas, fechas de inicio y costos
            </p>
            <div className={cmicClasses("icic-contact-grid")}>
                <button
                    className={cmicClasses("icic-contact-card icic-whatsapp-card")}
                    onClick={handleWhatsAppClick}
                    type="button"
                    aria-label="Contactar por WhatsApp"
                >
                    <div className={cmicClasses("icic-contact-icon")}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                    </div>
                    <div className={cmicClasses("icic-contact-info")}>
                        <h4>WhatsApp</h4>
                        <p>Contacto directo para consultas</p>
                    </div>
                </button>

                <button
                    className={cmicClasses("icic-contact-card icic-email-card")}
                    onClick={handleEmailClick}
                    type="button"
                    aria-label="Enviar correo electrónico"
                >
                    <div className={cmicClasses("icic-contact-icon")}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                    </div>
                    <div className={cmicClasses("icic-contact-info")}>
                        <h4>Correo Electrónico</h4>
                        <p>icicaguascalientes@gmail.com</p>
                    </div>
                </button>

                <button
                    className={cmicClasses("icic-contact-card icic-phone-card")}
                    onClick={handleCallClick}
                    type="button"
                    aria-label="Llamar por teléfono"
                >
                    <div className={cmicClasses("icic-contact-icon")}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                    </div>
                    <div className={cmicClasses("icic-contact-info")}>
                        <h4>Teléfono</h4>
                        <p>(449) 145 4288 al 93</p>
                    </div>
                </button>
            </div>
        </div>
    );
});

/* ===================== HOOK PERSONALIZADO ===================== */
const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(() =>
        typeof window !== "undefined" && window.matchMedia
            ? window.matchMedia(query).matches
            : false
    );

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;

        const mediaQuery = window.matchMedia(query);
        const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);

        setMatches(mediaQuery.matches);

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }
    }, [query]);

    return matches;
};

/* ===================== COMPONENTE PRINCIPAL ===================== */
export default function IcicPage() {
    const [icicImages, setIcicImages] = useState<GalleryItem[]>([]);
    const [calendarData, setCalendarData] = useState<GalleryItem | null>(null);
    const [recentEvents, setRecentEvents] = useState<EventItem[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [status, setStatus] = useState("idle");
    const [errMsg, setErrMsg] = useState<string | null>(null);

    const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    const carouselRef = useRef<HTMLDivElement | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    /* ===================== SANITIZACIÓN CORREGIDA ===================== */
    const sanitizeGalleryData = useCallback((arr: GalleryDocument[]) => {
        if (!Array.isArray(arr)) return [];

        return arr
            .map((item) => {
                if (!item || typeof item !== 'object') return null;

                const id = String(item._id || "").trim();
                const titulo = clamp(stripJsProto(String(item.titulo || "")));
                const descripcion = item.descripcion
                    ? clamp(stripJsProto(extractTextFromBlocks(item.descripcion)), 200)
                    : "";
                const img = buildSafeImageUrl(item.imagen, { w: 800 });

                if (!id || !img) return null;

                return {
                    id,
                    titulo,
                    descripcion,
                    img
                };
            })
            .filter((item): item is NonNullable<typeof item> => item !== null)
            .slice(0, 10);
    }, []);

    const sanitizeCalendarData = useCallback((data: GalleryDocument | null) => {
        if (!data || typeof data !== 'object') return null;

        const id = String(data._id || "").trim();
        const titulo = clamp(stripJsProto(String(data.titulo || "Calendario de Cursos")));
        const descripcion = data.descripcion
            ? clamp(stripJsProto(extractTextFromBlocks(data.descripcion)), 300)
            : "";
        const img = buildSafeImageUrl(data.imagen, { w: 800 });

        if (!id || !img) return null;

        return {
            id,
            titulo,
            descripcion,
            img
        };
    }, []);

    const sanitizeEventData = useCallback((arr: IcicEvent[]) => {
        if (!Array.isArray(arr)) return [];

        return arr
            .map((item) => {
                if (!item || typeof item !== 'object') return null;

                const id = String(item._id || "").trim();
                const title = clamp(stripJsProto(String(item.title || "Evento")));
                const description = item.description
                    ? clamp(stripJsProto(String(item.description || "")), 150)
                    : "";
                const date = formatDate(item.eventDate);
                const rawDate = item.eventDate;
                const img = buildSafeImageUrl(item.coverImage, { w: 900 });

                if (!id || !img) return null;

                return {
                    id,
                    title,
                    description,
                    date,
                    rawDate,
                    img
                };
            })
            .filter((item): item is NonNullable<typeof item> => item !== null)
            .sort((a, b) => {
                try {
                    return new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime();
                } catch {
                    return 0;
                }
            })
;
    }, []);

    /* ===================== FETCH DATA CORREGIDO ===================== */
    const fetchData = useCallback(
        async (signal: AbortSignal) => {
            setStatus("loading");
            setErrMsg(null);
            try {
                // Query para galería (carrusel) - incluyendo los blocks completos
                const galleryQuery = `*[_type == "icicGallery"] | order(_createdAt desc)[0...10] {
                    _id, 
                    titulo, 
                    imagen,
                    descripcion
                }`;

                // Query para calendario
                const calendarQuery = `*[_type == "calendarioCursos"][0]{
                    _id, 
                    titulo, 
                    imagen,
                    descripcion
                }`;

                // Query para eventos/cursos
                const eventsQuery = `*[_type == "icicEvent"] | order(eventDate desc) {
                    _id, 
                    title, 
                    eventDate, 
                    coverImage, 
                    description
                }`;

                const [galleryData, calendarData, eventsData] = await Promise.all([
                    client.fetch<GalleryDocument[]>(galleryQuery, {}, { signal, timeout: 10000 }).catch(() => []),
                    client.fetch<GalleryDocument | null>(calendarQuery, {}, { signal, timeout: 10000 }).catch(() => null),
                    client.fetch<IcicEvent[]>(eventsQuery, {}, { signal, timeout: 10000 }).catch(() => [])
                ]);

                const gallery = sanitizeGalleryData(galleryData || []);
                const calendar = sanitizeCalendarData(calendarData);
                const events = sanitizeEventData(eventsData || []);

                setIcicImages(gallery);
                setCalendarData(calendar);
                setRecentEvents(events);
                setStatus(gallery.length || calendar || events.length ? "ok" : "empty");
            } catch (err) {
                if (signal?.aborted) return;
                console.error("[ICIC] Error de carga:", err);
                setErrMsg("No se pudieron cargar los datos. Por favor, verifica tu conexión e intenta nuevamente.");
                setStatus("error");
            }
        },
        [sanitizeGalleryData, sanitizeCalendarData, sanitizeEventData]
    );

    useEffect(() => {
        const ctrl = new AbortController();
        fetchData(ctrl.signal);
        return () => ctrl.abort();
    }, [fetchData]);

    /* ===================== CARRUSEL ===================== */
    const stopCarousel = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startCarousel = useCallback(() => {
        if (reducedMotion || !carouselRef.current) return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (icicImages.length <= 1) return;

        intervalRef.current = setInterval(() => {
            setCurrentSlide((p) => (p + 1) % icicImages.length);
        }, CAROUSEL_INTERVAL);
    }, [icicImages.length, reducedMotion]);

    useEffect(() => {
        startCarousel();
        return () => stopCarousel();
    }, [startCarousel, stopCarousel, status]);

    useEffect(() => {
        const onVis = () => {
            if (document.hidden) stopCarousel();
            else startCarousel();
        };

        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, [startCarousel, stopCarousel]);

    /* ===================== HANDLERS ===================== */
    const handleRetry = useCallback(() => {
        const ctrl = new AbortController();
        fetchData(ctrl.signal);
        return () => ctrl.abort();
    }, [fetchData]);

    const handleIndicatorClick = useCallback((index: number) => {
        stopCarousel();
        setCurrentSlide(index);
        startCarousel();
    }, [stopCarousel, startCarousel]);

    /* ===================== CONTENIDO MEMOIZADO ===================== */
    const carouselContent = useMemo(() => {
        if (status === "loading" || icicImages.length === 0) {
            return (
                <div className={cmicClasses("icic-gallery-placeholder")} aria-label="Galería en carga">
                    <div className={cmicClasses("icic-placeholder-image")}></div>
                </div>
            );
        }

        return (
            <div className={cmicClasses("icic-gallery-carousel")}>
                <div
                    className={cmicClasses("icic-carousel-container")}
                    ref={carouselRef}
                    aria-label="Galería de participantes en cursos"
                    onMouseEnter={stopCarousel}
                    onMouseLeave={startCarousel}
                    onTouchStart={stopCarousel}
                    onTouchEnd={startCarousel}
                >
                    {icicImages.map((image, index) => (
                        <div
                            key={image.id}
                            className={cmicClasses(`icic-carousel-slide ${index === currentSlide ? "icic-active" : ""}`)}
                            aria-hidden={index !== currentSlide}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`Imagen ${index + 1} de ${icicImages.length}`}
                        >
                            <ImageOrNothing
                                src={image.img}
                                alt={image.titulo || "Participantes en curso ICIC"}
                                className={cmicClasses("icic-carousel-image")}
                                width={800}
                                height={600}
                            />

                        </div>
                    ))}
                </div>

                <div className={cmicClasses("icic-media-copy")} key={icicImages[currentSlide]?.id}>
                    <h4>{icicImages[currentSlide]?.titulo}</h4>
                    {icicImages[currentSlide]?.descripcion && <p>{icicImages[currentSlide].descripcion}</p>}
                </div>

                {icicImages.length > 1 && (
                    <div className={cmicClasses("icic-carousel-indicators")} aria-label="Seleccionar foto">
                        {icicImages.map((_, index) => (
                            <button
                                key={index}
                                className={cmicClasses(`icic-indicator ${index === currentSlide ? 'icic-indicator-active' : ''}`)}
                                onClick={() => handleIndicatorClick(index)}
                                aria-label={`Ir a imagen ${index + 1}`}
                                aria-pressed={index === currentSlide}
                                type="button"
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }, [icicImages, currentSlide, stopCarousel, startCarousel, handleIndicatorClick, status]);

    const calendarSection = useMemo(() => {
        if (!calendarData) return null;

        return (
            <div className={cmicClasses("icic-calendar-section")}>
                <h3 className={cmicClasses("icic-calendar-title")}>{calendarData.titulo}</h3>
                <div className={cmicClasses("icic-calendar-preview")}>
                    <ImageOrNothing
                        src={calendarData.img}
                        alt={calendarData.titulo}
                        className={cmicClasses("icic-calendar-image")}
                        width={800}
                        height={600}
                    />

                </div>
                {calendarData.descripcion && (
                    <div className={cmicClasses("icic-calendar-description")}>
                        <p>{calendarData.descripcion}</p>
                    </div>
                )}
                    {calendarData.img && (
                        <a
                            href={`${calendarData.img}&dl=calendario-cursos-icic`}
                            className={cmicClasses("icic-calendar-download")}
                            download
                            aria-label="Descargar calendario de cursos"
                        >
                            📥 Descargar Calendario
                        </a>
                    )}
            </div>
        );
    }, [calendarData]);

    const eventsSection = useMemo(() => {
        if (recentEvents.length === 0) return null;

        return (
            <div className={cmicClasses("icic-events-section")}>
                <h3 className={cmicClasses("icic-events-title")}>Cursos y Conferencias</h3>
                <div className={cmicClasses("icic-events-grid")}>
                    {recentEvents.map((event) => <EventCard key={event.id} event={event} />)}
                </div>
            </div>
        );
    }, [recentEvents]);

    // ... (todo el código anterior permanece igual hasta el renderizado)

    /* ===================== RENDERIZADO ===================== */
    if (status === "loading" || status === "idle") {
        return (
            <div className={cmicClasses("icic-page icic-redesign")} aria-labelledby="loading-heading">
                <div className={cmicClasses("icic-loading-container")}>
                    <div className={cmicClasses("icic-loading-spinner")} aria-label="Cargando contenido"></div>
                    <p>Cargando información del ICIC...</p>
                </div>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className={cmicClasses("icic-page icic-redesign")} aria-labelledby="error-heading">
                <div className={cmicClasses("icic-error-container")}>
                    <p role="alert">{errMsg}</p>
                    <button
                        className={cmicClasses("icic-retry-btn")}
                        onClick={handleRetry}
                        aria-label="Reintentar cargar contenido"
                        type="button"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={cmicClasses("icic-page icic-redesign")}>
            {/* Hero Section */}
            <section className={cmicClasses("icic-hero-section")}>
                <div className={cmicClasses("icic-hero-content")}>
                    <img
                        src={icicLogo}
                        alt="Logo ICIC - Instituto de Capacitación de la Industria de la Construcción"
                        className={cmicClasses("icic-hero-logo")}
                        width={400}
                        height={300}
                    />
                    <p className={cmicClasses("icic-hero-subtitle")}>
                        Formamos a los profesionales del futuro en la industria de la construcción
                    </p>
                </div>
            </section>

            {/* Información Principal (PRIMERO) */}
            <section className={cmicClasses("icic-info-section")}>
                <div className={cmicClasses("icic-container")}>
                    <div className={cmicClasses("icic-intro")}>
                        <h2 className={cmicClasses("icic-section-title")}>Sobre el ICIC</h2>
                        <p className={cmicClasses("icic-description")}>
                            El Instituto de Capacitación de la Industria de la Construcción (ICIC) es el brazo
                            educativo de la CMIC Aguascalientes, dedicado a la formación y actualización de
                            profesionales del sector con programas de alta calidad, certificaciones reconocidas
                            y vinculación laboral.
                        </p>

                        <FeaturesGrid />
                    </div>
                </div>
            </section>

            {/* Grid de Calendario y Carrusel (SEGUNDO) */}
            <section className={cmicClasses("icic-grid-section")}>
                <div className={cmicClasses("icic-container")}>
                    <div className={cmicClasses("icic-grid-layout")}>
                        {/* Calendario a la izquierda */}
                        <div className={cmicClasses("icic-grid-calendar")}>
                            {calendarSection ? (
                                calendarSection
                            ) : (
                                <div className={cmicClasses("icic-calendar-placeholder")}>
                                    <p>Calendario no disponible</p>
                                </div>
                            )}
                        </div>

                        {/* Carrusel a la derecha */}
                        <div className={cmicClasses("icic-grid-gallery")}>
                            <h3 className={cmicClasses("icic-gallery-title")}>Nuestros Estudiantes en Acción</h3>
                            {carouselContent}
                        </div>
                    </div>
                </div>
            </section>

            {/* Eventos (TERCERO) */}
            {eventsSection && (
                <section className={cmicClasses("icic-events-main-section")}>
                    <div className={cmicClasses("icic-container")}>
                        {eventsSection}
                    </div>
                </section>
            )}

            {/* Contacto (CUARTO) */}
            <ContactSection />
        </div>
    );
}
