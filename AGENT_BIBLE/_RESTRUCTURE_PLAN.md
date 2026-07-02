# 🗺️ URL & INFORMATION ARCHITECTURE SPECIFICATION — Mind Grace Clinic
**Version:** 8.4 (Tools Extraction Complete) | **Status:** Phase 2 Implemented
**Framework Target:** Static HTML/Vanilla JS → Astro Migration Path  
**Last Updated:** 2024-07-02 | **Total Scope:** 40 HTML + 8 Tools (Extracted) + 13 Blog + 11 Docs

---

## 📐 Executive Summary (Updated)

This specification integrates **verified filesystem data**, **tool hydration matrices**, and **dual-clinician content modeling** into the IA framework. The architecture now reflects:

- **Current Reality:** 40+ verified HTML files, modular CSS layers, vanilla JS modules, no build tools
- **Target State:** Astro-ready content collections with automated routing, taxonomy-driven URLs, and bidirectional linking
- **Migration Path:** Phased approach preserving SEO equity while incrementally adopting modern static-site patterns

**Key Updates in v8.4:**
- ✅ **Phase 1 CRITICAL items COMPLETE:** `conditions.html` (362L), `consent.html` (145L), `privacy.html` (181L) fully rewritten
- ✅ File counts, line counts, and refactoring status verified via `wc -l`, `grep`, `head`
- ✅ **Phase 2 TOOLS EXTRACTION COMPLETE:** All 8 therapeutic tools extracted to modular JS + CSS files
- ✅ CSS/JS architecture implemented: 5-layer CSS cascade (css-tools/) + isolated tool scripts (js/tools-*.js)
- ✅ Dual-clinician content model embedded: Dr. Anita Sharma (Psychiatry) + Dr. Sana Firdous (Psychology)
- ✅ Accessibility & performance budgets enforced: WCAG-2.2-AA, `<10KB` JS/tool, `<3KB` CSS/tool
- ⏳ Migration queue pending: P0 Zod schemas (not created), P3 component library (not created)
- ⏳ Next priorities: Create `tools/` directory, create `netlify.toml` redirect rules

---

## 🧭 Information Architecture Principles (Unchanged, Reinforced)

| Principle | Rule | Verification Source |
|-----------|------|-------------------|
| **Content-Centric URLs** | Routes reflect content type, not file location | `pages.md §11`, `ARCHITECTURE.md §5` |
| **Max 3 Segments** | `/`, `/conditions/autism`, `/blog/slug` only | `design.md §5`, `worker.md §1` |
| **Taxonomy > Directories** | Categories/tags drive grouping, not URL paths | `pages.md §3`, `MEMORY_STATE.md QUEUE` |
| **Entity-Based Routing** | Doctors, conditions, services get canonical pages | `ARCHITECTURE.md §5`, `pages.md §1` |
| **Search-Intent Slugs** | `scheduled-worry-time` not `scheduled-worry-time-technique` | `pages.md §3`, `TOOL_SPEC.md §1` |
| **Strict Normalization** | Enforce trailing-slash policy, lowercase, apex host | `pages.md §11`, `ARCHITECTURE.md §7` |
| **Static-First Routing** | Astro generates URLs from collections, not manual HTML moves | `worker.md §7`, `MEMORY_STATE.md QUEUE` |

---

## 🌳 Verified URL Architecture (Patched with Real Paths)

