# Deployment guide

Mind Grace is built as a static Astro site, published by GitHub Pages, and proxied by Cloudflare. The two deployment layers have different responsibilities and must be verified separately.

## Build contract

```bash
npm ci
npm run check
```

The deployable artifact is `dist/`. Do not publish the repository root. The build renders 66 routes, regenerates minified assets, generates the journal index, copies the public allowlist, and validates JSON-LD, canonical routes, and local references.

## GitHub Pages

`.github/workflows/publish-site.yml` builds and uploads `dist/` on pushes to `main`. In repository settings, Pages must use **GitHub Actions** as its source. GitHub Pages ignores `_headers` and `_redirects`, so neither file is proof of production header or routing behavior.

After a deployment, verify at minimum:

```bash
curl -I https://mindgracencr.in/
curl -I https://mindgracencr.in/about
curl -I https://mindgracencr.in/about/
```

The canonical route is `/about`; the trailing-slash response should redirect rather than become a second indexable page.

## Cloudflare Worker

`wrangler.toml` deploys `worker.js`, which owns canonical-host redirects, security headers, crawler enforcement, and cache policy. Deploy only after authenticating the intended Cloudflare account:

```bash
npx wrangler whoami
npx wrangler deploy --config wrangler.toml
```

`wrangler.site.toml` is an alternative static-assets deployment. Do not attach both deployment modes to the same production route unless that architecture is intentional.

The Worker CSP and `_headers` are maintained in parallel for compatible hosts. If a Cloudflare Dashboard Transform Rule also sets CSP, update or remove the duplicate rule so headers do not conflict.

## Required production checks

- Home, fees, doctor, blog, and tool routes return the expected status.
- Canonical URLs are slash-free and use `https://mindgracencr.in`.
- HSTS, CSP, `X-Content-Type-Options`, frame protection, referrer policy, and permissions policy are present.
- The browser console has no site-generated errors.
- Generated pages contain one complete clinic entity and the doctor page contains one Person plus one Physician practice.
- Amplitude and Zaraz scripts are absent.
- The sitemap and robots policy are reachable.

## Rollback

GitHub Pages can be rolled back by redeploying a known-good commit. The Cloudflare Worker can be rolled back through Wrangler deployment history or the Cloudflare dashboard. Record which Git commit and Worker version were deployed together.

Local success does not prove production deployment. Report GitHub Actions, Cloudflare authentication, and live HTTP verification as separate results.
