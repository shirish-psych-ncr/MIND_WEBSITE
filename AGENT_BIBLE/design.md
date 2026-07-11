# DESIGN_REF [v14.3] — Mind Grace Neuropsychiatric Clinic

**Mode:** Orientation-First | **Stack:** CSS-Layers|Tokens | **Sync:** End-turn
**Last Asset Sync:** 2026-07-11 | **Total Assets:** 176 files (assets.md v14.0)

## 1. Design Tokens

| Token                  | Value                                | Usage               | Ref              |
| ---------------------- | ------------------------------------ | ------------------- | ---------------- |
| --color-primary        | #EC4899 (Pink-500)                   | CTAs, accents, logo | components.md §1 |
| --color-secondary      | #8B5CF6 (Purple-500)                 | Secondary actions   | components.md §2 |
| --color-accent         | #06B6D4 (Cyan-500)                   | Highlights, links   | design.md §3     |
| --color-bg-primary     | #FFFFFF                              | Light mode bg       | design.md §6     |
| --color-bg-secondary   | #F9FAFB                              | Cards, sections     | design.md §3     |
| --color-text-primary   | #111827                              | Headings, body      | WCAG AAA         |
| --color-text-secondary | #6B7280                              | Muted text          | WCAG AA          |
| --font-sans            | system-ui, -apple-system, sans-serif | All text            | design.md §5     |
| --font-mono            | ui-monospace, monospace              | Code, data          | tools.md §1      |
| --radius-sm            | 0.375rem                             | Buttons, inputs     | components.md §1 |
| --radius-md            | 0.5rem                               | Cards, modals       | components.md §2 |
| --radius-lg            | 1rem                                 | Hero, large cards   | pages.md §CORE   |
| --shadow-sm            | 0 1px 2px rgba(0,0,0,0.05)           | Subtle elevation    | components.md §2 |
| --shadow-md            | 0 4px 6px rgba(0,0,0,0.1)            | Cards, dropdowns    | components.md §2 |
| --shadow-lg            | 0 10px 15px rgba(0,0,0,0.1)          | Modals, hero        | pages.md §CORE   |

## 2. Orientation-First Architecture

**No breakpoints.** Layout adapts via body class detection:

```html
<body class="portrait">
  /* Height > Width (mobile vertical) */
  <body class="landscape">
    /* Width > Height (tablet/desktop/horizontal) */
  </body>
</body>
```

| Orientation | Typography                | Layout                 | Navigation      | Ref          |
| ----------- | ------------------------- | ---------------------- | --------------- | ------------ |
| Portrait    | Base 16px, clamp scale    | Single column, stacked | Hamburger modal | design.md §4 |
| Landscape   | Base 18-20px, clamp scale | Multi-column grid      | Horizontal nav  | design.md §4 |

**Detection Script:** `/assets/js/main.js` → `_initOrientationAdapter()` adds class on load + resize.

## 3. Fluid Typography System

All font sizes use `clamp(min, preferred, max)` based on viewport width:

```css
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
--text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
--text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3rem);
```

**Line Height:** Tight (1.2-1.3) for headings, normal (1.5-1.6) for body.

## 4. Component Patterns (Vanilla JS)

| Component | Pattern                       | State Management       | Ref              |
| --------- | ----------------------------- | ---------------------- | ---------------- |
| Button    | Class toggle + event listener | data-state attribute   | components.md §1 |
| Card      | CSS grid + hover effects      | None (CSS only)        | components.md §2 |
| Modal     | Fixed overlay + focus trap    | Alpine.js or vanilla   | components.md §3 |
| Tooltip   | Floating UI positioning       | data-tooltip attribute | components.md §4 |
| Carousel  | Splide.js wrapper             | Splide API             | components.md §5 |
| Nav Panel | Slide-in modal                | Navigo router sync     | pages.md §7      |

## 5. Color Palette (Tailwind-inspired)

| Name       | Hex     | Usage             | Contrast Ratio  |
| ---------- | ------- | ----------------- | --------------- |
| Pink-500   | #EC4899 | Primary brand     | 4.5:1 on white  |
| Purple-500 | #8B5CF6 | Secondary         | 4.5:1 on white  |
| Cyan-500   | #06B6D4 | Accent            | 3:1 on gray-100 |
| Gray-50    | #F9FAFB | Backgrounds       | -               |
| Gray-100   | #F3F4F6 | Borders, dividers | -               |
| Gray-600   | #4B5563 | Muted text        | 7:1 on white    |
| Gray-900   | #111827 | Headings          | 16:1 on white   |

## 6. Dark Mode Implementation

**System preference + manual toggle:**

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Auto dark */
  }
}
[data-theme="dark"] {
  /* Manual override */
}
```

| Element        | Light   | Dark              |
| -------------- | ------- | ----------------- |
| Background     | #FFFFFF | #111827           |
| Surface        | #F9FAFB | #1F2937           |
| Text Primary   | #111827 | #F9FAFB           |
| Text Secondary | #6B7280 | #9CA3AF           |
| Primary Color  | #EC4899 | #F472B6 (lighter) |

**Toggle:** `/assets/js/main.js` → `_initThemeToggle()`, persists to localStorage.

## 7. Animation Guidelines

| Type            | Library         | Duration | Easing       | Use Case                 |
| --------------- | --------------- | -------- | ------------ | ------------------------ |
| Fade In         | Anime.js        | 300ms    | ease-out     | Page load, scroll reveal |
| Slide Up        | CSS transitions | 250ms    | cubic-bezier | Modals, tooltips         |
| Scale           | Motion One      | 200ms    | spring       | Buttons, cards hover     |
| Confetti        | Canvas Confetti | 3000ms   | physics      | Celebrations             |
| Page Transition | Swup            | 400ms    | ease-in-out  | Route changes            |

**Reduced Motion:** Respects `prefers-reduced-motion: reduce` → disables non-essential animations.

## 8. CSS Layer Architecture

```css
@layer base,      /* Reset, variables, fluid type */
       layout,    /* Grid, flexbox, orientation */
       components,/* Buttons, cards, forms */
       utilities, /* Spacing, visibility, a11y */
       animations; /* Transitions, keyframes */
```

**Import Order:** base → layout → components → utilities → animations → tool-specific CSS

## 9. Accessibility Requirements (WCAG-2.2-AA)

| Requirement    | Implementation                       | Verification                       |
| -------------- | ------------------------------------ | ---------------------------------- |
| Contrast Ratio | 4.5:1 minimum (text), 3:1 (UI)       | Browser DevTools, axe              |
| Focus States   | Visible outline on all interactive   | Tab navigation test                |
| ARIA Labels    | aria-label, aria-describedby         | Screen reader test                 |
| Keyboard Nav   | Full tab order, escape closes modals | Manual checklist                   |
| Alt Text       | Descriptive for all images           | assets.md §1 image_descriptions.md |
| Form Labels    | Explicit <label> or aria-label       | W3C validator                      |

_Sync complete. v13.0 aligned with assets.md v13.0, memory.md v13.0, Instructions.md v13.0. Full markdown audit complete._
