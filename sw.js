/**
 * Mind Grace Service Worker
 * Caches interactive mental health tools for offline use
 * Essential for users in crisis areas with poor connectivity
 */

const CACHE_NAME = 'mindgrace-v2'; // bumped from v1: forces old broken caches to be cleared on activation
const OFFLINE_CACHE = 'mindgrace-offline-v1';

// Core assets to cache immediately
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/site-foundation.css',
  '/assets/css/base.css',
  '/assets/css/components.css',
  '/assets/js/icon-init.js'
];

// Interactive tools pages - critical for offline access during crises
const TOOLS_PAGES = [
  '/tools/guided-breathing.html',
  '/tools/butterfly-tapper.html',
  '/tools/eye-movement.html',
  '/tools/hypnos-fractal.html',
  '/tools/horizon-scan.html',
  '/tools/leaf-on-stream.html'
];

// Tool-specific CSS and JS
const TOOLS_ASSETS = [
  '/assets/css/tools-shell.css',
  '/assets/js/tools-shell.js'
];

// All URLs to pre-cache on install
const PRECACHE_URLS = [...CORE_ASSETS, ...TOOLS_PAGES, ...TOOLS_ASSETS, '/offline.html'];

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
      console.log('[SW] Caching core assets and tools');
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
    })
  );
  self.clients.claim();
});

/**
 * Fetch event - Network first, fallback to cache
 * Critical for tools that need to work offline during panic attacks
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Tools pages - Cache first strategy for instant offline access
  if (TOOLS_PAGES.some(tool => url.pathname === tool || url.pathname.startsWith('/tools/'))) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
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
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Offline and not in cache - return offline fallback
          return caches.match('/offline.html').then((fallback) => {
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
          cache.put(request, responseClone);
        });
      }
      return networkResponse;
    }).catch(() => {
      // Network failed, try cache
      return caches.match(request).then((cachedResponse) => {
        return cachedResponse || caches.match('/offline.html').then((fallback) => {
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
    // Pre-cache specific tools on demand
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.urls || []);
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
