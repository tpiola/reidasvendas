/* Service worker — Rei das Vendas
 * Estratégia:
 *  - navegação (HTML): network-first, com fallback para o app shell em cache (offline);
 *  - assets estáticos versionados (js/css/svg/png/woff): cache-first;
 *  - vídeos e requisições cross-origin: ignorados (vão direto à rede).
 */
const CACHE = 'rdv-v1';
const SHELL = '/';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.add(SHELL).catch(() => {});
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/videos/')) return;

  // Navegação SPA: sempre tenta a rede, cai para o shell em cache se offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          const cache = await caches.open(CACHE);
          return (await cache.match(SHELL)) || Response.error();
        }
      })()
    );
    return;
  }

  // Assets estáticos: cache-first com atualização em segundo plano.
  if (/\.(?:css|js|mjs|svg|png|jpe?g|webp|avif|woff2?)$/.test(url.pathname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      })()
    );
  }
});
