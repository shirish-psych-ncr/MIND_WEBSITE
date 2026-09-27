#!/usr/bin/env python3
"""readability_hyphenation.py — content readability & hyphenation audit.

Tools used:
  4. textstat -> 12 readability formulas for every .md/.html/.txt file
                 (flags anything above grade 8)
  9. pyphen   -> hyphenation points per word; emits a CSS snippet with
                 `hyphens: auto` + `overflow-wrap` rules so narrow
                 responsive columns don't break layouts.

Outputs: output/a11y-lint/readability.json, output/a11y-lint/hyphenation.css
"""
import json
import re
import sys
from pathlib import Path

import pyphen
import textstat

ROOT = Path(__file__).resolve().parent.parent.parent
OUT = ROOT / "output" / "a11y-lint"
SKIP_DIRS = {".git", "node_modules", "output", "skills", ".claude", ".agents", ".codex", ".opencode", ".cursor"}
GRADE_8_LIMIT = 8.0

TAG_RE = re.compile(r"<(script|style)[^>]*>.*?</\1>", re.S | re.I)
HTML_RE = re.compile(r"<[^>]+>")
WS_RE = re.compile(r"\s+")
# URLs and long machine tokens inflate syllable/word-length based formulas.
URL_RE = re.compile(r"https?://\S+|www\.\S+|\S+\.(?:in|com|org|html|txt|xml|css|js)\b", re.I)
BOT_LIST_RE = re.compile(r"\b(?:OAI-SearchBot|ChatGPT-User|Claude-SearchBot|Claude-User|PerplexityBot|Perplexity-User|GensparkBot|YouBot|YepBot|Amazonbot|DuckAssistBot|GPTBot|Google-Extended|ClaudeBot|Applebot-Extended|Meta-ExternalAgent|FacebookBot|CCBot|Cohere-AI)\b[,\s]*")
ROBOTS_DIRECTIVE_RE = re.compile(
    r"^\s*(?:User-agent|Allow|Disallow|Sitemap|Crawl-delay|Clean-param|Host|Request-rate)\b.*$",
    re.M | re.I,
)
CSS_RULE_RE = re.compile(r"[{};]|::?[a-z-]+(\([^)]*\))?|--[\w-]+|\.[A-Za-z][\w-]*|#\w+", re.I)


def iter_files(exts):
    for p in ROOT.rglob("*"):
        if p.is_file() and p.suffix.lower() in exts and not (set(p.parts) & SKIP_DIRS.intersection(set(p.parts))):
            if any(part in SKIP_DIRS for part in p.parts):
                continue
            yield p


def extract_text(path: Path) -> str:
    raw = path.read_text(encoding="utf-8", errors="ignore")
    if path.suffix.lower() in (".html", ".htm", ".astro", ".vue"):
        raw = TAG_RE.sub(" ", raw)
        # drop frontmatter for astro/md
        raw = re.sub(r"^---.*?---", " ", raw, count=1, flags=re.S)
        text = HTML_RE.sub(" ", raw)
    elif path.suffix.lower() == ".md":
        text = re.sub(r"^---.*?---", " ", raw, count=1, flags=re.S)
        text = re.sub(r"```[\s\S]*?```", " ", text)
        text = HTML_RE.sub(" ", text)
        text = re.sub(r"!?\[([^\]]*)\]\([^)]*\)", r"\1", text)
    elif path.name == "robots.txt":
        # robots.txt is a machine policy file; only human prose (comments) is readable text.
        lines = [re.sub(r"^#\s?", "", ln).strip() for ln in raw.splitlines() if ln.strip().startswith("#")]
        text = " ".join(lines)
    else:
        text = raw
    # Strip machine tokens that inflate FK/Gunning-Fog without affecting human prose.
    text = URL_RE.sub(" link ", text)
    text = BOT_LIST_RE.sub("", text)
    text = ROBOTS_DIRECTIVE_RE.sub(" ", text)
    return WS_RE.sub(" ", text).strip()


