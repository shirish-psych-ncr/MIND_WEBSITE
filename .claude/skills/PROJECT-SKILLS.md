# Mind Grace Clinic Website — Installed Agent Skills

This repository is a static, phone-first psychiatry/psychology clinic website
(mindgracencr.in) deployed via GitHub Pages + Cloudflare (worker.js, _headers,
_headers CSP), with Amplitude + Zaraz analytics, a service worker (sw.js), an
interactive tools section (/tools with canvas animations), a generated blog
index, and heavy SEO/AEO/GEO focus (llms.txt, schema JSON-LD, crawler policy).

Skills were searched on GitHub and installed from:
- anthropics/skills (official Anthropic agent skills)
- addyosmani/agent-skills (production engineering skills)
- stareezy-1/frontend-architecture-skill (frontend SEO/Lighthouse)
- thisisAhsanIqbal/nextjs-seo-audit (portable SKILL.md SEO audit skills)

They live in ./skills/ and are symlink-copied into ./.claude/skills/ so agents
can load them by name.

## Skill-to-need map for THIS repo

| Repo area | Files/evidence | Use these skills |
|---|---|---|
| HTML pages (60+), shared shell | index.html, about.html, scripts/normalize_site_shell.py | frontend-design, frontend-ui-engineering, brand-guidelines |
| CSS (base/layout/components, minified builds) | assets/css/*, assets/css/min, assets/css-tools | frontend-ui-engineering, performance-optimization, incremental-implementation |
| JS tools (canvas breathing, fractal, eye movement…) | assets/js/tools-*.js, tools/*.html, assets/css-tools | canvas-design, frontend-design, debugging-and-error-recovery |
| Booking & forms | assets/js/booking.js, http-client.js, book.html | test-driven-development, webapp-testing, source-driven-development |
| Analytics (Amplitude 2.47 vendored, Zaraz) | assets/js/amplitude-*.js, zaraz-tracking.js, ZARAZ_TRACKING_GUIDE.md, AMPLITUDE_ZONING_SETUP.md | observability-and-instrumentation |
| Accessibility (crisis-sensitive clinic; reduced motion, aria-live) | assets/css/accessibility.css, crisis-banner.js, scripts/audit_accessibility.cjs | frontend-ui-engineering (a11y sections), webapp-testing |
| Performance / Core Web Vitals | OPTIMIZATION_SUMMARY.md, scripts/audit_lighthouse.cjs, sw.js | performance-optimization, core-web-vitals, frontend-lighthouse |
| SEO / AEO / GEO (llms.txt, sitemap, schema, robots, CRAWLER_POLICY.md) | llms*.txt, faq-schema.json, sitemap.xml, scripts/audit_seo_aeo_geo.py | technical-seo, onpage-optimization, schema-json-optimization, frontend-seo, mobile-optimization |
| Security headers, Cloudflare worker/pages | _headers, worker.js, wrangler.toml, CLOUDFLARE_AGENT_SETUP.md, DEPLOYMENT_GUIDE.md, QUICK_START.md | security-and-hardening, ci-cd-and-automation |
| Blog publishing pipeline | scripts/BLOG-PUBLISHING.md, build_blog_index.py, .github/workflows/publish-site.yml | spec-driven-development, documentation-and-adrs, git-workflow-and-versioning |
| Translation widget (Google Translate) | GOOGLE_TRANSLATE_SETUP.md, translate.js, css/translate.css | constraint-driven-development, browser-testing-with-devtools |
| Existing audits/tests | scripts/audit_*.cjs, tests/, output/responsive-audit | browser-testing-with-devtools, code-review-and-quality, shipping-and-launch |
| Creating new local skills | skill-creator | skill-creator |

## How to use
1. Read the relevant SKILL.md before touching that area (they are short, plain markdown).
2. Follow repo conventions already enforced by scripts/: run
   `python -m unittest discover -s tests -v`, rebuild minified assets via
   `node scripts/build_shared_assets.cjs`, regenerate the blog index via
   `python scripts/build_blog_index.py`, and re-run audits after changes.
3. Playwright (Python) + Chromium are installed in this environment; use the
   webapp-testing skill against `python -m http.server` for UI verification.
