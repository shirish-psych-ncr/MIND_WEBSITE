#!/usr/bin/env python3
"""
Migration script to convert HTML files to Astro pages.
Extracts content between <main> tags and wraps in BaseLayout.
"""

import os
import re
from pathlib import Path

def extract_main_content(html_content):
    """Extract content between <main> and </main> tags."""
    # Match <main ...>...</main> with any attributes
    pattern = r'<main[^>]*>(.*?)</main>'
    match = re.search(pattern, html_content, re.DOTALL | re.IGNORECASE)
    
    if match:
        return match.group(1).strip()
    return None

def create_astro_file(main_content):
    """Create Astro file content with BaseLayout."""
    return f"""---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout>
{main_content}
</BaseLayout>
"""

def migrate_html_files():
    """Migrate all HTML files (except index.html) to Astro pages."""
    root_dir = Path('.')
    pages_dir = Path('src/pages')
    
    # Ensure src/pages directory exists
    pages_dir.mkdir(parents=True, exist_ok=True)
    
    # Find all HTML files except index.html
    html_files = [f for f in root_dir.glob('*.html') if f.name != 'index.html']
    
    print(f"Found {len(html_files)} HTML files to migrate")
    
    for html_file in html_files:
        try:
            # Read HTML content
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract main content
            main_content = extract_main_content(content)
            
            if main_content:
                # Create Astro file
                astro_content = create_astro_file(main_content)
                astro_filename = html_file.stem + '.astro'
                astro_path = pages_dir / astro_filename
                
                # Write Astro file
                with open(astro_path, 'w', encoding='utf-8') as f:
                    f.write(astro_content)
                
                print(f"Migrated: {html_file.name} -> src/pages/{astro_filename}")
            else:
                print(f"Warning: Could not find <main> tag in {html_file.name}. Skipping.")
        
        except Exception as e:
            print(f"Error processing {html_file.name}: {e}")
    
    print("\nMigration complete!")

if __name__ == '__main__':
    migrate_html_files()
