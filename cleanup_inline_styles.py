#!/usr/bin/env python3
"""
Script to remove inline styles from HTML files and ensure proper class usage.
This is a targeted cleanup for the Mind Grace Clinic website.
"""

import re
import os

def clean_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Pattern to match style="..." attributes
    style_pattern = r'\s+style="[^"]*"'
    
    # Remove all inline styles
    content = re.sub(style_pattern, '', content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# Files to process
files_to_clean = [
    '/workspace/index.html',
    '/workspace/services.html',
    '/workspace/about.html',
    '/workspace/conditions.html',
    '/workspace/process.html',
    '/workspace/resources.html',
    '/workspace/location.html',
    '/workspace/faq.html',
    '/workspace/contact.html',
    '/workspace/book.html',
]

cleaned_count = 0
for filepath in files_to_clean:
    if os.path.exists(filepath):
        if clean_html_file(filepath):
            cleaned_count += 1
            print(f"✓ Cleaned: {filepath}")
        else:
            print(f"- No changes: {filepath}")
    else:
        print(f"! Not found: {filepath}")

print(f"\nTotal files cleaned: {cleaned_count}")
