# Components Specification v1.0
## Mind Grace Neuropsychiatric Clinic - UI Component Library

**Source of Truth:** `index.html`, `about.html`, `doctor.html`, `location.html`  
**Last Updated:** 2025-07-02  
**Status:** Production Ready

---

## Table of Contents

1. [Design Tokens](#1-design-tokens)
2. [Layout Components](#2-layout-components)
3. [Navigation Components](#3-navigation-components)
4. [Content Components](#4-content-components)
5. [Interactive Components](#5-interactive-components)
6. [Tool-Specific Components](#6-tool-specific-components)
7. [Accessibility Requirements](#7-accessibility-requirements)

---

## 1. Design Tokens

### 1.1 Color Palette

**Primary Colors (50/40/10 Rule):**
```css
--light-bg: #FFE0F6;      /* 50% - Cherry Blossom Pink */
--primary: #671B50;       /* 40% - Deep Plum */
--accent: #E39774;        /* 10% - Terracotta */
--support: #EFBCBA;       /* Soft accents */
--olive: #8B8B6B;         /* Earthy olive */
```

**Text Colors:**
```css
/* For light backgrounds */
--text-dark: #2D1B2E;
--text-body: #4A3B4A;
--text-muted: #6B4C5A;
--text-light: #8B6B7A;

/* For dark/plum backgrounds */
--text-on-plum: #FFE0F6;
--text-on-plum-cream: #FAF5F0;
--text-on-plum-lime: #D3F069;
--text-on-plum-terracotta: #E39774;
```

### 1.2 Typography Scale

**Font Families:**
- Headings: `'Playfair Display', serif`
- Body: `'Inter', sans-serif`

**Fluid Type Scale:**
```css
--fs-display: clamp(2.5rem, 6vw, 5rem);    /* Hero titles */
--fs-h1: clamp(2rem, 5vw, 4rem);
--fs-h2: clamp(1.75rem, 4vw, 3rem);
--fs-h3: clamp(1.5rem, 3vw, 2.25rem);
--fs-h4: clamp(1.25rem, 2.5vw, 1.75rem);
--fs-body: clamp(1rem, 1.75vw, 1.125rem);  /* Min 16px */
--fs-small: clamp(0.875rem, 1.4vw, 0.95rem); /* Min 14px */
```

**Line Heights:**
```css
--lh-tight: 1.15;    /* Headings */
--lh-base: 1.6;      /* Body text */
--lh-relaxed: 1.8;   /* Long-form content */
```

### 1.3 Spacing System

**Fluid Spacing Scale:**
```css
--space-xs: clamp(0.25rem, 0.5vw, 0.5rem);
--space-sm: clamp(0.5rem, 1vw, 0.75rem);
--space-md: clamp(0.75rem, 1.5vw, 1rem);
--space-lg: clamp(1rem, 2vw, 1.5rem);
--space-xl: clamp(1.5rem, 3vw, 2.5rem);
--space-2xl: clamp(2rem, 4vw, 4rem);
--space-3xl: clamp(3rem, 6vw, 6rem);
```

### 1.4 Border Radius

```css
--radius-sm: clamp(4px, 0.8vw, 8px);
--radius-md: clamp(8px, 1.5vw, 16px);
--radius-lg: clamp(12px, 2vw, 24px);
--radius-xl: clamp(16px, 2.5vw, 32px);
--radius-pill: 9999px;
```

### 1.5 Shadows

```css
--shadow-xs: 0 2px 8px rgba(103, 27, 80, 0.06);
--shadow-sm: 0 4px 16px rgba(103, 27, 80, 0.08);
--shadow-md: 0 8px 30px rgba(103, 27, 80, 0.12);
--shadow-lg: 0 12px 48px rgba(103, 27, 80, 0.16);
--shadow-xl: 0 20px 64px rgba(103, 27, 80, 0.2);
--shadow-float: 0 24px 80px rgba(103, 27, 80, 0.15);
```

---

## 2. Layout Components

### 2.1 Page Structure

**HTML Pattern:**
```html
<body>
  <a href="#main-content" class="skip-link">Skip to content</a>
  
  <header class="site-header" role="banner">...</header>
  
  <nav class="mobile-nav-panel" role="navigation" inert>...</nav>
  
  <main id="main-content" role="main">
    <section class="hero" aria-labelledby="hero-title">...</section>
    <section class="main-section section-light" aria-labelledby="services-title">...</section>
  </main>
  
  <footer class="site-footer" role="contentinfo">...</footer>
</body>
```

### 2.2 Container System

**CSS Classes:**
```css
.content-narrow { width: min(95vw, 800px); margin: 0 auto; }
.content { width: min(95vw, 1400px); margin: 0 auto; }
.wide { width: min(95vw, 1600px); margin: 0 auto; }
```

**Usage:**
```html
<div class="container">
  <div class="content-narrow">...</div>
</div>
```

### 2.3 Section Backgrounds

**Alternating Pattern:**
```html
<section class="section section-light">...</section>    <!-- Light pink bg -->
<section class="section section-plum">...</section>     <!-- Dark plum bg -->
<section class="section section-gradient">...</section> <!-- Gradient bg -->
```

---

## 3. Navigation Components

### 3.1 Site Header

**Structure:**
```html
<header class="site-header" role="banner">
  <div class="header-inner">
    <a href="index.html" class="logo-link" aria-label="Mind Grace Home">
      <img src="./res/Mind_Grace_Clinic_Logo_Pink.svg" alt="..." class="logo-img" width="180" height="60"/>
      <div class="logo-text">Mind Grace Neuropsychiatric Clinic</div>
      <div class="logo-tagline">Where You Come First</div>
    </a>
    
    <nav class="desktop-nav" role="navigation" aria-label="Main navigation">
      <ul>
        <li><a href="./about.html">About</a></li>
        <li><a href="./book.html" class="cta-button">Book Now</a></li>
      </ul>
    </nav>
    
    <button class="mobile-nav-trigger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
```

**CSS Classes:**
- `.site-header` - Sticky header container
- `.header-inner` - Flexbox inner wrapper
- `.logo-link` - Logo + text combination
- `.desktop-nav` - Desktop navigation
- `.mobile-nav-trigger` - Hamburger button (3 spans)
- `.cta-button` - Call-to-action button in nav

### 3.2 Mobile Navigation Panel

**Structure:**
```html
<nav class="mobile-nav-panel" id="mobile-nav-panel" role="navigation" inert>
  <div class="mobile-nav-header">
    <h2>Menu</h2>
    <button class="close-mobile-menu" aria-label="Close menu">
      <svg>...</svg>
    </button>
  </div>
  <div class="mobile-nav-content">
    <div class="mobile-nav-section">
      <div class="mobile-nav-section-title">Explore</div>
      <ul class="mobile-nav-list">
        <li><a href="./about.html">About Us</a></li>
      </ul>
    </div>
  </div>
</nav>
```

**Key Features:**
- `[inert]` attribute for accessibility when closed
- `aria-expanded` on trigger button
- Overlay with `mobile-nav-overlay` ID
- Sections with `.mobile-nav-section-title`

### 3.3 Breadcrumbs

**Pattern:**
```html
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a href="index.html">Home</a></li>
    <li><a href="services.html">Services</a></li>
    <li aria-current="page">Psychiatry</li>
  </ol>
</nav>
```

---

## 4. Content Components

### 4.1 Hero Section

**Standard Hero:**
```html
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-content">
    <div class="hero-text">
      <span class="hero-badge">✨ You Matter Here</span>
      <h1 id="hero-title">Your Mental Health<br/><span class="highlight">Your Journey</span></h1>
      <p class="hero-subtitle">Supporting text...</p>
      <div class="hero-buttons">
        <a href="./book.html" class="btn btn-primary">Book Your Session</a>
        <a href="./process.html" class="btn btn-secondary">See How It Works</a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="hero-image-wrapper animate-float-gentle">
        <picture>
          <source srcset="./res/image.webp" type="image/webp"/>
          <img src="./res/image.jpg" alt="..." fetchpriority="high"/>
        </picture>
      </div>
    </div>
  </div>
</section>
```

**Split Hero (Doctor Pages):**
```html
<section class="hero hero-split">
  <div class="hero-inner">
    <div class="hero-content">
      <span class="section-badge">Consultant Psychiatrist</span>
      <h1>Dr. Anita Sharma</h1>
      <p class="hero-lead">MBBS, DPM, MRCPsych (UK)</p>
    </div>
    <div class="hero-image">
      <img src="./res/doctor-profile.jpg" alt="..." class="hero-img"/>
    </div>
  </div>
</section>
```

### 4.2 Card System

**Base Card:**
```html
<article class="card">
  <div class="card-icon" aria-hidden="true">
    <svg class="icon icon-lg">...</svg>
  </div>
  <h3>Card Title</h3>
  <p>Description text...</p>
  <a href="..." class="card-link">
    Learn more
    <svg class="icon icon-sm">...</svg>
  </a>
</article>
```

**Card Variants:**
- `.card-compact` - Reduced padding
- `.card-elevated` - Enhanced shadow
- `.card-outlined` - Border only, no background

**Grid Container:**
```html
<div class="services-grid">
  <article class="card">...</article>
  <article class="card">...</article>
</div>
```

### 4.3 Timeline Component

**Structure:**
```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-marker">
      <span class="step-number">01</span>
    </div>
    <div class="timeline-content">
      <h3>Education Title</h3>
      <p class="timeline-meta">Institution Name</p>
      <p>Description...</p>
    </div>
  </div>
</div>
```

### 4.4 Badge System

**Types:**
```html
<span class="badge badge-primary">Primary Badge</span>
<span class="badge badge-support">Support Badge</span>
<span class="hero-badge">✨ Hero Badge</span>
<span class="section-badge">Section Badge</span>
```

### 4.5 Icon System

**Sizes:**
```html
<svg class="icon icon-xs">...</svg>   <!-- 12px -->
<svg class="icon icon-sm">...</svg>   <!-- 16px -->
<svg class="icon icon-md">...</svg>   <!-- 20px -->
<svg class="icon icon-lg">...</svg>   <!-- 24px -->
<svg class="icon icon-xl">...</svg>   <!-- 32px -->
```

**Icon Box:**
```html
<div class="icon-box">
  <svg class="icon icon-lg">...</svg>
</div>
```

---

## 5. Interactive Components

### 5.1 Button System

**Primary Button:**
```html
<a href="./book.html" class="btn btn-primary">
  <svg class="icon icon-sm">...</svg>
  Book Your Session
</a>
```

**Button Variants:**
- `.btn-primary` - Solid plum background
- `.btn-secondary` - Outlined style
- `.btn-outline` - Border only
- `.btn-large` - Increased size
- `.btn-compact` - Reduced padding

**CTA Button (in navigation):**
```html
<a href="./book.html" class="cta-button">Book Now</a>
```

### 5.2 Modal System

**Structure:**
```html
<div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal-container">
    <header class="modal-header">
      <h2 id="modal-title">Modal Title</h2>
      <button class="modal-close" aria-label="Close modal">
        <svg>...</svg>
      </button>
    </header>
    <div class="modal-content">
      <!-- Content here -->
    </div>
    <footer class="modal-footer">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </footer>
  </div>
</div>
```

### 5.3 Form Components

**Input Fields:**
```html
<div class="form-group">
  <label for="name" class="form-label">Full Name</label>
  <input type="text" id="name" class="form-input" required/>
  <span class="form-error">Error message</span>
</div>
```

**Textarea:**
```html
<textarea class="form-textarea" rows="4"></textarea>
```

**Select Dropdown:**
```html
<select class="form-select">
  <option value="">Select option</option>
</select>
```

**Form Layout:**
```html
<form class="contact-form">
  <div class="form-row">
    <div class="form-group">...</div>
    <div class="form-group">...</div>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### 5.4 Accordion / FAQ

**Structure:**
```html
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-trigger" aria-expanded="false">
      <h3 class="accordion-title">Question?</h3>
      <svg class="accordion-icon">...</svg>
    </button>
    <div class="accordion-content" inert>
      <p>Answer content...</p>
    </div>
  </div>
</div>
```

---

## 6. Tool-Specific Components

### 6.1 Breathing Tool

**Container:**
```html
<div class="breathing-app">
  <div class="breathing-circle"></div>
  <div class="breathing-instruction">Breathe In</div>
  <div class="breathing-controls">
    <button class="btn-breath-start">Start</button>
    <button class="btn-breath-stop">Stop</button>
  </div>
</div>
```

**CSS File:** `/css-tools/tools-breathing.css`

### 6.2 Butterfly Tapper (EMDR)

**Container:**
```html
<div class="butterfly-app">
  <div class="butterfly-container">
    <div class="butterfly-wing left"></div>
    <div class="butterfly-wing right"></div>
  </div>
  <div class="tapper-controls">
    <button class="btn-tap-left">Left</button>
    <button class="btn-tap-right">Right</button>
  </div>
</div>
```

**CSS File:** `/css-tools/tools-butterfly.css`

### 6.3 Fractal Tool

**Canvas Container:**
```html
<div class="fractal-app">
  <canvas id="fractal-canvas"></canvas>
  <div class="fractal-controls">
    <input type="range" class="fractal-speed" min="1" max="10"/>
    <button class="btn-fractal-reset">Reset</button>
  </div>
</div>
```

**CSS File:** `/css-tools/tools-fractal.css`

### 6.4 Horizon Scan

**Container:**
```html
<div class="horizon-app">
  <div class="horizon-line"></div>
  <div class="scanning-dot"></div>
  <div class="horizon-controls">
    <button class="btn-scan-start">Start Scan</button>
  </div>
</div>
```

**CSS File:** `/css-tools/tools-horizon.css`

### 6.5 Leaf on Stream

**River Scene:**
```html
<div class="leaf-app">
  <div class="river-scene">
    <div class="water-surface"></div>
    <div class="leaf-object"></div>
  </div>
  <div class="leaf-controls">
    <button class="btn-leaf-drop">Drop Leaf</button>
  </div>
</div>
```

**CSS File:** `/css-tools/tools-leaf.css`

---

## 7. Accessibility Requirements

### 7.1 Skip Links

**Required on every page:**
```html
<a href="#main-content" class="visually-hidden">Skip to main content</a>
```

### 7.2 ARIA Labels

**Navigation:**
- `role="banner"` on `<header>`
- `role="navigation"` with `aria-label` on nav elements
- `aria-expanded` on mobile menu trigger
- `aria-controls` linking trigger to panel
- `aria-current="page"` on active nav items

**Interactive Elements:**
- `aria-label` on icon-only buttons
- `aria-labelledby` for modals and sections
- `aria-modal="true"` on dialog overlays
- `inert` attribute on hidden panels

### 7.3 Focus Management

**Requirements:**
- Visible focus indicators (`:focus-visible`)
- Logical tab order
- Focus trap in modals
- Return focus on modal close

### 7.4 Reduced Motion

**Media Query Support:**
All animations must respect:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 7.5 Color Contrast

**Minimum Ratios:**
- Normal text: 4.5:1
- Large text: 3:1
- UI components: 3:1

**Tested Combinations:**
- `--primary` (#671B50) on `--light-bg` (#FFE0F6): ✅ 7.2:1
- `--text-on-plum` (#FFE0F6) on `--primary` (#671B50): ✅ 7.2:1

---

## Quick Reference

### Most Used Classes

| Category | Classes |
|----------|---------|
| Buttons | `.btn`, `.btn-primary`, `.btn-secondary`, `.cta-button` |
| Cards | `.card`, `.card-icon`, `.card-link`, `.services-grid` |
| Typography | `.hero-badge`, `.section-badge`, `.highlight` |
| Layout | `.container`, `.content`, `.section`, `.section-light` |
| Icons | `.icon`, `.icon-sm`, `.icon-lg`, `.icon-box` |
| Forms | `.form-group`, `.form-input`, `.form-label` |
| Nav | `.site-header`, `.desktop-nav`, `.mobile-nav-panel` |

### File Organization

```
/css/
  base.css        - Variables, resets, typography
  layout.css      - Grid, containers, sections
  components.css  - Cards, buttons, forms, badges
  utilities.css   - Helper classes, spacing
  animations.css  - Keyframes, transitions

/css-tools/
  tools-breathing.css
  tools-butterfly.css
  tools-fractal.css
  tools-horizon.css
  tools-leaf.css
```

---

**Maintenance Notes:**
- All new components must be added to this spec
- Changes to CSS variables must be reflected across all pages
- Test all components with screen readers before deployment
- Maintain mobile-first responsive behavior
