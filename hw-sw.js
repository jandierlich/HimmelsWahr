const HW_CACHE = 'himmelswahr-v16';
const HW_FILES = [
  'index.html',
  'hw-index.html',
  'hw-umwelt.html',
  'hw-abendrot.html',
  'hw-info.html',
  'hw-impressum.html',
  'hw-datenschutz.html',
  'hw-style.css',
  'hw-app.js',
  'hw-manifest.json',
  'hw-icon-192.png',
  'hw-icon-512.png',
  'hw-icon-180.png',
  'hw-icon-192-maskable.png',
  'hw-icon-512-maskable.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(HW_CACHE).then(function(cache){ return cache.addAll(HW_FILES); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== HW_CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(event){
  var url = event.request.url;
  /* Wetter- und Umweltdaten von Open-Meteo immer live laden, niemals aus dem Cache */
  if(url.indexOf('open-meteo.com') !== -1){
    return;
  }
  event.respondWith(
    caches.match(event.request).then(function(cached){
      return cached || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event){
  if(event.data === 'skipWaiting') self.skipWaiting();
});
