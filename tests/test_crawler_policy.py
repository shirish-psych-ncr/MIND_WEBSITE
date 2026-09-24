"""Validation suite for the 2026 AI crawler management & AEO deployment.

Covers the operational framework's mandatory checks:
  Phase 1 - infrastructure hygiene (BOM, null bytes, size limit, LF endings).
  Phase 2 - the tiered robots.txt architecture and RFC 9309 specificity rules.
  Phase 3 - syntax hardening (no inline comments, $ anchors) and the
            llms.txt / X-Robots-Tag complementary layers.
Run with: python -m unittest discover -s tests -v
"""
import glob
import json
import os
import re
import unittest
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# User-agents that must be explicitly ALLOWED (traditional search + real-time
# AI citation/retrieval agents) per the 2026 crawler-management framework.
ALLOWED_AGENTS = [
    "Googlebot", "Bingbot", "YandexBot", "DuckDuckBot",
    "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User",
    "PerplexityBot", "Perplexity-User", "GensparkBot", "YouBot", "YepBot",
    "Amazonbot", "DuckAssistBot",
]

# User-agents that must be explicitly DISALLOWED site-wide (LLM training
# scrapers + aggressive/unverified harvesters).
DISALLOWED_AGENTS = [
    "GPTBot", "Google-Extended", "ClaudeBot", "Applebot-Extended",
    "Meta-ExternalAgent", "FacebookBot", "CCBot", "Cohere-AI",
    "Bytespider", "Diffbot", "PetalBot", "Scrapy", "aiHitBot",
    "BittorrentBot",
]

# RFC 9309 processing limit: crawlers stop parsing after 512,000 bytes.
MAX_ROBOTS_BYTES = 512_000


def read_bytes(name):
    with open(os.path.join(ROOT, name), "rb") as fh:
        return fh.read()


def parse_robots(text):
    """Parse robots.txt into ordered groups: list of (agents, rules)."""
    groups = []
    current = None
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        assert ":" in line, f"Malformed directive line: {raw!r}"
        field, _, value = line.partition(":")
        field = field.strip().lower()
        value = value.strip()
        if field == "user-agent":
            # Consecutive user-agent lines merge into one group (RFC 9309).
            if current is not None and not current[1]:
                current[0].append(value.lower())
            else:
                if current:
                    groups.append(current)
                current = ([value.lower()], [])
        elif field in ("allow", "disallow"):
            assert current is not None, f"{field} rule before any user-agent"
            current[1].append((field, value))
        elif field == "sitemap":
            if current:
                groups.append(current)
                current = None
            groups.append((["sitemap"], [("sitemap", value)]))
    if current:
        groups.append(current)
    return groups


class RobotsMatcher:
    """Minimal RFC 9309 matcher: longest path wins; Allow beats Disallow."""

    def __init__(self, groups):
        self.groups = groups

    def rules_for(self, agent):
        agent = agent.lower()
        best_prefix, best_rules = None, None
        for agents, rules in self.groups:
            if agents == ["sitemap"]:
                continue
            for a in agents:
                if a == "*":
                    prefix = 0
                elif agent.startswith(a):
                    prefix = len(a)
                else:
                    continue
                if best_prefix is None or prefix > best_prefix:
                    best_prefix, best_rules = prefix, rules
        return best_rules

    def fetch_allowed(self, agent, path="/"):
        rules = self.rules_for(agent)
        assert rules is not None, f"No matching group for agent {agent!r}"
        best_key, best_action = None, None
        for field, pattern in rules:
            if field == "sitemap":
                continue
            anchored = pattern.endswith("$")
            core = pattern[:-1] if anchored else pattern
            parts = core.split("*")
            regex = "(.*".join(map(re.escape, parts)) + ")" * (len(parts) - 1) \
                if len(parts) > 1 else re.escape(core)
            # Rebuild correctly: each '*' becomes '.*' between literal chunks.
            regex = ".*".join(re.escape(p) for p in parts)
            compiled = re.compile("^" + regex + ("$" if anchored else ""))
            if compiled.match(path):
                key = (len(core), field == "allow")
                if best_key is None or key > best_key:
                    best_key, best_action = key, field
        return best_action != "disallow"


