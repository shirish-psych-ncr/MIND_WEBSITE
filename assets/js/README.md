This updated documentation reflects the architectural refinements we have implemented, including the shift to modern script loading, accessibility standards, and the modular system for therapeutic tools.

---

# JavaScript Modules

This directory contains all JavaScript functionality for the **Mind Grace Neuropsychiatric Clinic** website.

## Architecture Philosophy

- **Vanilla JavaScript:** Zero-dependency, lightweight, no frameworks or libraries.
- **IIFE Pattern:** Encapsulated scopes to prevent global namespace pollution.
- **Progressive Enhancement:** Core functionality remains usable without JS; JS adds behavioral polish.
- **Performance-First:** `requestAnimationFrame`, debouncing, and `passive: true` event listeners.
- **Accessibility (A11y) First:** Focus management, `aria-live` regions, and full keyboard control.

---

## Core Scripts (`/js/`)

### `main.js` — Universal Logic

Handles site-wide infrastructure.

- **`initMobileNav()`**: Toggles navigation, manages `inert` states, and traps focus.
- **`initHeaderScroll()`**: Observes scroll state for sticky header transitions.
- **`initViewportResize()`**: Syncs CSS variables (`--vw`/`--vh`) for fluid responsiveness, handling browser zoom and mobile address bars.
- **`initScrollReveal()`**: Uses `IntersectionObserver` to trigger fade-in animations.

### Blog System (`/js/`)

- **`blog-config-adult.js` / `blog-config-child.js**`: Data schemas for blog taxonomies.
- **`blog-discovery.js`**: The engine for dynamic filtering, search, and pagination.

---

## Therapeutic Tool Scripts (`/js/tools/`)

Each tool follows a standardized module pattern, loading its specific logic alongside a dedicated stylesheet in `/css/tools/`.

| Script               | Purpose             | Interaction Focus          |
| -------------------- | ------------------- | -------------------------- |
| `tools-breathing.js` | Guided breathing    | Timing/Canvas Animation    |
| `tools-butterfly.js` | EMDR tapping        | Bilateral Haptics/Click    |
| `tools-eye.js`       | EMDR eye movement   | CSS Transitions/Timing     |
| `tools-fractal.js`   | Hypnotic relaxation | Canvas/Performance         |
| `tools-horizon.js`   | Grounding/Scan      | Gradient/Time Simulation   |
| `tools-leaf.js`      | Mindfulness         | Drag & Drop/Physics        |
| `tools-book.js`      | Psychoeducation     | Page-flip/State Management |
| `tools-map.js`       | Location finding    | Geolocation/Embed API      |

---

## Loading Pattern

Load scripts at the bottom of the `<body>` using the `defer` attribute to ensure non-blocking execution.

```html
<!-- Load Base Infrastructure -->
<script src="js/main.js" defer></script>

<!-- Load Tool-Specific Logic -->
<script src="js/tools/tools-breathing.js" defer></script>
```

---

## Coding Conventions

### IIFE Structure

All modules must protect their scope:

```javascript
(function initFeatureName() {
  const el = document.querySelector(".js-hook");
  if (!el) return;

  function init() {
    // Initialization logic
  }

  init();
})();
```

### Best Practices Checklist

- **[ ] Progressive Enhancement:** Does the feature work if JS fails?
- **[ ] Keyboard:** Can it be navigated entirely without a mouse?
- **[ ] Focus:** Does the focus move appropriately (e.g., closing a mobile menu returns focus to the trigger)?
- **[ ] Reduced Motion:** Respect `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- **[ ] Cleanup:** Use `removeEventListener` only if the component lifecycle requires dynamic destruction.

---

## Performance & Debugging

### Performance

- **Debouncing:** Use the `ticking` pattern with `requestAnimationFrame` for high-frequency events like `scroll` and `resize`.
- **Passive Listeners:** Use `{ passive: true }` for `touchstart` and `wheel` events to improve scroll fluidity.

### Debugging

1. **Console:** Filter by `[Module Name]` tags for cleaner logs.
2. **Selectors:** Use `js-` prefixes in HTML classes to decouple CSS styling from JS logic (e.g., `class="btn btn-primary js-trigger"`).
3. **Audit:** Run Lighthouse reports specifically for `Core Web Vitals` to ensure script execution isn't delaying `LCP` or causing `CLS`.

---

_Maintained by the Mind Grace Development Team._

---

_Would you like to draft the initial implementation for `main.js` now, or shall we start with one of the therapeutic tools?_
