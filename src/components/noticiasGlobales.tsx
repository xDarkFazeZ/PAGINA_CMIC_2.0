import { cmicClasses } from '../styles/recipes';
import type { NewsData, NewsState, SocialPost, IcicEvent } from '../types/content';
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Agregar useNavigate
import { client } from '../lib/sanity';
import { SOCIAL_POSTS_QUERY } from '../queries/socialPost';
type NewsCarouselItem = (SocialPost & {type: 'cmic'; sortDate?: string}) | (IcicEvent & {type: 'icic'; sortDate: string});

/* ===================== CONSTANTES Y UTILIDADES OPTIMIZADAS ===================== */
const SECURITY_CONFIG = Object.freeze({
  MAX_TITLE_LENGTH: 120,
  MAX_DESC_LENGTH: 200,
  ALLOWED_FB_HOSTS: Object.freeze(['www.facebook.com', 'facebook.com']),
  ALLOWED_PROTOCOLS: Object.freeze(['https:']),
  SANDBOX_ATTRIBUTES: 'allow-scripts allow-same-origin',
  MIN_CARD_WIDTH: 280,
  MAX_CARD_WIDTH: 380,
  TIMEOUT: 7000,
  MAX_ITEMS: 12,
  MAX_CACHE_SIZE: 100,
  SCROLL_SPEED: 0.8 // ✅ Velocidad similar al carrusel de convenios
});

// ✅ Cache LRU para validaciones
const createLRUCache = (maxSize: number = SECURITY_CONFIG.MAX_CACHE_SIZE) => {
  const cache = new Map<string, boolean>();
  return {
    get: (key: string) => cache.get(key),
    set: (key: string, value: boolean) => {
      if (cache.size >= maxSize) {
        const firstKey = cache.keys().next().value;
        if (firstKey !== undefined) cache.delete(firstKey);
      }
      cache.set(key, value);
    },
    clear: () => cache.clear()
  };
};

const urlValidationCache = createLRUCache(50);

// ✅ Utilidades puras ultra-optimizadas
const sanitizeString = (() => {
  const dangerousPatterns = /javascript:|data:|vbscript:|on\w+\s*=|<\s*(script|iframe)/gi;
  
  return (input: unknown, maxLength = 100) => {
    if (typeof input !== 'string') return '';
    return input.replace(dangerousPatterns, '').trim().slice(0, maxLength);
  };
})();

// ✅ Validación de URLs con cache LRU
const isValidFacebookUrl = (url: string | null | undefined) => {
  if (typeof url !== 'string') return false;
  
  const cached = urlValidationCache.get(url);
  if (cached !== undefined) return cached;

  try {
    const parsed = new URL(url);
    const isValid = parsed.protocol === 'https:' && 
                   SECURITY_CONFIG.ALLOWED_FB_HOSTS.includes(parsed.hostname) &&
                   (parsed.pathname.includes('/posts/') || parsed.pathname.includes('/permalink/'));
    
    urlValidationCache.set(url, isValid);
    return isValid;
  } catch {
    urlValidationCache.set(url, false);
    return false;
  }
};

// ✅ Validación de imágenes segura optimizada
const getSafeImageUrl = (url: unknown) => {
  if (typeof url !== 'string') return null;
  
  try {
    const parsed = new URL(url);
    return SECURITY_CONFIG.ALLOWED_PROTOCOLS.includes(parsed.protocol) ? url : null;
  } catch {
    return null;
  }
};

/* ===================== HOOK RESPONSIVE OPTIMIZADO ===================== */
function useResponsiveWidth(min: number = SECURITY_CONFIG.MIN_CARD_WIDTH, max: number = SECURITY_CONFIG.MAX_CARD_WIDTH) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(max);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let rafId = 0;
    const calculateWidth = () => {
      const containerWidth = element.clientWidth;
      if (containerWidth) {
        const calculated = Math.min(max, Math.max(min, containerWidth));
        setWidth(calculated);
      }
    };

    const debouncedCalculate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculateWidth);
    };

    calculateWidth();

    const resizeObserver = new ResizeObserver(debouncedCalculate);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [min, max]);

  return { containerRef: ref, width };
}

/* ===================== CONSTRUCCIÓN SEGURA DE IFRAME ===================== */
const buildSecureFacebookIframe = (() => {
  const baseUrl = 'https://www.facebook.com/plugins/post.php';
  
  return (postUrl: string, width: number) => {
    if (!isValidFacebookUrl(postUrl)) return null;
    
    const params = new URLSearchParams({
      href: encodeURI(postUrl),
      show_text: 'true',
      width: Math.floor(width).toString(),
      lazy: 'true',
      adapt_container_width: 'true'
    });
    
    return `${baseUrl}?${params.toString()}`;
  };
})();

