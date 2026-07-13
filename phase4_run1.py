#!/usr/bin/env python3
"""
PHASE 4 Run 1 - Image Optimization Script
Tasks:
1. Replace .jpg and .png references with .webp in HTML, MD, CSS, JS files
2. Add lazy loading to images missing it
3. Update vendor paths from assets/js/lib/ to assets/vendor/
4. Add OpenGraph tags to pages missing them
5. Add structured data to dr-anita-sharma.html
"""

import os
import re
from pathlib import Path

WORKSPACE = "/workspace"

# Known WebP files that exist
WEBP_FILES = {
    "Dr_Anita_Sharma_Personal_Photo.webp",
    "Mind_Grace_Clinic_Logo.webp",
    "Mind_Grace_Clinic_Logo_Full_With_ClinicName.webp",
    "Location_street_view_near.webp",
    "Location_street_view_distance.webp",
    "Mind_Grace_Clinic_Brochure.webp",
    "AASHA_Child_Development_Brochure.webp",
    "Mind_Grace_Clinic_waiting_area.webp",
    "Mind_Grace_Clinic_waiting_area_2.webp",
    "mind-grace-consultation-room.webp",
    "mind-grace-small-room.webp",
    "mind-grace-therapy-room.webp",
    "aasha-occupational-therapy-junglejim-trampoline.webp",
    "aasha-occupational-therapy-lycra-junglejim.webp",
    "aasha-special-ed-abacus.webp",
    "aasha-special-ed-fruit-sort-closeup.webp",
    "aasha-special-ed-fruit-sort.webp",
    "aasha-special-ed-jigsaw.webp",
    "aasha-speech-english-alphabets.webp",
    "aasha-speech-english-alphabets-closeup.webp",
    "aasha-speech-hindi-varnmala.webp",
    "Gender_Dysphoria.webp",
    "Early_Intervention_Steps.webp",
    "Aasha_Early_Intervention_Phases.webp",
    "Aasha_Early_Intervention_Phases_Butterfly.webp",
    "booking-hero.webp",
    "og-default.webp",
}

# Files that should remain as .png (logos, icons)
PNG_KEEP = {
    "Mind_Grace_Clinic_Logo.png",
    "Mind_Grace_Clinic_Logo_Full.png",
    "AASHA_Child_Development_Brochure.png",
    "Mind_Grace_Clinic_Brochure.png",
    "Early_Intervention_Steps.png",
    "Aasha_Early_Intervention_Phases.png",
    "Aasha_Early_Intervention_Phases_Butterfly.png",
}

def get_all_files(extensions):
    """Get all files with specified extensions."""
    files = []
    for ext in extensions:
        for path in Path(WORKSPACE).rglob(f"*{ext}"):
            # Skip node_modules, .git, playwright-report
            if 'node_modules' not in str(path) and '.git' not in str(path) and 'playwright-report' not in str(path):
                files.append(str(path))
    return files

def replace_image_extensions(content, file_path):
    """Replace .jpg and .png with .webp where appropriate."""
    original = content
    
    # Pattern for image sources (src, href, content URLs)
    # Don't change .png for apple-touch-icon and logo files
    png_patterns_to_keep = [
        r'(href=["\']assets/images/Mind_Grace_Clinic_Logo\.png["\'])',
        r'(content=["\']https://mindgracencr\.in/assets/images/Mind_Grace_Clinic_Logo\.png["\'])',
    ]
    
    # First, temporarily protect PNG files that should stay
    protected = content
    for pattern in png_patterns_to_keep:
        protected = re.sub(pattern, r'PROTECTED_PNG_\1', protected)
    
    # Replace .jpg with .webp
    content = re.sub(r'\.jpg(?=["\')\s])', '.webp', content)
    
    # Replace .png with .webp (except protected ones)
    content = re.sub(r'\.png(?=["\')\s])', '.webp', content)
    
    # Restore protected PNGs
    content = re.sub(r'PROTECTED_PNG_(href=["\']assets/images/Mind_Grace_Clinic_Logo\.png["\'])', r'\1', content)
    content = re.sub(r'PROTECTED_PNG_(content=["\']https://mindgracencr\.in/assets/images/Mind_Grace_Clinic_Logo\.png["\'])', r'\1', content)
    
    # Also handle og-image.jpg -> should stay as is or become webp if exists
    # For now, leave og-image.jpg references as they might need special handling
    
    if content != original:
        print(f"  ✓ Updated image extensions in {file_path}")
        return content, True
    return content, False

