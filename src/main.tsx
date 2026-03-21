import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';


// ── Service Worker : mise à jour via bannière utilisateur ─────
// L'activation du nouveau SW est déclenchée UNIQUEMENT par le bouton
// "Mettre à jour" dans la bannière (App.tsx → handleUpdate)
// pour éviter des rechargements intempestifs et la bannière en boucle.
if ('serviceWorker' in navigator) {

  // Rechargement automatique quand le SW actif change
  // (déclenché uniquement après SKIP_WAITING via handleUpdate)
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {

      // Déclenche une vérification au retour au premier plan
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
