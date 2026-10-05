#!/usr/bin/env python3
"""P0/P1 SEO/AEO/GEO fixer (stdlib only, idempotent).

Targets (from AUDIT_SEO_AEO_GEO_2026-10-05.md):
  2.1 drop stale Sector-50 MedicalBusiness block on home; carry social sameAs
      into canonical #clinic node; add WebSite root node.
  2.2 normalize telephone/address/geo/hours/image across all LD business nodes.
  2.3 remove Karkhana Bazar address variant (doctors.astro).
  2.4 _headers noindex rules for /404 and /thank-you; fix 404 og:url.
  3.1 dedupe sitemap.xml <loc> entries.
  3.2 absolute canonicals everywhere.
  3.5 strip decorative self-referential hreflang tags.
  3.4 refresh sitemap lastmod to today.
  4   trim overlong titles/descriptions, add og:image to 9 condition pages,
      remove duplicate GTM noscript + meta keywords.
  6.1 fix broken URLs in llms.txt / llms-tools.txt.
  6.2 robots.txt cache <=48h in _headers.
Usage: python3 scripts/fix_p0_p1_all.py [--apply]
"""
import json, re, sys, pathlib, datetime

ROOT = pathlib.Path('/workspace')
APPLY = '--apply' in sys.argv
SITE = 'https://mindgracencr.in'
TODAY = datetime.date(2026, 10, 5).isoformat()

CANON_PHONE = '+91-96678-63295'
CANON_ADDR = {"@type": "PostalAddress", "streetAddress": "J123, Gamma II",
              "addressLocality": "Greater Noida", "addressRegion": "Uttar Pradesh",
              "postalCode": "201310", "addressCountry": "IN"}
CANON_GEO = {"@type": "GeoCoordinates", "latitude": 28.4910152, "longitude": 77.5132324}
CANON_HOURS = [
    {"@type": "OpeningHoursSpecification",
     "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
     "opens": "10:00", "closes": "16:00"},
    {"@type": "OpeningHoursSpecification",
     "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
     "opens": "17:30", "closes": "19:30"},
]
CLINIC_ID = SITE + '/#clinic'
STALE_MARKERS = ("Devansh Tower", "Sector 50", "Karkhana Bazar", "28.5921")
BIZ_TYPES = {"MedicalBusiness", "MedicalClinic", "LocalBusiness",
             "MedicalOrganization", "Physicians"}

log = []

def types_of(node):
    t = node.get("@type")
    return set(t if isinstance(t, list) else [t]) if isinstance(t, (str, list)) else set()

def is_biz(node):
    return bool(types_of(node) & BIZ_TYPES)

def norm_biz(n):
    n["@id"] = CLINIC_ID
    n["telephone"] = CANON_PHONE
    if "address" in n: n["address"] = CANON_ADDR
    if "geo" in n: n["geo"] = CANON_GEO
    if "openingHoursSpecification" in n: n["openingHoursSpecification"] = CANON_HOURS
    if "image" in n: n["image"] = f"{SITE}/assets/images/og-image.webp"
    sa = n.get("sameAs")
    if sa == [SITE + '/']:
        del n["sameAs"]

LD_RE = re.compile(r'(<script[^>]*type="application/ld\+json"[^>]*>)(.*?)(</script>)', re.S)

