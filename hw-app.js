/* HimmelsWahr — gemeinsame Funktionen */

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
    if(m) return '📍 ' + m.name;
  }
  return '📍 Automatisch (mein Standort)';
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
      '<button class="hw-btn primary" id="hw-loc-auto-btn" style="margin-bottom:10px;">📍 Automatisch (mein Standort)</button>' +
      '<div id="hw-loc-favorites"></div>' +
      '<div class="hw-loc-search-row">' +
        '<input type="text" id="hw-loc-search" placeholder="Ort eingeben, z. B. Hamburg" autocomplete="off">' +
        '<button class="hw-btn primary hw-loc-search-btn" id="hw-loc-search-btn" aria-label="Suchen">🔍</button>' +
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
    wrap.innerHTML = '<p class="hw-loc-fav-title">⭐ Favoriten</p>' + favs.map(function(f, i){
      return '<div class="hw-loc-fav-row">' +
        '<button class="hw-loc-result-item hw-loc-fav-select" data-idx="' + i + '">' + f.name + '</button>' +
        '<button class="hw-loc-fav-remove" data-idx="' + i + '" aria-label="Favorit entfernen">✕</button>' +
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
          '<button class="hw-loc-result-star" data-idx="' + i + '" aria-label="Zu Favoriten hinzufügen">☆</button>' +
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
          btn.textContent = '★';
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
  btn.textContent = on ? '🔕 Regen-Alarm deaktivieren' : '🔔 Regen-Alarm aktivieren';
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
        reg.showNotification('🌧 Regen-Alarm – HimmelsWahr', { body: body, icon: 'hw-icon-192.png' });
      });
    } else {
      new Notification('🌧 Regen-Alarm – HimmelsWahr', { body: body });
    }
    try{ localStorage.setItem('hw-rain-alert-state', 'alerted'); }catch(e){}
  } else if(maxPct < threshold && state === 'alerted'){
    try{ localStorage.setItem('hw-rain-alert-state', 'idle'); }catch(e){}
  }
}

/* ---------- Aktivitäts-Empfehlung (beste Stunde heute für draußen) ---------- */
/* Nutzt ausschließlich bereits geladene Open-Meteo-Stundenwerte und den bestehenden Draußen-Score,
   sucht innerhalb der verbleibenden Stunden des heutigen Tages die Stunde mit dem höchsten Score.
   Die Suche bleibt auf realistische Tagesstunden begrenzt (Sonnenaufgang bis Sonnenuntergang, siehe
   hwDaylightWindow), damit z. B. nachts um 22/23 Uhr keine "beste Zeit" mehr vorgeschlagen wird. */
