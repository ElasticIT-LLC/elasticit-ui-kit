# ElasticIT UI Kit

Published as `@elasticit-llc/ui-kit` v0.4.0 — optional React component library for ElasticIT portal apps. All components use `shell-*` and `brand-*` Tailwind tokens for consistent dark theme styling across client portals.

## Critical Rules

**DO:**
- Use `shell-*` tokens for backgrounds, borders, and text
- Use `brand-*` tokens for accent colors (buttons, links, highlights)
- Keep components stateless where possible — data comes from app hooks
- Use semantic status colors (`green-*`, `yellow-*`, `red-*`, `blue-*`) only for status indicators

**DO NOT:**
- Hardcode hex colors — all colors must come from Tailwind tokens
- Import Supabase, app-bridge, or any shell dependency — this is a pure UI library
- Add animation libraries (Framer Motion, etc.) — keep the bundle light
- Use default Tailwind palette (`gray-*`, `zinc-*`, `slate-*`) — use `shell-*` instead

## Component Reference

### KPICard

Key performance indicator card with optional icon, trend, and detail text.

```tsx
import { KPICard } from '@elasticit-llc/ui-kit'

<KPICard
  label="Total Printers"
  value={142}
  detail="12 offline"
  icon={<PrinterIcon />}
  trend="+8%"
  trendDirection="up"        // 'up' | 'down' | 'neutral'
  valueColor="text-brand-400" // Custom value color class
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | KPI label (uppercase, muted) |
| `value` | `string \| number` | required | Primary display value |
| `detail?` | `string` | — | Secondary detail text below value |
| `icon?` | `ReactNode` | — | Icon in top-right corner (10x10 rounded box) |
| `trend?` | `string` | — | Trend text (e.g., "+8%", "-3%") |
| `trendDirection?` | `'up' \| 'down' \| 'neutral'` | `'neutral'` | Colors trend green/red/muted |
| `valueColor?` | `string` | `'text-shell-100'` | Tailwind class for value color |

### DataTable

Generic sortable, searchable, paginated data table.

```tsx
import { DataTable, type Column } from '@elasticit-llc/ui-kit'

const columns: Column<Printer>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'status', header: 'Status', render: (val) => <StatusBadge status={val} variant={val === 'online' ? 'success' : 'error'} /> },
  { key: 'pages', header: 'Pages', sortable: true },
]

<DataTable
  columns={columns}
  data={printers}
  searchable
  searchPlaceholder="Search printers..."
  emptyMessage="No printers found"
  pageSize={25}
  onExportCSV={() => exportCsv(printers, columns, 'printers.csv')}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `Column<T>[]` | required | Column definitions |
| `data` | `T[]` | required | Array of row data |
| `searchable?` | `boolean` | `false` | Show search input |
| `searchPlaceholder?` | `string` | `'Search...'` | Search input placeholder |
| `emptyMessage?` | `string` | `'No data'` | Message when no rows |
| `pageSize?` | `number` | `25` | Rows per page |
| `onExportCSV?` | `() => void` | — | Show CSV export button |

**Column interface:**
```typescript
interface Column<T> {
  key: keyof T & string    // Data key
  header: string           // Column header text
  sortable?: boolean       // Enable sort on click
  render?: (value: T[keyof T], row: T) => ReactNode  // Custom cell renderer
}
```

### StatusBadge

Colored status pill badge.

```tsx
import { StatusBadge } from '@elasticit-llc/ui-kit'

<StatusBadge status="Connected" variant="success" />
<StatusBadge status="Pending" variant="warning" />
<StatusBadge status="Offline" variant="error" />
<StatusBadge status="N/A" variant="neutral" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `string` | required | Display text |
| `variant?` | `string` | `'neutral'` | Color variant |
| `className?` | `string` | `''` | Additional CSS classes |

**Variants:** `success` (green), `warning` (yellow), `error`/`danger` (red), `info` (blue), `default`/`neutral` (shell-700)

### Chart

Recharts wrapper for bar, line, area, and pie charts with dark theme.

```tsx
import { Chart } from '@elasticit-llc/ui-kit'

<Chart
  type="bar"
  data={monthlyData}
  xKey="month"
  yKey="revenue"
  height={300}
/>

