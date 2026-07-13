# Maintenance Guide - Mind Grace Neuropsychiatric Clinic Website

## Overview

This guide provides instructions for ongoing maintenance, updates, and troubleshooting of the Mind Grace Clinic website. The site is built with modern web standards (HTML5, CSS3, ES6+ JavaScript) without frameworks, making it lightweight and easy to maintain.

---

## Technology Stack Reference

| Component | Technology | Location |
|-----------|------------|----------|
| **Markup** | HTML5 (Semantic) | Root directory (23 pages), blog/ (3 pages), tools/ (6 pages) |
| **Styling** | CSS3 (Modular) | assets/css/ (5 core + 7 tool stylesheets) |
| **Interactivity** | Vanilla JavaScript (ES6+) | assets/js/ (20 custom modules) |
| **Icons** | Lucide Icons (SVG) | assets/vendor/lucide.min.js |
| **Fonts** | Google Fonts (Inter, Playfair Display) | Preconnected in <head> |
| **Deployment** | GitHub Pages | Automatic on git push |
| **Domain** | mindgracencr.in | DNS managed externally |

---

## Routine Maintenance Tasks

### Weekly Tasks

#### 1. Content Accuracy Check
- [ ] Review homepage for outdated information
- [ ] Verify doctor availability and timings
- [ ] Check contact information accuracy
- [ ] Review service descriptions

#### 2. Link Validation
```bash
# Use a link checker tool
npm install -g broken-link-checker
blc https://mindgracencr.in/ --exclude "mailto: tel:"
```

#### 3. Performance Spot-Check
- Run Lighthouse on homepage
- Target scores: Performance 90+, Accessibility 95+
- Document any regressions

### Monthly Tasks

#### 1. Security Updates
- [ ] Review vendor libraries for security advisories
- [ ] Check GitHub Dependabot alerts
- [ ] Update lucide.min.js if new version available
- [ ] Verify HTTPS certificate validity

#### 2. Browser Compatibility Testing
Test on latest versions of:
- Chrome (Windows, Mac, Android)
- Firefox (Windows, Mac, Linux)
- Safari (Mac, iOS)
- Edge (Windows)
- Samsung Internet (Android)

#### 3. Accessibility Audit
- [ ] Keyboard navigation test (Tab through all pages)
- [ ] Screen reader test (NVDA or VoiceOver)
- [ ] Color contrast verification
- [ ] Focus indicator visibility

#### 4. Content Updates
- [ ] Add new blog articles (if applicable)
- [ ] Update testimonials
- [ ] Refresh gallery images
- [ ] Review FAQ section

### Quarterly Tasks

#### 1. Comprehensive Performance Audit
```bash
# Run PageSpeed Insights API
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://mindgracencr.in/&strategy=mobile&key=YOUR_API_KEY"
```

Target Core Web Vitals:
- **LCP (Largest Contentful Paint):** <2.5s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1

#### 2. SEO Review
- [ ] Check Google Search Console for errors
- [ ] Review indexed pages count
- [ ] Analyze search queries and impressions
- [ ] Update sitemap.xml if new pages added
- [ ] Verify structured data with Google Rich Results Test

#### 3. Vendor Library Updates
Current vendors:
- `lucide.min.js` - Icon library
- `splide.min.js` - Carousel/slider
- `ky.min.js` - HTTP client
- `navigo.min.js` - Router (if used)
- `preact-signals.min.js` - State management (if used)

Update procedure:
```bash
# Download new version
cd assets/vendor
wget [new-version-url]

# Test thoroughly on staging
# Update version references in HTML files
# Verify no breaking changes
```

#### 4. Backup Verification
```bash
# Ensure backup exists
git log --oneline -10

# Test restoration process
git clone [repo-url] test-restoration
cd test-restoration
# Verify site builds correctly
rm -rf test-restoration
```

---

## Content Management

### Adding a New Blog Article

1. **Create HTML File:**
```bash
cp blog/adult.html blog/new-article.html
```

