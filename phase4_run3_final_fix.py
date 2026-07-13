#!/usr/bin/env python3
"""PHASE 4 Run 3 - Final Fix for inline scripts without src"""
import os
import re
from pathlib import Path

root = Path('/workspace')
html_files = sorted(root.glob('*.html'))

print("=" * 70)
print("PHASE 4 RUN 3 - FINAL FIX: INLINE SCRIPTS")
print("=" * 70)

# Find files with inline scripts that should be deferred
for f in html_files:
    content = f.read_text()
    
    # Look for inline scripts (no src attribute) that aren't JSON-LD
    inline_scripts = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
    
    needs_module = False
    for script_content in inline_scripts:
        # Skip empty scripts or JSON-LD
        if not script_content.strip() or 'application/ld+json' in content:
            continue
        
        # Check if it's DOM manipulation that should wait
        if any(kw in script_content for kw in ['querySelector', 'getElementById', 'addEventListener', 'document.', 'window.']):
            needs_module = True
            break
    
    if needs_module and 'type="module"' not in content:
        # Convert inline script to module type
        new_content = content.replace('<script>', '<script type="module">')
        if new_content != content:
            f.write_text(new_content)
            print(f"   ✓ {f.name}: converted inline script to module")

print("\n" + "=" * 70)
print("FINAL FIX COMPLETE")
print("=" * 70)
