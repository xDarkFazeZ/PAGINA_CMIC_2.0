import { cmicClasses } from '../styles/recipes';
import type { PrensaPost, SocialPost } from '../types/content';
// src/components/Noticias.js
import React, { useState, useEffect, useRef, useMemo } from "react";
import { client } from "../lib/sanity";
/* ===== COMPONENTE NOTICIAS PRENSA ===== */
const PRENSA_QUERY = `*[_type == "prensaPost"] | order(publishDate desc) {
  _id,
  title,
  slug,
  summary,
  content,
  publishDate,
  coverImage {
    asset -> {
      _id,
      url
    },
    alt
  },
  externalLink
}`;

const NoticiasPrensa = () => {
    const [posts, setPosts] = useState<PrensaPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await client.fetch<PrensaPost[]>(PRENSA_QUERY);
                setPosts(data);
            } catch (err) {
                setError('Error al cargar las noticias de prensa');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className={cmicClasses("noticias-prensa")}>
                <div className={cmicClasses("loading")}>Cargando noticias de prensa...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={cmicClasses("noticias-prensa")}>
                <div className={cmicClasses("error")}>{error}</div>
            </div>
        );
    }

    return (
        <div className={cmicClasses("noticias-prensa")}>
            <header className={cmicClasses("prensa-header")}>
                <h2>Noticias de Prensa</h2>
                <p>Las últimas noticias y menciones en medios de comunicación</p>
            </header>

            <div className={cmicClasses("prensa-list")}>
                {posts?.map((post) => (
                    <article key={post._id} className={cmicClasses("prensa-item")}>
                        <div className={cmicClasses("prensa-fecha")}>
                            {formatDate(post.publishDate)}
                        </div>

                        <div className={cmicClasses("prensa-content-wrapper")}>
                            {post.coverImage && (
                                <div className={cmicClasses("prensa-imagen")}>
                                    <img
                                        src={post.coverImage.asset.url || ""}
                                        alt={post.coverImage.alt || post.title}
                                    />
                                </div>
                            )}

                            <div className={cmicClasses("prensa-content")}>
                                <h3 className={cmicClasses("prensa-titulo")}>
                                    <a href={post.externalLink} target="_blank" rel="noopener noreferrer">
                                        {post.title}
                                    </a>
                                </h3>

                                {post.summary && (
                                    <p className={cmicClasses("prensa-resumen")}>{post.summary}</p>
                                )}

                                <div className={cmicClasses("prensa-acciones")}>
                                    <a
                                        href={post.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cmicClasses("leer-mas")}
                                    >
                                        Leer más →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

/* ===== COMPONENTE NOTICIAS FACEBOOK ===== */

/* ===== Seguridad: URL + Texto ===== */
const sanitizeText = (s: unknown, n = 180) =>
  String(s || "").replace(/[<>]/g, "").slice(0, n);

const isSafeFacebookUrl = (url: string) => {
  try {
    const u = new URL(url);
    const allowed = ["www.facebook.com", "facebook.com", "m.facebook.com"];
    return u.protocol === "https:" && allowed.includes(u.hostname);
  } catch {
    return false;
  }
};

/* ===== Query ===== */
const CMIC_POSTS_QUERY = `*[_type == "cmicPost"] | order(publishedAt desc){
  _id, title, postUrl, publishedAt
}`;

/* ===== Hook responsive ===== */
function useResponsiveWidth(min = 320, max = 600) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(max);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setWidth(Math.min(max, Math.max(min, el.clientWidth || max)));
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [min, max]);

  return { containerRef: ref, width };
}

/* ===== iframe Facebook seguro ===== */
const buildFbIframeSrc = (postUrl: string, width: number) => {
  if (!isSafeFacebookUrl(postUrl)) return "";
  const base = "https://www.facebook.com/plugins/post.php";
  const params = new URLSearchParams({
    href: postUrl,
    show_text: "true",
    width: String(width),
    lazy: "true",
    adapt_container_width: "true",
  });
  return `${base}?${params.toString()}`;
};

/* ===== Tarjeta individual ===== */
const FacebookCard = React.memo(function FacebookCard({ post }: {post: SocialPost}) {
  const { containerRef, width } = useResponsiveWidth(320, 600);
  const src = useMemo(() => buildFbIframeSrc(post.postUrl, width), [post.postUrl, width]);
  const height = Math.round(width * 1.05);

  if (!src) return null;

  return (
    <article className={cmicClasses("fb-card")} aria-label="Publicación de Facebook">
      <div className={cmicClasses("fb-media")} ref={containerRef}>
        <iframe
          title={`Publicación de Facebook: ${sanitizeText(post.title)}`}
          src={src}
          width={width}
          height={height}
          loading="lazy"
          style={{
            border: 0,
            width: "100%",
            display: "block",
            borderRadius: "var(--radius-xl)",
          }}
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <header className={cmicClasses("fb-head")}>
        <span className={cmicClasses("fb-badge")}>CMIC · Facebook</span>
        <h4 className={cmicClasses("fb-title text-subtitulo")}>{sanitizeText(post.title)}</h4>
      </header>
      {isSafeFacebookUrl(post.postUrl) && (
        <a
          className={cmicClasses("fb-link")}
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver en Facebook
        </a>
      )}
    </article>
  );
});

const NoticiasFacebook = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [status, setStatus] = useState("loading");
  const carruselInnerRef = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);
  const [offset, setOffset] = useState(0);
  const speed = 0.25;

  /* ==== Fetch posts ==== */
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await client.fetch<SocialPost[]>(CMIC_POSTS_QUERY, {}, { timeout: 8000 });
        if (!active) return;
        const safePosts = Array.isArray(data)
          ? data.filter((p) => isSafeFacebookUrl(p.postUrl))
          : [];
        setPosts(safePosts);
        setStatus("ok");
      } catch (e) {
        console.error("[FacebookPosts] Error:", e);
        if (active) setStatus("error");
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  /* ==== Carrusel animado con pausa fuera de pantalla ==== */
  useEffect(() => {
    if (!posts.length || !carruselInnerRef.current) return;

    let last = 0;
    const tick = (t: number) => {
      if (!last) last = t;
      const dt = t - last;
      last = t;
      setOffset((o) => {
        const width = (carruselInnerRef.current?.scrollWidth || 0) / 3 || 0;
        const n = o + (speed * dt) / 16;
        return n >= width ? n - width : n;
      });
      frame.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) frame.current = requestAnimationFrame(tick);
        else cancelAnimationFrame(frame.current || 0);
      },
      { threshold: 0.1 }
    );

    observer.observe(carruselInnerRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current || 0);
    };
  }, [posts]);

  /* ==== Render states ==== */
  const displayPosts = useMemo(
    () => (posts.length ? [...posts, ...posts, ...posts] : []),
    [posts]
  );

  if (status === "loading")
    return (
      <div className={cmicClasses("noticias-facebook")}>
        <div className={cmicClasses("fb-loading")}>
          <div className={cmicClasses("fb-loading-spinner")} />
          <p className={cmicClasses("text-normal")}>Cargando publicaciones de Facebook...</p>
        </div>
      </div>
    );

  if (status === "error")
    return (
      <div className={cmicClasses("noticias-facebook")}>
        <div className={cmicClasses("fb-error")}>
          <div className={cmicClasses("fb-error-icon")}>⚠️</div>
          <p>No se pudieron cargar las publicaciones de Facebook.</p>
          <button
            onClick={() => window.location.reload()}
            className={cmicClasses("fb-retry-btn")}
          >
            Reintentar
          </button>
        </div>
      </div>
    );

  if (!posts.length)
    return (
      <div className={cmicClasses("noticias-facebook")}>
        <div className={cmicClasses("fb-empty")}>
          <p>No hay publicaciones recientes disponibles en Facebook.</p>
        </div>
      </div>
    );

  /* ==== Render final ==== */
  return (
    <div className={cmicClasses("noticias-facebook")}>
      <header className={cmicClasses("facebook-header")}>
        <h2>Noticias de Facebook</h2>
        <p>Últimas publicaciones de CMIC Aguascalientes</p>
        {posts.length > 0 && (
          <div className={cmicClasses("fb-stats")}>
            <span>
              {posts.length} publicación{posts.length !== 1 ? "es" : ""} reciente
              {posts.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </header>

      <section className={cmicClasses("fb-wrap")} aria-label="Carrusel de publicaciones de Facebook">
        <div className={cmicClasses("fb-carrusel")}>
          <div
            className={cmicClasses("fb-carrusel-inner")}
            ref={carruselInnerRef}
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {displayPosts.map((post, i) => (
              <div className={cmicClasses("fb-carrusel-item")} key={`${post._id}-${i}`}>
                <FacebookCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={cmicClasses("fb-cta-section")}>
        <div className={cmicClasses("fb-cta-content")}>
          <div className={cmicClasses("fb-cta-icon")}>👍</div>
          <h3 className={cmicClasses("text-subtitulo")}>¿Te gustaron nuestras publicaciones?</h3>
          <p>
            Síguenos en Facebook para no perderte ninguna actualización, evento o noticia
            importante de CMIC Aguascalientes.
          </p>
          <a
            href="https://www.facebook.com/cmicaguascalientes"
            target="_blank"
            rel="noopener noreferrer"
            className={cmicClasses("fb-follow-btn")}
          >
            <span className={cmicClasses("fb-btn-icon")}>📱</span> Seguir en Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

/* ===== COMPONENTE PRINCIPAL NOTICIAS ===== */
export default function Noticias() {
  const [activeSection, setActiveSection] = useState("prensa");

  return (
    <div className={cmicClasses("noticias-page")}>
      <header className={cmicClasses("noticias-main-header")}>
        <h1>Noticias</h1>
        <p>Mantente informado con las últimas noticias y publicaciones de CMIC Aguascalientes</p>
      </header>

      {/* Navegación entre secciones */}
      <nav className={cmicClasses("noticias-nav")}>
        <button 
          className={cmicClasses(`nav-button ${activeSection === "prensa" ? "active" : ""}`)}
          onClick={() => setActiveSection("prensa")}
        >
          Noticias de Prensa
        </button>
        <button 
          className={cmicClasses(`nav-button ${activeSection === "facebook" ? "active" : ""}`)}
          onClick={() => setActiveSection("facebook")}
        >
          Noticias de Facebook
        </button>
      </nav>

      {/* Contenido de las secciones */}
      <div className={cmicClasses("noticias-content")}>
        {activeSection === "prensa" && <NoticiasPrensa />}
        {activeSection === "facebook" && <NoticiasFacebook />}
      </div>
    </div>
  );
}
