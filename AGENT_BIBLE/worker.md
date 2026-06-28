# WORKER_SPEC [v1.0]
**Role:** FE-Lead/DevOps | **Stack:** Astro4|TS|VanillaJS|LightningCSS

## 1. ARCH_TREE
```
/src
  /components → UI (Btn,Card,Input)
  /content → MDX (Doctors,Conditions)
  /layouts → Base,Page,Article
  /pages → Routes (.astro)
  /scripts → Islands (Hydration)
  /styles → CSS-Layers (Tokens→Comp)
/res → Assets (Logos,Img)
```

## 2. TOOLCHAIN
- Bundle: Vite(Astro)
- CSS: LightningCSS (Chr90+,FF90+,Saf15+)
- Type: tsc --noEmit (Strict)
- Lint: ESLint+Prettier

## 3. HYDRATION
| Comp | Directive | Trigger | Cost |
|---|---|---|---|
| Nav | client:load | Init | ~2kb |
| FAQ | client:visible | Scroll | ~1kb |
| Form | client:load | Init | ~4kb |
| Gallery | client:idle | Post-load | ~3kb |
| Hero | None | Static | 0kb |

**Pattern:**
```ts
class Accordion {
  constructor(root:HTMLElement){/*ARIA*/}
  toggle(t:Element){/*Expand/Collapse*/}
}
```

## 4. SECURITY
```toml
[[headers]]
  HSTS = "max-age=31536000;preload"
  X-Frame = "DENY"
  CSP = "default-src 'self';script-src 'self' 'unsafe-inline';"
```

## 5. QA_GATES
1. Type: npm run check (0 err)
2. A11y: Playwright+axe (0 viol)
3. Perf: Lighthouse (Script<50kb,LCP<2.5s)
4. Visual: Chromatic (Opt)

## 6. ZOD
```ts
doctors: z.object({
  name:z.string(),
  slug:z.string(),
  photo:image(),
  availability:z.enum(['accepting','waitlist','on-leave'])
})
```

## 7. DEPLOY
Push main → CI(Lint/Test/Build) → Edge → PreviewURL

*Ref: astro.config.mjs, netlify.toml*
