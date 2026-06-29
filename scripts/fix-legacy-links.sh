#!/bin/bash
# Fix legacy links that weren't caught by the first pass

cd /workspace

# Fix blog/adult.html and blog/child.html - they reference ../styles.css
sed -i 's|href="\.\./styles\.css"|href="/_legacy/styles.css"|g' /workspace/blog/adult.html
sed -i 's|href="\.\./styles\.css"|href="/_legacy/styles.css"|g' /workspace/blog/child.html

# Fix deep nested blog pages that still have relative paths
for file in /workspace/blog/pages/adult/*.html /workspace/blog/pages/child/*.html; do
    echo "Fixing: $file"
    
    # Fix CSS references
    sed -i 's|href="\.\./\.\./\.\./styles\.css"|href="/_legacy/styles.css"|g' "$file"
    
    # Fix index.html references  
    sed -i 's|href="\.\./\.\./index\.html"|href="/blog/"|g' "$file"
    sed -i 's|href="\.\./\.\./\.\./index\.html"|href="/\"|g' "$file"
    
    # Fix main page references (3 levels up)
    for page in about services process resources location contact book conditions faq gallery fees testimonials emergency privacy consent aasha doctor approach thank-you; do
        sed -i "s|href=\"\.\./\.\./\.\./${page}\.html\"|href=\"/${page}.html\"|g" "$file"
    done
    
    # Fix blog index references (2 levels up)
    sed -i 's|href="\.\./\.\./index\.html"|href="/blog/"|g' "$file"
    
done

echo "Legacy link fixes complete!"