function hwDaylightWindow(data, offset){
  var d = data.daily;
  if(!d || !d.sunrise || !d.sunrise[0] || !d.sunset || !d.sunset[0]) return null;
  return { start: hwRealTimeMs(d.sunrise[0], offset), end: hwRealTimeMs(d.sunset[0], offset) };
}
function hwFindBestOutdoorHour(data){
  var times = data.hourly && data.hourly.time;
  var temps = data.hourly && data.hourly.temperature_2m;
  var precip = data.hourly && data.hourly.precipitation_probability;
  var wind = data.hourly && data.hourly.wind_speed_10m;
  if(!times || !temps || !precip || !wind) return null;
  var offset = data.utc_offset_seconds;
  var now = Date.now();
  var todayStr = new Date(now + offset * 1000).toISOString().slice(0, 10);
  var daylight = hwDaylightWindow(data, offset);
  var best = null;
  for(var i = 0; i < times.length; i++){
    var ms = hwRealTimeMs(times[i], offset);
    if(ms < now) continue;
    var localStr = new Date(ms + offset * 1000).toISOString().slice(0, 10);
    if(localStr !== todayStr) continue;
    if(daylight && (ms < daylight.start || ms > daylight.end)) continue;
    var s = hwCalcScore(temps[i], precip[i] || 0, wind[i] || 0);
    if(!best || s.score > best.score.score){
      best = { time: times[i], score: s, temp: temps[i], precip: precip[i] };
    }
  }
  return best;
}
function hwRenderActivityTip(containerId, weatherData){
  var el = document.getElementById(containerId);
  if(!el) return false;
  var best = hwFindBestOutdoorHour(weatherData);
  if(!best){ el.innerHTML = ''; return false; }
  var hourLabel = new Date(best.time).getHours() + ' Uhr';
  var dotColor = best.score.stufe === 'gruen' ? 'var(--green-dot)' : (best.score.stufe === 'gelb' ? 'var(--yellow-dot)' : 'var(--red-dot)');
  el.innerHTML =
    '<div class="hw-row"><span>Beste Zeit heute</span><span style="color:' + dotColor + ';font-weight:700;">' + hourLabel + '</span></div>' +
    '<div class="hw-row"><span>Temperatur</span><span>' + Math.round(best.temp) + ' °C</span></div>' +
    '<div class="hw-row"><span>Regenwahrscheinlichkeit</span><span>' + (best.precip != null ? best.precip + ' %' : '–') + '</span></div>' +
    '<p style="text-align:center;margin:8px 0 0;color:var(--text-secondary);">' + best.score.label + '</p>';
  return true;
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
  if(maxVal < 20) return { stufe: 'gruen', dot: '🟢' };
  if(maxVal < 100) return { stufe: 'gelb', dot: '🟡' };
  return { stufe: 'rot', dot: '🔴' };
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

/* ---------- Sonnenschutz-Tipp (Circa-Zeit bis Sonnenbrand nach UV-Index) ---------- */
/* Grobe Orientierungswerte nach der gängigen dermatologischen Faustformel Minuten ≈ 200 / UV-Index
   für helle Haut (Fitzpatrick I–II), mit üblichen Multiplikatoren für mittlere und dunkle Hauttypen.
   Reine Circa-Angabe ohne individuelle Faktoren (Sonnenschutzmittel, Höhenlage, Reflexion) – ersetzt
   keine persönliche Einschätzung. */
function hwSunburnEstimate(uvIndex){
  if(uvIndex == null || uvIndex < 1) return null;
  var base = 200 / uvIndex;
  return {
    hell: Math.round(base),
    mittel: Math.round(base * 1.5),
    dunkel: Math.round(base * 2.5)
  };
}
function hwRenderSunburnTip(containerId, uvIndex){
  var el = document.getElementById(containerId);
  if(!el) return false;
  var est = hwSunburnEstimate(uvIndex);
  if(!est){ el.innerHTML = ''; return false; }
  el.innerHTML =
    '<div class="hw-row"><span>Helle Haut</span><span>ca. ' + est.hell + ' Min.</span></div>' +
    '<div class="hw-row"><span>Mittlere Haut</span><span>ca. ' + est.mittel + ' Min.</span></div>' +
    '<div class="hw-row" style="border-bottom:none;"><span>Dunkle Haut</span><span>ca. ' + est.dunkel + ' Min.</span></div>' +
    '<p style="font-size:12px;color:var(--text-secondary);margin-top:8px;">Grobe Circa-Angabe ungeschützter Haut nach Standardformel – individuell abweichend, ersetzt keine persönliche Einschätzung.</p>';
  return true;
}

/* ---------- Wäsche-Trocken-Index (beste Stunde heute zum Wäscheaufhängen draußen) ---------- */
/* Begünstigt hohe Temperatur, Wind und niedrige Luftfeuchtigkeit, bestraft Regenwahrscheinlichkeit. */
function hwCalcLaundryScore(temp, humidity, wind, precipProb){
  var score = 40 + (temp - 10) * 1.8 + wind * 1.1 + (60 - humidity) * 0.9;
  score -= precipProb * 1.3;
  score = Math.max(0, Math.min(100, Math.round(score)));
  var stufe = score >= 65 ? 'gruen' : (score >= 35 ? 'gelb' : 'rot');
  var label = score >= 65 ? 'Gut zum Trocknen geeignet' : (score >= 35 ? 'Mit Geduld möglich' : 'Eher drinnen trocknen');
  return { score: score, stufe: stufe, label: label };
}
/* Suche ebenfalls auf Tageslichtstunden begrenzt (Sonnenaufgang bis Sonnenuntergang) – Wäsche draußen
   aufzuhängen macht nach Einbruch der Dunkelheit praktisch keinen Sinn. */
function hwFindBestLaundryHour(data){
  var times = data.hourly && data.hourly.time;
  var temps = data.hourly && data.hourly.temperature_2m;
  var humidity = data.hourly && data.hourly.relative_humidity_2m;
  var precip = data.hourly && data.hourly.precipitation_probability;
  var wind = data.hourly && data.hourly.wind_speed_10m;
  if(!times || !temps || !humidity || !precip || !wind) return null;
  var offset = data.utc_offset_seconds;
  var now = Date.now();
  var todayStr = new Date(now + offset * 1000).toISOString().slice(0, 10);
  var daylight = hwDaylightWindow(data, offset);
  var best = null;
  for(var i = 0; i < times.length; i++){
    var ms = hwRealTimeMs(times[i], offset);
    if(ms < now) continue;
    var localStr = new Date(ms + offset * 1000).toISOString().slice(0, 10);
    if(localStr !== todayStr) continue;
    if(daylight && (ms < daylight.start || ms > daylight.end)) continue;
    var s = hwCalcLaundryScore(temps[i], humidity[i] || 0, wind[i] || 0, precip[i] || 0);
    if(!best || s.score > best.score.score){
      best = { time: times[i], score: s, temp: temps[i], humidity: humidity[i], wind: wind[i] };
    }
  }
  return best;
}
function hwRenderLaundryTip(containerId, weatherData){
  var el = document.getElementById(containerId);
  if(!el) return false;
  var best = hwFindBestLaundryHour(weatherData);
  if(!best){ el.innerHTML = ''; return false; }
  var hourLabel = new Date(best.time).getHours() + ' Uhr';
  var dotColor = best.score.stufe === 'gruen' ? 'var(--green-dot)' : (best.score.stufe === 'gelb' ? 'var(--yellow-dot)' : 'var(--red-dot)');
  el.innerHTML =
    '<div class="hw-row"><span>Beste Zeit heute</span><span style="color:' + dotColor + ';font-weight:700;">' + hourLabel + '</span></div>' +
    '<div class="hw-row"><span>Temperatur</span><span>' + Math.round(best.temp) + ' °C</span></div>' +
    '<div class="hw-row"><span>Luftfeuchtigkeit</span><span>' + Math.round(best.humidity) + ' %</span></div>' +
    '<div class="hw-row" style="border-bottom:none;"><span>Wind</span><span>' + Math.round(best.wind) + ' km/h</span></div>' +
    '<p style="text-align:center;margin:8px 0 0;color:var(--text-secondary);">' + best.score.label + '</p>';
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
    '<div class="hw-row"><span>' + moon.icon + ' Mondlicht</span><span>' + moon.illumination + ' %</span></div>' +
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
    current: 'european_aqi,pm10,pm2_5,ozone,nitrogen_dioxide,uv_index,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen',
    hourly: 'alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen',
    forecast_days: '5',
    timezone: 'auto'
  });
  return fetch('https://air-quality-api.open-meteo.com/v1/air-quality?' + params.toString())
    .then(function(r){ if(!r.ok) throw new Error('Umweltdienst nicht erreichbar'); return r.json(); });
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
  if(diff > 1){ trend = 'steigend'; icon = '↗'; }
  else if(diff < -1){ trend = 'fallend'; icon = '↘'; }
  else { trend = 'stabil'; icon = '→'; }
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
        '<div class="hw-row" style="border-bottom:none;"><span>Wind' + (d.wind_gusts_10m_max && d.wind_gusts_10m_max[i] >= 60 ? ' ⚠️' : '') + '</span><span' + (d.wind_gusts_10m_max && d.wind_gusts_10m_max[i] >= 60 ? ' style="color:var(--red-fg);font-weight:700;"' : '') + '>' + Math.round(d.wind_speed_10m_max[i]) + ' km/h' + (d.wind_gusts_10m_max && d.wind_gusts_10m_max[i] != null ? ' (Böen ' + Math.round(d.wind_gusts_10m_max[i]) + ')' : '') + '</span></div>' +
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
    rows.push(['Windböen (max.)' + (gust >= 60 ? ' ⚠️' : ''), Math.round(gust) + ' km/h']);
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
var HW_SECTION_KEYS_DEFAULT = ['quicktiles','hero','lage','activity','laundry','hourly','forecast','details'];
var HW_SECTION_META = {
  quicktiles: { icon:'🔗', label:'Schnellzugriff (Umweltbelastung/Abendrot)' },
  hero:       { icon:'🌤️', label:'Himmel-Übersicht' },
  lage:       { icon:'📍', label:'Aktuelle Lage' },
  activity:   { icon:'🚶', label:'Beste Zeit für draußen' },
  laundry:    { icon:'👕', label:'Wäsche-Trocken-Index' },
  hourly:     { icon:'🕐', label:'Stündlicher Verlauf' },
  forecast:   { icon:'📅', label:'Vorhersage' },
  details:    { icon:'📊', label:'Weitere Details' }
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
        '<button type="button" aria-label="' + meta.label + ' nach oben" data-dir="up" data-idx="' + i + '"' + (i === 0 ? ' disabled' : '') + '>↑</button>' +
        '<button type="button" aria-label="' + meta.label + ' nach unten" data-dir="down" data-idx="' + i + '"' + (i === order.length - 1 ? ' disabled' : '') + '>↓</button>' +
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
  temp:       { icon:'🌡️', label:'Gefühlte Temperatur' },
  humid:      { icon:'💧', label:'Luftfeuchtigkeit' },
  dew:        { icon:'🌫️', label:'Taupunkt' },
  pressure:   { icon:'📊', label:'Luftdruck' },
  windgust:   { icon:'💨', label:'Windböen' },
  winddir:    { icon:'🧭', label:'Windrichtung' },
  visibility: { icon:'👁️', label:'Sichtweite' },
  radiation:  { icon:'☀️', label:'Sonneneinstrahlung' },
  sunshine:   { icon:'🌞', label:'Sonnenschein heute' },
  snow:       { icon:'❄️', label:'Schneefall heute' }
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
    map.temp = { cls:'hw-stat-temp', icon:'🌡️', value: Math.round(c.apparent_temperature) + '°C', label:'Gefühlt',
      desc:'Berücksichtigt neben der Lufttemperatur auch Wind und Luftfeuchtigkeit – also wie warm oder kalt sich das Wetter tatsächlich anfühlt.' };
  }
  if(c.relative_humidity_2m != null){
    map.humid = { cls:'hw-stat-humid', icon:'💧', value: c.relative_humidity_2m + ' %', label:'Luftfeuchtigkeit',
      desc:'Der Anteil an Wasserdampf in der Luft, angegeben relativ zur maximal möglichen Menge bei der aktuellen Temperatur.' };
  }
  if(c.dew_point_2m != null){
    map.dew = { cls:'hw-stat-dew', icon:'🌫️', value: Math.round(c.dew_point_2m) + '°C', label:'Taupunkt',
      desc:'Die Temperatur, auf die die Luft abkühlen müsste, damit sich Wasserdampf als Tau niederschlägt. Ab etwa 16–18 °C wird die Luft meist als schwül empfunden.' };
  }
  if(c.pressure_msl != null){
    var trend = hwPressureTrend(weatherData);
    map.pressure = { cls:'hw-stat-pressure', icon:'📊', value: Math.round(c.pressure_msl) + ' hPa', label: 'Luftdruck' + (trend ? ' ' + trend.icon + ' ' + trend.trend : ''),
      desc:'Der Luftdruck auf Meereshöhe. Ein fallender Trend deutet häufig auf eine Wetterverschlechterung hin, ein steigender auf eine Besserung.' };
  }
  if(c.wind_gusts_10m != null){
    var stormy = c.wind_gusts_10m >= 60;
    map.windgust = { cls:'hw-stat-wind' + (stormy ? ' hw-stat-storm' : ''), icon:'💨', value: Math.round(c.wind_gusts_10m) + ' km/h', label: stormy ? 'Windböen ⚠️' : 'Windböen',
      desc:'Die höchste erwartete kurzzeitige Windgeschwindigkeit – meist deutlich stärker als der mittlere, anhaltende Wind.' + (stormy ? ' Aktuell im stürmischen Bereich (ab 60 km/h).' : '') };
  }
  if(c.wind_direction_10m != null){
    var arrowHtml = '<span class="hw-wind-arrow" style="display:inline-block;transform:rotate(' + c.wind_direction_10m + 'deg);">↑</span>';
    map.winddir = { cls:'hw-stat-wind', icon: arrowHtml, value: hwCompassDirection(c.wind_direction_10m), label:'Windrichtung',
      desc:'Die Richtung, aus der der Wind weht, als Kompassrichtung (' + c.wind_direction_10m + '°).' };
  }
  if(c.visibility != null){
    map.visibility = { cls:'hw-stat-visibility', icon:'👁️', value: (c.visibility/1000).toFixed(1) + ' km', label:'Sichtweite',
      desc:'Die Entfernung, bis zu der Objekte bei den aktuellen Wetterbedingungen (z. B. Nebel, Regen) noch erkennbar sind.' };
  }
  if(c.shortwave_radiation != null){
    map.radiation = { cls:'hw-stat-sun', icon:'☀️', value: Math.round(c.shortwave_radiation) + ' W/m²', label:'Sonneneinstrahlung',
      desc:'Die aktuelle Strahlungsleistung der Sonne pro Quadratmeter, die auf den Boden trifft.' };
  }
  if(d && d.sunshine_duration && d.sunshine_duration[0] != null){
    map.sunshine = { cls:'hw-stat-sun', icon:'🌞', value: hwFormatDuration(d.sunshine_duration[0]), label:'Sonnenschein heute',
      desc:'Die für heute berechnete Gesamtdauer an direktem Sonnenschein (ohne Wolkenbedeckung).' };
  }
  if(d && d.snowfall_sum && d.snowfall_sum[0] > 0){
    map.snow = { cls:'hw-stat-snow', icon:'❄️', value: d.snowfall_sum[0] + ' cm', label:'Schneefall heute',
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
    { max:0.02, name:'Neumond', icon:'🌑' },
    { max:0.24, name:'Zunehmende Sichel', icon:'🌒' },
    { max:0.26, name:'Erstes Viertel', icon:'🌓' },
    { max:0.49, name:'Zunehmender Mond', icon:'🌔' },
    { max:0.51, name:'Vollmond', icon:'🌕' },
    { max:0.74, name:'Abnehmender Mond', icon:'🌖' },
    { max:0.76, name:'Letztes Viertel', icon:'🌗' },
    { max:0.98, name:'Abnehmende Sichel', icon:'🌘' },
    { max:1.01, name:'Neumond', icon:'🌑' }
  ];
  var entry = steps[steps.length - 1];
  for(var i=0;i<steps.length;i++){ if(frac <= steps[i].max){ entry = steps[i]; break; } }
  return { fraction: frac, illumination: illumination, name: entry.name, icon: entry.icon };
}
function hwRenderMoonPhase(containerId){
  var el = document.getElementById(containerId);
  if(!el) return;
  var m = hwMoonPhase(new Date());
  el.innerHTML =
    '<div class="hw-row" style="border-bottom:none;">' +
      '<span>' + m.icon + ' Mondphase</span>' +
      '<span>' + m.name + ' · ' + m.illumination + ' % beleuchtet</span>' +
    '</div>';
}

document.addEventListener('DOMContentLoaded', hwInitTheme);
