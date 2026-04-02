import type { ReactNode } from 'react';

interface ReportPageProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  onExportPDF?: () => void;
  onExportCSV?: () => void;
}

export function ReportPage({ title, description, children, action, onExportPDF, onExportCSV }: ReportPageProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-shell-100">{title}</h1>
          {description && <p className="text-sm text-shell-400 mt-1">{description}</p>}
        </div>
        <div className="flex gap-2 items-center">
          {action}
          {onExportCSV && (
            <button onClick={onExportCSV} className="px-3 py-2 text-sm border border-shell-700 rounded-lg text-shell-300 hover:bg-shell-700/50 transition-colors">
              Export CSV
            </button>
          )}
          {onExportPDF && (
            <button onClick={onExportPDF} className="px-3 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
              Export PDF
            </button>
          )}
        </div>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}
