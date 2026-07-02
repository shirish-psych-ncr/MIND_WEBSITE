#!/bin/bash
# Fix all src paths for images and scripts

cd /workspace

# Fix app.js references in blog files
sed -i 's|src="\.\./app\.js"|src="/_legacy/app.js"|g' /workspace/blog/adult.html
sed -i 's|src="\.\./app\.js"|src="/_legacy/app.js"|g' /workspace/blog/child.html
sed -i 's|src="\.\./app\.js"|src="/_legacy/app.js"|g' /workspace/blog/index.html

# Fix deep nested blog pages
for file in /workspace/blog/pages/adult/*.html /workspace/blog/pages/child/*.html; do
    echo "Fixing src in: $file"
    
    # Fix app.js (3 levels up)
    sed -i 's|src="\.\./\.\./\.\./app\.js"|src="/_legacy/app.js"|g' "$file"
    
    # Fix image paths in res/ (3 levels up)
    sed -i 's|src="\.\./\.\./\.\./res/|src="/res/|g' "$file"
done

echo "Src path fixes complete!"
