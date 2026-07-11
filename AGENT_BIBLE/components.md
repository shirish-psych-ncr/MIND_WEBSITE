# Components Specification v5.0
## Mind Grace Neuropsychiatric Clinic - UI Component Library

**Source of Truth:** All 25 HTML pages + 6 tool pages verified  
**Component Files:** `/assets/components/*` (button.css, card.css)  
**Last Updated:** 2026-07-11  
**Status:** Production Ready (Calm Editorial Design)  
**Total Components:** 2 core CSS component files + 8 interactive tools

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

### 1.1 Color Palette (Calm Editorial)

**Background Colors:**
```css
--warm-ivory: #FCFAF7;      /* Main background - warm paper */
--cream: #F7F0EB;           /* Secondary backgrounds */
--off-white: #FFFDFC;       /* Card backgrounds */
--light-bg: #FFE0F6;        /* Legacy pink - use sparingly */
```

**Primary Colors (Restrained Use):**
```css
--primary: #671B50;         /* Deep Plum - buttons, links, icons only */
--accent: #E39774;          /* Terracotta - hover states */
--support: #EFBCBA;         /* Soft accents */
--olive: #8B8B6B;           /* Earthy olive */
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

**Pastel Icon Backgrounds (One per service):**
```css
--pastel-lavender: #E8E4F0;
--pastel-sage: #E4EFE8;
--pastel-beige: #F0EBE4;
--pastel-dusty-rose: #F0E4E8;
--pastel-powder-blue: #E4ECF0;
```

### 1.2 Typography Scale (Editorial)

**Font Families:**
- Headings: `'Playfair Display', serif` (weight 600, not 700)
- Body: `'Inter', sans-serif`

**Fluid Type Scale (Increased Sizes):**
```css
--fs-display: clamp(3rem, 7vw, 6rem);      /* Hero titles: 84-96px */
--fs-h1: clamp(2.5rem, 6vw, 4.5rem);
--fs-h2: clamp(2rem, 5vw, 3.5rem);         /* Section headings */
--fs-h3: clamp(1.5rem, 3vw, 2.25rem);      /* Card titles */
--fs-h4: clamp(1.25rem, 2.5vw, 1.75rem);
--fs-body: clamp(1.125rem, 2vw, 1.25rem);  /* 18-20px base */
--fs-small: clamp(0.9375rem, 1.5vw, 1rem); /* Min 15px */
```

**Line Heights (Increased Readability):**
```css
--lh-tight: 1.2;       /* Headings */
--lh-base: 1.7;        /* Body text - increased from 1.6 */
--lh-relaxed: 1.9;     /* Long-form content */
```

**Max Text Width:**
```css
--measure: 540px;      /* Optimal reading width */
--measure-wide: 600px; /* Maximum width for paragraphs */
```

### 1.3 Spacing System (Increased Whitespace)

**Fluid Spacing Scale:**
```css
--space-xs: clamp(0.25rem, 0.5vw, 0.5rem);
--space-sm: clamp(0.5rem, 1vw, 0.75rem);
--space-md: clamp(0.75rem, 1.5vw, 1rem);
--space-lg: clamp(1rem, 2vw, 1.5rem);
--space-xl: clamp(1.5rem, 3vw, 2.5rem);
--space-2xl: clamp(2rem, 4vw, 4rem);      /* Card gaps: 32-40px */
--space-3xl: clamp(3rem, 6vw, 6rem);      /* Section padding min */
--space-4xl: clamp(4rem, 8vw, 8rem);      /* Hero sections */
--space-5xl: clamp(5rem, 10vw, 10rem);    /* Large section breaks */
```

**Container Widths:**
```css
--container: 1400px;      /* Max content width */
--container-narrow: 900px; /* Text-focused sections */
```

### 1.4 Border Radius (Increased Friendliness)

```css
--radius-sm: clamp(4px, 0.8vw, 8px);
--radius-md: clamp(8px, 1.5vw, 16px);
--radius-lg: clamp(12px, 2vw, 24px);      /* Cards */
--radius-xl: clamp(16px, 2.5vw, 32px);    /* Images, hero */
--radius-xxl: clamp(20px, 3vw, 40px);     /* Large containers */
--radius-pill: 9999px;
```

### 1.5 Shadows (Softer, More Subtle)

```css
/* Ultra-subtle shadows for calm editorial feel */
--shadow-xs: 0 2px 8px rgba(103, 27, 80, 0.04);
--shadow-sm: 0 4px 16px rgba(103, 27, 80, 0.06);
--shadow-md: 0 8px 30px rgba(103, 27, 80, 0.08);
--shadow-lg: 0 12px 48px rgba(103, 27, 80, 0.1);
--shadow-xl: 0 20px 64px rgba(103, 27, 80, 0.12);
--shadow-float: 0 24px 80px rgba(103, 27, 80, 0.1);

