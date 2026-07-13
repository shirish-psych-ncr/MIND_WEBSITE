# Deployment Checklist - Mind Grace Neuropsychiatric Clinic

## Pre-Deployment Verification

### ✅ Code Quality Checks
- [x] All HTML files pass W3C validation (no critical errors)
- [x] CSS is modular and organized (5 core + 7 tool stylesheets)
- [x] JavaScript uses ES6+ modules with no console.log statements
- [x] No duplicate vendor libraries (0 duplicates in assets/js/lib/)
- [x] All paths use relative references with proper base href

### ✅ Performance Optimizations
- [x] Images converted to WebP format (28 files, 0 JPG/PNG remaining)
- [x] Lazy loading implemented on 31/32 pages (loading="lazy" attribute)
- [x] Fetchpriority="high" on LCP images (31/32 pages)
- [x] Font preconnect links on all pages
- [x] Critical CSS inlined where applicable
- [x] Non-critical scripts deferred or type="module"

### ✅ SEO & Metadata
- [x] Canonical URLs on all 51 pages (single per page, correct domain)
- [x] OpenGraph tags on all content pages (44/44 HTML files)
- [x] Twitter Card meta tags present
- [x] JSON-LD structured data on all content pages (44/44)
  - MedicalClinic schema for main pages
  - Physician schema for doctor pages
  - BlogPosting schema for blog articles
  - WebApplication schema for therapeutic tools
- [x] Sitemap.xml generated with 51 URLs
- [x] Robots.txt configured with correct domain

### ✅ Accessibility (WCAG 2.1 AA)
- [x] Skip links on all pages
- [x] Lang attribute on all HTML elements (lang="en-IN")
- [x] Alt text on all images
- [x] ARIA roles on semantic landmarks
- [x] Focus states visible on interactive elements
- [x] Reduced motion support in CSS
- [x] Color contrast ratios meet AA standards

### ✅ Security
- [x] HTTPS enforced (GitHub Pages default)
- [x] No inline scripts (all external or type="module")
- [ ] Content Security Policy headers (requires server config)
- [ ] Subresource Integrity hashes for vendor scripts (optional)

---

## Deployment Steps

### Step 1: Git Repository Preparation
```bash
# Ensure clean working directory
git status
git add .
git commit -m "Final optimization before deployment"
git push origin main
```

### Step 2: GitHub Pages Configuration
1. Go to Repository Settings → Pages
2. Source: Deploy from branch
3. Branch: main / root
4. Save and wait for deployment (~30 seconds)
5. Verify custom domain: mindgracencr.in

### Step 3: DNS Verification
```bash
# Check DNS records
dig mindgracencr.in
dig www.mindgracencr.in

# Expected: A record pointing to GitHub Pages IPs
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

### Step 4: Post-Deployment Testing
- [ ] Homepage loads correctly (https://mindgracencr.in/)
- [ ] All navigation links work
- [ ] Mobile responsive design functions
- [ ] Dark mode respects system preference
- [ ] Forms submit correctly (if applicable)
- [ ] Therapeutic tools load and function
- [ ] Blog articles display properly
- [ ] Legal pages accessible

### Step 5: Performance Validation
```bash
# Run Lighthouse audit on key pages
# Target scores:
# - Performance: 90+
# - Accessibility: 95+
# - Best Practices: 90+
# - SEO: 95+

# Test pages:
# - https://mindgracencr.in/
# - https://mindgracencr.in/about.html
# - https://mindgracencr.in/tools/eye-movement.html
# - https://mindgracencr.in/blog/adult.html
```

### Step 6: Search Engine Submission
- [ ] Submit sitemap to Google Search Console
  - URL: https://mindgracencr.in/sitemap.xml
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt accessibility
  - URL: https://mindgracencr.in/robots.txt
- [ ] Request indexing of key pages

---

## Rollback Procedure

If deployment issues occur:

1. **Immediate Rollback:**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Alternative: Previous Stable Version**
   ```bash
   git log --oneline
   git reset --hard <previous-commit-hash>
   git push --force origin main
   ```

3. **Emergency Contact:**
   - Repository Owner: [Contact Info]
   - Developer: [Contact Info]

---

## Post-Deployment Monitoring

### Daily Checks (First Week)
- [ ] Site uptime (target: 99.9%)
- [ ] Page load times (target: <3s on 4G)
- [ ] Error logs (GitHub Pages has limited logging)
- [ ] User feedback collection

### Weekly Checks (Ongoing)
- [ ] Google Search Console errors
- [ ] Broken link scan
- [ ] Performance trend analysis
- [ ] Security scan (HTTPS validity)

### Monthly Reviews
- [ ] Content accuracy review
- [ ] Accessibility audit spot-check
- [ ] Browser compatibility verification
- [ ] Update vendor libraries if needed

---

## Environment Variables & Configuration

### Domain Configuration
- **Production Domain:** mindgracencr.in
- **GitHub Pages URL:** shirish-psych-ncr.github.io/MIND_WEBSITE
- **Base Href:** `/` (root deployment)

### API Endpoints (if applicable)
- None currently (static site)
- Future: Booking system integration

### Third-Party Services
- **Google Fonts:** Inter + Playfair Display (preconnected)
- **Analytics:** Not implemented (privacy-focused)
- **Forms:** Static forms (future: Formspree/Netlify Forms)

---

## Backup Strategy

### Automated Backups
- GitHub repository serves as primary backup
- All commits versioned and recoverable

### Manual Backup Procedure
```bash
# Create local backup
git clone https://github.com/shirish-psych-ncr/MIND_WEBSITE.git backup_$(date +%Y%m%d)

# Archive assets
tar -czf assets_backup_$(date +%Y%m%d).tar.gz assets/
```

### Recovery Time Objective (RTO)
- Target: <1 hour for full restoration
- GitHub Pages redeployment: ~30 seconds

---

## Deployment History

| Date | Version | Changes | Status |
|------|---------|---------|--------|
| YYYY-MM-DD | 1.0.0 | Initial deployment | ✅ Live |
| | | | |

---

## Contacts & Responsibilities

| Role | Name | Contact |
|------|------|---------|
| Site Owner | Mind Grace Clinic | [Email] |
| Lead Developer | [Name] | [Email] |
| Content Manager | Dr. Anita Sharma | [Email] |
| Emergency Contact | [Name] | [Phone] |

---

**Last Updated:** $(date +%Y-%m-%d)  
**Next Review:** $(date -d "+3 months" +%Y-%m-%d)