def add_lazy_loading(content, file_path):
    """Add loading='lazy' to img tags missing it (except those with loading='eager' or fetchpriority='high')."""
    original = content
    changes = 0
    
    # Pattern to find img tags - simpler approach
    img_pattern = r'<img([^>]*)>'
    
    def add_lazy(match):
        nonlocal changes
        tag = match.group(0)
        attrs = match.group(1)
        
        # Skip if already has loading attribute
        if 'loading=' in tag:
            return tag
        
        # Skip if has fetchpriority="high" (these should be eager)
        if 'fetchpriority="high"' in tag or "fetchpriority='high'" in tag:
            return tag
        
        # Add loading="lazy" before closing >
        new_tag = tag[:-1] + ' loading="lazy"' + '>'
        
        changes += 1
        return new_tag
    
    content = re.sub(img_pattern, add_lazy, content, flags=re.IGNORECASE)
    
    if changes > 0:
        print(f"  ✓ Added lazy loading to {changes} images in {file_path}")
        return content, True
    return content, False

def update_vendor_paths(content, file_path):
    """Update paths from assets/js/lib/ to assets/vendor/."""
    original = content
    content = content.replace('assets/js/lib/', 'assets/vendor/')
    
    if content != original:
        print(f"  ✓ Updated vendor paths in {file_path}")
        return content, True
    return content, False

def get_opengraph_template(title, description, image="Dr_Anita_Sharma_Personal_Photo.webp"):
    """Generate OpenGraph meta tags."""
    url_map = {
        "404.html": "https://mindgracencr.in/404",
        "aasha.html": "https://mindgracencr.in/aasha",
        "approach.html": "https://mindgracencr.in/approach",
        "conditions.html": "https://mindgracencr.in/conditions",
        "consent.html": "https://mindgracencr.in/consent",
        "disclaimer.html": "https://mindgracencr.in/disclaimer",
        "dr-anita-sharma.html": "https://mindgracencr.in/dr-anita-sharma",
        "faq.html": "https://mindgracencr.in/faq",
        "gallery.html": "https://mindgracencr.in/gallery",
        "privacy.html": "https://mindgracencr.in/privacy",
        "resources.html": "https://mindgracencr.in/resources",
        "terms.html": "https://mindgracencr.in/terms",
        "testimonials.html": "https://mindgracencr.in/testimonials",
        "thank-you.html": "https://mindgracencr.in/thank-you",
    }
    
    filename = os.path.basename(file_path) if 'file_path' in dir() else "index.html"
    base_url = url_map.get(filename, "https://mindgracencr.in")
    
    return f'''    <!-- OpenGraph Meta Tags -->
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <meta property="og:image" content="https://mindgracencr.in/assets/images/{image}">
    <meta property="og:url" content="{base_url}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Mind Grace Neuropsychiatric Clinic">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{description}">
    <meta name="twitter:image" content="https://mindgracencr.in/assets/images/{image}">
'''

def add_opengraph_tags(content, file_path):
    """Add OpenGraph tags to pages missing them."""
    if '<meta property="og:' in content or '<meta name="twitter:' in content:
        return content, False
    
    # Extract title from page
    title_match = re.search(r'<title>([^<]+)</title>', content)
    page_title = title_match.group(1) if title_match else "Mind Grace Neuropsychiatric Clinic"
    
    # Clean up title for OG
    og_title = page_title.replace(" | Mind Grace", "").strip()
    
    # Generate description based on page type
    descriptions = {
        "404.html": "Page not found - Mind Grace Neuropsychiatric Clinic",
        "aasha.html": "Aasha Early Intervention - Comprehensive child development services including speech therapy, occupational therapy, and special education.",
        "approach.html": "Our integrated approach to mental health care combining psychiatric expertise with therapeutic support.",
        "conditions.html": "Comprehensive list of mental health conditions we treat including anxiety, depression, ADHD, autism, and more.",
        "consent.html": "Informed consent information for patients at Mind Grace Neuropsychiatric Clinic.",
        "disclaimer.html": "Medical disclaimer and important information about our services.",
        "dr-anita-sharma.html": "Dr. Anita Sharma - Senior Consultant Psychiatrist with 15+ years of experience in mental health care.",
        "faq.html": "Frequently asked questions about mental health services, appointments, and treatments.",
        "gallery.html": "Photo gallery of Mind Grace Clinic facilities and Aasha Early Intervention center.",
        "privacy.html": "Privacy policy detailing how we protect your personal and medical information.",
        "resources.html": "Mental health resources, guides, and educational materials for patients and families.",
        "terms.html": "Terms of service for Mind Grace Neuropsychiatric Clinic.",
        "testimonials.html": "Patient testimonials and success stories from Mind Grace Clinic.",
        "thank-you.html": "Thank you for contacting Mind Grace Neuropsychiatric Clinic.",
    }
    
    filename = os.path.basename(file_path)
    description = descriptions.get(filename, "Expert psychiatric and psychological care in Greater Noida.")
    
    # Determine appropriate image
    images = {
        "dr-anita-sharma.html": "Dr_Anita_Sharma_Personal_Photo.webp",
        "gallery.html": "Mind_Grace_Clinic_waiting_area.webp",
        "aasha.html": "AASHA_Child_Development_Brochure.webp",
    }
    image = images.get(filename, "Dr_Anita_Sharma_Personal_Photo.webp")
    
    og_tags = get_opengraph_template(og_title, description, image)
    
    # Find position after existing meta tags, before </head>
    head_match = re.search(r'</head>', content, re.IGNORECASE)
    if not head_match:
        return content, False
    
    insert_pos = head_match.start()
    
    # Find last meta tag before </head>
    meta_pattern = r'<meta[^>]*>'
    last_meta = None
    for match in re.finditer(meta_pattern, content[:insert_pos]):
        last_meta = match
    
    if last_meta:
        insert_pos = last_meta.end()
        # Add newline after last meta
        og_tags = "\n" + og_tags
    
    new_content = content[:insert_pos] + og_tags + content[insert_pos:]
    print(f"  ✓ Added OpenGraph tags to {file_path}")
    return new_content, True

