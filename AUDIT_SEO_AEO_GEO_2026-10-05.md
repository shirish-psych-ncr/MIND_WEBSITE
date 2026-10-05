# SEO / AEO / GEO Audit — mindgracencr.in (Mind Grace Neuropsychiatric Clinic)

**Date:** 2026-10-05 · **Scope:** Astro source (`src/pages/**`, 66 routes), `public/` assets (`robots.txt`, `sitemap.xml`, `llms*.txt`, `faq-schema.json`, `_headers`, `_redirects`, `worker.js`, `sw.js`) · **Method:** static analysis with Python stdlib only (no Node modules installed). All findings verified against actual file contents, not assumptions.

Legend: 🔴 critical · 🟠 high · 🟡 medium · 🟢 low/polish · ✅ strength

---

## 1. Executive summary

The site is unusually well-engineered for AI-crawler policy (RFC 9309-clean robots.txt with a proper "citation agents allowed / training scrapers blocked" split, llms.txt ecosystem, edge bot-blocking in worker.js, speakable + direct-answer blocks on ~65/66 pages). The main risks are **entity/NAP contradictions in structured data**, a **double-indexing conflict** (`X-Robots-Tag: index` on every URL vs the noindex meta tags on `/404` and `/thank-you`), **duplicate sitemap entries**, **broken llms.txt links**, and **schema↔visible-content mismatches** (FAQPage count, missing og:images). Fixing Sections 2–4 restores trust signals; Sections 5–7 protect the strong AEO/GEO posture.

Overall grade: **Technical SEO B · AEO B+ · GEO C+** (GEO dragged down by contradictory NAP schema).

---

## 2. 🔴 Critical — entity & local-business contradictions (hurts SEO *and* GEO)

### 2.1 Homepage ships two conflicting clinic entities
`src/pages/index.astro` contains **two separate JSON-LD business blocks**:

| Field | Block 1 (`MedicalBusiness`, inline) | Block 2 (`mindgrace-static-clinic-schema`, MedicalClinic+LocalBusiness) |
|---|---|---|
| Address | **Shop No. 10, 1st Floor, Devansh Tower, Sector 50, Noida, UP 201301** | **J123, Gamma II, Greater Noida, UP 201310** |
| Geo | lat 28.5921, lng 77.3587 (**matches neither address** — ≈Okhla Phase I, South-East Delhi; ~17–25 km away) | lat 28.4910152, lng 77.5132324 (Gamma II — correct) |
| Hours | Mon–Sat 10:00–20:00 | Mon–Sat 10:00–16:00 + 17:30–19:30 |
| Phone | +91-9667863295 | +91-96678-63295 |
| Image | `/assets/images/clinic-exterior.jpg` — **file does not exist** (404 asset) | `/assets/images/og-image.webp` (exists) |
| `@id` | **empty string `""`** | `https://mindgracencr.in/#clinic` |
| `sameAs` | Facebook + Instagram profiles ✅ | **only self-referential `https://mindgracencr.in/`** (useless as sameAs) |

The stale "Devansh Tower, Sector 50" data appears nowhere else in visible content or schema (grep-verified across all sources) — it is leftover from an old clinic location. Every other page on the site uses the Gamma II entity consistently. This single page can split Google's Knowledge Graph understanding of the practice and directly poisons map/local-pack relevance. **Fix:** delete the first block entirely (or merge into the `@graph`), fix/remove the empty `@id`, carry the real social-profile `sameAs` into the surviving node, and point `image` to an existing file.

### 2.2 Duplicate/near-duplicate business entities on 24 pages
Pages such as `about.astro` (3 business blocks), `services.astro` (3), and ~22 others carry **two business-entity LD blocks** with inconsistent `telephone` formatting (`+91-9667863295` vs `+91-96678-63295`). Mixed `@type` usage across the site: `MedicalBusiness`, `MedicalClinic`, `LocalBusiness`, `MedicalClinic+LocalBusiness`, `Physicians`, `MedicalOrganization`. **Fix:** one canonical `#clinic` node per page referenced via `@id`/`mainEntityOfPage`; pick one primary type (`MedicalClinic` with `additionalType` if desired) and one phone format everywhere.

