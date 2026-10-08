import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const PUBLIC_FILES = ['assets', 'vendor', 'blog', '.well-known', '_headers', 'CNAME', 'favicon.ico', 'robots.txt', 'site.webmanifest', 'sitemap.xml', 'sw.js', 'offline.html', 'llms.txt', 'llms-blog.txt', 'llms-tools.txt', 'faq-schema.json', 'ahrefs_044e9d2902f7c449b014bda0aedb3cc38fa40208be72ecb2b0e1f95a468133b1'];
export async function routes() {
  const result = [];
  async function walk(dir, prefix = '') {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const name = prefix + entry.name;
      if (entry.isDirectory()) await walk(path.join(dir, entry.name), name + '/');
      else if (name.endsWith('.astro')) result.push('/' + name.replace(/(?:\/)?index\.astro$|\.astro$/g, ''));
    }
  }
  await walk(path.join(root, 'src/pages'));
  return result;
}

export async function aliases() {
  const result = {};
  for (const line of (await readFile(path.join(root, '_redirects'), 'utf8')).split('\n')) {
    const [from, to, status] = line.trim().split(/\s+/);
    if (from?.startsWith('/') && to?.startsWith('/') && /^30[1278]$/.test(status)) result[from] = to;
  }
  for (const route of await routes()) {
    if (route === '/') { result['/index.html'] = '/'; continue; }
    result[route + '/'] = route;
    result[route + '.html'] = route;
    result[route + '/index.html'] = route;
  }
  result['/blog/index.html'] = '/blog';
  result['/offline/'] = '/offline';
  result['/offline.html'] = '/offline';
  return result;
}

export function publicAssets() {
  return { name: 'mindgrace-public-assets', hooks: {
    'astro:config:setup': async ({ command, updateConfig }) => {
      if (command !== 'dev') return;
      const target = path.join(root, 'output/dev-public');
      await mkdir(target, { recursive: true });
      await cp(path.join(root, 'public'), target, { recursive: true });
      for (const name of PUBLIC_FILES) await cp(path.join(root, name), path.join(target, name), { recursive: true });
      updateConfig({ publicDir: target });
    },
    'astro:build:done': async ({ dir }) => {
      const out = fileURLToPath(dir);
      // Explicit allowlist: never publish the repository, credentials, or audit output.
      for (const name of PUBLIC_FILES) {
        await cp(path.join(root, name), path.join(out, name), { recursive: true });
      }
      const redirects = await aliases();
      const known = new Set(await routes());
      function clean(value) {
        if (!value.startsWith('/') && !value.startsWith('https://mindgracencr.in/')) return value;
        const absolute = value.startsWith('https:');
        const url = new URL(value, 'https://mindgracencr.in');
        const destination = redirects[url.pathname];
        if (destination) url.pathname = destination;
        return (absolute ? url.origin : '') + url.pathname + url.search + url.hash;
      }
      const versions = new Map();
      async function assetVersion(value) {
        const url = new URL(value, 'https://mindgracencr.in');
        if (url.origin !== 'https://mindgracencr.in' || !url.pathname.startsWith('/assets/') || !/\.(?:css|js)$/.test(url.pathname)) return value;
        if (!versions.has(url.pathname)) versions.set(url.pathname, createHash('sha256').update(await readFile(path.join(out, url.pathname))).digest('hex').slice(0, 12));
        url.searchParams.set('v', versions.get(url.pathname));
        return (value.startsWith('https:') ? url.origin : '') + url.pathname + url.search + url.hash;
      }
      async function normalize(folder) {
        for (const entry of await readdir(folder, { withFileTypes: true })) {
          const file = path.join(folder, entry.name);
          if (entry.isDirectory() && !['assets', 'vendor'].includes(entry.name)) await normalize(file);
          else if (entry.name.endsWith('.html')) {
            let html = await readFile(file, 'utf8');
            html = html.replace(/\b(href|action)=(['"])(.*?)\2/g, (_, attr, q, value) => `${attr}=${q}${clean(value)}${q}`);
            const assetAttrs = [...html.matchAll(/\b(href|src)=(['"])([^'"]+)\2/g)];
            for (const match of assetAttrs) {
              const versioned = await assetVersion(match[3]);
              if (versioned !== match[3]) html = html.replace(match[0], `${match[1]}=${match[2]}${versioned}${match[2]}`);
            }
            // Canonicals must be absolute and agree with the deployed route.
            html = html.replace(/(<link\b[^>]*rel="canonical"[^>]*href=")\/(?!\/)/g, '$1https://mindgracencr.in/');
            await writeFile(file, html);
          }
        }
      }
      await normalize(out);
      await writeFile(path.join(out, '_redirects'), Object.entries(redirects).filter(([from,to]) => from !== to).map(([from,to]) => `${from} ${to} 301`).join('\n') + '\n');
      await writeFile(path.join(out, '.nojekyll'), '');
      await mkdir(path.join(out, 'assets/js'), { recursive: true });
      await writeFile(path.join(out, 'assets/js/route-recovery.js'), `// GitHub Pages cannot read _redirects. Recover only known historic URLs.\n(()=>{const aliases=${JSON.stringify(redirects)};const target=aliases[location.pathname];if(target&&target!==location.pathname)location.replace(target+location.search+location.hash)})();\n`);
      const notFound = path.join(out, '404.html');
      await writeFile(notFound, (await readFile(notFound, 'utf8')).replace('<head>', '<head><script src="/assets/js/route-recovery.js"></script>'));
      await writeFile(path.join(out, 'route-manifest.json'), JSON.stringify({routes:[...known], aliases:redirects}, null, 2));
    }
  }};
}
