# Crawler Policy & AEO Operations Runbook (2026)

This repository implements the **2026 AI Crawler Management & Answer Engine
Optimization (AEO) operational framework** across five layers:
`robots.txt` (access), `llms.txt` (context + usage rights), `_headers` /
`worker.js` (server-level enforcement), on-page AEO content structure
(tables + schema-mirrored FAQs), and `tests/test_crawler_policy.py`
(mandatory post-edit validation, run automatically in CI).

## What is deployed

### 1. robots.txt - tiered RFC 9309 architecture (`/robots.txt`)

| Section | Policy | Agents |
| :-- | :-- | :-- |
| 1. Global declarations | `Sitemap:` field at top | - |
| 2. Traditional search | ALLOW `/` | Googlebot, Bingbot, YandexBot, DuckDuckBot |
| 3. AI search & citation retrieval | ALLOW `/` | OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, GensparkBot, YouBot, YepBot, Amazonbot, DuckAssistBot |
| 4. AI model training scrapers | DISALLOW `/` | GPTBot, Google-Extended, ClaudeBot, Applebot-Extended, Meta-ExternalAgent, FacebookBot, CCBot, Cohere-AI |
| 5. Aggressive harvesters | DISALLOW `/` | Bytespider, Diffbot, PetalBot, Scrapy, aiHitBot, BittorrentBot |
| 6. Global fallback | ALLOW `/`, block `/*.pdf$` | `*` |

Key decisions, per the framework's decision rules:

- **The Anthropic/OpenAI split:** blocking `ClaudeBot`/`GPTBot` (training)
  while explicitly allowing `Claude-SearchBot`, `Claude-User`,
  `OAI-SearchBot`, and `ChatGPT-User` preserves real-time AI citation
  visibility. Never merge these groups - a bot that matches a specific
  `User-agent` group reads ONLY that group (no rule inheritance).
- **No sensitive paths listed.** This is a fully public static clinic site
  with no `/admin`, `/api`, or `/checkout` surfaces; listing fake ones would
  hand malicious bots a reconnaissance map. Security relies on server auth,
  not crawler compliance.
- **CSS/JS/images are never disallowed** - renderers and answer engines need
  them to understand pages.
- **No `/*?*` query-string block** - all site URLs are clean static paths;
  the wildcard would only risk false positives.
- **Wildcard precision:** the only pattern rule is `Disallow: /*.pdf$`,
  anchored with `$` so it cannot overreach into routes like
  `/downloads/pdf-guide/`.
- **Syntax hygiene:** UTF-8 without BOM, LF endings, no null bytes, no
  inline comments on directive lines, no trailing whitespace, file far under
  the 512,000-byte (500 KiB) RFC 9309 processing limit. All enforced by tests.
- **Cloudflare Content Signals** (`Content-signal: search=yes, ai-input=no,
  ai-train=no, use=reference`) are intentionally NOT written as a robots.txt
  line (not RFC 9309 syntax; risks validator failure). If adopted, enable
  them via the Cloudflare dashboard's managed settings only.

### 2. llms.txt - context layer (`/llms.txt`)

`robots.txt` controls access; `llms.txt` controls context and attribution.
The file is an index with: a blockquote summary, sectioned markdown links,
an explicit **Usage Rights** header (summarization/citation permitted with
attribution to "Mind Grace Neuropsychiatric Clinic"; offline foundation-model
training restricted), the modular `llms-<topic>.txt` convention, and citing
guidance for answer engines (inverted pyramid, FAQ-first, entity naming,
emergency-helpline precedence).

### 3. Server-level enforcement

- `_headers`: `X-Robots-Tag: noindex` for `/*.pdf` (meta tags do not work on
  non-HTML assets), plain-text serving + 1h cache for `/llms.txt` and
  `/llms-*.txt`, and `robots.txt` cached at 24h (within the 48h crawler
  cache ceiling). HTML keeps `index, follow`.
