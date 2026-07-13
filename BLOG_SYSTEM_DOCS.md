# Blog System Documentation — Mind Grace Neuropsychiatric Clinic

**Last Updated:** Phase 2, Run 4 (Verified)  
**Status:** Production-Ready with Manifest-Based Architecture

---

## 📊 System Overview

The Mind Grace blog is a **dynamic, manifest-driven content system** built without a backend CMS. It uses JSON manifests for configuration and vanilla JavaScript for dynamic article discovery and rendering.

### Architecture Highlights
- ✅ **Zero Backend**: Static HTML files with client-side discovery
- ✅ **Manifest-Driven**: JSON manifests define posts, tags, clusters
- ✅ **Dynamic Rendering**: `blog-discovery.js` fetches metadata and renders cards
- ✅ **Category Separation**: Adult mental health vs child development
- ✅ **SEO Optimized**: Structured data, canonical URLs, breadcrumbs

---

## 📁 File Structure (Verified)

```
/workspace/blog/
├── index.html                    # Main hub (173 lines)
├── adult.html                    # Adult mental health listing (169 lines)
├── children.html                 # Child development listing (165 lines)
├── pages/
│   ├── adult/
│   │   ├── manifest.json         # Adult blog configuration
│   │   ├── overthinking-vs-anxiety.html (344 lines)
│   │   ├── scheduled-worry-time-technique.html (447 lines)
│   │   ├── sleep-and-anxiety-cycle.html (493 lines)
│   │   ├── stimulus-control-therapy.html (416 lines)
│   │   └── when-to-see-a-psychiatrist.html (347 lines)
│   └── child/
│       ├── manifest.json         # Child blog configuration
│       ├── early-signs-of-autism.html (279 lines)
│       ├── school-concerns-and-adhd.html (282 lines)
│       ├── sensory-overload-at-home.html (281 lines)
│       └── speech-delay-red-flags.html (279 lines)
```

**Total Articles:** 9 (5 adult + 4 child)  
**Total Lines:** ~3,168 lines across all article HTML files

---

## 🔧 Core Components

### 1. Manifest Files

#### `/blog/pages/adult/manifest.json`
```json
{
  "files": [
    "overthinking-vs-anxiety.html",
    "scheduled-worry-time-technique.html",
    "sleep-and-anxiety-cycle.html",
    "stimulus-control-therapy.html",
    "when-to-see-a-psychiatrist.html"
  ],
  "pinned": ["sleep-and-anxiety-cycle.html", "overthinking-vs-anxiety.html"],
  "mostSearched": ["overthinking-vs-anxiety.html"],
  "symptoms": ["anxiety", "overthinking", "sleep", "insomnia", "worry"],
  "clusters": [
    { "label": "Anxiety & Worry", "tags": ["anxiety", "overthinking", "worry"] },
    { "label": "Sleep Issues", "tags": ["sleep", "insomnia"] }
  ]
}
```

#### `/blog/pages/child/manifest.json`
```json
{
  "files": [
    "early-signs-of-autism.html",
    "school-concerns-and-adhd.html",
    "sensory-overload-at-home.html",
    "speech-delay-red-flags.html"
  ],
  "pinned": ["speech-delay-red-flags.html", "early-signs-of-autism.html"],
  "mostSearched": ["speech-delay-red-flags.html"],
  "symptoms": ["speech-delay", "autism", "school", "adhd", "sensory"],
  "clusters": [
    { "label": "Autism & Early Signs", "tags": ["autism", "red-flags"] },
    { "label": "Speech & Communication", "tags": ["speech-delay"] }
  ]
}
```

### 2. JavaScript Modules

#### `assets/js/blog-config-adult.js` (677 bytes)
- **Purpose**: Loads adult blog manifest asynchronously
- **Mechanism**: Fetches `pages/adult/manifest.json` with cache-busting
- **Output**: Sets `window.ADULT_BLOG_CONFIG` as frozen object
- **Event**: Dispatches `adultBlogConfigLoaded` custom event