def fix_ld(text, page_label):
    """Rewrite LD blocks inside a string (HTML or String.raw payload)."""
    def sub(m):
        open_tag, body, close = m.groups()
        try:
            data = json.loads(body)
        except Exception:
            return m.group(0)
        changed = False
        def drop_stale(nodes):
            nonlocal changed
            keep = []
            for n in nodes:
                if isinstance(n, dict) and is_biz(n) and any(s in json.dumps(n) for s in STALE_MARKERS):
                    changed = True
                    log.append(f'{page_label}: dropped stale biz node {n.get("@type")}')
                    continue
                keep.append(n)
            return keep

        if isinstance(data, dict) and is_biz(data):
            if any(s in json.dumps(data) for s in STALE_MARKERS) or data.get("@id") == "":
                log.append(f'{page_label}: removed entire stale business LD block')
                return ''
            norm_biz(data); changed = True
            return open_tag + json.dumps(data, ensure_ascii=False) + close
        if isinstance(data, dict) and isinstance(data.get("@graph"), list):
            g = data["@graph"]
            g = drop_stale(g)
            biz = [n for n in g if isinstance(n, dict) and is_biz(n)]
            if len(biz) > 1:
                primary = biz[0]
                for extra in biz[1:]:
                    g.remove(extra); changed = True
                    log.append(f'{page_label}: merged duplicate biz node -> @ref')
                data["@graph"] = g
                biz = [primary]
            for n in biz:
                before = json.dumps(n, sort_keys=True)
                norm_biz(n)
                if json.dumps(n, sort_keys=True) != before: changed = True
            if "website_node_added" not in data:
                pass
            if changed or True:
                return open_tag + json.dumps(data, ensure_ascii=False) + close
            return m.group(0)
        if isinstance(data, list):
            data2 = drop_stale(data)
            biz = [n for n in data2 if isinstance(n, dict) and is_biz(n)]
            for n in biz:
                norm_biz(n); changed = True
            if changed:
                return open_tag + json.dumps(data2, ensure_ascii=False) + close
        return m.group(0)
    return LD_RE.sub(sub, text)

# ---------- 1. Astro pages ----------
for path in sorted(ROOT.glob('src/pages/**/*.astro')):
    src = text = path.read_text(encoding='utf-8')
    label = str(path.relative_to(ROOT))

    # LD normalization
    text = fix_ld(text, label)

    # 3.2 absolute canonicals
    def canon_sub(m):
        p = m.group(1)
        if p.startswith('http'):
            return m.group(0)
        return f'<link rel="canonical" href="{SITE}{p if p != "/" else "/"}">'.replace(f'{SITE}/"', f'{SITE}"')
    text = re.sub(r'<link rel="canonical" href="(/[^"]*?)">', 
                  lambda m: '<link rel="canonical" href="%s%s">' % (SITE, m.group(1) if m.group(1) != '/' else '/'),
                  text)
    text = text.replace(f'href="{SITE}/">', f'href="{SITE}">')

    # 3.5 strip self-referential hreflang pairs (single-language site; targets
    # equal this page's own canonical path -> decorative, non-reciprocal)
    hl = re.findall(r'<link rel="alternate" hreflang="[^"]*" href="[^"]*">', text)
    if hl:
        def norm_href(h):
            v = re.sub(r'^https?://mindgracencr\.in', '', h.split('href="')[1][:-2])
            return v or '/'
        canons = re.findall(r'rel="canonical" href="([^"]+)"', text)
        cpath = re.sub(r'^https?://mindgracencr\.in', '', canons[0]) if canons else None
        targets = {norm_href(h) for h in hl}
        if len(targets) == 1 and (targets == {cpath or '/'}):
            for h in hl:
                text = text.replace(h, '')
            log.append(f'{label}: removed decorative hreflang ({len(hl)} tags)')

    # phone normalization in visible markup/attrs
    text = text.replace('+91-9667863295', CANON_PHONE)

    # 4: meta keywords removal
    kw = re.findall(r'<meta\s+name="keywords"[^>]*>', text)
    if kw:
        for k in kw: text = text.replace(k, '')
        log.append(f'{label}: removed meta keywords')

    # 2.4: 404 og:url extension mismatch
    if path.name == '404.astro':
        text = text.replace(f'{SITE}/404.html', f'{SITE}/404')

    # 4: missing og:image on condition pages
    if 'property="og:image"' not in text and 'name="twitter:image"' not in text and '<title>' in text:
        rel = path.relative_to(ROOT / 'src/pages').as_posix()
        if rel.count('/') == 0:  # top-level route pages only
            text = text.replace('</head>',
                f'  <meta property="og:image" content="{SITE}/assets/images/og-image.webp">\n'
                f'  <meta name="twitter:image" content="{SITE}/assets/images/og-image.webp">\n</head>') if '</head>' in text else text
            # many pages have no literal </head> (layout owns it); insert after canonical line instead
            if f'og:image' not in text:
                m = re.search(r'<link rel="canonical" href="[^"]*">', text)
                if m:
                    ins = (f'\n  <meta property="og:image" content="{SITE}/assets/images/og-image.webp">'
                           f'\n  <meta name="twitter:image" content="{SITE}/assets/images/og-image.webp">')
                    text = text[:m.end()] + ins + text[m.end():]
                    log.append(f'{label}: added og:image/twitter:image')

    # 4: title/description trimming (truncate gracefully at word boundary)
    def trim_tag(text, tag_re, maxlen, kind):
        m = re.search(tag_re, text)
        if not m: return text
        val = m.group(1)
        if len(val) <= maxlen: return text
        cut = val[:maxlen].rsplit(' ', 1)[0]
        new = cut.rstrip(' ,;:') 
        text = text[:m.start(1)] + new + text[m.end(1):]
        log.append(f'{label}: trimmed {kind} {len(val)}->{len(new)}')
        return text
    text = trim_tag(text, r'<title>(.*?)</title>', 60, 'title')
    text = trim_tag(text, r'<meta name="description" content="(.*?)">', 160, 'description')

    # 4: duplicate GTM noscript on index
    if path.name == 'index.astro':
        pat = re.compile(r'<!-- Google Tag Manager \(noscript\) -->\s*<noscript>.*?</noscript>\s*<!-- End Google Tag Manager \(noscript\) -->', re.S)
        hits = list(pat.finditer(text))
        if len(hits) > 1:
            h = hits[-1]
            text = text[:h.start()] + text[h.end():]
            log.append(f'{label}: removed duplicate GTM noscript')

    # 6.7 Zaraz: strip queueing script (documented TODO loop) — keep comment note
    zscripts = re.findall(r'<script[^>]*zaraz-tracking[^>]*></script>', text)
    if zscripts:
        for zs in zscripts:
            text = text.replace(zs, '<!-- Zaraz disabled: queue-loop perf issue (see audit 6.7) -->')
        log.append(f'{label}: removed Zaraz tracking script ({len(zscripts)})')

    if text != src:
        if APPLY: path.write_text(text, encoding='utf-8')
        else: log.append(f'[dry] would change {label}')

