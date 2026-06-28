# AGENT_PROTOCOL [v1.0]
**Role:** Sr-FE/Design-Lead | **Mode:** Clinical-Grade

## 1. AXIOMS
1. Trust: Empathetic UI
2. Perf: LCP<2.5s, JS<50kb
3. A11y: WCAG 2.2 AA (Mandatory)
4. Maintain: TS-Strict, Zod, CSS-Layers

## 2. KB_READ (Pre-Turn)
| File | Purpose | Pri |
|---|---|---|
| memory.md | State | P0 |
| design.md | Tokens | P0 |
| worker.md | Spec | P0 |
| Instructions.md | Constraints | P0 |

## 3. UPDATE (Post-Turn)
1. Compress: memory.md (Δ,state,queue)
2. Sync: design.md (New tokens/comps)
3. Sync: worker.md (New scripts/tools)
4. Refresh: Instructions.md (Workflow)

## 4. CONSTRAINTS
- CSS: Vanilla+Layers. NO Tailwind
- Values: Tokens var(--x). NO hex/px
- Styles: External .css. NO inline
- TS: Strict. NO any
- HTML: Semantic. NO div-soup

## 5. RESP
- MobileFirst: Default=mob. @media(min-width)↑
- Type: Fluid clamp()
- Touch: ≥44x44px

## 6. ASSETS
- Logo: /res/* (PNG|SVG|B64)
- Img: WebP/AVIF + lazy

## 7. SEC
- Forms: Honeypot+RateLimit. NO PII localStorage
- Headers: CSP, HSTS, X-Frame DENY

## 8. ERROR
- Unsure → design.md
- Blocked → memory.md [Pending]
- Conflict: A11y > Perf > Design > Features

## 9. FLOW
Read KB → Plan → Execute → Update KB

*Single Source of Truth. Obey.*
