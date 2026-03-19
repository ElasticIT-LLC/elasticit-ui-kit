# ElasticIT UI Kit

Published as `@elasticit-llc/ui-kit` — optional React component library for ElasticIT portal apps.

## Components

| Component | Purpose |
|-----------|---------|
| `DataTable` | Sortable, filterable data table |
| `Chart` | Recharts wrapper for line/bar/area charts |
| `KPICard` | Key performance indicator card |
| `StatusBadge` | Colored status indicator |
| `ReportPage` | Full report layout with filters and export |
| `exportCsv()` | CSV export utility |

## Commands

```bash
npm install
npm run build      # Vite library build (ESM + CJS + types)
npm run test       # Run tests
npm publish        # Publish to GitHub Packages
```

## Architecture

- Library — exports React components consumed by apps
- Peer deps: `react`, `react-dom`, `recharts`
- Vite builds to `dist/` in ESM + CJS formats with TypeScript declarations
- Published to GitHub Packages under `@elasticit-llc` scope
