# Mind Grace Neuropsychiatric Clinic — Repository Architecture Documentation

## Executive Summary

This repository contains the complete web presence for **Mind Grace Neuropsychiatric Clinic**, a mental health practice in Greater Noida led by Dr. Anita Sharma. The project has been architected as a **modern, fluid, intrinsically responsive website** using vanilla HTML, CSS, and JavaScript—without frameworks.

### Core Design Philosophy

1. **Intrinsic Responsiveness**: Layouts adapt to available space using CSS Grid, Flexbox, `clamp()`, `min()`, `max()`, `auto-fit`, and Container Queries—not device-specific breakpoints.
2. **Fluid Typography & Spacing**: All font sizes, spacing, and dimensions use `clamp()` for smooth scaling across all viewport sizes.
3. **Modular CSS Architecture**: Styles are separated into logical modules (base, layout, components, utilities, animations).
4. **Progressive Enhancement**: JavaScript is used only for interactions; the site works without it.
5. **Accessibility First**: Semantic HTML, ARIA attributes, focus states, skip links, and reduced motion support.
6. **Design System**: Centralized design tokens for colors, typography, spacing, shadows, and radii.

---

## Repository Structure

````
/workspace
├── ARCHITECTURE.md                 # This file
├── README.md                       # Project overview & deployment URL
├── index.html                      # Homepage (primary entry point)
│
├── assets/                         # Core Assets Directory
│   ├── css/                        # Core Stylesheets (Modular Architecture)
│   │   ├── base.css                # Variables, reset, base styles, dark mode
│   │   ├── layout.css              # Header, hero, footer, page structure
│   │   ├── components.css          # Reusable UI components (cards, badges, buttons)
│   │   ├── utilities.css           # Helper classes (spacing, typography, visibility)
│   │   └── animations.css          # Keyframes, animation utilities, reveal effects
│   │
│   ├── css-tools/                  # Tool-Specific Styles (Therapeutic Features)
│   │   ├── tools-book.css          # Resource book styles
│   │   ├── tools-breathing.css     # Guided breathing exercise
│   │   ├── tools-butterfly.css     # Butterfly tapper EMDR tool
│   │   ├── tools-eye.css           # Eye movement therapy
│   │   ├── tools-fractal.css       # Hypnotic fractal visualization
│   │   ├── tools-horizon.css       # Horizon scanning relaxation
│   │   └── tools-leaf.css          # Leaf on stream mindfulness
│   │
│   ├── js/                         # JavaScript Modules
│   │   ├── main.js                 # Core interactions (nav, scroll, reveal)
│   │   ├── blog-config-adult.js    # Blog configuration for adult mental health
│   │   ├── blog-config-child.js    # Blog configuration for child development
│   │   ├── blog-discovery.js       # Blog post discovery & rendering
│   │   ├── tools-book.js           # Resource book functionality
│   │   ├── tools-breathing.js      # Breathing exercise logic
│   │   ├── tools-butterfly.js      # Butterfly tapper logic
│   │   ├── tools-eye.js            # Eye movement tool logic
│   │   ├── tools-fractal.js        # Fractal animation control
│   │   ├── tools-horizon.js        # Horizon scan interaction
│   │   ├── tools-leaf.js           # Leaf on stream interaction
│   │   ├── tools-map.js            # Location map integration
│   │   ├── ui-popovers.js          # Popover UI components
│   │   ├── booking.js              # Booking system
│   │   ├── gallery.js              # Gallery functionality
│   │   ├── carousel-init.js        # Carousel initialization
│   │   ├── icon-init.js            # Icon initialization
│   │   ├── page-transitions.js     # Page transition effects
│   │   ├── animations-auto.js      # Automatic animations
│   │   ├── http-client.js          # HTTP client wrapper
│   │   └── lib/                    # Utility libraries
│   │
│   ├── images/                     # Static Resources (Images, Logos, Brochures)
│   │   ├── Mind_Grace_Clinic_Logo_*.svg/png  # Logo variants
│   │   ├── Dr_Anita_Sharma_Personal_Photo.webp
│   │   ├── mind-grace-*.webp        # Clinic photos
│   │   ├── Location_street_view_*.webp
│   │   ├── AASHA_*.webp             # AASHA brochures
│   │   ├── aasha-*.webp             # AASHA therapy photos
│   │   └── image_descriptions.md   # Image accessibility descriptions
│   │
│   ├── components/                 # Reusable HTML/CSS Components
│   │   ├── header.html
│   │   ├── footer.html
│   │   ├── button.css
│   │   ├── card.css
│   │   ├── nav-panel.html
│   │   ├── library-stack.html
│   │   └── README.md
│   │
│   └── vendor/                     # Third-party Libraries (local copies)
│       ├── alpine.min.js
│       ├── htmx.min.js
│       ├── lucide.min.js
│       ├── floating-ui.min.js
│       ├── anime.min.js
│       ├── motion-one.min.js
│       ├── splide.min.js
│       ├── scrollreveal.min.js
│       ├── swup.min.js
│       ├── navigo.min.js
│       ├── ky.min.js
│       └── [other libraries]
│
├── blog/                           # Blog Section
│   ├── index.html                  # Blog homepage
│   ├── adult.html                  # Adult mental health category
│   ├── children.html               # Child development category
│   ├── pages/
│   │   ├── adult/                  # Adult mental health articles
│   │   │   ├── overthinking-vs-anxiety.html
│   │   │   ├── scheduled-worry-time-technique.html
│   │   │   ├── sleep-and-anxiety-cycle.html
│   │   │   ├── stimulus-control-therapy.html
│   │   │   └── when-to-see-a-psychiatrist.html
│   │   └── child/                  # Child development articles
│   │       ├── early-signs-of-autism.html
│   │       ├── school-concerns-and-adhd.html
│   │       ├── sensory-overload-at-home.html
│   │       └── speech-delay-red-flags.html
│   └── res/                        # Blog-specific images (if any)
│
├── tools/                          # Therapeutic Tools (Interactive Features)
│   ├── guided-breathing.html       # Breathing Exercise
│   ├── butterfly-tapper.html       # EMDR Butterfly Tapping
│   ├── eye-movement.html           # Eye Movement Therapy
│   ├── hypnos-fractal.html         # Hypnotic Fractal Visualization
│   ├── horizon-scan.html           # Horizon Scanning Relaxation
│   └── leaf-on-stream.html         # Mindfulness: Leaf on Stream
│
├── inspo/                          # Inspiration & Design References
│   ├── Anti-inspo UI UXI Anti Pattern.md
│   ├── check1.md, check3.md, check4.md
│   ├── skillscheck.md
│   └── BIBLE BRAND IDENTITY.txt
│
├── AGENT_BIBLE/                    # AI Agent Documentation
│   ├── Instructions.md             # Agent operating instructions
│   ├── Bible_Generator.md          # Documentation generation guide
│   ├── ARCHITECTURE.md             # Agent architecture overview
│   ├── assets.md                   # Asset management guidelines
│   ├── components.md               # Component documentation
│   ├── design.md                   # Design system documentation
│   ├── memory.md                   # Context memory structure
│   ├── opengraph.md                # OpenGraph metadata
│   ├── pages.md                    # Page inventory & relationships
│   ├── schemas.md                  # Data schemas
│   ├── tools.md                    # Tool specifications
│   ├── worker.md                   # Worker process documentation
│   ├── _multiphasic_plan.md        # Development planning
│   └── css/README.md               # CSS documentation for agents
│
├── [ROOT PAGES]                    # Individual HTML Pages (25 total)
│   ├── about.html, services.html, process.html
│   ├── location.html, contact.html, book.html
│   ├── doctors.html, dr-anita-sharma.html
│   ├── conditions.html, approach.html, fees.html
│   ├── gallery.html, testimonials.html, faq.html
│   ├── emergency.html, consent.html
│   ├── privacy.html, terms.html, disclaimer.html
│   ├── resources.html, mind-grace.html, aasha.html
│   ├── thank-you.html, 404.html
│   └── [legacy templates]
│
├── site.webmanifest                # PWA manifest
├── robots.txt                      # Search engine crawling rules
├── sitemap.xml                     # SEO sitemap
├── package.json                    # Node.js dependencies (dev tools)
├── eslint.config.mjs               # ESLint configuration
├── netlify.toml                    # Netlify deployment config
└── .gitignore                      # Git ignore rules

