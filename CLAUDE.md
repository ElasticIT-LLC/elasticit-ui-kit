# ElasticIT UI Kit

Published as `@elasticit-llc/ui-kit` v0.4.0 — optional React component library for ElasticIT portal apps. All components use `shell-*` and `brand-*` Tailwind tokens for consistent dark theme styling across client portals.

## Components

| Component | Purpose |
|-----------|---------|
| `KPICard` | Key performance indicator card with icon, value, detail, trend, and valueColor props |
| `DataTable` | Sortable, filterable, paginated data table with alternating rows and hover states |
| `StatusBadge` | Colored status badge (success, warning, error, danger, info, default variants) |
| `Chart` | Recharts wrapper for bar/line/area/pie charts with dark-themed tooltips |
| `ReportPage` | Report layout with title, description, action slot, and export buttons |
| `CardContainer` | Dark-themed card wrapper with optional title, description, and action slot |
| `EmptyState` | Empty data state with icon, title, description, and optional CTA |
| `PageHeader` | Page title with description, brand accent line, and action slot |
| `Skeleton` / `LoadingSkeleton` | Animated loading placeholders (table, card, text variants) |
| `exportCsv()` | CSV export utility function |

## Design Token Contract

Components use these Tailwind tokens defined by the host client shell's `@theme`:
- `shell-50` through `shell-950` — neutral surface/text scale (dark theme)
- `brand-50` through `brand-900` — client accent color (varies per client)

Components work across all client shells without modification.

## Commands

```bash
npm install
npm run build      # Vite library build (ESM + CJS + types)
npm run test       # Run tests
npm publish        # Publish to GitHub Packages
```

## Architecture

- Library — exports React components consumed by apps and the shell
- Peer deps: `react`, `react-dom`, `recharts`
- Vite builds to `dist/` in ESM + CJS formats with TypeScript declarations
- Published to GitHub Packages under `@elasticit-llc` scope
- Client shells add `@source` directive for ui-kit dist to enable Tailwind class scanning