2. **Update Metadata:**
```html
<title>New Article Title | Mind Grace Clinic</title>
<meta name="description" content="Article description...">
<link rel="canonical" href="https://mindgracencr.in/blog/new-article.html">

<!-- OpenGraph -->
<meta property="og:title" content="New Article Title | Mind Grace Clinic">
<meta property="og:description" content="Article description...">
<meta property="og:url" content="https://mindgracencr.in/blog/new-article.html">

<!-- JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "New Article Title",
  "description": "Article description...",
  "url": "https://mindgracencr.in/blog/new-article.html",
  "author": {
    "@type": "Physician",
    "name": "Dr. Anita Sharma"
  },
  "publisher": {
    "@type": "MedicalClinic",
    "name": "Mind Grace Neuropsychiatric Clinic"
  },
  "datePublished": "2025-01-15",
  "articleSection": "Adult Mental Health"
}
</script>
```

3. **Add Content:**
Edit the `<main>` section with article content using semantic HTML.

4. **Update Blog Index:**
Add link to `blog/index.html`.

5. **Update Sitemap:**
Regenerate `sitemap.xml` with new URL.

6. **Test:**
- Preview locally
- Check mobile responsiveness
- Validate structured data

### Updating Existing Content

1. **Locate File:**
```bash
find . -name "*.html" -type f | xargs grep -l "search term"
```

2. **Edit Content:**
Use text editor to update text, images, or metadata.

3. **Preserve Structure:**
- Keep existing HTML structure
- Maintain ARIA attributes
- Preserve loading/fetchpriority attributes on images

4. **Test Changes:**
Open file in browser and verify appearance/functionality.

---

## Image Management

### Adding New Images

1. **Convert to WebP:**
```bash
# Using imagemagick
convert input.jpg -quality 85 output.webp

# Or using cwebp
cwebp -q 85 input.jpg -o output.webp
```

2. **Optimize Size:**
- Target: <200KB for most images
- Hero images: <500KB
- Thumbnails: <50KB

3. **Add Multiple Sizes (Srcset):**
```html
<img src="image-800.webp"
     srcset="image-400.webp 400w,
             image-800.webp 800w,
             image-1200.webp 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1000px) 800px,
            1200px"
     alt="Descriptive alt text"
     loading="lazy"
     width="1200"
     height="675">
```

4. **Place in Directory:**
```bash
mv image-*.webp assets/images/
```

5. **Update References:**
Edit HTML files to use new image paths.

---

## Troubleshooting Common Issues

### Issue: Page Not Loading

**Symptoms:** Blank page, 404 error

**Diagnosis:**
```bash
# Check file exists
ls -la filename.html

# Check base href
grep "<base href" filename.html

# Check for syntax errors
grep -n "</" filename.html | head -20
```

**Solution:**
- Verify file location
- Check base href matches deployment path
- Look for unclosed tags

### Issue: Styles Not Applying

**Symptoms:** Page displays unstyled

**Diagnosis:**
```bash
# Check CSS file exists
ls -la assets/css/*.css

# Check CSS references in HTML
grep "stylesheet" filename.html

# Check browser console for 404s
```

**Solution:**
- Verify CSS file paths
- Check for typos in class names
- Ensure CSS load order is correct

### Issue: JavaScript Errors

**Symptoms:** Interactive features not working

**Diagnosis:**
```bash
# Check for console.log statements
grep -r "console.log" assets/js/

# Check module imports
grep "import\|export" assets/js/*.js

# Verify script type
grep "type=\"module\"" filename.html
```

**Solution:**
- Remove console.log statements
- Fix import/export syntax
- Ensure type="module" on script tags

### Issue: Images Not Displaying

**Symptoms:** Broken image icons

**Diagnosis:**
```bash
# Check image exists
ls -la assets/images/image-name.webp

# Check reference in HTML
grep "image-name" filename.html

# Verify file extension
```

**Solution:**
- Convert missing images to WebP
- Update file extensions in HTML
- Check image paths are correct

### Issue: Mobile Navigation Broken

**Symptoms:** Menu doesn't open/close

**Diagnosis:**
```bash
# Check main.js loaded
grep "main.js" filename.html

# Check event listeners
grep -A 5 "mobile-nav-trigger" assets/js/main.js
```

**Solution:**
- Verify main.js loads before interactive elements
- Check for JavaScript errors in console
- Test aria-expanded attribute toggling

---

## Performance Optimization

### Image Optimization Checklist
- [ ] All images in WebP format
- [ ] Appropriate compression (quality 75-85)
- [ ] Correct dimensions (no oversized images)
- [ ] Lazy loading on non-critical images
- [ ] Fetchpriority="high" on LCP images
- [ ] Width/height attributes specified

