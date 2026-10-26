import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import parse5 from 'parse5';
const graph=JSON.parse(await readFile('dist/site-navigation.json','utf8'));
const pages=new Map(graph.pages.map(page=>[page.route,page]));
const attr=(node,key)=>node.attrs?.find(a=>a.name===key)?.value;
const text=node=>node.nodeName==='#text'?node.value:(node.childNodes??[]).map(text).join('');
function find(node,test,result=[]){if(test(node))result.push(node);for(const child of node.childNodes??[])find(child,test,result);return result;}
const directory=await readFile('dist/site-map.html','utf8');
let links=0;
for(const page of pages.values()){
  const html=await readFile(`dist/${page.route==='/'?'index':page.route.slice(1)}.html`,'utf8');
  const doc=parse5.parse(html);
  const navs=find(doc,n=>n.tagName==='nav'&&attr(n,'aria-label')==='Breadcrumb');
  assert.equal(navs.length,page.route==='/'?0:1,`${page.route}: breadcrumb count`);
  if(navs.length){
    assert.notEqual(attr(navs[0],'data-authored-breadcrumbs'),undefined,`${page.route}: runtime override protection`);
    const anchors=find(navs[0],n=>n.tagName==='a');
    assert.deepEqual(anchors.map(n=>attr(n,'href')),page.breadcrumbs.slice(0,-1).map(p=>p.route),`${page.route}: ancestor destinations`);
    assert.deepEqual(anchors.map(text),page.breadcrumbs.slice(0,-1).map(p=>p.name),`${page.route}: ancestor labels`);
    const current=find(navs[0],n=>attr(n,'aria-current')==='page');
    assert.equal(current.length,1);assert.equal(text(current[0]),page.name);
  }
  const crumbs=[];
  function collect(value){if(Array.isArray(value))value.forEach(collect);else if(value&&typeof value==='object'){if(value['@type']==='BreadcrumbList')crumbs.push(value);Object.values(value).forEach(collect);}}
  for(const node of find(doc,n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json'))collect(JSON.parse(text(node)));
  assert.equal(crumbs.length,1,`${page.route}: breadcrumb schema count`);
  assert.deepEqual(crumbs[0].itemListElement.map(c=>c.name),page.breadcrumbs.map(c=>c.name));
  assert.deepEqual(crumbs[0].itemListElement.map(c=>new URL(c.item).pathname),page.breadcrumbs.map(c=>c.route));
  assert.equal(new Set(page.breadcrumbs.map(c=>c.route)).size,page.breadcrumbs.length,`${page.route}: cycle`);
  const panels=find(doc,n=>attr(n,'data-site-connections')!==undefined);
  assert.equal(panels.length,page.related.length?1:0,`${page.route}: connected panel count`);
  for(const related of page.related){assert(pages.get(related.route)?.indexable,`${page.route}: invalid related destination`);assert.notEqual(related.route,page.route);assert(html.includes(`href="${related.route}"`));links++;}
  if(page.indexable&&!['/','/site-map'].includes(page.route))assert(directory.includes(`href="${page.route}"`),`${page.route}: orphaned from directory`);
  if(!page.indexable)assert(!directory.includes(`href="${page.route}"`),`${page.route}: noindex page listed`);
}
console.log(`Static navigation passed: ${pages.size} pages, ${links} connections, matching visible/schema trails, no directory orphans.`);
