import { useState, useMemo } from 'react';

export interface Column<T> {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  onExportCSV?: () => void;
  pageSize?: number;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchable = false,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No data',
  onExportCSV,
  pageSize = 25,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (!search) return data;
    const lower = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => String(row[col.key]).toLowerCase().includes(lower))
    );
  }, [data, search, columns]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = String(a[sortKey as keyof T] ?? '');
      const bVal = String(b[sortKey as keyof T] ?? '');
      const cmp = aVal.localeCompare(bVal);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="w-full">
      {(searchable || onExportCSV) && (
        <div className="flex justify-between items-center mb-4 gap-4">
          {searchable && (
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="px-3 py-2 border border-shell-700 rounded-lg bg-shell-800 text-shell-100 placeholder-shell-500 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          )}
          {onExportCSV && (
            <button onClick={onExportCSV} className="px-3 py-2 text-sm rounded-lg bg-shell-700 text-shell-200 hover:bg-shell-600 transition-colors">
              Export CSV
            </button>
          )}
        </div>
      )}

      <div className="overflow-x-auto border border-shell-700 rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-shell-700 bg-shell-750">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={col.sortable !== false ? () => handleSort(col.key) : undefined}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-shell-300 ${col.sortable !== false ? 'cursor-pointer hover:text-shell-100' : ''}`}
                >
                  {col.header}
                  {sortKey === col.key && (sortDir === 'asc' ? ' \u2191' : ' \u2193')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-shell-700/50">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-shell-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr key={i} className="even:bg-shell-900/30 hover:bg-shell-700/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-shell-200">
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-shell-400">
          <span>{sorted.length} results</span>
          <div className="flex gap-2">
            <button disabled={page === 0} onClick={() => setPage(page - 1)} className="px-3 py-1 border border-shell-700 rounded-lg disabled:opacity-50 text-shell-300 hover:bg-shell-700/50 transition-colors">Previous</button>
            <span className="px-3 py-1 text-shell-300">Page {page + 1} of {totalPages}</span>
            <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} className="px-3 py-1 border border-shell-700 rounded-lg disabled:opacity-50 text-shell-300 hover:bg-shell-700/50 transition-colors">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
