import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
const GRID_COLOR = 'rgba(255,255,255,0.06)';
const AXIS_COLOR = 'rgba(255,255,255,0.3)';

interface ChartProps {
  type: 'bar' | 'line' | 'area' | 'pie';
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string | string[];
  height?: number;
  className?: string;
}

export function Chart({ type, data, xKey, yKey, height = 300, className = '' }: ChartProps) {
  const yKeys = Array.isArray(yKey) ? yKey : [yKey];

  return (
    <div className={`rounded-xl border border-shell-700 bg-shell-800 p-4 ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        {type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
            <XAxis dataKey={xKey} stroke={AXIS_COLOR} tick={{ fill: AXIS_COLOR, fontSize: 12 }} />
            <YAxis stroke={AXIS_COLOR} tick={{ fill: AXIS_COLOR, fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: '#2c3540', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#e4e7ea' }} />
            <Legend />
            {yKeys.map((key, i) => (
              <Bar key={key} dataKey={key} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        ) : type === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
            <XAxis dataKey={xKey} stroke={AXIS_COLOR} tick={{ fill: AXIS_COLOR, fontSize: 12 }} />
            <YAxis stroke={AXIS_COLOR} tick={{ fill: AXIS_COLOR, fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: '#2c3540', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#e4e7ea' }} />
            <Legend />
            {yKeys.map((key, i) => (
              <Line key={key} type="monotone" dataKey={key} stroke={COLORS[i % COLORS.length]} strokeWidth={2} />
            ))}
          </LineChart>
        ) : type === 'area' ? (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
            <XAxis dataKey={xKey} stroke={AXIS_COLOR} tick={{ fill: AXIS_COLOR, fontSize: 12 }} />
            <YAxis stroke={AXIS_COLOR} tick={{ fill: AXIS_COLOR, fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: '#2c3540', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#e4e7ea' }} />
            <Legend />
            {yKeys.map((key, i) => (
              <Area key={key} type="monotone" dataKey={key} fill={COLORS[i % COLORS.length]} fillOpacity={0.15} stroke={COLORS[i % COLORS.length]} strokeWidth={2} />
            ))}
          </AreaChart>
        ) : (
          <PieChart>
            <Pie data={data} dataKey={yKeys[0]!} nameKey={xKey} cx="50%" cy="50%" outerRadius={100}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#2c3540', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#e4e7ea' }} />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
