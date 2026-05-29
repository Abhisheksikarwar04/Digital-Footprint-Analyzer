import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';

export default function BreakdownChart({ breakdown }) {
  const data = Object.entries(breakdown).map(([factor, value]) => ({ factor, value }));
  return (
    <div className="h-80 rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-lg font-semibold">Factor breakdown</h2>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="factor" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
          <Radar dataKey="value" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.35} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
