#!/usr/bin/env python3
"""
Script to clean up relative paths in HTML and Astro files.
Converts relative paths to root-relative paths for GitHub Pages static hosting.
- Removes './' prefixes
- Resolves '../' by navigating to root
- Converts bare filenames like 'index.html' to '/index.html'
- Converts paths like 'public/styles/base.css' to '/public/styles/base.css'
"""

import re
import os
from pathlib import Path

def clean_relative_paths(content):
    """Convert relative paths to root-relative paths in href and src attributes."""
    
    # Pattern to match href="..." or src="..." 
    # Excludes external URLs (http, https, //, data:, tel:, mailto:)
    pattern = r'(href|src)=["\']([^"\']*?)["\']'
    
    def replace_func(match):
        attr = match.group(1)
        path = match.group(2)
        
        # Skip external URLs and special protocols
        if path.startswith(('http://', 'https://', '//', 'data:', 'tel:', 'mailto:', '#')):
            return f'{attr}="{path}"'
        
        # Skip empty paths
        if not path:
            return f'{attr}="{path}"'
        
        # Remove leading ./
        while path.startswith('./'):
            path = path[2:]
        
        # Remove leading ../
        while path.startswith('../'):
            path = path[3:]
        
        # Make it root-relative if not already
        if not path.startswith('/'):
            path = '/' + path
        
        return f'{attr}="{path}"'
    
    # Replace all occurrences
    cleaned = re.sub(pattern, replace_func, content)
    
    return cleaned

def process_file(filepath):
    """Process a single file and clean relative paths."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        cleaned_content = clean_relative_paths(content)
        
        if content != cleaned_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(cleaned_content)
            print(f"✓ Updated: {filepath}")
            return True
        else:
            print(f"- No changes: {filepath}")
            return False
    except Exception as e:
        print(f"✗ Error processing {filepath}: {e}")
        return False

def main():
    """Main function to process all HTML files."""
    base_dirs = ['/workspace/blog', '/workspace/public', '/workspace/src']
    
    total_files = 0
    updated_files = 0
    
    for base_dir in base_dirs:
        if not os.path.exists(base_dir):
            continue
            
        for root, dirs, files in os.walk(base_dir):
            # Skip dist directory
            if 'dist' in root:
                continue
                
            for file in files:
                if file.endswith(('.html', '.astro')):
                    filepath = os.path.join(root, file)
                    total_files += 1
                    if process_file(filepath):
                        updated_files += 1
    
    print(f"\n{'='*60}")
    print(f"Processing complete!")
    print(f"Total files checked: {total_files}")
    print(f"Files updated: {updated_files}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
