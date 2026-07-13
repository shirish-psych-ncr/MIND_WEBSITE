#!/usr/bin/env python3
"""
PHASE 4 Run 3: Add BlogPosting structured data to all blog article pages
Replaces generic Article schema with proper BlogPosting schema
"""

import os
import re
import json
from pathlib import Path

def extract_blog_metadata(html_content):
    """Extract metadata from blog HTML file"""
    metadata = {}
    
    # Extract title
    title_match = re.search(r'<title>([^<]+)</title>', html_content)
    metadata['title'] = title_match.group(1) if title_match else ''
    
    # Extract meta description
    desc_match = re.search(r'<meta name="description" content="([^"]+)"', html_content)
    metadata['description'] = desc_match.group(1) if desc_match else ''
    
    # Extract blog metadata
    blog_title_match = re.search(r'<meta name="blog-title" content="([^"]+)"', html_content)
    metadata['blog_title'] = blog_title_match.group(1) if blog_title_match else metadata['title']
    
    blog_desc_match = re.search(r'<meta name="blog-description" content="([^"]+)"', html_content)
    metadata['blog_description'] = blog_desc_match.group(1) if blog_desc_match else metadata['description']
    
    blog_date_match = re.search(r'<meta name="blog-date" content="([^"]+)"', html_content)
    metadata['date'] = blog_date_match.group(1) if blog_date_match else '2026-03-23'
    
    blog_tags_match = re.search(r'<meta name="blog-tags" content="([^"]+)"', html_content)
    tags = blog_tags_match.group(1) if blog_tags_match else ''
    metadata['tags'] = [tag.strip() for tag in tags.split(',')] if tags else []
    
    # Determine category from path
    if '/adult/' in html_file:
        metadata['category'] = 'Adult Mental Health'
        metadata['category_url'] = 'https://mindgracencr.in/blog/adult.html'
    elif '/child/' in html_file:
        metadata['category'] = 'Child Development'
        metadata['category_url'] = 'https://mindgracencr.in/blog/children.html'
    else:
        metadata['category'] = 'Blog'
        metadata['category_url'] = 'https://mindgracencr.in/blog/index.html'
    
    return metadata

def create_blogposting_schema(metadata, url):
    """Create BlogPosting JSON-LD schema"""
    schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": metadata['blog_title'],
        "description": metadata['blog_description'],
        "author": {
            "@type": "Person",
            "name": "Dr Anita Sharma",
            "jobTitle": "Consultant Psychiatrist",
            "medicalSpecialty": "Psychiatry"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Mind Grace Neuropsychiatric Clinic",
            "url": "https://mindgracencr.in/",
            "logo": {
                "@type": "ImageObject",
                "url": "https://mindgracencr.in/assets/images/mind-grace-logo.webp"
            }
        },
        "datePublished": metadata['date'],
        "dateModified": metadata['date'],
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        },
        "url": url,
        "inLanguage": "en-IN",
        "articleSection": metadata['category']
    }
    
    # Add keywords if available
    if metadata['tags']:
        schema['keywords'] = ', '.join(metadata['tags'])
    
    # Add image if available (default blog OG image)
    schema['image'] = {
        "@type": "ImageObject",
        "url": "https://mindgracencr.in/assets/images/blog-og-default.webp",
        "width": 1200,
        "height": 630
    }
    
    return schema

def create_breadcrumb_schema(url, category_name):
    """Create BreadcrumbList schema"""
    # Determine breadcrumb based on category
    if 'adult' in url:
        items = [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://mindgracencr.in/"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://mindgracencr.in/blog/index.html"},
            {"@type": "ListItem", "position": 3, "name": "Adult Mental Health", "item": "https://mindgracencr.in/blog/adult.html"},
            {"@type": "ListItem", "position": 4, "name": category_name, "item": url}
        ]
    elif 'child' in url:
        items = [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://mindgracencr.in/"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://mindgracencr.in/blog/index.html"},
            {"@type": "ListItem", "position": 3, "name": "Child Development", "item": "https://mindgracencr.in/blog/children.html"},
            {"@type": "ListItem", "position": 4, "name": category_name, "item": url}
        ]
    else:
        items = [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://mindgracencr.in/"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://mindgracencr.in/blog/index.html"},
            {"@type": "ListItem", "position": 3, "name": category_name, "item": url}
        ]
    
    return {
        "@type": "BreadcrumbList",
        "@id": f"{url}#breadcrumb",
        "itemListElement": items
    }

def process_blog_file(filepath):
    """Process a single blog HTML file"""
    global html_file  # Use global variable for path extraction
    
    html_file = str(filepath)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract metadata
    metadata = extract_blog_metadata(content)
    
    # Get URL from canonical or construct from path
    canonical_match = re.search(r'<link rel="canonical" href="([^"]+)"', content)
    url = canonical_match.group(1) if canonical_match else f"https://mindgracencr.in/{filepath}"
    
    # Create schemas
    blogposting_schema = create_blogposting_schema(metadata, url)
    
    # Extract page title for breadcrumb
    page_title_match = re.search(r'<title>([^|]+)', content)
    page_title = page_title_match.group(1).strip() if page_title_match else 'Article'
    
    breadcrumb_schema = create_breadcrumb_schema(url, page_title)
    
    # Combine schemas
    combined_schema = [blogposting_schema, breadcrumb_schema]
    
    # Create new script tag
    new_schema_script = f'''    <script type="application/ld+json">
      {json.dumps(combined_schema, indent=8)}
    </script>'''
    
    # Find and replace existing schema block
    # Pattern to match existing schema script block
    old_schema_pattern = r'<!-- SCHEMA -->\s*<script type="application/ld\+json">\s*\{[\s\S]*?</script>\s*\n'
    
    if re.search(old_schema_pattern, content):
        # Replace existing schema
        new_content = re.sub(old_schema_pattern, f'<!-- SCHEMA -->\n{new_schema_script}\n', content)
    else:
        # If no schema found, insert before </head>
        new_content = content.replace('</head>', f'{new_schema_script}\n</head>')
    
    # Write updated content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✓ Updated: {filepath}")
    return True

def main():
    base_dir = Path('/workspace')
    blog_dirs = [
        base_dir / 'blog' / 'pages' / 'adult',
        base_dir / 'blog' / 'pages' / 'child'
    ]
    
    updated_count = 0
    
    for blog_dir in blog_dirs:
        if not blog_dir.exists():
            print(f"Directory not found: {blog_dir}")
            continue
        
        html_files = list(blog_dir.glob('*.html'))
        print(f"\nProcessing {len(html_files)} files in {blog_dir}")
        
        for html_file in html_files:
            try:
                if process_blog_file(html_file):
                    updated_count += 1
            except Exception as e:
                print(f"✗ Error processing {html_file}: {e}")
    
    print(f"\n{'='*60}")
    print(f"PHASE 4 Run 3 Complete: {updated_count} blog files updated with BlogPosting schema")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
