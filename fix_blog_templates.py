#!/usr/bin/env python3
"""Fix blog template head structure issues."""

import re
from pathlib import Path

WORKSPACE = Path('/workspace')

def fix_blog_head_structure(filepath):
    """Fix implicit head closure and stray </head> tags."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Remove stray </head> tags that appear after body content has started
    # This happens when there's a </head> at line 54 or similar
    content = re.sub(r'</head>', '', content)
    
    # Fix fetchpriority attribute syntax if malformed
    content = re.sub(r'fetchpriority\s*=\s*["\']?([^"\'>\s]+)["\']?', r'fetchpriority="\1"', content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# Fix blog templates
blog_files = [
    WORKSPACE / 'blog/adult.html',
    WORKSPACE / 'blog/children.html',
]

for bf in blog_files:
    if bf.exists():
        if fix_blog_head_structure(bf):
            print(f"✓ Fixed: {bf.relative_to(WORKSPACE)}")

print("Blog template fixes complete!")
