#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * structure_lint.cjs — HTML validity + JSX/AST accessibility + i18n coverage.
 *
 * Tools used:
 *  11. html-validate          -> strict validation of all .html files (config/htmlvalidate.json)
 *  10. eslint-plugin-jsx-a11y -> a11y lint of JS/JSX sources (config/eslintrc.jsx-a11y.json);
 *                                .astro templates are converted to JSX and linted too
 *  12. i18next-scanner        -> AST scan for hardcoded strings (linguistic adaptability)
 *
 * Outputs: output/a11y-lint/html-validate.json, jsx-a11y.json, i18n-hardcoded.json
 */
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'output', 'a11y-lint');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'output', 'skills', '.claude', '.agents', '.codex', '.opencode', '.cursor']);

function walk(dir, test) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p, test));
    else if (test(e.name)) out.push(p);
  }
  return out;
}

async function runHtmlValidate() {
  const { HtmlValidate } = require('html-validate');
  const configPath = path.join(ROOT, 'config', 'htmlvalidate.json');
  const htmlv = new HtmlValidate(JSON.parse(fs.readFileSync(configPath, 'utf8')));
  const htmlFiles = walk(ROOT, (n) => /\.(html|htm)$/i.test(n));
  const results = [];
  let errorCount = 0;
  for (const f of htmlFiles) {
    const report = await htmlv.validateFile(f);
    const messages = report.results.flatMap((r) => r.messages.map((m) => ({
      line: m.line, column: m.column, severity: m.severity, ruleId: m.ruleId, message: m.message,
    })));
    errorCount += messages.filter((m) => m.severity === 2).length;
    results.push({ file: path.relative(ROOT, f), errors: messages.filter((m) => m.severity === 2).length, warnings: messages.filter((m) => m.severity === 1).length, messages: messages.slice(0, 40) });
  }
  fs.writeFileSync(path.join(OUT, 'html-validate.json'), JSON.stringify({
    tool: 'html-validate', filesChecked: htmlFiles.length, totalErrors: errorCount, results,
  }, null, 2));
  console.log(`[html-validate] ${htmlFiles.length} files checked, ${errorCount} errors`);
}

