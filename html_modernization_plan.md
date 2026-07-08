# HTML Modernization Plan - Phase 4: Resource Hints & Performance Optimization

## Based on check3.md Adaptability Techniques

### Priority 1: Resource Hints (Critical for Core Web Vitals)
- **Preload critical assets**: Logo, above-fold CSS, hero images
- **Preconnect to external origins**: Google Fonts, analytics
- **Prefetch navigation links**: Next likely pages
- **DNS-prefetch third-party domains**: CDNs, APIs

### Priority 2: Image Loading Strategy
- **fetchpriority="high"**: Above-fold hero images
- **loading="eager"**: Critical visible images
- **loading="lazy"**: Below-fold images
- **decoding="async"**: All images for non-blocking decode

### Priority 3: Script Loading Optimization
- **defer**: Non-critical scripts
- **async**: Analytics, independent scripts
- **type="module"**: Modern ES6 modules
- **nomodule fallback**: Legacy browser support

### Priority 4: Font Loading
- **font-display: swap**: In CSS already
- **preload woff2**: Critical fonts
- **unicode-range**: Subset font loading

### Priority 5: PWA Enhancements
- **manifest.json link**: Already present
- **theme-color meta tags**: Already present
- **apple-touch-icon**: iOS specific
- **mask-icon**: Safari pinned tab

### Files to Update (50 total):
1. index.html - Add preconnect, prefetch
2. All blog pages - Add resource hints
3. Tool pages - Preload tool-specific assets
4. Static pages - Optimize script loading

## Implementation Checklist
- [ ] Add preconnect for Google Fonts
- [ ] Add preload for critical CSS
- [ ] Add fetchpriority to hero images
- [ ] Add defer to non-critical JS
- [ ] Add dns-prefetch for third parties
- [ ] Verify all images have loading attribute
- [ ] Add apple-touch-icon for iOS
- [ ] Optimize font loading strategy
