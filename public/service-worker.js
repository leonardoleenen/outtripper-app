
const cacheName = 'outtripper'

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(
        [
          '/img/logo120.png',
          '/styles/style.css',
          '/img/splash1242x2208.jpg',
          'img/splash6401136.jpg',
          'img/splash7501334.jpg',
          'img/splash11252436.jpg',
          'img/splash15362048.jpg',
          'img/splash16682224.jpg',
          'img/splash20482732.jpg',
          'img/logowhite.png',
          'icons/copy.svg',
        ],
      )
    }).catch((err) => console.log(err)),
  )
})
