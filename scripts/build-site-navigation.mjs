import { readFile } from 'node:fs/promises';
import { writeGeneratedFile as writeFile } from './write-generated-file.mjs';
import path from 'node:path';
import parse5 from 'parse5';
import { siteOrigin, labels, groups, classify, bridges, topics } from '../src/data/site-relationships.mjs';

const root = path.resolve('dist');
const manifest = JSON.parse(await readFile(path.join(root, 'route-manifest.json'), 'utf8'));
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
function walk(node, predicate, result = []) {
  if (predicate(node)) result.push(node);
  for (const child of node.childNodes ?? []) walk(child, predicate, result);
  return result;
}
const filename = route => path.join(root, route === '/' ? 'index.html' : route.slice(1) + '.html');
const records = new Map();
for (const route of manifest.routes) {
  const html = await readFile(filename(route), 'utf8');
  const doc = parse5.parse(html, { sourceCodeLocationInfo: true });
  const main = walk(doc, n => n.tagName === 'main')[0];
  if (!main?.sourceCodeLocation?.endTag) throw new Error(`Missing bounded main: ${route}`);
  const title = text(walk(main, n => n.tagName === 'h1')[0] ?? {}).replace(/\s+/g, ' ').trim();
  const noindex = walk(doc, n => n.tagName === 'meta' && /^(robots|googlebot)$/.test(attr(n, 'name') ?? '')).some(n => /noindex/i.test(attr(n, 'content')));
  const outgoing = new Set();
  for (const link of walk(main, n => n.tagName === 'a')) {
    let parent = link.parentNode, skip = false;
    while (parent && parent !== main) {
      if (['nav','footer'].includes(parent.tagName) || attr(parent, 'data-site-connections') !== undefined || (attr(parent,'class') ?? '').split(/\s+/).includes('related')) skip = true;
      parent = parent.parentNode;
    }
    if (skip) continue;
    try {
      const url = new URL(attr(link, 'href'), siteOrigin + route);
      if (url.origin === siteOrigin) outgoing.add(manifest.aliases[url.pathname] ?? url.pathname);
    } catch { /* Not a navigable URL. */ }
  }
  records.set(route, { route, html, doc, main, name: labels[route] ?? title, ...classify(route), topics: topics(route), outgoing, indexable: !noindex });
}
function trail(record) {
  const result = [], seen = new Set();
  while (record) {
    if (seen.has(record.route)) throw new Error(`Parent cycle: ${record.route}`);
    seen.add(record.route); result.unshift(record);
    if (record.parent !== null && !records.has(record.parent)) throw new Error(`Missing parent: ${record.parent}`);
    record = record.parent === null ? null : records.get(record.parent);
  }
  return result;
}
function connected(record) {
  if (!record.indexable || record.route === '/site-map') return [];
  for (const route of bridges[record.route] ?? []) if (!records.get(route)?.indexable) throw new Error(`Invalid editorial bridge: ${record.route} -> ${route}`);
  const explicit = bridges[record.route] ?? [];
  return [...records.values()].filter(candidate => candidate.indexable && candidate.route !== record.route && candidate.route !== '/' && candidate.route !== '/site-map')
    .map(candidate => {
      const curated = explicit.indexOf(candidate.route);
      if (curated >= 0) return { candidate, score: 100 - curated, reason: 'Suggested next step' };
      if (candidate.group !== record.group) return { candidate, score: 0 };
      const common = candidate.topics.filter(topic => record.topics.includes(topic));
      const isParent = candidate.route === record.parent;
      const isChild = candidate.parent === record.route;
      const contextual = record.outgoing.has(candidate.route);
      const backlink = candidate.outgoing.has(record.route);
      const score = (isParent ? 35 : 0) + (isChild ? 25 : 0) + (contextual ? 18 : 0) + (backlink ? 10 : 0) + common.length * 8;
      return { candidate, score, reason: isParent ? 'Explore this collection' : isChild ? 'In this collection' : contextual ? 'Continue this topic' : backlink ? 'More context' : 'Related reading' };
    }).filter(item => item.score > 0).sort((a,b) => b.score - a.score || a.candidate.route.localeCompare(b.candidate.route)).slice(0,4);
}
const publicNodes = [];
for (const record of records.values()) {
  const crumbs = trail(record), related = connected(record);
  const patches = [];
  const replace = (node, value) => {
    const loc = node.sourceCodeLocation;
    if (!loc) throw new Error(`Missing source range: ${record.route}`);
    patches.push({ start: loc.startOffset, end: loc.endOffset, value });
  };
  for (const nav of walk(record.doc, n => n.tagName === 'nav' && ((attr(n,'class') ?? '').split(/\s+/).includes('breadcrumbs') || attr(n,'aria-label') === 'Breadcrumb'))) replace(nav, '');
  for (const old of walk(record.main, n => attr(n,'data-site-connections') !== undefined || (n.tagName === 'section' && (attr(n,'class') ?? '').split(/\s+/).includes('related')))) replace(old, '');
  function prune(value) {
    if (Array.isArray(value)) return value.map(prune).filter(v => v !== undefined);
    if (!value || typeof value !== 'object') return value;
    if (value['@type'] === 'BreadcrumbList') return undefined;
    const result = Object.fromEntries(Object.entries(value).map(([key, child]) => [key, prune(child)]).filter(([,child]) => child !== undefined));
    if (value['@type'] === 'WebPage') {
      result.breadcrumb = { '@id': `${siteOrigin}${record.route}#breadcrumbs` };
      result.relatedLink = related.map(({candidate}) => siteOrigin + candidate.route);
    }
    return result;
  }
  for (const script of walk(record.doc, n => n.tagName === 'script' && attr(n,'type') === 'application/ld+json')) {
    const data = prune(JSON.parse(text(script)));
    replace(script, data === undefined ? '' : `<script type="application/ld+json"${attr(script,'id') ? ` id="${escape(attr(script,'id'))}"` : ''}>${JSON.stringify(data).replaceAll('<','\\u003c')}</script>`);
  }
  const schema = { '@context':'https://schema.org', '@type':'BreadcrumbList', '@id':`${siteOrigin}${record.route}#breadcrumbs`, itemListElement:crumbs.map((item,i)=>({ '@type':'ListItem', position:i+1, name:item.name, item:siteOrigin+item.route })) };
  const breadcrumb = record.route === '/' ? '' : `<nav class="breadcrumbs" aria-label="Breadcrumb" data-authored-breadcrumbs data-site-breadcrumbs><ol>${crumbs.map((item,i)=>`<li>${i ? '<span aria-hidden="true"> / </span>' : ''}${i === crumbs.length-1 ? `<span aria-current="page">${escape(item.name)}</span>` : `<a href="${item.route}">${escape(item.name)}</a>`}</li>`).join('')}</ol></nav>`;
  patches.push({start:record.main.sourceCodeLocation.startTag.endOffset,end:record.main.sourceCodeLocation.startTag.endOffset,value:breadcrumb+`<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>`});
  if (related.length) {
    const panel = `<section class="site-connections" data-site-connections aria-labelledby="connected-pages-title"><h2 id="connected-pages-title">Explore connected pages</h2><ul>${related.map(({candidate,reason})=>`<li><span>${escape(reason)}</span><a href="${candidate.route}">${escape(candidate.name)}</a></li>`).join('')}</ul><p><a href="/site-map">Explore all topics and pages</a></p></section>`;
    const end = record.main.sourceCodeLocation.endTag.startOffset;
    patches.push({start:end,end,value:panel});
  }
  if (record.route === '/site-map') {
    const placeholder = walk(record.main,n=>attr(n,'id') === 'site-map-list')[0];
    replace(placeholder, `<div id="site-map-list">${Object.entries(groups).map(([key,group])=>`<section class="site-directory-group" id="directory-${key}"><h2>${escape(group.label)}</h2><ul>${[...records.values()].filter(item=>item.indexable && item.group===key && !['/','/site-map'].includes(item.route)).sort((a,b)=>a.name.localeCompare(b.name)).map(item=>`<li><a href="${item.route}">${escape(item.name)}</a></li>`).join('')}</ul></section>`).join('')}</div>`);
  }
  // Source offsets preserve all unrelated markup, including generated-index slots.
  const ordered = patches.sort((a,b)=>a.start-b.start || a.end-b.end);
  let cursor=0, html='';
  for (const patch of ordered) {
    if (patch.start < cursor) continue; // A containing removed block owns this edit.
    html += record.html.slice(cursor,patch.start)+patch.value;
    cursor=patch.end;
  }
  html += record.html.slice(cursor);
  await writeFile(filename(record.route),html);
  publicNodes.push({route:record.route,name:record.name,parent:record.parent,group:record.group,indexable:record.indexable,topics:record.topics,breadcrumbs:crumbs.map(c=>({route:c.route,name:c.name})),related:related.map(({candidate,reason})=>({route:candidate.route,reason}))});
}
await writeFile(path.join(root,'site-navigation.json'),JSON.stringify({version:1,pages:publicNodes},null,2)+'\n');
console.log(`Built static site relationships for ${publicNodes.length} pages; ${publicNodes.reduce((n,p)=>n+p.related.length,0)} contextual connections.`);
