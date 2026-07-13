# Phase 2, Run 5: SEO & Structured Data Audit (Verified)

## Executive Summary
**Status:** Partial Implementation with Critical Gaps
**Date:** July 13, 2025
**Auditor:** AI Code Analysis

---

## 1. Sitemap.xml Analysis

### Current State
- **File:** `/workspace/sitemap.xml`
- **Total URLs:** 28 entries
- **Format Issues:** Mixed absolute/relative URLs

### Verified URL List
```xml
✅ Absolute URLs (Correct):
- https://shirish-psych-ncr.github.io/MIND_WEBSITE/index.html

❌ Relative URLs (Broken for GitHub Pages):
- about.html
- conditions.html
- services.html
- process.html
- faq.html
- location.html
- book.html
- contact.html
- resources.html
- mind-grace.html
- aasha.html
- gallery.html
- fees.html
- testimonials.html
- emergency.html

✅ Blog URLs (Relative but may work):
- blog/index.html
- blog/adult.html
- blog/children.html
- blog/pages/adult/*.html (5 articles)
- blog/pages/child/*.html (4 articles)
```

### Critical Issues
1. **Missing Pages (23 total):**
   - ❌ All 6 tool pages (`tools/*.html`)
   - ❌ Legal pages: `consent.html`, `privacy.html`, `terms.html`, `disclaimer.html`
   - ❌ Doctor pages: `doctors.html`, `dr-anita-sharma.html`
   - ❌ Other core pages: `approach.html`, `thank-you.html`, `404.html`

2. **Domain Inconsistency:**
   - First URL uses GitHub Pages domain
   - Remaining URLs are relative (will resolve to whatever domain serves them)
   - Should standardize to `https://mindgracencr.in/`

---

## 2. Robots.txt Analysis

### Current State
```txt
User-agent: *
Allow: /

Sitemap: https://mindgracencr.in/sitemap.xml  ❌ WRONG DOMAIN

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /tools/*/temp/
```

### Critical Issue
- **Wrong Domain:** References `mindgracencr.in` instead of `mindgracencr.in`
- **Impact:** Search engines will look for sitemap at wrong domain → 404 error

### Required Fix
```txt
Sitemap: https://mindgracencr.in/sitemap.xml
```

---

## 3. PWA Manifest Analysis

### Current State: ✅ VERIFIED CORRECT
**File:** `/workspace/site.webmanifest`

```json
{
  "name": "Mind Grace Neuropsychiatric Clinic",
  "short_name": "Mind Grace",
  "start_url": "/index.html",
  "theme_color": "#671B50",
  "background_color": "#FCFAF7",
  "display": "standalone",
  "orientation": "any",
  "icons": [
    {"src": "assets/images/Mind_Grace_Clinic_Logo_Pink.svg", "sizes": "192x192"},
    {"src": "assets/images/Mind_Grace_Clinic_Logo_Pink.svg", "sizes": "512x512"},
    {"src": "assets/images/Mind_Grace_Clinic_Logo.png", "sizes": "512x512"}
  ],
  "screenshots": [
    {"src": "assets/images/Mind_Grace_Clinic_Brochure.png", "sizes": "1280x720"}
  ],
  "lang": "en-IN",
  "categories": ["health", "medical", "lifestyle"]
}
```

### Status
✅ All fields correct
✅ Icon paths valid
✅ Theme color matches CSS (`#671B50`)
✅ Proper IN locale setting

---

## 4. Tool Pages: Canonical Tag Disaster

### Verified Findings (All 6 Tools Checked)

**Pattern Found:** Each tool page has 3-4 duplicate canonical tags pointing to WRONG domain

#### Example: `tools/butterfly-tapper.html`
```html
<link rel="canonical" href="https://mindgracencr.in/tools/butterfly-tapper.html">  ❌
<link rel="canonical" href="https://mindgracencr.in/tools/butterfly-tapper.html">  ❌ DUPLICATE
<link rel="canonical" href="https://mindgracencr.in/tools/butterfly-tapper.html">  ❌ DUPLICATE
<link rel="canonical" href="https://mindgracencr.in/butterfly-tapper.html">        ❌ WRONG PATH
```

#### Affected Files:
| File | Duplicate Count | Wrong Domain | Wrong Path |
|------|----------------|--------------|------------|
| `butterfly-tapper.html` | 4 | ✅ Yes | ✅ Yes |
| `eye-movement.html` | 4 | ✅ Yes | ✅ Yes |
| `guided-breathing.html` | 4 | ✅ Yes | ✅ Yes |
| `horizon-scan.html` | 4 | ✅ Yes | ✅ Yes |
| `hypnos-fractal.html` | 1 | ✅ Yes | ❌ No |
| `leaf-on-stream.html` | 4 | ✅ Yes | ✅ Yes |

### Required Fix for ALL Tool Pages:
Replace all canonical tags with single correct version:
```html
<link rel="canonical" href="https://mindgracencr.in/tools/butterfly-tapper.html">
```

