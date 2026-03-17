import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ── Enregistrement Service Worker avec mise à jour automatique ──
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {

      // Vérifie une mise à jour toutes les 60 secondes
      setInterval(() => reg.update(), 60 * 1000);
      // Vérifie aussi à chaque fois que l'app reprend le focus
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') reg.update();
      });

      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Nouvelle version prête — affiche le banner
            showUpdateBanner(newWorker);
          }
        });
      });

    }).catch(err => console.error('[SW] Erreur:', err));

    // Recharge quand le SW change de contrôleur
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  });
}

function showUpdateBanner(worker: ServiceWorker) {
  // Supprimer un éventuel banner existant
  document.getElementById('ahrena-update-banner')?.remove();

  const banner = document.createElement('div');
  banner.id = 'ahrena-update-banner';
  banner.innerHTML = `
    <div style="
      position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
      z-index: 99999; background: #dc2626; color: white;
      padding: 12px 20px; border-radius: 12px;
      font-family: sans-serif; font-size: 13px; font-weight: 800;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      display: flex; align-items: center; gap: 12px;
      white-space: nowrap; letter-spacing: 0.05em; text-transform: uppercase;
      animation: slideUp 0.3s ease;
    ">
      <span>🔄 Mise à jour disponible</span>
      <button onclick="this.closest('#ahrena-update-banner').__activate()" style="
        background: white; color: #dc2626; border: none; cursor: pointer;
        padding: 6px 14px; border-radius: 8px; font-weight: 900;
        font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;
      ">Mettre à jour</button>
    </div>
    <style>
      @keyframes slideUp { from { opacity:0; transform: translateX(-50%) translateY(20px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
    </style>
  `;
  (banner as any).__activate = () => {
    worker.postMessage({ type: 'SKIP_WAITING' });
    banner.remove();
  };
  document.body.appendChild(banner);

  // Auto-update après 10 secondes si l'utilisateur n'a pas cliqué
  setTimeout(() => {
    if (document.getElementById('ahrena-update-banner')) {
      worker.postMessage({ type: 'SKIP_WAITING' });
      banner.remove();
    }
  }, 10000);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
