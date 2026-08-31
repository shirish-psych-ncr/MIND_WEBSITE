# Deployment Checklist - Mind Grace Neuropsychiatric Clinic

## Pre-Deployment Verification

### [OK] Code Quality Checks
- [x] All 43 public HTML pages pass the repository validator
- [x] CSS is modular and organized (11 core + 7 tool stylesheets)
- [x] JavaScript syntax passes `node --check` with no console.log statements
- [x] No duplicate vendor libraries in `assets/js/lib/`
- [x] Root-relative paths are used consistently for Cloudflare Pages root deployment

### [OK] Performance Optimizations
- [x] Responsive image dimensions and asynchronous decoding are applied to key imagery
- [x] Lazy loading is used for below-the-fold imagery where appropriate
- [x] High fetch priority is reserved for key above-the-fold imagery
- [x] Font preconnect links are used where external fonts are loaded
- [x] Critical CSS is inlined where applicable
- [x] Non-critical scripts are deferred or loaded as modules

### [OK] SEO & Metadata
- [x] One canonical URL on all 43 public pages
- [x] OpenGraph tags on all 43 public pages
- [x] Twitter Card meta tags present
- [x] JSON-LD structured data on all 43 public pages
  - MedicalClinic schema for main pages
  - Physician schema for doctor pages
  - BlogPosting schema for blog articles
  - WebApplication schema for therapeutic tools
- [x] Sitemap.xml generated with 40 indexable URLs; noindex utility/error pages are excluded
- [x] Robots.txt configured with correct domain

### [OK] Accessibility (WCAG 2.1 AA)
- [x] Skip links on all pages
- [x] Lang attribute on all HTML elements (lang="en-IN")
- [x] Alt text on all images
- [x] ARIA roles on semantic landmarks
- [x] Focus states visible on interactive elements
- [x] Reduced motion support in CSS
- [x] Color contrast ratios meet AA standards

### [OK] Security
- [x] HTTPS enforced (Cloudflare Pages)
- [x] Executable JavaScript is kept in external files where practical; JSON-LD and a small number of page-specific modules remain inline by design
- [x] Content Security Policy and security headers in `_headers`
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

### Step 2: Cloudflare Pages Configuration
1. In Cloudflare Dashboard, open Workers & Pages → Create application → Pages.
2. Connect the repository and select `main` as the production branch.
3. Set build command to `exit 0` and build output directory to `.`.
4. Save and deploy, then attach `mindgracencr.in` as the custom domain.
5. Keep `_headers`, `_redirects`, and `wrangler.toml` in the deployed output.

### Step 3: DNS Verification
```bash
# Check DNS records
dig mindgracencr.in
dig www.mindgracencr.in

# Expected: the domain is proxied/managed by Cloudflare and resolves to Cloudflare edge IPs.
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
- [ ] Error logs and deployment status in Cloudflare Pages
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
- **Cloudflare Pages URL:** `<project-name>.pages.dev` (set in the Cloudflare dashboard)
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
- Cloudflare Pages redeployment time varies by build queue and repository size

---

## Deployment History

| Date | Version | Changes | Status |
|------|---------|---------|--------|
| YYYY-MM-DD | 1.0.0 | Initial deployment | [OK] Live |
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

**Last Updated:** 2026-08-31
**Next Review:** 2026-11-30
