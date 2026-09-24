#!/usr/bin/env python3
"""
Add <script defer src="/assets/js/amplitude-analytics.js"></script> to every
HTML page in the repo, just before </head>.

Idempotent: skips files that already reference amplitude-analytics.js.
Run from repo root:  python3 scripts/add_amplitude_script.py
"""
import pathlib
import re
import sys

TAG = (
    '<!-- Amplitude Analytics (Browser SDK v3.19.0 — Zoning Insights ready) -->\n'
    '<script defer src="/assets/js/amplitude-analytics.js"></script>\n'
)

def main() -> int:
    root = pathlib.Path(__file__).resolve().parent.parent
    html_files = sorted(p for p in root.rglob("*.html") if ".git" not in p.parts)
    added, skipped, missing_head = [], [], []

    for path in html_files:
        text = path.read_text(encoding="utf-8")
        if "amplitude-analytics.js" in text:
            skipped.append(path)
            continue
        # Insert before the LAST </head> occurrence (pages are single-head).
        idx = text.lower().rfind("</head>")
        if idx == -1:
            missing_head.append(path)
            continue
        new_text = text[:idx] + TAG + text[idx:]
        path.write_text(new_text, encoding="utf-8")
        added.append(path)

    print(f"Added script tag to {len(added)} file(s).")
    print(f"Already present / skipped: {len(skipped)} file(s).")
    if missing_head:
        print("WARNING — no </head> found in:", file=sys.stderr)
        for p in missing_head:
            print("  ", p, file=sys.stderr)
        return 1
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
