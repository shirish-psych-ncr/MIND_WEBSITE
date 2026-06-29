# 🎨 CSS Component Library (v2.0)

## 1. Base Components (`base.css`)

### CSS Variables
```css
:root {
  /* Colors */
  --primary: #3a7ca5;       /* Teal - Main brand */
  --secondary: #e8dccf;     /* Warm Sand - Aasha/Child */
  --accent: #6b4c63;        /* Plum - Interactive */
  --emergency: #dc2626;     /* Red - Crisis */
  --text-primary: #2d1f28;
  --text-muted: #8a6a7f;
  --bg-surface: #fef9f3;    /* Cream */
  --bg-white: #ffffff;
  
  /* Spacing */
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-serif: 'Playfair Display', serif;
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}
```

### Reset & Global
- Box-sizing: border-box
- Margin: 0 on body
- Line-height: 1.6 on body
- Image max-width: 100%

---

## 2. Layout Components (`layout.css`)

### Header
- **Class:** `.site-header`
- **Features:** Sticky positioning, backdrop-blur, mobile toggle
- **Mobile:** Overlay menu with scale-in animation

### Footer
- **Class:** `.site-footer`
- **Layout:** 4-column grid (auto-fit minmax 200px)
- **Content:** Logo, Quick Links, Contact, Social

### Container
- **Class:** `.container`
- **Max-width:** 1200px
- **Padding:** `clamp(1rem, 5vw, 2rem)`

### Grid Utilities
- `.grid`, `.grid-2`, `.grid-3`, `.grid-4`
- Auto-fit with `minmax(280px, 1fr)`

---

## 3. Page-Specific Components (`components.css`)

### Cards
| Class | Use | Features |
|---|---|---|
| `.service-card` | Services, Conditions | Icon, title, desc, hover lift |
| `.testimonial-card` | Reviews | Star rating, quote, author |
| `.condition-card` | Conditions list | Icon gradient, learn more link |
| `.feature-card` | About/Approach | Centered icon, short text |
| `.contact-card` | Contact page | Large icon, info text |
| `.pillar-card` | Approach page | Bio/Psycho/Social pillars |
| `.program-card` | Aasha page | Initiative details |

### Specialized Layouts
| Class | Use | Features |
|---|---|---|
| `.timeline` | Doctor bio | Vertical line, numbered markers |
| `.service-comparison-grid` | Doctors page | 2-col split Psychiatrist vs Psychologist |
| `.jump-button` | Doctors page | Smooth scroll trigger |
| `.clinician-section` | Doctors page | Distinct visual blocks |
| `.impact-stats` | Aasha page | Animated counter grid |
| `.stat-counter` | Aasha page | Large number typography |
| `.services-grid` | Services page | Auto-fit 3-col |
| `.features-grid` | About page | 3-col feature list |
| `.gallery-grid` | About/Gallery | Masonry-style images |
| `.pricing-table` | Fees page | Clean rows, highlight popular |
| `.process-timeline` | Process page | Step-by-step journey |
| `.contact-grid` | Contact page | Info cards + form |
| `.accordion` | FAQ/Process | Expandable Q&A |

### Forms
| Class | Use | Features |
|---|---|---|
| `.contact-form` | Contact/Book | Styled inputs, labels |
| `.form-group` | All forms | Spacing, error states |
| `.checkbox-group` | Consent | Custom checkbox styling |
| `.button-primary` | CTAs | Gradient bg, hover |
| `.button-secondary` | Secondary | Outline style |
| `.button-large` | Hero CTAs | Extra padding |

### Alerts & Notices
| Class | Use | Features |
|---|---|---|
| `.alert` | General notices | Colored bg, icon |
| `.alert-warning` | Emergency | Red bg, high contrast |
| `.notice-box` | Info boxes | Gradient bg, rounded |
| `.emergency-alert` | Crisis pages | Max contrast, large text |

### Navigation Helpers
| Class | Use | Features |
|---|---|---|
| `.section-badge` | Category headers | Small caps, colored |
| `.content-narrow` | Text sections | Max-width 700px |
| `.cta-group` | Button groups | Flex gap, wrap |
| `.check-list` | Feature lists | Checkmark icons |

---

## 4. Utility Classes (`utilities.css`)

### Text
- `.text-center`, `.text-left`, `.text-right`
- `.text-muted`, `.text-primary`
- `.lead` (large intro text)

### Spacing
- `.mt-4`, `.mb-4`, `.my-8` (margins)
- `.pt-4`, `.pb-4`, `.py-8` (padding)
- `.gap-4`, `.gap-6` (flex/grid gap)

### Visibility
- `.visually-hidden` (screen reader only)
- `.hide-mobile`, `.hide-desktop`

### Display
- `.flex`, `.flex-col`, `.items-center`, `.justify-between`
- `.grid`, `.grid-cols-2`, `.grid-cols-3`

---

## 5. Animations (`animations.css`)

### Keyframes
- `fadeIn`: Opacity 0→1
- `slideUp`: TranslateY 20px→0
- `scaleIn`: Scale 0.9→1
- `pulse`: Subtle scale for CTAs
- `countUp`: Number animation (JS-driven)

### Transitions
- Default: `0.3s ease`
- Hover: `transform 0.3s ease, box-shadow 0.3s ease`
- Focus: `border-color 0.2s ease, box-shadow 0.2s ease`

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

## 6. Responsive Patterns

### Mobile-First Defaults
- Single column layouts
- Stacked hero sections
- Full-width buttons
- Mobile nav popup

### Landscape/Desktop Enhancements
- 2-3 column grids
- Side-by-side hero
- Desktop horizontal nav
- Footer multi-column

### Fluid Typography
All headings use `clamp(min, vw, max)`:
- H1: `clamp(2rem, 4vw, 3.5rem)`
- H2: `clamp(1.75rem, 3vw, 2.5rem)`
- H3: `clamp(1.5rem, 2vw, 2rem)`

---

## 7. Accessibility Standards

### Focus States
- 2px solid outline
- Offset: 2px
- Color: `--primary` or `--accent`

### Touch Targets
- Minimum: 44×44px
- Padding: `--space-2` minimum

### Contrast Ratios
- Text: ≥4.5:1
- UI Elements: ≥3:1
- Emergency: High contrast mode available

### ARIA Support
- Accordion: `aria-expanded`, `aria-controls`
- Mobile Nav: `aria-haspopup`, `aria-label`
- Skip Links: First focusable element

---

*Ref: design.md §1-§9, ARCHITECTURE.md §3. Updated v2.0 with dual-clinician patterns.*
