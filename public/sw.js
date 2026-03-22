// AHRENA Service Worker
// Mise à jour silencieuse : skipWaiting automatique à l'install
// Le nouveau SW prend le contrôle au prochain chargement naturel de la page
const CACHE_NAME = 'ahrena-v' + (self.__APP_VERSION__ || '1');
const STATIC_CACHE = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE))
  );
  // Activation immédiate — pas d'attente, pas de bannière
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
      ),
      clients.claim(),
    ])
  );
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
          if (res?.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, res.clone()));
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
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, res.clone()));
        return res;
      }).catch(() => undefined);
    })
  );
});
