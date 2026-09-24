// Cloudflare Worker to add security headers
// Deploy with: wrangler deploy worker.js

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  
  // Clone the response so we can modify headers
  const newResponse = new Response(response.body, response)
  
  // Add security headers
  newResponse.headers.set('X-Frame-Options', 'DENY')
  newResponse.headers.set('X-Content-Type-Options', 'nosniff')
  newResponse.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  newResponse.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  
  // Content Security Policy (kept in sync with the CSP in ./_headers —
  // space-separated sources; allow-lists every third party actually used:
  // GTM/gtag + Google Analytics, Cloudflare Zaraz/Insights, Ahrefs,
  // unpkg (Leaflet), jsDelivr (Splide), Google Fonts, OpenStreetMap tiles)
  newResponse.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "base-uri 'self'; " +
    "object-src 'none'; " +
    "frame-ancestors 'none'; " +
    "form-action 'self' https://docs.google.com; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://static.cloudflareinsights.com https://*.ahrefs.com https://unpkg.com https://cdn.jsdelivr.net; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com https://cdn.jsdelivr.net; " +
    "img-src 'self' data: blob: https:; " +
    "font-src 'self' data: https://fonts.gstatic.com; " +
    "connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.ahrefs.com https://*.zarazprojects.com https://*.cloudflare.com https://static.cloudflareinsights.com https://*.tile.openstreetmap.org https://openstreetmap.org; " +
    "frame-src 'self' https://*.googletagmanager.com https://www.google.com https://docs.google.com https://www.openstreetmap.org; " +
    "worker-src 'self' blob:;"
  )
  
  // Add cache control for static assets
  const url = new URL(request.url)
  if (url.pathname.startsWith('/assets/')) {
    newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else if (url.pathname.endsWith('.html')) {
    newResponse.headers.set('Cache-Control', 'public, max-age=3600')
  }
  
  return newResponse
}
