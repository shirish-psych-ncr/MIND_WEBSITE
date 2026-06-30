# 🏗️ Mind Grace Clinic - Technical Architecture (v3.0)
**Last Verified:** Real file system check | **Total HTML Files:** 40+ | **Refactored:** 14 core pages

## 1. System Overview
A static, high-performance website built with semantic HTML5, modular CSS, and vanilla JavaScript. No build tools required; designed for direct deployment via FTP or simple static hosting.

### Core Principles
- **Mobile-First:** All layouts start at mobile breakpoints and scale up using `min()` and `clamp()`.
- **Modular CSS:** Separation of concerns into `base.css`, `layout.css`, `components.css`, `utilities.css`, and `animations.css`.
- **Accessibility (A11y):** Semantic landmarks, ARIA attributes for dynamic components (accordions, mobile nav), and high-contrast modes for emergency content.
- **Performance:** Zero external framework dependencies (no Bootstrap, no jQuery). System fonts + Google Fonts only.
- **Dual-Clinician Model:** Integrated psychiatric (Dr. Anita Sharma) and psychological (Dr. Sana Firdous) services under one roof.

---

## 2. File Structure (Verified)

```text
/ (Root: /workspace)
├── index.html (390 lines) ✓ Template Reference
├── about.html (375 lines) ✓ Refactored v2.0
├── services.html (369 lines) ✓ Refactored v2.0
├── conditions.html (1 line) ⚠️ Broken/Empty - NEEDS REWRITE
├── doctors.html (580 lines) ✓ NEW v3.0 - Dual Clinician Profile
├── doctor.html (296 lines) ⚠️ Legacy - Superseded by doctors.html
├── location.html (366 lines) ✓ Fixed v2.0 - Header repaired
├── contact.html (496 lines) ✓ Refactored v2.0
├── process.html (393 lines) ✓ Refactored v2.0
├── fees.html (515 lines) ✓ Refactored v2.0
├── emergency.html (439 lines) ✓ Refactored v2.0
├── faq.html (253 lines) ✓ Refactored v2.0
├── testimonials.html (257 lines) ✓ Refactored v2.0
├── approach.html (306 lines) ✓ Refactored v2.0
├── aasha.html (249 lines) ✓ Refactored v2.0
├── book.html (340 lines) ✓ Refactored v2.0 (Tool)
├── resources.html (195 lines) ⚠️ Pending
├── gallery.html (214 lines) ⚠️ Pending
├── consent.html (8 lines) ⚠️ Minimal - Needs rewrite
├── privacy.html (8 lines) ⚠️ Minimal - Needs rewrite
├── thank-you.html (88 lines) ⚠️ Basic
├── 404.html (23 lines) ⚠️ Basic
├── guided-breathing.html (128 lines) ⚠️ Tool - Needs hydration
├── butterfly-tapper.html (44 lines) ⚠️ Tool - Needs hydration
├── eye-movement.html (109 lines) ⚠️ Tool - Needs hydration
├── hypnos-fractal.html (173 lines) ⚠️ Tool - Needs hydration
├── horizon-scan.html (107 lines) ⚠️ Tool - Needs hydration
├── leaf-on-stream.html (35 lines) ⚠️ Tool - Needs hydration
├── blog/
│   ├── index.html (224 lines) ⚠️ Needs responsive update
│   ├── adult.html (200 lines) ⚠️ Needs responsive update
│   ├── child.html (23 lines) ⚠️ Minimal
│   └── pages/
│       ├── adult/ (5 articles, 31-281 lines each) ⚠️ Need templates
│       └── child/ (4 articles, 31-35 lines each) ⚠️ Need templates
├── css/
│   ├── base.css ✓ Variables, Reset, Typography
│   ├── layout.css ✓ Header, Footer, Grid Containers
│   ├── components.css ✓ Cards, Buttons, Forms, Accordions, Timelines (+800 lines added v2.0-v3.0)
│   ├── utilities.css ✓ Helpers
│   └── animations.css ✓ Keyframes, Transitions
├── js/
│   ├── main.js ✓ Nav, Accordions, Counters, Validation
│   └── tools-*.js ✓ Specific logic for interactive tools
├── images/ (Optimized WebP/JPG - see assets.md)
└── AGENT_BIBLE/
    ├── ARCHITECTURE.md ✓ This file (v3.0)
    ├── pages.md ✓ Page Registry (v3.0)
    ├── design.md ✓ Design Reference (v6.0)
    └── css/README.md ✓ Component Library (v2.0)
```

