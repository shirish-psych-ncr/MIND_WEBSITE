"""Discover published HTML articles and generate the crawlable journal index.

Run before deploying, or use --watch while previewing with any static server.
Only Python's standard library is required.
"""
import argparse
from datetime import date
from html import escape
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import time
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://mindgracencr.in"
SKIP = {"assets", "node_modules", "scripts", "tests", "dist", "build", "_site", "venv", "env", "__pycache__"}
START = "<!-- GENERATED ARTICLES START -->"
END = "<!-- GENERATED ARTICLES END -->"


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.meta, self.canonical, self.schemas = {}, "", []
        self.capture = False
        self.buffer = ""
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "meta":
            self.meta[(a.get("name") or a.get("property") or a.get("http-equiv") or "").lower()] = a.get("content", "")
        if tag == "link" and "canonical" in a.get("rel", "").split():
            self.canonical = a.get("href", "")
        if tag == "script" and a.get("type") == "application/ld+json":
            self.capture, self.buffer = True, ""

    def handle_data(self, data):
        if self.capture:
            self.buffer += data

    def handle_endtag(self, tag):
        if tag == "script" and self.capture:
            self.capture = False
            try:
                self.schemas.extend(nodes(json.loads(self.buffer)))
            except json.JSONDecodeError:
                pass


def nodes(value):
    if isinstance(value, list):
        for item in value:
            yield from nodes(item)
    elif isinstance(value, dict):
        yield value
        yield from nodes(value.get("@graph", []))


def files(root):
    for folder, dirs, names in os.walk(root):
        dirs[:] = sorted(d for d in dirs if not d.startswith(".") and d not in SKIP)
        for name in sorted(names):
            if name.endswith(".html"):
                yield Path(folder) / name


def discover(root):
    found = {}
    for path in files(root):
        p = Page(path.read_text(encoding="utf-8-sig"))
        m = p.meta
        schema = next((s for s in p.schemas if set([s.get("@type")] if isinstance(s.get("@type"), str) else s.get("@type", [])) & {"BlogPosting", "Article", "NewsArticle"}), {})
        if not (m.get("blog-title") or schema or m.get("og:type") == "article"):
            continue
        if any("noindex" in m.get(k, "").lower() for k in ("robots", "googlebot")) or "refresh" in m or m.get("blog-status", "published").lower() != "published":
            continue
        relative = "/" + path.relative_to(root).as_posix()
        default = relative[:-10] if relative.endswith("/index.html") else relative
        url = urljoin(SITE + default, p.canonical or schema.get("url") or default)
        parts = urlsplit(url)
        if parts.scheme != "https" or parts.netloc != urlsplit(SITE).netloc or parts.query or parts.fragment:
            continue
        target = root / unquote(parts.path).lstrip("/")
        if parts.path.endswith("/"):
            target /= "index.html"
        # Canonical aliases do not become duplicate cards or outrank their source.
        if target.resolve() != path.resolve():
            continue
        title = m.get("blog-title") or schema.get("headline") or m.get("og:title")
        if not title:
            raise ValueError(f"Article has no title: {path}")
        published = (m.get("blog-date") or schema.get("datePublished") or m.get("article:published_time") or "")[:10]
        if published:
            date.fromisoformat(published)
            if published > date.today().isoformat():
                continue
        found[url] = dict(url=url, title=title, date=published,
                          description=m.get("blog-description") or m.get("description") or schema.get("description", ""),
                          readtime=m.get("blog-readtime", ""), image=m.get("og:image", ""),
                          alt=m.get("og:image:alt", ""))
    return sorted(found.values(), key=lambda p: (p["date"], p["url"]), reverse=True)


def cards(posts):
    output = ['<section aria-labelledby="latest"><h2 id="latest">All articles · newest first</h2>', f'<p class="entry-date">{len(posts)} articles in the journal</p>']
    for i, p in enumerate(posts):
        href, title = escape(urlsplit(p["url"]).path, quote=True), escape(p["title"])
        stamp = f'<time datetime="{p["date"]}">{p["date"]}</time>' if p["date"] else "Practical guide"
        if p["readtime"]:
            stamp += " · " + escape(p["readtime"])
        image = p["image"] if i == 0 and urlsplit(p["image"]).scheme in {"https", "http"} else ""
        style = ' class="featured"' if image else ''
        output.append(f'<article{style}><div><p class="entry-date">{stamp}</p><h3><a href="{href}">{title}</a></h3><p class="entry-description">{escape(p["description"])}</p><a href="{href}">Read article →</a></div>')
        if image:
            output.append(f'<img src="{escape(image, quote=True)}" alt="{escape(p["alt"], quote=True)}" loading="lazy" decoding="async">')
        output.append('</article>')
    output.append('</section>')
    return "\n".join(output)


def write_changed(path, content):
    if not path.exists() or path.read_text(encoding="utf-8") != content:
        path.write_text(content, encoding="utf-8")


def build(root=ROOT):
    posts = discover(root)
    if not posts:
        raise ValueError("No published articles found; refusing to erase the landing page")
    landing = root / "blog/index.html"
    html = landing.read_text(encoding="utf-8")
    if html.count(START) != 1 or html.count(END) != 1:
        raise ValueError("Landing page needs exactly one generated article region")
    html = html.split(START)[0] + START + "\n" + cards(posts) + "\n" + END + html.split(END)[1]
    listing = {"@context": "https://schema.org", "@type": "ItemList", "@id": SITE + "/blog/index.html#articles", "name": "Mind Grace blog articles", "numberOfItems": len(posts), "itemListOrder": "https://schema.org/ItemListOrderDescending", "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": p["title"], "url": p["url"]} for i, p in enumerate(posts)]}
    encoded = json.dumps(listing, ensure_ascii=False).replace("<", "\\u003c")
    html, count = re.subn(r'<script id="generated-article-schema" type="application/ld\+json">.*?</script>', lambda _: '<script id="generated-article-schema" type="application/ld+json">' + encoded + '</script>', html, flags=re.S)
    if count != 1:
        raise ValueError("Missing generated article schema slot")
    write_changed(landing, html)
    # Add new article URLs without removing unrelated service-page sitemap entries.
    sitemap = root / "sitemap.xml"
    if sitemap.exists():
        xml = sitemap.read_text(encoding="utf-8")
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        existing = {e.text for e in ET.fromstring(xml).findall("s:url/s:loc", ns)}
        additions = [f'  <url><loc>{escape(p["url"])}</loc></url>' for p in posts if p["url"] not in existing]
        if additions:
            write_changed(sitemap, xml.replace("</urlset>", "\n".join(additions) + "\n</urlset>"))
    return len(posts)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--watch", action="store_true")
    args = parser.parse_args()
    previous = None
    while True:
        snapshot = [(str(p), p.stat().st_mtime_ns) for p in files(ROOT) if p != ROOT / "blog/index.html"]
        if snapshot != previous:
            print(f"Indexed {build()} published articles", flush=True)
            previous = snapshot
        if not args.watch:
            break
        time.sleep(1)
