

version = '1.0';

let cacheName = 'GG_Removal' + version;

self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `./`,
        `./index.html`,
        `./letterM.png`,
        `./manifest.json`,
        `./sw.js`
      ])
      .then(() => self.skipWaiting());
    })
  )
});

// https://stackoverflow.com/questions/41009167/what-is-the-use-of-self-clients-claim

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