# ---------- homepage specifics ----------
idx = ROOT / 'src/pages/index.astro'
if idx.exists():
    text = idx.read_text(encoding='utf-8')
    # carry social sameAs into canonical clinic node + add WebSite node
    def up(graph_json_str):
        try:
            d = json.loads(graph_json_str)
        except Exception:
            return graph_json_str
        if not (isinstance(d, dict) and isinstance(d.get('@graph'), list)): return graph_json_str
        for n in d['@graph']:
            if isinstance(n, dict) and is_biz(n):
                n['sameAs'] = ["https://www.facebook.com/mindgracencr",
                               "https://www.instagram.com/mindgracencr"]
                break
        ids = {n.get('@id') for n in d['@graph'] if isinstance(n, dict)}
        if SITE + '/#website' not in ids:
            d['@graph'].append({"@type": "WebSite", "@id": SITE + '/#website',
                                "url": SITE + '/', "name": "Mind Grace Neuropsychiatric Clinic",
                                "inLanguage": "en-IN", "publisher": {"@id": CLINIC_ID}})
        return json.dumps(d, ensure_ascii=False)
    m = re.search(r'(<script id="mindgrace-static-clinic-schema" type="application/ld\+json">)(.*?)(</script>)', text, re.S)
    if m:
        new_body = up(m.group(2))
        if new_body != m.group(2):
            text = text[:m.start(2)] + new_body + text[m.end(2):]
            log.append('index.astro: social sameAs moved to #clinic; WebSite node added')
    if APPLY: idx.write_text(text, encoding='utf-8')

# ---------- sitemap.xml ----------
sm = ROOT / 'sitemap.xml'
xml = sm.read_text(encoding='utf-8')
urls = re.findall(r'<loc>(.*?)</loc>', xml)
seen, dupes = set(), []
for u in urls:
    if u in seen: dupes.append(u)
    seen.add(u)
