import { cmicClasses } from '../styles/recipes';
import cmic from '../lib/cmic.jpg';

const EMAIL = 'presidenciacmic@cmicags.mx';
const PHONE = '+524491454288';
const WHATSAPP = '5214494401155';
const message = 'Hola, me gustaría obtener información sobre CMIC Aguascalientes y sus servicios. ¿Podrían orientarme?';
const emailBody = 'Hola, me gustaría recibir información de CMIC Aguascalientes.\n\nNombre:\nEmpresa:\nTeléfono:\nConsulta:\n\nGracias.';

export default function ContactForm() {
  return (
    <article id="contacto" className={`${cmicClasses('afi-contact')} tw:my-8! tw:p-5! tw:sm:p-8!`} aria-labelledby="contact-heading">
      <div className={`${cmicClasses('afi-contact-content')} tw:grid-cols-1! tw:min-[1024px]:grid-cols-2!`}>
        <div>
          <div className={cmicClasses('afi-contact-badge')}>Estamos para ayudarte</div>
          <h2 id="contact-heading" className={cmicClasses('afi-contact-title')}>¡Contáctanos!</h2>
          <p className={cmicClasses('afi-contact-subtitle')}>
            Resolvemos tus dudas sobre los servicios de CMIC Aguascalientes.
          </p>
          <div className={cmicClasses('afi-contact-info')}>
            <div className={cmicClasses('afi-contact-item')}>
              <span className={cmicClasses('contact-icon')} aria-hidden="true">📧</span>
              <a href={`mailto:${EMAIL}`} className={`${cmicClasses('afi-contact-link')} tw:min-w-0 tw:break-words`}>{EMAIL}</a>
            </div>
            <div className={cmicClasses('afi-contact-item')}>
              <span className={cmicClasses('contact-icon')} aria-hidden="true">📞</span>
              <a href={`tel:${PHONE}`} className={cmicClasses('afi-contact-link')}>449 145 4288</a>
              <span className={cmicClasses('afi-note')}>(al 93)</span>
            </div>
          </div>
          <div className={`${cmicClasses('afi-actions')} tw:flex-col tw:sm:flex-row tw:[&_a]:min-w-0 tw:[&_a]:justify-center`} role="group" aria-label="Opciones de contacto">
            <a className={cmicClasses('btn btn-primary')} href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">
              <span className={cmicClasses('btn-icon')} aria-hidden="true">💬</span>
              Contactar por WhatsApp
            </a>
            <a className={cmicClasses('btn btn-secondary')} href={`mailto:${EMAIL}?subject=${encodeURIComponent('CMIC Aguascalientes - Solicitud de información')}&body=${encodeURIComponent(emailBody)}`}>
              <span className={cmicClasses('btn-icon')} aria-hidden="true">✉️</span>
              Enviar correo
            </a>
            <a className={cmicClasses('btn btn-tertiary')} href={`tel:${PHONE}`}>
              <span className={cmicClasses('btn-icon')} aria-hidden="true">☎️</span>
              Llamar
            </a>
          </div>
        </div>
        <div className={cmicClasses('afi-contact-media')}>
          <div className={cmicClasses('afi-contact-image-container')}>
            <img src={cmic} alt="Sede de CMIC Aguascalientes" className={cmicClasses('afi-contact-image')} loading="lazy" decoding="async" width="400" height="300" />
          </div>
        </div>
      </div>
    </article>
  );
}
