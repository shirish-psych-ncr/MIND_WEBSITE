#!/usr/bin/env python3
"""PHASE 4 Run 3 - Fix Script
Tasks:
1. Add width/height to images missing them
2. Add preload tags for critical resources
3. Add defer/async to external scripts
"""
import os
import re
from pathlib import Path

root = Path('/workspace')
html_files = sorted(root.glob('*.html'))

print("=" * 70)
print("PHASE 4 RUN 3 - APPLYING FIXES")
print("=" * 70)

# TASK 1: Add width/height to images missing them
print("\n1. ADDING WIDTH/HEIGHT TO IMAGES...")
fixed_dims = 0

for f in html_files:
    content = f.read_text()
    
    # Find img tags without both width and height
    def add_dimensions(match):
        global fixed_dims
        img_tag = match.group(0)
        
        # Skip if already has both width and height
        if 'width=' in img_tag and 'height=' in img_tag:
            return img_tag
        
        # Extract src for dimension lookup
        src_match = re.search(r'src=["\']([^"\']+)["\']', img_tag)
        if not src_match:
            return img_tag
            
        src = src_match.group(1)
        
        # Default dimensions based on image type
        if 'Logo' in src or 'logo' in src:
            width, height = '180', '60'
        elif 'Dr_Anita_Sharma' in src:
            width, height = '400', '500'
        elif 'stage-image' in img_tag or 'Location_street' in src:
            width, height = '1200', '630'
        else:
            # Generic fallback
            width, height = '800', '600'
        
        # Insert width and height before the closing >
        # Remove any existing width/height first
        img_tag = re.sub(r'\s*width=["\'][^"\']*["\']', '', img_tag)
        img_tag = re.sub(r'\s*height=["\'][^"\']*["\']', '', img_tag)
        
        # Add before the last >
        if img_tag.rstrip().endswith('>'):
            img_tag = img_tag.rstrip()[:-1] + f' width="{width}" height="{height}">'
        
        fixed_dims += 1
        return img_tag
    
    new_content = re.sub(r'<img[^>]*>', add_dimensions, content)
    
    if new_content != content:
        f.write_text(new_content)
        print(f"   ✓ {f.name}: fixed image dimensions")

print(f"   Total images fixed: {fixed_dims}")

# TASK 2: Add preload tags for hero images and fonts
print("\n2. ADDING PRELOAD TAGS...")
added_preload = 0

for f in html_files:
    content = f.read_text()
    preloads_added = []
    
    # Check for hero images that should be preloaded
    hero_img_match = re.search(r'<img[^>]*fetchpriority=["\']high["\'][^>]*src=["\']([^"\']+)["\']', content)
    if hero_img_match and 'preload' not in content:
        hero_src = hero_img_match.group(1)
        if hero_src.endswith('.webp') or hero_src.endswith('.svg'):
            preload_tag = f'    <link rel="preload" as="image" href="{hero_src}" fetchpriority="high">\n'
            preloads_added.append(preload_tag)
    
    # Check if fonts are used but not preloaded
    if 'fonts.googleapis.com' in content and 'preload' not in content.lower():
        font_preload = '    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap">\n'
        preloads_added.append(font_preload)
    
    if preloads_added:
        # Insert after existing preconnect/dns-prefetch tags
        insert_pattern = r'(<link[^>]*(?:preconnect|dns-prefetch)[^>]*>\n)'
        match = re.search(insert_pattern, content)
        if match:
            insert_pos = match.end()
            new_content = content[:insert_pos] + ''.join(preloads_added) + content[insert_pos:]
            f.write_text(new_content)
            added_preload += 1
            print(f"   ✓ {f.name}: added {len(preloads_added)} preload tag(s)")

print(f"   Total files with preload added: {added_preload}")

# TASK 3: Add defer to external scripts
print("\n3. ADDING DEFER TO EXTERNAL SCRIPTS...")
fixed_scripts = 0

for f in html_files:
    content = f.read_text()
    
    def add_defer(match):
        script_tag = match.group(0)
        
        # Skip if already has defer, async, or type="module"
        if 'defer' in script_tag or 'async' in script_tag or 'type="module"' in script_tag:
            return script_tag
        
        # Skip JSON-LD scripts
        if 'application/ld+json' in script_tag:
            return script_tag
        
        # Add defer before src
        return script_tag.replace('<script ', '<script defer ')
    
    new_content = re.sub(r'<script[^>]+src=[^>]+>', add_defer, content)
    
    if new_content != content:
        f.write_text(new_content)
        fixed_scripts += 1
        print(f"   ✓ {f.name}: added defer to scripts")

print(f"   Total files with script fixes: {fixed_scripts}")

print("\n" + "=" * 70)
print("PHASE 4 RUN 3 FIXES COMPLETE")
print("=" * 70)