**Decoded Logic:**
```javascript
(async () => {
  const dir = "pages/adult/";
  const manifestUrl = `${dir}manifest.json`;
  try {
    const response = await fetch(manifestUrl, {
      method: "GET",
      headers: { "Cache-Control": "no-cache" }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    
    window.ADULT_BLOG_CONFIG = Object.freeze({
      sourceDir: dir,
      posts: Object.freeze(data.files.map(file => `${dir}${file}`)),
      pinned: Object.freeze(data.pinned || []),
      mostSearched: Object.freeze(data.mostSearched || []),
      symptoms: Object.freeze(data.symptoms || []),
      clusters: Object.freeze(data.clusters || [])
    });
    
    window.dispatchEvent(new CustomEvent("adultBlogConfigLoaded"));
    console.info("AdultBlogConfig: Initialized successfully.");
  } catch (error) {
    console.error("AdultBlogConfig: Failed to load manifest.", error);
  }
})();
```

#### `assets/js/blog-config-child.js` (822 bytes)
- **Purpose**: Loads child blog manifest asynchronously
- **Mechanism**: Fetches `pages/child/manifest.json` with cache-busting
- **Output**: Sets `window.BLOGDISCOVERYCONFIG` as frozen object
- **Event**: Dispatches `blogConfigLoaded` custom event with timestamp
- **Extra**: Includes `refresh()` method for page reload

#### `assets/js/blog-discovery.js` (6,474 bytes - minified)
- **Purpose**: Dynamic article discovery and card rendering
- **Size**: ~6.5KB minified, single file
- **Dependencies**: None (vanilla JS)

**Key Functions (Decoded from Minified):**

| Function | Purpose |
|----------|---------|
| `normalizeUrl(url)` | Converts relative URLs to absolute |
| `getMeta(url)` | Fetches HTML and extracts meta tags (title, description, date, readtime, tags) |
| `discoverPostsFromDirectory(dirUrl)` | Parses directory listing to find `.html` files |
| `shuffle(array)` | Randomizes array order |
| `takeRandom(array, count)` | Returns N random items from array |
| `_hasAnyTag(post, tags)` | Checks if post has any of specified tags |
| `formatLabel(tag)` | Converts `kebab-case` to `Title Case` |
| `renderCards(container, posts, emptyMessage)` | Generates HTML cards and injects into DOM |
| `initBlogDiscovery()` | Main initialization function |

**Discovery Algorithm:**
1. Load config from `window.BLOG_DISCOVERY_CONFIG` or category-specific config
2. Fetch all post URLs from manifest or directory listing
3. For each URL, fetch HTML and parse meta tags (`blog-title`, `blog-description`, `blog-date`, `blog-readtime`, `blog-tags`)
4. Build post objects with `{ href, title, desc, date, readtime, tags }`
5. Categorize posts: pinned, most-searched, beginner, by symptom tags
6. Render multiple grid sections:
   - `[data-symptom-grid]` - Filter chips by symptom
   - `[data-cluster-grid]` - Grouped reading paths
   - `[data-feed-grid]` - Main article feed (hybrid: pinned first, rest shuffled)
   - `[data-pinned-grid]` - Curated foundational reads
   - `[data-beginner-grid]` - Easy-to-understand articles
   - `[data-loop-grid]` - Discovery loop (random suggestions)
   - `[data-discovery-controls]` - Quick filters (All, Beginner, 2-min reads, Most searched)

**Filtering Logic:**
- Tag filter: Shows articles matching selected tag, pinned first
- Read time filter: Filters by "2 min read" in readtime meta
- Most searched: Shows only posts in `mostSearched` array
- Beginner: Shows posts tagged `beginner` or random subset if none
- Default hybrid feed: Pinned posts first, remaining posts shuffled on each load

---

## 🏷️ Article Metadata Schema

Each article HTML file includes these meta tags in `<head>`:

```html
<meta name="blog-tags" content="adult, overthinking, anxiety, beginner, most-searched">
<meta name="blog-title" content="Overthinking vs anxiety">
<meta name="blog-description" content="Understand the overlap between overthinking and anxiety...">
<meta name="blog-date" content="2026-03-21">
<meta name="blog-readtime" content="5 min read">
```

### Required Meta Tags
| Tag | Format | Example |
|-----|--------|---------|
| `blog-tags` | Comma-separated | `adult, anxiety, beginner` |
| `blog-title` | Plain text | `Overthinking vs anxiety` |
| `blog-description` | 1-2 sentences | `Understand the overlap...` |
| `blog-date` | ISO 8601 | `2026-03-21` |
| `blog-readtime` | Human-readable | `5 min read` |

