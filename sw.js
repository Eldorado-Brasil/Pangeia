/* Painel de Vistoria de Campo — service worker (offline)
   Ao publicar uma versão nova do index.html, troque o número da versão abaixo
   (ex.: v1 -> v2) para forçar a atualização do cache nos aparelhos. */
const CACHE = 'vistoria-campo-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const accept = req.headers.get('accept') || '';
  const isPage = req.mode === 'navigate' || accept.includes('text/html');

  if (isPage) {
    // network-first para a página (pega atualizações quando online), cache como reserva offline
    e.respondWith(
      fetch(req)
        .then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); return r; })
        .catch(() => caches.match(req).then((m) => m || caches.match('./index.html')))
    );
    return;
  }

  // demais recursos (fontes, ícones, etc.): cache-first e guarda em runtime
  e.respondWith(
    caches.match(req).then((m) => m || fetch(req).then((r) => {
      if (r && (r.status === 200 || r.type === 'opaque')) {
        const cp = r.clone();
        caches.open(CACHE).then((c) => c.put(req, cp));
      }
      return r;
    }).catch(() => m))
  );
});
