# Mind Grace Clinic — Repository Architecture Documentation

## Executive Summary

This repository contains the complete web presence for **Mind Grace Clinic**, a mental health practice in Greater Noida led by Dr. Anita Sharma. The project has been architected as a **modern, fluid, intrinsically responsive website** using vanilla HTML, CSS, and JavaScript—without frameworks.

### Core Design Philosophy

1. **Intrinsic Responsiveness**: Layouts adapt to available space using CSS Grid, Flexbox, `clamp()`, `min()`, `max()`, `auto-fit`, and Container Queries—not device-specific breakpoints.
2. **Fluid Typography & Spacing**: All font sizes, spacing, and dimensions use `clamp()` for smooth scaling across all viewport sizes.
3. **Modular CSS Architecture**: Styles are separated into logical modules (base, layout, components, utilities, animations).
4. **Progressive Enhancement**: JavaScript is used only for interactions; the site works without it.
5. **Accessibility First**: Semantic HTML, ARIA attributes, focus states, skip links, and reduced motion support.
6. **Design System**: Centralized design tokens for colors, typography, spacing, shadows, and radii.

---

## Repository Structure

```
/workspace
├── ARCHITECTURE.md                 # This file
├── README.md                       # Project overview & deployment URL
├── index.html                      # Homepage (primary entry point)
│
├── css/                            # Core Stylesheets (Modular Architecture)
│   ├── base.css                    # Variables, reset, base styles, dark mode
│   ├── layout.css                  # Header, hero, footer, page structure
│   ├── components.css              # Reusable UI components (cards, badges, buttons)
│   ├── utilities.css               # Helper classes (spacing, typography, visibility)
│   └── animations.css              # Keyframes, animation utilities, reveal effects
│
├── css-tools/                      # Tool-Specific Styles (Therapeutic Features)
│   ├── tools-book.css              # Resource book styles
│   ├── tools-breathing.css         # Guided breathing exercise
│   ├── tools-butterfly.css         # Butterfly tapper EMDR tool
│   ├── tools-eye.css               # Eye movement therapy
│   ├── tools-fractal.css           # Hypnotic fractal visualization
│   ├── tools-horizon.css           # Horizon scanning relaxation
│   └── tools-leaf.css              # Leaf on stream mindfulness
│
├── js/                             # JavaScript Modules
│   ├── main.js                     # Core interactions (nav, scroll, reveal)
│   ├── blog-config-adult.js        # Blog configuration for adult mental health
│   ├── blog-config-child.js        # Blog configuration for child development
│   ├── tools-book.js               # Resource book functionality
│   ├── tools-breathing.js          # Breathing exercise logic
│   ├── tools-butterfly.js          # Butterfly tapper logic
│   ├── tools-eye.js                # Eye movement tool logic
│   ├── tools-fractal.js            # Fractal animation control
│   ├── tools-horizon.js            # Horizon scan interaction
│   ├── tools-leaf.js               # Leaf on stream interaction
│   └── tools-map.js                # Location map integration
│
├── res/                            # Static Resources (Images, Logos, Brochures)
│   ├── Mind_Grace_Clinic_Logo.svg              # Primary logo (full color)
│   ├── Mind_Grace_Clinic_Logo_Black.svg        # Black variant
│   ├── Mind_Grace_Clinic_Logo_Pink.svg         # Pink variant
│   ├── Mind_Grace_Clinic_Logo_White.svg        # White variant
│   ├── Mind_Grace_Clinic_Logo_Full.png         # Full logo raster
│   ├── Mind_Grace_Clinic_Logo.png              # Logo icon raster
│   ├── Dr_Anita_Sharma_Personal_Photo.jpg      # Doctor portrait
│   ├── mind-grace-entry-n-reception.jpg        # Clinic entrance
│   ├── mind-grace-consultation-room.jpg        # Consultation room
│   ├── mind-grace-therapy-room.jpg             # Therapy room
│   ├── mind-grace-small-room.jpg               # Small therapy room
│   ├── Mind_Grace_Clinic_waiting_area.jpg      # Waiting area 1
│   ├── Mind_Grace_Clinic_waiting_area_2.jpg    # Waiting area 2
│   ├── Location_street_view_near.jpg           # Street view (near)
│   ├── Location_street_view_distance.jpg       # Street view (far)
│   ├── AASHA_Child_Development_Brochure.png    # AASHA program brochure
│   ├── Mind_Grace_Clinic_Brochure.png          # Clinic brochure
│   ├── aasha-*.jpg                             # AASHA therapy session photos
│   └── aasha-speech-*.jpg                      # Speech therapy materials
│
├── blog/                           # Blog Section
│   ├── index.html                  # Blog homepage
│   ├── adult.html                  # Adult mental health category
│   ├── child.html                  # Child development category
│   ├── children.html               # Alternative child page (legacy?)
│   ├── adult-mental-health-template.html   # Template for adult posts
│   ├── child-development-template.html     # Template for child posts
│   ├── blog-discovery.js           # Blog post discovery & rendering
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
│   └── res/                        # Blog-specific images
│       ├── Aasha_Early_Intervention_Phases.png
│       ├── Aasha_Early_Intervention_Phases_Butterfly.png
│       ├── Early_Intervention_Steps.png
│       └── Gender_Dysphoria.jpg
│
├── assets/                         # Future Asset Directory (currently empty)
│                                   # Reserved for optimized images, icons, fonts
│
├── inspo/                          # Inspiration & Design References
│   ├── Anti-inspo UI UXI Anti Pattern.md   # Anti-patterns to avoid
│   └── BIBLE BRAND IDENTITY.txt            # Brand identity guidelines
│
├── AGENT_BIBLE/                    # AI Agent Documentation
│   ├── Instructions.md             # Agent operating instructions
│   ├── Bible_Generator.md          # Documentation generation guide
│   ├── assets.md                   # Asset management guidelines
│   ├── design.md                   # Design system documentation
│   ├── memory.md                   # Context memory structure
│   ├── pages.md                    # Page inventory & relationships
│   ├── tools.md                    # Tool specifications
│   └── worker.md                   # Worker process documentation
│
├── Screenshots/                    # Visual Documentation
│   └── Website_001.png             # Homepage screenshot
│
├── [ROOT PAGES]                    # Individual HTML Pages (see Page Inventory below)
│
├── site.webmanifest                # PWA manifest (outdated—needs update)
├── robots.txt                      # Search engine crawling rules
├── sitemap.xml                     # SEO sitemap (partial—needs completion)
└── .gitignore                      # Git ignore rules
```

