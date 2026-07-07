# Micro Libraries for Mind Grace

**Zero-Dependency Stack** - All libraries downloaded manually, no npm required.

## Approved Libraries (Total: ~800KB, 20 libs)

### Animation & Motion

#### 1. Motion One (24KB)
- **Purpose:** Native Web Animations API wrapper
- **Use Case:** Complex animations, timelines, SVG morphing
- **API:** `animate(element, keyframes, options)`
- **Docs:** https://motion.dev/one
- **Example:**
```js
import { animate } from './motion.min.js';
animate('.card', { opacity: 1, y: 0 }, { duration: 0.5 });
```

#### 2. Anime.js v4 (17KB)
- **Purpose:** Advanced animation chaining and timelines
- **Use Case:** SVG path animations, complex sequences
- **API:** `anime({ targets, properties, duration })`
- **Docs:** https://animejs.com/
- **Example:**
```js
import anime from './anime.min.js';
anime({ targets: '.el', translateX: 250, rotate: '1turn' });
```

#### 3. AutoAnimate (23KB)
- **Purpose:** Automatic list/layout animations
- **Use Case:** FAQ accordion, list reordering, card insertions
- **API:** `autoAnimate(parentElement)`
- **Docs:** https://auto-animate.formkit.com/
- **Example:**
```js
import { autoAnimate } from './autoanimate.min.js';
const faqContainer = document.querySelector('.faq-list');
autoAnimate(faqContainer);
```

#### 4. ScrollReveal (45KB)
- **Purpose:** Scroll-triggered animations (a11y-aware)
- **Use Case:** Fade-in sections, slide-up cards on scroll
- **API:** `ScrollReveal().reveal(selector, options)`
- **Docs:** https://scrollrevealjs.org/
- **Example:**
```js
import ScrollReveal from './scrollreveal.min.js';
ScrollReveal().reveal('.card', { delay: 200, distance: '20px', origin: 'bottom' });
```

#### 5. Canvas-Confetti (25KB)
- **Purpose:** Celebration animations for form success
- **Use Case:** Contact form submission, booking confirmation
- **API:** `confetti()`
- **Docs:** https://www.kirilv.com/canvas-confetti/
- **Example:**
```js
import confetti from './confetti.min.js';
confetti({ particleCount: 100, spread: 70 });
```

### Interactivity & Components

#### 6. Splide (30KB)
- **Purpose:** Accessible carousel/slider
- **Use Case:** Gallery page, testimonial slider
- **API:** `new Splide(selector, options).mount()`
- **Docs:** https://splidejs.github.io/splide/
- **Example:**
```js
import Splide from './splide.min.js';
new Splide('.gallery-slider', { type: 'loop', perPage: 3 }).mount();
```

#### 7. Floating UI Core (12KB)
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

### State Management & Reactivity

#### 8. Alpine.js (45KB)
- **Purpose:** Declarative reactivity in HTML markup
- **Use Case:** Interactive components without build step
- **API:** `x-data`, `x-bind`, `x-on` directives
- **Docs:** https://alpinejs.dev/
- **Example:**
```html
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open">Content</div>
</div>
```

#### 9. Petite-Vue (17KB)
- **Purpose:** Vue subset for progressive enhancement
- **Use Case:** Static page interactivity with Vue syntax
- **API:** `PetiteVue.createApp({}).mount()`
- **Docs:** https://github.com/vuejs/petite-vue
- **Example:**
```html
<div v-scope="{ count: 0 }">
  <button @click="count++">{{ count }}</button>
</div>
```

#### 10. Preact Signals (3.2KB)
- **Purpose:** Hyper-fast reactive state tracking
- **Use Case:** Standalone reactive state in vanilla JS
- **API:** `signal()`, `effect()`, `computed()`
- **Docs:** https://preactjs.com/guide/v10/signals/
- **Example:**
```js
import { signal, effect } from './preact-signals.min.js';
const count = signal(0);
effect(() => console.log(count.value));
```

### Data Fetching & Dynamic Content

#### 11. htmx (51KB)
- **Purpose:** AJAX via HTML attributes
- **Use Case:** Server-driven interactions, form submissions
- **API:** `hx-get`, `hx-post`, `hx-target` attributes
- **Docs:** https://htmx.org/
- **Example:**
```html
<button hx-post="/api/submit" hx-target="#result">Submit</button>
<div id="result"></div>
```

