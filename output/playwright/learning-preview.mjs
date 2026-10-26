import {createServer} from 'node:http';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright';
const root=path.resolve('dist');
const server=createServer(async(req,res)=>{let name=new URL(req.url,'http://localhost').pathname;if(!path.extname(name))name+='.html';try{const data=await readFile(path.join(root,name));res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'})[path.extname(name)]||'application/octet-stream');res.end(data)}catch{res.writeHead(404).end()}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true});
try{
const page=await browser.newPage({viewport:{width:390,height:844}});
await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
await page.goto(origin+'/blog/pages/child/folinic-acid-and-autism');
if(await page.locator('.breadcrumbs a[href$="/aasha/learning"]').count()!==1)throw Error('Authored breadcrumb lost');
await page.screenshot({path:'output/playwright/learning-mobile.png',fullPage:true});
await page.screenshot({path:'output/playwright/longform-mobile-top.png'});
await page.goto(origin+'/blog/pages/child/autism-gut-health-and-diets');
await page.locator('.comparison-scroll').scrollIntoViewIfNeeded();
await page.screenshot({path:'output/playwright/longform-mobile-table.png'});
if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))throw Error('Page overflow');
await page.setViewportSize({width:1440,height:1000});
await page.goto(origin+'/blog/pages/child/mthfr-methylation-and-autism');
await page.screenshot({path:'output/playwright/longform-desktop-top.png'});
await page.goto(origin+'/aasha/learning');
for(const img of await page.locator('.learning-card img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
await page.evaluate(()=>scrollTo(0,0));
await page.screenshot({path:'output/playwright/learning-hub.png',fullPage:true});
await page.goto(origin+'/blog/pages/child/autism-gut-health-and-diets');
await page.locator('.section-reading a[href$="/daily-comfort-diary"]').click();
if(!page.url().includes('/aasha/resources/daily-comfort-diary'))throw Error('Article-to-resource navigation failed');
await page.locator('a[href="#worksheet"]').first().click();
if(!page.url().endsWith('#worksheet'))throw Error('Worksheet jump failed');
for(const slug of ['assessment-visit-planner','daily-comfort-diary','school-support-planner']){
await page.emulateMedia({media:'screen'});
await page.goto(origin+'/aasha/resources/'+slug);
await page.evaluate(()=>{window.print=()=>{window.__printed=true}});
for(const button of [page.locator('.print-learning').first(),page.locator('.print-learning').last()]){
await page.evaluate(()=>{window.__printed=false});
await button.click();
if(!await page.evaluate(()=>window.__printed))throw Error('Print control failed: '+slug);
}
await page.emulateMedia({media:'print'});
if(await page.locator('body > header').isVisible())throw Error('Header visible in print');
if(await page.locator('.aasha-care').isVisible())throw Error('Care card visible in print');
if(!await page.locator('.worksheet').isVisible())throw Error('Worksheet hidden in print');
await page.pdf({path:'output/playwright/'+slug+'.pdf',format:'A4',margin:{top:'12mm',bottom:'12mm',left:'14mm',right:'14mm'}});
}
console.log('Article-to-resource journey, worksheet jump, six print controls and three printable PDFs passed.');
}finally{await browser.close();server.close()}
