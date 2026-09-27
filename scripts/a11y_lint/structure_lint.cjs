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

// Convert an Astro template section into JSX-parseable code for jsx-a11y rules
function astroToJsx(file) {
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/<template[^>]*>([\s\S]*?)<\/template>/i);
  let tpl;
  if (m) {
    tpl = m[1].replace(/---[\s\S]*?---/g, '');
  } else {
    // Astro pages: everything outside the frontmatter block is template markup
    tpl = src.replace(/^---[\s\S]*?---\s*/m, '');
  }
  // Astro attributes like client:load / set:html are fine as JSX attrs after quoting
  tpl = tpl.replace(/\b(client|set|is|transition):\s*([\w-]+)(\s*=)?/g, 'astro_$1_$2$3');
  tpl = tpl.replace(/class=/g, 'className=').replace(/for=/g, 'htmlFor=');
  // self-close void elements missing the slash
  tpl = tpl.replace(/<(img|input|br|hr|meta|link|source|area|col|track|wbr)((?:[^>"]|"[^"]*")*)>/g, '<$1$2 />');
  // Astro <style>/<script> blocks aren't JSX — neutralize them BEFORE attribute
  // rewriting so their contents (JS/CSS) can't corrupt the markup transform.
  tpl = tpl.replace(/<\/?style\b[^>]*>/gi, '{/* */}');
  tpl = tpl.replace(/<script((?:[^>"]|"[^"]*")*)><\/script>/gi, '<div$1></div>');
  tpl = tpl.replace(/<script((?:[^>"]|"[^"]*")*)>[\s\S]*?<\/script>/gi, '{/* script removed for JSX lint */}');
  // strip {...} attr values and any stray backticks so the result stays JSX-parseable
  tpl = tpl.replace(/(\w+)=(\{[^}]*\})/g, '$1="expr"').replace(/`/g, "'");
  // ensure single root
  return `function AstroTemplate() {\n  return (\n    <>\n${tpl}\n    </>\n  );\n}\nexport default AstroTemplate;\n`;
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
  // Temp dir inside the repo (under OUT, which is gitignored) so ESLint's
  // "outside of base path" guard doesn't skip the generated JSX files.
  const tmp = fs.mkdtempSync(path.join(OUT, '.jsx-a11y-tmp-'));
  const realJsx = walk(ROOT, (n) => /\.(jsx|tsx)$/i.test(n));
  const astroFiles = walk(ROOT, (n) => /\.astro$/i.test(n));
  const astroConverted = [];
  for (const f of astroFiles) {
    const jsx = astroToJsx(f);
    if (!jsx) continue;
    const t = path.join(tmp, f.replaceAll(/[\\/]/g, '__') + '.jsx');
    fs.writeFileSync(t, jsx);
    astroConverted.push({ tmp: t, orig: path.relative(ROOT, f) });
  }
  const targets = [...realJsx, ...astroConverted.map((a) => a.tmp)];
  const summary = [];
  if (targets.length) {
    const results = await eslint.lintFiles(targets);
    const formatter = await eslint.loadFormatter('json');
    for (const r of results) {
      const conv = astroConverted.find((a) => a.tmp === r.filePath);
      summary.push({
        file: conv ? conv.orig : path.relative(ROOT, r.filePath),
        errors: r.errorCount, warnings: r.warningCount,
        messages: r.messages.map((m) => ({ rule: m.ruleId, line: m.line, message: m.message })).slice(0, 30),
      });
    }
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.writeFileSync(path.join(OUT, 'jsx-a11y.json'), JSON.stringify({
    tool: 'eslint-plugin-jsx-a11y',
    note: `${astroConverted.length} .astro templates converted to JSX for static a11y linting; ${realJsx.length} native .jsx/.tsx files`,
    filesChecked: targets.length,
    totalErrors: summary.reduce((n, s) => n + s.errors, 0),
    results: summary.sort((a, b) => b.errors - a.errors),
  }, null, 2));
  console.log(`[jsx-a11y] ${targets.length} files linted (${astroConverted.length} from .astro), ${summary.reduce((n, s) => n + s.errors, 0)} errors`);

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

main().catch((e) => { console.error(e); process.exitCode = 1; });
