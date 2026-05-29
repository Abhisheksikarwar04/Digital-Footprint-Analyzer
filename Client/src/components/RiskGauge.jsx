const colors = {
  LOW: 'text-risk-low',
  MEDIUM: 'text-risk-medium',
  HIGH: 'text-risk-high'
};

export default function RiskGauge({ score, level }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Risk score</p>
      <div className={`mt-4 text-6xl font-black ${colors[level] || 'text-white'}`}>{score}</div>
      <p className="mt-3 text-lg font-medium text-slate-200">{level}</p>
    </div>
  );
}
