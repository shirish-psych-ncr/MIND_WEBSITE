# 📄 PAGE REGISTRY — Mind Grace Neuropsychiatric Clinic

**Version:** 14.3 | **Format:** Machine-Readable | **Last Verified:** 2026-07-11
**Framework:** Static HTML/Vanilla JS (No Build Tools)
**Total Pages:** 43 HTML files
**Status:** Full markdown audit complete, v14.3 sync

## 1. CORE PAGES (Root Level) - 25 Files

| File                 | Current URL             | Target URL          | Lines | Purpose                         | Layout          | Status      |
| -------------------- | ----------------------- | ------------------- | ----- | ------------------------------- | --------------- | ----------- |
| index.html           | `/`                     | `/`                 | 390   | Homepage, Hero, Services, Trust | BaseLayout      | ✅ Complete |
| about.html           | `/about.html`           | `/about`            | 375   | Clinic story, Team, Approach    | BaseLayout      | ✅ v2.0     |
| services.html        | `/services.html`        | `/services`         | 369   | Service listing, Categories     | BaseLayout      | ✅ v2.0     |
| conditions.html      | `/conditions.html`      | `/conditions`       | 580   | Condition encyclopedia          | BaseLayout      | ✅ v2.0     |
| doctors.html         | `/doctors.html`         | `/doctors`          | 580   | Dual-clinician profiles         | ClinicianLayout | ✅ v3.0     |
| location.html        | `/location.html`        | `/location`         | 366   | Map, Address, Directions        | BaseLayout      | ✅ v2.0     |
| contact.html         | `/contact.html`         | `/contact`          | 496   | Contact form, Info cards        | BaseLayout      | ✅ v2.0     |
| faq.html             | `/faq.html`             | `/faq`              | 253   | FAQ accordion                   | BaseLayout      | ✅ v2.0     |
| testimonials.html    | `/testimonials.html`    | `/testimonials`     | 257   | Patient reviews                 | BaseLayout      | ✅ v2.0     |
| process.html         | `/process.html`         | `/process`          | 393   | Treatment journey steps         | BaseLayout      | ✅ v2.0     |
| fees.html            | `/fees.html`            | `/fees`             | 515   | Pricing tables, Insurance       | BaseLayout      | ✅ v2.0     |
| consent.html         | `/consent.html`         | `/legal/consent`    | 200   | Consent forms                   | LegalLayout     | ✅ Complete |
| privacy.html         | `/privacy.html`         | `/legal/privacy`    | 200   | Privacy policy                  | LegalLayout     | ✅ Complete |
| emergency.html       | `/emergency.html`       | `/emergency`        | 439   | Crisis resources                | EmergencyLayout | ✅ v2.0     |
| thank-you.html       | `/thank-you.html`       | `/thank-you`        | 88    | Form success message            | BaseLayout      | ✅ Complete |
| 404.html             | N/A                     | `/*` (catch-all)    | 23    | Error page                      | ErrorLayout     | ✅ Complete |
| aasha.html           | `/aasha.html`           | `/aasha`            | 249   | Aasha NGO initiative            | BaseLayout      | ✅ v2.0     |
| approach.html        | `/approach.html`        | `/approach`         | 306   | Biopsychosocial model           | BaseLayout      | ✅ v2.0     |
| resources.html       | `/resources.html`       | `/resources`        | 195   | Resource library                | BaseLayout      | ✅ Complete |
| gallery.html         | `/gallery.html`         | `/gallery`          | 214   | Photo gallery                   | BaseLayout      | ✅ Complete |
| terms.html           | `/terms.html`           | `/legal/terms`      | 200   | Terms & Conditions              | LegalLayout     | ✅ Complete |
| disclaimer.html      | `/disclaimer.html`      | `/legal/disclaimer` | 200   | Medical Disclaimer              | LegalLayout     | ✅ Complete |
| book.html            | `/book.html`            | `/book`             | 340   | Booking gateway                 | BaseLayout      | ✅ v2.0     |
| dr-anita-sharma.html | `/dr-anita-sharma.html` | → `/doctors`        | 400   | Legacy profile                  | BaseLayout      | ⚠️ Redirect |
| mind-grace.html      | `/mind-grace.html`      | → `/`               | 400   | Alternative landing             | BaseLayout      | ⚠️ Redirect |

