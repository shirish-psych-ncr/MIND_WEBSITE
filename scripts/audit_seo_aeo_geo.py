from pathlib import Path
from html.parser import HTMLParser
import re,json
root=Path('.')
rows=[]
def schema_nodes(value):
    if isinstance(value, dict):
        yield value
        for child in value.get('@graph', []): yield from schema_nodes(child)
    elif isinstance(value, list):
        for child in value: yield from schema_nodes(child)
for p in root.rglob('*.html'):
 if any(x in p.parts for x in ['output','.git','node_modules']): continue
 s=p.read_text(encoding='utf-8',errors='ignore')
 noindex=bool(re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\'][^"\']*noindex',s,re.I))
 title=re.search(r'<title[^>]*>(.*?)</title>',s,re.S|re.I)
 desc=re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)',s,re.I)
 canon=re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']*)',s,re.I)
 h1=len(re.findall(r'<h1\b',s,re.I));
 schemas=[]
 for block in re.findall(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>',s,re.S|re.I):
  try:
   d=json.loads(block); schemas.extend(schema_nodes(d))
  except: pass
 types={str(x.get('@type')) for x in schemas if isinstance(x,dict)}
 rows.append({'file':str(p).replace('\\','/'),'noindex':noindex,'title':bool(title and title.group(1).strip()),'description':bool(desc and desc.group(1).strip()),'canonical':bool(canon),'h1':h1,'schema':sorted(types),'geo':any('geo' in x or 'areaServed' in x for x in schemas if isinstance(x,dict)),'answer':bool(re.search(r'class=["\'][^"\']*(?:seo-answer|blog-answer|direct-answer)',s,re.I))})
indexable=[r for r in rows if not r['noindex']]
print(json.dumps({'pages':len(rows),'indexablePages':len(indexable),'utilityNoindex':[r['file'] for r in rows if r['noindex']],'missingTitle':[r['file'] for r in indexable if not r['title']],'missingDescription':[r['file'] for r in indexable if not r['description']],'missingCanonical':[r['file'] for r in indexable if not r['canonical']],'badH1':[r['file'] for r in indexable if r['h1']!=1],'missingGeoSchema':[r['file'] for r in indexable if not r['geo']],'missingAnswerBlock':[r['file'] for r in indexable if not r['answer']]},indent=2))
