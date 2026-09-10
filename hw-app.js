/* HimmelsWahr — gemeinsame Funktionen */

/* ---------- Symbol-System (SVG-Line-Icons statt Emoji) ---------- */
/* Alle Symbole handgezeichnet als einfache Linien-Icons, viewBox 0 0 24 24, stroke=currentColor —
   damit sie sich automatisch an Hell-/Dunkelmodus und Textfarbe anpassen, ohne Emoji-Zeichensatz. */
var HW_ICON_SVG = {
  home:       '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9"/>',
  moon:       '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" fill="currentColor" stroke="none"/>',
  pin:        '<path d="M12 21.6s7-6.8 7-12.2a7 7 0 1 0-14 0C5 14.8 12 21.6 12 21.6Z"/><circle cx="12" cy="9.6" r="2.4"/>',
  gear:       '<path d="M4 7h16"/><circle cx="9" cy="7" r="2.3" fill="currentColor" stroke="none"/><path d="M4 12h16"/><circle cx="16" cy="12" r="2.3" fill="currentColor" stroke="none"/><path d="M4 17h16"/><circle cx="11" cy="17" r="2.3" fill="currentColor" stroke="none"/>',
  refresh:    '<path d="M3 11a9 9 0 0 1 15.3-6.4L21 7"/><path d="M21 3v4h-4"/><path d="M21 13a9 9 0 0 1-15.3 6.4L3 17"/><path d="M3 21v-4h4"/>',
  bell:       '<path d="M12 4A5 5 0 0 0 7 9V15Q7 16 6 16H18Q17 16 17 15V9A5 5 0 0 0 12 4Z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  bellOff:    '<path d="M8.5 6.2A5 5 0 0 1 17 9v6M7 9v6L6 16H18"/><path d="M10 19a2 2 0 0 0 4 0"/><path d="M3 3l18 18"/>',
  search:     '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8"/>',
  close:      '<path d="M5 5l14 14M19 5 5 19"/>',
  warning:    '<path d="M12 3.5 21.5 20h-19L12 3.5Z"/><path d="M12 9.5v4.3"/><circle cx="12" cy="17" r="0.7" fill="currentColor" stroke="none"/>',
  link:       '<path d="M14 5h5v5"/><path d="M19 5 10.5 13.5"/><path d="M12 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/>',
  chart:      '<path d="M4.5 20V11M10 20V4M15.5 20v-7M21 20H3"/>',
  thermometer:'<path d="M13 13.8V6a1 1 0 1 0-2 0v7.8a3.5 3.5 0 1 0 2 0Z"/><circle cx="12" cy="16.5" r="1.4" fill="currentColor" stroke="none"/>',
  droplet:    '<path d="M12 3s6 7.2 6 11.2a6 6 0 1 1-12 0C6 10.2 12 3 12 3Z"/>',
  wind:       '<path d="M3 8h11a2.5 2.5 0 1 0-2.5-2.5"/><path d="M3 12h15a2.5 2.5 0 1 1-2.5 2.5"/><path d="M3 16h9a2 2 0 1 1-2 2"/>',
  compass:    '<circle cx="12" cy="12" r="9"/><path d="M15.2 8.8l-2 6-6 2 2-6 6-2Z"/>',
  eye:        '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.6"/>',
  haze:       '<path d="M4 8h16M4 12h10M4 16h16M16.5 12h3.5"/>',
  snowflake:  '<path d="M12 3v18M4.8 7.5l14.4 9M19.2 7.5l-14.4 9"/>',
  cloudRain:  '<path d="M7 15a4.5 4.5 0 0 1 .4-9 5.5 5.5 0 0 1 10.6 1.7A4 4 0 0 1 17 15H7Z"/><path d="M8 18l-1 2M12 18l-1 2M16 18l-1 2"/>',
  leaf:       '<path d="M5 19c8-1 13-6 14-14C11 6 6 11 5 19Z"/><path d="M5 19c2-4 5-7 9-9"/>',
  sunset:     '<path d="M3 17h18"/><path d="M6 17a6 6 0 0 1 12 0"/><path d="M12 7v4.3M8.4 8.6l1.4 1.4M15.6 8.6l-1.4 1.4"/>',
  star:       '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.9L12 3.5Z"/>',
  clock:      '<circle cx="12" cy="12" r="9"/><path d="M12 7.2v5l3.3 1.9"/>',
  arrowUp:    '<path d="M12 19V5"/><path d="M6 11l6-6 6 6"/>',
  arrowDown:  '<path d="M12 5v14"/><path d="M18 13l-6 6-6-6"/>',
  arrowUpRight:'<path d="M7 17 17 7"/><path d="M9 7h8v8"/>',
  arrowDownRight:'<path d="M7 7 17 17"/><path d="M17 9V17H9"/>',
  arrowRight: '<path d="M4 12h15"/><path d="M13 6l6 6-6 6"/>',
  sun:        '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  gust:       '<path d="M3 8h12a2 2 0 1 0-2-2"/><path d="M3 12h16a2 2 0 1 1-2 2"/><path d="M3 16h10a2 2 0 1 1-2 2"/>',
  calendar:   '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
  sparkles:   '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"/><circle cx="12" cy="12" r="2"/>',
  info:       '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none"/>'
};
function hwIcon(name, size, cls, filled){
  var svg = HW_ICON_SVG[name];
  if(!svg) return '';
  size = size || 18;
  return '<svg class="hw-icon' + (cls ? ' ' + cls : '') + '" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + (filled ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + svg + '</svg>';
}
/* Ersetzt alle statischen <span data-hwi="name" data-hwi-size="18"></span> im HTML durch das passende SVG */
function hwInitIcons(root){
  (root || document).querySelectorAll('[data-hwi]').forEach(function(el){
    var size = el.getAttribute('data-hwi-size');
    el.innerHTML = hwIcon(el.getAttribute('data-hwi'), size ? parseInt(size, 10) : 18);
  });
}
/* Mondphasen-Symbol: zeichnet die tatsächliche Beleuchtungsform statt eines der 8 Emoji-Symbole,
   Beschattung als zweiter, seitlich verschobener Kreis in Kartenfarbe (var(--card)). */
function hwMoonPhaseIcon(frac, size){
  size = size || 20;
  var r = 9, cx = 12, cy = 12;
  var shift = Math.cos(frac * 2 * Math.PI) * r * 2;
  var wax = frac < 0.5;
  var maskCx = wax ? cx + (r * 2 - Math.abs(shift)) : cx - (r * 2 - Math.abs(shift));
  if(frac < 0.02 || frac > 0.98) maskCx = cx; /* Neumond: komplett verdeckt */
  if(frac > 0.48 && frac < 0.52) return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="currentColor"/></svg>'; /* Vollmond */
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<circle cx="12" cy="12" r="9" fill="currentColor"/>' +
    '<circle cx="' + maskCx + '" cy="12" r="9" fill="var(--card)"/>' +
    '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1"/>' +
  '</svg>';
}

/* ---------- Hell-/Dunkelmodus ---------- */
/* App startet laut Vorgabe immer im Hellmodus, unabhängig von Systemeinstellung oder vorherigem Zustand */
function hwInitTheme(){
  document.documentElement.setAttribute('data-theme', 'light');
  hwUpdateThemeMeta('light');
  try{ localStorage.removeItem('hw-theme'); }catch(e){} /* Altwert aus früherer Version aufräumen */
}
function hwToggleTheme(){
  var cur = document.documentElement.getAttribute('data-theme');
  var next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  hwUpdateThemeMeta(next);
}
function hwUpdateThemeMeta(mode){
  var meta = document.querySelector('meta[name=theme-color]');
  if(meta) meta.setAttribute('content', mode === 'dark' ? '#221F3A' : '#F2EEE5');
}

/* ---------- Standort (merkt sich den letzten bekannten Standort lokal) ---------- */
function hwGetLocation(){
  return new Promise(function(resolve, reject){
    if(!navigator.geolocation){ reject(new Error('Geolokalisierung nicht verfügbar')); return; }
    navigator.geolocation.getCurrentPosition(
      function(pos){
        var loc = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        try{ localStorage.setItem('hw-last-location', JSON.stringify(loc)); }catch(e){}
        resolve(loc);
      },
      function(err){
        var cached = hwGetCachedLocation();
        if(cached) resolve(cached); else reject(err);
      },
      { enableHighAccuracy:false, timeout:8000, maximumAge:300000 }
    );
  });
}
function hwGetCachedLocation(){
  try{
    var raw = localStorage.getItem('hw-last-location');
    return raw ? JSON.parse(raw) : null;
  }catch(e){ return null; }
}
function hwHasCachedLocation(){
  return !!hwGetCachedLocation();
}

/* ---------- Manuell gewählter Standort (Geocoding) ---------- */
function hwGetManualLocation(){
  try{
    var raw = localStorage.getItem('hw-manual-location');
    return raw ? JSON.parse(raw) : null;
  }catch(e){ return null; }
}
function hwGetLocationMode(){
  try{ return localStorage.getItem('hw-location-mode') || 'auto'; }catch(e){ return 'auto'; }
}
function hwSetManualLocation(lat, lon, name){
  var loc = { lat: lat, lon: lon, name: name };
  try{
    localStorage.setItem('hw-manual-location', JSON.stringify(loc));
    localStorage.setItem('hw-location-mode', 'manual');
  }catch(e){}
}
function hwSetAutoLocation(){
  try{ localStorage.setItem('hw-location-mode', 'auto'); }catch(e){}
}
/* Liefert den aktuell aktiven Standort — entweder den manuell gewählten Ort (ohne GPS-Abfrage)
   oder den automatischen GPS-Standort (bestehendes Verhalten, inkl. Cache-Fallback). */
function hwGetActiveLocation(){
  if(hwGetLocationMode() === 'manual'){
    var m = hwGetManualLocation();
    if(m) return Promise.resolve(m);
  }
  return hwGetLocation().then(function(loc){
    return { lat: loc.lat, lon: loc.lon, name: null };
  });
}
function hwHasActiveLocationReady(){
  if(hwGetLocationMode() === 'manual' && hwGetManualLocation()) return true;
  return hwHasCachedLocation();
}
function hwActiveLocationLabel(){
  if(hwGetLocationMode() === 'manual'){
    var m = hwGetManualLocation();
    if(m) return hwIcon('pin', 14) + ' ' + m.name;
  }
  return hwIcon('pin', 14) + ' Automatisch (mein Standort)';
}

/* ---------- Geocoding-Suche (Open-Meteo, gleiche Anbieterfamilie/Lizenz wie Wetter-API) ---------- */
function hwGeocodeSearch(query){
  var params = new URLSearchParams({ name: query, count: '6', language: 'de', format: 'json' });
  return fetch('https://geocoding-api.open-meteo.com/v1/search?' + params.toString())
    .then(function(r){ if(!r.ok) throw new Error('Ortssuche nicht erreichbar'); return r.json(); })
    .then(function(data){ return data.results || []; });
}

