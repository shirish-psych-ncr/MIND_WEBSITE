#!/usr/bin/env python3
"""Fix blog HTML files with header, nav, and footer"""

import re
from pathlib import Path

# Read components
with open('/workspace/components/header.html', 'r', encoding='utf-8') as f:
    header_component = f.read()

with open('/workspace/components/navigation.html', 'r', encoding='utf-8') as f:
    nav_component = f.read()

with open('/workspace/components/footer.html', 'r', encoding='utf-8') as f:
    footer_component = f.read()

blog_files = list(Path('/workspace/blog').glob('*.html'))

fixed_count = 0
for html_file in blog_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Remove old header/nav/footer if present
    content = re.sub(r'<header.*?</header>', '', content, flags=re.DOTALL)
    content = re.sub(r'<nav.*?</nav>', '', content, flags=re.DOTALL)
    content = re.sub(r'<footer.*?</footer>', '', content, flags=re.DOTALL)
    content = re.sub(r'<div class="mobile-nav-overlay".*?</div>', '', content, flags=re.DOTALL)
    
    # Clean up multiple blank lines
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
    
    # Insert header after <body>
    body_match = re.search(r'<body[^>]*>', content)
    if body_match:
        insert_pos = body_match.end()
        content = content[:insert_pos] + '\n' + header_component + '\n' + nav_component + content[insert_pos:]
    
    # Insert footer before </body>
    body_close_match = re.search(r'</body>', content)
    if body_close_match:
        insert_pos = body_close_match.start()
        content = content[:insert_pos] + '\n' + footer_component + '\n' + content[insert_pos:]
    
    if content != original:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        fixed_count += 1
        print(f"✓ Fixed: {html_file.name}")

print(f"\n✓ Blog fix complete! Fixed {fixed_count} files.")
