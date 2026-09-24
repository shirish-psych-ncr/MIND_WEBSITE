from pathlib import Path
import re,json
out=[]
for p in Path('.').rglob('*.html'):
 if 'output' in p.parts: continue
 s=p.read_text(errors='ignore')
 bm=re.search(r'<body[^>]*class=["\']([^"\']+)',s,re.I)
 out.append({'file':str(p),'body':bm.group(1) if bm else '', 'vh1':bool(re.search(r'<h1[^>]*class=["\'][^"\']*visually-hidden',s,re.I)), 'main':len(re.findall(r'<main\b',s,re.I))})
print(json.dumps([x for x in out if x['vh1'] or 'tool' in x['body']],indent=2))