### CSS Optimization
- [ ] Unused CSS removed
- [ ] Critical CSS inlined
- [ ] Modular structure maintained
- [ ] No !important overuse

### JavaScript Optimization
- [ ] No blocking scripts
- [ ] Code split by functionality
- [ ] Event delegation used
- [ ] Debounce/throttle on scroll events

---

## Security Best Practices

### Regular Security Checks

1. **HTTPS Verification:**
```bash
curl -I https://mindgracencr.in/
# Should show: HTTP/2 200
# Strict-Transport-Security header present
```

2. **Content Security Policy:**
Add to `.htaccess` or server config:
```apache
Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;"
```

3. **Subresource Integrity:**
For vendor scripts, add integrity hashes:
```html
<script src="assets/vendor/lucide.min.js" 
        integrity="sha384-[hash]" 
        crossorigin="anonymous"></script>
```

Generate hash:
```bash
openssl dgst -sha384 -binary lucide.min.js | openssl base64 -A
```

---

## Version Control Workflow

### Making Updates

1. **Create Feature Branch:**
```bash
git checkout -b feature/update-content
```

2. **Make Changes:**
Edit files as needed.

3. **Test Locally:**
```bash
# Open in browser
open index.html

# Or use local server
python -m http.server 8000
```

4. **Commit Changes:**
```bash
git add .
git commit -m "Description of changes"
```

5. **Push and Pull Request:**
```bash
git push origin feature/update-content
# Create PR on GitHub
# Review and merge
```

6. **Deploy:**
GitHub Pages auto-deploys on merge to main.

---

## Monitoring & Analytics

### Recommended Tools

1. **Google Search Console:**
   - Monitor indexing status
   - Track search performance
   - Identify crawl errors

2. **Google Analytics (Optional):**
   - Track visitor behavior
   - Monitor bounce rates
   - Analyze traffic sources

3. **Uptime Monitoring:**
   - UptimeRobot (free tier)
   - Pingdom
   - StatusCake

4. **Performance Monitoring:**
   - Google PageSpeed Insights
   - WebPageTest
   - GTmetrix

### Setting Up Alerts

Configure alerts for:
- Site downtime (>5 minutes)
- Performance degradation (LCP >4s)
- Increased error rate (4xx/5xx responses)
- Security issues (SSL expiration)

---

## Documentation Updates

When making significant changes:

1. **Update README.md:**
   - Change version number
   - Document new features
   - Update screenshots if UI changed

2. **Update ARCHITECTURE.md:**
   - Document structural changes
   - Update dependency graphs
   - Note technical debt introduced/resolved

3. **Update This Guide:**
   - Add new troubleshooting scenarios
   - Document new maintenance procedures
   - Update tool recommendations

---

## Emergency Procedures

### Site Compromise

If site is compromised:

1. **Immediate Actions:**
   ```bash
   # Take site offline
   # Contact hosting provider
   # Preserve evidence
   ```

2. **Investigation:**
   - Review git history for unauthorized changes
   - Check access logs
   - Identify vulnerability source

3. **Recovery:**
   ```bash
   # Restore from known-good backup
   git reset --hard [last-known-good-commit]
   git push --force origin main
   
   # Change all passwords
   # Update security measures
   ```

### Data Loss

If content is accidentally deleted:

1. **Recover from Git:**
```bash
git log --oneline
git checkout [commit-hash] -- [deleted-file]
git push origin main
```

2. **Restore from Backup:**
```bash
# If git recovery fails
git clone [backup-repo-url] temp-restore
cp temp-restore/[file] ./[file]
rm -rf temp-restore
git add [file]
git commit -m "Restore deleted file"
git push origin main
```

---

## Contact Information

### Support Channels

- **Technical Issues:** [Developer Email]
- **Content Updates:** [Content Manager Email]
- **Emergency:** [Phone Number]

### External Resources

- **GitHub Pages Documentation:** https://docs.github.com/en/pages
- **MDN Web Docs:** https://developer.mozilla.org/
- **WebAIM Accessibility:** https://webaim.org/
- **Google Web Fundamentals:** https://web.dev/

---

**Last Updated:** 2025-01-13  
**Next Review:** 2025-04-13  
**Version:** 1.0.0
