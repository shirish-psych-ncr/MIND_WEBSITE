# Multi-Turn Markdown Update Plan — Phase 1 Consolidation

## Executive Summary

Systematic audit and update of all markdown documentation files in the Mind Grace Neuropsychiatric Clinic repository.

**Repository Statistics (Verified July 2026):**

| Category        | Count | Details                                    |
| --------------- | ----- | ------------------------------------------ |
| **HTML Pages**  | 51    | 25 root + 6 tools + 12 blog + 8 templates  |
| **CSS Files**   | 12    | 5 core + 7 tool-specific                   |
| **JS Files**    | 67    | 20 app modules + 20 lib + 27 vendor        |
| **Images**      | 31    | Logos, photos, brochures, diagrams         |
| **MD Docs**     | 24    | 14 AGENT_BIBLE + 10 asset docs             |
| **Components**  | 6     | HTML partials + CSS components             |
| **Config**      | 8     | manifest, robots, sitemap, package, etc.   |

**Total Files:** 222 (excluding node_modules)  
**Total Lines:** ~35,000+ across all files

---

## Critical Issues Identified (Phase 1 Complete)

### 1. SEO & Domain Inconsistencies

**robots.txt:**
- ❌ References wrong domain: `mindgrace.in` instead of `mindgracencr.in`
- ❌ Sitemap URL incorrect: `https://mindgrace.in/sitemap.xml`

**sitemap.xml:**
- ❌ Mixed URL formats: first entry absolute (`https://shirish-psych-ncr.github.io/MIND_WEBSITE/index.html`), rest relative (`about.html`)
- ❌ Missing pages: about.html, doctors.html, dr-anita-sharma.html, approach.html, consent.html, privacy.html, terms.html, disclaimer.html, thank-you.html, 404.html, all 6 tool pages
- ❌ Only 28 URLs present, should have 51+

### 2. Documentation Path Errors

**README.md:**
- ✅ Fixed: Links to `assets/css/README.md` and `assets/js/README.md`
- ✅ Fixed: Tool script locations corrected
- ⚠️ Still references old deployment URL format inconsistently

**ARCHITECTURE.md:**
- ❌ Claims `terms.html` and `disclaimer.html` are missing (they exist)
- ❌ References `index-old.html` and `index-revamp.html` (need verification)
- ❌ CSS line counts outdated

**AGENT_BIBLE/Instructions.md:**
- ✅ Version 14.3, synchronized
- ⚠️ Claims 182 files, actual count is 222
- ⚠️ Says 43 HTML pages, actual is 51

**AGENT_BIBLE/pages.md:**
- ✅ Lists 25 core pages correctly
- ✅ Lists 6 tool pages correctly
- ✅ Lists 12 blog pages correctly
- ⚠️ Status flags need verification against actual files

**AGENT_BIBLE/assets.md:**
- ❌ Claims 176 total files (actual: 222)
- ❌ Says 38 images (actual: 31)
- ❌ Says 20 JS files (actual: 67 including vendors)
- ⚠️ Vendor library count outdated (says 24, actual: 27 in /vendor/)

### 3. Duplicate Canonical Tags

**Tool Pages with 4 canonical tags each (should be 1):**
- guided-breathing.html
- butterfly-tapper.html
- eye-movement.html
- hypnos-fractal.html
- horizon-scan.html
- leaf-on-stream.html

### 4. File Count Discrepancies

| Document | Claimed | Actual | Gap |
| -------- | ------- | ------ | --- |
| Instructions.md | 182 files | 222 files | +40 |
| Instructions.md | 43 HTML | 51 HTML | +8 |
| Instructions.md | 39 images | 31 images | -8 |
| assets.md | 176 files | 222 files | +46 |
| assets.md | 38 images | 31 images | -7 |

---

## Phase 1 Updates Completed

### Turn 1: README.md
- ✅ Fixed CSS/JS README paths
- ✅ Updated tool script locations
- ✅ Verified page inventory links

### Turn 2: ARCHITECTURE.md
- ✅ Verified file structure accuracy
- ⚠️ Need to update technical debt section
- ⚠️ Need to fix "missing files" claims

