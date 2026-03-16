const CACHE_NAME = 'ahrena-cache-v2';
const urlsToCache = ['/', '/index.html', '/manifest.json'];

// ── Installation ──────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
  self.skipWaiting();
});

// ── Activation ────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  event.waitUntil(clients.claim());
});

// ── Fetch (cache réseau) ──────────────────────────────────────
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(res => {
        if (!res || res.status !== 200 || res.type !== 'basic') return res;
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return res;
      }).catch(() => {});
    })
  );
});

// ── Push Notifications ────────────────────────────────────────
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

// ── Clic sur notification → ouvre l'app ──────────────────────
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
