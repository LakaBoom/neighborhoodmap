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
