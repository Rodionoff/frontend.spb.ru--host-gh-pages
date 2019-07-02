let cache_v1 = 'cache_v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cache_v1)
    .then(cache => cache.addAll(
      [
        './index.html',
        // './about.html',
        // './krooshkin.html',
        // './stories.html',
        // './works.html',
        './works/pwa-basics/index.html',
        './assets/favicon.png',
        './bundle.js',
        './style.css',
        './assets/icons/soyuz_apollo192.png',
        './assets/icons/soyuz_apollo_apple_icon.png'
        // './src/img/stories/asia-min@2x.jpg',
        // './src/img/stories/chairs-min.jpg',
        // './src/img/stories/zima-min.jpg',
        // './src/img/works/lemon158.png',
        // './src/img/works/vue-inspiration-app--mobile--lite.png',
        // './src/img/aboutme/image.jpg',
        // './src/img/lazyLoad/lazyLoad.jpg',
        // './src/img/frontend/delaem-svoi-website-progressivnim.jpeg'   
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
