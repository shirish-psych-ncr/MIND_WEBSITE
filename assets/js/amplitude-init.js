/**
 * Amplitude Browser SDK v2 — foundation & initialization (Mind Grace Clinic)
 * -----------------------------------------------------------------------------
 * Implements Amplitude's "Foundation and Initialization" + autocapture rules:
 *
 *  - Initialize only after `window.load`, when the app has full access to the
 *    final page URL, referrer and device context — prevents missing or wrong
 *    page URL / referrer properties on the first events.
 *  - Autocapture enabled per product requirements:
 *      pageViews, sessions, formInteractions, fileDownloads   (defaults)
 *      elementInteractions (viewportContentUpdated, 150 ms exposure)
 *      frustrationInteractions (rage/dead/error clicks, thrashed cursor)
 *      networkTracking -> only 400-599 responses
 *      webVitals       -> LCP, FCP, INP, CLS, TTFB
 *  - logLevel: 'Warn' in production; 'Debug' only on localhost.
 *  - Privacy / attribution hygiene:
 *      maskTextSelector: '[data-amp-mask]'  (mask sensitive titles/blocks)
 *      excludeReferrers: our own domains (internal nav must not skew campaigns)
 *      defaultTracking.fileDownloads: true
 *  - Transport: SDK default fetch with keepalive handles pre-navigation events;
 *    mgAnalytics.flush() is exposed for verification (Network tab should show
 *    a 200 OK from api2.amplitude.com).
 *
 * Actual SDK loading happens in assets/js/amplitude-analytics.js (local vendor
 * copy first, CDN fallbacks). This file only performs the init + helpers and
 * is loaded right after it on every page.
 */
