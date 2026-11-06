import { cmicClasses } from '../styles/recipes';
import type { Service } from '../types/content';
// src/components/PWAUpdateNotifier.js
import React, { useEffect, useState, useRef } from 'react';
const TRUSTED_ORIGINS = [
  window.location.origin, // tu dominio actual
  'https://cmicags.com',  // puedes agregar dominios autorizados
];

const PWAUpdateNotifier = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.ready
      .then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
              setWaitingWorker(newWorker);
            }
          });
        });
      })
      .catch((err) => console.error('Error al verificar el Service Worker:', err));

    // 🛡️ Escuchar mensajes solo de orígenes de confianza
    const handleMessage = (event: MessageEvent<unknown>) => {
      try {
        if (!event.origin || !TRUSTED_ORIGINS.includes(event.origin)) {
          console.warn('Mensaje rechazado por origen no confiable:', event.origin);
          return;
        }

        const data = event.data;
        if (data && typeof data === 'object' && 'type' in data && data.type === 'UPDATE_AVAILABLE') {
          setUpdateAvailable(true);
        }
      } catch (err) {
        console.error('Error procesando mensaje del Service Worker:', err);
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);

    // Limpieza al desmontar el componente
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (updateAvailable && notificationRef.current) {
      notificationRef.current.classList.add('animate-in');
    }
  }, [updateAvailable]);

  const animateOut = (callback: () => void) => {
    const element = notificationRef.current;
    if (!element) return;

    element.classList.remove('animate-in');
    element.classList.add('animate-out');
    setTimeout(callback, 400);
  };

  const reloadPage = () => {
    animateOut(() => {
      waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
      setUpdateAvailable(false);
      window.location.reload();
    });
  };

  const dismissNotification = () => {
    animateOut(() => setUpdateAvailable(false));
  };

  if (!updateAvailable) return null;

  return (
    <div ref={notificationRef} className={cmicClasses("pwa-update-notification")}>
      <div className={cmicClasses("update-content")}>
        <div className={cmicClasses("update-header")}>
          <div className={cmicClasses("update-icon")} aria-hidden="true">🎉</div>
          <h3>¡Nueva versión disponible!</h3>
          <button
            className={cmicClasses("close-btn")}
            onClick={dismissNotification}
            aria-label="Cerrar notificación"
          >
            ×
          </button>
        </div>

        <p>
          La página de CMIC Aguascalientes tiene nuevas noticias. ¡Sé el primero en enterarte!
        </p>

        <div className={cmicClasses("update-actions")}>
          <button onClick={reloadPage} className={cmicClasses("btn btn-primary update-btn")}>
            <span className={cmicClasses("btn-icon")} aria-hidden="true">🔄</span>
            Actualizar ahora
          </button>
          <button onClick={dismissNotification} className={cmicClasses("btn btn-secondary")}>
            Más tarde
          </button>
        </div>

        <div className={cmicClasses("update-progress")}>
          <div className={cmicClasses("progress-bar")}></div>
        </div>
      </div>
    </div>
  );
};

export default PWAUpdateNotifier;
