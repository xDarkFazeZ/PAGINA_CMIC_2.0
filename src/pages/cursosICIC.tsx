import { cmicClasses } from '../styles/recipes';
import type { IcicEvent } from '../types/content';
import React, { useState, useEffect, useCallback } from 'react';
import { client } from '../lib/sanity';
// Query específico para eventos/cursos de ICIC
const ICIC_EVENTS_QUERY = `
  *[_type == "icicEvent"] | order(eventDate desc) {
    _id,
    title,
    eventDate,
    description,
    coverImage {
      asset -> {
        url,
        metadata {
          dimensions
        }
      }
    }
  }
`;

// Componente Modal para imagen completa
const ImageModal = ({ imageUrl, title, onClose }: {imageUrl: string; title: string; onClose: () => void}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    // Bloquear scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={cmicClasses("image-modal-backdrop")} onClick={handleBackdropClick}>
      <div className={cmicClasses("image-modal-content")}>
        <button 
          className={cmicClasses("modal-close-btn")}
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>
        <img 
          src={imageUrl} 
          alt={title}
          className={cmicClasses("modal-image")}
        />
        <div className={cmicClasses("modal-footer")}>
          <button 
            className={cmicClasses("modal-close-bottom")}
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de tarjeta de evento
const EventCard = ({ event }: {event: IcicEvent}) => {
  const [showModal, setShowModal] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // 🔥 FUNCIÓN PARA WHATSAPP
  const handleWhatsAppClick = useCallback(() => {
    const phoneNumber = "+5214494401155";
    const message = `Hola, estoy interesado en el curso: "${event.title}". ¿Podrían proporcionarme más información?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
  }, [event.title]);

  return (
    <>
      <article className={cmicClasses("icic-event-card")}>
        <div className={cmicClasses("event-image-container")} onClick={handleImageClick}>
          <img 
            src={event.coverImage?.asset.url || ""} 
            alt={event.title}
            className={cmicClasses("event-image")}
            loading="lazy"
          />
          <div className={cmicClasses("event-overlay")}>
            <span className={cmicClasses("view-full")}>Ver cartel completo</span>
          </div>
        </div>
        
        <div className={cmicClasses("event-content")}>
          <div className={cmicClasses("event-header")}>
            <span className={cmicClasses("event-badge")}>ICIC · Curso</span>
            {event.eventDate && (
              <time className={cmicClasses("event-date")}>
                {formatDate(event.eventDate)}
              </time>
            )}
          </div>
          
          <h3 className={cmicClasses("event-title")}>{event.title}</h3>
          
          {event.description && (
            <p className={cmicClasses("event-description")}>{event.description}</p>
          )}
          
          <div className={cmicClasses("event-actions")}>
            <button 
              className={cmicClasses("event-btn primary")}
              onClick={handleImageClick}
            >
              📋 Ver Detalles
            </button>
            {/* 🔥 BOTÓN DE WHATSAPP EN LUGAR DE "PRÓXIMAMENTE" */}
            <button 
              className={cmicClasses("event-btn whatsapp")}
              onClick={handleWhatsAppClick}
            >
              💬 Más Info
            </button>
          </div>
        </div>
      </article>

      {/* MODAL PARA IMAGEN COMPLETA */}
      {showModal && (
        <ImageModal 
          imageUrl={event.coverImage?.asset.url || ""}
          title={event.title}
          onClose={closeModal}
        />
      )}
    </>
  );
};

// Componente principal de la página
export default function CursosICIC() {
  const [events, setEvents] = useState<IcicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  useEffect(() => {
    let alive = true;
    
    (async () => {
      try {
        setLoading(true);
        const icicEvents = await client.fetch<IcicEvent[]>(ICIC_EVENTS_QUERY);
        if (!alive) return;
        
        setEvents(icicEvents || []);
        setError('');
      } catch (e) {
        console.error('❌ Error cargando cursos de ICIC:', e);
        if (alive) setError('No se pudieron cargar los cursos y conferencias en este momento.');
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, []);

  // Filtrar eventos según la selección
  const filteredEvents = events.filter(event => {
    const now = new Date();
    const eventDate = new Date(event.eventDate);
    
    switch (filter) {
      case 'upcoming':
        return eventDate >= now;
      case 'past':
        return eventDate < now;
      default:
        return true;
    }
  });

  // Estados de carga
  if (loading) {
    return (
      <div className={cmicClasses("cursos-icic-page")}>
        <div className={cmicClasses("page-header")}>
          <h1 className={cmicClasses("text-titulo")}>Cursos y Conferencias - ICIC</h1>
          <p className={cmicClasses("text-normal")}>Capacitación especializada para profesionales de la construcción</p>
        </div>
        <div className={cmicClasses("loading-state")}>
          <div className={cmicClasses("loading-spinner")}></div>
          <p>Cargando cursos y conferencias...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cmicClasses("cursos-icic-page")}>
        <div className={cmicClasses("page-header")}>
          <h1 className={cmicClasses("text-titulo")}>Cursos y Conferencias - ICIC</h1>
          <p className={cmicClasses("text-normal")}>Capacitación especializada para profesionales de la construcción</p>
        </div>
        <div className={cmicClasses("error-state")}>
          <div className={cmicClasses("error-icon")}>⚠️</div>
          <h3 className={cmicClasses("text-subtitulo")}>Error al cargar los cursos</h3>
          <p>{error}</p>
          <button 
            className={cmicClasses("retry-btn")} 
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cmicClasses("cursos-icic-page")}>
      {/* Header de la página */}
      <div className={cmicClasses("page-header")}>
        <h1 className={cmicClasses("text-titulo")}>Cursos y Conferencias - ICIC</h1>
        <p className={cmicClasses("text-normal")}>Capacitación especializada para profesionales de la construcción</p>
        <div className={cmicClasses("page-stats")}>
          <span>{events.length} evento{events.length !== 1 ? 's' : ''} disponible{events.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Filtros */}
      <div className={cmicClasses("filters-section")}>
        <div className={cmicClasses("filters-container")}>
          <h3 className={cmicClasses("text-subtitulo")}>Filtrar por:</h3>
          <div className={cmicClasses("filter-buttons")}>
            <button 
              className={cmicClasses(`filter-btn ${filter === 'all' ? 'active' : ''}`)}
              onClick={() => setFilter('all')}
            >
              Todos los eventos
            </button>
            <button 
              className={cmicClasses(`filter-btn ${filter === 'upcoming' ? 'active' : ''}`)}
              onClick={() => setFilter('upcoming')}
            >
              Próximos eventos
            </button>
            <button 
              className={cmicClasses(`filter-btn ${filter === 'past' ? 'active' : ''}`)}
              onClick={() => setFilter('past')}
            >
              Eventos pasados
            </button>
          </div>
        </div>
      </div>

      {/* Grid de eventos */}
      <section className={cmicClasses("events-section")}>
        {filteredEvents.length === 0 ? (
          <div className={cmicClasses("empty-state")}>
            <div className={cmicClasses("empty-icon")}>📅</div>
            <h3 className={cmicClasses("text-subtitulo")}>No hay eventos disponibles</h3>
            <p>
              {filter === 'upcoming' 
                ? 'No hay eventos próximos programados en este momento.' 
                : filter === 'past'
                ? 'No hay eventos pasados para mostrar.'
                : 'No hay eventos disponibles en este momento.'
              }
            </p>
          </div>
        ) : (
          <div className={cmicClasses("events-grid")}>
            {filteredEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Call-to-action */}
      <div className={cmicClasses("cta-section")}>
        <div className={cmicClasses("cta-content")}>
          <div className={cmicClasses("cta-icon")}>🎓</div>
          <h3 className={cmicClasses("text-subtitulo")}>¿Interesado en nuestros cursos?</h3>
          <p className={cmicClasses("text-normal")}>
            El ICIC ofrece capacitación continua para profesionales de la construcción. 
            Mantente al día con las últimas tendencias y tecnologías del sector.
          </p>
          
          {/* 🔥 BOTÓN DE WHATSAPP EN EL CTA TAMBIÉN */}
          <button 
            className={cmicClasses("cta-whatsapp-btn")}
            onClick={() => {
              const phoneNumber = "+5214494401155";
              const message = "Hola, estoy interesado en los cursos del ICIC. ¿Podrían proporcionarme más información?";
              const encodedMessage = encodeURIComponent(message);
              const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
              window.open(whatsappURL, '_blank');
            }}
          >
            <span className={cmicClasses("whatsapp-icon")}>💬</span>
            Contáctanos por WhatsApp
          </button>
          
          <div className={cmicClasses("cta-info")}>
            <div className={cmicClasses("info-item")}>
              <span className={cmicClasses("info-icon")}>📧</span>
              <span>Contacta para más información</span>
            </div>
            <div className={cmicClasses("info-item")}>
              <span className={cmicClasses("info-icon")}>📞</span>
              <span>Llama a nuestras oficinas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}