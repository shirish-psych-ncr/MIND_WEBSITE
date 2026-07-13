#!/usr/bin/env python3
"""
PHASE 4 Run 3, 4, 5 - Fix Script
1. Add JSON-LD to 6 tool pages
2. Add fetchpriority to tools/eye-movement.html
3. Add lazy loading to images across all HTML files
"""

import os
import re

# Tool page metadata for JSON-LD
tool_metadata = {
    "butterfly-tapper": {
        "name": "Butterfly Tapper",
        "description": "A calming bilateral stimulation tool for anxiety relief and emotional regulation.",
        "category": "HealthApplication"
    },
    "eye-movement": {
        "name": "Eye Movement Exercise",
        "description": "Guided eye movement exercises for EMDR therapy and stress reduction.",
        "category": "HealthApplication"
    },
    "guided-breathing": {
        "name": "Guided Breathing",
        "description": "Interactive breathing exercises for relaxation and anxiety management.",
        "category": "HealthApplication"
    },
    "horizon-scan": {
        "name": "Horizon Scan",
        "description": "Visual relaxation tool with calming horizon scenes for mindfulness.",
        "category": "HealthApplication"
    },
    "hypnos-fractal": {
        "name": "Hypnotic Fractals",
        "description": "Mesmerizing fractal patterns for meditation and deep relaxation.",
        "category": "HealthApplication"
    },
    "leaf-on-stream": {
        "name": "Leaf on Stream",
        "description": "Mindfulness exercise visualizing thoughts as leaves floating down a stream.",
        "category": "HealthApplication"
    }
}

json_ld_template = '''
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "{name}",
      "description": "{description}",
      "applicationCategory": "{category}",
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires JavaScript enabled",
      "author": {{
        "@type": "MedicalOrganization",
        "name": "Mind Grace Clinic"
      }},
      "publisher": {{
        "@type": "MedicalOrganization",
        "name": "Mind Grace Clinic",
        "url": "https://mindgrace.in"
      }}
    }}
    </script>
'''

def add_json_ld_to_tools():
    """Add JSON-LD structured data to tool pages missing it."""
    tools_dir = "tools"
    updated = []
    
    for filename, meta in tool_metadata.items():
        filepath = os.path.join(tools_dir, f"{filename}.html")
        if not os.path.exists(filepath):
            print(f"SKIP: {filepath} does not exist")
            continue
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if JSON-LD already exists
        if 'application/ld+json' in content:
            print(f"SKIP: {filepath} already has JSON-LD")
            continue
        
        # Find closing body tag and insert before it
        json_ld = json_ld_template.format(
            name=meta["name"],
            description=meta["description"],
            category=meta["category"]
        )
        
        # Insert before </body>
        if '</body>' in content:
            content = content.replace('</body>', json_ld + '\n  </body>')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated.append(filepath)
            print(f"UPDATED: {filepath}")
        else:
            print(f"ERROR: No </body> tag in {filepath}")
    
    return updated

def add_fetchpriority_to_eye_movement():
    """Add fetchpriority='high' to the main image in eye-movement.html."""
    filepath = "tools/eye-movement.html"
    if not os.path.exists(filepath):
        print(f"SKIP: {filepath} does not exist")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Look for the main hero/image element and add fetchpriority
    # Pattern: <img src=...> without fetchpriority
    pattern = r'(<img[^>]*src="[^"]*"[^>]*)(?![^>]*fetchpriority)'
    
    def add_fetchpriority(match):
        img_tag = match.group(1)
        if 'fetchpriority' not in img_tag:
            # Add fetchpriority before the closing >
            return img_tag + ' fetchpriority="high"'
        return img_tag
    
    new_content = re.sub(pattern, add_fetchpriority, content, count=1)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"UPDATED: {filepath} - added fetchpriority")
        return True
    else:
        print(f"SKIP: {filepath} - no changes needed or pattern not found")
        return False

def add_lazy_loading():
    """Add loading='lazy' to images that don't have loading attribute."""
    html_files = []
    
    # Root level
    for f in os.listdir('.'):
        if f.endswith('.html'):
            html_files.append(f)
    
    # Blog directory
    if os.path.exists('blog'):
        for f in os.listdir('blog'):
            if f.endswith('.html'):
                html_files.append(f'blog/{f}')
        # Blog pages subdirectory
        for root, dirs, files in os.walk('blog/pages'):
            for f in files:
                if f.endswith('.html'):
                    html_files.append(os.path.join(root, f))
    
    # Tools directory
    if os.path.exists('tools'):
        for f in os.listdir('tools'):
            if f.endswith('.html'):
                html_files.append(f'tools/{f}')
    
    updated = []
    skipped = []
    
    for filepath in html_files:
        if not os.path.exists(filepath):
            continue
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip images that already have loading attribute
        # Also skip logo images and hero images that should be eager
        modified = False
        
        # Pattern to find img tags without loading attribute
        pattern = r'(<img(?![^>]*\sloading=)[^>]*>)'
        
        def add_lazy(match):
            nonlocal modified
            img_tag = match.group(1)
            
            # Skip if it's a logo or hero image (check for specific classes or src patterns)
            if 'logo' in img_tag.lower() or 'hero' in img_tag.lower():
                return img_tag
            
            # Skip if it already has fetchpriority="high" (should be eager)
            if 'fetchpriority="high"' in img_tag:
                return img_tag
            
            # Add loading="lazy" before the closing >
            modified = True
            return img_tag[:-1] + ' loading="lazy">'
        
        new_content = re.sub(pattern, add_lazy, content)
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated.append(filepath)
            print(f"UPDATED: {filepath}")
        else:
            skipped.append(filepath)
    
    return updated, skipped

if __name__ == "__main__":
    print("=" * 60)
    print("PHASE 4 - Runs 3, 4, 5 Execution")
    print("=" * 60)
    
    print("\n1. Adding JSON-LD to tool pages...")
    json_updates = add_json_ld_to_tools()
    print(f"   Updated {len(json_updates)} tool pages")
    
    print("\n2. Adding fetchpriority to eye-movement.html...")
    fetch_updated = add_fetchpriority_to_eye_movement()
    
    print("\n3. Adding lazy loading to images...")
    lazy_updated, lazy_skipped = add_lazy_loading()
    print(f"   Updated {len(lazy_updated)} files")
    print(f"   Skipped {len(lazy_skipped)} files (no changes needed)")
    
    print("\n" + "=" * 60)
    print("COMPLETE")
    print("=" * 60)
