const CACHE_NAME = 'casaspese-v1';
const urlsToCache = ['/', '/casaspese/', '/casaspese/index.html', '/casaspese/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(urlsToCache).catch(err => console.log('Cache addAll error:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request).catch(err => {
        console.log('Fetch error:', err);
      });
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(names => 
      Promise.all(
        names
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});