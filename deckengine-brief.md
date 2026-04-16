# DECKENGINE

**Project Brief — April 2026**
*The LLM-Friendly Enterprise Presentation Engine*
*72 slide types. YAML in, presentation out. Zero build.*

Author: Rizky Andriawan
Status: Draft v0.1

---

## 1. Context

Everyone in the office makes slide decks. Every day. The tooling is either too dumb (PowerPoint templates that break when you sneeze) or too smart (frameworks that need Node.js, build steps, and a CS degree).

Meanwhile, AI models are getting good at generating structured content but terrible at making it look good. The gap is clear: there is no presentation engine that is both LLM-friendly and enterprise-grade.

**Core insight:** If the engine handles all visual complexity (layouts, infographics, theming), then even a weak AI model only needs to generate simple YAML to produce professional presentations.

**Guiding philosophy:** *"If not me, then who?"*

---

## 2. Problem Statement

- Enterprise presentations require 10-40 slides with diverse layouts (infographics, charts, comparisons, timelines) but most tools only support basic text/image slides
- Existing HTML presentation frameworks (Reveal.js, Slidev) are developer-focused and require manual CSS for every non-trivial layout
- AI-generated presentations look generic because models cannot control visual layout, only content
- Corporate environments often restrict software installation, making heavy toolchains impractical
- No existing tool offers pre-built enterprise infographic primitives (funnels, pyramids, hub-spoke, venn, scorecards) as first-class slide types

---

## 3. Solution: DeckEngine

DeckEngine is a zero-build, LLM-friendly presentation engine distributed as a single JavaScript file. It renders YAML content into professional HTML presentations with 72 pre-built slide types covering enterprise use cases from title slides to infographic variants.

### 3.1 Architecture

Three files. That is the entire system:

| File | Purpose |
|------|---------|
| `deckengine.js` | Web component, YAML parser, 72 slide renderers, presenter mode, keyboard navigation |
| `theme.css` | CSS variables for colors, fonts, spacing, backgrounds, logos |
| `index.yaml` | Slide content in flat YAML DSL |

### 3.2 Distribution

- **CDN / script tag:** zero build, copy-paste into any HTML file
- **npm package:** for developers integrating into React/Vue/Angular projects
- **GitHub Pages:** hosted version, open browser and start editing

Usage (zero-build):

```html
<script src="deckengine.js"></script>
<deck-engine content="./assets/index.yaml"></deck-engine>
```

Usage (npm):

```js
import { DeckEngine } from 'deckengine'
```

---

## 4. DSL Design (YAML)

The DSL is intentionally flat and simple. Every LLM in existence has been trained on YAML. Even weak models can generate valid output because each slide is a self-contained object with a type keyword and predictable fields.

### 4.1 Example

```yaml
meta:
  theme: alibaba
  title: Cloud Migration Strategy
  author: Rizky Andriawan
  date: 2026-04-15

slides:
  - type: title
    title: Cloud Migration Strategy
    subtitle: Enabling Scale for Enterprise

  - type: stat-row
    title: Key Metrics
    items:
      - stat: 99.99%
        label: Uptime SLA
      - stat: 40%
        label: Cost Reduction
      - stat: 3x
        label: Deploy Speed

  - type: flow-horizontal
    title: Migration Phases
    items:
      - title: Assess
        body: Evaluate current infra
      - title: Plan
        body: Design target architecture
      - title: Migrate
        body: Execute in waves
      - title: Optimize
        body: Fine-tune costs & perf

  - type: compare-versus
    title: Build vs Buy
    left:
      title: Build
      items:
        - Full control
        - Higher upfront cost
    right:
      title: Buy
      items:
        - Faster time to market
        - Vendor dependency
```

### 4.2 Design Principles

- Each slide type is ONE keyword (e.g., `flow-horizontal`, `stat-row`, `compare-versus`)
- No layout/content/modifier composition — type implies everything
- Fields are predictable per type: `title`, `subtitle`, `items`, `left`, `right`, `stat`, `label`, etc.
- AI only picks a type and fills fields — zero visual decisions required
- Schema is validatable — CI/CD can catch malformed YAML before rendering

---

## 5. Slide Type Catalog (72 Types)

### Opening (6)

| Type | Description |
|------|-------------|
| `title` | Deck cover — title + branding |
| `title-subtitle` | Cover + tagline/subtitle |
| `speaker-intro` | Single presenter — photo, name, role, credentials |
| `multi-speaker` | Multiple presenters grid |
| `company-overview` | Logo + tagline + key company facts |
| `agenda` | Numbered outline of the deck |

