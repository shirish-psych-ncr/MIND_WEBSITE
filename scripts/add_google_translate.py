#!/usr/bin/env python3
"""Add Google Translate (Hindi-default button + language dropdown) to every page header.

Injects, right before </nav> in each HTML page:
  - a "हिंदी" button that instantly translates the page to Hindi
  - a "Translate" button that opens a dropdown of languages (Google Translate engine)
Idempotent: skips files already containing translate-widget.js.
"""
import sys
from pathlib import Path

BLOCK = '''    <div class="mg-translate" id="mg-translate">
      <button type="button" class="mg-translate-hindi" id="mg-translate-hindi" lang="hi" title="इस पेज को हिंदी में पढ़ें" aria-label="Translate this page to Hindi">अ हि</button>
      <button type="button" class="mg-translate-btn" id="mg-translate-open" aria-haspopup="listbox" aria-expanded="false" aria-controls="mg-translate-menu" title="Choose a language">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
        <span class="mg-translate-label">Translate</span>
      </button>
      <div class="mg-translate-menu" id="mg-translate-menu" role="listbox" tabindex="-1" aria-label="Translation languages"></div>
    </div>
'''

def main():
    root = Path('.')
    changed, skipped, no_nav = [], [], []
    for html in sorted(root.rglob('*.html')):
        text = html.read_text(encoding='utf-8')
        if 'translate-widget.js' in text:
            skipped.append(str(html)); continue
        # insert before the first closing </nav> tag
        idx = text.find('</nav>')
        if idx == -1:
            no_nav.append(str(html)); continue
        # find start of the line containing </nav> to preserve indentation
        line_start = text.rfind('\n', 0, idx) + 1
        indent = text[line_start:idx]
        block = BLOCK.replace('    ', indent, 1) if indent.strip() == '' else BLOCK
        # re-indent whole block to match nav's closing indentation
        lines = BLOCK.rstrip('\n').split('\n')
        block = '\n'.join((indent + l[4:] if l.startswith('    ') else indent + l) for l in lines) + '\n\n'
        new = text[:line_start] + block + text[line_start:]
        html.write_text(new, encoding='utf-8')
        changed.append(str(html))
    print(f'changed={len(changed)} skipped(existing)={len(skipped)} no-nav={len(no_nav)}')
    if no_nav: print('NO NAV:', *no_nav, sep='\n  ')
    return 0

if __name__ == '__main__':
    sys.exit(main())
