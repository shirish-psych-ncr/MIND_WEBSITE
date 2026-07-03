#!/usr/bin/env python3
"""Re-insert footer component where missing"""

import re
from pathlib import Path

# Read footer component
with open('/workspace/components/footer.html', 'r', encoding='utf-8') as f:
    footer_component = f.read()

html_files = list(Path('/workspace').rglob('*.html'))
html_files = [f for f in html_files if f.name not in ['index.html', 'footer.html', 'header.html', 'navigation.html'] and 'node_modules' not in str(f)]

fixed_count = 0
for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if footer already exists
    if '<footer class="site-footer"' in content:
        continue
    
    # Find position before </body>
    body_close_match = re.search(r'</body>', content)
    if body_close_match:
        insert_pos = body_close_match.start()
        # Insert footer
        content = content[:insert_pos] + '\n' + footer_component + '\n' + content[insert_pos:]
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        fixed_count += 1
        print(f"✓ Added footer: {html_file.name}")

print(f"\n✓ Footer fix complete! Added to {fixed_count} files.")