### Turn 3: Repository Statistics
- ✅ Counted actual files: 222 total
- ✅ Verified HTML pages: 51 (25 root + 6 tools + 12 blog + 8 templates)
- ✅ Verified CSS files: 12 (5 core + 7 tools)
- ✅ Verified JS files: 67 (20 app + 20 lib + 27 vendor)
- ✅ Verified images: 31

### Turn 4: AGENT_BIBLE Audit
- ✅ Instructions.md: Version 14.3 confirmed
- ✅ pages.md: Page inventory accurate
- ⚠️ assets.md: File counts need update

### Turn 5: Consolidation (This Turn)
- ✅ Compiled all findings
- ✅ Identified critical SEO issues
- ✅ Documented path errors
- ✅ Listed duplicate canonical tag issues
- ✅ Created discrepancy table

---

## Next Steps (Phase 2 Planning)

**Priority P0 (Immediate):**
1. Fix robots.txt domain reference
2. Regenerate sitemap.xml with all 51+ pages, consistent absolute URLs
3. Remove duplicate canonical tags from 6 tool pages

**Priority P1 (Documentation Sync):**
1. Update AGENT_BIBLE/assets.md with correct file counts
2. Update AGENT_BIBLE/Instructions.md statistics
3. Update ARCHITECTURE.md technical debt section
4. Verify and update status flags in pages.md

**Priority P2 (Cleanup):**
1. Verify existence of index-old.html, index-revamp.html
2. Remove or consolidate duplicate homepage files
3. Standardize URL format across all documentation

---

## Token-Efficient Strategy for Remaining Phases

**Phase 2 (Turns 6-10): Technical Documentation**
- Turn 6: design.md — Verify design tokens match base.css
- Turn 7: components.md — Verify component inventory
- Turn 8: tools.md — Verify tool specifications
- Turn 9: schemas.md — Verify JSON-LD examples
- Turn 10: opengraph.md — Verify metadata patterns

**Phase 3 (Turns 11-15): Asset & Component Docs**
- Turn 11: assets.md — Update file counts, verify image inventory
- Turn 12: components/README.md — Verify component library
- Turn 13: css/README.md — Verify CSS architecture docs
- Turn 14: js/README.md — Verify JS module docs
- Turn 15: image_descriptions.md — Verify alt text coverage

**Phase 4 (Turns 16-20): Specialized Documentation**
- Turn 16: worker.md — Verify deployment checklist
- Turn 17: memory.md — Verify session state structure
- Turn 18: _multiphasic_plan.md — Update roadmap
- Turn 19: Bible_Generator.md — Verify generation logic
- Turn 20: AGENT_BIBLE/ARCHITECTURE.md — Sync with main ARCHITECTURE.md

**Phase 5 (Turns 21-25): Cross-Reference & Final Sync**
- Turn 21: Verify all internal cross-references
- Turn 22: Update version numbers across all docs
- Turn 23: Regenerate file inventories
- Turn 24: Final consistency check
- Turn 25: Create summary report

---

_End of Phase 1 Consolidation. Ready for Phase 2._

---

## Phase 1: Core Documentation Audit (Turns 1-5)

### Turn 1: README.md Analysis & Update
**File:** `/workspace/README.md` (449 lines)
**Issues Identified:**
- Links to `css/README.md` should be `assets/css/README.md`
- Links to `js/README.md` should be `assets/js/README.md`
- Some paths reference old directory structure
- Deployment URL mentions both GitHub Pages and custom domain inconsistently

**Action Plan:**
1. Verify all internal links match actual file paths
2. Update deployment URLs to consistent format
3. Verify page count (says 25, need to confirm)
4. Update technology stack if needed
5. Verify design system values match `base.css`

### Turn 2: ARCHITECTURE.md Deep Dive
**File:** `/workspace/ARCHITECTURE.md` (783 lines)
**Issues Identified:**
- References `index-revamp.html` and `index-old.html` (need to verify existence)
- Says `terms.html` and `disclaimer.html` are missing (but they exist per file listing)
- CSS line counts may be outdated
- Technical debt section needs verification

**Action Plan:**
1. Verify all page inventory status flags
2. Update CSS architecture section with actual line counts
3. Verify technical debt items are still relevant
4. Update dependency graph if needed
5. Check roadmap items against current state