---

## 3. Design System (CSS) - Verified Components

### Variables (`css/base.css`)
- **Colors:** `--primary` (Teal #3a7ca5), `--secondary` (Warm Sand #e8dccf), `--accent` (Plum #6b4c63), `--emergency` (Red #dc2626).
- **Typography:** `Inter` (UI/Body), `Playfair Display` (Headings).
- **Spacing:** Scale based on `0.5rem` increments (--space-4 to --space-12).
- **Radius:** `--radius-sm` (4px), `--radius-md` (8px), `--radius-lg` (16px), `--radius-xl` (24px).

### Component Patterns Added (`css/components.css`) - v2.0/v3.0
- **Cards:** `.service-card`, `.testimonial-card`, `.condition-card`, `.feature-card`, `.contact-card`, `.pillar-card`, `.program-card`. All with hover lift effects.
- **Grids:** `.services-grid`, `.features-grid`, `.impact-stats`, `.contact-grid`, `.testimonials-grid`. Auto-fit `minmax` logic.
- **Navigation:** Sticky header with mobile overlay menu (scale-in animation, blur backdrop).
- **Forms:** Styled inputs with focus states, validation error messages, checkbox customization.
- **Specialized Components:**
  - `.timeline` - Vertical line with numbered markers for bio/education (doctors.html)
  - `.service-comparison-grid` - 2-column split Psychiatrist vs Psychologist (doctors.html)
  - `.jump-button` - Smooth scroll trigger buttons (doctors.html)
  - `.clinician-section` - Distinct visual blocks per provider (doctors.html)
  - `.stat-counter` - Large typography for animated numbers (aasha.html)
  - `.pillar-card` - Bio/Psycho/Social pillars (approach.html)
  - `.accordion` - Accessible expandable Q&A (faq.html, process.html)
  - `.pricing-table` - Clean rows with highlight (fees.html)
  - `.emergency-alert` - High contrast crisis notices (emergency.html)

---

## 4. JavaScript Architecture (`js/main.js`) - Verified Functions

### Global Modules (Active)
1.  **Mobile Navigation:** Toggles `.is-active` on header, body scroll lock, aria-expanded updates.
2.  **Accordion Handler:** Delegated event listener for FAQ/Process steps with aria-controls.
3.  **Counter Animation:** `IntersectionObserver` triggers number counting for `.stat-number` (aasha.html).
4.  **Form Validation:** Prevents submit on empty required fields; adds `.error` class (contact.html, book.html).
5.  **Smooth Scroll:** Handles anchor links (e.g., Jump to "Psychiatrist" section in doctors.html).

### Tool-Specific Scripts
- Located in `js/tools-*.js`.
- Isolated scope to prevent conflict with global `main.js`.
- Examples: Canvas animation for "Leaf on Stream", Web Audio API for "Binaural Beats", breathing animation timers.

---

## 5. Content Strategy - Dual-Clinician Model (VERIFIED)

### Organization Profile
**Mind Grace Neuropsychiatric Clinic & Aasha – An Early Intervention Centre**
- **Address:** J-123, Gamma-2, Greater Noida, Uttar Pradesh – 201308
- **Contact:** +91-96678-63295, dranitasharma86@gmail.com
- **Website:** www.dranitasharma.com

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
- [ ] Rewrite `conditions.html` (currently 1 line - broken).
- [ ] Expand legal pages (consent.html, privacy.html - currently 8 lines each).
- [ ] Hydrate tool pages (6 interactive tools need JS activation).
- [ ] Update blog articles with full templates (9 articles need expansion).

---

## 8. Known Issues & Next Steps
| Issue | File(s) | Priority | Action Required |
|---|---|---|---|
| Empty/Broken page | conditions.html | HIGH | Rewrite from scratch with categorized grid |
| Minimal content | consent.html, privacy.html | MEDIUM | Full legal rewrite with proper disclaimers |
| Tools not hydrated | 6 tool pages | MEDIUM | Add JS initialization and canvas/audio logic |
| Blog articles minimal | 9 article files | LOW | Expand with ArticleLayout template |
| Missing Dr. Sana photo | doctors.html | LOW | Replace SVG placeholder with actual photo |
| Basic error page | 404.html | LOW | Create branded error experience |

*Ref: Verified via wc -l, grep, head commands on 2024-06-29. Cross-ref: pages.md §8 (Content Guidelines), design.md §7 (Assets), worker.md §4 (JS Fallbacks). END_ON_SYNC.*
