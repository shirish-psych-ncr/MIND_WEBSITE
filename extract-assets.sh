#!/bin/bash

# Asset Extraction Script for Mind Grace Clinic
# Extracts inline <style> and <script> blocks to external files

echo "Starting asset extraction..."

# Create directories
mkdir -p /workspace/css-tools
mkdir -p /workspace/js/tools

# Files with inline styles
declare -A STYLE_FILES=(
    ["butterfly-tapper"]="tools-butterfly"
    ["guided-breathing"]="tools-breathing"
    ["eye-movement"]="tools-eye"
    ["leaf-on-stream"]="tools-leaf"
    ["horizon-scan"]="tools-horizon"
    ["hypnos-fractal"]="tools-fractal"
    ["book"]="tools-book"
)

# Files with inline scripts that need extraction
declare -A SCRIPT_FILES=(
    ["butterfly-tapper"]="tools-butterfly"
    ["guided-breathing"]="tools-breathing"
    ["eye-movement"]="tools-eye"
    ["leaf-on-stream"]="tools-leaf"
    ["horizon-scan"]="tools-horizon"
    ["hypnos-fractal"]="tools-fractal"
    ["book"]="tools-book"
    ["location"]="tools-location"
)

echo "Directories created. Ready for extraction."
