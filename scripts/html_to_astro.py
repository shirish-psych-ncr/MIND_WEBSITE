"""Migration tool: rebuild every static HTML route as an Astro page.

Idempotent: sources are read from git HEAD when the working-tree copies have
already been deleted by a previous run, so `python3 scripts/html_to_astro.py`
deterministically regenerates all of src/pages at any time.

For each site page whose shell has already been normalized (it carries
data-chrome-normalized="true"), split the document into:

  * headExtra  - the page's own <head> markup, minus the shared shell assets
                 that Head.astro now renders (charset, color-scheme, theme
                 bootstrap, visitor-friendly bundle, foundation stylesheet).
  * bodyStart  - chrome that sat between <body ...> and the shared header
                 (emergency banner + skip link; Shell.astro re-renders them).
  * content    - everything from <header data-shared-shell> to just before
                 <footer data-shared-shell>, minus those two shared nodes
                 (Shell.astro owns them) -> goes into the default slot.
  * bodyEnd    - whatever followed the shared footer (page scripts etc.).

The split uses html.parser (a real tokenizer), never regex offsets, and each
generated file is verified by reconstructing the original document and
diffing it against the source — silent corruption (e.g. a stray </header>
left inside a page body) fails loudly instead of shipping.

Output layout mirrors Astro src/pages so `astro build` reproduces the exact
clean-URL scheme:

  about.html                       -> src/pages/about.astro          -> /about/
  index.html                       -> src/pages/index.astro          -> /
  blog/adult.html                  -> src/pages/blog/adult.astro     -> /blog/adult/
  blog/pages/adult/<slug>/index.html
                                   -> src/pages/blog/pages/adult/<slug>.astro
  tools/<tool>.html                -> src/pages/tools/<tool>.astro   -> /tools/<tool>/
  <article>/index.html             -> src/pages/<article>.astro      -> /<article>/

  * offline.html stays a static file at the web root (service workers must be
    able to precache it by URL; Astro would only emit /offline/).
  * blog/index.html becomes src/pages/blog/index.md — its body is pure
    generated article cards + JSON-LD, which scripts/build_blog_index.py
    regenerates from the manifests on every publish.

Other pages without a normalized shell (vendored skill viewers) are skipped
and stay static.
"""
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
SRC_PAGES = ROOT / 'src' / 'pages'

# If this script itself is not yet committed, HEAD cannot serve as a fallback
# source for deleted HTML; restore the sources first (see module docstring).
_head_check = subprocess.run(['git', 'cat-file', '-e', 'HEAD:scripts/html_to_astro.py'],
                             cwd=ROOT, capture_output=True)
if _head_check.returncode != 0 and any(
        not (ROOT / f).exists() for f in ('index.html', 'about.html')):
    raise SystemExit(
        'html_to_astro.py is uncommitted while HTML sources are missing from '
        'the working tree. Restore them with: git checkout HEAD -- "*.html" '
        '"*/index.html", or commit this script first.')

SKIP_MARKERS = ('output', 'node_modules', '.git', 'skills')
# Files that intentionally remain static HTML at the web root.
STATIC_KEEP = {'offline.html'}


THEME_RE = re.compile(r'<script data-theme-init>.*?</script>\s*', re.S)
CHARSET_RE = re.compile(r'<meta\s+charset=[^>]*>\s*', re.I)
COLORSCHEME_RE = re.compile(r'<meta\s+name=["\']color-scheme["\'][^>]*>\s*', re.I)
VISITOR_RE = re.compile(r'<script\b[^>]*visitor-friendly(?:\.min)?\.js[^>]*>\s*</script>\s*', re.I)
FOUNDATION_RE = re.compile(r'<link\b[^>]*site-foundation(?:\.min)?\.css[^>]*>\s*', re.I)
SKIPLINK_RE = re.compile(r'<a\b[^>]*class="skip-link"[^>]*>.*?</a>\s*', re.S)


def source_text(path):
    """Read a page's HTML from the working tree, falling back to git HEAD."""
    if path.exists():
        return path.read_text(encoding='utf-8')
    rel = path.relative_to(ROOT).as_posix()
    out = subprocess.run(['git', 'show', f'HEAD:{rel}'], cwd=ROOT,
                         capture_output=True)
    if out.returncode != 0:
        raise FileNotFoundError(rel)
    return out.stdout.decode('utf-8')