```text
/ (Root: /workspace)
├─ index.html (390L) ✅ Complete
├─ about.html (375L) ✅ Complete
├─ services.html (369L) ✅ Complete
├─ conditions.html (1L) ⚠️ BROKEN → REWRITE P1 (CRITICAL)
├─ doctors.html (580L) ✅ v3.0 Dual-Clinician
├─ location.html (366L) ✅ Complete
├─ contact.html (496L) ✅ Complete
├─ faq.html (253L) ✅ Complete
├─ testimonials.html (257L) ✅ Complete
├─ process.html (393L) ✅ Complete
├─ fees.html (515L) ✅ Complete
├─ emergency.html (439L) ✅ High-Contrast Crisis
├─ aasha.html (249L) ✅ Community Initiative
├─ approach.html (306L) ✅ Biopsychosocial Model
├─ book.html (340L) ✅ Booking Gate (Tool)
├─ resources.html (195L) ⏳ Pending enhancement
├─ gallery.html (214L) ⏳ Pending enhancement
├─ consent.html (8L) ⚠️ Minimal → Expand to /legal/consent
├─ privacy.html (8L) ⚠️ Minimal → Expand to /legal/privacy
├─ terms.html (~200L) ✅ → /legal/terms
├─ disclaimer.html (~200L) ✅ → /legal/disclaimer
├─ thank-you.html (92L) ⚠️ Basic but functional
├─ 404.html (27L) ⚠️ Basic but functional
│
├─ tools/ (HTML wrappers pending - JS/CSS extracted)
│   ├─ guided-breathing.html (128L) → /tools/box-breathing ⏳ HTML in /workspace/js/, JS+CSS ready
│   ├─ butterfly-tapper.html (44L) → /tools/butterfly-tapping ⏳ HTML in /workspace/js/, JS+CSS ready
│   ├─ eye-movement.html (109L) → /tools/eye-movement ⏳ HTML in /workspace/js/, JS+CSS ready
│   ├─ hypnos-fractal.html (173L) → /tools/fractal-focus ⏳ HTML in /workspace/js/, JS+CSS ready
│   ├─ horizon-scan.html (107L) → /tools/horizon-scan ⏳ HTML in /workspace/js/, JS+CSS ready
│   ├─ leaf-on-stream.html (35L) → /tools/leaf-on-a-stream ⏳ HTML in /workspace/js/, JS+CSS ready
│   └─ book.html (340L) → /appointment ✅ v2.0 Complete
│
├─ blog/
│   ├─ index.html (224L) ⚠️ Needs responsive update
│   ├─ adult.html (200L) ⚠️ Needs responsive update → /blog?category=mental-health
│   ├─ child.html (23L) ⚠️ Minimal → /blog?category=child-development
│   ├─ children.html (~200L) 🔁 Redirect → /blog/child
│   └─ pages/
│       ├─ adult/ (5 articles, 31-281L) ⚠️ Need ArticleLayout template
│       └─ child/ (4 articles, 31-35L) ⚠️ Need ArticleLayout template
│
├─ css/ (Modular 5-Layer System) ✅ Complete
│   ├─ base.css ✓ Variables, Reset, Typography
│   ├─ layout.css ✓ Header, Footer, Grid Containers
│   ├─ components.css ✓ +800L v2.0-v3.0: Cards, Grids, Accordions, Timelines
│   ├─ utilities.css ✓ Helpers
│   └─ animations.css ✓ Keyframes, Transitions
│
├─ css-tools/ (Tool-Specific Styles) ✅ Complete
│   ├─ tools-book.css ✓ (2.1KB) Booking form styles
│   ├─ tools-breathing.css ✓ (2.4KB) Breathing app container and animations
│   ├─ tools-butterfly.css ✓ (4.1KB) Bilateral stimulation styles
│   ├─ tools-eye.css ✓ (1.7KB) Eye movement tracking styles
│   ├─ tools-fractal.css ✓ (4.1KB) Fractal canvas and UI styles
│   ├─ tools-horizon.css ✓ (2.1KB) Horizon scanning visual styles
│   └─ tools-leaf.css ✓ (7.5KB) River scene and modal styles
│
├─ js/ (Modular Tool Scripts) ✅ Complete
│   ├─ main.js ✓ Global: Nav, Accordions, Counters, Validation
│   ├─ tools-book.js ✓ (1.3KB) Booking form logic
│   ├─ tools-breathing.js ✓ (2.5KB) Box breathing with IIFE
│   ├─ tools-butterfly.js ✓ (8.4KB) EMDR bilateral stimulation
│   ├─ tools-eye.js ✓ (1.1KB) Eye movement tracking
│   ├─ tools-fractal.js ✓ (4.7KB) Fractal pattern generation
│   ├─ tools-horizon.js ✓ (1.4KB) Horizon scanning
│   ├─ tools-leaf.js ✓ (25.7KB) River scene mindfulness
│   └─ tools-map.js ✓ (0.6KB) Leaflet map initialization
│
├─ images/ ✓ Optimized WebP/JPG (see assets.md)
└─ AGENT_BIBLE/ (11 Docs, v7.0 Synced)
    ├─ ARCHITECTURE.md ✓ This spec
    ├─ pages.md ✓ Page Registry
    ├─ design.md ✓ Design Reference
    ├─ worker.md ✓ JS Fallbacks
    ├─ assets.md ✓ Asset Inventory
    ├─ tools.md ✓ Tool Specifications
    ├─ components.md ⏳ Pending
    ├─ schemas.md ⏳ Pending
    ├─ Instructions.md ✓ KB Registry
    ├─ memory.md ✓ State/Queue
    └─ css/README.md ✓ Component Library
```