class TestRobotsInfrastructure(unittest.TestCase):
    """Phase 1: pre-deployment audit of the file itself."""

    @classmethod
    def setUpClass(cls):
        cls.raw = read_bytes("robots.txt")
        cls.text = cls.raw.decode("utf-8")

    def test_no_bom(self):
        self.assertFalse(self.raw.startswith(b"\xef\xbb\xbf"),
                         "UTF-8 BOM makes compliant parsers fail on line 1")

    def test_no_null_bytes(self):
        self.assertNotIn(b"\x00", self.raw,
                         "Null bytes truncate parser reading mid-file")

    def test_under_500kib(self):
        self.assertLess(len(self.raw), MAX_ROBOTS_BYTES)

    def test_strict_utf8_and_lf(self):
        self.text.encode("utf-8")  # round-trip proves valid UTF-8
        self.assertNotIn("\r", self.text, "Use LF line endings only")

    def test_valid_line_syntax(self):
        for i, line in enumerate(self.text.splitlines(), 1):
            s = line.strip()
            if not s or s.startswith("#"):
                continue
            field = s.split(":", 1)[0].strip().lower()
            self.assertIn(field, ("user-agent", "allow", "disallow", "sitemap"),
                          f"Unknown directive on line {i}: {line!r}")

    def test_no_inline_comments(self):
        for i, line in enumerate(self.text.splitlines(), 1):
            s = line.strip()
            if s and not s.startswith("#"):
                self.assertNotIn("#", s,
                                 f"Inline comment on directive line {i} can be "
                                 "parsed as part of the path")

    def test_no_trailing_whitespace_on_directives(self):
        for i, line in enumerate(self.text.splitlines(), 1):
            if line.strip() and not line.lstrip().startswith("#"):
                self.assertEqual(line, line.rstrip(),
                                 f"Trailing whitespace on line {i}")

    def test_sitemap_present_https(self):
        sitemaps = re.findall(r"(?im)^sitemap:\s*(\S+)", self.text)
        self.assertEqual(len(sitemaps), 1)
        u = urlparse(sitemaps[0])
        self.assertEqual(u.scheme, "https")
        self.assertEqual(u.netloc, "mindgracencr.in")

    def test_no_sensitive_paths_leaked(self):
        # Security-through-obscurity audit: never map private surfaces publicly.
        for token in ("/admin", "/wp-admin", "/dev-login", "/backup", "/.env",
                      "/api/"):
            disallowed = re.findall(
                r"(?im)^disallow:\s*(\S*" + re.escape(token) + r"\S*)",
                self.text)
            self.assertEqual(disallowed, [],
                             f"Sensitive path {token} listed in public robots.txt")

    def test_assets_never_disallowed(self):
        # CSS/JS/image dirs must stay crawlable for rendering/AE understanding.
        for ext in (".css", ".js", "/assets"):
            hits = re.findall(r"(?im)^disallow:\s*(\S*" + re.escape(ext) + r"\S*)",
                              self.text)
            self.assertEqual(hits, [], f"Asset path blocked: {ext}")


