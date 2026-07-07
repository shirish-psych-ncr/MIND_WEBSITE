# Structured Data Schemas v2.0
## Mind Grace Neuropsychiatric Clinic - JSON-LD Implementation

**Source of Truth:** All 50 HTML pages verified  
**Last Updated:** 2025-07-02  
**Status:** Production Ready  
**Asset Sync:** Paths updated to /assets/* (assets.md v6.0)

---

## Table of Contents

1. [Overview](#overview)
2. [Organization Schema](#2-organization-schema)
3. [Physician Schema](#3-physician-schema)
4. [LocalBusiness Schema](#4-localbusiness-schema)
5. [MedicalBusiness Schema](#5-medicalbusiness-schema)
6. [MedicalService Schema](#6-medicalservice-schema)
7. [BreadcrumbList Schema](#7-breadcrumblist-schema)
8. [FAQPage Schema](#8-faqpage-schema)
9. [Article/BlogPosting Schema](#9-articleblogposting-schema)
10. [Implementation Guidelines](#implementation-guidelines)

---

## Overview

### Why Structured Data?

Structured data (JSON-LD) helps search engines understand your content better, leading to:
- **Rich Snippets** in search results
- **Knowledge Panels** for local businesses
- **Enhanced visibility** in Google Maps
- **Better indexing** of medical services
- **Voice search optimization**

### Implementation Pattern

All schemas are implemented as inline `<script type="application/ld+json">` tags in the `<head>` section of relevant HTML pages.

```html
<head>
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "...",
      ...
    }
  </script>
</head>
```

---

## 2. Organization Schema

**Used On:** `index.html`, all main pages

**Purpose:** Establishes clinic identity across all pages

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Mind Grace Neuropsychiatric Clinic",
  "alternateName": "Mind Grace Clinic",
  "url": "https://mindgracencr.in/",
  "logo": "https://mindgracencr.in/res/Mind_Grace_Clinic_Logo_Pink.svg",
  "description": "Compassionate psychiatric care and child development services in Greater Noida",
  "foundingDate": "2020",
  "founders": [
    {
      "@type": "Person",
      "name": "Dr. Anita Sharma"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "J-123, Gamma-2",
    "addressLocality": "Greater Noida",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "201310",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.4910152,
    "longitude": 77.5132324
  },
  "telephone": "+91-96678-63295",
  "email": "contact@mindgracencr.in",
  "availableLanguage": ["English", "Hindi", "Punjabi"],
  "medicalSpecialty": ["Psychiatry", "Psychology", "Child Development"],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.facebook.com/mindgraceclinic",
    "https://www.instagram.com/mindgraceclinic",
    "https://www.linkedin.com/company/mindgraceclinic"
  ]
}
```

**Key Properties:**
- `@type`: MedicalOrganization
- `medicalSpecialty`: Array of specialties
- `openingHoursSpecification`: Days and times
- `sameAs`: Social media profiles

---

## 3. Physician Schema

**Used On:** `about.html`, `doctor.html`, `doctors.html`

**Purpose:** Describes individual doctors with credentials

```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Anita Sharma",
  "givenName": "Anita",
  "familyName": "Sharma",
  "honorificPrefix": "Dr.",
  "medicalSpecialty": ["Psychiatry", "Child Development"],
  "education": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Medical Degree",
      "name": "MBBS - Bachelor of Medicine, Bachelor of Surgery",
      "educationalInstitution": {
        "@type": "CollegeOrUniversity",
        "name": "King George's Medical College",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Lucknow",
          "addressCountry": "IN"
        }
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Specialization",
      "name": "DPM - Diploma in Psychological Medicine",
      "educationalInstitution": {
        "@type": "MedicalOrganization",
        "name": "Institute of Human Behaviour and Allied Sciences",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Delhi",
          "addressCountry": "IN"
        }
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "International Certification",
      "name": "MRCPsych - Member of Royal College of Psychiatrists",
      "educationalInstitution": {
        "@type": "Hospital",
        "name": "Maudsley Hospital",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "London",
          "addressCountry": "GB"
        }
      }
    }
  ],
  "worksFor": {
    "@type": "MedicalBusiness",
    "name": "Mind Grace Neuropsychiatric Clinic",
    "url": "https://mindgracencr.in/"
  },
  "jobTitle": "Consultant Psychiatrist",
  "yearsOfExperience": "15",
  "telephone": "+91-96678-63295",
  "availableLanguage": ["English", "Hindi", "Punjabi"],
  "knowsAbout": [
    "Anxiety Disorders",
    "Depression",
    "Bipolar Disorder",
    "OCD",
    "ADHD",
    "Autism Spectrum Disorder",
    "Child Psychology",
    "Psychotherapy"
  ]
}
```

**Key Properties:**
- `education`: Array of credentials
- `worksFor`: Link to organization
- `knowsAbout`: Areas of expertise
- `yearsOfExperience`: Number of years

---

## 4. LocalBusiness Schema

**Used On:** `location.html`, `contact.html`, `index.html`

**Purpose:** Improves local SEO and Google Maps presence

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Mind Grace Neuropsychiatric Clinic",
  "image": "https://mindgracencr.in/res/mind-grace-entry-n-reception.webp",
  "url": "https://mindgracencr.in/location.html",
  "telephone": "+91-96678-63295",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "J-123, Gamma-2",
    "addressLocality": "Greater Noida",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "201310",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.4910152,
    "longitude": 77.5132324
  },
  "areaServed": [
    "Greater Noida",
    "Alpha-1",
    "Delta-1",
    "Pari Chowk",
    "Knowledge Park",
    "Surajpur",
    "Noida",
    "Ghaziabad"
  ],
  "availableLanguage": ["English", "Hindi", "Punjabi"],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "20:00"
  },
  "acceptsReservations": "true",
  "paymentAccepted": ["Cash", "Credit Card", "UPI", "Insurance"],
  "currenciesAccepted": "INR",
  "nearbyLandmarks": [
    "Alpha-1 Metro Station (2.5 km)",
    "Delta-1 Metro Station (3 km)",
    "Pari Chowk (4 km)",
    "Galaxy School (1 km)",
    "Amity University (3 km)"
  ]
}
```

**Key Properties:**
- `areaServed`: List of localities
- `nearbyLandmarks`: Navigation aids
- `paymentAccepted`: Payment methods
- `priceRange`: Cost indicator (₹ to ₹₹₹₹)

---

## 5. MedicalBusiness Schema

**Used On:** `services.html`, `index.html`

**Purpose:** Combines LocalBusiness with medical specialization

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Mind Grace Neuropsychiatric Clinic",
  "medicalSpecialty": [
    "Psychiatry",
    "Clinical Psychology",
    "Child Psychology",
    "Neuropsychiatry"
  ],
  "availableService": [
    {
      "@type": "MedicalTherapy",
      "name": "Psychiatric Consultation",
      "description": "Comprehensive mental health evaluation and treatment planning"
    },
    {
      "@type": "MedicalTherapy",
      "name": "Psychotherapy",
      "description": "Individual, couple, and family counseling sessions"
    },
    {
      "@type": "MedicalTest",
      "name": "Psychological Assessment",
      "description": "Standardized testing for mental health conditions"
    },
    {
      "@type": "MedicalTherapy",
      "name": "Child Development Services",
      "description": "Autism assessment, ADHD support, speech therapy"
    }
  ],
  "url": "https://mindgracencr.in/",
  "telephone": "+91-96678-63295",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "J-123, Gamma-2",
    "addressLocality": "Greater Noida",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "201310",
    "addressCountry": "IN"
  }
}
```

**Key Properties:**
- `medicalSpecialty`: Array of specialties
- `availableService`: List of services offered

---

## 6. MedicalService Schema

**Used On:** Individual service pages (`services.html`, condition-specific pages)

**Purpose:** Detailed schema for each treatment/service

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  "name": "Cognitive Behavioral Therapy (CBT)",
  "description": "Evidence-based psychotherapy for anxiety, depression, and mood disorders",
  "provider": {
    "@type": "MedicalOrganization",
    "name": "Mind Grace Neuropsychiatric Clinic"
  },
  "usedToTreat": [
    {
      "@type": "MedicalCondition",
      "name": "Anxiety Disorder"
    },
    {
      "@type": "MedicalCondition",
      "name": "Depression"
    },
    {
      "@type": "MedicalCondition",
      "name": "OCD"
    }
  ],
  "therapyType": "Psychotherapy",
  "howPerformed": "Individual sessions with trained therapist using CBT techniques",
  "sessionDuration": "PT45M",
  "typicalSessions": "8-12 sessions",
  "availableLanguage": ["English", "Hindi"]
}
```

**ISO 8601 Duration Format:**
- `PT45M` = 45 minutes
- `PT1H` = 1 hour
- `PT1H30M` = 1 hour 30 minutes

---

## 7. BreadcrumbList Schema

**Used On:** All pages except homepage

**Purpose:** Shows page hierarchy in search results

```json
{
  "@context": "https://schema.org",
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
      "name": "Services",
      "item": "https://mindgracencr.in/services.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Psychiatry",
      "item": "https://mindgracencr.in/services.html#psychiatry"
    }
  ]
}
```

**Implementation Pattern:**
```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [...]
  }
</script>
```

---

## 8. FAQPage Schema

**Used On:** `faq.html`

**Purpose:** Enables FAQ rich snippets in search results

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What should I expect during my first consultation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your first consultation typically lasts 45-60 minutes. Dr. Sharma will discuss your concerns, medical history, and current symptoms. Together, you'll develop a personalized treatment plan that may include therapy, medication, or both."
      }
    },
    {
      "@type": "Question",
      "name": "Do you accept insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we accept most major health insurance plans including HDFC Ergo, ICICI Lombard, and Star Health. Please contact us to verify your specific coverage."
      }
    },
    {
      "@type": "Question",
      "name": "Are consultations confidential?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. All consultations are strictly confidential as per the Mental Healthcare Act 2017. Your information is never shared without your explicit consent, except in rare cases where there's immediate risk of harm."
      }
    }
  ]
}
```

**Best Practices:**
- Include at least 3-5 FAQs
- Use clear, concise answers
- Match visible FAQ content on page

---

## 9. Article/BlogPosting Schema

**Used On:** Blog post pages (`blog/*.html`)

**Purpose:** Enhances blog posts in search results

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Understanding Anxiety: Signs, Symptoms, and When to Seek Help",
  "alternativeHeadline": "A Comprehensive Guide to Anxiety Disorders",
  "image": "https://mindgracencr.in/res/blog/anxiety-guide.jpg",
  "datePublished": "2025-06-15",
  "dateModified": "2025-06-20",
  "author": {
    "@type": "Physician",
    "name": "Dr. Anita Sharma",
    "jobTitle": "Consultant Psychiatrist"
  },
  "publisher": {
    "@type": "MedicalOrganization",
    "name": "Mind Grace Neuropsychiatric Clinic",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mindgracencr.in/res/Mind_Grace_Clinic_Logo_Pink.svg"
    }
  },
  "description": "Learn about anxiety disorders, common symptoms, and evidence-based treatments available at Mind Grace Clinic.",
  "articleBody": "Anxiety is a normal human emotion...",
  "wordCount": "1500",
  "articleSection": "Mental Health Education",
  "keywords": ["anxiety", "mental health", "therapy", "CBT", "Greater Noida"],
  "inLanguage": "en-IN"
}
```

---

## 10. Implementation Guidelines

### 10.1 Where to Add Schemas

| Page Type | Primary Schema | Additional Schemas |
|-----------|---------------|-------------------|
| Homepage | Organization | LocalBusiness, MedicalBusiness |
| About | Physician | Organization |
| Doctor Profile | Physician | BreadcrumbList |
| Location | LocalBusiness | Organization |
| Services | MedicalBusiness | MedicalService |
| Conditions | MedicalCondition | BreadcrumbList |
| FAQ | FAQPage | BreadcrumbList |
| Blog Post | BlogPosting | BreadcrumbList |

### 10.2 Multiple Schemas on One Page

You can include multiple schemas by either:
1. **Separate script tags:**
```html
<script type="application/ld+json">{...}</script>
<script type="application/ld+json">{...}</script>
```

2. **Array format:**
```html
<script type="application/ld+json">
[
  {...},
  {...}
]
</script>
```

### 10.3 Required Fields Checklist

**Minimum required for LocalBusiness:**
- ✅ `@context`
- ✅ `@type`
- ✅ `name`
- ✅ `address`
- ✅ `telephone`
- ✅ `geo` (latitude/longitude)

**Minimum required for Physician:**
- ✅ `@context`
- ✅ `@type`
- ✅ `name`
- ✅ `medicalSpecialty`
- ✅ `worksFor`

### 10.4 Testing & Validation

**Tools:**
1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema Markup Validator](https://validator.schema.org/)
3. [Google Search Console](https://search.google.com/search-console)

**Testing Process:**
1. Add schema to page
2. Run URL through Rich Results Test
3. Fix any errors/warnings
4. Monitor Search Console for indexing

### 10.5 Common Errors to Avoid

❌ **Missing @context:**
```json
// Wrong
{
  "@type": "LocalBusiness",
  ...
}

// Correct
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  ...
}
```

❌ **Invalid URLs:**
```json
// Wrong - relative URL
"url": "/location.html"

// Correct - absolute URL
"url": "https://mindgracencr.in/location.html"
```

❌ **Mismatched Data:**
Ensure schema data matches visible content on page

### 10.6 Maintenance Schedule

- **Monthly:** Review schemas for accuracy
- **Quarterly:** Update doctor credentials
- **Annually:** Verify business hours, contact info
- **On Change:** Immediately update when services/prices change

---

## Quick Reference: Schema Types

| Schema Type | Use Case | Priority |
|-------------|----------|----------|
| MedicalOrganization | Clinic identity | 🔴 Critical |
| LocalBusiness | Local SEO | 🔴 Critical |
| Physician | Doctor profiles | 🔴 Critical |
| MedicalService | Service pages | 🟡 High |
| BreadcrumbList | Navigation | 🟡 High |
| FAQPage | FAQ page | 🟢 Medium |
| BlogPosting | Blog articles | 🟢 Medium |
| MedicalCondition | Condition pages | 🟢 Medium |

---

## References

- [Schema.org Medical Extensions](https://schema.org/docs/extension.html)
- [Google Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Healthcare Schema Best Practices](https://schema.org/Healthcare)

---

**Last Reviewed:** 2025-07-02  
**Next Review:** 2025-10-01
