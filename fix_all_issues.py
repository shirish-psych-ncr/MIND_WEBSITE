#!/usr/bin/env python3
"""
Mind Grace Website - Comprehensive Fix Script
Fixes HTML validation, accessibility, and code quality issues across all files.
"""

import os
import re
from pathlib import Path

# Configuration
WORKSPACE = Path('/workspace')

def find_files(patterns):
    """Find all files matching patterns."""
    files = []
    for pattern in patterns:
        files.extend(WORKSPACE.glob(pattern))
    return sorted(set(files))

def fix_self_closing_void_elements(content):
    """Remove / from void elements (HTML5 doesn't require self-closing syntax)."""
    # Match void elements with trailing />
    void_elements = ['link', 'meta', 'img', 'br', 'source', 'base', 'input', 'hr', 'area', 'col', 'embed', 'param', 'track', 'wbr']
    
    for elem in void_elements:
        # Match <elem ... /> but not inside comments or strings
        pattern = rf'<({elem})([^>]*?)\s*/>'
        replacement = r'<\1\2>'
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    return content

def fix_ampersands(content):
    """Encode raw ampersands in text content (not in URLs)."""
    # This is tricky - we need to avoid replacing & in URLs and already-encoded entities
    
    lines = content.split('\n')
    fixed_lines = []
    
    for line in lines:
        # Skip lines that are purely URLs or already properly encoded
        if 'href=' in line or 'src=' in line or '&amp;' in line:
            # More careful handling for lines with attributes
            # Replace & in visible text content only
            result = []
            i = 0
            in_tag = False
            in_attr_value = False
            attr_quote = None
            
            while i < len(line):
                char = line[i]
                
                if char == '<' and not in_attr_value:
                    in_tag = True
                    result.append(char)
                elif char == '>' and in_tag:
                    in_tag = False
                    in_attr_value = False
                    attr_quote = None
                    result.append(char)
                elif char in '"\'':
                    if not in_attr_value:
                        in_attr_value = True
                        attr_quote = char
                    elif char == attr_quote:
                        in_attr_value = False
                        attr_quote = None
                    result.append(char)
                elif char == '&' and not in_attr_value and in_tag:
                    # In tag but not in attribute value - likely text content error
                    # Check if it's already an entity
                    if i + 1 < len(line) and line[i+1:i+4] in ['amp', 'lt ', 'gt ', 'quo', 'apos']:
                        result.append('&')
                    else:
                        result.append('&amp;')
                elif char == '&' and not in_tag:
                    # Outside tags - in text content
                    # Check if followed by valid entity
                    rest = line[i+1:]
                    if re.match(r'^(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);', rest):
                        result.append('&')
                    else:
                        result.append('&amp;')
                else:
                    result.append(char)
                
                i += 1
            
            fixed_lines.append(''.join(result))
        else:
            # Simple case - no href/src, just replace standalone &
            # But be careful about & in JavaScript or other contexts
            if '<script>' not in line.lower() and '//' not in line:
                # Replace & followed by space or word characters (not entities)
                line = re.sub(r'&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-f]+;)(?=\s*\w)', '&amp;', line)
            fixed_lines.append(line)
    
    return '\n'.join(fixed_lines)

def fix_autoanimate_script(content):
    """Change autoanimate.min.js to load as module."""
    # Replace defer with type="module"
    pattern = r'<script\s+src="([^"]*autoanimate\.min\.js)"\s+defer\s*></script>'
    replacement = r'<script type="module" src="\1"></script>'
    content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    return content

def remove_trailing_whitespace(content):
    """Remove trailing whitespace from lines."""
    lines = content.split('\n')
    return '\n'.join(line.rstrip() for line in lines)

