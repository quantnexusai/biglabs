# Style Guide

Design system and component reference for Biglabs. Built on "The Architect's Blueprint" design philosophy.

## Design Philosophy

**"Complexity, Simplified."**

Biglabs distills the authority and precision of enterprise consulting into a clean, engineered interface. Every element communicates competence, structure, and forward momentum. The design avoids ornamentation in favor of systems thinking — grids, data, and deliberate whitespace convey mastery without excess.

**Core Tenets:**
- **Structural Clarity** — Information architecture mirrors how consultants think: layered, hierarchical, decisive
- **Engineered Precision** — Monospace details and sharp geometry signal technical depth
- **Quiet Authority** — The interface earns trust through restraint, not volume

## Typography

| Element | Font | Tailwind Class | Usage |
|---------|------|---------------|-------|
| Display XL | Inter | `font-sans text-5xl font-bold tracking-tight` | Hero headings |
| Display LG | Inter | `font-sans text-4xl font-bold tracking-tight` | Section headings |
| Display MD | Inter | `font-sans text-3xl font-semibold` | Sub-section headings |
| Display SM | Inter | `font-sans text-2xl font-semibold` | Card headings |
| Display XS | Inter | `font-sans text-xl font-semibold` | Widget headings |
| Body LG | Roboto Mono | `font-mono text-lg` | Lead paragraphs |
| Body | Roboto Mono | `font-mono text-base` | All body copy |
| Body SM | Roboto Mono | `font-mono text-sm` | Descriptions, metadata |
| Body XS | Roboto Mono | `font-mono text-xs` | Captions, timestamps |
| Label | Inter (uppercase) | `font-sans text-xs font-semibold uppercase tracking-widest` | Overlines, categories |

## Colors

### Void (Backgrounds & Anchors)

| Name | Tailwind | Hex | Usage |
|------|----------|-----|-------|
| Void | `void` | #0A0A0F | Primary dark background |
| Void Light | `void-light` | #12121A | Card backgrounds (dark mode) |
| Void Lighter | `void-lighter` | #1A1A25 | Elevated surfaces |

### Horizon (Primary Accent)

| Name | Tailwind | Hex | Usage |
|------|----------|-----|-------|
| Horizon Dark | `horizon-dark` | #1E3A5F | Active/pressed states |
| Horizon | `horizon` | #2563EB | Primary buttons, links, accents |
| Horizon Light | `horizon-light` | #3B82F6 | Hover states, highlights |
| Horizon Subtle | `horizon-subtle` | #DBEAFE | Light backgrounds, badges |

### Warmth (Secondary Accent)

| Name | Tailwind | Hex | Usage |
|------|----------|-----|-------|
| Warmth | `warmth` | #F59E0B | CTAs, warnings, highlights |
| Warmth Dark | `warmth-dark` | #D97706 | Hover states |

### Carbon (Neutral Scale)

| Name | Tailwind | Hex | Usage |
|------|----------|-----|-------|
| Carbon 50 | `carbon-50` | #FAFAFA | Page background (light mode) |
| Carbon 100 | `carbon-100` | #F4F4F5 | Card backgrounds (light mode) |
| Carbon 200 | `carbon-200` | #E4E4E7 | Borders, dividers |
| Carbon 300 | `carbon-300` | #D4D4D8 | Input borders |
| Carbon 400 | `carbon-400` | #A1A1AA | Placeholder text |
| Carbon 500 | `carbon-500` | #71717A | Secondary text |
| Carbon 600 | `carbon-600` | #52525B | Muted text |
| Carbon 700 | `carbon-700` | #3F3F46 | Body text (dark bg) |
| Carbon 800 | `carbon-800` | #27272A | Body text (light bg) |
| Carbon 900 | `carbon-900` | #18181B | Headings |

### Status Colors

