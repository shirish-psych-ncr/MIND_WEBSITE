#!/usr/bin/env python3
"""
Fix internal links in Astro files to remove .html extensions.
Converts ./page.html -> /page format for Astro routing.
"""

import os
import re
from pathlib import Path

def fix_html_links(content):
    """Replace .html links with clean Astro routes."""
    # Pattern to match href="./something.html" or href="something.html"
    # Replace with href="/something"
    
    # Fix relative links like "./about.html" -> "/about"
    content = re.sub(r'href=["\']\.?/?([^"\']+?)\.html["\']', r'href="/\1"', content)
    
    # Fix any remaining absolute-style links like "about.html" -> "/about"
    # But be careful not to double-process
    
    return content

def fix_all_astro_files():
    """Fix links in all Astro page files."""
    pages_dir = Path('src/pages')
    
    astro_files = list(pages_dir.glob('*.astro'))
    
    print(f"Processing {len(astro_files)} Astro files...")
    
    for astro_file in astro_files:
        try:
            with open(astro_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix the links
            fixed_content = fix_html_links(content)
            
            if content != fixed_content:
                with open(astro_file, 'w', encoding='utf-8') as f:
                    f.write(fixed_content)
                print(f"Fixed links in: {astro_file.name}")
            else:
                print(f"No changes needed: {astro_file.name}")
        
        except Exception as e:
            print(f"Error processing {astro_file.name}: {e}")
    
    print("\nLink fixing complete!")

if __name__ == '__main__':
    fix_all_astro_files()
