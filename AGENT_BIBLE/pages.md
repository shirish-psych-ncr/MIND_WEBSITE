# PAGE_REGISTRY [v1.0]
**Mode:** Machine-Readable | **Format:** Dense-Table | **Update:** Auto(post-turn)

## 1. CORE_PAGES (Root level, 16 files)
| File | Lines | Purpose | Layout | Status |
|---|---|---|---|---|
| index.html | 561 | Homepage, Hero, Services, Trust | BaseLayout | ✓ MobileFirst |
| about.html | - | Clinic story, Team, Approach | BaseLayout | ✓ Refactored v2.0 |
| services.html | - | Service listing, Categories | BaseLayout | ✓ Refactored v2.0 |
| conditions.html | - | Condition encyclopedia | BaseLayout | TODO: Responsive |
| doctor.html | - | Doctor profile (Dr. Sharma) | DoctorLayout | TODO: Responsive |
| location.html | - | Map, Address, Directions | BaseLayout | TODO: Responsive |
| contact.html | - | Contact form, Info | BaseLayout | ✓ Refactored v2.0 |
| faq.html | - | FAQ accordion | BaseLayout | TODO: Responsive |
| testimonials.html | - | Patient reviews | BaseLayout | TODO: Responsive |
| process.html | - | Treatment journey | BaseLayout | ✓ Refactored v2.0 |
| fees.html | - | Pricing, Insurance | BaseLayout | TODO: Responsive |
| consent.html | - | Consent forms | LegalLayout | TODO: Responsive |
| privacy.html | - | Privacy policy | LegalLayout | TODO: Responsive |
| emergency.html | - | Crisis resources | EmergencyLayout | TODO: Responsive |
| thank-you.html | - | Form success | BaseLayout | TODO: Responsive |
| 404.html | - | Error page | ErrorLayout | TODO: Responsive |

## 2. TOOL_PAGES (Interactive therapy tools, 7 files)
| File | Lines | Tool | CSS | JS | Status |
|---|---|---|---|---|---|
| guided-breathing.html | - | Breathing exercise | tools-breathing.css | tools-breathing.js | TODO: Hydrate |
| butterfly-tapper.html | - | Butterfly tapper EMDR | tools-butterfly.css | tools-butterfly.js | TODO: Hydrate |
| eye-movement.html | - | EMD eye movement | tools-eye.css | tools-eye.js | TODO: Hydrate |
| hypnos-fractal.html | - | Hypnotic fractal | tools-fractal.css | tools-fractal.js | TODO: Hydrate |
| horizon-scan.html | - | Horizon scanning | tools-horizon.css | tools-horizon.js | TODO: Hydrate |
| leaf-on-stream.html | - | Leaf meditation | tools-leaf.css | tools-leaf.js | TODO: Hydrate |
| book.html | - | Resource book | tools-book.css | tools-book.js | TODO: Hydrate |

## 3. BLOG_PAGES (/blog/*, 13 files)
### Index & Category Pages
| File | Lines | Purpose | Config |
|---|---|---|---|
| blog/index.html | - | Blog homepage | - |
| blog/adult.html | - | Adult mental health | blog-config-adult.js |
| blog/child.html | - | Child development (redirect?) | blog-config-child.js |
| blog/children.html | - | Children category | blog-config-child.js |
| blog/adult-mental-health-template.html | - | Template for adult articles | - |
| blog/child-development-template.html | - | Template for child articles | - |

### Adult Articles (/blog/pages/adult/*, 5 files)
| File | Lines | Topic |
|---|---|---|
| overthinking-vs-anxiety.html | 1.5K | Differential diagnosis |
| scheduled-worry-time-technique.html | 9.9K | CBT technique |
| sleep-and-anxiety-cycle.html | 5.8K | Sleep hygiene |
| stimulus-control-therapy.html | 9.0K | Insomnia treatment |
| when-to-see-a-psychiatrist.html | 1.7K | Help-seeking guide |

### Child Articles (/blog/pages/child/*, 4 files)
| File | Lines | Topic |
|---|---|---|
| early-signs-of-autism.html | 1.6K | Autism screening |
| school-concerns-and-adhd.html | 1.7K | ADHD in school |
| sensory-overload-at-home.html | 1.6K | Sensory processing |
| speech-delay-red-flags.html | 1.7K | Speech development |

## 4. TEMPLATE_PAGES
| File | Lines | Purpose |
|---|---|---|
| template-clean.html | - | Blank template for new pages |
| mind-grace.html | - | Alternate homepage? |
| aasha.html | - | AASHA child development page |
| approach.html | - | Treatment approach |
| resources.html | - | Resource library |
| gallery.html | - | Photo gallery |

## 5. LAYOUT_INVENTORY (To be created for Astro)
| Layout | Used By | Components Needed |
|---|---|---|
| BaseLayout | All pages | Header, Footer, Nav, SEO |
| DoctorLayout | doctor.html | DoctorCard, Credentials, BookingCTA |
| ArticleLayout | blog/pages/* | TOC, AuthorBio, RelatedArticles |
| LegalLayout | consent, privacy | LegalNav, Disclaimer |
| EmergencyLayout | emergency.html | CrisisBanner, QuickLinks |
| ErrorLayout | 404.html | ErrorState, BackHome |
| ToolLayout | tool pages | ToolFrame, Instructions, Reset |

## 6. MIGRATION_PRIORITY (Static→Astro)
| Priority | Pages | Reason |
|---|---|---|
| P0 | index.html | Homepage, highest traffic |
| P1 | doctor.html, services.html, conditions.html | Core clinical content |
| P2 | blog/pages/* | SEO, content marketing |
| P3 | tool pages | Interactive features |
| P4 | legal, error, templates | Supporting pages |

## 7. INTERNAL_LINKING_AUDIT
- [ ] Add breadcrumbs to all pages
- [ ] Link conditions→services→doctors
- [ ] Link articles→related conditions
- [ ] Add footer sitemap links
- [ ] Ensure nav consistency across all pages

*Ref: All .html files. Auto-update on page changes. Cross-ref: Instructions.md §KB_READ, memory.md §STATE, design.md §1-§6, worker.md §1-§10. END_ON_SYNC.*
