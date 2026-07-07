# ASSET_REGISTRY [v6.0] — Mind Grace Neuropsychiatric Clinic
**Mode:** Machine-Readable | **Format:** Dense-Table | **Sync:** End-turn
**Last Sync:** 2025-12-07 | **Total Files:** 187 (52 HTML, 16 CSS, 56 JS, 38 Images, 25 Other)

## 1. /assets/images/* (Primary Assets, 38 files)
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
| Aasha_Early_Intervention_Phases.png | Diagram | 185KB | - | Blog diagram | ✗ | blog/child/* |
| Aasha_Early_Intervention_Phases_Butterfly.png | Diagram | 287KB | - | Blog diagram | ✗ | blog/child/* |
| booking-hero.jpg | Hero | - | - | Booking page | ✗ | book.html |
| booking-hero-optimized.webp | Hero | - | - | Booking page | ✗ | book.html |
| favicon.ico | Icon | - | 32×32 | Browser tab | ✓ | global |
| favicon.svg | Icon | - | - | Browser tab | ✓ | global |
| image_descriptions.md | Meta | - | - | Alt text reference | ✗ | accessibility |

**Note:** 14+ logo variants available (SVG, PNG, ICO, Black/White/Pink). Full inventory: 38 image files + 1 meta file.

## 2. /assets/components/* (HTML Partials, 7 files)
| File | Size | Purpose | Usage |
|---|---|---|---|
| header.html | 1.6KB | Site header with logo & nav | Injected via JS or server-side |
| footer.html | 1.6KB | Site footer with links & contact | Injected via JS or server-side |
| nav-panel.html | 2.0KB | Mobile popup navigation | Injected via JS or server-side |
| library-stack.html | 1.5KB | Complete JS library stack (24 libs) | Included on all 52 HTML pages |
| button.css | - | Button styles | Imported by components.css |
| card.css | - | Card styles | Imported by components.css |
| README.md | - | Component documentation | Reference |

## 3. CSS_CORE (/assets/css/*, 6 modular files, ~40KB) → See design.md §8
| File | Size | Purpose | Layer |
|---|---|---|---|
| base.css | 6.0KB | Design tokens, reset, dark mode, fluid-type | @layer base |
| layout.css | 12.9KB | Header, hero, footer, grid structure | @layer layout |
| components.css | 6.5KB | Buttons, cards, forms, UI elements | @layer components |
| utilities.css | 7.5KB | Helper classes, spacing, visibility | @layer utilities |
| animations.css | 5.8KB | Keyframes, transitions, motion | @layer animations |
| README.md | - | CSS architecture docs | Reference |

## 4. CSS_TOOLS (/assets/css-tools/*, 8 files, ~24KB) → See tools.md §1
| File | Size | Purpose | JS-Pair | Hydration |
|---|---|---|---|---|
| tools-breathing.css | 2.4KB | Guided breathing animation | tools-breathing.js | client:visible |
| tools-butterfly.css | 4.1KB | Butterfly tapper UI | tools-butterfly.js | client:visible |
| tools-eye.css | 1.7KB | EMD eye movement | tools-eye.js | client:visible |
| tools-fractal.css | 4.1KB | Hypnotic fractal | tools-fractal.js | client:visible |
| tools-horizon.css | 2.1KB | Horizon scan visual | tools-horizon.js | client:visible |
| tools-leaf.css | 7.5KB | Leaf stream meditation | tools-leaf.js | client:visible |
| tools-book.css | 2.1KB | Resource book layout | tools-book.js | client:idle |
| butterfly-tapper.html.styles.css | - | Legacy butterfly styles | - | deprecated |

## 5. JS_MODULES (/assets/js/*, 12 scripts, ~52KB) → See tools.md §2
| File | Size | Purpose | Hydration |
|---|---|---|---|
| main.js | 1.9KB | Nav toggle, fade-in, hover | client:load |
| tools-breathing.js | 2.5KB | Breathing exercise logic | client:visible |
| tools-butterfly.js | 9.0KB | Butterfly tapper interaction | client:visible |
| tools-eye.js | 1.5KB | EMD movement controller | client:visible |
| tools-fractal.js | 4.7KB | Fractal animation control | client:visible |
| tools-horizon.js | 1.9KB | Horizon scan logic | client:visible |
| tools-leaf.js | 25.7KB | Leaf stream simulation | client:visible |
| tools-book.js | 1.3KB | Book navigation | client:idle |
| tools-map.js | 0.6KB | Map embed handler | client:idle |
| blog-config-adult.js | 1.1KB | Adult blog config | client:idle |
| blog-config-child.js | 1.1KB | Child blog config | client:idle |
| blog-discovery.js | - | Blog discovery logic | client:idle |
| README.md | - | JS module docs | Reference |

## 6. JS_LIBRARIES_VENDOR (/assets/vendor/*, 23 files, ~1.0MB) → See tools.md §7
| Library | File | Size | Purpose | Use Case |
|---|---|---|---|---|
| Motion One | motion-one.min.js | 25KB | Native Web Animations API | Complex animations, timelines |
| Motion One (alt) | motion-one.js | 24KB | Web Animations API | Alternative animation lib |
| Anime.js | anime.min.js | 17KB | SVG/chaining animations | Advanced animation sequences |
| AutoAnimate | auto-animate.min.js | 23KB | Zero-config list animations | List reordering, insertions |
| ScrollReveal | scrollreveal.min.js | 45KB | Scroll-triggered animations | On-screen element detection |
| Canvas-Confetti | canvas-confetti.min.js | 25KB | Celebration animations | Success states, achievements |
| Splide | splide.min.js + .css | 30KB | Accessible carousel/slider | Image galleries, testimonials |
| Floating UI Core | floating-ui-core.js | 12KB | Tooltip/popover positioning | Dropdowns, tooltips |
| Floating UI DOM | floating-ui-dom.min.js | - | DOM utils for Floating UI | Positioning calculations |
| Floating UI | floating-ui.min.js | - | Complete positioning lib | Popovers, dropdowns |
| Alpine.js | alpine.min.js | 45KB | Declarative HTML interactivity | Reactive state without build step |
| Petite-Vue | petite-vue.min.js | 17KB | Vue subset for static pages | Progressive enhancement |
| Preact Signals | preact-signals.min.js | 3.2KB | Reactive state tracking | Standalone reactive state |
| htmx | htmx.min.js | 51KB | AJAX via HTML attributes | Server-driven interactions |
| Ky | ky.min.js | 1.2KB | Fetch API wrapper | AJAX with retries/timeouts |
| Swup | swup.min.js | 22KB | Page transition engine | SPA-like page transitions |
| Quicklink | quicklink.min.js | 3.7KB | Viewport link prefetching | Instant page loads |
| Navigo | navigo.min.js | 12KB | Client-side router | Lightweight routing |
| Iconify | iconify.min.js | 26KB | On-demand icon fetching | Dynamic icon loading |
| Lucide Icons | lucide.js + .min.js | 358KB | Stroke icon set | Customizable icons |
| Nano ID | nanoid.min.js | 1KB | Unique ID generator | Secure ID generation |
| Fuse.js | fuse.min.js | 24KB | Fuzzy search library | Client-side search/indexing |

## 7. JS_LIBRARIES_LIB (/assets/js/lib/*, 20 files, duplicate set)
**Note:** Duplicate library set in /lib/ for fallback/redundancy. Same libraries as /vendor/.

## 8. HTML_PAGES_INVENTORY (52 total pages)

### 8.1 Root Level Pages (26 files)
| File | Purpose | Template | Status |
|---|---|---|---|
| index.html | Homepage | - | ✓ Live |
| mind-grace.html | Alternate homepage | - | ✓ Live |
| about.html | About clinic | adult-mental-health-template | ✓ Live |
| approach.html | Treatment approach | adult-mental-health-template | ✓ Live |
| services.html | Services overview | adult-mental-health-template | ✓ Live |
| aasha.html | AASHA child development | child-development-template | ✓ Live |
| doctors.html | Doctor listings | adult-mental-health-template | ✓ Live |
| dr-anita-sharma.html | Dr. Sharma profile | adult-mental-health-template | ✓ Live |
| conditions.html | Conditions treated | adult-mental-health-template | ✓ Live |
| process.html | Patient process | adult-mental-health-template | ✓ Live |
| fees.html | Pricing & insurance | adult-mental-health-template | ✓ Live |
| location.html | Clinic location | adult-mental-health-template | ✓ Live |
| contact.html | Contact form | adult-mental-health-template | ✓ Live |
| book.html | Booking system | template-clean | ✓ Live |
| gallery.html | Photo gallery | adult-mental-health-template | ✓ Live |
| resources.html | Patient resources | adult-mental-health-template | ✓ Live |
| testimonials.html | Patient reviews | adult-mental-health-template | ✓ Live |
| faq.html | FAQs | adult-mental-health-template | ✓ Live |
| emergency.html | Emergency info | template-clean | ✓ Live |
| consent.html | Consent forms | template-clean | ✓ Live |
| privacy.html | Privacy policy | template-clean | ✓ Live |
| terms.html | Terms of service | template-clean | ✓ Live |
| disclaimer.html | Medical disclaimer | template-clean | ✓ Live |
| thank-you.html | Form success | template-clean | ✓ Live |
| 404.html | Error page | template-clean | ✓ Live |

### 8.2 Tools Pages (6 files in /tools/)
| File | Tool | CSS | JS |
|---|---|---|---|
| guided-breathing.html | Breathing exercise | tools-breathing.css | tools-breathing.js |
| butterfly-tapper.html | Butterfly tapping | tools-butterfly.css | tools-butterfly.js |
| eye-movement.html | EMDR eye movement | tools-eye.css | tools-eye.js |
| hypnos-fractal.html | Fractal visualization | tools-fractal.css | tools-fractal.js |
| horizon-scan.html | Horizon scanning | tools-horizon.css | tools-horizon.js |
| leaf-on-stream.html | Leaf meditation | tools-leaf.css | tools-leaf.js |

### 8.3 Blog Pages (12 files in /blog/)
| File | Category | Config |
|---|---|---|
| index.html | Blog home | - |
| adult.html | Adult mental health | blog-config-adult.js |
| children.html | Child development | blog-config-child.js |
| pages/adult/*.html | 5 adult articles | blog-config-adult.js |
| pages/child/*.html | 4 child articles | blog-config-child.js |

### 8.4 Templates (3 files in /_templates/)
| File | Purpose | Used By |
|---|---|---|
| template-clean.html | Minimal layout | Tools, legal pages |
| adult-mental-health-template.html | Adult clinic layout | 20+ core pages |
| child-development-template.html | Child-friendly layout | AASHA, child blog |

### 8.5 Inspiration Docs (3 files in /inspo/)
| File | Purpose |
|---|---|
| Anti-inspo UI UXI Anti Pattern.md | Anti-patterns to avoid |
| check1.md | Design checklist 1 |
| check2.md | Design checklist 2 |

## 9. OTHER_FILES (25 files)
| Category | Files | Location |
|---|---|---|
| Root MD | ARCHITECTURE.md, README.md | / |
| Package | package.json, package-lock.json | / |
| Accessibility | accessibility-audit.js | / |
| AGENT_BIBLE | 15 docs (memory.md, design.md, etc.) | /AGENT_BIBLE/ |
| Components | README.md | /assets/components/ |
| CSS | README.md | /assets/css/ |
| JS | README.md | /assets/js/ |
| JS Lib | README.md | /assets/js/lib/ |
| Images | image_descriptions.md | /assets/images/ |

## 10. OPTIMIZATION_QUEUE (Pending, memory.md §QUEUE P2)
- [ ] Convert PNG→WebP (logo, brochures, diagrams) - Est. 60% reduction
- [ ] Convert JPG→WebP (photos, interiors) - Est. 40% reduction
- [ ] Generate SVG sprite for icons (if any)
- [ ] Create srcset for responsive images (doctor photo, hero)
- [ ] Lazy load all non-LCP images (loading="lazy")
- [ ] Add width/height attributes to prevent CLS
- [ ] Compress large AASHA photos (>1MB) - Priority: aasha-special-ed-abacus.jpg (1.7MB)

## 11. PRELOAD_STRATEGY
```html
<!-- Critical (LCP) - In <head> -->
<link rel="preload" as="image" href="/assets/images/Mind_Grace_Clinic_Logo_Pink.svg" fetchpriority="high" />
<link rel="preload" as="image" href="/assets/images/Dr_Anita_Sharma_Personal_Photo.jpg" fetchpriority="high" />

<!-- Deferred (Lazy) - On img elements -->
<img src="/assets/images/waiting-area.jpg" loading="lazy" decoding="async" alt="..." width="800" height="600" />
```

*Cross-ref: design.md §ASSETS, tools.md §CSS-TOOLS, memory.md §STATE, pages.md §TEMPLATES. END_ON_SYNC.*