### Special Tags (Reserved)
These tags are filtered out from display but used for logic:
- `adult` / `child` / `children` - Category identifiers
- `beginner` - Marks article for "Start simple" section
- `most-searched` - Marks article for "Most searched" quick filter

---

## 🔍 SEO Implementation

### Canonical URLs
All articles use **absolute canonical URLs**:

```html
<link rel="canonical" href="https://mindgracencr.in/blog/pages/adult/overthinking-vs-anxiety.html">
```

**Verified Status:** ✅ All 9 articles have correct canonical URLs with `mindgracencr.in` domain.

### Structured Data (JSON-LD)

Each article includes dual structured data:

#### 1. Article Schema
```json
{
  "@type": "Article",
  "headline": "Overthinking vs anxiety",
  "description": "Understand the overlap...",
  "datePublished": "2026-03-21",
  "author": {
    "@type": "Physician",
    "name": "Dr Anita Sharma",
    "url": "https://mindgracencr.in/dr-anita-sharma.html"
  },
  "publisher": {
    "@type": "MedicalClinic",
    "name": "Mind Grace Neuropsychiatric Clinic",
    "url": "https://mindgracencr.in/"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://mindgracencr.in/assets/images/Mind_Grace_Clinic_Logo_Pink.svg"
  },
  "articleSection": "Adult Mental Health"
}
```

#### 2. BreadcrumbList Schema
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://mindgracencr.in/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://mindgracencr.in/blog/index.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Adult Mental Health",
      "item": "https://mindgracencr.in/blog/adult.html"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Overthinking vs Anxiety",
      "item": "https://mindgracencr.in/blog/pages/adult/overthinking-vs-anxiety.html"
    }
  ]
}
```

### OpenGraph Tags
**Current Status:** ⚠️ Not implemented (missing from articles)

**Recommended Addition:**
```html
<meta property="og:title" content="Overthinking vs anxiety | Mind Grace Blog">
<meta property="og:description" content="Understand the overlap between overthinking and anxiety...">
<meta property="og:type" content="article">
<meta property="og:url" content="https://mindgracencr.in/blog/pages/adult/overthinking-vs-anxiety.html">
<meta property="og:image" content="https://mindgracencr.in/assets/images/blog/overthinking-anxiety.jpg">
<meta property="article:published_time" content="2026-03-21">
<meta property="article:author" content="Dr Anita Sharma">
```

### Twitter Cards
**Current Status:** ⚠️ Not implemented

**Recommended Addition:**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Overthinking vs anxiety | Mind Grace Blog">
<meta name="twitter:description" content="Understand the overlap between overthinking and anxiety...">
<meta name="twitter:image" content="https://mindgracencr.in/assets/images/blog/overthinking-anxiety.jpg">
```

---

## 🎨 UI Components

### Listing Pages (`adult.html`, `children.html`)

#### Sections Rendered Dynamically:
1. **Hero Section**
   - Eyebrow text
   - H1 title
   - Lead paragraph
   - Quick filter buttons (symptom tags)
   - Stats counters (total posts, total tags)

2. **Symptom Grid** (`[data-symptom-grid]`)
   - Filter chips for each symptom in manifest
   - Click to filter articles by tag

3. **Discovery Controls** (`[data-discovery-controls]`)
   - Show all
   - Not sure where to start? (beginner)
   - 2-minute reads
   - Most searched

4. **Main Feed** (`[data-feed-grid]`)
   - Hybrid rendering: pinned articles first, rest shuffled
   - Updates dynamically on filter change

5. **Pinned Grid** (`[data-pinned-grid]`)
   - Foundational reads curated via manifest

6. **Beginner Grid** (`[data-beginner-grid]`)
   - Articles tagged `beginner` or random subset

7. **Loop Grid** (`[data-loop-grid]`)
   - Random suggestions for discovery

8. **Cluster Grid** (`[data-cluster-grid]`)
   - Grouped reading paths (e.g., "Anxiety & Worry", "Sleep Issues")

### Article Cards