## 2. TOOL PAGES (Interactive Therapy) - 6 Files

| File                  | Current URL                    | Target URL                | Lines | Tool             | CSS                 | JS                 | Status      |
| --------------------- | ------------------------------ | ------------------------- | ----- | ---------------- | ------------------- | ------------------ | ----------- |
| guided-breathing.html | `/tools/guided-breathing.html` | `/tools/breathing`        | 128   | Box breathing    | tools-breathing.css | tools-breathing.js | ✅ Complete |
| butterfly-tapper.html | `/tools/butterfly-tapper.html` | `/tools/butterfly-tapper` | 44    | EMDR tapping     | tools-butterfly.css | tools-butterfly.js | ✅ Complete |
| eye-movement.html     | `/tools/eye-movement.html`     | `/tools/eye-movement`     | 109   | EMDR tracking    | tools-eye.css       | tools-eye.js       | ✅ Complete |
| hypnos-fractal.html   | `/tools/hypnos-fractal.html`   | `/tools/fractal`          | 173   | Hypnotic visual  | tools-fractal.css   | tools-fractal.js   | ✅ Complete |
| horizon-scan.html     | `/tools/horizon-scan.html`     | `/tools/horizon-scan`     | 107   | Grounding scan   | tools-horizon.css   | tools-horizon.js   | ✅ Complete |
| leaf-on-stream.html   | `/tools/leaf-on-stream.html`   | `/tools/leaf-on-stream`   | 35    | Mindfulness flow | tools-leaf.css      | tools-leaf.js      | ✅ Complete |

## 3. BLOG PAGES (/blog/*) - 12 Files

### Index & Category Pages

| File               | Current URL           | Target URL    | Lines | Purpose               | Config               | Status      |
| ------------------ | --------------------- | ------------- | ----- | --------------------- | -------------------- | ----------- |
| blog/index.html    | `/blog/`              | `/blog`       | 224   | Blog homepage         | -                    | ✅ Complete |
| blog/adult.html    | `/blog/adult.html`    | `/blog/adult` | 200   | Adult mental health   | blog-config-adult.js | ✅ Complete |
| blog/children.html | `/blog/children.html` | `/blog/child` | 200   | Child development hub | blog-config-child.js | ✅ Complete |

### Adult Articles (5 Files)

| File                                | Current URL             | Target URL                             | Lines | Topic                  | Status      |
| ----------------------------------- | ----------------------- | -------------------------------------- | ----- | ---------------------- | ----------- |
| overthinking-vs-anxiety.html        | `/blog/pages/adult/...` | `/blog/adult/overthinking-vs-anxiety`  | 31    | Differential diagnosis | ✅ Complete |
| scheduled-worry-time-technique.html | `/blog/pages/adult/...` | `/blog/adult/scheduled-worry-time`     | 281   | CBT technique          | ✅ Complete |
| sleep-and-anxiety-cycle.html        | `/blog/pages/adult/...` | `/blog/adult/sleep-anxiety-cycle`      | 150   | Sleep hygiene          | ✅ Complete |
| stimulus-control-therapy.html       | `/blog/pages/adult/...` | `/blog/adult/stimulus-control`         | 254   | Insomnia treatment     | ✅ Complete |
| when-to-see-a-psychiatrist.html     | `/blog/pages/adult/...` | `/blog/adult/when-to-see-psychiatrist` | 35    | Help-seeking guide     | ✅ Complete |

### Child Articles (4 Files)

| File                          | Current URL             | Target URL                         | Lines | Topic              | Status      |
| ----------------------------- | ----------------------- | ---------------------------------- | ----- | ------------------ | ----------- |
| early-signs-of-autism.html    | `/blog/pages/child/...` | `/blog/child/early-signs-autism`   | 31    | Autism screening   | ✅ Complete |
| school-concerns-and-adhd.html | `/blog/pages/child/...` | `/blog/child/adhd-school-concerns` | 35    | ADHD in school     | ✅ Complete |
| sensory-overload-at-home.html | `/blog/pages/child/...` | `/blog/child/sensory-overload`     | 31    | Sensory processing | ✅ Complete |
| speech-delay-red-flags.html   | `/blog/pages/child/...` | `/blog/child/speech-delay-flags`   | 35    | Speech development | ✅ Complete |

