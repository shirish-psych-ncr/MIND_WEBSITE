var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
var worker_default = {
  async fetch(request, env, ctx) {
    return handleRequest(request);
  }
};
async function handleRequest(request) {
  const BLOCKED_BOTS = ["bytespider", "diffbot", "petalbot", "scrapy", "aihitbot", "bittorrentbot"];
  const userAgent = (request.headers.get("User-Agent") || "").toLowerCase();
  if (BLOCKED_BOTS.some((bot) => userAgent.includes(bot))) {
    return new Response("Forbidden", { status: 403, headers: { "Content-Type": "text/plain" } });
  }
  const canonical = new URL(request.url);
  if (["mindgracencr.in", "www.mindgracencr.in"].includes(canonical.hostname)) {
    canonical.protocol = "https:";
    canonical.hostname = "mindgracencr.in";
    if (!canonical.pathname.startsWith("/assets/") && !canonical.pathname.startsWith("/vendor/")) {
      canonical.pathname = canonical.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "").replace(/\/+$/, "") || "/";
      const aliases = {
        "/high-functioning-depression": "/high-functioning-depression-guide",
        "/psychiatrist-in-greater-noida": "/psychiatrist-greater-noida",
        "/psychiatrist-noida": "/psychiatrist-in-noida",
        "/mental-health-clinic-greater-noida": "/psychiatrist-greater-noida",
        "/mental-health-clinic-noida": "/psychiatrist-in-noida",
        "/counselling": "/psychology-counselling",
        "/psychotherapy": "/therapy",
        "/child-psychiatry": "/child-development",
        "/mental-health-assessment": "/assessments",
        "/blog/iilm-psychology-internship-greater-noida": "/blog/iilm-psychology-internship"
      };
      canonical.pathname = aliases[canonical.pathname] || canonical.pathname;
    }
    if (canonical.href !== request.url) return Response.redirect(canonical.href, 301);
  }
  const response = await fetch(request);
  const newResponse = new Response(response.body, response);
  newResponse.headers.set("X-Frame-Options", "DENY");
  newResponse.headers.set("X-Content-Type-Options", "nosniff");
  newResponse.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  newResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  newResponse.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  newResponse.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://docs.google.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://static.cloudflareinsights.com https://*.ahrefs.com https://unpkg.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com https://cdn.jsdelivr.net; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.ahrefs.com https://*.zarazprojects.com https://*.cloudflare.com https://static.cloudflareinsights.com https://*.tile.openstreetmap.org https://openstreetmap.org; frame-src 'self' https://*.googletagmanager.com https://www.google.com https://docs.google.com https://www.openstreetmap.org; worker-src 'self' blob:;"
  );
  const path = new URL(request.url).pathname;
  if (path.toLowerCase().endsWith(".pdf")) {
    newResponse.headers.set("X-Robots-Tag", "noindex");
  }
  if (path === "/llms.txt" || /^\/llms-[^/]+\.txt$/.test(path)) {
    newResponse.headers.set("Content-Type", "text/plain; charset=utf-8");
    newResponse.headers.set("Cache-Control", "public, max-age=3600");
  }
  const url = new URL(request.url);
  if (url.pathname.startsWith("/assets/")) {
    newResponse.headers.set("Cache-Control", "public, max-age=86400");
  } else if (url.pathname.endsWith(".html")) {
    newResponse.headers.set("Cache-Control", "public, max-age=3600");
  }
  return newResponse;
}
__name(handleRequest, "handleRequest");
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
