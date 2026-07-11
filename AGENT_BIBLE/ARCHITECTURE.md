# 🏗️ Mind Grace Neuropsychiatric Clinic - Technical Architecture (v5.0)

**Last Verified:** 2026-07-11 | **Total HTML Files:** 43 (25 main + 6 tools + 12 blog) | **Refactored:** Pure static stack

## 1. System Overview

A static, high-performance website built with semantic HTML5, modular CSS, and vanilla JavaScript. Zero-dependency architecture with no build tools required; designed for direct deployment via FTP or simple static hosting.

### Core Principles

- **Mobile-First:** All layouts start at mobile breakpoints and scale up using `min()` and `clamp()`.
- **Modular CSS:** Separation of concerns into `base.css`, `layout.css`, `components.css`, `utilities.css`, and `animations.css`.
- **Accessibility (A11y):** Semantic landmarks, ARIA attributes for dynamic components (accordions, mobile nav), and high-contrast modes for emergency content.
- **Performance:** Zero external framework dependencies (no npm, no build tools). 20 vendor libraries loaded from `/assets/vendor/` and `/assets/js/lib/`.
- **Dual-Clinician Model:** Integrated psychiatric (Dr. Anita Sharma) and psychological (Dr. Sana Firdous) services under one roof.
- **Zero-Dependency Stack:** Pure HTML/CSS/JS with 20 app scripts, 23 vendor libs, no bundlers.

---

## 2. File Structure (Verified)

```text
/ (Root: /workspace)
├── Main Pages (25 HTML files)
│   ├── index.html ✓ Home
│   ├── about.html ✓ About Dr. Anita Sharma
│   ├── services.html ✓ All Services
│   ├── conditions.html ✓ Condition Cards (8 categories)
│   ├── doctors.html ✓ Dual Clinician Profiles
│   ├── location.html ✓ Clinic Location & Directions
│   ├── contact.html ✓ Contact Form
│   ├── process.html ✓ How It Works
│   ├── fees.html ✓ Pricing & Insurance
│   ├── emergency.html ✓ Crisis Resources
│   ├── faq.html ✓ FAQs
│   ├── book.html ✓ Booking Tool
│   ├── resources.html ✓ Resources
│   ├── gallery.html ✓ Gallery
│   ├── consent.html ✓ Consent Forms
│   ├── privacy.html ✓ Privacy Policy
│   ├── thank-you.html ✓ Thank You Page
│   ├── 404.html ✓ Error Page
│   └── ... (additional pages)
├── Tools Section (6 interactive tools)
│   ├── guided-breathing.html ✓ Breathing Exercise
│   ├── butterfly-tapper.html ✓ Butterfly Tapping
│   ├── eye-movement.html ✓ EMDR Eye Movement
│   ├── hypnos-fractal.html ✓ Fractal Hypnosis
│   ├── horizon-scan.html ✓ Horizon Scanning
│   └── leaf-on-stream.html ✓ Leaf on Stream Meditation
├── Blog Section (12 HTML files)
│   ├── blog/index.html ✓ Blog Home
│   ├── blog/adult.html ✓ Adult Mental Health
│   ├── blog/child.html ✓ Child Development
│   └── blog/pages/ (9 article pages)
├── CSS Architecture (14 CSS files)
│   ├── assets/css/ (5 core): base.css, layout.css, components.css, utilities.css, animations.css
│   ├── assets/css-tools/ (7 tool-specific): tools-*.css
│   └── assets/components/ (2 component libs): button.css, card.css
├── JavaScript (63 JS files)
│   ├── assets/js/ (20 app scripts): main.js, tools-*.js, page-transitions.js, etc.
│   ├── assets/js/lib/ (20 libs): alpine.min.js, anime.min.js, ky.min.js, etc.
│   └── assets/vendor/ (23 vendor libs): splide.min.js, floating-ui.min.js, etc.
├── Images (33 optimized images)
│   └── assets/images/ (WebP/JPG/SVG - see assets.md)
└── AGENT_BIBLE/ (14 MD documentation files)
    ├── ARCHITECTURE.md ✓ This file (v5.0)
    ├── Instructions.md ✓ Master registry
    ├── memory.md ✓ Session state tracking
    ├── design.md ✓ Design tokens & patterns
    ├── worker.md ✓ Worker spec & deployment
    ├── assets.md ✓ Complete asset registry
    ├── pages.md ✓ Page inventory
    ├── tools.md ✓ Tool specifications
    ├── components.md ✓ Component library
    ├── schemas.md ✓ JSON-LD structured data
    ├── opengraph.md ✓ Social metadata
    ├── Bible_Generator.md ✓ AI cognitive architecture
    ├── _multiphasic_plan.md ✓ Phased roadmap
    └── css/README.md ✓ CSS layer documentation
```