- `worker.js` (Cloudflare Worker): hard `403` blocks for the Section 5
  harvester user-agents (robots.txt requests are voluntary; Bytespider et al.
  ignore them), plus the PDF `noindex` and llms.txt content-type handling as
  defense-in-depth. The blocked list must stay in sync with robots.txt
  Section 5 - the test suite fails if it drifts. Citation agents are never
  added to this list.
- Rate limiting for browser-spoofing autonomous agents (LangGraph,
  Crawl4AI, CrewAI) is handled by Cloudflare managed rules/WAF at the zone
  level (throttle anomalous high-frequency request patterns regardless of
  user-agent). Verify **"Bot Fight Mode" and managed AI-training block stay
  OFF**: edge drops happen before origin rules and would silently void the
  Allow list in Sections 2-3.

### 4. AEO content layer (on-page extraction triggers)

- **Tabular data prioritization:** `fees.html` carries a clean, semantic
  comparison `<table>` (caption + thead + row headers) mirroring the pricing
  cards - ₹900 initial psychiatric consultation, ₹700 follow-up, ₹500–₹700
  Aasha therapy, ₹2,000–₹8,000 assessments. AI engines preferentially extract
  well-formed tables into generated comparison answers.
- **FAQPage schema that mirrors visible content:** `fees.html` now emits
  FAQPage JSON-LD whose questions/answers restate only facts already visible
  on the page (no hidden data, per Google's structured-data policy). The test
  suite validates every JSON-LD block site-wide parses as strict JSON and
  that each fees FAQ answer's key fact appears in visible text.
- **Inverted pyramid:** homepage hero answers "what/where/who" inside the
  first paragraph; fees page opens with a direct pricing statement. Keep this
  rule when editing top pages: answer first, evidence after.
- **Entity consistency:** canonical name "Mind Grace Neuropsychiatric Clinic"
  across JSON-LD, llms.txt usage rights, and citing guidance.

### 5. Validation & maintenance cycle

```bash
python -m unittest discover -s tests -v   # 38 checks, runs in CI on every push
```

The suite re-implements RFC 9309 matching (longest path wins; equal length
=> Allow beats Disallow) and asserts: every framework agent is named with
the correct verdict on real site paths, the Anthropic/OpenAI split holds,
Google-Extended does not affect Googlebot, anchor precision, encoding
hygiene, no leaked sensitive paths, llms.txt structure/usage-rights,
worker/header parity, repository hygiene (no compiled `__pycache__`
artifacts tracked - they would otherwise ship into the published site),
and the AEO content layer (fees table present and consistent, FAQPage
schema mirrors visible content, all site-wide JSON-LD parses).

Operational cadence:

- **Post-edit:** never deploy by eye; the CI validation above is the gate.
- **Emergency change:** after editing robots.txt, force immediate refetch via
  Google Search Console "Test robots.txt" (crawlers otherwise cache up to 48h).
- **Quarterly:** audit server logs for new/unlisted user-agents consuming
  bandwidth (and for 403 anomalies probing disallowed paths), update the
  Disallow lists and worker BLOCKED_BOTS accordingly, and review AI citation
  dashboards (GSC generative AI reports, Bing AI Performance).
- **Ghost indexing:** if a disallowed URL appears as an empty snippet because
  third parties link to it, remember Disallow stops *fetching*, not
  *indexing* - Allow the fetch and emit `<meta name="robots" content="noindex">`
  (or `X-Robots-Tag: noindex` for non-HTML) instead.
- **Entity consistency:** JSON-LD `name` must be exactly
  "Mind Grace Neuropsychiatric Clinic" everywhere (a variant on the homepage
  was corrected); keep it aligned with LinkedIn and directories.
- **Protocol/subdomain isolation:** these rules apply only to
  `https://mindgracencr.in`; any future subdomain or port needs its own copy.