// Multi-series
<Chart
  type="line"
  data={data}
  xKey="date"
  yKey={['actual', 'budget']}
  height={400}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'bar' \| 'line' \| 'area' \| 'pie'` | required | Chart type |
| `data` | `Record<string, unknown>[]` | required | Data array |
| `xKey` | `string` | required | Key for X axis |
| `yKey` | `string \| string[]` | required | Key(s) for Y axis (array for multi-series) |
| `height?` | `number` | `300` | Chart height in px |
| `className?` | `string` | `''` | Additional CSS classes |

Color palette: `['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']`

### ReportPage

Report layout wrapper with title, description, export buttons, and action slot.

```tsx
import { ReportPage } from '@elasticit-llc/ui-kit'

<ReportPage
  title="Fleet Report"
  description="Monthly printer fleet analysis"
  onExportCSV={() => exportCsv(data, columns, 'fleet.csv')}
  onExportPDF={() => generatePdf()}
  action={<DateRangePicker />}
>
  <KPICard ... />
  <DataTable ... />
</ReportPage>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Report title |
| `description?` | `string` | — | Subtitle text |
| `children` | `ReactNode` | required | Report content |
| `action?` | `ReactNode` | — | Right-side action slot (filters, date picker) |
| `onExportCSV?` | `() => void` | — | Show CSV export button |
| `onExportPDF?` | `() => void` | — | Show PDF export button |

### CardContainer

Dark-themed card wrapper with optional header.

```tsx
import { CardContainer } from '@elasticit-llc/ui-kit'

<CardContainer title="Connection Status" action={<RefreshButton />}>
  <ConnectionList />
</CardContainer>

// Without header
<CardContainer padding={false}>
  <DataTable ... />
</CardContainer>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Card content |
| `title?` | `string` | — | Card title |
| `description?` | `string` | — | Subtitle below title |
| `action?` | `ReactNode` | — | Right-side action in header |
| `className?` | `string` | `''` | Additional CSS classes |
| `padding?` | `boolean` | `true` | Apply `p-6` padding |

### EmptyState

Centered empty data state with icon, message, and optional CTA.

```tsx
import { EmptyState } from '@elasticit-llc/ui-kit'

<EmptyState
  icon={<DatabaseIcon className="w-8 h-8" />}
  title="No data available"
  description="Connect QBO entities to generate reports"
  action={<button className="px-4 py-2 bg-brand-600 text-white rounded-lg">Go to Connections</button>}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | required | Large icon (rendered in 16x16 rounded box) |
| `title` | `string` | required | Heading text |
| `description` | `string` | required | Explanatory text (max-w-sm) |
| `action?` | `ReactNode` | — | CTA button or link |

### PageHeader

Page title with brand accent line and optional action slot.

```tsx
import { PageHeader } from '@elasticit-llc/ui-kit'

<PageHeader
  title="Printer Fleet"
  description="Manage and monitor all printers"
  action={<button>Add Printer</button>}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Page title |
| `description?` | `string` | — | Subtitle text |
| `action?` | `ReactNode` | — | Right-side action slot |

### Skeleton / LoadingSkeleton

Animated loading placeholders.

```tsx
import { Skeleton, LoadingSkeleton } from '@elasticit-llc/ui-kit'

// Bare skeleton for custom layouts
<Skeleton className="h-8 w-full" />

// Pre-built variants
<LoadingSkeleton variant="table" rows={6} />
<LoadingSkeleton variant="card" rows={3} />
<LoadingSkeleton variant="text" rows={4} />
```

**Skeleton props:** `className?: string` — applied to the animated pulse box

**LoadingSkeleton props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows?` | `number` | `6` | Number of skeleton rows |
| `variant?` | `'table' \| 'card' \| 'text'` | `'table'` | Layout variant |

Variants: `table` (horizontal bars), `card` (responsive 1-3 column grid of cards), `text` (varying-width lines)

### exportCsv()

CSV export utility function.

```tsx
import { exportCsv } from '@elasticit-llc/ui-kit'

exportCsv(
  data,                                          // T[]
  [{ key: 'name', header: 'Name' }, ...],        // { key, header }[]
  'my-export.csv'                                // filename (default: 'export.csv')
)
```

