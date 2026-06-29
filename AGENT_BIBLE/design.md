# DESIGN_REF [v5.0] — Mind Grace Clinic
**Mode:** Orientation-First | **Stack:** CSS-Layers|Tokens | **Sync:** End-turn

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

## 4. LAYOUT (Orientation-First, Grid/Cards)
- **THE RULING:** `@media (orientation: portrait)` → `.view-mode-vertical`, `@media (orientation: landscape)` → `.view-mode-horizontal`
- **Portrait (default):** Single column, stacked hero, full-width buttons, mobile nav popup modal
- **Landscape:** 2-3 column grids, side-by-side hero, desktop nav, footer 2-col×3-item (no wrap, shrink)
- **Mobile Nav Popup:** Centered modal (min(90vw, 420px), max-h:85vh), sectioned (Explore/Resources/Tools), scale-in animation (0.9→1), blur overlay
- **Card:** pad(space-4→6), radius-xl→2xl, shadow-sm→md(hover)
- **Container:** max-w:1200px, pad-x:space-4→8
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
- **JS Fallbacks:** CSS-only nav if JS fails, [inert] attribute support → worker.md §4

## 7. ASSETS (/res/, see assets.md for full registry)
| Type | File | Size | Preload | Cross-Ref |
|---|---|---|---|---|
| Logo | Mind_Grace_Clinic_Logo_Pink.svg | Inline SVG | ✓ LCP | assets.md §1 |
| Doctor | Dr_Anita_Sharma_Personal_Photo.jpg | 658KB | ✓ LCP | assets.md §1 |
| Location | street_view_*.jpg (×2) | 95KB-1.2MB | ✗ | assets.md §1 |
| Interiors | mind-grace-*.jpg (×4) | 82KB-1.2MB | ✗ | assets.md §1 |
| Brochures | *_Brochure.png (×2) | 768KB-1.3MB | ✗ | assets.md §1 |
| AASHA | aasha-*.jpg (×9) | 1.1MB-4.1MB | ✗ | assets.md §1 |

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

*Ref: styles.css v3.0 (10-layer cascade). Cross-ref: assets.md §3, tools.md §1, Instructions.md §5. Mobile nav popup specs added v5.0. END_ON_SYNC.*