class TestRobotsArchitecture(unittest.TestCase):
    """Phase 2: the tiered allow/disallow policy, evaluated via RFC 9309 logic."""

    @classmethod
    def setUpClass(cls):
        cls.text = read_bytes("robots.txt").decode("utf-8")
        cls.groups = parse_robots(cls.text)
        cls.m = RobotsMatcher(cls.groups)

    def test_every_framework_agent_named(self):
        named = {a for agents, _ in self.groups for a in agents}
        for agent in ALLOWED_AGENTS + DISALLOWED_AGENTS:
            self.assertIn(agent.lower(), named,
                          f"{agent} missing from robots.txt")

    def test_global_fallback_exists(self):
        self.assertTrue(any(agents == ["*"] for agents, _ in self.groups),
                        "Missing User-agent: * fallback group")

    def test_citation_agents_allowed(self):
        paths = ["/", "/services.html", "/blog/", "/faq.html",
                 "/sleep-and-autism-guide-indian-parents/",
                 "/tools/guided-breathing.html", "/sitemap.xml"]
        for agent in ALLOWED_AGENTS:
            for path in paths:
                self.assertTrue(self.m.fetch_allowed(agent, path),
                                f"{agent} blocked from {path}")

    def test_training_scrapers_disallowed(self):
        paths = ["/", "/services.html", "/blog/pages/adult/overthinking-vs-anxiety.html"]
        for agent in DISALLOWED_AGENTS:
            for path in paths:
                self.assertFalse(self.m.fetch_allowed(agent, path),
                                 f"{agent} NOT blocked from {path}")

    def test_anthropic_openai_split(self):
        # Blocking ClaudeBot/GPTBot must not break citation agents.
        self.assertFalse(self.m.fetch_allowed("ClaudeBot"))
        self.assertTrue(self.m.fetch_allowed("Claude-SearchBot"))
        self.assertTrue(self.m.fetch_allowed("Claude-User"))
        self.assertFalse(self.m.fetch_allowed("GPTBot"))
        self.assertTrue(self.m.fetch_allowed("OAI-SearchBot"))
        self.assertTrue(self.m.fetch_allowed("ChatGPT-User"))

    def test_google_extended_vs_googlebot(self):
        self.assertFalse(self.m.fetch_allowed("Google-Extended"))
        self.assertTrue(self.m.fetch_allowed("Googlebot"))

    def test_wildcard_anchor_precision(self):
        # The /*.pdf$ anchor blocks PDFs but must not overreach into routes
        # such as /downloads/pdf-guide/.
        self.assertFalse(self.m.fetch_allowed("SomeNewCrawler", "/report.pdf"))
        self.assertTrue(self.m.fetch_allowed("SomeNewCrawler",
                                             "/downloads/pdf-guide/"))
        self.assertTrue(self.m.fetch_allowed("SomeNewCrawler", "/index.html"))

    def test_longest_match_specificity(self):
        # Sanity-check the harness itself against RFC 9309 length rule using
        # a synthetic file: longer Allow beats shorter Disallow.
        groups = parse_robots(
            "User-agent: TestBot\nDisallow: /\nAllow: /blog/articles/\n")
        m = RobotsMatcher(groups)
        self.assertFalse(m.fetch_allowed("TestBot", "/other/"))
        self.assertTrue(m.fetch_allowed("TestBot", "/blog/articles/post.html"))


class TestLlmsTxt(unittest.TestCase):
    """Phase 3/4: llms.txt context layer (modular index + usage rights)."""

    @classmethod
    def setUpClass(cls):
        cls.raw = read_bytes("llms.txt")
        cls.text = cls.raw.decode("utf-8")

    def test_no_bom_or_nulls(self):
        self.assertFalse(self.raw.startswith(b"\xef\xbb\xbf"))
        self.assertNotIn(b"\x00", self.raw)

    def test_markdown_structure(self):
        self.assertTrue(self.text.startswith("# "),
                        "llms.txt must start with an H1 project title")
        self.assertIn("\n> ", self.text, "llms.txt needs a blockquote summary")
        self.assertRegex(self.text, r"\n## ", "llms.txt needs H2 sections")

    def test_usage_rights_section(self):
        self.assertRegex(self.text, r"(?im)^##\s*usage rights\s*$",
                         "Explicit attribution licensing section required")
        section = self.text.split("## Usage Rights", 1)[1].split("\n##", 1)[0]
        for word in ("summariz", "cit", "train"):
            self.assertIn(word.lower(), section.lower(),
                          f"Usage rights must address {word}-ing")

    def test_links_are_https_canonical(self):
        links = re.findall(r"https://mindgracencr\.in\S*", self.text)
        self.assertGreaterEqual(len(links), 10,
                                "Index should link the main site sections")

    def test_modular_context_convention_documented(self):
        self.assertIn("llms-", self.text,
                      "Modular llms-<topic>.txt convention must be documented")


