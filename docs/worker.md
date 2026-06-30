# WORKER_SPEC [v2.0] — Mind Grace Clinic
**Role:** FE-Lead/DevOps | **Stack:** Astro4|TS|VanillaJS|LightningCSS | **Sync:** End-turn

## 1. ARCH_TREE (Current→Target)
```
/workspace (Static)          → /src (Astro Target)
├── index.html (561L, v2.1)     ├── layouts/ (BaseLayout.astro, etc.)
├── styles.css (2089L, v3.0)    ├── components/ (Primitives, UI)
├── app.js (685L)               ├── pages/ (Routes from pages.md)
├── /res/* (22 assets)          ├── content/ (Zod schemas §7)
├── /css-tools/* (7 tools)      └── styles/ (CSS layers)
├── /js/* (11 scripts)          
└── AGENT_BIBLE/* (7 docs)      
    → See: memory.md §STATE, pages.md §MIGRATION_PRIORITY
```

## 2. TOOLCHAIN
| Tool | Purpose | Config | Gate |
|---|---|---|---|
| Vite (Astro4) | Build | astro.config.mjs | npm run build |
| LightningCSS | CSS proc | Chr90+, FF90+, Saf15+ | --no-warn |
| TypeScript | Type check | --strict, no any | tsc --noEmit |
| ESLint+Prettier | Lint/format | .eslintrc, .prettierrc | npm run lint |
| Vitest | Unit tests | vitest.config.ts | npm run test:unit |
| Playwright | E2E+a11y | playwright.config.ts | npm run test:e2e |

## 3. HYDRATION_MATRIX (Cross-ref: tools.md §2)
| Component | Directive | Trigger | JS Cost | Purpose |
|---|---|---|---|---|
| Nav | client:load | Init | ~2kb | Sticky, mobile drawer |
| FAQ | client:visible | Scroll | ~1kb | ARIA accordion |
| Form | client:load | Init | ~4kb | Validation, honeypot |
| Gallery | client:idle | Post-load | ~3kb | Touch/swipe |
| Tools-* | client:visible | Scroll | ~2kb ea | Interactive therapy |
| Hero | None | Static | 0kb | Pure HTML/CSS |

## 4. JS_PATTERN (Vanilla Islands)
```ts
// Common pattern for all therapeutic tools (see tools.md §3)
class TherapeuticTool {
  constructor(root: HTMLElement, options?: {}){
    this.root = root;
    this.state = 'idle'; // idle|running|paused|complete
    this.options = { reducedMotion: false, ...options };
    this.init();
  }
  init(){ /* Setup DOM, events, reduced motion check */ }
  start(){ /* Begin exercise */ }
  pause(){ /* Pause state */ }
  reset(){ /* Return to initial state */ }
  destroy(){ /* Cleanup listeners, animations */ }
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

## 6. QA_GATES (CI/CD Pipeline)
| Gate | Command | Threshold | Status |
|---|---|---|---|
| Type | `npm run check` | 0 err, strict | Mandatory |
| Lint | `npm run lint` | ESLint+Prettier | Mandatory |
| Build | `npm run build` | Astro, 0 warn | Mandatory |
| A11y | Playwright+axe | 0 viol, WCAG 2.2 AA | Mandatory |
| Perf | Lighthouse | LCP<2.5s, INP<200ms, CLS<0.1, JS<50kb | Mandatory |
| Visual | Chromatic/Percy | Optional | Opt-in |

## 7. ZOD_SCHEMAS (Content Collections, see schemas.md if restored)
```ts
// src/content/config.ts (pending implementation, memory.md §QUEUE P0)
doctors: z.object({
  name: z.string(), slug: z.string(),
  photo: image().refine(img => img.width > 400),
  registrationNumber: z.string().regex(/^[A-Z0-9-]+$/),
  specialties: z.array(z.string()).min(1),
  availability: z.enum(['accepting', 'waitlist', 'on-leave']),
  seo: z.object({ title: z.string().max(60), description: z.string().max(155) })
})
// → Cross-ref: pages.md §LAYOUT_INVENTORY for component props
```

## 8. FORM_SECURITY (Clinical-Grade, HIPAA-Aware)
- **Honeypot:** `<input name="bot-field" hidden tabindex="-1">`
- **RateLimit:** 5/IP/10min (edge function)
- **Sanitize:** Zod server-side validation
- **NoPII:** Never localStorage/sessionStorage
- **Consent:** Explicit opt-in before submission

## 9. DEPLOY_FLOW
```
push main → CI(lint, type, test, build, a11y, lighthouse) 
         → Edge(Vercel/Netlify) 
         → PreviewURL 
         → Production(auto)
```

## 10. FILES_SYNCED (Current State)
| File | Status | Changes | Ref |
|---|---|---|---|
| index.html | ✓ | Logo→res/, Doctor→res/ | memory.md §RECOVER |
| styles.css | ✓ | @import 7 css-tools (@layer components) | design.md §8 |
| app.js | ✓ | defer load, main.js entry | - |
| /js/* | ✓ | 11 tools scripts (breathing, butterfly, eye, fractal, horizon, leaf, book, map, blog-configs) | tools.md §1 |

*Cross-ref: memory.md §STATE, design.md §CSS-TOOLS, tools.md §HYDRATION_MATRIX, assets.md §PRELOAD. END_ON_SYNC.*
