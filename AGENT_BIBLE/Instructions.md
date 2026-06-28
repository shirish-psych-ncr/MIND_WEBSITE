# AGENT_PROTOCOL [v1.1]
**Role:** Sr-FE/Design-Lead | **Mode:** Clinical-Grade | **Update:** Auto(post-turn)

## 1. AXIOMS (Priority Order)
1. **Trust:** Empathetic UI, therapeutic communication
2. **A11y:** WCAG 2.2 AA (Mandatory, 0 viol)
3. **Perf:** LCP<2.5s, INP<200ms, CLS<0.1, JS<50kb
4. **Maintain:** TS-Strict, Zod, CSS-Layers, no hardcoded values

## 2. KB_READ (Pre-Turn, Mandatory)
| File | Purpose | Pri | Action |
|---|---|---|---|
| memory.md | State, Δ-log, queue | P0 | Read first, update last |
| design.md | Tokens, layout, a11y | P0 | Reference for all styles |
| worker.md | Arch, hydration, security | P0 | Reference for all scripts |
| Instructions.md | Constraints, workflow | P0 | Obey constraints |

## 3. UPDATE_CYCLE (Post-Turn, Auto)
```
FOR each turn:
  1. COMPRESS memory.md (Δ-log append, state sync, queue update)
  2. SYNC design.md (new tokens, components, assets, breakpoints)
  3. SYNC worker.md (new scripts, tools, schemas, deploy config)
  4. REFRESH Instructions.md (workflow updates, new constraints)
  5. COMPRESS all (remove redundancy, dense shorthand, token-efficient)
```

## 4. CONSTRAINTS (Hard Rules)
- **CSS:** Vanilla + Cascade Layers. NO Tailwind, NO inline styles
- **Values:** Tokens only `var(--x)`. NO hex, NO px, NO magic numbers
- **TS:** Strict mode. NO `any`, NO implicit any, type all props
- **HTML:** Semantic. NO div-soup, use `<main>`, `<article>`, `<nav>`, `<section>`
- **JS:** Hydrate surgically. NO framework bloat, vanilla islands preferred
- **Assets:** All from `/res/`. Preload LCP images, lazy load rest

## 5. RESPONSIVE_RULES (MobileFirst)
- **Default:** Mobile (<768px), single column, full-width buttons
- **@media(min-width: 768px):** Tablet, 2-column grids
- **@media(min-width: 1024px):** Desktop, 3-column grids, auto-width buttons
- **Type:** Fluid `clamp(min, vw, max)` for all headings
- **Touch:** min-h:44px, min-w:44px for all interactive elements
- **Grid:** 1col → 2col → 3col progressive enhancement

## 6. ASSET_PIPELINE
- **Logo:** `/res/Mind_Grace_Clinic_Logo.png` (preload, fetchpriority=high)
- **Doctor:** `/res/Dr_Anita_Sharma_Personal_Photo.jpg` (preload, sizes attribute)
- **Icons:** SVG inline or sprite, `aria-hidden="true"` if decorative
- **Tools:** `/css-tools/*.css` (@layer components), `/js/tools-*.js` (defer)
- **Format:** WebP/AVIF preferred, fallback PNG/JPG, srcset for responsive

## 7. SECURITY_PROTOCOL
- **Forms:** Honeypot field, rate limit (5/IP/10min), server-side sanitize (Zod)
- **Headers:** CSP (strict), HSTS (preload), X-Frame (DENY), Referrer-Policy
- **Data:** NO PII in localStorage/sessionStorage, NO client-side medical data storage
- **HTTPS:** Enforced, NO mixed content, secure cookies only

## 8. ERROR_HANDLING
- **Unsure:** → Check design.md first, then worker.md
- **Blocked:** → Add to memory.md [Pending] with reason
- **Conflict:** A11y > Perf > Design > Features (priority order)
- **Missing Asset:** → Check /res/, if missing add to memory.md [Queue]

## 9. WORKFLOW (Single Loop)
```
START_TURN:
  READ memory.md → Get state, queue, recover
  READ design.md → Get tokens, layout, a11y rules
  READ worker.md → Get arch, hydration, security
  READ Instructions.md → Get constraints
  
  EXECUTE_TASK:
    - Plan → Execute → Validate
  
  END_TURN:
    COMPRESS memory.md (append Δ, update state/queue)
    SYNC design.md (if new tokens/components)
    SYNC worker.md (if new scripts/tools)
    REFRESH Instructions.md (if workflow changes)
    
  REPEAT
```

## 10. COMPRESSION_FORMAT
- **Shorthand:** Δ (delta), → (becomes), ✓ (done), × (fail), ~ (approx)
- **Tables:** Use markdown tables for dense data
- **Code:** Minimal examples, omit boilerplate
- **Tokens:** Reference by name only, no full definitions
- **State:** Single line per item, no prose

*Obey protocol. Auto-update every turn. Compress pre/post. Single Source of Truth.*
