# DESIGN_REF [v3.0] — Mind Grace Clinic
**Mode:** MobileFirst | **Stack:** CSS-Layers|Tokens | **Sync:** End-turn

## 1. COLORS (Primitives→Semantic)
| Prim | Hex | Semantic | Use | WCAG |
|---|---|---|---|---|
| --plum-600 | #6b4c63 | --interactive-pri | Btn, Link, H1-H3 | AA ✓ |
| --plum-900 | #2d1f28 | --text-pri | Body | AAA ✓ |
| --plum-500 | #8a6a7f | --text-muted | Caption | AA ✓ |
| --rose-50 | #fdf2f4 | --surface-accent | Bg | - |
| --teal-600 | #3a7ca5 | --state-success | Confirm | AA ✓ |
| --white | #fff | --surface-elev | Card | - |
| --cream-50 | #fef9f3 | --surface-pri | Page | - |

## 2. SPACE (Base: 4px, Scale: 1-14)
`--space-N = 0.25rem×N`
| Context | Mobile | Tablet | Desktop |
|---|---|---|---|
| Padding | space-4 | space-6 | space-8 |
| Section | space-8 | space-12 | space-16 |
| Hero | space-12 | space-16 | space-20 |

## 3. TYPE (Fluid clamp, all headings)
| Element | Formula | Line Height |
|---|---|---|
| H1 | `clamp(2rem, 4vw, 3.5rem)` | 1.1 |
| H2 | `clamp(1.75rem, 3vw, 2.5rem)` | 1.2 |
| H3 | `clamp(1.5rem, 2vw, 2rem)` | 1.3 |
| Body | 1rem → 1.125rem | 1.6 |
| Lead | `clamp(1.125rem, 2vw, 1.25rem)` | 1.5 |
| Small | 0.875rem | 1.5 |

## 4. LAYOUT (Grid/Cards, MobileFirst)
- **Grid Flow:** 1col (<768) → 2col (≥768) → 3col (≥1024)
- **Card:** pad(space-4→6), radius-xl→2xl, shadow-sm→md(hover)
- **Btn:** Full-w(Mob), Auto-w(Desk), min-h:44px, min-w:44px
- **Container:** max-w:1200px, pad-x:space-4→8

## 5. BREAKPOINTS (MobileFirst default)
| Name | Query | Use |
|---|---|---|
| Mobile | <768px (default) | Single column, stacked |
| Tablet | ≥768px (@media min-width) | 2-column grids |
| Desktop | ≥1024px (@media min-width) | 3-column grids |

## 6. A11Y (WCAG 2.2 AA, Mandatory)
- **Contrast:** ≥4.5:1 (text), ≥3:1 (UI elements)
- **Focus:** 2px solid --interactive-pri, offset:2px
- **Touch:** ≥44×44px for all interactive
- **Motion:** @media(prefers-reduced-motion){disable animations}
- **Nav:** Skip links, landmark regions, keyboard operable

## 7. ASSETS (/res/, see assets.md for full registry)
| Type | File | Size | Preload |
|---|---|---|---|
| Logo | Mind_Grace_Clinic_Logo.png | 313KB | ✓ LCP |
| Doctor | Dr_Anita_Sharma_Personal_Photo.jpg | 658KB | ✓ LCP |
| Location | street_view_*.jpg (×2) | 95KB-1.2MB | ✗ |
| Interiors | mind-grace-*.jpg (×4) | 82KB-1.2MB | ✗ |
| Brochures | *_Brochure.png (×2) | 768KB-1.3MB | ✗ |
| AASHA | aasha-*.jpg (×9) | 1.1MB-4.1MB | ✗ |

## 8. CSS-TOOLS (@layer components, see tools.md)
| File | Size | Purpose | JS-Pair |
|---|---|---|---|
| tools-breathing.css | 1.8KB | Box breathing animation | tools-breathing.js |
| tools-butterfly.css | 4.8KB | Butterfly tapper UI | tools-butterfly.js |
| tools-eye.css | 1.7KB | EMD eye movement | tools-eye.js |
| tools-fractal.css | 4.1KB | Hypnotic fractal | tools-fractal.js |
| tools-horizon.css | 2.1KB | Horizon scan visual | tools-horizon.js |
| tools-leaf.css | 7.5KB | Leaf meditation | tools-leaf.js |
| tools-book.css | 1.8KB | Resource book layout | tools-book.js |

*Ref: styles.css v3.0 (10-layer cascade). Cross-ref: assets.md §3, tools.md §1. END_ON_SYNC.*
