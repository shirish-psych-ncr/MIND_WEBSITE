# DESIGN_REF [v3.0]
**Mode:** MobileFirst | **Stack:** CSS-Layers|Tokens

## 1. COLORS
| Token | Hex | Semantic | Use |
|---|---|---|---|
| --plum-600 | #6b4c63 | --interactive-pri | Btn, Link, H1-H3 |
| --plum-900 | #2d1f28 | --text-pri | Body |
| --rose-50 | #fdf2f4 | --surface-accent | Bg |
| --teal-600 | #3a7ca5 | --state-success | Confirm |
| --white | #fff | --surface-elev | Card |

## 2. SPACE (Base:4px)
--space-N = 0.25rem×N
- Mob: space-4(pad), space-8(sec)
- Desk: space-6(pad), space-16(hero)

## 3. TYPE (Fluid)
`clamp(min,vw,max)`
- H1: clamp(2rem,4vw,3.5rem)
- H2: clamp(1.75rem,3vw,2.5rem)
- Body: 1rem→1.125rem
- Lead: clamp(1.125rem,2vw,1.25rem)

## 4. LAYOUT
- Grid: 1col→2col→3col
- Card: radius-xl→2xl, shadow-sm→md(hover)
- Btn: Full-w(Mob), Auto-w(Desk), ≥44px

## 5. BP
- Mob: <768px (default)
- Tab: ≥768px
- Desk: ≥1024px

## 6. A11Y
- Contrast ≥4.5:1
- Focus: 2px solid --interactive-pri
- Motion: @media(prefers-reduced)

## 7. ASSETS
- Logo: /res/Mind_Grace_Clinic_Logo.png
- Icon: SVG inline/sprite
- Img: WebP/AVIF + lazy

*Ref: src/styles/layers/tokens.css*
