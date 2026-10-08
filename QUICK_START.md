# Quick start

## Requirements

- Node.js version from `.nvmrc`
- Python 3.12
- Git

## Install and verify

```bash
npm ci
npm run check
```

`npm run check` is the required local and CI gate. It runs Astro typechecking, JavaScript syntax checks, Python and Worker tests, HTML linting, the production build, structured-data validation, and generated-route validation.

## Develop

```bash
npm run dev
```

For a production-style preview:

```bash
npm run build
npm run preview
```

Public URLs are slash-free and extension-free. The build itself uses file output, such as `dist/fees.html`; the production edge maps `/fees` to that file.

## Browser console smoke test

Serve the completed build on port 8765:

```bash
python -m http.server 8765 --bind 127.0.0.1 --directory dist
```

In a second terminal, run:

```bash
npm run audit:console
```

## Deploy

Pushes to `main` are built and published by `.github/workflows/publish-site.yml`. Only `dist/` is deployable. GitHub Pages must use GitHub Actions rather than legacy branch publishing.

Cloudflare security routing is a separate deployment:

```bash
npx wrangler deploy --config wrangler.toml
```

Authentication and production deployment are explicit operator actions. A local build does not prove that GitHub Pages or Cloudflare is current. See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).
