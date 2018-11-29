const cacheName = 'shell-content';
const filesToCache = [
  '/styles/inline.css',
  'app.js'
];

self.addEventListener('install', e =>
{
  console.log('[SeviceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(cache =>
      {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
  );
});