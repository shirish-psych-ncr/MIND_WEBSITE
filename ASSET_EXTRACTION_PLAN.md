# Asset Extraction Plan - Mind Grace Clinic

## Objective
Extract all inline `<style>` and `<script>` blocks from HTML files to external CSS and JS files for cleaner, maintainable code.

## Directory Structure Created
```
/workspace/
├── css-tools/          # Tool-specific stylesheets
│   └── tools-*.css
├── js/
│   ├── tools/          # Tool-specific JavaScript
│   │   └── tools-*.js
│   └── app.js          # Existing main app JS
└── *.html              # Cleaned HTML files
```

## Files Requiring Extraction

### 1. butterfly-tapper.html
- **CSS:** `/workspace/css-tools/tools-butterfly.css` ✓ DONE
- **JS:** `/workspace/js/tools-butterfly.js` ✓ DONE
- **Status:** Assets created, HTML needs updating

### 2. guided-breathing.html  
- **CSS:** Needs extraction (lines ~130-265)
- **JS:** Needs extraction (lines ~267-340)
- **Target Files:** `tools-breathing.css`, `tools-breathing.js`

### 3. eye-movement.html
- **CSS:** Needs extraction (lines ~14-125)
- **JS:** Needs extraction (lines ~195-250)
- **Target Files:** `tools-eye.css`, `tools-eye.js`

### 4. leaf-on-stream.html
- **CSS:** Needs extraction (large block, lines ~8-250+)
- **JS:** Needs extraction (large block, lines ~250-end)
- **Target Files:** `tools-leaf.css`, `tools-leaf.js`

### 5. horizon-scan.html
- **CSS:** Needs extraction (lines ~10-85)
- **JS:** Needs extraction (lines ~145-end)
- **Target Files:** `tools-horizon.css`, `tools-horizon.js`

### 6. hypnos-fractal.html
- **CSS:** Needs extraction (lines ~11-100+)
- **JS:** Needs extraction (lines ~160-end)
- **Target Files:** `tools-fractal.css`, `tools-fractal.js`

### 7. book.html
- **CSS:** Needs extraction (lines ~11-86)
- **JS:** Needs extraction (lines ~257-end)
- **Target Files:** `tools-book.css`, `tools-book.js`

### 8. location.html
- **JS:** Small inline script (lines ~173-183)
- **Target:** Can merge into existing app.js or keep minimal inline

## Next Steps

1. **Extract remaining CSS/JS** from each file
2. **Update HTML files** to reference external assets:
   ```html
   <!-- Replace inline <style> with -->
   <link rel="stylesheet" href="css-tools/tools-NAME.css">
   
   <!-- Replace inline <script> with -->
   <script src="js/tools-NAME.js"></script>
   ```
3. **Test each page** to ensure functionality is preserved
4. **Apply global style changes** per the transformation directives

## Color Palette Reference (for future styling)
- **Shadow Grey:** `#010204` (Hero/Footer bg, primary text)
- **Steel Blue:** For headings
- **Petal Pink:** CTA buttons
- **Powder Blue:** Subtle borders
- **Icy Aqua:** Alternating section backgrounds
- **White:** Primary background

