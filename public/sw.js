// ── Version du cache — mise à jour à chaque déploiement ──
// La version est basée sur l'heure de build injectée par Vite
const CACHE_NAME = 'ahrena-v' + (self.__APP_VERSION__ || '1');

// Fichiers shell minimaux à précacher
const STATIC_CACHE = ['/', '/index.html', '/manifest.json'];

// ── Installation : précache SANS skipWaiting ────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE))
  );
});

// ── Activation : nettoie les anciens caches et prend le contrôle ─
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
      ),
      clients.claim(),
    ]).then(() => {
      clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clientList => {
        clientList.forEach(client => {
          client.postMessage({ type: 'SW_UPDATED' });
        });
      });
    })
  );
});

// ── Message depuis l'app ─────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ── Fetch : Network First pour HTML/JS/CSS, Cache First pour images ─
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  const url = new URL(event.request.url);

  // Network First : HTML, JS, CSS (toujours la dernière version)
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

  // Cache First : images et autres ressources statiques
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

// ── Clic notification → ouvre l'app ───────────────────────────
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
