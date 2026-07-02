# JavaScript Modules

This directory contains all JavaScript functionality for the Mind Grace Neuropsychiatric Clinic website.

## Architecture Philosophy

- **Vanilla JavaScript:** No frameworks or libraries
- **IIFE Pattern:** All code wrapped in Immediately Invoked Function Expressions to avoid global scope pollution
- **Progressive Enhancement:** Site works without JavaScript; JS adds interactions
- **Minimal Footprint:** Only interaction logic, no layout control
- **Accessibility First:** Focus management, keyboard navigation, ARIA support

---

## Core Scripts

### `main.js` — Site-Wide Interactions

**Purpose:** Handles universal interactions used across all pages.

**Modules (IIFE):**

#### 1. `initMobileNav()`
Mobile navigation system with accessibility features:
- Toggle panel and overlay visibility
- Focus trap for keyboard users
- Escape key to close
- Auto-close on window resize (desktop)
- Auto-close on link click
- Proper `inert` attribute management

**Dependencies:** None  
**Used on:** All pages

---

#### 2. `initHeaderScroll()`
Adds visual feedback when user scrolls:
- Toggles `.scrolled` class on header
- Uses `requestAnimationFrame` for performance
- Debounced scroll handling

**Dependencies:** None  
**Used on:** All pages

---

#### 3. `initViewportResize()`
Handles viewport changes including browser zoom:
- Updates `--vw` and `--vh` CSS custom properties
- Listens to `resize` events
- Listens to `visualViewport.resize` (browser zoom support)
- Enables fluid layouts to respond to zoom

**Dependencies:** None  
**Used on:** All pages

---

#### 4. `initScrollReveal()`
Progressive enhancement for scroll animations:
- Uses `IntersectionObserver` API
- Reveals elements with `.reveal` class
- Graceful degradation if unsupported
- Unobserves elements after reveal (performance)

**Dependencies:** None  
**Used on:** Pages with `.reveal` elements

---

### `blog-config-adult.js` — Adult Mental Health Configuration

**Purpose:** Metadata and configuration for adult mental health blog posts.

**Contains:**
- Post categories
- Tags
- Author information
- Related post mappings

**Dependencies:** `blog-discovery.js`  
**Used on:** `/blog/adult.html`, adult blog post pages

---

### `blog-config-child.js` — Child Development Configuration

**Purpose:** Metadata and configuration for child development blog posts.

**Contains:**
- Post categories
- Tags
- Author information
- Related post mappings

**Dependencies:** `blog-discovery.js`  
**Used on:** `/blog/child.html`, child blog post pages

---

### `blog-discovery.js` — Blog System Engine

**Purpose:** Dynamic blog post discovery, listing, and filtering.

**Features:**
- Scans `/blog/pages/` for posts
- Renders post listings
- Category filtering
- Tag filtering
- Search functionality
- Pagination (if needed)

**Dependencies:** `blog-config-adult.js` OR `blog-config-child.js`  
**Used on:** `/blog/index.html`, `/blog/adult.html`, `/blog/child.html`

---

## Therapeutic Tool Scripts

Each therapeutic tool has a dedicated script following a consistent pattern.

### `tools-breathing.js` — Guided Breathing Exercise

**Purpose:** Controls the guided breathing animation and timing.

**Features:**
- Breathing cycle timing (inhale, hold, exhale)
- Visual circle expansion/contraction
- Session duration tracking
- Start/pause/reset controls
- Audio cue integration (optional)

**CSS Dependency:** `css-tools/tools-breathing.css`  
**HTML:** `guided-breathing.html`

---

### `tools-butterfly.js` — EMDR Butterfly Tapper

**Purpose:** Implements bilateral stimulation tapping.

**Features:**
- Left/right tap zones
- Tap counter
- Speed control
- Session timer
- Haptic feedback (mobile)
- Visual feedback on tap

**CSS Dependency:** `css-tools/tools-butterfly.css`  
**HTML:** `butterfly-tapper.html`

---

### `tools-eye.js` — Eye Movement Therapy

**Purpose:** Guides eye movement for EMDR therapy.

**Features:**
- Moving target animation
- Speed adjustment
- Direction patterns (horizontal, vertical, diagonal)
- Distance control
- Session timer

**CSS Dependency:** `css-tools/tools-eye.css`  
**HTML:** `eye-movement.html`

---

### `tools-fractal.js` — Hypnotic Fractal Visualization

**Purpose:** Generates and animates fractal patterns for relaxation/hypnosis.

**Features:**
- Canvas-based fractal generation
- Zoom animation
- Color cycling
- Pattern variations
- Fullscreen mode

**CSS Dependency:** `css-tools/tools-fractal.css`  
**HTML:** `hypnos-fractal.html`

---

### `tools-horizon.js` — Horizon Scanning Relaxation

**Purpose:** Simulates horizon scanning for grounding/relaxation.

**Features:**
- Gradient sky animation
- Sun/moon movement
- Cloud drift
- Time-of-day simulation
- Breathing sync option

**CSS Dependency:** `css-tools/tools-horizon.css`  
**HTML:** `horizon-scan.html`

---

### `tools-leaf.js` — Leaf on Stream Mindfulness

**Purpose:** Mindfulness exercise visualizing thoughts as leaves on a stream.

