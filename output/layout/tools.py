from pathlib import Path
p=Path('assets/js/visitor-friendly.js');s=p.read_text(encoding='utf-8').replace('tools-shell.css?v=toolview6','tools-shell.css?v=quiet7');p.write_text(s,encoding='utf-8')
for p in Path('tools').glob('*.html'):
 s=p.read_text(encoding='utf-8').replace('tools-shell.css?v=toolview6','tools-shell.css?v=quiet7');p.write_text(s,encoding='utf-8')