---

## Page Inventory

### Core Pages (Root Level)

| File | Purpose | Status | Notes |
|------|---------|--------|-------|
| `index.html` | Homepage | ✅ Active | Primary entry point, modern fluid design |
| `about.html` | About Dr. Sharma & Clinic | ✅ Active | |
| `services.html` | Services Overview | ✅ Active | Psychiatry, counseling, child development |
| `process.html` | What to Expect | ✅ Active | Patient journey |
| `location.html` | Clinic Location & Map | ✅ Active | Uses `tools-map.js` |
| `contact.html` | Contact Form & Info | ✅ Active | |
| `book.html` | Booking System | ✅ Active | Appointment scheduling |
| `doctors.html` | All Doctors | ✅ Active | Doctor listings |
| `dr-anita-sharma.html` | Lead Doctor Profile | ✅ Active | Dr. Anita Sharma bio |
| `conditions.html` | Conditions Treated | ✅ Active | Mental health conditions |
| `approach.html` | Treatment Approach | ✅ Active | Methodology |
| `fees.html` | Pricing & Insurance | ✅ Active | |
| `gallery.html` | Photo Gallery | ✅ Active | Clinic photos |
| `testimonials.html` | Patient Reviews | ✅ Active | |
| `faq.html` | Frequently Asked Questions | ✅ Active | |
| `emergency.html` | Crisis Resources | ✅ Active | Emergency contacts |
| `consent.html` | Patient Consent Forms | ✅ Active | Legal documents |
| `privacy.html` | Privacy Policy | ✅ Active | GDPR/India compliance |
| `terms.html` | Terms of Service | ✅ Active | Legal terms |
| `disclaimer.html` | Medical Disclaimer | ✅ Active | Medical disclaimer |
| `resources.html` | Self-Help Resources | ✅ Active | Links to therapeutic tools |
| `mind-grace.html` | Mind Grace Program | ✅ Active | Signature program |
| `aasha.html` | AASHA Child Development | ✅ Active | Child development program |
| `thank-you.html` | Post-Submission Thank You | ✅ Active | Form confirmation |
| `404.html` | Error Page | ✅ Active | Custom 404 |

