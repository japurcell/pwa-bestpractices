const cacheName = 'my-site-cache-v1';
const filesToCache = [
  '/',
  '/styles/inline.css',
  '/node_modules/material-design-lite/material.min.css',
  '/node_modules/material-design-lite/material.min.js',
  '/scripts/app.js'
];

const logSw = msg =>
  console.log(`[ServiceWorker] ${msg}`);

  // install should cache shell
self.addEventListener('install', e =>
{
  logSw('Install');
  e.waitUntil(
    caches.open(cacheName).then(cache =>
      {
        logSw('Caching app shell');
        return cache.addAll(filesToCache);
      })
  );
});

// activate clears old caches
self.addEventListener('activate', e =>
{
  logSw('Activate');

  e.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key =>
        {
          if (key !== cacheName)
          {
            logSw(`Removing old cache ${key}`);
            return caches.delete(key);
          }
        })))
  );

  return self.clients.claim();
});

self.addEventListener('fetch', e =>
  e.respondWith(
    caches.match(e.request).then(response =>
      {
        const url = e.request.url;

        if (response)
        {
          logSw(`Responding with cached response for ${url}`);
          return response;
        }

        logSw(`Responding with fetched response for ${url}`);
        const fetchRequest = e.request.clone();

        return fetch(fetchRequest).then(response =>
          {
            if (!response || response.status !== 200 || response.type !== 'basic')
            {
              logSw(`Not caching the response for this request: ${url}`);
              return response;
            }

            logSw(`Caching response for this request: ${url}`);
            const responseToCache = response.clone();

            caches.open(cacheName).then(cache =>
              cache.put(e.request, responseToCache));

            return response;
          });
      })
  ));