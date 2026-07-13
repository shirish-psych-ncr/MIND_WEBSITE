# Multi-Turn Markdown Update Plan

## Executive Summary

This document outlines a systematic, token-efficient approach to audit and update all markdown documentation files in the Mind Grace Neuropsychiatric Clinic repository.

**Current State (Verified):**
- 25 core HTML pages (~17,030 lines total)
- 6 therapeutic tool pages
- 9 blog article pages (5 adult + 4 child)
- 5 core CSS files (~3,950 lines: base.css=1,505, layout.css=1,057, components.css=364, animations.css=6,134, utilities.css=11,747)
- 7 tool-specific CSS files (~13KB total)
- 20 JavaScript modules (~8,500 lines: main.js=658, gallery.js=365, tools-leaf.js=266, etc.)
- 22 vendor libraries in `/assets/vendor/` and `/assets/js/lib/`
- 38 images (~21MB total)
- 14 AGENT_BIBLE documentation files (~6,500 lines)
- 3 component README files

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
