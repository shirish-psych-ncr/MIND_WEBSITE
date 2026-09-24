# Google Translate Widget (Site-Wide Language Picker)

Every content page now shows two controls in its header, injected by
`/assets/js/translate.js`:

1. **हिन्दी button** (pink, Devanagari "अ" icon + label) — one click translates
   the entire site to Hindi. This is the default quick language. Clicking it
   again while Hindi is active keeps Hindi; switch via the picker for English.
2. **Translate button** (globe icon + chevron) — opens a panel listing other
   languages: English (original), Bengali, Tamil, Telugu, Marathi, Gujarati,
   Kannada, Malayalam, Punjabi, Urdu, Spanish, French, German, Arabic,
   Chinese, Japanese, Russian. Keyboard accessible (Enter/Space, arrow keys,
   Escape closes; `aria-expanded`/`aria-current`/`aria-pressed` maintained).

## How it works
- The official Google Translate *element* widget (`translate.google.com/
  translate_a/element.js`) is lazy-loaded and mounted hidden in
  `#google_translate_element`. Our buttons drive its internal `<select>`
  (`.goog-te-combo`) and dispatch `change`, so translation is Google's real
  engine with none of its UI chrome.
- Choice persists across pages via `localStorage["mg-lang"]` and is re-applied
  when the widget finishes initializing on each navigation.
- Pages carry `<meta name="google" content="notranslate">` so Chrome's own
  translate toolbar/banner never appears — our picker is the single entry
  point. The widget container and our controls are `class="notranslate"` so
  they don't machine-translate themselves mid-session.
- CSP (`_headers`) allows `translate.google.com` in `script-src`/`style-src`
  and `translate.google.com`/`translate.googleapis.com` in `connect-src`.
- Service worker precaches `/assets/css/translate.css` and
  `/assets/js/translate.js` (cache `mindgrace-v7`); the translation fetches
  themselves are always network-only and degrade gracefully offline.

## Files
- `assets/js/translate.js` — widget bootstrap + UI injection (all headers).
- `assets/css/translate.css` — control styling incl. mobile/reduced-motion.
- `scripts/add_translate_widget.py` — idempotent injector of the two tags
  before `</head>` on all 64 content pages (skips 404/offline/thank-you).
- `scripts/add_translate_meta.py` — adds the notranslate meta tag everywhere.

## Editing languages
Change the `LANGUAGES` array in `translate.js` (code must be a valid Google
language code; '' = original). Change `DEFAULT_LANG` to alter the quick
button target.

## Notes / limits
- Machine translation quality varies; clinical content should be reviewed if
  used professionally. Consider adding a disclaimer line later.
- If Google blocks the widget (rare, or regional restrictions), buttons stay
  visible but no-op with a console warning — layout unaffected.

## Analytics events

Every language change fires a `Language Selected` event (props: `language`,
`source` = `hindi_button` | `panel`) through `window.mgAnalytics.track()`
(Amplitude) with a `gtag` fallback, so you can measure Hindi vs. other-language
adoption in both Amplitude and GA4.

## CSS safety note

`translate.css` hides Google's injected UI only via Google-specific selectors
(`.goog-te-banner-frame`, `.goog-te-gadget`, `.goog-te-combo`,
`#google_translate_element`). A blanket `.skiptranslate { display:none }` was
removed on purpose — Google marks translated page wrappers with that class, so
the blanket rule could hide real site content.