SCORE_FNS = [
    ("flesch_reading_ease", "Flesch Reading Ease"),
    ("flesch_kincaid_grade", "Flesch-Kincaid Grade"),
    ("smog_index", "SMOG Index"),
    ("coleman_liau_index", "Coleman-Liau Index"),
    ("automated_readability_index", "Automated Readability Index"),
    ("dale_chall_readability_score", "Dale-Chall Score"),
    ("difficult_words", "Difficult Words"),
    ("linsear_write_formula", "Linsear Write Formula"),
    ("gunning_fog", "Gunning Fog"),
    ("text_standard", "Text Standard (grade)"),
    ("syllable_count", "Syllables"),
    ("sentence_count", "Sentences"),
]


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    results = []
    flagged = []
    exts = {".md", ".html", ".txt", ".astro", ".htm"}
    for f in iter_files(exts):
        try:
            text = extract_text(f)
        except OSError:
            continue
        words = len(re.findall(r"[A-Za-z']+", text))
        if words < 25:  # skip tiny fragments/templates
            continue
        scores = {}
        for fn, label in SCORE_FNS:
            try:
                v = getattr(textstat, fn)(text)
                if isinstance(v, float):
                    v = round(v, 2)
                scores[label] = v
            except Exception as e:  # noqa: BLE001
                scores[label] = f"error: {e}"
        grade = scores.get("Flesch-Kincaid Grade", 0) or 0
        entry = {
            "file": str(f.relative_to(ROOT)),
            "words": words,
            "scores": scores,
            "readingLevel": "above 8th grade" if isinstance(grade, (int, float)) and grade > GRADE_8_LIMIT else "ok",
        }
        results.append(entry)
        if entry["readingLevel"] != "ok":
            flagged.append({"file": entry["file"], "fkGrade": grade, "gunningFog": scores.get("Gunning Fog")})

    results.sort(key=lambda r: -(r["scores"].get("Flesch-Kincaid Grade") or 0))
    report = {
        "tool": "textstat",
        "filesScored": len(results),
        "gradeLimit": GRADE_8_LIMIT,
        "flaggedAbove8thGrade": flagged,
        "results": results,
    }
    (OUT / "readability.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

    # ---- pyphen: build vocabulary from all scored content, emit CSS ----
    vocab = set()
    for r in results:
        f = ROOT / r["file"]
        try:
            text = extract_text(f)
        except OSError:
            continue
        for w in re.findall(r"[A-Za-z]{6,}", text):
            vocab.add(w.lower())
    lang = "en"
    dic = pyphen.Pyphen(lang=lang)
    long_words = sorted({w for w in vocab if len(w) >= 10})
    sample = long_words[:400]
    hyphen_map = {w: dic.inserted(w) for w in sample}
    css_lines = [
        "/* Generated by scripts/a11y_lint/readability_hyphenation.py (pyphen).",
        "   Prevents layout breakage in narrow responsive columns.",
        f"   Vocabulary analyzed: {len(vocab)} words, {len(long_words)} long (>=10 chars).",
        f"   Example hyphenation points (lang={lang}): */",
    ]
    for w, h in list(hyphen_map.items())[:40]:
        css_lines.append(f"   /* {w} -> {h} */")
    css_lines += [
        "",
        ":root { --hyphenate-lang: en; }",
        "",
        "p, li, figcaption, blockquote, .prose, .article-body, .blog-content,",
        ".answer-card, .faq-item, .card-text, .tool-description {",
        "  hyphens: auto;",
        "  -webkit-hyphens: auto;",
        "  -moz-hyphens: auto;",
        "  overflow-wrap: break-word;",
        "  word-break: normal;",
        "}",
        "",
        "/* Long unbreakable tokens (URLs, emails) must not blow out grid/flex tracks */",
        "code, pre, a, .url, .email {",
        "  overflow-wrap: anywhere;",
        "}",
        "",
        "/* Narrow columns (<20em) get tighter justification to reduce rivers */",
        "@media (max-width: 480px) {",
        "  p, li {",
        "    hyphenate-limit-chars: 8 4 3;",
        "    text-align: justify;",
        "  }",
        "}",
        "",
        "/* RTL safety: direction-aware logical properties already used; keep them */",
        "[dir='rtl'] p, [dir='rtl'] li {",
        "  text-align: start;",
        "}",
        "",
    ]
    (OUT / "hyphenation.css").write_text("\n".join(css_lines), encoding="utf-8")

    print(f"[textstat] scored {len(results)} content files; {len(flagged)} above grade {GRADE_8_LIMIT}")
    print(f"[pyphen]   analyzed {len(vocab)} unique words, {len(long_words)} long words -> hyphenation.css")
    top = results[:5]
    for t in top:
        print(f"   {t['file']}: FK grade {t['scores'].get('Flesch-Kincaid Grade')}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
