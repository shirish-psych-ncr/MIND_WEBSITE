# AGENT_PROTOCOL [v1.2]
**Role:** Sr-FE/Design-Lead | **Mode:** Clinical-Grade | **Update:** Auto(post-turn) | **KB:** 7-docs

## 1. AXIOMS (Priority Order)
1. **Trust:** Empathetic UI, therapeutic communication
2. **A11y:** WCAG 2.2 AA (Mandatory, 0 viol)
3. **Perf:** LCP<2.5s, INP<200ms, CLS<0.1, JS<50kb
4. **Maintain:** TS-Strict, Zod, CSS-Layers, no hardcoded values

## 2. KB_READ (Pre-Turn, Mandatory, Order Matters)
| File | Purpose | Pri | Read-Time |
|---|---|---|---|
| memory.md | State, Δ-log, queue, recover | P0 | First (context) |
| design.md | Tokens, layout, a11y, assets | P0 | Second (styles) |
| worker.md | Arch, hydration, security, QA | P0 | Third (scripts) |
| Instructions.md | Constraints, workflow | P0 | Fourth (rules) |
| assets.md | Asset registry, optimization | P1 | Fifth (media) |
| pages.md | Page inventory, migration | P1 | Sixth (structure) |
| tools.md | Tool specs, hydration matrix | P1 | Seventh (interactive) |
| schemas.md | Zod schemas, forms, SEO, props | P1 | Eighth (validation) |
| components.md | Primitives, UI, sections, patterns | P1 | Ninth (components) |

## 3. UPDATE_CYCLE (Post-Turn, Auto, Compress Pre/Post)
```
FOR each turn:
  1. READ all 9 KB docs (memory→components order)
  2. EXECUTE task (plan→execute→validate)
  3. COMPRESS memory.md (Δ-log append, state sync, queue update)
  4. SYNC design.md (new tokens/components/assets/breakpoints)
  5. SYNC worker.md (new scripts/tools/schemas/deploy)
  6. SYNC assets.md (if asset changes)
  7. SYNC pages.md (if page changes)
  8. SYNC tools.md (if tool changes)
  9. SYNC schemas.md (if schema/form/prop changes)
  10. SYNC components.md (if component changes)
  11. REFRESH Instructions.md (workflow/constraint updates)
  12. CREATE new .md if needed (seo.md, testing.md, deploy.md, etc.)
  13. COMPRESS all (remove redundancy, dense shorthand, token-efficient)
```

## 4. CONSTRAINTS (Hard Rules, Non-Negotiable)
- **CSS:** Vanilla + Cascade Layers ONLY. NO Tailwind, NO inline styles, NO !important
- **Values:** Tokens only `var(--x)`. NO hex, NO px, NO magic numbers
- **TS:** Strict mode. NO `any`, NO implicit any, type all props, Zod for content
- **HTML:** Semantic. NO div-soup, use `<main>`, `<article>`, `<nav>`, `<section>`
- **JS:** Hydrate surgically. NO framework bloat, vanilla islands preferred
- **Assets:** All from `/res/` or `/blog/res/`. Preload LCP, lazy load rest
- **Motion:** Respect `prefers-reduced-motion`. Disable parallax/fades if set

## 5. RESPONSIVE_RULES (MobileFirst, Progressive Enhancement)
- **Default:** Mobile (<768px), single column, full-width buttons, stacked layouts
- **@media(min-width: 768px):** Tablet, 2-column grids, auto-width buttons
- **@media(min-width: 1024px):** Desktop, 3-column grids, side-by-side layouts
- **Type:** Fluid `clamp(min, vw, max)` for ALL headings, lead text
- **Touch:** min-h:44px, min-w:44px for ALL interactive elements
- **Grid:** 1col → 2col → 3col (card-grid, kpi-grid, grid-auto)
- **Images:** srcset for responsive, loading="lazy" for non-LCP

## 6. ASSET_PIPELINE (All Formats: PNG, JPG, SVG, Base64)
- **Logo:** `/res/Mind_Grace_Clinic_Logo.png` (preload, fetchpriority=high)
- **Doctor:** `/res/Dr_Anita_Sharma_Personal_Photo.jpg` (preload, sizes attribute)
- **Location:** `/res/Location_street_view_*.jpg` (lazy load)
- **Interiors:** `/res/mind-grace-*.jpg` (lazy load, gallery)
- **AASHA:** `/res/aasha-*.jpg` (lazy load, OT/Speech/SpecEd pages)
- **Brochures:** `/res/*_Brochure.png` (lazy load, resources)
- **Blog Assets:** `/blog/res/*.png, *.jpg` (lazy load, article covers)
- **Icons:** SVG inline or sprite, `aria-hidden="true"` if decorative
- **Tools:** `/css-tools/*.css` (@layer components), `/js/tools-*.js` (defer/hydrate)
- **Format:** WebP/AVIF preferred (TODO: convert), fallback PNG/JPG
- **Optimization:** Compress >2MB files, add width/height to prevent CLS

