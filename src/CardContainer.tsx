import type { ReactNode } from 'react';

interface CardContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  padding?: boolean;
}

export function CardContainer({ children, title, description, action, className = '', padding = true }: CardContainerProps) {
  return (
    <div className={`rounded-xl border border-shell-700 bg-shell-800 ${padding ? 'p-6' : ''} ${className}`}>
      {(title || action) && (
        <div className={`flex items-center justify-between ${padding ? 'mb-4' : 'px-6 pt-5 pb-3'} ${!title && action ? 'justify-end' : ''}`}>
          {title && (
            <div>
              <h3 className="text-sm font-semibold text-shell-100">{title}</h3>
              {description && <p className="text-xs text-shell-400 mt-0.5">{description}</p>}
            </div>
          )}
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
