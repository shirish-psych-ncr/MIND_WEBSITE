// Service Worker for Mind Grace Neuropsychiatric Clinic (2026 PWA Standards)
const CACHE_NAME = 'mindgrace-v1-2026';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/base.css',
  '/assets/css/components.css',
  '/assets/css/layout.css',
  '/assets/css/utilities.css',
  '/assets/css/animations.css',
  '/assets/js/main.js',
  '/assets/images/Mind_Grace_Clinic_Logo_Pink.svg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).catch((error) => {
      console.warn('[SW] Cache install failed:', error);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) return;
  
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Clone response for caching
        const responseClone = response.clone();
        
        // Cache successful responses
        if (response.ok) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request).then((cachedResponse) => {
          // Return cached response or offline fallback
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Offline fallback for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          
          // Return empty response for other failed requests
          return new Response('', { status: 404, statusText: 'Not Found' });
        });
      })
  );
});

// Background sync for form submissions (progressive enhancement)
self.addEventListener('sync', (event) => {
  if (event.tag === 'submit-form') {
    event.waitUntil(
      // Form submission logic would go here
      Promise.resolve()
    );
  }
});

// Push notifications (optional, for appointment reminders)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'New message from Mind Grace Clinic',
    icon: '/assets/images/Mind_Grace_Clinic_Logo_Pink.svg',
    badge: '/assets/images/Mind_Grace_Clinic_Logo_Pink.svg',
    vibrate: [100, 50, 100],
    data: { url: '/' }
  };
  
  event.waitUntil(
    self.registration.showNotification('Mind Grace Clinic', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});
