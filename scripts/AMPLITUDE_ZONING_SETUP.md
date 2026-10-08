# Amplitude Analytics & Zoning Insights — Mind Grace Clinic

## What changed and why

**Old (broken) setup:** every page had an inline `<script type="module">` that did

```js
import('https://cdn.amplitude.com/libs/unified@1.6.0/unified-min.js')
  .then((amplitude) => amplitude.initAll(API_KEY, { ... }))
```

This produced the console error on **every page**:

```
Amplitude SDK failed to load: TypeError: Failed to fetch dynamically imported module:
https://cdn.amplitude.com/libs/unified@1.6.0/unified-min.js
```

Two independent reasons:

1. `unified@1.6.0` is the legacy "Unified" SDK. Its CDN response is not usable
   as a CORS/ES-module target for `import()`, so the fetch always failed.
2. Even if it loaded, **v1.x does not support Zoning Insights**, which requires
   **Browser SDK ≥ v2.39.0** with autocapture enabled.

**New (working) setup:**

| File | Purpose |
| ---- | ------- |
| `assets/vendor/amplitude-2.47.0.js` | Official Amplitude **Browser SDK v2.47.0** (UMD build, exposes `window.amplitude`), vendored same-origin from jsDelivr. Well above the v2.39.0 Zoning Insights minimum. Same-origin loading makes it immune to CDN/CORS/`import()` failures and cacheable by the service worker. |
| `assets/js/amplitude-analytics.js` | Bootstrap script included on all 76 pages via two plain `<script defer>` tags (SDK first, then bootstrap). Initializes with the exact autocapture config Zoning Insights needs; falls back to jsDelivr / cdn.amplitude.com only if the local file is missing; never throws into the page. |
| `_headers` | CSP updated: `script-src` allows `https://cdn.amplitude.com` (fallback only — primary is `'self'`); `connect-src` allows `api2.amplitude.com`, `api-sources.amplitude.com`, `browser.amplitude.com` (required ingestion endpoints per Amplitude's CSP guidance). |
| `sw.js` | Precaches both analytics files; cache bumped to `mindgrace-v3` so browsers holding the broken v1/v2 caches purge them automatically. |

## Autocapture configuration (Zoning Insights instrumentation)

Per Amplitude docs, Zoning Insights runs on these autocapture events, all enabled in `amplitude-analytics.js`:

```js
instance.init(AMPLITUDE_API_KEY, undefined, {
  autocapture: {
    pageViews: true,                 // page view tracking
    elementInteractions: {           // clicks + exposures
      viewportContentUpdated: {
        enabled: true,               // emits "[Amplitude] Viewport Content Updated"
        exposureDuration: 150        // ms visible before an exposure counts
      }
    },
    frustrationInteractions: true    // rage clicks / dead clicks
  }
});
```

The home page still sends the pipeline-confirmation event:
`Viewed Home Page` with `{ prompt_version: 'BA400.4' }`.

## Verifying the setup after deploy

1. Open any page → DevTools Console: no more "Failed to fetch dynamically imported module".
2. Network tab: request to `https://api2.amplitude.com/2/httpapi` with status 200.
3. In Amplitude → Event Segmentation, search for **`[Amplitude] Viewport Content Updated`** — data should appear within minutes as you scroll/click.
4. Optionally install the Amplitude Chrome extension to watch `[Amplitude] Element Clicked` / `Viewport Content Updated` events live.
5. Once those events flow, Zoning Insights zones (click rate, exposure rate, scroll reach, rage click rate) begin populating.

## Upgrading the SDK later

1. Download the new UMD build:
   `curl -o assets/vendor/amplitude-<ver>.js https://cdn.jsdelivr.net/npm/@amplitude/analytics-browser@<ver>/lib/scripts/amplitude-min.umd.min.js`
2. Update `SDK_VERSION` in `assets/js/amplitude-analytics.js` and the two `<script defer src="/assets/vendor/amplitude-...">` tags (`python3 scripts/add_amplitude_script.py` is idempotent; for a version bump a repo-wide find/replace of the filename works).
3. Add the new file to `ANALYTICS_ASSETS` in `sw.js` and bump `CACHE_NAME`.
4. Keep version ≥ 2.39.0 (Zoning Insights minimum).

## Privacy note

This site provides mental-health services. The ingestion key is public by design
(it can only write events, not read data), but avoid ever sending PII through
`amplitude.track()`/`identify()` — keep custom events behavioural only
(page, tool usage, CTA clicks), consistent with the existing Zaraz/GA4 policy.

## Update (Browser SDK 2 foundation & initialization best practices)

`assets/js/amplitude-analytics.js` now ONLY loads the SDK; a second script,
`assets/js/amplitude-init.js`, performs initialization on `window.load` — per
Amplitude guidance, init happens only after the app has full access to user ID,
device context and the final page URL (prevents missing/incorrect properties).

Init config implemented in `amplitude-init.js`:
- `logLevel`: 'Warn' in production, 'Debug' only on localhost.
- `serverZone: 'US'` — set to `'EU'` if your org requires EU data residency
  (`api.eu.amplitude.com` is already allowed in CSP connect-src).
- Autocapture: pageViews, sessions, formInteractions, fileDownloads,
  elementInteractions (viewportContentUpdated, exposureDuration 150),
  frustrationInteractions (rage/dead/error clicks, thrashed cursor),
  networkTracking via `captureRules: [{ status: '400-599' }]` (verified against
  the vendored SDK source — this build has no `captureCodes` option; default
  range without rules is 500-599, so the rule is what restricts to 400-599),
  webVitals (LCP/FCP/INP/CLS/TTFB).
- Privacy: `maskTextSelector: '[data-amp-mask]'` — add `data-amp-mask` to any
  sensitive title/block to redact its text from captured events. The SDK masks
  emails/phones/card numbers by default.
- Attribution: `excludeReferrers` + `excludeInternalReferrers` for our domains.
- Transport: default fetch+keepalive covers pre-navigation events; use
  `mgAnalytics.setTransport('beacon')` for payloads > 16 KB.

Global helper `window.mgAnalytics` (all pages):
- `track(eventType, props)` — custom events (event_type required).
- `setUserId(id)` — warns if id < 5 chars (events may be rejected otherwise).
- `identify([{op,key,value}])` — chains set/setOnce/add/append into ONE Identify.
- `revenue(price, qty, productId)` — dedicated revenue interface for payments.
- `flush()` — validation: await it and check Network tab for 200 OK from
  api2.amplitude.com. `setOptOut(true)` for consent handling.

Example usage added: `Booking Form Opened` event in assets/js/booking.js
(no PII). Ad blockers can still drop ingestion requests; if that matters,
route through a proxy via the `serverUrl` option. MCP note: never use the Amplitude
MCP server for production ingestion — SDK/HTTP V2 API only.