### Turn 3: AGENT_BIBLE/Instructions.md
**File:** `/workspace/AGENT_BIBLE/Instructions.md` (107 lines)
**Issues Identified:**
- Version 14.3 claims 43 HTML pages (need to verify)
- Says 176 total files (need to recount)
- Priority table needs status updates

**Action Plan:**
1. Recount all files accurately
2. Update version number and date
3. Verify priority task statuses
4. Update tech stack if changed

### Turn 4: AGENT_BIBLE/pages.md
**File:** `/workspace/AGENT_BIBLE/pages.md` (249 lines)
**Action Plan:**
1. Verify all 43 pages exist
2. Check URL mappings are correct
3. Verify template references
4. Update any missing page notes

### Turn 5: AGENT_BIBLE/assets.md
**File:** `/workspace/AGENT_BIBLE/assets.md` (160 lines)
**Action Plan:**
1. Verify asset count (claims 176 files)
2. Check vendor library list is complete
3. Verify image inventory
4. Update file size estimates

---

## Phase 2: Technical Documentation (Turns 6-10)

### Turn 6: AGENT_BIBLE/design.md
**File:** `/workspace/AGENT_BIBLE/design.md` (146 lines)
**Action Plan:**
1. Verify design tokens match `base.css`
2. Check color values are current
3. Verify typography scale
4. Update spacing system if changed

### Turn 7: AGENT_BIBLE/components.md
**File:** `/workspace/AGENT_BIBLE/components.md` (976 lines)
**Action Plan:**
1. Verify all component patterns exist
2. Check Vanilla JS patterns are accurate
3. Update UI component inventory
4. Verify accessibility compliance claims

### Turn 8: AGENT_BIBLE/tools.md
**File:** `/workspace/AGENT_BIBLE/tools.md` (201 lines)
**Action Plan:**
1. Verify all 8 therapeutic tools documented
2. Check tool specifications match actual implementation
3. Update interaction focus descriptions
4. Verify file references

### Turn 9: AGENT_BIBLE/schemas.md
**File:** `/workspace/AGENT_BIBLE/schemas.md` (669 lines)
**Action Plan:**
1. Verify JSON-LD structured data examples
2. Check SEO metadata requirements
3. Update schema types if needed
4. Verify implementation status

### Turn 10: AGENT_BIBLE/opengraph.md
**File:** `/workspace/AGENT_BIBLE/opengraph.md` (638 lines)
**Action Plan:**
1. Verify OpenGraph metadata examples
2. Check social sharing requirements
3. Update image dimension specs
4. Verify implementation across pages

---

## Phase 3: Asset & Component Docs (Turns 11-15)

### Turn 11: assets/css/README.md
**File:** `/workspace/assets/css/README.md` (259 lines)
**Issues Identified:**
- Says utilities.css has helper classes (file exists, 11,747 bytes)
- Says animations.css has keyframes (file exists, 6,134 bytes)
- Load order documentation needs verification

**Action Plan:**
1. Verify load order matches actual HTML implementations
2. Check file responsibility descriptions
3. Update design token references
4. Verify responsive philosophy section

### Turn 12: assets/js/README.md
**File:** `/workspace/assets/js/README.md` (116 lines)
**Issues Identified:**
- References `/js/tools/` directory but files are in `/js/` as `tools-*.js`
- Loading pattern says use `defer` but some pages use `type="module"`

**Action Plan:**
1. Correct directory structure references
2. Update loading pattern examples
3. Verify IIFE patterns in actual files
4. Update performance section

### Turn 13: assets/components/README.md
**File:** `/workspace/assets/components/README.md` (315 lines)
**Action Plan:**
1. Verify component files exist (nav-footer.html, button.css, card.css)
2. Check design token values match `base.css`
3. Update accessibility compliance claims
4. Verify browser support section

### Turn 14: AGENT_BIBLE/worker.md
**File:** `/workspace/AGENT_BIBLE/worker.md` (184 lines)
**Action Plan:**
1. Verify worker spec is still relevant
2. Check manual ops checklist
3. Update deployment checklist
4. Verify cross-references

