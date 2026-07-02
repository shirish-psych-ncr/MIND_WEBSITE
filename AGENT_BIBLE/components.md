# Component Specification

**Version:** 1.0  
**Last Updated:** 2024  
**Scope:** UI Components for Mental Health Platform

---

## 1. Button System

### Primary Button (`.btn-primary`)
```html
<button class="btn btn-primary">Book Appointment</button>
<a href="/contact" class="btn btn-primary">Get Started</a>
```
- **Background:** `var(--primary)` (#2563eb)
- **Text:** White
- **Padding:** 0.75rem 1.5rem
- **Border-radius:** 8px
- **Hover:** Darken by 10%
- **Focus:** 2px outline with offset
- **Use Case:** Main CTAs, form submissions

### Secondary Button (`.btn-secondary`)
```html
<button class="btn btn-secondary">Learn More</button>
```
- **Background:** Transparent
- **Border:** 2px solid `var(--primary)`
- **Text:** `var(--primary)`
- **Use Case:** Secondary actions, cancel buttons

### Icon Button (`.btn-icon`)
```html
<button class="btn btn-icon" aria-label="Close modal">
  <span class="icon">×</span>
</button>
```
- **Size:** 40x40px square
- **Border-radius:** 50%
- **Use Case:** Modal close, tool controls

---

## 2. Card Components

### Service Card (`.card-service`)
```html
<article class="card card-service">
  <div class="card-icon">🧠</div>
  <h3 class="card-title">Anxiety Treatment</h3>
  <p class="card-description">Evidence-based therapies...</p>
  <a href="/services#anxiety" class="btn btn-secondary">Learn More</a>
</article>
```
- **Padding:** 1.5rem
- **Border-radius:** 12px
- **Shadow:** `var(--shadow-md)`
- **Hover:** Lift effect (translateY -4px)
- **Max-width:** 350px

### Condition Card (`.card-condition`)
```html
<article class="card card-condition">
  <h3 class="card-title">Depression</h3>
  <ul class="symptom-list">
    <li>Persistent sadness</li>
    <li>Loss of interest</li>
  </ul>
  <a href="/conditions#depression" class="btn btn-primary">Get Help</a>
</article>
```
- Similar to service card but with symptom list styling
- **List:** Unstyled, item spacing 0.5rem

### Blog Card (`.card-blog`)
```html
<article class="card card-blog">
  <img src="/images/blog-post.jpg" alt="" class="card-image">
  <div class="card-content">
    <time datetime="2024-01-15">Jan 15, 2024</time>
    <h3 class="card-title">Understanding Anxiety</h3>
    <p class="card-excerpt">Brief description...</p>
    <a href="/blog/post-slug" class="read-more">Read More →</a>
  </div>
</article>
```
- **Image:** Full width, aspect-ratio 16:9
- **Date:** Small, muted color

---

## 3. Form Elements

### Text Input (`.form-input`)
```html
<div class="form-group">
  <label for="name" class="form-label">Full Name</label>
  <input type="text" id="name" class="form-input" required>
  <span class="form-error">Please enter your name</span>
</div>
```
- **Height:** 44px (touch-friendly)
- **Border:** 1px solid `var(--border-color)`
- **Focus:** Border color `var(--primary)`, no outline
- **Error:** Border color `var(--error-red)`

### Select Dropdown (`.form-select`)
```html
<select class="form-select" aria-label="Select therapist">
  <option value="">Choose a therapist...</option>
  <option value="1">Dr. Smith</option>
</select>
```
- Same styling as `.form-input`
- Custom arrow icon via CSS

### Checkbox/Radio (`.form-check`)
```html
<label class="form-check">
  <input type="checkbox" class="form-check-input">
  <span class="form-check-label">I agree to terms</span>
</label>
```
- Custom 20x20px boxes
- Checkmark animation on select

### Submit Button
```html
<button type="submit" class="btn btn-primary btn-block">
  Send Message
</button>
```
- Full width on mobile, auto on desktop

---

## 4. Navigation

### Main Nav (`.navbar`)
```html
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <a href="/" class="navbar-brand">Clinic Logo</a>
  <button class="navbar-toggle" aria-expanded="false" aria-controls="main-menu">
    <span class="sr-only">Toggle menu</span>
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </button>
  <ul id="main-menu" class="navbar-menu">
    <li><a href="/services" class="nav-link">Services</a></li>
    <li><a href="/about" class="nav-link">About</a></li>
    <li><a href="/contact" class="nav-link nav-cta">Contact</a></li>
  </ul>
</nav>
```
- **Height:** 70px
- **Position:** Sticky top
- **Mobile:** Hamburger menu, slide-in drawer
- **Desktop:** Horizontal flex layout
- **CTA Link:** Highlighted button style

### Breadcrumb (`.breadcrumb`)
```html
<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/services">Services</a></li>
    <li aria-current="page">Anxiety Treatment</li>
  </ol>
</nav>
```
- Separator: `/` or `›`
- Last item: Non-clickable, current page indicator

---

## 5. Modal System

### Modal Container (`.modal-overlay`)
```html
<div class="modal-overlay" id="booking-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal-container">
    <header class="modal-header">
      <h2 id="modal-title" class="modal-title">Book Appointment</h2>
      <button class="btn btn-icon modal-close" aria-label="Close modal">×</button>
    </header>
    <div class="modal-body">
      <!-- Content -->
    </div>
    <footer class="modal-footer">
      <button class="btn btn-secondary modal-cancel">Cancel</button>
      <button class="btn btn-primary modal-confirm">Confirm</button>
    </footer>
  </div>
</div>
```
- **Overlay:** Semi-transparent black backdrop
- **Container:** Max-width 500px, centered, max-height 90vh with scroll
- **Animation:** Fade in overlay, scale up container
- **Focus Trap:** JavaScript manages focus within modal
- **Escape Key:** Closes modal

---

## 6. Tool-Specific Components

### Breathing Circle (`.breathing-circle`)
```html
<div class="breathing-app">
  <div class="breathing-circle" aria-live="polite">
    <span class="breathing-instruction">Breathe In</span>
  </div>
  <div class="breathing-controls">
    <button class="btn btn-primary" id="start-breathing">Start</button>
    <button class="btn btn-secondary" id="stop-breathing">Stop</button>
  </div>
</div>
```
- **Circle:** Animated scale (inhale 4s, hold 4s, exhale 4s)
- **Colors:** Calming gradients (blue/green)
- **Instruction:** Large, centered text

### Butterfly Tapper (`.tapper-container`)
```html
<div class="tapper-app">
  <div class="tapper-wrapper">
    <button class="tapper tapper-left" aria-label="Left tap">🦋</button>
    <button class="tapper tapper-right" aria-label="Right tap">🦋</button>
  </div>
  <div class="tapper-controls">
    <select class="speed-select" aria-label="Tap speed">
      <option value="slow">Slow</option>
      <option value="medium" selected>Medium</option>
      <option value="fast">Fast</option>
    </select>
  </div>
</div>
```
- **Tappers:** Alternating fade/scale animations
- **Speed Control:** 3 preset options
- **Accessibility:** Keyboard left/right arrows trigger taps

### Fractal Canvas (`.fractal-canvas`)
```html
<div class="fractal-app">
  <canvas id="fractalCanvas" class="fractal-canvas" aria-label="Animated fractal pattern"></canvas>
  <div class="fractal-controls">
    <button class="btn btn-secondary" id="change-pattern">Change Pattern</button>
    <button class="btn btn-secondary" id="toggle-fullscreen">Fullscreen</button>
  </div>
</div>
```
- **Canvas:** Full-width, responsive height
- **Controls:** Minimalist overlay or bottom bar

---

## 7. Utility Classes

### Spacing
- `.mt-1` to `.mt-4` (margin-top: 0.25rem to 1.5rem)
- `.mb-1` to `.mb-4` (margin-bottom)
- `.p-1` to `.p-4` (padding)

### Text
- `.text-center`, `.text-left`, `.text-right`
- `.text-muted` (gray color)
- `.text-primary` (brand color)
- `.sr-only` (screen reader only)

### Layout
- `.container` (max-width 1200px, centered)
- `.grid` (CSS Grid, auto-fit columns)
- `.flex` (Flexbox)
- `.hidden` (display: none)
- `.visible-mobile`, `.visible-desktop` (responsive visibility)

### Accessibility
- `.focus-visible` (custom focus styles)
- `.skip-link` (skip to main content)

---

## 8. Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### Mobile-Specific Adjustments
- Buttons: Full width on forms
- Cards: Single column grid
- Nav: Hamburger menu
- Modals: Full screen with slide-up animation

---

## 9. Color Palette

```css
:root {
  --primary: #2563eb;       /* Brand blue */
  --primary-dark: #1d4ed8;  /* Hover state */
  --secondary: #64748b;     /* Muted gray-blue */
  --success: #10b981;       /* Green */
  --warning: #f59e0b;       /* Amber */
  --error-red: #ef4444;     /* Red */
  
  --bg-white: #ffffff;
  --bg-off-white: #f8fafc;
  --text-dark: #1e293b;
  --text-light: #64748b;
  --border-color: #e2e8f0;
  
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

---

## 10. Animation Guidelines

### Duration
- Fast: 150ms (hover states)
- Normal: 300ms (transitions)
- Slow: 500ms (modals, page transitions)

### Easing
- Standard: `ease-out`
- Bounce: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Usage Notes

1. **Consistency:** Always use these classes instead of inline styles
2. **Accessibility:** Include ARIA labels on all interactive elements
3. **Performance:** Avoid nesting more than 3 levels deep
4. **Theming:** Use CSS variables for colors to enable easy rebranding
5. **Testing:** Test all components with keyboard navigation and screen readers
