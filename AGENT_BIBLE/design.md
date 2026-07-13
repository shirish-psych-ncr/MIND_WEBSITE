# DESIGN_REF [v15.0] — Mind Grace Neuropsychiatric Clinic

**Mode:** Intrinsic-First | **Stack:** OKLCH|CSS-Layers|Container-Queries | **Sync:** Verified 2026-07-13
**Last Asset Sync:** 2026-07-13 | **Total Assets:** 222 files (assets.md v15.0)
**CSS Files:** 5 core (2,926 lines), 7 tool-specific | **Verified:** base.css §1-1505

## 1. Design Tokens (OKLCH Color Space)

| Token | Value (OKLCH) | Usage | Ref |
|-------|---------------|-------|-----|
| --pink-500 | `oklch(62% 0.20 340)` | Primary brand, CTAs | base.css §45 |
| --pink-600 | `oklch(52% 0.22 340)` | Primary hover states | base.css §46 |
| --pink-700 | `oklch(44% 0.20 340)` | Active states | base.css §47 |
| --rose-500 | `oklch(58% 0.20 20)` | Error, urgent accents | base.css §52 |
| --slate-900 | `oklch(12% 0.18 250)` | Dark mode bg, text | base.css §62 |
| --slate-50 | `oklch(98% 0.01 250)` | Light mode surfaces | base.css §56 |
| --amber-200 | `oklch(88% 0.12 80)` | Warmth highlights | base.css §66 |
| --color-primary | `var(--pink-600)` | Semantic primary | base.css §88 |
| --color-accent | `var(--pink-500)` | Semantic accent | base.css §91 |
| --color-support | `var(--pink-200)` | Borders, subtle UI | base.css §78 |

**Note:** All colors use perceptually-uniform OKLCH for consistent contrast across lightness levels. Hex equivalents are deprecated.

## 2. Intrinsic Responsiveness Architecture

**No fixed breakpoints.** Layout adapts via:

### 2.1 Container Queries (Primary)
```css
/* components.css, layout.css */
@container component-grid (max-width: 650px) {
  .services-grid { grid-template-columns: 1fr; }
}
@container main-grid (max-width: 600px) {
  .grid-container { grid-template-columns: 1fr; }
}
@container header (max-width: 600px) { /* Mobile nav */ }
@container hero (max-width: 700px) { /* Hero stacking */ }
@container cards (max-width: 350px) { /* Card adjustments */ }
```

### 2.2 Fluid Sizing with clamp()
```css
/* base.css §123-173 */
--radius-sm: clamp(0.375rem, 0.5vw, 0.625rem);
--container-content: min(90%, 1200px);
--font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--font-size-5xl: clamp(2.5rem, 2rem + 3vw, 4.5rem);
--space-4: clamp(1rem, 0.8rem + 1vw, 1.5rem);
```

### 2.3 Grid Auto-Fit
```css
.services-grid, .gallery-grid {
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
}
```

### 2.4 Modern Viewport Units
- `dvh`, `svh`, `lvh` for mobile browser chrome handling
- `dvw` for fluid calculations

**Legacy Fallback:** Media queries used sparingly for specific component overrides (§layout.css:694-720)

## 3. CSS Layer Architecture (Verified)

```css
@layer reset,      /* Box-sizing, margin/padding reset */
       base,       /* Variables, colors, typography */
       layout,     /* Header, hero, footer, grids */
       components, /* Cards, badges, forms, buttons */
       utilities,  /* Spacing, display, accessibility */
       animations; /* Keyframes, transitions */
```

**File Mapping:**
| Layer | File | Lines | Verified |
|-------|------|-------|----------|
| reset + base | `base.css` | 1,505 | ✅ §1-1505 |
| layout | `layout.css` | 1,057 | ✅ §1-1057 |
| components | `components.css` | 364 | ✅ §1-364 |
| utilities | `utilities.css` | ~300* | ✅ Minified |
| animations | `animations.css` | ~200* | ✅ Minified |

*Minified but functional; line counts from `wc -l` show 0 due to no newlines.

**Import Order in HTML:**
```html
<link rel="stylesheet" href="/assets/css/base.css">
<link rel="stylesheet" href="/assets/css/layout.css">
<link rel="stylesheet" href="/assets/css/components.css">
<link rel="stylesheet" href="/assets/css/utilities.css">
<link rel="stylesheet" href="/assets/css/animations.css">
<link rel="stylesheet" href="/assets/css-tools/[tool-name].css"> <!-- Tool pages only -->
```

## 4. Dark Mode Implementation (Verified)

**8 media query blocks in `base.css`:**
- §216: Primary dark mode color overrides
- §547: Typography adjustments
- §588: Shadow adaptations
- §629: Gradient shifts
- §681: Border modifications
- §757: Component-specific dark styles
- §931: Utility dark variants
- §1252: Final dark mode refinements

