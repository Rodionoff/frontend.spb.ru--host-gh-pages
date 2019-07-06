let cache_v1 = 'cache_v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cache_v1)
    .then(cache => cache.addAll(
      [
        './index.html',
        './articles/pwa-basics/index.html',
        './assets/icons/favicon.png',
        './assets/img/frontend/vs_sw_screenshot.png',
        './bundle.js',
        './style.css',
        './assets/icons/soyuz_apollo192.png',
        './assets/icons/soyuz_apollo_apple_icon.png' 
      ] 
    )) 
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(matching => {
        return matching || fetch(event.request)
          .catch(err => `${err} нет сети`)
      })
    )
})