---

## Page Inventory

### Core Pages (Root Level)

| File | Purpose | Status | Notes |
|------|---------|--------|-------|
| `index.html` | Homepage | ✅ Active | Primary entry point, modern fluid design |
| `index-revamp.html` | Homepage (experimental) | ⚠️ Duplicate | Merge or remove |
| `index-old.html` | Homepage (legacy) | ❌ Deprecated | Remove after verification |
| `about.html` | About Dr. Sharma & Clinic | ✅ Active | |
| `services.html` | Services Overview | ✅ Active | Psychiatry, counseling, child development |
| `process.html` | What to Expect | ✅ Active | Patient journey |
| `location.html` | Clinic Location & Map | ✅ Active | Uses `tools-map.js` |
| `contact.html` | Contact Form & Info | ✅ Active | |
| `book.html` | Booking System | ✅ Active | Appointment scheduling |
| `doctor.html` | Doctor Profile | ✅ Active | Dr. Anita Sharma bio |
| `conditions.html` | Conditions Treated | ✅ Active | Mental health conditions |
| `approach.html` | Treatment Approach | ✅ Active | Methodology |
| `fees.html` | Pricing & Insurance | ✅ Active | |
| `gallery.html` | Photo Gallery | ✅ Active | Clinic photos |
| `testimonials.html` | Patient Reviews | ✅ Active | |
| `faq.html` | Frequently Asked Questions | ✅ Active | |
| `emergency.html` | Crisis Resources | ✅ Active | Emergency contacts |
| `consent.html` | Patient Consent Forms | ✅ Active | Legal documents |
| `privacy.html` | Privacy Policy | ✅ Active | GDPR/India compliance |
| `terms.html` | Terms of Service | ⚠️ Missing | Referenced but not found |
| `disclaimer.html` | Medical Disclaimer | ⚠️ Missing | Referenced but not found |
| `resources.html` | Self-Help Resources | ✅ Active | Links to therapeutic tools |
| `mind-grace.html` | Mind Grace Program | ✅ Active | Signature program |
| `aasha.html` | AASHA Child Development | ✅ Active | Child development program |
| `thank-you.html` | Post-Submission Thank You | ✅ Active | Form confirmation |
| `404.html` | Error Page | ✅ Active | Custom 404 |
| `template-clean.html` | Blank Template | 🛠 Utility | For creating new pages |

