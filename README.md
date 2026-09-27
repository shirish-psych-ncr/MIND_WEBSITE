# Mind Grace NCR — Website

Static site for the Mind Grace psychiatric & psychology clinic (Delhi NCR).
Plain HTML/CSS/JS shipped from `src/pages/` (Astro-format `.astro` shells), plus interactive tools under `/tools/`, a blog under `/blog/`, and Cloudflare edge code (`worker.js`, `sw.js`).

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
npm run clean              # delete generated audit dirs & __pycache__
```

## Deployment notes

- Static host: GitHub Pages / Netlify (`_headers`, `_redirects` apply there).
- Security headers via Cloudflare Worker: see `DEPLOYMENT_GUIDE.md`, `QUICK_START` steps inside `CLOUDFLARE_AGENT_SETUP.md`.
- Analytics: Zaraz (see `ZARAZ_TRACKING_GUIDE.md`); Amplitude init in `assets/js/amplitude-*.js`.
- Translation widget setup: `GOOGLE_TRANSLATE_SETUP.md`; crawler policy: `CRAWLER_POLICY.md`.

## Conventions

- Never edit `assets/**/min/*.min.css` by hand — edit the source and run `npm run build:min`.
- After changing colors/tokens, re-run `npm run lint:a11y && npm run report` to confirm zero WCAG AA contrast failures.
- `output/` is disposable; do not commit files from it.
