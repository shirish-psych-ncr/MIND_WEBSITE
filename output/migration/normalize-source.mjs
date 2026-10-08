import {aliases} from '../../scripts/public-assets.mjs';
import {readdir,readFile,writeFile} from 'node:fs/promises';
const map=await aliases();
async function walk(dir){ for(const e of await readdir(dir,{withFileTypes:true})){const file=dir+'/'+e.name;if(e.isDirectory()&&e.name!=='min')await walk(file);else if(/\.(astro|js)$/.test(file)){const text=await readFile(file,'utf8');const normalized=text.replace(/(["'])(\/(?!\/)[^"'\s]*)(["'])/g,(all,q,value,end)=>{try{const u=new URL(value,'https://mindgracencr.in');return map[u.pathname]?q+map[u.pathname]+u.search+u.hash+end:all;}catch{return all}});if(normalized!==text)await writeFile(file,normalized);}}}
await walk('src');await walk('assets/js');
