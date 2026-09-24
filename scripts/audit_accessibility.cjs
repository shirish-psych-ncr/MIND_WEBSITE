const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const out='output/responsive-audit';
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>['.git','node_modules','output'].includes(e.name)?[]:e.isDirectory()?files(path.join(dir,e.name)):e.name.endsWith('.html')?[path.join(dir,e.name).replaceAll('\\','/')]:[]);}
(async()=>{
 const browser=await chromium.launch({headless:true}); const results=[];
 for(const theme of ['light','dark']){
  const context=await browser.newContext({viewport:{width:390,height:844},colorScheme:theme,serviceWorkers:'block',reducedMotion:'reduce'});
  await context.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:8765/')?r.continue():r.abort());
  const page=await context.newPage();
  for(const route of process.argv.length>2?process.argv.slice(2):files('.')){
   await page.goto('http://127.0.0.1:8765/'+route,{waitUntil:'load'});
   await page.addScriptTag({path:process.env.AXE_PATH});
   const violations=await page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary}))})));
   results.push({route,theme,violations});
   fs.writeFileSync(out+'/accessibility.json',JSON.stringify(results,null,2));
   console.log(theme+' '+route+' '+violations.map(v=>v.id).join(','));
  }await context.close();
 }await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
