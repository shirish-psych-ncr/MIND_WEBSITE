"""Validate built search metadata, Aasha identity and visible answer/schema parity."""
from html.parser import HTMLParser
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
data = json.loads((ROOT / "src/data/aasha.json").read_text(encoding="utf-8"))

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta = {}; self.canonicals = []; self.hrefs = []; self.images = []
        self.h1 = 0; self.title = []; self.text = []; self.schemas = []
        self.in_title = False; self.script = None; self.script_text = []; self.hidden = 0
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            key = attrs.get("name", attrs.get("property", ""))
            self.meta.setdefault(key, []).append(attrs.get("content", ""))
        if tag == "link" and attrs.get("rel") == "canonical": self.canonicals.append(attrs.get("href"))
        if tag == "a": self.hrefs.append(attrs.get("href", ""))
        if tag == "img": self.images.append(attrs)
        if tag == "h1": self.h1 += 1
        if tag == "title": self.in_title = True
        if tag in ("script", "style"):
            self.hidden += 1
            if tag == "script": self.script = attrs.get("type", ""); self.script_text = []
    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
        if tag in ("script", "style"):
            self.hidden = max(0, self.hidden - 1)
            if tag == "script":
                if self.script == "application/ld+json": self.schemas.append(json.loads("".join(self.script_text)))
                self.script = None
    def handle_data(self, value):
        if self.script is not None: self.script_text.append(value)
        if self.in_title: self.title.append(value)
        if not self.hidden: self.text.append(value)

def normalize(value): return re.sub(r"\s+", " ", value).strip()
def nodes(schema):
    if isinstance(schema, list):
        for item in schema: yield from nodes(item)
    elif isinstance(schema, dict):
        yield schema
        for item in schema.get("@graph", []): yield from nodes(item)

failures = []; count = 0; service_count = 0; titles = {}
sitemap = (DIST / "sitemap.xml").read_text(encoding="utf-8")
for file in DIST.rglob("*.html"):
    html = file.read_text(encoding="utf-8")
    if 'http-equiv="refresh"' in html or file.name == "offline.html": continue
    page = Page(); page.feed(html); count += 1
    name = file.relative_to(DIST).as_posix()
    def require(ok, message):
        if not ok: failures.append(f"{name}: {message}")
    require(len(page.canonicals) == 1, "expected one canonical")
    if not page.canonicals: continue
    canonical = page.canonicals[0]
    if not any("noindex" in value for value in page.meta.get("robots", [])):
        require(f"<loc>{canonical}</loc>" in sitemap, "indexable page absent from sitemap")
        title = normalize("".join(page.title))
        require(title not in titles, f"duplicate page title also used by {titles.get(title)}")
        titles[title] = name
    for key in ["description", "og:title", "og:description", "og:url", "og:image", "twitter:card", "twitter:title", "twitter:description", "twitter:image"]:
        require(len(page.meta.get(key, [])) == 1 and bool(page.meta[key][0]), f"missing or duplicate {key}")
    require(page.h1 == 1, "expected one H1")
    require(bool(normalize("".join(page.title))), "missing title")
    require(page.meta.get("og:url") == [canonical], "Open Graph URL differs from canonical")
    require("/aasha" in page.hrefs, "missing crawlable Aasha hub link")
    require(any(i.get("src") == data["logo"] and i.get("alt") for i in page.images), "missing accessible Aasha logo")
    graph = [item for schema in page.schemas for item in nodes(schema)]
    centres = [item for item in graph if item.get("@id") == data["id"]]
    require(len(centres) == 1, "expected one stable Aasha centre identity")
    if centres:
        centre = centres[0]
        require(centre.get("name") == data["name"], "inconsistent centre name")
        require(centre.get("telephone") == data["telephone"], "inconsistent telephone")
        hours = centre.get("openingHoursSpecification", {})
        require(hours.get("opens") == "12:00" and hours.get("closes") == "20:00", "incorrect Aasha hours")
    visible = normalize(" ".join(page.text))
    require(normalize(data["hours"]) in visible and normalize(data["address"]) in visible, "Aasha hours/address missing from visible content")
    if canonical == data["url"] or canonical.startswith(data["url"] + "/"):
        require(canonical in sitemap, "Aasha page absent from sitemap")
        for node in graph:
            if node.get("@type") == "FAQPage":
                for faq in node.get("mainEntity", []):
                    require(normalize(faq["name"]) in visible, "FAQ question not visible")
                    require(normalize(faq["acceptedAnswer"]["text"]) in visible, "FAQ answer not visible")
    if canonical.startswith(data["url"] + "/"):
        require(any(node.get("@type") == "BreadcrumbList" for node in graph), "missing server-rendered breadcrumbs")
    if canonical in {data["url"] + "/" + service["slug"] for service in data["services"]}:
        service_count += 1
        services = [node for node in graph if node.get("@type") == "Service"]
        require(len(services) == 1 and services[0].get("provider", {}).get("@id") == data["id"], "service provider is not Aasha")
if service_count != len(data["services"]): failures.append("Not all Aasha service pages were built")
summary = (DIST / "llms-aasha.txt").read_text(encoding="utf-8")
for field in ["name", "phone", "address", "hours"]:
    if data[field] not in summary: failures.append("Aasha summary has stale " + field)
for service in data["services"]:
    if data["url"] + "/" + service["slug"] not in summary: failures.append("Aasha summary missing " + service["slug"])
print(f"Aasha/search audit: {count} pages, {service_count} service pages, {len(failures)} failures.")
if failures:
    print("\n".join(failures))
    raise SystemExit(1)
