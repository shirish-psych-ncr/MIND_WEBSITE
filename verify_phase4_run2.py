#!/usr/bin/env python3
"""
PHASE 4 Run 2 - COMPREHENSIVE VERIFICATION
"""

from pathlib import Path
import re

def check_image_extensions():
    """Check for any remaining .jpg or .png references in HTML files"""
    issues = []
    
    for html_file in Path('/workspace').rglob('*.html'):
        content = html_file.read_text()
        
        # Find img src with .jpg or .png
        if '.jpg' in content or '.png' in content:
            # Check if it's in an img tag (not og:image meta)
            imgs_jpg = re.findall(r'<img[^>]*src="[^"]*\.jpg', content, re.IGNORECASE)
            imgs_png = re.findall(r'<img[^>]*src="[^"]*\.png', content, re.IGNORECASE)
            
            if imgs_jpg or imgs_png:
                rel_path = str(html_file.relative_to('/workspace'))
                issues.append(f"{rel_path}: {len(imgs_jpg)} jpg, {len(imgs_png)} png")
    
    return issues

def check_lazy_loading():
    """Verify all non-logo images have loading attribute"""
    missing = []
    
    for html_file in Path('/workspace').rglob('*.html'):
        content = html_file.read_text()
        imgs = re.findall(r'<img[^>]*>', content)
        
        for img in imgs:
            if 'logo-img' in img or 'Logo' in img:
                continue
            if 'loading=' in img:
                continue
            
            rel_path = str(html_file.relative_to('/workspace'))
            missing.append((rel_path, img[:80]))
    
    return missing

def check_vendor_paths():
    """Check for assets/js/lib/ references"""
    issues = []
    
    for html_file in Path('/workspace').rglob('*.html'):
        content = html_file.read_text()
        if 'assets/js/lib/' in content:
            rel_path = str(html_file.relative_to('/workspace'))
            issues.append(rel_path)
    
    return issues

def check_opengraph():
    """Check for missing OpenGraph tags"""
    missing = []
    
    for html_file in Path('/workspace').glob('*.html'):
        content = html_file.read_text()
        if 'property="og:title"' not in content:
            missing.append(html_file.name)
    
    return missing

def check_structured_data():
    """Check for missing JSON-LD"""
    missing = []
    
    for html_file in Path('/workspace').glob('*.html'):
        content = html_file.read_text()
        if 'type="application/ld+json"' not in content:
            if html_file.name != '404.html':
                missing.append(html_file.name)
    
    return missing

if __name__ == '__main__':
    print("=" * 70)
    print("PHASE 4 RUN 2 - FINAL VERIFICATION")
    print("=" * 70)
    
    all_pass = True
    
    print("\n1. Checking image extensions...")
    ext_issues = check_image_extensions()
    if ext_issues:
        print(f"   Found {len(ext_issues)} files with old extensions:")
        for issue in ext_issues[:5]:
            print(f"      - {issue}")
        all_pass = False
    else:
        print("   OK: All image references use .webp")
    
    print("\n2. Checking lazy loading...")
    lazy_missing = check_lazy_loading()
    if lazy_missing:
        print(f"   Found {len(lazy_missing)} images without loading:")
        for path, img in lazy_missing[:5]:
            print(f"      - {path}: {img}")
        all_pass = False
    else:
        print("   OK: All images have loading attributes")
    
    print("\n3. Checking vendor paths...")
    vendor_issues = check_vendor_paths()
    if vendor_issues:
        print(f"   Found {len(vendor_issues)} files with old paths:")
        for issue in vendor_issues[:5]:
            print(f"      - {issue}")
        all_pass = False
    else:
        print("   OK: All vendor paths correct")
    
    print("\n4. Checking OpenGraph tags...")
    og_missing = check_opengraph()
    if og_missing:
        print(f"   Missing OG tags in {len(og_missing)} files:")
        for f in og_missing:
            print(f"      - {f}")
        all_pass = False
    else:
        print("   OK: All pages have OpenGraph tags")
    
    print("\n5. Checking structured data...")
    sd_missing = check_structured_data()
    if sd_missing:
        print(f"   Missing JSON-LD in {len(sd_missing)} files:")
        for f in sd_missing:
            print(f"      - {f}")
        all_pass = False
    else:
        print("   OK: All pages have structured data")
    
    print("\n" + "=" * 70)
    if all_pass:
        print("ALL TASKS COMPLETE!")
    else:
        print("SOME ISSUES REMAIN")
    print("=" * 70)
