#!/usr/bin/env python3
"""Remove leftover component comment blocks from HTML files"""

import re
from pathlib import Path

# Pattern to match the leftover comment blocks
comment_pattern = re.compile(r'<!--\s*HEADER COMPONENT.*?-->\s*\n\s*<!--\s*NAVIGATION COMPONENT.*?-->\s*\n\s*<!--\s*FOOTER COMPONENT.*?-->', re.DOTALL)

html_files = list(Path('/workspace').rglob('*.html'))
html_files = [f for f in html_files if f.name != 'index.html' and 'node_modules' not in str(f)]

cleaned_count = 0
for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    # Remove the comment blocks
    content = comment_pattern.sub('', content)
    
    # Also remove individual leftover comments if they exist separately
    content = re.sub(r'<!--\s*HEADER COMPONENT.*?-->', '', content, flags=re.DOTALL)
    content = re.sub(r'<!--\s*NAVIGATION COMPONENT.*?-->', '', content, flags=re.DOTALL)
    content = re.sub(r'<!--\s*FOOTER COMPONENT.*?-->', '', content, flags=re.DOTALL)
    
    # Clean up multiple blank lines
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
    
    if content != original:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        cleaned_count += 1
        print(f"✓ Cleaned: {html_file.name}")

print(f"\n✓ Cleanup complete! Removed comment blocks from {cleaned_count} files.")
