# DESIGN_REF [v3.0]
**Mode:** MobileFirst | **Stack:** CSS-Layers|Tokens

## 1. COLORS (Primitives→Semantic)
| Prim | Hex | Semantic | Use |
|---|---|---|---|
| --plum-600 | #6b4c63 | --interactive-pri | Btn, Link, H1-H3 |
| --plum-900 | #2d1f28 | --text-pri | Body |
| --plum-500 | #8a6a7f | --text-muted | Caption |
| --rose-50 | #fdf2f4 | --surface-accent | Bg |
| --teal-600 | #3a7ca5 | --state-success | Confirm |
| --white | #fff | --surface-elev | Card |
| --cream-50 | #fef9f3 | --surface-pri | Page |

## 2. SPACE (Base:4px, Scale:1-14)
`--space-N = 0.25rem×N`
- Mob: space-4(pad), space-8(sec), space-12(hero)
- Tab: space-6(pad), space-12(sec)
- Desk: space-8(pad), space-16(hero)

## 3. TYPE (Fluid clamp)
- H1: `clamp(2rem,4vw,3.5rem)` / lh:1.1
- H2: `clamp(1.75rem,3vw,2.5rem)` / lh:1.2
- H3: `clamp(1.5rem,2vw,2rem)` / lh:1.3
- Body: 1rem→1.125rem / lh:1.6
- Lead: `clamp(1.125rem,2vw,1.25rem)` / lh:1.5
- Small: 0.875rem / lh:1.5

## 4. LAYOUT (Grid/Cards)
- Grid: 1col(<768) → 2col(≥768) → 3col(≥1024)
- Card: pad(space-4→6), radius-xl→2xl, shadow-sm→md(hover)
- Btn: Full-w(Mob), Auto-w(Desk), min-h:44px
- Container: max-w:1200px, pad-x:space-4→8

## 5. BP (Breakpoints)
- Mob: <768px (default CSS)
- Tab: ≥768px (@media min-width)
- Desk: ≥1024px

## 6. A11Y (WCAG 2.2 AA)
- Contrast: ≥4.5:1 (text), ≥3:1 (UI)
- Focus: 2px solid --interactive-pri, offset:2px
- Touch: ≥44×44px
- Motion: @media(prefers-reduced-motion){disable}

## 7. ASSETS (/res/)
- Logo: Mind_Grace_Clinic_Logo.png (313KB, 512×512)
- Doctor: Dr_Anita_Sharma_Personal_Photo.jpg (658KB)
- Location: street_view_*.jpg (2 files)
- Waiting: waiting_area_*.jpg (2 files)
- Therapy: therapy-room.jpg, consultation-room.jpg
- Brochure: Clinic_Brochure.png, Child_Development_Brochure.png
- AASHA: OT/Speech/SpecEd photos (9 files)

## 8. CSS-TOOLS (@layer components)
- tools-breathing.css (Guided breathing)
- tools-butterfly.css (Butterfly tapper)
- tools-eye.css (EMD movement)
- tools-fractal.css (Hypnotic fractal)
- tools-horizon.css (Horizon scan)
- tools-leaf.css (Leaf on stream)
- tools-book.css (Resource book)

*Ref: src/styles/layers/tokens.css, styles.css v3.0*
