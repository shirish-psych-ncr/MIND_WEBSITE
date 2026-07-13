# Testing Checklist - Mind Grace Neuropsychiatric Clinic

## Overview
This document provides comprehensive testing procedures for the Mind Grace Clinic website (mindgracencr.in). All tests should be performed before each deployment.

---

## 1. Functional Testing

### 1.1 Navigation & Links
- [ ] All main navigation links work on desktop
- [ ] All main navigation links work on mobile
- [ ] Footer links are functional
- [ ] Breadcrumb navigation works on all pages
- [ ] Skip links function correctly (press Tab on page load)
- [ ] No broken internal links (run link checker)
- [ ] External links open in new tabs where appropriate

### 1.2 Forms
- [ ] Contact form submits successfully
- [ ] Form validation messages appear correctly
- [ ] Required field validation works
- [ ] Email format validation works
- [ ] Form success message displays after submission
- [ ] Form error handling works (network failures)

### 1.3 Interactive Elements
- [ ] All buttons are clickable and provide feedback
- [ ] Dropdown menus open/close correctly
- [ ] Modal dialogs open and close properly
- [ ] Accordion/collapse sections work
- [ ] Image galleries/lightboxes function
- [ ] Therapeutic tools load and operate correctly:
  - [ ] Butterfly Tapper
  - [ ] Eye Movement
  - [ ] Guided Breathing
  - [ ] Horizon Scan
  - [ ] Hypnos Fractal
  - [ ] Leaf on Stream

---

## 2. Responsive Design Testing

### 2.1 Breakpoint Verification
Test at the following viewport widths:

| Device | Width | Status |
|--------|-------|--------|
| Mobile (small) | 320px | [ ] |
| Mobile (large) | 375px | [ ] |
| Tablet (portrait) | 768px | [ ] |
| Tablet (landscape) | 1024px | [ ] |
| Desktop (small) | 1280px | [ ] |
| Desktop (large) | 1920px | [ ] |

### 2.2 Layout Checks
- [ ] No horizontal scrolling on any device
- [ ] Text remains readable at all sizes
- [ ] Images scale appropriately
- [ ] Navigation menu collapses to hamburger on mobile
- [ ] Footer stacks correctly on mobile
- [ ] Cards/grids reflow properly

---

## 3. Browser Compatibility Matrix

### 3.1 Desktop Browsers

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | Latest | [ ] | |
| Firefox | Latest | [ ] | |
| Safari | Latest | [ ] | macOS only |
| Edge | Latest | [ ] | |
| Opera | Latest | [ ] | Optional |

### 3.2 Mobile Browsers

| Browser | Platform | Version | Status |
|---------|----------|---------|--------|
| Safari | iOS | Latest | [ ] |
| Chrome | Android | Latest | [ ] |
| Samsung Internet | Android | Latest | [ ] |
| Firefox | iOS/Android | Latest | [ ] |

### 3.3 Critical Features to Test Per Browser
- [ ] CSS Grid/Flexbox layout renders correctly
- [ ] WebP images display properly
- [ ] Custom fonts load correctly
- [ ] JavaScript interactions work smoothly
- [ ] Forms submit without errors
- [ ] Video/audio elements play (if applicable)

---

## 4. Accessibility Testing (WCAG 2.1 AA)

### 4.1 Automated Testing
- [ ] Run axe DevTools extension - 0 critical violations
- [ ] Run WAVE extension - 0 critical errors
- [ ] Run Lighthouse accessibility audit - Score ≥90
- [ ] Validate HTML with W3C validator - 0 errors

### 4.2 Manual Testing

#### Keyboard Navigation
- [ ] All interactive elements reachable via Tab key
- [ ] Focus order is logical and sequential
- [ ] Focus indicators are visible on all elements
- [ ] No keyboard traps (can navigate away from all components)
- [ ] Skip link allows bypassing navigation
- [ ] Modal dialogs trap focus correctly

#### Screen Reader Testing
- [ ] Page title is descriptive (test with NVDA/JAWS/VoiceOver)
- [ ] All images have appropriate alt text
- [ ] Form labels are announced correctly
- [ ] ARIA landmarks are properly defined
- [ ] Dynamic content changes are announced
- [ ] Headings provide meaningful structure

