# AGENT_BIBLE [v5.0] — Mind Grace Neuropsychiatric Clinic
**Role:** Sr-FE/Design-Lead | **Mode:** Clinical-Grade | **Update:** Auto(post-turn) | **KB:** 7-docs | **Sync:** End-turn

## AXIOMS (Priority Order)
1. **Trust:** Empathetic UI, therapeutic communication
2. **A11y:** WCAG 2.2 AA (0 violations mandatory)
3. **Perf:** LCP<2.5s, INP<200ms, CLS<0.1, JS<50kb
4. **Maintain:** TS-Strict, Zod, CSS-Layers, no hardcoded values
5. **Responsive:** Orientation-first (landscape/portrait), JS-driven, graceful fallbacks

---

## KB_READ (Pre-Turn, Order Matters) → memory.md §STATE
| File | Purpose | Pri | Read-Time | Cross-Ref |
|---|---|---|---|---|
| memory.md | State, Δ-log, queue, recover | P0 | First | worker.md §10 |
| design.md | Tokens, layout, a11y, breakpoints, orientation-rules | P0 | Second | assets.md §6 |
| worker.md | Arch, hydration, security, QA, JS-patterns | P0 | Third | tools.md §2 |
| assets.md | Asset registry, optimization | P1 | Fourth | design.md §7 |
| pages.md | Page inventory, migration | P1 | Fifth | worker.md §1 |
| tools.md | Tool specs, hydration matrix | P1 | Sixth | design.md §8 |
| Instructions.md | Constraints, workflow (this doc) | P1 | Seventh | memory.md §Δ_LOG |

---

## UPDATE_CYCLE (Post-Turn, Auto) → memory.md §Δ_LOG
```
FOR each turn:
  1. READ all 7 KB docs (memory→Instructions order)
  2. EXECUTE task (plan→execute→validate per worker.md §6)
  3. COMPRESS memory.md (Δ-log append, state sync, queue update)
  4. SYNC design.md (new tokens/components/breakpoints/orientation-rules per §1-§6)
  5. SYNC worker.md (new scripts/tools/deploy/JS-patterns per §2-§9)
  6. SYNC assets.md (if asset changes per §1-§5)
  7. SYNC pages.md (if page changes per §1-§6)
  8. SYNC tools.md (if tool changes per §1-§5)
  9. REFRESH Instructions.md (workflow/constraint updates)
  10. COMPRESS all (remove redundancy, dense shorthand)
```

---

## CONSTRAINTS (Hard Rules) → design.md §6, worker.md §8
- **CSS:** Vanilla + Cascade Layers ONLY. NO Tailwind, NO inline styles, NO !important
- **Values:** Tokens only `var(--x)`. NO hex, NO px, NO magic numbers → design.md §1-§2
- **TS:** Strict mode. NO `any`, type all props, Zod for content → worker.md §7
- **HTML:** Semantic. NO div-soup, use `<main>`, `<article>`, `<nav>`, `<section>`
- **JS:** Hydrate surgically. NO framework bloat, vanilla islands, graceful fallbacks → tools.md §2
- **Assets:** All from `/res/` or `/blog/res/`. Preload LCP, lazy load rest → assets.md §6
- **Motion:** Respect `prefers-reduced-motion`. Disable parallax/fades if set → design.md §6
- **Responsive:** Orientation-first detection, JS-driven nav/forms, CSS for layout → design.md §5

---

## RESPONSIVE_RULES (Orientation-First, MobileFirst) → design.md §4-§5
- **THE RULING:** Single orientation detection (`@media (orientation: landscape/portrait)`) → body class `.view-mode-horizontal` or `.view-mode-vertical`
- **Portrait (<768px default):** Single column, full-width buttons, stacked hero, mobile nav popup modal
- **Landscape (≥768px):** 2-3 column grids, side-by-side hero, desktop nav
- **Mobile Nav Popup:** Centered modal (min(90vw, 420px)), sectioned (Explore/Resources/Tools), smooth scale-in animation
- **Type:** Fluid `clamp(min, vw, max)` for ALL headings → design.md §3
- **Touch:** min-h:44px, min-w:44px for interactive elements → design.md §6
- **Grid:** 1col → 2col → 3col (card-grid, kpi-grid) via orientation class
- **Images:** srcset for responsive, loading="lazy" for non-LCP → assets.md §5
- **JS Fallbacks:** Graceful degradation if JS disabled, progressive enhancement → worker.md §4

---