### 2.3 Third address variant on `doctors.astro`
Schema there includes `"streetAddress": "3rd Floor, Karkhana Bazar, Gamma II"` alongside the J123 address used sitewide. If it's a second wing/entrance, model it explicitly (separate place or `department`); otherwise remove. NAP consistency is the #1 local-ranking input for GEO.

### 2.4 robots-meta vs X-Robots-Tag conflict
`_headers` emits `X-Robots-Tag: index, follow, max-snippet:-1, …` on **all URLs** (`/*` and `/*.html`). Google takes the **most restrictive** value, so `/404` and `/thank-you` (`<meta name="robots" content="noindex,follow">`) still get dropped — but Bing and several AI crawlers weight HTTP headers more, risking **ghost-indexing of utility pages**. Also `/404` has `canonical=/404` while `og:url=https://mindgracencr.in/404.html` (extension mismatch; the built route is extensionless). **Fix:** add a `/_headers` rule for `/404` and `/thank-you` returning `X-Robots-Tag: noindex, follow`, and align the 404's og:url.

---

## 3. 🔴 High — indexing surface: sitemap, canonicals, redirects

### 3.1 sitemap.xml: 78 `<loc>` entries, only 64 unique — 14 duplicates
The last 14 entries re-list blog posts/guides **without `<lastmod>`/`<priority>`**. Duplicates waste crawl budget and confuse freshness signals. **Fix:** dedupe (keep the versioned entries); better yet generate the sitemap from the build rather than hand-maintaining it (both entry sets show stale dates — see 3.4).

### 3.2 Relative canonicals on all 66 pages
All canonicals are root-relative (`/fees`, `/`). Google resolves them, but **many LLM/AI crawlers fetch pages out of context and mishandle relative canonicals**; the spec best-practice is absolute URLs. `og:url` values *are* absolute — so make canonicals absolute and identical to `og:url` on every page. (Only mismatch found today: `404.astro`, see 2.4.)

### 3.3 Redirect chains / duplicate rules in `_redirects`
Trailing-slash cleanup rules are listed **twice** for most routes (e.g. `/about/ → /about 301` appears at lines ~40 and ~120). Cloudflare Pages caps `_redirects` at 2000 static rules and first-match wins, so this isn't fatal, but it doubles maintenance risk and rule count. Dedupe. Verified good: alias→canonical 301s (`/counselling`, `/psychotherapy`, etc.), www→apex and http→https single-hop rules, no redirect loops detected.

### 3.4 Stale `<lastmod>` values
Sitemap shows 54 URLs at `2026-09-24` and 10 at `2026-09-27` — uniform bulk dates even for unchanged legal pages. Google largely ignores bogus lastmod; use real modification dates (build-time `git log` per page) or omit it where unknown.

### 3.5 hreflang is decorative-only
8 pages emit `hreflang="en-in"` + `x-default` both pointing to themselves, with absolute-path targets (`/fees`) instead of full URLs. With a single language this adds nothing and violates Google's requirement that hreflang use **absolute URLs** and be reciprocal. Either drop it or implement it correctly (also relevant given the Google-Translate widget — do **not** advertise translated URLs you don't own).

---

## 4. 🟠 On-page / metadata issues

