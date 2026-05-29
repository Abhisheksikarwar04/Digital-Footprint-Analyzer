export default function Recommendations({ recommendations }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {recommendations.map((item) => (
        <article key={item} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="mb-2 text-base font-semibold text-cyan-300">Recommended action</h3>
          <p className="text-sm leading-6 text-slate-300">{item}</p>
        </article>
      ))}
    </div>
  );
}
