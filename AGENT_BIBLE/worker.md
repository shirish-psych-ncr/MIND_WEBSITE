# WORKER_SPEC [v14.3] — Mind Grace Neuropsychiatric Clinic

**Role:** FE-Lead/DevOps | **Stack:** HTML5|VanillaJS|Manual-Ops | **Sync:** End-turn

## 1. ARCH_TREE (Current→Target)

```
/workspace (Static)
├── index.html (390L, v2.1)
├── /assets/css/* (5 core CSS)
├── /assets/css-tools/* (7 tool CSS)
├── /assets/js/* (20 app scripts)
├── /assets/images/* (39 images)
├── /*.html (25 root pages)
├── /tools/*.html (6 tool pages)
├── /blog/*.html (12 blog pages)
└── AGENT_BIBLE/* (14 docs)
    → See: memory.md §STATE, pages.md §MIGRATION_PRIORITY
```

## 2. TOOLCHAIN (Zero-Dependency)

| Tool               | Purpose             | Config                | Gate         |
| ------------------ | ------------------- | --------------------- | ------------ |
| Browser DevTools   | Testing/Lighthouse  | Chrome/Firefox/Safari | Manual audit |
| W3C Validators     | HTML/CSS validation | validator.w3.org      | Zero errors  |
| Rich Results Test  | Schema validation   | Google RRT            | Pass all     |
| axe DevTools       | A11y testing        | Browser extension     | 0 violations |
| Manual Compression | Image optimization  | Squoosh.app/TinyPNG   | WebP/AVIF    |

## 3. APPROVED_MICRO_LIBS (Zero-Dependency Stack)

**Mandate:** Only tiny utilities <50KB copied manually to `/assets/js/lib/`. NO npm, NO bundlers.

| Library          | Size  | Purpose                                  | Status        | Path                                     |
| ---------------- | ----- | ---------------------------------------- | ------------- | ---------------------------------------- |
| AutoAnimate      | 23KB  | Automatic list/layout animations         | ✅ Downloaded | `/assets/js/lib/autoanimate.min.js`      |
| Canvas-Confetti  | 25KB  | Celebration animations (form success)    | ✅ Downloaded | `/assets/js/lib/confetti.min.js`         |
| Ky               | 1.2KB | Enhanced fetch API (retries, timeouts)   | ✅ Downloaded | `/assets/js/lib/ky.min.js`               |
| ScrollReveal     | 45KB  | Scroll-triggered animations (a11y-aware) | ✅ Downloaded | `/assets/js/lib/scrollreveal.min.js`     |
| Floating UI Core | 12KB  | Tooltip/popover positioning              | ✅ Downloaded | `/assets/js/lib/floating-ui.core.min.js` |
| Splide           | 30KB  | Accessible carousel (gallery.html)       | ✅ Downloaded | `/assets/js/lib/splide.min.js`           |

**Rejected (Too Heavy or Wrong Fit):**

- Motion One (6KB) - Native Web Animations API sufficient
- Anime.js v4 (7KB) - Overkill for simple therapeutic animations
- Alpine.js (15KB) - Violates vanilla JS mandate
- Petite-Vue (6KB) - Unnecessary reactivity layer
- Preact Signals (2KB) - No framework needed
- htmx (14KB) - Custom fetch logic already minimal
- Swup (4KB) - Multi-page transitions not needed
- Quicklink - Prefetch handled by browser
- Navigo - No client-side routing required
- Fuse.js (5KB) - Blog search uses native filtering
- Nano ID (130B) - Can inline if needed

**Integration Rules:**

1. Copy minified version to `/assets/js/lib/`
2. Load with `defer` attribute
3. Wrap in IIFE to avoid global pollution (if not already modular)
4. Respect `prefers-reduced-motion`
5. Graceful degradation if library fails to load
6. Total lib budget: <150KB (current: ~136KB)

## 4. HYDRATION_MATRIX (Cross-ref: tools.md §2)

| Component | Trigger   | JS Cost | Purpose               |
| --------- | --------- | ------- | --------------------- |
| Nav       | Init      | ~2kb    | Sticky, mobile drawer |
| FAQ       | Scroll    | ~1kb    | ARIA accordion        |
| Form      | Init      | ~4kb    | Validation, honeypot  |
| Gallery   | Post-load | ~3kb    | Touch/swipe           |
| Tools-*   | Scroll    | ~2kb ea | Interactive therapy   |
| Hero      | Static    | 0kb     | Pure HTML/CSS         |

