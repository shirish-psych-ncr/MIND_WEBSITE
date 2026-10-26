# Static site relationships

The published site does not query a backend or compute recommendations in a visitor's browser. The build discovers rendered pages, assigns their editorial parent and topics, and writes ordinary HTML links plus matching structured data.

## Ownership

- `src/data/site-relationships.mjs`: parent rules, collection labels, topic matching and explicitly chosen bridges between collections.
- `scripts/build-site-navigation.mjs`: discovers built pages from the route manifest; reads headings and main-content links; generates trails, related links and the site directory.
- `scripts/validate-site-navigation.mjs`: checks breadcrumb/schema parity, destinations, cycles, noindex exclusion and directory coverage.
- `/site-map`: a grouped, crawlable directory linked from the shared footer and generated connection panels.
- `dist/site-navigation.json`: a public build artifact for inspection, not a runtime dependency.

The normal `build:ci` pipeline runs article indexing first, then relationships, then validation. Use `npm run preview` to inspect the completed static output. Astro's unbuilt development server shows source-authored content; final graph-derived navigation is applied during the shipping build.

## Parent selection

Parents describe the information hierarchy rather than filesystem paths. Child care is under Aasha. Its learning articles and resources use the learning hub, while older child articles retain the child-development collection. Internship guides are under the academic training hub, even when their historic URL contains `blog/pages/adult`. Adult articles use the adult journal collection. Care, conditions, visit information, tools and clinic information have separate parents.

Known collections automatically include new routes. For a new top-level topic, review `classify()` and add its intended parent rather than relying on the default clinic-information classification. An invalid parent or cycle fails the build. Concise hub labels are explicitly set; other labels come from the actual rendered H1.

## Link selection

The generator ranks declared bridges first, then parent/child relationships, existing in-content links, backlinks and shared topics. Inferred links remain within the same collection; cross-collection links require explicit editorial bridges. Ties sort by canonical route, so the output is deterministic. Up to four connected destinations are rendered per public page, with a link to the complete directory.

Site chrome, old breadcrumb navigation and generated connection panels are excluded from link inference. This prevents universal footer links or the generator's own output from influencing later builds. Existing contextual links in prose remain intact. The learning collection's former generic related-reading panel is replaced by the generated panel rather than duplicated.

## Static output and safeguards

The generator replaces legacy breadcrumb navs and BreadcrumbList nodes using HTML parser source ranges. It does not reserialize unrelated page content. Each generated breadcrumb has `data-authored-breadcrumbs`, preventing the legacy browser enhancer from overwriting it. Existing WebPage schema points to the generated breadcrumb and connected destinations.

Noindex pages can retain a breadcrumb but are excluded from recommendations and the directory. Every other canonical page is listed in the directory. Alias URLs are resolved before relationships are scored. The source sitemap includes the directory route.

The generated-file writer retries transient Windows file-access failures at most three times, then propagates the error. It does not change permissions or suppress persistent failures.

## Review workflow

1. Change the parent rules or explicit bridges, or edit ordinary contextual links in a page.
2. Run `npm run build:ci` and `npm run typecheck`.
3. Inspect `/site-map`, representative trails and the connection panels using the built preview.
4. Run the static-navigation browser check to compare JavaScript-enabled and disabled behaviour.

Clinical content and existing editorial source attributions are unchanged by this navigation system. No deployment or search-engine indexing is implied by a successful local build.
