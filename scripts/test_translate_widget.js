#!/usr/bin/env node
/* Smoke test for assets/js/translate.js using jsdom.
   Requires: npm i -g jsdom  (or set NODE_PATH to a dir containing it).
   Checks: control injection into header nav, हिन्दी quick button drives the
   Google .goog-te-combo select + dispatches change, globe panel opens with
   18 language options, selection persists via localStorage, analytics event
   fires through window.mgAnalytics.track. */
'use strict';
const fs = require('fs');
const path = require('path');
let JSDOM;
try { ({ JSDOM } = require('jsdom')); }
catch (e) { console.error('jsdom not installed — run: npm i jsdom'); process.exit(2); }

const rootDir = path.join(__dirname, '..');
const html = '<!DOCTYPE html><html lang="en"><head><title>t</title></head><body>' +
  '<header class="site-header"><nav><ul class="nav-list"><li><a href="/">Home</a></li></ul></nav></header>' +
  '<main><h1>Hello</h1></main></body></html>';

const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'https://mindgracencr.in/', pretendToBeVisual: true });
const { window } = dom;

const combo = window.document.createElement('select');
combo.className = 'goog-te-combo';
for (const v of ['', 'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'ur', 'es', 'fr', 'de', 'ar', 'zh-CN', 'ja', 'ru']) {
  const o = window.document.createElement('option'); o.value = v; combo.appendChild(o);
}
window.document.body.appendChild(combo);
let changes = 0; combo.addEventListener('change', () => changes++);
const tracked = [];
window.mgAnalytics = { track(n, p) { tracked.push([n, p]); } };

// jsdom with runScripts:'outside-only' keeps readyState 'loading', so dispatch
// DOMContentLoaded ourselves — exactly the event a real deferred script sees.
window.eval(fs.readFileSync(path.join(rootDir, 'assets/js/translate.js'), 'utf8'));
window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

const doc = window.document;
function assert(cond, msg) { if (!cond) { console.error('FAIL:', msg); process.exit(1); } console.log('ok  -', msg); }

assert(doc.getElementById('mg-translate-root'), 'control injected');
assert(doc.querySelector('.nav-list #mg-translate-root'), 'control placed inside header nav list');
assert(doc.querySelectorAll('#mg-t-panel .mg-t-lang').length === 18, 'panel lists 18 languages');

doc.getElementById('mg-t-hindi-btn').dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
assert(combo.value === 'hi' && changes === 1, 'हिन्दी button translates page to Hindi (drives goog-te-combo + change)');
assert(window.localStorage.getItem('mg-lang') === 'hi', 'choice persisted to localStorage');
assert(tracked.some(([n, p]) => n === 'Language Selected' && p.language === 'hi' && p.source === 'hindi_button'), 'analytics event fired');

doc.getElementById('mg-t-menu-btn').dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
assert(!doc.getElementById('mg-t-panel').hidden, 'globe button opens language panel');
doc.querySelector('#mg-t-panel [data-lang="ta"]').dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
assert(combo.value === 'ta' && changes === 2, 'panel selection switches language (Tamil)');
assert(doc.getElementById('mg-t-panel').hidden, 'panel closes after selection');

console.log('\nALL TRANSLATE WIDGET TESTS PASSED');