## 4. JS_PATTERN (Vanilla Islands)

```js
// Common pattern for all therapeutic tools (see tools.md §3)
class TherapeuticTool {
  constructor(root, options) {
    this.root = root;
    this.state = "idle"; // idle|running|paused|complete
    this.options = { reducedMotion: false, ...options };
    this.init();
  }
  init() {
    /* Setup DOM, events, reduced motion check */
  }
  start() {
    /* Begin exercise */
  }
  pause() {
    /* Pause state */
  }
  reset() {
    /* Return to initial state */
  }
  destroy() {
    /* Cleanup listeners, animations */
  }
}
// Hydrate: document.querySelectorAll('.tool').forEach(el => new TherapeuticTool(el));
```

## 5. SECURITY_HEADERS (netlify.toml / vercel.json)

```toml
[[headers]]
  for = "/*"
  [headers.values]
  HSTS = "max-age=31536000; includeSubDomains; preload"
  X-Frame-Options = "DENY"
  X-Content-Type-Options = "nosniff"
  Referrer-Policy = "strict-origin-when-cross-origin"
  Permissions-Policy = "camera=(), microphone=(), geolocation=()"
  CSP = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';"
```

## 6. QA_GATES (Manual Testing Protocol)

| Gate       | Method                 | Threshold                             | Status    |
| ---------- | ---------------------- | ------------------------------------- | --------- |
| HTML Valid | W3C Validator          | 0 err                                 | Mandatory |
| CSS Valid  | W3C Validator          | 0 err                                 | Mandatory |
| A11y       | axe DevTools           | 0 viol, WCAG 2.2 AA                   | Mandatory |
| Perf       | Lighthouse (DevTools)  | LCP<2.5s, INP<200ms, CLS<0.1, JS<50kb | Mandatory |
| E2E        | Manual browser testing | All flows work                        | Mandatory |
| Visual     | Cross-browser check    | Chrome/Firefox/Safari                 | Mandatory |
| Mobile     | Device testing         | Portrait/Landscape modes              | Mandatory |

## 7. METADATA_SCHEMAS (JSON-LD, see schemas.md)

```json
// JSON-LD structured data for medical clinic (schemas.md §1)
{
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Mind Grace Neuropsychiatric Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "J-123, Gamma-2",
    "addressLocality": "Greater Noida",
    "addressRegion": "UP",
    "postalCode": "201308",
    "addressCountry": "IN"
  },
  "telephone": "+91-96678-63295",
  "medicalSpecialty": ["Psychiatry", "Psychology"],
  "availableService": ["Therapy", "Counseling", "Assessment"]
}
// → Cross-ref: pages.md §LAYOUT_INVENTORY for component props
```

## 8. FORM_SECURITY (Clinical-Grade, HIPAA-Aware)

- **Honeypot:** `<input name="bot-field" hidden tabindex="-1">`
- **RateLimit:** 5/IP/10min (edge function)
- **Sanitize:** Client-side validation + server-side checks
- **NoPII:** Never localStorage/sessionStorage
- **Consent:** Explicit opt-in before submission

## 9. DEPLOY_FLOW

```
push main → CI(lint, build, a11y, lighthouse)
         → Edge(Vercel/Netlify)
         → PreviewURL
         → Production(auto)
```

## 10. FILES_SYNCED (Current State)

| File         | Status | Changes                                                                                      | Ref                |
| ------------ | ------ | -------------------------------------------------------------------------------------------- | ------------------ |
| index.html   | ✓      | Logo→assets/images/, Doctor→assets/images/                                                   | memory.md §RECOVER |
| styles.css   | ✓      | @import 7 css-tools (@layer components)                                                      | design.md §8       |
| app.js       | ✓      | defer load, main.js entry                                                                    | -                  |
| /assets/js/* | ✓      | 13 tool scripts (breathing, butterfly, eye, fractal, horizon, leaf, book, map, blog-configs) | tools.md §1        |
| netlify.toml | ✓      | Redirect rules, security headers                                                             | -                  |

_Cross-ref: memory.md §STATE, design.md §CSS-TOOLS, tools.md §HYDRATION_MATRIX, assets.md §PRELOAD. Zero-dependency stack enforced. END_ON_SYNC._
