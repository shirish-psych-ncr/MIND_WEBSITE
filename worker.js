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
  
  // Content Security Policy
  newResponse.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "base-uri 'self'; " +
    "object-src 'none'; " +
    "frame-ancestors 'none'; " +
    "form-action 'self'; " +
    "frame-src https://docs.google.com; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com https://apis.google.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://unpkg.com; " +
    "img-src 'self' data: blob: https:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://*.tile.openstreetmap.org https://tile.openstreetmap.org https://*.google-analytics.com https://www.google-analytics.com; " +
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
