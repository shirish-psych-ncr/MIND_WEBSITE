# Mind Grace site inventory and repair map

This is the source-of-truth map for the static website. It deliberately excludes `.git/` internals and session notes from the public page inventory.

## Public HTML routes

### Core clinic, conversion, information, and legal pages

`index.html`, `404.html`, `about.html`, `approach.html`, `services.html`, `process.html`, `doctors.html`, `dr-anita-sharma.html`, `conditions.html`, `mind-grace.html`, `aasha.html`, `fees.html`, `book.html`, `contact.html`, `location.html`, `gallery.html`, `testimonials.html`, `faq.html`, `resources.html`, `emergency.html`, `privacy.html`, `terms.html`, `disclaimer.html`, `consent.html`, `thank-you.html`.

### Blog routes

- Hubs: `blog/index.html`, `blog/adult.html`, `blog/children.html`.
- Adult articles: `blog/pages/adult/overthinking-vs-anxiety.html`, `blog/pages/adult/scheduled-worry-time-technique.html`, `blog/pages/adult/sleep-and-anxiety-cycle.html`, `blog/pages/adult/stimulus-control-therapy.html`, `blog/pages/adult/when-to-see-a-psychiatrist.html`.
- Child and adolescent articles: `blog/pages/child/early-signs-of-autism.html`, `blog/pages/child/school-concerns-and-adhd.html`, `blog/pages/child/sensory-overload-at-home.html`, `blog/pages/child/speech-delay-red-flags.html`.

### Therapeutic tool routes

`tools/guided-breathing.html`, `tools/horizon-scan.html`, `tools/eye-movement.html`, `tools/butterfly-tapper.html`, `tools/hypnos-fractal.html`, `tools/leaf-on-stream.html`.

## Reusable HTML components

- `assets/components/header.html` — reference header fragment; navigation and logo.
- `assets/components/nav-panel.html` — reference navigation panel.
- `assets/components/footer.html` — valid footer fragment; must be included inside an existing document and never as a standalone HTML document.

The live pages are static HTML, so the canonical runtime chrome is assembled by `assets/js/visitor-friendly.js`. This avoids copying a different header/footer into every route while preserving each page's `main` content.

## Shared CSS loaded by visitor pages

- Foundation: `assets/css/base.css`, `assets/css/layout.css`, `assets/css/components.css`, `assets/css/utilities.css`, `assets/css/animations.css`.
- Visitor-facing system: `assets/css/inspiration.css`, `assets/css/breadcrumbs.css`, `assets/css/accessibility.css`, `assets/css/site-foundation.css`.
- Immersive tools: `assets/css/tool-overrides.css` plus the tool-specific sheet below.
- Reference component sheets: `assets/components/button.css`, `assets/components/card.css`.

## Shared JavaScript

- Site shell and visitor behavior: `assets/js/visitor-friendly.js`, `assets/js/main.js`, `assets/js/icon-init.js`, `assets/js/ui-popovers.js`, `assets/js/animations-auto.js`.
- Booking and map: `assets/js/booking.js`, `assets/js/tools-book.js`, `assets/js/tools-map.js`.
- Gallery and carousels: `assets/js/gallery.js`, `assets/js/carousel-init.js`.
- Blog discovery and editorial reading: `assets/js/blog-config-adult.js`, `assets/js/blog-config-child.js`, `assets/js/blog-discovery.js`, `assets/js/article-enhancements.js`.
- Network/client helper: `assets/js/http-client.js`.
- Therapeutic tools: `assets/js/tools-breathing.js`, `assets/js/tools-horizon.js`, `assets/js/tools-eye.js`, `assets/js/tools-butterfly.js`, `assets/js/tools-fractal.js`, `assets/js/tools-leaf.js`, `assets/js/tools-leaf-enhancements.js`.

## Page-specific dependency map

