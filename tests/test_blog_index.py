import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('blog_index', Path(__file__).resolve().parents[1] / 'scripts/build_blog_index.py')
index = importlib.util.module_from_spec(spec)
spec.loader.exec_module(index)


class ArticleDiscoveryTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)

    def put(self, path, html):
        file = self.root / path
        file.parent.mkdir(parents=True, exist_ok=True)
        file.write_text(html, encoding='utf-8')

    def post(self, title='Guide', date='2026-01-01', extra=''):
        return f'<meta name="blog-title" content="{title}"><meta name="blog-date" content="{date}">{extra}'

    def test_finds_articles_anywhere_and_sorts_newest_first(self):
        self.put('blog/pages/adult/old.html', self.post('Older'))
        self.put('new-topic/index.html', self.post('Newest', '2026-02-01'))
        self.put('about.html', '<h1>About us</h1>')
        posts = index.discover(self.root)
        self.assertEqual([p['title'] for p in posts], ['Newest', 'Older'])
        self.assertEqual(posts[0]['url'], index.SITE + '/new-topic/')

    def test_ignores_unpublished_redirects_and_canonical_aliases(self):
        self.put('real.html', self.post())
        for path, extra in [('draft.html', '<meta name="blog-status" content="draft">'), ('hidden.html', '<meta name="robots" content="noindex,follow">'), ('redirect.html', '<meta http-equiv="refresh" content="0;url=/real.html">'), ('alias.html', '<link rel="canonical" href="https://mindgracencr.in/real.html">'), ('external.html', '<link rel="canonical" href="https://example.com/article">')]:
            self.put(path, self.post(extra=extra))
        self.put('future.html', self.post(date='2999-01-01'))
        self.assertEqual(len(index.discover(self.root)), 1)

    def test_schema_only_post_and_complete_build_updates(self):
        self.put('schema/index.html', '<script type="application/ld+json">' + json.dumps({'@graph': [{'@type': 'BlogPosting', 'headline': 'A & B', 'datePublished': '2026-02-01'}]}) + '</script>')
        self.put('blog/index.html', index.START + index.END + '<script id="generated-article-schema" type="application/ld+json">{}</script>')
        self.put('sitemap.xml', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>')
        self.assertEqual(index.build(self.root), 1)
        first = (self.root / 'blog/index.html').read_text(encoding='utf-8')
        self.assertIn('A &amp; B', first)
        self.assertIn('"numberOfItems": 1', first)
        self.assertIn('/schema/', (self.root / 'sitemap.xml').read_text())
        index.build(self.root)
        self.assertEqual(first, (self.root / 'blog/index.html').read_text(encoding='utf-8'))
        self.put('brand-new.html', self.post('New arrival', '2026-03-01'))
        self.assertEqual(index.build(self.root), 2)
        (self.root / 'brand-new.html').unlink()
        self.assertEqual(index.build(self.root), 1)
        self.assertNotIn('New arrival', (self.root / 'blog/index.html').read_text())


if __name__ == '__main__':
    unittest.main()
