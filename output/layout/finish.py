from pathlib import Path
p=Path('index.html');s=p.read_text(encoding='utf-8');s=s.replace('class="container" style="margin-top: -2rem; position: relative; z-index: 10; margin-bottom: 4rem;"','class="container home-quick-actions"');p.write_text(s,encoding='utf-8')