### Therapeutic Tools (Interactive Features)

| File | Purpose | Technology |
|------|---------|------------|
| `tools/guided-breathing.html` | Breathing Exercise | CSS + JS (`tools-breathing.js`) |
| `tools/butterfly-tapper.html` | EMDR Butterfly Tapping | CSS + JS (`tools-butterfly.js`) |
| `tools/eye-movement.html` | Eye Movement Therapy | CSS + JS (`tools-eye.js`) |
| `tools/hypnos-fractal.html` | Hypnotic Fractal Visualization | CSS + JS (`tools-fractal.js`) |
| `tools/horizon-scan.html` | Horizon Scanning Relaxation | CSS + JS (`tools-horizon.js`) |
| `tools/leaf-on-stream.html` | Mindfulness: Leaf on Stream | CSS + JS (`tools-leaf.js`) |

### Blog Pages

See **Blog Section** above for detailed inventory.

---

## Design System

### Color Palette

Defined in `css/base.css`:

```css
:root {
  /* Primary Colors */
  --primary: #671B50;        /* Deep Purple - Main brand */
  --accent: #F34674;         /* Wild Strawberry - Highlights, CTAs */
  --support: #EFBCBA;        /* Cotton Rose - Soft backgrounds */

  /* Neutrals */
  --white: #FFFFFF;
  --off-white: #FDFCF8;
  --soft-plum: #FFF0F5;
  --cream: #FAF5F0;
  --blush: #F9E8ED;

  /* Text Colors */
  --text-dark: #2D1B2E;
  --text-body: #4A3B4A;
  --text-muted: #6B4C5A;
  --text-light: #8B6B7A;
}
````

### Typography Scale

Fluid typography using `clamp()`:

```css
--fs-display: clamp(2.5rem, 6vw, 5rem);
--fs-h1: clamp(2rem, 5vw, 4rem);
--fs-h2: clamp(1.75rem, 4vw, 3rem);
--fs-h3: clamp(1.5rem, 3vw, 2.25rem);
--fs-h4: clamp(1.25rem, 2.5vw, 1.75rem);
--fs-body: clamp(0.95rem, 1.75vw, 1.125rem);
--fs-small: clamp(0.8rem, 1.4vw, 0.95rem);
--fs-tiny: clamp(0.7rem, 1.2vw, 0.85rem);
```

**Font Families:**

- Headings: `'Playfair Display', serif`
- Body: `'Inter', system-ui, sans-serif`

### Spacing Scale

Fluid spacing using `clamp()`:

```css
--space-xs: clamp(0.25rem, 0.5vw, 0.5rem);
--space-sm: clamp(0.5rem, 1vw, 0.75rem);
--space-md: clamp(0.75rem, 1.5vw, 1rem);
--space-lg: clamp(1rem, 2vw, 1.5rem);
--space-xl: clamp(1.5rem, 3vw, 2.5rem);
--space-2xl: clamp(2rem, 4vw, 4rem);
--space-3xl: clamp(3rem, 6vw, 6rem);
```

### Sizing Variables

Single source of truth for widths:

```css
--content-width: 1400px;
--measure: 65ch;
--narrow: min(95vw, 800px);
--content: min(95vw, var(--content-width));
--wide: min(95vw, 1600px);
```

### Shadows

```css
--shadow-xs: 0 2px 8px rgba(103, 27, 80, 0.06);
--shadow-sm: 0 4px 16px rgba(103, 27, 80, 0.08);
--shadow-md: 0 8px 30px rgba(103, 27, 80, 0.12);
--shadow-lg: 0 12px 48px rgba(103, 27, 80, 0.16);
--shadow-xl: 0 20px 64px rgba(103, 27, 80, 0.2);
--shadow-float: 0 24px 80px rgba(103, 27, 80, 0.15);
```

### Border Radius

```css
--radius-sm: clamp(4px, 0.8vw, 8px);
--radius-md: clamp(8px, 1.5vw, 16px);
--radius-lg: clamp(12px, 2vw, 24px);
--radius-xl: clamp(16px, 2.5vw, 32px);
--radius-pill: 9999px;
```

---

## CSS Architecture

### Module Responsibilities

#### `base.css`

- CSS custom properties (design tokens)
- CSS reset
- Base element styles
- Dark mode media query
- Accessibility fundamentals (`:focus-visible`, `.visually-hidden`)
- Reduced motion support
- Container setup

#### `layout.css`

- Site header (desktop + mobile navigation)
- Hero section (intrinsic grid)
- Main content grids
- Footer
- Button styles
- Card layouts

#### `components.css`

- Reusable UI components:
  - Badges
  - Icons (SVG sizing)
  - Card variants
  - Section backgrounds
  - Glass morphism effects
  - Dividers
  - Highlight text
  - Loading skeletons
  - Decorative blobs
- Container queries for component responsiveness

#### `utilities.css`

- Helper classes:
  - Text alignment
  - Font weights & sizes
  - Line heights
  - Colors
  - Backgrounds
  - Margin/padding utilities
  - Gap utilities
  - Display utilities
  - Flexbox utilities
  - Width utilities
  - Visibility
  - Overflow
  - Position
  - Z-index
  - Border radius
  - Shadows
  - Transitions
  - Aspect ratios
  - Object fit
  - Opacity
  - Screen reader only (`.sr-only`)

#### `animations.css`

- Keyframe definitions:
  - Fade variations
  - Scale variations
  - Float (gentle & standard)
  - Pulse (standard & soft)
  - Shimmer
  - Slide variations
  - Rotate
  - Bounce
  - Wiggle
- Animation utility classes
- Stagger delays
- Reveal on scroll (used with IntersectionObserver)
- Hover effects (lift, zoom)
- Parallax helpers
- Reduced motion overrides

### Tool-Specific CSS (`css-tools/`)

Each therapeutic tool has its own stylesheet to isolate complex animations and interactions:

- **tools-breathing.css**: Breathing circle animations, timing indicators
- **tools-butterfly.css**: Tapping zones, haptic feedback visuals, counters
- **tools-eye.css**: Moving target paths, speed controls
- **tools-fractal.css**: Fractal generation canvas, zoom animations
- **tools-horizon.css**: Gradient sky animations, sun/moon movement
- **tools-leaf.css**: Water ripple effects, leaf drag physics
- **tools-book.css**: Page flip animations, chapter navigation

---

## JavaScript Architecture

### Core Scripts (`js/main.js`)

Organized as IIFE modules:

1. **Mobile Navigation** (`initMobileNav`)
   - Toggle panel & overlay
   - Focus trap for accessibility
   - Escape key handling
   - Resize cleanup
   - Link click auto-close

2. **Header Scroll Effect** (`initHeaderScroll`)
   - Adds `.scrolled` class on scroll
   - Uses `requestAnimationFrame` for performance

3. **Viewport Resize Handler** (`initViewportResize`)
   - Updates `--vw` and `--vh` CSS variables
   - Listens to `resize` and `visualViewport.resize`
   - Handles browser zoom changes

4. **Scroll Reveal** (`initScrollReveal`)
   - IntersectionObserver for `.reveal` elements
   - Progressive enhancement (graceful degradation if unsupported)

### Blog Configuration Scripts

- **blog-config-adult.js**: Adult mental health post metadata, categories, tags
- **blog-config-child.js**: Child development post metadata, categories, tags
- **blog-discovery.js**: Dynamic blog post listing, filtering, search

### Tool Scripts

Each tool script follows a consistent pattern:

- Initialization function
- State management
- Event listeners
- Animation frame loops (where needed)
- Cleanup on page unload

---

## Asset Management

### Current State

- **Logos**: SVG + PNG variants in `/res/`
- **Photos**: JPG format, unoptimized
- **Brochures**: PNG format
- **Blog Images**: Mixed formats in `/blog/res/`

### Recommended Improvements

1. **Image Optimization**: Convert to WebP/AVIF with fallbacks
2. **Responsive Images**: Use `<picture>` with `srcset` for art direction
3. **Lazy Loading**: Add `loading="lazy"` to below-fold images
4. **Icon System**: Consolidate to a single SVG sprite or icon font
5. **Asset Directory**: Move all optimized assets to `/assets/` with subdirectories:
   - `/assets/images/`
   - `/assets/icons/`
   - `/assets/fonts/` (if self-hosting)

---

## SEO & Metadata

### Current Implementation

- **Title Tags**: Descriptive, includes clinic name and location
- **Meta Descriptions**: Present on homepage
- **OpenGraph**: Complete on homepage (title, description, image, type)
- **Twitter Cards**: Summary large image
- **Canonical URLs**: Set on homepage
- **Hreflang**: `en-IN` for India targeting
- **Robots**: Index, follow with snippet limits
- **Sitemap**: Partial (missing many pages)
- **Robots.txt**: Blocks thank-you page, references sitemap

### Missing/Incomplete

- **Structured Data**: No JSON-LD schema markup (Organization, Physician, LocalBusiness)
- **Sitemap**: Incomplete—needs all pages
- **Meta Descriptions**: Missing on most pages
- **Alt Text**: Inconsistent on images
- **Heading Hierarchy**: Needs audit on all pages

### Recommendations

1. Add JSON-LD schema to every page:
   - `Organization` on homepage
   - `Physician` on doctor page
   - `MedicalBusiness` on services
   - `Article` on blog posts
   - `FAQPage` on FAQ page
   - `BreadcrumbList` on all pages

2. Complete sitemap.xml with all 46 pages
3. Add unique meta descriptions to every page
4. Audit and fix heading hierarchy (H1 → H2 → H3)
5. Ensure all images have meaningful alt text

---

## Accessibility

### Implemented Features

✅ Skip link to main content  
✅ Semantic HTML5 landmarks (`header`, `nav`, `main`, `footer`)  
✅ ARIA labels on interactive elements  
✅ Focus visible outlines  
✅ Reduced motion media query support  
✅ Mobile navigation focus trap  
✅ Keyboard navigation (Escape to close)  
✅ Color contrast (mostly compliant)

### Areas for Improvement

⚠️ **Form Accessibility**: Labels, error messages, ARIA live regions  
⚠️ **Skip Links**: Only one exists; consider adding more  
⚠️ **Heading Hierarchy**: Needs audit  
⚠️ **Link Purposes**: Some links lack descriptive text  
⚠️ **Dynamic Content**: ARIA live regions for tool interactions  
⚠️ **Color Contrast**: Verify all text meets WCAG AA (4.5:1)

---

## Performance

### Current Strengths

- **No Framework Overhead**: Vanilla HTML/CSS/JS
- **Modular CSS**: Only load what's needed per page
- **Minimal JavaScript**: Interaction-only, no heavy libraries
- **System Fonts Fallback**: `system-ui` in font stack
- **CSS Containment**: `container-type` for component isolation

### Optimization Opportunities

1. **Image Optimization**: Convert to WebP/AVIF, compress
2. **Critical CSS**: Inline above-the-fold CSS, defer rest
3. **Preload Key Assets**: Fonts, logo, hero image
4. **DNS Prefetch**: Preconnect to Google Fonts, analytics
5. **Cache Headers**: Configure server-side caching
6. **Minification**: Minify CSS/JS for production
7. **Service Worker**: Implement for offline support (PWA)

---

## Technical Debt & Issues

### Resolved Issues ✅

1. **Floating UI Library Error** (July 2026):
   - **Problem**: `Cannot read properties of undefined (reading 'detectOverflow')` error at floating-ui.min.js:1:7345
   - **Cause**: Corrupted `floating-ui.min.js` file missing core functions (detectOverflow, computePosition, flip, shift)
   - **Solution**: Replaced with complete UMD build (22KB) containing both @floating-ui/core and @floating-ui/dom libraries
   - **Verification**: File now exports both `FloatingUIDOM` and `FloatingUICore` global namespaces
   - **Status**: ✅ Fixed - All 25 HTML files now load correctly without console errors

2. **Script Loading Order** (July 2026):
   - **Problem**: Race conditions with `ky` library not loaded when `http-client.js` executed, "Ky library not loaded, falling back to fetch" warnings
   - **Cause**: Incorrect use of `defer` attribute on module scripts causing async loading race conditions
   - **Solution**: Removed `defer` from all module scripts, ensured proper loading order in HTML head sections
   - **Status**: ✅ Fixed - Scripts load in correct sequence: ky.min.js → http-client.js → main.js

3. **Character Encoding** (July 2026):
   - **Problem**: Lighthouse warning "Properly defines charset" despite meta tag presence
   - **Cause**: Meta charset tag not positioned as first element in `<head>` or using non-standard format
   - **Solution**: Moved `<meta charset="UTF-8">` to first position in all 25 HTML files, standardized format
   - **Status**: ✅ Fixed - No more charset warnings in Lighthouse audits

4. **SEO Canonical URLs** (July 2026):
   - **Problem**: Relative canonical links (`process.html`) and hreflang values causing SEO issues, Lighthouse warnings
   - **Cause**: Using relative paths instead of absolute URLs for canonical and alternate links
   - **Solution**: Updated all canonical and hreflang tags to absolute GitHub Pages URLs (`https://shirish-psych-ncr.github.io/MIND_WEBSITE/[page].html`)
   - **Status**: ✅ Fixed - All pages use absolute URLs for search engine compliance

