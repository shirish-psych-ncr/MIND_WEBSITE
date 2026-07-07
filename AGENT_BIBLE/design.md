# DESIGN_REF [v7.0] — Mind Grace Neuropsychiatric Clinic
**Mode:** Orientation-First | **Stack:** CSS-Layers|Tokens | **Sync:** End-turn
**Last Asset Sync:** 2025-12-07 | **Total Assets:** 187 files (assets.md v6.0)

## 1. COLORS (Primitives→Semantic)
| Prim | Hex | Semantic | Use | WCAG | Cross-Ref |
|---|---|---|---|---|---|
| --plum-600 | #6b4c63 | --interactive-pri | Btn, Link, H1-H3 | AA ✓ | design.md §1 |
| --plum-900 | #2d1f28 | --text-pri | Body | AAA ✓ | design.md §1 |
| --plum-500 | #8a6a7f | --text-muted | Caption | AA ✓ | design.md §1 |
| --rose-50 | #fdf2f4 | --surface-accent | Bg | - | design.md §1 |
| --teal-600 | #3a7ca5 | --state-success | Confirm | AA ✓ | design.md §1 |
| --white | #fff | --surface-elev | Card | - | design.md §1 |
| --cream-50 | #fef9f3 | --surface-pri | Page | - | design.md §1 |
| --red-600 | #dc2626 | --emergency-pri | Emergency pages, crisis alerts | AA ✓ | design.md §1 |
| --warm-sand | #e8dccf | --secondary-bg | Aasha/Child dev sections | - | design.md §1 |

## 2. SPACE (Base: 4px, Scale: 1-14)
`--space-N = 0.25rem×N`
| Context | Portrait | Landscape | Cross-Ref |
|---|---|---|---|
| Padding | space-4 | space-6 | design.md §4 |
| Section | space-8 | space-12 | design.md §4 |
| Hero | space-12 | space-16 | design.md §4 |

## 3. TYPE (Fluid clamp, all headings)
| Element | Formula | Line Height | Cross-Ref |
|---|---|---|---|
| H1 | `clamp(2rem, 4vw, 3.5rem)` | 1.1 | design.md §3 |
| H2 | `clamp(1.75rem, 3vw, 2.5rem)` | 1.2 | design.md §3 |
| H3 | `clamp(1.5rem, 2vw, 2rem)` | 1.3 | design.md §3 |
| Body | 1rem → 1.125rem | 1.6 | design.md §3 |
| Lead | `clamp(1.125rem, 2vw, 1.25rem)` | 1.5 | design.md §3 |
| Small | 0.875rem | 1.5 | design.md §3 |
| Stat Number | `clamp(2.5rem, 5vw, 4rem)` | 1.0 | design.md §3 (Aasha) |

## 4. LAYOUT (Orientation-First, Grid/Cards)
- **THE RULING:** `@media (orientation: portrait)` → `.view-mode-vertical`, `@media (orientation: landscape)` → `.view-mode-horizontal`
- **Portrait (default):** Single column, stacked hero, full-width buttons, mobile nav popup modal
- **Landscape:** 2-3 column grids, side-by-side hero, desktop nav, footer 2-col×3-item (no wrap, shrink)
- **Mobile Nav Popup:** Centered modal (min(90vw, 420px), max-h:85vh), sectioned (Explore/Resources/Tools), scale-in animation (0.9→1), blur overlay
- **Card:** pad(space-4→6), radius-xl→2xl, shadow-sm→md(hover)
- **Container:** max-w:1200px, pad-x:space-4→8
- **Dual-Clinician Layout:** Jump buttons at top, distinct visual sections for Psychiatrist vs Psychologist, service comparison grid
- **JS Fallbacks:** Graceful degradation if JS disabled, progressive enhancement → worker.md §4

## 5. BREAKPOINTS (Orientation-First default)
| Name | Query | Use | Cross-Ref |
|---|---|---|---|
| Portrait | @media (orientation: portrait) | Single column, stacked, mobile nav popup | design.md §4 |
| Landscape | @media (orientation: landscape) | 2-3 column grids, desktop nav | design.md §4 |
| Fluid Type | clamp(min, vw, max) | ALL headings, disclaimer, footer items | design.md §3 |

