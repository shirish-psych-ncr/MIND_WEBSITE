const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const routes=process.argv.includes('--all')?JSON.parse(fs.readFileSync('dist/route-manifest.json')).routes:process.argv.slice(2).length?process.argv.slice(2):['/','/about','/services','/book','/resources','/blog','/tools/guided-breathing'];
 const results=[];
 for(const theme of ['light','dark']) {
  const context=await browser.newContext({viewport:{width:390,height:844},colorScheme:theme,reducedMotion:'reduce',serviceWorkers:'block'});
  await context.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:4321/')?r.continue():r.abort());
  const page=await context.newPage();
  for(const route of routes){
   const errors=[];const missing=[];page.removeAllListeners('pageerror');page.removeAllListeners('response');page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://127.0.0.1:4321'))missing.push(r.url())});
   await page.goto('http://127.0.0.1:4321'+route,{waitUntil:'networkidle'});
   const structure=await page.evaluate(()=>({title:document.title,headers:document.querySelectorAll('header.site-header').length,footers:document.querySelectorAll('footer.site-footer').length,banners:document.querySelectorAll('.emergency-banner').length,overflow:document.documentElement.scrollWidth>innerWidth,translation:!!document.querySelector('#mg-t-hindi-btn'),headScripts:document.head.querySelectorAll('script').length,main:!!document.querySelector('main')}));
   const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   const violations=axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));
   results.push({route,theme,structure,errors,missing,violations});
   fs.mkdirSync('output/migration',{recursive:true});fs.writeFileSync('output/migration/browser-audit.json',JSON.stringify(results,null,2));
   console.log(JSON.stringify({route,theme,structure,errors,missing,violations:violations.map(v=>[v.id,v.nodes.length])}));
   if(route==='/')await page.screenshot({path:'output/migration/home-'+theme+'.png',fullPage:true});
  }
  await context.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