/* ---------- Favoriten (mehrere gespeicherte Orte) ---------- */
/* Liste bleibt bewusst kurz (max. 8), damit sie auf dem iPhone übersichtlich bleibt. */
function hwGetFavorites(){
  try{
    var raw = localStorage.getItem('hw-fav-locations');
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}
function hwSaveFavorites(list){
  try{ localStorage.setItem('hw-fav-locations', JSON.stringify(list)); }catch(e){}
}
function hwIsFavorite(lat, lon){
  return hwGetFavorites().some(function(f){ return Math.abs(f.lat-lat) < 0.01 && Math.abs(f.lon-lon) < 0.01; });
}
function hwAddFavorite(lat, lon, name){
  if(hwIsFavorite(lat, lon)) return;
  var list = hwGetFavorites();
  list.push({ lat: lat, lon: lon, name: name });
  if(list.length > 8) list.shift();
  hwSaveFavorites(list);
}
function hwRemoveFavorite(idx){
  var list = hwGetFavorites();
  list.splice(idx, 1);
  hwSaveFavorites(list);
}

/* ---------- Standort-Auswahl (wiederverwendbares Overlay für alle Seiten) ---------- */
function hwOpenLocationPicker(){
  if(document.getElementById('hw-loc-overlay')) return;
  var overlay = document.createElement('div');
  overlay.id = 'hw-loc-overlay';
  overlay.className = 'hw-sheet-overlay hw-loc-overlay';
  overlay.innerHTML =
    '<div class="hw-sheet-modal hw-loc-modal">' +
      '<h2 style="margin:0 0 10px;">Standort wählen</h2>' +
      '<button class="hw-btn primary" id="hw-loc-auto-btn" style="margin-bottom:10px;">' + hwIcon('pin', 15) + ' Automatisch (mein Standort)</button>' +
      '<div id="hw-loc-favorites"></div>' +
      '<div class="hw-loc-search-row">' +
        '<input type="text" id="hw-loc-search" placeholder="Ort eingeben, z. B. Hamburg" autocomplete="off">' +
        '<button class="hw-btn primary hw-loc-search-btn" id="hw-loc-search-btn" aria-label="Suchen">' + hwIcon('search', 16) + '</button>' +
      '</div>' +
      '<div id="hw-loc-results" class="hw-loc-results"></div>' +
      '<button class="hw-btn" id="hw-loc-close-btn" style="margin-top:10px;">Schließen</button>' +
    '</div>';
  document.body.appendChild(overlay);

  document.getElementById('hw-loc-close-btn').onclick = hwCloseLocationPicker;
  overlay.addEventListener('click', function(e){ if(e.target === overlay) hwCloseLocationPicker(); });

  document.getElementById('hw-loc-auto-btn').onclick = function(){
    hwSetAutoLocation();
    hwCloseLocationPicker();
    if(window.hwPageReload) window.hwPageReload();
  };

  function renderFavorites(){
    var wrap = document.getElementById('hw-loc-favorites');
    if(!wrap) return;
    var favs = hwGetFavorites();
    if(!favs.length){ wrap.innerHTML = ''; return; }
    wrap.innerHTML = '<p class="hw-loc-fav-title">' + hwIcon('star', 13) + ' Favoriten</p>' + favs.map(function(f, i){
      return '<div class="hw-loc-fav-row">' +
        '<button class="hw-loc-result-item hw-loc-fav-select" data-idx="' + i + '">' + f.name + '</button>' +
        '<button class="hw-loc-fav-remove" data-idx="' + i + '" aria-label="Favorit entfernen">' + hwIcon('close', 14) + '</button>' +
      '</div>';
    }).join('');
    wrap.querySelectorAll('.hw-loc-fav-select').forEach(function(btn){
      btn.onclick = function(){
        var f = favs[+btn.getAttribute('data-idx')];
        hwSetManualLocation(f.lat, f.lon, f.name);
        hwCloseLocationPicker();
        if(window.hwPageReload) window.hwPageReload();
      };
    });
    wrap.querySelectorAll('.hw-loc-fav-remove').forEach(function(btn){
      btn.onclick = function(e){
        e.stopPropagation();
        hwRemoveFavorite(+btn.getAttribute('data-idx'));
        renderFavorites();
      };
    });
  }
  renderFavorites();

  var searchInput = document.getElementById('hw-loc-search');
  var resultsEl = document.getElementById('hw-loc-results');

  function runSearch(){
    var q = searchInput.value.trim();
    if(q.length < 2){ resultsEl.innerHTML = '<p style="font-size:13px;color:var(--text-secondary);">Bitte mindestens 2 Zeichen eingeben.</p>'; return; }
    resultsEl.innerHTML = '<p style="font-size:13px;color:var(--text-secondary);">Suche …</p>';
    hwGeocodeSearch(q).then(function(results){
      if(!results.length){ resultsEl.innerHTML = '<p style="font-size:13px;color:var(--text-secondary);">Keine Treffer.</p>'; return; }
      resultsEl.innerHTML = results.map(function(r, i){
        var parts = [r.name];
        if(r.admin1) parts.push(r.admin1);
        if(r.country) parts.push(r.country);
        return '<div class="hw-loc-result-row">' +
          '<button class="hw-loc-result-item" data-idx="' + i + '">' + parts.join(', ') + '</button>' +
          '<button class="hw-loc-result-star" data-idx="' + i + '" aria-label="Zu Favoriten hinzufügen">' + hwIcon('star', 15) + '</button>' +
        '</div>';
      }).join('');
      resultsEl.querySelectorAll('.hw-loc-result-item').forEach(function(btn, i){
        btn.onclick = function(){
          var r = results[i];
          var label = r.name + (r.admin1 ? ', ' + r.admin1 : '') + (r.country ? ', ' + r.country : '');
          hwSetManualLocation(r.latitude, r.longitude, label);
          hwCloseLocationPicker();
          if(window.hwPageReload) window.hwPageReload();
        };
      });
      resultsEl.querySelectorAll('.hw-loc-result-star').forEach(function(btn, i){
        btn.onclick = function(e){
          e.stopPropagation();
          var r = results[i];
          var label = r.name + (r.admin1 ? ', ' + r.admin1 : '') + (r.country ? ', ' + r.country : '');
          hwAddFavorite(r.latitude, r.longitude, label);
          btn.innerHTML = hwIcon('star', 15, '', true);
          renderFavorites();
        };
      });
    }).catch(function(){
      resultsEl.innerHTML = '<p style="font-size:13px;color:var(--text-secondary);">Suche derzeit nicht verfügbar.</p>';
    });
  }

  document.getElementById('hw-loc-search-btn').onclick = runSearch;
  searchInput.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){ e.preventDefault(); runSearch(); }
  });
  setTimeout(function(){ searchInput.focus(); }, 50);
}
function hwCloseLocationPicker(){
  var overlay = document.getElementById('hw-loc-overlay');
  if(overlay) overlay.remove();
}

/* ---------- Hinweise (Sammel-Overlay für Standort, Einstellungen, Hell/Dunkel) ---------- */
function hwOpenHinweise(){
  if(document.getElementById('hw-hinweise-overlay')) return;
  var overlay = document.createElement('div');
  overlay.id = 'hw-hinweise-overlay';
  overlay.className = 'hw-sheet-overlay';
  overlay.innerHTML =
    '<div class="hw-sheet-modal">' +
      '<h2 style="margin:0 0 14px;">Hinweise</h2>' +
      '<button type="button" class="hw-btn" id="hw-hinweise-loc-btn" style="justify-content:flex-start;">' + hwIcon('pin', 17) + ' Standort wählen</button>' +
      '<button type="button" class="hw-btn" id="hw-hinweise-settings-btn" style="justify-content:flex-start;">' + hwIcon('gear', 17) + ' Einstellungen</button>' +
      '<button type="button" class="hw-btn" id="hw-hinweise-theme-btn" style="justify-content:flex-start;">' + hwIcon('moon', 17) + ' Hell/Dunkel umschalten</button>' +
      '<button type="button" class="hw-btn hw-sheet-close" id="hw-hinweise-close-btn">Schließen</button>' +
    '</div>';
  document.body.appendChild(overlay);

  document.getElementById('hw-hinweise-close-btn').onclick = hwCloseHinweise;
  overlay.addEventListener('click', function(e){ if(e.target === overlay) hwCloseHinweise(); });

  document.getElementById('hw-hinweise-loc-btn').onclick = function(){
    hwCloseHinweise();
    hwOpenLocationPicker();
  };
  document.getElementById('hw-hinweise-settings-btn').onclick = function(){
    window.location.href = 'hw-einstellungen.html';
  };
  document.getElementById('hw-hinweise-theme-btn').onclick = function(){
    hwToggleTheme();
  };
}
function hwCloseHinweise(){
  var overlay = document.getElementById('hw-hinweise-overlay');
  if(overlay) overlay.remove();
}

/* ---------- Regen-Alarm ---------- */
/* Funktioniert ausschließlich, solange HimmelsWahr geöffnet ist (Tab im Vorder- oder Hintergrund).
   Eine echte Zustellung bei vollständig geschlossener App würde einen eigenen Push-Server erfordern,
   den es für diese reine, serverlose Web-App bewusst nicht gibt — daher hier ehrlich als lokale
   Benachrichtigung "nur bei geöffneter App" umgesetzt, statt einen unzutreffenden Eindruck einer
   echten Hintergrund-Push-Funktion zu erwecken. */
function hwIsRainAlertEnabled(){
  try{ return localStorage.getItem('hw-rain-alert-enabled') === '1'; }catch(e){ return false; }
}
function hwSetRainAlertEnabled(on){
  try{ localStorage.setItem('hw-rain-alert-enabled', on ? '1' : '0'); }catch(e){}
}
function hwUpdateRainAlertButton(){
  var btn = document.getElementById('hw-rain-alert-toggle');
  if(!btn) return;
  var on = hwIsRainAlertEnabled() && ('Notification' in window) && Notification.permission === 'granted';
  btn.innerHTML = hwIcon(on ? 'bellOff' : 'bell', 16) + ' ' + (on ? 'Regen-Alarm deaktivieren' : 'Regen-Alarm aktivieren');
}
function hwToggleRainAlert(){
  if(hwIsRainAlertEnabled()){
    hwSetRainAlertEnabled(false);
    hwUpdateRainAlertButton();
    return;
  }
  if(!('Notification' in window)){
    alert('Benachrichtigungen werden von diesem Browser nicht unterstützt.');
    return;
  }
  Notification.requestPermission().then(function(perm){
    if(perm === 'granted'){
      hwSetRainAlertEnabled(true);
      try{ localStorage.setItem('hw-rain-alert-state', 'idle'); }catch(e){}
    } else {
      hwSetRainAlertEnabled(false);
      alert('Ohne Erlaubnis für Benachrichtigungen kann der Regen-Alarm nicht aktiviert werden.');
    }
    hwUpdateRainAlertButton();
  });
}
/* Prüft die bereits geladenen Stundenwerte auf einsetzenden Regen in den nächsten 2 Stunden
   und löst höchstens einmal pro Regen-Ereignis eine Benachrichtigung aus (Schwellenwert 50 %). */
function hwCheckRainAlert(data){
  if(!hwIsRainAlertEnabled()) return;
  if(!('Notification' in window) || Notification.permission !== 'granted') return;
  var items = hwHourlyPrecipData(data, 2);
  if(!items || !items.length) return;
  var threshold = 50;
  var maxPct = 0;
  items.forEach(function(it){ if((it.pct || 0) > maxPct) maxPct = it.pct || 0; });
  var state = 'idle';
  try{ state = localStorage.getItem('hw-rain-alert-state') || 'idle'; }catch(e){}
  if(maxPct >= threshold && state !== 'alerted'){
    var body = 'In den nächsten Stunden ist mit Regen zu rechnen (bis zu ' + maxPct + ' %).';
    if('serviceWorker' in navigator){
      navigator.serviceWorker.ready.then(function(reg){
        reg.showNotification('Regen-Alarm – HimmelsWahr', { body: body, icon: 'hw-icon-192.png' });
      });
    } else {
      new Notification('Regen-Alarm – HimmelsWahr', { body: body });
    }
    try{ localStorage.setItem('hw-rain-alert-state', 'alerted'); }catch(e){}
  } else if(maxPct < threshold && state === 'alerted'){
    try{ localStorage.setItem('hw-rain-alert-state', 'idle'); }catch(e){}
  }
}

/* ---------- Pollen-Vorhersage der nächsten Tage (nicht nur aktueller Wert) ---------- */
/* Nutzt die bereits geladenen stündlichen Pollen-Daten (Air-Quality-API), aggregiert pro Kalendertag
   den jeweils höchsten Wert über alle sechs Pollenarten. */
function hwAggregateDailyPollen(data){
  var times = data.hourly && data.hourly.time;
  if(!times) return [];
  var offset = data.utc_offset_seconds;
  var fields = [
    ['alder_pollen', 'Erle'], ['birch_pollen', 'Birke'], ['grass_pollen', 'Gräser'],
    ['mugwort_pollen', 'Beifuß'], ['olive_pollen', 'Olive'], ['ragweed_pollen', 'Ambrosia']
  ];
  var byDay = {};
  var order = [];
  var now = Date.now();
  for(var i = 0; i < times.length; i++){
    var ms = hwRealTimeMs(times[i], offset);
    if(ms < now - 3600000) continue;
    var dayStr = new Date(ms + offset * 1000).toISOString().slice(0, 10);
    if(!byDay[dayStr]){ byDay[dayStr] = { max: 0, label: null, has: false }; order.push(dayStr); }
    fields.forEach(function(f){
      var arr = data.hourly[f[0]];
      var val = arr ? arr[i] : null;
      if(val != null && val > byDay[dayStr].max){
        byDay[dayStr].max = val;
        byDay[dayStr].label = f[1];
        byDay[dayStr].has = true;
      }
    });
  }
  return order.slice(0, 4).map(function(d){
    return { date: d, max: byDay[d].max, label: byDay[d].label, has: byDay[d].has };
  });
}
function hwPollenLevel(maxVal){
  if(maxVal < 20) return { stufe: 'gruen', dot: '<span class="hw-dot hw-dot-gruen"></span>' };
  if(maxVal < 100) return { stufe: 'gelb', dot: '<span class="hw-dot hw-dot-gelb"></span>' };
  return { stufe: 'rot', dot: '<span class="hw-dot hw-dot-rot"></span>' };
}
function hwRenderPollenForecast(containerId, airData){
  var el = document.getElementById(containerId);
  if(!el) return false;
  var days = hwAggregateDailyPollen(airData);
  if(!days.length){ el.innerHTML = ''; return false; }
  el.innerHTML = days.map(function(day, i){
    var weekday = i === 0 ? 'Heute' : hwWeekdayShort(day.date);
    if(!day.has){
      return '<div class="hw-row"><span>' + weekday + '</span><span style="color:var(--text-secondary);">Keine Belastung</span></div>';
    }
    var lvl = hwPollenLevel(day.max);
    return '<div class="hw-row"><span>' + weekday + '</span><span>' + lvl.dot + ' ' + day.label + '</span></div>';
  }).join('');
  return true;
}

