let cache_v1 = 'cache_v1';

self.addEventListener('install', function (event) {
  // self.skipWaiting();
  event.waitUntil(
    caches.open(cache_v1)
    .then(cache => cache.addAll(
      [
        './index.html',
        './about.html',
        './krooshkin.html',
        './stories.html',
        './works.html',
        './favicon.png',
        './dist/bundle.js',
        './dist/style.css',
        './src/icons/soyuz_apollo192.png',
        './src/icons/soyuz_apollo_apple_icon.png',
        './src/img/stories/asia-min@2x.jpg',
        './src/img/stories/chairs-min.jpg',
        './src/img/stories/zima-min.jpg',
        './src/img/works/lemon158.png',
        './src/img/aboutme/image.jpg',
        './src/img/lazyLoad/lazyLoad.jpg',
        './src/img/frontend/sv_vscode1.png'     
      ]
    ))
  )
})

self.addEventListener('fetch', function (event) {
  if (event.request.url.includes('favicon')) {
    event.respondWith('./favicon.png')
    return
  }
  event.respondWith(
    caches.match(event.request)
      .then(matching => {
        return matching || fetch(event.request)
          .catch(err => `${err} нет сети`)
      })
    )
})
