#!/bin/bash
echo "=== HTML Modernization Status Check ==="
echo ""
echo "1. Orientation warnings removed:"
orientation_count=$(grep -r "orientation-warning\|orientation-adapter\|orientation-guard" /workspace --include="*.html" | grep -v node_modules | wc -l)
echo "   Found: $orientation_count (should be 0)"
echo ""

echo "2. Files with fetchpriority attribute:"
fetchpriority_count=$(grep -r "fetchpriority" /workspace --include="*.html" | grep -v node_modules | wc -l)
echo "   Found: $fetchpriority_count files"
echo ""

echo "3. Files with loading attribute on images:"
loading_count=$(grep -r "loading=\"lazy\"\|loading=\"eager\"" /workspace --include="*.html" | grep -v node_modules | wc -l)
echo "   Found: $loading_count files"
echo ""

echo "4. Files with defer/async scripts:"
defer_count=$(grep -r "defer>\|async>" /workspace --include="*.html" | grep -v node_modules | wc -l)
echo "   Found: $defer_count files"
echo ""

echo "5. Files with preconnect:"
preconnect_count=$(grep -r "preconnect" /workspace --include="*.html" | grep -v node_modules | wc -l)
echo "   Found: $preconnect_count files"
echo ""

echo "6. Total HTML files:"
total_html=$(find /workspace -name "*.html" -type f | grep -v node_modules | wc -l)
echo "   Total: $total_html"
