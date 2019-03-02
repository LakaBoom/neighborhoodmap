var cacheName = 'static-cache-1'

var cacheURL = [
  '/',
  '/index.html',
  '/data/restaurants.json',
  '/static/js/2.af08d671.chunk.js',
  '/static/js/main.5372cc2e.chunk.js',
  '/static/js/runtime~main.fdfcfda2.js',
  '/static/js/bundle.js',
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js',
  '/static/css/main.e92493f0.chunk.css',
  '/static/media/menu-icon.863fc30d.svg',
  '/static/media/close-icon.3ea7255e.svg',
  '/static/media/404.900de545.svg',
  '/static/media/placeholder.e0ad5d70.svg',
  '/static/js/1.chunk.js',
  '/favicon.ico',
  '/main.63affbb332be0a56fcb5.hot-update.js',
  '/__get-internal-source?fileName=webpack-internal%3A%2F%2F%2F.%2Fnode_modules%2Freact-error-overlay%2Flib%2Findex.js'
  //'https://maps.googleapis.com/maps/api/staticmap?center=37.393143,-122.2181696&zoom=10&size=700x700&key=AIzaSyD_IBcj1SARmEqoebgGG8z92lBw3EEdgz4'
 //'https://maps.googleapis.com/maps/api/js?key=AIzaSyD_IBcj1SARmEqoebgGG8z92lBw3EEdgz4&callback=loaderCB01551493577177&libraries=places&v=3&language=en'
]

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(cacheName)
      .then(cache=>{
        return cache.addAll(cacheURL)
    })
  )
})

self.addEventListener('activate', event=>{
  event.waitUntil(
    caches.keys().then(cacheNames=>{
        cacheNames.forEach(key=>{
          if(key != cacheName ){
            return caches.delete(key);
          }
        });
      })
  );
});

self.addEventListener('fetch', event=>{
    event.respondWith(
      caches.match(event.request).then(response =>{
        return response || fetch(event.request)
      })
    )
})
