# Accessibility, contrast and spacing review — 22 October 2026

Scope: the local generated Mind Grace website, including all published routes,
legacy page templates, both color themes, mobile and desktop layouts. This review
does not represent a production deployment or a complete WCAG conformance claim.

## Causes repaired

- Legacy component CSS referenced undefined `--space-xs` through `--space-3xl`,
  font-size, line-height, transition and surface tokens. Browsers discarded the
  affected declarations. Added compatible, theme-aware definitions in the
  shared foundation rather than patching each affected page independently.
- Added missing button geometry: inner padding, a 44px minimum height, wrapping
  labels and explicit gaps between actions. Added grid gaps and removed the
  alternating card margins that staggered resource cards on small screens.
- Added inner spacing for labels, tags, notices and badges, with room between
  overlines and headings. Kept headings and card contents readable when wrapping.
- Corrected dark-theme comparison cards, doctor credentials, fee period labels,
  table headings, homepage roles and appointment-status links.
- Replaced gradient-filled logo lettering with a solid theme color and gave the
  logo image a white backing in dark theme. Removed decorative overlays from
  shared chrome and text-bearing hero surfaces so their contrast stays stable.
- Strengthened light-theme control borders: `#a47486` has 3.87:1 contrast against
  white and 3.53:1 against the blush surface. Dark borders retain the existing
  theme-specific color.
- Repaired the high-contrast palette so enabling it from dark theme does not
  leave dark text on dark cards or dark text on filled buttons. High contrast
  uses a coherent light palette and restores the saved theme when turned off.
- Corrected the mobile menu's dialog element and stacking so the safety banner
  does not cover its title or close control. Icons inherit their control color.
- Corrected contact/doctor heading levels, Sharda guide table row headers,
  safety-notice landmarks, the appointment shortcut landmark, and decorative
  canvas semantics. Removed duplicate hidden crisis announcements and repeated
  tool banners.
- Preserved readable table columns inside scrollable wrappers instead of
  breaking prices and words into fragments, and made them keyboard focusable.
- Corrected an enquiry CTA whose secondary-link text color matched its filled
  background. The runner now separately flags 1:1 contrast items even when axe
  classifies them as requiring manual review.
- Replaced the gallery's translucent caption background with an opaque plate
  and corrected its category-card text in dark theme. Removed obsolete fixed
  navigation links that covered tool view controls.

## Repeatable audit

`npm run audit:accessibility` uses the installed
Playwright and axe-core modules. The old `AXE_PATH` requirement and repository-wide
HTML glob have been removed. It reads `dist/route-manifest.json`, serves the built
site on a temporary local port, blocks external requests and service workers,
waits for the shell and dynamic article feeds, and audits each route at 390px and
1440px in light and dark themes.

Reports are written to ignored `output/accessibility-audit/<run>/` directories.
`results.json` contains selectors, rendered markup, contrast values, audit
errors and layout measurements. `summary.json` groups repeated issues.

Examples (run after the shipping build):

```text
npm run build:ci
npm run audit:accessibility -- --out=after
npm run audit:accessibility -- / /resources --widths=320 --scenario=text-spacing --out=text-spacing
npm run audit:accessibility -- / --scenario=menu --out=menu
npm run audit:accessibility -- / --scenario=accessibility --out=accessibility-panel
npm run audit:accessibility -- / /resources --scenario=high-contrast --out=high-contrast
```

The inset and overflow checks are geometry heuristics, including page-specific
bordered surfaces. Inspect their results before treating them as defects.
Contrast items marked incomplete by axe require review; they are not passes.
The runner supports `--scenario=large-text` for 200% root text sizing as well.

Tooling used: bundled Node 24.19.0, installed Playwright 1.57.0, axe-core 4.13.0
and wcag-contrast 3.0.0. The bundled runtime was located with the workspace
dependency tool; the current repository supplies the browser/audit modules.

## Evidence and limits

Baseline: 123 routes × two widths × two themes = 492 scans, zero scan errors.
It reported 522 rule/scan failures: landmark coverage on 492 scans, invalid table
header scope on four, heading order on eight, contrast on 14, and target size on
four. There were 304 cramped-surface measurements in the original shared-class
check. Later measurements also include page-specific bordered surfaces.

The in-app browser was used to inspect resources, fees, teleconsultation,
academic training, gallery, fractal settings, expanded navigation and theme
switching. Resource cards and CTAs were visibly
cramped before repair. Browsing also exposed the fee table's fragmented text and
the menu title/close control being covered by the emergency banner.

| Check | Coverage | Result |
| --- | --- | --- |
| Full route rerun | 123 pages × 390/1440px × light/dark = 492 scans | Zero axe violations, inset findings or document overflow. Two additional 1:1 contrast review items on the doctor page were then repaired and retested below. |
| Follow-up pages | 12 affected pages × two widths × two themes = 48 scans | Zero violations, 1:1 contrast review items, inset findings or overflow. |
| High contrast | Seven pages, two widths, enabled from both starting themes = 28 unique cases | All pass after the four fractal cases were retested following their final token repair. |
| Expanded menu | Home, two widths, both themes = four scans | All pass. |
| Accessibility panel | Home, two widths, both themes = four scans | All pass. |
| Text spacing | Eight core routes at 320px in both themes = 16 scans | All pass with 1.5 line height, .12em letter spacing, .16em word spacing and 2em paragraph margins. |
| Large root text | Eight core routes at 320px in both themes = 16 scans | All pass at 200% root font size. |
| Header/footer and keyboard | Home, contact and academic hub at 320/360/768/1100/1440px = 15 cases | No geometry failures. Skip-link focus, menu close hit targets, Escape, focus return, and contrast preference persistence/restoration pass. |
| Fractal after final token repair | Both widths and themes, ordinary and high-contrast modes = eight scans | All pass. |
| Shipping build | 122 generated routes, 123 structured-data pages, 10,391 local references | Passed with zero validation failures. |
| JavaScript syntax / whitespace | 91 JavaScript files; `git diff --check` | Passed. |

The full run is `verified-full`; its two doctor-page review findings are resolved
by `follow-up`. Contrast-mode raw results are `contrast-final`, with the four
fractal cases superseded by `contrast-fractal-final`. Other successful reports
are `menu-final`, `accessibility-final`, `text-spacing-final`, `large-text`, and
`output/shell-audit/results.json`. Failed intermediate reports are retained as
diagnostic history, rather than edited to look like passing runs.

Browser evidence is in `output/accessibility-audit/browser/`: the repaired
mobile menu, high contrast enabled from dark theme, gallery caption/category
cards, and aligned resource cards with padded actions. The in-app browser is
left on the resources page. Changes are local; production was not deployed.

Some axe contrast checks remain incomplete for offscreen skip links, clipped
parts of scrollable tables, glyph-only content, decorative gradients and image
scenes. These are not counted as passes. The focused skip link is separately
checked for visibility and hit testing; gallery captions/category cards and tool
settings received direct visual review and opaque text surfaces. Numerical
contrast checks and automated scans do not replace assistive-technology testing.

External booking forms, WhatsApp submission, third-party embeds and assistive
technology user testing are outside the automated local scan. The browser
review uses the actual in-app browser; automated geometry/axe scans use local
Chromium with external resources blocked, so font metrics may differ from
network-loaded fonts. Mobile checks use browser viewport sizes, not a physical
Android device. Native screen-reader testing is still a separate task.
