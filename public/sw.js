// AHRENA Service Worker - Cache uniquement
// Les notifications push sont gerees par OneSignalSDKWorker.js
const CACHE_NAME = 'ahrena-v' + (self.__APP_VERSION__ || '1');
const STATIC_CACHE = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      // Détecter si un ancien cache existait (= vraie mise à jour, pas premier install)
      const oldCaches = keys.filter(k => k !== CACHE_NAME);
      const isRealUpdate = oldCaches.length > 0;
      return Promise.all([
        ...oldCaches.map(k => caches.delete(k)),
        clients.claim(),
      ]).then(() => {
        // N'envoyer SW_UPDATED que si c'est une vraie mise à jour (pas le premier install)
        if (!isRealUpdate) return;
        clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clientList => {
          clientList.forEach(client => {
            client.postMessage({ type: 'SW_UPDATED', version: CACHE_NAME });
          });
        });
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  // Répondre avec la version du SW (pour que le client sache quelle version est en attente)
  if (event.data && event.data.type === 'GET_VERSION') {
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({ version: CACHE_NAME });
    }
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  const url = new URL(event.request.url);

  if (
    url.pathname === '/' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css')
  ) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (!res || res.status !== 200 || res.type !== 'basic') return res;
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return res;
      }).catch(() => {});
    })
  );
});
