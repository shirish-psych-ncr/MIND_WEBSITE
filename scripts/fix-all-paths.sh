#!/bin/bash
# Fix all absolute paths to relative paths for local file:// compatibility
# This ensures the website works both on GitHub Pages and when opened locally

set -e

echo "🔧 Fixing all absolute paths to relative paths..."

# Find all HTML files and fix href and src attributes
find . -type f -name "*.html" ! -path "./_legacy/*" ! -path "./.git/*" | while read -r file; do
    echo "Processing: $file"
    
    # Create backup
    cp "$file" "$file.bak"
    
    # Fix href="/ to href="./ (using | as delimiter to avoid conflicts)
    sed -i 's|href="/|href="./|g' "$file"
    
    # Fix src="/ to src="./
    sed -i 's|src="/|src="./|g' "$file"
    
    # Fix href="./>" back to href="/" (for root links that became incorrect)
    sed -i 's|href="./>"|href="/">|g' "$file"
    
    # Fix manifest path
    sed -i 's|href="./site.webmanifest"|href="site.webmanifest"|g' "$file"
    
    # Fix canonical URLs (keep absolute for SEO)
    sed -i 's|href="./https:|href="https:|g' "$file"
    
    # Clean up any double ././
    sed -i 's|\./\./|\./|g' "$file"
    
    echo "  ✓ Fixed: $file"
done

echo ""
echo "✅ All paths fixed successfully!"
echo ""
echo "Summary of changes:"
echo "  - Absolute paths (/path) converted to relative (./path)"
echo "  - Root links (/) preserved for navigation"
echo "  - External URLs (https://) preserved"
echo "  - Manifest paths corrected"
echo ""
echo "Backup files created with .bak extension"