| Issue | Where | Fix |
|---|---|---|
| 🔴 Missing `og:image` (and thus no social/AI preview) on 9 condition pages | addiction-substance-use, adhd-autism-assessment, bipolar-mood-disorders, depression-anxiety, learning-disability-assessment, ocd-panic-ptsd, psychosis-schizophrenia, sleep-eating-disorders, trauma-grief-support | Add og:image + twitter:image (reuse og-image.webp or condition-specific images) |
| 🟠 Title too long / will truncate | depression-in-older-adults (**87 ch**), high-functioning-depression-guide (65), butterfly-tapper (62), iilm guide (61), perceived-burdensomeness (61) | ≤60 chars, keep keyword front-loaded |
| 🟠 Meta description over/under limits | depression-in-older-adults (**242**), perceived-burdensomeness (177), dr-anita-sharma (168), resources (167), hypnos-fractal (68) | 70–160 chars |
| 🟡 Duplicate GTM noscript iframe pasted twice | `index.astro` body | Remove one copy (GTM script itself is fine, single instance) |
| 🟡 Deprecated `meta keywords` still present | about, book, index, location | Harmless but noise; remove for hygiene |
| 🟡 Inconsistent robots meta values | some pages `index, follow, max-image-preview:large`, others add `max-snippet:-1, max-video-preview:-1`, most have none | Standardize via one shared head component |
| 🟡 `og:type=website` on article-like pages | blog hub pages, tools/guided-breathing | Use `article` for BlogPosting pages (matches their LD) |
| 🟡 Brand fragmentation in titles | child blog posts brand as "Aasha Blog", adult ones as "Mind Grace Blog"; leaf-on-stream titled "The River of Release" (brand invisible) | Pick one pattern: `{Primary keyword} | Mind Grace {Greater Noida?}` |
| 🟡 Internal title collision | homepage `<title>` = "Psychiatrist in Greater Noida \| Mind Grace Clinic" ≈ `/psychiatrist-greater-noida` page title (0.92 similarity) — classic doorway-page optics | Differentiate intent: homepage = brand+category ("Psychiatry & Child Development Clinic in Greater Noida"), landing page = exact-match service |
| 🟡 Render-blocking payload | 7 CSS files on home, 12 on interior pages, 14 on tool pages (+ JS bundles) | Consolidate per-template CSS (site-foundation already exists), preload hero image only, drop unused bundles per template |
| ✅ Good | exactly one H1 on all 66 pages; viewport on all; alt text + width/height on all `<img>`; hero image `fetchpriority=high`; breadcrumbs LD on most pages | — |

---

## 5. AEO (Answer Engine Optimization) — strengths & gaps

**Strengths (keep):**
- ✅ `.seo-answer` / `.blog-answer` direct-answer blocks on 65/66 pages; inverted-pyramid guidance documented in llms.txt.
- ✅ `SpeakableSpecification` on 64 pages.
- ✅ FAQPage schema questions are **fully present in visible text** on `/faq` (verified 7/7) — no hidden-text trickery.
- ✅ Usage-rights statement in llms.txt (cite-with-attribution vs train-restricted) is exactly what answer engines want.

**Gaps:**
1. 🟠 **FAQPage schema ↔ page mismatch:** `/faq` and `faq-schema.json` expose **7 questions**, but llms.txt tells answer engines to "prefer quoting the FAQ page." Meanwhile `fees.astro` and `depression-in-older-adults.astro` also ship FAQPage nodes. Expand `/faq` toward 12–15 question pairs covering the money queries ("cost of psychiatrist in Greater Noida", "how to book ADHD assessment", "teleconsultation rules in India") and mirror each in visible headings.
2. 🟠 **No `WebSite`/`Organization` root node with `publisher` linking:** BlogPosting blocks declare `author` (good) but there's no site-level `Organization` `@id` that every page's `publisher`/`provider` references — this is the backbone of E-E-A-T graph building. Add one `#organization` node (or reuse `#clinic`) and reference it everywhere.
3. 🟠 **Missing `dateModified` rigor:** verify every BlogPosting carries `datePublished` + `dateModified` matching visible bylines (Google now enforces match for Article rich results).
4. 🟡 **Medical YMYL trust markers:** add credential-bearing `Physician`/`Person` markup linking `employee`/`founder` → `#clinic`, and `medicalSpecialty` (Psychiatry, PediatricDevelopmental…) on the clinic node; link to the existing `EducationalOccupationalCredential` on Dr. Sharma's page.
5. 🟡 **No `ImageObject` author/logo optimization on core pages** (only blog pages carry ImageObject) — ensure clinic logo + doctor photo are typed `ImageObject` with `caption`/`creditText`.
6. 🟡 Health-content disclaimer exists (✅ emergency banner never promises 24/7) — keep the "Not an emergency service" language consistent in FAQ answers too (it already is in faq-schema.json Q5 ✅).

