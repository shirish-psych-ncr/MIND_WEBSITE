"""Check the rendered learning collection's discovery and schema contract."""
from pathlib import Path
from html.parser import HTMLParser
import json
import re
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.h1 = 0
        self.links = []
        self.canonicals = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'h1':
            self.h1 += 1
        if tag == 'a':
            self.links.append(urlsplit(attrs.get('href', '')).path)
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonicals.append(attrs.get('href'))


def check():
    entries = re.findall(r"slug: '([^']+)', kind: '(article|resource)'", (ROOT / 'src/data/neurodevelopment.ts').read_text(encoding='utf-8'))
    assert len(entries) == 11
    hub = (DIST / 'aasha/learning.html').read_text(encoding='utf-8')
    sitemap = (DIST / 'sitemap.xml').read_text(encoding='utf-8')
    blog = (DIST / 'blog.html').read_text(encoding='utf-8')
    for slug, kind in entries:
        route = f'/blog/pages/child/{slug}' if kind == 'article' else f'/aasha/resources/{slug}'
        text = (DIST / (route.lstrip('/') + '.html')).read_text(encoding='utf-8')
        page = Page(text)
        assert page.h1 == 1, route
        assert page.canonicals == ['https://mindgracencr.in' + route], route
        assert route in hub and 'https://mindgracencr.in' + route in sitemap, route
        assert '/aasha/learning' in page.links and '/aasha/book' in page.links, route
        assert 'class="section-reading"' in text or 'class="section-reading ' in text, f'Contextual reading link missing: {route}'
        schemas = []
        for raw in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', text, re.S):
            data = json.loads(raw)
            schemas.extend(data.get('@graph', [data]))
        assert sum(s.get('@type') == 'BreadcrumbList' for s in schemas) == 1, route
        faq = next(s for s in schemas if s.get('@type') == 'FAQPage')
        for question in faq['mainEntity']:
            assert question['name'] in text and question['acceptedAnswer']['text'] in text, route
        if kind == 'article':
            assert route in blog, f'Article missing from generated blog: {route}'
            count = re.search(r'data-word-count="(\d+)"', text)
            assert count and int(count[1]) >= 1000, f'Long-form content missing: {route}'
            assert '<table' in text and '<caption' in text, f'Comparison missing: {route}'
            assert 'id="references"' in text, f'Sources missing: {route}'
            assert f'/assets/images/learning/{slug}.png' in text, f'Topic artwork missing: {route}'
        else:
            assert 'worksheet-fields' in text and 'print-learning' in text, route
            assert '#worksheet' in text and 'Go to the worksheet' in text, route
    print('Learning validation passed: 12 linked pages, 8 indexed long-form articles with tables and sources, 3 worksheets, canonical and FAQ parity.')


if __name__ == '__main__':
    check()