def add_structured_data_dr_anita(content, file_path):
    """Add JSON-LD structured data to dr-anita-sharma.html."""
    if '"@type": "Physician"' in content or '"@type": "Person"' in content:
        return content, False
    
    structured_data = '''
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Dr. Anita Sharma",
      "jobTitle": "Senior Consultant Psychiatrist",
      "medicalSpecialty": ["Psychiatry", "Mental Health"],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Medical Degree",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Medical Council of India"
        }
      },
      "yearsOfExperience": "15+",
      "affiliation": {
        "@type": "MedicalOrganization",
        "name": "Mind Grace Neuropsychiatric Clinic",
        "url": "https://mindgracencr.in"
      },
      "knowsAbout": ["Anxiety Disorders", "Depression", "ADHD", "Autism Spectrum Disorder", "OCD", "PTSD", "Bipolar Disorder", "Schizophrenia", "Addiction Medicine", "Child Psychology"],
      "image": "https://mindgracencr.in/assets/images/Dr_Anita_Sharma_Personal_Photo.webp",
      "sameAs": [
        "https://www.linkedin.com/in/dr-anita-sharma-psychiatrist"
      ]
    }
    </script>
'''
    
    # Insert before </head>
    head_match = re.search(r'</head>', content, re.IGNORECASE)
    if not head_match:
        return content, False
    
    insert_pos = head_match.start()
    new_content = content[:insert_pos] + structured_data + content[insert_pos:]
    print(f"  ✓ Added structured data to {file_path}")
    return new_content, True

def process_file(file_path):
    """Process a single file with all transformations."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"  ✗ Error reading {file_path}: {e}")
        return False
    
    original = content
    changed = False
    
    # Task 1: Replace image extensions
    content, task1_changed = replace_image_extensions(content, file_path)
    changed = changed or task1_changed
    
    # Task 2: Add lazy loading (HTML files only)
    if file_path.endswith('.html'):
        content, task2_changed = add_lazy_loading(content, file_path)
        changed = changed or task2_changed
        
        # Task 3: Update vendor paths
        content, task3_changed = update_vendor_paths(content, file_path)
        changed = changed or task3_changed
        
        # Task 4: Add OpenGraph tags (specific pages only)
        og_pages = ["404.html", "aasha.html", "approach.html", "conditions.html", 
                    "consent.html", "disclaimer.html", "dr-anita-sharma.html", 
                    "faq.html", "gallery.html", "privacy.html", "resources.html", 
                    "terms.html", "testimonials.html", "thank-you.html"]
        if os.path.basename(file_path) in og_pages:
            content, task4_changed = add_opengraph_tags(content, file_path)
            changed = changed or task4_changed
        
        # Task 5: Add structured data to dr-anita-sharma.html
        if os.path.basename(file_path) == "dr-anita-sharma.html":
            content, task5_changed = add_structured_data_dr_anita(content, file_path)
            changed = changed or task5_changed
    
    # Write back if changed
    if changed:
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception as e:
            print(f"  ✗ Error writing {file_path}: {e}")
            return False
    
    return False

def main():
    print("=" * 60)
    print("PHASE 4 Run 1 - Image Optimization & Enhancements")
    print("=" * 60)
    
    # Get all relevant files
    html_files = get_all_files(['.html'])
    md_files = get_all_files(['.md'])
    js_files = get_all_files(['.js'])
    css_files = get_all_files(['.css'])
    
    all_files = html_files + md_files + js_files + css_files
    
    print(f"\nFound {len(all_files)} files to process:")
    print(f"  - HTML: {len(html_files)}")
    print(f"  - MD: {len(md_files)}")
    print(f"  - JS: {len(js_files)}")
    print(f"  - CSS: {len(css_files)}")
    
    processed = 0
    changed_count = 0
    
    print("\nProcessing files...")
    for file_path in all_files:
        processed += 1
        if process_file(file_path):
            changed_count += 1
        
        # Progress indicator
        if processed % 20 == 0:
            print(f"  Processed {processed}/{len(all_files)} files...")
    
    print("\n" + "=" * 60)
    print(f"SUMMARY:")
    print(f"  Total files processed: {processed}")
    print(f"  Files modified: {changed_count}")
    print("=" * 60)

if __name__ == "__main__":
    main()