(function () {
  'use strict';

  var AMPLITUDE_API_KEY = 'bcd984f11210e7e9d3f74d505271cf04'; // public ingestion key
  var IS_PROD = !/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);

  function getInstance() {
    var g = window.amplitude;
    if (!g) return null;
    if (typeof g.init === 'function') return g;            // UMD ready instance
    if (typeof g.getInstance === 'function') return g.getInstance();
    return null;
  }

  function buildOptions() {
    return {
      logLevel: IS_PROD ? 'Warn' : 'Debug', // Debug restricted to local dev only
      // EU data residency: set 'EU' ONLY if your Amplitude org requires EU
      // hosting (ingestion then goes to api.eu.amplitude.com — also add that
      // host to CSP connect-src in _headers). Keep 'US' otherwise.
      serverZone: 'US',
      // Transport: SDK default is fetch with keepalive, which already covers
      // events fired right before navigation. For payloads > 16 KB call
      // mgAnalytics.setTransport('beacon').
      //
      // NOTE on option shape (verified against the vendored SDK build
      // @amplitude/analytics-browser 2.47.0 — see assets/vendor/):
      //   * The v2 config nests these flags under `autocapture` as individual
      //     booleans (pageViews/sessions/formInteractions/fileDownloads), and
      //     the SDK also accepts `defaultTracking: true` / object form.
      //   * networkTracking rules parse `status` as comma-separated numbers or
      //     ranges ("400-599"); there is NO `captureCodes` option in this SDK
      //     version, so do not add one. Default without rules is "500-599".
      //   * viewportContentUpdated accepts `{ enabled, exposureDuration }`
      //     (exposureDuration defaults to 150 ms inside the SDK).
      autocapture: {
        pageViews: true,
        sessions: true,
        formInteractions: true,
        fileDownloads: true,
        elementInteractions: {
          viewportContentUpdated: {
            enabled: true,        // "[Amplitude] Viewport Content Updated" -> Zoning Insights
            exposureDuration: 150 // ms visible before an exposure counts (SDK default)
          }
        },
        frustrationInteractions: true, // rage clicks, dead clicks, error clicks, thrashed cursor
        networkTracking: {
          captureRules: [
            { status: '400-599' } // track 4xx client errors + 5xx server errors only
          ]
        },
        webVitals: true           // LCP, FCP, INP, CLS, TTFB
      },
      // Privacy: text inside elements marked data-amp-mask is redacted by the
      // SDK (use on sensitive titles/blocks, e.g. notes in tools pages).
      maskTextSelector: '[data-amp-mask]',
      // Prevent internal-domain navigation from skewing marketing attribution.
      excludeReferrers: [
        window.location.hostname,
        'mindgracencr.in',
        'www.mindgracencr.in'
      ],
      excludeInternalReferrers: [
        'mindgracencr.in',
        'www.mindgracencr.in'
      ]
    };
  }

  /**
   * mgAnalytics — thin wrapper enforcing event/user tracking rules:
   *  - track(): always carries deviceId (SDK auto-assigns) and, once set,
   *    userId; use setUserId() with ids of >= 5 characters to avoid rejection.
   *  - identify(): chain set/setOnce/add/append into ONE Identify object.
   *  - revenue(): dedicated revenue interface for monetary transactions.
   *  - flush(): await amplitude.flush() for setup validation.
   */
  var api = {
    ready: false,
    getInstance: getInstance,

    setUserId: function (userId) {
      var inst = getInstance();
      if (!inst) return;
      if (userId && String(userId).length < 5) {
        console.warn('mgAnalytics: userId should be at least 5 characters; Amplitude may reject events otherwise.');
      }
      inst.setUserId(userId || undefined);
    },

    setDeviceId: function (deviceId) {
      var inst = getInstance();
      if (inst && deviceId) inst.setDeviceId(deviceId);
    },

    /** Custom event. event_type is required; payload optional. */
    track: function (eventType, eventProperties, options) {
      var inst = getInstance();
      if (!inst) {
        console.warn('mgAnalytics.track: Amplitude SDK not initialised yet — event dropped:', eventType);
        return;
      }
      if (!eventType || typeof eventType !== 'string') {
        console.warn('mgAnalytics.track: event_type is required');
        return;
      }
      return inst.track(eventType, eventProperties, options);
    },

    /**
     * User properties via a single chained Identify object.
     * ops: [{ op: 'set'|'setOnce'|'add'|'append'|'unset', key, value }]
     */
    identify: function (ops) {
      var inst = getInstance();
      if (!inst || typeof inst.Identify !== 'function') return;
      var id = new inst.Identify();
      (ops || []).forEach(function (o) {
        if (!o || !o.key) return;
        switch (o.op) {
          case 'setOnce': id.setOnce(o.key, o.value); break;
          case 'add':     id.add(o.key, o.value); break;
          case 'append':  id.append(o.key, o.value); break;
          case 'prepend': id.prepend(o.key, o.value); break;
          case 'unset':   id.unset(o.key); break;
          default:        id.set(o.key, o.value);
        }
      });
      return inst.identify(id);
    },

    /** Monetary transactions -> revenue interface (accurate ES + LTV charts). */
    revenue: function (productPrice, quantity, productId) {
      var inst = getInstance();
      if (!inst || typeof inst.Revenue !== 'function') return;
      var rev = new inst.Revenue()
        .setPrice(productPrice)
        .setQuantity(quantity || 1);
      if (productId) rev.setProductId(productId);
      return inst.revenue(rev);
    },

    /** Switch transport, e.g. mgAnalytics.setTransport('beacon') for >16 KB payloads. */
    setTransport: function (transport) {
      var inst = getInstance();
      if (inst && typeof inst.setTransport === 'function') inst.setTransport(transport);
    },

    /** Opt the current visitor out of tracking entirely (consent handling). */
    setOptOut: function (optOut) {
      var inst = getInstance();
      if (inst && typeof inst.setOptOut === 'function') inst.setOptOut(!!optOut);
    },

    /** Validation helper: resolves once queued events hit api2.amplitude.com (expect 200 OK). */
    flush: function () {
      var inst = getInstance();
      return inst ? inst.flush() : Promise.resolve();
    }
  };

  function init() {
    var inst = getInstance();
    if (!inst || typeof inst.init !== 'function') {
      console.warn('Amplitude SDK unavailable — analytics disabled (loaded via amplitude-analytics.js).');
      return;
    }
    if (api.ready) return;
    inst.init(AMPLITUDE_API_KEY, undefined, buildOptions());
    api.ready = true;

    // Pipeline confirmation event kept from the original bootstrap.
    var path = window.location.pathname;
    if (path === '/' || path === '/index.html') {
      api.track('Viewed Home Page', { prompt_version: 'BA400.4' });
    }
  }

  window.mgAnalytics = api;

  // Initialize only after the application has final URL + device context.
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init, { once: true });
  }
})();
