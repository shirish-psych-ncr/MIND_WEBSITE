# PAGE_REGISTRY [v3.0] - Mind Grace Neuropsychiatric Clinic
**Mode:** Machine-Readable | **Format:** Dense-Table | **Update:** Auto(post-turn) | **Last Verified:** $(date)

## 1. CORE_PAGES (Root level)
| File | Lines | Purpose | Layout | Status | Notes |
|---|---|---|---|---|---|
| index.html | 390 | Homepage, Hero, Services, Trust | BaseLayout | ✓ MobileFirst | Template reference for all pages |
| about.html | 375 | Clinic story, Team, Approach | BaseLayout | ✓ Refactored v2.0 | Features grid, check-list, gallery |
| services.html | 369 | Service listing, Categories | BaseLayout | ✓ Refactored v2.0 | Adult + Child sections, card grids |
| conditions.html | 1 | Condition encyclopedia | BaseLayout | ⚠️ Broken/Empty | TODO: Rewrite from scratch |
| doctors.html | 580 | Dual-clinician profile (Psychiatrist + Psychologist) | ClinicianLayout | ✓ Complete v3.0 | Jump buttons, service comparison, Dr. Anita + Dr. Sana |
| doctor.html | 296 | Legacy single doctor profile | BaseLayout | ⚠️ Deprecated | Superseded by doctors.html; keep for SEO redirect |
| location.html | 366 | Map, Address, Directions | BaseLayout | ✓ Fixed v2.0 | Header repaired, Leaflet map integrated |
| contact.html | 496 | Contact form, Info cards | BaseLayout | ✓ Refactored v2.0 | Form validation, emergency notice |
| faq.html | 253 | FAQ accordion | BaseLayout | ✓ Refactored v2.0 | Categorized accordions |
| testimonials.html | 257 | Patient reviews | BaseLayout | ✓ Refactored v2.0 | Grid layout, star ratings |
| process.html | 393 | Treatment journey steps | BaseLayout | ✓ Refactored v2.0 | Timeline, numbered steps |
| fees.html | 515 | Pricing tables, Insurance | BaseLayout | ✓ Refactored v2.0 | Transparent pricing, payment methods |
| consent.html | 8 | Consent forms | LegalLayout | ⚠️ Minimal | TODO: Full rewrite needed |
| privacy.html | 8 | Privacy policy | LegalLayout | ⚠️ Minimal | TODO: Full rewrite needed |
| emergency.html | 439 | Crisis resources | EmergencyLayout | ✓ Refactored v2.0 | High contrast, helplines prominent |
| thank-you.html | 88 | Form success message | BaseLayout | ⚠️ Basic | TODO: Enhance with next steps |
| 404.html | 23 | Error page | ErrorLayout | ⚠️ Basic | TODO: Branded error page |
| aasha.html | 249 | Aasha NGO initiative | BaseLayout | ✓ Refactored v2.0 | Animated counters, programs grid |
| approach.html | 306 | Biopsychosocial model | BaseLayout | ✓ Refactored v2.0 | Pillar cards, methodology |
| resources.html | 195 | Resource library | BaseLayout | ⚠️ Pending | TODO: Responsive rewrite |
| gallery.html | 214 | Photo gallery | BaseLayout | ⚠️ Pending | TODO: Masonry layout |

## 2. TOOL_PAGES (Interactive therapy tools)
| File | Lines | Tool | CSS | JS | Status |
|---|---|---|---|---|---|
| guided-breathing.html | 128 | Box breathing exercise | tools-breathing.css | tools-breathing.js | ⚠️ TODO: Hydrate |
| butterfly-tapper.html | 44 | Butterfly tapper EMDR | tools-butterfly.css | tools-butterfly.js | ⚠️ TODO: Hydrate |
| eye-movement.html | 109 | EMDR eye movement | tools-eye.css | tools-eye.js | ⚠️ TODO: Hydrate |
| hypnos-fractal.html | 173 | Hypnotic fractal visual | tools-fractal.css | tools-fractal.js | ⚠️ TODO: Hydrate |
| horizon-scan.html | 107 | Horizon scanning calm | tools-horizon.css | tools-horizon.js | ⚠️ TODO: Hydrate |
| leaf-on-stream.html | 35 | Leaf meditation flow | tools-leaf.css | tools-leaf.js | ⚠️ TODO: Hydrate |
| book.html | 340 | Booking form gate | tools-book.css | tools-book.js | ✓ Refactored v2.0 |

## 3. BLOG_PAGES (/blog/*)
### Index & Category Pages
| File | Lines | Purpose | Config | Status |
|---|---|---|---|---|
| blog/index.html | 224 | Blog homepage | - | ⚠️ TODO: Responsive |
| blog/adult.html | 200 | Adult mental health articles | blog-config-adult.js | ⚠️ TODO: Responsive |
| blog/child.html | 23 | Child development articles | blog-config-child.js | ⚠️ TODO: Responsive |

