/* ==========================================================================
   Mind Grace — translation engine (loaded by assets/js/translate.js)

   Why this exists: Google's official element widget
   (https://translate.google.com/translate_a/element.js) is an unofficially
   deprecated embed. It renders a hidden cross-origin iframe whose <select>
   (.goog-te-combo) we used to drive programmatically. In many environments
   the iframe never injects the select, so clicking "हिन्दी" or a language
   silently did nothing — the buttons were effectively placeholders.

   This engine makes every language button actually translate the page:

     1. Preferred path — Google Translate *proxy* mode (no external script,
        no banner chrome): fetches the same-domain path through
        https://translate.google.com/translate?u=<path>&sl&tl&hl, extracts
        <main> from the response and swaps it into the live page. The URL
        stays on our domain, back/forward works via hashchange, and all
        internal links keep translating while a language is active.

     2. Fallback — if proxy mode fails (network blocked, response shape
        changed), the engine attempts the legacy Google element widget; if
        that also fails, it opens the user-visible Google Translate page for
        the current URL in a new tab, so the feature is never a dead button.

   State persists in localStorage("mg-lang") + cookie("mg-lang") exactly as
   before, so translate.js restores the chosen language after navigation.
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'mg-lang';

  /* ---------------- storage helpers (mirror translate.js) --------------- */
  function getStoredLang() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v !== null && v !== undefined) return v;
    } catch (e) { /* private mode */ }
    try {
      var m = document.cookie.match(/(?:^|;\s*)mg-lang=([^;]*)/);
      if (m) return decodeURIComponent(m[1]);
    } catch (e) { /* ignore */ }
    return '';
  }

  function storeLang(code) {
    try { localStorage.setItem(STORAGE_KEY, code || ''); } catch (e) { /* private mode */ }
    try {
      var d = new Date(Date.now() + 7 * 864e5).toUTCString();
      document.cookie = 'mg-lang=' + encodeURIComponent(code || '') +
        '; path=/; expires=' + d + '; SameSite=Lax';
    } catch (e) { /* cookies disabled too */ }
  }

  /* ---------------- tiny status toast (a11y-safe) ----------------------- */
  function toast(msg) {
    var el = document.getElementById('mg-t-status');
    if (!el) {
      el = document.createElement('div');
      el.id = 'mg-t-status';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      el.className = 'mg-t-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(el.__t);
    el.__t = setTimeout(function () { el.classList.remove('is-visible'); }, 3500);
  }

  /* ---------------- language-name lookup -------------------------------- */
  var NAMES = {
    hi: 'Hindi', bn: 'Bengali', ta: 'Tamil', te: 'Telugu', mr: 'Marathi',
    gu: 'Gujarati', kn: 'Kannada', ml: 'Malayalam', pa: 'Punjabi', ur: 'Urdu',
    es: 'Spanish', fr: 'French', de: 'German', ar: 'Arabic', zh: 'Chinese',
    ja: 'Japanese', ru: 'Russian'
  };
  function langName(code) { return NAMES[code] || code; }

  /* ---------------- Google proxy-mode URL builder ----------------------- */
  // Strip any previously injected translate params so they never accumulate.
  function cleanPath() {
    var p = location.pathname;
    var h = location.hash.replace(/^#mg-tr=[^&]*&/, '#').replace(/^#mg-tr=[^&]*$/, '');
    return p + location.search + h;
  }

  function proxyUrl(lang, path) {
    var target = location.origin + (path || cleanPath());
    return 'https://translate.google.com/translate?jl=&sl=en&tl=' +
      encodeURIComponent(lang) + '&hl=en&u=' + encodeURIComponent(target);
  }

  /* ---------------- main-content extraction ----------------------------- */
  function extractMain(htmlText) {
    var doc = new DOMParser().parseFromString(htmlText, 'text/html');
    var main = doc.querySelector('main') || doc.querySelector('#main-content') || doc.body;
    return main ? main.innerHTML : null;
  }

  /* ---------------- apply / restore ------------------------------------- */
  var originalMainHTML = null;
  var originalTitle = null;

  function snapshotOriginal() {
    var main = document.querySelector('main') || document.getElementById('main-content');
    if (main && originalMainHTML === null) {
      originalMainHTML = main.innerHTML;
      originalTitle = document.title;
    }
  }

  function restoreOriginal() {
    history.replaceState(null, '', cleanPath());
    storeLang('');
    var main = document.querySelector('main') || document.getElementById('main-content');
    if (originalMainHTML !== null && main) {
      main.innerHTML = originalMainHTML;
      if (originalTitle !== null) document.title = originalTitle;
      toast('Back to English');
      window.dispatchEvent(new CustomEvent('mg-translate-changed', { detail: { lang: '' } }));
    } else {
      // Fresh page load with a stale saved language — full reload is the
      // cleanest way back to the untranslated site.
      location.reload();
    }
  }

  function applyProxy(lang) {
    var url = proxyUrl(lang);
    return fetch(url, { credentials: 'omit' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (htmlText) {
        var inner = extractMain(htmlText);
        if (!inner || inner.length < 200) throw new Error('empty extract');
        snapshotOriginal();
        var main = document.querySelector('main') || document.getElementById('main-content');
        if (!main) {
          main = document.createElement('main');
          document.body.insertBefore(main, document.body.firstChild);
        }
        main.innerHTML = inner;
        document.title = langName(lang) + ' — ' + (originalTitle || document.title).replace(/^[A-Z][a-z]+ — /, '');
        // Record language+path in the hash so reload/back can restore it.
        history.replaceState({ mgTr: lang }, '', '#mg-tr=' + lang + '|' + location.pathname);
        storeLang(lang);
        toast('Translated to ' + langName(lang));
        window.dispatchEvent(new CustomEvent('mg-translate-changed', { detail: { lang: lang } }));
      });
  }

  /* ---------------- legacy element-widget fallback ---------------------- */
  function tryLegacyWidget(lang) {
    return new Promise(function (resolve, reject) {
      if (!document.getElementById('google_translate_element')) {
        var mount = document.createElement('div');
        mount.id = 'google_translate_element';
        mount.className = 'skiptranslate notranslate';
        mount.style.display = 'none';
        document.body.appendChild(mount);
      }
      window.googleTranslateElementInit = window.googleTranslateElementInit || function () {};
      var origInit = window.googleTranslateElementInit;
      window.googleTranslateElementInit = function () {
        try { origInit(); } catch (e) { /* noop */ }
        if (window.google && google.translate && google.translate.TranslateElement) {
          try {
            new google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'google_translate_element');
          } catch (e) { /* noop */ }
        }
        var tries = 0;
        (function waitCombo() {
          var combo = document.querySelector('.goog-te-combo');
          if (combo) {
            combo.value = lang;
            try { combo.dispatchEvent(new Event('change')); } catch (e) { /* noop */ }
            resolve();
          } else if (tries++ < 12) {
            setTimeout(waitCombo, 250);
          } else {
            reject(new Error('widget select never appeared'));
          }
        })();
      };
      if (!document.getElementById('mg-gtranslate-script')) {
        var s = document.createElement('script');
        s.id = 'mg-gtranslate-script';
        s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        s.async = true;
        s.onerror = function () { reject(new Error('element.js failed to load')); };
        document.head.appendChild(s);
      }
    });
  }

  /* ---------------- public API used by translate.js --------------------- */
  function setLanguage(lang) {
    lang = lang || '';
    if (!lang) { restoreOriginal(); return Promise.resolve(); }
    window.__mgEngineApplying = lang;
    return applyProxy(lang)['catch'](function () {
      return tryLegacyWidget(lang)['catch'](function () {
        // Last resort: open Google Translate's own UI for this page.
        storeLang(lang);
        toast('Opening Google Translate in a new tab…');
        window.open(proxyUrl(lang), '_blank', 'noopener');
      });
    })['finally'](function () { window.__mgEngineApplying = undefined; });
  }

  window.mgTranslateEngine = {
    setLanguage: setLanguage,
    getStoredLang: getStoredLang,
    storeLang: storeLang,
    toast: toast
  };

  /* ---------------- boot: restore saved language after navigation ------- */
  function boot() {
    // Hash wins over storage (handles back/forward within a translated session).
    var m = location.hash.match(/^#mg-tr=([^|]+)\|(.*)$/);
    var lang = m ? m[1] : getStoredLang();
    if (!lang) return;
    // Avoid double-fetching when translate.js already routed this click here.
    if (window.__mgEngineApplying === lang) return;
    window.__mgEngineApplying = lang;
    setLanguage(lang)['finally'](function () { window.__mgEngineApplying = undefined; });
  }

  window.addEventListener('hashchange', function () {
    var m = location.hash.match(/^#mg-tr=([^|]+)\|(.*)$/);
    if (!m && getStoredLang()) {
      // User removed the translation hash (e.g. pressed browser Back) —
      // go back to the original English content.
      restoreOriginal();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
