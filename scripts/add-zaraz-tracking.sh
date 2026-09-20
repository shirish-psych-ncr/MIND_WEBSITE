#!/bin/bash
# Mind Grace - Bulk Add Zaraz Tracking Script
# Adds zaraz-tracking.js to all HTML pages missing it

set -e

SCRIPT_DIR="/workspace"
TRACKING_SCRIPT='<script defer src="/assets/js/zaraz-tracking.js"></script>'

# Find all HTML files
HTML_FILES=$(find "$SCRIPT_DIR" -path "$SCRIPT_DIR/.git" -prune -o -name "*.html" -type f -print | grep -v "^$SCRIPT_DIR/.git")

COUNT_ADDED=0
COUNT_EXISTING=0

for file in $HTML_FILES; do
    if grep -q "zaraz-tracking.js" "$file"; then
        COUNT_EXISTING=$((COUNT_EXISTING + 1))
    else
        # Add tracking script before </head>
        sed -i "s|</head>|${TRACKING_SCRIPT}\n</head>|" "$file"
        COUNT_ADDED=$((COUNT_ADDED + 1))
        echo "✓ Added tracking to: $(basename $file)"
    fi
done

echo ""
echo "==================================="
echo "Zaraz Tracking Installation Complete"
echo "==================================="
echo "Pages with tracking: $((COUNT_EXISTING + COUNT_ADDED))"
echo "Newly added: $COUNT_ADDED"
echo "Already had tracking: $COUNT_EXISTING"
echo ""
echo "Next steps:"
echo "1. Configure triggers in Zaraz dashboard"
echo "2. Test with Debug Mode enabled"
echo "3. Deploy to Cloudflare Pages"