### Adult Articles (/blog/pages/adult/*)
| File | Lines | Topic | Status |
|---|---|---|---|
| overthinking-vs-anxiety.html | 31 | Differential diagnosis | ⚠️ Minimal content |
| scheduled-worry-time-technique.html | 281 | CBT technique | ⚠️ Needs template |
| sleep-and-anxiety-cycle.html | 150 | Sleep hygiene | ⚠️ Needs template |
| stimulus-control-therapy.html | 254 | Insomnia treatment | ⚠️ Needs template |
| when-to-see-a-psychiatrist.html | 35 | Help-seeking guide | ⚠️ Minimal content |

### Child Articles (/blog/pages/child/*)
| File | Lines | Topic | Status |
|---|---|---|---|
| early-signs-of-autism.html | 31 | Autism screening | ⚠️ Minimal content |
| school-concerns-and-adhd.html | 35 | ADHD in school | ⚠️ Minimal content |
| sensory-overload-at-home.html | 31 | Sensory processing | ⚠️ Minimal content |
| speech-delay-red-flags.html | 35 | Speech development | ⚠️ Minimal content |

## 4. SPECIAL_PAGES
| File | Lines | Purpose | Status |
|---|---|---|---|
| aasha.html | 249 | Aasha community initiative (NGO) | ✓ Refactored v2.0 |
| approach.html | 306 | Biopsychosocial model explanation | ✓ Refactored v2.0 |
| resources.html | 195 | Resource library | ⚠️ TODO: Responsive |
| gallery.html | 214 | Photo gallery | ⚠️ TODO: Responsive |

## 5. LAYOUT_INVENTORY
| Layout | Used By | Components Needed | Status |
|---|---|---|---|
| BaseLayout | All standard pages | Header, Footer, Nav, SEO | ✓ Complete |
| ClinicianLayout | doctors.html | JumpButtons, ServiceComparison, Timeline, CredentialCards | ✓ Complete v3.0 |
| ArticleLayout | blog/pages/* | TOC, AuthorBio, RelatedArticles | ⚠️ TODO |
| LegalLayout | consent, privacy | LegalNav, Disclaimer | ⚠️ TODO |
| EmergencyLayout | emergency.html | CrisisBanner, QuickLinks, HighContrast | ✓ Complete |
| ErrorLayout | 404.html | ErrorState, BackHome | ⚠️ TODO |
| ToolLayout | tool pages | ToolFrame, Instructions, Reset | ⚠️ TODO |

## 6. MIGRATION_PRIORITY (Static site maintenance)
| Priority | Pages | Reason | Effort |
|---|---|---|---|
| P0 | index.html, doctors.html | Homepage + Core conversion hub | Low |
| P1 | services.html, conditions.html | Core clinical content | Medium |
| P2 | blog/pages/* | SEO, content marketing | High |
| P3 | tool pages | Interactive features | Medium |
| P4 | legal, error, templates | Supporting pages | Low |

## 7. INTERNAL_LINKING_AUDIT
- [x] Header navigation consistent across refactored pages
- [x] Footer 4-column layout on all v2.0 pages
- [x] Mobile nav toggle working on all v2.0 pages
- [ ] Add breadcrumbs to all pages
- [ ] Link conditions→services→doctors
- [ ] Link articles→related conditions
- [ ] Add footer sitemap links
- [x] Add `doctors.html` link to main navigation (verify on all pages)
- [x] Update `doctor.html` content merged into `doctors.html`

## 8. CONTENT_GUIDELINES (From Organization Profile)
### Dual-Clinician Model
- **Dr. Anita Sharma (Psychiatrist, MD):** Adult mental health, medication management, complex disorders, holistic care. MCI: 11-40210, HPR: 71-2147-5815-3754.
- **Dr. Sana Firdous (Clinical Psychologist, M.Phil):** Child development, psychotherapy, assessments, neurodevelopmental disorders. RCI: A82170.
- **Shared Location:** J-123, Gamma-2, Greater Noida, UP 201308
- **Contact:** +91-96678-63295, dranitasharma86@gmail.com
- **Philosophy:** "Whole Person Care" - Biological, Psychological, Social pillars integrated.

### Tone Guidelines
- **Mind Grace (Adult):** Professional, reassuring, authoritative, non-judgmental.
- **Aasha (Child):** Warm, nurturing, hopeful, strength-focused, play-based.
- **Emergency:** Direct, high-contrast, immediate action-oriented.

*Ref: All .html files verified via wc -l and grep. Auto-update on page changes. Cross-ref: Instructions.md §KB_READ, memory.md §STATE, design.md §1-§9, worker.md §1-§10, ARCHITECTURE.md §5 (Dual-Clinician Model). END_ON_SYNC.*
