#!/usr/bin/env python3
"""Add <meta name="google" content="notranslate"> to every HTML page so the
Google Translate toolbar/banner never appears; our own header picker drives
the widget instead. Idempotent."""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
META = '<meta name="google" content="notranslate">\n'
changed = 0
for path in sorted(ROOT.rglob("*.html")):
    rel = str(path.relative_to(ROOT))
    if rel.startswith(("node_modules/", "output/")):
        continue
    text = path.read_text(encoding="utf-8")
    if 'content="notranslate"' in text:
        continue
    m = list(re.finditer(r"</head>", text, flags=re.IGNORECASE))
    if not m:
        print(f"WARN no </head>: {rel}", file=sys.stderr)
        continue
    idx = m[-1].start()
    path.write_text(text[:idx] + META + text[idx:], encoding="utf-8")
    changed += 1
print(f"updated {changed}")
