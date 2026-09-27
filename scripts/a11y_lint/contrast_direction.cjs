#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * contrast_direction.cjs — static color & directionality audit.
 *
 * Tools used (sandbox-friendly, pure math):
 *   1. wcag-contrast  -> every foreground/background color pair scored against WCAG AA/AAA
 *   3. color-blind    -> error/success/warning token pairs simulated for 4 CVD types;
 *                        flags pairs that become indistinguishable
 *  10. direction      -> scans HTML/i18n text for RTL runs and checks dir/lang consistency
 *
 * Outputs: output/a11y-lint/contrast.json, colorblind.json, direction.json
 */
const fs = require('node:fs');
const path = require('node:path');
const contrast = require('wcag-contrast');
const cb = require('color-blind');
const { direction } = require('direction');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'output', 'a11y-lint');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'output', 'skills', 'vendor', '.claude', '.agents', '.codex', '.opencode', '.cursor']);
const SCAN_EXT = new Set(['.css', '.scss', '.astro', '.html', '.htm', '.js', '.json', '.py']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name === 'vendor' && dir === ROOT) return []; // keep a11y.css vendored copy out of text scans? actually keep it
    const p = path.join(dir, e.name);
    if (SKIP_DIRS.has(e.name)) return [];
    return e.isDirectory() ? walk(p) : SCAN_EXT.has(path.extname(e.name)) ? [p] : [];
  });
}

// ---------- CSS custom property + declaration parsing ----------
function collectTokens(text) {
  const tokens = {};
  const re = /(--[\w-]+)\s*:\s*([^;{}]+)[;}]/g;
  let m;
  while ((m = re.exec(text))) {
    if (!(m[1] in tokens)) tokens[m[1]] = m[2].trim();
  }
  return tokens;
}

const NAMED = {
  black: '#000000', white: '#ffffff', red: '#ff0000', green: '#008000', blue: '#0000ff',
  yellow: '#ffff00', gray: '#808080', grey: '#808080', orange: '#ffa500', pink: '#ffc0cb',
  purple: '#800080', teal: '#008080', navy: '#00008b', maroon: '#800000', olive: '#808000',
  silver: '#c0c0c0', lime: '#00ff00', aqua: '#00ffff', cyan: '#00ffff', magenta: '#ff00ff',
  beige: '#f5f5dc', ivory: '#fffff0', gold: '#ffd700', indigo: '#4b0082', violet: '#ee82ee',
  crimson: '#dc143c', coral: '#ff7f50', salmon: '#fa8072', khaki: '#f0e68c', plum: '#dda0dd',
  turquoise: '#40e0d0', chocolate: '#d2691e', lavender: '#e6e6fa', tomato: '#ff6347',
  whitesmoke: '#f5f5f5', aliceblue: '#f0f8ff', honeydew: '#f0fff0', snow: '#fffafa',
  seashell: '#fff5ee', oldlace: '#fdf5e6', linen: '#faf0e6', papayawhip: '#ffefd5',
  peachpuff: '#ffdab9', mistyrose: '#ffe4e1', lemonchiffon: '#fffacd', goldenrod: '#daa520',
  firebrick: '#b22222', darkgreen: '#006400', darkred: '#8b0000', darkblue: '#00008b',
  dimgray: '#696969', dimgrey: '#696969', slategray: '#708090', forestgreen: '#228b22',
  seagreen: '#2e8b57', orchid: '#da70d6', brown: '#a52a2a',
};

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0]; else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x]; else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c]; else [r, g, b] = [c, 0, x];
  const to = (v) => Math.round(Math.min(255, Math.max(0, (r === v ? r + m : v + m) * 255)));
  const R = Math.round(Math.min(255, Math.max(0, (r + m) * 255)));
  const G = Math.round(Math.min(255, Math.max(0, (g + m) * 255)));
  const B = Math.round(Math.min(255, Math.max(0, (b + m) * 255)));
  void to;
  return '#' + [R, G, B].map((v) => v.toString(16).padStart(2, '0')).join('');
}

