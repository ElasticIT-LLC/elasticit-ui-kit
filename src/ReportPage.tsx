import type { ReactNode } from 'react';

interface ReportPageProps {
  title: string;
  description?: string;
  children: ReactNode;
  onExportPDF?: () => void;
  onExportCSV?: () => void;
}

export function ReportPage({ title, description, children, onExportPDF, onExportCSV }: ReportPageProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
          {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
        </div>
        <div className="flex gap-2">
          {onExportCSV && (
            <button onClick={onExportCSV} className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
              Export CSV
            </button>
          )}
          {onExportPDF && (
            <button onClick={onExportPDF} className="px-3 py-2 text-sm bg-brand-600 text-white rounded-md hover:bg-brand-700">
              Export PDF
            </button>
          )}
        </div>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}
