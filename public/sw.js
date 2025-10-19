// const CACHE_NAME = 'plock-pwa-v1';
// const PRECACHE_URLS = [
//   '/',
//   '/index.html',
//   '/src/main.tsx'
// ];

// self.addEventListener('install', (event) => {
//   self.skipWaiting();
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
//   );
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((keys) =>
//       Promise.all(
//         keys.map((key) => {
//           if (key !== CACHE_NAME) return caches.delete(key);
//         })
//       )
//     )
//   );
//   self.clients.claim();
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cached) => cached || fetch(event.request))
//   );
// });