5. **Floating UI Namespace Detection** (July 2026):
   - **Problem**: `ui-popovers.js` failing to detect Floating UI library, repeated "Floating UI library not loaded yet, waiting..." console spam
   - **Cause**: Code only checked for `FloatingUI` namespace but vendor file uses `FloatingUIDOM`
   - **Solution**: Updated detection logic in initTooltips, initDropdowns, initMedicalPopovers to check both namespaces
   - **Status**: ✅ Fixed - No more console spam, popovers initialize correctly

### Remaining Issues ⚠️

5. **Sitemap Inconsistencies**:
   - Mixed relative and absolute URLs in sitemap.xml
   - **Action**: Standardize to absolute GitHub Pages URLs

6. **Robots.txt Domain Reference**:
   - References `mindgracencr.in` instead of `mindgracencr.in`
   - **Action**: Update domain reference

7. **Legacy Files Cleanup**:
   - Potential duplicate/legacy files may exist from previous iterations
   - **Action**: Audit and remove unnecessary files

8. **Sitemap Completeness**:
   - sitemap.xml contains 28 URLs but may need additional pages
   - **Action**: Verify all pages are included

9. **Legacy Files**:
   - `styles.css` (old monolithic stylesheet)
   - `styles-revamp.css` (previous iteration)
   - `js/main.js.bak` (backup file)
   - **Action**: Remove after verification

