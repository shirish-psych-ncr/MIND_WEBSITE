import pathlib,re,json,collections,datetime
root=pathlib.Path('/workspace')
pages=sorted(root.glob('src/pages/**/*.astro'))
BASE='https://mindgracencr.in'
def nodes(v):
    if isinstance(v,dict):
        yield v
        g=v.get('@graph')
        if isinstance(g,list):
            for c in g: yield from nodes(c)
        elif isinstance(g,dict): yield from nodes(g)
    elif isinstance(v,list):
        for c in v: yield from nodes(c)
F=collections.defaultdict(list); C=collections.Counter()
phones=collections.Counter(); geos=collections.Counter(); streets=collections.Counter()
for p in pages:
    t=p.read_text(errors='ignore'); rel=str(p.relative_to(root))
    tt=re.search(r'<title[^>]*>(.*?)</title>',t,re.S)
    tl=len(re.sub(r'\{.*?\}','X',tt.group(1))) if tt else 0
    if not tt or tl==0: F['missing_title'].append(rel)
    if tl>60: F['title_gt60'].append((rel,tl))
    dd=re.search(r'name="description"[^>]*content="([^"]*)"',t)
    if not dd: F['missing_desc'].append(rel)
    elif len(dd.group(1))>160: F['desc_gt160'].append((rel,len(dd.group(1))))
    cu=re.search(r'rel="canonical"\s+href="([^"]*)"',t); ou=re.search(r'property="og:url"[^>]*content="([^"]*)"',t)
    if not cu: F['missing_canonical'].append(rel)
    elif not cu.group(1).startswith('http'): F['rel_canon'].append(rel)
    if cu and ou and cu.group(1).rstrip('/')!=ou.group(1).rstrip('/'): F['canon_og_mismatch'].append((rel,cu.group(1),ou.group(1)))
    if 'hreflang' in t: F['hreflang'].append(rel)
    if re.search(r'name="keywords"',t): F['meta_keywords'].append(rel)
    h1=len(re.findall(r'<h1\b',t))
    if h1!=1: F['bad_h1'].append((rel,h1))
    m=re.search(r'property="og:image"[^>]*content="([^"]*)"',t)
    if not m: F['missing_ogimage'].append(rel)
    elif not m.group(1).startswith('http'): F['relative_ogimage'].append((rel,m.group(1)))
    tm=re.search(r'name="twitter:image"[^>]*content="([^"]*)"',t)
    if tm and not tm.group(1).startswith('http'): F['relative_twitter_image'].append(rel)
    if 'SpeakableSpecification' not in t: F['no_speakable'].append(rel)
    if not re.search(r'class="[^"]*(seo-answer|blog-answer|direct-answer)',t): F['no_answer_block'].append(rel)
    if 'noindex' in t: F['noindex_pages'].append(rel)
    if t.count('googletagmanager.com/ns.html')>1: F['dup_gtm'].append(rel)
    biz=0
    for b in re.findall(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>',t,re.S):
        cand=None
        for sub in ('0','"X"','true','null'):
            try: cand=json.loads(re.sub(r'\{[^{}]*\}',sub,b)); break
            except: continue
        if cand is None:
            try: cand=json.loads(re.sub(r'\{.*?\}','0',b,flags=re.S))
            except Exception as e: F['ld_parse_fail'].append((rel,str(e)[:60])); continue
        for n in nodes(cand):
            tys=[n.get('@type')] if isinstance(n.get('@type'),str) else (n.get('@type') or [])
            s=str(tys)
            if any(x in s for x in ('MedicalClinic','LocalBusiness','MedicalBusiness')):
                biz+=1
                if n.get('telephone'): phones[n['telephone']]+=1
                ad=n.get('address')
                if isinstance(ad,dict) and ad.get('streetAddress'): streets[ad['streetAddress']]+=1
                g=n.get('geo')
                if isinstance(g,dict) and g.get('latitude') is not None: geos[f"{g.get('latitude')},{g.get('longitude')}"]+=1
    if biz>1: F['multi_biz'].append((rel,biz))
    body=t.split('---')[-1]
    if re.search(r'<script type="application/ld\+json">\{"@id": "[^"]*#clinic"\}</script>',body): F['orphan_clinic_ref_body'].append(rel)
sm=(root/'sitemap.xml').read_text(); locs=re.findall(r'<loc>(.*?)</loc>',sm)
C['sitemap_locs']=len(locs); C['sitemap_unique']=len(set(locs))
routes=set()
for p in pages:
    r='/'+str(p.relative_to(root/'src/pages')).replace('.astro','')
    r=re.sub(r'/index$','',r); routes.add(r.rstrip('/'))
sm_paths={u.replace(BASE,'').rstrip('/') for u in locs}
F['sitemap_orphans']=sorted(sm_paths-routes)
F['pages_not_in_sitemap']=sorted(routes-sm_paths-{'/thank-you','/404'})
hd=(root/'_headers').read_text()
C['global_xrobots_index']=bool(re.search(r'^/\*\n[\s\S]{0,600}?X-Robots-Tag:\s*index',hd,re.M))
F['headers_noindex_paths']=re.findall(r'^(\/\S+)\n\s+X-Robots-Tag:\s*noindex',hd,re.M)
m=re.search(r'/robots\.txt\n(?:#[^\n]*\n)*\s+Cache-Control:[^>]*max-age=(\d+)',hd); C['robots_max_age']=m.group(1) if m else '?'
rules=[l.strip() for l in (root/'_redirects').read_text().splitlines() if l.strip() and not l.startswith('#')]
F['redirect_dupes']=[r for r,c in collections.Counter(rules).items() if c>1]; C['redirect_rules']=len(rules)
for f in ['llms.txt','llms-tools.txt','llms-blog.txt']:
    txt=(root/f).read_text(); bad=[]
    for u in set(re.findall(BASE+r'(/[^\s)\]"]*)',txt)):
        path=u.rstrip('/')
        if path not in routes and not path.startswith('/llms'): bad.append(u)
    if bad: F[f+'_broken_urls']=sorted(bad)
    dbl=[l[:80] for l in txt.splitlines() if re.search(r'mindgracencr\.in/https?:',l)]
    if dbl: F[f+'_double_scheme']=dbl
faq=json.load(open(root/'faq-schema.json')); qs=[q['name'] for q in faq['mainEntity']]
ft=(root/'src/pages/faq.astro').read_text()
F['faq_schema_vs_visible_missing']=[q for q in qs if q.lower()[:40] not in ft.lower()]
C['faq_questions']=len(qs)
out={'generated':str(datetime.date(2026,10,5)),'counts':dict(C),
 'nap':{'phones':dict(phones),'streets':dict(streets),'geos':dict(geos)},
 'findings':{k:v for k,v in F.items() if v}}
open(root/'.tmp/AUDIT_DATA_RERUN_2026-10-05.json','w').write(json.dumps(out,indent=1))
print('OK wrote .tmp/AUDIT_DATA_RERUN_2026-10-05.json')
