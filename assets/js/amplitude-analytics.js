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

  // Amplitude ingestion key — public by design; move to an env var when you
  // set up environments.
  var AMPLITUDE_API_KEY = 'bcd984f11210e7e9d3f74d505271cf04';

  // Pinned version — must stay >= 2.39.0 for Zoning Insights support.
  // Keep in sync with /assets/vendor/amplitude-2.47.0.js.
  var SDK_VERSION = '2.47.0';
  var SDK_SOURCES = [
    '/assets/vendor/amplitude-' + SDK_VERSION + '.js',
    'https://cdn.jsdelivr.net/npm/@amplitude/analytics-browser@' + SDK_VERSION + '/lib/scripts/amplitude-min.umd.min.js',
    'https://cdn.amplitude.com/libs/analytics-browser-' + SDK_VERSION + '-min.js.gz'
  ];

  if (!AMPLITUDE_API_KEY) {
    console.warn('Amplitude API key missing — analytics disabled');
    return;
  }

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

  function initAmplitude() {
    var amplitude = window.amplitude;
    // The UMD build exposes either a ready instance or getInstance().
    var instance = amplitude && typeof amplitude.init === 'function'
      ? amplitude
      : (amplitude && typeof amplitude.getInstance === 'function' ? amplitude.getInstance() : null);

    if (!instance || typeof instance.init !== 'function') {
      console.warn('Amplitude SDK loaded but global `amplitude` API not found.');
      return;
    }

    instance.init(AMPLITUDE_API_KEY, undefined, {
      autocapture: {
        pageViews: true,          // required by Zoning Insights
        elementInteractions: {    // click + exposure events
          viewportContentUpdated: {
            enabled: true,        // emits "[Amplitude] Viewport Content Updated"
            exposureDuration: 150 // ms visible before an exposure counts (default)
          }
        },
        frustrationInteractions: true // rage/dead clicks feed Zoning metrics
      }
    });

    // Confirm the pipeline immediately on the home page (kept from old code).
    var path = window.location.pathname;
    if (path === '/' || path === '/index.html') {
      instance.track('Viewed Home Page', { prompt_version: 'BA400.4' });
    }
  }

  tryLoad(0)
    .then(initAmplitude)
    .catch(function (err) {
      console.warn('Amplitude SDK failed to load:', err);
    });
})();
