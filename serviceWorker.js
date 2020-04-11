import {version} from './package.json';

const currentCaches = ['assets', `static-${version}`];


currentCaches.forEach(cache_name => {
  if (cache_name === 'assets') {
    self.addEventListener('install', e => {
      e.waitUntil(
        caches.open(cache_name)
          .then(cache => cache.addAll([
            './assets/icons/favicon.png',
            './assets/img/frontend/vs_sw_screenshot.png',
            './assets/icons/soyuz_apollo192.png',
            './assets/icons/soyuz_apollo_apple_icon.png'
          ]))

        //  use catch for debug only
        //  for it not to return rejected promise in offline mode

        // .catch(err => console.log(cache_name + ' ' + 'rejected:\n', err))
      )
    })
  }

  if (cache_name.startsWith('static')) {
    self.addEventListener('install', e => {

      e.waitUntil(
        caches.open(cache_name)
          .then(cache => cache.addAll([
            "./articles/pwa-basics/index.html",
            "./bundle.js",
            "./index.html",
            './manifest.json', // buggy ( better comment it while debugging )
            "./style.css"
          ]))

        //  use cache for debug only
        //  for it not to return rejected promise in offline mode

        // .catch(err => console.log(cache_name + ' ' + 'rejected:\n', err))
      )
    })
  }
});


self.addEventListener('activate', function (event) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Cache

  // Active worker won't be treated as activated until promise
  // resolves successfully.

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (currentCaches.includes(cacheName) === false) {
            console.log('Deleting out of date cache:', cacheName);

            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(matching => {
        return matching || fetch(event.request)
          .catch(err => `${err} нет сети`)
      })
  )
});
