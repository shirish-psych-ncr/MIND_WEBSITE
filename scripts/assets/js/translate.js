/* Translation opens Google's public website translator; no API, fetch, or DOM replacement. */
(function () {
  'use strict';
  var LANGUAGES = [
    { code: '',      en: 'English (original)', native: 'Original' },
    { code: 'hi',    en: 'Hindi',              native: 'हिन्दी' },
    { code: 'bn',    en: 'Bengali',            native: 'বাংলা' },
    { code: 'ta',    en: 'Tamil',              native: 'தமிழ்' },
    { code: 'te',    en: 'Telugu',             native: 'తెలుగు' },
    { code: 'mr',    en: 'Marathi',            native: 'मराठी' },
    { code: 'gu',    en: 'Gujarati',           native: 'ગુજરાતી' },
    { code: 'kn',    en: 'Kannada',            native: 'ಕನ್ನಡ' },
    { code: 'ml',    en: 'Malayalam',          native: 'മലയാളം' },
    { code: 'pa',    en: 'Punjabi',            native: 'ਪੰਜਾਬੀ' },
    { code: 'ur',    en: 'Urdu',               native: 'اردو' },
    { code: 'es',    en: 'Spanish',            native: 'Español' },
    { code: 'fr',    en: 'French',             native: 'Français' },
    { code: 'de',    en: 'German',             native: 'Deutsch' },
    { code: 'ar',    en: 'Arabic',             native: 'العربية' },
    { code: 'zh-CN', en: 'Chinese',            native: '中文' },
    { code: 'ja',    en: 'Japanese',           native: '日本語' },
    { code: 'ru',    en: 'Russian',            native: 'Русский' }
  ];


  function translationUrl(code) {
    var canonical = document.querySelector('link[rel="canonical"]');
    var page = new URL(canonical ? canonical.href : location.pathname, 'https://mindgracencr.in');
    // Only the published page path is sent, never form values or query strings.
    var target = 'https://mindgracencr.in' + page.pathname + location.hash;
    return code ? 'https://translate.google.com/translate?sl=en&tl=' + encodeURIComponent(code) + '&u=' + encodeURIComponent(target) : target;
  }
  function init() {
    if (document.getElementById('mg-translate-root')) return;
    var host = document.querySelector('.header-actions');
    if (!host) return;
    var root = document.createElement('div');
    root.id = 'mg-translate-root'; root.className = 'mg-translate notranslate'; root.setAttribute('translate','no');
    var hindi = document.createElement('a'); hindi.id = 'mg-t-hindi-btn'; hindi.className = 'mg-t-btn mg-t-hindi';
    hindi.href = translationUrl('hi'); hindi.textContent = 'हिन्दी'; hindi.lang = 'hi'; hindi.target = '_blank'; hindi.rel = 'noopener noreferrer'; hindi.setAttribute('aria-label','Read in Hindi with Google Translate (opens new tab)');
    var toggle = document.createElement('button'); toggle.type = 'button'; toggle.id = 'mg-t-menu-btn'; toggle.className = 'mg-t-btn'; toggle.textContent = 'Translate'; toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-controls','mg-t-panel');
    var panel = document.createElement('div'); panel.id = 'mg-t-panel'; panel.className = 'mg-t-panel'; panel.hidden = true;
    var note = document.createElement('p'); note.className = 'mg-t-panel-title'; note.textContent = 'Opens Google Translate in a new tab. Machine translations may contain errors.'; panel.appendChild(note);
    LANGUAGES.forEach(function (lang) {
      var link = document.createElement('a'); link.className = 'mg-t-lang'; link.href = translationUrl(lang.code); link.textContent = lang.en + ' · ' + lang.native;
      if (lang.code) { link.target='_blank'; link.rel='noopener noreferrer'; }
      panel.appendChild(link);
    });
    root.append(hindi,toggle,panel); host.prepend(root);
    function close(focus) { panel.hidden=true; toggle.setAttribute('aria-expanded','false'); root.classList.remove('is-open'); if(focus) toggle.focus(); }
    toggle.addEventListener('click',function(){ var open=panel.hidden; panel.hidden=!open; toggle.setAttribute('aria-expanded',String(open)); root.classList.toggle('is-open',open); if(open) panel.querySelector('a').focus(); });
    root.addEventListener('keydown',function(e){if(e.key==='Escape'){close(true);}});
    document.addEventListener('click',function(e){if(!root.contains(e.target)) close(false);});
    root.addEventListener('focusout',function(e){if(!root.contains(e.relatedTarget)) close(false);});
  }
  window.mgTranslateTo = function(code) { location.assign(translationUrl(code)); };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  window.addEventListener('mindgrace:chrome-ready',init);
})();
