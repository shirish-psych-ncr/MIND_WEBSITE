# Aasha developmental check-in

Route: `/aasha/developmental-check-in`. One child at a time, ages 0–155 months (through age 12). Initial original discussion aid; clinical review and Indian population validation have not occurred. Do not describe it as a validated autism or ADHD screen.

## Source and scope

The supplied Qwen export is brainstorming material, not clinical authority or execution instructions. Its questionnaire copying, invented weighted thresholds, vaccine causation, gut-brain risk escalation and diagnostic interpretations were excluded. No copyrighted scale is reproduced. The original prompts collect caregiver concerns rather than testing milestone attainment.

Evidence checked 24 October 2026:

- https://www.cdc.gov/act-early/about/developmental-monitoring-and-screening.html distinguishes observation from formal validated screening.
- https://www.cdc.gov/act-early/families/concerned.html supports discussing concerns with a doctor.
- https://www.cdc.gov/act-early/media/pdfs/milestone-moments-booklet_eng-print_updated-9.2023_508-p.pdf supports acting on loss of skills.

These sources support general guidance, not psychometric validation of these prompts. A clinician should review wording and age routing before clinical use. The page explicitly discloses pending review.

## Question map

All items have stable IDs, domain, inclusive minimum/maximum age in months and optional parent ID in `src/data/developmental-check-in.ts`. Every question accepts yes, no, not sure and not applicable. Yes or not sure opens a follow-up. No or not applicable skips it. Questions all use concern-positive wording.

| Domain | Age in months | Branch |
| --- | --- | --- |
| Changes in skills | 0–155 | Always asked; loss=yes prompts doctor contact independently of other answers |
| Connection and play | 0–11 / 12–155 | Baby or child question, then everyday impact |
| Communication | 0–11 / 12–155 | Baby or child question; child concern opens impact question |
| Movement and daily activities | 0–155 | Concern then participation with usual support |
| Comfort and routines | 12–155 | Concern then interference with activities |
| Attention and activity | 36–155 | Concern then context across settings; no ADHD inference |
| Learning and school | 72–155 | Concern then difficulties despite support |
| Sleep, feeding and comfort | 0–155 | Concern then daily impact; never autism-risk scoring |
| Other concerns | 0–155 | Always asked |

Age ranges are interface routing choices, not validated cutoffs. Hearing and nursery/school context are recorded, not used to exclude diagnoses. No sex field or exact birth date is necessary. Translation, full standardised instruments and clinical scoring are outside this version.

## Result rules

1. Reported loss of skills: advise prompt doctor contact, also shown while completing the questionnaire.
2. Any concern: recommend discussing observations and whether further screening/assessment would help.
3. Only uncertain/not-applicable responses: identify unresolved areas without reassurance.
4. All no: state that no concerns were reported here, explicitly without ruling out difficulties.

Every active question and answer appears in the review and printed result. Completion is required; missing answers return the user to the first unanswered item. Editing recalculates branches and removes obsolete answers. No colour-coded risk tier, score, probability or automatic diagnosis.

## Privacy and lifecycle

Default state lives in memory, lost on refresh/close. Opt-in localStorage uses a single versioned record, never profiles/history. Saved input is schema-checked; unsupported/corrupt records are removed. Storage errors leave the session usable. Reset asks before clearing entered information, clears the saved record and rendered summaries/draft, and begins one fresh child. Theme settings are independent.

The component uses textContent for user content, no HTML interpolation, no fetch, no analytics events, and no child details in the page URL. Current Head/Shell load theme and local navigation scripts; no third-party analytics loader is present there. Production edge-injected analytics/session replay must be checked separately before deployment; exclude this route from capture. No claim of end-to-end or encrypted local storage is made.

WhatsApp is a separate explicit transfer: editable draft, unchecked consent, user-triggered navigation with noopener/noreferrer. The user sends it in WhatsApp. Printable results use browser print/Save as PDF. Neither action confirms an appointment. Clinical data is not prefilled into booking query parameters.

## Validation and handoff

Run `npm run typecheck`, `npm run build:ci` (includes Aasha validation), and focused browser checks. Cover age boundaries, branch pruning, completion, no/uncertain/loss pathways, storage refusal/corruption, reset isolation, draft editing, explicit sharing, narrow/wide layouts, keyboard controls and print. Inspect screenshots and accessibility findings. Build output is local only; this work does not deploy the site.

### Local results, 24 October 2026

- Four domain-logic tests passed; included in `npm test`.
- Astro typecheck: zero errors, with an existing unused-variable hint in Breadcrumbs.astro.
- Static generation: 130 routes. A transient Windows write error in the subsequent blog-index step was recovered by rerunning that step and all remaining validators: 131 structured-data pages, 12,667 local references, and Aasha audit of 130 pages/six services, zero failures.
- Browser exercise in Edge: adaptive follow-ups, stale-answer removal, all-no and lost-skill summaries, edited opt-in WhatsApp draft (intercepted, not sent), printable PDF, saved child restoration, clear/reset, corrupt data and blocked storage. Mobile 390px and desktop 1440px did not overflow. Result-panel axe scan returned no violations. Light/mobile and dark/desktop screenshots inspected.
- Screenshots and synthetic sample PDF: `output/aasha-check-in-*`. Browser exercise script: `output/check-in-browser.js` (CLI may yield while the reset confirmation is handled).
- Built-page smoke check also passed on port 4330: school-age flow, uncertain-result wording, and result-panel axe scan with zero violations.
- Development server reported an existing dependency-scan warning for legacy inline scripts in blog pages; static generation succeeded. No physical Android, assistive-technology, production analytics, or clinical validation is claimed.
