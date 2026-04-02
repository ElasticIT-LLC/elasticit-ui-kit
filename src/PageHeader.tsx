import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
      <div>
        <h1 className="text-2xl font-bold text-shell-100">{title}</h1>
        {description && <p className="text-sm text-shell-400 mt-1">{description}</p>}
        <div className="h-px w-12 bg-brand-500/60 mt-3" />
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
