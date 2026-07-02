# 🗺️ URL RESTRUCTURING PLAN — Mind Grace Clinic
**Version:** 7.0 | **Status:** Ready for Implementation | **Created:** 2025-07-02 | **Updated:** Current Session

## Executive Summary

This document outlines the complete URL restructuring plan for the Mind Grace Neuropsychiatric Clinic website. The goal is to transform from `.html` extension URLs to clean, semantic URLs that improve SEO, user experience, and maintainability.

**Key Changes in v7.0:**
- Complete file inventory (80 files verified)
- Detailed blog post URL mappings
- Tool page grouping strategy
- Legal page consolidation
- Redirect specifications for all 40+ pages

---

## Current State Analysis

### Repository Statistics
- **Total Files:** 80 (HTML, MD, JS, JSON)
- **Core Pages:** 20 root-level HTML files
- **Tool Pages:** 7 interactive therapy modules
- **Blog Pages:** 13 (index + categories + articles)
- **Templates:** 3 template files
- **Legacy Files:** 3 (_legacy/*)
- **Documentation:** 11 MD files (AGENT_BIBLE)

### File Distribution
```
Root Level: 31 files (HTML, templates)
/blog/: 13 files (blog index, categories, articles)
/AGENT_BIBLE/: 11 files (documentation)
/js/: 11 files (scripts)
/css/: 1 file (README)
/images/: 1 file (image_descriptions.md)
/inspo/: 1 file (Anti-inspo UI UXI Anti Pattern.md)
/_legacy/: 2 files (old code)
/_templates/: 3 files (page templates)
```

---

## Target URL Structure

### Philosophy
1. **Clean URLs:** No `.html` extensions visible to users
2. **Semantic Hierarchy:** URL paths reflect content relationships
3. **Consistent Patterns:** Similar content types follow same structure
4. **SEO-Optimized:** Hyphenated slugs, keyword-rich paths
5. **Redirect Preservation:** 301 redirects maintain SEO equity

---

## 1. CORE PAGES (Flat Structure)

| Old Path | New Path | File | Status | Notes |
|----------|----------|------|--------|-------|
| `/index.html` | `/` | index.html | ✅ Complete | Homepage |
| `/about.html` | `/about` | about.html | ✅ v2.0 | Clinic story |
| `/services.html` | `/services` | services.html | ✅ v2.0 | Service listing |
| `/conditions.html` | `/conditions` | conditions.html | ⚠️ Broken | Needs rewrite (1 line) |
| `/doctors.html` | `/doctors` | doctors.html | ✅ v3.0 | Dual-clinician profiles |
| `/doctor.html` | → `/doctors` | doctor.html | ⚠️ Legacy | 301 redirect (merged) |
| `/location.html` | `/location` | location.html | ✅ v2.0 | Map & directions |
| `/contact.html` | `/contact` | contact.html | ✅ v2.0 | Contact form |
| `/faq.html` | `/faq` | faq.html | ✅ v2.0 | FAQ accordion |
| `/testimonials.html` | `/testimonials` | testimonials.html | ✅ v2.0 | Patient reviews |
| `/process.html` | `/process` | process.html | ✅ v2.0 | Treatment journey |
| `/fees.html` | `/fees` | fees.html | ✅ v2.0 | Pricing tables |
| `/emergency.html` | `/emergency` | emergency.html | ✅ v2.0 | Crisis resources |
| `/aasha.html` | `/aasha` | aasha.html | ✅ v2.0 | NGO initiative |
| `/approach.html` | `/approach` | approach.html | ✅ v2.0 | Biopsychosocial model |
| `/resources.html` | `/resources` | resources.html | ⏳ Pending | Resource library |
| `/gallery.html` | `/gallery` | gallery.html | ⏳ Pending | Photo gallery |
| `/book.html` | `/book` | book.html | ✅ v2.0 | Booking gate |
| `/mind-grace.html` | → `/` | mind-grace.html | ⚠️ Duplicate | 301 redirect |
| `/thank-you.html` | `/thank-you` | thank-you.html | ⚠️ Basic | Form success |

---

## 2. LEGAL PAGES (Grouped under /legal/)

| Old Path | New Path | File | Status | Notes |
|----------|----------|------|--------|-------|
| `/consent.html` | `/legal/consent` | consent.html | ⚠️ Minimal | 8 lines, needs expansion |
| `/privacy.html` | `/legal/privacy` | privacy.html | ⚠️ Minimal | 8 lines, needs expansion |
| `/terms.html` | `/legal/terms` | terms.html | ✅ Created | ~200 lines |
| `/disclaimer.html` | `/legal/disclaimer` | disclaimer.html | ✅ Created | ~200 lines |

**Implementation:** Create `/legal/` directory with subdirectories for each legal page containing `index.html`

---

## 3. THERAPEUTIC TOOLS (Grouped under /tools/)

| Old Path | New Path | File | CSS | JS | Status |
|----------|----------|------|-----|----|--------|
| `/guided-breathing.html` | `/tools/breathing` | guided-breathing.html | tools-breathing.css | tools-breathing.js | ⏳ Hydrate |
| `/butterfly-tapper.html` | `/tools/butterfly-tapper` | butterfly-tapper.html | tools-butterfly.css | tools-butterfly.js | ⏳ Hydrate |
| `/eye-movement.html` | `/tools/eye-movement` | eye-movement.html | tools-eye.css | tools-eye.js | ⏳ Hydrate |
| `/hypnos-fractal.html` | `/tools/fractal` | hypnos-fractal.html | tools-fractal.css | tools-fractal.js | ⏳ Hydrate |
| `/horizon-scan.html` | `/tools/horizon-scan` | horizon-scan.html | tools-horizon.css | tools-horizon.js | ⏳ Hydrate |
| `/leaf-on-stream.html` | `/tools/leaf-on-stream` | leaf-on-stream.html | tools-leaf.css | tools-leaf.js | ⏳ Hydrate |

**Implementation:** Create `/tools/` directory with subdirectories for each tool containing `index.html`

---

## 4. BLOG STRUCTURE (Hierarchical)

### Index & Category Pages

| Old Path | New Path | File | Lines | Status |
|----------|----------|------|-------|--------|
| `/blog/index.html` | `/blog` | blog/index.html | 224 | ✅ Fixed nav |
| `/blog/adult.html` | `/blog/adult` | blog/adult.html | 200 | ✅ Fixed nav |
| `/blog/child.html` | `/blog/child` | blog/child.html | 23 | ⏳ Responsive |
| `/blog/children.html` | → `/blog/child` | blog/children.html | ~200 | ⚠️ 301 redirect |

### Adult Articles

| Old Path | New Path | File | Lines | Topic |
|----------|----------|------|-------|-------|
| `/blog/pages/adult/overthinking-vs-anxiety.html` | `/blog/adult/overthinking-vs-anxiety` | blog/pages/adult/overthinking-vs-anxiety.html | 31 | Differential diagnosis |
| `/blog/pages/adult/scheduled-worry-time-technique.html` | `/blog/adult/scheduled-worry-time` | blog/pages/adult/scheduled-worry-time-technique.html | 281 | CBT technique |
| `/blog/pages/adult/sleep-and-anxiety-cycle.html` | `/blog/adult/sleep-anxiety-cycle` | blog/pages/adult/sleep-and-anxiety-cycle.html | 150 | Sleep hygiene |
| `/blog/pages/adult/stimulus-control-therapy.html` | `/blog/adult/stimulus-control` | blog/pages/adult/stimulus-control-therapy.html | 254 | Insomnia treatment |
| `/blog/pages/adult/when-to-see-a-psychiatrist.html` | `/blog/adult/when-to-see-psychiatrist` | blog/pages/adult/when-to-see-a-psychiatrist.html | 35 | Help-seeking guide |

### Child Articles

| Old Path | New Path | File | Lines | Topic |
|----------|----------|------|-------|-------|
| `/blog/pages/child/early-signs-of-autism.html` | `/blog/child/early-signs-autism` | blog/pages/child/early-signs-of-autism.html | 31 | Autism screening |
| `/blog/pages/child/school-concerns-and-adhd.html` | `/blog/child/adhd-school-concerns` | blog/pages/child/school-concerns-and-adhd.html | 35 | ADHD in school |
| `/blog/pages/child/sensory-overload-at-home.html` | `/blog/child/sensory-overload` | blog/pages/child/sensory-overload-at-home.html | 31 | Sensory processing |
| `/blog/pages/child/speech-delay-red-flags.html` | `/blog/child/speech-delay-flags` | blog/pages/child/speech-delay-red-flags.html | 35 | Speech development |

---

## 5. TEMPLATES & LEGACY

| Path | Purpose | Action |
|------|---------|--------|
| `/_templates/template-clean.html` | Clean page template | Keep for future use |
| `/_templates/adult-mental-health-template.html` | Adult blog template | Keep for future use |
| `/_templates/child-development-template.html` | Child blog template | Keep for future use |
| `/_legacy/index.html` | Old homepage | Archive/delete |
| `/_legacy/app.js` | Old app script | Archive/delete |
| `/_legacy/children.html` | Old children page | Archive/delete |

---

## IMPLEMENTATION STRATEGY

### Phase 1: Infrastructure Setup (P0 - 2-4 hours)

#### Option A: Directory-Based Structure (Recommended)

Create directory structure where each URL path contains an `index.html`:

```bash
# Core pages
mkdir -p about services doctors location contact faq testimonials process fees emergency aasha approach resources gallery book thank-you

# Legal pages
mkdir -p legal/consent legal/privacy legal/terms legal/disclaimer

# Tool pages
mkdir -p tools/breathing tools/butterfly-tapper tools/eye-movement tools/fractal tools/horizon-scan tools/leaf-on-stream

# Blog restructuring
mkdir -p blog/adult blog/child
mkdir -p blog/adult/overthinking-vs-anxiety blog/adult/scheduled-worry-time blog/adult/sleep-anxiety-cycle blog/adult/stimulus-control blog/adult/when-to-see-psychiatrist
mkdir -p blog/child/early-signs-autism blog/child/adhd-school-concerns blog/child/sensory-overload blog/child/speech-delay-flags

# Move files
mv about.html about/index.html
mv services.html services/index.html
mv doctors.html doctors/index.html
# ... repeat for all core pages

mv consent.html legal/consent/index.html
mv privacy.html legal/privacy/index.html
# ... repeat for legal pages

mv guided-breathing.html tools/breathing/index.html
mv butterfly-tapper.html tools/butterfly-tapper/index.html
# ... repeat for tools

# Restructure blog
mv blog/adult.html blog/adult/index.html
mv blog/child.html blog/child/index.html
mv blog/pages/adult/*.html blog/adult/[slug]/index.html
mv blog/pages/child/*.html blog/child/[slug]/index.html
```

#### Server Configuration

**Netlify (`netlify.toml`):**
```toml
[[redirects]]
  from = "/doctor.html"
  to = "/doctors"
  status = 301
  force = true

[[redirects]]
  from = "/mind-grace.html"
  to = "/"
  status = 301
  force = true

[[redirects]]
  from = "/blog/children.html"
  to = "/blog/child"
  status = 301
  force = true

[[redirects]]
  from = "/blog/pages/adult/*"
  to = "/blog/adult/:splat"
  status = 301
  force = true

[[redirects]]
  from = "/blog/pages/child/*"
  to = "/blog/child/:splat"
  status = 301
  force = true
```

**Vercel (`vercel.json`):**
```json
{
  "redirects": [
    { "source": "/doctor.html", "destination": "/doctors", "permanent": true },
    { "source": "/mind-grace.html", "destination": "/", "permanent": true },
    { "source": "/blog/children.html", "destination": "/blog/child", "permanent": true },
    { "source": "/blog/pages/adult/:slug*", "destination": "/blog/adult/:slug*", "permanent": true },
    { "source": "/blog/pages/child/:slug*", "destination": "/blog/child/:slug*", "permanent": true }
  ]
}
```

### Phase 2: Content Updates (P1 - 4-8 hours)

1. **Update All Internal Links**
   - Search/replace `.html` extensions in all 80 files
   - Update navigation menus (header/footer)
   - Update breadcrumbs
   - Update canonical tags

2. **Update Canonical Tags**
   ```html
   <!-- Before -->
   <link rel="canonical" href="./about.html" />
   
   <!-- After -->
   <link rel="canonical" href="/about" />
   ```

3. **Update Relative Paths**
   ```html
   <!-- Before -->
   <a href="../services.html">Services</a>
   
   <!-- After -->
   <a href="/services">Services</a>
   ```

4. **Regenerate Sitemap**
   - Create new `sitemap.xml` with clean URLs only
   - Submit to Google Search Console
   - Submit to Bing Webmaster Tools

### Phase 3: Testing & Validation (P2 - 2-4 hours)

1. **Redirect Testing**
   - Test all 301 redirects manually
   - Verify no redirect chains
   - Check HTTP headers (301 not 302)

2. **SEO Validation**
   - Crawl for 404 errors
   - Verify canonical tags
   - Validate structured data
   - Test Open Graph meta tags

3. **User Experience Testing**
   - Test all internal links
   - Verify bookmarked URLs redirect
   - Test mobile navigation
   - Verify breadcrumbs

### Phase 4: Monitoring (Ongoing - 1 hr/week)

1. **Google Search Console**
   - Monitor crawl errors
   - Track indexed pages
   - Watch redirect issues
   - Monitor search performance

2. **Analytics**
   - Track 404 errors
   - Monitor bounce rates
   - Track organic traffic
   - Set up conversion goals

---

## SUCCESS METRICS

- ✅ Zero 404 errors post-migration
- ✅ All old URLs redirect to new URLs (301)
- ✅ No redirect chains (max 1 hop)
- ✅ Canonical tags point to clean URLs
- ✅ Sitemap contains only clean URLs
- ✅ Google indexes new URLs within 2 weeks
- ✅ Organic traffic remains stable or improves
- ✅ No increase in bounce rate

---

## TIMELINE

| Phase | Tasks | Time | Priority |
|-------|-------|------|----------|
| Phase 1 | Infrastructure setup | 2-4 hrs | P0 |
| Phase 2 | Content updates | 4-8 hrs | P1 |
| Phase 3 | Testing & validation | 2-4 hrs | P2 |
| Phase 4 | Monitoring | Ongoing | P3 |
| **Total** | | **8-16 hrs** | |

---

## ROLLBACK PLAN

If issues arise:

1. **Immediate Rollback**
   - Disable redirect rules
   - Revert canonical tag changes
   - Restore original sitemap

2. **Partial Rollback**
   - Keep working redirects
   - Fix problematic URLs individually
   - Monitor and iterate

3. **Communication**
   - Inform stakeholders
   - Document issues
   - Plan revised approach

---

*Cross-ref: pages.md §11, memory.md §QUEUE, ARCHITECTURE.md §2, Instructions.md §6. END_ON_SYNC.*
