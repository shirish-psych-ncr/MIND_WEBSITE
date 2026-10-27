/**
 * Amplitude Analytics bootstrap — Mind Grace Clinic
 * -----------------------------------------------------------------------------
 * Replaces the old inline module that did:
 *   import('https://cdn.amplitude.com/libs/unified@1.6.0/unified-min.js')
 * That request failed on every page ("Failed to fetch dynamically imported
 * module" — no CORS headers on that CDN response) AND the unified@1.x SDK
 * predates Zoning Insights support.
 *
 * Zoning Insights requirements (per Amplitude docs):
 *   - Browser SDK >= v2.39.0  -> we use v2.47.0, vendored locally at
 *     /assets/vendor/amplitude-2.47.0.js (UMD build exposing window.amplitude)
 *   - autocapture.pageViews: true
 *   - autocapture.elementInteractions with viewportContentUpdated enabled —
 *     this emits "[Amplitude] Viewport Content Updated", the event Zoning
 *     Insights computes zones from.
 *
 * Loading strategy (never blocks or throws into the page):
 *   1. Local vendored SDK (same-origin — always available, cacheable by SW).
 *   2. Fallback: jsDelivr pinned copy (CORS-enabled).
 *   3. Fallback: cdn.amplitude.com pinned copy.
 *   4. All failures are logged as warnings only.
 */
(function () {
  'use strict';

  // NOTE: the API key lives in amplitude-init.js (single source of truth).
  // This module only loads the SDK script itself.

  // Pinned version — must stay >= 2.39.0 for Zoning Insights support.
  // Keep in sync with /assets/vendor/amplitude-2.47.0.js.
  var SDK_VERSION = '2.47.0';
  var SDK_SOURCES = [
    '/assets/vendor/amplitude-' + SDK_VERSION + '.js',
    'https://cdn.jsdelivr.net/npm/@amplitude/analytics-browser@' + SDK_VERSION + '/lib/scripts/amplitude-min.umd.min.js',
    'https://cdn.amplitude.com/libs/analytics-browser-' + SDK_VERSION + '-min.js.gz'
  ];

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(s);
    });
  }

  function tryLoad(index) {
    if (index >= SDK_SOURCES.length) {
      return Promise.reject(new Error('All Amplitude SDK sources failed'));
    }
    return loadScript(SDK_SOURCES[index]).catch(function (err) {
      console.warn('Amplitude SDK source failed:', err.message);
      return tryLoad(index + 1);
    });
  }

  // NOTE: initialization is intentionally NOT done here.
  // Per Amplitude's "Foundation and Initialization" guidance, the SDK must be
  // initialized only after the application has full access to the user ID,
  // device context and final page URL — that happens in
  // /assets/js/amplitude-init.js on window.load (loaded right after this file
  // on every page). This module's only job is to make window.amplitude exist
  // as early as possible (local vendor copy first, CDN fallbacks).
  function sdkReady() {
    var g = window.amplitude;
    return !!(g && (typeof g.init === 'function' || typeof g.getInstance === 'function'));
  }

  if (sdkReady()) return; // already loaded (e.g. SW cache / duplicate include)

  tryLoad(0)
    .then(function () {
      if (!sdkReady()) {
        console.warn('Amplitude SDK loaded but global `amplitude` API not found.');
      }
      // amplitude-init.js (deferred, next script tag) performs init on load.
    })
    .catch(function (err) {
      console.warn('Amplitude SDK failed to load:', err);
    });
})();