---

## 6. GEO (Generative Engine Optimization) — crawler & machine-readability layer

**Strengths (genuinely best-in-class):**
- ✅ robots.txt: RFC 9309-clean, LF/no-BOM, no inline comments, longest-match logic explained; **split strategy correct** — citation/retrieval agents allowed (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot/-User, Genspark, YouBot, YepBot, Amazonbot, DuckAssist) while training scrapers disallowed (GPTBot, Google-Extended, ClaudeBot, Applebot-Extended, Meta-ExternalAgent, FacebookBot, CCBot, Cohere-AI) plus hard 403 edge-block for Bytespider/Diffbot/PetalBot/Scrapy/aiHitBot/BittorrentBot in `worker.js` (synced with Section 5, test-enforced).
- ✅ llms.txt + llms-blog.txt + llms-tools.txt modular context files served as `text/plain` with 1 h cache; explicit citing guidance.
- ✅ IndexNow key present (`public/indexnow-*.txt`) + submit script; ahrefs verification file present.

**Issues:**
1. 🔴 **Broken URLs inside llms.txt** — these are the very links AI agents are told to use:
   - `/blogiilm-psychology-internship.html` → should be `https://mindgracencr.in/blog/iilm-psychology-internship`
   - `/toolsbutterfly-tapper.html`, `/toolsguided-breathing.html`, `/toolseye-movement.html`, `/toolshorizon-scan.html`, `/toolshypnos-fractal.html`, `/toolsleaf-on-stream.html` → `/tools/<name>` (missing slash + dead `.html` suffix)
   - Primary-pages section mixes `.html` suffixes (`/services.html`, `/doctors.html`…) with clean URLs (`/blog`) — the current canonical scheme is extensionless; `.html` variants only work via redirects. Make every link canonical-clean and absolute. Same broken `/tools…` pattern repeats in **llms-tools.txt**.
2. 🟠 **`_headers` cache conflicts contradict the file's own stated policy:** header comment says robots.txt must be `max-age <= 48h`, but the rule sets `Cache-Control: public, max-age=86400` (1 year) — Google may not see crawler-policy changes for up to a year. Also static assets claim "1-year immutable" but are set to `max-age=86400` (1 day) with query-string versioning; pick one story (recommended: `max-age=31536000, immutable` since `?v=` busting is already in place, or honest 24 h).
3. 🟠 **`Cross-Origin-Resource-Policy: same-site` + global `X-Robots-Tag: all` on `/robots.txt`** — CORP same-site is fine for a single-origin site, but confirm the Google Translate proxy (translate.google.com) doesn't trip COOP/CORP when widget fetches page bodies; monitor console after deploy.
4. 🟡 **CSP requires `'unsafe-inline'` + `'unsafe-eval'`** (documented as GTM-driven). Known trade-off; consider migrating GTM→gtag-only to allow nonce/hash-based CSP later. Keep `_headers` and `worker.js` CSP copies in sync — they currently look aligned (Amplitude wildcard fix present in both ✅).
5. 🟡 **Content-Signal / `ai-train` declaration:** deliberately omitted from robots.txt (correct call for RFC compliance) — if adopted, do it only via Cloudflare dashboard as documented.
6. 🟡 **llms.txt lacks the condition/service pages** (only primary pages, guides, tools). Generative engines answering "who treats OCD in Greater Noida" won't find `/ocd-panic-ptsd` through the index. Add a Services/Conditions section listing all indexable routes with one-line descriptions (mirror sitemap).
7. 🟡 **Zaraz loop acknowledged but unresolved** (`TODO` in Head.astro + index.astro): queued-tracking spam wastes mobile CPU/battery and can delay Core Web Vitals. Disable Zaraz or strip its script tag.

---

## 7. Performance / CWV notes (SEO-adjacent, static evidence only)

