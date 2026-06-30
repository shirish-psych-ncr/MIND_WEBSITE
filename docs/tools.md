# TOOL_SPEC [v1.0]
**Mode:** Machine-Readable | **Format:** Dense-Table | **Update:** Auto(post-turn)

## 1. THERAPEUTIC_TOOLS (7 interactive modules)

### 1.1 Breathing Tool (tools-breathing.*)
| Aspect | Spec |
|---|---|
| Purpose | Guided box breathing, 4-4-4-4 technique |
| CSS | tools-breathing.css (1.8KB, circle animation, color transitions) |
| JS | tools-breathing.js (2.4KB, timing logic, state management) |
| Hydration | client:visible (load when scrolled into view) |
| A11y | aria-live="polite" for instructions, keyboard start/stop |
| Motion | Respects prefers-reduced-motion (static fallback) |
| UX | Start/Stop buttons, visual pacer, text cues ("Breathe in", "Hold") |

### 1.2 Butterfly Tapper (tools-butterfly.*)
| Aspect | Spec |
|---|---|
| Purpose | EMDR bilateral stimulation (self-tapping) |
| CSS | tools-butterfly.css (4.8KB, butterfly wings, alternating fade) |
| JS | tools-butterfly.js (7.9KB, tap detection, speed control, session timer) |
| Hydration | client:visible |
| A11y | Button alternatives for motor impairments, audio cues optional |
| Motion | Alternating left/right opacity, configurable speed |
| UX | Speed slider (slow/med/fast), session length, haptic feedback (mobile) |

### 1.3 Eye Movement (tools-eye.*)
| Aspect | Spec |
|---|---|
| Purpose | EMDR eye movement tracking |
| CSS | tools-eye.css (1.7KB, moving dot/path animation) |
| JS | tools-eye.js (1.1KB, path control, speed, direction) |
| Hydration | client:visible |
| A11y | Keyboard navigation for dot control, audio alternatives |
| Motion | Horizontal/vertical/diagonal paths, speed control |
| UX | Path selector, speed slider, start/pause/reset |

### 1.4 Fractal Hypnosis (tools-fractal.*)
| Aspect | Spec |
|---|---|
| Purpose | Hypnotic fractal patterns for relaxation |
| CSS | tools-fractal.css (4.1KB, mandala patterns, rotation, pulse) |
| JS | tools-fractal.js (4.6KB, pattern generation, color cycling) |
| Hydration | client:visible |
| A11y | Reduced motion mode (static fractal), color blind safe palettes |
| Motion | Slow rotation, expanding/contracting, color shifts |
| UX | Pattern selector, color theme, speed, fullscreen option |

### 1.5 Horizon Scan (tools-horizon.*)
| Aspect | Spec |
|---|---|
| Purpose | Grounding exercise, panoramic visual scanning |
| CSS | tools-horizon.css (2.1KB, gradient sky, horizon line, clouds) |
| JS | tools-horizon.js (1.5KB, parallax scroll, cloud drift) |
| Hydration | client:visible |
| A11y | Screen reader descriptions of scene, keyboard pan control |
| Motion | Slow cloud drift, subtle parallax on mouse/touch move |
| UX | Time of day toggle (dawn/day/dusk), sound toggle (optional) |

### 1.6 Leaf on Stream (tools-leaf.*)
| Aspect | Spec |
|---|---|
| Purpose | Mindfulness meditation (thoughts as leaves on stream) |
| CSS | tools-leaf.css (7.5KB, stream gradient, leaf SVG, ripple effects) |
| JS | tools-leaf.js (25.7KB, physics simulation, leaf spawning, drag interaction) |
| Hydration | client:visible (largest tool, lazy load) |
| A11y | Text input alternative for "write thought", screen reader announcements |
| Motion | Leaf float downstream, gentle bobbing, ripples on click |
| UX | Add thought button, clear all, stream speed, leaf color picker |

### 1.7 Resource Book (tools-book.*)
| Aspect | Spec |
|---|---|
| Purpose | Psychoeducation library, resource navigation |
| CSS | tools-book.css (1.8KB, book layout, page flip animation) |
| JS | tools-book.js (0.7KB, page navigation, search, bookmarks) |
| Hydration | client:idle (non-critical, load after main content) |
| A11y | Semantic HTML book structure, skip links, search with aria-live |
| Motion | Optional page flip animation (can be disabled) |
| UX | Table of contents, search, bookmark pages, font size toggle |

## 2. HYDRATION_MATRIX (Summary)
| Tool | Directive | Trigger | JS Cost | Priority |
|---|---|---|---|---|
| Breathing | client:visible | Scroll | 2.4KB | P1 (Anxiety relief) |
| Butterfly | client:visible | Scroll | 7.9KB | P1 (EMDR) |
| Eye Movement | client:visible | Scroll | 1.1KB | P1 (EMDR) |
| Fractal | client:visible | Scroll | 4.6KB | P2 (Relaxation) |
| Horizon | client:visible | Scroll | 1.5KB | P2 (Grounding) |
| Leaf | client:visible | Scroll | 25.7KB | P3 (Mindfulness, large) |
| Book | client:idle | Post-load | 0.7KB | P4 (Resources) |

## 3. SHARED_PATTERNS
```js
// Common tool lifecycle
class TherapeuticTool {
  constructor(root, options) {
    this.root = root;
    this.state = 'idle'; // idle, running, paused, complete
    this.options = { reducedMotion: false, ...options };
    this.init();
  }
  init() { /* Setup DOM, events, reduced motion check */ }
  start() { /* Begin exercise */ }
  pause() { /* Pause state */ }
  reset() { /* Return to initial state */ }
  destroy() { /* Cleanup listeners, animations */ }
}

// Reduced motion detection
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Intersection Observer for hydration
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.dataset.hydrate = 'true';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
```

## 4. ACCESSIBILITY_CHECKLIST (Per Tool)
- [ ] Keyboard operable (Tab, Enter, Space, Arrow keys)
- [ ] Screen reader compatible (aria-labels, aria-live regions)
- [ ] Focus visible (2px solid outline, high contrast)
- [ ] Reduced motion support (@media query fallback)
- [ ] Color contrast ≥ 3:1 (UI elements), ≥ 4.5:1 (text)
- [ ] Touch targets ≥ 44×44px
- [ ] No auto-play (user initiates all interactions)
- [ ] Clear instructions (plain language, Grade 8-10)

## 5. PERFORMANCE_BUDGET (Per Tool)
| Metric | Budget | Current | Status |
|---|---|---|---|
| JS (gzipped) | <10KB | 44KB total | ✓ |
| CSS | <3KB | 24KB total | ✓ |
| Load time | <500ms | - | TODO: Measure |
| Interaction latency | <100ms | - | TODO: Measure |

*Ref: /css-tools/*, /js/tools-*.*, tool pages. Auto-update on tool changes. Cross-ref: Instructions.md §KB_READ, memory.md §STATE, design.md §6-§8, worker.md §2-§4. END_ON_SYNC.*
