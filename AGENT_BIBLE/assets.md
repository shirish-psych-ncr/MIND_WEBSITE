# ASSET_REGISTRY [v3.0] — Mind Grace Neuropsychiatric Clinic
**Mode:** Machine-Readable | **Format:** Dense-Table | **Sync:** End-turn

## 1. /assets/images/* (Primary Assets, 31 files, ~29MB)
| File | Type | Size | Dim | Use | Preload | Ref |
|---|---|---|---|---|---|---|
| Mind_Grace_Clinic_Logo_Pink.svg | Logo | 15KB | - | Header, Footer, OG | ✓ LCP | design.md §7 |
| Mind_Grace_Clinic_Logo_Pink.png | Logo | 170KB | - | Fallback | ✗ | design.md §7 |
| Mind_Grace_Clinic_Logo.ico | Logo | 213KB | - | Favicon | ✗ | design.md §7 |
| Dr_Anita_Sharma_Personal_Photo.jpg | Photo | 658KB | 600×800 | Hero, Doctor card | ✓ LCP | design.md §7 |
| Location_street_view_near.jpg | Location | 95KB | - | Map, Contact | ✗ | pages.md §CORE |
| Location_street_view_distance.jpg | Location | 435KB | - | Map, Contact | ✗ | pages.md §CORE |
| Mind_Grace_Clinic_Brochure.png | Brochure | 345KB | - | Resources | ✗ | pages.md §TEMPLATE |
| AASHA_Child_Development_Brochure.png | Brochure | 469KB | - | Resources | ✗ | aasha.html |
| Mind_Grace_Clinic_waiting_area.jpg | Interior | 82KB | - | Gallery, Trust | ✗ | gallery.html |
| Mind_Grace_Clinic_waiting_area_2.jpg | Interior | 703KB | - | Gallery, Trust | ✗ | gallery.html |
| aasha-occupational-therapy-junglejim-trampoline.jpg | AASHA | 1.1MB | - | OT page | ✗ | services.html |
| aasha-occupational-therapy-lycra-junglejim.jpg | AASHA | 1.1MB | - | OT page | ✗ | services.html |
| aasha-special-ed-abacus.jpg | AASHA | 1.7MB | - | SpecEd page | ✗ | services.html |
| aasha-special-ed-fruit-sort-closeup.jpg | AASHA | 593KB | - | SpecEd page | ✗ | services.html |
| aasha-special-ed-fruit-sort.jpg | AASHA | 901KB | - | SpecEd page | ✗ | services.html |
| aasha-special-ed-jigsaw.jpg | AASHA | 736KB | - | SpecEd page | ✗ | services.html |
| Gender_Dysphoria.jpg | Article | 192KB | - | Blog cover | ✗ | blog/adult/* |
| Early_Intervention_Steps.png | Diagram | 160KB | - | Blog diagram | ✗ | blog/child/* |
| Aasha_Early_Intervention_Phases.png | Diagram | 185KB | - | Blog diagram | ✗ | blog/child/* |
| Aasha_Early_Intervention_Phases_Butterfly.png | Diagram | 287KB | - | Blog diagram | ✗ | blog/child/* |

**Note:** 14 logo variants available (SVG, PNG, ICO, Base64, Black/White/Pink). Full inventory in /assets/images/.

## 2. /assets/components/* (HTML Partials, 3 files)
| File | Size | Purpose | Usage |
|---|---|---|---|
| header.html | 1.6KB | Site header with logo & nav | Injected via JS or server-side |
| footer.html | 1.6KB | Site footer with links & contact | Injected via JS or server-side |
| navigation.html | 2.2KB | Mobile popup navigation | Used in index.html, all pages |

## 3. CSS_CORE (/assets/css/*, 5 modular files, ~40KB) → See design.md §8
| File | Size | Purpose | Layer |
|---|---|---|---|
| base.css | 6.0KB | Design tokens, reset, dark mode, fluid-type | @layer base |
| layout.css | 12.9KB | Header, hero, footer, grid structure | @layer layout |
| components.css | 6.5KB | Buttons, cards, forms, UI elements | @layer components |
| utilities.css | 7.5KB | Helper classes, spacing, visibility | @layer utilities |
| animations.css | 5.8KB | Keyframes, transitions, motion | @layer animations |

## 4. CSS_TOOLS (/assets/css-tools/*, 7 files, ~24KB) → See tools.md §1
| File | Size | Purpose | JS-Pair | Hydration |
|---|---|---|---|---|
| tools-breathing.css | 2.4KB | Guided breathing animation | tools-breathing.js | client:visible |
| tools-butterfly.css | 4.1KB | Butterfly tapper UI | tools-butterfly.js | client:visible |
| tools-eye.css | 1.7KB | EMD eye movement | tools-eye.js | client:visible |
| tools-fractal.css | 4.1KB | Hypnotic fractal | tools-fractal.js | client:visible |
| tools-horizon.css | 2.1KB | Horizon scan visual | tools-horizon.js | client:visible |
| tools-leaf.css | 7.5KB | Leaf stream meditation | tools-leaf.js | client:visible |
| tools-book.css | 2.1KB | Resource book layout | tools-book.js | client:idle |

## 5. JS_MODULES (/assets/js/*, 13 scripts, ~52KB) → See tools.md §2
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

## 6. OPTIMIZATION_QUEUE (Pending, memory.md §QUEUE P2)
- [ ] Convert PNG→WebP (logo, brochures, diagrams) - Est. 60% reduction
- [ ] Convert JPG→WebP (photos, interiors) - Est. 40% reduction
- [ ] Generate SVG sprite for icons (if any)
- [ ] Create srcset for responsive images (doctor photo, hero)
- [ ] Lazy load all non-LCP images (loading="lazy")
- [ ] Add width/height attributes to prevent CLS
- [ ] Compress large AASHA photos (>1MB) - Priority: aasha-special-ed-abacus.jpg (1.7MB)

## 7. PRELOAD_STRATEGY
```html
<!-- Critical (LCP) - In <head> -->
<link rel="preload" as="image" href="/assets/images/Mind_Grace_Clinic_Logo_Pink.svg" fetchpriority="high" />
<link rel="preload" as="image" href="/assets/images/Dr_Anita_Sharma_Personal_Photo.jpg" fetchpriority="high" />

<!-- Deferred (Lazy) - On img elements -->
<img src="/assets/images/waiting-area.jpg" loading="lazy" decoding="async" alt="..." width="800" height="600" />
```

*Cross-ref: design.md §ASSETS, tools.md §CSS-TOOLS, memory.md §STATE, pages.md §TEMPLATES. END_ON_SYNC.*
