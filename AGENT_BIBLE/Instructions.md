# 📖 AGENT BIBLE — Mind Grace Neuropsychiatric Clinic

**Version:** 14.3 | **Last Updated:** 2026-07-11 | **Status:** Active | **Sync:** AGENT_BIBLE_v14.3_FULL_SYNC

## 🎯 Core Mission

Build and maintain a **zero-dependency**, **WCAG-2.2-AA compliant**, **orientation-first** neuropsychiatric clinic website using pure static HTML, CSS Layers, and Vanilla JavaScript. No build tools, no npm, no frameworks.

## 📚 Knowledge Base Registry (14 Documents)

| Document             | Version | Purpose                                                 | Cross-Ref        |
| -------------------- | ------- | ------------------------------------------------------- | ---------------- |
| memory.md            | v14.3   | Session state, delta logs, continuity checkpoints       | All docs         |
| design.md            | v14.3   | Design tokens, orientation-first, fluid type, dark mode | components.md §4 |
| worker.md            | v14.3   | Worker spec, manual ops, deployment checklist           | pages.md §6      |
| assets.md            | v14.3   | Complete asset registry (176 files), vendor libs        | design.md §7     |
| pages.md             | v14.3   | Page inventory (43 HTML), URL mappings, templates       | worker.md §3     |
| tools.md             | v14.3   | Tool specifications (8 therapeutic tools)               | components.md §3 |
| components.md        | v14.3   | UI component library (Vanilla JS patterns)              | design.md §4     |
| schemas.md           | v14.3   | JSON-LD structured data for SEO                         | pages.md §8      |
| opengraph.md         | v14.3   | OpenGraph metadata, social sharing                      | pages.md §8      |
| ARCHITECTURE.md      | v14.3   | Technical architecture, file organization               | assets.md §1     |
| _multiphasic_plan.md | v14.3   | Phased implementation roadmap                           | worker.md §6     |
| Bible_Generator.md   | -       | Engineering operating system                            | Instructions.md  |
| css/README.md        | v14.3   | CSS layer documentation                                 | design.md §8     |

**Total KB Lines:** ~6,500 across 14 markdown files

## 🏗️ Project Stats (Current)

| Category   | Count   | Lines       | Trend                                |
| ---------- | ------- | ----------- | ------------------------------------ |
| HTML Pages | 43      | ~14,500     | Stable (25 root + 6 tools + 12 blog) |
| CSS Files  | 12      | ~4,200      | +7 tool CSS                          |
| JS Files   | 20      | ~8,500      | Core modules only                    |
| Images     | 38      | N/A         | Complete                             |
| MD Docs    | 14      | ~8,000      | Stable                               |
| **TOTAL**  | **176** | **~35,200** | **Current**                          |

## 🛠️ Tech Stack Mandate

- **HTML5:** Semantic, accessible, 43 pages (25 root + 6 tools + 12 blog)
- **CSS:** 5-layer cascade (base→layout→components→utilities→animations) + 7 tool CSS
- **JavaScript:** Vanilla ES6+ with essential vendor libraries (no frameworks)
- **Zero Dependency:** NO package.json, NO npm, NO build tools
- **Testing:** Manual only (browser DevTools, Rich Results Test)

## 📦 Vendor Libraries (Essential Only)

**Core:** Ky (fetch), HTMX (AJAX), Alpine.js (reactive), Navigo (router)
**Animation:** Anime.js, Motion One, ScrollReveal, Auto Animate, Canvas Confetti
**UI:** Floating UI (tooltips), Splide (carousel), Iconify, Lucide (icons)
**Utility:** Fuse.js (search), Nano ID (IDs), Quicklink (prefetch)

## 🎨 Design Principles

1. **Orientation-First:** Body class detection (.portrait/.landscape), no breakpoints
2. **Fluid Typography:** clamp() based, 16px-20px base
3. **Dark Mode:** System preference + manual toggle
4. **WCAG-2.2-AA:** Contrast ratios, focus states, ARIA labels
5. **Performance:** Lazy loading, critical CSS, WebP where available

## 🔧 Current Priorities (P0-P6)

| Priority | Task                                        | Status      | Ref              |
| -------- | ------------------------------------------- | ----------- | ---------------- |
| P0       | Documentation sync v14.3                    | ✅ Complete | This file        |
| P1       | Component library build (Button, Card, Nav) | Pending     | components.md §1 |
| P2       | Manual E2E checklist (A11y, Mobile, Print)  | Pending     | worker.md §6     |
| P3       | Asset optimization (WebP, SVG sprites)      | Pending     | assets.md §9     |
| P4       | Blog article template expansion             | Pending     | pages.md §3      |
| P5       | Book page integration                       | In Progress | pages.md §2      |
| P6       | SEO audit via Rich Results Test             | Pending     | schemas.md §4    |

## 📁 Critical File Paths

```
/workspace/
├── *.html (43 pages: index, about, services, book, location, contact, faq, emergency, resources, gallery, tools/*)
├── /blog/* (12 files: index, adult, children, pages/adult×5, pages/child×4)
├── /_templates/* (3 templates: clean, adult-mental-health, child-development)
├── /assets/
│   ├── css/* (5 core: base, layout, components, utilities, animations)
│   ├── css-tools/* (7 tool-specific)
│   ├── js/* (20 app scripts)
│   ├── vendor/* (third-party libs)
│   ├── images/* (39 images)
│   └── components/* (4 HTML partials)
├── /AGENT_BIBLE/ (14 markdown docs)
└── netlify.toml (redirect rules)
```

## ⚠️ Zero-Dependency Mandate (v9.1+)

- **DELETED:** package.json, Playwright, CI/CD configs
- **MANDATE:** All operations must be executable manually or via Netlify deploy
- **TESTING:** Browser DevTools only (Lighthouse, Accessibility tab, Network tab)
- **VALIDATION:** Rich Results Test, W3C Validator, manual checklist

## 🔄 Session Continuity

- **Session ID:** mg-019 | **Turn:** T+33 | **Sync:** AGENT_BIBLE_v14.3_FULL_SYNC
- **Last Action:** Full markdown audit v14.3, all docs synchronized to current repo state (176 files)
- **Next Action:** Component library integration, manual E2E testing
- **Recovery Point:** 176 files tracked (43 HTML, 12 CSS, 20 JS, 39 Images, 14 MD), zero-dependency stack confirmed

_End of Agent Bible Instructions v14.3. Full markdown sync complete. Zero-dependency stack enforced._
