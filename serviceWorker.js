import {version} from './package.json';

const currentCaches = ['assets', `static-${version}`];

console.log('version: ', version);


self.addEventListener('install', e => {
  e.waitUntil(
    Promise.all(
      currentCaches.map(cache_name => {
        if (cache_name === 'assets') {
          return caches.open(cache_name)
            .then(cache => cache.addAll([
              './assets/icons/favicon.png',
              './assets/img/frontend/vs_sw_screenshot.png',
              './assets/icons/soyuz_apollo192.png',
              './assets/icons/soyuz_apollo_apple_icon.png'
            ]))
            .then(() => new Promise(resolve => resolve(() => {
              resolve(() => {
                console.log(cache_name + ' ' + 'resolved');
                return cache_name + ' ' + 'resolved';
              })
            })))
            .catch(err => console.log(cache_name + ' ' + 'rejected:\n', err))
        }

        if (cache_name.startsWith('static')) {
          return caches.open(cache_name)
            .then(cache => cache.addAll([
              "./articles/pwa-basics/index.html",
              "./bundle.js",
              "./index.html",
              './manifest.json', // buggy ( better comment it while debugging )
              "./style.css"
            ]))
            .then(() => new Promise(resolve => {
              resolve(() => {
                console.log(cache_name + ' ' + 'resolved');
                return cache_name + ' ' + 'resolved';
              })
            }))
            .catch(err => console.log(cache_name + ' ' + 'rejected:\n', err))
        }
      })
    )
  )
});
// currentCaches.forEach(cache_name => {

  // if (cache_name === 'assets') {
  //   self.addEventListener('install', function (event) {
  //     event.waitUntil(caches.open(cache_name)
  //       .then(cache => cache.addAll(
  //         [
  //           './assets/icons/favicon.png',
  //           './assets/img/frontend/vs_sw_screenshot.png',
  //           './assets/icons/soyuz_apollo192.png',
  //           './assets/icons/soyuz_apollo_apple_icon.png'
  //         ]
  //       ))
  //     )
  //   })
  // }

  // if (cache_name.startsWith('static')) {
  //   self.addEventListener('install', function (event) {
  //     event.waitUntil(caches.open(cache_name)
  //       .then(cache => cache.addAll(
  //         [
  //           "./articles/pwa-basics/index.html",
  //           "./bundle.js",
  //           "./index.html",
  //           './manifest.json',
  //           "./style.css"
  //         ]
  //       ))
  //       .catch(err => console.log('errorrR!', err))
  //     )
  //   })
  // }
// });


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