| Name | Tailwind | Hex | Usage |
|------|----------|-----|-------|
| Success | `success` | #22C55E | Completed, active |
| Warning | `warning` | #F59E0B | Pending, in progress |
| Error | `error` | #EF4444 | Failed, cancelled |
| Info | `info` | #3B82F6 | Informational |

## Component Classes

### Buttons

- `.btn-primary` — Horizon background, white text (main CTAs)
- `.btn-secondary` — Carbon border, fills to horizon on hover
- `.btn-outline` — Transparent with border, horizon text
- `.btn-ghost` — Text only, subtle hover background
- `.btn-warmth` — Warmth background (highlighted CTAs)
- `.btn-danger` — Error red background (destructive actions)
- `.btn-sm` / `.btn-lg` — Size variants

### Cards

- `.card` — White/void-light background with carbon border
- `.card-hover` — Card with hover border-horizon and shadow
- `.card-stat` — Compact card for metric/KPI display
- `.card-feature` — Service or feature showcase card

### Forms

- `.input` — Text inputs with carbon borders
- `.textarea` — Multi-line text input
- `.select` — Dropdown select
- `.label` — Uppercase tracking label
- `.field-label` — Form field label

### Navigation

- `.nav-link` — Carbon-600 text, horizon on hover
- `.nav-link-active` — Horizon text with bottom border
- `.tab` / `.tab-active` — Tab navigation items
- `.breadcrumb` — Breadcrumb trail with separator

### Badges

- `.badge-horizon` — Blue accent badge
- `.badge-warmth` — Amber accent badge
- `.badge-success` — Green status badge
- `.badge-carbon` — Neutral badge
- `.badge-outline` — Bordered badge variant

### Sections

- `.section` — 96px vertical padding, max-w-7xl centered
- `.section-tight` — 64px vertical padding
- `.section-dark` — Void background with light text
- `.section-alt` — Carbon-50 background (light mode alternation)

### Tables

- `.table` — Full-width data table
- `.table-header` — Carbon-100 header row
- `.table-row` — Alternating row backgrounds
- `.table-cell` — Standard cell padding

### Status Indicators

- `.status-active` — Green dot + "Active" text
- `.status-pending` — Amber dot + "Pending" text
- `.status-completed` — Blue dot + "Completed" text
- `.status-cancelled` — Red dot + "Cancelled" text

## Icons

Using Lucide React. Import individually:

```tsx
import { BarChart3, Briefcase, FileText, Users } from 'lucide-react'
```

Standard sizes:
- `h-4 w-4` — Inline with text, buttons
- `h-5 w-5` — Navigation, form icons
- `h-6 w-6` — Card headers, feature icons
- `h-8 w-8` — Section icons, empty states

## Spacing

Use Tailwind's spacing scale:

- `p-4` / `m-4` — Compact padding (16px)
- `p-6` / `m-6` — Card padding (24px)
- `p-8` / `m-8` — Large card/section padding (32px)
- `gap-4` — Standard grid/flex gaps (16px)
- `gap-6` — Card grid gaps (24px)
- `gap-8` — Section gaps (32px)

## Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm:` | 640px | Mobile landscape |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Large desktop |
| `2xl:` | 1536px | Ultra-wide |

Max content width: `max-w-7xl` (80rem / 1280px)

## Animation Classes

| Name | Class | Description |
|------|-------|-------------|
| Fade Rise | `animate-fade-rise` | Fade in while sliding up 20px |
| Fade In | `animate-fade-in` | Simple opacity transition |
| Slide Left | `animate-slide-left` | Enter from right edge |
| Pulse Subtle | `animate-pulse-subtle` | Gentle pulsing for loading states |
| Scroll Reveal | `.reveal` + `.visible` | Intersection Observer triggered |

**Stagger classes:** `.stagger-1` through `.stagger-5` add incremental transition delays (100ms each).

**Transition defaults:** All interactive elements use `transition-all duration-200 ease-out` for consistent micro-interactions.