10. **Empty Assets Directory**:
    - `/assets/` exists but is empty
    - **Action**: Either populate with optimized assets or remove

11. **Inconsistent Naming**:
    - Mix of kebab-case (`guided-breathing.html`) and unclear names (`mind-grace.html`)
    - **Action**: Standardize naming convention

12. **Blog Page Ambiguity**:
    - `child.html` vs `children.html`
    - **Action**: Clarify purpose, consolidate or rename

13. **Hardcoded URLs in Sitemap/Robots**:
    - References `mindgracencr.in` as primary domain
    - **Action**: Update to correct domain

---

## Dependency Graph

### Page Dependencies

```
index.html
├── css/base.css
├── css/layout.css
├── css/components.css
├── css/utilities.css
├── css/animations.css
└── js/main.js

[All Core Pages]
├── css/base.css
├── css/layout.css
├── css/components.css
├── css/utilities.css
├── css/animations.css
└── js/main.js

[Therapeutic Tools]
├── css/base.css
├── css/layout.css
├── css/components.css
├── css/utilities.css
├── css/animations.css
├── css-tools/tools-[name].css
└── js/tools-[name].js

[Blog Pages]
├── css/base.css
├── css/layout.css
├── css/components.css
├── css/utilities.css
├── css/animations.css
├── js/main.js
└── js/blog-discovery.js (+ config files)
```

