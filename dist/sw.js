/**
 * Mind Grace Service Worker
 * Caches interactive mental health tools for offline use
 * Essential for users in crisis areas with poor connectivity
 */

const CACHE_NAME = 'mindgrace-astro-v14'; // Astro migration: evict stale pages and bundles
const OFFLINE_CACHE = 'mindgrace-offline-v1';

// Core assets to cache immediately
const CORE_ASSETS = [
  '/',
  '/assets/css/min/site-foundation.min.css',
  '/assets/css/min/site-foundation.min.css?v=responsive18',
  '/assets/js/min/visitor-friendly.min.js?v=responsive18',
  '/assets/js/lib/lucide.min.js',
  '/assets/css/min/base.min.css',
  '/assets/css/min/components.min.css',
  '/assets/js/min/icon-init.min.js'
];

// Interactive tools pages - critical for offline access during crises
const TOOLS_PAGES = [
  '/tools/guided-breathing',
  '/tools/butterfly-tapper',
  '/tools/eye-movement',
  '/tools/hypnos-fractal',
  '/tools/horizon-scan',
  '/tools/leaf-on-stream'
];

// Tool-specific CSS and JS
const TOOLS_ASSETS = [
  '/assets/css/min/tools-shell.min.css',
  '/assets/js/min/tools-shell.min.js'
];

// Analytics bootstrap + vendored Amplitude Browser SDK (Zoning Insights
// Translation controls are local; following a Google Translate link requires a network.
const TRANSLATE_ASSETS = [
  '/assets/css/min/translate.min.css',
  '/assets/js/min/translate.min.js',
  '/assets/js/min/translate-engine.min.js'
];

// All URLs to pre-cache on install
const PRECACHE_URLS = [...new Set([...CORE_ASSETS, ...TOOLS_PAGES, ...TOOLS_ASSETS, ...TRANSLATE_ASSETS, '/offline'])];

/**
 * Install event - cache core assets and tools
 *
 * FIX: cache.addAll() fails atomically if ANY single request fails (e.g. a 404
 * or a transient network error), which caused "[SW] Cache install failed:
 * TypeError: Failed to execute 'addAll' on 'Cache': Request failed".
 * We now cache each URL independently so one bad entry can never abort the
 * whole install, and log any individual failures for debugging.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        PRECACHE_URLS.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch((err) => {
            console.warn('[SW] Failed to cache asset:', url, err);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

/**
 * Activate event - clean old caches
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('mindgrace-') && name !== CACHE_NAME && name !== OFFLINE_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

/**
 * Fetch event - Network first, fallback to cache
 * Critical for tools that need to work offline during panic attacks
 */
// Normalize a pathname so '/page' and '/page' resolve to the same cache key
// (the site now serves canonical links WITHOUT trailing slashes).
function normalizePath(p) {
  return p.length > 1 ? p.replace(/\/+$/, '') : p;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  const normPath = normalizePath(url.pathname);

  // Build a normalized request so '/page' and '/page' share one cache entry.
  const normUrl = new URL(request.url);
  normUrl.pathname = normPath;
  // A navigation Request has mode=navigate, which cannot be passed as
  // RequestInit. The normalized request is only a GET cache key.
  const normalizedRequest = new Request(normUrl.href);

  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Tools pages - Cache first strategy for instant offline access
  if (TOOLS_PAGES.some(tool => normPath === tool || normPath.startsWith('/tools'))) {
    event.respondWith(
      caches.match(normalizedRequest).then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Serving tool from cache:', request.url);
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        return fetch(request).then((networkResponse) => {
          // Cache successful responses
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(normalizedRequest, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Offline and not in cache - return offline fallback
          return caches.match('/offline').then((fallback) => {
            return fallback || new Response('Offline', { status: 503 });
          });
        });
      })
    );
    return;
  }

  // Other pages - Network first with cache fallback
  event.respondWith(
    fetch(request).then((networkResponse) => {
      // Cache successful responses
      if (networkResponse.ok) {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(normalizedRequest, responseClone);
        });
      }
      return networkResponse;
    }).catch(() => {
      // Network failed, try cache
      return caches.match(normalizedRequest).then((cachedResponse) => {
        return cachedResponse || caches.match('/offline').then((fallback) => {
          return fallback || new Response('Offline', { status: 503 });
        });
      });
    })
  );
});

/**
 * Handle messages from main thread
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_TOOLS') {
    // Pre-cache specific tools on demand.
    // FIX: same atomic-addAll bug as the install handler — one failing URL
    // rejected the whole batch. Cache each URL independently instead.
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return Promise.allSettled(
          (event.data.urls || []).map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch((err) => {
              console.warn('[SW] CACHE_TOOLS: failed to cache:', url, err);
            })
          )
        );
      })
    );
  }
});

/**
 * Background sync for form submissions when offline
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'submit-form') {
    event.waitUntil(
      // Process queued form submissions
      Promise.resolve().then(() => {
        console.log('[SW] Processing queued form submissions');
      })
    );
  }
});
