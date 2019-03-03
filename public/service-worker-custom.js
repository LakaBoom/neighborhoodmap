var cacheName = 'static-cache-1'

var cacheURL = [
  '/',
  '/index.html',
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
  '/main.d63f1c198bb65526fae9.hot-update.js',
  '/main.606d7e7d99cfdfe54a34.hot-update.js',
  '/__get-internal-source?fileName=webpack-internal%3A%2F%2F%2F.%2Fnode_modules%2Freact-error-overlay%2Flib%2Findex.js',
  '/__get-internal-source?fileName=webpack-internal%3A%2F%2F%2F.%2Fsrc%2Fcomponent%2FNav.js',
  '/__get-internal-source?fileName=webpack-internal%3A%2F%2F%2F.%2Fnode_modules%2Freact-dom%2Fcjs%2Freact-dom.development.js',
  '/__get-internal-source?fileName=webpack-internal%3A%2F%2F%2F.%2Fnode_modules%2Freact%2Fcjs%2Freact.development.js',
  '/__get-internal-source?fileName=webpack-internal%3A%2F%2F%2F.%2Fsrc%2Fcomponent%2FApp.js',
  'https://api.foursquare.com/v2/venues/explore?client_id=UD32LRWYYUW4Z4BJRTIIDQYYR5L4PYETWVJEJ2OKRDA324YR&client_secret=VWISQ4LN3L35QWANEP2MCZLLC442HGRHMGMRVBULKLTYTLUA&query=food&near=Mountain+View&v=20190302'
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
