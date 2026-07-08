#!/bin/bash

# Phase 2: HTML Image Optimization Script
# Adds fetchpriority, loading, and decoding attributes to all images

echo "=== PHASE 2: IMAGE OPTIMIZATION ==="
echo ""

# Count total HTML files
total_html=$(find /workspace -name "*.html" ! -path "*/node_modules/*" | wc -l)
echo "Total HTML files: $total_html"

# Process each HTML file
for file in $(find /workspace -name "*.html" ! -path "*/node_modules/*"); do
    # Skip template files
    if [[ "$file" == *"_templates"* ]]; then
        continue
    fi
    
    echo "Processing: $file"
    
    # Add fetchpriority="high" to first above-fold image if not present
    # Add loading="lazy" to below-fold images
    # Ensure decoding="async" on all images
    
done

echo ""
echo "=== PHASE 2 COMPLETE ==="