## 6. A11Y (WCAG 2.2 AA, Mandatory)
- **Contrast:** ≥4.5:1 (text), ≥3:1 (UI elements)
- **Focus:** 2px solid --interactive-pri, offset:2px
- **Touch:** ≥44×44px for all interactive
- **Motion:** @media(prefers-reduced-motion){disable animations}
- **Nav:** Skip links, landmark regions, keyboard operable, popup modal with focus trap
- **Emergency Pages:** High contrast mode, large typography for crisis numbers
- **JS Fallbacks:** CSS-only nav if JS fails, [inert] attribute support → worker.md §4

## 7. ASSETS (/assets/, see assets.md v6.0 for full registry)
| Type | File | Count | Preload | Cross-Ref |
|------|------|-------|---------|-----------|
| Logo | Mind_Grace_Clinic_Logo_Pink.svg + 13 variants | 14 | ✓ LCP | assets.md §4 |
| Doctor (Anita) | Dr_Anita_Sharma_Personal_Photo.jpg | 1 | ✓ LCP | assets.md §4 |
| Doctor (Sana) | Placeholder: dark-user-profile.svg | 0 | ✗ | assets.md §4 (TODO: Add photo) |
| Location | Location_street_view_*.jpg (×2) | 2 | ✗ | assets.md §4 |
| Interiors | mind-grace-*.jpg/webp (×4) | 4 | ✗ | assets.md §4 |
| AASHA | aasha-*.jpg (×9) | 9 | ✗ | assets.md §4 |
| Booking Hero | booking-hero.jpg/webp | 2 | ✗ | assets.md §4 |
| Brochures | *_Brochure.png (×2) | 2 | ✗ | assets.md §4 |
| Diagrams | *_Phases.png, *_Steps.png (×3) | 3 | ✗ | assets.md §4 |
| Favicons | favicon.ico/svg | 2 | ✓ | assets.md §4 |

## 8. CSS-TOOLS (@layer components, see tools.md)
| File | Size | Purpose | JS-Pair | Cross-Ref |
|---|---|---|---|---|
| tools-breathing.css | 1.8KB | Box breathing animation | tools-breathing.js | tools.md §1.1 |
| tools-butterfly.css | 4.8KB | Butterfly tapper UI | tools-butterfly.js | tools.md §1.2 |
| tools-eye.css | 1.7KB | EMD eye movement | tools-eye.js | tools.md §1.3 |
| tools-fractal.css | 4.1KB | Hypnotic fractal | tools-fractal.js | tools.md §1.4 |
| tools-horizon.css | 2.1KB | Horizon scan visual | tools-horizon.js | tools.md §1.5 |
| tools-leaf.css | 7.5KB | Leaf meditation | tools-leaf.js | tools.md §1.6 |
| tools-book.css | 1.8KB | Resource book layout | tools-book.js | tools.md §1.7 |

## 9. COMPONENT_PATTERNS (New v6.0)
| Component | Class | Use Case | Cross-Ref |
|---|---|---|---|
| Jump Button | `.jump-button` | Smooth scroll to clinician section | doctors.html |
| Service Comparison | `.service-comparison-grid` | Side-by-side psychiatrist vs psychologist | doctors.html |
| Clinician Section | `.clinician-section` | Distinct visual block per provider | doctors.html |
| Timeline | `.timeline` | Education/career history | doctor.html, doctors.html |
| Stat Counter | `.stat-counter` | Animated numbers on scroll | aasha.html |
| Pillar Card | `.pillar-card` | Biopsychosocial model pillars | approach.html |

*Ref: styles.css v3.0 (10-layer cascade). Cross-ref: assets.md §3, tools.md §1, Instructions.md §5. Mobile nav popup specs added v5.0. Dual-clinician patterns added v6.0. END_ON_SYNC.*