function oklchToHex(L, C, H) {
  if (L > 1) L /= 100;
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr), b = C * Math.sin(hr);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684410026 * l + 2.6092602764 * m - 0.3413193965 * s;
  let bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  const gam = (v) => { v = Math.min(1, Math.max(0, v)); return v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055; };
  return '#' + [r, g, bl].map((v) => Math.round(gam(v) * 255).toString(16).padStart(2, '0')).join('');
}

function normalizeHex(h) {
  h = h.replace('#', '');
  if (h.length === 3 || h.length === 4) h = h.slice(0, 3).split('').map((c) => c + c).join('');
  if (h.length === 8) h = h.slice(0, 6);
  return /^[0-9a-fA-F]{6}$/.test(h) ? '#' + h.toLowerCase() : null;
}

function parseColor(value, tokens, depth = 0) {
  if (!value || depth > 8) return null;
  const v = String(value).trim().toLowerCase();
  if (!v || ['transparent', 'currentcolor', 'inherit', 'initial', 'unset', 'none'].includes(v)) return null;
  if (NAMED[v]) return NAMED[v];
  if (/^#[0-9a-f]{3,8}$/.test(v)) return normalizeHex(v);
  let m = v.match(/^rgba?\(\s*([\d.]+)(%?)[,\s]+([\d.]+)(%?)[,\s]+([\d.]+)(%?)/);
  if (m) {
    const conv = (num, pct) => Math.round(Math.min(255, Math.max(0, pct === '%' ? parseFloat(num) * 2.55 : parseFloat(num))));
    return '#' + [conv(m[1], m[2]), conv(m[3], m[4]), conv(m[5], m[6])].map((x) => x.toString(16).padStart(2, '0')).join('');
  }
  m = v.match(/^hsla?\(\s*([\d.]+)(?:deg)?[,\s]+([\d.]+)%[,\s]+([\d.]+)%/);
  if (m) return hslToHex(parseFloat(m[1]) % 360, parseFloat(m[2]), parseFloat(m[3]));
  m = v.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)(%?)\s+(-?[\d.]+)/);
  if (m) return oklchToHex(parseFloat(m[1]), parseFloat(m[3]), parseFloat(m[5]));
  m = v.match(/var\(\s*(--[\w-]+)(?:,[^)]*)?\)/);
  if (m && tokens) return parseColor(tokens[m[1]], tokens, depth + 1);
  return null;
}

// Collect fg/bg declarations per selector block from all CSS sources
const FG_PROPS = ['color', '-webkit-text-fill-color'];
const BG_PROPS = ['background-color', 'background'];

function extractPairs(file, text, tokens) {
  const pairs = [];
  // strip comments
  const clean = text.replace(/\/\*[\s\S]*?\*\//g, ' ');
  const blockRe = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = blockRe.exec(clean))) {
    const selectors = m[1].trim().replace(/\s+/g, ' ');
    if (selectors.startsWith('@') || /^\d+$/.test(selectors)) continue;
    const body = m[2];
    const decls = {};
    for (const prop of [...FG_PROPS, ...BG_PROPS]) {
      const re = new RegExp('(?:^|[;\\s])' + prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*:\\s*([^;]+)', 'i');
      const dm = body.match(re);
      if (dm) decls[prop] = dm[1].trim();
    }
    const fgVal = decls['color'] || decls['-webkit-text-fill-color'];
    const bgVal = decls['background-color'] || decls['background'];
    if (!fgVal || !bgVal) continue;
    const fg = parseColor(fgVal, tokens);
    let bg = parseColor(bgVal, tokens);
    if (fg && !bg && bgVal) {
      // gradient or multi-value background: take first color-ish token inside
      const inner = bgVal.match(/#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\)|oklch\([^)]*\)|var\(--[\w-]+(?:,[^)]*)?\)/);
      if (inner) bg = parseColor(inner[0], tokens);
    }
    if (fg && bg) pairs.push({ file: path.relative(ROOT, file), selector: selectors.slice(0, 80), fg, bg, fgRaw: fgVal.slice(0, 60), bgRaw: bgVal.slice(0, 60) });
  }
  return pairs;
}

// ---------- run ----------
fs.mkdirSync(OUT, { recursive: true });
const files = walk(ROOT);
const allPairs = [];
const tokenMap = new Map(); // file -> tokens (global merge across css for var resolution)
const globalTokens = {};
for (const f of files) {
  if (!/\.(css|scss)$/.test(f)) continue;
  const t = fs.readFileSync(f, 'utf8');
  Object.assign(globalTokens, collectTokens(t));
}
for (const f of files) {
  let t;
  try { t = fs.readFileSync(f, 'utf8'); } catch { continue; }
  if (/\.(css|scss)$/.test(f)) {
    allPairs.push(...extractPairs(f, t, { ...globalTokens, ...collectTokens(t) }));
  } else if (/\.(astro|html|htm)$/.test(f)) {
    for (const sm of t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
      allPairs.push(...extractPairs(f, sm[1], { ...globalTokens, ...collectTokens(sm[1]) }));
    }
  } else if (/\.json$/.test(f)) {
    // design-token style JSON: {name: "#hex"} nested
    try {
      const obj = JSON.parse(t);
      const hexes = [];
      (function scan(o, keyPath) {
        if (typeof o === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(o)) hexes.push([keyPath, o]);
        else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) scan(v, keyPath ? keyPath + '.' + k : k);
      })(obj, '');
      const fg = hexes.filter(([k]) => /text|fg|foreground/i.test(k));
      const bg = hexes.filter(([k]) => /bg|background|surface/i.test(k));
      for (const [fk, fv] of fg) for (const [bk, bv] of bg) {
        allPairs.push({ file: path.relative(ROOT, f), selector: `token ${fk} on ${bk}`, fg: normalizeHex(fv), bg: normalizeHex(bv), fgRaw: fv, bgRaw: bv, tokenPair: true });
      }
    } catch { /* not json */ }
  }
}

