# Aasha child-care content

All child-related clinical services on this site belong to Aasha Child Development & Early Intervention Centre. Mind Grace retains adult care and academic training.

- Canonical centre profile: `src/pages/aasha.astro`.
- Logo: `assets/images/Aasha_early_intervention_logo.webp` (case-sensitive filename).
- Shared attribution: `src/components/AashaCare.astro`, included inside the main landmark on child resources and mixed-care pages.
- Homepage: dedicated Aasha service card. Keep desktop, no-JavaScript and mobile menus consistent in `Shell.astro` and `assets/js/visitor-friendly.js`.
- Child/student Blueprint pages can supply the attribution through the default slot.
- Centre entity and hours: `src/components/StructuredData.astro`.
- Details supplied by the site owner: Dr. Anita Sharma, Consultant Psychiatrist & Clinical Director; Dr. Sana Firdos, Clinical Psychologist & Head of Assessments; J-123, J Block, Gamma 2, Greater Noida, Uttar Pradesh 201310; +91 96678 63295; Monday–Saturday, noon–8 PM; Sunday closed.
- Use individualised goals and progress reviews; avoid superiority claims or guaranteed outcomes. Adult ADHD/autism assessments remain with Mind Grace; child assessments come under Aasha.

Validation: run `npm run build:ci` for the generated site, schema and internal-reference checks. Run the existing accessibility audit on changed routes for desktop/mobile and light/dark coverage. Deployment is a separate operation.

Verified locally: 122 routes, 123 structured-data pages and 10,839 local references passed. The existing browser accessibility audit passed 20 scenarios across five routes, two viewport widths and both themes, with zero rule violations, overflow or spacing issues. No deployment performed.


## Search, answer and generative-search expansion

- `src/data/aasha.json` is the shared source for the centre identity, contact details, six services and centre FAQs. Use it instead of duplicating facts in new components.
- `/aasha` is the centre hub. Six explicit static routes under `/aasha/` cover speech and language therapy, occupational therapy, special education, behavioural support, developmental assessment and child psychiatry. Each has a distinct title, summary, preparation guidance, related pathways, visible FAQs, a Service provider reference and server-rendered breadcrumbs.
- `AashaServicePage.astro` and `AashaQuestions.astro` render the common layouts and ensure FAQ structured data comes from the same answers visitors read.
- `Shell.astro` exposes Aasha’s identity, address, hours, logo and service links across all standard pages. `StructuredData.astro` references one centre ID; child pages use Aasha as their subject while other pages retain their original subject.
- `Layout.astro` fills missing social-sharing metadata without appending child-care keywords to unrelated page titles.
- `llms-aasha.txt` is an optional factual summary linked from `llms.txt` and the child-guide index. It is supplementary to the visible HTML, not a ranking mechanism. Update the summary alongside `src/data/aasha.json`; the validation checks its service links.
- Crawler rules and existing content-use rights were preserved. The factual index now distinguishes Aasha child care from Mind Grace adult care; robots.txt access directives do not replace content-use terms.
- No new rating, affiliation, accreditation, clinical review date, testimonial or outcome guarantee was added.
- `scripts/validate_aasha.py` checks generated metadata, crawlable hub links, logo alternatives, stable centre identity, visible contact/hours, service providers, sitemap discovery and visible FAQ/schema agreement.

Official implementation references: [Google AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) and [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a). Search and AI discovery rely on crawlable, useful content and accurate visible facts; no special AI schema or guaranteed visibility is implied.

Deployment, Google Business Profile changes, Search Console/Bing submission and live indexation checks have not been performed by this local change.

Expansion validation: compatible Node 22.22.0; shipping build passed for 128 routes, 129 structured-data pages and 12,501 local references. Aasha/search validation passed across 128 pages and six service pages, including unique indexable titles and sitemap coverage. Astro typecheck: zero errors/warnings (one existing unused-variable hint). JavaScript syntax: 91 files passed. Browser audit: 40 scenarios across ten routes, mobile/desktop and light/dark, with zero accessibility violations, overflow or spacing issues. Audit evidence: output/accessibility-audit/aasha-seo/summary.json. Windows locks were resolved by preserving the affected generated files in output/ and rebuilding; no source content was discarded.
