/* HimmelsWahr Service Worker – Offline-Start der App.
   Nur eigene Programmdateien werden zwischengespeichert. Anfragen an andere Server (Open-Meteo u. a.)
   werden nie abgefangen oder gespeichert. Strategie: zuerst Netz (immer aktuelle Version), bei Offline aus dem Cache. */
var HW_CACHE = 'himmelswahr-v46-icon';
var HW_ASSETS = [
  'hw-index.html', 'hw-umwelt.html', 'hw-abendrot.html', 'hw-nachthimmel.html', 'hw-kompass.html',
  'hw-einstellungen.html', 'hw-info.html', 'hw-impressum.html', 'hw-datenschutz.html', 'hw-lizenzen.html',
  'hw-style.css', 'hw-astro.js', 'hw-app.js', 'hw-sky.js',
  'hw-manifest.json', 'hw-icon-180.png', 'hw-icon-192.png', 'hw-icon-512.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(HW_CACHE).then(function(cache){
      return Promise.all(HW_ASSETS.map(function(url){ return cache.add(url).catch(function(){ /* einzelne Datei optional */ }); }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k.indexOf('himmelswahr') === 0 && k !== HW_CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(event){
  var req = event.request;
  if(req.method !== 'GET') return;
  var url = new URL(req.url);
  if(url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(req).then(function(res){
      if(res && res.ok){
        var copy = res.clone();
        caches.open(HW_CACHE).then(function(cache){ cache.put(req, copy); });
      }
      return res;
    }).catch(function(){
      return caches.match(req, { ignoreSearch: true }).then(function(hit){
        if(hit) return hit;
        if(req.mode === 'navigate') return caches.match('hw-index.html');
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});

self.addEventListener('notificationclick', function(event){
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list){
      for(var i = 0; i < list.length; i++){ if('focus' in list[i]) return list[i].focus(); }
      if(self.clients.openWindow) return self.clients.openWindow('hw-index.html');
    })
  );
});
