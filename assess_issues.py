#!/usr/bin/env python3
"""
Assessment script for MIND_WEBSITE HTML files
Identifies issues across all HTML files based on conversation history
"""

import os
import re
from pathlib import Path

WORKSPACE = "/workspace"

def find_all_html_files():
    """Find all HTML files in workspace"""
    html_files = []
    for root, dirs, files in os.walk(WORKSPACE):
        # Skip node_modules and similar
        if any(skip in root for skip in ['node_modules', '.git', '__pycache__']):
            continue
        for f in files:
            if f.endswith('.html'):
                html_files.append(os.path.join(root, f))
    return sorted(html_files)

def check_motion_js(filepath):
    """Check for incorrect motion.min.js reference (should be motion-one.min.js)"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check for wrong reference
    if 'motion.min.js' in content and 'motion-one.min.js' not in content:
        return "WRONG: motion.min.js (should be motion-one.min.js)"
    return "OK"

def check_icon_init_path(filepath):
    """Check icon-init.js path is correct for file's directory depth"""
    rel_path = os.path.relpath(filepath, WORKSPACE)
    depth = rel_path.count('/')
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find icon-init.js references
    matches = re.findall(r'src=["\']([^"\']*icon-init\.js)["\']', content)
    if not matches:
        return "NO_REF"
    
    issues = []
    for match in matches:
        expected_prefix = '../' * (depth - 1) if depth > 1 else ''
        if depth == 0:  # Root level
            expected = 'assets/js/icon-init.js'
        elif depth == 1:  # First level (e.g., tools/, blog/)
            expected = 'assets/js/icon-init.js' if 'blog/' not in rel_path or rel_path.count('/') == 1 else '../../assets/js/icon-init.js'
        else:
            expected = '../../assets/js/icon-init.js' if 'blog/pages/' in rel_path else 'assets/js/icon-init.js'
        
        # Simple check: blog/pages/* should use ../../
        if 'blog/pages/' in rel_path:
            if not match.startswith('../../'):
                issues.append(f"Wrong path '{match}' in blog/pages/ (should start with ../../)")
        elif depth <= 1:
            if match.startswith('../') or match.startswith('../../'):
                issues.append(f"Path '{match}' may be incorrect for depth {depth}")
    
    if issues:
        return "ISSUES: " + "; ".join(issues)
    return "OK"

def check_manifest_sw(filepath):
    """Check manifest.json and sw.js references"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    
    # Check manifest.json
    if 'manifest.json' in content:
        # Should use absolute path /manifest.json for PWA
        if 'href="/manifest.json"' not in content and "href='/manifest.json'" not in content:
            if 'href="manifest.json"' in content or "href='manifest.json'" in content:
                issues.append("manifest.json should use absolute path /manifest.json")
    
    # Check sw.js
    if 'sw.js' in content:
        if "register('/sw.js')" not in content and "register(\"/sw.js\")" not in content:
            if "register('sw.js')" in content or 'register("sw.js")' in content:
                issues.append("sw.js should use absolute path /sw.js")
    
    if issues:
        return "ISSUES: " + "; ".join(issues)
    return "OK"

def check_csp_frame_ancestors(filepath):
    """Check for CSP frame-ancestors in meta tag (ignored in meta)"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    
    # Check for frame-ancestors in CSP meta
    csp_match = re.search(r'<meta[^>]*Content-Security-Policy[^>]*content="([^"]*)"', content)
    if csp_match:
        csp_content = csp_match.group(1)
        if 'frame-ancestors' in csp_content:
            issues.append("CSP frame-ancestors ignored in meta tag (needs HTTP header)")
    
    if issues:
        return "ISSUES: " + "; ".join(issues)
    return "OK"

def check_x_frame_options(filepath):
    """Check for X-Frame-Options meta tag (must be HTTP header)"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'X-Frame-Options' in content:
        return "ISSUE: X-Frame-Options in meta tag (must be HTTP header)"
    return "OK"

def get_file_category(filepath):
    """Categorize file by its location"""
    rel_path = os.path.relpath(filepath, WORKSPACE)
    if rel_path == 'index.html':
        return 'ROOT_INDEX'
    elif rel_path.startswith('blog/pages/adult/'):
        return 'BLOG_ADULT'
    elif rel_path.startswith('blog/pages/child/'):
        return 'BLOG_CHILD'
    elif rel_path.startswith('blog/'):
        return 'BLOG_OTHER'
    elif rel_path.startswith('tools/'):
        return 'TOOLS'
    elif rel_path.startswith('assets/'):
        return 'ASSETS'
    elif rel_path.startswith('inspo/'):
        return 'INSCO'
    else:
        return 'ROOT_OTHER'

def main():
    html_files = find_all_html_files()
    print(f"Found {len(html_files)} HTML files\n")
    
    # Summary counters
    summary = {
        'motion_wrong': 0,
        'icon_init_wrong': 0,
        'manifest_sw_wrong': 0,
        'csp_frame_ancestors': 0,
        'x_frame_options': 0,
    }
    
    issues_by_file = {}
    
    for filepath in html_files:
        rel_path = os.path.relpath(filepath, WORKSPACE)
        category = get_file_category(filepath)
        
        file_issues = {}
        
        # Check motion.js
        motion_result = check_motion_js(filepath)
        if motion_result != "OK":
            file_issues['motion'] = motion_result
            summary['motion_wrong'] += 1
        
        # Check icon-init.js path
        icon_result = check_icon_init_path(filepath)
        if icon_result not in ["OK", "NO_REF"]:
            file_issues['icon_init'] = icon_result
            summary['icon_init_wrong'] += 1
        
        # Check manifest/sw
        manifest_result = check_manifest_sw(filepath)
        if manifest_result != "OK":
            file_issues['manifest_sw'] = manifest_result
            summary['manifest_sw_wrong'] += 1
        
        # Check CSP frame-ancestors
        csp_result = check_csp_frame_ancestors(filepath)
        if csp_result != "OK":
            file_issues['csp'] = csp_result
            summary['csp_frame_ancestors'] += 1
        
        # Check X-Frame-Options
        xfo_result = check_x_frame_options(filepath)
        if xfo_result != "OK":
            file_issues['x_frame'] = xfo_result
            summary['x_frame_options'] += 1
        
        if file_issues:
            issues_by_file[rel_path] = {
                'category': category,
                'issues': file_issues
            }
    
    # Print summary
    print("=" * 60)
    print("SUMMARY OF ISSUES")
    print("=" * 60)
    print(f"Motion.js wrong reference:     {summary['motion_wrong']}")
    print(f"Icon-init.js path issues:      {summary['icon_init_wrong']}")
    print(f"Manifest/SW path issues:       {summary['manifest_sw_wrong']}")
    print(f"CSP frame-ancestors in meta:   {summary['csp_frame_ancestors']}")
    print(f"X-Frame-Options in meta:       {summary['x_frame_options']}")
    print()
    
    # Print detailed issues
    if issues_by_file:
        print("=" * 60)
        print("FILES WITH ISSUES")
        print("=" * 60)
        for rel_path, data in sorted(issues_by_file.items()):
            print(f"\n{rel_path} [{data['category']}]")
            for issue_type, issue_desc in data['issues'].items():
                print(f"  - {issue_type}: {issue_desc}")
    else:
        print("No issues found!")
    
    print("\n" + "=" * 60)
    print("ASSESSMENT COMPLETE")
    print("=" * 60)

if __name__ == "__main__":
    main()