### Therapeutic Tools (Interactive Features)

| File | Purpose | Technology |
|------|---------|------------|
| `guided-breathing.html` | Breathing Exercise | CSS + JS (`tools-breathing.js`) |
| `butterfly-tapper.html` | EMDR Butterfly Tapping | CSS + JS (`tools-butterfly.js`) |
| `eye-movement.html` | Eye Movement Therapy | CSS + JS (`tools-eye.js`) |
| `hypnos-fractal.html` | Hypnotic Fractal Visualization | CSS + JS (`tools-fractal.js`) |
| `horizon-scan.html` | Horizon Scanning Relaxation | CSS + JS (`tools-horizon.js`) |
| `leaf-on-stream.html` | Mindfulness: Leaf on Stream | CSS + JS (`tools-leaf.js`) |
| `book.html` | Interactive Resource Book | CSS + JS (`tools-book.js`) |

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
```

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

### Identified Problems

1. **Duplicate Homepage Files**:
   - `index.html` (active)
   - `index-revamp.html` (experimental)
   - `index-old.html` (legacy)
   - **Action**: Consolidate to single `index.html`, archive others

2. **Missing Referenced Pages**:
   - `terms.html` (linked in footer)
   - `disclaimer.html` (linked in footer)
   - **Action**: Create these pages or remove links

3. **Outdated PWA Manifest**:
   - `site.webmanifest` uses wrong theme color (`#0f766e` instead of `#671B50`)
   - Wrong app name ("TheraTools" instead of "Mind Grace Clinic")
   - **Action**: Update manifest to match brand

4. **Incomplete Sitemap**:
   - Missing 30+ pages
   - **Action**: Generate complete sitemap

5. **Legacy Files**:
   - `styles.css` (old monolithic stylesheet)
   - `styles-revamp.css` (previous iteration)
   - `js/main.js.bak` (backup file)
   - **Action**: Remove after verification

6. **Empty Assets Directory**:
   - `/assets/` exists but is empty
   - **Action**: Either populate with optimized assets or remove

7. **Inconsistent Naming**:
   - Mix of kebab-case (`guided-breathing.html`) and unclear names (`mind-grace.html`)
   - **Action**: Standardize naming convention

8. **Blog Page Ambiguity**:
   - `child.html` vs `children.html`
   - **Action**: Clarify purpose, consolidate or rename

9. **Hardcoded URLs in Sitemap/Robots**:
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

| Term | Definition |
|------|------------|
| **Intrinsic Design** | Layout approach where components adapt to their content and container, not viewport breakpoints |
| **Fluid Typography** | Font sizes that scale smoothly using `clamp()` rather than discrete steps |
| **Container Queries** | CSS feature allowing components to respond to their container's size, not just viewport |
| **Design Tokens** | Named entities storing visual design attributes (colors, spacing, etc.) as single source of truth |
| **Progressive Enhancement** | Building core functionality first, then layering advanced features for capable browsers |
| **IIFE** | Immediately Invoked Function Expression—JavaScript pattern to avoid global scope pollution |

---

## Contact & Maintenance

**Primary Maintainer**: Repository Owner  
**Last Updated**: 2025  
**Technology Stack**: HTML5, CSS3 (Modern), Vanilla JavaScript (ES6+)  
**Deployment**: GitHub Pages  
**Domain**: mindgracencr.in (primary)  

For questions or contributions, refer to the repository owner or consult the AGENT_BIBLE documentation for AI-assisted maintenance.
