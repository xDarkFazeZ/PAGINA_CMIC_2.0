import { cmicClasses } from '../styles/recipes';
import { useState } from 'react';
import ejemploImg from '../lib/cmic.jpg';
import ContactForm from '../components/ContactForm';

export default function Nosotros() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  /* ===================== Imagen hero ===================== */
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <main className={cmicClasses("nosotros-container")} role="main" aria-label="Información sobre nosotros">
      <section className={cmicClasses("nosotros-section")}>
        {/* Panel 1: Nosotros + Nuestro Trabajo (visible de inmediato) */}
        <article className={cmicClasses("panel panel-nosotros")} aria-labelledby="nosotros-heading">
          <div className={cmicClasses("nosotros-grid")}>
            <div className={cmicClasses("nosotros-texto")}>
              <h1 id="nosotros-heading">Nosotros</h1>
              <p>
                La <span className={cmicClasses("resaltado")}>Cámara Mexicana de la Industria de la Construcción (CMIC)</span> es un
                organismo empresarial de interés público, autónomo y con representación en todo el país. En la Delegación
                Aguascalientes representamos a las empresas constructoras locales, defendiendo sus intereses y fomentando el
                desarrollo sostenible de la industria.
              </p>
            </div>

            <div className={cmicClasses("nosotros-imagen")}>
              <img
                src={ejemploImg}
                alt="Representación visual de la Cámara Mexicana de la Construcción"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ opacity: imageLoaded ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
              />
              {!imageLoaded && !imageError && (
                <div className={cmicClasses("image-placeholder")} aria-label="Cargando imagen...">
                  <span>Cargando imagen...</span>
                </div>
              )}
              {imageError && (
                <div className={cmicClasses("image-fallback")} aria-label="Imagen no disponible">
                  <span>Imagen no disponible</span>
                </div>
              )}
            </div>
          </div>

          <div className={cmicClasses("nuestro-trabajo")}>
            <h2 id="trabajo-heading">Nuestro Trabajo</h2>
            <ul className={cmicClasses("nosotros-lista")} aria-labelledby="trabajo-heading">
              <li>
                <strong>Capacitación y certificación:</strong> a través del ICIC.
              </li>
              <li>
                <strong>Vinculación empresarial:</strong> generamos oportunidades de negocio.
              </li>
              <li>
                <strong>Asesoría técnica, legal y administrativa:</strong> respaldo integral.
              </li>
              <li>
                <strong>Gestión y representación:</strong> ante autoridades y organismos.
              </li>
            </ul>

            <p className={cmicClasses("mensaje-final")}>
              Creemos en una <span className={cmicClasses("resaltado")}>construcción responsable, innovadora</span> y comprometida con el
              desarrollo económico, social y ambiental de nuestro estado.
            </p>
          </div>
        </article>

        {/* Panel 2: Principios (visible de inmediato) */}
        <article className={cmicClasses("panel panel-mv")} aria-labelledby="principios-heading">
          <h2 id="principios-heading" className={cmicClasses("panel-title")}>
            Nuestros Principios
          </h2>
          <div className={cmicClasses("valores-container")}>
            <section className={cmicClasses("valor-card")} aria-labelledby="mision-heading">
              <h3 id="mision-heading">Misión</h3>
              <p>
                Agrupar y organizar a los empresarios de la construcción, representando sus intereses, fomentando su
                productividad, apoyando su crecimiento y contribuyendo con responsabilidad al desarrollo y competitividad del
                país
              </p>
            </section>

            <section className={cmicClasses("valor-card valor-card-vision")} aria-labelledby="vision-heading">
              <h3 id="vision-heading">Visión</h3>
              <div className={cmicClasses("vision-section")}>
                <p className={cmicClasses("vision-parrafo")}>
                  <strong>Haya el exterior:</strong> Desarrollar oportunidades y fomentar la inversión, proponiendo cambios
                  regulatorios; proporcionar conocimiento del mercado con servicios especializados; definir la estructura del
                  sector; facilitar la integración de cadenas productivas de financiamiento.
                </p>
                <p className={cmicClasses("vision-parrafo")}>
                  <strong>Hacia el interior:</strong> Redimensionar la estructura administrativa, con mejora de servicios;
                  institucionalizar con buena imagen y comunicación; y reforzar la presencia del sector ante clientes y
                  oportunidades.
                </p>
              </div>
            </section>

            <section className={cmicClasses("valor-card")} aria-labelledby="objetivos-heading">
              <h3 id="objetivos-heading">Objetivos</h3>
              <ul>
                <li>Fortalecer la competitividad</li>
                <li>Promover capacitación</li>
                <li>Impulsar innovación</li>
                <li>Representar intereses del sector</li>
                <li>Fomentar ética empresarial</li>
              </ul>
            </section>
          </div>
        </article>

        <ContactForm />
      </section>
    </main>
  );
}