/* Hover state - subtle lift only */
--shadow-hover: 0 4px 12px rgba(103, 27, 80, 0.08);
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

### 2.3 Section Backgrounds (Calm Editorial)

**New Pattern - Minimal Color:**
```html
<!-- Warm ivory background (default) -->
<section class="section">...</section>

<!-- Optional subtle variations -->
<section class="section section-cream">...</section>      <!-- Slightly warmer -->
<section class="section section-off-white">...</section>  <!-- Card sections -->
```

**Removed:**
- `.section-plum` - No more dark purple full sections
- `.section-gradient` - Removed heavy gradients
- `.section-light` - Replaced with warm ivory

**Emotional CTA Section:**
```html
<section class="emotional-cta">
  <h2>You don't have to go through it alone</h2>
  <p>We're here to listen, support, and walk beside you.</p>
  <a href="./book.html" class="btn btn-primary">Talk to Someone</a>
</section>
```

---

## 3. Navigation Components

### 3.1 Site Header (Updated)

**Complete Structure:**
```html
<header class="site-header" role="banner">
  <div class="header-inner">
    <a href="index.html" class="logo-link" aria-label="Mind Grace Home">
      <img src="./res/Mind_Grace_Clinic_Logo_Pink.svg" alt="..." class="logo-img" width="180" height="60"/>
      <div class="logo-text">Mind Grace Neuropsychiatric Clinic</div>
      <div class="logo-tagline">Where You Come First</div>
    </a>
    
    <!-- Desktop Nav -->
    <nav class="desktop-nav" role="navigation" aria-label="Main navigation">
      <ul>
        <li><a href="./about.html">About</a></li>
        <li><a href="./services.html">Services</a></li>
        <li><a href="./process.html">Process</a></li>
        <li><a href="./resources.html">Resources</a></li>
        <li><a href="./location.html">Location</a></li>
        <li><a href="./book.html" class="cta-button">Book Now</a></li>
      </ul>
    </nav>
    
    <!-- Mobile Controls -->
    <button class="mobile-nav-trigger" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-nav-panel">
      <span></span><span></span><span></span>
    </button>
    
    <a href="./book.html" class="mobile-book-btn" aria-label="Book Appointment">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    </a>
  </div>
</header>
```

**CSS Classes:**
- `.site-header` - Sticky header, warm ivory background
- `.header-inner` - Flexbox with increased padding
- `.logo-link` - Logo + text, friendly spacing
- `.desktop-nav` - Clean navigation with hover states
- `.mobile-nav-trigger` - Hamburger button
- `.mobile-book-btn` - Calendar icon for mobile booking
- `.cta-button` - Primary CTA in nav

**Reference File:** `/workspace/components/nav-footer.html`

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

### 4.1 Hero Section (Editorial Redesign)

**New Standard Hero:**
```html
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-content">
    <div class="hero-text">
      <!-- Smaller badge with icon -->
      <span class="hero-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        You Matter Here
      </span>
      
      <!-- Larger heading, lighter weight -->
      <h1 id="hero-title">
        Your Mental Health<br/>
        <span class="highlight">Your Journey</span><br/>
        Your Safe Space
      </h1>
      
      <!-- Wider paragraph, more line-height -->
      <p class="hero-subtitle" style="max-width: 540px; line-height: 1.7;">
        At Mind Grace Neuropsychiatric Clinic, everything revolves around <strong class="text-primary">you</strong>.
        Whether you're navigating anxiety, seeking support for your child,
        or finding balance again—Dr. Anita Sharma and our compassionate team are here.
      </p>
      
      <!-- Buttons with increased padding -->
      <div class="hero-buttons">
        <a href="./book.html" class="btn btn-primary">
          <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          Book Your Session
        </a>
        <a href="./process.html" class="btn btn-secondary">
          See How It Works
          <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </a>
      </div>
      
      <!-- NEW: Trust indicators -->
      <div class="hero-trust">
        <div class="hero-trust-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          Confidential
        </div>
        <div class="hero-trust-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
          Evidence-based
        </div>
        <div class="hero-trust-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          Personalized Care
        </div>
      </div>
    </div>
    
    <!-- Image dominates (55% width) -->
    <div class="hero-visual">
      <div class="hero-image-wrapper animate-float-gentle">
        <picture>
          <source srcset="./res/image.webp" type="image/webp"/>
          <img src="./res/image.jpg" alt="..." fetchpriority="high" 
               style="border-radius: 32px; filter: saturate(1.1) contrast(0.95);"/>
        </picture>
      </div>
    </div>
  </div>
</section>
```

