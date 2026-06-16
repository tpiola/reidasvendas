/* Service Worker — Rei das Vendas */
/* Cache-first for static assets, network-first for navigation */

const CACHE_NAME = 'reidasvendas-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/logo.svg',
  '/logo-icon.svg',
  '/pwa-192.svg',
  '/pwa-512.svg',
  '/manifest.webmanifest',
];

const RUNTIME_CACHE = 'reidasvendas-runtime-v1';

/* ─── INSTALL ─── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        /* Pre-cache best-effort; some assets may 404 in dev */
      });
    })
  );
  self.skipWaiting();
});

/* ─── ACTIVATE ─── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ─── FETCH ─── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  /* Skip non-GET and cross-origin */
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  /* ── Static assets: cache-first ── */
  if (
    /\.(js|css|svg|png|jpg|jpeg|webp|gif|woff2?|ttf|eot|mp4|webm|ico)$/i.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  /* ── Navigation: network-first ── */
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  /* ── Everything else: stale-while-revalidate ── */
  event.respondWith(staleWhileRevalidate(request));
});

/* ─── STRATEGIES ─── */

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 408, statusText: 'Offline' });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    /* Fallback to cached index.html for SPA */
    const fallback = await caches.match('/index.html');
    if (fallback) return fallback;
    return new Response('Offline', { status: 408 });
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, response.clone()));
    }
    return response;
  }).catch(() => cached);
  return cached || fetchPromise;
}
