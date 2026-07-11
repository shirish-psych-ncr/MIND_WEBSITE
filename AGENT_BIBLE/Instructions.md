# 📖 AGENT BIBLE — Mind Grace Neuropsychiatric Clinic
**Version:** 14.0 | **Last Updated:** 2026-07-11 | **Status:** Active | **Sync:** AGENT_BIBLE_v14_FULL_SYNC

## 🎯 Core Mission
Build and maintain a **zero-dependency**, **WCAG-2.2-AA compliant**, **orientation-first** neuropsychiatric clinic website using pure static HTML, CSS Layers, and Vanilla JavaScript. No build tools, no npm, no frameworks.

## 📚 Knowledge Base Registry (14 Documents)
| Document | Version | Purpose | Cross-Ref |
|----------|---------|---------|-----------|
| memory.md | v14.0 | Session state, delta logs, continuity checkpoints | All docs |
| design.md | v14.0 | Design tokens, orientation-first, fluid type, dark mode | components.md §4 |
| worker.md | v14.0 | Worker spec, manual ops, deployment checklist | pages.md §6 |
| assets.md | v14.0 | Complete asset registry (165 files), vendor libs | design.md §7 |
| pages.md | v14.0 | Page inventory (50 HTML), URL mappings, templates | worker.md §3 |
| tools.md | v14.0 | Tool specifications (8 therapeutic tools) | components.md §3 |
| components.md | v14.0 | UI component library (Vanilla JS patterns) | design.md §4 |
| schemas.md | v2.0 | JSON-LD structured data for SEO | pages.md §8 |
| opengraph.md | v1.0 | OpenGraph metadata, social sharing | pages.md §8 |
| ARCHITECTURE.md | v3.0 | Technical architecture, file organization | assets.md §1 |
| _multiphasic_plan.md | v4.0 | Phased implementation roadmap | worker.md §6 |
| Bible_Generator.md | - | Engineering operating system | Instructions.md |
| css/README.md | - | CSS layer documentation | design.md §8 |

**Total KB Lines:** ~5,929 across 14 markdown files

## 🏗️ Project Stats (Current)
| Category | Count | Lines | Trend |
|----------|-------|-------|-------|
| HTML Pages | 50 | ~16,000 | Stable |
| CSS Files | 12 | ~4,000 | +7 tool CSS |
| JS Files | 64 | ~12,500 | +1 http-client |
| Images | 39 | N/A | +2 interior |
| MD Docs | 14 | ~8,000 | Stable |
| **TOTAL** | **181** | **~40,500** | **+2** |

## 🛠️ Tech Stack Mandate
- **HTML5:** Semantic, accessible, 50 pages
- **CSS:** 5-layer cascade (base→layout→components→utilities→animations) + 7 tool CSS
- **JavaScript:** Vanilla ES6+ with 19 vendor libraries (no frameworks)
- **Zero Dependency:** NO package.json, NO npm, NO build tools
- **Testing:** Manual only (browser DevTools, Rich Results Test)

## 📦 Vendor Libraries (24 Total)
**Core:** Ky (fetch), HTMX (AJAX), Alpine.js (reactive), Navigo (router), Swup (transitions)
**Animation:** Anime.js, Motion One, ScrollReveal, Auto Animate, Canvas Confetti
**UI:** Floating UI (tooltips), Splide (carousel), Iconify, Lucide (icons)
**Utility:** Fuse.js (search), Nano ID (IDs), Quicklink (prefetch), Petite Vue, Preact Signals

## 🎨 Design Principles
1. **Orientation-First:** Body class detection (.portrait/.landscape), no breakpoints
2. **Fluid Typography:** clamp() based, 16px-20px base
3. **Dark Mode:** System preference + manual toggle
4. **WCAG-2.2-AA:** Contrast ratios, focus states, ARIA labels
5. **Performance:** Lazy loading, critical CSS, WebP where available

## 🔧 Current Priorities (P0-P6)
| Priority | Task | Status | Ref |
|----------|------|--------|-----|
| P0 | Browser console error audit (about.html prime case) | ✅ Resolved | worker.md §4 |
| P1 | Component library build (Button, Card, Nav) | Pending | components.md §1 |
| P2 | Manual E2E checklist (A11y, Mobile, Print) | Pending | worker.md §6 |
| P3 | Asset optimization (WebP, SVG sprites) | Pending | assets.md §9 |
| P4 | Blog article template expansion | Pending | pages.md §3 |
| P5 | Book page integration | In Progress | pages.md §2 |
| P6 | SEO audit via Rich Results Test | Pending | schemas.md §4 |

## 📁 Critical File Paths
```
/workspace/
├── *.html (50 pages: index, about, services, book, location, contact, faq, emergency, resources, gallery, tools/*)
├── /blog/* (12 files: index, adult, children, pages/adult×5, pages/child×4)
├── /_templates/* (3 templates: clean, adult-mental-health, child-development)
├── /assets/
│   ├── css/* (5 core: base, layout, components, utilities, animations)
│   ├── css-tools/* (7 tool-specific)
│   ├── js/* (40 app scripts)
│   ├── vendor/* (24 third-party libs)
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
- **Session ID:** mg-019 | **Turn:** T+32 | **Sync:** AGENT_BIBLE_v14_FULL_SYNC
- **Last Action:** Full markdown audit v14.0, all docs synchronized
- **Next Action:** Component library integration, manual E2E testing
- **Recovery Point:** 181 files tracked tracked, all ESLint errors resolved, Ky HTTP client integrated, zero-dependency stack confirmed

*End of Agent Bible Instructions v14.0. Full markdown sync complete. Zero-dependency stack enforced.*