class ShellSplitter(HTMLParser):
    """Tokenizer-based split of a normalized document into shell segments.

    Tracks the live element stack so only a <header>/<footer> that opens as a
    direct child of <body> AND carries data-shared-shell counts as shared
    chrome; nested semantic headers/footers inside articles are ignored.
    Boundaries come from real token positions (line/col -> absolute offset),
    never from regex searches over the whole document. The caller verifies
    that the returned segments tile the source exactly, so any miscount is
    caught instead of silently corrupting a page.

    Void elements (<link>, <img>, <br>, ...) are never pushed on the stack —
    several pages contain stray unclosed void tags in body markup and
    html.parser will not auto-close them, which would otherwise poison the
    parent-context check for every later element.
    """

    VOID_TAGS = frozenset(('area', 'base', 'br', 'col', 'embed', 'hr', 'img',
                           'input', 'link', 'meta', 'param', 'source', 'track',
                           'wbr'))

    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.text = text
        self.stack = []          # currently-open element names
        self.head_inner = None   # [open_end, close_start] just inside <head>
        self.body_attrs = ''     # raw attribute text of the <body ...> tag
        self.body_open_end = None
        self._shared = {}        # 'header'/'footer' -> [node_start, node_end]
        self._bases = {1: 0}

    def _base(self, row):
        b = self._bases.get(row)
        if b is not None:
            return b
        prev = self._base(row - 1)
        nl = self.text.find('\n', prev)
        b = len(self.text) if nl == -1 else nl + 1
        self._bases[row] = b
        return b

    def _pos(self):
        """Absolute offset of the current handler's token start.

        ``self.offset`` is unreliable here: ``parse_starttag`` overwrites it
        with a ``(row, col)`` tuple before dispatching ``handle_starttag``,
        and ``updatepos`` can desynchronize it from the raw text for long
        lines. Instead, convert getpos() (the position of the '<' at handler
        entry) to an absolute offset via a cached line-start table.
        """
        row, col = self.getpos()
        return self._base(row) + col

    def handle_startendtag(self, tag, attrs):
        pass  # void/self-closing elements never affect the stack

    def handle_starttag(self, tag, attrs):
        lt = self._pos()             # position of '<'
        gt = lt + 1 + len(tag)       # position just past the tag name
        if tag == 'head':
            self.head_inner = [self.text.index('>', gt) + 1, None]
        elif tag == 'body':
            end = self.text.index('>', gt)
            m = re.match(r'<body\b([^>]*)>', self.text[lt:end + 1], re.S)
            self.body_attrs = m.group(1)
            self.body_open_end = end + 1
        elif tag in ('header', 'footer'):
            # Attribute values are unreliable in html.parser (Python ≤3.12
            # returns None for valueless attributes and lowercases differently
            # across versions), so detect the marker in the raw tag text.
            end = self.text.index('>', gt)
            raw_tag = self.text[lt:end + 1]
            if re.search(r'\bdata-shared-shell\b', raw_tag, re.I) \
               and self.stack[-1:] == ['body'] \
               and 'header' not in self.stack and 'footer' not in self.stack:
                self._shared[tag] = [lt, None]
        if tag not in self.VOID_TAGS:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in self.VOID_TAGS:
            return  # stray </link> etc. — never participates in the stack
        if tag not in self.stack:
            return  # stray close; html.parser quirk — ignore
        # Absolute index of the '<' that opens this end token. (getpos()-based
        # arithmetic was tried first and silently shifted by a character when
        # auto-closed elements confused the line/col math — hence this.)
        ct = self._pos()
        node_end = ct + len(f'</{tag}>')
        while self.stack[-1] != tag:
            self.stack.pop()
        self.stack.pop()
        if tag == 'head' and self.head_inner and self.head_inner[1] is None:
            self.head_inner[1] = ct
        elif tag in self._shared and self._shared[tag][1] is None \
                and ct >= self._shared[tag][0]:
            self._shared[tag][1] = node_end

    def result(self):
        assert self.head_inner and self.head_inner[1] is not None, 'no closed <head>'
        hs, he = self._shared.get('header', (None, None))
        fs, fe = self._shared.get('footer', (None, None))
        assert hs is not None and he is not None, 'no shared <header data-shared-shell>'
        assert fs is not None and fe is not None, 'no shared <footer data-shared-shell>'
        body_close = self.text.find('</body>', fe)
        assert body_close != -1, 'no </body>'
        return {
            'head_inner': tuple(self.head_inner),
            'body_attrs': self.body_attrs,
            'pre': (self.body_open_end, hs),
            'shared_header': (hs, he),
            'content': (he, fs),
            'shared_footer': (fs, fe),
            'post': (fe, body_close),
        }


