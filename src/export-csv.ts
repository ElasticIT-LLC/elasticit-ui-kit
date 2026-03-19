export function exportCsv<T extends Record<string, unknown>>(
  data: T[],
  columns: { key: keyof T & string; header: string }[],
  filename = 'export.csv'
): void {
  const header = columns.map((c) => c.header).join(',');
  const rows = data.map((row) =>
    columns.map((c) => {
      const val = String(row[c.key] ?? '');
      return val.includes(',') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
    }).join(',')
  );

  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