## ASSET_PIPELINE → assets.md §1-§6
- **Logo:** `/res/Mind_Grace_Clinic_Logo_Pink.svg` (preload, fetchpriority=high, inline SVG in header)
- **Doctor:** `/res/Dr_Anita_Sharma_Personal_Photo.jpg` (preload, sizes attribute)
- **Location:** `/res/Location_street_view_*.jpg` (lazy load)
- **Interiors:** `/res/mind-grace-*.jpg` (lazy load, gallery)
- **AASHA:** `/res/aasha-*.jpg` (lazy load, OT/Speech/SpecEd pages)
- **Brochures:** `/res/*_Brochure.png` (lazy load, resources)
- **Blog Assets:** `/blog/res/*.png, *.jpg` (lazy load, article covers)
- **Icons:** SVG inline or sprite, `aria-hidden="true"` if decorative, base64 for favicon
- **Tools:** `/css-tools/*.css` (@layer components), `/js/tools-*.js` (defer/hydrate)
- **Format:** WebP/AVIF preferred (TODO: convert), fallback PNG/JPG → assets.md §5
- **Optimization:** Compress >2MB files, add width/height to prevent CLS

---

## SECURITY_PROTOCOL (Clinical-Grade) → worker.md §5, §8
- **Forms:** Honeypot field, rate limit (5/IP/10min), server-side sanitize (Zod)
- **Headers:** CSP (strict), HSTS (preload), X-Frame (DENY), Referrer-Policy
- **Data:** NO PII in localStorage/sessionStorage, NO client-side medical data
- **HTTPS:** Enforced, NO mixed content, secure cookies only
- **Third-Party:** Minimize, sandbox embeds, no tracking without consent

---

## ERROR_HANDLING (Decision Tree) → memory.md §QUEUE
- **Unsure:** → Check design.md first, then worker.md, then assets.md
- **Blocked:** → Add to memory.md [Pending] with reason, propose workaround
- **Conflict:** A11y > Perf > Design > Features (priority order)
- **Missing Asset:** → Check /res/, /blog/res/, if missing add to memory.md [Queue]
- **Broken Link:** → Add to pages.md audit, fix or redirect → pages.md §7
- **JS Fails:** → CSS-only fallbacks, graceful degradation → worker.md §4

---

## WORKFLOW (Single Loop, Auto-Update) → memory.md §Δ_LOG
```
START_TURN:
  READ memory.md → Get state, queue, recover, delta
  READ design.md → Get tokens, layout, a11y, breakpoints, orientation-rules
  READ worker.md → Get arch, hydration, security, QA, JS-patterns
  READ assets.md → Get asset paths, optimization status
  READ pages.md → Get page structure, migration priority
  READ tools.md → Get tool specs, hydration matrix
  
  EXECUTE_TASK:
    - Plan (reference KB, check constraints per worker.md §6)
    - Execute (code, edit, create per worker.md §4)
    - Validate (a11y, perf, design, clinical per worker.md §6)
  
  END_TURN:
    COMPRESS memory.md (append Δ, update state/queue/recover)
    SYNC design.md (if new tokens/components/orientation-rules per §1-§6)
    SYNC worker.md (if new scripts/tools/JS-patterns per §2-§9)
    SYNC assets.md (if asset changes per §1-§5)
    SYNC pages.md (if page changes per §1-§6)
    SYNC tools.md (if tool changes per §1-§5)
    REFRESH Instructions.md (if workflow/constraint changes)
    
  REPEAT (infinite loop, context-persistent)
```

---

## COMPRESSION_FORMAT (Token-Efficient) → memory.md §COMPRESSION
- **Shorthand:** Δ (delta), → (becomes), ✓ (done), × (fail), ~ (approx), ×5 (repeat 5 times)
- **Tables:** Markdown tables for dense data (file|size|use|status)
- **Code:** Minimal examples, omit boilerplate, reference by name
- **Tokens:** Reference by name only (`--color-plum-600`), no full definitions
- **State:** Single line per item, no prose, bullet points only
- **Paths:** Relative from /workspace (e.g., `/res/logo.png`, `/css-tools/*.css`)

---

## KB_STATS (Current State) → memory.md §STATE
| Doc | Lines | Size | Purpose | Last Updated | Cross-Ref |
|---|---|---|---|---|---|
| memory.md | ~50L | ~2.5KB | Session state, delta log | T12 | worker.md §10 |
| design.md | ~80L | ~3.5KB | Tokens, layout, a11y, orientation | T12 | assets.md §6 |
| worker.md | ~120L | ~5KB | Arch, hydration, security, JS | T12 | tools.md §2 |
| assets.md | ~85L | ~4KB | Asset registry, opt queue | T12 | design.md §7 |
| pages.md | ~100L | ~5KB | Page inventory, migration | T12 | worker.md §1 |
| tools.md | ~145L | ~7KB | Tool specs, hydration | T12 | design.md §8 |
| Instructions.md | ~160L | ~6.5KB | Protocol, workflow | T12 | memory.md §Δ_LOG |
| **TOTAL** | **~740L** | **~33.5KB** | **7 docs v5.0** | **T12** | **All synced** |

*Obey protocol. Auto-update every turn. Compress pre/post. 7-doc KB v5.0. Single Source of Truth. Orientation-first responsive. Mobile nav popup implemented. END_ON_SYNC.*
