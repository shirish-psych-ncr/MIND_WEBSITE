from pathlib import Path
import re

ROOT = Path('.')
for path in ROOT.rglob('*.html'):
    if any(part in {'output', '.git', 'node_modules'} for part in path.parts):
        continue
    text = path.read_text(encoding='utf-8', errors='ignore')
    # The first hero image is part of the page meaning and should not be deferred.
    main = re.search(r'(<main\b[\s\S]*?</main>)', text, re.I)
    if not main:
        continue
    section = main.group(1)
    image = re.search(r'<img\b(?=[^>]*\b(?:hero|portrait|cover)[^>]*\b)([^>]*?)\sloading=["\']lazy["\']([^>]*)>', section, re.I)
    if image:
        replacement = '<img' + image.group(1) + 'loading="eager" fetchpriority="high"' + image.group(2) + '>'
        section = section[:image.start()] + replacement + section[image.end():]
        text = text[:main.start()] + section + text[main.end():]
        path.write_text(text, encoding='utf-8', newline='\n')