/* ---------- Wochentrend als Mini-Grafik (Höchst-/Tiefstwerte der nächsten Tage) ---------- */
function hwRenderWeekTrend(containerId, weatherData){
  var el = document.getElementById(containerId);
  if(!el) return false;
  var d = weatherData.daily;
  if(!d || !d.time || !d.temperature_2m_max || !d.temperature_2m_min || d.time.length < 2){ el.innerHTML = ''; return false; }
  var n = Math.min(6, d.time.length);
  var maxes = d.temperature_2m_max.slice(0, n);
  var mins = d.temperature_2m_min.slice(0, n);
  var globalMax = Math.max.apply(null, maxes);
  var globalMin = Math.min.apply(null, mins);
  var range = Math.max(1, globalMax - globalMin);
  var cols = '';
  for(var i = 0; i < n; i++){
    var topPct = ((globalMax - maxes[i]) / range) * 100;
    var botPct = ((globalMax - mins[i]) / range) * 100;
    var heightPct = Math.max(10, botPct - topPct);
    var label = i === 0 ? 'Heute' : hwWeekdayShort(d.time[i]);
    cols +=
      '<div class="hw-trend-col">' +
        '<span class="hw-trend-max">' + Math.round(maxes[i]) + '°</span>' +
        '<div class="hw-trend-track"><div class="hw-trend-bar" style="top:' + topPct + '%;height:' + heightPct + '%;"></div></div>' +
        '<span class="hw-trend-min">' + Math.round(mins[i]) + '°</span>' +
        '<span class="hw-trend-day">' + label + '</span>' +
      '</div>';
  }
  el.innerHTML = '<div class="hw-trend-row">' + cols + '</div>';
  return true;
}

/* ---------- Sternenhimmel-Gütefaktor (Wolken zur Nacht + Mondlicht) ---------- */
/* Grobe Orientierung: weniger Bewölkung und weniger Mondlicht (helles Mondlicht überstrahlt
   lichtschwache Sterne) ergeben bessere Bedingungen. Keine Berücksichtigung von Lichtverschmutzung,
   da dafür keine geeignete freie Datenquelle eingebunden ist. */
function hwCalcStargazingScore(cloudPct, moonIllumPct){
  var score = 100 - cloudPct * 0.85 - moonIllumPct * 0.3;
  score = Math.max(0, Math.min(100, Math.round(score)));
  var stufe = score >= 65 ? 'gruen' : (score >= 35 ? 'gelb' : 'rot');
  var label = score >= 65 ? 'Gute Bedingungen' : (score >= 35 ? 'Durchwachsene Bedingungen' : 'Eher ungünstig');
  return { score: score, stufe: stufe, label: label };
}
function hwRenderStargazing(containerId, weatherData, sunsetISO){
  var el = document.getElementById(containerId);
  if(!el) return false;
  var times = weatherData.hourly && weatherData.hourly.time;
  var cloud = weatherData.hourly && weatherData.hourly.cloud_cover;
  if(!times || !cloud || !sunsetISO){ el.innerHTML = ''; return false; }
  var offset = weatherData.utc_offset_seconds;
  var sunsetMs = hwRealTimeMs(sunsetISO, offset);
  var idx0 = times.findIndex(function(t){ return hwRealTimeMs(t, offset) >= sunsetMs; });
  if(idx0 < 0) idx0 = 0;
  var sum = 0, count = 0;
  for(var i = idx0; i < idx0 + 6 && i < times.length; i++){ sum += cloud[i]; count++; }
  if(!count){ el.innerHTML = ''; return false; }
  var avgCloud = Math.round(sum / count);
  var moon = hwMoonPhase(new Date());
  var s = hwCalcStargazingScore(avgCloud, moon.illumination);
  var dotColor = s.stufe === 'gruen' ? 'var(--green-dot)' : (s.stufe === 'gelb' ? 'var(--yellow-dot)' : 'var(--red-dot)');
  el.innerHTML =
    '<div class="hw-row"><span>Bewölkung heute Nacht</span><span>' + avgCloud + ' %</span></div>' +
    '<div class="hw-row"><span style="display:flex;align-items:center;gap:6px;">' + hwMoonPhaseIcon(moon.fraction, 16) + ' Mondlicht</span><span>' + moon.illumination + ' %</span></div>' +
    '<div class="hw-row" style="border-bottom:none;"><span>Einschätzung</span><span style="color:' + dotColor + ';font-weight:700;">' + s.label + '</span></div>';
  return true;
}

/* ---------- Wiederverwendbares Detail-Sheet (für Vorhersage-Tage und Detail-Kacheln) ---------- */
function hwOpenSheet(titleHtml, bodyHtml){
  hwCloseSheet();
  var overlay = document.createElement('div');
  overlay.id = 'hw-sheet-overlay';
  overlay.className = 'hw-sheet-overlay';
  overlay.innerHTML =
    '<div class="hw-sheet-modal">' +
      '<h2 style="margin:0 0 10px;">' + titleHtml + '</h2>' +
      bodyHtml +
      '<button class="hw-btn hw-sheet-close" id="hw-sheet-close-btn">Schließen</button>' +
    '</div>';
  document.body.appendChild(overlay);
  document.getElementById('hw-sheet-close-btn').onclick = hwCloseSheet;
  overlay.addEventListener('click', function(e){ if(e.target === overlay) hwCloseSheet(); });
}
function hwCloseSheet(){
  var overlay = document.getElementById('hw-sheet-overlay');
  if(overlay) overlay.remove();
}

/* ---------- Open-Meteo ---------- */
/* Wetterdaten von Open-Meteo.com — CC BY 4.0, Attribution im UI erforderlich (siehe hw-attrib in jeder Seite) */
function hwFetchWeather(lat, lon){
  var params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lon.toFixed(4),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,dew_point_2m,pressure_msl,surface_pressure,precipitation_probability,weather_code,cloud_cover,wind_speed_10m,wind_gusts_10m,wind_direction_10m,is_day,uv_index,visibility,shortwave_radiation',
    hourly: 'temperature_2m,weather_code,is_day,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,precipitation_probability,wind_speed_10m,pressure_msl,relative_humidity_2m',
    daily: 'sunset,sunrise,moonrise,moonset,weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max,uv_index_max,sunshine_duration,daylight_duration,snowfall_sum',
    timezone: 'auto',
    forecast_days: '6'
  });
  return fetch('https://api.open-meteo.com/v1/forecast?' + params.toString())
    .then(function(r){ if(!r.ok) throw new Error('Wetterdienst nicht erreichbar'); return r.json(); });
}

/* ---------- Open-Meteo Air Quality (Umweltbelastung) ---------- */
/* Luftqualitätsdaten von Open-Meteo.com — CC BY 4.0, Modellbasis CAMS (Copernicus), Attribution im UI erforderlich */
function hwFetchAirQuality(lat, lon){
  var params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lon.toFixed(4),
    current: 'european_aqi,european_aqi_pm2_5,european_aqi_pm10,european_aqi_nitrogen_dioxide,european_aqi_ozone,european_aqi_sulphur_dioxide,pm10,pm2_5,ozone,nitrogen_dioxide,sulphur_dioxide,uv_index,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen',
    hourly: 'european_aqi,pm10,pm2_5,ozone,nitrogen_dioxide,sulphur_dioxide,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen',
    forecast_days: '5',
    past_days: '1',
    timezone: 'auto'
  });
  return fetch('https://air-quality-api.open-meteo.com/v1/air-quality?' + params.toString())
    .then(function(r){ if(!r.ok) throw new Error('Umweltdienst nicht erreichbar'); return r.json(); });
}

/* Offizielle 6 Stufen des Europäischen Luftqualitätsindex (EEA/CAMS): 0–20 Gut, 20–40 Mäßig, 40–60 Mittelmäßig, 60–80 Schlecht, 80–100 Sehr schlecht, >100 Extrem schlecht. Farbe (Ampel) bleibt bei den bereits kontraststarken 3 App-Farben: Gut/Mäßig=grün, Mittelmäßig/Schlecht=gelb, Sehr schlecht/Extrem schlecht=rot. */
function hwEaqiBand(aqi){
  if(aqi <= 20) return { stufe:'gruen', label:'Gut', hinweis:'Keine Einschränkung für Aktivitäten im Freien.' };
  if(aqi <= 40) return { stufe:'gruen', label:'Mäßig', hinweis:'Kaum Einschränkung, empfindliche Personen können leichte Reizungen bemerken.' };
  if(aqi <= 60) return { stufe:'gelb', label:'Mittelmäßig', hinweis:'Empfindliche Personen sollten anstrengende Aktivitäten im Freien reduzieren.' };
  if(aqi <= 80) return { stufe:'gelb', label:'Schlecht', hinweis:'Empfindliche Personen sollten Anstrengung im Freien meiden, alle anderen reduzieren.' };
  if(aqi <= 100) return { stufe:'rot', label:'Sehr schlecht', hinweis:'Anstrengende Aktivitäten im Freien für alle möglichst vermeiden.' };
  return { stufe:'rot', label:'Extrem schlecht', hinweis:'Aufenthalt im Freien möglichst auf das Nötigste beschränken.' };
}

/* Ermittelt den Schadstoff, dessen Einzel-Teilindex dem angezeigten Gesamt-EAQI entspricht (= der ungünstigste Wert, der laut Definition den Gesamtindex bestimmt). */
function hwEaqiLeadingPollutant(c){
  var kandidaten = [
    ['Feinstaub PM2,5', c.european_aqi_pm2_5],
    ['Feinstaub PM10', c.european_aqi_pm10],
    ['Ozon (O₃)', c.european_aqi_ozone],
    ['Stickstoffdioxid (NO₂)', c.european_aqi_nitrogen_dioxide],
    ['Schwefeldioxid (SO₂)', c.european_aqi_sulphur_dioxide]
  ];
  var bester = null;
  kandidaten.forEach(function(k){
    if(k[1] == null) return;
    if(bester == null || k[1] > bester[1]) bester = k;
  });
  return bester ? bester[0] : null;
}

/* Findet den hourly-Index der aktuellen Stunde (gleiche Annäherung wie an anderer Stelle der App bereits verwendet: erste Stunde ≥ jetzt). */
function hwHourlyIndexNow(data){
  var times = data.hourly && data.hourly.time;
  if(!times || !times.length) return -1;
  var offset = data.utc_offset_seconds;
  var now = Date.now();
  var idx0 = times.findIndex(function(t){ return hwRealTimeMs(t, offset) >= now; });
  if(idx0 < 0) idx0 = times.length - 1;
  return idx0;
}

/* Trend-Pfeil eines Schadstoffs: vergleicht die aktuelle Stunde mit der Konzentration vor 3 Stunden (gleicher Zeitraum wie beim bestehenden Luftdruck-Trend), relative Änderung >15% gilt als steigend/fallend. */
function hwPollutantTrend(data, field){
  var times = data.hourly && data.hourly.time;
  var arr = data.hourly && data.hourly[field];
  if(!times || !arr) return '';
  var idx0 = hwHourlyIndexNow(data);
  var idxPast = Math.max(0, idx0 - 3);
  if(idx0 < 0 || idxPast === idx0 || arr[idx0] == null || arr[idxPast] == null) return '';
  var diff = arr[idx0] - arr[idxPast];
  var basis = arr[idxPast] > 0 ? arr[idxPast] : 1;
  var pct = diff / basis;
  if(pct > 0.15) return hwIcon('arrowUpRight', 13);
  if(pct < -0.15) return hwIcon('arrowDownRight', 13);
  return hwIcon('arrowRight', 13);
}

/* ---------- Luftqualität der letzten 24 Stunden (grafische Balkendarstellung) ---------- */
function hwHourlyAqiData(data){
  var times = data.hourly && data.hourly.time;
  var aqi = data.hourly && data.hourly.european_aqi;
  if(!times || !aqi) return null;
  var idx0 = hwHourlyIndexNow(data);
  if(idx0 < 0) return null;
  var start = Math.max(0, idx0 - 23);
  var items = [];
  for(var i = start; i <= idx0 && i < times.length; i++){
    if(aqi[i] == null) continue;
    var d = new Date(times[i]);
    items.push({ label: d.getHours() + ' Uhr', value: aqi[i] });
  }
  return items;
}
/* Rendert den 24-Stunden-EAQI-Verlauf als scrollbares Balkendiagramm, Farbe je Balken nach Ampel-Stufe. */
function hwRenderAqiChart(containerId, data){
  var el = document.getElementById(containerId);
  if(!el) return;
  var items = hwHourlyAqiData(data);
  if(!items || items.length < 2){ el.innerHTML = ''; return; }
  var maxVal = 20;
  items.forEach(function(it){ if(it.value > maxVal) maxVal = it.value; });
  var bars = items.map(function(it, i){
    var h = Math.max(4, Math.round((it.value / maxVal) * 100));
    var band = hwEaqiBand(it.value);
    var dotVar = band.stufe === 'gruen' ? '--green-dot' : (band.stufe === 'gelb' ? '--yellow-dot' : '--red-dot');
    var showLabel = (i % 4 === 0) || (i === items.length - 1);
    return '<div class="hw-aqi-item">' +
      '<span class="hw-aqi-val">' + it.value + '</span>' +
      '<div class="hw-aqi-bar" style="height:' + h + '%;background:var(' + dotVar + ');"></div>' +
      '<span class="hw-aqi-time">' + (showLabel ? it.label : '') + '</span>' +
    '</div>';
  }).join('');
  var totalW = 34 * items.length;
  el.innerHTML = '<div class="hw-aqi-strip" style="width:' + totalW + 'px;">' + bars + '</div>';
}