**HTML Structure (Generated by `renderCards`):**
```html
<article class="article-card">
  <div class="article-meta">
    <span>2026-03-21</span>
    <span>5 min read</span>
  </div>
  <div>
    <h3>Overthinking vs anxiety</h3>
    <p style="margin-top:10px;">Understand the overlap...</p>
  </div>
  <div class="tag-row">
    <span class="tag">Overthinking</span>
    <span class="tag">Anxiety</span>
  </div>
  <div class="cta-row">
    <a class="button" href="...">Read article</a>
  </div>
</article>
```

**Excluded Tags:** `adult`, `child`, `children`, `beginner`, `most-searched` are filtered from display.

---

## 📝 Article Inventory

### Adult Mental Health (5 articles)

| File | Title | Tags | Read Time | Pinned | Most Searched |
|------|-------|------|-----------|--------|---------------|
| `overthinking-vs-anxiety.html` | Overthinking vs anxiety | adult, overthinking, anxiety, beginner, most-searched | 5 min | ✅ | ✅ |
| `scheduled-worry-time-technique.html` | Scheduled worry time technique | adult, anxiety, worry, technique | 7 min | ❌ | ❌ |
| `sleep-and-anxiety-cycle.html` | Sleep and anxiety cycle | adult, sleep, anxiety, insomnia, beginner | 6 min | ✅ | ❌ |
| `stimulus-control-therapy.html` | Stimulus control therapy | adult, sleep, insomnia, therapy, cbt-i | 8 min | ❌ | ❌ |
| `when-to-see-a-psychiatrist.html` | When to see a psychiatrist | adult, psychiatry, help-seeking, beginner | 4 min | ❌ | ❌ |

### Child Development (4 articles)

| File | Title | Tags | Read Time | Pinned | Most Searched |
|------|-------|------|-----------|--------|---------------|
| `early-signs-of-autism.html` | Early signs of autism | child, autism, red-flags, developmental, beginner | 6 min | ✅ | ❌ |
| `school-concerns-and-adhd.html` | School concerns and ADHD | child, adhd, school, attention, learning | 5 min | ❌ | ❌ |
| `sensory-overload-at-home.html` | Sensory overload at home | child, sensory, autism, adhd, parenting | 5 min | ❌ | ❌ |
| `speech-delay-red-flags.html` | Speech delay red flags | child, speech-delay, communication, red-flags, beginner | 5 min | ✅ | ✅ |

---

## 🔗 Integration Guide

### Adding a New Article

#### Step 1: Create HTML File
Copy template from existing article and update:
- `<title>` tag
- Canonical URL
- All meta tags (`blog-title`, `blog-description`, `blog-date`, `blog-readtime`, `blog-tags`)
- JSON-LD structured data (Article + BreadcrumbList)
- Main content in `<main>` element

#### Step 2: Update Manifest
Add filename to appropriate `manifest.json`:

```json
{
  "files": [
    "existing-article.html",
    "new-article.html"  // ← Add here
  ],
  "pinned": ["existing-pinned.html"],
  "mostSearched": ["existing-most-searched.html"],
  "symptoms": ["anxiety", "new-tag"],  // ← Add new tags
  "clusters": [
    { "label": "Existing Cluster", "tags": ["anxiety"] },
    { "label": "New Cluster", "tags": ["new-tag"] }  // ← Add new cluster
  ]
}
```

#### Step 3: Test
1. Clear browser cache (manifests use `Cache-Control: no-cache`)
2. Verify article appears in all relevant grids
3. Check filter chips include new tags
4. Validate structured data with Google Rich Results Test

### Modifying Existing Articles

**To change pinned status:**
- Edit `manifest.json` → `pinned` array
- No need to modify article HTML

**To change tags:**
- Update `blog-tags` meta in article HTML
- Update `symptoms` array in manifest if adding new symptom filter
- Clear cache and reload

---

## 🐛 Known Issues & Recommendations

### Current Issues

1. **⚠️ Missing OpenGraph Tags**
   - Articles lack `og:title`, `og:description`, `og:image`
   - Impact: Poor social media sharing previews
   - Fix: Add OG meta tags to all 9 articles

2. **⚠️ Missing Twitter Cards**
   - No `twitter:card` meta tags
   - Impact: No rich previews on Twitter/X
   - Fix: Add Twitter Card meta tags