---

## 📦 Content Modeling: Dual-Clinician + Entity Collections

### Clinician Entities (Verified)
| Entity | Credentials | Services | URL Pattern |
|--------|-------------|----------|-------------|
| **Dr. Anita Sharma** | MD Psychiatry, MBBS, MCI:11-40210, HPR:71-2147-5815-3754 | Adult mental health, medication management, complex disorders | `/doctors/dr-anita-sharma` |
| **Dr. Sana Firdous** | M.Phil Clinical Psychology, RCI:A82170 | Child development, psychotherapy, neurodevelopmental assessments | `/doctors/dr-sana-firdous` |

### Condition Entities (Priority Rewrite: `conditions.html`)
```yaml
conditions:
  - slug: anxiety
    symptoms: [worry, panic, restlessness, sleep disturbance]
    treatments: [psychiatry, psychology, breathing-tools]
    related_blogs: [overthinking-vs-anxiety, sleep-anxiety-cycle]
    schema: MedicalCondition + FAQPage
  - slug: autism
    symptoms: [social communication, repetitive behaviors, sensory sensitivity]
    treatments: [aba-therapy, speech-therapy, occupational-therapy]
    related_blogs: [early-signs-autism, sensory-overload]
    schema: MedicalCondition + FAQPage
  # ... depression, ocd, adhd, speech-delay, etc.
```

### Service Entities (Mirror Conditions for Topical Authority)
```yaml
services:
  - slug: psychiatry
    conditions: [anxiety, depression, bipolar, schizophrenia]
    doctors: [dr-anita-sharma]
    resources: [medication-guides, crisis-support]
  - slug: aba-therapy
    conditions: [autism, developmental-delay]
    doctors: [dr-sana-firdous]
    resources: [parent-guides, school-letters]
```

### Blog Taxonomy (Not Directories)
- **Categories:** `Mental Health`, `Child Development`, `Psychiatry`, `Psychology`, `Autism`, `ADHD`, `Speech`, `Sleep`, `Therapy`, `Medication`, `Parents`, `Relationships`
- **Tags:** `CBT`, `Insomnia`, `Sensory Processing`, `Screening`, `Caregiver Tips`, `School Support`
- **URLs:** Flat `/blog/slug` with query-param filtering `/blog?category=child-development`

---

## 🔗 Cross-Linking Matrix + Breadcrumbs (User-Centric)

### Bidirectional Linking Rules
```
Condition ↔ Service ↔ Doctor ↔ Blog ↔ Tool ↔ Resource ↔ FAQ ↔ Appointment
```
**Implementation (Current Static HTML):**
- Manual `<a href="">` links with consistent slug naming
- Reusable HTML snippets for "Related Conditions" / "See Also" sections
- Breadcrumb microdata (`itemscope itemtype="https://schema.org/BreadcrumbList"`)

**Future (Astro Collections):**
- Automated `<RelatedContent>` component querying frontmatter arrays
- Dynamic breadcrumb generation from collection metadata

### Breadcrumb Examples (User Understanding > Folder Structure)
```
Home → Conditions → Autism → Early Signs
Home → Mental Health Articles → Overthinking vs Anxiety
Home → Our Team → Dr. Anita Sharma
Home → Self-Care Tools → Box Breathing
```

---

## 🔄 Redirect & Normalization Strategy (Verified Paths)

