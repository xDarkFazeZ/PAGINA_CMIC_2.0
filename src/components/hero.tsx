import { cmicClasses } from '../styles/recipes';
import React from "react";
// ✅ WebP para mejor compresión (si está disponible)
import fondoImage from "../lib/fondo4.jpg";
// Si tienes versión WebP: import fondoImageWebP from "../lib/fondo4.webp";

const HERO_CONFIG = Object.freeze({
  title: "Cámara Mexicana de la Industria de la Construcción",
  subtitle: "Servir al asociado. Nuestra razón de ser.",
  ariaLabel: "Sección principal Cámara Mexicana de la Industria de la Construcción",
  backgroundImage: `url(${fondoImage})`
});

// ✅ Pre-loading mejorado con prioridad
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = fondoImage;
  link.fetchPriority = 'high';
  document.head.appendChild(link);
}

const Hero = React.memo(() => {
  return (
    <section
      className={cmicClasses("hero")}
      style={{ backgroundImage: HERO_CONFIG.backgroundImage }}
      aria-label={HERO_CONFIG.ariaLabel}
      role="banner"
    >
      {/* ✅ Contenedor de imagen para LCP */}
      <img 
        src={fondoImage} 
        alt="" 
        className={cmicClasses("hero-bg-image")}
        loading="eager"
        decoding="async"
        aria-hidden="true"
      />
      
      <div className={cmicClasses("hero-contenido container tw:flex tw:flex-col tw:items-center tw:gap-4")}>
        <h1 className={cmicClasses("hero-titulo")}>
          {HERO_CONFIG.title}
        </h1>
        <h2 className={cmicClasses("hero-subtitulo")}>
          {HERO_CONFIG.subtitle}
        </h2>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
