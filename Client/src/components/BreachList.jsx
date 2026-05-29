export default function BreachList({ breaches }) {
  if (!breaches.length) {
    return <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-300">No breach exposure found in the current simulation.</div>;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-800/80 text-slate-300">
          <tr>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Severity</th>
            <th className="px-4 py-3">Records</th>
            <th className="px-4 py-3">Compromised data</th>
          </tr>
        </thead>
        <tbody>
          {breaches.map((breach) => (
            <tr key={breach.name} className="border-t border-slate-800 text-slate-200">
              <td className="px-4 py-3">{breach.name}</td>
              <td className="px-4 py-3 uppercase">{breach.severity}</td>
              <td className="px-4 py-3">{breach.records.toLocaleString()}</td>
              <td className="px-4 py-3">{breach.compromisedData.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
