// LIGHTHOUSE_CLI points to lighthouse/cli/index.js; requires playwright.
const {chromium} = require('playwright');
const {spawn} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const out = path.resolve('output/responsive-audit/lighthouse');
fs.mkdirSync(out,{recursive:true});
(async()=>{
  const browser = await chromium.launch({headless:true,args:['--remote-debugging-port=9223']});
  const routes = process.argv.slice(2);
  const summary=[];
  try {
    for (const route of routes.length ? routes : ['index.html','services.html','book.html','blog/index.html','tools/guided-breathing.html']) {
      for(const mode of route==='index.html'?['mobile','desktop']:['mobile']) {
        const output = path.join(out,route.replaceAll('/','-')+'-'+mode+'.json');
        const args=[process.env.LIGHTHOUSE_CLI,'http://127.0.0.1:8765/'+route,'--port=9223','--output=json','--output-path='+output,'--quiet'];
        if(mode==='desktop')args.push('--preset=desktop');
        await new Promise((resolve,reject)=>{const child=spawn(process.execPath,args,{stdio:'inherit'});child.on('error',reject);child.on('exit',code=>code?reject(new Error('Lighthouse exit '+code)):resolve());});
        const r=JSON.parse(fs.readFileSync(output));
        const row={route,mode,scores:Object.fromEntries(Object.entries(r.categories).map(([k,v])=>[k,Math.round(v.score*100)])),failed:Object.values(r.audits).filter(a=>a.score!==null&&a.score<1).map(a=>({id:a.id,value:a.displayValue}))};
        summary.push(row);console.log(JSON.stringify(row));
        fs.writeFileSync(path.join(out,'summary.json'),JSON.stringify(summary,null,2));
      }
    }
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