/* ---------- Vergleich zum EAQI um diese Zeit gestern (gleiches Muster wie Temperatur-Vergleich) ---------- */
function hwUpdateAqiYesterdayCompare(currentAqi){
  var raw = null;
  try{ raw = localStorage.getItem('hw-aqi-yesterday'); }catch(e){}
  var stored = null;
  try{ stored = raw ? JSON.parse(raw) : null; }catch(e){ stored = null; }
  var now = Date.now();
  var diff = null;
  if(stored && typeof stored.aqi === 'number' && (now - stored.ts) >= 20*3600000 && (now - stored.ts) <= 30*3600000){
    diff = Math.round(currentAqi - stored.aqi);
  }
  if(!stored || (now - stored.ts) >= 20*3600000){
    try{ localStorage.setItem('hw-aqi-yesterday', JSON.stringify({ aqi: currentAqi, ts: now })); }catch(e){}
  }
  return diff;
}
function hwAqiYesterdayCompareText(diff){
  if(diff == null) return null;
  if(diff === 0) return 'Luftqualität wie gestern um diese Zeit';
  if(diff > 0) return 'Luftqualität heute schlechter als gestern (EAQI +' + diff + ')';
  return 'Luftqualität heute besser als gestern (EAQI ' + diff + ')';
}

/* ---------- Wetter-Icons (Line-Art, gleicher Stil wie App-Icon, per WMO-Code) ---------- */
/* Farbe passend zur Wetterlage statt immer einheitlichem Violett (nutzt dieselben, bereits auf Kontrast geprüften Töne wie die Detail-Kacheln). isDay=false färbt Klar/Teilweise-bewölkt in einem neutralen Nacht-Ton statt Sonnen-Amber. */
function hwWeatherIconColor(code, isDay){
  var dark = document.documentElement.getAttribute('data-theme') === 'dark';
  if((code === 0 || code === 1 || code === 2) && isDay === false){
    return dark ? '#B0B6D8' : '#444F78';
  }
  if(code === 0 || code === 1) return dark ? '#F0C871' : '#92650A';
  if(code === 2 || code === 3) return dark ? '#B0B6D8' : '#444F78';
  if(code === 45 || code === 48) return dark ? '#B0B6D8' : '#444F78';
  if([51,53,55,61,63,65,80,81,82].indexOf(code) !== -1) return dark ? '#8FC0EE' : '#1F5C96';
  if([71,73,75].indexOf(code) !== -1) return dark ? '#7FD4E8' : '#0B6B80';
  if([95,96,99].indexOf(code) !== -1) return dark ? '#C4AEF0' : '#5B3FA0';
  return dark ? '#B6ABE8' : '#4B3F72';
}
/* isDay: false zeichnet bei Klar (0/1) einen Mond statt einer Sonne, bei Teilweise bewölkt (2) Mond+Wolke statt Sonne+Wolke. Standard (nicht übergeben oder true) = Tag. */
function hwWeatherIcon(code, size, isDay){
  size = size || 28;
  isDay = isDay !== false;
  var s = '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">';
  var body;
  if(code === 0 || code === 1){
    if(isDay){
      body = '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.4 4.4l1.7 1.7M17.9 17.9l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.4 19.6l1.7-1.7M17.9 6.1l1.7-1.7"/>';
    } else {
      body = '<path d="M18.5 13.2A7.2 7.2 0 0 1 9.8 4.5a7.2 7.2 0 1 0 8.7 8.7z"/>';
    }
  } else if(code === 2){
    if(isDay){
      body = '<circle cx="9" cy="9.5" r="3.2"/><path d="M9 3.8v1.7M14.4 9.5h1.7M4.6 9.5h1.2M12.9 5.6l1-1M5.1 13.9l1-1"/><path d="M6 20h11.5a3 3 0 0 0 .3-6 4.3 4.3 0 0 0-8.3-1.2A3.4 3.4 0 0 0 6 20z"/>';
    } else {
      body = '<path d="M12.3 5.3a4.6 4.6 0 0 0 5 6.9 4.6 4.6 0 0 1-8-3 4.6 4.6 0 0 1 3-3.9z"/><path d="M6 20h11.5a3 3 0 0 0 .3-6 4.3 4.3 0 0 0-8.3-1.2A3.4 3.4 0 0 0 6 20z"/>';
    }
  } else if(code === 3){
    body = '<path d="M5.5 19h12.2a3.1 3.1 0 0 0 .3-6.2 4.6 4.6 0 0 0-8.9-1.3A3.6 3.6 0 0 0 5.5 19z"/>';
  } else if(code === 45 || code === 48){
    body = '<path d="M3 9.5h13M3 13h18M3 16.5h13"/>';
  } else if([51,53,55,61,63,65,80,81,82].indexOf(code) !== -1){
    body = '<path d="M5.5 14h12.2a3.1 3.1 0 0 0 .3-6.2 4.6 4.6 0 0 0-8.9-1.3A3.6 3.6 0 0 0 5.5 14z"/><path d="M8 17.5l-1 2.3M12 17.5l-1 2.3M16 17.5l-1 2.3"/>';
  } else if([71,73,75].indexOf(code) !== -1){
    body = '<path d="M5.5 12h12.2a3.1 3.1 0 0 0 .3-6.2 4.6 4.6 0 0 0-8.9-1.3A3.6 3.6 0 0 0 5.5 12z"/><path d="M9 16v5M9 17.5l-1.6 1M9 17.5l1.6 1M15 16v5M15 17.5l-1.6 1M15 17.5l1.6 1"/>';
  } else if([95,96,99].indexOf(code) !== -1){
    body = '<path d="M5.5 12h12.2a3.1 3.1 0 0 0 .3-6.2 4.6 4.6 0 0 0-8.9-1.3A3.6 3.6 0 0 0 5.5 12z"/><path d="M12.5 14l-2.7 4.2h2.4L10.8 22"/>';
  } else {
    body = '<circle cx="12" cy="12" r="8"/><path d="M12 8v5M12 16h.01"/>';
  }
  return s + body + '</svg>';
}

/* ---------- Gassi-/Draußen-Score ---------- */
function hwCalcScore(temp, precipProb, wind){
  var score = 100;
  score -= precipProb * 0.6;
  if(wind > 20) score -= (wind - 20) * 1.2;
  if(temp < 2) score -= (2 - temp) * 3;
  if(temp > 29) score -= (temp - 29) * 3;
  score = Math.max(0, Math.min(100, Math.round(score)));
  var stufe = score >= 70 ? 'gruen' : (score >= 40 ? 'gelb' : 'rot');
  var label = score >= 70 ? 'Gut geeignet für draußen' : (score >= 40 ? 'Mit Einschränkungen geeignet' : 'Eher drinnen bleiben');
  return { score: score, stufe: stufe, label: label };
}

/* ---------- Wettercode-Text (WMO) ---------- */
function hwWeatherCodeText(code){
  var map = {
    0:'Klarer Himmel',1:'Überwiegend klar',2:'Teilweise bewölkt',3:'Bedeckt',
    45:'Nebel',48:'Reifnebel',51:'Leichter Sprühregen',53:'Sprühregen',55:'Starker Sprühregen',
    61:'Leichter Regen',63:'Regen',65:'Starker Regen',71:'Leichter Schneefall',73:'Schneefall',75:'Starker Schneefall',
    80:'Regenschauer',81:'Regenschauer',82:'Heftige Regenschauer',95:'Gewitter',96:'Gewitter mit Hagel',99:'Schweres Gewitter mit Hagel'
  };
  return map[code] || 'Unbekannt';
}

/* ---------- Zeitzonen-korrekte Umrechnung von Open-Meteo-Zeit-Strings ---------- */
/* Open-Meteo liefert Zeit-Strings ohne Zeitzonen-Kennung – sie stellen die lokale Uhrzeit AM ORT dar,
   nicht am Gerätestandort. new Date(str) interpretiert sie fälschlich als Uhrzeit in der Zeitzone des
   Geräts. Das ist unproblematisch für die reine Anzeige (Ziffern bleiben korrekt), führt aber bei
   allen "wie lange noch bis…"-Berechnungen zu einem Fehler in Höhe der Zeitzonendifferenz zwischen
   Gerät und gewähltem Ort. Diese Funktion errechnet den tatsächlichen Zeitpunkt (echte UTC-ms) mithilfe
   des von Open-Meteo mitgelieferten utc_offset_seconds-Werts des jeweiligen Orts. */
function hwRealTimeMs(isoStr, utcOffsetSeconds){
  if(utcOffsetSeconds == null) return new Date(isoStr).getTime();
  return Date.parse(isoStr + 'Z') - utcOffsetSeconds * 1000;
}

/* ---------- Regenwahrscheinlichkeit stundenweise (grafische Balkendarstellung) ---------- */
/* Baut aus den bereits geladenen hourly-Daten die Werte der nächsten Stunden.
   hours: wie viele Folgestunden zusätzlich zur aktuellen Stunde angezeigt werden (Standard 5). */
function hwHourlyPrecipData(data, hours){
  hours = hours || 5;
  var times = data.hourly && data.hourly.time;
  var precip = data.hourly && data.hourly.precipitation_probability;
  if(!times || !precip) return null;
  var offset = data.utc_offset_seconds;
  var now = Date.now();
  var idx0 = times.findIndex(function(t){ return hwRealTimeMs(t, offset) >= now; });
  if(idx0 < 0) idx0 = 0;
  var items = [];
  for(var i = idx0; i <= idx0 + hours && i < times.length; i++){
    var d = new Date(times[i]);
    var label = (i === idx0) ? 'Jetzt' : (d.getHours() + ' Uhr');
    items.push({ label: label, pct: precip[i] });
  }
  return items;
}
/* Ordnet einem Prozentwert eine Ampelfarbe zu (grün/gelb/rot) für den Balken-Farbverlauf. */
function hwPrecipColor(pct){
  if(pct <= 20) return 'var(--green-dot)';
  if(pct <= 50) return 'var(--yellow-dot)';
  return 'var(--red-dot)';
}
/* Rendert die Regenwahrscheinlichkeit als Balkendiagramm mit Ampel-Farbverlauf in ein Zielelement. */
function hwRenderPrecipChart(containerId, weatherData, hours){
  var el = document.getElementById(containerId);
  if(!el) return;
  var items = hwHourlyPrecipData(weatherData, hours);
  if(!items || !items.length){ el.innerHTML = ''; return; }
  el.innerHTML = '<div class="hw-precip-chart">' + items.map(function(it){
    var h = Math.max(4, it.pct);
    return '<div class="hw-precip-bar-wrap">' +
      '<span class="hw-precip-pct">' + it.pct + '%</span>' +
      '<div class="hw-precip-bar" style="height:' + h + '%;background:' + hwPrecipColor(it.pct) + ';"></div>' +
      '<span class="hw-precip-label">' + it.label + '</span>' +
    '</div>';
  }).join('') + '</div>';
}

/* ---------- Windrichtung, Luftdruck-Trend, Dauer-Formatierung ---------- */
function hwCompassDirection(deg){
  var dirs = ['N','NO','O','SO','S','SW','W','NW'];
  return dirs[Math.round(deg / 45) % 8];
}
/* Ermittelt den Luftdruck-Trend aus den letzten 3 Stunden (steigend/fallend/stabil). */
function hwPressureTrend(data){
  var times = data.hourly && data.hourly.time;
  var pressure = data.hourly && data.hourly.pressure_msl;
  if(!times || !pressure) return null;
  var offset = data.utc_offset_seconds;
  var now = Date.now();
  var idx0 = times.findIndex(function(t){ return hwRealTimeMs(t, offset) >= now; });
  if(idx0 < 0) idx0 = 0;
  var idxPast = Math.max(0, idx0 - 3);
  if(idxPast === idx0) return null;
  var diff = pressure[idx0] - pressure[idxPast];
  var trend, icon;
  if(diff > 1){ trend = 'steigend'; icon = hwIcon('arrowUpRight', 13); }
  else if(diff < -1){ trend = 'fallend'; icon = hwIcon('arrowDownRight', 13); }
  else { trend = 'stabil'; icon = hwIcon('arrowRight', 13); }
  return { trend: trend, icon: icon, diff: diff };
}
function hwFormatDuration(seconds){
  if(seconds == null) return '–';
  var h = Math.floor(seconds / 3600), m = Math.round((seconds % 3600) / 60);
  return h + ' Std ' + m + ' Min';
}

/* ---------- Mehrtages-Vorhersage ---------- */
function hwWeekdayShort(dateStr){
  var names = ['So','Mo','Di','Mi','Do','Fr','Sa'];
  return names[new Date(dateStr).getDay()];
}
/* Rendert eine ausführliche 6-Tage-Vorschau (ohne den heutigen Tag) aus den bereits geladenen daily-Daten:
   Wochentag+Datum, Icon+Wetterlage-Text, Höchst-/Tiefsttemperatur, Regenwahrscheinlichkeit+Regenmenge, Wind, UV-Index. */
