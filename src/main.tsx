import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ── Enregistrement Service Worker avec détection de mise à jour ──
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {

      // Vérifie si une mise à jour est disponible toutes les 30 secondes
      setInterval(() => reg.update(), 30 * 1000);

      // Quand un nouveau SW est trouvé
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          // Le nouveau SW est installé et prêt
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('[SW] Nouvelle version disponible, activation...');
            // Force le nouveau SW à prendre le contrôle
            newWorker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });

    }).catch(err => console.error('[SW] Erreur enregistrement:', err));

    // Quand le SW change de contrôleur → recharge UNE seule fois
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      console.log('[SW] Nouveau contrôleur, rechargement...');
      window.location.reload();
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
