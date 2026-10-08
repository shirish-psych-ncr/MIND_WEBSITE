#!/usr/bin/env python3
"""Mind Grace Neuropsychiatric Clinic -- customized SEO/AEO/GEO audit.

Variant derived (methodology, not code) from the open-source claude-seo project
(https://github.com/AgriciDaniel/claude-seo, MIT License, (c) Daniel Agrici):
  - skills/seo-audit/SKILL.md   -> phased audit, category scores, severity
    Critical/High/Medium/Low, weighted health score, action-plan output shape.
  - skills/seo-geo/SKILL.md     -> GEO sub-weights (Citability 25 / Structure 20 /
    Multi-modal 15 / Authority 20 / Technical accessibility 20), AI-crawler
    separation table (citation bots vs training-only bots; per-claim bot checks),
    llms.txt reported for completeness but carrying NO score weight.
  - scripts/consistency_check.py-> error/warning/info exit-code contract.

Adapted for this repo's constraints:
  * Python STANDARD LIBRARY ONLY. No Node modules, no pip installs, no network.
    (Upstream uses requests/bs4/playwright via a managed venv; we scan the
    source tree statically instead of live-crawling.)
  * Scans src/pages/**/*.astro + root artifacts (_headers, _redirects, robots.txt,
    sitemap.xml, llms*.txt, faq-schema.json, sw.js, worker.js).
  * Encodes Mind Grace canonical facts (single business entity) and asserts
    NAP/schema consistency sitewide -- the P0 class of bugs found in the
    2026-10 audits.

Usage:
    python3 scripts/mg_audit.py [--json] [--strict] [--root DIR]

Exit codes: 0 = clean (warnings allowed unless --strict), 1 = errors found.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import date, datetime
from pathlib import Path
from html.parser import HTMLParser

# --------------------------------------------------------------------------
# Canonical facts for mindgracencr.in (single-entity policy, audit P0 §2.1)
# --------------------------------------------------------------------------
SITE = "https://mindgracencr.in"
# Verified against the live repo state on 2026-10-06: 64/64 schema nodes use the
# Gamma II address and geo below; the Sector-50/Devansh-Tower entity was removed
# as audit P0 fix #1. Update HERE only when the practice actually moves.
CANONICAL = {
    "names": {"Mind Grace Neuropsychiatric Clinic", "Mind Grace Clinic"},  # accepted variants
    "primary_name": "Mind Grace Neuropsychiatric Clinic",
    "phone": "+91-96678-63295",
    "street": "J123, Gamma II",
    "locality": "Greater Noida",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "201310",
    "geoLat": 28.4910152,
    "geoLng": 77.5132324,
    "geoTolerance": 0.02,           # ~2 km; anything outside is a stale entity
}
UTILITY_NOINDEX = {"404", "thank-you", "consent", "disclaimer"}  # path stems
MAX_TITLE = 65
MAX_DESC = 165
MIN_DESC = 50

ERRORS: list[str] = []
WARNINGS: list[str] = []
INFOS: list[str] = []


def err(msg: str) -> None:
    ERRORS.append(msg)


def warn(msg: str) -> None:
    WARNINGS.append(msg)


def info(msg: str) -> None:
    INFOS.append(msg)


# --------------------------------------------------------------------------
# Minimal stdlib HTML scraping helpers
# --------------------------------------------------------------------------
TAG_ATTR_RE = re.compile(r"<(?P<tag>[a-zA-Z][\w-]*)(?P<attrs>[^>]*)>", re.S)
ATTR_RE = re.compile(r"""([\w:-]+)\s*=\s*["']([^"']*)["']""")


def attrs_of(tag_open: str) -> dict:
    return {k.lower(): v for k, v in ATTR_RE.findall(tag_open)}


class TextExtractor(HTMLParser):
    SKIP = {"script", "style", "noscript"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self._skip = 0
        self.parts: list[str] = []

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self._skip += 1

    def handle_endtag(self, tag):
        if tag in self.SKIP and self._skip:
            self._skip -= 1

    def handle_data(self, data):
        if not self._skip:
            self.parts.append(data)


def visible_text(html: str) -> str:
    te = TextExtractor()
    try:
        te.feed(html)
    except Exception:
        pass
    return re.sub(r"\s+", " ", " ".join(te.parts))


LD_BLOCK_RE = re.compile(
    r"<script[^>]+application/ld\+json[^>]*>(.*?)</script>", re.S | re.I
)


def flatten_nodes(value):
    if isinstance(value, dict):
        yield value
        for child in value.get("@graph", []) if isinstance(value.get("@graph"), list) else []:
            yield from flatten_nodes(child)
    elif isinstance(value, list):
        for child in value:
            yield from flatten_nodes(child)


def as_list(v):
    if v is None:
        return []
    return v if isinstance(v, list) else [v]


def type_set(node) -> set:
    return {str(t) for t in as_list(node.get("@type"))}


BUSINESS_TYPES = {
    "MedicalClinic", "MedicalBusiness", "PhysiciansOffice", "PsychiatricFacility",
    "LocalBusiness", "MedicalOrganization", "Clinic",
}


# --------------------------------------------------------------------------
# Collect pages: Astro sources + any built HTML under dist/ if present
# --------------------------------------------------------------------------
def collect_pages(root: Path):
    pages = []
    for p in sorted((root / "src" / "pages").rglob("*.astro")):
        rel = p.relative_to(root).as_posix()
        route = "/" + rel[len("src/pages/"):]
        route = re.sub(r"\.astro$", "", route)
        if route.endswith("/index"):
            route = route[: -len("index")]
        if route == "/":
            route = "/index"
        pages.append({"source": rel, "route": route, "text": p.read_text(encoding="utf-8", errors="replace")})
    dist = root / "dist"
    if dist.is_dir():
        n = sum(1 for _ in dist.rglob("*.html"))
        info(f"dist/ present with {n} HTML files; source-tree findings are authoritative pre-build")
    return pages


# --------------------------------------------------------------------------
# Checks
# --------------------------------------------------------------------------
def check_ld_blocks(pages):
    """Parse every JSON-LD block in every page; enforce single-entity + NAP."""
    seen_business_pages = {}
    for pg in pages:
        blocks = LD_BLOCK_RE.findall(pg["text"])
        parsed_any = False
        biz_nodes = []
        for i, raw in enumerate(blocks):
            stripped = raw.strip()
            # Skip blocks that are clearly template-interpolated (can't parse statically)
            if "${" in stripped or "JSON.stringify" in stripped:
                info(f"{pg['source']}: ld-block[{i}] is template-interpolated (runtime-built); skipped")
                continue
            try:
                data = json.loads(stripped)
            except json.JSONDecodeError as e:
                err(f"{pg['source']}: JSON-LD block[{i}] fails to parse: {e}")
                continue
            parsed_any = True
            nodes = list(flatten_nodes(data))
            for n in nodes:
                t = type_set(n)
                if t & BUSINESS_TYPES:
                    biz_nodes.append((i, n, t))
        seen_business_pages[pg["source"]] = biz_nodes

        # single business entity per page
        if len(biz_nodes) > 1:
            ids = [n.get("@id", f"block{ i }") for i, (_, n, _) in [(j, x) for j, x in enumerate(biz_nodes)]]
            err(f"{pg['source']}: {len(biz_nodes)} business schema nodes (single-entity policy) -> {ids}")
        for bi, (block_idx, node, types) in enumerate(biz_nodes):
            loc = f"{pg['source']} ld-block[{block_idx}]"
            # @id
            nid = node.get("@id", "")
            if not nid or not str(nid).strip():
                err(f"{loc}: empty/missing @id on business node")
            elif "#" not in str(nid):
                warn(f"{loc}: @id lacks fragment anchor: {nid}")
            # phone
            tel = str(node.get("telephone", ""))
            if tel and tel != CANONICAL["phone"]:
                err(f"{loc}: telephone '{tel}' != canonical '{CANONICAL['phone']}'")
            # address
            addr = node.get("address") or {}
            street = str(addr.get("streetAddress", ""))
            if street and CANONICAL["street"].lower() not in street.lower():
                err(f"{loc}: stale streetAddress '{street}' (canonical: '{CANONICAL['street']}')")
            loc_name = str(addr.get("addressLocality", ""))
            if loc_name and loc_name != CANONICAL["locality"]:
                err(f"{loc}: addressLocality '{loc_name}' != canonical")
            pc = str(addr.get("postalCode", ""))
            if pc and pc != CANONICAL["postalCode"]:
                err(f"{loc}: postalCode '{pc}' != canonical")
            # business name drift (entity-resolution signal)
            bname = str(node.get("name", ""))
            if bname and bname not in CANONICAL["names"]:
                warn(f"{loc}: business name '{bname}' outside accepted variants {sorted(CANONICAL['names'])}")
            # geo
            geo = node.get("geo") or {}
            try:
                lat, lng = float(geo.get("latitude")), float(geo.get("longitude"))
            except (TypeError, ValueError):
                lat = lng = None
            if lat is not None:
                if abs(lat - CANONICAL["geoLat"]) > CANONICAL["geoTolerance"] or \
                   abs(lng - CANONICAL["geoLng"]) > CANONICAL["geoTolerance"]:
                    err(f"{loc}: geo ({lat},{lng}) outside canonical window (stale entity)")
            elif "geo" in node:
                err(f"{loc}: geo present but unparsable coordinates")
            # image liveness handled in check_assets; here flag known-dead file
            img = str(node.get("image", ""))
            if "clinic-exterior" in img:
                err(f"{loc}: references dead image '{img}'")
            # priceRange / openingHours presence (local SEO signal)
            if "priceRange" not in node:
                warn(f"{loc}: business node missing priceRange")
            if "openingHoursSpecification" not in node and "openingHours" not in node:
                warn(f"{loc}: business node missing opening hours")
    return seen_business_pages


def check_meta_head(pages):
    for pg in pages:
        src, text = pg["source"], pg["text"]
        noindex = bool(re.search(r"noindex", text))
        stem = Path(src).stem
        # title
        m = re.search(r"<title[^>]*>(.*?)</title>", text, re.S | re.I)
        if m:
            t = m.group(1).strip()
            if "${" not in t and "{" not in t:
                if len(t) > MAX_TITLE:
                    warn(f"{src}: title {len(t)} chars > {MAX_TITLE}: {t[:70]}...")
            else:
                info(f"{src}: title is template-composed; verify rendered length <= {MAX_TITLE}")
        elif "Layout" not in text and not noindex:
            warn(f"{src}: no <title> in page (may come from layout)")
        # meta description
        d = re.search(r'name=["\']description["\'][^>]+content=["\']([^"\']{0,400})', text) or \
            re.search(r'content=["\']([^"\']{0,400})["\'][^>]+name=["\']description', text)
        if d:
            desc = d.group(1)
            if "{" not in desc:
                if len(desc) > MAX_DESC:
                    warn(f"{src}: meta description {len(desc)} chars > {MAX_DESC}")
                elif len(desc) < MIN_DESC and not noindex:
                    warn(f"{src}: meta description {len(desc)} chars thin (<{MIN_DESC})")
        # canonical + og:url parity
        canon = re.search(r'rel=["\']canonical["\'][^>]+href=["\']([^"\']+)', text) or \
                re.search(r'href=["\']([^"\']+)["\'][^>]+rel=["\']canonical', text)
        ogurl = re.search(r'property=["\']og:url["\'][^>]+content=["\']([^"\']+)', text)
        if canon:
            href = canon.group(1)
            if href.startswith("/"):
                err(f"{src}: relative canonical '{href}' (must be absolute)")
            elif not href.startswith(SITE):
                err(f"{src}: canonical off-site: {href}")
            else:
                want = pg["route"]
                want = "" if want == "/index" else want.rstrip("/")
                got = href[len(SITE):].rstrip("/")
                if got != want and not (want == "" and got == ""):
                    warn(f"{src}: canonical '{href}' may not match route {pg['route']}")
        if canon and ogurl and "${" not in canon.group(1) and "{" not in ogurl.group(1):
            if canon.group(1).rstrip("/") != ogurl.group(1).rstrip("/"):
                err(f"{src}: canonical != og:url")
        # social images must be absolute
        for prop in ("og:image", "twitter:image"):
            for mm in re.finditer(prop, text):
                seg = text[mm.start(): mm.start() + 220]
                c = re.search(r'content=["\']([^"\']+)["\']', seg)
                if c and c.group(1).startswith("/"):
                    err(f"{src}: {prop} relative URL '{c.group(1)}' (must be absolute)")
        # deprecated keywords meta
        if re.search(r'name=["\']keywords["\']', text):
            warn(f"{src}: deprecated meta keywords present")
        # hreflang self-pairs (decorative)
        if re.search(r'hreflang=["\']', text):
            langs = re.findall(r'hreflang=["\']([^"\']+)["\']', text)
            if len(set(langs)) <= 2 and all(l in ("en", "x-default") for l in langs):
                warn(f"{src}: decorative single-language hreflang pair(s) {langs}")
        # duplicate GTM noscript
        if text.count("googletagmanager.com/ns.html") > 1:
            err(f"{src}: duplicate GTM noscript tag")
        # speakable presence (AEO)
        if not noindex and "speakable" not in text:
            warn(f"{src}: indexable page without speakable spec")


def check_h_and_answers(pages):
    for pg in pages:
        text = pg["text"]
        h1s = re.findall(r"<h1[\s>]", text)
        if len(h1s) != 1 and "noindex" not in text:
            err(f"{pg['source']}: {len(h1s)} <h1> tags (want exactly 1)")
        if not re.search(r'class=["\'][^"\']*(?:seo-answer|blog-answer|direct-answer|answer-block)', text):
            if "noindex" not in text:
                warn(f"{pg['source']}: no direct-answer block class found")


def check_images(pages, root: Path):
    assets = {p.name for p in root.rglob("*") if p.is_file() and p.suffix.lower() in
              {".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg", ".gif"} and
              "node_modules" not in p.parts and ".git" not in p.parts}
    for pg in pages:
        for m in re.finditer(r"<img\b[^>]*>", pg["text"], re.I):
            a = attrs_of(m.group(0))
            src = a.get("src", "")
            if not a.get("alt"):
                err(f"{pg['source']}: <img> missing alt: {src[:60]}")
            base = Path(src.split("?")[0]).name
            if base and base not in assets and "{" not in src and "${" not in src:
                err(f"{pg['source']}: <img src> not found on disk: {src[:80]}")
            if "loading=" not in m.group(0) and "/images/" in src:
                warn(f"{pg['source']}: content image without loading attr: {src[:60]}")


def check_redirects_headers(root: Path):
    red = root / "_redirects"
    if red.exists():
        rules = [l.strip() for l in red.read_text().splitlines() if l.strip() and not l.startswith("#")]
        pairs = [" ".join(r.split()) for r in rules]
        dupes = {p for p in pairs if pairs.count(p) > 1}
        if dupes:
            err(f"_redirects: {len(dupes)} duplicated rule(s), e.g. {sorted(dupes)[:3]}")
        for p in pairs:
            parts = p.split()
            if len(parts) >= 2 and not parts[1].startswith(("http", "/", ":")):
                warn(f"_redirects: odd target: {p[:80]}")
    hd = root / "_headers"
    if hd.exists():
        txt = hd.read_text()
        # cache policy for robots/sitemap
        for f, maxage in (("robots.txt", 172800), ("/sitemap.xml", 86400)):
            blk = re.search(re.escape(f) + r"([\s\S]*?)(?=\n/\S|\Z)", txt)
            if blk:
                m = re.search(r"max-age=(\d+)", blk.group(1))
                if m and int(m.group(1)) > maxage:
                    err(f"_headers: {f} cached max-age={m.group(1)} > {maxage}")
        idx = re.findall(r"X-Robots-Tag:\s*([^\n]+)", txt)
        if any("index" in v and "noindex" not in v for v in idx) and not any("noindex" in v for v in idx):
            warn("_headers: global 'index' X-Robots-Tag with no noindex overrides")
        if sum("noindex" in v for v in idx) and any(v.strip().lower() == "index" for v in idx):
            info(f"_headers: X-Robots-Tag rules: {idx}")


def check_sitemap(root: Path):
    sm = root / "sitemap.xml"
    if not sm.exists():
        err("sitemap.xml missing")
        return
    txt = sm.read_text()
    locs = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", txt)
    dupes = sorted({l for l in locs if locs.count(l) > 1})
    if dupes:
        err(f"sitemap.xml: {len(dupes)} duplicate <loc>: {dupes[:5]}")
    bad = [l for l in locs if not l.startswith(SITE)]
    if bad:
        err(f"sitemap.xml: non-canonical-origin locs: {bad[:5]}")
    mods = re.findall(r"<lastmod>([^<]+)</lastmod>", txt)
    future = [m for m in mods if m[:10] > date.today().isoformat()]
    if future:
        warn(f"sitemap.xml: lastmod in the future: {future[:3]}")
    info(f"sitemap.xml: {len(locs)} loc entries, {len(set(locs))} unique")


def route_exists(root: Path, path: str) -> bool:
    """Resolve a site-relative path against src/pages (index files, dirs, statics)."""
    rel = path.strip("/")
    if not rel:
        return True
    base = root / "src" / "pages"
    cand = base / rel
    if cand.with_suffix(".astro").exists() or cand.is_dir():
        return True
    if (cand.parent / (cand.name + ".astro")).exists():  # e.g. blog/iilm... vs nested
        return True
    if (root / rel).exists() or (root / "public" / rel).exists():  # llms-*.txt etc.
        return True
    # index under directory: /blog/ -> src/pages/blog/index.astro ; /tools/x handled above
    if (base / rel / "index.astro").exists():
        return True
    # nested blog routes: /blog/pages/adult/x -> src/pages/blog/pages/adult/x.astro
    return False


def check_robots_llms(root: Path):
    rob = (root / "robots.txt").read_text(errors="replace") if (root / "robots.txt").exists() else ""
    allow_cite = ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot"]
    block_train = ["GPTBot", "ClaudeBot", "CCBot", "Bytespider", "Google-Extended", "Applebot-Extended"]
    for b in allow_cite:
        m = re.search(r"User-agent:\s*" + re.escape(b) + r"\s*\n\s*([^#\n]*)", rob)
        if not m or "disallow" in m.group(1).lower():
            err(f"robots.txt: citation bot {b} not explicitly allowed (GEO citability)")
    for b in block_train:
        if not re.search(r"User-agent:\s*" + re.escape(b) + r"\b", rob):
            warn(f"robots.txt: training-only bot {b} has no explicit rule (policy statement gap)")
    # RFC 9309 syntax: no Crawl-delay for googlebot etc. -- light check
    if re.search(r"Sitemap:\s*/", rob):
        err("robots.txt: Sitemap line must be an absolute URL")
    for name in ("llms.txt", "llms-tools.txt", "llms-blog.txt"):
        f = root / name
        if not f.exists():
            continue
        txt = f.read_text(errors="replace")
        urls = re.findall(r"https?://[^\s)\]>\"']+", txt)
        broken = []
        for u in urls:
            if u.count("://") > 1 or u.endswith(".html") or re.search(r"/(blog|tools)[a-z]", u):
                broken.append(u)
            elif u.startswith("http://"):
                broken.append(u)
        if broken:
            err(f"{name}: malformed/broken URLs: {broken[:6]}")
        # link targets resolve to routes? Only check markdown-style links
        # [text](url); plain URLs inside prose answers are skipped to avoid
        # trailing-punctuation false positives.
        for u in re.findall(r"\]\((https?://[^)\s]+)\)", txt):
            if u.startswith(SITE):
                path = u[len(SITE):].split("#")[0].rstrip("/") or "/"
                if not route_exists(root, path):
                    warn(f"{name}: URL {u} has no matching page source")


def check_faq(root: Path, pages):
    fq = root / "faq-schema.json"
    if not fq.exists():
        return
    try:
        data = json.loads(fq.read_text())
    except json.JSONDecodeError as e:
        err(f"faq-schema.json invalid: {e}")
        return
    main = data.get("mainEntity") if isinstance(data, dict) else None
    qnodes = [n for n in as_list(main) if isinstance(n, dict) and "Question" in type_set(n)]
    faq_pg = next((p for p in pages if p["source"].endswith("faq.astro")), None)
    if not faq_pg:
        warn("faq.astro missing")
        return
    vis = visible_text(faq_pg["text"]).lower()
    missing = [q.get("name", "?") for q in qnodes if q.get("name", "@@none@@").lower()[:40] not in vis]
    if missing:
        err(f"faq-schema.json: {len(missing)} FAQ question(s) not mirrored visibly: {missing[:4]}")
    info(f"FAQ: {len(qnodes)} questions in schema, all mirrored visibly" if not missing
         else f"FAQ: {len(qnodes)} questions in schema")


def check_entity_graph(pages):
    """AEO: WebSite/WebPage root node referencing publisher, sameAs, author pages."""
    for pg in pages:
        if pg["route"] != "/index":
            continue
        text = pg["text"]
        has_site_node = '"WebSite"' in text or "'WebSite'" in text
        if not has_site_node:
            warn("index.astro: no WebSite root node in graph")
        if "sameAs" not in text:
            warn("index.astro: business node lacks sameAs (brand/entity signals)")


def check_service_worker(root: Path):
    sw = root / "sw.js"
    if sw.exists():
        txt = sw.read_text(errors="replace")
        m = re.search(r"VERSION\s*=\s*['\"]([^'\"]+)", txt)
        if m:
            info(f"sw.js version: {m.group(1)}")
        # Cache-first is acceptable for tool pages (offline self-help); flag only
        # if HTML *navigations* appear to be cache-first.
        nav_cache_first = re.search(r"request\.mode\s*===?\s*['\"]navigate['\"][\s\S]{0,200}?caches\.match", txt)
        if nav_cache_first and "network" not in nav_cache_first.group(0).lower():
            warn("sw.js: navigation requests served cache-first; HTML may go stale for crawlers/users")


def score_categories(pages, biz_map):
    """Weighted scoring per upstream seo-audit rubric, adapted to static analysis."""
    def penalty(items, weight_each):
        return min(100, sum(weight_each for it in items if it))

    tech_errs = [e for e in ERRORS if any(k in e for k in ("canonical", "sitemap", "_redirects", "_headers", "robots", "X-Robots"))]
    schema_errs = [e for e in ERRORS if "ld-block" in e or "schema" in e.lower()]
    onpage_warns = [w for w in WARNINGS if any(k in w for k in ("title", "description", "hreflang", "keywords", "speakable"))]
    geo_errs = [e for e in ERRORS if "llms" in e or "citation bot" in e]

    n = max(1, len(pages))
    scores = {
        "Technical SEO": max(0, 100 - 12 * len(tech_errs) - 2 * len([w for w in WARNINGS if "_headers" in w or "redirect" in w])),
        "Schema & Structured Data": max(0, 100 - 10 * len(schema_errs)),
        "On-Page SEO": max(0, 100 - 3 * len(onpage_warns) - 8 * len([e for e in ERRORS if "<h1>" in e])),
        "AEO (answer engine)": max(0, 100 - 10 * len([e for e in ERRORS if "FAQ" in e]) - 2 * len([w for w in WARNINGS if "speakable" in w or "answer" in w])),
        "GEO (AI search readiness)": max(0, 100 - 12 * len(geo_errs) - 6 * len([e for e in ERRORS if "robots" in e])),
        "Images & Media": max(0, 100 - 5 * len([e for e in ERRORS if "<img" in e]) - 2 * len([w for w in WARNINGS if "image" in w.lower()])),
    }
    weights = {"Technical SEO": .22, "Schema & Structured Data": .18, "On-Page SEO": .2,
               "AEO (answer engine)": .12, "GEO (AI search readiness)": .12, "Images & Media": .06}
    total = round(sum(scores[k] * w for k, w in weights.items()) / sum(weights.values()))
    return scores, total


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[1])
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--strict", action="store_true", help="treat warnings as errors")
    ap.add_argument("--root", default=".")
    args = ap.parse_args()
    root = Path(args.root).resolve()

    pages = collect_pages(root)
    print(f"# Mind Grace SEO/AEO/GEO audit -- {len(pages)} page sources scanned\n")

    check_ld_blocks(pages)
    check_meta_head(pages)
    check_h_and_answers(pages)
    check_images(pages, root)
    check_redirects_headers(root)
    check_sitemap(root)
    check_robots_llms(root)
    check_faq(root, pages)
    check_entity_graph(pages)
    check_service_worker(root)

    scores, total = score_categories(pages, None)

    payload = {
        "generated": datetime.now().isoformat(timespec="seconds"),
        "pages_scanned": len(pages),
        "health_score": total,
        "category_scores": scores,
        "errors": ERRORS,
        "warnings": WARNINGS,
        "infos": INFOS,
    }
    if args.json:
        print(json.dumps(payload, indent=2))
    else:
        print("## Category scores")
        for k, v in scores.items():
            print(f"  {k:32s} {v:3d}/100")
        print(f"  {'HEALTH (weighted)':32s} {total:3d}/100\n")
        print(f"## Errors ({len(ERRORS)})")
        for e in ERRORS:
            print(f"  [E] {e}")
        print(f"\n## Warnings ({len(WARNINGS)})")
        for w in WARNINGS:
            print(f"  [W] {w}")
        print(f"\n## Infos ({len(INFOS)})")
        for i in INFOS:
            print(f"  [i] {i}")
    rc = 1 if (ERRORS or (args.strict and WARNINGS)) else 0
    sys.exit(rc)


if __name__ == "__main__":
    main()
