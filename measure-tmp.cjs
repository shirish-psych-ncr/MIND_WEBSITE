const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({headless:true});
 const ctx=await b.newContext({viewport:{width:390,height:844},colorScheme:'light',serviceWorkers:'block'});
 await ctx.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:8765/')?r.continue():r.abort());
 const p=await ctx.newPage();
 for(const route of ['tools/leaf-on-stream.html','tools/guided-breathing.html']){
  await p.goto('http://127.0.0.1:8765/'+route,{waitUntil:'load'});
  const info=await p.evaluate(()=>{
   const bar=document.querySelector('.tool-link-bar'); if(!bar) return null;
   const cs=getComputedStyle(bar); const r=bar.getBoundingClientRect();
   return {position:cs.position,top:cs.top,z:cs.zIndex,y:r.y,h:r.height,parent:bar.parentElement.tagName+'.'+bar.parentElement.className.split(' ')[0],parentPos:getComputedStyle(bar.parentElement).position};
  });
  console.log(route,JSON.stringify(info));
 }
 await b.close();
})();