var hwForecastDataCache = null;
function hwRenderForecast(containerId, weatherData){
  var el = document.getElementById(containerId);
  if(!el) return;
  var d = weatherData.daily;
  if(!d || !d.time || d.time.length < 2){ el.innerHTML = ''; return; }
  hwForecastDataCache = weatherData;
  var monthNames = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
  var cards = [];
  for(var i = 1; i < d.time.length && i <= 5; i++){
    var dt = new Date(d.time[i]);
    var dateLabel = dt.getDate() + '. ' + monthNames[dt.getMonth()];
    cards.push(
      '<button type="button" class="hw-forecast-day" data-day-idx="' + i + '">' +
        '<div class="hw-forecast-day-head">' +
          '<span class="hw-forecast-weekday">' + hwWeekdayShort(d.time[i]) + ', ' + dateLabel + '</span>' +
          '<span style="display:flex;align-items:center;">' +
            '<span style="color:' + hwWeatherIconColor(d.weather_code[i]) + ';">' + hwWeatherIcon(d.weather_code[i], 26) + '</span>' +
            '<span class="hw-forecast-chevron">›</span>' +
          '</span>' +
        '</div>' +
        '<div class="hw-forecast-desc">' + hwWeatherCodeText(d.weather_code[i]) + '</div>' +
        '<div class="hw-forecast-temps"><strong>' + Math.round(d.temperature_2m_max[i]) + '°</strong> / ' + Math.round(d.temperature_2m_min[i]) + '°</div>' +
        '<div class="hw-row"><span>Regen</span><span>' + d.precipitation_probability_max[i] + ' % · ' + d.precipitation_sum[i].toFixed(1) + ' mm</span></div>' +
        '<div class="hw-row" style="border-bottom:none;"><span>Wind' + (d.wind_gusts_10m_max && d.wind_gusts_10m_max[i] >= 60 ? ' ' + hwIcon('warning', 13) + '' : '') + '</span><span' + (d.wind_gusts_10m_max && d.wind_gusts_10m_max[i] >= 60 ? ' style="color:var(--red-fg);font-weight:700;"' : '') + '>' + Math.round(d.wind_speed_10m_max[i]) + ' km/h' + (d.wind_gusts_10m_max && d.wind_gusts_10m_max[i] != null ? ' (Böen ' + Math.round(d.wind_gusts_10m_max[i]) + ')' : '') + '</span></div>' +
      '</button>'
    );
  }
  el.innerHTML = cards.join('');
  el.querySelectorAll('.hw-forecast-day').forEach(function(btn){
    btn.onclick = function(){ hwOpenForecastDayDetail(parseInt(btn.getAttribute('data-day-idx'), 10)); };
  });
}

/* Öffnet das Detail-Sheet für einen Vorhersage-Tag (u. a. UV-Index, Sonnenauf-/-untergang) */
function hwOpenForecastDayDetail(i){
  if(!hwForecastDataCache) return;
  var d = hwForecastDataCache.daily;
  var monthNames = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
  var dt = new Date(d.time[i]);
  var dateLabel = dt.getDate() + '. ' + monthNames[dt.getMonth()];
  var sunrise = d.sunrise && d.sunrise[i] ? hwFormatTime(d.sunrise[i]) : '–';
  var sunset = d.sunset && d.sunset[i] ? hwFormatTime(d.sunset[i]) : '–';
  var uv = d.uv_index_max ? Math.round(d.uv_index_max[i]) : null;
  var sunshine = d.sunshine_duration && d.sunshine_duration[i] != null ? hwFormatDuration(d.sunshine_duration[i]) : null;
  var snow = d.snowfall_sum && d.snowfall_sum[i] > 0 ? d.snowfall_sum[i] + ' cm' : null;

  var rows = [
    ['Höchst- / Tiefstwert', Math.round(d.temperature_2m_max[i]) + '° / ' + Math.round(d.temperature_2m_min[i]) + '°'],
    ['Regenwahrscheinlichkeit', d.precipitation_probability_max[i] + ' %'],
    ['Regenmenge', d.precipitation_sum[i].toFixed(1) + ' mm'],
    ['Wind (max.)', Math.round(d.wind_speed_10m_max[i]) + ' km/h']
  ];
  if(d.wind_gusts_10m_max && d.wind_gusts_10m_max[i] != null){
    var gust = d.wind_gusts_10m_max[i];
    rows.push(['Windböen (max.)' + (gust >= 60 ? ' ' + hwIcon('warning', 13) + '' : ''), Math.round(gust) + ' km/h']);
  }
  if(uv != null) rows.push(['UV-Index (max.)', uv]);
  rows.push(['Sonnenaufgang', sunrise]);
  rows.push(['Sonnenuntergang', sunset]);
  if(sunshine) rows.push(['Sonnenscheindauer', sunshine]);
  if(snow) rows.push(['Schneefall', snow]);

  var body = '<p style="color:var(--text-secondary);margin-top:-4px;">' + hwWeatherCodeText(d.weather_code[i]) + '</p>' +
    rows.map(function(r, idx){
      var lastStyle = idx === rows.length - 1 ? ' style="border-bottom:none;"' : '';
      return '<div class="hw-row"' + lastStyle + '><span>' + r[0] + '</span><span>' + r[1] + '</span></div>';
    }).join('');

  hwOpenSheet(hwWeekdayShort(d.time[i]) + ', ' + dateLabel, body);
}
function hwFormatTime(isoStr){
  var dt = new Date(isoStr);
  if(isNaN(dt.getTime())) return '–';
  var hh = dt.getHours().toString().padStart(2, '0');
  var mm = dt.getMinutes().toString().padStart(2, '0');
  return hh + ':' + mm + ' Uhr';
}

/* ---------- Reihenfolge der Startseiten-Abschnitte (vom Nutzer in den Einstellungen sortierbar) ---------- */
var HW_SECTION_KEYS_DEFAULT = ['quicktiles','hero','lage','hourly','forecast','details'];
var HW_SECTION_META = {
  quicktiles: { icon: hwIcon('link', 16), label:'Schnellzugriff (Umweltbelastung/Abendrot/Kompass)' },
  hero:       { icon: hwIcon('sun', 16), label:'Himmel-Übersicht' },
  lage:       { icon: hwIcon('pin', 16), label:'Aktuelle Lage' },
  hourly:     { icon: hwIcon('clock', 16), label:'Stündlicher Verlauf' },
  forecast:   { icon: hwIcon('calendar', 16), label:'Vorhersage' },
  details:    { icon: hwIcon('chart', 16), label:'Weitere Details' }
};
function hwGetSectionOrder(){
  try {
    var raw = localStorage.getItem('hw-section-order');
    if(raw){
      var arr = JSON.parse(raw);
      if(Array.isArray(arr) && arr.length){
        HW_SECTION_KEYS_DEFAULT.forEach(function(k){ if(arr.indexOf(k) === -1) arr.push(k); });
        return arr;
      }
    }
  } catch(e){}
  return HW_SECTION_KEYS_DEFAULT.slice();
}
function hwSetSectionOrder(order){
  try { localStorage.setItem('hw-section-order', JSON.stringify(order)); } catch(e){}
}
/* Ordnet die Abschnitte der Startseite gemäß gespeicherter Reihenfolge neu an, indem die bereits
   vorhandenen DOM-Elemente vor einen fixen Anker verschoben werden (keine Neuerstellung, keine
   verlorenen Event-Handler). Wird auf hw-index.html möglichst früh aufgerufen. */
function hwApplySectionOrder(){
  var anchor = document.getElementById('hw-section-anchor');
  if(!anchor) return;
  var parent = anchor.parentNode;
  var order = hwGetSectionOrder();
  order.forEach(function(key){
    var el = parent.querySelector(':scope > [data-hw-section="' + key + '"]');
    if(el) parent.insertBefore(el, anchor);
  });
}

/* ---------- Wiederverwendbare Auf/Ab-Sortierliste für die Einstellungen ---------- */
function hwRenderOrderList(containerId, order, metaMap, onChange){
  var el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = order.map(function(k, i){
    var meta = metaMap[k];
    if(!meta) return '';
    return '<div class="hw-order-row">' +
      '<span class="hw-order-icon">' + meta.icon + '</span>' +
      '<span class="hw-order-label">' + meta.label + '</span>' +
      '<span class="hw-order-btns">' +
        '<button type="button" aria-label="' + meta.label + ' nach oben" data-dir="up" data-idx="' + i + '"' + (i === 0 ? ' disabled' : '') + '>' + hwIcon('arrowUp', 15) + '</button>' +
        '<button type="button" aria-label="' + meta.label + ' nach unten" data-dir="down" data-idx="' + i + '"' + (i === order.length - 1 ? ' disabled' : '') + '>' + hwIcon('arrowDown', 15) + '</button>' +
      '</span>' +
    '</div>';
  }).join('');
  el.querySelectorAll('button[data-dir]').forEach(function(btn){
    btn.onclick = function(){
      var idx = parseInt(btn.getAttribute('data-idx'), 10);
      var dir = btn.getAttribute('data-dir');
      var target = dir === 'up' ? idx - 1 : idx + 1;
      if(target < 0 || target >= order.length) return;
      var tmp = order[idx];
      order[idx] = order[target];
      order[target] = tmp;
      onChange(order);
    };
  });
}
function hwRenderSectionSettings(){
  hwRenderOrderList('hw-section-order-list', hwGetSectionOrder(), HW_SECTION_META, function(newOrder){
    hwSetSectionOrder(newOrder);
    hwRenderSectionSettings();
  });
}
function hwResetSectionOrder(){
  hwSetSectionOrder(HW_SECTION_KEYS_DEFAULT.slice());
  hwRenderSectionSettings();
}

/* ---------- Reihenfolge der Detail-Kacheln (vom Nutzer in den Einstellungen sortierbar) ---------- */
var HW_TILE_KEYS_DEFAULT = ['temp','humid','dew','pressure','windgust','winddir','visibility','radiation','sunshine','snow'];
var HW_TILE_META = {
  temp:       { icon: hwIcon('thermometer', 16), label:'Gefühlte Temperatur' },
  humid:      { icon: hwIcon('droplet', 16), label:'Luftfeuchtigkeit' },
  dew:        { icon: hwIcon('haze', 16), label:'Taupunkt' },
  pressure:   { icon: hwIcon('chart', 16), label:'Luftdruck' },
  windgust:   { icon: hwIcon('gust', 16), label:'Windböen' },
  winddir:    { icon: hwIcon('compass', 16), label:'Windrichtung' },
  visibility: { icon: hwIcon('eye', 16), label:'Sichtweite' },
  radiation:  { icon: hwIcon('sun', 16), label:'Sonneneinstrahlung' },
  sunshine:   { icon: hwIcon('sun', 16), label:'Sonnenschein heute' },
  snow:       { icon: hwIcon('snowflake', 16), label:'Schneefall heute' }
};
function hwGetTileOrder(){
  try {
    var raw = localStorage.getItem('hw-tile-order');
    if(raw){
      var arr = JSON.parse(raw);
      if(Array.isArray(arr) && arr.length){
        /* Falls durch ein App-Update neue Kachel-Typen hinzugekommen sind, hinten ergänzen */
        HW_TILE_KEYS_DEFAULT.forEach(function(k){ if(arr.indexOf(k) === -1) arr.push(k); });
        return arr;
      }
    }
  } catch(e){}
  return HW_TILE_KEYS_DEFAULT.slice();
}
function hwSetTileOrder(order){
  try { localStorage.setItem('hw-tile-order', JSON.stringify(order)); } catch(e){}
}

