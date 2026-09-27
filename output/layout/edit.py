from pathlib import Path
p=Path('assets/js/visitor-friendly.js')
s=p.read_text(encoding='utf-8')
s=s.replace('<strong id="emergency-notice-title">Emergency notice</strong><span>Mind Grace does not provide emergency or crisis services.</span><a href="/emergency.html">See emergency resources</a><span>If there is immediate danger, call <a href="tel:112">112</a> or go to the nearest hospital emergency department.</span>', '<span id="emergency-notice-title">Not an emergency service.</span><span>Immediate danger? Call <a href="tel:112">112</a>.</span><a href="/emergency.html">Emergency resources</a>')
s=s.replace('const breadcrumbs = main.querySelector(".breadcrumbs");\n    if (breadcrumbs) breadcrumbs.after(panel); else main.prepend(panel);','// Related guidance belongs after the content the visitor came to read.\n    main.appendChild(panel);')
s=s.replace('site-foundation.css?v=chrome16','site-foundation.css?v=quiet17')
p.write_text(s,encoding='utf-8')
# Refresh the shared assets across all static entry points, including nested routes.
for p in Path('.').rglob('*.html'):
 if any(x in p.parts for x in ['.git','node_modules','output']): continue
 s=p.read_text(encoding='utf-8')
 import re
 t=re.sub(r'(assets/js/visitor-friendly\.js)(?:\?[^"\s<>]*)?',r'\1?v=quiet17',s)
 t=re.sub(r'(assets/css/site-foundation\.css)(?:\?[^"\s<>]*)?',r'\1?v=quiet17',t)
 if s!=t:p.write_text(t,encoding='utf-8')
