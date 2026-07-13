#!/usr/bin/env python3
"""
PHASE 4 RUN 2: Add srcset to hero images
For pages with fetchpriority="high" images, add appropriate srcset attributes
"""

import re
from pathlib import Path

def get_image_size(image_path):
    """Get image file size in KB"""
    try:
        size_bytes = Path(image_path).stat().st_size
        return size_bytes / 1024  # Convert to KB
    except:
        return 0

def find_hero_images():
    """Find all HTML files with fetchpriority='high' images"""
    hero_images = []
    
    for html_file in Path(".").glob("*.html"):
        if "node_modules" in str(html_file) or "playwright-report" in str(html_file):
            continue
        
        try:
            content = html_file.read_text(encoding='utf-8')
            # Find images with fetchpriority="high"
            matches = re.finditer(
                r'<img[^>]*fetchpriority="high"[^>]*>',
                content,
                re.IGNORECASE
            )
            
            for match in matches:
                img_tag = match.group(0)
                if 'srcset=' not in img_tag:
                    # Extract src
                    src_match = re.search(r'src="([^"]+)"', img_tag)
                    if src_match:
                        src = src_match.group(1)
                        hero_images.append({
                            'file': html_file,
                            'tag': img_tag,
                            'src': src,
                            'position': match.start()
                        })
        except Exception as e:
            print(f"Error processing {html_file}: {e}")
    
    return hero_images

def create_srcset(src):
    """Create srcset attribute based on available image sizes"""
    # For now, just use the same image (single size)
    # In production, you'd have multiple sizes like:
    # image-400.webp 400w, image-800.webp 800w, image-1200.webp 1200w
    
    if not src:
        return None
    
    # Check if it's a webp file
    if '.webp' in src:
        return f'srcset="{src}"'
    
    # If it's not webp, check if webp version exists
    base_path = src.rsplit('.', 1)[0]
    webp_path = f"{base_path}.webp"
    if Path(webp_path).exists():
        return f'srcset="{webp_path}" type="image/webp"'
    
    return None

def add_srcset_to_html():
    """Add srcset attributes to hero images missing them"""
    print("=== ADDING SRCSET TO HERO IMAGES ===\n")
    
    hero_images = find_hero_images()
    print(f"Found {len(hero_images)} hero images without srcset\n")
    
    updated_count = 0
    
    for img_info in hero_images:
        html_file = img_info['file']
        old_tag = img_info['tag']
        src = img_info['src']
        
        # Create srcset
        srcset = create_srcset(src)
        
        if srcset:
            # Add srcset before the closing >
            new_tag = old_tag.rstrip('>')
            if 'type=' in srcset:
                # Handle source tag style with type
                new_tag += f' {srcset}>'
            else:
                new_tag += f' {srcset}>'
            
            # Read file and replace
            try:
                content = html_file.read_text(encoding='utf-8')
                new_content = content.replace(old_tag, new_tag, 1)
                
                if new_content != content:
                    html_file.write_text(new_content, encoding='utf-8')
                    print(f"✓ Updated {html_file.name}")
                    print(f"  Image: {src}")
                    print(f"  Added: {srcset}\n")
                    updated_count += 1
            except Exception as e:
                print(f"✗ Failed to update {html_file.name}: {e}")
        else:
            print(f"○ Skipped {html_file.name} - no suitable srcset for: {src}")
    
    print(f"\n=== SUMMARY ===")
    print(f"Updated {updated_count} files with srcset attributes")

if __name__ == "__main__":
    add_srcset_to_html()
