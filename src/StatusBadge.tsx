const variants: Record<string, string> = {
  success: 'bg-green-900/30 text-green-400 ring-1 ring-inset ring-green-500/20',
  warning: 'bg-yellow-900/30 text-yellow-400 ring-1 ring-inset ring-yellow-500/20',
  error: 'bg-red-900/30 text-red-400 ring-1 ring-inset ring-red-500/20',
  danger: 'bg-red-900/30 text-red-400 ring-1 ring-inset ring-red-500/20',
  info: 'bg-blue-900/30 text-blue-400 ring-1 ring-inset ring-blue-500/20',
  default: 'bg-shell-700 text-shell-300 ring-1 ring-inset ring-shell-600',
  neutral: 'bg-shell-700 text-shell-300 ring-1 ring-inset ring-shell-600',
};

interface StatusBadgeProps {
  status: string;
  variant?: string;
  className?: string;
}

export function StatusBadge({ status, variant = 'neutral', className = '' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.neutral} ${className}`}>
      {status}
    </span>
  );
}
