# 📖 AGENT BIBLE — Mind Grace Neuropsychiatric Clinic
**Version:** 7.0 | **Last Updated:** Current Session | **Status:** Active

## 🎯 Purpose

This knowledge base serves as the **cognitive architecture** for autonomous AI agents working on the Mind Grace website. It externalizes engineering intent, design philosophy, architectural decisions, and operational continuity so that any AI or human can understand and modify this system without losing coherence.

---

## 📚 Document Registry

| Document | Purpose | Reading Order | Cross-Ref |
|----------|---------|---------------|-----------|
| [`Instructions.md`](./Instructions.md) | Operating protocol, constraints, workflow | 1st | All docs |
| [`memory.md`](./memory.md) | Session state, delta log, pending queue | 2nd | worker.md §10 |
| [`design.md`](./design.md) | Design tokens, layout rules, accessibility | 3rd | assets.md §6 |
| [`worker.md`](./worker.md) | Architecture, hydration, security, QA | 4th | tools.md §2 |
| [`pages.md`](./pages.md) | Page inventory, URL structure, migration | 5th | worker.md §1 |
| [`tools.md`](./tools.md) | Therapeutic tool specifications | 6th | design.md §8 |
| [`assets.md`](./assets.md) | Asset registry, optimization pipeline | 7th | design.md §7 |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | System overview, dual-clinician model | Reference | pages.md §8 |
| [`Bible_Generator.md`](./Bible_Generator.md) | Engineering philosophy, AI cognition | Philosophy | Instructions.md §1 |
| [`_RESTRUCTURE_PLAN.md`](_RESTRUCTURE_PLAN.md) | URL restructuring implementation guide | P0 Priority | pages.md §11 |

---

## 🔁 Update Cycle (Auto-Execute Every Turn)

```
START_TURN:
  1. READ memory.md → Get state, queue, recover
  2. READ design.md → Get tokens, layout, a11y
  3. READ worker.md → Get arch, hydration, security
  4. READ assets.md → Get asset paths, optimization
  5. READ pages.md → Get page structure, URLs
  6. READ tools.md → Get tool specs, hydration
  7. READ Instructions.md → Get constraints, workflow
  
EXECUTE_TASK:
  - Plan (reference KB, check constraints)
  - Execute (code, edit, create)
  - Validate (a11y, perf, design, clinical)
  
END_TURN:
  1. APPEND Δ to memory.md §Δ_LOG
  2. SYNC design.md (if new tokens/components)
  3. SYNC worker.md (if new scripts/tools)
  4. SYNC assets.md (if asset changes)
  5. SYNC pages.md (if page/URL changes)
  6. SYNC tools.md (if tool changes)
  7. REFRESH Instructions.md (if workflow changes)
  8. COMPRESS all docs (remove redundancy)
```

---

## ⚡ Core Axioms (Priority Order)

1. **Trust:** Empathetic UI, therapeutic communication, clinical-grade professionalism
2. **Accessibility:** WCAG 2.2 AA (0 violations mandatory)
3. **Performance:** LCP<2.5s, INP<200ms, CLS<0.1, JS<50kb
4. **Maintainability:** TypeScript-strict, Zod validation, CSS-layers, no hardcoded values
5. **Responsive:** Orientation-first detection (landscape/portrait), JS-driven graceful fallbacks

---

## 🚨 Hard Constraints

- **CSS:** Vanilla + Cascade Layers ONLY. NO Tailwind, NO inline styles, NO `!important`
- **Values:** Design tokens only `var(--x)`. NO hex codes, NO px, NO magic numbers
- **TypeScript:** Strict mode. NO `any`, type all props, Zod for content validation
- **HTML:** Semantic elements. NO div-soup, use `<main>`, `<article>`, `<nav>`, `<section>`
- **JavaScript:** Surgical hydration. NO framework bloat, vanilla islands, graceful degradation
- **Assets:** All from `/res/` or `/blog/res/`. Preload LCP images, lazy load rest
- **Motion:** Respect `prefers-reduced-motion`. Disable parallax/fades if set
- **Security:** NO PII in localStorage, CSP strict, HSTS preload, rate limiting

---

## 📱 Responsive Philosophy (Orientation-First)

**THE RULING:** Single orientation detection via `@media (orientation: landscape/portrait)`

| Mode | Body Class | Layout | Navigation |
|------|------------|--------|------------|
| Portrait | `.view-mode-vertical` | Single column, stacked hero, full-width buttons | Mobile popup modal (centered, sectioned) |
| Landscape | `.view-mode-horizontal` | 2-3 column grids, side-by-side hero | Desktop nav bar |

- **Typography:** Fluid `clamp(min, vw, max)` for ALL headings
- **Touch Targets:** min-h:44px, min-w:44px for interactive elements
- **Grid Progression:** 1col → 2col → 3col via orientation class
- **JS Fallbacks:** Graceful degradation if JavaScript disabled

---

## 🔗 Quick References

- **Live Site:** [mindgracencr.in](https://mindgracencr.in/)
- **GitHub:** [shirish-psych-ncr/MIND_WEBSITE](https://github.com/shirish-psych-ncr/MIND_WEBSITE)
- **Clinic Address:** J-123, Gamma-2, Greater Noida, UP 201308
- **Contact:** +91-96678-63295, dranitasharma86@gmail.com

---

## 📊 Repository Stats (v7.0)

- **Total Files:** 80 (HTML, MD, JS, JSON)
- **Core Pages:** 20 root-level HTML files
- **Tool Pages:** 7 interactive therapy modules
- **Blog Pages:** 13 (index + categories + articles)
- **Templates:** 3 template files
- **Legacy Files:** 3 (_legacy/*)
- **Documentation:** 11 MD files (AGENT_BIBLE)

---

## 🎯 Current Priorities

| Priority | Task | Ref Doc | Status |
|----------|------|---------|--------|
| P0 | URL Restructuring Implementation | _RESTRUCTURE_PLAN.md | Ready |
| P0 | Zod schemas (src/content/config.ts) | worker.md §7 | Pending |
| P1 | Fix conditions.html (1 line broken) | ARCHITECTURE.md §8 | Pending |
| P1 | Expand legal pages (consent, privacy) | pages.md §2 | Pending |
| P2 | Hydrate 7 therapeutic tools | tools.md §1 | Pending |
| P2 | Blog article templates | pages.md §3 | Pending |

---

*This is a living document. Auto-update every turn. Compress pre/post. END_ON_SYNC.*