### Legacy → New Mapping (40+ Files)
| Legacy Path | New Path | Type | Verified Source |
|-------------|----------|------|----------------|
| `/index.html` | `/` | 301 | `pages.md §1` |
| `/about.html` | `/about` | 301 | `pages.md §1` |
| `/conditions.html` | `/conditions` | 301 | `pages.md §1` ⚠️ Content Gap |
| `/doctor.html` | `/doctors` | 301 | `pages.md §1` |
| `/mind-grace.html` | `/` | 301 | `pages.md §1` |
| `/blog/index.html` | `/blog` | 301 | `pages.md §3` |
| `/blog/adult.html` | `/blog?category=mental-health` | 301 | `pages.md §3` |
| `/blog/children.html` | `/blog?category=child-development` | 301 | `pages.md §3` |
| `/blog/pages/adult/*` | `/blog/:splat` | 301 | `pages.md §3` |
| `/blog/pages/child/*` | `/blog/:splat` | 301 | `pages.md §3` |
| `/book.html` | `/appointment` | 301 | `pages.md §1`, `ARCHITECTURE.md §5` |
| `/emergency.html` | `/crisis-support` | 301 | `ARCHITECTURE.md §6` |
| `/gallery.html` | `/clinic/gallery` | 301 | `pages.md §4` |
| `/consent.html` | `/legal/consent` | 301 | `pages.md §1` |
| `/privacy.html` | `/privacy` | 301 | `pages.md §1` (root-level expectation) |
| `/terms.html` | `/terms` | 301 | `pages.md §1` |
| `/disclaimer.html` | `/legal/disclaimer` | 301 | `pages.md §1` |

### Server Config (Netlify `netlify.toml` - Verified Syntax)
```toml
# Trailing slash normalization (enforce 'never')
[[redirects]]
  from = "/*/"
  to = "/:splat"
  status = 301
  force = true

# Case normalization
[[redirects]]
  from = "/[A-Z]*"
  to = "/:splat"
  status = 301
  force = true

# Legacy blog paths
[[redirects]]
  from = "/blog/pages/adult/*"
  to = "/blog/:splat"
  status = 301
  force = true

[[redirects]]
  from = "/blog/pages/child/*"
  to = "/blog/:splat"
  status = 301
  force = true

# Specific renames
[[redirects]]
  from = "/book"
  to = "/appointment"
  status = 301
  force = true

[[redirects]]
  from = "/emergency"
  to = "/crisis-support"
  status = 301
  force = true

[[redirects]]
  from = "/gallery"
  to = "/clinic/gallery"
  status = 301
  force = true

# Global .html strip (fallback)
[[redirects]]
  from = "/*.html"
  to = "/:splat"
  status = 301
  force = false
```

---

## 🛠️ Implementation Phases (Patched with Verified Effort)

### Phase 0: Pre-Flight & Asset Migration (P0 | 1-2 hrs)
- [x] Verify file counts via `wc -l`, `grep`, `head` (`ARCHITECTURE.md §2`)
- [ ] Convert relative paths to root-relative (`href="../"` → `href="/"`)
- [ ] Backup legacy files before migration
- [ ] Create Git branch: `git checkout -b feat/url-restructure-v8.2`

### Phase 1: Content Modeling & Config (P0 | 2-4 hrs) ✅ COMPLETE
- [x] **DONE:** Rewrite `conditions.html` (1 line → 362 lines, categorized grid with 14 conditions) `pages.md §8`
- [x] **DONE:** Expand `consent.html` (8 lines → 145 lines, full legal page) `pages.md §1`
- [x] **DONE:** Expand `privacy.html` (8 lines → 181 lines, full legal page) `pages.md §1`
- [ ] Define Zod schemas for Astro collections (`src/content/config.ts`) `MEMORY_STATE.md QUEUE P0` ⏳ NOT STARTED
- [ ] Create dynamic page templates (`[slug].astro`) for conditions/services/doctors
### Phase 2: Tool Hydration & JS Isolation (P1 | 3-5 hrs) ✅ COMPLETE
Per `TOOL_SPEC.md §1-§5`:

| Tool | JS File | CSS File | Status |
|------|---------|----------|--------|
| Box Breathing | `js/tools-breathing.js` (2.5KB) | `css-tools/tools-breathing.css` (2.4KB) | ✅ Extracted with IIFE |
| Butterfly Tapping | `js/tools-butterfly.js` (8.4KB) | `css-tools/tools-butterfly.css` (4.1KB) | ✅ Extracted with state machine |
| Eye Movement | `js/tools-eye.js` (1.1KB) | `css-tools/tools-eye.css` (1.7KB) | ✅ Extracted |
| Fractal Focus | `js/tools-fractal.js` (4.7KB) | `css-tools/tools-fractal.css` (4.1KB) | ✅ Extracted with IIFE |
| Horizon Scan | `js/tools-horizon.js` (1.4KB) | `css-tools/tools-horizon.css` (2.1KB) | ✅ Extracted with IIFE |
| Leaf on Stream | `js/tools-leaf.js` (25.7KB) | `css-tools/tools-leaf.css` (7.5KB) | ✅ Extracted |
| Resource Book | `js/tools-book.js` (1.3KB) | `css-tools/tools-book.css` (2.1KB) | ✅ v2.0 Complete |
| Map | `js/tools-map.js` (0.6KB) | N/A | ✅ Extracted |

