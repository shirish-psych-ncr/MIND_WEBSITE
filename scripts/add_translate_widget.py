#!/usr/bin/env python3
"""Idempotently add the Google Translate widget assets to every HTML page.

Inserts, right before </head>:
  <link rel="stylesheet" href="/assets/css/translate.css">
  <script defer src="/assets/js/translate.js"></script>

Skips utility pages that have no header (404.html, offline.html, thank-you.html).
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SKIP = {"404.html", "offline.html", "thank-you.html"}

CSS_TAG = '<link rel="stylesheet" href="/assets/css/translate.css">'
JS_TAG = '<script defer src="/assets/js/translate.js"></script>'
INJECT = CSS_TAG + "\n" + JS_TAG + "\n"

changed = 0
total = 0
for path in sorted(ROOT.rglob("*.html")):
    rel = str(path.relative_to(ROOT))
    if rel.startswith(("node_modules/", "output/")):
        continue
    total += 1
    if path.name in SKIP and "/" not in rel:
        continue
    text = path.read_text(encoding="utf-8")
    if "assets/js/translate.js" in text:
        continue
    m = list(re.finditer(r"</head>", text, flags=re.IGNORECASE))
    if not m:
        print(f"WARN no </head>: {rel}", file=sys.stderr)
        continue
    idx = m[-1].start()
    # Preserve indentation of preceding line if any; simple newline insert is fine.
    new = text[:idx] + INJECT + text[idx:]
    path.write_text(new, encoding="utf-8")
    changed += 1

print(f"Scanned {total} HTML files; updated {changed}.")
