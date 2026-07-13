#!/usr/bin/env python3
"""
PHASE 4 Run 3 Fix: Remove duplicate schema blocks from blog files
Keep only the first BlogPosting schema we added, remove old Article schemas
"""

import re
from pathlib import Path

def clean_blog_file(filepath):
    """Remove duplicate schema blocks, keeping only the first one"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all schema script tags
    schema_pattern = r'<script type="application/ld\+json">[\s\S]*?</script>'
    matches = list(re.finditer(schema_pattern, content))
    
    if len(matches) <= 1:
        print(f"✓ {filepath}: Only 1 schema block (OK)")
        return False
    
    print(f"⚠ {filepath}: Found {len(matches)} schema blocks")
    
    # Keep only the first schema block (the BlogPosting we just added)
    # Remove all subsequent schema blocks
    new_content = content
    
    # Remove schema blocks from position 2 onwards (in reverse order to preserve indices)
    for match in reversed(matches[1:]):
        # Check if this is an old Article schema (not our new BlogPosting)
        schema_text = match.group(0)
        if '"@type": "Article"' in schema_text or '"@graph"' in schema_text:
            # Remove this duplicate block
            new_content = new_content[:match.start()] + new_content[match.end():]
            print(f"  → Removed duplicate Article schema at position {match.start()}")
    
    # Write cleaned content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

def main():
    base_dir = Path('/workspace')
    blog_dirs = [
        base_dir / 'blog' / 'pages' / 'adult',
        base_dir / 'blog' / 'pages' / 'child'
    ]
    
    cleaned_count = 0
    
    for blog_dir in blog_dirs:
        if not blog_dir.exists():
            continue
        
        html_files = list(blog_dir.glob('*.html'))
        
        for html_file in html_files:
            try:
                if clean_blog_file(html_file):
                    cleaned_count += 1
            except Exception as e:
                print(f"✗ Error cleaning {html_file}: {e}")
    
    print(f"\n{'='*60}")
    print(f"Cleaned {cleaned_count} files with duplicate schemas")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
