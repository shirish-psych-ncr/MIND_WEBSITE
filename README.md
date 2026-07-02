# Mind Grace Neuropsychiatric Clinic — Official Website Repository

[![Live Site](https://img.shields.io/badge/live-site-671B50?style=flat-square)](https://shirish-psych-ncr.github.io/MIND_WEBSITE/)
[![Technology](https://img.shields.io/badge/HTML5-CSS3-Vanilla%20JS-success?style=flat-square)]()
[![Architecture](https://img.shields.io/badge/architecture-modular--CSS-blue?style=flat-square)]()
[![Accessibility](https://img.shields.io/badge/accessibility-WCAG%202.1-AA-orange?style=flat-square)]()

## Overview

This repository contains the complete web presence for **Mind Grace Neuropsychiatric Clinic**, a mental health practice in Greater Noida, India, led by Dr. Anita Sharma. The website is built with modern, framework-free technologies emphasizing:

- ✨ **Intrinsic Responsiveness** — Adapts to any screen without breakpoints
- 🎨 **Fluid Design System** — Typography and spacing scale smoothly
- ♿ **Accessibility First** — WCAG 2.1 AA compliant
- 🚀 **Performance Optimized** — Vanilla HTML/CSS/JS, no frameworks
- 📱 **Mobile First** — Works on all devices and viewport sizes
- 🌙 **Dark Mode Support** — Respects user preferences

---

## Quick Links

- **🌐 Live Site:** [https://shirish-psych-ncr.github.io/MIND_WEBSITE/](https://shirish-psych-ncr.github.io/MIND_WEBSITE/)
- **📐 Architecture Documentation:** [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- **🎨 CSS Documentation:** [`css/README.md`](./css/README.md)
- **⚙️ JavaScript Documentation:** [`js/README.md`](./js/README.md)
- **🤖 AI Agent Guide:** [`AGENT_BIBLE/`](./AGENT_BIBLE/)

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Markup** | HTML5 (Semantic) |
| **Styling** | CSS3 (Modern, Modular) |
| **Interactivity** | Vanilla JavaScript (ES6+) |
| **Fonts** | Inter + Playfair Display (Google Fonts) |
| **Icons** | Inline SVG |
| **Deployment** | GitHub Pages |
| **Domain** | mindgracencr.in |

**No frameworks. No build tools. No dependencies.** Pure web standards.

---

## Repository Structure

```
/
├── ARCHITECTURE.md           # Complete system documentation
├── css/                      # Core stylesheets (5 modular files)
│   ├── base.css              # Design tokens, reset, dark mode
│   ├── layout.css            # Header, hero, footer, structure
│   ├── components.css        # Reusable UI components
│   ├── utilities.css         # Helper classes
│   └── animations.css        # Motion & effects
├── css-tools/                # Therapeutic tool stylesheets
├── js/                       # JavaScript modules
│   ├── main.js               # Core interactions
│   ├── blog-*.js             # Blog system
│   └── tools-*.js            # Therapeutic tools logic
├── res/                      # Images, logos, brochures
├── blog/                     # Blog section
├── [40+ HTML Pages]          # Core pages + therapeutic tools
├── site.webmanifest          # PWA manifest
├── robots.txt                # Search engine rules
└── sitemap.xml               # SEO sitemap
```

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for complete details.

---

## Key Features

### 🏠 Core Pages
- Homepage with intrinsic grid layout
- Services overview (Psychiatry, Counseling, Child Development)
- Doctor profile (Dr. Anita Sharma)
- Clinic location with interactive map
- Booking system
- Gallery, testimonials, FAQ
- Emergency resources
- Legal pages (Privacy, Consent, Terms)

### 🧘 Therapeutic Tools
Interactive self-help resources:
- **Guided Breathing** — paced breathing exercise
- **Butterfly Tapper** — EMDR bilateral stimulation
- **Eye Movement** — EMDR eye tracking
- **Hypnotic Fractal** — relaxation visualization
- **Horizon Scan** — grounding exercise
- **Leaf on Stream** — mindfulness metaphor
- **Resource Book** — psychoeducational content

### 📝 Blog System
Dynamic blog with categories:
- Adult Mental Health
- Child Development
- Auto-discovery of posts
- Category/tag filtering

---

## Design System

### Colors
```css
--primary:  #671B50   /* Deep Purple */
--accent:   #F34674   /* Wild Strawberry */
--support:  #EFBCBA   /* Cotton Rose */
```

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)
- **Scale:** Fluid `clamp()` functions from `0.7rem` to `5rem`

### Responsive Philosophy
- ✅ Grid `auto-fit` with `minmax()`
- ✅ Fluid `clamp()` for typography & spacing
- ✅ Container queries for component responsiveness
- ✅ Modern viewport units (`dvh`, `dvw`)
- ❌ No fixed breakpoints

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

✅ Semantic HTML5 landmarks  
✅ ARIA labels and roles  
✅ Keyboard navigation support  
✅ Focus visible indicators  
✅ Skip links  
✅ Reduced motion support  
✅ Color contrast compliance  
✅ Screen reader compatible  

**Testing tools used:**
- WAVE (Web Accessibility Evaluation Tool)
- axe DevTools
- Lighthouse Accessibility Audit
- Manual keyboard testing

---

## Performance

**Lighthouse Scores (Target: 90+)**

| Metric | Score |
|--------|-------|
| Performance | 95+ |
| Accessibility | 98+ |
| Best Practices | 95+ |
| SEO | 95+ |

**Optimization strategies:**
- No framework overhead
- Modular CSS (load only what's needed)
- Minimal JavaScript
- System font fallbacks
- Lazy loading for images
- Optimized asset delivery

---

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Last 2 | ✅ Full |
| Firefox | Last 2 | ✅ Full |
| Safari | Last 2 | ✅ Full |
| Edge | Last 2 | ✅ Full |
| Samsung Internet | Last 2 | ✅ Full |

**Graceful degradation:** Older browsers receive functional (if less polished) experience.

**Features requiring modern browsers:**
- Container Queries (fallback: standard layout)
- `clamp()` function (fallback: fixed size)
- `dvh`/`dvw` units (fallback: `vh`/`vw`)
- IntersectionObserver (fallback: show all content)

---

## Technical Debt & Roadmap

### Current Issues
See [`ARCHITECTURE.md`](./ARCHITECTURE.md) → _Technical Debt & Issues_ for complete list.

### Priority Tasks
1. ⚠️ Remove duplicate homepage files (`index-old.html`, `index-revamp.html`)
2. ⚠️ Create missing `terms.html` and `disclaimer.html`
3. ⚠️ Update `site.webmanifest` with correct branding
4. ⚠️ Generate complete `sitemap.xml`
5. ⚠️ Optimize images (WebP/AVIF conversion)

### Future Enhancements
- JSON-LD structured data for SEO
- Service Worker for offline support
- Multilingual support (Hindi + English)
- Online booking integration
- Patient portal (HIPAA-compliant)
- Video library for psychoeducation

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) → _Future Roadmap_ for detailed plans.

---

## Documentation

| Document | Purpose |
|----------|---------|
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Complete system architecture, dependency graphs, design system, roadmap |
| [`css/README.md`](./css/README.md) | CSS module responsibilities, load order, design tokens |
| [`js/README.md`](./js/README.md) | JavaScript modules, coding conventions, accessibility |
| [`AGENT_BIBLE/`](./AGENT_BIBLE/) | AI agent operating instructions and context |
| [`inspo/`](./inspo/) | Design inspiration and anti-patterns |

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

Built with ❤️ for mental health awareness and accessibility.
