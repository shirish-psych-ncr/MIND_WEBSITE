#!/usr/bin/env python3
"""
PHASE 4 RUN 2 - Vendor Consolidation & Cleanup
Tasks:
1. Remove duplicate vendor libraries from assets/js/lib/
2. Update any remaining references from assets/js/lib/ to assets/vendor/
3. Delete orphaned files
"""

import os
import re
from pathlib import Path

def main():
    print("=== PHASE 4 RUN 2: VENDOR CONSOLIDATION ===\n")
    
    # Task 1: Check what's in assets/js/lib/ vs assets/vendor/
    js_lib_dir = Path("assets/js/lib")
    vendor_dir = Path("assets/vendor")
    
    if not js_lib_dir.exists():
        print("✓ assets/js/lib/ directory does not exist")
        return
    
    if not vendor_dir.exists():
        print("✗ assets/vendor/ directory does not exist - cannot consolidate")
        return
    
    js_lib_files = set(f.name for f in js_lib_dir.glob("*.js"))
    vendor_files = set(f.name for f in vendor_dir.glob("*.js"))
    
    print(f"Files in assets/js/lib/: {len(js_lib_files)}")
    print(f"Files in assets/vendor/: {len(vendor_files)}\n")
    
    # Find duplicates (files that exist in both)
    duplicates = js_lib_files & vendor_files
    print(f"Duplicate files (exist in both): {len(duplicates)}")
    for f in sorted(duplicates):
        print(f"  - {f}")
    print()
    
    # Files only in js/lib (might be different naming)
    only_in_js_lib = js_lib_files - vendor_files
    print(f"Files only in assets/js/lib/: {len(only_in_js_lib)}")
    for f in sorted(only_in_js_lib):
        print(f"  - {f}")
    print()
    
    # Task 2: Check HTML files for references to assets/js/lib/
    print("Checking HTML files for assets/js/lib/ references...")
    html_refs = []
    for html_file in Path(".").rglob("*.html"):
        if "node_modules" in str(html_file) or "playwright-report" in str(html_file):
            continue
        try:
            content = html_file.read_text(encoding='utf-8')
            if "assets/js/lib/" in content:
                html_refs.append(html_file)
        except:
            pass
    
    if html_refs:
        print(f"Found {len(html_refs)} HTML files with assets/js/lib/ references:")
        for f in html_refs[:10]:
            print(f"  - {f}")
    else:
        print("✓ No HTML files reference assets/js/lib/")
    print()
    
    # Task 3: Remove duplicate JS files from assets/js/lib/
    print("Removing duplicate JavaScript files from assets/js/lib/...")
    removed_count = 0
    for js_file in js_lib_dir.glob("*.js"):
        # Check if equivalent exists in vendor
        base_name = js_file.name
        # Handle naming variations
        variations = [
            base_name,
            base_name.replace("autoanimate", "auto-animate"),
            base_name.replace("confetti", "canvas-confetti"),
            base_name.replace("motion.min.js", "motion-one.min.js"),
        ]
        
        should_remove = False
        for var in variations:
            if (vendor_dir / var).exists():
                should_remove = True
                break
        
        if should_remove:
            try:
                js_file.unlink()
                print(f"  Removed: {base_name}")
                removed_count += 1
            except Exception as e:
                print(f"  Failed to remove {base_name}: {e}")
    
    print(f"\nRemoved {removed_count} duplicate files")
    
    # Show what remains
    remaining = list(js_lib_dir.glob("*"))
    print(f"\nRemaining in assets/js/lib/: {len(remaining)} items")
    for item in remaining:
        print(f"  - {item.name}")

if __name__ == "__main__":
    main()