/* ---------- Farbenfrohe Detail-Kacheln (gefühlte Temperatur, Luftfeuchtigkeit, Wind, Luftdruck, Sonne, Sicht, Schnee) ---------- */
function hwRenderDetailTiles(weatherData){
  var el = document.getElementById('hw-stat-grid');
  if(!el) return;
  var c = weatherData.current;
  var d = weatherData.daily;
  var map = {};

  if(c.apparent_temperature != null){
    map.temp = { cls:'hw-stat-temp', icon: hwIcon('thermometer', 22), value: Math.round(c.apparent_temperature) + '°C', label:'Gefühlt',
      desc:'Berücksichtigt neben der Lufttemperatur auch Wind und Luftfeuchtigkeit – also wie warm oder kalt sich das Wetter tatsächlich anfühlt.' };
  }
  if(c.relative_humidity_2m != null){
    map.humid = { cls:'hw-stat-humid', icon: hwIcon('droplet', 22), value: c.relative_humidity_2m + ' %', label:'Luftfeuchtigkeit',
      desc:'Der Anteil an Wasserdampf in der Luft, angegeben relativ zur maximal möglichen Menge bei der aktuellen Temperatur.' };
  }
  if(c.dew_point_2m != null){
    map.dew = { cls:'hw-stat-dew', icon: hwIcon('haze', 22), value: Math.round(c.dew_point_2m) + '°C', label:'Taupunkt',
      desc:'Die Temperatur, auf die die Luft abkühlen müsste, damit sich Wasserdampf als Tau niederschlägt. Ab etwa 16–18 °C wird die Luft meist als schwül empfunden.' };
  }
  if(c.pressure_msl != null){
    var trend = hwPressureTrend(weatherData);
    map.pressure = { cls:'hw-stat-pressure', icon: hwIcon('chart', 22), value: Math.round(c.pressure_msl) + ' hPa', label: 'Luftdruck' + (trend ? ' ' + trend.icon + ' ' + trend.trend : ''),
      desc:'Der Luftdruck auf Meereshöhe. Ein fallender Trend deutet häufig auf eine Wetterverschlechterung hin, ein steigender auf eine Besserung.' };
  }
  if(c.wind_gusts_10m != null){
    var stormy = c.wind_gusts_10m >= 60;
    map.windgust = { cls:'hw-stat-wind' + (stormy ? ' hw-stat-storm' : ''), icon: hwIcon('gust', 22), value: Math.round(c.wind_gusts_10m) + ' km/h', label: stormy ? 'Windböen ' + hwIcon('warning', 13) : 'Windböen',
      desc:'Die höchste erwartete kurzzeitige Windgeschwindigkeit – meist deutlich stärker als der mittlere, anhaltende Wind.' + (stormy ? ' Aktuell im stürmischen Bereich (ab 60 km/h).' : '') };
  }
  if(c.wind_direction_10m != null){
    var arrowHtml = '<span class="hw-wind-arrow" style="display:inline-block;transform:rotate(' + c.wind_direction_10m + 'deg);">' + hwIcon('arrowUp', 22) + '</span>';
    map.winddir = { cls:'hw-stat-wind', icon: arrowHtml, value: hwCompassDirection(c.wind_direction_10m), label:'Windrichtung',
      desc:'Die Richtung, aus der der Wind weht, als Kompassrichtung (' + c.wind_direction_10m + '°).' };
  }
  if(c.visibility != null){
    map.visibility = { cls:'hw-stat-visibility', icon: hwIcon('eye', 22), value: (c.visibility/1000).toFixed(1) + ' km', label:'Sichtweite',
      desc:'Die Entfernung, bis zu der Objekte bei den aktuellen Wetterbedingungen (z. B. Nebel, Regen) noch erkennbar sind.' };
  }
  if(c.shortwave_radiation != null){
    map.radiation = { cls:'hw-stat-sun', icon: hwIcon('sun', 22), value: Math.round(c.shortwave_radiation) + ' W/m²', label:'Sonneneinstrahlung',
      desc:'Die aktuelle Strahlungsleistung der Sonne pro Quadratmeter, die auf den Boden trifft.' };
  }
  if(d && d.sunshine_duration && d.sunshine_duration[0] != null){
    map.sunshine = { cls:'hw-stat-sun', icon: hwIcon('sun', 22), value: hwFormatDuration(d.sunshine_duration[0]), label:'Sonnenschein heute',
      desc:'Die für heute berechnete Gesamtdauer an direktem Sonnenschein (ohne Wolkenbedeckung).' };
  }
  if(d && d.snowfall_sum && d.snowfall_sum[0] > 0){
    map.snow = { cls:'hw-stat-snow', icon: hwIcon('snowflake', 22), value: d.snowfall_sum[0] + ' cm', label:'Schneefall heute',
      desc:'Die für heute berechnete Neuschneemenge.' };
  }

  var tiles = hwGetTileOrder().map(function(k){ return map[k]; }).filter(Boolean);

  el.innerHTML = tiles.map(function(t, i){
    return '<button type="button" class="hw-stat-tile ' + t.cls + '" style="animation-delay:' + (i*0.04) + 's;" data-tile-idx="' + i + '">' +
      '<span class="hw-stat-icon">' + t.icon + '</span>' +
      '<div class="hw-stat-value">' + t.value + '</div>' +
      '<div class="hw-stat-label">' + t.label + '</div>' +
    '</button>';
  }).join('');

  el.querySelectorAll('.hw-stat-tile').forEach(function(btn){
    var t = tiles[parseInt(btn.getAttribute('data-tile-idx'), 10)];
    btn.onclick = function(){
      hwOpenSheet(t.label, '<p style="font-size:22px;font-weight:700;margin:0 0 8px;">' + t.value + '</p><p style="color:var(--text-secondary);margin:0;">' + t.desc + '</p>');
    };
  });
}

/* ---------- Einstellungen: Reihenfolge der Detail-Kacheln per Auf/Ab sortierbar ---------- */
function hwRenderTileSettings(){
  hwRenderOrderList('hw-tile-order-list', hwGetTileOrder(), HW_TILE_META, function(newOrder){
    hwSetTileOrder(newOrder);
    hwRenderTileSettings();
  });
}
function hwResetTileOrder(){
  hwSetTileOrder(HW_TILE_KEYS_DEFAULT.slice());
  hwRenderTileSettings();
}

/* ---------- Zahlen-Hochzähl-Animation ---------- */
function hwAnimateNumber(el, from, to, suffix, durationMs){
  if(!el) return;
  durationMs = durationMs || 650;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    el.textContent = to + (suffix || '');
    return;
  }
  var start = null;
  function step(ts){
    if(start === null) start = ts;
    var progress = Math.min(1, (ts - start) / durationMs);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.round(from + (to - from) * eased);
    el.textContent = current + (suffix || '');
    if(progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- Ring-Gauge (SVG, für Score/UV-Index) ---------- */
function hwRenderRing(containerId, value, max, colorVar, label, centerText){
  var el = document.getElementById(containerId);
  if(!el) return;
  var pct = Math.max(0, Math.min(1, value / max));
  var r = 34, circ = 2 * Math.PI * r;
  var offset = circ * (1 - pct);
  el.innerHTML =
    '<div style="display:flex;flex-direction:column;align-items:center;">' +
    '<svg width="84" height="84" viewBox="0 0 84 84">' +
      '<circle cx="42" cy="42" r="' + r + '" fill="none" stroke="var(--border)" stroke-width="8"/>' +
      '<circle cx="42" cy="42" r="' + r + '" fill="none" stroke="' + colorVar + '" stroke-width="8" stroke-linecap="round" ' +
        'stroke-dasharray="' + circ.toFixed(1) + '" stroke-dashoffset="' + circ.toFixed(1) + '" transform="rotate(-90 42 42)" class="hw-ring-progress" ' +
        'style="--hw-ring-final:' + offset.toFixed(1) + ';"/>' +
      '<text x="42" y="47" text-anchor="middle" font-size="16" font-weight="700" fill="var(--text)">' + centerText + '</text>' +
    '</svg>' +
    '<span style="font-size:12px;color:var(--text-secondary);margin-top:2px;">' + label + '</span>' +
    '</div>';
  /* Animation nachträglich per rAF starten, damit der Übergang von stroke-dashoffset (Start) zum Zielwert greift */
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      var ring = el.querySelector('.hw-ring-progress');
      if(ring) ring.style.strokeDashoffset = offset.toFixed(1);
    });
  });
}

/* ---------- Sonnenstand-Bogen (Sonnenaufgang bis Sonnenuntergang) ---------- */
function hwRenderSunArc(containerId, sunriseISO, sunsetISO, utcOffsetSeconds){
  var el = document.getElementById(containerId);
  if(!el) return;
  var sunrise = hwRealTimeMs(sunriseISO, utcOffsetSeconds), sunset = hwRealTimeMs(sunsetISO, utcOffsetSeconds);
  var now = Date.now();
  var frac = (now - sunrise) / (sunset - sunrise);
  frac = Math.max(0, Math.min(1, frac));
  var cx = 100, cy = 88, r = 78;
  var theta = frac * Math.PI;
  var sx = cx - r * Math.cos(theta), sy = cy - r * Math.sin(theta);
  var arcPath = 'M ' + (cx-r) + ' ' + cy + ' A ' + r + ' ' + r + ' 0 0 1 ' + (cx+r) + ' ' + cy;
  el.innerHTML =
    '<svg width="100%" viewBox="0 0 200 100" style="display:block;">' +
      '<path d="' + arcPath + '" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 5"/>' +
      '<circle cx="' + sx.toFixed(1) + '" cy="' + sy.toFixed(1) + '" r="7" fill="#D9A02E" stroke="var(--text)" stroke-width="1.5" class="hw-sun-dot"/>' +
      '<text x="' + (cx-r) + '" y="98" font-size="10" fill="var(--text-secondary)">Aufgang</text>' +
      '<text x="' + (cx+r-30) + '" y="98" font-size="10" fill="var(--text-secondary)">Untergang</text>' +
    '</svg>';
}

/* ---------- Stündlicher Vorhersage-Streifen mit Temperaturkurve ---------- */
function hwRenderHourlyStrip(containerId, weatherData, hours){
  hours = hours || 16;
  var el = document.getElementById(containerId);
  if(!el) return;
  var times = weatherData.hourly && weatherData.hourly.time;
  var temps = weatherData.hourly && weatherData.hourly.temperature_2m;
  var codes = weatherData.hourly && weatherData.hourly.weather_code;
  var isDayArr = weatherData.hourly && weatherData.hourly.is_day;
  if(!times || !temps || !codes){ el.innerHTML = ''; return; }
  var offset = weatherData.utc_offset_seconds;
  var now = Date.now();
  var idx0 = times.findIndex(function(t){ return hwRealTimeMs(t, offset) >= now; });
  if(idx0 < 0) idx0 = 0;
  var items = [];
  for(var i = idx0; i < idx0 + hours && i < times.length; i++){
    items.push({ time: times[i], temp: temps[i], code: codes[i], isDay: isDayArr ? isDayArr[i] === 1 : true });
  }
  if(!items.length){ el.innerHTML = ''; return; }

  var cards = items.map(function(it){
    var d = new Date(it.time);
    var label = d.getHours() + ' Uhr';
    return '<div class="hw-hourly-item">' +
      '<span class="hw-hourly-time">' + label + '</span>' +
      '<span style="color:' + hwWeatherIconColor(it.code, it.isDay) + ';">' + hwWeatherIcon(it.code, 22, it.isDay) + '</span>' +
      '<span class="hw-hourly-temp">' + Math.round(it.temp) + '°</span>' +
    '</div>';
  }).join('');

  var totalW = 60 * items.length;
  el.innerHTML = '<div class="hw-hourly-strip" style="width:' + totalW + 'px;">' + cards + '</div>';
}

/* ---------- Himmel-Hero (animierte Wetterlage-Visualisierung) ---------- */
function hwSkyCondition(code){
  if(code === 0 || code === 1) return 'clear';
  if(code === 2) return 'partly';
  if(code === 3 || code === 45 || code === 48) return 'cloudy';
  if([51,53,55,61,63,65,80,81,82].indexOf(code) !== -1) return 'rain';
  if([71,73,75].indexOf(code) !== -1) return 'snow';
  if([95,96,99].indexOf(code) !== -1) return 'storm';
  return 'cloudy';
}
function hwRenderSkyHero(containerId, code, isDay, tempValue, descText){
  var el = document.getElementById(containerId);
  if(!el) return;
  var cond = hwSkyCondition(code);
  var dayNight = isDay ? 'day' : 'night';
  var html = '<div class="hw-sky-hero hw-sky-' + cond + ' hw-' + dayNight + '">';

  if(dayNight === 'night'){
    var stars = '';
    for(var i=0;i<18;i++){
      var sx = (i * 53 + 7) % 100, sy = (i * 37 + 5) % 60;
      stars += '<span class="hw-star" style="left:' + sx + '%;top:' + sy + '%;animation-delay:' + (i*0.3) + 's;"></span>';
    }
    html += '<div class="hw-sky-stars">' + stars + '</div>';
    if(cond === 'clear' || cond === 'partly'){ html += '<div class="hw-sky-moon"></div>'; }
  } else {
    if(cond === 'clear' || cond === 'partly'){
      html += '<div class="hw-sky-sun"></div>';
    }
  }
  if(cond === 'partly' || cond === 'cloudy' || cond === 'rain' || cond === 'snow' || cond === 'storm'){
    html += '<div class="hw-sky-clouds"><span class="hw-cloud hw-cloud-1"></span><span class="hw-cloud hw-cloud-2"></span></div>';
  }
  if(cond === 'rain' || cond === 'storm'){
    var drops = '';
    for(var r=0;r<14;r++){
      drops += '<span class="hw-raindrop" style="left:' + ((r*7+3)%100) + '%;animation-delay:' + (r*0.13) + 's;"></span>';
    }
    html += '<div class="hw-sky-rain-layer">' + drops + '</div>';
  }
  if(cond === 'snow'){
    var flakes = '';
    for(var f=0;f<12;f++){
      flakes += '<span class="hw-snowflake" style="left:' + ((f*8+4)%100) + '%;animation-delay:' + (f*0.4) + 's;"></span>';
    }
    html += '<div class="hw-sky-snow-layer">' + flakes + '</div>';
  }
  if(cond === 'storm'){
    html += '<div class="hw-sky-flash"></div>';
  }
  html += '<div class="hw-sky-scrim"></div>';
  html += '<div class="hw-sky-overlay">' +
    '<div class="hw-hero-temp" id="hw-hero-temp-val">–</div>' +
    '<div class="hw-hero-desc">' + (descText || '') + '</div>' +
  '</div>';
  html += '</div>';
  el.innerHTML = html;
  if(tempValue != null){
    hwAnimateNumber(document.getElementById('hw-hero-temp-val'), 0, Math.round(tempValue), '°C', 750);
  }
}

/* ---------- Tagesüberblick (kurzer Ein-Satz-Überblick aus bereits geladenen Wetterdaten) ---------- */
function hwBuildDaySummary(data){
  var d = data.daily, h = data.hourly;
  if(!d || !d.time || !d.time.length) return '';
  var maxT = Math.round(d.temperature_2m_max[0]);
  var minT = Math.round(d.temperature_2m_min[0]);
  var codeText = hwWeatherCodeText(d.weather_code[0]).toLowerCase();
  var offset = data.utc_offset_seconds;
  var now = Date.now();
  var rainHour = null;
  if(h && h.time && h.precipitation_probability){
    for(var i=0;i<h.time.length;i++){
      var t = hwRealTimeMs(h.time[i], offset);
      if(t < now) continue;
      if(t - now > 12*3600000) break;
      if(h.precipitation_probability[i] >= 50){ rainHour = new Date(h.time[i]).getHours(); break; }
    }
  }
  var txt = 'Heute ' + codeText + ', ' + minT + '° bis ' + maxT + '°C';
  if(rainHour != null){
    txt += ' · ab ' + rainHour + ' Uhr Regen möglich';
  } else if(d.precipitation_probability_max && d.precipitation_probability_max[0] < 20){
    txt += ' · voraussichtlich trocken';
  }
  return txt + '.';
}
function hwRenderDaySummary(containerId, data){
  var el = document.getElementById(containerId);
  if(!el) return;
  var txt = hwBuildDaySummary(data);
  if(!txt){ el.style.display = 'none'; return; }
  el.textContent = txt;
  el.style.display = 'block';
}

