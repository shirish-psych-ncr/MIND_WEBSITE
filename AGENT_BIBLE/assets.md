# ASSET_REGISTRY [v2.0] — Mind Grace Neuropsychiatric Clinic
**Mode:** Machine-Readable | **Format:** Dense-Table | **Sync:** End-turn

## 1. /res/* (Primary Assets, 22 files, ~29MB)
| File | Type | Size | Dim | Use | Preload | Ref |
|---|---|---|---|---|---|---|
| Mind_Grace_Clinic_Logo.png | Logo | 313KB | 512×512 | Header, Footer, OG | ✓ LCP | design.md §7 |
| Dr_Anita_Sharma_Personal_Photo.jpg | Photo | 658KB | 600×800 | Hero, Doctor card | ✓ LCP | design.md §7 |
| Location_street_view_near.jpg | Location | 95KB | - | Map, Contact | ✗ | pages.md §CORE |
| Location_street_view_distance.jpg | Location | 1.2MB | - | Map, Contact | ✗ | pages.md §CORE |
| Mind_Grace_Clinic_Brochure.png | Brochure | 768KB | - | Resources | ✗ | pages.md §TEMPLATE |
| AASHA_Child_Development_Brochure.png | Brochure | 1.3MB | - | Resources | ✗ | aasha.html |
| Mind_Grace_Clinic_waiting_area.jpg | Interior | 82KB | - | Gallery, Trust | ✗ | gallery.html |
| Mind_Grace_Clinic_waiting_area_2.jpg | Interior | 703KB | - | Gallery, Trust | ✗ | gallery.html |
| mind-grace-entry-n-reception.jpg | Interior | 1.2MB | - | Gallery | ✗ | gallery.html |
| mind-grace-consultation-room.jpg | Interior | 1.1MB | - | Gallery | ✗ | gallery.html |
| mind-grace-therapy-room.jpg | Interior | 1.2MB | - | Gallery | ✗ | gallery.html |
| mind-grace-small-room.jpg | Interior | 1.1MB | - | Gallery | ✗ | gallery.html |
| aasha-occupational-therapy-junglejim-trampoline.jpg | AASHA | 1.1MB | - | OT page | ✗ | services.html |
| aasha-occupational-therapy-lycra-junglejim.jpg | AASHA | 1.1MB | - | OT page | ✗ | services.html |
| aasha-special-ed-abacus.jpg | AASHA | 4.1MB | - | SpecEd page | ✗ | services.html |
| aasha-special-ed-fruit-sort-closeup.jpg | AASHA | 1.5MB | - | SpecEd page | ✗ | services.html |
| aasha-special-ed-fruit-sort.jpg | AASHA | 2.0MB | - | SpecEd page | ✗ | services.html |
| aasha-special-ed-jigsaw.jpg | AASHA | 1.7MB | - | SpecEd page | ✗ | services.html |
| aasha-speech-english-alphabets-closeup.jpg | AASHA | 3.1MB | - | Speech page | ✗ | services.html |
| aasha-speech-english-alphabets.jpg | AASHA | 3.7MB | - | Speech page | ✗ | services.html |
| aasha-speech-hindi-varnmala.jpg | AASHA | 2.2MB | - | Speech page | ✗ | services.html |

## 2. /blog/res/* (Blog Assets, 4 files, ~823KB)
| File | Type | Size | Use | Page |
|---|---|---|---|---|
| Aasha_Early_Intervention_Phases.png | Diagram | 185KB | Early intervention | blog/child/* |
| Aasha_Early_Intervention_Phases_Butterfly.png | Diagram | 287KB | Butterfly technique | blog/child/* |
| Early_Intervention_Steps.png | Diagram | 160KB | Steps guide | blog/child/* |
| Gender_Dysphoria.jpg | Photo | 192KB | Article cover | blog/adult/* |

## 3. CSS_TOOLS (/css-tools/*, 7 files, ~24KB) → See tools.md §1
| File | Size | Purpose | JS-Pair | Hydration |
|---|---|---|---|---|
| tools-breathing.css | 1.8KB | Guided breathing animation | tools-breathing.js | client:visible |
| tools-butterfly.css | 4.8KB | Butterfly tapper UI | tools-butterfly.js | client:visible |
| tools-eye.css | 1.7KB | EMD eye movement | tools-eye.js | client:visible |
| tools-fractal.css | 4.1KB | Hypnotic fractal | tools-fractal.js | client:visible |
| tools-horizon.css | 2.1KB | Horizon scan visual | tools-horizon.js | client:visible |
| tools-leaf.css | 7.5KB | Leaf stream meditation | tools-leaf.js | client:visible |
| tools-book.css | 1.8KB | Resource book layout | tools-book.js | client:idle |

## 4. JS_TOOLS (/js/*, 11 scripts, ~48KB) → See tools.md §2
| File | Size | Purpose | Hydration |
|---|---|---|---|
| main.js | 1.9KB | Nav toggle, fade-in, hover | client:load |
| tools-breathing.js | 2.4KB | Breathing exercise logic | client:visible |
| tools-butterfly.js | 7.9KB | Butterfly tapper interaction | client:visible |
| tools-eye.js | 1.1KB | EMD movement controller | client:visible |
| tools-fractal.js | 4.6KB | Fractal animation control | client:visible |
| tools-horizon.js | 1.5KB | Horizon scan logic | client:visible |
| tools-leaf.js | 25.7KB | Leaf stream simulation | client:visible |
| tools-book.js | 0.7KB | Book navigation | client:idle |
| tools-map.js | 0.6KB | Map embed handler | client:idle |
| blog-config-adult.js | 1.1KB | Adult blog config | client:idle |
| blog-config-child.js | 1.1KB | Child blog config | client:idle |

## 5. OPTIMIZATION_QUEUE (Pending, memory.md §QUEUE P2)
- [ ] Convert PNG→WebP (logo, brochures, diagrams) - Est. 60% reduction
- [ ] Convert JPG→WebP (photos, interiors) - Est. 40% reduction
- [ ] Generate SVG sprite for icons (if any)
- [ ] Create srcset for responsive images (doctor photo, hero)
- [ ] Lazy load all non-LCP images (loading="lazy")
- [ ] Add width/height attributes to prevent CLS
- [ ] Compress large AASHA photos (>2MB) - Priority: aasha-special-ed-abacus.jpg (4.1MB)

## 6. PRELOAD_STRATEGY
```html
<!-- Critical (LCP) - In <head> -->
<link rel="preload" as="image" href="/res/Mind_Grace_Clinic_Logo.png" fetchpriority="high" />
<link rel="preload" as="image" href="/res/Dr_Anita_Sharma_Personal_Photo.jpg" fetchpriority="high" />

<!-- Deferred (Lazy) - On img elements -->
<img src="/res/waiting-area.jpg" loading="lazy" decoding="async" alt="..." width="800" height="600" />
```

*Cross-ref: design.md §ASSETS, tools.md §CSS-TOOLS, memory.md §STATE. END_ON_SYNC.*