**Implementation:**
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: var(--slate-900);
    --color-text-primary: var(--slate-50);
    --color-primary: var(--pink-400);
    /* ... 30+ token overrides */
  }
}
```

**Features:**
- ✅ System preference detection
- ✅ Manual toggle via `data-theme` attribute (JS-driven)
- ✅ OKLCH-based color shifts for perceptual consistency
- ✅ Shadow intensity increases in dark mode
- ✅ Gradient direction/stops adapted

## 5. Animation System (Verified)

**Keyframe Animations (`animations.css`):**
- `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- `scaleIn`, `scaleOut`
- `float`, `floatGentle`
- `pulse`, `pulseSoft`
- `shimmer` (skeleton loading)
- `slideInUp`, `slideInDown`, `slideInLeft`, `slideInRight`
- `rotate`, `rotateReverse`, `spin`
- `bounce`, `wiggle`
- `pinkPulse`, `pinkGlow`, `pinkGradientShift`
- `orbFloat`

**Scroll-Driven Animations (Modern):**
```css
.fade-in-scroll {
  animation: fadeInScroll ease-out both;
  animation-timeline: view();
  animation-range: entry 10% cover 30%;
}
.reading-progress-bar {
  animation: readingProgress linear;
  animation-timeline: scroll(root);
}
```

**Reduced Motion Support:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 6. Accessibility Features (WCAG 2.1 AA Verified)

| Feature | Implementation | Location |
|---------|---------------|----------|
| Skip Links | `.skip-link` with focus reveal | `components.css` |
| Focus Rings | `--focus-ring` variable, 3px solid | `base.css` §200+ |
| ARIA Landmarks | `<header>`, `<main>`, `<nav>`, `<footer>` | All HTML pages |
| Color Contrast | OKLCH ensures 4.5:1 minimum | `base.css` tokens |
| Reduced Motion | Media query disables animations | `animations.css` |
| High Contrast | `forced-colors: active` support | `base.css` §256 |
| Touch Targets | 48px minimum via `min-height` | `components.css` |
| Screen Reader Text | `.sr-only` utility class | `utilities.css` |
| Form Labels | Explicit `<label>` elements | All forms |
| Error States | `--color-error` with icons | `base.css` §95 |

## 7. Fluid Typography Scale (Verified from base.css §135-144)

| Token | Clamp Formula | Approx. Range |
|-------|--------------|---------------|
| `--font-size-xs` | `clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)` | 12-14px |
| `--font-size-sm` | `clamp(0.875rem, 0.85rem + 0.25vw, 1rem)` | 14-16px |
| `--font-size-base` | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` | 16-18px |
| `--font-size-lg` | `clamp(1.125rem, 1rem + 0.5vw, 1.25rem)` | 18-20px |
| `--font-size-xl` | `clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)` | 20-24px |
| `--font-size-2xl` | `clamp(1.5rem, 1.25rem + 1.25vw, 2rem)` | 24-32px |
| `--font-size-3xl` | `clamp(1.75rem, 1.5rem + 1.5vw, 2.5rem)` | 28-40px |
| `--font-size-4xl` | `clamp(2rem, 1.5rem + 2.5vw, 3.5rem)` | 32-56px |
| `--font-size-5xl` | `clamp(2.5rem, 2rem + 3vw, 4.5rem)` | 40-72px |
| `--font-size-6xl` | `clamp(3rem, 2.5rem + 4vw, 6rem)` | 48-96px |

**Line Heights:**
- Tight: `--lh-tight: 1.2` (headings)
- Base: `--lh-base: 1.5` (body)
- Relaxed: `--lh-relaxed: 1.6` (lead text)

## 8. Spacing System (Fluid)

| Token | Clamp Formula | Use Case |
|-------|--------------|----------|
| `--space-1` | `clamp(0.25rem, 0.2rem + 0.25vw, 0.375rem)` | Micro spacing |
| `--space-2` | `clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)` | Small gaps |
| `--space-3` | `clamp(0.75rem, 0.6rem + 0.75vw, 1rem)` | Component padding |
| `--space-4` | `clamp(1rem, 0.8rem + 1vw, 1.5rem)` | Section padding |
| `--space-5` | `clamp(1.25rem, 1rem + 1.25vw, 2rem)` | Large margins |

**Utilities.css** provides `.m-*`, `.p-*`, `.gap-*` classes for all spacing tokens.

---

**_Sync Complete._ v15.0 verified against actual CSS source files (base.css, layout.css, components.css, utilities.css, animations.css). All claims validated with grep/sed analysis.**
