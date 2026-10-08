# Mind Grace NCR website

Static site for the Mind Grace psychiatry and psychology clinic in Delhi NCR.
Plain HTML/CSS/JS shipped from `src/pages/` (Astro-format `.astro` shells), plus interactive tools under `/tools/`, a blog under `/blog/`, and Cloudflare edge code (`worker.js`, `sw.js`).

## Astro build and deployment

Use Node 22.22 (`.nvmrc`) and Python 3.12. Run `npm ci`, then `npm run build`.
The build regenerates minified assets, renders 66 routes, copies the explicit
public-asset allowlist, generates the article index, and validates local links.
Only `dist/` is deployable. `npm run dev` starts Astro for editing; `npm run preview`
serves a production build. Public page URLs omit trailing slashes and `.html`.

GitHub Pages must use **GitHub Actions**, not the legacy branch/Jekyll source.
The workflow publishes `dist/`. Cloudflare's existing security proxy is separate:
`wrangler.toml` deploys `worker.js`; `wrangler.site.toml` is an optional static-site
deployment and must not compete for the same production domain.
See [the documentation index](docs/README.md) for current operational guidance.

## Repository layout

| Path | Purpose |
|---|---|
| `src/pages/` | All site pages (`.astro`) + `blog/`, `tools/` sub-pages |
| `src/components/`, `src/layouts/` | Shared shell components (`Head.astro`, `Shell.astro`, `Layout.astro`) |
| `assets/css/` | Global stylesheets (+ `min/` twins, generated) |
| `assets/css-tools/` | Per-tool stylesheets (+ `min/` twins, generated) |
| `assets/js/` | Site & tool JavaScript |
| `scripts/` | Build, audit, and one-time migration scripts |
| `scripts/a11y_lint/` | 12-tool accessibility/readability/adaptability lint suite |
| `config/` | Linter configs (`htmlvalidate.json`, `eslintrc.jsx-a11y.json`) |
| `tests/` | Python unittest suite (`npm test`) |
| `vendor/a11y.css/` | Vendored [a11y.css](https://a11y.eu/) for visual warning injection |
| `output/` | **Generated** lint/audit artifacts — gitignored, regenerate anytime |
| `worker.js`, `_headers`, `_redirects`, `wrangler.toml` | Cloudflare security headers & routing (see DEPLOYMENT_GUIDE.md) |

## Common commands

```bash
npm install                # install lint/build dependencies

npm run lint:a11y          # structure (eslint-jsx-a11y, html-validate, i18next-scanner),
                           # contrast+direction, color-blind, prose (write-good, alex),
                           # a11y.css injection  -> output/a11y-lint/*.json
npm run lint:readability   # textstat scoring + pyphen hyphenation.css
npm run report             # aggregate all JSON outputs -> output/a11y-lint/REPORT.md
npm run lint:html          # html-validate on offline.html
npm run build:min          # regenerate minified CSS twins (esbuild)
npm test                   # python unittest suite
npm run typecheck          # Astro and TypeScript diagnostics
npm run check              # full type, syntax, test, lint, build, and schema gate
npm run build:ci           # shipping path: build, generated indexes, and build validation
npm run check:full         # optional exhaustive pre-release quality suite
npm run audit:console      # browser smoke test; requires dist served on port 8765
npm run clean              # delete generated audit dirs & __pycache__
```

## Deployment notes

- Static host: GitHub Pages behind Cloudflare. GitHub Pages ignores repository
  `_headers` and `_redirects`; the Worker and Pages Actions workflow own the
  production behavior.
- Security headers via Cloudflare Worker: see `DEPLOYMENT_GUIDE.md`; historical setup notes are in `docs/archive/CLOUDFLARE_AGENT_SETUP.md`.
- Analytics: GA4/GTM remain in page templates. Amplitude and Zaraz are retired;
  their guides are retained in `docs/archive/` only as historical rollback records.
- Translation widget setup: `GOOGLE_TRANSLATE_SETUP.md`; crawler policy: `CRAWLER_POLICY.md`.

## Conventions

- Never edit `assets/**/min/*.min.css` by hand — edit the source and run `npm run build:min`.
- After changing colors/tokens, re-run `npm run lint:a11y && npm run report` to confirm zero WCAG AA contrast failures.
- `output/` is disposable; do not commit files from it.
- Shared clinic facts and structured data live in `src/config/business.ts` and
  `src/components/StructuredData.astro`. Do not duplicate clinic JSON-LD in pages.