blocks = re.findall(r'<url>.*?</url>', xml, re.S)
kept, seenset = [], set()
for b in blocks:
    u = re.search(r'<loc>(.*?)</loc>', b).group(1)
    if u in seenset: continue
    seenset.add(u)
    b = re.sub(r'<lastmod>[^<]*</lastmod>', f'<lastmod>{TODAY}</lastmod>', b)
    kept.append(b)
new_xml = ('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           + '\n'.join(kept) + '\n</urlset>\n')
log.append(f'sitemap.xml: {len(blocks)} -> {len(kept)} url entries ({len(dupes)} dupes removed), lastmod refreshed')
if APPLY: sm.write_text(new_xml, encoding='utf-8')

# ---------- llms.txt / llms-tools.txt ----------
def fix_llms(p):
    if not p.exists(): return
    t = orig = p.read_text(encoding='utf-8')
    t = re.sub(r'/blogiilm', '/blog/iilm', t)
    t = re.sub(r'/tools(butterfly-tapper|guided-breathing|eye-movement|horizon-scan|hypnos-fractal|leaf-on-stream)\.html', r'/tools\1', t)
    t = re.sub(r'(https?://mindgracencr\.in)?/(services|doctors|fees|process|about|contact|location|emergency|book|faq)\.html', r'SITE/\1', t)
    t = t.replace('SITE/', SITE + '/')
    # make relative links absolute
    t = re.sub(r'\]\((/(?:[^)\s]+))\)', lambda m: '](' + SITE + (m.group(1) if m.group(1) != '/' else '') + ')', t)
    if t != orig:
        log.append(f'{p.name}: fixed broken/relative URLs')
        if APPLY: p.write_text(t, encoding='utf-8')
fix_llms(ROOT / 'llms.txt'); fix_llms(ROOT / 'llms-tools.txt'); fix_llms(ROOT / 'llms-blog.txt')

# add Services/Conditions section to llms.txt (audit 6.6)
ll = ROOT / 'llms.txt'
if ll.exists():
    t = ll.read_text(encoding='utf-8')
    if '## Conditions & Services' not in t:
        routes = ['addiction-substance-use','adhd-autism-assessment','bipolar-mood-disorders',
                  'depression-anxiety','learning-disability-assessment','ocd-panic-ptsd',
                  'psychosis-schizophrenia','sleep-eating-disorders','trauma-grief-support',
                  'psychiatry','psychology-counselling','child-development','services','fees','doctors']
        sec = '\n\n## Conditions & Services\n\n' + '\n'.join(f'- [{r}]({SITE}/{r})' for r in routes) + '\n'
        t += sec
        log.append('llms.txt: added Conditions & Services index section')
        if APPLY: ll.write_text(t, encoding='utf-8')

# ---------- _headers ----------
hp = ROOT / '_headers'
h = hp.read_text(encoding='utf-8')
if '/404' not in h.split('\nX-Robots-Tag')[0] or True:
    add = ('\n/thank-you\n  X-Robots-Tag: noindex, follow\n'
           '/404\n  X-Robots-Tag: noindex, follow\n'
           '/404.html\n  X-Robots-Tag: noindex, follow\n')
    if 'noindex, follow' not in h:
        h = h.rstrip() + '\n' + add
        log.append('_headers: added noindex X-Robots-Tag for /404 & /thank-you')
h = re.sub(r'(/robots\.txt\s*\n\s*Cache-Control: public, max-age=)\d+', r'\g<1>172800', h)
if 'max-age=172800' in h: log.append('_headers: robots.txt cache capped to 48h')
if APPLY: hp.write_text(h, encoding='utf-8')

# ---------- faq-schema.json sync (leave content; validate) ----------
try:
    json.loads((ROOT / 'faq-schema.json').read_text())
    log.append('faq-schema.json: valid JSON (unchanged)')
except Exception as e:
    log.append(f'faq-schema.json INVALID: {e}')

print('\n'.join(log))
print(f'\n=== apply={APPLY}, actions={len(log)} ===')
