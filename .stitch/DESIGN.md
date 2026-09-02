---
name: Mind Grace Clinic
colors:
  foundation: "#fffaf9"
  surface: "#ffffff"
  accent: "#d81b60"
  accent_deep: "#7a1038"
  soft_accent: "#fff1f4"
  ink: "#28171d"
  muted: "#4f3b44"
  line: "#d7a3b2"
  footer: "#351b25"
---

# Design System: Mind Grace Neuropsychiatric Clinic

## 1. Visual Theme & Atmosphere

The site uses a warm, clinical editorial atmosphere: soft cream backgrounds, restrained rose accents, generous whitespace, and dark plum text create a calm environment without hiding practical information. The visual direction is human and reassuring, but the updated system gives safety notices, contact actions, and booking steps stronger hierarchy.

The interface should feel quiet, legible, and grounded. Avoid decorative gradients, excessive motion, vague metaphors, and competing calls to action. Use real clinic imagery where available, with clear captions and descriptive alternative text.

## 2. Color Palette & Roles

### Primary Foundation

- Warm clinic cream `#fffaf9`: page background.
- Clean white `#ffffff`: surfaces, cards, and forms.
- Deep plum `#351b25`: footer and high-contrast dark sections.

### Accent & Interactive

- Rose lava `#d81b60`: highlights and active emphasis.
- Deep rose plum `#7a1038`: primary links, buttons, and focus-adjacent actions.
- Soft blush `#fff1f4`: notices, selected navigation, and low-intensity panels.

### Typography & Text Hierarchy

- Ink plum `#28171d`: headings and primary text.
- Muted berry-gray `#4f3b44`: supporting copy.
- Rose line `#d7a3b2`: borders and dividers.

### Functional States

- Emergency states use high-contrast rose-red text and backgrounds, always paired with direct wording and a phone link.
- Focus states use a visible 3px rose outline with offset.
- Errors use plain inline text, never alerts or color alone.

## 3. Typography Rules

### Hierarchy & Weights

Sora provides a geometric, confident wordmark and display hierarchy; Inter provides readable body copy, labels, and controls. Use sentence case for headings, tight line-height for display text, and relaxed line-height for paragraphs. Use 500 and 600 weights for intermediate hierarchy instead of relying only on regular and bold.

### Spacing Principles

Use a generous, responsive rhythm based on roughly 0.5rem increments. Constrain reading content to approximately 65 characters per line. Keep interactive controls at least 44px tall and allow text to wrap on narrow screens.

## 4. Component Stylings

### Buttons

Primary buttons use deep rose plum with white text, rounded corners, 2px borders, and clear hover/focus states. Secondary actions should be outlined or text links so each section has one dominant action.

### Cards & Domain-Specific Containers

Cards use white surfaces, soft plum-tinted shadows, modest rounded corners, and generous internal padding. They should communicate hierarchy, not create a repetitive three-card grid by default. Safety and booking notices use blush backgrounds with explicit borders.

### Navigation

The desktop navigation is a horizontal link row with a visible current-page state. On mobile it becomes a keyboard-accessible drawer with grouped care, resource, and contact pathways. The header remains sticky and keeps booking available.

### Inputs & Forms

Inputs use large touch targets, explicit labels, visible focus rings, and inline validation. The booking experience places consent and data-boundary language before the third-party form is opened.

### Domain-Specific Components

Emergency notices are static, concise, and actionable. Self-help tools and articles provide a clear route back to professional care without implying diagnosis or treatment outcomes.

## 5. Layout Principles

### Grid & Structure

Use a centered content width of approximately 1220px with responsive gutters. Prefer CSS Grid for page-level layouts and allow cards to become one column below tablet widths.

### Whitespace Strategy

Major sections use generous vertical spacing; related content is grouped into compact stacks. Avoid full-viewport fixed sections that can hide content on mobile.

### Alignment & Visual Balance

Prefer left-aligned readable copy with asymmetry introduced through image placement, offset panels, or varied section density. Keep primary actions near the content they affect.

### Responsive Behavior & Touch

The layout collapses around 900px for navigation and around 640px for compact spacing. Controls remain thumb-friendly, text remains zoomable, and reduced-motion preferences disable transitions and scroll effects.

## 6. Design System Notes for Stitch Generation

### Language to Use

Warm clinical editorial, calm but direct, accessible, evidence-aware, practical, locally grounded, and never promotional or outcome-guaranteeing.

### Color References

Use warm cream and white foundations, deep plum for text and primary actions, restrained rose for emphasis, and blush for supportive surfaces. Preserve strong contrast for emergency and focus states.

### Component Prompts

- Create a calm clinic homepage with a left-aligned factual hero, one primary booking action, one secondary services link, a visible routine-contact line, and an unobtrusive emergency notice.
- Create an accessible appointment page with a short explanation, a consent gate before the embedded form, a routine-contact fallback, and a concrete first-visit checklist.
- Create a resource article layout with readable measure, clear headings, a compact related-reading path, and a direct route to professional care.

### Incremental Iteration

Preserve the existing shell and routes. Improve hierarchy, safety wording, accessibility, and content clarity before adding new integrations or decorative effects. Never invent clinician credentials, ratings, prices, security claims, or patient outcomes.
