# Autism and ADHD learning collection

## Scope and editorial policy

Turn the supplied 7,857-line exam summary and slide OCR into eight family articles, three printable resources, and one learning hub. Repeated slide text is consolidated by topic. The attachment is background material, not a clinical guideline or a source of verified quotations. Do not publish the raw slides, dosing tables, private webinar details, unverified prices, or implied endorsements by the named presenters.

Child care belongs to Aasha. Reuse its identity data and shared site layout. No named medical reviewer has approved this collection; do not invent one. The visible editorial disclosure must remain until actual review is documented.

## Evidence corrections

- Replace autism/ADHD stereotypes with individual assessment and possible co-occurrence.
- Do not repeat the old US 1-in-36 figure as an Indian prevalence estimate.
- Do not turn methylation phenotypes, histamine, COMT or MTHFR variants into treatment algorithms.
- Distinguish rare FOLR1-related cerebral folate transport deficiency from autism generally. US regulatory approval does not establish an Indian indication.
- Remove supplement doses, mitochondrial cocktails, ibuprofen for behaviour, LDN protocols and unsupported response percentages.
- Explain that diet and microbiome findings do not demonstrate an autism cure. Avoid parent blame about birth, feeding or antibiotic histories.
- Use WHO's December 2025 vaccine evidence review, not temporal associations in the notes.
- Regression needs clinical assessment; it does not diagnose mitochondrial disease. Do not label worsening symptoms as detox or oxalate dumping.
- Screening tools are linked to their owners, not copied or repurposed into an unvalidated diagnosis quiz.

## Implementation and maintenance

Canonical metadata, FAQs and worksheet prompts: `src/data/neurodevelopment.ts`. Full article and resource bodies: `src/data/neurodevelopment-longform.ts`. Shared renderer: `src/components/LearningPage.astro`. Explicit route wrappers preserve the site's static route manifest and alias generation. Hub: `/aasha/learning`. Original SVG illustrations are repository-authored educational graphics, not scans of the presentation. They contain no patient imagery or identifiable people.

Use real visible answers for FAQ schema, BreadcrumbList matching the visible navigation, BlogPosting only for articles and LearningResource for worksheets. Add all routes to the source sitemap; generated blog cards and JSON index are handled by the existing build. LLM context files supplement, but never replace, crawlable HTML and sitemaps. No guarantee of search rank, AI citation or rich results is implied.

## Validation

Run `npm run build:ci`, `npm run typecheck` and focused browser checks of the hub, article, worksheet, mobile layout, dark theme, and print rendering. Record results below when complete. Local verification is not deployment or search-engine indexing.

### Results, 26 October 2026

- Bundled Node 24.22.1 used; the default PATH also contains Node 22.14.0, below the repository engine requirement.
- Shipping build passed: 142 routes, 143 structured-data pages, 13,829 local references, zero failures. Generated journal discovery includes 67 articles overall.
- Astro type check: 159 files, zero errors, zero warnings, one pre-existing unused-variable hint in `Breadcrumbs.astro`.
- `python scripts/validate_learning.py`: twelve linked pages, eight articles in the generated blog, three worksheets, canonical and FAQ parity passed.
- Existing Playwright/axe audit: hub, folinic-acid article and appointment worksheet, 390px and 1440px, light and dark; twelve scenarios, zero rule violations, scan errors, critical contrast, spacing or overflow issues.
- Browser print button and worksheet visibility checked; screenshots and an example A4 PDF are under `output/playwright/`. Visual review identified the child-care card leaking into worksheet print output; a print-only rule now hides it.
- Original artwork: three SVG sources and three 1200 × 630 PNG exports in `assets/images/learning/`; approximately 49–53 KB per PNG. No external photo licensing or patient-image consent is involved.
- The repository already tracks generated `dist` files, so this run updates that existing build tree as well as source. No commit, deployment, live index submission or named clinician approval was performed.

## Collection inventory

Articles: autism/ADHD differences; screening; developmental regression; MTHFR/methylation; folinic acid; mitochondrial research; gut health/diets; evaluating treatment evidence.

Resources: appointment planner; daily sleep/food/comfort diary; home–school support planner. These are printable observations, not diagnostic instruments. Existing sleep content and the developmental check-in are linked rather than duplicated.

## Long-form revision following editorial feedback

The initial brief summaries were replaced, not appended to or duplicated. The eight article bodies now contain 1,035–1,159 words each before FAQs and other supporting material, approximately 8,813 words in total. The three resource guides contain 541–629 words each before worksheet prompts. Future edits should preserve explanatory depth, not optimize for a short word count.

Each article now develops the topic through an introduction, seven or eight substantive sections, a comparison table, concrete examples where useful, practical next steps and linked references. Scientific terms are explained before use. The folinic-acid discussion identifies the selected 48-participant, 12-week trial and its limitations. The genetics discussion distinguishes pathway biology, common variants and rare disease. The gut-health guide distinguishes symptom care, feeding support and restrictive-diet claims.

The renderer supports multiple paragraphs, accessible comparison tables, illustrative examples, takeaways, calculated reading times and source lists. Structured content includes word count, reading time and citations. Examples are explicitly fictional, not disguised testimonials. Eight topic-specific SVG/PNG guide maps replace the repeated generic article artwork; regenerate them with `node scripts/generate-learning-artwork.mjs`.

Authored breadcrumbs are marked `data-authored-breadcrumbs`; the legacy navigation enhancer must not rewrite their hierarchy or JSON-LD. Other pages retain its existing automatic behaviour. Small-screen tables have a scroll cue and a keyboard-focusable scroll region. Worksheet print output excludes article instructions and site chrome.

The expanded-content check now verifies that every article has at least 1,000 words in its counted editorial content, a table, references and its own artwork, alongside the existing discovery, canonical, sitemap and FAQ checks. This guards against a return to thin placeholder articles; word count alone is not the editorial quality standard.

Revision validation: shipping build passed with 142 routes and 13,891 local references; sixteen representative browser scenarios passed at 390px/1440px in light/dark themes, with zero accessibility-rule violations, overflow or spacing failures. A transient Windows file-open failure during the first build resolved on retry. The existing unused-variable type-check hint remains unrelated to this collection. Screenshots and print checks are in `output/playwright/`; no production deployment has been performed.

## Reading-path refinement

Added nineteen contextual links from specific discussions to relevant explainers or worksheets. The connection registry verifies source headings and destination entries at build time, so renamed sections cannot silently lose the connection. Generic related-reading cards remain available at the end.

The learning hub now includes article-specific thumbnails and reading times, using the same calculation as the article and its structured data. Resource cards link directly to the worksheet. Resource headers provide a worksheet jump and a print button; the lower print control remains for readers who finish the instructions first.

Shipping validation now covers 142 routes and 13,924 local references with zero failures. Type checking passed with the existing single unused-variable hint. The browser journey check follows the gut-health article's contextual link into the diary, checks the worksheet anchor, exercises all six print controls across three resources and generates three A4 PDFs. All eight lazy-loaded hub thumbnails are explicitly decoded during the visual check.

Full collection accessibility run: twelve routes × two widths × two themes. The first pass recorded no rule violations, spacing failures, overflow or critical contrast issues; one navigation received `ERR_NETWORK_CHANGED`. That mobile/light mitochondrial-article scenario passed its separate retry with zero errors or violations in `output/accessibility-audit/learning-complete-retry-2026-10-26`, completing coverage of all 48 scenarios. Keep the original report alongside the retry evidence rather than concealing the interrupted load.
