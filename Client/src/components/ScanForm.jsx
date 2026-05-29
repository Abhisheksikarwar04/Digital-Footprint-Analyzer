import { useState } from 'react';

export default function ScanForm({ onSubmit, loading, error }) {
  const [form, setForm] = useState({ email: '', username: '' });

  function handleChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/30 dark:border-slate-800 dark:bg-slate-900 dark:shadow-cyan-950/30">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500" placeholder="user@example.com" />
      </div>
      <div>
        <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Username</label>
        <input id="username" name="username" type="text" value={form.username} onChange={handleChange} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500" placeholder="optional_handle" />
      </div>
      {error ? <p className="text-sm text-red-500 dark:text-red-400">{error}</p> : null}
      <button disabled={loading} className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? 'Analyzing...' : 'Start analysis'}
      </button>
    </form>
  );
}
