#!/bin/bash

# Migration script to convert HTML files to Astro pages
# This is the bash equivalent of the PowerShell script

for file in *.html; do
    # Skip index.html
    if [ "$file" = "index.html" ]; then
        continue
    fi
    
    # Extract filename without extension
    basename="${file%.html}"
    
    # Extract content between <main> and </main> tags
    main_content=$(sed -n '/<main[^>]*>/,/<\/main>/p' "$file" | sed '1s/.*<main[^>]*>//; $s/<\/main>.*//')
    
    # Trim whitespace
    main_content=$(echo "$main_content" | sed '/^[[:space:]]*$/d' | sed '1{/^[[:space:]]*$/d}' | sed '${/^[[[:space:]]*$/d}')
    
    # Create the Astro file
    cat > "src/pages/${basename}.astro" << ASTRO_EOF
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout>
${main_content}
</BaseLayout>
ASTRO_EOF
    
    echo "Migrated: $file -> src/pages/${basename}.astro"
done

echo "Migration complete!"