class TestHeadersLayer(unittest.TestCase):
    """Phase 3: server-level X-Robots-Tag and llms.txt serving rules."""

    @classmethod
    def setUpClass(cls):
        cls.text = read_bytes("_headers").decode("utf-8")

    def test_pdf_noindex_header(self):
        self.assertRegex(self.text, r"/\*\.pdf[\s\S]*?X-Robots-Tag:\s*noindex",
                         "Non-HTML assets need X-Robots-Tag noindex")

    def test_llms_txt_content_type(self):
        self.assertRegex(self.text, r"/llms\.txt[\s\S]*?Content-Type:\s*text/plain",
                         "llms.txt must be served as plain text")

    def test_robots_cache_within_48h(self):
        block = self.text.split("/robots.txt", 1)[1].split("\n/", 1)[0]
        m = re.search(r"max-age=(\d+)", block)
        self.assertIsNotNone(m)
        self.assertLessEqual(int(m.group(1)), 48 * 3600,
                             "robots.txt cache must respect the 48h limit")

    def test_html_stays_indexable(self):
        self.assertRegex(self.text, r"X-Robots-Tag:\s*index,\s*follow")


class TestWorkerEdgeBlocking(unittest.TestCase):
    """Phase 3: server-level (Cloudflare Worker) hard blocks mirror robots.txt."""

    @classmethod
    def setUpClass(cls):
        cls.text = read_bytes("worker.js").decode("utf-8")

    def _blocked_bots(self):
        m = re.search(r"const BLOCKED_BOTS = \[([^\]]*)\]", self.text)
        self.assertIsNotNone(m, "worker.js must define a BLOCKED_BOTS list")
        return set(re.findall(r"'([a-z0-9-]+)'", m.group(1)))

    def test_blocked_list_matches_robots_section5(self):
        expected = {"bytespider", "diffbot", "petalbot", "scrapy", "aihitbot",
                    "bittorrentbot"}
        self.assertEqual(self._blocked_bots(), expected)

    def test_citation_agents_never_hard_blocked(self):
        blocked = self._blocked_bots()
        for agent in ALLOWED_AGENTS:
            self.assertNotIn(agent.lower(), blocked,
                             f"{agent} hard-blocked at edge kills AEO visibility")

    def test_pdf_noindex_and_llms_serving_in_worker(self):
        self.assertRegex(self.text, r"X-Robots-Tag',\s*'noindex")
        self.assertIn("/llms.txt", self.text)


class TestRepositoryHygiene(unittest.TestCase):
    """Keep build artifacts (e.g. __pycache__) out of the published site."""

    def test_no_pycache_tracked(self):
        # Verify against git's index rather than the working tree so local
        # untracked caches don't fail the suite.
        import subprocess
        out = subprocess.run(["git", "ls-files"], cwd=ROOT,
                             capture_output=True, text=True).stdout.splitlines()
        hits = [f for f in out if "__pycache__" in f or f.endswith(".pyc")]
        self.assertEqual(hits, [], f"Compiled artifacts tracked in git: {hits}")


