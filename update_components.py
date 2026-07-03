#!/usr/bin/env python3
"""
Component Updater Script
1. Extract header, navigation (mobile overlay + panel), and footer from index.html
2. For all other HTML files: remove old header/nav/footer and inject new components
"""

import re
from pathlib import Path

# Read index.html to extract components
with open('/workspace/index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract HEADER component (lines 105-141 approximately)
header_match = re.search(r'(<header class="site-header".*?</header>)', index_content, re.DOTALL)
if not header_match:
    print("ERROR: Could not find header in index.html")
    exit(1)
header_component = header_match.group(1)

# Extract MOBILE NAV OVERLAY + PANEL (lines 144-195 approximately)
nav_match = re.search(r'(<!-- MOBILE NAV OVERLAY -->\s*<div class="mobile-nav-overlay".*?</nav>)', index_content, re.DOTALL)
if not nav_match:
    print("ERROR: Could not find mobile nav in index.html")
    exit(1)
nav_component = nav_match.group(1)

# Extract FOOTER component
footer_match = re.search(r'(<footer class="site-footer".*?</footer>)', index_content, re.DOTALL)
if not footer_match:
    print("ERROR: Could not find footer in index.html")
    exit(1)
footer_component = footer_match.group(1)

print(f"Extracted components from index.html:")
print(f"  - Header: {len(header_component)} chars")
print(f"  - Navigation: {len(nav_component)} chars")
print(f"  - Footer: {len(footer_component)} chars")

# Find all HTML files except index.html
html_files = list(Path('/workspace').rglob('*.html'))
html_files = [f for f in html_files if f.name != 'index.html' and 'node_modules' not in str(f)]

print(f"\nProcessing {len(html_files)} HTML files...")

# Patterns to detect and remove old header/nav/footer
header_pattern = re.compile(r'<header.*?</header>', re.DOTALL | re.IGNORECASE)
nav_pattern = re.compile(r'<nav.*?</nav>', re.DOTALL | re.IGNORECASE)
footer_pattern = re.compile(r'<footer.*?</footer>', re.DOTALL | re.IGNORECASE)
mobile_nav_overlay_pattern = re.compile(r'<div class="mobile-nav-overlay".*?</div>', re.DOTALL)

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Remove old header
    content = header_pattern.sub('', content)
    
    # Remove old nav elements (both desktop and mobile)
    content = nav_pattern.sub('', content)
    
    # Remove mobile nav overlay if it exists separately
    content = mobile_nav_overlay_pattern.sub('', content)
    
    # Remove old footer
    content = footer_pattern.sub('', content)
    
    # Clean up multiple blank lines that may result from removal
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
    
    # Find position after <body> tag (and skip link if present) for header insertion
    body_match = re.search(r'<body[^>]*>', content)
    if body_match:
        insert_pos = body_match.end()
        # Check for skip link
        skip_link_match = re.search(r'<a href="#main-content" class="skip-link".*?</a>', content)
        if skip_link_match and skip_link_match.start() > insert_pos:
            insert_pos = skip_link_match.end()
        content = content[:insert_pos] + '\n' + header_component + '\n' + nav_component + content[insert_pos:]
    
    # Find position before </body> for footer insertion
    body_close_match = re.search(r'</body>', content)
    if body_close_match:
        insert_pos = body_close_match.start()
        content = content[:insert_pos] + '\n' + footer_component + '\n' + content[insert_pos:]
    
    # Only write if content changed
    if content != original_content:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Updated: {html_file.name}")
    else:
        print(f"  - No changes needed: {html_file.name}")

print("\n✓ Component update complete!")