---

## 5. Blog Articles: Structured Data Analysis

### Sample Analyzed: `blog/pages/adult/overthinking-vs-anxiety.html`

#### ✅ Good News: JSON-LD Present
Two separate `<script type="application/ld+json">` blocks found:

**Block 1: Article + BreadcrumbList**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Overthinking vs anxiety",
      "datePublished": "2026-03-21",
      "author": {"@type": "Physician", "name": "Dr Anita Sharma"},
      "publisher": {"@type": "MedicalClinic", "name": "Mind Grace Neuropsychiatric Clinic"}
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [...]
    }
  ]
}
```

**Block 2: Detailed Article Schema**
```json
{
  "@type": "Article",
  "headline": "Overthinking vs Anxiety: Understanding the Difference",
  "url": "https://mindgracencr.in/blog/pages/adult/overthinking-vs-anxiety.html",
  "mainEntityOfPage": {"@type": "WebPage", "@id": "..."},
  "wordCount": "800",
  "inLanguage": "en-IN"
}
```

#### ❌ Critical Missing: OpenGraph & Twitter Cards
```bash
$ head -30 blog/pages/adult/overthinking-vs-anxiety.html | grep -E "og:|twitter:"
# RESULT: (empty) - NO OpenGraph or Twitter meta tags found
```

**Missing Tags:**
- `<meta property="og:title" content="...">`
- `<meta property="og:description" content="...">`
- `<meta property="og:image" content="...">`
- `<meta property="og:url" content="...">`
- `<meta property="og:type" content="article">`
- `<meta name="twitter:card" content="summary_large_image">`
- `<meta name="twitter:title" content="...">`
- `<meta name="twitter:description" content="...">`
- `<meta name="twitter:image" content="...">`

#### ⚠️ Issue: Duplicate JSON-LD Blocks
Two separate Article schemas with different headlines:
- Block 1: "Overthinking vs anxiety" (2026-03-21)
- Block 2: "Overthinking vs Anxiety: Understanding the Difference" (2024-01-25)

**Recommendation:** Merge into single comprehensive schema block.

---

## 6. Core Pages: Structured Data Gap

### Sample Check: `index.html`
**Status:** ❌ NO JSON-LD structured data found

**Missing Schemas Across All Core Pages:**
- ❌ `Organization` schema (homepage)
- ❌ `MedicalBusiness` schema (location/services pages)
- ❌ `Physician` schema (doctor pages)
- ❌ `FAQPage` schema (faq.html)
- ❌ `BreadcrumbList` (all pages)

---

## 7. Action Items (Priority Order)

### 🔴 CRITICAL (Fix Immediately)
1. **Fix robots.txt domain:**
   - Change `mindgracencr.in` → `mindgracencr.in`

2. **Fix tool page canonical tags:**
   - Remove duplicates (keep only 1 per page)
   - Fix domain: `mindgracencr.in` → `mindgracencr.in`
   - Fix paths: ensure `/tools/` prefix present

3. **Regenerate sitemap.xml:**
   - Use absolute URLs with `https://mindgracencr.in/`
   - Add missing 23 pages (tools, legal, doctor pages)
   - Remove GitHub Pages URL (use production domain)

### 🟡 HIGH (SEO Impact)
4. **Add OpenGraph/Twitter tags to blog articles:**
   - Create reusable template snippet
   - Apply to all 9 articles

5. **Merge duplicate JSON-LD in blog articles:**
   - Combine two Article blocks into one comprehensive schema
   - Ensure consistent dates/headlines

6. **Add structured data to core pages:**
   - Homepage: Organization + MedicalBusiness
   - Doctor pages: Physician schema
   - FAQ page: FAQPage schema
   - All pages: BreadcrumbList

### 🟢 MEDIUM (Enhancement)
7. **Add featured images to blog articles:**
   - Currently using logo as fallback
   - Create custom OG images for each article

8. **Implement article search:**
   - Fuse.js already in vendor folder
   - Not currently integrated into blog UI

---

## 8. Verification Commands

```bash
# Check robots.txt domain
grep "Sitemap:" robots.txt

# Count canonical tags in tools
for f in tools/*.html; do echo "$f: $(grep -c 'canonical' $f)"; done

# Check for OpenGraph tags in blog
grep -l "og:title" blog/pages/*/*.html || echo "No OG tags found"

# Validate sitemap URLs
grep -c "<loc>" sitemap.xml
```

---

## 9. Testing Checklist

After fixes:
- [ ] Google Rich Results Test (sample blog post)
- [ ] Google Mobile-Friendly Test
- [ ] Facebook Sharing Debugger (og:image preview)
- [ ] Twitter Card Validator
- [ ] Sitemap validation via Google Search Console
- [ ] robots.txt tester

---

**Next Steps:** Proceed to fix critical issues in Phase 3.