/* ---------- Vergleich zur Temperatur um diese Zeit gestern ---------- */
/* Speichert lokal die zuletzt gemessene Temperatur samt Zeitstempel und vergleicht sie ~24 Std. später
   mit dem aktuellen Wert. Referenzwert wird höchstens einmal pro ~20 Std. überschrieben, damit
   mehrfaches Öffnen am selben Tag den Vergleich nicht verfälscht. */
function hwUpdateYesterdayCompare(currentTemp){
  var raw = null;
  try{ raw = localStorage.getItem('hw-temp-yesterday'); }catch(e){}
  var stored = null;
  try{ stored = raw ? JSON.parse(raw) : null; }catch(e){ stored = null; }
  var now = Date.now();
  var diff = null;
  if(stored && typeof stored.temp === 'number' && (now - stored.ts) >= 20*3600000 && (now - stored.ts) <= 30*3600000){
    diff = Math.round(currentTemp - stored.temp);
  }
  if(!stored || (now - stored.ts) >= 20*3600000){
    try{ localStorage.setItem('hw-temp-yesterday', JSON.stringify({ temp: currentTemp, ts: now })); }catch(e){}
  }
  return diff;
}
function hwYesterdayCompareText(diff){
  if(diff == null) return null;
  if(diff === 0) return 'Genauso warm wie gestern um diese Zeit';
  if(diff > 0) return diff + '° wärmer als gestern um diese Zeit';
  return Math.abs(diff) + '° kälter als gestern um diese Zeit';
}

/* ---------- Mondphase (astronomische Berechnung, keine zusätzliche Schnittstelle nötig) ---------- */
function hwMoonPhase(date){
  date = date || new Date();
  var synodic = 29.530588861;
  var knownNewMoon = Date.UTC(2000, 0, 6, 18, 14, 0); /* bekannter Neumond-Referenzzeitpunkt (UTC) */
  var days = (date.getTime() - knownNewMoon) / 86400000;
  var phase = days % synodic;
  if(phase < 0) phase += synodic;
  var frac = phase / synodic;
  var illumination = Math.round((1 - Math.cos(2 * Math.PI * frac)) / 2 * 100);
  var steps = [
    { max:0.02, name:'Neumond' },
    { max:0.24, name:'Zunehmende Sichel' },
    { max:0.26, name:'Erstes Viertel' },
    { max:0.49, name:'Zunehmender Mond' },
    { max:0.51, name:'Vollmond' },
    { max:0.74, name:'Abnehmender Mond' },
    { max:0.76, name:'Letztes Viertel' },
    { max:0.98, name:'Abnehmende Sichel' },
    { max:1.01, name:'Neumond' }
  ];
  var entry = steps[steps.length - 1];
  for(var i=0;i<steps.length;i++){ if(frac <= steps[i].max){ entry = steps[i]; break; } }
  return { fraction: frac, illumination: illumination, name: entry.name };
}
function hwRenderMoonPhase(containerId){
  var el = document.getElementById(containerId);
  if(!el) return;
  var m = hwMoonPhase(new Date());
  el.innerHTML =
    '<div class="hw-row" style="border-bottom:none;align-items:flex-start;">' +
      '<span style="display:flex;align-items:center;gap:6px;flex-shrink:0;">' + hwMoonPhaseIcon(m.fraction, 20) + ' Mondphase</span>' +
      '<span style="text-align:right;min-width:0;">' + m.name + ' · ' + m.illumination + ' % beleuchtet</span>' +
    '</div>';
}

/* ==========================================================================
   Sonnen-/Mond-Kompass & AR-Sternkarte — reine Astronomie-Mathematik
   (Standardformeln der sphärischen Astronomie, z. B. nach Jean Meeus,
   "Astronomical Algorithms" — mathematische Fakten/Formeln, keine neue
   Datenquelle nötig, alles nur aus Datum/Uhrzeit + Standort berechnet)
   ========================================================================== */
function hwDeg2rad(d){ return d * Math.PI / 180; }
function hwRad2deg(r){ return r * 180 / Math.PI; }
function hwJulianDay(date){ return date.getTime() / 86400000 + 2440587.5; }

/* Greenwich Mean Sidereal Time in Grad */
function hwGMST(jd){
  var T = (jd - 2451545.0) / 36525.0;
  var g = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000.0;
  g = g % 360; if(g < 0) g += 360;
  return g;
}

/* Sonnenposition (Rektaszension/Deklination), Genauigkeit ca. 0.01° — nach Meeus, Kap. 25 (Low-Precision) */
function hwSunEquatorial(jd){
  var T = (jd - 2451545.0) / 36525.0;
  var L0 = (280.46646 + 36000.76983 * T + 0.0003032 * T * T) % 360;
  var M = hwDeg2rad((357.52911 + 35999.05029 * T - 0.0001537 * T * T) % 360);
  var C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M)
        + (0.019993 - 0.000101 * T) * Math.sin(2 * M)
        + 0.000289 * Math.sin(3 * M);
  var trueLong = L0 + C;
  var omega = hwDeg2rad(125.04 - 1934.136 * T);
  var lambda = hwDeg2rad(trueLong - 0.00569 - 0.00478 * Math.sin(omega));
  var eps0 = 23 + (26 + (21.448 - T * (46.8150 + T * (0.00059 - T * 0.001813))) / 60) / 60;
  var eps = hwDeg2rad(eps0 + 0.00256 * Math.cos(omega));
  var ra = hwRad2deg(Math.atan2(Math.cos(eps) * Math.sin(lambda), Math.cos(lambda)));
  ra = (ra + 360) % 360;
  var dec = hwRad2deg(Math.asin(Math.sin(eps) * Math.sin(lambda)));
  return { ra: ra, dec: dec };
}

/* Mondposition, Genauigkeit ca. 0.2-0.3° (nur die größten Störungsterme berücksichtigt, nach Meeus Kap. 47) —
   für eine AR-Kompass-Anzeige mehr als ausreichend, aber bewusst keine Präzisions-Ephemeride. */
function hwMoonEquatorial(jd){
  var T = (jd - 2451545.0) / 36525.0;
  var Lp = (218.3164477 + 481267.88123421 * T) % 360;
  var D = hwDeg2rad((297.8501921 + 445267.1114034 * T) % 360);
  var M = hwDeg2rad((357.5291092 + 35999.0502909 * T) % 360);
  var Mp = hwDeg2rad((134.9633964 + 477198.8675055 * T) % 360);
  var F = hwDeg2rad((93.2720950 + 483202.0175233 * T) % 360);
  var dL = 6.289 * Math.sin(Mp) + 1.274 * Math.sin(2 * D - Mp) + 0.658 * Math.sin(2 * D)
         + 0.214 * Math.sin(2 * Mp) - 0.186 * Math.sin(M) - 0.114 * Math.sin(2 * F);
  var dB = 5.128 * Math.sin(F) + 0.281 * Math.sin(Mp + F) + 0.278 * Math.sin(Mp - F) + 0.173 * Math.sin(2 * D - F);
  var lon = (Lp + dL + 360) % 360;
  var lat = dB;
  var eps = hwDeg2rad(23.4393);
  var lonRad = hwDeg2rad(lon), latRad = hwDeg2rad(lat);
  var ra = hwRad2deg(Math.atan2(Math.sin(lonRad) * Math.cos(eps) - Math.tan(latRad) * Math.sin(eps), Math.cos(lonRad)));
  ra = (ra + 360) % 360;
  var dec = hwRad2deg(Math.asin(Math.sin(latRad) * Math.cos(eps) + Math.cos(latRad) * Math.sin(eps) * Math.sin(lonRad)));
  return { ra: ra, dec: dec };
}

/* Wandelt Himmelskoordinaten (RA/Dec) in Horizontkoordinaten (Azimut ab Nord im Uhrzeigersinn, Höhe) um */
function hwEqToHorizon(raDeg, decDeg, lat, lon, jd){
  var lst = (hwGMST(jd) + lon + 360) % 360;
  var ha = hwDeg2rad((lst - raDeg + 360) % 360);
  var decRad = hwDeg2rad(decDeg);
  var latRad = hwDeg2rad(lat);
  var alt = Math.asin(Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(ha));
  var azSouth = Math.atan2(Math.sin(ha), Math.cos(ha) * Math.sin(latRad) - Math.tan(decRad) * Math.cos(latRad));
  var azNorth = (hwRad2deg(azSouth) + 180 + 360) % 360;
  return { azimuth: azNorth, altitude: hwRad2deg(alt) };
}

/* Sonnen-/Mondposition am Himmel für den aktuellen Standort */
function hwSunPosition(date, lat, lon){
  var jd = hwJulianDay(date);
  var eq = hwSunEquatorial(jd);
  return hwEqToHorizon(eq.ra, eq.dec, lat, lon, jd);
}
function hwMoonPosition(date, lat, lon){
  var jd = hwJulianDay(date);
  var eq = hwMoonEquatorial(jd);
  return hwEqToHorizon(eq.ra, eq.dec, lat, lon, jd);
}

/* Planeten: vereinfachte mittlere Keplerbahnelemente (niedrige Präzision, ca. 1° Genauigkeit —
   ausreichend, um zu zeigen, in welche grobe Richtung man das Handy halten muss) */
var HW_PLANET_ELEMENTS = {
  /* [a AE, e, i°, L° bei J2000, Lrate °/Jahrhundert, peri° bei J2000, node°] – grob gerundete Mittelwerte */
  Merkur:  { a:0.387098, e:0.205630, i:7.005, L:252.251, Lrate:149472.674, peri:77.457, node:48.331 },
  Venus:   { a:0.723332, e:0.006773, i:3.395, L:181.980, Lrate:58517.816,  peri:131.564, node:76.680 },
  Mars:    { a:1.523679, e:0.093405, i:1.850, L:355.433, Lrate:19140.303, peri:336.060, node:49.559 },
  Jupiter: { a:5.204267, e:0.048498, i:1.303, L:34.351,  Lrate:3034.906,  peri:14.331,  node:100.464 },
  Saturn:  { a:9.582017, e:0.055546, i:2.485, L:50.078,  Lrate:1222.114,  peri:92.598,  node:113.665 },
  Uranus:  { a:19.229412, e:0.047318, i:0.773, L:313.238, Lrate:428.485, peri:170.954, node:74.006 },
  Neptun:  { a:30.103658, e:0.008606, i:1.770, L:304.881, Lrate:218.486, peri:44.964,  node:131.784 }
};
function hwSolveKepler(M, e){
  var E = M;
  for(var i = 0; i < 6; i++){ E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E)); }
  return E;
}
/* Heliozentrische Erdposition (für die geozentrische Umrechnung der Planeten benötigt) */
function hwEarthHelioXY(T){
  var el = { a:1.000001, e:0.016709, L:100.464, Lrate:35999.373, peri:102.937, node:0 };
  var M = hwDeg2rad(((el.L + el.Lrate * T) - el.peri + 360000) % 360);
  var E = hwSolveKepler(M, el.e);
  var xv = el.a * (Math.cos(E) - el.e);
  var yv = el.a * (Math.sqrt(1 - el.e * el.e) * Math.sin(E));
  var periRad = hwDeg2rad(el.peri);
  return { x: xv * Math.cos(periRad) - yv * Math.sin(periRad), y: xv * Math.sin(periRad) + yv * Math.cos(periRad) };
}
function hwPlanetPosition(name, date, lat, lon){
  var el = HW_PLANET_ELEMENTS[name];
  if(!el) return null;
  var jd = hwJulianDay(date);
  var T = (jd - 2451545.0) / 36525.0;
  var M = hwDeg2rad(((el.L + el.Lrate * T) - el.peri + 360000) % 360);
  var E = hwSolveKepler(M, el.e);
  var xv = el.a * (Math.cos(E) - el.e);
  var yv = el.a * (Math.sqrt(1 - el.e * el.e) * Math.sin(E));
  var periRad = hwDeg2rad(el.peri);
  var xh = xv * Math.cos(periRad) - yv * Math.sin(periRad);
  var yh = xv * Math.sin(periRad) + yv * Math.cos(periRad);
  /* Bahnneigung vereinfachend vernachlässigt (Planeten stehen für diese Anwendung nah genug an der Ekliptik) */
  var earth = hwEarthHelioXY(T);
  var xg = xh - earth.x, yg = yh - earth.y;
  var lonEcl = Math.atan2(yg, xg);
  var eps = hwDeg2rad(23.4393);
  var ra = hwRad2deg(Math.atan2(Math.sin(lonEcl) * Math.cos(eps), Math.cos(lonEcl)));
  ra = (ra + 360) % 360;
  var dec = hwRad2deg(Math.asin(Math.sin(eps) * Math.sin(lonEcl)));
  return hwEqToHorizon(ra, dec, lat, lon, jd);
}