3. **⚠️ No Featured Images**
   - Articles use clinic logo as fallback image
   - Impact: Generic social sharing images
   - Fix: Create unique featured images per article, reference in OG tags

4. **⚠️ Minified JavaScript**
   - `blog-discovery.js` is minified (~6.5KB)
   - Impact: Hard to debug and maintain
   - Fix: Keep unminified source in repo, build minified version for production

5. **⚠️ No Search Functionality**
   - Fuse.js included in vendor but not integrated
   - Impact: Users can't search articles by keyword
   - Fix: Implement search bar using Fuse.js for fuzzy search

### Recommended Enhancements

1. **Related Articles Section**
   - Add automatic "Read next" based on shared tags
   - Position at end of each article

2. **Table of Contents**
   - Auto-generate TOC for long articles (>1000 words)
   - Improve navigation and SEO

3. **Reading Progress Indicator**
   - Already present as `.scroll-progress` class
   - Ensure consistent implementation across all articles

4. **Author Bio Box**
   - Add Dr. Sharma's bio at end of articles
   - Include credentials, photo, CTA to book

5. **Comment/Feedback System**
   - Simple feedback form ("Was this helpful?")
   - No full comments (medical content)

---

## 🧪 Testing Checklist

### Functional Tests
- [ ] All 9 articles load without errors
- [ ] Manifest files fetch successfully (check Network tab)
- [ ] Filter chips update article grids correctly
- [ ] Pinned articles appear first in main feed
- [ ] "2-minute reads" filter works (if applicable)
- [ ] "Most searched" shows correct articles
- [ ] Beginner section displays appropriately
- [ ] Stats counters show correct totals

### SEO Tests
- [ ] Canonical URLs are absolute and correct
- [ ] JSON-LD validates in Rich Results Test
- [ ] Breadcrumbs display correctly in SERPs (test via Google Search Console)
- [ ] Meta descriptions are unique per article
- [ ] No duplicate content issues

### Accessibility Tests
- [ ] Skip links work on all pages
- [ ] Keyboard navigation through filter chips
- [ ] ARIA labels on interactive elements
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader announces filter state changes

### Performance Tests
- [ ] Manifest files load within 500ms
- [ ] Article cards render within 1 second
- [ ] No layout shift during dynamic rendering
- [ ] Lighthouse score >90 for Performance

---

## 📈 Analytics Integration

**Recommended Events to Track:**
```javascript
// Article view
gtag('event', 'page_view', {
  'content_type': 'blog_article',
  'article_title': document.querySelector('meta[name="blog-title"]')?.content,
  'article_category': document.querySelector('meta[name="blog-tags"]')?.content
});

// Filter usage
gtag('event', 'filter_used', {
  'filter_type': 'symptom', // or 'cluster', 'quick_path'
  'filter_value': selectedTag
});

// Article click from listing
gtag('event', 'article_click', {
  'article_title': cardTitle,
  'position': cardIndex,
  'section': 'main_feed' // or 'pinned', 'beginner', etc.
});
```

---

## 🚀 Deployment Notes

### Base URL Configuration
All articles use `<base href="/">` which assumes deployment at root domain.

**For subdirectory deployment (e.g., GitHub Pages):**
Update base href in all blog HTML files:
```html
<base href="/MIND_WEBSITE/blog/">
```

Or use relative paths consistently (current canonical URLs are absolute, so they will work).

### Cache Strategy
Manifests are fetched with `Cache-Control: no-cache` header.

**CDN Configuration:**
- Set short TTL for `manifest.json` files (5 minutes)
- Set long TTL for article HTML files (1 week)
- Invalidate cache when manifest is updated

---

## 📞 Support

**For questions about blog system architecture:**
- Review `assets/js/blog-discovery.js` (decoded logic above)
- Check manifest files for configuration examples
- Inspect Network tab to verify manifest loading

**For content updates:**
1. Edit article HTML for content changes
2. Update manifest for structural changes (pinned, tags, clusters)
3. Clear browser cache to see changes

---

**Documentation Version:** 1.0 (Phase 2, Run 4 Verified)  
**Last Audit:** All files fetched and verified against actual codebase
