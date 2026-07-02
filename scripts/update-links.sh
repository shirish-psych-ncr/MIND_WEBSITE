#!/bin/bash
# Update all HTML files to use consistent root-relative paths for GitHub Pages

cd /workspace

# List of all HTML files to update (excluding legacy and templates)
HTML_FILES=$(find . -name "*.html" -type f | grep -v "_legacy" | grep -v "_templates")

for file in $HTML_FILES; do
    echo "Processing: $file"
    
    # Replace href="index.html" with href="/"
    sed -i 's/href="index\.html"/href="\//g' "$file"
    sed -i 's/href="\.\/index\.html"/href="\//g' "$file"
    sed -i 's/href="\.\.\/index\.html"/href="\//g' "$file"
    
    # Main pages - root relative
    for page in about services process resources location contact book conditions faq gallery fees testimonials emergency privacy consent aasha doctor approach thank-you; do
        sed -i "s/href=\"${page}\.html\"/href=\"\/${page}.html\"/g" "$file"
        sed -i "s/href=\"\.\/${page}\.html\"/href=\"\/${page}.html\"/g" "$file"
        sed -i "s/href=\"\.\.\/${page}\.html\"/href=\"\/${page}.html\"/g" "$file"
    done
    
    # Blog index
    sed -i 's/href="blog\/index\.html"/href="\/blog\/"/g' "$file"
    sed -i 's/href="\.\.\/blog\/index\.html"/href="\/blog\/"/g' "$file"
    
    # Blog category pages
    sed -i 's/href="blog\/adult\.html"/href="\/blog\/adult\/"/g' "$file"
    sed -i 's/href="\.\.\/blog\/adult\.html"/href="\/blog\/adult\/"/g' "$file"
    sed -i 's/href="blog\/child\.html"/href="\/blog\/child\/"/g' "$file"
    sed -i 's/href="\.\.\/blog\/child\.html"/href="\/blog\/child\/"/g' "$file"
    
    # Blog article pages - adult
    sed -i 's|href="blog/pages/adult/overthinking-vs-anxiety\.html"|href="/blog/adult/overthinking-vs-anxiety/"|g' "$file"
    sed -i 's|href="\.\./blog/pages/adult/overthinking-vs-anxiety\.html"|href="/blog/adult/overthinking-vs-anxiety/"|g' "$file"
    sed -i 's|href="blog/pages/adult/scheduled-worry-time-technique\.html"|href="/blog/adult/scheduled-worry-time-technique/"|g' "$file"
    sed -i 's|href="\.\./blog/pages/adult/scheduled-worry-time-technique\.html"|href="/blog/adult/scheduled-worry-time-technique/"|g' "$file"
    sed -i 's|href="blog/pages/adult/sleep-and-anxiety-cycle\.html"|href="/blog/adult/sleep-and-anxiety-cycle/"|g' "$file"
    sed -i 's|href="\.\./blog/pages/adult/sleep-and-anxiety-cycle\.html"|href="/blog/adult/sleep-and-anxiety-cycle/"|g' "$file"
    sed -i 's|href="blog/pages/adult/stimulus-control-therapy\.html"|href="/blog/adult/stimulus-control-therapy/"|g' "$file"
    sed -i 's|href="\.\./blog/pages/adult/stimulus-control-therapy\.html"|href="/blog/adult/stimulus-control-therapy/"|g' "$file"
    sed -i 's|href="blog/pages/adult/when-to-see-a-psychiatrist\.html"|href="/blog/adult/when-to-see-a-psychiatrist/"|g' "$file"
    sed -i 's|href="\.\./blog/pages/adult/when-to-see-a-psychiatrist\.html"|href="/blog/adult/when-to-see-a-psychiatrist/"|g' "$file"
    
    # Blog article pages - child
    sed -i 's|href="blog/pages/child/early-signs-of-autism\.html"|href="/blog/child/early-signs-of-autism/"|g' "$file"
    sed -i 's|href="\.\./blog/pages/child/early-signs-of-autism\.html"|href="/blog/child/early-signs-of-autism/"|g' "$file"
    sed -i 's|href="blog/pages/child/school-concerns-and-adhd\.html"|href="/blog/child/school-concerns-and-adhd/"|g' "$file"
    sed -i 's|href="\.\./blog/pages/child/school-concerns-and-adhd\.html"|href="/blog/child/school-concerns-and-adhd/"|g' "$file"
    sed -i 's|href="blog/pages/child/sensory-overload-at-home\.html"|href="/blog/child/sensory-overload-at-home/"|g' "$file"
    sed -i 's|href="\.\./blog/pages/child/sensory-overload-at-home\.html"|href="/blog/child/sensory-overload-at-home/"|g' "$file"
    sed -i 's|href="blog/pages/child/speech-delay-red-flags\.html"|href="/blog/child/speech-delay-red-flags/"|g' "$file"
    sed -i 's|href="\.\./blog/pages/child/speech-delay-red-flags\.html"|href="/blog/child/speech-delay-red-flags/"|g' "$file"
    
    # CSS paths
    sed -i 's/href="css\//href="\/css\//g' "$file"
    sed -i 's/href="\.\.\/css\//href="\/css\//g' "$file"
    
    # JS paths
    sed -i 's/src="js\//src="\/js\//g' "$file"
    sed -i 's/src="\.\.\/js\//src="\/js\//g' "$file"
    
    # Image paths (res/)
    sed -i 's/src="res\//src="\/res\//g' "$file"
    sed -i 's/src="\.\.\/res\//src="\/res\//g' "$file"
    sed -i 's/src="\.\.\/\.\.\/res\//src="\/res\//g' "$file"
    
done

echo "Link updates complete!"