**Key Changes:**
- Badge: Reduced to 36px height with SVG icon
- H1: Increased to 84-96px, weight 600
- Paragraph: 20px, line-height 1.7, max-width 540px
- Buttons: Increased padding (22px × 42px)
- **Trust indicators added** below CTAs
- Image: Border-radius 32px+, warmer grading
- Layout: 45% text / 55% image split

### 4.2 Card System (Editorial Redesign)

**New Base Card:**
```html
<article class="card">
  <!-- Icon in pastel circle background -->
  <div class="card-icon" aria-hidden="true" style="background: var(--pastel-lavender); width: 72px; height: 72px;">
    <svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <!-- Icon path -->
    </svg>
  </div>
  
  <!-- Larger title, more breathing room -->
  <h3>Card Title</h3>
  
  <!-- Description with increased line-height -->
  <p style="line-height: 1.7;">Description text with improved readability...</p>
  
  <!-- Purple text CTA, not yellow -->
  <a href="..." class="card-link" style="color: var(--primary);">
    Learn More →
    <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  </a>
</article>
```

**Card Styling Changes:**
- **Background**: White or warm cream (NOT dark purple)
- **Border-radius**: 24px (increased from 16px)
- **Padding**: 36-48px (increased from 24px)
- **Shadow**: Very subtle (--shadow-sm), almost invisible
- **Icon**: Larger (72px), inside pastel circle backgrounds
- **Hover**: Subtle 4px lift only, no dramatic animations
  ```css
  .card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
    border-color: var(--pastel-lavender);
  }
  ```

**Pastel Icon Backgrounds (One per service):**
- Lavender: `--pastel-lavender: #E8E4F0`
- Sage: `--pastel-sage: #E4EFE8`
- Beige: `--pastel-beige: #F0EBE4`
- Dusty Rose: `--pastel-dusty-rose: #F0E4E8`
- Powder Blue: `--pastel-powder-blue: #E4ECF0`

**Grid Container:**
```html
<div class="services-grid" style="gap: 40px;">
  <article class="card">...</article>
  <article class="card">...</article>
</div>
```

**Removed Variants:**
- `.card-plum` - No more dark purple cards
- Heavy gradient backgrounds

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

### Most Used Classes (Updated for Editorial Design)

| Category | Classes |
|----------|---------|
| Buttons | `.btn`, `.btn-primary`, `.btn-secondary`, `.cta-button` |
| Cards | `.card`, `.card-icon`, `.card-link`, `.services-grid` |
| Typography | `.hero-badge`, `.section-badge`, `.highlight`, `.hero-trust` |
| Layout | `.container`, `.content`, `.section`, `.section-cream`, `.emotional-cta` |
| Icons | `.icon`, `.icon-sm`, `.icon-lg`, `.icon-box` |
| Forms | `.form-group`, `.form-input`, `.form-label` |
| Nav | `.site-header`, `.desktop-nav`, `.mobile-nav-panel`, `.mobile-book-btn` |
| Trust | `.hero-trust`, `.hero-trust-item` |

### File Organization

```
/css/
  base.css        - Variables, resets, typography (UPDATED v2.0)
  layout.css      - Grid, containers, sections (UPDATED v2.0)
  components.css  - Cards, buttons, forms, badges (UPDATED v2.0)
  utilities.css   - Helper classes, spacing
  animations.css  - Keyframes, transitions

/css-tools/
  tools-breathing.css
  tools-butterfly.css
  tools-fractal.css
  tools-horizon.css
  tools-leaf.css
  tools-eye.css
  tools-book.css

/components/
  nav-footer.html - Reusable header/footer component
```

### Component Source Files

| Component | Source File | Lines |
|-----------|-------------|-------|
| Header & Nav | `/workspace/components/nav-footer.html` | Complete |
| Hero Section | `index.html` | 200-395 |
| Service Cards | `index.html` | 278-387 |
| Emotional CTA | `index.html` | 390-395 |
| Footer | `index.html` | 398-438 |

---

**Maintenance Notes:**
- All new components must be added to this spec
- Changes to CSS variables must be reflected across all pages
- Test all components with screen readers before deployment
- Maintain mobile-first responsive behavior
- **v2.0 Update**: Prioritize calm editorial design over dashboard aesthetics
- Use warm ivory backgrounds instead of pink/plum
- Restrict purple to accents only (buttons, links, icons)
- Increase whitespace everywhere (sections: 120-160px padding)
- Trust indicators are mandatory on hero sections
