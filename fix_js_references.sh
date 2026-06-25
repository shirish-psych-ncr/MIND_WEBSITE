#!/bin/bash

# Fix JavaScript references across all HTML files
# This script ensures all extracted JS modules are properly referenced

echo "Fixing JavaScript references..."

# Tool pages - ensure they have their specific JS modules
declare -A tool_pages=(
    ["butterfly-tapper.html"]="js/tools-butterfly.js"
    ["guided-breathing.html"]="js/tools-breathing.js"
    ["eye-movement.html"]="js/tools-eye.js"
    ["hypnos-fractal.html"]="js/tools-fractal.js"
    ["horizon-scan.html"]="js/tools-horizon.js"
    ["leaf-on-stream.html"]="js/tools-leaf.js"
    ["book.html"]="js/tools-book.js"
    ["location.html"]="js/tools-map.js"
)

for page in "${!tool_pages[@]}"; do
    if [ -f "/workspace/$page" ]; then
        js_file="${tool_pages[$page]}"
        if ! grep -q "$js_file" "/workspace/$page"; then
            # Add the script reference before closing body tag
            sed -i "s|</body>|    <script src=\"$js_file\"></script>\n  </body>|g" "/workspace/$page"
            echo "✓ Added $js_file to $page"
        else
            echo "✓ $page already has $js_file"
        fi
    fi
done

# Ensure main pages have app.js
main_pages=(
    "index.html"
    "about.html"
    "services.html"
    "conditions.html"
    "process.html"
    "resources.html"
    "faq.html"
    "contact.html"
    "gallery.html"
    "testimonials.html"
    "fees.html"
    "emergency.html"
    "consent.html"
    "privacy.html"
    "thank-you.html"
    "doctor.html"
    "mind-grace.html"
    "aasha.html"
    "approach.html"
)

for page in "${main_pages[@]}"; do
    if [ -f "/workspace/$page" ]; then
        if ! grep -q "app.js" "/workspace/$page"; then
            sed -i "s|</body>|    <script src=\"app.js\"></script>\n  </body>|g" "/workspace/$page"
            echo "✓ Added app.js to $page"
        else
            echo "✓ $page already has app.js"
        fi
    fi
done

# Blog pages
blog_pages=(
    "blog/index.html"
    "blog/adult.html"
    "blog/children.html"
    "blog/adult-mental-health-template.html"
    "blog/child-development-template.html"
)

for page in "${blog_pages[@]}"; do
    if [ -f "/workspace/$page" ]; then
        if ! grep -q "../app.js" "/workspace/$page"; then
            sed -i "s|</body>|    <script src=\"../app.js\"></script>\n  </body>|g" "/workspace/$page"
            echo "✓ Added ../app.js to $page"
        else
            echo "✓ $page already has ../app.js"
        fi
        
        # Add blog config scripts where needed
        if [[ "$page" == *"adult"* ]] && ! grep -q "blog-config-adult.js" "/workspace/$page"; then
            sed -i "s|</body>|    <script src=\"../js/blog-config-adult.js\"></script>\n  </body>|g" "/workspace/$page"
            echo "✓ Added blog-config-adult.js to $page"
        elif [[ "$page" == *"child"* ]] && ! grep -q "blog-config-child.js" "/workspace/$page"; then
            sed -i "s|</body>|    <script src=\"../js/blog-config-child.js\"></script>\n  </body>|g" "/workspace/$page"
            echo "✓ Added blog-config-child.js to $page"
        fi
    fi
done

echo ""
echo "JavaScript reference fix complete!"
