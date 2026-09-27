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
# Medical/clinical content legitimately scores high on syllable-based formulas
# (schizophrenia, neuropsychiatric, developmental...). Public web pages are held
# to the grade-8 target; internal docs/templates are advisory-only in the report.
SITE_CONTENT_PREFIXES = ("src/pages/", "src/components/", "blog/")
ADVISORY_PREFIXES = ("templates/", "docs/", ".github/")

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
# Prose-bearing blocks only (headings/nav/buttons/labels are excluded on purpose:
# short fragments with no terminal punctuation wreck sentence-based formulas).
PROSE_BLOCK_RE = re.compile(r"<(p|li|blockquote|dd)\b[^>]*>(.*?)</\1>", re.S | re.I)
# Site-specific prose divs: this codebase puts real sentences in <div class="seo-answer">,
# <span class="emergency-banner__message"> etc. instead of <p>. Match by whole class token.
PROSE_CLASS_TOKENS = {
    "seo-answer", "seo-note", "card-body", "step-content", "blog-answer",
    "emergency-banner__message", "emergency-banner__content", "testimonial-text",
    # <div>/<span> prose wrappers found by class-token frequency audit:
    "hero-subtitle", "notice-box", "hero-text",
    "lead-mini", "seo-lead", "hero-lead", "hero-text",
}
# Wrapper divs that merely *contain* real prose (<p>, <ul>, nested blocks).
# Their inner text is harvested via PROSE_BLOCK_RE; including the wrapper too
# would double-count and merge heading fragments into the scored corpus.
PROSE_WRAPPER_TOKENS = {"section-header"}
PROSE_DIV_RE = re.compile(
    r"<(div|span)\b[^>]*class=\"([^\"]*)\"[^>]*>(.*?)</\1>", re.S | re.I
)
SENT_SPLIT_RE = re.compile(r"[.!?]+")


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
        # Readability formulas score *prose*. Nav labels, button text and other
        # short non-sentence fragments are single "sentences" with no spaces,
        # which drives words-per-sentence (and thus FK grade) to absurd values.
        # Keep only real prose blocks; fall back to full text if none found.
        prose = [m[1] for m in PROSE_BLOCK_RE.findall(raw)]
        # Also harvest site-specific prose divs/spans (seo-answer, card-body...)
        # whose class tokens are on the allow-list. Skip blocks that merely wrap
        # other prose elements (child opening tag immediately inside).
        for _tag, cls, inner in PROSE_DIV_RE.findall(raw):
            if not PROSE_CLASS_TOKENS.intersection(cls.split()):
                continue
            stripped = inner.strip()
            # Allow-listed blocks (seo-answer, card-body...) may open with an
            # inline <strong>/<em> label; keep them unless a *block-level*
            # prose child (<p>, <ul>, nested div) indicates a wrapper.
            if re.match(r"<(?!strong\b|em\b|b\b|i\b)[a-z]", stripped, re.I):
                continue
            prose.append(inner)
        # Keep each block on its own sentence-terminated line: textstat's
        # sentence tokenizer ignores bare newlines (it splits on [.!?] followed
        # by whitespace), and list items / label-style blocks rarely end in
        # punctuation. Without an explicit terminator, a whole <ul> merges into
        # one giant "sentence" and fakes out every sentence-based formula.
        joined = "\n".join(
            re.sub(r"<[^>]+>", " ", b).strip().rstrip(".!?:;") + "."
            for b in prose
        )
        if len(WS_RE.sub(" ", joined).split()) >= 40:
            # Prose-only path: skip the global newline collapse below so block
            # boundaries keep counting as sentence breaks.
            text = URL_RE.sub(" link ", joined)
            text = BOT_LIST_RE.sub("", text)
            return re.sub(r"[ \t]+", " ", re.sub(r"\n *", "\n", text)).strip()
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
    advisory = []
    exts = {".md", ".html", ".txt", ".astro", ".htm"}
    for f in iter_files(exts):
        try:
            text = extract_text(f)
        except OSError:
            continue
        words = len(re.findall(r"[A-Za-z']+", text))
        if words < 25:  # skip tiny fragments/templates
            continue
        sents = len([s for s in SENT_SPLIT_RE.split(text) if re.search(r"[A-Za-z]", s)])
        scores = {}
        for fn, label in SCORE_FNS:
            try:
                v = getattr(textstat, fn)(text)
                if isinstance(v, float):
                    v = round(v, 2)
                scores[label] = v
            except Exception as e:  # noqa: BLE001
                scores[label] = f"error: {e}"
        # textstat >=0.7 calls its backend metrics directly (module-level
        # monkey-patching of sentence_count is inert). Recompute the
        # sentence-based formulas with our own [.!?]-split count, which honours
        # the per-block newlines emitted by extract_text(). Without this, every
        # block lacking terminal punctuation merges into one giant "sentence"
        # and inflates FK/SMOG/Fog/ARI/LWF grades (observed up to ~42 on
        # well-written medical pages).
        try:
            from textstat.backend import metrics as _m
            syllables = textstat.syllable_count(text)
            polys = sum(1 for w in re.findall(r"[A-Za-z']+", text)
                        if textstat.syllable_count(w) >= 3)
            chars = len(re.sub(r"\s+", "", text))
            letters = len(re.findall(r"[A-Za-z]", text))
            words = max(len(re.findall(r"[A-Za-z']+", text)), 1)
            S = max(sents, 1)
            WPS = words / S
            SPW = syllables / words
            if syllables and S:
                scores["Flesch-Kincaid Grade"] = round(0.39 * WPS + 11.8 * SPW - 15.59, 2)
                scores["SMOG Index"] = round(1.043 * (polys / S) ** 0.5 + 0.3129, 2)
                difficult = scores.get("Difficult Words") or 0
                scores["Gunning Fog"] = round(0.4 * (WPS + 100.0 * difficult / words), 2)
                scores["Automated Readability Index"] = round(
                    4.71 * (chars / words) + 0.5 * WPS - 21.43, 2)
                easy_words = max(words - polys, 0)
                scores["Linsear Write Formula"] = round((easy_words + 3 * polys) / S, 2)
                cli_letters_per_100 = 100.0 * letters / S
                cli_syll_per_100 = 100.0 * syllables / S
                scores["Coleman-Liau Index"] = round(
                    0.0588 * cli_letters_per_100 - 0.296 * cli_syll_per_100 - 15.8, 2)
                # Re-derive the composite grade label from corrected FK.
                fk = scores["Flesch-Kincaid Grade"]
                ds = scores.get("Dale-Chall Score")
                lwf = scores.get("Linsear Write Formula")
                if not isinstance(ds, (int, float)):
                    ds = 0
                if not isinstance(lwf, (int, float)):
                    lwf = 0
                grade = fk
                if abs(fk - ds) <= 1 and abs(fk - lwf) <= 1:
                    std = f"{fk:.0f}-{max(fk, ds, lwf):.0f}"
                else:
                    band = [fk, (fk + ds) / 2.0, (fk + lwf) / 2.0, (ds + lwf) / 2.0]
                    std = f"{min(band):.0f}-{max(band):.0f}"
                scores["Text Standard (grade)"] = std
        except ImportError:
            pass  # older textstat where module-level patching works; keep raw scores
        grade = scores.get("Flesch-Kincaid Grade", 0) or 0
        rel = str(f.relative_to(ROOT))
        entry = {
            "file": rel,
            "words": words,
            "sentences": sents,
            "scores": scores,
            "readingLevel": "above 8th grade" if isinstance(grade, (int, float)) and grade > GRADE_8_LIMIT else "ok",
        }
        # Sentence-based formulas are meaningless on non-prose pages (one long
        # run-on fragment with no terminal punctuation). Mark them inconclusive
        # instead of reporting a fake grade.
        if sents < max(3, words // 60):
            entry["readingLevel"] = "inconclusive (not prose)"
        results.append(entry)
        if entry["readingLevel"] == "above 8th grade":
            item = {"file": rel, "fkGrade": grade, "gunningFog": scores.get("Gunning Fog")}
            # Only public site content is a hard WCAG-plain-language finding;
            # internal docs & templates are advisory (scored, not flagged).
            if rel.startswith(SITE_CONTENT_PREFIXES):
                flagged.append(item)
            else:
                advisory.append(item)

    results.sort(key=lambda r: -(r["scores"].get("Flesch-Kincaid Grade") or 0))
    report = {
        "tool": "textstat",
        "filesScored": len(results),
        "gradeLimit": GRADE_8_LIMIT,
        "flaggedAbove8thGrade": flagged,
        "advisoryAbove8thGrade": advisory,
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