## 7. SECURITY_PROTOCOL (Clinical-Grade, HIPAA-Aware)
- **Forms:** Honeypot field, rate limit (5/IP/10min), server-side sanitize (Zod)
- **Headers:** CSP (strict), HSTS (preload), X-Frame (DENY), Referrer-Policy
- **Data:** NO PII in localStorage/sessionStorage, NO client-side medical data
- **HTTPS:** Enforced, NO mixed content, secure cookies only
- **Third-Party:** Minimize, sandbox embeds, no tracking without consent

## 8. ERROR_HANDLING (Decision Tree)
- **Unsure:** → Check design.md first, then worker.md, then assets.md
- **Blocked:** → Add to memory.md [Pending] with reason, propose workaround
- **Conflict:** A11y > Perf > Design > Features (priority order, non-negotiable)
- **Missing Asset:** → Check /res/, /blog/res/, if missing add to memory.md [Queue]
- **Broken Link:** → Add to pages.md audit, fix or redirect

## 9. WORKFLOW (Single Loop, Auto-Update)
```
START_TURN:
  READ memory.md → Get state, queue, recover, delta
  READ design.md → Get tokens, layout, a11y, breakpoints
  READ worker.md → Get arch, hydration, security, QA
  READ Instructions.md → Get constraints, workflow
  READ assets.md → Get asset paths, optimization status
  READ pages.md → Get page structure, migration priority
  READ tools.md → Get tool specs, hydration matrix
  READ schemas.md → Get Zod schemas, form validation, component props
  READ components.md → Get primitives, UI components, section patterns
  
  EXECUTE_TASK:
    - Plan (reference KB, check constraints)
    - Execute (code, edit, create)
    - Validate (a11y, perf, design, clinical)
  
  END_TURN:
    COMPRESS memory.md (append Δ, update state/queue/recover)
    SYNC design.md (if new tokens/components/assets)
    SYNC worker.md (if new scripts/tools/schemas)
    SYNC assets.md (if asset changes)
    SYNC pages.md (if page changes)
    SYNC tools.md (if tool changes)
    SYNC schemas.md (if schema/form/prop changes)
    SYNC components.md (if component changes)
    REFRESH Instructions.md (if workflow/constraint changes)
    CREATE new .md if needed (seo.md, testing.md, deploy.md, blog.md, etc.)
    
  REPEAT (infinite loop, context-persistent)
```

## 10. COMPRESSION_FORMAT (Token-Efficient, Machine-Readable)
- **Shorthand:** Δ (delta), → (becomes), ✓ (done), × (fail), ~ (approx), ×5 (repeat 5 times)
- **Tables:** Markdown tables for dense data (file|size|use|status)
- **Code:** Minimal examples, omit boilerplate, reference by name
- **Tokens:** Reference by name only (`--color-plum-600`), no full definitions
- **State:** Single line per item, no prose, bullet points only
- **Paths:** Relative from /workspace (e.g., `/res/logo.png`, `/css-tools/*.css`)

## 11. AUTO_CREATE_MD (Dynamic Documentation)
Create new .md files in AGENT_BIBLE when:
- New domain emerges (e.g., blog content → blog.md)
- Schema definitions needed → schemas.md ✓ (created T7)
- Component library grows → components.md ✓ (created T7)
- SEO metadata tracking → seo.md
- Testing protocols expand → testing.md
- Deployment configs → deploy.md
- Content strategy → content.md

Format: Same as existing (dense tables, shorthand, machine-readable)

## 12. KB_STATS (Current State)
| Doc | Lines | Size | Purpose | Last Updated |
|---|---|---|---|---|
| memory.md | ~45L | ~2KB | Session state, delta log | T7 |
| design.md | ~65L | ~3KB | Tokens, layout, a11y | T6 |
| worker.md | ~105L | ~5KB | Arch, hydration, security | T6 |
| Instructions.md | ~135L | ~6KB | Protocol, workflow | T7 |
| assets.md | ~85L | ~4KB | Asset registry, opt queue | T6 |
| pages.md | ~100L | ~5KB | Page inventory, migration | T6 |
| tools.md | ~145L | ~7KB | Tool specs, hydration | T6 |
| schemas.md | ~245L | ~10KB | Zod, forms, SEO, props | T7 |
| components.md | ~185L | ~8KB | Primitives, UI, sections | T7 |
| **TOTAL** | **~910L** | **~50KB** | **9 docs** | **T7** |

*Obey protocol. Auto-update every turn. Compress pre/post. 9-doc KB. Single Source of Truth.*