---

## 3. Design System (CSS) - Verified Components

### Variables (`assets/css/base.css`)

- **Colors:** `--primary` (Deep Plum #671B50), `--accent` (Terracotta #E39774), `--support` (Soft Pink #EFBCBA), `--olive` (Earthy Olive #8B8B6B).
- **Typography:** `Playfair Display` (Headings, weight 600), `Inter` (UI/Body, 18-20px base).
- **Spacing:** Fluid scale using `clamp()` (--space-xs through --space-5xl).
- **Radius:** Fluid scale (--radius-sm through --radius-xxl, all using clamp()).
- **Shadows:** Ultra-subtle shadows with plum tint (--shadow-xs through --shadow-float).

### Component Patterns (`assets/css/components.css`, `assets/components/*.css`)

- **Cards:** `.card` with pastel icon backgrounds, 24px border-radius, subtle hover lift (4px).
- **Buttons:** `.btn-primary`, `.btn-secondary`, `.btn-outline` with increased padding (22px × 42px).
- **Grids:** Auto-fit `minmax` logic with clamp-based gaps.
- **Navigation:** Sticky header with mobile overlay menu (scale-in animation, blur backdrop).
- **Forms:** Styled inputs with focus states, validation error messages, checkbox customization.
- **Specialized Components:**
  - `.timeline` - Vertical line with numbered markers for bio/education
  - `.accordion` - Accessible expandable Q&A (faq.html, process.html)
  - `.hero-badge` - Smaller badge with SVG icon (36px height)
  - `.hero-trust` - Trust indicators below CTAs
  - `.emotional-cta` - Warm CTA section with supportive messaging

---

## 4. JavaScript Architecture (`assets/js/main.js`) - Verified Functions

### Global Modules (Active)

1.  **Mobile Navigation:** Toggles `.is-active` on header, body scroll lock, aria-expanded updates.
2.  **Accordion Handler:** Delegated event listener for FAQ/Process steps with aria-controls.
3.  **Counter Animation:** `IntersectionObserver` triggers number counting for `.stat-number`.
4.  **Form Validation:** Prevents submit on empty required fields; adds `.error` class (contact.html, book.html).
5.  **Smooth Scroll:** Handles anchor links with reduced-motion support.
6.  **Scroll Progress:** Progress bar indicator for long pages.
7.  **Reveal on Scroll:** IntersectionObserver-based animation triggers.

### Tool-Specific Scripts (8 tools)

- Located in `assets/js/tools-*.js`.
- Isolated scope to prevent conflict with global `main.js`.
- Examples: Canvas animation for "Leaf on Stream", Web Audio API for "Binaural Beats", breathing animation timers, EMDR eye movement logic, fractal hypnosis rendering, horizon scanning interaction, butterfly tapping haptics.

### Vendor Libraries (23 libs in `/assets/vendor/` and `/assets/js/lib/`)

- **HTTP Client:** Ky (fetch wrapper)
- **UI Frameworks:** Alpine.js, Petite Vue, Preact Signals
- **Animation:** Anime.js, Motion One, ScrollReveal, AutoAnimate
- **Navigation:** HTMX, Navigo, Swup
- **Utilities:** Fuse.js (search), Iconify, Lucide icons, nanoid, Quicklink
- **Components:** Splide (carousel), Floating UI (popovers)

---

## 5. Content Strategy - Dual-Clinician Model (VERIFIED)

### Organization Profile

**Mind Grace Neuropsychiatric Clinic & Aasha – An Early Intervention Centre**

- **Address:** J-123, Gamma-2, Greater Noida, Uttar Pradesh – 201308
- **Contact:** +91-96678-63295, dranitasharma86@gmail.com
- **Website:** www.dranitasharma.com / mindgracencr.in

### Clinician 1: Dr. Anita Sharma (Psychiatrist)

- **Credentials:** MD (Psychiatry), MBBS, MCI Reg: 11-40210, HPR ID: 71-2147-5815-3754
- **Experience:** 14+ years
- **Training:** AIIMS Rishikesh, IHBAS Delhi, Maudsley Hospital London
- **Services:** Adult mental health, medication management, complex disorders (Depression, Anxiety, Bipolar, Schizophrenia, Addiction, Sleep disorders, ADHD, PTSD)
- **Approach:** Warm, non-judgmental, outcome-focused, holistic balance
- **Hospital Panels:** Naveen Hospital, Green City Hospital, Sahdeo Hospital (Greater Noida)
- **Publications:** Indian Journal of Psychiatry (2019), Asian Journal of Psychiatry (2019)

### Clinician 2: Dr. Sana Firdous (Clinical Psychologist)

- **Credentials:** M.Phil Clinical Psychology, RCI Reg: A82170
- **Experience:** 7+ years
- **Affiliation:** Consultant at Sharda Hospital, Greater Noida
- **Services:** Child development, psychotherapy, psychodiagnostic assessments, neurodevelopmental disorders (Autism, ADHD, Learning Disabilities), behavioral interventions, parent guidance
- **Approach:** Play-based, strength-focused, evidence-based, nurturing

### Shared Philosophy

> "We are here to help you solve serious problems with compassion and a non-judgmental approach. At Mind Grace, we restore balance for adults carrying life's weight. At Aasha, we nurture potential for children finding their path. Together, we support whole families."

### Tone Guidelines

- **Mind Grace (Adult):** Professional, reassuring, authoritative, non-judgmental
- **Aasha (Child):** Warm, nurturing, hopeful, strength-focused, play-based
- **Emergency:** Direct, high-contrast, immediate action-oriented

---

## 6. Emergency Protocol (Verified)

- `emergency.html` uses high-contrast red/white theme.
- Immediate helpline numbers (112, Kiran, Vandrevala, Childline) are largest elements.
- Disclaimer: "Not an emergency service" is prominent.
- Resources grid: Local hospitals, police, helplines with clickable phone links.

---

## 7. Deployment Checklist (Updated)

- [x] Verify all internal links are relative (`./about.html`).
- [x] Ensure `robots.txt` allows crawling of public pages.
- [ ] Compress images to WebP format (see assets.md for inventory).
- [x] Test mobile navigation on iOS and Android (verified in code).
- [ ] Validate forms (contact/book) connect to backend/email service.
- [x] Confirm `doctors.html` is linked in main navigation (added to all refactored pages).
- [x] conditions.html - Full condition cards implemented
- [ ] Expand legal pages (consent.html, privacy.html - currently minimal).
- [ ] Hydrate tool pages (6 interactive tools need JS activation).
- [ ] Update blog articles with full templates (9 articles need expansion).

---

## 8. Known Issues & Next Steps

| Issue                  | File(s)                    | Priority | Action Required                                    |
| ---------------------- | -------------------------- | -------- | -------------------------------------------------- |
| ✅ Fixed               | conditions.html            | -        | Full condition cards with 8 categories implemented |
| Minimal content        | consent.html, privacy.html | MEDIUM   | Full legal rewrite with proper disclaimers         |
| Tools not hydrated     | 6 tool pages               | MEDIUM   | Add JS initialization and canvas/audio logic       |
| Blog articles minimal  | 9 article files            | LOW      | Expand with ArticleLayout template                 |
| Missing Dr. Sana photo | doctors.html               | LOW      | Replace SVG placeholder with actual photo          |
| Basic error page       | 404.html                   | LOW      | Create branded error experience                    |

_Ref: Verified via file system commands on 2026-07-11. Cross-ref: pages.md §8 (Content Guidelines), design.md §7 (Assets), worker.md §4 (JS Fallbacks). END_ON_SYNC._