### Turn 15: AGENT_BIBLE/memory.md
**File:** `/workspace/AGENT_BIBLE/memory.md` (78 lines)
**Action Plan:**
1. Update session state format
2. Verify delta log structure
3. Check continuity checkpoints
4. Update version tracking

---

## Phase 4: Specialized Documentation (Turns 16-20)

### Turn 16: AGENT_BIBLE/Bible_Generator.md
**File:** `/workspace/AGENT_BIBLE/Bible_Generator.md` (1,755 lines)
**Action Plan:**
1. This is a large file - verify engineering OS is current
2. Check generation scripts still work
3. Update operating procedures
4. Verify all cross-references

### Turn 17: AGENTECTURE.md (AGENT_BIBLE subfolder)
**File:** `/workspace/AGENT_BIBLE/ARCHITECTURE.md` (215 lines)
**Action Plan:**
1. Verify technical architecture matches root ARCHITECTURE.md
2. Check file organization is current
3. Update dependency graphs
4. Verify cross-references

### Turn 18: AGENT_BIBLE/_multiphasic_plan.md
**File:** `/workspace/AGENT_BIBLE/_multiphasic_plan.md` (829 lines)
**Action Plan:**
1. Verify phased implementation roadmap
2. Update completed phases
3. Check pending tasks are still relevant
4. Update timeline if needed

### Turn 19: inspo/ documentation
**Files:** 
- `/workspace/inspo/Anti-inspo UI UXI Anti Pattern.md`
- `/workspace/inspo/check1.md`
- `/workspace/inspo/skillscheck.md`

**Action Plan:**
1. Verify anti-patterns are still relevant
2. Update checklists
3. Remove outdated references
4. Consolidate if needed

### Turn 20: Cross-Reference Verification
**All Files**
**Action Plan:**
1. Verify all internal markdown links work
2. Check external links are still valid
3. Update broken references
4. Ensure consistency across all docs

---

## Phase 5: Final Synthesis (Turns 21-25)

### Turn 21: Consistency Check - Design Tokens
**Action Plan:**
1. Compare color values across all docs
2. Verify typography scales match
3. Check spacing systems align
4. Update any discrepancies

### Turn 22: Consistency Check - File Paths
**Action Plan:**
1. Verify all path references are accurate
2. Update deprecated paths
3. Check directory structure descriptions
4. Ensure relative vs absolute paths are correct

### Turn 23: Consistency Check - Version Numbers
**Action Plan:**
1. Synchronize version numbers across docs
2. Update dates consistently
3. Verify status indicators
4. Check change logs

### Turn 24: Gap Analysis
**Action Plan:**
1. Identify missing documentation
2. Note areas needing expansion
3. Create TODO list for future updates
4. Prioritize gaps by importance

### Turn 25: Final Summary Document
**Action Plan:**
1. Create comprehensive update summary
2. List all changes made
3. Document remaining issues
4. Provide recommendations for ongoing maintenance

---

## Token Efficiency Strategy

### Per-Turn Approach:
1. **Read** only the specific file(s) for that turn
2. **Analyze** content against verified repository state
3. **Plan** minimal necessary changes
4. **Execute** updates with precise edits
5. **Verify** changes before proceeding

### Change Categories:
- **P0 (Critical):** Broken links, incorrect paths, wrong file counts
- **P1 (Important):** Outdated version numbers, stale status flags
- **P2 (Nice-to-have):** Minor wording improvements, additional examples

### Rollback Plan:
If any update causes issues:
1. Document the specific change
2. Revert using git or str_replace_editor undo
3. Analyze root cause
4. Proceed with corrected approach

---

## Success Criteria

✅ All markdown files accurately reflect repository state
✅ All internal links resolve correctly
✅ File counts and statistics are accurate
✅ Design tokens are consistent across all docs
✅ Version numbers and dates are synchronized
✅ Technical debt items are verified and updated
✅ Roadmap reflects current priorities
✅ No contradictory information between documents

---

## Estimated Turns: 20-25

This plan allows for thorough, methodical updates while maintaining token efficiency. Each turn focuses on a specific document or related group, ensuring complete coverage without overwhelming context limits.

**Ready to begin with Turn 1: README.md analysis and update.**
