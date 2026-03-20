import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ── Injecter l'App ID OneSignal depuis les variables d'environnement ──
// Doit être fait AVANT que OneSignalDeferred s'exécute
(window as any).__ONESIGNAL_APP_ID__ = import.meta.env.VITE_ONESIGNAL_APP_ID || '';

// ── Service Worker : mise à jour automatique et silencieuse ────
if ('serviceWorker' in navigator) {

  // Rechargement silencieux quand le SW actif change
  // Déclaré en dehors de 'load' pour capter l'événement à coup sûr
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {

      // Force l'activation d'un SW en attente
      const activateWaiting = (worker: ServiceWorker | null) => {
        if (!worker) return;
        worker.postMessage({ type: 'SKIP_WAITING' });
      };

      // Cas 1 : un SW est déjà en 'waiting' à l'arrivée (cas iOS fréquent)
      if (reg.waiting) {
        activateWaiting(reg.waiting);
      }

      // Cas 2 : un nouveau SW est trouvé pendant la session
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Nouveau SW installé + un SW actif existe → mise à jour silencieuse
            activateWaiting(newWorker);
          }
        });
      });

      // Déclenche une vérification au retour au premier plan (ouverture de l'app)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') reg.update();
      });

      // Déclenche aussi à la reconnexion réseau
      window.addEventListener('online', () => reg.update());

    }).catch(err => console.error('[SW] Erreur:', err));
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
