#!/usr/bin/env python3
import re
import os
import glob

def clean_html_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        style_pattern = r'\s+style="[^"]*"'
        content = re.sub(style_pattern, '', content)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

# Get all HTML files
html_files = glob.glob('/workspace/**/*.html', recursive=True)

cleaned_count = 0
total_count = 0

for filepath in html_files:
    # Skip node_modules, vendor, etc.
    if '/node_modules/' in filepath or '/vendor/' in filepath:
        continue
    
    total_count += 1
    if clean_html_file(filepath):
        cleaned_count += 1
        print(f"✓ Cleaned: {os.path.basename(filepath)}")

print(f"\n=== Summary ===")
print(f"Total HTML files scanned: {total_count}")
print(f"Files cleaned: {cleaned_count}")
