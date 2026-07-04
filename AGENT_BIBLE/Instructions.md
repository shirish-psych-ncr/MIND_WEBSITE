# 📖 AGENT BIBLE — Mind Grace Neuropsychiatric Clinic
**Version:** 9.0 | **Last Updated:** Current Session | **Status:** Active

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
| [`schemas.md`](./schemas.md) | JSON-LD schemas, metadata validation | Reference | worker.md §7 |
| [`components.md`](./components.md) | UI component library spec | Reference | design.md §4 |
| [`opengraph.md`](./opengraph.md) | OpenGraph & metadata spec | Reference | pages.md §9 |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | System overview, dual-clinician model | Reference | pages.md §8 |
| [`Bible_Generator.md`](./Bible_Generator.md) | Engineering philosophy, AI cognition | Philosophy | Instructions.md §1 |
| [`_RESTRUCTURE_PLAN.md`](_RESTRUCTURE_PLAN.md) | URL restructuring implementation guide | P0 Priority | pages.md §11 |
| [`_multiphasic_plan.md`](_multiphasic_plan.md) | Implementation roadmap (Phase 3 complete) | Reference | memory.md §Δ_LOG |
| [`VERIFICATION_REPORT.md`](./VERIFICATION_REPORT.md) | Verification & audit results | Reference | worker.md §6 |
| [`css/README.md`](./css/README.md) | CSS component library docs | Reference | design.md §8 |

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
4. **Maintainability:** Vanilla JS strict, semantic HTML, CSS-layers, no hardcoded values
5. **Responsive:** Orientation-first detection (landscape/portrait), JS-driven graceful fallbacks

---

## 🚨 Hard Constraints

- **CSS:** Vanilla + Cascade Layers ONLY. NO Tailwind, NO inline styles, NO `!important`
- **Values:** Design tokens only `var(--x)`. NO hex codes, NO px, NO magic numbers
- **JavaScript:** Surgical hydration. NO framework bloat, vanilla islands, graceful degradation
- **HTML:** Semantic elements. NO div-soup, use `<main>`, `<article>`, `<nav>`, `<section>`
- **Assets:** All from `/assets/images/` or `/blog/res/`. Preload LCP images, lazy load rest
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

## 📊 Repository Stats (v9.0)

- **Total Files:** 95+ (HTML, MD, JS, JSON, CSS)
- **Core Pages:** 37 root-level HTML files
- **Tool Pages:** 6 interactive therapy modules (butterfly-tapper, eye-movement, guided-breathing, horizon-scan, hypnos-fractal, leaf-on-stream)
- **Blog Pages:** 13 (index + adult + children + pages/adult×5 + pages/child×4)
- **Templates:** 3 template files (template-clean, adult-mental-health, child-development)
- **Components:** 3 HTML partials (header, footer, navigation)
- **CSS Modules:** 12 files (5 core + 7 tools)
- **JS Modules:** 13 files (main + 8 tools + 2 blog-config + blog-discovery + tools-map)
- **Assets:** 31 images in /assets/images/
- **Documentation:** 16 MD files (AGENT_BIBLE)
- **Config:** netlify.toml, package.json

---

## 🎯 Current Priorities

| Priority | Task | Ref Doc | Status |
|----------|------|---------|--------|
| P0 | Component library build (Button, Card, Nav) | components.md §1-§4 | Pending |
| P1 | Playwright E2E tests (a11y, perf) | worker.md §6 | Pending |
| P2 | CI/CD pipeline (.github/workflows/ci.yml) | worker.md §9 | Pending |
| P2 | Asset optimization (WebP, SVG sprites) | assets.md §5 | Pending |
| P3 | Blog article template expansion | pages.md §3 | Pending |
| P3 | Book page integration | pages.md §2 | In Progress |

---

*This is a living document. Auto-update every turn. Compress pre/post. END_ON_SYNC.*
