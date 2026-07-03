#!/usr/bin/env python3
"""
Script 1: Remove header, nav, and footer from all HTML files except index.html
and replace with coherent placeholders.
"""

import os
import re
from pathlib import Path

# Configuration
WORKSPACE = Path('/workspace')
EXCLUDE_FILES = ['index.html']
COMPONENTS_DIR = WORKSPACE / 'components'

# Placeholder strings
HEADER_PLACEHOLDER = "<!-- [HEADER_COMPONENT_WILL_BE_INSERTED_HERE] -->"
NAV_PLACEHOLDER = "<!-- [NAVIGATION_COMPONENT_WILL_BE_INSERTED_HERE] -->"
FOOTER_PLACEHOLDER = "<!-- [FOOTER_COMPONENT_WILL_BE_INSERTED_HERE] -->"

def remove_header_nav_footer(html_content):
    """Remove header, nav, and footer blocks from HTML content."""
    
    # Pattern to match header tags (including class="site-header")
    header_pattern = r'<header[^>]*>.*?</header>'
    
    # Pattern to match desktop nav
    desktop_nav_pattern = r'<nav class="desktop-nav"[^>]*>.*?</nav>'
    
    # Pattern to match mobile nav overlay and panel
    mobile_nav_overlay_pattern = r'<div class="mobile-nav-overlay"[^>]*></div>'
    mobile_nav_panel_pattern = r'<nav class="mobile-nav-panel"[^>]*>.*?</nav>'
    
    # Pattern to match footer
    footer_pattern = r'<footer[^>]*>.*?</footer>'
    
    # Pattern to match year update script
    year_script_pattern = r'<!-- Year Update Script -->\s*<script>.*?</script>'
    
    # Remove all patterns (case-insensitive, dotall for multiline)
    content = html_content
    content = re.sub(header_pattern, '', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(desktop_nav_pattern, '', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(mobile_nav_overlay_pattern, '', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(mobile_nav_panel_pattern, '', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(footer_pattern, '', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(year_script_pattern, '', content, flags=re.IGNORECASE | re.DOTALL)
    
    return content

def insert_placeholders(html_content):
    """Insert placeholders after body tag and before closing body tag."""
    
    # Insert HEADER placeholder after <body> (preserving skip link if present)
    # Look for </a> that closes skip link, or just after <body>
    body_open_pattern = r'(<body[^>]*>)'
    skip_link_pattern = r'(<a href="#main-content" class="skip-link"[^>]*>.*?</a>)'
    
    content = html_content
    
    # Check if skip link exists
    skip_match = re.search(skip_link_pattern, content, re.IGNORECASE | re.DOTALL)
    if skip_match:
        # Insert header placeholder after skip link
        insert_pos = skip_match.end()
        content = content[:insert_pos] + '\n' + HEADER_PLACEHOLDER + '\n' + content[insert_pos:]
    else:
        # Insert header placeholder after <body>
        content = re.sub(body_open_pattern, r'\1\n' + HEADER_PLACEHOLDER, content, flags=re.IGNORECASE)
    
    # Insert NAV placeholder after HEADER placeholder
    content = content.replace(HEADER_PLACEHOLDER, HEADER_PLACEHOLDER + '\n' + NAV_PLACEHOLDER)
    
    # Insert FOOTER placeholder before </body>
    content = re.sub(r'(</body>)', FOOTER_PLACEHOLDER + '\n\\1', content, flags=re.IGNORECASE)
    
    return content

def process_file(filepath):
    """Process a single HTML file."""
    print(f"Processing: {filepath.name}")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_length = len(content)
        
        # Remove header, nav, footer
        content = remove_header_nav_footer(content)
        
        # Insert placeholders
        content = insert_placeholders(content)
        
        new_length = len(content)
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  ✓ Removed {original_length - new_length} chars, inserted placeholders")
        return True
        
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def main():
    print("=" * 60)
    print("STEP 1: Remove Header/Nav/Footer and Add Placeholders")
    print("=" * 60)
    
    # Find all HTML files in workspace root
    html_files = list(WORKSPACE.glob('*.html'))
    
    # Exclude index.html and component files
    html_files = [f for f in html_files if f.name not in EXCLUDE_FILES]
    
    print(f"\nFound {len(html_files)} HTML files to process (excluding index.html)\n")
    
    success_count = 0
    for filepath in sorted(html_files):
        if process_file(filepath):
            success_count += 1
    
    print("\n" + "=" * 60)
    print(f"COMPLETE: {success_count}/{len(html_files)} files processed successfully")
    print("=" * 60)

if __name__ == '__main__':
    main()