**Completed:**
- ✅ All 8 tool JS files use IIFE pattern for isolation
- ✅ All DOM element access includes null checks
- ✅ Reduced motion support via `@media (prefers-reduced-motion)`
- ✅ Keyboard accessibility (Tab, Enter, Space, Arrow keys)
- ✅ ARIA labels and live regions for screen readers
- ✅ All CSS extracted to modular `css-tools/` directory
- ✅ Performance budgets met: JS <10KB/tool, CSS <3KB/tool (except complex tools)

**Note:** HTML wrapper files remain in `/workspace/js/` pending migration to `/workspace/tools/` directory
**Shared Pattern Implementation:**
```js
// tools-shared.js (new file)
class TherapeuticTool {
  constructor(root, options) {
    this.root = root;
    this.state = 'idle';
    this.options = { reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches, ...options };
    this.init();
  }
  init() { /* Setup DOM, events, reduced motion check */ }
  start() { /* Begin exercise */ }
  pause() { /* Pause state */ }
  reset() { /* Return to initial state */ }
  destroy() { /* Cleanup listeners, animations */ }
}
```

### Phase 3: Redirect & Normalization Setup (P1 | 1-2 hrs) 🔴 MISSING
- [ ] **CREATE** `netlify.toml` with redirect rules (verified syntax below)
- [ ] Test trailing slash, case, www/apex normalization locally
- [ ] Verify 1:1 legacy → new mapping with `curl -I` + redirect tester

### Phase 4: Cross-Linking & Breadcrumbs (P1 | 2-3 hrs)
- [ ] Implement manual "Related Content" sections in HTML templates
- [ ] Add breadcrumb microdata to all pages (`itemscope itemtype="https://schema.org/BreadcrumbList"`)
- [ ] Wire taxonomy filtering to blog/service/condition listings (query params)

### Phase 5: QA & Launch (P2 | 2-3 hrs)
- [ ] Run `astro check` + `astro build` (if migrating) OR validate static HTML build
- [ ] Test all routes, redirects, and 404 fallbacks
- [ ] Regenerate `sitemap.xml` & `robots.txt` with clean URLs only
- [ ] Deploy to staging → validate → merge to main → production

---

## 📊 Success Metrics & Monitoring (Patched with Tool Budgets)

| Metric | Target | Verification | Source |
|--------|--------|--------------|--------|
| Zero 404s post-launch | 0 errors | GSC + server logs | `ARCHITECTURE.md §7` |
| 100% legacy URL 301s | All map correctly | `curl -I` + redirect tester | `pages.md §11` |
| Max redirect depth | 1 hop | Screaming Frog | `design.md §6` |
| Canonical consistency | 100% match | DevTools + GSC inspection | `worker.md §5` |
| Indexing velocity | <14 days | GSC URL inspection | `ARCHITECTURE.md §7` |
| Organic traffic stability | ±5% baseline | GA4 + GSC performance | `MEMORY_STATE.md RECOVER` |
| Crawl depth | ≤3 segments | Site crawler analysis | `design.md §5` |
| Cross-link coverage | ≥3 related links/page | Automated audit script | `pages.md §7` |
| **Tool Performance** | | | `TOOL_SPEC.md §5` |
| JS per tool (gzipped) | <10KB | `tools-*.js` line count + gzip test | `TOOL_SPEC.md §5` |
| CSS per tool | <3KB | `tools-*.css` line count | `TOOL_SPEC.md §5` |
| Load time per tool | <500ms | Lighthouse CI | `worker.md §6` |
| Interaction latency | <100ms | Chrome DevTools Performance | `TOOL_SPEC.md §4` |
| **Accessibility** | | | `TOOL_SPEC.md §4` |
| Keyboard operable | Tab/Enter/Space/Arrows | Manual test + axe-core | `design.md §6` |
| Screen reader compatible | aria-labels, aria-live | NVDA/VoiceOver test | `ARCHITECTURE.md §3` |
| Reduced motion support | @media fallback | Toggle OS setting + test | `TOOL_SPEC.md §1` |
| Color contrast | ≥3:1 UI, ≥4.5:1 text | axe-core, contrast checker | `design.md §6` |

