#!/usr/bin/env python3
"""IndexNow submission helper for mindgracencr.in.

IndexNow (https://www.indexnow.org) lets the site tell participating search
engines (Bing, Yandex, Seznam, Naver, and the AI tools that read Bing's index)
about content updates instantly instead of waiting for crawlers to discover
them on their own.

This script automatically selects the pages we recommend submitting:

  * Indexable pages with content changes        (changed since last run)
  * New indexable pages                         (added / previously missing)
  * Pages that have been removed or redirected  (submitted with a valid
    ``indexAction`` so engines drop/update them immediately)

Selection is computed by diffing the current deployable state of the site
(``dist/`` HTML + ``_redirects``, falling back to the repo root) against a
snapshot stored in ``output/indexnow/state.json`` from the previous run. On
the first run there is no snapshot, so every indexable URL is treated as new
and submitted — which is exactly what you want when adopting the protocol.

Key handling
------------
The key file must be reachable at https://mindgracencr.in/<key>.txt before
submission. Two options:

  1. Drop a pre-generated key file into the repo, e.g.
     ``.well-known/indexnow-key.txt`` copied to the site root by CI, or any
     ``indexnow-*.txt`` file at the repo root (it is picked up automatically).
  2. Provide the secret via the ``INDEXNOW_KEY`` environment variable; the
     key file is then written to ``public/indexnow-<key>.txt`` so Astro ships
     it inside ``dist/``. Keep that file out of git (add it to .gitignore).

Usage
-----
    python3 scripts/indexnow_submit.py                 # stage the batch only
    python3 scripts/indexnow_submit.py --submit        # POST to api.indexnow.org
    python3 scripts/indexnow_submit.py --submit --dry-run   # preview, no POST
    python3 scripts/indexnow_submit.py --reset         # rebuild snapshot, full submit

Only Python's standard library is required.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import ssl
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
SITE = "https://mindgracencr.in"
ENDPOINT = "https://api.indexnow.org/indexnow"
MAX_URLS_PER_SUBMISSION = 10000  # IndexNow hard limit per request

STATE_DIR = ROOT / "output" / "indexnow"
STATE_FILE = STATE_DIR / "state.json"

SKIP_PARTS = {"assets", "node_modules", "scripts", "tests", "build", "_site",
              "venv", "env", "__pycache__", ".git", "skills", "output"}


# ---------------------------------------------------------------------------
# helpers

def log(msg: str) -> None:
    print(f"[indexnow] {msg}")


def now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def find_key_file() -> Path | None:
    """Locate a committed key file at the repo root (shipped to the site root)."""
    candidates = sorted(ROOT.glob("indexnow-*.txt"))
    if candidates:
        return candidates[0]
    well_known = ROOT / ".well-known" / "indexnow-key.txt"
    return well_known if well_known.exists() else None


def resolve_key() -> tuple[str, str]:
    """Return (key, key_location). key_location is the public path of the file."""
    env_key = os.environ.get("INDEXNOW_KEY", "").strip()
    if env_key:
        if not re.fullmatch(r"[a-fA-F0-9]{8,64}", env_key):
            sys.exit("INDEXNOW_KEY must be a hex string of 8-64 characters.")
        pub = ROOT / "public"
        pub.mkdir(exist_ok=True)
        key_file = pub / f"indexnow-{env_key}.txt"
        key_file.write_text(env_key + "\n", encoding="utf-8")
        log(f"wrote key file {key_file.relative_to(ROOT)} (keep it out of git)")
        return env_key.lower(), f"/indexnow-{env_key.lower()}.txt"

    key_file = find_key_file()
    if key_file is None:
        sys.exit(
            "No IndexNow key found.\n"
            "Either set INDEXNOW_KEY=<hex> or place an indexnow-<key>.txt file "
            "at the repo root (or .well-known/indexnow-key.txt). The key file "
            "must be reachable at https://mindgracencr.in/<key>.txt."
        )
    key = key_file.read_text(encoding="utf-8").strip()
    if not re.fullmatch(r"[a-fA-F0-9]{8,64}", key):
        sys.exit(f"{key_file} does not contain a valid hex IndexNow key.")
    location = "/" + key_file.relative_to(ROOT).as_posix()
    if location.startswith("/.well-known/"):
        location = "/indexnow-key.txt"  # CI copies it to the site root
    return key.lower(), location


def content_root() -> Path:
    """Prefer the built site (dist/); fall back to the repo root."""
    if (DIST / "index.html").exists():
        return DIST
    return ROOT


def load_redirects() -> dict[str, str]:
    """Parse Cloudflare-style _redirects into {from_path: to_path_or_url}."""
    redirects: dict[str, str] = {}
    for name in ("_redirects", "dist/_redirects"):
        path = ROOT / name
        if not path.exists():
            continue
        for line in path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            parts = line.split()
            if len(parts) >= 3 and parts[2].startswith(("301", "302")):
                src, dst = parts[0], parts[1]
                if "*" in src or ":" in src:  # splat rules are not single URLs
                    continue
                redirects[src] = dst
    return redirects


def url_for_path(path: str) -> str:
    # Canonical URLs never carry a trailing slash (except the site root), so
    # /about/ and /about both become https://mindgracencr.in/about. This is
    # the single funnel every submitted URL passes through, which guarantees
    # IndexNow only ever sees the no-trailing-slash spelling — even if an old
    # snapshot, sitemap entry, or redirect table still contains slashes.
    if path.startswith("/"):
        return SITE + _strip_slash(path)
    if path.startswith(SITE):
        return SITE + _strip_slash(path[len(SITE):] or "/")
    return path


def canonical_url(url: str) -> str:
    """Normalise a URL for deduplication: drop the trailing slash (except at
    the site root) so /about/ and /about count as one page."""
    if not url.startswith(SITE):
        return url
    path = url[len(SITE):] or "/"
    stripped = path.rstrip("/")
    return SITE + (stripped if stripped else "/")


def _strip_slash(path: str) -> str:
    """Normalise a URL path for comparison (site root stays as '/')."""
    stripped = path.rstrip("/")
    return stripped if stripped else "/"


def normalise_path(path: str) -> str:
    """Match dist/ directory URLs (``/about/``) with sitemap/_redirects style
    clean paths (``/about``). The site uses ``trailingSlash: 'ignore'``, so the
    two spellings are the same page."""
    return _strip_slash(path) + "/"


def load_sitemap_paths() -> list[str]:
    """Return <loc> paths from the repo-root sitemap (the source of truth)."""
    path = ROOT / "sitemap.xml"
    if not path.exists():
        return []
    try:
        tree = ET.parse(path)
    except ET.ParseError:
        log("sitemap.xml is unreadable; skipping it for URL discovery")
        return []
    urls = []
    for loc in tree.getroot().iter():
        if loc.tag.endswith("loc") and loc.text:
            text = loc.text.strip()
            if text.startswith(SITE):
                text = text[len(SITE):] or "/"
            if text.startswith("/"):
                urls.append(text)
    return urls


def sitemap_lastmod(url_path: str) -> str | None:
    """Return the <lastmod> recorded in sitemap.xml for a URL, if any."""
    path = ROOT / "sitemap.xml"
    if not path.exists():
        return None
    try:
        tree = ET.parse(path)
    except ET.ParseError:
        return None
    want = url_for_path(normalise_path(url_path))
    for url_el in tree.getroot():
        if not url_el.tag.endswith("url"):
            continue
        loc = url_el.findtext("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
        if not loc:
            continue
        if normalise_path(loc.strip()) == normalise_path(want):
            lm = url_el.findtext(
                "{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod")
            return lm.strip()[:10] if lm else None
    return None


def html_pages(root: Path) -> list[tuple[str, Path]]:
    """Return [(url_path, file)] for every HTML page in the build output."""
    out = []
    for f in sorted(root.rglob("*.html")):
        rel = f.relative_to(root).as_posix()
        if any(part in SKIP_PARTS for part in f.parts):
            continue
        if rel.startswith("404") or rel == "offline.html":
            continue
        if rel == "index.html":
            url_path = "/"
        elif rel.endswith("/index.html"):
            url_path = "/" + rel[: -len("index.html")]
        else:
            url_path = "/" + rel
        out.append((url_path, f))
    return out


def is_indexable(html: str) -> bool:
    return not re.search(
        r'<meta[^>]+name=["\']robots["\'][^>]+content=["\'][^"\']*noindex',
        html, re.I)


def hash_page(path: Path) -> str:
    try:
        raw = path.read_bytes()
    except OSError:
        return ""
    # Normalise away volatile markers so cosmetic diffs don't spam submissions.
    text = raw.decode("utf-8", errors="ignore")
    text = re.sub(r"<script[^>]*>.*?</script>", "", text, flags=re.S | re.I)
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def lastmod(path: Path) -> str:
    mtime = path.stat().st_mtime
    return datetime.fromtimestamp(mtime, timezone.utc).strftime("%Y-%m-%d")


# ---------------------------------------------------------------------------
# selection

def build_current_state(key: str) -> dict:
    """Snapshot every URL the site currently serves.

    The page inventory is the union of dist/ HTML files and sitemap.xml
    ``<loc>`` entries (normalised to trailing-slash form), so pages that are
    newly missing from either source still surface as removals later on.
    """
    root = content_root()
    redirects = {_strip_slash(k): v for k, v in load_redirects().items()}
    inventory: dict[str, Path | None] = {}
    for url_path, f in html_pages(root):
        inventory[normalise_path(url_path)] = f
    for loc in load_sitemap_paths():
        norm = normalise_path(loc)
        if norm not in inventory:
            target = root / unquote(norm).lstrip("/") / "index.html"
            inventory[norm] = target if target.exists() else None

    pages: dict[str, dict] = {}
    for path, f in sorted(inventory.items()):
        # A redirect rule defined for this exact URL takes precedence over any
        # file that happens to ship at the same (e.g. trailing-slash) path:
        # Cloudflare edge rules fire before the static asset is served.
        target: str | None = None
        cur = _strip_slash(path)
        seen = set()
        while cur in redirects and cur not in seen:
            seen.add(cur)
            nxt = redirects[cur]
            target = nxt if nxt.startswith("http") else url_for_path(nxt)
            cur = _strip_slash(nxt) if nxt.startswith("/") else ""

        indexable = True
        last_modified = None
        digest = ""
        if target is None and f is not None and f.exists():
            html = f.read_text(encoding="utf-8", errors="ignore")
            indexable = is_indexable(html)
            digest = hash_page(f)
            last_modified = lastmod(f)
        elif target is not None:
            # Redirect entries are change-detected via their destination only.
            digest = target
        if last_modified is None:
            # Fall back to the sitemap <lastmod>, then to today.
            last_modified = sitemap_lastmod(path) or datetime.now(
                timezone.utc).strftime("%Y-%m-%d")

        # The site uses trailingSlash: 'ignore', so /about/ and /about are the
        # same page; submit each page once, preferring the canonical
        # no-trailing-slash spelling used by sitemap.xml.
        key_url = canonical_url(url_for_path(path))
        entry = {
            "hash": digest,
            "indexable": indexable,
            "lastmod": last_modified,
            "redirectTarget": target,
        }
        existing = pages.get(key_url)
        if existing is not None:
            # Prefer the spelling that carries real information (a content
            # hash for files, or a redirect rule); otherwise prefer the
            # canonical no-trailing-slash URL.
            has_info = bool(digest)
            prev_has_info = bool(existing["hash"])
            prefer_me = (has_info and not prev_has_info) or (
                has_info == prev_has_info and not path.endswith("/"))
            if not prefer_me:
                continue
        pages[key_url] = entry
    return {"generatedAt": now_iso(), "key": key[:8] + "…", "pages": pages}


def select_urls(old: dict | None, new: dict) -> dict:
    """Diff snapshots and pick the URLs recommended for IndexNow submission.

    Snapshot pages are keyed by canonical URL (trailing slashes normalised),
    so /about/ and /about are treated as one page.
    """
    old_pages = (old or {}).get("pages", {})
    new_pages = new["pages"]
    selected: dict[str, dict] = {}

    # URLs that existed last time but no longer exist are removals; they must
    # win over any redirect entry pointing at a same-named page.
    removed = {u for u, prev in old_pages.items()
               if prev.get("indexable") and u not in new_pages}
    removed_paths = {_strip_slash(u[len(SITE):] or "/") for u in removed}

    for url, info in new_pages.items():
        if not info["indexable"]:
            continue  # never advertise noindex pages to search engines
        prev = old_pages.get(url)
        changed = prev is None or prev.get("hash") != info["hash"]
        became_indexable = bool(prev) and not prev.get("indexable")
        if not (changed or became_indexable):
            continue
        target = info.get("redirectTarget")
        if target and _strip_slash(target) in removed_paths:
            # This URL now redirects to content that no longer exists.
            selected[url] = {"indexAction": "PageRemoved",
                             "pageType": "Soft404"}
            continue
        entry = {"urlLastModified": info["lastmod"]}
        if target:
            # A page served behind a redirect: tell engines where it moved.
            entry["pageType"] = "Redirect"
            entry["redirectDestination"] = target
        selected[url] = entry

    # Pages that disappeared since the last snapshot…
    for url in removed:
        selected[url] = {"indexAction": "PageRemoved", "pageType": "Soft404"}
    # …and pages that flipped to noindex.
    for url, prev in old_pages.items():
        cur = new_pages.get(url)
        if prev.get("indexable") and cur is not None and not cur.get("indexable"):
            selected[url] = {"indexAction": "PageRemoved",
                             "pageType": "Hard404"}

    return selected


# ---------------------------------------------------------------------------
# submission

def post_batch(urls: dict, host: str, key: str, dry_run: bool) -> int:
    payload = {"host": host, "key": key, "keyLocation": url_for_path(KEY_LOCATION),
               "urlList": [{"url": u, **meta} for u, meta in urls.items()]}
    if dry_run:
        log(f"dry-run: would POST {len(urls)} URLs:")
        for u, meta in urls.items():
            tag = meta.get("indexAction") or meta.get("pageType") or meta.get("urlLastModified", "")
            extra = f" -> {meta['redirectDestination']}" if meta.get("redirectDestination") else ""
            log(f"  {u} [{tag}]{extra}")
        return 0
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        ENDPOINT, data=data,
        headers={"Content-Type": "application/json; charset=utf-8",
                 "User-Agent": "MindGraceNCR-IndexNow/1.0"})
    ctx = ssl.create_default_context()
    try:
        with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
            code = resp.status
    except urllib.error.HTTPError as e:
        code = e.code
        body = e.read().decode("utf-8", errors="ignore")[:300]
        log(f"HTTP {code}: {body}")
    except OSError as e:
        log(f"submission failed (network): {e}")
        return 1
    if code in (200, 201, 202):
        log(f"batch accepted ({len(urls)} URLs, HTTP {code})")
        return 0
    log(f"batch rejected with HTTP {code}")
    return 1


KEY_LOCATION = "/indexnow.txt"  # replaced by resolve_key() result at runtime


def main(argv: list[str] | None = None) -> int:
    global KEY_LOCATION
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--submit", action="store_true",
                        help="actually POST to api.indexnow.org (default: stage only)")
    parser.add_argument("--dry-run", action="store_true",
                        help="with --submit, print the batch without posting it")
    parser.add_argument("--reset", action="store_true",
                        help="discard the previous snapshot (all URLs count as new)")
    parser.add_argument("--force-all", action="store_true",
                        help="submit every indexable URL regardless of changes")
    parser.add_argument("--limit", type=int, default=MAX_URLS_PER_SUBMISSION,
                        help=f"max URLs per request (<= {MAX_URLS_PER_SUBMISSION})")
    args = parser.parse_args(argv)

    key, KEY_LOCATION = resolve_key()
    log(f"host={SITE.removeprefix('https://')} key={key[:8]}… keyLocation={KEY_LOCATION}")

    old = None
    if STATE_FILE.exists() and not args.reset:
        try:
            old = json.loads(STATE_FILE.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            log("previous snapshot unreadable; treating all pages as new")

    new = build_current_state(key)
    if args.force_all:
        selected = {
            u: {"urlLastModified": i["lastmod"]}
            for u, i in new["pages"].items() if i["indexable"]
        }
    else:
        selected = select_urls(old, new)

    counts = {"new": 0, "updated": 0, "removed": 0, "redirected": 0}
    for meta in selected.values():
        if meta.get("indexAction") == "PageRemoved":
            counts["removed"] += 1
        elif meta.get("pageType") == "Redirect":
            counts["redirected"] += 1
        elif old is None:
            counts["new"] += 1
        else:
            counts["updated"] += 1

    log(f"selected {len(selected)} URLs "
        f"(new={counts['new']} updated={counts['updated']} "
        f"removed={counts['removed']} redirected={counts['redirected']})")

    STATE_DIR.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps(new, indent=2, sort_keys=True) + "\n",
                          encoding="utf-8")

    if not selected:
        log("nothing changed since the last run — no submission needed")
        return 0

    paths = sorted(selected)
    rc = 0
    for i in range(0, len(paths), max(1, min(args.limit, MAX_URLS_PER_SUBMISSION))):
        chunk_size = max(1, min(args.limit, MAX_URLS_PER_SUBMISSION))
        chunk = {p: selected[p] for p in paths[i:i + chunk_size]}
        rc |= post_batch(chunk, SITE.removeprefix("https://"), key,
                         dry_run=args.dry_run or not args.submit)
    return rc


if __name__ == "__main__":
    sys.exit(main())
