import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-shell-700/50 text-shell-400 border border-shell-700 mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-shell-100 mb-1">{title}</h3>
      <p className="text-sm text-shell-400 max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
