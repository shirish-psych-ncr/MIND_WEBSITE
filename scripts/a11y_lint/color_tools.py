"""Shared color parsing utilities for the a11y lint suite.

Handles hex, rgb()/rgba(), hsl()/hsla(), oklch() (approximate), named CSS
colors, and resolves CSS custom properties (--token: value) so contrast
checks work on real stylesheets like assets/css/base.css.
"""
import math
import re

NAMED = {
    "black": "#000000", "white": "#ffffff", "red": "#ff0000", "lime": "#00ff00",
    "blue": "#0000ff", "yellow": "#ffff00", "cyan": "#00ffff", "magenta": "#ff00ff",
    "silver": "#c0c0c0", "gray": "#808080", "grey": "#808080", "maroon": "#800000",
    "olive": "#808000", "green": "#008000", "purple": "#800080", "teal": "#008080",
    "navy": "#00008b", "orange": "#ffa500", "pink": "#ffc0cb", "brown": "#a52a2a",
    "coral": "#ff7f50", "salmon": "#fa8072", "gold": "#ffd700", "indigo": "#4b0082",
    "violet": "#ee82ee", "turquoise": "#40e0d0", "crimson": "#dc143c",
    "tomato": "#ff6347", "orchid": "#da70d6", "plum": "#dda0dd", "khaki": "#f0e68c",
    "beige": "#f5f5dc", "ivory": "#fffff0", "lavender": "#e6e6fa",
    "whitesmoke": "#f5f5f5", "aliceblue": "#f0f8ff", "mintcream": "#f5fffa",
    "honeydew": "#f0fff0", "ghostwhite": "#f8f8ff", "seashell": "#fff5ee",
    "oldlace": "#fdf5e6", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9",
    "mistyrose": "#ffe4e1", "lavenderblush": "#fff0f5", "lemonchiffon": "#fffacd",
    "chocolate": "#d2691e", "goldenrod": "#daa520", "firebrick": "#b22222",
    "forestgreen": "#228b22", "seagreen": "#2e8b57", "darkgreen": "#006400",
    "darkblue": "#00008b", "darkred": "#8b0000", "dimgray": "#696969",
    "dimgrey": "#696969", "slategray": "#708090", "lightskyblue": "#87cefa",
}

HEX_RE = re.compile(r"^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$")
RGB_RE = re.compile(r"rgba?\(\s*([\d.]+)(%?)\s*[,\s]+([\d.]+)(%?)\s*[,\s]+([\d.]+)(%?)", re.I)
HSL_RE = re.compile(r"hsla?\(\s*([\d.]+)(?:deg)?\s*[,\s]+([\d.]+)%\s*[,\s]+([\d.]+)%", re.I)
OKLCH_RE = re.compile(r"oklch\(\s*([\d.]+)(%?)\s+([\d.]+)(%?)\s+(-?[\d.]+)(?:deg)?\s*\)", re.I)
VAR_REF_RE = re.compile(r"var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)")


def _clamp255(v):
    return max(0.0, min(255.0, v))


def hex_to_rgb(h):
    """Return (r,g,b) floats 0..255 or None."""
    if not h:
        return None
    h = h.strip()
    if not HEX_RE.match(h):
        return None
    h = h[1:]
    if len(h) in (3, 4):
        h = "".join(c * 2 for c in h[:3])
    elif len(h) == 8:
        h = h[:6]
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def rgb_to_hex(rgb):
    return "#{:02x}{:02x}{:02x}".format(*(int(round(_clamp255(c))) for c in rgb))


def hsl_to_rgb(h, s, l):
    s, l = s / 100.0, l / 100.0
    c = (1 - abs(2 * l - 1)) * s
    x = c * (1 - abs(((h / 60.0) % 2) - 1))
    m = l - c / 2
    if h < 60: r, g, b = c, x, 0
    elif h < 120: r, g, b = x, c, 0
    elif h < 180: r, g, b = 0, c, x
    elif h < 240: r, g, b = 0, x, c
    elif h < 300: r, g, b = x, 0, c
    else: r, g, b = c, 0, x
    return ((r + m) * 255, (g + m) * 255, (b + m) * 255)


def oklch_to_rgb(L, C, H_deg):
    """Approximate OKLCH -> sRGB (Oklab -> linear RGB -> gamma)."""
    h = math.radians(H_deg)
    a = C * math.cos(h)
    b = C * math.sin(h)
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684410026 * l + 2.6092602764 * m - 0.3413193965 * s
    bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

    def gamma(v):
        v = max(0.0, min(1.0, v))
        return 12.92 * v if v <= 0.0031308 else 1.055 * (v ** (1 / 2.4)) - 0.055

    return (gamma(r) * 255, gamma(g) * 255, gamma(bl) * 255)


def parse_color(value, tokens=None, depth=0):
    """Parse a CSS color value into an (r,g,b) tuple. Returns None if unparseable."""
    if value is None or depth > 8:
        return None
    v = str(value).strip()
    low = v.lower()
    if not v or low in ("transparent", "currentcolor", "inherit", "initial", "unset", "none"):
        return None
    if low in NAMED:
        return hex_to_rgb(NAMED[low])
    if HEX_RE.match(v):
        return hex_to_rgb(v)
    m = RGB_RE.match(v)
    if m:
        vals = [float(m.group(i)) for i in (1, 3, 5)]
        pcts = [m.group(i) == "%" for i in (2, 4, 6)]
        return tuple(p * 2.55 + n * (not p) for p, n in zip(pcts, vals))
    m = HSL_RE.match(v)
    if m:
        h, s, l = (float(x) for x in m.groups())
        return hsl_to_rgb(h % 360, s, l)
    m = OKLCH_RE.search(v)
    if m:
        L, C, Hh = float(m.group(1)), float(m.group(3)), float(m.group(5))
        if m.group(2) == "%" or L > 1.0:
            L /= 100.0
        if m.group(4) == "%":
            C /= 100.0
        return oklch_to_rgb(L, C, Hh)
    m = VAR_REF_RE.search(v)
    if m and tokens:
        return parse_color(tokens.get(m.group(1)), tokens, depth + 1)
    return None


def load_css_tokens(css_text):
    """Collect `--name: value;` declarations from CSS text into a dict."""
    tokens = {}
    for m in re.finditer(r"(--[\w-]+)\s*:\s*([^;{}]+)[;}]", css_text):
        tokens.setdefault(m.group(1), m.group(2).strip())
    return tokens


COLOR_VALUE_RE = re.compile(
    r"(#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|oklch\([^)]*\)|"
    r"oklab\([^)]*\)|var\(--[\w-]+(?:,[^)]*)?\)|[a-zA-Z][a-zA-Z0-9-]*)"
)
