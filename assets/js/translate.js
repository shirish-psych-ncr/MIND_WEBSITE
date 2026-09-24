/* ==========================================================================
   Mind Grace — Google Translate integration (site-wide)

   Renders two controls into every page header:
     1. A dedicated "हिन्दी" icon button — one click translates the whole
        site to Hindi (the default/quick language).
     2. A "Translate" button with a globe icon — clicking it opens a panel
        listing other languages (English/original, Bengali, Tamil, Telugu,
        Marathi, Gujarati, Kannada, Malayalam, Punjabi, Urdu, Spanish,
        French, German, Arabic, Chinese, Japanese, Russian...).

   Under the hood this drives the official Google Translate element widget
   (https://translate.google.com/translate_a/element.js) hidden inside
   #google_translate_element, and mirrors its state so both buttons stay in
   sync across navigation (persisted via localStorage key "mg-lang").

   The widget is marked class="notranslate" so our own UI never gets
   machine-translated mid-session.
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = '***';
  var DEFAULT_LANG = 'hi'; // Hindi quick-translate target

  // Languages shown in the dropdown panel (code, English name, native name).
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

  var ICON_GLOBE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/>' +
    '<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';

  var ICON_CHEVRON =
    '<svg class="mg-t-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' +
    'focusable="false"><path d="m6 9 6 6 6-6"/></svg>';

  function getStoredLang() {
    try { return localStorage.getItem(STORAGE_KEY) || ''; } catch (e) { return ''; }
  }

  function storeLang(code) {
    try { localStorage.setItem(STORAGE_KEY, code || ''); } catch (e) { /* private mode */ }
  }

  /* ------------------------------------------------------------------ *
   * Drive the real Google <select> (goog-te-combo) inside the hidden
   * gadget iframe, then dispatch change so translation kicks in.
   * ------------------------------------------------------------------ */
  function setGoogleLanguage(code) {
    var combo = document.querySelector('.goog-te-combo');
    if (!combo) return false;
    combo.value = code || '';
    try {
      combo.dispatchEvent(new Event('change'));
    } catch (e) {
      // Very old browsers: use an IE-compatible event.
      var evt = document.createEvent('HTMLEvents');
      evt.initEvent('change', false, true);
      combo.dispatchEvent(evt);
    }
    return true;
  }

  /* ------------------------------------------------------------------ *
   * Keep our buttons' pressed/current state in sync with the actual
   * translated language (covers back/forward cache restores too).
   * ------------------------------------------------------------------ */
  function refreshUiState(activeCode) {
    var hindiBtn = document.getElementById('mg-t-hindi-btn');
    var menuBtn = document.getElementById('mg-t-menu-btn');
    if (hindiBtn) {
      hindiBtn.setAttribute('aria-pressed', activeCode === DEFAULT_LANG ? 'true' : 'false');
    }
    if (menuBtn) {
      menuBtn.setAttribute(
        'aria-label',
        activeCode ? 'Change language (currently translated)' : 'Choose a language to translate this page into'
      );
    }
    var items = document.querySelectorAll('#mg-t-panel .mg-t-lang');
    for (var i = 0; i < items.length; i++) {
      var c = items[i].getAttribute('data-lang') || '';
      if (c === activeCode) {
        items[i].setAttribute('aria-current', 'true');
      } else {
        items[i].removeAttribute('aria-current');
      }
    }
  }

  /* ------------------------------------------------------------------ *
   * Public entry used by both buttons.
   * ------------------------------------------------------------------ */
  function trackEvent(name, props) {
    try {
      if (window.mgAnalytics && typeof window.mgAnalytics.track === 'function') {
        window.mgAnalytics.track(name, props || {});
      } else if (typeof window.gtag === 'function') {
        window.gtag('event', name, props || {});
      }
    } catch (e) { /* analytics optional */ }
  }

  function translateTo(code, opts) {
    code = code || '';
    var source = (opts && opts.source) || 'menu';
    storeLang(code);
    trackEvent('Language Selected', { language: code || 'original', source: source });
    if (setGoogleLanguage(code)) {
      refreshUiState(code);
      return;
    }
    // Widget not ready yet: remember intent; init callback will apply it.
    window.__mgPendingLang = code;
    loadGoogleWidget();
  }
  window.mgTranslateTo = translateTo;

  /* ------------------------------------------------------------------ *
   * Panel open/close behaviour.
   * ------------------------------------------------------------------ */
  function closePanel(root) {
    root.classList.remove('is-open');
    var panel = document.getElementById('mg-t-panel');
    if (panel) panel.hidden = true;
    var btn = document.getElementById('mg-t-menu-btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function togglePanel(root) {
    var isOpen = root.classList.contains('is-open');
    if (isOpen) {
      closePanel(root);
    } else {
      root.classList.add('is-open');
      var panel = document.getElementById('mg-t-panel');
      if (panel) panel.hidden = false;
      document.getElementById('mg-t-menu-btn').setAttribute('aria-expanded', 'true');
      var first = panel && panel.querySelector('.mg-t-lang');
      if (first) first.focus();
    }
  }

  /* ------------------------------------------------------------------ *
   * Build the markup. Inserted into the header nav when possible so it
   * inherits existing flex layout; otherwise appended to the header bar.
   * ------------------------------------------------------------------ */
  function buildControl() {
    if (document.getElementById('mg-translate-root')) return;

    var langItems = LANGUAGES.map(function (l) {
      return (
        '<li role="none">' +
        '<button type="button" role="menuitem" class="mg-t-lang" data-lang="' + l.code + '">' +
        '<span>' + l.en + '</span><span class="mg-t-lang-native">' + l.native + '</span>' +
        '</button></li>'
      );
    }).join('');

    var wrap = document.createElement('div');
    wrap.id = 'mg-translate-root';
    wrap.className = 'mg-translate notranslate';
    wrap.setAttribute('translate', 'no');
    wrap.innerHTML =
      '<button id="mg-t-hindi-btn" type="button" class="mg-t-btn mg-t-hindi" ' +
      'aria-pressed="false" title="इस पेज को हिन्दी में पढ़ें">' +
      'अ&nbsp;<span class="mg-t-label-full">हिन्दी</span></button>' +
      '<button id="mg-t-menu-btn" type="button" class="mg-t-btn" aria-haspopup="true" ' +
      'aria-expanded="false" aria-controls="mg-t-panel" title="Translate page / भाषा बदलें">' +
      ICON_GLOBE +
      '<span class="mg-t-label-full">Translate</span>' + ICON_CHEVRON + '</button>' +
      '<ul id="mg-t-panel" class="mg-t-panel" role="menu" aria-label="Page languages" hidden>' +
      '<li role="presentation" class="mg-t-panel-title">Translate this page</li>' +
      langItems + '</ul>';

    // Find a host: prefer the desktop nav list / nav element of the header.
    var header = document.querySelector('header.site-header, header');
    if (!header) header = document.body;
    var host =
      header.querySelector('.desktop-nav ul') ||
      header.querySelector('nav ul') ||
      header.querySelector('.nav-list') ||
      header.querySelector('.header-inner') ||
      header.querySelector('nav') ||
      header;

    if (host.tagName === 'UL') {
      var li = document.createElement('li');
      li.className = 'notranslate';
      li.appendChild(wrap);
      host.appendChild(li);
    } else {
      host.appendChild(wrap);
    }

    // Wire events.
    document.getElementById('mg-t-hindi-btn').addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      closePanel(wrap);
      translateTo(DEFAULT_LANG, { source: 'hindi_button' });
    });

    document.getElementById('mg-t-menu-btn').addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      togglePanel(wrap);
    });

    wrap.addEventListener('click', function (e) {
      var item = e.target.closest ? e.target.closest('.mg-t-lang') : null;
      if (!item) return;
      e.preventDefault();
      closePanel(wrap);
      translateTo(item.getAttribute('data-lang') || '', { source: 'panel' });
    });

    // Keyboard: Escape closes panel; arrow keys move through options.
    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closePanel(wrap);
        var b = document.getElementById('mg-t-menu-btn');
        if (b) b.focus();
        return;
      }
      if (!wrap.classList.contains('is-open')) return;
      var items = Array.prototype.slice.call(wrap.querySelectorAll('.mg-t-lang'));
      var idx = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length].focus(); }
    });

    // Click outside closes the panel.
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) closePanel(wrap);
    });
  }

  /* ------------------------------------------------------------------ *
   * Load the Google Translate element script once, create the hidden
   * mount point, and apply any stored/pending language on init.
   * ------------------------------------------------------------------ */
  var widgetLoading = false;

  window.googleTranslateElementInit = function () {
    // Widget DOM now exists; poll briefly for the inner <select>.
    var tries = 0;
    (function waitCombo() {
      var combo = document.querySelector('.goog-te-combo');
      var pending = window.__mgPendingLang !== undefined ? window.__mgPendingLang : getStoredLang();
      if (combo) {
        if (pending) {
          setGoogleLanguage(pending);
          refreshUiState(pending);
        }
        window.__mgPendingLang = undefined;
        // Keep UI honest if Google restored its own cookie-based state.
        setTimeout(function () {
          var c = document.querySelector('.goog-te-combo');
          if (c) refreshUiState(c.value || '');
        }, 500);
      } else if (tries++ < 20) {
        setTimeout(waitCombo, 250);
      }
    })();
  };

  function loadGoogleWidget() {
    if (widgetLoading) return;
    widgetLoading = true;

    if (!document.getElementById('google_translate_element')) {
      var mount = document.createElement('div');
      mount.id = 'google_translate_element';
      mount.className = 'skiptranslate notranslate';
      mount.style.display = 'none';
      mount.setAttribute('translate', 'no');
      document.body.appendChild(mount);
    }

    if (!document.getElementById('mg-gtranslate-script')) {
      var s = document.createElement('script');
      s.id = 'mg-gtranslate-script';
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      s.async = true;
      s.onerror = function () {
        // Offline / blocked: degrade quietly — buttons remain but no-op warn.
        widgetLoading = false;
        console.warn('[MindGrace] Google Translate widget failed to load; language switching disabled.');
      };
      document.head.appendChild(s);
    }
  }

  /* ------------------------------------------------------------------ *
   * Boot.
   * ------------------------------------------------------------------ */
  function boot() {
    buildControl();
    loadGoogleWidget();
    refreshUiState(getStoredLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
