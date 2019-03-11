

version = '1.0';

let cacheName = 'City Graffiti Removal' + version;

self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `./`,
        `./index.html`,
        `./sw.js`
      ])
      .then(() => self.skipWaiting());
    })
  )
});


self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
