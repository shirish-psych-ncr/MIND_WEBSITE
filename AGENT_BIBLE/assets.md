# ASSET_REGISTRY [v14.0] — Mind Grace Neuropsychiatric Clinic
**Mode:** Machine-Readable | **Format:** Dense-Table | **Sync:** End-turn
**Last Sync:** 2026-07-11 | **Total Files:** 181 (50 HTML, 12 CSS, 64 JS, 39 Images, 14 MD)
**Status:** Full markdown audit complete, zero-dependency stack verified

## 1. /assets/images/* (Primary Assets, 39 files)
| File | Type | Size | Dim | Use | Preload | Ref |
|---|---|---|---|---|---|---|
| Mind_Grace_Clinic_Logo_Pink.svg | Logo | 15KB | - | Header, Footer, OG | ✓ LCP | design.md §7 |
| Mind_Grace_Clinic_Logo_Pink.png | Logo | 170KB | - | Fallback | ✗ | design.md §7 |
| Mind_Grace_Clinic_Logo.ico | Logo | 213KB | - | Favicon | ✗ | design.md §7 |
| Mind_Grace_Clinic_Logo_Black.svg | Logo | - | - | Alt variant | ✗ | design.md §7 |
| Mind_Grace_Clinic_Logo_White.svg | Logo | - | - | Dark mode | ✗ | design.md §7 |
| Mind_Grace_Clinic_Logo_Full_With_ClinicName.png | Logo | - | - | Full branding | ✗ | design.md §7 |
| Dr_Anita_Sharma_Personal_Photo.jpg | Photo | 658KB | 600×800 | Hero, Doctor card | ✓ LCP | design.md §7 |
| Location_street_view_near.jpg | Location | 95KB | - | Map, Contact | ✗ | pages.md §CORE |
| Location_street_view_distance.jpg | Location | 435KB | - | Map, Contact | ✗ | pages.md §CORE |
| Mind_Grace_Clinic_Brochure.png | Brochure | 345KB | - | Resources | ✗ | pages.md §TEMPLATE |
| AASHA_Child_Development_Brochure.png | Brochure | 469KB | - | Resources | ✗ | aasha.html |
| Mind_Grace_Clinic_waiting_area.jpg | Interior | 82KB | - | Gallery, Trust | ✗ | gallery.html |
| Mind_Grace_Clinic_waiting_area_2.jpg | Interior | 703KB | - | Gallery, Trust | ✗ | gallery.html |
| mind-grace-consultation-room.jpg | Interior | - | - | Gallery | ✗ | gallery.html |
| mind-grace-entry-n-reception.webp | Interior | - | - | Gallery | ✗ | gallery.html |
| mind-grace-small-room.jpg | Interior | - | - | Gallery | ✗ | gallery.html |
| mind-grace-therapy-room.jpg | Interior | - | - | Gallery | ✗ | gallery.html |
| aasha-occupational-therapy-junglejim-trampoline.jpg | AASHA | 1.1MB | - | OT page | ✗ | services.html |
| aasha-occupational-therapy-lycra-junglejim.jpg | AASHA | 1.1MB | - | OT page | ✗ | services.html |
| aasha-special-ed-abacus.jpg | AASHA | 1.7MB | - | SpecEd page | ✗ | services.html |
| aasha-special-ed-fruit-sort-closeup.jpg | AASHA | 593KB | - | SpecEd page | ✗ | services.html |
| aasha-special-ed-fruit-sort.jpg | AASHA | 901KB | - | SpecEd page | ✗ | services.html |
| aasha-special-ed-jigsaw.jpg | AASHA | 736KB | - | SpecEd page | ✗ | services.html |
| aasha-speech-english-alphabets.jpg | AASHA | - | - | Speech therapy | ✗ | services.html |
| aasha-speech-english-alphabets-closeup.jpg | AASHA | - | - | Speech therapy | ✗ | services.html |
| aasha-speech-hindi-varnmala.jpg | AASHA | - | - | Speech therapy | ✗ | services.html |
| Gender_Dysphoria.jpg | Article | 192KB | - | Blog cover | ✗ | blog/adult/* |
| Early_Intervention_Steps.png | Diagram | 160KB | - | Blog diagram | ✗ | blog/child/* |
| Aasha_Early_Intervention_Phases.png | Diagram | 160KB | - | Blog diagram | ✗ | blog/child/* |
| Aasha_Early_Intervention_Phases_Butterfly.png | Diagram | 287KB | - | Blog diagram | ✗ | blog/child/* |
| booking-hero.jpg | Hero | - | - | Booking page | ✗ | book.html |
| booking-hero-optimized.webp | Hero | - | - | Booking page | ✗ | book.html |
| favicon.ico | Icon | - | 32×32 | Browser tab | ✓ | global |
| favicon.svg | Icon | - | - | Browser tab | ✓ | global |
| image_descriptions.md | Meta | - | - | Alt text reference | ✗ | accessibility |

**Note:** 14+ logo variants available (SVG, PNG, ICO, Black/White/Pink). Full inventory: 39 image files + 1 meta file.

## 2. /assets/components/* (HTML Partials, 4 files)
| File | Size | Purpose | Usage |
|---|---|---|---|
| header.html | 1.6KB | Site header with logo & nav | Injected via JS or server-side |
| footer.html | 1.6KB | Site footer with links & contact | Injected via JS or server-side |
| nav-panel.html | 2.1KB | Mobile navigation modal | Injected on mobile toggle |
| library-stack.html | 1.2KB | Vendor library documentation | Reference only |

## 3. /assets/css/* (Core Stylesheets, 5 files)
| File | Lines | Purpose | Dependencies |
|---|---|---|---|
| base.css | ~700 | Reset, variables, fluid type, dark mode | None |
| layout.css | ~600 | Grid, flexbox, orientation-first | base.css |
| components.css | ~800 | Buttons, cards, forms, modals | base.css, layout.css |
| utilities.css | ~400 | Spacing, visibility, screen reader | base.css |
| animations.css | ~1000 | Transitions, keyframes, reduced-motion | base.css |

## 4. /assets/css-tools/* (Tool-Specific CSS, 7 files)
| File | Lines | Tool | Purpose |
|---|---|---|---|
| mood-tracker.css | ~200 | Mood Tracker | Calendar grid, mood selectors |
| anxiety-level.css | ~180 | Anxiety Level | Slider, breathing guide |
| sleep-logger.css | ~190 | Sleep Logger | Time picker, charts |
| medication-tracker.css | ~200 | Medication Tracker | Pill grid, reminders |
| thought-challenge.css | ~210 | Thought Challenge | CBT worksheet layout |
| grounding-exercises.css | ~190 | Grounding | 5-4-3-2-1 technique UI |
| self-care-plan.css | ~200 | Self Care Plan | Checklist, goals |

## 5. /assets/vendor/* (Third-Party Libraries, 24 files)
| Library | File(s) | Version | Purpose | Ref |
|---|---|---|---|---|
| Ky | ky.min.js | 0.33.3 | Modern fetch API wrapper | worker.md §2 |
| HTMX | htmx.min.js | Latest | AJAX, SSE, WebSockets | worker.md §3 |
| Alpine.js | alpine.min.js | Latest | Reactive JS for HTML | components.md §1 |
| Anime.js | anime.min.js | Latest | Animation engine | design.md §7 |
| Auto Animate | auto-animate.min.js | Latest | Auto layout animations | components.md §2 |
| Canvas Confetti | canvas-confetti.min.js | Latest | Celebration effects | components.md §3 |
| Floating UI | floating-ui-core.js, floating-ui-dom.min.js, floating-ui.min.js | Latest | Tooltip, popover positioning | components.md §4 |
| Fuse.js | fuse.min.js | Latest | Fuzzy search | tools.md §5 |
| Iconify | iconify.min.js | Latest | Icon framework | design.md §7 |
| Lucide | lucide.js, lucide.min.js | Latest | Icon set | design.md §7 |
| Motion One | motion-one.js, motion-one.min.js | Latest | Animation library | design.md §7 |
| Nano ID | nanoid.min.js | Latest | Unique ID generator | tools.md §1 |
| Navigo | navigo.min.js | Latest | Router | pages.md §6 |
| Petite Vue | petite-vue.min.js | Latest | Lightweight Vue | components.md §1 |
| Preact Signals | preact-signals.min.js | Latest | State management | components.md §1 |
| Quicklink | quicklink.min.js | Latest | Prefetch links | worker.md §5 |
| ScrollReveal | scrollreveal.min.js | Latest | Scroll animations | design.md §7 |
| Splide | splide.min.css, splide.min.js | Latest | Carousel/slider | components.md §3 |
| Swup | swup.min.js | Latest | Page transitions | pages.md §6 |

## 6. /assets/js/* (Application Scripts, 40 files)
| File | Lines | Purpose | Dependencies | Status |
|---|---|---|---|---|
| main.js | ~560 | Core initialization, nav, scroll, theme | Base libs | ✓ Fixed |
| http-client.js | ~80 | Ky wrapper for fetch API | ky.min.js | ✓ New |
| discovery.js | ~150 | Service discovery, feature detection | None | ✓ Active |
| a11y-audit.js | ~200 | Accessibility runtime checks | None | ✓ Active |
| animations-auto.js | ~120 | Auto-animation triggers | anime.min.js | ✓ Active |
| blog-adult-config.js | ~60 | Adult blog page config | None | ✓ Active |
| blog-child-config.js | ~60 | Child blog page config | None | ✓ Active |
| blog-index-config.js | ~70 | Blog index config | None | ✓ Active |
| mood-tracker.js | ~180 | Mood tracker tool logic | nanoID | ✓ Active |
| anxiety-level.js | ~160 | Anxiety level tool logic | None | ✓ Active |
| sleep-logger.js | ~170 | Sleep logger tool logic | None | ✓ Active |
| medication-tracker.js | ~190 | Medication tracker logic | None | ✓ Active |
| thought-challenge.js | ~200 | CBT thought challenge | None | ✓ Active |
| grounding-exercises.js | ~150 | 5-4-3-2-1 grounding | None | ✓ Active |
| self-care-plan.js | ~160 | Self care planning | None | ✓ Active |

**Note:** Total 40 app scripts including tool modules, blog configs, and utilities. All ESLint errors resolved as of T21.

## 7. /_templates/* (Page Templates, 3 files)
| File | Purpose | Variables | Usage |
|---|---|---|---|
| template-clean.html | Minimal layout | title, description | Legal, simple pages |
| adult-mental-health.html | Adult blog layout | article metadata | /blog/adult/pages/* |
| child-development.html | Child blog layout | article metadata | /blog/child/pages/* |

## 8. File Inventory Summary
| Category | Count | Lines (approx) | Trend |
|----------|-------|----------------|-------|
| HTML Pages | 50 | ~16,000 | Stable |
| CSS Files | 12 | ~4,000 | +7 tool CSS |
| JS Files | 64 | ~12,500 | +1 http-client |
| Images | 39 | N/A | +2 interior |
| Markdown Docs | 14 | ~8,000 | Stable |
| **TOTAL** | **181** | **~40,500** | **+2** |

## 9. Asset Optimization Status
| Task | Status | Priority | Ref |
|---|---|---|---|
| WebP conversion | Partial (booking-hero) | P2 | design.md §7 |
| SVG sprite generation | Pending | P2 | design.md §7 |
| Lazy loading implementation | Partial | P1 | worker.md §5 |
| Critical CSS extraction | Pending | P2 | design.md §8 |
| Font subsetting | N/A (system fonts) | - | design.md §5 |

*Sync complete. 181 files tracked. Zero-dependency stack enforced. Manual optimization required.*
