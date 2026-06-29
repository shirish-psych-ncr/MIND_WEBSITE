# CSS Stylesheets

This directory contains the core modular CSS architecture for Mind Grace Clinic.

## Architecture

Styles are organized into five logical modules, each with a single responsibility:

### Load Order (Critical)

Every page must load these files in **exact order**:

```html
<link rel="stylesheet" href="css/base.css" />
<link rel="stylesheet" href="css/layout.css" />
<link rel="stylesheet" href="css/components.css" />
<link rel="stylesheet" href="css/utilities.css" />
<link rel="stylesheet" href="css/animations.css" />
```

**Why order matters:** Each module builds on the previous one. Changing the order will break the cascade and cause styling issues.

---

## File Responsibilities

### `base.css` — Foundation & Design Tokens

**Purpose:** Defines the visual foundation and design system.

**Contains:**
- CSS custom properties (design tokens)
  - Color palette (primary, accent, support, neutrals, text)
  - Typography scale (fluid `clamp()` functions)
  - Spacing scale (fluid `clamp()` functions)
  - Shadow definitions
  - Border radius values
  - Transition timings
  - Sizing variables (`--content-width`, `--measure`, etc.)
- CSS reset
- Base element styles (`html`, `body`, `img`, `svg`)
- Dark mode media query (`prefers-color-scheme: dark`)
- Accessibility fundamentals
  - `:focus-visible` styles
  - `.visually-hidden` utility
- Reduced motion support (`prefers-reduced-motion`)
- Container setup (`.container` with `container-type`)

**Do not:** Add component-specific or layout-specific styles here.

---

### `layout.css` — Page Structure

**Purpose:** Defines the macro layout of the site.

**Contains:**
- Site header
  - Logo styles (fluid sizing)
  - Desktop navigation
  - Mobile navigation trigger, overlay, panel
- Hero section
  - Intrinsic grid layout (`auto-fit`, `minmax()`)
  - Hero text content
  - Hero image wrapper (with floating animation)
  - Background blob effects
- Main content sections
  - Section headers
  - Card grids (intrinsic `auto-fill`)
  - Individual card layouts
- Footer
  - Multi-column grid
  - Links and legal text
- Button styles
  - Primary (filled, elevated)
  - Secondary (outlined)
  - Fluid padding and sizing

**Do not:** Add micro-component styles here (use `components.css`).

---

### `components.css` — Reusable UI Components

**Purpose:** Provides reusable UI building blocks.

**Contains:**
- Badges (`.badge`, `.badge-primary`, `.badge-support`)
- Icons (`.icon`, `.icon-sm`, `.icon-lg`, `.icon-xl`)
- Card variants
  - `.card-compact`
  - `.card-elevated`
  - `.card-outlined`
- Section backgrounds
  - `.section-white`
  - `.section-blush`
  - `.section-cream`
  - `.section-plum`
- Glass morphism effects (`.glass`, `.glass-dark`)
- Dividers (`.divider`)
- Highlight text (`.highlight-text`)
- Text gradients (`.text-gradient`)
- Loading skeletons (`.skeleton`)
- Decorative blobs (`.blob`, `.blob-primary`, etc.)
- Ripple effect buttons (`.btn-ripple`)
- Container queries for component responsiveness

**Do not:** Add page-specific layouts here.

---

### `utilities.css` — Helper Classes

**Purpose:** Provides atomic utility classes for rapid styling.

**Contains:**
- Text alignment (`.text-center`, `.text-left`, `.text-right`)
- Font weights (`.fw-light` through `.fw-bold`)
- Font sizes (`.fs-display` through `.fs-tiny`)
- Line heights (`.lh-tight`, `.lh-base`, `.lh-relaxed`)
- Colors (`.text-primary`, `.text-accent`, etc.)
- Backgrounds (`.bg-white`, `.bg-primary`, etc.)
- Margin utilities (`.m-*`, `.mt-*`, `.mb-*`, `.mx-auto`)
- Padding utilities (`.p-*`, `.py-*`, `.px-*`)
- Gap utilities (`.gap-*`)
- Display utilities (`.d-none`, `.d-flex`, `.d-grid`)
- Flexbox utilities (`.flex-row`, `.justify-center`, etc.)
- Width utilities (`.w-full`, `.w-narrow`, `.max-w-content`)
- Visibility (`.visible`, `.invisible`)
- Overflow (`.overflow-hidden`, `.overflow-auto`)
- Position (`.relative`, `.absolute`, `.fixed`, `.sticky`)
- Z-index (`.z-0` through `.z-1000`)
- Border radius (`.radius-sm` through `.radius-pill`)
- Shadows (`.shadow-xs` through `.shadow-float`)
- Transitions (`.transition-fast`, `.transition-base`)
- Aspect ratios (`.aspect-square`, `.aspect-video`)
- Object fit (`.object-cover`, `.object-contain`)
- Opacity (`.opacity-0` through `.opacity-100`)
- Screen reader only (`.sr-only`)