### Content (8)

| Type | Description |
|------|-------------|
| `text` | Title + paragraphs |
| `bullets` | Title + bullet list |
| `two-col` | Side-by-side text columns |
| `three-col` | Triple text columns |
| `image-left` | Image + text, image on left |
| `image-right` | Text + image, image on right |
| `image-full` | Full bleed image + overlay text |
| `code` | Syntax-highlighted code block |

### Infographic: Stats (6)

| Type | Description |
|------|-------------|
| `stat-single` | One large number + context label |
| `stat-row` | 3-4 numbers horizontal |
| `stat-grid` | 6+ number cards in grid |
| `stat-progress-bar` | Horizontal progress bars with labels |
| `stat-progress-circle` | Donut/ring percentage indicators |
| `stat-pictograph` | Repeated icons representing quantity |

### Infographic: Flow (7)

| Type | Description |
|------|-------------|
| `flow-horizontal` | Left-to-right process with arrows |
| `flow-vertical` | Top-to-bottom steps |
| `flow-numbered` | Big numbers + descriptions vertical |
| `flow-snake` | Zigzag alternating left-right |
| `flow-cycle` | Circular loop process |
| `flow-funnel` | Narrowing stages (conversion) |
| `flow-funnel-inverted` | Expanding stages (impact cascade) |

### Infographic: Hierarchy (4)

| Type | Description |
|------|-------------|
| `hierarchy-pyramid` | Layered top-down pyramid |
| `hierarchy-concentric` | Onion/nested rings |
| `hierarchy-stacked` | Horizontal stacked layers |
| `hierarchy-org` | Tree/org chart structure |

### Infographic: Relationship (5)

| Type | Description |
|------|-------------|
| `rel-venn` | 2-3 overlapping circles |
| `rel-hub-spoke` | Center + radiating connections |
| `rel-quadrant` | 2x2 matrix with labeled axes |
| `rel-mind-map` | Central node + branches |
| `rel-network` | Interconnected nodes graph |

### Infographic: Icon-driven (3)

| Type | Description |
|------|-------------|
| `icon-grid` | Icon + label grid (3/4/6 items) |
| `icon-row` | Horizontal icon + text pairs |
| `icon-stat` | Icon + big number + label |

### Comparison (5)

| Type | Description |
|------|-------------|
| `compare-table` | Columns side-by-side comparison |
| `compare-versus` | A vs B visual split |
| `compare-before-after` | Visual contrast before/after |
| `compare-pros-cons` | Green/red two-column |
| `compare-scale` | Spectrum low-to-high gradient |

### Data (4)

| Type | Description |
|------|-------------|
| `table` | Standard data table |
| `chart-placeholder` | Reserved space for chart image |
| `scorecard` | RAG red/yellow/green indicators |
| `maturity-model` | Levels 1-5 with position marker |

### Commercial (6)

| Type | Description |
|------|-------------|
| `pricing` | Tier/package columns |
| `tco` | Total cost of ownership breakdown |
| `case-study` | Logo + metrics + testimonial |
| `case-study-grid` | Multiple mini case studies |
| `customer-logos` | Trust badge / logo wall |
| `sla` | SLA commitments + uptime numbers |

### Planning (4)

| Type | Description |
|------|-------------|
| `timeline-horizontal` | Events across horizontal axis |
| `timeline-vertical` | Events down vertical axis |
| `gantt` | Simplified project timeline bars |
| `milestone` | Single milestone highlight |

### People (3)

| Type | Description |
|------|-------------|
| `team-grid` | Photos + roles grid |
| `org-chart` | Hierarchy boxes |
| `raci` | Responsibility assignment matrix |

### Engagement (5)

| Type | Description |
|------|-------------|
| `quote` | Big quote + attribution |
| `poll` | Audience question/poll |
| `exercise` | Workshop/activity instructions |
| `definition` | Term + explanation |
| `checklist` | Visual todo/verification list |

### Closing (6)

| Type | Description |
|------|-------------|
| `cta` | Next steps + action items + owners |
| `summary` | Key takeaways (3-5 points) |
| `thank-you` | Closing + contact info |
| `qna` | Minimal "Questions?" slide |
| `appendix` | Appendix section separator |
| `references` | Citations and source links |

---

## 6. Theming System

Themes are pure CSS variable files. No JavaScript, no build step. Switch themes by swapping one CSS file.

### 6.1 Theme Structure