/* Katalog der hellsten Fixsterne plus wichtiger Sternbild-Stützsterne (Name, Rektaszension/Deklination in
   Grad, Epoche J2000, scheinbare Helligkeit, Sternbild-Kürzel). Reine astronomische Koordinatenfakten,
   keine geschützten Inhalte. Koordinaten sind gerundete Näherungswerte (ausreichend für die AR-Anzeige,
   keine Präzisionsephemeride). */
var HW_STAR_CATALOG = [
  { name:'Sirius', ra:101.287, dec:-16.716, mag:-1.46 },
  { name:'Canopus', ra:95.988, dec:-52.696, mag:-0.74 },
  { name:'Arktur', ra:213.915, dec:19.182, mag:-0.05 },
  { name:'Wega', ra:279.234, dec:38.784, mag:0.03, con:'lyr' },
  { name:'Capella', ra:79.172, dec:45.998, mag:0.08, con:'aur' },
  { name:'Rigel', ra:78.634, dec:-8.202, mag:0.13, con:'ori' },
  { name:'Procyon', ra:114.826, dec:5.225, mag:0.34 },
  { name:'Achernar', ra:24.429, dec:-57.237, mag:0.46 },
  { name:'Beteigeuze', ra:88.793, dec:7.407, mag:0.50, con:'ori' },
  { name:'Hadar', ra:210.956, dec:-60.373, mag:0.61 },
  { name:'Altair', ra:297.696, dec:8.868, mag:0.77, con:'aql' },
  { name:'Aldebaran', ra:68.980, dec:16.509, mag:0.85, con:'tau' },
  { name:'Antares', ra:247.352, dec:-26.432, mag:0.96, con:'sco' },
  { name:'Spica', ra:201.298, dec:-11.161, mag:0.97, con:'vir' },
  { name:'Pollux', ra:116.329, dec:28.026, mag:1.14, con:'gem' },
  { name:'Fomalhaut', ra:344.413, dec:-29.622, mag:1.16 },
  { name:'Deneb', ra:310.358, dec:45.280, mag:1.25, con:'cyg' },
  { name:'Regulus', ra:152.093, dec:11.967, mag:1.35, con:'leo' },
  { name:'Castor', ra:113.649, dec:31.888, mag:1.58, con:'gem' },
  { name:'Bellatrix', ra:81.283, dec:6.350, mag:1.64, con:'ori' },
  { name:'Elnath', ra:81.573, dec:28.608, mag:1.65, con:'tau' },
  { name:'Alnilam', ra:84.053, dec:-1.202, mag:1.69, con:'ori' },
  { name:'Shaula', ra:263.402, dec:-37.104, mag:1.62, con:'sco' },
  { name:'Alnitak', ra:85.190, dec:-1.943, mag:1.74, con:'ori' },
  { name:'Alioth', ra:193.507, dec:55.960, mag:1.76, con:'uma' },
  { name:'Kaus Australis', ra:276.043, dec:-34.385, mag:1.85, con:'sgr' },
  { name:'Mirfak', ra:51.081, dec:49.861, mag:1.79, con:'per' },
  { name:'Dubhe', ra:165.932, dec:61.751, mag:1.79, con:'uma' },
  { name:'Alkaid', ra:206.885, dec:49.313, mag:1.86, con:'uma' },
  { name:'Menkalinan', ra:89.882, dec:44.947, mag:1.90, con:'aur' },
  { name:'Alhena', ra:99.428, dec:16.399, mag:1.93, con:'gem' },
  { name:'Sargas', ra:264.330, dec:-42.998, mag:1.86, con:'sco' },
  { name:'Polaris', ra:37.955, dec:89.264, mag:1.98, con:'umi' },
  { name:'Alpheratz', ra:2.097, dec:29.090, mag:2.06, con:'and' },
  { name:'Mirach', ra:17.433, dec:35.621, mag:2.06, con:'and' },
  { name:'Sadr', ra:305.557, dec:40.257, mag:2.23, con:'cyg' },
  { name:'Mizar', ra:200.981, dec:54.925, mag:2.23, con:'uma' },
  { name:'Albireo', ra:292.680, dec:27.960, mag:3.18, con:'cyg' },
  { name:'Gienah (Cygnus)', ra:311.553, dec:33.970, mag:2.48, con:'cyg' },
  { name:'Delta Cygni', ra:296.244, dec:45.131, mag:2.87, con:'cyg' },
  { name:'Mintaka', ra:83.002, dec:-0.299, mag:2.23, con:'ori' },
  { name:'Schedar', ra:10.127, dec:56.537, mag:2.24, con:'cas' },
  { name:'Almach', ra:30.975, dec:42.330, mag:2.10, con:'and' },
  { name:'Algol', ra:47.042, dec:40.956, mag:2.12, con:'per' },
  { name:'Denebola', ra:177.265, dec:14.572, mag:2.14, con:'leo' },
  { name:'Kochab', ra:222.676, dec:74.156, mag:2.08, con:'umi' },
  { name:'Saiph', ra:86.939, dec:-9.670, mag:2.09, con:'ori' },
  { name:'Caph', ra:2.295, dec:59.150, mag:2.28, con:'cas' },
  { name:'Dschubba', ra:240.083, dec:-22.622, mag:2.29, con:'sco' },
  { name:'Zubenelgenubi', ra:222.720, dec:-16.042, mag:2.75, con:'lib' },
  { name:'Merak', ra:165.460, dec:56.382, mag:2.37, con:'uma' },
  { name:'Nunki', ra:283.816, dec:-26.297, mag:2.05, con:'sgr' },
  { name:'Ascella', ra:285.653, dec:-29.880, mag:2.60, con:'sgr' },
  { name:'Algieba', ra:154.993, dec:19.842, mag:2.61, con:'leo' },
  { name:'Zubeneschamali', ra:229.252, dec:-9.383, mag:2.61, con:'lib' },
  { name:'Zosma', ra:168.527, dec:20.524, mag:2.56, con:'leo' },
  { name:'Phecda', ra:178.458, dec:53.695, mag:2.44, con:'uma' },
  { name:'Tsih', ra:14.177, dec:60.717, mag:2.47, con:'cas' },
  { name:'Alcyone (Plejaden)', ra:56.871, dec:24.105, mag:2.87, con:'tau' },
  { name:'Sadalsuud', ra:322.890, dec:-5.571, mag:2.90, con:'aqr' },
  { name:'Sadalmelik', ra:331.444, dec:-0.320, mag:2.95, con:'aqr' },
  { name:'Deneb Algedi', ra:326.760, dec:-16.127, mag:2.85, con:'cap' },
  { name:'Tarazed', ra:296.565, dec:10.613, mag:2.72, con:'aql' },
  { name:'Ruchbah', ra:21.454, dec:60.235, mag:2.68, con:'cas' },
  { name:'Sheratan', ra:28.660, dec:20.808, mag:2.64, con:'ari' },
  { name:'Hamal', ra:31.793, dec:23.462, mag:2.00, con:'ari' },
  { name:'Markab', ra:346.190, dec:15.205, mag:2.49, con:'peg' },
  { name:'Algenib', ra:3.309, dec:15.184, mag:2.83, con:'peg' },
  { name:'Scheat', ra:345.943, dec:28.083, mag:2.42, con:'peg' },
  { name:'Sheliak', ra:283.626, dec:33.363, mag:3.52, con:'lyr' },
  { name:'Sulafat', ra:284.736, dec:32.690, mag:3.24, con:'lyr' },
  { name:'Alshain', ra:297.696, dec:6.407, mag:3.71, con:'aql' },
  { name:'Dabih', ra:305.253, dec:-14.781, mag:3.05, con:'cap' },
  { name:'Pherkad', ra:230.182, dec:71.834, mag:3.05, con:'umi' },
  { name:'Megrez', ra:183.857, dec:57.033, mag:3.31, con:'uma' },
  { name:'Segin', ra:28.599, dec:63.670, mag:3.35, con:'cas' }
];
/* Zwei "Deep-Sky"-Objekte, die unter dunklem Himmel noch mit bloßem Auge als schwacher Fleck erkennbar
   sind (kein Fixstern, sondern Sternhaufen bzw. Galaxie) */
var HW_DEEPSKY_CATALOG = [
  { name:'Plejaden (M45)', ra:56.75, dec:24.12 },
  { name:'Andromeda-Galaxie (M31)', ra:10.685, dec:41.269 }
];
/* Deutsche Namen der Sternbilder (nur für die Anzeige, keine neuen Katalogdaten) */
var HW_CONSTELLATION_NAMES = {
  ori:'Orion', uma:'Großer Wagen', umi:'Kleiner Wagen', cas:'Kassiopeia', cyg:'Schwan',
  lyr:'Leier', aql:'Adler', tau:'Stier', gem:'Zwillinge', leo:'Löwe', lib:'Waage',
  sco:'Skorpion', sgr:'Schütze', cap:'Steinbock', aqr:'Wassermann', ari:'Widder',
  per:'Perseus', aur:'Fuhrmann', and:'Andromeda', peg:'Pegasus', vir:'Jungfrau'
};
/* Verbindungslinien der bekanntesten Sternbild-Umrisse (nur Sternnamen aus dem Katalog oben) */
var HW_CONSTELLATION_LINES = {
  ori: [['Beteigeuze','Bellatrix'],['Bellatrix','Mintaka'],['Mintaka','Alnilam'],['Alnilam','Alnitak'],
        ['Alnitak','Saiph'],['Saiph','Rigel'],['Rigel','Mintaka'],['Beteigeuze','Alnitak']],
  uma: [['Alkaid','Mizar'],['Mizar','Alioth'],['Alioth','Megrez'],['Megrez','Phecda'],
        ['Phecda','Merak'],['Merak','Dubhe'],['Dubhe','Megrez']],
  umi: [['Polaris','Kochab'],['Kochab','Pherkad']],
  cas: [['Caph','Schedar'],['Schedar','Tsih'],['Tsih','Ruchbah'],['Ruchbah','Segin']],
  cyg: [['Deneb','Sadr'],['Sadr','Albireo'],['Delta Cygni','Sadr'],['Sadr','Gienah (Cygnus)']],
  lyr: [['Wega','Sheliak'],['Sheliak','Sulafat'],['Sulafat','Wega']],
  aql: [['Tarazed','Altair'],['Altair','Alshain']],
  tau: [['Aldebaran','Elnath'],['Aldebaran','Alcyone (Plejaden)']],
  gem: [['Castor','Pollux'],['Pollux','Alhena']],
  leo: [['Regulus','Algieba'],['Algieba','Zosma'],['Zosma','Denebola']],
  lib: [['Zubenelgenubi','Zubeneschamali']],
  sco: [['Dschubba','Antares'],['Antares','Sargas'],['Sargas','Shaula']],
  sgr: [['Kaus Australis','Nunki'],['Nunki','Ascella'],['Ascella','Kaus Australis']],
  cap: [['Dabih','Deneb Algedi']],
  aqr: [['Sadalsuud','Sadalmelik']],
  ari: [['Hamal','Sheratan']],
  per: [['Mirfak','Algol']],
  aur: [['Capella','Menkalinan']],
  and: [['Alpheratz','Mirach'],['Mirach','Almach']],
  peg: [['Markab','Scheat'],['Scheat','Alpheratz'],['Alpheratz','Algenib'],['Algenib','Markab']]
};
/* Liefert alle Objekte (Sonne, Mond, Planeten, Sterne, Deep-Sky) mit aktueller Azimut/Höhe für den
   Standort, auf Wunsch gefiltert auf das, was gerade über dem Horizont steht. */
function hwSkyObjects(date, lat, lon, onlyVisible){
  var list = [];
  var sun = hwSunPosition(date, lat, lon);
  list.push({ name:'Sonne', type:'sun', azimuth: sun.azimuth, altitude: sun.altitude });
  var moon = hwMoonPosition(date, lat, lon);
  list.push({ name:'Mond', type:'moon', azimuth: moon.azimuth, altitude: moon.altitude });
  Object.keys(HW_PLANET_ELEMENTS).forEach(function(p){
    var pos = hwPlanetPosition(p, date, lat, lon);
    if(pos) list.push({ name:p, type:'planet', nakedEye: (p !== 'Uranus' && p !== 'Neptun'), azimuth: pos.azimuth, altitude: pos.altitude });
  });
  var jd = hwJulianDay(date);
  HW_STAR_CATALOG.forEach(function(s){
    var pos = hwEqToHorizon(s.ra, s.dec, lat, lon, jd);
    list.push({ name:s.name, type:'star', mag:s.mag, con:s.con, azimuth: pos.azimuth, altitude: pos.altitude });
  });
  HW_DEEPSKY_CATALOG.forEach(function(o){
    var pos = hwEqToHorizon(o.ra, o.dec, lat, lon, jd);
    list.push({ name:o.name, type:'deepsky', azimuth: pos.azimuth, altitude: pos.altitude });
  });
  if(onlyVisible) list = list.filter(function(o){ return o.altitude > -1; });
  return list;
}

document.addEventListener('DOMContentLoaded', hwInitTheme);
document.addEventListener('DOMContentLoaded', function(){ hwInitIcons(); });
