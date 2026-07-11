# OpenGraph & Metadata Specification v2.0

## Mind Grace Neuropsychiatric Clinic - Social Sharing & SEO Meta Tags

**Source of Truth:** `index.html`, `about.html`, `doctors.html`, `location.html`  
**Last Updated:** 2026-07-11  
**Status:** Production Ready  
**Pages Covered:** 43 HTML files (25 main + 6 tools + 12 blog)

---

## Table of Contents

1. [Overview](#overview)
2. [Essential Meta Tags](#2-essential-meta-tags)
3. [OpenGraph Protocol](#3-opengraph-protocol)
4. [Twitter Cards](#4-twitter-cards)
5. [Page-Specific Examples](#5-page-specific-examples)
6. [Image Specifications](#6-image-specifications)
7. [Implementation Checklist](#7-implementation-checklist)

---

## Overview

### Why Metadata Matters

Proper metadata ensures your pages display correctly when:

- **Shared on social media** (Facebook, LinkedIn, WhatsApp)
- **Indexed by search engines** (Google, Bing)
- **Saved as bookmarks** (browser titles/icons)
- **Embedded in messages** (iMessage, Slack)

### Three Layers of Metadata

1. **Basic HTML Meta Tags** - Title, description, viewport
2. **OpenGraph (OG)** - Facebook/LinkedIn sharing
3. **Twitter Cards** - Twitter-specific sharing

---

## 2. Essential Meta Tags

### 2.1 Character Set & Viewport

**Required on every page:**

```html
<meta charset="utf-8" />
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=0.5, user-scalable=yes, viewport-fit=cover"
/>
```

**Explanation:**

- `charset="utf-8"` - Unicode support for all languages
- `viewport` - Responsive design with zoom limits (0.5x to 5x)
- `viewport-fit=cover` - Safe area for notched devices

### 2.2 Theme Colors

**For light/dark mode support:**

```html
<meta
  name="theme-color"
  media="(prefers-color-scheme: light)"
  content="#671B50"
/>
<meta
  name="theme-color"
  media="(prefers-color-scheme: dark)"
  content="#4A1438"
/>
<meta name="color-scheme" content="light dark" />
```

**Colors:**

- Light mode: `#671B50` (Deep Plum)
- Dark mode: `#4A1438` (Darker Plum)

### 2.3 Basic Identity

**Required on every page:**

```html
<meta name="author" content="Mind Grace Neuropsychiatric Clinic" />
<meta name="publisher" content="Mind Grace Neuropsychiatric Clinic" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
```

### 2.4 Title & Description

**Pattern:**

```html
<title>
  You Deserve Care | Mind Grace Neuropsychiatric Clinic — Psychiatrist in
  Greater Noida
</title>
<meta
  name="description"
  content="You matter. Consult Dr Anita Sharma at Mind Grace Neuropsychiatric Clinic, Greater Noida for anxiety, depression, ADHD, sleep concerns, child development, autism assessment, and psychiatric care."
/>
```

**Title Format:**

```
[Page Hook] | [Clinic Name] — [Specialty/Location]
```

**Character Limits:**

- Title: 50-60 characters (max 70)
- Description: 150-160 characters (max 300)

### 2.5 Canonical URLs

**Prevents duplicate content issues:**

```html
<link rel="canonical" href="https://mindgracencr.in/" />
```

**For alternate language versions:**

```html
<link rel="alternate" hreflang="en-IN" href="https://mindgracencr.in/" />
<link rel="alternate" hreflang="x-default" href="https://mindgracencr.in/" />
```

### 2.6 Robots & Indexing

**Control search engine behavior:**

```html
<meta
  name="robots"
  content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
/>
```

**Values:**

- `index` - Allow indexing
- `follow` - Follow links
- `max-image-preview:large` - Show large images in search
- `max-snippet:-1` - No snippet length limit
- `max-video-preview:-1` - No video preview limit

**For no-index pages:**

```html
<meta name="robots" content="noindex, nofollow" />
```

---

## 3. OpenGraph Protocol

### 3.1 Basic OpenGraph Tags

**Required for Facebook/LinkedIn sharing:**

```html
<meta
  property="og:title"
  content="You Deserve Care | Mind Grace Neuropsychiatric Clinic"
/>
<meta
  property="og:description"
  content="Mental Health care in Greater Noida for anxiety, depression, ADHD, child development & more."
/>
<meta
  property="og:image"
  content="https://mindgracencr.in/res/Dr_Anita_Sharma_Personal_Photo.jpg"
/>
<meta property="og:url" content="https://mindgracencr.in/" />
<meta property="og:site_name" content="Mind Grace Neuropsychiatric Clinic" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_IN" />
```

### 3.2 Image Properties

**For optimal display:**

```html
<meta
  property="og:image"
  content="https://mindgracencr.in/res/Dr_Anita_Sharma_Personal_Photo.jpg"
/>
<meta
  property="og:image:secure_url"
  content="https://mindgracencr.in/res/Dr_Anita_Sharma_Personal_Photo.jpg"
/>
<meta
  property="og:image:alt"
  content="Dr Anita Sharma, Consultant Psychiatrist at Mind Grace Neuropsychiatric Clinic"
/>
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="675" />
<meta property="og:image:type" content="image/jpeg" />
```

**Requirements:**

- Minimum size: 600x315 pixels
- Recommended: 1200x630 pixels (1.91:1 ratio)
- File size: Under 5MB
- Format: JPG or PNG

### 3.3 OpenGraph Types

**Use appropriate type for each page:**

| Page Type    | `og:type` Value       |
| ------------ | --------------------- |
| Homepage     | `website`             |
| About/Doctor | `profile` or `person` |
| Services     | `website`             |
| Blog Post    | `article`             |
| Conditions   | `website`             |

**For person/doctor pages:**

```html
<meta property="og:type" content="profile" />
<meta property="profile:first_name" content="Anita" />
<meta property="profile:last_name" content="Sharma" />
```

---

## 4. Twitter Cards

### 4.1 Card Type

**Choose card format:**

```html
<meta name="twitter:card" content="summary_large_image" />
```

**Available types:**

- `summary` - Small thumbnail (120x120)
- `summary_large_image` - Large image (1200x600) ✅ **Recommended**
- `app` - For mobile apps
- `player` - For videos

### 4.2 Twitter-Specific Tags

**Complete set:**

```html
<meta name="twitter:card" content="summary_large_image" />
<meta
  name="twitter:title"
  content="You Deserve Care | Mind Grace Neuropsychiatric Clinic"
/>
<meta
  name="twitter:description"
  content="You matter. Expert psychiatric care in Greater Noida."
/>
<meta
  name="twitter:image"
  content="https://mindgracencr.in/res/Dr_Anita_Sharma_Personal_Photo.jpg"
/>
<meta
  name="twitter:image:alt"
  content="Dr Anita Sharma, Consultant Psychiatrist"
/>
```

**Optional (if you have Twitter):**

```html
<meta name="twitter:site" content="@mindgraceclinic" />
<meta name="twitter:creator" content="@dranitasharma" />
```

---

## 5. Page-Specific Examples

### 5.1 Homepage (`index.html`)

```html
<!-- Basic -->
<title>
  You Deserve Care | Mind Grace Neuropsychiatric Clinic — Psychiatrist in
  Greater Noida
</title>
<meta
  name="description"
  content="You matter. Consult Dr Anita Sharma at Mind Grace Neuropsychiatric Clinic, Greater Noida for anxiety, depression, ADHD, sleep concerns, child development, autism assessment, and psychiatric care."
/>
<link rel="canonical" href="https://mindgracencr.in/" />

<!-- OpenGraph -->
<meta
  property="og:title"
  content="You Deserve Care | Mind Grace Neuropsychiatric Clinic"
/>
<meta
  property="og:description"
  content="Mental Health care in Greater Noida for anxiety, depression, ADHD, child development & more."
/>
<meta
  property="og:image"
  content="https://mindgracencr.in/res/Dr_Anita_Sharma_Personal_Photo.jpg"
/>
<meta
  property="og:image:alt"
  content="Dr Anita Sharma, Consultant Psychiatrist at Mind Grace Neuropsychiatric Clinic"
/>
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="675" />
<meta property="og:url" content="https://mindgracencr.in/" />
<meta property="og:site_name" content="Mind Grace Neuropsychiatric Clinic" />
<meta property="og:locale" content="en_IN" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta
  name="twitter:title"
  content="You Deserve Care | Mind Grace Neuropsychiatric Clinic"
/>
<meta
  name="twitter:description"
  content="You matter. Expert psychiatric care in Greater Noida."
/>
<meta
  name="twitter:image"
  content="https://mindgracencr.in/res/Dr_Anita_Sharma_Personal_Photo.jpg"
/>
<meta
  name="twitter:image:alt"
  content="Dr Anita Sharma, Consultant Psychiatrist"
/>
```

### 5.2 About Page (`about.html`)

```html
<!-- Basic -->
<title>
  About Dr Anita Sharma | Mind Grace Neuropsychiatric Clinic — Psychiatrist in
  Greater Noida
</title>
<meta
  name="description"
  content="Meet Dr Anita Sharma, consultant psychiatrist and child development specialist serving Greater Noida through Mind Grace Neuropsychiatric Clinic and Aasha Early Intervention."
/>
<link rel="canonical" href="https://mindgracencr.in/about.html" />

<!-- OpenGraph -->
<meta
  property="og:title"
  content="About Dr Anita Sharma | Mind Grace Neuropsychiatric Clinic"
/>
<meta
  property="og:description"
  content="Consultant psychiatrist and child development specialist in Greater Noida."
/>
<meta
  property="og:image"
  content="https://mindgracencr.in/res/Dr_Anita_Sharma_Personal_Photo.jpg"
/>
<meta property="og:url" content="https://mindgracencr.in/about.html" />
<meta property="og:site_name" content="Mind Grace Neuropsychiatric Clinic" />
<meta property="og:type" content="profile" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta
  name="twitter:title"
  content="About Dr Anita Sharma | Mind Grace Neuropsychiatric Clinic"
/>
<meta
  name="twitter:description"
  content="Meet Dr Anita Sharma, MBBS, DPM, MRCPsych - 15+ years experience."
/>
<meta
  name="twitter:image"
  content="https://mindgracencr.in/res/Dr_Anita_Sharma_Personal_Photo.jpg"
/>
```

### 5.3 Doctor Profile (`doctor.html`)

```html
<!-- Basic -->
<title>
  Dr. Anita Sharma | Psychiatrist in Greater Noida - Mind Grace Neuropsychiatric
  Clinic
</title>
<meta
  name="description"
  content="Meet Dr. Anita Sharma, MBBS, DPM, MRCPsych (UK) - Consultant Psychiatrist at Mind Grace Neuropsychiatric Clinic, Greater Noida. Expert in adult and child mental health with international training."
/>

<!-- OpenGraph -->
<meta
  property="og:title"
  content="Dr. Anita Sharma - Consultant Psychiatrist"
/>
<meta
  property="og:description"
  content="MBBS, DPM, MRCPsych (UK). 15+ years experience in psychiatry and child development."
/>
<meta
  property="og:image"
  content="https://mindgracencr.in/res/doctor-profile.jpg"
/>
<meta property="og:type" content="profile" />
```

### 5.4 Location Page (`location.html`)

```html
<!-- Basic -->
<title>Clinic Location & Directions | Mind Grace Neuropsychiatric Clinic</title>
<meta
  name="description"
  content="Get clinic directions for Mind Grace Neuropsychiatric Clinic in Greater Noida with landmark guidance from Alpha-1 Metro, Delta-1 Metro, Pari Chowk, schools, universities, and Knowledge Park."
/>
<link rel="canonical" href="https://www.mindgracencr.in/location.html" />

<!-- OpenGraph -->
<meta
  property="og:title"
  content="Clinic Location | Mind Grace Neuropsychiatric Clinic"
/>
<meta
  property="og:description"
  content="Find our clinic location in Gamma-2, Greater Noida with easy directions from metro stations and landmarks."
/>
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.mindgracencr.in/location.html" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
```

### 5.5 Services Page (`services.html`)

```html
<!-- Basic -->
<title>
  Our Services | Psychiatry, Psychology & Child Development - Mind Grace Clinic
</title>
<meta
  name="description"
  content="Comprehensive mental health services including psychiatric consultation, psychotherapy, psychological testing, autism assessment, ADHD support, and counseling."
/>

<!-- OpenGraph -->
<meta
  property="og:title"
  content="Mental Health Services | Mind Grace Neuropsychiatric Clinic"
/>
<meta
  property="og:description"
  content="Psychiatry, Psychology, Child Development, Autism Assessment, ADHD Support & Counseling in Greater Noida."
/>
<meta
  property="og:image"
  content="https://mindgracencr.in/res/services-overview.jpg"
/>
```

### 5.6 Blog Post (`blog/post-title.html`)

```html
<!-- Basic -->
<title>
  Understanding Anxiety: Signs, Symptoms & Treatment | Mind Grace Blog
</title>
<meta
  name="description"
  content="Learn about anxiety disorders, common symptoms, and evidence-based treatments available at Mind Grace Clinic in Greater Noida."
/>

<!-- OpenGraph -->
<meta
  property="og:title"
  content="Understanding Anxiety: Signs, Symptoms & Treatment"
/>
<meta
  property="og:description"
  content="A comprehensive guide to recognizing and treating anxiety disorders."
/>
<meta
  property="og:image"
  content="https://mindgracencr.in/res/blog/anxiety-guide.jpg"
/>
<meta property="og:type" content="article" />
<meta property="article:published_time" content="2025-06-15T09:00:00+05:30" />
<meta property="article:author" content="Dr. Anita Sharma" />
```

---

## 6. Image Specifications

### 6.1 Required Images

| Image Type      | Dimensions | Format   | Usage                  |
| --------------- | ---------- | -------- | ---------------------- |
| OG Default      | 1200x630   | JPG      | Fallback for all pages |
| Doctor Photo    | 1200x630   | JPG      | About, doctor pages    |
| Clinic Exterior | 1200x630   | JPG/WEBP | Location, homepage     |
| Services        | 1200x630   | JPG      | Services page          |
| Blog Featured   | 1200x630   | JPG      | Blog posts             |

### 6.2 Image Best Practices

**File Naming:**

```
✅ Dr_Anita_Sharma_Personal_Photo.jpg
✅ mind-grace-clinic-exterior.jpg
❌ IMG_1234.jpg
❌ image.jpg
```

**Alt Text:**

```
✅ "Dr Anita Sharma, Consultant Psychiatrist at Mind Grace Neuropsychiatric Clinic"
✅ "Warm entrance of Mind Grace Clinic with reception area"
❌ "doctor photo"
❌ "image1"
```

**Optimization:**

- Compress images (TinyPNG, Squoosh)
- Use WEBP format with JPG fallback
- Keep file size under 200KB for fast loading

---

## 7. Implementation Checklist

### Every Page Must Have:

- [ ] `<meta charset="utf-8"/>`
- [ ] `<meta name="viewport" ... />`
- [ ] `<title>` tag (50-60 chars)
- [ ] `<meta name="description">` (150-160 chars)
- [ ] `<link rel="canonical">`
- [ ] `og:title`, `og:description`, `og:image`, `og:url`
- [ ] `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

### Homepage Additional:

- [ ] `og:site_name`
- [ ] `og:locale`
- [ ] `og:type="website"`
- [ ] `hreflang` tags

### Doctor/About Pages Additional:

- [ ] `og:type="profile"` or `"person"`
- [ ] Structured data (JSON-LD)

### Blog Posts Additional:

- [ ] `og:type="article"`
- [ ] `article:published_time`
- [ ] `article:author`

### Testing Tools:

1. **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator:** https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
4. **Google Rich Results:** https://search.google.com/test/rich-results

---

## Quick Reference Template

```html
<head>
  <!-- Essential -->
  <meta charset="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, viewport-fit=cover"
  />
  <meta name="theme-color" content="#671B50" />

  <!-- Identity -->
  <meta name="author" content="Mind Grace Neuropsychiatric Clinic" />
  <meta name="publisher" content="Mind Grace Neuropsychiatric Clinic" />

  <!-- SEO -->
  <title>[Page Title] | Mind Grace Neuropsychiatric Clinic</title>
  <meta name="description" content="[150-160 char description]" />
  <link rel="canonical" href="https://mindgracencr.in/[page].html" />
  <meta name="robots" content="index, follow" />

  <!-- OpenGraph -->
  <meta property="og:title" content="[Page Title]" />
  <meta property="og:description" content="[Description]" />
  <meta property="og:image" content="https://mindgracencr.in/res/[image].jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://mindgracencr.in/[page].html" />
  <meta property="og:site_name" content="Mind Grace Neuropsychiatric Clinic" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_IN" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="[Page Title]" />
  <meta name="twitter:description" content="[Description]" />
  <meta
    name="twitter:image"
    content="https://mindgracencr.in/res/[image].jpg"
  />
</head>
```

---

**Last Reviewed:** 2025-07-02  
**Next Review:** 2025-10-01
