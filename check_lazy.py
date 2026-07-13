#!/usr/bin/env python3
from pathlib import Path
import re

all_html = list(Path('/workspace').rglob('*.html'))
missing = []

for html_file in all_html:
    content = html_file.read_text()
    imgs = re.findall(r'<img[^>]*>', content)
    
    for img in imgs:
        if 'loading=' not in img:
            missing.append((str(html_file.relative_to('/workspace')), img))

if missing:
    print(f"Found {len(missing)} images without loading attribute:")
    for path, img in missing[:20]:
        print(f"\n{path}:")
        print(f"  {img}")
    if len(missing) > 20:
        print(f"\n... and {len(missing) - 20} more")
else:
    print("✓ All images have loading attributes!")
