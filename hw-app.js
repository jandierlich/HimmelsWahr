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

/* ---------- Standort-Auswahl (wiederverwendbares Overlay für alle Seiten) ---------- */
function hwOpenLocationPicker(){
  if(document.getElementById('hw-loc-overlay')) return;
  var overlay = document.createElement('div');
  overlay.id = 'hw-loc-overlay';
  overlay.className = 'hw-loc-overlay';
  overlay.innerHTML =
    '<div class="hw-loc-modal">' +
      '<h2 style="margin:0 0 10px;">Standort wählen</h2>' +
      '<button class="hw-btn primary" id="hw-loc-auto-btn" style="margin-bottom:10px;">📍 Automatisch (mein Standort)</button>' +
      '<input type="text" id="hw-loc-search" placeholder="Ort eingeben, z. B. Hamburg" autocomplete="off">' +
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

  var searchInput = document.getElementById('hw-loc-search');
  var searchTimer = null;
  searchInput.addEventListener('input', function(){
    var q = searchInput.value.trim();
    clearTimeout(searchTimer);
    var resultsEl = document.getElementById('hw-loc-results');
    if(q.length < 2){ resultsEl.innerHTML = ''; return; }
    searchTimer = setTimeout(function(){
      resultsEl.innerHTML = '<p style="font-size:13px;color:var(--text-secondary);">Suche …</p>';
      hwGeocodeSearch(q).then(function(results){
        if(!results.length){ resultsEl.innerHTML = '<p style="font-size:13px;color:var(--text-secondary);">Keine Treffer.</p>'; return; }
        resultsEl.innerHTML = results.map(function(r, i){
          var parts = [r.name];
          if(r.admin1) parts.push(r.admin1);
          if(r.country) parts.push(r.country);
          return '<button class="hw-loc-result-item" data-idx="' + i + '">' + parts.join(', ') + '</button>';
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
      }).catch(function(){
        resultsEl.innerHTML = '<p style="font-size:13px;color:var(--text-secondary);">Suche derzeit nicht verfügbar.</p>';
      });
    }, 400);
  });
  setTimeout(function(){ searchInput.focus(); }, 50);
}
function hwCloseLocationPicker(){
  var overlay = document.getElementById('hw-loc-overlay');
  if(overlay) overlay.remove();
}

/* ---------- Open-Meteo ---------- */
/* Wetterdaten von Open-Meteo.com — CC BY 4.0, Attribution im UI erforderlich (siehe hw-attrib in jeder Seite) */
function hwFetchWeather(lat, lon){
  var params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lon.toFixed(4),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,dew_point_2m,pressure_msl,surface_pressure,precipitation_probability,weather_code,cloud_cover,wind_speed_10m,wind_gusts_10m,wind_direction_10m,is_day,uv_index,visibility,shortwave_radiation',
    hourly: 'temperature_2m,weather_code,is_day,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,precipitation_probability,wind_speed_10m,pressure_msl',
    daily: 'sunset,sunrise,weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,uv_index_max,sunshine_duration,daylight_duration,snowfall_sum',
    timezone: 'auto',
    forecast_days: '7'
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

/* ---------- Regenwahrscheinlichkeit stundenweise (grafische Balkendarstellung) ---------- */
/* Baut aus den bereits geladenen hourly-Daten die Werte der nächsten Stunden.
   hours: wie viele Folgestunden zusätzlich zur aktuellen Stunde angezeigt werden (Standard 5). */
function hwHourlyPrecipData(data, hours){
  hours = hours || 5;
  var times = data.hourly && data.hourly.time;
  var precip = data.hourly && data.hourly.precipitation_probability;
  if(!times || !precip) return null;
  var now = new Date();
  var idx0 = times.findIndex(function(t){ return new Date(t) >= now; });
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
  var now = new Date();
  var idx0 = times.findIndex(function(t){ return new Date(t) >= now; });
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
function hwRenderForecast(containerId, weatherData){
  var el = document.getElementById(containerId);
  if(!el) return;
  var d = weatherData.daily;
  if(!d || !d.time || d.time.length < 2){ el.innerHTML = ''; return; }
  var monthNames = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
  var cards = [];
  for(var i = 1; i < d.time.length && i <= 6; i++){
    var dt = new Date(d.time[i]);
    var dateLabel = dt.getDate() + '. ' + monthNames[dt.getMonth()];
    cards.push(
      '<div class="hw-forecast-day">' +
        '<div class="hw-forecast-day-head">' +
          '<span class="hw-forecast-weekday">' + hwWeekdayShort(d.time[i]) + ', ' + dateLabel + '</span>' +
          '<span style="color:' + hwWeatherIconColor(d.weather_code[i]) + ';">' + hwWeatherIcon(d.weather_code[i], 26) + '</span>' +
        '</div>' +
        '<div class="hw-forecast-desc">' + hwWeatherCodeText(d.weather_code[i]) + '</div>' +
        '<div class="hw-forecast-temps"><strong>' + Math.round(d.temperature_2m_max[i]) + '°</strong> / ' + Math.round(d.temperature_2m_min[i]) + '°</div>' +
        '<div class="hw-row"><span>Regen</span><span>' + d.precipitation_probability_max[i] + ' % · ' + d.precipitation_sum[i].toFixed(1) + ' mm</span></div>' +
        '<div class="hw-row"><span>Wind</span><span>' + Math.round(d.wind_speed_10m_max[i]) + ' km/h</span></div>' +
        '<div class="hw-row"><span>UV-Index</span><span>' + Math.round(d.uv_index_max[i]) + '</span></div>' +
      '</div>'
    );
  }
  el.innerHTML = cards.join('');
}

/* ---------- Farbenfrohe Detail-Kacheln (gefühlte Temperatur, Luftfeuchtigkeit, Wind, Luftdruck, Sonne, Sicht, Schnee) ---------- */
function hwRenderDetailTiles(weatherData){
  var el = document.getElementById('hw-stat-grid');
  if(!el) return;
  var c = weatherData.current;
  var d = weatherData.daily;
  var tiles = [];

  if(c.apparent_temperature != null){
    tiles.push({ cls:'hw-stat-temp', icon:'🌡️', value: Math.round(c.apparent_temperature) + '°C', label:'Gefühlt' });
  }
  if(c.relative_humidity_2m != null){
    tiles.push({ cls:'hw-stat-humid', icon:'💧', value: c.relative_humidity_2m + ' %', label:'Luftfeuchtigkeit' });
  }
  if(c.dew_point_2m != null){
    tiles.push({ cls:'hw-stat-dew', icon:'🌫️', value: Math.round(c.dew_point_2m) + '°C', label:'Taupunkt' });
  }
  if(c.pressure_msl != null){
    var trend = hwPressureTrend(weatherData);
    tiles.push({ cls:'hw-stat-pressure', icon:'📊', value: Math.round(c.pressure_msl) + ' hPa', label: 'Luftdruck' + (trend ? ' ' + trend.icon + ' ' + trend.trend : '') });
  }
  if(c.wind_gusts_10m != null){
    tiles.push({ cls:'hw-stat-wind', icon:'💨', value: Math.round(c.wind_gusts_10m) + ' km/h', label:'Windböen' });
  }
  if(c.wind_direction_10m != null){
    var arrowHtml = '<span class="hw-wind-arrow" style="display:inline-block;transform:rotate(' + c.wind_direction_10m + 'deg);">↑</span>';
    tiles.push({ cls:'hw-stat-wind', icon: arrowHtml, value: hwCompassDirection(c.wind_direction_10m), label:'Windrichtung' });
  }
  if(c.visibility != null){
    tiles.push({ cls:'hw-stat-visibility', icon:'👁️', value: (c.visibility/1000).toFixed(1) + ' km', label:'Sichtweite' });
  }
  if(c.shortwave_radiation != null){
    tiles.push({ cls:'hw-stat-sun', icon:'☀️', value: Math.round(c.shortwave_radiation) + ' W/m²', label:'Sonneneinstrahlung' });
  }
  if(d && d.sunshine_duration && d.sunshine_duration[0] != null){
    tiles.push({ cls:'hw-stat-sun', icon:'🌞', value: hwFormatDuration(d.sunshine_duration[0]), label:'Sonnenschein heute' });
  }
  if(d && d.snowfall_sum && d.snowfall_sum[0] > 0){
    tiles.push({ cls:'hw-stat-snow', icon:'❄️', value: d.snowfall_sum[0] + ' cm', label:'Schneefall heute' });
  }

  el.innerHTML = tiles.map(function(t, i){
    return '<div class="hw-stat-tile ' + t.cls + '" style="animation-delay:' + (i*0.04) + 's;">' +
      '<span class="hw-stat-icon">' + t.icon + '</span>' +
      '<div class="hw-stat-value">' + t.value + '</div>' +
      '<div class="hw-stat-label">' + t.label + '</div>' +
    '</div>';
  }).join('');
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
function hwRenderSunArc(containerId, sunriseISO, sunsetISO){
  var el = document.getElementById(containerId);
  if(!el) return;
  var sunrise = new Date(sunriseISO).getTime(), sunset = new Date(sunsetISO).getTime();
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
  var now = new Date();
  var idx0 = times.findIndex(function(t){ return new Date(t) >= now; });
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
    html += '<div class="hw-sky-rain">' + drops + '</div>';
  }
  if(cond === 'snow'){
    var flakes = '';
    for(var f=0;f<12;f++){
      flakes += '<span class="hw-snowflake" style="left:' + ((f*8+4)%100) + '%;animation-delay:' + (f*0.4) + 's;"></span>';
    }
    html += '<div class="hw-sky-snow">' + flakes + '</div>';
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

document.addEventListener('DOMContentLoaded', hwInitTheme);