#### 12. Ky (1.2KB)
- **Purpose:** Enhanced fetch API with retries and timeouts
- **Use Case:** Form submissions, API calls with error handling
- **API:** `ky.get(url, options)`, `ky.post(url, options)`
- **Docs:** https://github.com/sindresorhus/ky
- **Example:**
```js
import ky from './ky.min.js';
const data = await ky.post('/api/submit', { json: { name: 'John' } }).json();
```

### Routing & Performance

#### 13. Swup (22KB)
- **Purpose:** Page transition engine for SPA-like feel
- **Use Case:** Smooth page transitions, content injection
- **API:** `new Swup(options)`
- **Docs:** https://swup.js.org/
- **Example:**
```js
import Swup from './swup.min.js';
const swup = new Swup({ containers: ['#main'] });
```

#### 14. Quicklink (3.7KB)
- **Purpose:** Viewport link prefetching during idle time
- **Use Case:** Instant page loads for visible links
- **API:** `quicklink.listen(options)`
- **Docs:** https://getquick.link/
- **Example:**
```js
import quicklink from './quicklink.min.js';
quicklink.listen({ timeout: 4000 });
```

#### 15. Navigo (12KB)
- **Purpose:** Simple client-side router
- **Use Case:** Lightweight routing for static sites
- **API:** `router.on(path, handler)`
- **Docs:** https://github.com/millermedeiros/navigo
- **Example:**
```js
import Navigo from './navigo.min.js';
const router = new Navigo('/');
router.on('/about', () => console.log('About page'));
```

### Icons & Utilities

#### 16. Iconify (26KB)
- **Purpose:** On-demand icon fetching from 100+ sets
- **Use Case:** Dynamic icon loading without bundling
- **API:** `<iconify-icon icon="mdi:home"></iconify-icon>`
- **Docs:** https://iconify.design/
- **Example:**
```html
<iconify-icon icon="mdi:heart" style="font-size: 24px;"></iconify-icon>
```

#### 17. Lucide Icons (358KB)
- **Purpose:** Beautiful stroke-based icon set
- **Use Case:** Customizable icons with consistent styling
- **API:** `lucide.createIcons()`
- **Docs:** https://lucide.dev/
- **Example:**
```html
<i data-lucide="home"></i>
<script>lucide.createIcons();</script>
```

#### 18. Nano ID (1KB)
- **Purpose:** Secure, URL-friendly unique ID generator
- **Use Case:** Session IDs, form tokens, temporary keys
- **API:** `nanoid(size)`
- **Docs:** https://github.com/ai/nanoid
- **Example:**
```js
import { nanoid } from './nanoid.min.js';
const id = nanoid(); // "V1StGXR8_Z5jdHi6B-myT"
```

#### 19. Fuse.js (24KB)
- **Purpose:** Fuzzy search library for client-side indexing
- **Use Case:** Blog search, product catalog filtering
- **API:** `new Fuse(items, options).search(query)`
- **Docs:** https://fusejs.io/
- **Example:**
```js
import Fuse from './fuse.min.js';
const fuse = new Fuse(articles, { keys: ['title', 'content'] });
const results = fuse.search('anxiety');
```

#### 20. Motion-One (alt) (25KB)
- **Purpose:** Alternative Web Animations API implementation
- **Use Case:** Backup animation library
- **Note:** Similar to Motion One, kept for compatibility

## Usage Guidelines

1. **Load with defer:** Always use `<script src="..." defer></script>`
2. **Module-based libs:** Use `type="module"` for petite-vue, swup, nanoid
3. **Respect reduced motion:** Check `prefers-reduced-motion` before animating
4. **Graceful degradation:** Wrap in try-catch, provide fallbacks
5. **No global pollution:** Use ES6 imports or IIFE pattern
6. **Library stack:** All 20 libs loaded via `/assets/components/library-stack.html`

## Performance Notes

- **Total size:** ~800KB (all libraries combined)
- **Loading strategy:** All libs use `defer` to prevent render blocking
- **Module libs:** petite-vue, swup, nanoid use `type="module"`
- **Deployment scope:** Installed across all 46 HTML pages
- **Critical path:** No libraries block initial paint

## Library Stack Component

Location: `/assets/components/library-stack.html`

All 20 libraries are injected into every HTML page via single include:
```html
<script src="/assets/components/library-stack.html" defer></script>
```

This ensures consistent library availability across the entire site while maintaining a single source of truth for library versions and load order.

*Last Updated: Current Session*