### CSS Import Order (Critical)

Every page must load CSS in this exact order:

1. `base.css` (variables, reset)
2. `layout.css` (structure)
3. `components.css` (UI elements)
4. `utilities.css` (helpers)
5. `animations.css` (motion)
6. `[tool-specific].css` (if applicable)

Changing this order will break the cascade.

---

## Future Roadmap

### Phase 1: Cleanup (Immediate)

- [ ] Remove duplicate homepage files
- [ ] Create missing `terms.html` and `disclaimer.html`
- [ ] Update `site.webmanifest` with correct branding
- [ ] Generate complete `sitemap.xml`
- [ ] Remove legacy files (`styles.css`, `styles-revamp.css`, `main.js.bak`)
- [ ] Fix domain references in SEO files

### Phase 2: Optimization (Short-term)

- [ ] Optimize all images (WebP/AVIF conversion)
- [ ] Implement responsive images with `srcset`
- [ ] Add lazy loading to below-fold images
- [ ] Minify CSS/JS for production
- [ ] Add critical CSS inlining
- [ ] Configure cache headers

### Phase 3: Enhancement (Medium-term)

- [ ] Add JSON-LD structured data to all pages
- [ ] Complete meta descriptions for all pages
- [ ] Audit and fix heading hierarchy
- [ ] Improve form accessibility
- [ ] Add ARIA live regions to dynamic tools
- [ ] Implement service worker for offline support

