#!/usr/bin/env python3
"""PHASE 4 Run 3 - Verification Script"""
import os
import re
from pathlib import Path

root = Path('/workspace')
html_files = sorted(root.glob('*.html'))

print("=" * 70)
print("PHASE 4 RUN 3 - CURRENT STATUS VERIFICATION")
print("=" * 70)

# Check 1: Image dimensions (width/height)
print("\n1. IMAGE DIMENSIONS CHECK:")
missing_dims = []
for f in html_files:
    content = f.read_text()
    imgs = re.findall(r'<img[^>]+>', content)
    for img in imgs:
        has_width = 'width=' in img
        has_height = 'height=' in img
        if not has_width or not has_height:
            missing_dims.append((f.name, img[:80]))

if missing_dims:
    print(f"   ⚠️  {len(missing_dims)} images missing width/height:")
    for fname, img in missing_dims[:5]:
        print(f"      - {fname}: {img}...")
else:
    print("   ✅ All images have width and height attributes")

# Check 2: Preload tags
print("\n2. PRELOAD TAGS CHECK:")
preload_counts = {}
for f in html_files:
    content = f.read_text()
    preloads = len(re.findall(r'<link[^>]+rel=["\']preload["\']', content))
    preload_counts[f.name] = preloads

with_preload = [k for k, v in preload_counts.items() if v > 0]
without_preload = [k for k, v in preload_counts.items() if v == 0]
print(f"   Files with preload: {len(with_preload)}/25")
print(f"   Files without preload: {len(without_preload)}/25")
if without_preload:
    print(f"      Missing: {', '.join(without_preload[:10])}")

# Check 3: Critical CSS inlining
print("\n3. CRITICAL CSS INLINE CHECK:")
critical_css_files = []
for f in html_files:
    content = f.read_text()
    if '<style>' in content and 'critical' in content.lower():
        critical_css_files.append(f.name)
print(f"   Files with inline critical CSS: {len(critical_css_files)}/25")
if critical_css_files:
    print(f"      Found in: {', '.join(critical_css_files[:5])}")

# Check 4: Script defer/async
print("\n4. SCRIPT DEFER/ASYNC CHECK:")
defer_async_ok = []
no_defer = []
for f in html_files:
    content = f.read_text()
    scripts = re.findall(r'<script[^>]+src=', content)
    external_scripts = [s for s in scripts if 'type="application/ld+json"' not in s]
    
    has_defer_or_async = any('defer' in s or 'async' in s or 'type="module"' in s 
                             for s in external_scripts)
    if external_scripts and has_defer_or_async:
        defer_async_ok.append(f.name)
    elif external_scripts:
        no_defer.append(f.name)

print(f"   Files with proper script loading: {len(defer_async_ok)}/25")
if no_defer:
    print(f"   ⚠️  Files needing defer/async: {', '.join(no_defer[:10])}")

# Check 5: Vendor directory status
print("\n5. VENDOR DIRECTORY STATUS:")
vendor_dir = root / 'assets' / 'vendor'
lib_dir = root / 'assets' / 'js' / 'lib'
if vendor_dir.exists():
    vendor_files = list(vendor_dir.glob('*.js'))
    print(f"   ✅ assets/vendor/: {len(vendor_files)} JS files")
if lib_dir.exists():
    lib_files = list(lib_dir.glob('*.js'))
    if lib_files:
        print(f"   ⚠️  assets/js/lib/: {len(lib_files)} JS files still present")
    else:
        print(f"   ✅ assets/js/lib/: empty (only README)")

# Check 6: Lazy loading coverage
print("\n6. LAZY LOADING COVERAGE:")
lazy_issues = []
for f in html_files:
    content = f.read_text()
    imgs = re.findall(r'<img[^>]+>', content)
    for img in imgs:
        # Skip if has loading attribute OR is SVG logo with fetchpriority
        if 'loading=' not in img and 'fetchpriority=' not in img:
            lazy_issues.append((f.name, img[:60]))

if lazy_issues:
    print(f"   ⚠️  {len(lazy_issues)} images missing loading attribute:")
    for fname, img in lazy_issues[:5]:
        print(f"      - {fname}: {img}...")
else:
    print("   ✅ All images have loading or fetchpriority attributes")

print("\n" + "=" * 70)
print("VERIFICATION COMPLETE")
print("=" * 70)
