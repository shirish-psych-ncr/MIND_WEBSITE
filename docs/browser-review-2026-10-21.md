# Browser review: homepage and shared page layouts

## Preview

Build with `npm run build:ci`, then use `npm run preview:review` to serve **dist**
at http://127.0.0.1:8765. A repository-root static server does not serve the Astro
pages. The browser previously showed an old cached page while no server was
listening on this port. The corrected preview serves the new content directly
at both `/` and `/index.html`.

`src/pages/index.astro` contains the patient-and-student landing content;
`landing.astro` retains the same content for existing links. Both identify `/`
as the canonical homepage. Keep their shared content synchronized when editing.

## Pages inspected in the in-app browser

- `/`, `/index.html`: header, light/dark themes, enquiry panels, patient and
  academic form tabs, section links and footer.
- `/teleconsultation`, `/contact`, `/book`: introductions, contact cards,
  booking disclosure and gated form layout. No enquiries were sent.
- `/services`, `/psychiatry`, `/child-development`, `/fees`: page hierarchy,
  cards, headings, dark-mode contrast and the fee comparison table.
- `/faq`: expanded the confidentiality answer; verified its expanded state
  and visible answer after repairing the initializer.
- `/resources`, `/tools/guided-breathing`: followed the tool link, started
  and ended a breathing session, and followed the reading link to `/blog`.
- `/blog`, `/blog/children`, `/blog/pages/child/speech-delay-red-flags`:
  category navigation, search, filtered card sizing and article navigation.
- `/student-internship-guides`, `/blog/pages/adult/aud-psychology-internship`:
  institute links, matching and empty search results, article gutters, logo,
  breadcrumb hierarchy and clinic address.
- `/academic-training`, `/about`, `/doctors`, `/location`, `/process`:
  mobile navigation, page introductions, address-copy feedback and shared shell.

## Fix ownership

- `site-foundation.css`: native hidden-state protection, visually hidden text,
  theme-aware button contrast, article/card sizing, article gutters, institute
  identity layout, booking gate spacing, caption contrast and compact desktop
  header. Rebuild the minified assets after editing.
- `visitor-friendly.js`: route-key consistency for clean and `.html` URLs,
  academic breadcrumbs, deduplicated category crumbs, opening-summary placement,
  homepage links and suppression of redundant article conversion panels.
- `main.js`: both existing accordion selector contracts are supported, with a
  binding guard to prevent duplicate listeners.
- Homepage files: theme-aware surfaces, correct metadata, accurate WhatsApp
  handoff status, neutral consultation-mode default, persistent input help and
  training links that select the academic enquiry form.
- Institute guide component and directory: readable identity/gutters, correct
  clinic address, directory filtering and relevant academic links.

## Validation boundaries

The in-app browser is the evidence for the interactions above. The build gate
checks generated routes, local links and structured data; it does not establish
that every page has been manually reviewed. Production deployment is separate
from the local preview. External forms and clinic messages were not submitted.

Final shipping build passed: 122 routes, 10,513 local references, zero failures;
structured data checked in 123 generated HTML pages. JavaScript syntax checked
across 90 files. Responsive shell checks passed at 360, 768, 1100 and 1440 CSS
pixels. The final desktop menu was also opened and dismissed in the in-app
browser; its three columns span the header container. The viewport override was
reset and the local `/index.html` page left open showing the new homepage.

Visual evidence: `output/browser-review/homepage-mobile.png`. A detached local
preview runs on port 8765; logs are in `output/preview-review.log` and
`output/preview-review.error.log`.