def strip_shell_head(head):
    head = CHARSET_RE.sub('', head)
    head = COLORSCHEME_RE.sub('', head)
    head = THEME_RE.sub('', head)
    head = VISITOR_RE.sub('', head)
    head = FOUNDATION_RE.sub('', head)
    return head.strip()


def route_for(path):
    """Map a repo-root HTML file to its src/pages .astro target."""
    rel = path.relative_to(ROOT).as_posix()
    if rel == 'index.html':
        return SRC_PAGES / 'index.astro'
    if rel == 'blog/index.html':
        return SRC_PAGES / 'blog' / 'index.astro'
    parts = list(Path(rel).parts)
    name = parts.pop()                      # index.html or x.html
    stem = Path(name).stem
    if stem == 'index':
        # directory-style article: foo/index.html -> foo.astro at same depth
        return SRC_PAGES.joinpath(*parts).with_suffix('.astro') if parts else SRC_PAGES / 'index.astro'
    return SRC_PAGES.joinpath(*parts) / f'{stem}.astro'


def escape_raw(s):
    """Make arbitrary markup safe inside a JS template literal."""
    return s.replace('\\', '\\\\').replace('`', '${"`"}').replace('${', '${"${"}')


def emit_astro(target, head_extra, body_class, body_attrs, body_start, body_end, content):
    depth = len(target.relative_to(SRC_PAGES).parts) - 1
    prefix = '../' * depth if depth else './'
    lines = [
        '---',
        f"import Layout from '{prefix}layouts/Layout.astro';",
        f'const headExtra = String.raw`{escape_raw(head_extra)}`;',
    ]
    extra_props = []
    if body_class:
        extra_props.append(f'bodyClass="{body_class}"')
    if body_attrs:
        extra_props.append(f'bodyAttrs=`{escape_raw(body_attrs)}`')
    body_start_expr = ''
    if body_start:
        lines.append(f'const bodyStart = String.raw`{escape_raw(body_start)}`;')
        body_start_expr = ' bodyStart={bodyStart}'
    body_end_expr = ''
    if body_end:
        lines.append(f'const bodyEnd = String.raw`{escape_raw(body_end)}`;')
        body_end_expr = ' bodyEnd={bodyEnd}'
    lines.append('---')
    lines.append('')
    attrs = ' '.join(extra_props)
    lines.append(f'<Layout headExtra={{headExtra}}{body_start_expr}{body_end_expr}{(" " + attrs) if attrs else ""}>')
    lines.append(content)
    lines.append('</Layout>')
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text('\n'.join(lines) + '\n', encoding='utf-8')