/* ===================== COMPONENTES ULTRA-OPTIMIZADOS ===================== */
const FacebookCard = React.memo(({ post, onCardClick }: {post: SocialPost; onCardClick: (orgType: string) => void}) => { // ✅ Agregar onCardClick
  const { containerRef, width } = useResponsiveWidth();
  const navigate = useNavigate(); // ✅ Hook para navegación
  
  const { iframeSrc, height } = useMemo(() => {
    const iframeSrc = isValidFacebookUrl(post.postUrl) 
      ? buildSecureFacebookIframe(post.postUrl, width) 
      : null;
    const height = Math.round(width * 1.2);
    
    return { iframeSrc, height };
  }, [post.postUrl, width]);

  const formattedDate = useMemo(() => 
    post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('es-ES') : null,
    [post.publishedAt]
  );

  // ✅ Manejar clic en la tarjeta de Facebook
  const handleCardClick = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Navegar a la página de noticias de Facebook
    navigate('/noticiasFacebook');
    
    // También llamar al callback del padre si existe
    if (onCardClick) {
      onCardClick('cmic');
    }
  }, [navigate, onCardClick]);

  if (!iframeSrc) return null;

  return (
    <article 
      className={cmicClasses("ng-card ng-org-cmic clickable-card")} // ✅ Agregar clase clickable
      aria-label="Publicación de Facebook"
      onClick={handleCardClick} // ✅ Agregar onClick
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e);
        }
      }}
    >
      <div className={cmicClasses("ng-card-header")}>
        <span className={cmicClasses("ng-chip cmic")}>CMIC</span>
        {formattedDate && (
          <time className={cmicClasses("ng-date")} dateTime={post.publishedAt}>
            {formattedDate}
          </time>
        )}
      </div>

      <div ref={containerRef} className={cmicClasses("ng-iframe-wrap")}>
        <iframe
          title="Publicación de Facebook"
          src={iframeSrc}
          width={width}
          height={height}
          style={{ border: 0, width: '100%', display: 'block', borderRadius: '12px' }}
          scrolling="no"
          allow="encrypted-media"
          sandbox={SECURITY_CONFIG.SANDBOX_ATTRIBUTES}
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          allowFullScreen={false}
        />
      </div>
      
      {/* ✅ Overlay para mejorar la experiencia de clic */}
      <div className={cmicClasses("ng-card-overlay")} aria-hidden="true">
        <span className={cmicClasses("ng-card-overlay-text")}>Ver más noticias de CMIC</span>
      </div>
    </article>
  );
});

FacebookCard.displayName = 'FacebookCard';

const EventCard = React.memo(({ event, onCardClick }: {event: IcicEvent; onCardClick: (orgType: string) => void}) => { // ✅ Agregar onCardClick
  const navigate = useNavigate(); // ✅ Hook para navegación
  
  const { safeTitle, imgUrl } = useMemo(() => {
    const safeTitle = sanitizeString(event.title, SECURITY_CONFIG.MAX_TITLE_LENGTH);
    const rawUrl = event.coverImage?.asset?.url;
    const imgUrl = rawUrl ? getSafeImageUrl(rawUrl) : null;
    
    return { safeTitle, imgUrl };
  }, [event.title, event.coverImage]);

  const formattedDate = useMemo(() => 
    event.eventDate ? new Date(event.eventDate).toLocaleDateString('es-ES') : null,
    [event.eventDate]
  );

  // ✅ Manejar clic en la tarjeta de evento ICIC
  const handleCardClick = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Navegar a la página de cursos ICIC
    navigate('/cursosICIC');
    
    // También llamar al callback del padre si existe
    if (onCardClick) {
      onCardClick('icic');
    }
  }, [navigate, onCardClick]);

  return (
    <article 
      className={cmicClasses("ng-card ng-org-icic event-card clickable-card")} // ✅ Agregar clase clickable
      aria-label={safeTitle || 'Evento ICIC'}
      onClick={handleCardClick} // ✅ Agregar onClick
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e);
        }
      }}
    >
      <div className={cmicClasses("ng-card-header")}>
        <span className={cmicClasses("ng-chip icic")}>ICIC</span>
        {formattedDate && (
          <time className={cmicClasses("ng-date")} dateTime={event.eventDate}>
            {formattedDate}
          </time>
        )}
      </div>

      <div className={cmicClasses("ng-event-image-container")}>
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={safeTitle || 'Imagen del evento'}
            className={cmicClasses("ng-event-image-original")}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className={cmicClasses("ng-event-image-placeholder")}>📅</div>
        )}
      </div>

      <div className={cmicClasses("ng-event-content")}>
        <h4 className={cmicClasses("ng-card-title")} title={safeTitle}>
          {safeTitle || 'Evento ICIC'}
        </h4>
      </div>
      
      {/* ✅ Overlay para mejorar la experiencia de clic */}
      <div className={cmicClasses("ng-card-overlay")} aria-hidden="true">
        <span className={cmicClasses("ng-card-overlay-text")}>Ver más eventos de ICIC</span>
      </div>
    </article>
  );
});