| HTML route | Page-specific CSS | Page-specific JavaScript/data |
|---|---|---|
| `index.html` | — | `main.js`, `visitor-friendly.js` |
| `about.html`, `approach.html`, `conditions.html`, `consent.html`, `contact.html`, `doctors.html`, `emergency.html`, `faq.html`, `fees.html`, `mind-grace.html`, `privacy.html`, `process.html`, `resources.html`, `services.html`, `terms.html`, `testimonials.html`, `thank-you.html` | — | Shared shell; page-specific inline enhancements only where present |
| `aasha.html` | — | `carousel-init.js`, Splide only if the carousel markup exists |
| `book.html` | `assets/css-tools/tools-book.css` | `tools-book.js`, `booking.js`, `carousel-init.js` |
| `gallery.html` | — | `gallery-data.js`, `gallery.js` |
| `location.html` | Leaflet CSS | `tools-map.js`, Leaflet, optional motion/anime only if initialized |
| `blog/index.html` | — | Shared shell and blog hub content |
| `blog/adult.html` | — | `blog-config-adult.js`, `blog-discovery.js`, `carousel-init.js` |
| `blog/children.html` | — | `blog-config-child.js`, `blog-discovery.js`, `carousel-init.js` |
| Each `blog/pages/adult/*.html` article | — | `blog-config-adult.js`, `blog-discovery.js`, `article-enhancements.js`, shared shell |
| Each `blog/pages/child/*.html` article | — | `blog-config-child.js`, `blog-discovery.js`, `article-enhancements.js`, shared shell |
| `tools/guided-breathing.html` | `assets/css-tools/tools-breathing.css`, `tool-overrides.css` | `tools-breathing.js` |
| `tools/horizon-scan.html` | `assets/css-tools/tools-horizon.css`, `tool-overrides.css` | `tools-horizon.js` |
| `tools/eye-movement.html` | `assets/css-tools/tools-eye.css`, `tool-overrides.css` | `tools-eye.js` |
| `tools/butterfly-tapper.html` | `assets/css-tools/tools-butterfly.css`, `tool-overrides.css` | `tools-butterfly.js` |
| `tools/hypnos-fractal.html` | `assets/css-tools/tools-fractal.css`, `tool-overrides.css` | `tools-fractal.js` |
| `tools/leaf-on-stream.html` | `assets/css-tools/tools-leaf.css`, `tool-overrides.css` | `tools-leaf.js`, `tools-leaf-enhancements.js` |

## Data and documentation assets

- Blog manifests: `blog/pages/adult/manifest.json`, `blog/pages/child/manifest.json`.
- Image metadata: `assets/images/image_descriptions.md`.
- Public discovery: `robots.txt`, `sitemap.xml`, `site.webmanifest`.
- Product and maintenance guidance: `README.md`, `ARCHITECTURE.md`, `BLOG_SYSTEM_DOCS.md`, `THERAPEUTIC_TOOLS_DOCS.md`, `SEO_AUDIT_FINAL.md`, `TESTING_CHECKLIST.md`, `SECURITY_HARDENING.md`, `VENDOR_AUDIT_AND_CLEANUP_PLAN.md`, and the remaining project Markdown files.

## Repair order

1. Shared chrome, body/main preservation, Windows-safe layout, footer de-duplication, and breadcrumbs.
2. Homepage and conversion routes: services, process, doctors, book, contact, location.
3. Blog hubs and every article: readable editorial layout, metadata, related links, and structured data.
4. Gallery, AASHA, and interactive/map pages.
5. Six therapeutic tools and their CSS/JavaScript.
6. Legal/accessibility/SEO completeness, file presence, link validation, and responsive regression.

## Current audit findings captured for repair

- `about.html` had two source footers; the duplicate was removed.
- `assets/components/footer.html` was a malformed standalone document with escaped script tags; it is now a valid fragment.
- The runtime chrome normalizer previously treated the first wrapper as the header and could discard content inside malformed wrappers; it now preserves or creates `main` before rebuilding one header and one footer.
- Legal page descriptions were absent from `terms.html` and `disclaimer.html`; unique descriptions were added.
- Blog hubs now have unique titles/descriptions; the child hub renders its manifest-backed library and both hubs support search, filters, and functional topic deep-links.
- Article pages now add reading metadata, on-page navigation when useful, related guides, a warm next-step panel, and a local helpfulness prompt.
- Duplicate network-status nodes, duplicate script loads, stale preview-image references, and broken service/condition fragment targets were normalized.
- Malformed year scripts that swallowed footers or leaked JavaScript into the page body were removed; the shared runtime now owns the footer year consistently. UTF-8 charset metadata was added to every public page.
- Gallery category cards now retain readable light surfaces and inverse hover states, location transport icons are self-contained inline SVGs, and deferred card rendering was disabled so below-fold copy is present in captures and on first visit.
- The malformed Hypnotic Fractal wrapper was repaired, its `fractal-ui` script hook now matches the markup, and tool controls receive the shared readable contrast layer.
- Static validation now reports zero missing local HTML/CSS references, zero missing local fragments, zero duplicate IDs or script loads, valid JSON-LD blocks, complete image alt text, and one canonical header/footer/main per public route.
- Several Markdown plans described `terms.html`, `disclaimer.html`, sitemap, robots, manifest, and schema as missing even though some pages existed; this inventory distinguishes documented intent from actual source state.

## Final verification snapshot

- 43 public routes return successfully with one runtime header, one main landmark, one footer, and breadcrumbs on every non-home route.
- Light and dark theme contrast checks pass across all 43 routes; representative Windows forced-colors checks also pass.
- Gallery verification confirms 17 eager thumbnails, working previous/next state changes, synchronized blurred photo backdrops, and no console errors.
- Local HTML references report `MISSING=0`; project JavaScript passes syntax validation; project HTML/CSS/JS/Markdown contain no emoji symbols.
- The shared footer uses clinic phone `+91 96678 63295` (`9667863295`) consistently.
