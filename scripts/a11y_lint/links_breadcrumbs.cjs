#!/usr/bin/env node
/* links_breadcrumbs.cjs — audit internal links, breadcrumbs (visible + schema), sitemap, _redirects.
 * Ground truth = built output in dist/ (run `npx astro build` first). Exit 1 on any defect. */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const DIST = path.join(ROOT, 'dist');

if (!fs.existsSync(DIST)) {
  console.error('dist/ missing — run `npx astro build` before this audit.');
  process.exit(2);
}

// ---- collect built page paths (directory URLs) ----
const pages = new Set();
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) {
      const rel = '/' + path.relative(DIST, p).split(path.sep).join('/');
      pages.add(rel === '/index.html' ? '/' : rel.replace(/\/index\.html$/, ''));
      if (rel !== '/index.html') pages.add(rel); // literal .html files (offline.html etc.)
    }
  }
})(DIST);

const exists = (u) => {
  const c = [u, u.replace(/\/+$/, ''), u.replace(/\/+$/, '') + '/'];
  return c.some((x) => pages.has(x) || pages.has(x + '.html'));
};

// ---- helpers ----
const NAV_RE = /"@type":\s*"BreadcrumbList"[\s\S]*?\n\s*\]/;
const ENTRY_RE = /\{\s*"position":\s*(\d+),\s*"name":\s*"([^"]*)",\s*"item":\s*"([^"]*)"\s*\}/g;
const HREF_RE = /href\s*=\s*[{"']([^"'{}]+?)(?:[?#][^"']*?)?[}'"]/g;

function astroFiles(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) astroFiles(p, acc);
    else if (e.name.endsWith('.astro')) acc.push(p);
  }
  return acc;
}

const findings = [];
const flag = (file, msg) => findings.push(`${path.relative(ROOT, file)} :: ${msg}`);

for (const f of astroFiles(path.join(ROOT, 'src'))) {
  const txt = fs.readFileSync(f, 'utf8');
  const canon = txt.match(/rel="canonical" href="https?:\/\/[^/]+(\/[^"]*)"/);
  const page = canon ? canon[1].replace(/\/+$/, '') : null;

  // 1. every internal href resolves to a built page or a real static file
  let m;
  HREF_RE.lastIndex = 0;
  while ((m = HREF_RE.exec(txt))) {
    const h = m[1].trim();
    if (h === 'href') continue;                 // JSX spread artifact: href={href} in Shell.astro
    if (h.startsWith('`')) continue;            // Astro template-literal attribute (validated at build)
    if (!h || /^(https?:|mailto:|tel:|#|data:|\/\/|\/.well-known)/.test(h)) continue;
    if (!h.startsWith('/')) { if (!/^(\.\.?\/|javascript:)/.test(h)) flag(f, `relative href "${h}" (breaks across URL depths)`); continue; }
    const target = h.replace(/\/+$/, '');
    if (target === '') continue; // home
    const staticOk = fs.existsSync(path.join(ROOT, target.replace(/^\//, '')));
    if (!exists(target) && !staticOk) flag(f, `dead internal link ${h}`);
  }

  // 2. breadcrumb schema block sanity
  const sm = txt.match(NAV_RE);
  let names = [], paths = [];
  if (sm) {
    const items = [...sm[0].matchAll(ENTRY_RE)];
    const pos = items.map((i) => Number(i[1]));
    if (pos.length && pos.join(',') !== pos.map((_, i) => i + 1).join(','))
      flag(f, `breadcrumb positions not sequential: ${pos}`);
    names = items.map((i) => i[2]);
    paths = items.map((i) => i[3].replace(/^https?:\/\/[^/]+/, '').replace(/\/+$/, ''));
    paths.forEach((p, i) => { if (p !== '' && !exists(p)) flag(f, `schema crumb[${i}] "${names[i]}" -> ${p} is not a built page`); });
    if (page && paths.length && paths[paths.length - 1] !== page)
      flag(f, `schema last crumb ${paths[paths.length - 1]} != canonical ${page}`);
  }

  // 3. visible trail mirrors schema and never self-links
  const vm = txt.match(/<nav class="breadcrumbs"[^>]*>([\s\S]*?)<\/nav>/);
  if (vm) {
    const links = [...vm[1].matchAll(/<a href="([^"]+)"[^>]*>([^<]*)<\/a>/g)].map((x) => ({ href: x[1], label: x[2] }));
    const cur = [...vm[1].matchAll(/aria-current="page"[^>]*>([^<]*)</g)].map((x) => x[1]);
    links.forEach((l) => { if (!exists(l.href.replace(/\/+$/, ''))) flag(f, `visible dead link ${l.href}`); });
    if (page && links.some((l) => l.href.replace(/\/+$/, '') === page)) flag(f, `trail self-links current page ${page}`);
    const visLabels = [...links.map((l) => l.label), ...cur];
    if (names.length && visLabels.length !== names.length)
      flag(f, `visible crumbs (${visLabels.length}) != schema crumbs (${names.length})`);
    else if (names.length)
      visLabels.forEach((v, i) => {
        if (v.toLowerCase() !== names[i].toLowerCase())
          flag(f, `label mismatch at crumb ${i}: visible "${v}" vs schema "${names[i]}"`);
      });
  }
}

// ---- sitemap.xml vs dist ----
const smTxt = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const locs = [...smTxt.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((x) => x[1].replace(/\/+$/, ''));
locs.forEach((l) => { if (!exists(l)) flag('sitemap.xml', `stale entry ${l}`); });
[...pages].filter((p) => p !== '/' && !p.endsWith('.html')).forEach((p) => {
  if (!locs.includes(p.replace(/\/+$/, ''))) flag('sitemap.xml', `built page ${p}/ missing from sitemap`);
});

// ---- _redirects targets exist ----
fs.readFileSync(path.join(ROOT, '_redirects'), 'utf8').split('\n').forEach((line) => {
  const parts = line.trim().split(/\s+/);
  if (line.startsWith('#') || parts.length < 2 || !parts[1].startsWith('/') || parts[1].includes(':splat')) return;
  const t = parts[1].replace(/\/+$/, '');
  if (!exists(t) && !fs.existsSync(path.join(ROOT, t.replace(/^\//, ''))))
    flag('_redirects', `target ${parts[1]} does not resolve`);
});

// ---- report ----
if (findings.length) {
  console.error(`link/breadcrumb audit: ${findings.length} issue(s)`);
  findings.forEach((x) => console.error(' - ' + x));
  process.exit(1);
}
console.log(`link/breadcrumb audit: OK (${pages.size} built pages, ${locs.length} sitemap entries checked)`);