#### Visual Accessibility
- [ ] Color contrast ratio ≥4.5:1 for normal text
- [ ] Color contrast ratio ≥3:1 for large text
- [ ] Content accessible with `prefers-reduced-motion` enabled
- [ ] Page works at 200% zoom without loss of functionality
- [ ] No information conveyed by color alone

### 4.3 ARIA Implementation
- [ ] `lang="en-IN"` attribute present on `<html>`
- [ ] `role="navigation"` on nav elements
- [ ] `role="main"` on main content area
- [ ] `role="contentinfo"` on footer
- [ ] `aria-label` on interactive elements without visible labels
- [ ] `aria-expanded` on collapsible sections
- [ ] `aria-live` regions for dynamic content

---

## 5. Performance Testing

### 5.1 Lighthouse Audits
Run on homepage and key inner pages:

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| / (Home) | [ ] ≥90 | [ ] ≥90 | [ ] ≥90 | [ ] ≥90 |
| /about | [ ] ≥90 | [ ] ≥90 | [ ] ≥90 | [ ] ≥90 |
| /services | [ ] ≥90 | [ ] ≥90 | [ ] ≥90 | [ ] ≥90 |
| /contact | [ ] ≥90 | [ ] ≥90 | [ ] ≥90 | [ ] ≥90 |
| /doctors | [ ] ≥90 | [ ] ≥90 | [ ] ≥90 | [ ] ≥90 |

### 5.2 Core Web Vitals
Target scores (measured on 4G connection, mid-tier mobile):

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| LCP (Largest Contentful Paint) | <2.5s | [ ] | [ ] |
| FID (First Input Delay) | <100ms | [ ] | [ ] |
| CLS (Cumulative Layout Shift) | <0.1 | [ ] | [ ] |

### 5.3 Resource Loading
- [ ] All images use WebP format
- [ ] Hero images have `fetchpriority="high"`
- [ ] Non-critical images have `loading="lazy"`
- [ ] CSS files are minified
- [ ] JavaScript files use `defer` or `type="module"`
- [ ] Font files have `preconnect` links
- [ ] No console.log statements in production

### 5.4 Page Weight Targets
| Resource Type | Target | Actual |
|---------------|--------|--------|
| Total page size | <2MB | [ ] |
| HTML | <100KB | [ ] |
| CSS | <200KB | [ ] |
| JavaScript | <500KB | [ ] |
| Images | <1MB | [ ] |
| Fonts | <200KB | [ ] |

---

## 6. Security Testing

### 6.1 Basic Security Checks
- [ ] HTTPS enforced (no mixed content warnings)
- [ ] No sensitive data in URL parameters
- [ ] Form inputs sanitized against XSS
- [ ] CSRF tokens on forms (if applicable)
- [ ] Content Security Policy headers present
- [ ] X-Frame-Options header set
- [ ] X-Content-Type-Options header set

### 6.2 Dependency Audit
- [ ] Run `npm audit` (if applicable) - 0 high/critical vulnerabilities
- [ ] Vendor libraries are latest stable versions
- [ ] Subresource Integrity (SRI) hashes on CDN resources

---

## 7. SEO Testing

### 7.1 On-Page SEO
- [ ] Unique `<title>` tag on every page (50-60 characters)
- [ ] Unique meta description on every page (150-160 characters)
- [ ] H1 tag present and unique per page
- [ ] Heading hierarchy (H1→H2→H3) is logical
- [ ] Canonical URLs specified on all pages
- [ ] Robots.txt allows crawling of public pages
- [ ] Sitemap.xml includes all important pages

### 7.2 Structured Data
- [ ] JSON-LD schema present on all content pages
- [ ] Schema validates in Google Rich Results Test
- [ ] MedicalClinic schema on homepage
- [ ] Physician schema on doctor profiles
- [ ] BlogPosting schema on blog articles
- [ ] WebApplication schema on tools

### 7.3 Social Media
- [ ] OpenGraph tags present on all pages
- [ ] Twitter Card meta tags present
- [ ] OG image displays correctly (1200x630px)
- [ ] Test sharing on Facebook/Twitter/LinkedIn

---

