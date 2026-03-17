// ── Version du cache — Vite remplace __APP_VERSION__ au build ──
const CACHE_NAME = 'ahrena-v__APP_VERSION__';

// Fichiers à mettre en cache minimal (shell de l'app)
const STATIC_CACHE = ['/', '/index.html', '/manifest.json'];

// ── Installation ───────────────────────────────────────────────
self.addEventListener('install', (event) => {
  // skipWaiting : le nouveau SW prend le contrôle immédiatement
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE))
  );
});

// ── Activation : supprime tous les anciens caches ──────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Supprime TOUS les anciens caches
      caches.keys().then(keys =>
        Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
      ),
      // Prend le contrôle de tous les clients immédiatement
      clients.claim(),
    ])
  );
});

// ── Fetch : Network First pour JS/CSS, Cache First pour images ─
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  const url = new URL(event.request.url);

  // Toujours aller chercher sur le réseau pour les fichiers JS/CSS/HTML
  // (les fichiers buildés par Vite ont des hashes dans leur nom)
  if (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname === '/' ||
    url.pathname.endsWith('.html')
  ) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          // Met en cache la nouvelle version
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(event.request)) // Fallback cache si hors ligne
    );
    return;
  }

  // Pour les images et autres ressources statiques : Cache First
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

// ── Message : forcer la mise à jour depuis l'app ───────────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ── Push Notifications ─────────────────────────────────────────
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  const options = {
    body: data.body || '',
    icon: 'https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_application_2.jpg?v=1773420195',
    badge: 'https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_application_2.jpg?v=1773420195',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: data.actions || [],
    tag: data.tag || 'ahrena-notif',
    renotify: true,
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'AHRENA', options)
  );
});

// ── Clic sur notification → ouvre l'app ───────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
