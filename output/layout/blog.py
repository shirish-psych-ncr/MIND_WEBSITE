from pathlib import Path
import re
for p in Path('blog').rglob('*.html'):
 s=p.read_text(encoding='utf-8');t=re.sub(r'(assets/css/classic-blog\.css)(?:\?[^"\s<>]*)?',r'\1?v=quiet2',s)
 if t!=s:p.write_text(t,encoding='utf-8')