## 4. SPECIAL PAGES

| File           | URL          | Lines | Purpose                           | Status     |
| -------------- | ------------ | ----- | --------------------------------- | ---------- |
| aasha.html     | `/aasha`     | 249   | Aasha community initiative (NGO)  | ✅ v2.0    |
| approach.html  | `/approach`  | 306   | Biopsychosocial model explanation | ✅ v2.0    |
| resources.html | `/resources` | 195   | Resource library                  | ⏳ Pending |
| gallery.html   | `/gallery`   | 214   | Photo gallery                     | ⏳ Pending |

## 5. LAYOUT INVENTORY

| Layout          | Used By                             | Components                               | Status                |
| --------------- | ----------------------------------- | ---------------------------------------- | --------------------- |
| BaseLayout      | All standard pages                  | Header, Footer, Nav, SEO                 | ✅ Complete           |
| ClinicianLayout | doctors.html                        | JumpButtons, ServiceComparison, Timeline | ✅ v3.0               |
| ArticleLayout   | blog/pages/*                        | TOC, AuthorBio, RelatedArticles          | ✅ Implemented inline |
| LegalLayout     | consent, privacy, terms, disclaimer | LegalNav, Disclaimer                     | ✅ Implemented inline |
| EmergencyLayout | emergency.html                      | CrisisBanner, QuickLinks, HighContrast   | ✅ Complete           |
| ErrorLayout     | 404.html                            | ErrorState, BackHome                     | ✅ Implemented inline |
| ToolLayout      | tool pages                          | ToolFrame, Instructions, Reset           | ✅ Implemented inline |

## 6. MIGRATION PRIORITY

| Priority | Pages                          | Reason                         | Effort |
| -------- | ------------------------------ | ------------------------------ | ------ |
| P0       | index.html, doctors.html       | Homepage + Core conversion hub | Low    |
| P1       | services.html, conditions.html | Core clinical content          | Medium |
| P2       | blog/pages/*                   | SEO, content marketing         | High   |
| P3       | tool pages                     | Interactive features           | Medium |
| P4       | legal, error, templates        | Supporting pages               | Low    |

## 7. INTERNAL LINKING AUDIT

- [x] Header navigation consistent across refactored pages
- [x] Footer 4-column layout on all v2.0 pages
- [x] Mobile nav toggle working on all v2.0 pages
- [ ] Add breadcrumbs to all pages
- [ ] Link conditions→services→doctors
- [ ] Link articles→related conditions
- [ ] Add footer sitemap links
- [x] Add `doctors.html` link to main navigation
- [x] Update `doctor.html` content merged into `doctors.html`
- [x] Fixed blog/pages/adult/* relative paths (../../)
- [x] Fixed blog/children.html navigation paths
- [x] Created terms.html and disclaimer.html
- [x] Updated Google Form embed URL in book.html
- [x] Updated Google Maps review link in testimonials.html
- [x] Fixed root-relative favicon paths in location.html

## 8. CONTENT GUIDELINES

### Dual-Clinician Model

- **Dr. Anita Sharma (Psychiatrist, MD):** Adult mental health, medication management
  - MCI: 11-40210, HPR: 71-2147-5815-3754
- **Dr. Sana Firdous (Clinical Psychologist, M.Phil):** Child development, psychotherapy
  - RCI: A82170
- **Shared Location:** J-123, Gamma-2, Greater Noida, UP 201308
- **Contact:** +91-96678-63295, dranitasharma86@gmail.com

### Tone Guidelines

- **Mind Grace (Adult):** Professional, reassuring, authoritative, non-judgmental
- **Aasha (Child):** Warm, nurturing, hopeful, strength-focused, play-based
- **Emergency:** Direct, high-contrast, immediate action-oriented

## 9. ASSET INVENTORY

| Asset Type         | Location                                        | Status     | Notes                    |
| ------------------ | ----------------------------------------------- | ---------- | ------------------------ |
| Clinic Logo (Pink) | res/MindGraceClinicLogo_Pink.svg                | ✅ Present | Primary header logo      |
| Clinic Logo (Full) | res/Mind_Grace_Clinic_Logo.webp                  | ✅ Present | Fallback PNG             |
| Hero Images        | images/aasha-hero.svg, images/approach-hero.svg | ✅ Present | SVG hero graphics        |
| Doctor Photo       | res/Dr_Anita_Sharma_Personal_Photo.webp          | ✅ Present | Dr. Anita Sharma profile |
| Location Photos    | res/Location_street_view_*.webp                  | ✅ Present | Street view images       |
| Favicons           | Inline base64 SVG                               | ✅ Present | Embedded in all pages    |
| Brochures          | res/*_Brochure.webp                              | ✅ Present | AASHA & Clinic brochures |

## 10. EXTERNAL INTEGRATIONS

| Service                | URL                                                                                | Status    | Notes                              |
| ---------------------- | ---------------------------------------------------------------------------------- | --------- | ---------------------------------- |
| Google Forms (Booking) | docs.google.com/forms/d/e/1FAIpQLSfr5yRtw_iWqw6rnigQ-pgw86Q_6ipIScgzS5lqf0DIdpF0ag | ✅ Active | Embedded in book.html              |
| Google Maps (Location) | maps.app.goo.gl/NorMGtR8Uqu5eM8G9                                                  | ✅ Active | Clinic directions                  |
| Google Maps (Reviews)  | maps.app.goo.gl/NorMGtR8Uqu5eM8G9                                                  | ✅ Active | Testimonials link                  |
| Leaflet JS (Maps)      | unpkg.com/leaflet@1.9.4                                                            | ✅ CDN    | location.html interactive map      |
| Google Fonts           | fonts.googleapis.com                                                               | ✅ CDN    | Inter + Playfair Display           |
| Domain                 | mindgracencr.in                                                                    | ⚠️ DNS    | External hosting/DNS config needed |

## 11. URL RESTRUCTURING PLAN (v6.0)

### Philosophy

- Clean, semantic URLs without `.html` extensions
- Hierarchical structure reflecting content relationships
- Consistent patterns across all sections
- SEO-friendly slugs with hyphens
- Redirect old URLs to preserve SEO equity

### URL Patterns

#### Core Pages (Flat Structure)

```
/                    → Homepage
/about               → About clinic
/services            → Services overview
/doctors             → Clinician profiles
/location            → Clinic location
/contact             → Contact form
/faq                 → FAQ
/testimonials        → Patient reviews
/process             → Treatment process
/fees                → Pricing & insurance
/emergency           → Emergency resources
/aasha               → Aasha NGO initiative
/approach            → Our approach
/resources           → Resource library
/gallery             → Photo gallery
/book                → Book appointment
```

#### Legal Pages (Grouped)

```
/legal/consent       → Consent forms
/legal/privacy       → Privacy policy
/legal/terms         → Terms & conditions
/legal/disclaimer    → Medical disclaimer
```

#### Therapeutic Tools (Grouped)

```
/tools/breathing          → Guided breathing exercise
/tools/butterfly-tapper   → Butterfly tapper EMDR
/tools/eye-movement       → EMDR eye movement
/tools/fractal            → Hypnotic fractal visual
/tools/horizon-scan       → Horizon scanning calm
/tools/leaf-on-stream     → Leaf meditation flow
```

#### Blog (Hierarchical)

```
/blog                     → Blog homepage
/blog/adult               → Adult mental health category
/blog/child               → Child development category
/blog/adult/[slug]        → Individual adult articles
/blog/child/[slug]        → Individual child articles
```

#### Redirects Required

```
/doctor.html              → 301 → /doctors
/mind-grace.html          → 301 → /
/blog/children.html       → 301 → /blog/child
/*.html                   → 301 → /* (strip .html)
```

### Implementation Notes

1. Use Netlify/Vercel redirect rules for .html stripping
2. Update all internal links to use clean URLs
3. Add canonical tags pointing to clean URLs
4. Generate sitemap.xml with clean URLs only
5. Implement 301 redirects for all old URLs

---

_Ref: All .html files verified via wc -l and grep. Auto-update on page changes. Cross-ref: Instructions.md §KB_READ, memory.md §STATE, design.md §1-§9, worker.md §1-§10, ARCHITECTURE.md §5. END_ON_SYNC._