EventCard.displayName = 'EventCard';

// ✅ Componente Card actualizado para pasar el callback
const Card = React.memo(({ item, onCardClick }: {item: NewsCarouselItem; type: string; onCardClick: (orgType: string) => void}) => 
  item.type === 'cmic' ? 
    <FacebookCard post={item} onCardClick={onCardClick} /> : 
    <EventCard event={item} onCardClick={onCardClick} />
);

Card.displayName = 'Card';

/* ===================== HOOK PERSONALIZADO PREFERS-REDUCED-MOTION ===================== */
const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mediaQuery) return;

    setPrefersReduced(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  return prefersReduced;
};

/* ===================== COMPONENTE PRINCIPAL - REPLICANDO FUNCIONALIDAD DE CONVENIOS ===================== */
export default function NoticiasGlobales() {
  const [state, setState] = useState<NewsState>({ 
    data: { cmicPosts: [], icicEvents: [] }, 
    loading: true, 
    error: '' 
  });
  
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const anim = useRef({ x: 0, speed: SECURITY_CONFIG.SCROLL_SPEED });
  const isPausedRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const prefersReduced = usePrefersReducedMotion();

  const setStateField = useCallback((updates: Partial<NewsState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  /* ============== FETCH ULTRA-OPTIMIZADO ============== */
  const fetchData = useCallback(async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    
    try {
      setStateField({ loading: true, error: '' });
      
      const result = await client.fetch<NewsData>(
        SOCIAL_POSTS_QUERY, 
        {}, 
        { 
          signal: abortControllerRef.current.signal,
          timeout: SECURITY_CONFIG.TIMEOUT 
        }
      );
      
      setStateField({
        data: {
          cmicPosts: Array.isArray(result?.cmicPosts) ? result.cmicPosts : [],
          icicEvents: Array.isArray(result?.icicEvents) ? result.icicEvents : []
        },
        loading: false
      });
      
    } catch (err) {
      if ((err instanceof Error && err.name === 'AbortError')) return;
      
      console.error('❌ NoticiasGlobales fetch error:', err);
      setStateField({ 
        error: 'No se pudieron cargar las noticias en este momento.',
        loading: false 
      });
    }
  }, [setStateField]);

  useEffect(() => {
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  /* ============== PROCESAMIENTO DE DATOS ULTRA-OPTIMIZADO ============== */
  const carouselItems = useMemo(() => {
    const { cmicPosts = [], icicEvents = [] } = state.data;
    
    const processCmicItems = cmicPosts
      .slice(0, 8)
      .map(item => ({
        ...item,
        type: 'cmic' as const,
        postUrl: item.postUrl,
        sortDate: item.publishedAt
      }))
      .filter(item => isValidFacebookUrl(item.postUrl));

    const processIcicItems = icicEvents
      .slice(0, 8)
      .map(item => ({
        ...item,
        type: 'icic' as const,
        title: sanitizeString(item.title, SECURITY_CONFIG.MAX_TITLE_LENGTH),
        sortDate: item.eventDate
      }));

    return [...processCmicItems, ...processIcicItems]
      .sort((a, b) => new Date(b.sortDate || 0).getTime() - new Date(a.sortDate || 0).getTime())
      .slice(0, SECURITY_CONFIG.MAX_ITEMS);
  }, [state.data]);

  /* ============== AUTO-SCROLL BASADO EN CONVENIOS (QUE SÍ FUNCIONA) ============== */
  const animate = useCallback(() => {
    if (isPausedRef.current || prefersReduced || !carouselRef.current || !carouselItems.length) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    
    const carousel = carouselRef.current;
    anim.current.x -= anim.current.speed;
    
    const resetAt = carousel.scrollWidth / 2;
    if (Math.abs(anim.current.x) >= resetAt) {
      anim.current.x = 0;
    }
    
    carousel.style.transform = `translateX(${anim.current.x}px)`;
    rafRef.current = requestAnimationFrame(animate);
  }, [prefersReduced, carouselItems.length]);

  // ✅ EFECTO DE ANIMACIÓN COMO EN CONVENIOS
  useEffect(() => {
    if (carouselItems.length && !prefersReduced) {
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, carouselItems.length, prefersReduced]);

  // ✅ PAUSAR SCROLL CUANDO LA VENTANA NO ESTÁ VISIBLE (COMO EN CONVENIOS)
  useEffect(() => {
    const handleVisibilityChange = () => {
      isPausedRef.current = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // ✅ MANEJO DE INTERACCIÓN DEL USUARIO (COMO EN CONVENIOS)
  const handleMouseEnter = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  const handleTouchStart = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const handleTouchEnd = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  // ✅ CALLBACK PARA CLIC EN TARJETAS (opcional, para analytics o tracking)
  const handleCardClick = useCallback((orgType: string) => {
    console.log(`Tarjeta clickeada: ${orgType}`);
    // Aquí puedes agregar analytics o tracking
  }, []);

  /* ============== RENDERIZADO ULTRA-OPTIMIZADO ============== */
  const { loading, error } = state;

  // ✅ DUPLICADO PARA LOOP CONTINUO (COMO EN CONVENIOS)
  const duplicatedCarouselItems = useMemo(() => {
    return carouselItems.map((item, index) => (
      <div 
        key={`dup-${item.type}-${item._id || index}`} 
        className={cmicClasses("ng-carousel-item")}
      >
        <Card item={item} type={item.type} onCardClick={handleCardClick} />
      </div>
    ));
  }, [carouselItems, handleCardClick]);

  const mainCarouselItems = useMemo(() => 
    carouselItems.map((item, index) => (
      <div 
        key={`${item.type}-${item._id || index}`} 
        className={cmicClasses("ng-carousel-item")}
      >
        <Card item={item} type={item.type} onCardClick={handleCardClick} />
      </div>
    )), 
    [carouselItems, handleCardClick]
  );

  if (loading) {
    return (
      <div className={cmicClasses("ng-wrapper")}>
        <div className={cmicClasses("ng-header-modern")}>
          <h2 className={cmicClasses("ng-title-modern")}>Noticias y Eventos</h2>
          <div className={cmicClasses("ng-org-buttons")}>
            <button className={cmicClasses("ng-org-btn cmic")} disabled>CMIC</button>
            <button className={cmicClasses("ng-org-btn icic")} disabled>ICIC</button>
          </div>
        </div>
        <div className={cmicClasses("ng-skeleton-carousel")}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={cmicClasses("ng-skel-card")} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cmicClasses("ng-wrapper")}>
        <div className={cmicClasses("ng-header-modern")}>
          <h2 className={cmicClasses("ng-title-modern")}>Noticias y Eventos</h2>
        </div>
        <div className={cmicClasses("ng-error-modern")}>
          <div className={cmicClasses("ng-error-icon")}>⚠️</div>
          <p>{error}</p>
          <button className={cmicClasses("ng-retry-btn")} onClick={fetchData}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const hasItems = carouselItems.length > 0;

  return (
    <div className={cmicClasses("ng-wrapper")}>
      <div className={cmicClasses("ng-header-modern")}>
        <h2 className={cmicClasses("ng-title-modern")}>Noticias y Eventos</h2>
        <div className={cmicClasses("ng-org-buttons")}>
          <Link className={cmicClasses("more-courses-btn home-action")} to="/noticiasFacebook">CMIC</Link>
          <Link className={cmicClasses("more-courses-btn home-action")} to="/cursosICIC">ICIC</Link>
        </div>
      </div>

      {!hasItems ? (
        <div className={cmicClasses("ng-empty-state")}>
          <div className={cmicClasses("ng-empty-icon")}>📰</div>
          <p>No hay publicaciones disponibles</p>
        </div>
      ) : (
        <div 
          className={cmicClasses("ng-carousel-container")} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >        
          <div 
            className={cmicClasses("ng-carousel-track")} 
            ref={carouselRef}
            style={{ 
              display: 'flex',
              willChange: 'transform',
              userSelect: 'none',
            }}
          >
            {mainCarouselItems}
            {duplicatedCarouselItems}
          </div>
        </div>
      )}
    </div>
  );
}