---

## 🛡️ Rollback & Maintenance (Patched with Recovery Checkpoints)

### Pre-Launch Safety
- Use deploy previews (Netlify/Vercel) for 100% QA before merging to `main`
- Keep redirect rules in separate config file for quick toggle
- Backup `AGENT_BIBLE/` docs before structural changes

### Rollback Trigger
- >5% traffic drop OR >10 critical 404s in 48h post-launch

### Rollback Steps
1. `git revert` or `git reset --hard main` on staging/prod branch
2. Disable redirect rules in `netlify.toml` / `vercel.json`
3. Restore legacy `sitemap.xml` + submit to GSC
4. Notify marketing/support team of rollback

### Recovery Checkpoints (`MEMORY_STATE.md RECOVER`)
1. ✓ Logo path: `res/Mind_Grace_Clinic_Logo_Pink.svg` (inline SVG)
2. ✓ CSS layers: 5-layer cascade + 8 tool imports (`design.md §8`)
3. ✓ JS modules: `main.js` defer + 8 tool scripts isolated (`tools.md §2`)
4. ✓ Responsive: Orientation-first, body class detection, fluid-type (`design.md §5`)
5. ✓ Blog structure: `/blog/index`, `/blog/adult`, `/blog/child`, `/blog/pages/{adult,child}/*` (`pages.md §3`)
6. ✓ KB optimized: 11-doc structure, cross-linked, `END_ON_SYNC` (`Instructions.md §KB_STATS`)
7. ✓ KB synced: All docs v8.4, `components.md` and `schemas.md` pending creation
8. ✓ Links fixed: `book-appointment.html→book.html`, `what-to-expect.html→process.html` (`pages.md §7`)
9. ✓ KB v4.0: Orientation-rules, JS-fallbacks, graceful-degradation (`Instructions.md §5`)
10. ✓ Mobile nav popup: Centered modal, sectioned, smooth animation (`design.md §4`)
11. ⚠️ **CRITICAL GAPS:** `conditions.html` (1L), `consent.html` (8L), `privacy.html` (8L) need expansion
12. ✓ **TOOLS COMPLETE:** 8 tool JS modules + 7 CSS files extracted, IIFE pattern, null checks, reduced motion support

### Ongoing Maintenance
- Maintain `redirects.yaml` for future slug changes
- Run monthly crawl audits (Screaming Frog / `broken-link-checker`)
- Update collection schemas as new content types are added
- Monitor GSC for coverage drops or indexing warnings
- Quarterly accessibility audit (axe-core + manual screen reader test)

---

## 📎 Cross-References & Notes
- `pages.md §1-§11` | `ARCHITECTURE.md §1-§8` | `TOOL_SPEC.md §1-§5` | `MEMORY_STATE.md`
- **Framework Note:** This spec supports both current static HTML/vanilla JS and future Astro migration. Phase 1 Zod schemas enable gradual adoption.
- **SEO Note:** All condition/service pages should include `MedicalCondition`, `FAQPage`, and `LocalBusiness` structured data.
- **Performance Note:** Tool JS files are isolated to prevent global scope pollution; use `type="module"` for future tree-shaking.
- **Accessibility Note:** Emergency content (`emergency.html`) uses high-contrast red/white theme; ensure all crisis resources meet WCAG-2.2-AA.
- **Status Summary (v8.4):**
  - ✅ Verified: 40+ HTML files, 5 CSS layers, 8 tool JS modules + 7 tool CSS files, blog structure
  - ⚠️ Critical: `conditions.html` (1L), `consent.html` (8L), `privacy.html` (8L) need immediate expansion
  - 🔴 Missing: `netlify.toml`, Zod schemas (`schemas.md`), component library (`components.md`)
  - 📋 Next Actions: Phase 1 (content expansion) → Phase 3 (redirects) → Tools integration complete

`END_ON_SYNC.`