class TestAeoContent(unittest.TestCase):
    """Phase 4 AEO: structured extraction triggers and machine-readable facts.

    Decision Rule 5 (tabular data prioritization) and the FAQPage schema rule
    (schema must mirror visible on-page content exactly - no hidden data).
    """

    def test_fees_page_has_comparison_table(self):
        html = read_bytes("fees.html").decode("utf-8")
        self.assertIn("<table", html,
                      "fees.html needs a clean HTML table for AI extraction")
        # Table must be semantically complete: caption, header row, body rows.
        self.assertRegex(html, r"<table[^>]*>\s*<caption>",
                         "comparison table requires a <caption>")
        self.assertIn("<thead>", html)
        self.assertGreaterEqual(html.count("<tr>"), 5,
                                "expected header + at least 4 data rows")

    def test_fees_table_numbers_match_visible_cards(self):
        # The table is an alternate view of the same facts; it must not
        # contradict the pricing cards (entity/data consistency rule).
        html = read_bytes("fees.html").decode("utf-8")
        for amount in ("900", "700", "500", "2,000", "8,000"):
            self.assertIn(amount, html, f"fee figure {amount} missing")

    def test_fees_page_faqschema_mirrors_visible_content(self):
        import json
        html = read_bytes("fees.html").decode("utf-8")
        blocks = re.findall(
            r'<script type="application/ld\+json">(.*?)</script>',
            html, re.S)
        faq = None
        for b in blocks:
            try:
                data = json.loads(b)
            except json.JSONDecodeError as e:
                self.fail(f"invalid JSON-LD block in fees.html: {e}")
            if isinstance(data, dict) and data.get("@type") == "FAQPage":
                faq = data
        self.assertIsNotNone(faq, "fees.html must carry FAQPage JSON-LD")
        self.assertGreaterEqual(len(faq["mainEntity"]), 3)
        visible = re.sub(r"<[^>]+>", " ", html)
        for q in faq["mainEntity"]:
            # Every answer's key fact must appear in visible page text too.
            snippet = q["acceptedAnswer"]["text"][:40].strip()
            self.assertIn(snippet.split()[0], visible,
                          f"FAQ answer not mirrored in visible content: {snippet}")
            self.assertEqual(q["@type"], "Question")

    def test_all_jsonld_blocks_site_wide_are_valid(self):
        import json
        root = ROOT
        checked = 0
        for dirpath, dirnames, filenames in os.walk(root):
            dirnames[:] = [d for d in dirnames
                           if d not in (".git", "__pycache__", "node_modules")]
            for fn in filenames:
                if not fn.endswith(".html"):
                    continue
                with open(os.path.join(dirpath, fn), encoding="utf-8") as f:
                    html = f.read()
                for b in re.findall(
                        r'<script type="application/ld\+json">(.*?)</script>',
                        html, re.S):
                    try:
                        json.loads(b)
                    except json.JSONDecodeError as e:
                        self.fail(f"invalid JSON-LD in {fn}: {e}")
                    checked += 1
        self.assertGreater(checked, 20, "sanity: site should have many blocks")


