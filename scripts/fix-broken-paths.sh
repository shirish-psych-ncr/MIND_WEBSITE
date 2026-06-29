#!/bin/bash
# Fix broken path patterns from previous sed operations

set -e

echo "🔧 Fixing broken path patterns..."

# Fix href="./>  to href="./"
find . -type f -name "*.html" ! -path "./_legacy/*" ! -path "./.git/*" -exec sed -i 's|href="./>"|href="./"|g' {} \;
echo "  ✓ Fixed href=\"./>\" patterns"

# Fix href="./> to href="./ (without closing quote issue)
find . -type f -name "*.html" ! -path "./_legacy/*" ! -path "./.git/*" -exec sed -i 's|href="./>|href="./"|g' {} \;
echo "  ✓ Fixed href=\"./> patterns"

# Fix src="./"res/ to src="./res/
find . -type f -name "*.html" ! -path "./_legacy/*" ! -path "./.git/*" -exec sed -i 's|src="./"|src="./|g' {} \;
echo "  ✓ Fixed src=\"./\" patterns"

# Fix href="./book.html to href="./book.html"
find . -type f -name "*.html" ! -path "./_legacy/*" ! -path "./.git/*" -exec sed -i 's|href="./\([a-zA-Z]|href="./\1|g' {} \;
echo "  ✓ Fixed missing closing quotes"

echo ""
echo "✅ Path fixes complete!"