- 5–14 stylesheet requests per page (Section 4 table) — biggest CWV lever: consolidate + inline critical CSS per template (home already inlines a large `<style>`; interior pages don't need 12 external sheets).
- Fonts loaded render-blocking from fonts.googleapis.com on home without `media="print"` swap or subsetting; `display=swap` is present ✅. Consider self-hosting Inter/Sora subsets (files could live in `/assets/fonts/`) to cut a third-party origin.
- Hero image correctly uses `fetchpriority="high"`, srcset, dimensions ✅.
- Analytics stack on home: GTM + gtag + Ahrefs + Zaraz + Amplitude (vendored) + SW = 6 tracking contexts. Each costs main-thread time; Zaraz TODO above; audit whether GTM container actually uses GA4 config duplicated by direct gtag snippet (GA4 measured twice if GTM also fires it — check in GA4 DebugView).
- Service worker (`sw.js`) + offline page present ✅ — verify SW navigation fallback doesn't serve cached HTML that hides fresh canonical/meta updates from crawlers (Google renders with SW disabled, but AI agents may not).

---

## 8. Prioritized action plan

**P0 (this week — correctness/trust)**
1. Merge/dedupe homepage clinic schema; delete the stale Sector-50/wrong-geo block (keeping its social `sameAs`); fix `@id:""` and dead `clinic-exterior.jpg` reference (2.1).
2. Normalize NAP across all 66 pages: one address (J123, Gamma II…), one phone format, one hours set, one `@id` referenced per page (2.2, 2.3).
3. Fix the 12 broken/mixed URLs in llms.txt & llms-tools.txt (6.1).
4. Dedupe sitemap.xml (78→64 entries) (3.1).
5. Add `X-Robots-Tag: noindex, follow` header rules for `/404` and `/thank-you`; fix 404 og:url (2.4).

**P1 (next sprint — visibility quality)**
6. Absolute canonicals = og:url on every page (3.2); remove or properly implement hreflang (3.5).
7. Add og:image/twitter:image to the 9 condition pages; trim >60-char titles and >160-char descriptions (Section 4).
8. Expand FAQPage coverage (12–15 Q&A on /faq mirrored visibly); add site-level Organization/WebSite node referenced by all BlogPostings (5.1–5.2).
9. Fix `_headers` cache contradictions (robots.txt ≤48 h; coherent asset caching) (6.2).
10. Remove duplicate GTM noscript, deprecated keywords meta, standardize robots meta (Section 4).

**P2 (ongoing)**
11. Dedupe `_redirects`; build-time sitemap generation with true lastmod (3.3, 3.4).
12. Per-template CSS consolidation + font self-hosting (Section 7).
13. Resolve Zaraz TODO; verify GA4 isn't double-firing via GTM+gtag.
14. After fixes: rebuild (`npm run build` — uses existing local toolchain, no new installs), re-run `python3 scripts/audit_seo_aeo_geo.py` on `dist/`, resubmit sitemap + IndexNow, request recrawl of changed URLs in GSC, and spot-check ChatGPT/Perplexity answers for "psychiatrist in Greater Noida" citation accuracy.

---

## 9. Verification appendix (what was actually checked)

- Parsed all 66 `src/pages/**/*.astro`: title/description/canonical/H1/robots-meta/LD-JSON validity (every LD block parses as JSON ✅), og/twitter tags, speakable, answer-block classes, img attributes (alt/dims: 0 violations), asset references (1 missing file: `clinic-exterior.jpg`).
- Diffed every page's LD business nodes for geo/address/phone/hours (results in Section 2 tables).
- Validated sitemap XML (well-formed ✅; 14 duplicate `<loc>` found), robots.txt byte format (LF, no BOM, no inline-comment directives ✅), `_headers`/`worker.js` CSP cross-check (in sync ✅), `_redirects` for chain/loop candidates (none; duplicates found).
- Cross-checked FAQPage schema questions vs visible text on `/faq` (7/7 visible ✅) and faq-schema.json (valid JSON ✅).
- Confirmed llms.txt link targets against actual Astro routes (6+ broken).
- Not tested (require deployment/network, flagged as follow-ups): live HTTP header emission, CWV lab metrics, GA4 double-tagging, SW cache behavior, Google-Translate proxy interaction with COOP/CORP.
