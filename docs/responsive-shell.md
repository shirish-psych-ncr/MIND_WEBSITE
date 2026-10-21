# Shared header, footer, and spacing

The header and footer markup lives in `src/components/Shell.astro`.
`assets/js/visitor-friendly.js` binds mobile navigation and adds the footer's
Care guides group. Translation controls are inserted into the header separately.

Structural styles belong in the **Shared shell contract** section of
`assets/css/site-foundation.css`. Scope them to `[data-shared-shell]` so legacy
page styles cannot alter their layout. Top-level navigation rules must target
`.desktop-nav > ul`, not every descendant list: dropdowns need their own display,
positioning, wrapping, and padding.

The compact menu breakpoint is 1100px, matching the JavaScript resize listener.
At phone widths, the language picker includes Hindi; the duplicate Hindi shortcut
is hidden to preserve room for the clinic name and 44px controls. The language
button retains its accessible text even when its visible label is compact.

Footer columns adapt at 600px, 1100px, and 1250px. Allow long email addresses to
wrap, and account for all three link groups, including the runtime Care guides.

Text-bearing cards, notices, panels, and answer boxes share a 20–32px fluid inset.
Media wrappers and tool canvases retain their own sizing. Avoid subtracting page
gutters twice through both wrapper width and extra padding.

## Verification

Build with Node >=22.19.0 using `npm run build:ci`, then run:

```sh
node scripts/audit-shell.mjs
```

The audit serves the generated build locally, blocks external requests, and checks
all manifest routes plus the offline page at 360, 768, 1100, and 1440px. It checks unique shared chrome,
offscreen links and controls, logo/control overlap, navigation breakpoints,
closed dropdown visibility, and the homepage menu's open/Escape behavior.
Reports and selected full-page screenshots go to `output/shell-audit`.
Pass route arguments for focused checks, for example:

```sh
node scripts/audit-shell.mjs / /contact /fees
```

These are Chromium viewport checks, not physical Android-device certification.
Review screenshots as well: geometry assertions alone cannot judge comfortable
spacing or detect every visual conflict.

## Results — 20 October 2026

- All 122 manifest routes passed at all four widths: 488 checks.
- The offline page passed at all four widths.
- After the final rebuild, home, contact, landing, fees, and Leaf on Stream
  passed another 20 checks, including the keyboard dropdown interaction.
- Additional screenshot review covered 320px dark pages, 844×390 landscape
  navigation, the language picker, and breakpoint widths through 1920px.
- Production build: 122 routes; 59 indexed articles; structured data validated
  in 123 pages; 10,979 local references validated with zero failures.
- Reports: `output/shell-audit/all-routes.json`, `final-focused.json`, and
  `results.json` (offline). Screenshots are in the same ignored directory.

The Windows public-asset integration now passes a file URL to Astro rather than
a drive-letter path. Dev startup reaches ready; its existing legacy inline-script
dependency-scan warnings remain. Browser verification used the production build.
The normal build steps were executed directly with the available Node 24.19.0
runtime because the default Node 22.14.0 is below the repository requirement.
No deployment was performed.
