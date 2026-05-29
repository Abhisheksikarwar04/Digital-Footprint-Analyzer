export default function ProfileList({ profiles }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {profiles.map((profile) => (
        <div key={profile.platform} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{profile.platform}</p>
          <p className="mt-2 text-lg font-semibold text-slate-100">{profile.found ? 'Detected' : 'Not found'}</p>
          <p className="mt-2 text-sm text-slate-400">Confidence: {(profile.confidence * 100).toFixed(0)}%</p>
        </div>
      ))}
    </div>
  );
}
