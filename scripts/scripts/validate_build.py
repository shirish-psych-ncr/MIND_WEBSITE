"""Validate the actual deploy artifact, including every local hyperlink and asset."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from collections import Counter
import json, re, sys
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.classes=Counter(); self.ids=[]; self.refs=[]; self.tags=Counter(); self.order=[]; self.canonical=[]; self.scripts=[]; self.in_json=False; self.buffer=''
        self.feed(path.read_text(encoding='utf-8'))
    def handle_starttag(self, tag, attrs):
        a=dict(attrs); self.tags[tag]+=1; self.order.append(tag); self.classes.update((a.get('class') or '').split())
        if a.get('id'): self.ids.append(a['id'])
        for key in ('href','src','poster','action'):
            if a.get(key): self.refs.append((tag,key,a[key]))
        if a.get('srcset'):
            for part in a['srcset'].split(','):
                if part.strip(): self.refs.append((tag,'src',part.strip().split()[0]))
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a.get('href',''))
        if tag=='script' and a.get('type')=='application/ld+json': self.in_json=True; self.buffer=''
    def handle_data(self,data):
        if self.in_json: self.buffer+=data
    def handle_endtag(self,tag):
        if tag=='script' and self.in_json: self.scripts.append(self.buffer); self.in_json=False

def main():
    manifest=json.loads((DIST/'route-manifest.json').read_text())
    routefiles={r:DIST/('index.html' if r=='/' else r.lstrip('/')+'.html') for r in manifest['routes']}
    pages={r:Page(p) for r,p in routefiles.items()}
    errors=[]; refs=0
    for source,target in manifest['aliases'].items():
        if target in manifest['aliases'] and manifest['aliases'][target]!=target: errors.append(f'redirect chain or cycle: {source} -> {target}')
        if target not in pages and not (DIST/(target.lstrip('/')+'.html')).is_file(): errors.append(f'redirect destination missing: {source} -> {target}')
    for hub in ('adult','child'):
        manifest_file=DIST/f'blog/pages/{hub}/manifest.json'
        if not manifest_file.is_file(): errors.append(f'missing blog manifest: {hub}'); continue
        data=json.loads(manifest_file.read_text())
        for item in data.get('files',[]):
            target=item if item.startswith('/') else f'/blog/pages/{hub}/{item}'
            if target not in pages: errors.append(f'blog manifest destination missing: {target}')
    dynamic={'mobile-nav-panel','accessibility-panel'}
    for route,p in pages.items():
        for cls in ('emergency-banner','site-header','site-footer'):
            if p.classes[cls]!=1: errors.append(f'{route}: expected one {cls}, found {p.classes[cls]}')
        for tag in ('main','h1','footer'):
            if p.tags[tag]!=1: errors.append(f'{route}: expected one {tag}, found {p.tags[tag]}')
        if p.tags['main'] and p.tags['footer'] and p.order.index('footer')<p.order.index('main'): errors.append(f'{route}: footer precedes main')
        if len(p.canonical)!=1 or not p.canonical[0].startswith('https://mindgracencr.in/'): errors.append(f'{route}: invalid canonical {p.canonical}')
        for id,count in Counter(p.ids).items():
            if count>1: errors.append(f'{route}: duplicate id {id}')
        for script in p.scripts:
            try: json.loads(script)
            except ValueError as e: errors.append(f'{route}: invalid JSON-LD: {e}')
        for tag,attr,ref in p.refs:
            u=urlsplit(ref)
            if u.scheme not in ('','http','https') or u.netloc not in ('','mindgracencr.in','www.mindgracencr.in'): continue
            if not u.path: dest=route
            elif u.path.startswith('/'): dest=unquote(u.path)
            else:
                from urllib.parse import urljoin
                dest=urlsplit(urljoin('https://mindgracencr.in'+route,ref)).path
            refs+=1
            resolved=manifest['aliases'].get(dest,dest)
            f=DIST/resolved.lstrip('/')
            if resolved not in pages and not f.is_file(): errors.append(f'{route}: missing {attr} {ref}')
            elif u.fragment and resolved in pages and unquote(u.fragment) not in pages[resolved].ids and u.fragment not in dynamic: errors.append(f'{route}: missing anchor {ref}')
            if attr=='href' and dest in manifest['aliases'] and dest!=resolved: errors.append(f'{route}: noncanonical link {ref}')
    result={'routes':len(pages),'references':refs,'errors':sorted(set(errors))}
    (ROOT/'output').mkdir(exist_ok=True)
    (ROOT/'output/build-validation.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
    print(f"Validated {len(pages)} routes and {refs} local references; {len(result['errors'])} failures.")
    for e in result['errors'][:90]: print(e)
    return bool(errors)
if __name__=='__main__': sys.exit(main())