def fix_attribute_case(content):
    """Convert attribute names to lowercase."""
    # Match attributes with uppercase letters
    def lower_attrs(match):
        tag = match.group(1)
        attrs = match.group(2)
        # Lowercase attribute names
        attrs_lower = re.sub(r'\s+([A-Z][A-Za-z0-9\-]*)=', lambda m: ' ' + m.group(1).lower() + '=', attrs)
        return f'<{tag}{attrs_lower}'
    
    content = re.sub(r'<([a-zA-Z][a-zA-Z0-9]*)((?:\s+[a-zA-Z][a-zA-Z0-9\-]*\s*=\s*(?:"[^"]*"|\'[^\']*\'|[^\s>]+))*)', 
                     lower_attrs, content)
    return content

def fix_type_css(content):
    """Remove TYPE="text/css" from style tags."""
    content = re.sub(r'\s+TYPE\s*=\s*["\']text/css["\']', '', content, flags=re.IGNORECASE)
    content = re.sub(r'\s+type\s*=\s*["\']text/css["\']', '', content, flags=re.IGNORECASE)
    return content

def process_html_file(filepath):
    """Process a single HTML file."""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            original_content = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return False
    
    content = original_content
    
    # Apply fixes
    content = fix_self_closing_void_elements(content)
    content = fix_ampersands(content)
    content = fix_autoanimate_script(content)
    content = remove_trailing_whitespace(content)
    content = fix_attribute_case(content)
    content = fix_type_css(content)
    
    # Write back if changed
    if content != original_content:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception as e:
            print(f"Error writing {filepath}: {e}")
            return False
    
    return False

def fix_gallery_js(filepath):
    """Fix gallery.js addEventListener issue by adding null checks."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return False
    
    original = content
    
    # Add null check for closeBtn
    old_pattern = r'this\.closeBtn\.addEventListener\(\'click\', \(\) => this\.close\(\)\);'
    new_code = '''if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }'''
    content = re.sub(old_pattern, new_code, content)
    
    # Add null checks for prevBtn and nextBtn
    old_pattern = r'this\.prevBtn\.addEventListener\(\'click\', \(e\) => \{ e\.stopPropagation\(\); this\.prev\(\); \}\);'
    new_code = '''if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this.prev(); });
    }'''
    content = re.sub(old_pattern, new_code, content)
    
    old_pattern = r'this\.nextBtn\.addEventListener\(\'click\', \(e\) => \{ e\.stopPropagation\(\); this\.next\(\); \}\);'
    new_code = '''if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this.next(); });
    }'''
    content = re.sub(old_pattern, new_code, content)
    
    if content != original:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception as e:
            print(f"Error writing {filepath}: {e}")
            return False
    
    return False

def main():
    print("🔧 Mind Grace Website - Comprehensive Fix Script")
    print("=" * 60)
    
    # Find all HTML files
    html_files = find_files(['**/*.html'])
    print(f"\n📄 Found {len(html_files)} HTML files")
    
    # Process HTML files
    fixed_count = 0
    for filepath in html_files:
        rel_path = filepath.relative_to(WORKSPACE)
        if process_html_file(filepath):
            fixed_count += 1
            print(f"  ✓ Fixed: {rel_path}")
    
    print(f"\n✅ Fixed {fixed_count} HTML files")
    
    # Fix gallery.js
    gallery_js = WORKSPACE / 'assets/js/gallery.js'
    if gallery_js.exists():
        if fix_gallery_js(gallery_js):
            print(f"  ✓ Fixed: {gallery_js.relative_to(WORKSPACE)}")
    
    print("\n" + "=" * 60)
    print("✨ All fixes applied successfully!")
    print("\n⚠️  Note: Some issues require manual review:")
    print("   • Color contrast ratios (requires CSS changes)")
    print("   • Image optimization (requires image processing)")
    print("   • Content placeholders (requires content updates)")
    print("   • JSON-LD structured data validation")
    print("   • Heading hierarchy improvements")
    print("   • ARIA labels on SVG icons")

if __name__ == '__main__':
    main()
