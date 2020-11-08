// /* eslint-env serviceworker */
// import {version} from './package.json';
//
// console.log('version: ', version);
//
// const currentCaches = ['media', `static-${version}`];
//
//
// self.addEventListener('install', e => {
//   e.waitUntil(
//     Promise.all(
//       currentCaches.map(cache_name => {
//         if (cache_name === 'media') {
//           return caches.open(cache_name)
//             .then(cache => cache.addAll([
//               './media/icons/favicon.png',
//               './media/img/frontend/vs_sw_screenshot.png',
//               './media/icons/soyuz_apollo192.png',
//               './media/icons/soyuz_apollo_apple_icon.png'
//             ]))
//         }
//
//         if (cache_name.startsWith('static')) {
//           return caches.open(cache_name)
//             .then(cache => cache.addAll([
//               "./articles/pwa-basics/index.hbs",
//               "./bundle.scripts",
//               "./index.hbs",
//               './manifest.json', // buggy ( better comment it while debugging )
//               "./style.css"
//             ]))
//         }
//       })
//     )
//   )
// });
//
// self.addEventListener('activate', function (event) {
//   // https://developer.mozilla.org/en-US/docs/Web/API/Cache
//
//   // Active worker won't be treated as activated until promise
//   // resolves successfully.
//
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (currentCaches.includes(cacheName) === false) {
//             console.log('Deleting out of date cache:', cacheName);
//
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
//
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(matching => {
//         return matching || fetch(event.request)
//           .catch(err => `${err} нет сети`)
//       })
//   )
// });
