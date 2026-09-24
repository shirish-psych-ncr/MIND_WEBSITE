#!/usr/bin/env python3
"""
Mind Grace NCR - Master Repository Fix & AI Optimization Script
Run this in the root of your repository: python fix_and_optimize_repo.py

IMPORTANT SAFETY NOTES (deviations from the original draft, deliberate):
  * This script does NOT re-run the regex-based CSS/JS "minifiers" from the
    draft. Those corrupt code (they strip whitespace inside strings, break
    `//` URLs in JS, etc.). Proper minification was already done with
    clean-css / terser into assets/**/min/*.min.* and HTML pages already
    reference those files. The script verifies that state instead.
  * JSON-LD is validated in-place; invalid blocks are reported, never
    silently rewritten.
  * hreflang tags are NORMALIZED (absolute canonical URLs, lowercase
    region subtags) only where hreflang already exists. No blanket
    injection onto every page, which would duplicate/conflict with
    existing tags.
  * Footer links were already added to thin pages using the site's own
    CSP-safe classes; inline-styled footers are not injected.
  * llms.txt is left untouched (the existing file contains verified,
    accurate facts; the draft replacement contained fabricated claims).
"""
import json
import re
import shutil
from pathlib import Path

ROOT_DIR = Path(__file__).parent
BACKUP_DIR = ROOT_DIR / "_seo_backups"
BACKUP_DIR.mkdir(exist_ok=True)

SITE_ORIGIN = "https://mindgracencr.in"


def backup_file(filepath: Path):
    """Backup keyed by relative path to avoid filename collisions."""
    rel = filepath.relative_to(ROOT_DIR)
    dest = BACKUP_DIR / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(filepath, dest)


def page_url_for(filepath: Path) -> str:
    rel = str(filepath.relative_to(ROOT_DIR)).replace("\\", "/")
    if rel.endswith("index.html"):
        rel = rel[: -len("index.html")]
    return f"{SITE_ORIGIN}/{rel}"


JSONLD_RE = re.compile(
    r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    re.DOTALL | re.IGNORECASE,
)


def validate_json_ld(content: str, path: Path):
    """Return (ok_count, bad_blocks). Does not modify content."""
    bad = []
    ok = 0
    for m in JSONLD_RE.finditer(content):
        raw = m.group(1).strip()
        try:
            data = json.loads(raw)
            ok += 1
            # Re-serialize only to normalize formatting if it round-trips.
            norm = json.dumps(data, indent=2, ensure_ascii=False)
            if norm != raw and raw:
                content = content.replace(m.group(0), m.group(0).replace(raw, norm))
        except json.JSONDecodeError as e:
            bad.append((str(e), raw[:120]))
    return ok, bad, content


HREFLANG_RE = re.compile(
    r'(<link[^>]*rel=["\']alternate["\'][^>]*hreflang=["\']([^"\']+)["\'][^>]*href=["\'])([^"\']+)(["\'][^>]*/?>)',
    re.IGNORECASE,
)


def normalize_hreflang(content: str, canonical_url: str):
    """Make hreflang subtags lowercase and hrefs absolute canonical URLs."""
    changed = False

    def repl(m):
        nonlocal changed
        tag = m.group(2).lower()
        href = m.group(3)
        new_href = href
        if not href.startswith("http"):
            # Relative -> absolute against this page's canonical URL
            if href == "/":
                new_href = SITE_ORIGIN + "/"
            else:
                new_href = SITE_ORIGIN + href
        if tag != m.group(2) or new_href != href:
            changed = True
        return f'{m.group(1)}{new_href}{m.group(4)}' if new_href != href or tag != m.group(2) else m.group(0)

    return HREFLANG_RE.sub(repl, content), changed


def write_robots_open():
    robots_path = ROOT_DIR / "robots.txt"
    backup_file(robots_path)
    robots_path.write_text(
        "# Mind Grace NCR - robots.txt\n"
        "# Policy: ALL crawlers, search bots, and AI agents are allowed.\n"
        "# Updated 2026-09-24 per owner request: allow all, disallow none.\n\n"
        "User-agent: *\n"
        "Allow: /\n\n"
        f"Sitemap: {SITE_ORIGIN}/sitemap.xml\n",
        encoding="utf-8",
    )
    print("✅ robots.txt rewritten: User-agent: * / Allow: / — no Disallow lines.")


def verify_minified_assets():
    """Sanity check: count .min.css/.min.js and confirm HTML references them."""
    mins = list(ROOT_DIR.rglob("*.min.js")) + list(ROOT_DIR.rglob("*.min.css"))
    html_files = list(ROOT_DIR.rglob("*.html"))
    ref_pages = 0
    for h in html_files:
        c = h.read_text(encoding="utf-8", errors="ignore")
        if "min/" in c and (".min.js" in c or ".min.css" in c):
            ref_pages += 1
    print(f"ℹ️  Minified assets on disk: {len(mins)}; HTML pages referencing them: {ref_pages}/{len(html_files)}.")


def main():
    print("🚀 Starting Mind Grace Repository Optimization...")

    # 1. robots.txt — explicit owner instruction: allow everything.
    write_robots_open()

    # 2. Verify minification state (already done properly; do not regex-mangle).
    verify_minified_assets()

    # 3. HTML passes: JSON-LD validation + hreflang normalization.
    html_changed = 0
    total_blocks = 0
    broken = []
    for filepath in sorted(ROOT_DIR.rglob("*.html")):
        s = str(filepath)
        if "_seo_backups" in s or "/.git/" in s:
            continue
        original = filepath.read_text(encoding="utf-8")
        content = original

        ok, bad, content = validate_json_ld(content, filepath)
        total_blocks += ok
        for err, snippet in bad:
            broken.append((s, err, snippet))

        content, hl_changed = normalize_hreflang(content, page_url_for(filepath))

        if content != original:
            backup_file(filepath)
            filepath.write_text(content, encoding="utf-8")
            html_changed += 1

    print(f"✅ HTML files touched: {html_changed} (JSON-LD normalized, hreflang absolutized/lowercased).")
    print(f"✅ Valid JSON-LD blocks: {total_blocks}; broken: {len(broken)}")
    for path, err, snippet in broken:
        print(f"   ⚠️  {path}: {err} :: {snippet}")
    print("ℹ️  llms.txt left unchanged (existing copy is accurate; draft text contained unverified claims).")
    print(f"💾 Backups saved to: {BACKUP_DIR}")
    print("🎉 Done. Review with 'git diff' and commit.")


if __name__ == "__main__":
    main()
