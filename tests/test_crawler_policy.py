"""Validation suite for the 2026 AI crawler management & AEO deployment.

Covers the operational framework's mandatory checks:
  Phase 1 - infrastructure hygiene (BOM, null bytes, size limit, LF endings).
  Phase 2 - the tiered robots.txt architecture and RFC 9309 specificity rules.
  Phase 3 - syntax hardening (no inline comments, $ anchors) and the
            llms.txt / X-Robots-Tag complementary layers.
Run with: python -m unittest discover -s tests -v
"""
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


if __name__ == "__main__":
    unittest.main()