## 8. Content Testing

### 8.1 Text Content
- [ ] No spelling or grammar errors
- [ ] Phone numbers are clickable (tel: links)
- [ ] Email addresses are clickable (mailto: links)
- [ ] Addresses are accurate and complete
- [ ] Doctor credentials are up-to-date
- [ ] Service descriptions are accurate

### 8.2 Media
- [ ] All images display correctly
- [ ] Image alt text is descriptive
- [ ] Videos play correctly (if applicable)
- [ ] Audio plays correctly (if applicable)
- [ ] No broken image links

---

## 9. Therapeutic Tools Testing

### 9.1 Butterfly Tapper
- [ ] Tool loads without errors
- [ ] Tapping animation works smoothly
- [ ] Speed controls function
- [ ] Start/stop buttons work
- [ ] Responsive on mobile

### 9.2 Eye Movement
- [ ] Ball movement is smooth
- [ ] Speed/direction controls work
- [ ] Timer functions correctly
- [ ] Fullscreen mode works
- [ ] No motion sickness triggers

### 9.3 Guided Breathing
- [ ] Animation syncs with breathing pattern
- [ ] Customizable breath duration
- [ ] Audio guidance works (if enabled)
- [ ] Pause/resume functions
- [ ] Works on mobile

### 9.4 Horizon Scan
- [ ] Panoramic image loads
- [ ] Scrolling is smooth
- [ ] Zoom function works
- [ ] Mobile touch gestures work

### 9.5 Hypnos Fractal
- [ ] Fractal animation renders
- [ ] Color controls function
- [ ] Speed adjustments work
- [ ] No performance issues

### 9.6 Leaf on Stream
- [ ] Animation is calming and smooth
- [ ] Leaf spawning works
- [ ] Interaction (clicking leaves) works
- [ ] No memory leaks over time

---

## 10. Regression Testing Checklist

After any code change, verify:

### 10.1 Critical Paths
- [ ] Homepage loads correctly
- [ ] Navigation to all main sections works
- [ ] Contact form can be submitted
- [ ] All 6 therapeutic tools load
- [ ] Blog articles are readable
- [ ] Doctor profiles display correctly

### 10.2 Mobile-Specific
- [ ] Hamburger menu opens/closes
- [ ] Touch targets are ≥44px
- [ ] No horizontal scroll
- [ ] Tap vs hover states work correctly

### 10.3 Print Stylesheet
- [ ] Print view hides navigation
- [ ] Print view shows content clearly
- [ ] URLs are visible for links
- [ ] Background colors/images optimized for print

---

## 11. Testing Tools & Resources

### Recommended Tools
- **Browser DevTools**: Chrome, Firefox, Safari
- **Accessibility**: axe DevTools, WAVE, Lighthouse
- **Performance**: WebPageTest, GTmetrix, PageSpeed Insights
- **Responsive Design**: BrowserStack, Responsively App
- **SEO**: Google Search Console, Screaming Frog
- **HTML Validation**: W3C Markup Validator
- **Link Checking**: Broken Link Checker extension

### Testing Environments
- **Local**: localhost development server
- **Staging**: staging.mindgracencr.in (if available)
- **Production**: mindgracencr.in

---

## 12. Sign-Off

### Pre-Deployment Approval
Before deploying to production, ensure:

- [ ] All critical tests passed
- [ ] All high-priority bugs resolved
- [ ] Performance metrics meet targets
- [ ] Accessibility score ≥90
- [ ] SEO checklist complete
- [ ] Content reviewed and approved

**Tested By:** _________________  
**Date:** _________________  
**Approved By:** _________________  
**Date:** _________________  

---

## Appendix A: Known Issues & Workarounds

*(Document any known issues that are accepted risks)*

| Issue | Severity | Workaround | Status |
|-------|----------|------------|--------|
| None currently | N/A | N/A | N/A |

---

## Appendix B: Browser Support Policy

**Supported Browsers:**
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome for Android (last 2 versions)

**Graceful Degradation:**
- Older browsers may not see advanced CSS effects
- JavaScript features polyfilled where critical
- Core content accessible in all browsers

---

*Last Updated: $(date +%Y-%m-%d)*  
*Version: 1.0*