Handles comma/quote escaping. Creates a Blob, triggers browser download.

## Design Token Contract

Components rely on these CSS custom properties defined by the host client shell's `@theme`:

```
--color-shell-50   through  --color-shell-950   (neutral surface/text scale)
--color-brand-50   through  --color-brand-900   (client accent color)
```

**Shell token usage:**
- `shell-700` — borders, dividers
- `shell-800` — card/surface backgrounds
- `shell-900` — alternating row backgrounds
- `shell-100` — primary text
- `shell-300`/`shell-400` — secondary/muted text

**Brand token usage:**
- `brand-500`/`brand-600` — buttons, accent lines, focus rings
- `brand-900` — subtle brand backgrounds

## Composing Components

```tsx
// Dashboard combining multiple ui-kit components
import { PageHeader, KPICard, DataTable, CardContainer, EmptyState, LoadingSkeleton, exportCsv } from '@elasticit-llc/ui-kit'

function Dashboard() {
  if (isLoading) return <LoadingSkeleton variant="card" rows={6} />

  if (data.length === 0) {
    return <EmptyState icon={<ChartIcon />} title="No data yet" description="Connect a data source to get started" />
  }

  return (
    <>
      <PageHeader title="Dashboard" action={<DatePicker />} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <KPICard label="Revenue" value="$1.2M" trend="+12%" trendDirection="up" />
        <KPICard label="Users" value={4280} trend="-3%" trendDirection="down" />
        <KPICard label="Uptime" value="99.9%" />
      </div>
      <CardContainer title="Recent Activity">
        <DataTable columns={columns} data={data} searchable onExportCSV={() => exportCsv(data, columns)} />
      </CardContainer>
    </>
  )
}
```

## Integration

### For app developers

1. Add `@elasticit-llc/ui-kit` as a dependency in your app's `package.json`
2. Import components: `import { KPICard, DataTable } from '@elasticit-llc/ui-kit'`
3. The client shell's `@source` directive scans ui-kit dist for Tailwind classes

### For client shells

Add this `@source` directive in `src/index.css`:
```css
@source "../node_modules/@elasticit-llc/ui-kit/dist/**/*.js";
```

## Key Files

| File | Purpose |
|------|---------|
| `src/index.ts` | Barrel export (10 components + 1 utility + Column type) |
| `src/KPICard.tsx` | KPI card with trend indicator |
| `src/DataTable.tsx` | Generic sortable/searchable/paginated table |
| `src/StatusBadge.tsx` | Colored status pill (7 variants) |
| `src/Chart.tsx` | Recharts wrapper (bar/line/area/pie) |
| `src/ReportPage.tsx` | Report layout with export buttons |
| `src/CardContainer.tsx` | Dark card wrapper with optional header |
| `src/EmptyState.tsx` | Empty data state with CTA |
| `src/PageHeader.tsx` | Page title with brand accent line |
| `src/LoadingSkeleton.tsx` | Animated loading placeholders (3 variants) |
| `src/export-csv.ts` | CSV export utility |

## Commands

```bash
npm install        # Install dependencies
npm run build      # Vite library build (ESM + CJS + types)
npm run test       # Run vitest tests
npm publish        # Publish to GitHub Packages
```

## Architecture

- **Pure UI library** — no auth, no data fetching, no shell dependencies
- **Peer dependencies**: react, react-dom, recharts
- Components emit Tailwind class strings — the host shell's CSS build generates the actual styles
- Builds to `dist/` in ESM (`index.js`) + CJS (`index.cjs`) with TypeScript declarations
- Published to GitHub Packages under `@elasticit-llc` scope

## AI Tooling

### Active Hooks
- **Pre-commit guard**: Blocks commits with secrets (`.env`, credentials) and TypeScript errors
- **Color token validation** (ui-kit only): Warns about hardcoded colors in TSX files

### Available Commands
- `/audit` — Repo health check (run from elasticit-portal)
- `/publish` — Version bump + build + test + publish (run from elasticit-portal)

### Common Mistakes to Avoid
- Hardcoding hex colors instead of using `shell-*`/`brand-*` tokens
- Putting `react` in `dependencies` instead of `peerDependencies`
- Forgetting to update barrel exports in `src/index.ts` when adding new features
