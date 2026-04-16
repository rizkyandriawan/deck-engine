# DeckEngine

**The LLM-Friendly Enterprise Presentation Engine**
*72 slide types. YAML in, presentation out. Zero build.*

**🚀 Live demo:** https://gordon9000.prototata.online — *Project GORDON-9000*, an AI Superbot deployment deck for QuickBite Global, rendered in AWS re:Invent visual style.

DeckEngine renders professional HTML presentations from a flat YAML DSL. It ships as a single web component (`<deck-engine>`), works without any build step, and includes 72 pre-built slide types covering everything from title slides to enterprise infographics.

---

## Why DeckEngine?

- **Zero build** — drop in three files and you're done. No Node, no bundler, no toolchain.
- **LLM-friendly** — every slide is one keyword + a few predictable fields. Even weak models can generate valid YAML.
- **72 slide types** — title, agenda, stats, flows, funnels, pyramids, hub-spoke, venn, mind-map, network, gantt, RACI, pricing, case studies, and more.
- **Theme via CSS variables** — swap one CSS file to rebrand. No JS changes needed.
- **Browser-native** — keyboard navigation, presenter mode, overview grid, fullscreen, print-to-PDF all built in.

---

## Quick Start

### Option 1: Zero-build (script tag)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles/theme.css">
  <script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>
  <script src="deckengine.js" defer></script>
</head>
<body>
  <deck-engine content="./assets/index.yaml"></deck-engine>
</body>
</html>
```

That's it. Open in a browser and you have a presentation.

### Option 2: Local dev server

```bash
git clone git@github.com:rizkyandriawan/deck-engine.git
cd deck-engine
python3 -m http.server 8765
```

Open `http://localhost:8765`.

---

## Project Structure

```
deck-engine/
├── index.html           # Single entry point with <deck-engine> tag
├── deckengine.js        # Web component + 72 renderers (single file)
├── styles/
│   └── theme.css        # All visual styling, themeable via CSS variables
├── assets/
│   └── index.yaml       # Your slide content
└── docs/
    ├── DSL.md           # Full DSL specification for all 72 slide types
    └── screenshots/     # Demo screenshots of every slide type
```

---

## Authoring a Deck

Write your content in `assets/index.yaml`:

```yaml
meta:
  title: Cloud Migration Strategy
  author: Your Name
  date: 2026-04-16

slides:
  - type: title
    title: Cloud Migration Strategy
    subtitle: Enabling Scale for Enterprise

  - type: agenda
    title: Today's Agenda
    items:
      - Current State Assessment
      - Target Architecture
      - Migration Approach
      - Cost Analysis
      - Q&A

  - type: stat-row
    title: Key Metrics
    items:
      - stat: "99.99%"
        label: Uptime SLA
        icon: shield
      - stat: "40%"
        label: Cost Reduction
        icon: chart
      - stat: "3x"
        label: Deploy Speed
        icon: rocket

  - type: thank-you
    title: Thank You
    subtitle: Let's build the future together
    contact:
      email: hello@example.com
      website: example.com
```

See [`docs/DSL.md`](docs/DSL.md) for the full reference of all 72 slide types.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` `Space` `Enter` | Next slide |
| `←` `Backspace` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `Escape` | Toggle overview grid |
| `P` | Open presenter mode (separate window) |
| `F` | Toggle fullscreen |
| `Ctrl+P` | Print / save as PDF |

URL hash syncs to current slide (e.g. `#slide=12`), so you can deep-link.

---

## Presenter Mode

Press `P` to open a second window with:
- Current slide (large)
- Next slide preview
- Speaker notes (from the `notes:` field on any slide)
- Elapsed timer

Both windows stay in sync as you navigate.

Add notes per slide:

```yaml
- type: title
  title: Cloud Migration Strategy
  notes: |
    Welcome the audience. Mention this is a board-level
    presentation, not a technical deep-dive.
```

---

## Theming