def convert(path):
    text = source_text(path)
    if 'data-chrome-normalized="true"' not in text:
        return None
    rel = path.relative_to(ROOT).as_posix()

    sp = ShellSplitter(text)
    sp.feed(text)
    sp.close()
    r = sp.result()

    # Verification: every segment must be an ordered, non-overlapping span.
    for name in ('pre', 'shared_header', 'content', 'shared_footer', 'post'):
        a, b = r[name]
        assert 0 <= a <= b <= len(text), f'{rel}: bad span for {name}'
    # Exact tiling check on the concatenation itself:
    rebuilt_body = ''.join(text[a:b] for (a, b) in
                           (r['pre'], r['shared_header'], r['content'],
                            r['shared_footer'], r['post']))
    original_body = text[r['pre'][0]:r['post'][1]]
    if rebuilt_body != original_body:
        raise AssertionError(f'{rel}: segment reconstruction mismatch')

    head_extra = strip_shell_head(text[r['head_inner'][0]:r['head_inner'][1]])
    body_attrs = r['body_attrs']
    body_class = ''
    cm = re.search(r'class="([^"]*)"', body_attrs)
    if cm:
        body_class = cm.group(1)
        body_attrs = (body_attrs[:cm.start()] + body_attrs[cm.end():])
    body_attrs = re.sub(r'\s*data-chrome-normalized="true"', '', body_attrs).strip()

    # Shell.astro renders the emergency banner + skip link itself; drop the
    # legacy copies that sat between <body> and the shared header.
    pre = SKIPLINK_RE.sub('', text[r['pre'][0]:r['pre'][1]]).strip()
    content = text[r['content'][0]:r['content'][1]].strip()
    body_end = text[r['post'][0]:r['post'][1]].strip()

    # Content sanity: the slot must not contain shared-shell nodes anymore.
    stray = re.findall(r'<(header|footer)\b[^>]*data-shared-shell', content, re.I)
    if stray:
        raise AssertionError(f'{rel}: shared shell leaked into slot content')

    # Drop leading chrome residue left by legacy pages whose shared header
    # closed as `</div></header>`: a bare </header>/</footer> with no matching
    # open tag before it can only belong to the stripped chrome node. Any
    # close that has an open tag before it is page content (e.g. an article
    # header) and must survive; unbalanced closes deeper in are real errors.
    for tag in ('header', 'footer'):
        close = f'</{tag}>'
        m = re.search(rf'</?{tag}\b', content, re.I)
        if m and m.group(0).startswith('</'):
            idx = m.start()
            if content[:idx].strip():
                raise AssertionError(
                    f'{rel}: unexpected chrome before leading </{tag}>: {content[:idx][:80]!r}')
            content = content[idx + len(close):].lstrip('\n')

    target = route_for(path)
    emit_astro(target, head_extra, body_class, body_attrs, pre, body_end, content)

    # Post-write sanity: the slot region of the emitted file must contain no
    # shared-shell remnants (the class of bug that once shipped a stray
    # </header> inside depression-anxiety's body). Article-level <header>
    # blocks are legitimate page content — only flag closes with no matching
    # open tag, and never inspect the closing `</Layout>` line itself.
    out = target.read_text(encoding='utf-8')
    slot = out[out.index('<Layout'):out.rindex('</Layout>')]
    if 'data-shared-shell' in slot:
        raise AssertionError(f'{rel}: emitted slot contains data-shared-shell')
    for tag in ('header', 'footer'):
        opens = len(re.findall(rf'<{tag}\b', slot, re.I))
        closes = len(re.findall(rf'</{tag}>', slot, re.I))
        if closes > opens:
            raise AssertionError(
                f'{rel}: emitted slot has {closes} </{tag}> but only {opens} <{tag}>')
    return target


def main(dry=False):
    targets = []
    html_files = sorted(p for p in ROOT.rglob('*.html')
                        if not any(x in p.parts for x in SKIP_MARKERS))
    tracked = [Path(l) for l in subprocess.run(
        ['git', 'ls-files', '-z', '--', '*.html'], cwd=ROOT, capture_output=True,
        check=True).stdout.decode().split('\0') if l
        and not any(x in Path(l).parts for x in SKIP_MARKERS)]
    candidates = sorted(set(html_files) | set(ROOT / t for t in tracked))
    for path in candidates:
        rel = path.relative_to(ROOT).as_posix()
        if rel in STATIC_KEEP:
            continue
        t = convert(path)
        if t:
            targets.append(t)
        else:
            print(f'skipped (no normalized shell): {rel}')
    if dry:
        for t in targets:
            print(t.relative_to(ROOT))
        print(f'{len(targets)} routes would migrate')
        return
    # Remove the migrated sources from the web root so Astro output is canonical.
    removed = 0
    for path in candidates:
        rel = path.relative_to(ROOT).as_posix()
        if rel in STATIC_KEEP:
            continue
        if route_for(path).exists() and path.exists():
            path.unlink()
            removed += 1
    print(f'Migrated {len(targets)} routes into src/pages; removed {removed} legacy HTML files.')


if __name__ == '__main__':
    main(dry='--dry' in sys.argv)
