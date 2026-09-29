#!/usr/bin/env python3
"""Strip trailing slashes from internal links so URLs resolve directly.

The host serves clean directory pages without the trailing slash; links that
end in "/" (e.g. /about/) currently break, while /about works. This script
normalizes every internal root-relative link to the no-slash form across:

  - src/**/*.astro   : href="..." and href={...} expressions, string arrays
                       like ['/label', '/path/'], canonical/og:url/theme-color
                       metadata, and <link rel="alternate"> hreflang lists.
  - assets/js/*.js   : navigation/link tables and blog config strings
                       (assets/js/min/*.min.js are then rebuilt via esbuild).
  - sitemap.xml      : <loc> entries (root "/" is preserved).
  - _redirects       : destination targets of redirect rules (source patterns
                       kept as-is so old URLs keep matching).

Root path "/" is always left untouched. External URLs, tel:/mailto:, data:
URIs, pure anchors ("#id"), empty hrefs and asset files (.css/.js/.png/...)
are never modified.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# href="/foo/" or href="/foo/#x" -> drop the slash before the anchor/end.
HREF_RE = re.compile(r'(href=")(/(?:[^"#?\s]*/)?)"((?:#[^"]*)?")')
# href={'/foo/'} / href={`/foo/`} inside Astro expressions.
EXPR_QUOTE_RE = re.compile(r"(href=\{['\"`])(/[^'\"`#]*?)/(['\"`\s])([^}]*\})")
# Canonical / og:url / theme-color style meta content values.
META_RE = re.compile(r'(content=")(https://mindgracencr\.in(?:/[^\"]*?)?)/(")')
# Alternate-language link lists such as "en=/about/, hi=/about/".
ALT_RE = re.compile(r'(=[a-z]{2}(?:-[A-Za-z]{2})?="/)([^"]*?)/(")')
# String/array entries: '/foo/', '/foo/#bar' (quotes only, not backticks).
STR_ENTRY_RE = re.compile(r"(['\"])(/(?:[^'\"]*)?)/(\1)")
# Template-literal segments ending in a slash before an interpolation: `/x/${...}`.
TEMPLATE_SEG_RE = re.compile(r"(`[^'\"\n]*?)/\$\{")


def fix_href(match: re.Match) -> str:
    prefix, path, tail = match.group(1), match.group(2), match.group(3)
    if path == "/":
        return match.group(0)
    return f"{prefix}{path.rstrip('/')}{tail}"


def fix_expr(match: re.Match) -> str:
    prefix, path, q, rest = match.groups()
    if path == "/":
        return match.group(0)
    return f"{prefix}{path.rstrip('/')}{q}{rest}"


def fix_meta(match: re.Match) -> str:
    prefix, url, suffix = match.groups()
    bare = url.removeprefix("https://mindgracencr.in")
    if bare in ("", "/"):
        return match.group(0)
    return f"{prefix}{url.rstrip('/')}{suffix}"


def fix_alt(match: re.Match) -> str:
    prefix, path, suffix = match.groups()
    if not path:
        return match.group(0)
    return f"{prefix}{path.rstrip('/')}{suffix}"


def fix_str_entry(match: re.Match) -> str:
    q, path, _ = match.groups()
    if path == "/" or path == "":
        return match.group(0)
    return f"{q}{path.rstrip('/')}{q}"


def fix_template_seg(match: re.Match) -> str:
    return f"{match.group(1)}${{{match.group(2)}"


def apply(text: str, patterns) -> str:
    for pat, fn in patterns:
        text = pat.sub(fn, text)
    return text


ASTRO_PATTERNS = [
    (HREF_RE, fix_href),
    (EXPR_QUOTE_RE, fix_expr),
    (META_RE, fix_meta),
    (ALT_RE, fix_alt),
    (STR_ENTRY_RE, fix_str_entry),
]
JS_PATTERNS = [(STR_ENTRY_RE, fix_str_entry), (TEMPLATE_SEG_RE, lambda m: m.group(1) + "${")]


def rewrite(path: Path, patterns) -> bool:
    original = path.read_text(encoding="utf-8")
    updated = apply(original, patterns)
    if updated != original:
        path.write_text(updated, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed = []
    for f in sorted(ROOT.joinpath("src").rglob("*.astro")):
        if rewrite(f, ASTRO_PATTERNS):
            changed.append(f.relative_to(ROOT))
    for f in sorted(ROOT.joinpath("assets/js").glob("*.js")):
        if rewrite(f, JS_PATTERNS):
            changed.append(f.relative_to(ROOT))
    if rewrite(ROOT / "sitemap.xml", [(re.compile(r"<loc>(https://mindgracencr\.in(/[^<]*?)/)</loc>"),
                                       lambda m: f"<loc>{m.group(1).rstrip('/')}</loc>" if m.group(2) != "/" else m.group(0))]):
        changed.append(Path("sitemap.xml"))

    redirects = ROOT / "_redirects"
    lines = redirects.read_text(encoding="utf-8").splitlines()
    out_lines, touched = [], False
    for line in lines:
        if line.strip() and not line.startswith("#"):
            parts = line.split()
            dest_idx = 1 if len(parts) >= 3 and parts[2].isdigit() else (1 if len(parts) == 2 else None)
            if dest_idx is not None:
                dest = parts[dest_idx]
                if dest.startswith("/") and dest != "/" and dest.endswith("/"):
                    parts[dest_idx] = dest.rstrip("/")
                    touched = True
                    if len(parts) == 3 and parts[0] == parts[1]:
                        continue  # drop now-pointless identity rule like "/about /about"
                    line = " ".join(parts)
        out_lines.append(line)
    if touched:
        redirects.write_text("\n".join(out_lines) + "\n", encoding="utf-8")
        changed.append(Path("_redirects"))

    print(f"Updated {len(changed)} file(s):")
    for c in changed:
        print(" ", c)


if __name__ == "__main__":
    main()
