const { chromium } = require('C:/Users/lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
(async()=>{const browser=await chromium.launch({headless:true});const out=[];
for(const width of [390,1440]) {const page=await browser.newPage({viewport:{width,height:900}});for(const path of ['index.html','services.html','about.html','blog/pages/adult/overthinking-vs-anxiety.html','tools/guided-breathing.html']){await page.goto('http://127.0.0.1:8765/'+path);await page.waitForTimeout(700);out.push({width,path,...await page.evaluate(()=>({h1:document.querySelector('h1')?.getBoundingClientRect().top,header:document.querySelector('.site-header')?.getBoundingClientRect().height,overflow:document.documentElement.scrollWidth>innerWidth}))});if(path==='index.html')await page.screenshot({path:`output/layout/${process.argv[2]}-${width}.png`});}await page.close();}console.log(JSON.stringify(out));fs.writeFileSync(`output/layout/${process.argv[2]}.json`,JSON.stringify(out,null,2));await browser.close();})();