All styling lives in `styles/theme.css` via CSS custom properties:

```css
:root {
  --dk-color-primary: #FF6A00;
  --dk-color-secondary: #1A1A2E;
  --dk-color-accent: #0066FF;
  --dk-color-success: #10B981;
  --dk-color-warning: #F59E0B;
  --dk-color-danger: #EF4444;
  --dk-color-bg: #FFFFFF;
  --dk-color-text: #1A1A1A;

  --dk-font-heading: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --dk-font-body:    -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  --dk-slide-width:  1920px;
  --dk-slide-height: 1080px;
}
```

To rebrand for a client, fork `theme.css`, change the variables, and you're done. No JS edits required.

---

## Slide Type Categories

72 types across 14 categories:

| Category | Types | Examples |
|----------|-------|----------|
| **Opening** | 6 | `title`, `agenda`, `speaker-intro`, `multi-speaker`, `company-overview` |
| **Content** | 8 | `text`, `bullets`, `two-col`, `three-col`, `image-left`, `image-right`, `image-full`, `code` |
| **Stats** | 6 | `stat-single`, `stat-row`, `stat-grid`, `stat-progress-bar`, `stat-progress-circle`, `stat-pictograph` |
| **Flow** | 7 | `flow-horizontal`, `flow-vertical`, `flow-numbered`, `flow-snake`, `flow-cycle`, `flow-funnel`, `flow-funnel-inverted` |
| **Hierarchy** | 4 | `hierarchy-pyramid`, `hierarchy-concentric`, `hierarchy-stacked`, `hierarchy-org` |
| **Relationship** | 5 | `rel-venn`, `rel-hub-spoke`, `rel-quadrant`, `rel-mind-map`, `rel-network` |
| **Icon-driven** | 3 | `icon-grid`, `icon-row`, `icon-stat` |
| **Comparison** | 5 | `compare-table`, `compare-versus`, `compare-before-after`, `compare-pros-cons`, `compare-scale` |
| **Data** | 4 | `table`, `chart-placeholder`, `scorecard`, `maturity-model` |
| **Commercial** | 6 | `pricing`, `tco`, `case-study`, `case-study-grid`, `customer-logos`, `sla` |
| **Planning** | 4 | `timeline-horizontal`, `timeline-vertical`, `gantt`, `milestone` |
| **People** | 3 | `team-grid`, `org-chart`, `raci` |
| **Engagement** | 5 | `quote`, `poll`, `exercise`, `definition`, `checklist` |
| **Closing** | 6 | `cta`, `summary`, `thank-you`, `qna`, `appendix`, `references` |

See [`docs/DSL.md`](docs/DSL.md) for every type's fields and an example.

---

## LLM Prompt Template

Use this with any LLM to generate a deck:

```
Generate a DeckEngine YAML for a [TOPIC] presentation.

Requirements:
- Use these slide types in order: title, agenda, stat-row,
  flow-horizontal, compare-table, case-study, pricing, cta, thank-you
- Each slide must have a `type` field matching one of the 72 supported types
- Output valid YAML only, no markdown fences

Reference: see DSL.md for field definitions per slide type.
```

Even small/cheap models reliably produce valid output because the DSL is intentionally flat and predictable.

---

## Built-in Icons

30 inline SVG icons, referenced by name:

`arrow-right`, `check`, `star`, `user`, `chart`, `clock`, `target`, `lightbulb`, `shield`, `gear`, `globe`, `mail`, `phone`, `building`, `briefcase`, `rocket`, `flag`, `heart`, `warning`, `info`, `plus`, `minus`, `search`, `link`, `download`, `upload`, `lock`, `unlock`, `cloud`, `database`

Use them in any slide that accepts an `icon:` field.

---

## Browser Support

Anything with custom elements + CSS Grid + `foreignObject` SVG support — Chrome, Edge, Firefox, Safari, modern mobile browsers.

---

## License

MIT