```
styles/
  theme.css          # CSS variables
  fonts/             # .woff2 custom fonts
  backgrounds/       # .svg .png slide backgrounds
  logos/             # company logos, watermarks
  overrides.css      # per-client custom CSS
```

### 6.2 CSS Variables

```css
:root {
  --dk-font-heading: 'DM Serif Display', serif;
  --dk-font-body: 'DM Sans', sans-serif;
  --dk-color-primary: #FF6A00;
  --dk-color-secondary: #1A1A2E;
  --dk-color-accent: #0066FF;
  --dk-color-muted: #6B7280;
  --dk-color-bg: #FFFFFF;
  --dk-color-text: #1A1A1A;
  --dk-spacing-unit: 32px;
  --dk-logo: url('./logos/company.svg');
  --dk-bg-title: url('./backgrounds/cover.svg');
  --dk-bg-section: url('./backgrounds/divider.svg');
}
```

**Strategy:** Purchase premium PPTX templates (Envato, SlideModel) and reverse-engineer their layouts into DeckEngine CSS themes. Battle-tested designs, zero original design work needed.

---

## 7. Asset Structure

```
project/
├── assets/
│   ├── index.yaml         # slide content DSL
│   ├── icons/             # SVG icons
│   ├── images/            # photos, screenshots, diagrams
│   └── data/              # optional CSV/JSON for charts
├── styles/
│   ├── theme.css
│   ├── fonts/
│   ├── backgrounds/
│   ├── logos/
│   └── overrides.css
└── index.html             # <deck-engine> one-liner
```

---

## 8. Feature Roadmap

### MVP (v0.1)

- Web component (`<deck-engine>`), zero build
- YAML parser (js-yaml bundled)
- 72 slide type renderers
- CSS variable theming
- Keyboard navigation (arrows, space, escape)
- Presenter mode (speaker notes, timer, slide preview)
- Responsive scaling (fit to viewport)
- Print / Ctrl+P to PDF

### v0.2

- Progressive reveal / fragment animations
- Slide transitions
- Built-in icon set (Lucide or similar, bundled SVG)
- Multiple theme presets (corporate dark, corporate light, minimal, bold)
- YAML validation with helpful error messages

### v0.3

- Live editor mode (split pane: YAML left, preview right)
- Export to PDF (html2pdf or Puppeteer-based)
- Remote control via phone (WebSocket)
- Plugin API for custom slide types

### Future

- Integration with DeckEngine Chart (separate project) for data visualization slides
- PPTX export
- Collaborative editing
- AI prompt templates per slide type (copy-paste prompts for dumb models)

---

## 9. Competitive Landscape

| Tool | Zero Build | YAML DSL | Slide Types | Infographic | LLM-Ready |
|------|-----------|----------|-------------|-------------|-----------|
| Reveal.js | Yes | No | ~5 | No | No |
| Slidev | No | Partial | ~17 | No | No |
| Quarto | No | Yes | ~10 | No | No |
| PowerPoint | N/A | No | Many | Templates | No |
| **DeckEngine** | **Yes** | **Yes** | **72** | **Yes (35+)** | **Yes** |

---

## 10. Target Workflow

Primary use case: an employee needs to create an enterprise presentation for a client meeting.

1. Open AI chat (any model, even weak ones)
2. Prompt: "Generate a DeckEngine YAML for a cloud migration pitch. Use types: title, agenda, stat-row, flow-horizontal, compare-table, case-study, pricing, cta, thank-you"
3. AI generates `index.yaml` (even dumb models can do this)
4. Paste YAML into DeckEngine (browser-based, no install needed)
5. Present directly from browser or Ctrl+P to PDF

**Total time:** 5-10 minutes for a 20-slide enterprise deck.

---

## 11. Open Source Strategy

- Public GitHub repo, MIT license
- npm package for developer adoption
- GitHub Pages for zero-install demo
- Portfolio piece + internal advocacy tool
- Community contributions for additional themes and slide types

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| 72 types is ambitious for MVP | Delayed launch | Ship 20 core types first, add incrementally |
| Content overflow from AI-generated text | Ugly slides | Auto-scale font, truncate with ellipsis, or split slide |
| Corporate firewall blocks CDN fonts/icons | Broken rendering | Bundle all assets in single file, no external deps |
| YAML indentation errors from AI | Parse failures | Friendly error messages with line numbers + suggestion |
| Alibaba IP concerns | Ownership dispute | Build and publish before start date, list in Exhibit A |

---

*"If not me, then who?"*
