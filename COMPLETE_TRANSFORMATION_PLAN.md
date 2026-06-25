# Complete Asset Extraction & HTML Cleanup Plan

## Phase 1: Extract Inline CSS/JS from Tool Pages
### Files to process:
1. ✅ butterfly-tapper.html (DONE)
2. ✅ guided-breathing.html (DONE) 
3. eye-movement.html - Extract to tools-eye.css/js
4. leaf-on-stream.html - Extract to tools-leaf.css/js
5. horizon-scan.html - Extract to tools-horizon.css/js
6. hypnos-fractal.html - Extract to tools-fractal.css/js
7. book.html - Extract form styles/scripts to tools-book.css/js
8. location.html - Merge small script into app.js

## Phase 2: Update All HTML Files with External References
- Remove all `<style>` blocks
- Remove all `<script>` blocks (except essential app.js reference)
- Add proper `<link>` and `<script src="">` tags
- Ensure clean, semantic HTML structure

## Phase 3: Apply Global Transformation Directives
### A. Header & Navigation
- Static/clean sticky header with Shadow Grey background
- Logo left, CTA right
- Remove sticky bottom nav
- Add contact info bar

### B. Color Palette Enforcement
- Backgrounds: White (primary), Icy Aqua (alternating), Shadow Grey (Hero/Footer)
- Typography: Shadow Grey (body), Steel Blue (headings), Grey (meta only)
- Accents: Petal Pink (CTAs), Powder Blue (borders)

### C. Layout Improvements
- Single-column mobile flow
- Generous vertical padding between sections
- No overlapping elements
- De-clutter "card soup"

### D. Hero Section
- Shadow Grey bg, white text
- Prominent Petal Pink CTA
- Doctor image without text overlay

### E. Content Sections
- Replace cards with typography/whitespace
- Rebuild infographics in HTML (no text-in-images)
- Consolidate repetitive content

### F. Footer
- Shadow Grey bg
- Standard links + contact info
- Final CTA button

## Execution Order:
1. Extract remaining tool assets (eye, leaf, horizon, fractal, book)
2. Update all tool HTMLs to use external assets
3. Update main site HTMLs (index, about, services, conditions, etc.)
4. Update blog pages
5. Verify all pages have clean HTML + proper asset references
6. Apply transformation styling changes to styles.css
7. Test responsiveness and accessibility
