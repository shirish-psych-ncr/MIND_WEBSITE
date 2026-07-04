# Micro Libraries for Mind Grace

**Zero-Dependency Stack** - All libraries downloaded manually, no npm required.

## Approved Libraries (Total: ~136KB)

### 1. AutoAnimate (23KB)
- **Purpose:** Automatic list/layout animations
- **Use Case:** Animating FAQ accordion, list reordering, card insertions
- **API:** `autoAnimate(parentElement)`
- **Docs:** https://auto-animate.formkit.com/
- **Example:**
```js
import { autoAnimate } from './autoanimate.min.js';
const faqContainer = document.querySelector('.faq-list');
autoAnimate(faqContainer);
```

### 2. Canvas-Confetti (25KB)
- **Purpose:** Celebration animations for form success
- **Use Case:** Contact form submission, booking confirmation
- **API:** `confetti()`
- **Docs:** https://www.kirilv.com/canvas-confetti/
- **Example:**
```js
import confetti from './confetti.min.js';
confetti({ particleCount: 100, spread: 70 });
```

### 3. Ky (1.2KB)
- **Purpose:** Enhanced fetch API with retries and timeouts
- **Use Case:** Form submissions, API calls with error handling
- **API:** `ky.get(url, options)`, `ky.post(url, options)`
- **Docs:** https://github.com/sindresorhus/ky
- **Example:**
```js
import ky from './ky.min.js';
const data = await ky.post('/api/submit', { json: { name: 'John' } }).json();
```

### 4. ScrollReveal (45KB)
- **Purpose:** Scroll-triggered animations (a11y-aware)
- **Use Case:** Fade-in sections, slide-up cards on scroll
- **API:** `ScrollReveal().reveal(selector, options)`
- **Docs:** https://scrollrevealjs.org/
- **Example:**
```js
import ScrollReveal from './scrollreveal.min.js';
ScrollReveal().reveal('.card', { delay: 200, distance: '20px', origin: 'bottom' });
```

### 5. Floating UI Core (12KB)
- **Purpose:** Tooltip/popover positioning
- **Use Case:** Help tooltips, dropdown menus, popovers
- **API:** `computePosition(reference, floating, options)`
- **Docs:** https://floating-ui.com/
- **Example:**
```js
import { computePosition } from './floating-ui.core.min.js';
computePosition(referenceEl, floatingEl, { placement: 'top' })
  .then(({ x, y }) => {
    Object.assign(floatingEl.style, { left: `${x}px`, top: `${y}px` });
  });
```

### 6. Splide (30KB)
- **Purpose:** Accessible carousel/slider
- **Use Case:** Gallery page, testimonial slider
- **API:** `new Splide(selector, options).mount()`
- **Docs:** https://splidejs.github.io/splide/
- **Example:**
```js
import Splide from './splide.min.js';
new Splide('.gallery-slider', { type: 'loop', perPage: 3 }).mount();
```

## Rejected Libraries

These were considered but rejected for the following reasons:

| Library | Reason |
|---|---|
| Motion One | Native Web Animations API sufficient |
| Anime.js v4 | Overkill for simple therapeutic animations |
| Alpine.js | Violates vanilla JS mandate (15KB) |
| Petite-Vue | Unnecessary reactivity layer |
| Preact Signals | No framework needed |
| htmx | Custom fetch logic already minimal |
| Swup | Multi-page transitions not needed |
| Quicklink | Prefetch handled by browser |
| Navigo | No client-side routing required |
| Fuse.js | Blog search uses native filtering |
| Nano ID | Can inline if needed |

## Usage Guidelines

1. **Load with defer:** Always use `<script src="..." defer></script>`
2. **Respect reduced motion:** Check `prefers-reduced-motion` before animating
3. **Graceful degradation:** Wrap in try-catch, provide fallbacks
4. **Budget awareness:** Total lib cost must stay under 150KB
5. **No global pollution:** Use ES6 imports or IIFE pattern

## Performance Budget

- **Total:** <150KB (current: ~136KB)
- **Per-page:** <50KB of libs loaded
- **Lazy load:** Non-critical libs loaded on interaction

*Last Updated: Current Session*
