"""Keep the shared presentation assets and zoom policy consistent on every route."""
from pathlib import Path
import re
import json

ROOT = Path(__file__).resolve().parents[1]
VERSION = 'responsive18'
THEME = '''<script data-theme-init>try{const t=localStorage.getItem('mindgrace-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch{document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}</script>'''

def shell_markup():
    source = (ROOT / 'assets/js/visitor-friendly.js').read_text(encoding='utf-8')
    navigation = json.loads(re.search(r'const navigation = (\[.*?\]);', source, re.S)[1])
    links = ''.join(f'<li><a href="{href}">{label}</a></li>' for label, href in navigation)
    header = re.search(r'header.innerHTML = `(.*?)`;', source, re.S)[1].replace('${linkMarkup()}', links)
    footer = re.search(r'footer.innerHTML = `(.*?)`;', source, re.S)[1].replace('<span id="year"></span>', '<span id="year">2026</span>')
    notice = re.search(r'notice.innerHTML = `(.*?)`;', source, re.S)[1]
    return ('<aside class="emergency-banner emergency-banner--static" role="note" aria-labelledby="emergency-notice-title">'+notice+'</aside>\n<a class="skip-link" href="#main-content">Skip to main content</a>\n<header class="site-header" data-shared-shell>'+header+'</header>', '<footer class="site-footer" data-shared-shell>'+footer+'</footer>')

def normalize(path):
    text = path.read_text(encoding='utf-8')
    # Encoding must be declared before scripts and within the first 1024 bytes.
    text = re.sub(r'<meta\s+charset=[^>]+>\s*', '', text, flags=re.I)
    text = re.sub(r'<meta\s+name=["\']viewport["\'][^>]*>', '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">', text, flags=re.I)
    text = re.sub(r'<meta\s+name=["\']color-scheme["\'][^>]*>', '', text, flags=re.I)
    text = re.sub(r'<script data-theme-init>.*?</script>\s*', '', text, flags=re.S)
    text = re.sub(r'<head>', '<head>\n<meta charset="UTF-8">\n<meta name="color-scheme" content="light dark">\n'+THEME, text, count=1, flags=re.I)
    if 'name="theme-color"' not in text:
        text = text.replace('</head>', '<meta name="theme-color" content="#fffaf9">\n</head>')
    text = re.sub(r'<link\b[^>]*href=["\'][^"\']*site-foundation(?:\.min)?\.css[^"\']*["\'][^>]*>\s*', '', text)
    text = re.sub(r'<script\b[^>]*src=["\'][^"\']*visitor-friendly(?:\.min)?\.js[^"\']*["\'][^>]*>\s*</script>\s*', '', text)
    text = text.replace(THEME, THEME+f'\n<script src="/assets/js/min/visitor-friendly.min.js?v={VERSION}" defer></script>')
    assets = f'<link rel="stylesheet" href="/assets/css/min/site-foundation.min.css?v={VERSION}" data-mindgrace-final-foundation>\n'
    text = text.replace('</head>', assets+'</head>')
    if path.name == 'offline.html':
        text = text.replace('<body>', '<body class="offline-page">')
    header, footer = shell_markup()
    # Replace only site-level chrome; preserve semantic article headers.
    main_start = text.find('<main')
    main_end = text.rfind('</main>')
    def remove_header(match):
        return '' if main_start < 0 or match.start() < main_start or any(marker in match[0].split('>')[0] for marker in ('masthead','data-shared-shell')) else match[0]
    text = re.sub(r'<header\b[^>]*>.*?</header>', remove_header, text, flags=re.S)
    text = re.sub(r'<footer\b[^>]*>.*?</footer>', '', text, flags=re.S)
    text = re.sub(r'<aside\b[^>]*class="[^"]*emergency-banner--static[^"]*"[^>]*>.*?</aside>\s*', '', text, flags=re.S)
    text = re.sub(r'<a\b[^>]*class="skip-link"[^>]*>.*?</a>\s*', '', text, flags=re.S)
    text = re.sub(r'(<body\b[^>]*)(>)', lambda m: m[1].replace(' data-chrome-normalized="true"','')+' data-chrome-normalized="true">\n'+header, text, count=1)
    text = text.replace('</body>', footer+'\n</body>')
    path.write_text(text, encoding='utf-8', newline='\n')

if __name__ == '__main__':
    paths = [p for p in ROOT.rglob('*.html') if not any(x in p.relative_to(ROOT).parts for x in ('output', 'node_modules', '.git'))]
    for path in paths:
        normalize(path)
    print(f'Normalized {len(paths)} HTML routes')