**Usage Principle:** Use utilities for quick adjustments, but prefer semantic classes in components for maintainability.

---

### `animations.css` — Motion & Effects

**Purpose:** Defines all animations and motion utilities.

**Contains:**
- Keyframe definitions
  - Fade variations (`fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`)
  - Scale variations (`scaleIn`, `scaleOut`)
  - Float animations (`float`, `floatGentle`)
  - Pulse animations (`pulse`, `pulseSoft`)
  - Shimmer effect
  - Slide variations (`slideInUp`, `slideInDown`, etc.)
  - Rotate animations
  - Bounce
  - Wiggle
- Animation utility classes
  - `.animate-fade-in`, `.animate-fade-in-up`, etc.
  - `.animate-float`, `.animate-float-gentle`
  - `.animate-pulse`, `.animate-pulse-soft`
  - `.animate-shimmer`
  - `.animate-slide-in-*`
  - `.animate-bounce`, `.animate-wiggle`
- Stagger delays (`.stagger-1` through `.stagger-6`)
- Duration utilities (`.duration-fast` through `.duration-slowest`)
- Reveal on scroll (`.reveal`, `.reveal-from-left`, `.reveal-from-right`)
- Hover effects (`.hover-lift`, `.hover-zoom-img`)
- Parallax helpers (`.parallax`)
- Reduced motion overrides (automatically disables animations for users who prefer reduced motion)

**Performance Note:** All animations use `transform` and `opacity` for GPU acceleration where possible.

---

## Design System Integration

All CSS modules use design tokens from `base.css`. Never hardcode values like:

❌ **Don't do this:**
```css
.card {
  padding: 20px;
  border-radius: 8px;
  color: #671B50;
}
```

✅ **Do this:**
```css
.card {
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  color: var(--primary);
}
```

This ensures consistency and makes global changes trivial.

---

## Responsive Design Philosophy

This project uses **intrinsic design** rather than breakpoint-driven design:

- **Fluid typography:** `clamp(min, preferred, max)`
- **Fluid spacing:** `clamp(min, preferred, max)`
- **Grid auto-fit:** `repeat(auto-fit, minmax(min(280px, 100%), 1fr))`
- **Container queries:** Components respond to their container size
- **Modern viewport units:** `dvh`, `dvw`, `svh`, `lvh`

Avoid adding media queries unless absolutely necessary. Most layouts should adapt intrinsically.

---

## Browser Support

- **Modern browsers:** Chrome, Firefox, Safari, Edge (last 2 versions)
- **Graceful degradation:** Older browsers get functional (if less polished) experience
- **Reduced motion:** Respects `prefers-reduced-motion`
- **Dark mode:** Supports `prefers-color-scheme: dark`

---

## Maintenance

When adding new styles:

1. **Identify the scope:**
   - Global variable? → `base.css`
   - Page structure? → `layout.css`
   - Reusable component? → `components.css`
   - One-off adjustment? → `utilities.css` (or create new utility)
   - Animation? → `animations.css`

2. **Use design tokens:** Always reference CSS variables, never hardcoded values.

3. **Test responsiveness:** Verify the style works across mobile, tablet, and desktop without media queries.

4. **Check accessibility:** Ensure sufficient contrast, focus states, and reduced motion support.

5. **Document:** If creating a new component or utility, add it to this README.

---

## Related Directories

- `/css-tools/` — Tool-specific stylesheets for therapeutic features
- `/js/` — JavaScript modules
- `/res/` — Static resources (images, logos)
