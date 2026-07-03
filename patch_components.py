#!/usr/bin/env python3
"""
Script 2: Patch header, nav, and footer components into all HTML files
by replacing the placeholders created by cleanup_nav.py
"""

import os
from pathlib import Path

# Configuration
WORKSPACE = Path('/workspace')
COMPONENTS_DIR = WORKSPACE / 'components'
EXCLUDE_FILES = ['index.html']

# Placeholder strings (must match cleanup_nav.py)
HEADER_PLACEHOLDER = "<!-- [HEADER_COMPONENT_WILL_BE_INSERTED_HERE] -->"
NAV_PLACEHOLDER = "<!-- [NAVIGATION_COMPONENT_WILL_BE_INSERTED_HERE] -->"
FOOTER_PLACEHOLDER = "<!-- [FOOTER_COMPONENT_WILL_BE_INSERTED_HERE] -->"

def load_component(filename):
    """Load component content from file."""
    filepath = COMPONENTS_DIR / filename
    if not filepath.exists():
        raise FileNotFoundError(f"Component file not found: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read().strip()

def patch_file(filepath, header_content, nav_content, footer_content):
    """Patch a single HTML file with components."""
    print(f"Patching: {filepath.name}")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_length = len(content)
        
        # Replace placeholders with actual components
        # Order matters: NAV placeholder comes after HEADER placeholder in the file
        content = content.replace(HEADER_PLACEHOLDER, header_content)
        content = content.replace(NAV_PLACEHOLDER, nav_content)
        content = content.replace(FOOTER_PLACEHOLDER, footer_content)
        
        new_length = len(content)
        
        # Verify replacements happened
        if HEADER_PLACEHOLDER in content:
            print(f"  ✗ Warning: Header placeholder still present!")
            return False
        if NAV_PLACEHOLDER in content:
            print(f"  ✗ Warning: Nav placeholder still present!")
            return False
        if FOOTER_PLACEHOLDER in content:
            print(f"  ✗ Warning: Footer placeholder still present!")
            return False
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        added_chars = new_length - original_length
        print(f"  ✓ Added {added_chars} chars of component content")
        return True
        
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def main():
    print("=" * 60)
    print("STEP 2: Patch Components into HTML Files")
    print("=" * 60)
    
    # Load component files
    print("\nLoading components...")
    try:
        header_content = load_component('header.html')
        print(f"  ✓ Loaded header.html ({len(header_content)} chars)")
        
        nav_content = load_component('navigation.html')
        print(f"  ✓ Loaded navigation.html ({len(nav_content)} chars)")
        
        footer_content = load_component('footer.html')
        print(f"  ✓ Loaded footer.html ({len(footer_content)} chars)")
    except FileNotFoundError as e:
        print(f"\n✗ ERROR: {e}")
        print("Please run Step 1 first to create component files.")
        return
    
    # Find all HTML files in workspace root
    html_files = list(WORKSPACE.glob('*.html'))
    
    # Exclude index.html
    html_files = [f for f in html_files if f.name not in EXCLUDE_FILES]
    
    # Filter to only files that have placeholders
    files_to_patch = []
    for f in html_files:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            if HEADER_PLACEHOLDER in content:
                files_to_patch.append(f)
    
    print(f"\nFound {len(files_to_patch)} HTML files with placeholders to patch\n")
    
    success_count = 0
    for filepath in sorted(files_to_patch):
        if patch_file(filepath, header_content, nav_content, footer_content):
            success_count += 1
    
    print("\n" + "=" * 60)
    print(f"COMPLETE: {success_count}/{len(files_to_patch)} files patched successfully")
    print("=" * 60)

if __name__ == '__main__':
    main()
