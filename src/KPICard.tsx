interface KPICardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
}

export function KPICard({ label, value, trend, trendDirection = 'neutral' }: KPICardProps) {
  const trendColor = {
    up: 'text-green-600 dark:text-green-400',
    down: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-500 dark:text-gray-400',
  }[trendDirection];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-5">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        {trend && <span className={`text-sm font-medium ${trendColor}`}>{trend}</span>}
      </div>
    </div>
  );
}
