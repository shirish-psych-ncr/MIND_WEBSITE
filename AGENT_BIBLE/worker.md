# WORKER_SPEC [v1.1]
**Role:** FE-Lead/DevOps | **Stack:** Astro4|TS|VanillaJS|LightningCSS

## 1. ARCH_TREE (Current Static→Astro)
```
/workspace
├── index.html (v2.1, Semantic, MobileFirst)
├── styles.css (v3.0, 10-layer cascade)
├── app.js (Main, defer)
├── /res/* (22 assets: Logos, Photos, Brochures)
├── /css-tools/* (7 therapeutic tools)
├── /js/* (11 scripts: main + 10 tools)
├── /AGENT_BIBLE/* (4 KB docs)
└── [TODO] /src/* (Astro scaffold)
```

## 2. TOOLCHAIN
- Build: Vite(Astro4)
- CSS: LightningCSS (Chr90+, FF90+, Saf15+)
- Type: tsc --noEmit (Strict, no any)
- Lint: ESLint+Prettier
- Test: Vitest(unit), Playwright(E2E+a11y)

## 3. HYDRATION_MATRIX
| Comp | Directive | Trigger | Cost | Purpose |
|---|---|---|---|---|
| Nav | client:load | Init | ~2kb | Sticky, mobile drawer |
| FAQ | client:visible | Scroll | ~1kb | ARIA accordion |
| Form | client:load | Init | ~4kb | Validation, honeypot |
| Gallery | client:idle | Post-load | ~3kb | Touch/swipe |
| Tools-* | client:visible | Scroll | ~2kb | Interactive therapy |
| Hero | None | Static | 0kb | Pure HTML/CSS |

## 4. JS_PATTERN (Vanilla Islands)
```ts
class Accordion {
  constructor(root:HTMLElement){
    this.triggers = root.querySelectorAll('[aria-expanded]');
    this.init();
  }
  init(){ /* ARIA toggle, keyboard nav */ }
  toggle(t:Element){ /* Expand/collapse */ }
}
// Hydrate: document.querySelectorAll('.faq').forEach(el=>new Accordion(el));
```

## 5. SECURITY_HEADERS (netlify.toml / vercel.json)
```toml
[[headers]]
  for = "/*"
  [headers.values]
  HSTS = "max-age=31536000;includeSubDomains;preload"
  X-Frame-Options = "DENY"
  X-Content-Type-Options = "nosniff"
  Referrer-Policy = "strict-origin-when-cross-origin"
  Permissions-Policy = "camera=(),microphone=(),geolocation=()"
  CSP = "default-src 'self';script-src 'self' 'unsafe-inline';style-src 'self' 'unsafe-inline';img-src 'self' data: https:;font-src 'self';connect-src 'self';frame-ancestors 'none';"
```

## 6. QA_GATES (CI/CD)
1. **Type:** `npm run check` (0 err, strict)
2. **Lint:** `npm run lint` (ESLint, Prettier)
3. **Build:** `npm run build` (Astro, 0 warn)
4. **A11y:** Playwright+axe (0 viol, WCAG 2.2 AA)
5. **Perf:** Lighthouse (LCP<2.5s, INP<200ms, CLS<0.1, JS<50kb)
6. **Visual:** Chromatic/Percy (opt)

## 7. ZOD_SCHEMAS (Content Collections)
```ts
// src/content/config.ts
doctors: z.object({
  name: z.string(),
  slug: z.string(),
  photo: image().refine(img=>img.width>400),
  registrationNumber: z.string().regex(/^[A-Z0-9-]+$/),
  specialties: z.array(z.string()).min(1),
  availability: z.enum(['accepting','waitlist','on-leave']),
  seo: z.object({title:z.string().max(60),description:z.string().max(155)})
})
conditions: z.object({/*...*/})
articles: z.object({/*...*/})
```

## 8. FORM_SECURITY
- Honeypot: `<input name="bot-field" hidden tabindex="-1">`
- RateLimit: 5/IP/10min (edge)
- Sanitize: Zod server-side
- NoPII: Never localStorage/sessionStorage

## 9. DEPLOY_FLOW
```
push main → CI(lint,type,test,build,a11y,lighthouse) 
         → Edge(Vercel/Netlify) 
         → PreviewURL 
         → Production(auto)
```

## 10. FILES_SYNCED
- index.html: Logo→res/Mind_Grace_Clinic_Logo.png, Doctor→res/Dr_Anita_Sharma_Personal_Photo.jpg
- styles.css: @import 7 css-tools (@layer components)
- app.js: defer load, main.js entry
- /js/*: tools-*.js (breathing, butterfly, eye, fractal, horizon, leaf, book, map, blog-configs)

*Ref: astro.config.mjs, netlify.toml, .github/workflows/ci.yml*
