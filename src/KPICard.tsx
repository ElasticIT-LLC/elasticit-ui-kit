import type { ReactNode } from 'react';

interface KPICardProps {
  label: string;
  value: string | number;
  detail?: string;
  icon?: ReactNode;
  valueColor?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
}

export function KPICard({ label, value, detail, icon, valueColor, trend, trendDirection = 'neutral' }: KPICardProps) {
  const trendColor = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-shell-400',
  }[trendDirection];

  return (
    <div className="rounded-xl border border-shell-700 bg-shell-800 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-shell-400 uppercase tracking-wider">{label}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className={`text-2xl font-bold ${valueColor || 'text-shell-100'}`}>{value}</p>
            {trend && <span className={`text-sm font-medium ${trendColor}`}>{trend}</span>}
          </div>
          {detail && <p className="text-xs text-shell-400 mt-1">{detail}</p>}
        </div>
        {icon && (
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-shell-700/50 text-shell-300 flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
