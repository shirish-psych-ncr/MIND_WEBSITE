# Automatic journal index

The publishing workflow scans the site's HTML and rebuilds `/blog/index.html`
before deployment. Cards and ItemList structured data come from the same list;
they are readable without JavaScript. New article URLs are added to the sitemap.
No landing-page card or manifest entry is required.

An article may live anywhere in the site. Use the existing article template with
`blog-title`, `blog-description`, `blog-date` (YYYY-MM-DD), `blog-readtime`, and a
canonical URL pointing to that file. BlogPosting/Article JSON-LD or `og:type=article`
are also recognized. General clinic pages are not treated as posts.

Drafts (`blog-status=draft`), noindex pages, redirects, canonical aliases and
future-dated posts are excluded. Future posts appear on a build after their date;
this is not a scheduled publishing service. Deleting a post removes its card on
the next build; remove retired URLs from the sitemap when retiring the page.

## Local preview

Run `python scripts/build_blog_index.py --watch` alongside your static server.
It refreshes the index when article HTML is added, edited or deleted; reload the
browser to see changes. For a one-time build, omit `--watch`.

## GitHub Pages

In repository Settings → Pages, set Source to **GitHub Actions** once. The
`Build journal and publish site` workflow then builds and deploys on each push
to `main`. This replaces the branch-based Pages publishing pipeline. Do not
deploy raw source through another host without running the generator first.

Validation: `python -m unittest discover -s tests -v`.