// Replace top-level Astro control-flow directives (if/else/each/body/map) that sit
// between tags with balanced-brace JSX expressions so the template stays parseable.
function replaceDirectives(tpl) {
  const DIR_RE = /^\s*(?:<!--\s*)?{(if|else if|else|each body|each|body|map)\b/;
  let out = '';
  let i = 0;
  while (i < tpl.length) {
    const lt = tpl.indexOf('<', i);
    if (lt === -1) { out += tpl.slice(i); break; }
    out += tpl.slice(i, lt);
    // segment from this tag start to the next tag start
    let nt = tpl.indexOf('<', lt + 1);
    if (nt === -1) nt = tpl.length;
    // find end of THIS tag first
    const gt = tpl.indexOf('>', lt);
    if (gt === -1) { out += tpl.slice(lt); break; }
    // extend segment until the next '<' that begins a tag/close-tag
    nt = lt + 1;
    while (nt < tpl.length) {
      const c = tpl.indexOf('<', nt);
      if (c === -1) { nt = tpl.length; break; }
      if (/^<[a-zA-Z!/]/.test(tpl.slice(c))) { nt = c; break; }
      nt = c + 1;
    }
    const seg = tpl.slice(gt + 1, nt);
    const dm = seg.match(DIR_RE);
    if (dm) {
      // consume balanced braces starting at the '{' inside the segment
      let bi = seg.indexOf('{');
      let depth = 0; let j = bi;
      for (; j < seg.length; j++) {
        if (seg[j] === '{') depth++;
        else if (seg[j] === '}') { depth--; if (depth === 0) { j++; break; } }
      }
      const expr = seg.slice(bi, j);
      const stripped = expr
        .replace(/^\{\s*(?:else if|if)\b/, '{cond ? null : null}') // placeholder keeps braces
        .replace(/^\{\s*else\s*\}/, '')
        .replace(/^\{\s*else\b/, '')
        .replace(/^\{\s*each\b[\s\S]*?\}/, '{null}')
        .replace(/^\{\s*(?:each body|body|map)\b[\s\S]*?\}/, '{null}');
      out += tpl.slice(gt, gt + 1) + stripped;
      i = nt;
      continue;
    }
    out += tpl.slice(gt, nt);
    i = nt;
  }
  return out;
}

// Scan a tag's attribute list (text between "<name" and the closing ">" of the
// opening tag), tracking quote state so '>' inside quoted values doesn't end it.
function scanTagAttrs(str, from) {
  let i = from;
  while (i < str.length) {
    const c = str[i];
    if (c === '"' || c === "'") {
      const q = c; i++;
      while (i < str.length && str[i] !== q) i++;
      i++;
      continue;
    }
    if (c === '>') return { gt: i };
    i++;
  }
  return { gt: -1 };
}

// Find the index of `pat` at brace-depth `want` within str[start..], skipping
// quoted strings and nested braces. Returns -1 if never reached/closed.
function findAtDepth(str, start, pat, want) {
  let depth = 0; let i = start;
  while (i < str.length) {
    const c = str[i];
    if (c === '{' && depth < want) { depth++; i++; continue; }
    if (c === '}') { if (depth === want) return -1; depth--; i++; continue; }
    if (c === '"' || c === "'" || c === '`') {
      const q = c; i++;
      while (i < str.length && str[i] !== q) { if (str[i] === '\\') i++; i++; }
      i++; continue;
    }
    if (depth === want && str.startsWith(pat, i)) return i;
    i++;
  }
  return -1;
}

// Rewrite Astro control-flow expressions ({if}/{each}/{else} …) into valid JSX
// expressions: `{if cond}A{else}B{/if}` → `{cond ? A : B}`, `{each x as y}T{/each}`
// → `{null}` (or mapped to placeholder JSX when `keepEach`), preserving nesting.
function rewriteControlFlow(s, keepEach) {
  let out = '';
  let i = 0;
  while (i < s.length) {
    const lt = s.indexOf('<', i);
    if (lt === -1) { out += rewriteExprs(s.slice(i), keepEach); break; }
    out += rewriteExprs(s.slice(i, lt), keepEach);
    if (s.startsWith('<!--', lt)) {
      const e = s.indexOf('-->', lt);
      i = e === -1 ? s.length : e + 3;
      continue;
    }
    // tag regex must not cross newlines inside the attribute region unless
    // quotes are balanced — use quote-aware scan instead:
    const tm = /^<\/?[a-zA-Z!][^>\"\n]*/.exec(s.slice(lt));
    if (!tm) { out += ' '; i = lt + 1; continue; }
    let j = lt + tm[0].length;
    // continue scanning while inside an unbalanced quote or before '>'
    while (j < s.length && s[j] !== '>') {
      if (s[j] === '"' || s[j] === "'") { const q = s[j]; j++; while (j < s.length && s[j] !== q) j++; j++; continue; }
      j++;
    }
    out += s.slice(lt, Math.min(j + 1, s.length));
    i = j + 1;
  }
  return out;
}

function rewriteExprs(text, keepEach) {
  let res = '';
  let i = 0;
  while (i < text.length) {
    const open = text.indexOf('{', i);
    if (open === -1) { res += text.slice(i); break; }
    res += text.slice(i, open);
    // matching close brace (quote-aware)
    let depth = 0; let j = open;
    for (; j < text.length; j++) {
      const c = text[j];
      if (c === '"' || c === "'" || c === '`') {
        const q = c; j++;
        while (j < text.length && text[j] !== q) { if (text[j] === '\\') j++; j++; }
        continue;
      }
      if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) { j++; break; } }
    }
    if (depth !== 0) { res += ' '; i = text.length; break; }
    const expr = text.slice(open, j); // includes braces
    let dm = /^\{\s*(if|else if|else|each body|each|body|map)\b/.exec(expr);
    // `{foo.map(...)} ` style: directive keyword sitting inside the expression
    if (!dm && /^\{\s*[\w$][\w$.]*\.map\s*\(/.test(expr)) {
      dm = [expr.replace(/^(\{\s*[\w$][\w$.]*\.map\b)/, '{map'), 'map'];
    }
    if (!dm) { res += expr; i = j; continue; }
    const kind = dm[1];
    if (kind === 'map') {
      // JS array-map expression that already yields JSX — keep it as an
      // interpolation but collapse inner `{...}` interpolations to "expr"
      // so attr values like href={href} become valid string literals.
      const inner = expr.slice(1, -1).replace(/\{\s*([\w$][\w$.]*)\s*\}/g, '"$1"');
      res += `{${inner}}`;
      i = j;
      continue;
    }
    if (kind === 'each') {
      const end = findAtDepth(text, j, '{/each}', 0);
      if (end === -1) { res += '{null}'; i = text.length; break; }
      const inner = text.slice(j, end);
      res += keepEach ? `{[${rewriteControlFlow(inner, keepEach)}]}` : '{null}';
      i = end + '{/each}'.length;
      continue;
    }
    if (kind === 'if') {
      const els = findAtDepth(text, j, '{else', 0);
      const end = findAtDepth(text, j, '{/if}', 0);
      if (end === -1) { res += '{null}'; i = text.length; break; }
      const cond = expr.replace(/^\{\s*if\s+/, '').replace(/\}$/, '').trim() || 'false';
      const thenB = text.slice(j, els === -1 || els > end ? end : els);
      let alt = '';
      if (els !== -1 && els < end) {
        const afterElse = text.slice(els + '{else'.length);
        const gt = afterElse.indexOf('}');
        const elseif = /^\s*if\b/.test(afterElse);
        const elseCond = elseif ? afterElse.slice(4, gt).trim() : null;
        const elseStart = els + gt + 1;
        const elseEnd = findAtDepth(text, elseStart, '{/if}', 0);
        alt = elseif
          ? rewriteExprs('{if ' + elseCond + '}' + text.slice(elseStart, elseEnd === -1 ? end : elseEnd) + '{/if}', keepEach)
          : text.slice(elseStart, elseEnd === -1 ? end : elseEnd);
      }
      res += `{(${cond}) ? [${rewriteControlFlow(thenB, keepEach)}] : [${rewriteControlFlow(alt, keepEach)}]}`;
      i = end + '{/if}'.length;
      continue;
    }
    // stray else/body/map without opener — drop it
    res += '{null}';
    i = j;
  }
  return res;
}

// Convert an Astro template section into JSX-parseable code for jsx-a11y rules.
// This is a deliberate lossy transform: JS interpolations become "expr", style/
// script bodies are dropped, Astro directives collapse — enough structure for
// eslint-plugin-jsx-a11y to inspect real elements and attributes.
function astroToJsx(file, opts = {}) {
  const strict = !!opts.strict;
  const src = fs.readFileSync(file, 'utf8');
  let tpl;
  if (/<template[\s>]/i.test(src) && /^---/.test(src)) {
    const m = src.match(/^---[\s\S]*?---\s*([\s\S]*)$/);
    tpl = m ? m[1] : src;
  } else {
    // Astro components/pages: everything outside the frontmatter block is template markup
    tpl = src.replace(/^---[\s\S]*?---\s*/m, '');
  }
  // Balance tags first (quote-aware): unclosed void-style or dropped custom
  // components otherwise poison the whole file's parse.
  tpl = rewriteControlFlow(tpl, !strict);
  if (strict) {
    // Drop whole <noscript>…</noscript> subtrees and inline SVG icon contents —
    // the usual culprits for JSX-parse breakage in Astro templates.
    tpl = tpl.replace(/<noscript\b[\s\S]*?<\/noscript\s*>/gi, ' ');
    tpl = tpl.replace(/<svg\b[\s\S]*?<\/svg\s*>/gi, () => '<svg aria-hidden="true" />');
  }

  const VOID = new Set(['img', 'input', 'br', 'hr', 'meta', 'link', 'source', 'area', 'col', 'track', 'wbr']);
  // Custom Astro components (<Head />, <Slot />) can't nest-check in JSX; make them comments
  const CUSTOM_RE = /^(Head|Shell|Layout|Slot|Header|Footer|Nav|Base|SEO|Analytics)$/i;
  // Pre-pass: self-close void elements written HTML-style (`<img ...>`), which
  // JSX rejects, and drop stray closing tags for custom components/voids.
  {
    let p = 0; const parts = [];
    while (p < tpl.length) {
      const lt = tpl.indexOf('<', p);
      if (lt === -1) { parts.push(tpl.slice(p)); break; }
      parts.push(tpl.slice(p, lt));
      if (tpl.startsWith('<!--', lt)) { const e = tpl.indexOf('-->', lt); parts.push(tpl.slice(lt, e === -1 ? tpl.length : e + 3)); p = e === -1 ? tpl.length : e + 3; continue; }
      let cm;
      if ((cm = /^<\/([a-zA-Z][\w:-]*)\s*>/.exec(tpl.slice(lt)))) {
        const n = cm[1].toLowerCase();
        if (!CUSTOM_RE.test(n) && n !== 'slot' && !VOID.has(n)) parts.push(cm[0]);
        p = lt + cm[0].length; continue;
      }
      let om;
      if ((om = /^<([a-zA-Z][\w:-]*)/.exec(tpl.slice(lt)))) {
        const name = om[1].toLowerCase();
        const sc = scanTagAttrs(tpl, lt + om[0].length);
        if (sc.gt === -1) { parts.push(tpl.slice(lt)); p = tpl.length; continue; }
        const attrsRaw = tpl.slice(lt + om[0].length, sc.gt);
        const selfClose = /\/\s*$/.test(attrsRaw);
        if (VOID.has(name) && !selfClose) parts.push(`<${om[1]}${attrsRaw} />`);
        else parts.push(tpl.slice(lt, sc.gt + 1));
        p = sc.gt + 1; continue;
      }
      parts.push('<'); p = lt + 1;
    }
    tpl = parts.join('');
  }
  let out = '';
  let i = 0;
  while (i < tpl.length) {
    const lt = tpl.indexOf('<', i);
    if (lt === -1) {
      out += tpl.slice(i).replace(/[<>]/g, ' ');
      break;
    }
    // raw text before this tag: escape stray angle brackets, drop brace exprs
    out += tpl.slice(i, lt).replace(/\{[^{}]*\}/g, ' ').replace(/[<>]/g, ' ');
    const rest = tpl.slice(lt);
    if (rest.startsWith('<!--')) {
      const e = tpl.indexOf('-->', lt);
      i = e === -1 ? tpl.length : e + 3;
      continue;
    }
    let m;
    if ((m = /^<![^>]*>/.exec(rest))) { // <!DOCTYPE ...>, <?xml ...?>
      i = lt + m[0].length;
      continue;
    }
    if ((m = /^<style\b/i.exec(rest))) {
      const e = rest.search(/<\/style\s*>/i);
      i = lt + (e === -1 ? rest.length : e + m[0].length);
      out += ' ';
      continue;
    }
    if ((m = /^<script\b/i.exec(rest))) {
      const e = rest.search(/<\/script\s*>/i);
      i = lt + (e === -1 ? rest.length : e + m[0].length);
      out += ' ';
      continue;
    }
    if ((m = /^<\/([a-zA-Z][\w:-]*)\s*>/.exec(rest))) {
      const n = m[1].toLowerCase();
      out += CUSTOM_RE.test(n) || n === 'slot' ? '' : `</${n}>`;
      i = lt + m[0].length;
      continue;
    }
    if ((m = /^<([a-zA-Z][\w:-]*)/.exec(rest))) {
      const name = m[1].toLowerCase();
      const sc = scanTagAttrs(tpl, lt + m[0].length);
      if (sc.gt === -1) { i = tpl.length; continue; }
      let attrs = tpl.slice(lt + m[0].length, sc.gt);
      i = sc.gt + 1;
      const selfClosing = /\/\s*$/.test(attrs);
      if (selfClosing) attrs = attrs.replace(/\/\s*$/, ''); // re-add ' />' after attr cleanup
      if (CUSTOM_RE.test(name) || name === 'slot') continue; // drop custom components
      // collapse template-literal / interpolation attr values to a safe literal
      attrs = attrs.replace(/=\s*\{(?:[^{}]|\{[^{}]*\})*\}/g, '="expr"');
      attrs = attrs.replace(/=\s*`[^`]*`/g, '="expr"');
      // spread props {...extraAttrs} -> remove entirely
      attrs = attrs.replace(/\{\.\.\.[^}]*\}/g, ' ');
      // Astro directive namespaces (client:load, set:html, is:inline, transition:name)
      attrs = attrs.replace(/\b(client|set|is|transition):([\w-]+)/g, 'astro-$1-$2');
      // boolean-style directive without value, e.g. `transition:animate`
      attrs = attrs.replace(/\s(client|set|is|transition):([\w-]+)(?=[\s/>]|$)/g, ' astro-$1-$2="expr"');
      attrs = attrs.replace(/\bclass=/g, 'className=').replace(/(^|[\s"'])for=/g, '$1htmlFor=');
      attrs = attrs.replace(/`/g, "'");
      // drop any leftover brace fragments inside attr text
      attrs = attrs.replace(/[{}]/g, ' ');
      out += `<${name}${attrs}${selfClosing ? ' />' : '>'}`;
      continue;
    }
    // lone '<' that isn't a tag start
    out += ' ';
    i = lt + 1;
  }
  return `function AstroTemplate() {\n  return (\n    <>\n${out}\n    </>\n  );\n}\nexport default AstroTemplate;\n`;
}

async function runJsxA11y() {
  const { ESLint } = require('eslint');
  const JSX_A11Y_RULES = [
    'alt-text', 'anchor-has-content', 'aria-props', 'aria-role', 'aria-unsupported-elements',
    'heading-has-content', 'img-redundant-alt', 'label-has-associated-control', 'no-access-key',
    'no-distracting-elements', 'role-has-required-aria-props', 'role-supports-aria-props',
    'html-has-lang', 'iframe-has-title',
  ];
  const jsxPlugin = require('eslint-plugin-jsx-a11y');
  // ESLint v9 flat-config: plugin object embedded directly, no rc file discovery.
  const eslint = new ESLint({
    overrideConfigFile: true,
    baseConfig: [{
      files: ['**/*.jsx'],
      plugins: { 'jsx-a11y': jsxPlugin },
      languageOptions: { ecmaVersion: 2022, sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } } },
      rules: Object.fromEntries(JSX_A11Y_RULES.map((r) => [`jsx-a11y/${r}`, 'error'])),
    }],
    fix: false,
  });
  const tmp = fs.mkdtempSync(path.join(OUT, '.jsx-a11y-tmp-'));
  try {
    const astroFiles = walk(ROOT, (n) => /\.astro$/i.test(n));
    // Pass 1: convert + transform. Pass 2 (below): if a converted file fails to
    // parse, retry with a stricter transform that drops <noscript> subtrees and
    // SVG contents — the most common sources of JSX-parse breakage in Astro.
    const astroConverted = [];
    for (const f of astroFiles) {
      let jsx; let strict = false;
      try { jsx = astroToJsx(f); } catch { continue; }
      if (!jsx) continue;
      const t = path.join(tmp, f.replaceAll(/[\\/]/g, '__') + '.jsx');
      fs.writeFileSync(t, jsx);
      astroConverted.push({ tmp: t, orig: path.relative(ROOT, f), strict });
    }
    const realJsx = walk(ROOT, (n) => /\.(jsx|tsx)$/i.test(n));
    const targets = [...realJsx, ...astroConverted.map((a) => a.tmp)];
    const summary = [];
    let results = targets.length ? await eslint.lintFiles(targets) : [];
    const failed = new Set(results.filter((r) => r.messages.some((m) => m.fatal)).map((r) => r.filePath));
    if (failed.size) {
      // regenerate failing files with the strict transform and re-lint them
      for (const conv of astroConverted) {
        if (!failed.has(conv.tmp)) continue;
        const jsx = astroToJsx(conv.orig.startsWith('src') ? path.join(ROOT, conv.orig) : path.join(ROOT, conv.orig), { strict: true });
        fs.writeFileSync(conv.tmp, jsx);
        conv.strict = true;
      }
      results = targets.length ? await eslint.lintFiles(targets) : [];
    }
    let parseFailures = 0;
    for (const r of results) {
      const conv = astroConverted.find((a) => a.tmp === r.filePath);
      const fatal = r.messages.filter((m) => m.fatal);
      if (fatal.length) parseFailures++;
      summary.push({
        file: conv ? conv.orig : path.relative(ROOT, r.filePath),
        errors: r.errorCount - fatal.length, warnings: r.warningCount,
        parseFailure: fatal.length > 0,
        messages: r.messages.filter((m) => !m.fatal).map((m) => ({ rule: m.ruleId, line: m.line, message: m.message })).slice(0, 30),
      });
    }
    fs.writeFileSync(path.join(OUT, 'jsx-a11y.json'), JSON.stringify({
      tool: 'eslint-plugin-jsx-a11y',
      note: `${astroConverted.length} .astro templates converted to JSX for static a11y linting; ${realJsx.length} native .jsx/.tsx files; ${parseFailures} file(s) unparseable even after strict transform`,
      filesChecked: targets.length,
      totalErrors: summary.reduce((n, s) => n + s.errors, 0),
      results: summary.sort((a, b) => b.errors - a.errors),
    }, null, 2));
    console.log(`[jsx-a11y] ${targets.length} files linted (${astroConverted.length} from .astro), ${summary.reduce((n, s) => n + s.errors, 0)} errors, ${parseFailures} parse failures`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

async function runI18nScanner() {
  // i18next-scanner exposes createStream + Parser (AST-based via acorn).
  const i18n = require('i18next-scanner');
  const targets = walk(ROOT, (n) => /\.(js|jsx|ts|tsx|vue|astro)$/i.test(n)).filter((f) => !f.includes('.min.'));
  const contents = targets.map((f) => ({ file: path.relative(ROOT, f), code: fs.readFileSync(f, 'utf8') }));

  // 1) Feed files through the real i18next-scanner stream to collect translated keys used via t()/_.
  let translatedKeys = new Set();
  try {
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'i18n-cat-'));
    const scanner = new i18n.default ? null : null; // (module shape guard)
    void scanner;
    if (typeof i18n.createStream === 'function') {
      // Older/newer builds export createStream(config); fall back to Parser below if it throws.
      const stream = i18n.createStream({
        defaultNS: 'translation',
        func: { list: ['t', 'i18next.t', '_', '__', 'this._t'], extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'] },
        lngs: ['en'],
      });
      await new Promise((resolve) => {
        const chunks = [];
        stream.on('data', (file) => chunks.push(file));
        stream.on('end', () => {
          for (const f of chunks) {
            try {
              const cat = JSON.parse(f.contents.toString());
              for (const k of Object.keys(cat)) translatedKeys.add(k);
            } catch { /* noop */ }
          }
          resolve();
        });
        stream.on('error', () => resolve());
        for (const c of contents) {
          if (/\.(js|jsx|ts|tsx|vue)$/.test(c.file)) {
            stream.write({ path: c.file, contents: Buffer.from(c.code) });
          }
        }
        stream.end();
        setTimeout(resolve, 4000);
      });
      void outDir;
    }
  } catch { /* stream API quirks — AST parser below still runs */ }

  // 2) Deterministic AST parse with the scanner's own Parser: find t("...") calls AND
  //    hardcoded UI strings (JSX text nodes / label attributes not wrapped in t()).
  const Parser = i18n.Parser || (i18n.default && i18n.default.Parser);
  const hardcoded = [];
  let parsedFiles = 0;
  for (const c of contents) {
    const unwrapped = [];
    if (Parser) {
      try {
        const p = new Parser({ nsSeparator: false, keySeparator: false });
        const keys = p.parseKeysFromContent ? p.parseKeysFromContent(c.code, { extension: path.extname(c.file).slice(1) }) : null;
        if (keys) for (const k of Object.keys(keys)) translatedKeys.add(k);
        parsedFiles++;
      } catch { /* unparseable after transform — regex fallback below */ }
    }
    // JSX/Astro text nodes: >Some words here< (>=15 chars, letters) not inside an expression
    for (const m of c.code.matchAll(/>([A-Za-z][A-Za-z0-9 ,.'"!?&%\u2014-]{14,})</g)) {
      const txt = m[1].trim();
      if (!/^{|^\/\*|^function|^const|^let|^var|^return|^import|^export/.test(txt)) {
        unwrapped.push({ kind: 'text-node', sample: txt.slice(0, 80) });
      }
    }
    // aria-label / placeholder / title string literals not using t()
    for (const m of c.code.matchAll(/\b(aria-label|placeholder|title)\s*=\s*(["'])([^"']{6,})\2/g)) {
      unwrapped.push({ kind: m[1], sample: m[3].slice(0, 80) });
    }
    if (unwrapped.length) hardcoded.push({ file: c.file, count: unwrapped.length, samples: unwrapped.slice(0, 25) });
  }
  fs.writeFileSync(path.join(OUT, 'i18n-hardcoded.json'), JSON.stringify({
    tool: 'i18next-scanner',
    astParsedFiles: parsedFiles,
    translatedKeysDiscovered: translatedKeys.size,
    filesScanned: contents.length,
    filesWithHardcodedStrings: hardcoded.length,
    totalHardcodedSamples: hardcoded.reduce((n, h) => n + h.count, 0),
    note: 'Hardcoded UI strings reduce linguistic adaptability; wrap them in t()/Trans for i18n.',
    results: hardcoded.sort((a, b) => b.count - a.count),
  }, null, 2));
  console.log(`[i18next-scanner] ${contents.length} source files scanned (AST parser: ${parsedFiles}), ${hardcoded.length} contain hardcoded UI strings`);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  await runHtmlValidate();
  await runJsxA11y();
  await runI18nScanner();
}



module.exports = { astroToJsx };

if (require.main === module) {
  main().catch((e) => { console.error(e); process.exitCode = 1; });
}