### Phase 4: Expansion (Long-term)

- [ ] Build admin CMS for blog (static site generator?)
- [ ] Add multilingual support (Hindi + English)
- [ ] Implement online booking integration
- [ ] Add patient portal (secure, HIPAA-compliant)
- [ ] Create video library for psychoeducation
- [ ] Develop newsletter subscription system

---

## Contribution Guidelines

### For Human Developers

1. **File Organization**: Place new pages in root unless part of blog/tools
2. **CSS Changes**: Add to appropriate module, never inline unless critical
3. **JavaScript**: Use IIFE pattern, avoid global scope pollution
4. **Naming**: Use kebab-case for files/classes, camelCase for JS variables
5. **Testing**: Test on mobile, tablet, desktop, and with keyboard navigation
6. **Documentation**: Update this file when adding major features

### For AI Systems

1. **Context**: Read this file before making any changes
2. **Dependencies**: Check dependency graph before modifying shared files
3. **Design Tokens**: Always use CSS variables, never hardcoded values
4. **Responsiveness**: Use intrinsic design patterns (grid, flex, clamp)
5. **Accessibility**: Maintain or improve WCAG compliance
6. **Performance**: Avoid adding heavy dependencies
7. **Documentation**: Update relevant sections after changes

---

## Glossary

| Term                        | Definition                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------- |
| **Intrinsic Design**        | Layout approach where components adapt to their content and container, not viewport breakpoints   |
| **Fluid Typography**        | Font sizes that scale smoothly using `clamp()` rather than discrete steps                         |
| **Container Queries**       | CSS feature allowing components to respond to their container's size, not just viewport           |
| **Design Tokens**           | Named entities storing visual design attributes (colors, spacing, etc.) as single source of truth |
| **Progressive Enhancement** | Building core functionality first, then layering advanced features for capable browsers           |
| **IIFE**                    | Immediately Invoked Function Expression—JavaScript pattern to avoid global scope pollution        |

---

## Contact & Maintenance

**Primary Maintainer**: Repository Owner  
**Last Updated**: 2025  
**Technology Stack**: HTML5, CSS3 (Modern), Vanilla JavaScript (ES6+)  
**Deployment**: GitHub Pages  
**Domain**: mindgracencr.in (primary)

For questions or contributions, refer to the repository owner or consult the AGENT_BIBLE documentation for AI-assisted maintenance.