**Features:**
- Draggable leaf elements
- Water ripple effects
- Leaf spawn on click/tap
- Stream animation
- Thought labeling (optional)

**CSS Dependency:** `css-tools/tools-leaf.css`  
**HTML:** `leaf-on-stream.html`

---

### `tools-book.js` — Interactive Resource Book

**Purpose:** Digital book interface for psychoeducational resources.

**Features:**
- Page flip animations
- Chapter navigation
- Bookmark system
- Progress tracking
- Search within content
- Table of contents

**CSS Dependency:** `css-tools/tools-book.css`  
**HTML:** `book.html`

---

### `tools-map.js` — Location Map Integration

**Purpose:** Embeds and configures interactive map for clinic location.

**Features:**
- Google Maps / OpenStreetMap integration
- Marker placement
- Directions link
- Contact info overlay
- Mobile-optimized view

**CSS Dependency:** None (inline styles or layout.css)  
**HTML:** `location.html`

---

## Script Loading Pattern

### Standard Page
```html
<script src="js/main.js"></script>
```

### Blog Page
```html
<script src="js/main.js"></script>
<script src="js/blog-config-adult.js"></script>
<script src="js/blog-discovery.js"></script>
```

### Therapeutic Tool Page
```html
<script src="js/main.js"></script>
<script src="js/tools-breathing.js"></script>
```

**Load Order Matters:** Always load `main.js` first, then page-specific scripts.

---

## Coding Conventions

### IIFE Structure
```javascript
(function initFeatureName() {
  // Private variables
  let state = {};
  
  // DOM references
  const element = document.querySelector('.selector');
  if (!element) return;
  
  // Event listeners
  function handleClick(e) {
    // Handler logic
  }
  
  // Initialization
  function init() {
    element.addEventListener('click', handleClick);
  }
  
  init();
})();
```

### Best Practices

✅ **Do:**
- Wrap all code in IIFE
- Check for element existence before operating
- Use `const` and `let`, never `var`
- Add cleanup on page unload (if needed)
- Support keyboard navigation
- Respect `prefers-reduced-motion`
- Use semantic event names

❌ **Don't:**
- Pollute global scope
- Assume elements exist
- Use jQuery or other libraries
- Control layout via JavaScript (use CSS)
- Block main thread with heavy computation
- Forget to remove event listeners (if dynamic)

---

## Accessibility Considerations

All scripts must:

1. **Support Keyboard Navigation**
   - Tab through interactive elements
   - Enter/Space to activate
   - Escape to close/dismiss

2. **Manage Focus**
   - Move focus to opened panels
   - Return focus on close
   - Trap focus in modals

3. **Announce Changes**
   - Use `aria-live` regions for dynamic content
   - Update `aria-expanded` for toggles
   - Set `aria-hidden` appropriately

4. **Respect User Preferences**
   - Check `prefers-reduced-motion`
   - Provide pause/stop for animations
   - Allow extended time limits

---

## Performance Guidelines

1. **Debounce Scroll/Resize Events**
   ```javascript
   let ticking = false;
   window.addEventListener('scroll', () => {
     if (!ticking) {
       requestAnimationFrame(() => {
         // Handle scroll
         ticking = false;
       });
       ticking = true;
     }
   }, { passive: true });
   ```

2. **Use Passive Event Listeners**
   ```javascript
   element.addEventListener('touchstart', handler, { passive: true });
   ```

3. **Lazy Load Heavy Features**
   ```javascript
   if ('IntersectionObserver' in window) {
     // Use IntersectionObserver
   } else {
     // Fallback
   }
   ```

4. **Clean Up Listeners**
   ```javascript
   window.addEventListener('unload', () => {
     element.removeEventListener('click', handler);
   });
   ```

---

## Testing Checklist

Before deploying any script:

- [ ] Works without JavaScript (progressive enhancement)
- [ ] Keyboard accessible (tab, enter, escape)
- [ ] Screen reader compatible (ARIA attributes)
- [ ] Mobile touch friendly
- [ ] Respects reduced motion preference
- [ ] No console errors
- [ ] No memory leaks (check DevTools)
- [ ] Performs well on slow devices
- [ ] Degrades gracefully in older browsers

---

## Debugging Tips

1. **Check Console:** Look for errors in browser DevTools
2. **Verify Selectors:** Ensure CSS selectors match HTML
3. **Test Without JS:** Disable JavaScript to verify baseline
4. **Use Breakpoints:** Set breakpoints in DevTools Sources tab
5. **Log State:** Add `console.log()` for state debugging
6. **Check Network:** Verify scripts are loading (no 404s)

---

## Related Directories

- `/css/` — Core stylesheets
- `/css-tools/` — Tool-specific stylesheets
- `/res/` — Static resources
- `/blog/` — Blog content and templates

---

## Future Enhancements

Potential additions:

1. **Service Worker:** Offline support for tools
2. **Analytics:** Privacy-respecting usage tracking
3. **Form Validation:** Client-side validation with accessible errors
4. **Search:** Site-wide search functionality
5. **Notifications:** Toast notifications for user feedback
6. **State Management:** Simple state store for complex tools

Any additions should follow existing patterns and maintain the vanilla JS, no-framework philosophy.
