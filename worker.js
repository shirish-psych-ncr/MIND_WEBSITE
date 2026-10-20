// Cloudflare Worker to add security headers, canonicalize URLs, and block aggressive harvesters.
// Deploy with: wrangler deploy worker.js

export default {
  async fetch(request, env, ctx) {
    // 1. Parse URL once for performance (avoids multiple instantiations)
    const url = new URL(request.url);
    const userAgent = (request.headers.get('User-Agent') || '').toLowerCase();

    // --------------------------------------------------------------------------
    // SERVER-LEVEL BOT BLOCKING (2026 Crawler Framework, Phase 3)
    // robots.txt is voluntary. These are hard-blocked at the network edge (403)
    // to save origin bandwidth. Keep in sync with SECTION 5 of ./robots.txt.
    // NOTE: Citation agents (OAI-SearchBot, PerplexityBot, etc.) must NEVER be
    // added here. Verify Cloudflare "Bot Fight Mode" / AI-training block is OFF
    // for this zone so it doesn't override our Allow list.
    // --------------------------------------------------------------------------
    const BLOCKED_BOTS = ['bytespider', 'diffbot', 'petalbot', 'scrapy', 'aihitbot', 'bittorrentbot'];
    if (BLOCKED_BOTS.some(bot => userAgent.includes(bot))) {
      return new Response('Forbidden', { 
        status: 403, 
        headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' } 
      });
    }

    // --------------------------------------------------------------------------
    // CANONICALIZATION & REDIRECTS
    // GitHub Pages ignores _redirects. We handle legacy page requests at the 
    // Cloudflare edge before fetching the origin. Preserves query strings.
    // --------------------------------------------------------------------------
    let needsRedirect = false;

    // Enforce HTTPS and non-www
    if (url.hostname === 'www.mindgracencr.in') {
      url.hostname = 'mindgracencr.in';
      needsRedirect = true;
    }
    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      needsRedirect = true;
    }

    // Path cleanup and aliases (skip static asset directories)
    if (!url.pathname.startsWith('/assets/') && !url.pathname.startsWith('/vendor/')) {
      const originalPath = url.pathname;
      
      // Strip .html and normalize trailing slashes (root '/' remains '/')
      url.pathname = url.pathname
        .replace(/\/index\.html$/, '/')
        .replace(/\.html$/, '')
        .replace(/\/+$/, '') || '/';

      const aliases = {
        '/high-functioning-depression': '/high-functioning-depression-guide',
        '/psychiatrist-in-greater-noida': '/psychiatrist-greater-noida',
        '/psychiatrist-noida': '/psychiatrist-in-noida',
        '/mental-health-clinic-greater-noida': '/psychiatrist-greater-noida',
        '/mental-health-clinic-noida': '/psychiatrist-in-noida',
        '/counselling': '/psychology-counselling',
        '/psychotherapy': '/therapy',
        '/child-psychiatry': '/child-development',
        '/mental-health-assessment': '/assessments',
        '/blog/iilm-psychology-internship-greater-noida': '/blog/iilm-psychology-internship'
      };

      if (aliases[url.pathname]) {
        url.pathname = aliases[url.pathname];
        needsRedirect = true;
      } else if (originalPath !== url.pathname) {
        needsRedirect = true;
      }
    }

    if (needsRedirect) {
      return Response.redirect(url.href, 301);
    }

    // --------------------------------------------------------------------------
    // FETCH ORIGIN & APPLY HEADERS
    // --------------------------------------------------------------------------
    const response = await fetch(request);
    
    // Clone response to safely mutate headers without affecting the original stream
    const newResponse = new Response(response.body, response);
    const headers = newResponse.headers;

    // Core Security Headers
    headers.set('X-Frame-Options', 'DENY');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-DNS-Prefetch-Control', 'off'); // Privacy enhancement
    headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

    // Content Security Policy
    // NOTE: Kept IN SYNC with ./_headers. If a CSP is also set in the Cloudflare 
    // Dashboard (WAF/Transform Rules), update it manually to prevent conflicts.
    headers.set(
      'Content-Security-Policy',
      "default-src 'self'; " +
      "base-uri 'self'; " +
      "object-src 'none'; " +
      "frame-ancestors 'none'; " +
      "form-action 'self' https://docs.google.com; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://static.cloudflareinsights.com https://*.ahrefs.com https://unpkg.com https://cdn.jsdelivr.net https://www.googletagmanager.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com https://cdn.jsdelivr.net; " +
      "img-src 'self' data: blob: https:; " +
      "font-src 'self' data: https://fonts.gstatic.com; " +
      "connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net https://www.google.com https://*.ahrefs.com https://analytics.ahrefs.com https://*.zarazprojects.com https://*.cloudflare.com https://static.cloudflareinsights.com https://*.tile.openstreetmap.org https://openstreetmap.org https://www.googletagmanager.com; " +
      "frame-src 'self' https://*.googletagmanager.com https://www.google.com https://docs.google.com https://www.openstreetmap.org; " +
      "worker-src 'self' blob:;"
    );

    // --------------------------------------------------------------------------
    // PATH-SPECIFIC HEADER RULES
    // --------------------------------------------------------------------------
    const path = url.pathname.toLowerCase();

    // 1. PDFs: Prevent search engines from indexing raw PDF files
    if (path.endsWith('.pdf')) {
      headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    // 2. LLMs.txt: Serve as plain UTF-8 text with short cache for easy updates
    if (path === '/llms.txt' || /^\/llms-[^/]+\.txt$/.test(path)) {
      headers.set('Content-Type', 'text/plain; charset=utf-8');
      headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    }

    // 3. Caching Strategy Optimization
    if (path.startsWith('/assets/') || path.startsWith('/vendor/')) {
      // Immutable assets (JS, CSS, images, fonts) should be cached for 1 year
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (path.endsWith('.html') || path === '/') {
      // HTML pages: Short cache + stale-while-revalidate for instant loads + fresh updates
      headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    }

    return newResponse;
  }
}
