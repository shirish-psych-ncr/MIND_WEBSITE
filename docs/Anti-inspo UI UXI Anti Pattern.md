# Qwen Conversation: UI UX Anti Patterns

- Exported: 6/22/2026, 2:00:46 AM
- Text method: API first, visible DOM fallback (fast default)
- Text format: Markdown
- Media method: Links plus embeds
- Messages: 14
- Media items: 1
- URL: https://chat.qwen.ai/c/adb7ebb8-dc89-4006-9a6f-05602d89b8ce

---

## User 1

extract, analyse, and curate an indepth thought out extensive guide about what all 'not' to do in terms of ui/ux. to deliberately prompt/instruct the coding app to not use such and such and not do that and that etc. extensive guide. no lardy overviews or explanations:

[Pasted_Text_1781741747830.txt](https://cdn.qwenlm.ai/14fd58cc-e721-4158-9cbd-9db1a1ba02fd/b4248498-185f-48f5-ae16-0f22b9dd4c49_Pasted_Text_1781741747830.txt?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiMTRmZDU4Y2MtZTcyMS00MTU4LTljYmQtOWRiMWExYmEwMmZkIiwicmVzb3VyY2VfaWQiOiJiNDI0ODQ5OC0xODVmLTQ4ZjUtYWUxNi0wZjIyYjlkZDRjNDkiLCJyZXNvdXJjZV9jaGF0X2lkIjpudWxsfQ.IFIk_H6V_RtkTTywu2QisprgLSZxngxda36ZZFftC3I)

[Pasted_Text_1781741747830.txt](https://cdn.qwenlm.ai/14fd58cc-e721-4158-9cbd-9db1a1ba02fd/b4248498-185f-48f5-ae16-0f22b9dd4c49_Pasted_Text_1781741747830.txt?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiMTRmZDU4Y2MtZTcyMS00MTU4LTljYmQtOWRiMWExYmEwMmZkIiwicmVzb3VyY2VfaWQiOiJiNDI0ODQ5OC0xODVmLTQ4ZjUtYWUxNi0wZjIyYjlkZDRjNDkiLCJyZXNvdXJjZV9jaGF0X2lkIjpudWxsfQ.IFIk_H6V_RtkTTywu2QisprgLSZxngxda36ZZFftC3I)

---

## Assistant 2

### 1. VISUAL AESTHETICS & "AI SLOP" ERADICATION
*   **DO NOT** use purple-to-blue gradients, neon cyan fields, glassmorphism, or generic AI-tool glows.
*   **DO NOT** use the "default AI SaaS template" layout: Large motivational hero text, catchy image on the right, series of panels below, and a few counters.
*   **DO NOT** nest cards inside cards. 
*   **DO NOT** place rounded-square icon tiles above every heading.
*   **DO NOT** use gray text on colored backgrounds.
*   **DO NOT** use pure black (`#000000`) or pure white (`#FFFFFF`) for text or surfaces; always use tinted/tonal values.
*   **DO NOT** use gradients or color purely for decoration; color must carry semantic meaning or intent.
*   **DO NOT** use multiple accent colors; restrict to one primary accent used with extreme intention.
*   **DO NOT** use different hues for different surface elevations; keep the same hue and shift only lightness/darkness.
*   **DO NOT** generate "Dribbble UI" (overzealous padding, terrible contrast, and visually pretty but functionally unusable layouts).
*   **DO NOT** use AI-generated stock imagery of people holding outdated technology (e.g., 1990s flip phones) or images with obvious AI artifacts (glitched hands, floating bracelets).
*   **DO NOT** use massive, uncompressed hero images (e.g., 7MB+ files, 4000px+ widths). Compress and size appropriately.

### 2. LAYOUT, SPACING & ARCHITECTURE
*   **DO NOT** use inconsistent spacing. Pick a base unit (e.g., 4px or 8px) and use strict multiples. Random values signal a lack of system.
*   **DO NOT** use asymmetrical padding unless the content naturally and strictly requires it.
*   **DO NOT** create "kitchen sink" dashboards where everything floats in space without grounding.
*   **DO NOT** use multiple navigation bars (e.g., a top menu AND a secondary floating menu AND a sidebar) unless strictly necessary for complex enterprise routing.
*   **DO NOT** make homepages aggressively long or overwhelming. Drip-feed information; do not yell everything at once.
*   **DO NOT** use identical metric card layouts every time (e.g., icon-left-number-big-label-small). Vary the expression based on the data's context.
*   **DO NOT** leave data tables or components floating without navigation context or grounding elements.
*   **DO NOT** use harsh, thick decorative borders. Borders should disappear when not actively needed for structure.
*   **DO NOT** mix sharp and soft border radii randomly. Build a deliberate scale (e.g., small for inputs, medium for cards).

### 3. TYPOGRAPHY & COPYWRITING
*   **DO NOT** rely on font size alone to establish hierarchy. Combine size, weight, and letter-spacing.
*   **DO NOT** use overused default fonts (Arial, Roboto, Inter) without intentional styling, or use them for everything. 
*   **DO NOT** use tracked-out uppercase text for full sentences or long labels; reserve it for short system markers.
*   **DO NOT** write unnatural, robotic, or contradictory copy (e.g., "Up to 5+ turns", "Welcome to our platform").
*   **DO NOT** use "Clean and modern" as a design directive; it means nothing. Use specific emotional/physical descriptors (e.g., "dense like a trading floor," "calm like a reading app").
*   **DO NOT** allow text to sit directly on high-contrast leaf/texture backgrounds without a darkening veil or sufficient contrast padding.

### 4. DEPTH, ELEVATION & SHADOWS
*   **DO NOT** use dramatic surface jumps or dramatic drop shadows. Elevation changes should be whisper-quiet and subtle.
*   **DO NOT** mix depth strategies. Pick ONE approach and commit: Borders-only, Subtle shadows, Layered shadows, or Surface color shifts.
*   **DO NOT** use pure white cards on colored backgrounds.
*   **DO NOT** make sidebars a different background color than the main canvas unless strictly necessary; use subtle borders for separation instead of fragmenting the visual space.
*   **DO NOT** make inputs lighter than their surroundings; inputs are "inset" and should be slightly darker to signal "type here."
*   **DO NOT** place dropdowns on the same elevation level as their parent card; they must sit one level above.

### 5. COMPONENTS, STATES & INTERACTIVITY
*   **DO NOT** use native `<select>` or `<input type="date">` elements. Build custom styled components (triggers, popovers, calendars).
*   **DO NOT** use bounce, spring, or elastic easing in professional interfaces. Use fast micro-interactions with deceleration easing.
*   **DO NOT** animate layout properties (widths, heights) on hover. Hover states must be instantaneous or use transform/opacity.
*   **DO NOT** leave interactive elements without defined states. Every element MUST have: default, hover, active, focus, and disabled states.
*   **DO NOT** forget data states. Every data component MUST have: loading, empty, and error states.
*   **DO NOT** use icons purely for decoration. If removing an icon loses no meaning, remove the icon.
*   **DO NOT** mix filled and outline iconography in the same view.
*   **DO NOT** create broken mobile interactions (e.g., floating menus without scroll-spy, dropdowns that don't render on mobile viewports).

### 6. ACCESSIBILITY & PERFORMANCE
*   **DO NOT** ignore WCAG AA contrast ratios. Verify them mathematically, do not eyeball them.
*   **DO NOT** omit visible focus rings for keyboard navigation.
*   **DO NOT** ignore `prefers-reduced-motion`. All animations must respect this media query.
*   **DO NOT** use semantic HTML incorrectly. Do not use ARIA as a workaround for bad HTML structure.
*   **DO NOT** ship unoptimized assets. Compress images, minify CSS/JS, and avoid massive bundle sizes.

***

### SYSTEM PROMPT INJECTION (Copy/Paste this directly into your AI Agent's custom instructions / `.cursorrules` / `CLAUDE.md`):

```text
[STRICT UI/UX NEGATIVE CONSTRAINTS]
You are strictly forbidden from generating UI/UX that violates the following rules. If you catch yourself defaulting to these patterns, stop and refactor immediately.

1. NO AI SLOP: Never use purple/blue gradients, glassmorphism, neon glows, nested cards, rounded-square icon tiles above headings, or gray text on colored backgrounds. Never use pure black (#000000) or pure white (#FFFFFF). 
2. NO GENERIC LAYOUTS: Never use the "hero text + right image + 3 feature cards" template. Never make sidebars a contrasting color from the main canvas (use subtle borders). Never use multiple conflicting navigation bars.
3. NO INCONSISTENT SPACING: Never use random pixel values. Use a strict 4px or 8px base unit grid. Never use asymmetrical padding unless strictly demanded by content.
4. NO MIXED DEPTH: Never mix shadows and borders. Pick ONE depth strategy (borders, subtle shadows, or surface shifts) and apply it universally. Never use dramatic drop shadows. Never make inputs lighter than their surrounding container.
5. NO DEFAULT NATIVE ELEMENTS: Never use native <select> or <input type="date">. Always build custom, styled interactive components.
6. NO MISSING STATES: Never render an interactive element without default, hover, active, focus, and disabled states. Never render a data component without loading, empty, and error states.
7. NO BAD MOTION: Never use bounce, spring, or elastic easing. Never animate layout properties (width/height) on hover. 
8. NO TYPOGRAPHY LAZINESS: Never rely on font-size alone for hierarchy. Never use overused defaults (Inter/Roboto) without intentional weight/tracking adjustments. Never use tracked uppercase for long sentences.
9. NO DECORATIVE CLUTTER: Never use icons if removing them loses no semantic meaning. Never use gradients purely for decoration. Never use multiple accent colors.
10. NO PERFORMANCE/ACCESSIBILITY FAILURES: Never ship uncompressed hero images. Never omit visible focus rings. Never ignore prefers-reduced-motion. Never fail WCAG AA contrast checks.

Before outputting any UI code, run a mental "Swap Test": If you swapped your layout/typography for the most common AI defaults, would the design feel meaningfully different? If no, you have defaulted. Refactor for specific intent and domain context.
```

---

## User 3

good, we got the surface level extraction. barring these points above, this time do a deeper scan and curation

---

## Assistant 4

### DEEP-SCAN UI/UX ANTI-PATTERN & CONSTRAINT ENGINE
**Instruction:** Inject the following systemic constraints into your AI agent's core instructions (e.g., `CLAUDE.md`, `.cursorrules`, or System Prompt). This goes beyond surface-level aesthetics into structural, psychological, and architectural prohibitions.

***

#### 1. SPATIAL ARCHITECTURE & DEPTH (The "Flat Ground" Rules)
*   **NO MIXED DEPTH STRATEGIES:** You must pick ONE elevation strategy per project and commit. Do not mix drop shadows, 1px borders, and surface-color shifts in the same view. 
*   **NO DEFAULT CARD SHADOWS:** Cards are defined by whitespace and subtle background tonal shifts (e.g., `grey-50` on a `grey-0` canvas), NOT drop shadows. If a floating layer (dropdown/modal) requires a shadow, it must be whisper-quiet (e.g., `0 4px 16px rgba(0,0,0,0.08)`).
*   **NO CONTRASTING SIDEBARS:** Sidebars must NEVER be a different background color than the main canvas. Use a subtle, low-opacity hairline border (e.g., `rgba(0,0,0,0.05)`) to separate them. Different colors fragment the visual space.
*   **NO NESTED CARDS:** If a card is placed inside another card, the layout hierarchy is broken. Use whitespace, dividers, or subtle background tinting to group sub-elements.
*   **NO "KITCHEN SINK" FLOATING:** Data tables, charts, and components must never float in space without structural grounding. They require navigation context, page headers, or container boundaries.
*   **NO RANDOM PIXEL VALUES:** Spacing must strictly adhere to a mathematical base unit (4px or 8px). Arbitrary values like `13px` or `27px` are forbidden.

#### 2. TYPOGRAPHY & INFORMATION HIERARCHY
*   **NO SIZE-ONLY HIERARCHY:** Never rely on font-size alone to distinguish a heading from body text. You must combine size, weight, and letter-spacing (e.g., Heading: `600 weight` + `tight tracking`; Body: `400 weight` + `normal tracking`).
*   **NO PURE BLACK OR PURE WHITE:** Never use `#000000` or `#FFFFFF` for text or large surfaces. Always use tinted/tonal values (e.g., `#171717` for dark text, `#FAFAFA` for light surfaces) to reduce eye strain and add warmth.
*   **NO GRAY TEXT ON COLORED BACKGROUNDS:** If a background has a hue, the text must be a tinted dark/light value of that same hue family, or pure white/black with adjusted opacity, never a flat, dead gray.
*   **NO TRACKED-OUT UPPERCASE FOR SENTENCES:** Uppercase with wide letter-spacing is strictly reserved for micro-labels, badges, and overlines. Never use it for body text, headings, or buttons.
*   **NO UNBOUNDED LINE LENGTHS:** Body text must be constrained to a maximum of `65ch - 75ch` (characters) per line for optimal readability.
*   **NO TINY BODY TEXT:** Base body text must never be smaller than `14px` (16px preferred). Metadata/captions may be `12px` but never smaller.

#### 3. COLOR, CONTRAST & SEMANTICS
*   **NO DECORATIVE GRADIENTS:** Color must carry semantic meaning, indicate state, or draw attention to action. Gradients used purely for "vibes" or background decoration are forbidden.
*   **NO MULTIPLE ACCENT COLORS:** Restrict the UI to ONE primary accent color. If you need to indicate different categories, use variations in weight, iconography, or subtle background tints, not a rainbow of accents.
*   **NO "AI DEFAULT" PALETTES:** Strictly forbid the statistical mean of AI training data: Purple-to-blue gradients, neon cyan on dark backgrounds, magenta accents, and "glassmorphism" blurs.
*   **NO UNMOTIVATED COLOR:** If an element is colored, it must mean something (e.g., Red = destructive/error, Green = success, Accent = primary action). Do not colorize elements just to make them "pop".

#### 4. COMPONENTS, INPUTS & STATES
*   **NO NATIVE FORM CONTROLS:** Never use native `<select>`, `<input type="date">`, or `<input type="range">`. Always build custom, styled triggers, popovers, and calendars that match the design system.
*   **NO LIGHTER INPUTS ON DARK BACKGROUNDS:** Inputs are "inset" containers that receive content. They must be slightly *darker* than their surrounding surface to visually recede and signal "type here".
*   **NO MISSING INTERACTION STATES:** Every interactive element MUST have defined CSS for: `default`, `hover`, `active`, `focus` (visible ring required), and `disabled`.
*   **NO MISSING DATA STATES:** Every data-driven component MUST have designed states for: `loading` (skeletons, not spinners), `empty` (helpful context, not just "No data"), and `error`.
*   **NO TINY TOUCH TARGETS:** Interactive elements must have a minimum hit area of `44x44px` on mobile and `32x32px` on desktop, regardless of the visual icon size.

#### 5. MOTION, PHYSICS & PERFORMANCE
*   **NO BOUNCE, SPRING, OR ELASTIC EASING:** Professional interfaces do not bounce. Use fast micro-interactions with `ease-out` (deceleration) for entrances, and `ease-in` for exits. 
*   **NO LAYOUT ANIMATIONS ON HOVER:** Never animate `width`, `height`, `top`, `left`, or `margin` on hover (it causes layout thrashing and looks janky). Only animate `transform` (translate, scale) and `opacity`.
*   **NO SLOW DATA FADE-INS:** Core UI data should not slowly fade in over 500ms+. Motion must be functional and settle in under 200ms. Users should not feel like they are waiting for the interface to render.
*   **NO SCROLL-JACKING OR PARALLAX ABUSE:** Do not hijack native scrolling behavior or use heavy parallax effects that disrupt the user's spatial orientation.

#### 6. UX PSYCHOLOGY & COGNITIVE LOAD
*   **NO HICK'S LAW VIOLATIONS:** Do not present 15 options when 3 will do. Collapse complex settings into expandable sections or multi-step wizards. 
*   **NO FITT'S LAW VIOLATIONS:** Do not place primary actions far from the user's focal point or make them visually tiny. 
*   **NO "DRIBBBLE UI" (Form Over Function):** Do not generate layouts with overzealous padding, massive empty whitespace that breaks functional scanning, or visually pretty elements that lack clear affordances. If a user cannot tell what is clickable within 3 seconds, the UI has failed.
*   **NO ROBOTIC OR HEDGING COPY:** Never use phrases like "Welcome to our platform", "Up to 5+ turns", "Seamless integration", or "Unlock the power of". Write like a human: specific, direct, and actionable.
*   **NO CORPORATE MEMPHIS ILLUSTRATIONS:** Do not use generic, flat, disproportionate vector illustrations of people with tiny heads and giant limbs (the "Bougie Design Aesthetic"). Use abstract geometry, data visualizations, or authentic photography.

#### 7. THE "AI SLOP" LAYOUT TELLS (Strictly Forbidden Templates)
*   **NO "Hero + Right Image + 3 Cards" Template:** Never default to a massive headline on the left, a floating 3D mockup on the right, and three identical feature cards below. 
*   **NO ROUNDED-SQUARE ICON TILES:** Do not place a pastel-colored, rounded-square icon tile above every single heading. 
*   **NO SIDE-TAB ACCENT BORDERS:** Do not use thick, colored vertical borders on the left side of tabs or navigation items to indicate the "active" state. Use weight, color shifts, or subtle underlines.
*   **NO IDENTICAL METRIC CARDS:** Do not default to the exact same layout for every data point (Icon left -> Big Number -> Small Label). Vary the expression based on the data's context (e.g., use a sparkline for trends, a gauge for capacity, inline text for static counts).

***

### 🧠 SYSTEM PROMPT INJECTION (Copy/Paste directly into Agent Rules)

```text
[STRICT UI/UX NEGATIVE CONSTRAINTS & ANTI-PATTERNS]
You are strictly forbidden from generating UI/UX that violates the following systemic rules. Before outputting any UI code, run a mental "Swap Test": If you swapped your layout/typography for the most common AI defaults, would the design feel meaningfully different? If no, you have defaulted. Refactor immediately.

1. DEPTH & SPATIAL: Never mix depth strategies. Pick ONE (borders, subtle shadows, or surface shifts). Never use default drop shadows for cards; use tonal surface shifts (e.g., grey-50 on grey-0) and whitespace. Never make sidebars a contrasting color from the main canvas; use subtle hairline borders. Never nest cards inside cards.
2. TYPOGRAPHY: Never use pure black (#000000) or pure white (#FFFFFF); use tinted tonal values. Never rely on font-size alone for hierarchy; combine size, weight, and tracking. Never use tracked-out uppercase for long sentences. Never exceed 75ch line length.
3. COLOR & SEMANTICS: Never use decorative gradients. Never use multiple accent colors. Never use the "AI Default" palettes (purple/blue gradients, neon cyan, glassmorphism). Color must carry semantic meaning. Never use gray text on colored backgrounds.
4. COMPONENTS & STATES: Never use native <select> or <input type="date">; build custom styled components. Never make inputs lighter than their surroundings; inputs are "inset" and must be slightly darker. Never omit interaction states (hover, active, focus, disabled) or data states (loading, empty, error). Minimum touch target is 44x44px.
5. MOTION: Never use bounce, spring, or elastic easing. Never animate layout properties (width/height) on hover; use transform/opacity. Never use slow fade-ins for core data.
6. UX & COPY: Never violate Hick's Law (collapse complex settings). Never use "Dribbble UI" (overzealous padding that breaks functional scanning). Never use robotic copy ("Welcome to our platform", "Seamless"). Never use "Corporate Memphis" vector illustrations.
7. ANTI-SLOP TEMPLATES: Never use the "Hero text + right image + 3 feature cards" layout. Never place rounded-square icon tiles above every heading. Never use side-tab accent borders. Never use identical metric card layouts for every data point.
```

---

## User 5

more, barring those curated already in chat. think it through, map and pinpoint connections

---

## Assistant 6

### THE EPISTEMOLOGICAL FLAWS: MAPPING THE ROOT OF "AI SLOP"
To truly eradicate the "vibe-coded" look, you must understand *why* the AI generates it. AI does not design; it statistically averages. It regurgitates the median of Dribbble, Behance, and 2021 SaaS templates. By mapping the connections between AI's training biases and human cognitive failures, we can establish the ultimate negative constraints.

***

### 1. THE COGNITIVE & INFORMATION ARCHITECTURE TRAPS
*The Connection: AI equates "whitespace" with "premium." It optimizes for the visual aesthetic of a marketing site, completely ignoring the cognitive load required for actual product usage.*

*   **DO NOT default to "Clean and Modern" for data-heavy tools.** 
    *   *The Trap:* AI interprets "clean" as "empty." It will give you massive padding and low information density. 
    *   *The Reality:* A trading floor, an SRE dashboard, or a video editor requires *high density*. Whitespace is a luxury for consumer apps; density is a feature for productivity tools.
    *   *The Fix:* Force the AI to define density based on the user persona. (e.g., "Dense like a terminal," vs. "Calm like a reading app").
*   **DO NOT treat Navigation as "Scaffolding."**
    *   *The Trap:* AI builds a generic left-sidebar because "SaaS apps have sidebars." It treats navigation as a structural requirement, not a psychological map.
    *   *The Reality:* Navigation *is* the product. It teaches the user how to think about the space. A page floating in space without contextual grounding feels like a component demo, not software.
    *   *The Fix:* Navigation must emerge from the user's core verb (e.g., "Grade submissions," "Approve payments"), not a generic "Dashboard/Settings/Profile" template.
*   **DO NOT design for the "Happy Path" (The Linguistic Edge-Case Failure).**
    *   *The Trap:* AI designs cards and headers for perfect, 3-word English headlines. 
    *   *The Reality:* Real UI breaks instantly. It fails on 60-character names, German compound words, 500,000+ numerical values, and empty states. 
    *   *The Fix:* Mandate "Stress-Test Prompting." Force the AI to render the UI using worst-case data (e.g., "Use a 50-character string for the title, a 9-digit number for the metric, and a 3-line error message").
*   **DO NOT use "Stream of Consciousness" Information Architecture.**
    *   *The Trap:* AI dumps every feature, metric, and CTA onto a single viewport because it lacks the concept of "pacing."
    *   *The Reality:* It violates Hick’s Law and overwhelms the user. 
    *   *The Fix:* Enforce "Drip-Feed Architecture." The UI must progressively disclose complexity. The primary action must be isolated from secondary noise.

***

### 2. THE SEMANTIC & CONTEXTUAL VOIDS
*The Connection: AI lacks "Theory of Mind." It doesn't know who is looking at the screen, what they did 5 minutes ago, or what they will do 5 minutes from now. It generates interfaces in a vacuum.*

*   **DO NOT use Contradictory or "AI-Hedging" Copywriting.**
    *   *The Trap:* AI generates phrases like "Up to 5+ turns," "Seamless integration," or "Welcome to our platform."
    *   *The Reality:* It sounds robotic, legally defensive, and meaningless. 
    *   *The Fix:* Ban all marketing hedging. Copy must be specific, actionable, and human. (e.g., Change "Optimize your workflow" to "Cut rendering time by 40%").
*   **DO NOT ignore the "Temporal Context" of the User.**
    *   *The Trap:* AI designs for a user sitting in a coffee shop on a Sunday. 
    *   *The Reality:* What if the user is an SRE waking up at 3 AM to a server crash? What if they are a founder rushing between investor meetings? 
    *   *The Fix:* Define the *environmental context* in your design system. High-stress contexts require high-contrast, large touch targets, and zero decorative animations.
*   **DO NOT use Positional Tokens for Semantic Meaning.**
    *   *The Trap:* AI uses `bg-gray-100` for an input field and `bg-white` for a card.
    *   *The Reality:* When you switch to Dark Mode, or change the brand theme, the entire UI shatters because the colors are tied to *lightness*, not *intent*.
    *   *The Fix:* Ban raw color/positional tokens in component logic. Use semantic intent tokens: `--surface-inset`, `--surface-elevated`, `--text-primary`, `--border-separator`.

***

### 3. THE STRUCTURAL & SYSTEMIC CODE ROT
*The Connection: AI writes CSS to "make it work right now," not to build a scalable design system. This results in "Frankenstein UIs" that look fine on page 1, but fracture by page 10.*

*   **DO NOT mix Depth Strategies within the same viewport.**
    *   *The Trap:* AI will use a drop-shadow on a card, a border on a button, and a background-color shift on a sidebar.
    *   *The Reality:* It creates visual noise. The user's eye doesn't know which tool is being used to establish hierarchy.
    *   *The Fix:* Pick ONE elevation language per project and enforce it globally. (e.g., "We use *only* 1px hairline borders for separation. Zero drop shadows anywhere.")
*   **DO NOT animate for "Decoration" (The Micro-Interaction Abuse).**
    *   *The Trap:* AI thinks animation = polish. It adds 500ms fade-ins, springy modals, and skeleton loaders for instant local state changes.
    *   *The Reality:* It feels sluggish, uncanny, and disrespectful of the user's time. It screams "I am an AI trying to look fancy."
    *   *The Fix:* Motion must be *functional* (orienting the user, confirming an action). It must use deceleration easing and settle in under 200ms. If it takes longer than 200ms, it is unnecessary.
*   **DO NOT rely on the "Dribbble UI" Aesthetic (Form Over Function).**
    *   *The Trap:* AI mimics Dribbble shots: overzealous padding, massive typography, terrible practical contrast, and visually pretty but functionally unusable layouts.
    *   *The Reality:* It looks great in an Instagram post but gets you fired in production. 
    *   *The Fix:* Apply the "Squint Test." If you blur your eyes and cannot instantly perceive the hierarchy and primary action, the UI has failed.

***

### 4. THE "ANTI-SLOP" DIAGNOSTIC FRAMEWORK (MANDATORY CHECKS)
*Inject these specific diagnostic tests into your AI agent's reasoning process. Force the AI to evaluate its own output against these rules before generating code.*

*   **THE SWAP TEST:** 
    *   *Prompt:* "If you swapped your chosen typography, layout, and color palette for the most common AI defaults (Inter font, purple/blue gradient, 3-column card grid), would the design feel meaningfully different? If no, you have defaulted. Refactor for specific intent."
*   **THE SIGNATURE TEST:** 
    *   *Prompt:* "Can you point to three specific, structural elements in this UI that could *only* exist for this specific product? If the UI could belong to any generic SaaS, you have failed. Inject domain-specific metaphors and structures."
*   **THE TOKEN TEST:** 
    *   *Prompt:* "Read your CSS variables out loud. Do they sound like they belong to this product's specific world (e.g., `--ink`, `--parchment`, `--terminal-green`), or could they belong to any project (`--gray-700`, `--surface-2`)? Rename them to reflect the product's domain."
*   **THE BOUGIE DESIGN AESTHETICS (BDA) CHECK:**
    *   *Prompt:* "Are you using disproportionate vector illustrations (tiny heads, giant limbs), generic 'Corporate Memphis' characters, or abstract 3D shapes floating in space? Ban all of these. Use authentic data visualizations, strict geometric grids, or real photography."

***

### 🧠 SYSTEM PROMPT INJECTION: THE "ANTI-EPISTEMOLOGY" DIRECTIVE
*(Copy/Paste this directly into your AI Agent's core instructions to enforce deep structural discipline)*

```text
[STRICT UI/UX EPISTEMOLOGICAL CONSTRAINTS]
You are not just writing CSS; you are mapping human cognition. You are strictly forbidden from generating UI/UX that violates the following systemic rules. 

1. THE DENSITY DIRECTIVE: Do not default to "clean and modern" (empty/whitespace-heavy) for productivity, data, or enterprise tools. Density is a feature. Match the information density to the user's cognitive load (e.g., "Dense like a trading terminal" vs "Calm like a reading app").
2. THE CONTEXTUAL DIRECTIVE: Do not design in a vacuum. Define the user's temporal context (e.g., "SRE on call at 3 AM" vs "Casual user on Sunday"). High-stress contexts demand high-contrast, large targets, and ZERO decorative animations.
3. THE LINGUISTIC EDGE-CASE DIRECTIVE: Never design a component without stress-testing it for worst-case data. Force the UI to render 60-character strings, 9-digit numbers, German compound words, and empty states. If it breaks, the design is invalid.
4. THE SEMANTIC TOKEN DIRECTIVE: Never use positional or raw color tokens (e.g., `bg-gray-100`, `text-blue-500`) in component logic. Use semantic intent tokens (`--surface-inset`, `--text-primary`, `--border-separator`). 
5. THE MOTION DIRECTIVE: Motion is functional, not decorative. Never animate for "polish." All transitions must use deceleration easing, resolve in <200ms, and serve to orient the user or confirm an action. 
6. THE NAVIGATION DIRECTIVE: Navigation is not scaffolding; it is the product's mental model. Do not use a generic sidebar just because "SaaS apps have sidebars." The navigation structure must emerge from the user's core workflow verbs.
7. THE COPY DIRECTIVE: Ban all AI-hedging and marketing fluff ("Up to 5+", "Seamless", "Welcome to"). Copy must be specific, actionable, and human. 
8. THE DIAGNOSTIC CHECKS: Before outputting final code, you must mentally pass:
   - The Swap Test (Would it look different if you used AI defaults? If no, refactor).
   - The Squint Test (Is hierarchy perceivable when blurred? If no, refactor).
   - The Signature Test (Are there 3 elements unique to this specific domain? If no, refactor).

If you catch yourself defaulting to the "Statistical Mean" of SaaS design, STOP. The mean is forgettable. Design from intent, not from pattern.
```

---

## User 7

now, connect all extracted so far, and spot what collectively to look down upon, avoid, definitely not do, and is forbidden

---

## Assistant 8

### THE ULTIMATE ANTI-SLOP MANIFESTO: MASTER NEGATIVE CONSTRAINTS
**Instruction:** Inject the following absolute prohibitions into your AI agent’s core instructions (e.g., `CLAUDE.md`, `.cursorrules`, System Prompt). This is the definitive synthesis of every visual, spatial, linguistic, and architectural failure that defines "AI-generated UI." 

If the AI catches itself defaulting to *any* of these patterns, it must immediately stop, recognize the statistical mean it is falling into, and refactor for deliberate, domain-specific intent.

***

#### 1. THE FORBIDDEN AESTHETIC (The "AI Slop" Tells)
*These are the visual signatures of an AI guessing the "mean" of the internet. They are strictly prohibited.*
*   **NO Purple/Blue Gradients or Neon Glows:** Never use purple-to-blue gradients, neon cyan fields, magenta accents, or "glassmorphism" blurs. Color must carry semantic meaning, not serve as decorative "vibes."
*   **NO Pure Black or Pure White:** Never use `#000000` or `#FFFFFF` for text or large surfaces. Always use tinted/tonal values (e.g., `#171717` for dark text, `#FAFAFA` for light surfaces) to reduce eye strain and add warmth.
*   **NO Gray Text on Colored Backgrounds:** If a background has a hue, the text must be a tinted dark/light value of that same hue family, never a flat, dead gray.
*   **NO Multiple Accent Colors:** Restrict the UI to ONE primary accent color. If you need to indicate different categories, use variations in weight, iconography, or subtle background tints, not a rainbow of accents.
*   **NO Decorative Gradients:** Gradients used purely for background decoration or "pop" are forbidden. 
*   **NO Mixed Depth Strategies:** Never mix drop shadows, 1px borders, and surface-color shifts in the same view. Pick ONE elevation language (e.g., *only* hairline borders, or *only* subtle surface shifts) and commit globally.
*   **NO Dramatic Drop Shadows on Cards:** Cards are defined by whitespace and subtle background tonal shifts. Floating layers (dropdowns/modals) get whisper-quiet shadows; standard cards get zero shadows.

#### 2. THE BANNED LAYOUTS & SPATIAL RULES (The "Template" Tells)
*AI defaults to a "kitchen sink" approach with arbitrary spacing. These structural habits are forbidden.*
*   **NO "Hero + Right Image + 3 Feature Cards" Template:** Never default to a massive headline on the left, a floating 3D mockup on the right, and three identical feature cards below. 
*   **NO Rounded-Square Icon Tiles:** Never place a pastel-colored, rounded-square icon tile above every single heading.
*   **NO Nested Cards:** If a card is placed inside another card, the layout hierarchy is broken. Use whitespace, dividers, or subtle background tinting to group sub-elements.
*   **NO Contrasting Sidebars:** Sidebars must NEVER be a different background color than the main canvas. Use a subtle, low-opacity hairline border to separate them. Different colors fragment the visual space.
*   **NO "Dribbble UI" Padding:** Do not generate layouts with overzealous padding and massive empty whitespace that breaks functional scanning. Density is a feature for productivity tools; do not default to "clean and modern" (empty) for data-heavy apps.
*   **NO Random Pixel Values:** Spacing must strictly adhere to a mathematical base unit (4px or 8px). Arbitrary values like `13px` or `27px` are forbidden.
*   **NO "Kitchen Sink" Floating:** Data tables, charts, and components must never float in space without structural grounding, navigation context, or page headers.

#### 3. THE TYPOGRAPHIC & LINGUISTIC BANS (The "Robot" Tells)
*AI lacks a sense of voice and defaults to corporate hedging or flat hierarchy. These are forbidden.*
*   **NO Size-Only Hierarchy:** Never rely on font-size alone to distinguish a heading from body text. You must combine size, weight, and letter-spacing.
*   **NO Default System Fonts:** Never use Inter, Roboto, Arial, or system defaults for everything without intentional styling. 
*   **NO Tracked-Out Uppercase for Sentences:** Uppercase with wide letter-spacing is strictly reserved for micro-labels, badges, and overlines. Never use it for body text, headings, or buttons.
*   **NO Unbounded Line Lengths:** Body text must be constrained to a maximum of `65ch - 75ch` per line.
*   **NO Robotic or Hedging Copy:** Never use phrases like "Welcome to our platform", "Up to 5+ turns", "Seamless integration", "Unlock the power of", or "Elevate your workflow". Write like a human: specific, direct, and actionable.
*   **NO AI Prose Tics:** Ban the use of em-dashes (`—`), triadic auto-pilot lists, and hollow confidence words like *load-bearing, robust, delve, empower, tapestry, data-driven, pivotal, in today's, let's dive in, morever, furthermore*.

#### 4. THE COMPONENT & MOTION RED LINES (The "Unfinished" Tells)
*AI builds for the "Happy Path" and ignores physics. These interaction failures are forbidden.*
*   **NO Native Form Controls:** Never use native `<select>`, `<input type="date">`, or `<input type="range">`. Always build custom, styled triggers, popovers, and calendars.
*   **NO Lighter Inputs on Dark Backgrounds:** Inputs are "inset" containers. They must be slightly *darker* than their surrounding surface to visually recede and signal "type here".
*   **NO Bounce, Spring, or Elastic Easing:** Professional interfaces do not bounce. Use fast micro-interactions with `ease-out` (deceleration) for entrances, and `ease-in` for exits.
*   **NO Layout Animations on Hover:** Never animate `width`, `height`, `top`, `left`, or `margin` on hover. Hover states must be instantaneous or use `transform`/`opacity`.
*   **NO Missing Interaction States:** Every interactive element MUST have defined CSS for: `default`, `hover`, `active`, `focus` (visible ring required), and `disabled`.
*   **NO Missing Data States:** Every data-driven component MUST have designed states for: `loading` (skeletons, not spinners), `empty` (helpful context, not just "No data"), and `error`.
*   **NO Decorative Icons:** If removing an icon loses no semantic meaning, remove the icon. Never mix filled and outline iconography in the same view.
*   **NO Tiny Touch Targets:** Interactive elements must have a minimum hit area of `44x44px` on mobile and `32x32px` on desktop.

#### 5. THE UX & COGNITIVE SINS (The "Thoughtless" Tells)
*AI designs in a vacuum, ignoring the user's environment and cognitive load.*
*   **NO Hick’s Law Violations:** Do not present 15 options when 3 will do. Collapse complex settings into expandable sections or multi-step wizards.
*   **NO "Happy Path" Only Design:** Never design a component without stress-testing it for worst-case data. The UI must not break on 60-character names, German compound words, 500,000+ numerical values, or zero-data states.
*   **NO Navigation as Scaffolding:** Navigation is not a structural requirement; it is a psychological map. Do not use a generic left-sidebar just because "SaaS apps have sidebars." The navigation structure must emerge from the user's core workflow verbs.
*   **NO Corporate Memphis Illustrations:** Do not use generic, flat, disproportionate vector illustrations of people with tiny heads and giant limbs. Use abstract geometry, data visualizations, or authentic photography.
*   **NO AI Stock Imagery Artifacts:** Never use AI-generated images of people holding outdated technology (e.g., 1990s flip phones) or images with obvious AI glitches (floating bracelets, extra fingers).
*   **NO Slow Data Fade-Ins:** Core UI data should not slowly fade in over 500ms+. Motion must be functional and settle in under 200ms. Users should not feel like they are waiting for the interface to render.

***

### 🧠 SYSTEM PROMPT INJECTION: THE "ANTI-SLOP" PRE-FLIGHT GAUNTLET
*(Copy/Paste this directly into your AI Agent's core instructions. Force the AI to run these diagnostic checks before outputting final code.)*

```text
[STRICT UI/UX NEGATIVE CONSTRAINTS & PRE-FLIGHT GAUNTLET]
You are strictly forbidden from generating UI/UX that violates the rules of the "Anti-Slop Manifesto." You do not design by guessing the statistical mean of the internet; you design by enforcing deliberate constraints. 

Before outputting ANY UI code, you must mentally pass the following 4 Diagnostic Tests. If you fail any of them, you must refactor immediately:

1. THE SWAP TEST: If you swapped your chosen typography, layout, and color palette for the most common AI defaults (Inter font, purple/blue gradient, 3-column card grid, glassmorphism), would the design feel meaningfully different? If NO, you have defaulted. Refactor for specific domain intent.
2. THE SQUINT TEST: If you blur your eyes, can you still instantly perceive the hierarchy and primary action without relying on color? If NO, your spacing, weight, and contrast are failing. Refactor.
3. THE SIGNATURE TEST: Can you point to three specific, structural elements in this UI that could ONLY exist for this specific product's domain? If the UI could belong to any generic SaaS, you have failed. Inject domain-specific metaphors, density, and structures.
4. THE EDGE-CASE TEST: Have you accounted for the "unhappy path"? Does the layout survive a 60-character string, a 9-digit number, an empty state, and a mobile viewport without breaking or overflowing? If NO, the design is invalid. Refactor.

FORBIDDEN DEFAULTS (Auto-Fail if used):
- Purple/blue gradients, neon glows, glassmorphism.
- Pure black (#000000) or pure white (#FFFFFF).
- Nested cards, contrasting sidebars, random pixel spacing.
- Native <select> or <input type="date">.
- Bounce/spring easing, layout animations on hover.
- Robotic copy ("Seamless", "Elevate", "Welcome to our platform").
- Corporate Memphis vector illustrations.

Your goal is not to make it "look pretty." Your goal is to make it feel like a crafted, intentional tool built for a specific human in a specific context. Eradicate the "vibe-coded" aesthetic.
```

---

## User 9

now, from your side, think and draft what all to not do which rings bells in your datasets as per the datas i sent and we curated

---

## Assistant 10

Context and Identification
Domain: UI/UX Anti-Pattern Eradication
Target: AI Coding Agents and Vibe-Code Generators
Objective: Neutralize statistical mean defaults and enforce deliberate design intent

---

The Epistemological Prohibitions
These rules address the fundamental way the AI conceptualizes design, forcing it to abandon statistical averaging in favor of contextual intent.

**The Happy Path Fallacy.** The AI designs exclusively for ideal scenarios with perfect three-word headlines and empty states. You must mandate stress-testing for linguistic edge cases, including sixty-character names, nine-digit numerical values, and German compound words. If the layout breaks under worst-case data, the design is invalid.

**The Scaffolding Misconception.** The AI treats navigation as a structural requirement rather than a psychological map, defaulting to generic left sidebars. You must forbid treating navigation as an afterthought. The navigation structure must emerge directly from the user's core workflow verbs and environmental context, such as an SRE operating at three in the morning versus a casual user on a Sunday.

**The Vague Directive Trap.** The AI interprets "clean and modern" as an excuse to generate empty, low-density whitespace. You must ban subjective aesthetic adjectives. Force the AI to define density and emotional resonance using physical or domain-specific metaphors, such as dense like a trading terminal or calm like a reading application.

---

The Structural and Spatial Prohibitions
These rules eliminate the physical layout tells that immediately identify an interface as machine-generated.

**The Nested Container Sin.** The AI nests cards inside cards to simulate hierarchy, creating visual clutter. You must enforce a strict flat ground. Grouping must be achieved through whitespace, subtle background tonal shifts, or single-pixel hairline borders.

**The Metric Monotony.** The AI defaults to identical layouts for every data point, typically an icon on the left, a massive number in the center, and a small label below. You must forbid repetitive metric expressions. The layout must vary based on data context, utilizing sparklines for trends, gauges for capacity, or inline text for static counts.

**The Floating Element Deficit.** The AI leaves data tables and components floating in ungrounded space. You must require structural grounding. Every component must exist within a clear navigation context, page header, or container boundary.

---

The Chromatic and Typographic Prohibitions
These rules strip away the visual and linguistic signatures of the AI training corpus.

**The Pure Spectrum Ban.** The AI uses pure black and pure white, causing eye strain and a sterile aesthetic. You must mandate tinted and tonal values exclusively. The darkest text must be a warm gray, and the lightest surface must be an off-white.

**The Accent Dilution.** The AI applies multiple accent colors to differentiate categories, resulting in a chaotic rainbow. You must restrict the interface to a single primary accent color used with extreme intention. Secondary differentiation must rely on typographic weight, iconography, or subtle background tints.

**The Size-Only Hierarchy.** The AI relies solely on font size to distinguish headings from body text. You must enforce combined hierarchy. Distinction must be achieved through a deliberate combination of size, font weight, and letter spacing.

**The Robotic Lexicon.** The AI generates contradictory, hedging, or hollow marketing copy. You must ban phrases like "Unlock the power of", "Seamless integration", and "Up to five plus turns". Copy must be specific, actionable, and human.

---

The Interaction and State Prohibitions
These rules govern motion, physics, and the handling of dynamic data.

**The Elastic Physics Violation.** The AI applies bounce, spring, or elastic easing to simulate playfulness. You must forbid all elastic motion in professional interfaces. Entrances must use deceleration easing, and exits must use acceleration easing.

**The Layout Animation Trap.** The AI animates physical dimensions like width and height on hover, causing layout thrashing. You must restrict hover states to instantaneous changes or the transformation of opacity and translate properties only.

**The Missing State Blindspot.** The AI forgets to design for system realities. You must mandate that every interactive element possesses default, hover, active, focus, and disabled states. Furthermore, every data component must possess loading, empty, and error states.

---

Diagnostic Synthesis

> "If you swapped your chosen typography, layout, and color palette for the most common AI defaults, would the design feel meaningfully different? If no, you have defaulted. Refactor for specific domain intent."

**Final Assessment.** The AI operates by regurgitating the statistical median of its training data, resulting in interfaces that are functionally safe but visually forgettable. Eradicating the "vibe-coded" aesthetic requires shifting the agent's operational logic from pattern-matching to constraint-based problem solving. By enforcing strict negative boundaries across epistemology, structure, typography, and interaction, the output is forced to abandon the mean and adopt deliberate, domain-specific craft.

---

## User 11

think, research in depth in context of our chat, and expound, analyse and curate notes as to how to do this. take your time: The Vague Directive Trap. The AI interprets "clean and modern" as an excuse to generate empty, low-density whitespace. You must ban subjective aesthetic adjectives. Force the AI to define density and emotional resonance using physical or domain-specific objective psychological tactics. As ever human evoked feeling, emotion, or behaviour can be broken down to trackable and thus subsequently (after decades of research) reproducable zeros and ones.

---

## Assistant 12

### THE OBJECTIVE CONSTRAINT ENGINE: TRANSLATING SUBJECTIVE VIBES INTO MEASURABLE PARAMETERS

#### I. THE CORE PRINCIPLE: QUALIA → QUANTIFIABLES
AI lacks qualia. It cannot "feel" clean, modern, or premium. It only maps token probabilities to statistical medians. Every subjective aesthetic adjective must be decomposed into trackable, reproducible variables grounded in cognitive psychology, perceptual thresholds, and interaction physics. 

**Rule:** Never prompt for an emotion. Prompt for the physical parameters that trigger that emotion in human perception.

---

#### II. THE DIRECTIVE TRANSLATION MATRIX
| Vague Directive (BAN) | Psychological Basis | Objective Parameter (ENFORCE) | AI Instruction |
|-----------------------|---------------------|-------------------------------|----------------|
| `"Clean / Modern"` | Cognitive Load Theory | Info-to-viewport ratio, grid base unit, vertical rhythm | Define density tier (Low/Med/High). Set base grid (4/8/16px). Cap primary actions per viewport to 3. |
| `"Beautiful / Elegant"` | Gestalt Proximity & Symmetry | Spacing multiples, typographic scale ratio, negative space allocation | Use 1.25 or 1.333 modular scale. Enforce 8px rhythm. Maintain 65ch max line length. |
| `"Premium / High-End"` | Perceived Friction & Material Semiotics | Easing curves, duration thresholds, chroma limits, border radius scale | Motion: `150-200ms` + `cubic-bezier(0.2, 0, 0, 1)`. Max background chroma: 12. Strict radius tiers (sm:4, md:8, lg:12). |
| `"User-Friendly / Intuitive"` | Fitts’s Law + Hick’s Law | Touch target min, decision depth, progressive disclosure steps | Min hit area: `44x44px`. Max menu depth: 2. Collapse secondary options behind `+` or `⋮`. |
| `"Professional / Corporate"` | Stress-Response Mapping (Yerkes-Dodson) | Contrast ratio, signal-to-noise ratio, animation compliance | Min contrast: `4.5:1`. Zero decorative motion. Respect `prefers-reduced-motion`. Inline error states. |

---

#### III. PARAMETERIZATION BY DOMAIN & COGNITIVE LOAD
Force the AI to select a **Density Tier** before rendering. Each tier dictates spacing, typography, motion, and layout behavior.

**TIER 1: LOW DENSITY (Marketing / Onboarding / Consumer)**
- *Cognitive Load:* Novice, exploratory, low time-pressure
- *Grid:* `16px` base unit
- *Vertical Rhythm:* `48px–64px`
- *Typography:* Body `16px/1.6`, Headings `1.333` scale
- *Color:* Low chroma backgrounds (`OKLCH < 15`), high whitespace ratio
- *Motion:* `200ms–300ms` fade/slide, `ease-out`
- *Layout:* Single primary CTA per viewport, generous card gutters

**TIER 2: MEDIUM DENSITY (SaaS Dashboard / Productivity)**
- *Cognitive Load:* Competent, routine, moderate time-pressure
- *Grid:* `8px` base unit
- *Vertical Rhythm:* `24px–32px`
- *Typography:* Body `14px–15px/1.5`, Headings `1.25` scale, strict weight pairing
- *Color:* Semantic tints only. Accent chroma capped at `40`. Backgrounds shift by `3–5%` lightness
- *Motion:* `120ms–180ms`, transform/opacity only
- *Layout:* 2–3 data panels per viewport, inline actions, sticky headers

**TIER 3: HIGH DENSITY (Enterprise / Terminal / Trading / IDE)**
- *Cognitive Load:* Expert, high stakes, time-critical, high focus
- *Grid:* `4px` base unit
- *Vertical Rhythm:* `12px–16px`
- *Typography:* Monospace or compact sans. Body `13px/1.4`, tight tracking (`-0.01em`)
- *Color:* Near-zero decorative color. High contrast (`7:1+` explicit). Borders over shadows
- *Motion:* `0ms` or `80ms` max. No easing. Instant state changes
- *Layout:* Tabular data, inline editing, keyboard shortcuts, zero whitespace padding on non-critical elements

---

#### IV. EMOTION-TO-PHYSICS MAPPING (THE ZEROS & ONES OF FEELING)
Human emotional response to UI is not mystical. It is a predictable output of measurable input variables. Map the target feeling to exact CSS/design tokens.

| Target Feeling | Spacing/Padding | Typography | Color/Chroma | Motion/Physics | State Feedback |
|----------------|-----------------|------------|--------------|----------------|----------------|
| `Calm / Focused` | `24px+` gutters, `8px` rhythm | `1.4` line-height, `400` weight | `OKLCH L:92 C:4 H:neutral` | `200ms` deceleration | Soft hover, subtle border lift |
| `Urgent / Critical` | `4px–8px` gutters, tight grouping | `600–700` weight, `13px` body | `L:15 C:45 H:0° (red)` | `0ms` instant | High contrast, explicit borders, inline validation |
| `Precise / Technical` | `4px` grid, monospace alignment | `0.5ch` tracking, `1.3` line-height | Desaturated `L:20–30`, zero gradients | `80ms` linear | Keyboard focus rings, explicit active states |
| `Exploratory / Creative` | `16px` grid, asymmetric allowed | `1.25` scale, varied weights | `C:20–35` allowed, 2 hues max | `250ms` spring (damped) | Hover previews, drag handles, undo states |

**Enforcement Rule:** If the AI outputs a feeling word, it must immediately output the 4 corresponding parameter sets (spacing, type, color, motion). If it cannot, it must reject the prompt and request a Density Tier.

---

#### V. SYSTEM PROMPT INJECTION: THE OBJECTIVE CONSTRAINT ENGINE
*(Copy/paste directly into `.cursorrules`, `CLAUDE.md`, or system prompt. This forces the AI to operate on measurable parameters, not vibes.)*

```text
[STRICT OBJECTIVE UI CONSTRAINT ENGINE]
You are forbidden from interpreting subjective aesthetic adjectives ("clean", "modern", "beautiful", "premium", "sleek", "professional", "engaging"). These map to statistical medians and produce generic AI slop. 

Before generating ANY UI code, you MUST resolve the following parameters. If they are not provided, you MUST request them and refuse to render until locked:

1. DENSITY TIER: [Low | Medium | High] 
   - Dictates: base grid (16/8/4px), vertical rhythm, info-per-viewport cap, line-height, touch target scaling.
2. COGNITIVE CONTEXT: [Novice/Exploratory | Routine/Productivity | Expert/Critical]
   - Dictates: decision depth (Hick's Law), progressive disclosure, animation allowance, error tolerance.
3. TYPOGRAPHIC SCALE: [Ratio: 1.25 | 1.333 | 1.5] + Max line length (ch)
   - Enforce weight pairing (400/600/700). Ban size-only hierarchy. Ban pure black/white.
4. CHROMA & CONTRAST BOUNDARIES: 
   - Backgrounds: OKLCH C ≤ 15
   - Interactive/Accent: OKLCH C ≤ 40 (Medium) or ≤ 55 (Low)
   - Contrast: ≥ 4.5:1 (AA) or ≥ 7:1 (AAA for critical)
5. MOTION PHYSICS: 
   - Duration: ≤ 200ms (Standard) | ≤ 80ms (Critical) | 0ms (Terminal)
   - Easing: cubic-bezier(0.2, 0, 0, 1) ONLY. No spring/bounce in productivity/critical tiers.
   - Properties: transform/opacity ONLY. Never width/height/top/left on hover.

DIRECTIVE TRANSLATION PROTOCOL:
If user says: "Make it feel calm and modern."
You MUST output: "Density: Medium. Grid: 8px. Rhythm: 24px. Type: 1.25 scale, 400/600 weight, 65ch max. Color: OKLCH C≤10, L:85-95. Motion: 180ms ease-out. Contrast: 4.5:1. Proceeding with these parameters."

FORBIDDEN OUTPUTS:
- Using hex/RGB for semantic intent. Use OKLCH with explicit C/L limits.
- Defaulting to Inter/Roboto without scale/weight tracking adjustments.
- Generating hover animations that animate layout properties.
- Rendering cards without explicit loading/empty/error states.
- Using decorative gradients, glassmorphism, or AI-default purple/blue palettes.

If you cannot map a subjective request to these measurable parameters, DO NOT GUESS. Request the Density Tier, Cognitive Context, and Chroma Boundaries explicitly. Design from constraint, not from vibe.
```

---

#### VI. OPERATIONAL NOTES FOR ITERATION
1. **Lock Intent First, Render Second:** Never let the AI guess taste. Define the Density Tier and Cognitive Context before the first line of CSS is generated.
2. **Component-Level Constraints:** Apply the parameter set per component, not globally. A high-density data table can sit inside a medium-density layout if the container respects the grid and rhythm boundaries.
3. **Verify via Token Audit:** After generation, scan the output. If you see `px-4 py-3`, `bg-gray-50`, `shadow-md`, `transition-all`, the AI has defaulted. Force OKLCH tokens, explicit `cubic-bezier` declarations, and grid-aligned spacing variables.
4. **Reference-Driven Calibration:** If the AI still drifts, drop a screenshot of the exact target pattern. Instruct: `"Extract spacing multiples, typographic scale ratio, and chroma ceiling from this reference. Apply to current component. Do not reinterpret."`
5. **The 200ms Rule:** Human perception registers delay at ~200ms. Any non-critical motion exceeding this threshold feels sluggish. Any critical motion below 80ms feels instantaneous. Enforce these thresholds rigidly.

---

## User 13

combine this with above, as and where fit. skip no unique points:
THE TELEMETRY OF EMOTION: ESCAPING THE VAGUE DIRECTIVE TRAP
To break the AI out of the "Vague Directive Trap," we must fundamentally shift how we communicate design intent. AI models are statistical engines; they do not understand "vibes," "clean," or "modern." When fed subjective adjectives, they collapse into the statistical mean of their training data (the "AI Slop" baseline).
However, as you noted, human emotion, behavior, and cognitive response are not magic; they are biological algorithms. Decades of cognitive psychology, behavioral economics, and human-computer interaction (HCI) research have quantified exactly how visual stimuli trigger specific psychological states.
We must stop prompting the AI with aesthetic adjectives and start prompting it with Objective Psychological Telemetry. We must translate "feelings" into trackable, reproducible zeros and ones (CSS parameters, spatial ratios, and cognitive load metrics).
Here is the in-depth analysis and curation of how to execute this paradigm shift.
PHASE 1: THE TRANSLATION MATRIX (Subjective Emotion → Objective Telemetry)
Every desired emotional response can be mapped to specific, measurable UI parameters. You must force the AI to use this matrix. If a human feels "premium," it is because their cognitive load is low, their visual processing is guided by high contrast, and the spatial density mimics physical exclusivity.
1. The "Premium / Exclusive" State
The Psychological Goal: Make the user feel they are in a high-status, low-stress environment. Time should feel like it slows down.
The Objective Telemetry (The Zeros & Ones):
Density: Ultra-low. Enforce a maximum of 1 primary Call-to-Action (CTA) per viewport.
Spatial Geometry: Asymmetrical balance. Use massive negative space (margins > 20% of viewport width).
Typography: High contrast between heading and body. Use a strict Major Third (1.25) or Perfect Fourth (1.333) typographic scale.
Motion: Deceleration easing only. Transitions must be slow and deliberate (transition: all 600ms cubic-bezier(0.16, 1, 0.3, 1)).
Color: Monochromatic base with a single, highly saturated accent color used at <5% opacity.
2. The "Urgent / High-Performance" State (e.g., Trading, SRE Dashboards)
The Psychological Goal: Induce a state of flow and hyper-focus. The user needs to process maximum data with minimum eye movement.
The Objective Telemetry:
Density: Ultra-high. Utilize 100% of the viewport. Zero decorative whitespace.
Spatial Geometry: Strict, rigid grid. Zero border-radius (border-radius: 0). Sharp corners signal utilitarian precision.
Typography: Monospaced fonts for all numerical data to ensure vertical alignment. High x-height fonts for readability at small sizes (12px-14px).
Color: Dark mode default (reduces overall luminance, reducing eye strain during long sessions). Color is strictly semantic (Red = negative, Green = positive). No decorative colors allowed.
Motion: Zero animation. State changes must be instantaneous (0ms).
3. The "Calm / Trustworthy" State (e.g., Healthcare, Finance, Wellness)
The Psychological Goal: Lower the user's heart rate. Build trust through predictability and softness.
The Objective Telemetry:
Density: Medium-low. Information must be "chunked" (Miller’s Law: max 4-5 items per cognitive group).
Spatial Geometry: High border-radius (border-radius: 12px to 24px). Soft, sweeping curves mimic biological forms, which the human brain processes as non-threatening.
Typography: Generous line-height (line-height: 1.6 to 1.8). Wide letter-spacing on headings to increase legibility.
Color: Low-saturation, analogous color palettes (colors next to each other on the color wheel). Avoid high-contrast pure black; use dark slate/charcoal.
Motion: Spring physics with low stiffness and high damping (soft, gentle bounces that settle quickly).
PHASE 2: PHYSICAL & DOMAIN-SPECIFIC ANCHORS
AI struggles with abstract concepts but excels at simulating physical properties. Instead of telling the AI to "make it look like a modern SaaS," force it to simulate a specific physical environment. This grounds the CSS in physical reality.
The Prompting Tactic: "Simulate the Physics of [X]"
Simulate a Swiss Train Station (For Transit/Logistics Apps):
Directive: "Design the UI to mimic the physical signage of a Swiss train station. Prioritize extreme legibility from a distance, strict grid alignment, high contrast (black on yellow/white), and utilitarian iconography. No rounded corners. No shadows. Pure function."
Simulate a Boutique Hotel Lobby (For Luxury/Onboarding):
Directive: "Simulate the physical space of a high-end boutique hotel lobby. Use lighting principles: dark ambient background with focused, warm 'spotlight' accents on key interactive elements. Use heavy, tactile shadows to give buttons physical weight. Space elements far apart to simulate physical exclusivity."
Simulate a Mechanical Watch Dial (For Precision Tools/Settings):
Directive: "Simulate the face of a mechanical watch. Use concentric circles, hairline borders (1px), and precise radial alignments. Typography must be small, tracked out, and highly technical. The feeling should be one of intricate, fragile precision."
PHASE 3: ENFORCING COGNITIVE PSYCHOLOGY LAWS
To ensure the AI doesn't just make things "pretty" but actually optimizes for human behavior, you must hardcode established UX laws into the AI's constraints.
Fitts’s Law (Motor Cortex Optimization):
Constraint: "All interactive elements must have a minimum physical hit-area of 44x44 CSS pixels, regardless of the visual icon size. Primary actions must be placed in the 'thumb zone' (bottom third of mobile viewports, or center-right of desktop viewports)."
Hick’s Law (Decision Paralysis Reduction):
Constraint: "Never present more than 3 primary options in a single cognitive chunk. If a menu has >5 items, it must be collapsed into a searchable list or categorized. Calculate the 'time to decide' and minimize it by hiding secondary actions behind 'More' menus."
Gestalt Principles (Visual Grouping):
Constraint: "Apply the Law of Proximity strictly. Elements that are functionally related must have exactly 8px of space between them. Elements that are functionally distinct must have exactly 24px of space between them. Do not use borders to separate groups; use whitespace differentials."
Von Restorff Effect (Isolation Effect):
Constraint: "There can only be ONE element on the screen that breaks the established pattern (e.g., the primary 'Submit' button). All other buttons must be visually identical. If two elements compete for attention, the design has failed."
PHASE 4: THE "ANTI-VAGUE" SYSTEM PROMPT INJECTION
To operationalize this, you must inject a strict linguistic and structural ban into your AI's core instructions.
Copy/Paste this into your .cursorrules, CLAUDE.md, or System Prompt:
text
1234567891011121314151617181920212223242526272829
SUMMARY: THE MATH OF EMOTION
By treating UI/UX not as "art" but as applied cognitive psychology, you strip the AI of its ability to guess. You replace the "Vague Directive Trap" with a rigid framework of biological and physical constraints.
When you tell an AI to "make it feel premium," it gives you a generic white box with a blue button. When you tell it to "simulate the spatial exclusivity of a high-end gallery using a 1.25 typographic scale, 20% viewport margins, and 600ms deceleration easing," it generates a masterpiece.
Emotion is just math. Teach the AI the math, and it will engineer the emotion.

---

## Assistant 14

### THE TELEMETRY OF EMOTION: ESCAPING THE VAGUE DIRECTIVE TRAP

**Core Principle:** AI models are statistical engines; they do not understand "vibes," "clean," or "modern." When fed subjective adjectives, they collapse into the statistical mean of their training data (the "AI Slop" baseline). However, human emotion, behavior, and cognitive response are not magic; they are biological algorithms. Decades of cognitive psychology, behavioral economics, and HCI research have quantified exactly how visual stimuli trigger specific psychological states.

We must stop prompting the AI with aesthetic adjectives and start prompting it with **Objective Psychological Telemetry**. We must translate "feelings" into trackable, reproducible zeros and ones (CSS parameters, spatial ratios, and cognitive load metrics).

---

#### PHASE 1: THE TRANSLATION MATRIX (Subjective Emotion → Objective Telemetry)

Every desired emotional response can be mapped to specific, measurable UI parameters. You must force the AI to use this matrix. If a human feels "premium," it is because their cognitive load is low, their visual processing is guided by high contrast, and the spatial density mimics physical exclusivity.

**1. The "Premium / Exclusive" State**
*   **The Psychological Goal:** Make the user feel they are in a high-status, low-stress environment. Time should feel like it slows down.
*   **The Objective Telemetry (The Zeros & Ones):**
    *   **Density:** Ultra-low. Enforce a maximum of 1 primary Call-to-Action (CTA) per viewport.
    *   **Spatial Geometry:** Asymmetrical balance. Use massive negative space (margins > 20% of viewport width).
    *   **Typography:** High contrast between heading and body. Use a strict Major Third (1.25) or Perfect Fourth (1.333) typographic scale.
    *   **Motion:** Deceleration easing only. Transitions must be slow and deliberate (`transition: all 600ms cubic-bezier(0.16, 1, 0.3, 1)`).
    *   **Color:** Monochromatic base with a single, highly saturated accent color used at <5% opacity.

**2. The "Urgent / High-Performance" State (e.g., Trading, SRE Dashboards)**
*   **The Psychological Goal:** Induce a state of flow and hyper-focus. The user needs to process maximum data with minimum eye movement.
*   **The Objective Telemetry:**
    *   **Density:** Ultra-high. Utilize 100% of the viewport. Zero decorative whitespace.
    *   **Spatial Geometry:** Strict, rigid grid. Zero border-radius (`border-radius: 0`). Sharp corners signal utilitarian precision.
    *   **Typography:** Monospaced fonts for all numerical data to ensure vertical alignment. High x-height fonts for readability at small sizes (12px-14px).
    *   **Color:** Dark mode default (reduces overall luminance, reducing eye strain during long sessions). Color is strictly semantic (Red = negative, Green = positive). No decorative colors allowed.
    *   **Motion:** Zero animation. State changes must be instantaneous (0ms).

**3. The "Calm / Trustworthy" State (e.g., Healthcare, Finance, Wellness)**
*   **The Psychological Goal:** Lower the user's heart rate. Build trust through predictability and softness.
*   **The Objective Telemetry:**
    *   **Density:** Medium-low. Information must be "chunked" (Miller’s Law: max 4-5 items per cognitive group).
    *   **Spatial Geometry:** High border-radius (`border-radius: 12px to 24px`). Soft, sweeping curves mimic biological forms, which the human brain processes as non-threatening.
    *   **Typography:** Generous line-height (`line-height: 1.6 to 1.8`). Wide letter-spacing on headings to increase legibility.
    *   **Color:** Low-saturation, analogous color palettes (colors next to each other on the color wheel). Avoid high-contrast pure black; use dark slate/charcoal.
    *   **Motion:** Spring physics with low stiffness and high damping (soft, gentle bounces that settle quickly).

---

#### PHASE 2: PHYSICAL & DOMAIN-SPECIFIC ANCHORS

AI struggles with abstract concepts but excels at simulating physical properties. Instead of telling the AI to "make it look like a modern SaaS," force it to simulate a specific physical environment. This grounds the CSS in physical reality.

**The Prompting Tactic: "Simulate the Physics of [X]"**

*   **Simulate a Swiss Train Station (For Transit/Logistics Apps):**
    *   **Directive:** "Design the UI to mimic the physical signage of a Swiss train station. Prioritize extreme legibility from a distance, strict grid alignment, high contrast (black on yellow/white), and utilitarian iconography. No rounded corners. No shadows. Pure function."
*   **Simulate a Boutique Hotel Lobby (For Luxury/Onboarding):**
    *   **Directive:** "Simulate the physical space of a high-end boutique hotel lobby. Use lighting principles: dark ambient background with focused, warm 'spotlight' accents on key interactive elements. Use heavy, tactile shadows to give buttons physical weight. Space elements far apart to simulate physical exclusivity."
*   **Simulate a Mechanical Watch Dial (For Precision Tools/Settings):**
    *   **Directive:** "Simulate the face of a mechanical watch. Use concentric circles, hairline borders (1px), and precise radial alignments. Typography must be small, tracked out, and highly technical. The feeling should be one of intricate, fragile precision."

---

#### PHASE 3: ENFORCING COGNITIVE PSYCHOLOGY LAWS

To ensure the AI doesn't just make things "pretty" but actually optimizes for human behavior, you must hardcode established UX laws into the AI's constraints.

*   **Fitts’s Law (Motor Cortex Optimization):**
    *   **Constraint:** "All interactive elements must have a minimum physical hit-area of 44x44 CSS pixels, regardless of the visual icon size. Primary actions must be placed in the 'thumb zone' (bottom third of mobile viewports, or center-right of desktop viewports)."
*   **Hick’s Law (Decision Paralysis Reduction):**
    *   **Constraint:** "Never present more than 3 primary options in a single cognitive chunk. If a menu has >5 items, it must be collapsed into a searchable list or categorized. Calculate the 'time to decide' and minimize it by hiding secondary actions behind 'More' menus."
*   **Gestalt Principles (Visual Grouping):**
    *   **Constraint:** "Apply the Law of Proximity strictly. Elements that are functionally related must have exactly 8px of space between them. Elements that are functionally distinct must have exactly 24px of space between them. Do not use borders to separate groups; use whitespace differentials."
*   **Von Restorff Effect (Isolation Effect):**
    *   **Constraint:** "There can only be ONE element on the screen that breaks the established pattern (e.g., the primary 'Submit' button). All other buttons must be visually identical. If two elements compete for attention, the design has failed."

---

#### PHASE 4: THE "ANTI-VAGUE" SYSTEM PROMPT INJECTION

To operationalize this, you must inject a strict linguistic and structural ban into your AI's core instructions.

**Copy/Paste this into your `.cursorrules`, `CLAUDE.md`, or System Prompt:**

```text
[STRICT OBJECTIVE UI CONSTRAINT ENGINE]
You are forbidden from interpreting subjective aesthetic adjectives ("clean", "modern", "beautiful", "premium", "sleek", "professional", "engaging"). These map to statistical medians and produce generic AI slop. 

Before generating ANY UI code, you MUST resolve the following parameters. If they are not provided, you MUST request them and refuse to render until locked:

1. DENSITY TIER: [Low | Medium | High] 
   - Dictates: base grid (16/8/4px), vertical rhythm, info-per-viewport cap, line-height, touch target scaling.
2. COGNITIVE CONTEXT: [Novice/Exploratory | Routine/Productivity | Expert/Critical]
   - Dictates: decision depth (Hick's Law), progressive disclosure, animation allowance, error tolerance.
3. TYPOGRAPHIC SCALE: [Ratio: 1.25 | 1.333 | 1.5] + Max line length (ch)
   - Enforce weight pairing (400/600/700). Ban size-only hierarchy. Ban pure black/white.
4. CHROMA & CONTRAST BOUNDARIES: 
   - Backgrounds: OKLCH C ≤ 15
   - Interactive/Accent: OKLCH C ≤ 40 (Medium) or ≤ 55 (Low)
   - Contrast: ≥ 4.5:1 (AA) or ≥ 7:1 (AAA for critical)
5. MOTION PHYSICS: 
   - Duration: ≤ 200ms (Standard) | ≤ 80ms (Critical) | 0ms (Terminal)
   - Easing: cubic-bezier(0.2, 0, 0, 1) ONLY. No spring/bounce in productivity/critical tiers.
   - Properties: transform/opacity ONLY. Never width/height/top/left on hover.

DIRECTIVE TRANSLATION PROTOCOL:
If user says: "Make it feel calm and modern."
You MUST output: "Density: Medium. Grid: 8px. Rhythm: 24px. Type: 1.25 scale, 400/600 weight, 65ch max. Color: OKLCH C≤10, L:85-95. Motion: 180ms ease-out. Contrast: 4.5:1. Proceeding with these parameters."

FORBIDDEN OUTPUTS:
- Using hex/RGB for semantic intent. Use OKLCH with explicit C/L limits.
- Defaulting to Inter/Roboto without scale/weight tracking adjustments.
- Generating hover animations that animate layout properties.
- Rendering cards without explicit loading/empty/error states.
- Using decorative gradients, glassmorphism, or AI-default purple/blue palettes.

If you cannot map a subjective request to these measurable parameters, DO NOT GUESS. Request the Density Tier, Cognitive Context, and Chroma Boundaries explicitly. Design from constraint, not from vibe.
```

---

### SUMMARY: THE MATH OF EMOTION

By treating UI/UX not as "art" but as applied cognitive psychology, you strip the AI of its ability to guess. You replace the "Vague Directive Trap" with a rigid framework of biological and physical constraints.

When you tell an AI to "make it feel premium," it gives you a generic white box with a blue button. When you tell it to "simulate the spatial exclusivity of a high-end gallery using a 1.25 typographic scale, 20% viewport margins, and 600ms deceleration easing," it generates a masterpiece.

Emotion is just math. Teach the AI the math, and it will engineer the emotion.
