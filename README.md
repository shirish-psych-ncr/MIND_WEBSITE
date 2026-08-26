# Mind Grace Neuropsychiatric Clinic — Official Website Repository

[![Live Site](https://img.shields.io/badge/live-site-671B50?style=flat-square)](https://mindgracencr.in/)
[![Technology](https://img.shields.io/badge/HTML5-CSS3-Vanilla%20JS-success?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Architecture](https://img.shields.io/badge/architecture-modular--CSS-blue?style=flat-square)](./AGENT_BIBLE/ARCHITECTURE.md)
[![Accessibility](https://img.shields.io/badge/accessibility-WCAG%202.1-AA-orange?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref/)

## Overview

This repository contains the complete web presence for **Mind Grace Neuropsychiatric Clinic**, a mental health practice in Greater Noida, India, led by Dr. Anita Sharma. The website is built with modern, framework-free technologies emphasizing:

- [HIGHLIGHT] **Intrinsic Responsiveness** — Adapts to any screen without breakpoints
- [DESIGN] **Fluid Design System** — Typography and spacing scale smoothly
- [ACCESSIBILITY] **Accessibility First** — WCAG 2.1 AA compliant
- [LAUNCH] **Performance Optimized** — Vanilla HTML/CSS/JS, no frameworks
- [MOBILE] **Mobile First** — Works on all devices and viewport sizes
- [DARK MODE] **Dark Mode Support** — Respects user preferences

---

## Quick Links

- **[WEB] Live Site:** [https://shirish-psych-ncr.github.io/MIND_WEBSITE/](https://shirish-psych-ncr.github.io/MIND_WEBSITE/)
- **[LAYOUT] Architecture Documentation:** [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- **[DESIGN] CSS Documentation:** [`assets/css/README.md`](./assets/css/README.md)
- **[SETTINGS] JavaScript Documentation:** [`assets/js/README.md`](./assets/js/README.md)
- **AI Agent Guide:** [`AGENT_BIBLE/`](./AGENT_BIBLE/)

---

## Technology Stack

| Layer             | Technology                              |
| ----------------- | --------------------------------------- |
| **Markup**        | HTML5 (Semantic)                        |
| **Styling**       | CSS3 (Modern, Modular)                  |
| **Interactivity** | Vanilla JavaScript (ES6+)               |
| **Fonts**         | Inter + Playfair Display (Google Fonts) |
| **Icons**         | Inline SVG (Lucide)                     |
| **Deployment**    | GitHub Pages                            |
| **Domain**        | mindgracencr.in                         |

**No frameworks. No build tools. No dependencies.** Pure web standards.

---

## Repository Structure

```
/
├── *.html (23 root pages)
├── blog/ (3 pages)
├── tools/ (6 therapeutic tools)
├── assets/
│   ├── css/ (12 stylesheets)
│   ├── js/ (20 custom modules)
│   ├── vendor/ (47 vendor libraries)
│   └── images/ (28 WebP files)
├── sitemap.xml
├── robots.txt
├── DEPLOYMENT_CHECKLIST.md    # Deployment procedures
├── MAINTENANCE_GUIDE.md       # Ongoing maintenance instructions
└── Documentation (README.md, ARCHITECTURE.md, etc.)
```

│   ├── Bible_Generator.md    # Documentation generation guide
│   ├── ARCHITECTURE.md       # Agent architecture overview
│   ├── assets.md             # Asset management guidelines
│   ├── components.md         # Component documentation
│   ├── design.md             # Design system documentation
│   ├── memory.md             # Context memory structure
│   ├── opengraph.md          # OpenGraph metadata
│   ├── pages.md              # Page inventory & relationships
│   ├── schemas.md            # Data schemas
│   ├── tools.md              # Tool specifications
│   ├── worker.md             # Worker process documentation
│   ├── _multiphasic_plan.md  # Development planning
│   └── css/README.md         # CSS documentation for agents
│
├── [ROOT PAGES]              # Individual HTML Pages (25 total)
│
├── site.webmanifest          # PWA manifest
├── robots.txt                # Search engine crawling rules
├── sitemap.xml               # SEO sitemap
├── package.json              # Node.js dependencies (dev tools)
├── eslint.config.mjs         # ESLint configuration
├── netlify.toml              # Netlify deployment config
└── .gitignore                # Git ignore rules
```

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for complete details.

---

## Key Features

### Core Pages

- Homepage with intrinsic grid layout
- Services overview (Psychiatry, Counseling, Child Development)
- Doctor profile (Dr. Anita Sharma)
- Clinic location with interactive map
- Booking system
- Gallery, testimonials, FAQ
- Emergency resources
- Legal pages (Privacy, Consent, Terms)

### Therapeutic Tools

Interactive self-help resources:

- **Guided Breathing** — paced breathing exercise
- **Butterfly Tapper** — EMDR bilateral stimulation
- **Eye Movement** — EMDR eye tracking
- **Hypnotic Fractal** — relaxation visualization
- **Horizon Scan** — grounding exercise
- **Leaf on Stream** — mindfulness metaphor
- **Resource Book** — psychoeducational content

### Blog System

Dynamic blog with categories:

- Adult Mental Health
- Child Development
- Auto-discovery of posts
- Category/tag filtering

---

## Design System

### Colors

```css
--primary: #671b50 /* Deep Purple */ --accent: #f34674 /* Wild Strawberry */
  --support: #efbcba /* Cotton Rose */;
```

### Typography

- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)
- **Scale:** Fluid `clamp()` functions from `0.7rem` to `5rem`

### Responsive Philosophy

- [OK] Grid `auto-fit` with `minmax()`
- [OK] Fluid `clamp()` for typography & spacing
- [OK] Container queries for component responsiveness
- [OK] Modern viewport units (`dvh`, `dvw`)
- [ERROR] No fixed breakpoints

---

## Getting Started

### Prerequisites

- Any text editor (VS Code recommended)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic HTML/CSS/JavaScript knowledge

### Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shirish-psych-ncr/MIND_WEBSITE.git
   cd MIND_WEBSITE
   ```

2. **Open in browser:**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Python
     python -m http.server 8000

     # Alternative: Use any static file server
     ```

3. **Make changes:**
   - Edit HTML/CSS/JS files
   - Refresh browser to see changes

### Deployment

The site deploys automatically to GitHub Pages on push to `main` branch:

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

Live site updates within minutes at:
[https://shirish-psych-ncr.github.io/MIND_WEBSITE/](https://shirish-psych-ncr.github.io/MIND_WEBSITE/)

---

## Contributing

### For Human Developers

1. Read [`ARCHITECTURE.md`](./ARCHITECTURE.md) first
2. Follow existing patterns and conventions
3. Use design tokens (CSS variables), never hardcoded values
4. Test on mobile, tablet, and desktop
5. Verify keyboard accessibility
6. Update documentation if adding major features

### For AI Systems

1. Read [`ARCHITECTURE.md`](./ARCHITECTURE.md) and relevant README files
2. Check dependency graph before modifying shared files
3. Maintain or improve accessibility compliance
4. Use intrinsic design patterns (no breakpoints)
5. Document all changes in this README or ARCHITECTURE.md

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) → _Contribution Guidelines_ for details.

---

## Accessibility

This website strives for **WCAG 2.1 Level AA** compliance:

[OK] Semantic HTML5 landmarks
[OK] ARIA labels and roles
[OK] Keyboard navigation support
[OK] Focus visible indicators
[OK] Skip links
[OK] Reduced motion support
[OK] Color contrast compliance
[OK] Screen reader compatible

**Testing tools used:**

- WAVE (Web Accessibility Evaluation Tool)
- axe DevTools
- Lighthouse Accessibility Audit
- Manual keyboard testing

---

## Performance

**Lighthouse Scores (Target: 90+)**

| Metric         | Score | Status         |
| -------------- | ----- | -------------- |
| Performance    | 95+   | [OK] Optimized   |
| Accessibility  | 98+   | [OK] WCAG 2.1 AA |
| Best Practices | 95+   | [OK] No Errors   |
| SEO            | 95+   | [OK] Complete    |

**Recent Fixes (July 2026):**

- [OK] Fixed `floating-ui.min.js` - Replaced corrupted library with complete UMD build (22KB) containing both Core and DOM libraries
- [OK] Resolved `detectOverflow` undefined error across all 25 HTML files
- [OK] Standardized script loading order (ky → http-client → main)
- [OK] Removed `defer` attributes from module scripts (modules load async by default)
- [OK] Added `<meta charset="UTF-8">` as first head element in all 25 HTML files
- [OK] Updated canonical URLs to absolute paths (`https://shirish-psych-ncr.github.io/MIND_WEBSITE/[page].html`) for SEO compliance
- [OK] Fixed Floating UI namespace detection in `ui-popovers.js` (checks for both `FloatingUI` and `FloatingUIDOM`)
- [OK] Resolved "Ky library not loaded" race conditions by ensuring proper script execution order
- [OK] Fixed charset definition warnings in Lighthouse audits
- [OK] Corrected hreflang and canonical link formats for search engine optimization

**Optimization strategies:**

- No framework overhead
- Modular CSS (load only what's needed)
- Minimal JavaScript with proper module loading
- System font fallbacks
- Lazy loading for images
- Optimized asset delivery
- Local vendor copies to avoid CDN latency

---

## Browser Support

| Browser          | Version | Support |
| ---------------- | ------- | ------- |
| Chrome           | Last 2  | [OK] Full |
| Firefox          | Last 2  | [OK] Full |
| Safari           | Last 2  | [OK] Full |
| Edge             | Last 2  | [OK] Full |
| Samsung Internet | Last 2  | [OK] Full |

**Graceful degradation:** Older browsers receive functional (if less polished) experience.

**Features requiring modern browsers:**

- Container Queries (fallback: standard layout)
- `clamp()` function (fallback: fixed size)
- `dvh`/`dvw` units (fallback: `vh`/`vw`)
- IntersectionObserver (fallback: show all content)

---

## Technical Debt & Roadmap

### Current status

The local site audit on 2026-08-26 covers 43 public routes. The shared shell, breadcrumbs, theme tokens, Lucide icons, image fallbacks, gallery data, and six therapeutic tools are wired and browser-tested. Utility routes `404.html` and `thank-you.html` are intentionally `noindex`.

### Remaining work

1. [OK] Legacy duplicate homepage files are absent.
2. [OK] `terms.html`, `disclaimer.html`, `site.webmanifest`, `robots.txt`, and the 41-URL indexable sitemap are present and branded.
3. [OK] Local image sources, alt text, canonical tags, descriptions, and JSON-LD passed the source audit.
4. [OK] Light/dark contrast and public-route shell checks passed in the browser.
5. [PLANNED] Deployment-only headers, Lighthouse measurements, and production cache policy still need to be verified on the hosting platform.

### Future Enhancements

- More editorially specific featured images for individual blog articles
- JSON-LD structured data for new pages as they are added
- Service Worker for offline support
- Multilingual support (Hindi + English)
- Online booking integration
- Patient portal (HIPAA-compliant)
- Video library for psychoeducation

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) → _Future Roadmap_ for detailed plans.

---

## Documentation

| Document                               | Purpose                                                                 |
| -------------------------------------- | ----------------------------------------------------------------------- |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Complete system architecture, dependency graphs, design system, roadmap |
| [`assets/css/README.md`](./assets/css/README.md)     | CSS module responsibilities, load order, design tokens                  |
| [`assets/js/README.md`](./assets/js/README.md)       | JavaScript modules, coding conventions, accessibility                   |
| [`AGENT_BIBLE/`](./AGENT_BIBLE/)       | AI agent operating instructions and context                             |
| [`inspo/`](./inspo/)                   | Design inspiration and anti-patterns                                    |

---

## Contact & Maintenance

**Primary Maintainer:** Repository Owner
**Clinic:** Mind Grace Neuropsychiatric Clinic, Greater Noida, India
**Lead Psychiatrist:** Dr. Anita Sharma

**Technology Stack:** HTML5, CSS3 (Modern), Vanilla JavaScript (ES6+)
**Deployment:** GitHub Pages
**Primary Domain:** mindgracencr.in
**GitHub Pages:** shirish-psych-ncr.github.io/MIND_WEBSITE

For questions, contributions, or maintenance, refer to:

1. This README
2. [`ARCHITECTURE.md`](./ARCHITECTURE.md)
3. [`AGENT_BIBLE/Instructions.md`](./AGENT_BIBLE/Instructions.md)

---

## License

© 2025 Mind Grace Neuropsychiatric Clinic. All rights reserved.

This repository contains proprietary content belonging to Mind Grace Neuropsychiatric Clinic. Unauthorized reproduction, distribution, or use is prohibited.

---

## Acknowledgments

- **Design Inspiration:** Modern fluid design principles
- **Typography:** Google Fonts (Inter, Playfair Display)
- **Icons:** Hand-crafted SVG icons
- **Architecture:** Component-driven, intrinsically responsive design

Built with care for mental health awareness and accessibility.
