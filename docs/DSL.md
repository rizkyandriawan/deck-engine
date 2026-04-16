# DeckEngine DSL Specification

Complete reference for the YAML DSL. Every slide is a YAML object with a required `type:` field plus type-specific fields.

---

## Document Structure

```yaml
meta:
  title: string         # Deck title
  author: string        # Author name
  date: string          # YYYY-MM-DD
  theme: string         # (Optional) theme variant name

slides:
  - type: <slide-type>
    # ...type-specific fields
    notes: |            # (Optional) speaker notes — shown in presenter mode
      Free text spoken
      reminder for the presenter.
```

The `notes:` field is universal — it works on any slide type and only appears in presenter mode.

---

## Common Conventions

- All field values are plain strings unless noted otherwise.
- `image:` accepts any URL (https) or relative path.
- `icon:` references one of the [30 built-in icons](../README.md#built-in-icons) — pass the name as a string.
- Numeric percentages (`value: 75`) are 0–100 unless stated.
- Arrays use standard YAML `-` syntax.

---

## Categories

1. [Opening](#opening) (6 types)
2. [Content](#content) (8 types)
3. [Stats](#stats) (6 types)
4. [Flow](#flow) (7 types)
5. [Hierarchy](#hierarchy) (4 types)
6. [Relationship](#relationship) (5 types)
7. [Icon-driven](#icon-driven) (3 types)
8. [Comparison](#comparison) (5 types)
9. [Data](#data) (4 types)
10. [Commercial](#commercial) (6 types)
11. [Planning](#planning) (4 types)
12. [People](#people) (3 types)
13. [Engagement](#engagement) (5 types)
14. [Closing](#closing) (6 types)

---

## Opening

### `title`
Cover slide with deck title.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Main title |
| `subtitle` | string | (Optional) Subtitle |
| `author` | string | (Optional) Author name |
| `date` | string | (Optional) Date |

```yaml
- type: title
  title: Cloud Migration Strategy
  subtitle: Accelerating Digital Transformation
  author: Meridian Consulting Group
  date: 2026-04-16
```

### `title-subtitle`
Title with tagline below.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Main title |
| `subtitle` | string | Subtitle |
| `tagline` | string | Smaller tagline below |

```yaml
- type: title-subtitle
  title: From Legacy to Cloud-Native
  subtitle: A Phased Approach
  tagline: Reducing operational costs by 40%
```

### `speaker-intro`
Single presenter card with photo + bio.

| Field | Type | Notes |
|-------|------|-------|
| `name` | string | Presenter name |
| `role` | string | Job title |
| `photo` | string | Image URL |
| `credentials` | string[] | List of credentials shown as tags |
| `bio` | string | Short biography |

```yaml
- type: speaker-intro
  name: Sarah Chen
  role: Principal Cloud Architect
  photo: https://i.pravatar.cc/300?img=5
  credentials:
    - AWS Solutions Architect Professional
    - Google Cloud Fellow
  bio: Sarah specializes in large-scale cloud transformations.
```

### `multi-speaker`
Grid of multiple presenters.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Slide title |
| `speakers` | object[] | Each: `{ name, role, photo, bio }` |

```yaml
- type: multi-speaker
  title: Your Engagement Team
  speakers:
    - name: Sarah Chen
      role: Principal Cloud Architect
      photo: https://i.pravatar.cc/300?img=5
      bio: Cloud strategy lead.
    - name: Marcus Rivera
      role: Security Director
      photo: https://i.pravatar.cc/300?img=12
      bio: Former CISO.
```

### `company-overview`
Company logo + tagline + key facts.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Company name |
| `tagline` | string | Company tagline |
| `logo` | string | Logo URL or text identifier |
| `facts` | object[] | Each: `{ label, value }` |

```yaml
- type: company-overview
  title: About Meridian Consulting
  tagline: Engineering the future of enterprise infrastructure
  logo: meridian-logo
  facts:
    - label: Founded
      value: "2014"
    - label: Migrations Delivered
      value: "200+"
```

### `agenda`
Numbered outline. CSS auto-numbers — don't add numbers in your text.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | "Today's Agenda" etc. |
| `items` | string[] or object[] | Strings or `{ title, description }` |

```yaml
- type: agenda
  title: Today's Agenda
  items:
    - Current State Assessment
    - Cloud Strategy & Target Architecture
    - Migration Approach & Phasing
    - Cost Analysis & ROI
```

---

## Content

### `text`
Title + paragraph body.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Slide title |
| `body` | string | Multi-line body (line breaks render as `<br>`) |

```yaml
- type: text
  title: Executive Summary
  body: |
    Pinnacle's infrastructure has reached end-of-life.
    A phased cloud migration will reduce TCO by 40%
    while improving resilience and time-to-market.
```

### `bullets`
Title + bullet list.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Slide title |
| `items` | string[] | Bullet points |

```yaml
- type: bullets
  title: Key Drivers
  items:
    - End-of-life hardware lifecycle
    - Rising data center costs
    - Need for elastic scaling
```

### `two-col`
Two side-by-side columns.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Slide title |
| `left` | object | `{ title, body }` |
| `right` | object | `{ title, body }` |

```yaml
- type: two-col
  title: Current vs Target State
  left:
    title: Today
    body: Monolithic apps on VMware across 3 data centers.
  right:
    title: Tomorrow
    body: Containerized microservices on managed Kubernetes.
```

### `three-col`
Three columns with optional icons.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Slide title |
| `columns` | object[] | Each: `{ title, body, icon }` |

```yaml
- type: three-col
  title: Migration Pillars
  columns:
    - title: Replatform
      icon: cloud
      body: Lift legacy apps onto cloud VMs.
    - title: Refactor
      icon: gear
      body: Re-architect as microservices.
    - title: Replace
      icon: rocket
      body: Adopt SaaS solutions.
```

### `image-left`
Image on left, text on right.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Slide title |
| `image` | string | Image URL |
| `body` | string | Text body |
| `caption` | string | (Optional) Image caption |

```yaml
- type: image-left
  title: Current Data Center Footprint
  image: https://images.unsplash.com/photo-1558494949-ef010cbdcc31
  caption: Newark Primary Data Center
  body: Pinnacle operates 1,200 servers across three facilities.
```

### `image-right`
Same as `image-left` but flipped.

```yaml
- type: image-right
  title: Target Cloud Architecture
  image: https://images.unsplash.com/photo-1451187580459-43490279c0fa
  body: Multi-region active-active topology with full automation.
```

### `image-full`
Full-bleed image with overlay.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Overlay title |
| `image` | string | Background image URL |
| `body` | string | (Optional) Overlay body |
| `overlay` | bool | (Optional) Add dark overlay for legibility |

```yaml
- type: image-full
  title: The Cloud Imperative
  image: https://images.unsplash.com/photo-1451187580459-43490279c0fa
  overlay: true
```

### `code`
Syntax-styled code block.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Slide title |
| `language` | string | Language hint (`hcl`, `python`, etc.) |
| `code` | string | Code body (multi-line) |
| `description` | string | (Optional) Caption |

```yaml
- type: code
  title: Infrastructure as Code
  language: hcl
  code: |
    module "eks_cluster" {
      source  = "terraform-aws-modules/eks/aws"
      version = "~> 20.0"
    }
  description: All infrastructure defined as versioned Terraform modules.
```

---

## Stats

### `stat-single`
One massive number.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Slide title |
| `stat` | string | The big number |
| `label` | string | Label below |
| `description` | string | (Optional) Extra context |
| `icon` | string | (Optional) Icon name |

```yaml
- type: stat-single
  title: The Opportunity
  stat: "$8.4M"
  label: Annual Cost Savings
  icon: chart
  description: Realized over the 18-month migration program.
```

### `stat-row`
3–4 stats in a horizontal row.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Slide title |
| `items` | object[] | Each: `{ stat, label, icon }` |

```yaml
- type: stat-row
  title: Migration Program at a Glance
  items:
    - stat: "47"
      label: Applications
      icon: cloud
    - stat: "18 mo"
      label: Total Duration
      icon: clock
```

### `stat-grid`
6+ stats in a grid.

```yaml
- type: stat-grid
  title: Current Infrastructure Metrics
  items:
    - stat: "1,200"
      label: Physical Servers
      icon: database
    - stat: "3"
      label: Data Centers
      icon: building
    # ... up to 6+ items
```

### `stat-progress-bar`
Horizontal progress bars per metric.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Slide title |
| `items` | object[] | Each: `{ label, value, color }` — value is 0–100 |

```yaml
- type: stat-progress-bar
  title: Cloud Readiness by Domain
  items:
    - label: Compute & Containers
      value: 82
      color: "#10B981"
    - label: Networking
      value: 68
      color: "#0066FF"
```

### `stat-progress-circle`
Donut/ring percentage indicators in a row.

```yaml
- type: stat-progress-circle
  title: Application Portfolio Disposition
  items:
    - label: Replatform
      value: 60
      color: "#0066FF"
    - label: Refactor
      value: 22
      color: "#8B5CF6"
```

### `stat-pictograph`
Repeated icons showing quantity ratios.

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ label, value, total, icon }` |

```yaml
- type: stat-pictograph
  title: Team Certification Progress
  items:
    - label: AWS Certified
      value: 28
      total: 45
      icon: user
```

---

## Flow

### `flow-horizontal`
Left-to-right process with arrows.

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ title, body, icon }` |

```yaml
- type: flow-horizontal
  title: Application Migration Pipeline
  items:
    - title: Assess
      icon: search
      body: Evaluate dependencies.
    - title: Plan
      icon: target
      body: Design target architecture.
    - title: Migrate
      icon: upload
      body: Execute cutover.
    - title: Optimize
      icon: chart
      body: Tune cost and performance.
```

### `flow-vertical`
Top-to-bottom variant of the same.

### `flow-numbered`
Big numbered steps. CSS auto-numbers — don't add numbers in your text.

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ title, body }` |

```yaml
- type: flow-numbered
  title: Data Center Decommission Process
  items:
    - title: Freeze New Deployments
      body: No new workloads provisioned on-premises.
    - title: Migrate Remaining Workloads
      body: Execute final migration waves per runbook.
```

### `flow-snake`
Zigzag layout (alternating left/right by row).

```yaml
- type: flow-snake
  title: 6-Wave Migration Plan
  items:
    - title: Wave 1
      body: Web Apps
    - title: Wave 2
      body: SaaS Migration
    # ... continues snaking
```

### `flow-cycle`
Circular loop process — items positioned around a circle with arrows.

```yaml
- type: flow-cycle
  title: Continuous Improvement Cycle
  items:
    - title: Measure
      body: Collect metrics
    - title: Analyze
      body: Find opportunities
    - title: Prioritize
      body: Rank by impact
    - title: Implement
      body: Deploy via CI/CD
    - title: Validate
      body: Verify against baselines
```

### `flow-funnel`
Narrowing stages (conversion-style).

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ title, value, body }` — first item is widest |

```yaml
- type: flow-funnel
  title: Application Rationalization Funnel
  items:
    - title: Total Portfolio
      value: "142"
      body: All apps inventoried.
    - title: In Scope
      value: "98"
      body: Meeting migration criteria.
    - title: Migration Ready
      value: "47"
      body: Approved with target architecture.
```

### `flow-funnel-inverted`
Expanding stages (impact-cascade-style). First item is narrowest.

---

## Hierarchy

### `hierarchy-pyramid`
Layered top-down pyramid (top = first/smallest).

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ title, body }` — first = top of pyramid |

```yaml
- type: hierarchy-pyramid
  title: Cloud Governance Framework
  items:
    - title: Board & Executive Steering
      body: Strategic direction
    - title: Cloud Center of Excellence
      body: Architecture standards
    - title: Platform Engineering
      body: Landing zones, CI/CD
    - title: Application Teams
      body: Feature development
```

### `hierarchy-concentric`
Onion / nested rings. First item = innermost.

```yaml
- type: hierarchy-concentric
  title: Defense in Depth Security Model
  items:
    - title: Perimeter
      body: Cloud-native firewalls
    - title: Network
      body: Zero-trust segmentation
    - title: Application
      body: OWASP scanning
    - title: Data
      body: AES-256 encryption
```

### `hierarchy-stacked`
Horizontal stacked bars, each layer narrower than the one above.

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ title, body, color }` |

```yaml
- type: hierarchy-stacked
  title: Cloud Platform Stack
  items:
    - title: Business Applications
      body: Trading platform, payment processing
    - title: Application Services
      body: API gateway, service mesh
```

### `hierarchy-org`
Org-chart tree with connector lines.

| Field | Type | Notes |
|-------|------|-------|
| `root` | object | `{ title, children: [{ title, children: [...] }] }` |

```yaml
- type: hierarchy-org
  title: Cloud Organization Structure
  root:
    title: CTO — David Park
    children:
      - title: VP Cloud Platform — Sarah Chen
        children:
          - title: Platform Engineering
          - title: Cloud Security
      - title: VP Application Development
        children:
          - title: Trading Systems
          - title: Customer Digital
```

---

## Relationship

### `rel-venn`
2–3 overlapping circles.

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ title, items }` (items = sub-bullets) |
| `intersection` | string | Text shown in the overlap area |

```yaml
- type: rel-venn
  title: DevSecOps Intersection
  items:
    - title: Development
      items:
        - CI/CD pipelines
        - Code review
    - title: Operations
      items:
        - Monitoring & alerting
        - Capacity planning
    - title: Security
      items:
        - Threat modeling
        - Compliance auditing
  intersection: Automated security testing in CI/CD with policy guardrails.
```

### `rel-hub-spoke`
Center node + radiating connections.

| Field | Type | Notes |
|-------|------|-------|
| `center` | object | `{ title, body }` |
| `spokes` | object[] | Each: `{ title, body }` |

```yaml
- type: rel-hub-spoke
  title: Cloud Center of Excellence Model
  center:
    title: CCoE
    body: Governance & standards
  spokes:
    - title: Architecture
      body: Design review
    - title: Security
      body: IAM policies
    - title: FinOps
      body: Cost optimization
```

### `rel-quadrant`
2×2 matrix with labeled axes.

| Field | Type | Notes |
|-------|------|-------|
| `x_label` | string | Horizontal axis label |
| `y_label` | string | Vertical axis label |
| `quadrants` | object[] | Exactly 4 items, each `{ title, items }` |

```yaml
- type: rel-quadrant
  title: Application Migration Priority Matrix
  x_label: Business Value
  y_label: Migration Complexity
  quadrants:
    - title: Quick Wins (High Value, Low Complexity)
      items:
        - Customer Portal
        - Marketing Website
    - title: Strategic (High Value, High Complexity)
      items:
        - Trading Platform
    - title: Backburner (Low Value, Low Complexity)
      items:
        - Internal Wiki
    - title: Reconsider (Low Value, High Complexity)
      items:
        - Legacy Reporting
```

### `rel-mind-map`
Central node with branches and sub-items.

| Field | Type | Notes |
|-------|------|-------|
| `center` | string | Center node text |
| `branches` | object[] | Each: `{ title, items }` |

```yaml
- type: rel-mind-map
  title: Cloud Migration Risk Landscape
  center: Migration Risks
  branches:
    - title: Technical
      items:
        - Application incompatibility
        - Data loss during migration
    - title: Security
      items:
        - Misconfigured IAM policies
        - Compliance gaps
```

### `rel-network`
Positioned nodes with edges.

| Field | Type | Notes |
|-------|------|-------|
| `nodes` | object[] | Each: `{ id, title }` |
| `edges` | object[] | Each: `{ from, to }` (referencing node IDs) |

```yaml
- type: rel-network
  title: Application Dependency Map
  nodes:
    - id: tp
      title: Trading Platform
    - id: oms
      title: Order Management
    - id: db
      title: Trading Database
  edges:
    - from: tp
      to: oms
    - from: oms
      to: db
```

---

## Icon-driven

### `icon-grid`
Grid of icon + title + body cards (3, 4, or 6 items).

```yaml
- type: icon-grid
  title: Cloud Service Capabilities
  items:
    - icon: shield
      title: Security
      body: Built-in IAM, KMS, WAF
    - icon: chart
      title: Analytics
      body: Real-time data pipelines
```

### `icon-row`
Horizontal icon + text pairs (vertical stack).

```yaml
- type: icon-row
  title: Migration Guiding Principles
  items:
    - icon: shield
      title: Security First
      body: Every decision evaluated through a security lens.
    - icon: target
      title: Business Outcomes
      body: Migrations prioritized by measurable value.
```

### `icon-stat`
Icon + big number + label.

```yaml
- type: icon-stat
  title: Cloud Readiness Indicators
  items:
    - icon: rocket
      stat: "10x"
      label: Faster Provisioning
    - icon: chart
      stat: "40%"
      label: Cost Reduction
```

---

## Comparison

### `compare-table`
Side-by-side comparison table.

| Field | Type | Notes |
|-------|------|-------|
| `headers` | string[] | Column headers |
| `rows` | array of arrays | Each row's cells |

```yaml
- type: compare-table
  title: Cloud Provider Comparison
  headers: [Capability, AWS, Azure, GCP]
  rows:
    - [Managed Kubernetes, "EKS — Mature", "AKS — Strong", "GKE — Leader"]
    - [Managed Database, "RDS/Aurora", "SQL/CosmosDB", "Cloud SQL/Spanner"]
```

### `compare-versus`
A vs B split (light left / dark right).

| Field | Type | Notes |
|-------|------|-------|
| `left` | object | `{ title, items }` |
| `right` | object | `{ title, items }` |

```yaml
- type: compare-versus
  title: Lift-and-Shift vs. Re-Architecture
  left:
    title: Lift-and-Shift
    items:
      - Fastest time to migrate (weeks)
      - Minimal application changes
      - Lower initial risk
  right:
    title: Re-Architecture
    items:
      - Longer migration timeline (months)
      - Significant code refactoring
      - Higher upfront investment
```

### `compare-before-after`
Visual before/after contrast (red / green).

| Field | Type | Notes |
|-------|------|-------|
| `before` | object | `{ title, items, image }` |
| `after` | object | `{ title, items, image }` |

```yaml
- type: compare-before-after
  title: Developer Experience Transformation
  before:
    title: Before (Legacy)
    items:
      - Submit ticket to provision a VM — wait 6 weeks
      - Manual SSH configuration
  after:
    title: After (Cloud-Native)
    items:
      - Self-service infrastructure via Terraform — 10 minutes
      - GitOps-driven configuration
```

### `compare-pros-cons`
Green / red columns.

| Field | Type | Notes |
|-------|------|-------|
| `pros` | string[] | Positive items |
| `cons` | string[] | Negative items |

```yaml
- type: compare-pros-cons
  title: Multi-Cloud Strategy Assessment
  pros:
    - Avoid vendor lock-in
    - Best-of-breed services per provider
    - Regulatory compliance flexibility
  cons:
    - Increased operational complexity
    - Engineers need cross-cloud skills
    - Data transfer costs between clouds
```

### `compare-scale`
Spectrum bar with markers.

| Field | Type | Notes |
|-------|------|-------|
| `low_label` | string | Left axis label |
| `high_label` | string | Right axis label |
| `items` | object[] | Each: `{ label, value }` (value 0–100) |

```yaml
- type: compare-scale
  title: Cloud Adoption Maturity by Department
  low_label: Manual / Reactive
  high_label: Automated / Proactive
  items:
    - label: Engineering
      value: 78
    - label: Operations
      value: 52
    - label: Finance
      value: 28
```

---

## Data

### `table`
Standard data table.

| Field | Type | Notes |
|-------|------|-------|
| `headers` | string[] | Column headers |
| `rows` | array of arrays | Row cells |

```yaml
- type: table
  title: Wave 1 Application Inventory
  headers: [App Name, Owner, Strategy, Effort]
  rows:
    - [Customer Portal, Digital Team, Replatform, M]
    - [Marketing Site, Marketing, Replace (SaaS), S]
```

### `chart-placeholder`
Reserved space for an external chart image.

| Field | Type | Notes |
|-------|------|-------|
| `image` | string | Chart image URL |
| `caption` | string | Caption below |
| `description` | string | (Optional) Body text |

```yaml
- type: chart-placeholder
  title: 3-Year TCO Projection
  image: ./assets/charts/tco-projection.png
  caption: Cumulative cost savings vs current state
```

### `scorecard`
RAG (red/amber/green) status indicators per metric.

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ metric, value, status, target }` — status: `red` / `yellow` / `green` |

```yaml
- type: scorecard
  title: Migration Program Health
  items:
    - metric: Schedule Adherence
      value: "On Track"
      status: green
      target: 100% milestones met
    - metric: Budget Variance
      value: "+3.2%"
      status: yellow
      target: ±5%
```

### `maturity-model`
Levels 1–5 with current level marker.

| Field | Type | Notes |
|-------|------|-------|
| `levels` | object[] | Each: `{ title, body }` |
| `current` | int | 1-based index of current level |

```yaml
- type: maturity-model
  title: Cloud Maturity Roadmap
  current: 2
  levels:
    - title: "Level 1: Ad-hoc"
      body: Manual processes, no automation.
    - title: "Level 2: Foundational"
      body: Basic IaC, initial CI/CD.
    - title: "Level 3: Scalable"
      body: Self-service platforms.
    - title: "Level 4: Optimized"
      body: Full GitOps, AI-driven.
    - title: "Level 5: Innovating"
      body: Cloud-native by default.
```

---

## Commercial

### `pricing`
Pricing tier cards. Highlight one with `highlighted: true`.

| Field | Type | Notes |
|-------|------|-------|
| `tiers` | object[] | Each: `{ name, price, period, features, highlighted }` |

```yaml
- type: pricing
  title: Engagement Options
  tiers:
    - name: Assessment Only
      price: "$180,000"
      period: One-time
      features:
        - Full application portfolio assessment
        - Cloud readiness scoring
    - name: Assessment + Migration
      price: "$2.4M"
      period: 18-month program
      highlighted: true
      features:
        - Everything in Assessment
        - Hands-on migration execution
```

### `tco`
Total cost of ownership comparison table.

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ category, current, proposed }` |
| `total_current` | string | Bottom row totals |
| `total_proposed` | string |  |

```yaml
- type: tco
  title: 3-Year TCO Analysis
  items:
    - category: Infrastructure
      current: "$8.2M"
      proposed: "$3.1M"
    - category: Operations
      current: "$4.5M"
      proposed: "$2.8M"
  total_current: "$21.6M"
  total_proposed: "$13.2M"
```

### `case-study`
Single case study with logo + metrics + quote.

| Field | Type | Notes |
|-------|------|-------|
| `company` | string | Company name |
| `logo` | string | Logo URL |
| `industry` | string | Industry tag |
| `metrics` | object[] | Each: `{ stat, label }` |
| `quote` | string | Testimonial body |
| `author` | string | Quote attribution |

```yaml
- type: case-study
  title: Case Study — Apex Capital Markets
  company: Apex Capital
  industry: Investment Banking
  metrics:
    - stat: "52%"
      label: TCO Reduction
    - stat: "8x"
      label: Deploy Frequency
  quote: Meridian delivered our cloud migration on time and 12% under budget.
  author: Jennifer Walsh, CTO
```

### `case-study-grid`
Multiple mini case studies.

```yaml
- type: case-study-grid
  title: Recent Wins
  cases:
    - company: BankCo
      metric: "45%"
      label: cost reduction
      quote: Game-changing partnership.
    - company: InsureTech Inc
      metric: "12 mo"
      label: full migration
      quote: Best-in-class execution.
```

### `customer-logos`
Trust wall of customer logos.

| Field | Type | Notes |
|-------|------|-------|
| `subtitle` | string | (Optional) Subtitle |
| `logos` | object[] | Each: `{ name, image }` |

```yaml
- type: customer-logos
  title: Trusted by Leading Institutions
  subtitle: 200+ enterprise migrations delivered
  logos:
    - name: Goldman Sachs
      image: ./logos/goldman.svg
    - name: Morgan Stanley
      image: ./logos/morgan.svg
```

### `sla`
SLA commitments + uptime numbers.

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ metric, target, description }` |

```yaml
- type: sla
  title: Service Level Commitments
  items:
    - metric: Availability
      target: "99.99%"
      description: Measured monthly across all production services
    - metric: Incident Response
      target: "<15 min"
      description: P1/P2 incidents acknowledged within 15 minutes
```

---

## Planning

### `timeline-horizontal`
Horizontal timeline with date markers.

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ date, title, body }` |

```yaml
- type: timeline-horizontal
  title: Program Milestones
  items:
    - date: Q3 2026
      title: Foundation
      body: Landing zones deployed.
    - date: Q1 2027
      title: Scale
      body: 25 apps in production.
```

### `timeline-vertical`
Vertical timeline with line + dots.

```yaml
- type: timeline-vertical
  title: Key Decision Points
  items:
    - date: May 2026
      title: Board Approval
      body: Formal approval of migration budget.
    - date: June 2026
      title: Vendor Selection
      body: Finalize AWS Enterprise terms.
```

### `gantt`
Simplified project Gantt chart.

| Field | Type | Notes |
|-------|------|-------|
| `labels` | string[] | Period labels (Q3 2026, Q4 2026, etc.) |
| `items` | object[] | Each: `{ task, start, end, color }` — start/end as 0–100 % of timeline |

```yaml
- type: gantt
  title: Program Workstream Schedule
  labels: [Q3 2026, Q4 2026, Q1 2027, Q2 2027, Q3 2027]
  items:
    - task: Assessment & Planning
      start: 0
      end: 25
      color: "#0066FF"
    - task: Wave 1 — Web Apps
      start: 30
      end: 50
      color: "#10B981"
```

### `milestone`
Single milestone highlight with metrics.

| Field | Type | Notes |
|-------|------|-------|
| `date` | string | Milestone date |
| `description` | string | Description |
| `icon` | string | Icon name |
| `metrics` | object[] | Each: `{ stat, label }` |

```yaml
- type: milestone
  title: Wave 1 Go-Live
  date: October 15, 2026
  icon: rocket
  description: First production cutover — 8 customer-facing applications.
  metrics:
    - stat: "8"
      label: Apps Migrated
    - stat: "0"
      label: P1 Incidents
```

---

## People

### `team-grid`
Grid of team member cards.

| Field | Type | Notes |
|-------|------|-------|
| `members` | object[] | Each: `{ name, role, photo, bio }` |

```yaml
- type: team-grid
  title: Pinnacle Steering Committee
  members:
    - name: Robert Hayes
      role: CEO
      photo: https://i.pravatar.cc/300?img=33
      bio: 25 years in financial services.
```

### `org-chart`
Hierarchical org chart (uses `name` instead of `title`).

| Field | Type | Notes |
|-------|------|-------|
| `root` | object | `{ name, role, children: [{ name, role, children }] }` |

```yaml
- type: org-chart
  title: Migration Program Team
  root:
    name: David Park
    role: Program Sponsor (CTO)
    children:
      - name: Sarah Chen
        role: Migration Lead
```

### `raci`
Responsibility assignment matrix.

| Field | Type | Notes |
|-------|------|-------|
| `tasks` | object[] | Each: `{ task, responsible, accountable, consulted, informed }` |

```yaml
- type: raci
  title: Migration Wave RACI Matrix
  tasks:
    - task: Application Assessment
      responsible: App Owner
      accountable: Migration Lead
      consulted: Architecture
      informed: CTO
```

---

## Engagement

### `quote`
Big quote with author + photo.

| Field | Type | Notes |
|-------|------|-------|
| `quote` | string | Quote text |
| `author` | string | Author name |
| `role` | string | (Optional) Author role |
| `photo` | string | (Optional) Author photo URL |

```yaml
- type: quote
  quote: The cloud is not just a technology shift — it is a fundamental reimagining of how we deliver value.
  author: David Park
  role: Chief Technology Officer, Pinnacle Financial Group
  photo: https://i.pravatar.cc/300?img=15
```

### `poll`
Audience poll with multiple choice.

| Field | Type | Notes |
|-------|------|-------|
| `question` | string | Poll question |
| `options` | string[] | Answer options (auto-lettered A, B, C…) |

```yaml
- type: poll
  title: Audience Check-In
  question: What is your biggest concern about this cloud migration?
  options:
    - Security and data protection
    - Business disruption during migration
    - Total cost and ROI timeline
    - Team skills and readiness
```

### `exercise`
Workshop activity instructions.

| Field | Type | Notes |
|-------|------|-------|
| `duration` | string | Time estimate (e.g. "20 min") |
| `instructions` | string | What to do |
| `materials` | string[] | (Optional) Materials needed |

```yaml
- type: exercise
  title: Group Exercise — Risk Mapping
  duration: 20 minutes
  instructions: |
    In your assigned breakout group, identify the top 5 migration
    risks specific to your business unit.
  materials:
    - Sticky notes (provided)
    - Whiteboard markers
```

### `definition`
Term + explanation in dictionary style.

| Field | Type | Notes |
|-------|------|-------|
| `term` | string | The term being defined |
| `definition` | string | The explanation |
| `examples` | string[] | (Optional) Usage examples |
| `etymology` | string | (Optional) Etymology / pronunciation |

```yaml
- type: definition
  title: Key Concept
  term: Landing Zone
  etymology: From AWS terminology, circa 2018
  definition: A pre-configured, secure cloud environment that serves as the starting point for application deployments.
  examples:
    - AWS Control Tower–generated landing zones
    - Azure Enterprise-Scale landing zones
```

### `checklist`
Visual to-do list with checkboxes.

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ text, checked }` — checked: bool |

```yaml
- type: checklist
  title: Wave 1 Go-Live Readiness
  items:
    - text: Landing zone deployed and validated
      checked: true
    - text: Security penetration test passed
      checked: false
```

---

## Closing

### `cta`
Call to action with action items.

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ action, owner, deadline }` |

```yaml
- type: cta
  title: Next Steps
  items:
    - action: Sign master services agreement
      owner: Pinnacle Legal
      deadline: April 30, 2026
    - action: Confirm executive sponsor
      owner: Pinnacle CEO
      deadline: May 7, 2026
```

### `summary`
Numbered key takeaways. CSS auto-numbers.

```yaml
- type: summary
  title: Key Takeaways
  items:
    - Pinnacle's infrastructure is reaching end-of-life with growing risk.
    - A phased multi-cloud migration will reduce TCO by 38–42% over three years.
    - Security and compliance are embedded in every layer.
```

### `thank-you`
Closing slide with contact info.

| Field | Type | Notes |
|-------|------|-------|
| `subtitle` | string | (Optional) Subtitle |
| `contact` | object | `{ email, phone, website, social }` |

```yaml
- type: thank-you
  title: Thank You
  subtitle: We look forward to partnering with you.
  contact:
    email: hello@meridian.example
    phone: +1 (212) 555-0184
    website: www.meridian.example
    social: "@MeridianCloud"
```

### `qna`
Big "Questions?" slide.

```yaml
- type: qna
  title: Questions & Discussion
  subtitle: We've reserved 30 minutes for open discussion.
```

### `appendix`
Section divider for the appendix.

```yaml
- type: appendix
  title: Appendix
  subtitle: Supporting materials and detailed analysis
```

### `references`
Citations and source links. CSS auto-numbers as `[1]`, `[2]`…

| Field | Type | Notes |
|-------|------|-------|
| `items` | object[] | Each: `{ title, url, description }` |

```yaml
- type: references
  title: References & Further Reading
  items:
    - title: AWS Well-Architected Framework
      url: https://docs.aws.amazon.com/wellarchitected/
      description: AWS best practices specifically tailored for financial services.
    - title: NIST Cloud Computing Reference Architecture (SP 500-292)
      url: https://www.nist.gov/publications/nist-cloud-computing-reference-architecture
      description: Federal standard reference architecture for regulated environments.
```

---

## Universal Fields

These work on **any** slide type:

### `notes`
Speaker notes shown only in presenter mode (press `P`).

```yaml
- type: title
  title: Cloud Migration Strategy
  notes: |
    Welcome the audience. Mention this is a board-level
    presentation, not a technical deep-dive.
```

---

## Tips for LLM Generation

1. **Keep it flat.** Don't nest beyond what's documented — the engine won't render unknown nesting.
2. **Match field names exactly.** `body` vs `description` vs `text` matter — check this spec.
3. **Don't add inline numbers** to `agenda`, `flow-numbered`, `summary`, or `references` — the engine adds them automatically.
4. **For `compare-table`**, the first row of `rows` is the data row, not a header. Headers go in the `headers:` field.
5. **For `flow-cycle` / `rel-hub-spoke` / `rel-mind-map` / `rel-network`**: keep `body` text very short (under 50 characters) — these render in compact diagram nodes.
6. **Use built-in icons** by name (see [README](../README.md#built-in-icons)) — don't paste SVG.
7. **`image:` accepts URLs** — Unsplash, Pravatar, or any public image works for prototypes.

---

## Validation

The engine validates at runtime:
- Unknown `type:` → renders a fallback slide showing the data
- Missing required fields → renders gracefully with empty placeholders
- Malformed YAML → shows an error slide with the parser message

For pre-flight CI validation, parse the YAML with any YAML library and check that every slide's `type` is in this spec.