// dedupe by fg/bg pair
const seen = new Set();
const uniq = allPairs.filter((p) => {
  const k = p.fg + '|' + p.bg;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

const contrastResults = uniq.map((p) => {
  let ratio = null, aa = null, aaa = null, aaLarge = null;
  try {
    ratio = contrast.hex(p.fg, p.bg);
    aa = ratio >= 4.5;
    aaLarge = ratio >= 3;
    aaa = ratio >= 7;
  } catch (e) { /* bad hex */ }
  return { ...p, ratio: ratio == null ? null : Number(ratio.toFixed(3)), passesAA: aa, passesAALargeText: aaLarge, passesAAA: aaa };
}).sort((a, b) => (a.ratio ?? 99) - (b.ratio ?? 99));

fs.writeFileSync(path.join(OUT, 'contrast.json'), JSON.stringify({
  tool: 'wcag-contrast', checked: contrastResults.length,
  failures: contrastResults.filter((r) => r.passesAA === false),
  results: contrastResults,
}, null, 2));

// ---------- color-blind simulation on semantic state colors ----------
const STATE_RE = /--[\w-]*(error|danger|success|warning)[\w-]*/i;
const stateTokens = Object.entries(globalTokens).filter(([k]) => STATE_RE.test(k) && parseColor(globalTokens[k], globalTokens));
const cvdFns = ['protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'];
const cvdResults = [];
for (let i = 0; i < stateTokens.length; i++) {
  for (let j = i + 1; j < stateTokens.length; j++) {
    const [[ka, va], [kb, vb]] = [stateTokens[i], stateTokens[j]];
    const ha = parseColor(va, globalTokens), hb = parseColor(vb, globalTokens);
    if (!ha || !hb) continue;
    for (const fn of cvdFns) {
      const sa = cb[fn](ha), sb = cb[fn](hb);
      let sim = 100;
      try { sim = contrast.rgb(hexRgb(sa), hexRgb(sb)) * 100; } catch { /* noop */ }
      // distance between simulated colors
      const dist = colorDist(sa, sb);
      cvdResults.push({ pair: `${ka} (${ha}) vs ${kb} (${hb})`, type: fn, simA: sa, simB: sb, distance: Math.round(dist), indistinguishable: dist < 30 });
    }
  }
}
function hexRgb(h) { const n = normalizeHex(h); return [parseInt(n.slice(1, 3), 16), parseInt(n.slice(3, 5), 16), parseInt(n.slice(5, 7), 16)]; }
function colorDist(a, b) { const [ra, ga, ba] = hexRgb(a), [rb, gb, bb] = hexRgb(b); return Math.sqrt((ra - rb) ** 2 + (ga - gb) ** 2 + (ba - bb) ** 2); }

fs.writeFileSync(path.join(OUT, 'colorblind.json'), JSON.stringify({
  tool: 'color-blind', stateTokensChecked: stateTokens.length,
  confusions: cvdResults.filter((r) => r.indistinguishable),
  results: cvdResults,
}, null, 2));

// ---------- direction (RTL/LTR adaptability) ----------
const dirResults = [];
const rtlFiles = new Set();
for (const f of files) {
  let t;
  try { t = fs.readFileSync(f, 'utf8'); } catch { continue; }
  let texts = [];
  if (/\.json$/.test(f)) {
    try { const o = JSON.parse(t); (function rec(v) { if (typeof v === 'string') texts.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(rec); })(o); } catch { /* noop */ }
  } else if (/\.(html|htm|astro)$/.test(f)) {
    texts = [...t.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').matchAll(/>([^<>{}]{4,})</g)].map((m) => m[1]);
    // also flag explicit dir attributes
    for (const dm of t.matchAll(/<([a-z0-9-]+)[^>]*\bdir=["']([^"']+)["']/gi)) {
      dirResults.push({ file: path.relative(ROOT, f), element: dm[1], declaredDir: dm[2], kind: 'attr' });
    }
  } else if (/\.py$/.test(f)) {
    texts = [...t.matchAll(/["']([^"'{}\n]{8,})["']/g)].map((m) => m[1]);
  } else if (/\.js$/.test(f)) {
    texts = [...t.matchAll(/["'`]([^"'`{}\n]{8,})["'`]/g)].map((m) => m[1]);
  }
  for (const s of texts) {
    const d = direction(s.trim());
    if (d === 'rtl') {
      rtlFiles.add(path.relative(ROOT, f));
      dirResults.push({ file: path.relative(ROOT, f), text: s.trim().slice(0, 60), detected: 'rtl', kind: 'content' });
    }
  }
}
// html lang/dir consistency check
const htmlLangIssues = [];
for (const f of files.filter((x) => /\.(html|astro)$/.test(x))) {
  const t = fs.readFileSync(f, 'utf8');
  const lm = t.match(/<html[^>]*>/i);
  if (lm) {
    const lang = (lm[0].match(/lang=["']([^"']+)["']/i) || [])[1];
    const dir = (lm[0].match(/dir=["']([^"']+)["']/i) || [])[1];
    const isRtlLang = lang && /^(ar|he|fa|ur|ps|sd|yi|ku|dv|ckb)(-|$)/i.test(lang);
    if (isRtlLang && dir !== 'rtl') htmlLangIssues.push({ file: path.relative(ROOT, f), lang, dir, issue: 'RTL language without dir="rtl"' });
    if (!isRtlLang && dir === 'rtl' && rtlFiles.size === 0) htmlLangIssues.push({ file: path.relative(ROOT, f), lang, dir, issue: 'dir="rtl" but no RTL content detected' });
    if (!lang) htmlLangIssues.push({ file: path.relative(ROOT, f), lang, dir, issue: 'missing lang attribute on <html>' });
  }
}
fs.writeFileSync(path.join(OUT, 'direction.json'), JSON.stringify({
  tool: 'direction', rtlContentFiles: [...rtlFiles], rtlSnippets: dirResults.filter((r) => r.kind === 'content').length,
  langDirIssues: htmlLangIssues, details: dirResults.slice(0, 200),
}, null, 2));

console.log(`[contrast] ${contrastResults.length} unique fg/bg pairs checked, ${contrastResults.filter((r) => r.passesAA === false).length} fail WCAG AA`);
console.log(`[color-blind] ${stateTokens.length} semantic state tokens, ${cvdResults.filter((r) => r.indistinguishable).length} potential CVD confusions`);
console.log(`[direction] ${rtlFiles.size} files contain RTL text, ${htmlLangIssues.length} lang/dir issues`);
console.log('Wrote output/a11y-lint/{contrast,colorblind,direction}.json');
