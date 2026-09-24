#!/usr/bin/env python3
"""
One-off repair: remove stray </script> tags that were left at the end of HTML
files (before </body></html>) when the inline Amplitude module script block was
deleted. The deletion stripped the block's opening <script ...> tag but some
files kept an extra closing </script>, which made browsers parse everything
between the previous real script and the stray closer as script text, hiding
page content and breaking parsing.

The tool only removes a closing </script> if it is NOT preceded (in document
order) by an unmatched opening <script ...> tag -- i.e. genuine orphans only.
It reports what it changes and any files that remain unbalanced afterwards.
"""
import glob
import re
import sys

TAG_RE = re.compile(r'<script\b[^>]*>|</script>', re.IGNORECASE)


def find_orphan_closers(text):
    """Return byte offsets of </script> occurrences with no open script."""
    orphans = []
    depth = 0
    for m in TAG_RE.finditer(text):
        tok = m.group(0)
        if tok.lower().startswith('</'):
            if depth > 0:
                depth -= 1
            else:
                orphans.append(m.start())
        else:
            depth += 1
    return orphans, depth


def main():
    files = [p for p in glob.glob('**/*.html', recursive=True)
             if '/.git/' not in p and os_sep_not(p, '.git')]
    changed = 0
    for path in sorted(files):
        with open(path, encoding='utf-8') as fh:
            text = fh.read()
        orphans, unclosed = find_orphan_closers(text)
        if not orphans:
            if unclosed:
                print(f'UNCLOSED {path}: {unclosed} open <script> without close', file=sys.stderr)
            continue
        # Remove orphan closers from the end so offsets stay valid.
        new = text
        for pos in sorted(orphans, reverse=True):
            end = pos + len('</script>')
            # also swallow immediately preceding whitespace/newline
            start = pos
            while start > 0 and new[start - 1] in ' \t\r\n':
                start -= 1
            new = new[:start] + new[end:]
        with open(path, 'w', encoding='utf-8') as fh:
            fh.write(new)
        changed += 1
        print(f'fixed {len(orphans)} orphan </script> in {path}')
    print(f'{changed} files changed, {len(files)} scanned')


def os_sep_not(p, part):
    return part not in p.split('/')


if __name__ == '__main__':
    main()