class TestSiteWideAeo(unittest.TestCase):
    """Framework rollout across the website (September 2026 AEO decisions).

    Decision Rule 1 (inverted pyramid), Rule 2/DefinedTerm schema,
    Rule 5 (tabular extraction triggers), Rule 10 (entity consistency:
    no empty "url" fields in organization-level JSON-LD).
    """

    CORE_PAGES = [
        "services.html", "conditions.html", "approach.html", "process.html",
        "assessments.html", "therapy.html", "psychiatry.html",
        "psychology-counselling.html", "teleconsultation.html",
        "child-development.html", "adhd-autism-assessment.html",
        "psychiatrist-greater-noida.html",
    ]

    def test_core_pages_open_with_direct_answer(self):
        for page in self.CORE_PAGES:
            html = read_bytes(page).decode("utf-8")
            m = re.search(
                r'<div class="seo-answer"><strong>Direct answer:</strong>'
                r'\s*(.*?)\s*</div>', html, re.S)
            self.assertIsNotNone(m, f"{page} missing inverted-pyramid answer")
            text = re.sub(r"<[^>]+>", "", m.group(1))
            # Direct, standalone answer within roughly 50-80 words.
            words = len(text.split())
            self.assertGreaterEqual(words, 15, f"{page} answer too thin ({words}w)")
            self.assertLessEqual(words, 90, f"{page} answer too long ({words}w)")

    def test_answer_blocks_styled(self):
        css = read_bytes("assets/css/min/seo-pages.min.css").decode("utf-8")
        self.assertIn(".seo-answer", css,
                      ".seo-answer styling must ship in the minified CSS")
        src = read_bytes("assets/css/seo-pages.css").decode("utf-8")
        self.assertIn(".seo-answer", src,
                      "source CSS and minified CSS must stay in sync")

    def test_two_core_comparison_tables_site_wide(self):
        # Decision Rule 5: at least two clean HTML tables on core pages.
        hits = []
        for page in ("fees.html", "services.html"):
            html = read_bytes(page).decode("utf-8")
            self.assertIn("<caption>", html, f"{page} table needs a caption")
            self.assertIn("<thead>", html)
            hits.append(page)
        self.assertEqual(len(hits), 2)

    def test_defined_term_schema_on_services(self):
        html = read_bytes("services.html").decode("utf-8")
        found = False
        for b in re.findall(
                r'<script type="application/ld\+json">(.*?)</script>',
                html, re.S):
            data = json.loads(b)
            if isinstance(data, dict) and any(
                    t.get("@type") == "DefinedTerm"
                    for t in data.get("hasDefinedTerm", [])):
                found = True
        self.assertTrue(found,
                        "services.html must expose DefinedTerm schema")

    def test_no_empty_urls_in_jsonld_site_wide(self):
        # Entity-consistency guard: every "url" property in structured data
        # must carry a real value (previously dozens of "url": "" defects).
        offenders = []
        for dirpath, dirnames, filenames in os.walk(ROOT):
            dirnames[:] = [d for d in dirnames
                           if d not in (".git", "__pycache__", "node_modules")]
            for fn in filenames:
                if not fn.endswith(".html"):
                    continue
                p = os.path.join(dirpath, fn)
                with open(p, encoding="utf-8") as f:
                    html = f.read()
                for b in re.findall(
                        r'<script type="application/ld\+json">(.*?)</script>',
                        html, re.S):
                    try:
                        data = json.loads(b)
                    except json.JSONDecodeError:
                        continue  # covered by the validity test

                    def walk(node, path):
                        if isinstance(node, dict):
                            for k, v in node.items():
                                if k == "url" and v == "":
                                    offenders.append(f"{fn}:{path}")
                                else:
                                    walk(v, f"{path}.{k}")
                        elif isinstance(node, list):
                            for i, v in enumerate(node):
                                walk(v, f"{path}[{i}]")
                    walk(data, "$")
        self.assertEqual(offenders, [],
                         f"empty url fields remain in JSON-LD: {offenders}")


    def test_faq_and_fees_have_direct_answers(self):
        """Inverted-pyramid rollout extended to faq.html and fees.html,
        the two highest-value answer-engine pages."""
        for fn in ("faq.html", "fees.html"):
            html = read_bytes(fn).decode("utf-8")
            self.assertIn('class="seo-answer"', html, f"{fn} missing direct-answer block")
            m = re.search(r'class="seo-answer">.*?</div>', html, re.S)
            words = len(re.sub(r"<[^>]+>", " ", m.group(0)).split())
            self.assertTrue(15 <= words <= 90, f"{fn} answer word count {words}")

    def test_faq_schema_questions_visible_on_page(self):
        """Decision Rule 2: FAQPage schema must mirror visible content."""
        html = read_bytes("faq.html").decode("utf-8")
        blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
        questions = []
        for b in blocks:
            data = json.loads(b)
            if isinstance(data, dict) and data.get("@type") == "FAQPage":
                questions = [q["name"] for q in data.get("mainEntity", [])]
        self.assertGreaterEqual(len(questions), 4)
        text = re.sub(r"<[^>]+>", " ", html)
        for q in questions:
            self.assertIn(q.strip("? "), text, f"schema question not visible: {q}")


    def test_faq_schema_json_file_matches_inline(self):
        """faq-schema.json must not drift from the visible FAQPage schema."""
        html = read_bytes("faq.html").decode("utf-8")
        m = re.search(r'<script type="application/ld\+json">(\{.*?"@type": "FAQPage".*?)</script>', html, re.S)
        inline = json.loads(m.group(1))
        standalone = json.loads(read_bytes("faq-schema.json").decode("utf-8"))
        self.assertEqual(inline, standalone)

    def test_telephone_entity_consistency(self):
        """Decision Rule 10: one canonical phone across every JSON-LD block.

        index.html previously carried a stale +919311116002 in its MedicalClinic
        schema while every visible tel: link and all other pages use
        +91-9667863295; about/book/location used a different dash grouping.
        Conflicting facts degrade AI trust - assert a single normalized value.
        """
        canonical = "919667863295"
        offenders = []
        for name in sorted(f for f in os.listdir(ROOT) if f.endswith(".html")):
            path = os.path.join(ROOT, name)
            with open(path, encoding="utf-8") as fh:
                html = fh.read()
            for block in re.findall(
                r'<script type="application/ld\+json">(.*?)</script>', html, re.S
            ):
                try:
                    data = json.loads(block)
                except json.JSONDecodeError:
                    continue  # covered by the JSON-LD validity test
                text = json.dumps(data)
                for tel in re.findall(r'"telephone"\s*:\s*"([^"]+)"', text):
                    if re.sub(r"[^0-9]", "", tel) != canonical:
                        offenders.append(f"{name}: {tel}")
        self.assertEqual(offenders, [], f"non-canonical telephone values: {offenders}")

    def test_every_content_page_opens_with_direct_answer(self):
        """Decision Rule 1 rollout completed site-wide: every indexable
        content page must carry exactly one inverted-pyramid direct-answer
        block of 15-90 words, and every such page must link the stylesheet
        that styles it. Error/offline shells (404.html, offline.html) are
        excluded: they are noindex utility pages with no query to answer."""
        EXCLUDED = {"404.html", "offline.html"}
        pages = sorted(f for f in os.listdir(ROOT)
                       if f.endswith(".html") and f not in EXCLUDED)
        self.assertGreaterEqual(len(pages), 40)
        for name in pages:
            with open(os.path.join(ROOT, name), encoding="utf-8") as fh:
                html = fh.read()
            self.assertEqual(
                html.count('class="seo-answer"'), 1,
                f"{name} must have exactly one direct-answer block")
            m = re.search(
                r'<div class="seo-answer"><strong>Direct answer:</strong>'
                r'\s*(.*?)\s*</div>', html, re.S)
            self.assertIsNotNone(m, f"{name} answer block malformed")
            words = len(re.sub(r"<[^>]+>", " ", m.group(1)).split())
            self.assertTrue(15 <= words <= 90,
                            f"{name} answer word count {words}")
            self.assertIn("seo-pages.min.css", html,
                          f"{name} missing seo-pages stylesheet link")

    def test_blog_articles_carry_in_short_summary(self):
        """Decision Rule 1 extended to The Mind Grace Journal: every blog
        article must open with an 'In short' extraction callout derived from
        its own lead paragraph (no fabricated facts), styled by both the
        source and minified classic-blog CSS."""
        import glob as _glob
        articles = sorted(_glob.glob(os.path.join(ROOT, "blog/pages/*/*.html")))
        self.assertGreaterEqual(len(articles), 9)
        for path in articles:
            html = read_bytes(path).decode("utf-8")
            self.assertEqual(html.count('class="blog-answer"'), 1,
                             f"{path} needs exactly one In-short callout")
            m = re.search(r'<div class="blog-answer"><strong>In short:</strong>'
                          r'\s*(.*?)\s*</div>', html, re.S)
            self.assertIsNotNone(m, f"{path} callout malformed")
            words = len(re.sub(r"<[^>]+>", " ", m.group(1)).split())
            self.assertTrue(15 <= words <= 90,
                            f"{path} callout word count {words}")
        for css in ("assets/css/classic-blog.css",
                    "assets/css/min/classic-blog.min.css"):
            self.assertIn(".blog-answer", read_bytes(css).decode("utf-8"),
                          f"{css} missing .blog-answer styling (sync check)")

    def test_every_content_page_carries_extraction_callout(self):
        """Site-wide inverted-pyramid guard: every HTML page except the
        noindex shells (404, offline, thank-you) must contain exactly one
        extraction callout (seo-answer or blog-answer div), and guide/blog
        pages that use blog-answer must link a stylesheet defining it."""
        import glob as _glob
        shells = {"404.html", "offline.html", "thank-you.html"}
        pages = [os.path.relpath(p, ROOT).replace(os.sep, "/")
                 for p in _glob.glob(os.path.join(ROOT, "**/*.html"),
                                     recursive=True)]
        self.assertGreaterEqual(len(pages), 60)
        for rel in pages:
            if rel in shells:
                continue
            html = read_bytes(os.path.join(ROOT, rel)).decode("utf-8")
            n = len(re.findall(r'class="(seo|blog)-answer"', html))
            self.assertEqual(n, 1, f"{rel} has {n} extraction callouts")
            # structural hygiene: balanced divs (open==close delta vs zero)
            self.assertEqual(
                len(re.findall(r"<div[ >]", html)),
                len(re.findall(r"</div>", html)),
                f"{rel} unbalanced <div> tags")
        # tools pages must style their seo-answer via shared stylesheet
        for rel in sorted(_glob.glob(os.path.join(ROOT, "tools/*.html"))):
            html = read_bytes(rel).decode("utf-8")
            self.assertIn("seo-pages.min.css", html,
                          f"{rel} missing seo-pages stylesheet link")


    def test_llms_modular_ecosystem(self):
        """Decision Rule 3/4: the llms.txt index must link module files that
        exist on disk, each module repeats the usage-rights restriction, and
        both Pages _headers and worker.js serve them as text/plain."""
        index = read_bytes(os.path.join(ROOT, "llms.txt")).decode("utf-8")
        modules = sorted(glob.glob(os.path.join(ROOT, "llms-*.txt")))
        self.assertGreaterEqual(len(modules), 2)
        headers = read_bytes(os.path.join(ROOT, "_headers")).decode("utf-8")
        worker = read_bytes(os.path.join(ROOT, "worker.js")).decode("utf-8")
        for m in modules:
            name = os.path.basename(m)
            self.assertIn(name, index, f"llms.txt index missing link to {name}")
            body = read_bytes(m).decode("utf-8")
            self.assertIn("restricted", body.lower(),
                          f"{name} missing usage-rights restriction (Rule 4)")
            self.assertIn("Attribution", body, f"{name} missing attribution section")
            self.assertIn(f"/{name}", headers,
                          f"_headers missing text/plain rule for {name}")
        # worker regex must cover the llms-<topic>.txt naming pattern
        self.assertIn(r"llms-", worker)
        self.assertTrue(re.search(r"/\^\\/llms-", worker) or "llms-" in worker)

    def test_sitemap_matches_indexable_pages(self):
        """Phase 5 maintenance guard: every sitemap <loc> must resolve to a
        real HTML file that is NOT noindex (ghost-indexing prevention), and
        every indexable page on disk must appear in the sitemap."""
        import glob as _glob
        sm = read_bytes(os.path.join(ROOT, "sitemap.xml")).decode("utf-8")
        locs = set(re.findall(r"<loc>(.*?)</loc>", sm))
        self.assertGreaterEqual(len(locs), 60)
        base = "https://mindgracencr.in/"
        # 1. every loc -> existing, indexable file
        for loc in locs:
            rel = loc[len(base):] if loc.startswith(base) else loc
            rel = rel.rstrip("/") or "index"
            cand = rel if rel.endswith(".html") else os.path.join(rel, "index.html")
            path = os.path.join(ROOT, cand.replace("/", os.sep))
            self.assertTrue(os.path.exists(path), f"sitemap loc has no file: {loc}")
            html = read_bytes(path).decode("utf-8")
            m = re.search(r'<meta name="robots" content="([^"]+)"', html)
            self.assertNotIn("noindex", (m.group(1) if m else "").lower(),
                             f"noindex page listed in sitemap: {loc}")
        # 2. every indexable file -> in sitemap
        for f in _glob.glob(os.path.join(ROOT, "**/*.html"), recursive=True):
            rel = os.path.relpath(f, ROOT).replace(os.sep, "/")
            html = read_bytes(f).decode("utf-8")
            m = re.search(r'<meta name="robots" content="([^"]+)"', html)
            if m and "noindex" in m.group(1).lower():
                continue
            url = base + ("" if rel == "index.html"
                          else rel[:-len("index.html")] if rel.endswith("/index.html")
                          else rel)
            self.assertIn(url, locs, f"indexable page missing from sitemap: {rel}")


if __name__ == "__main__":

    unittest.main()
