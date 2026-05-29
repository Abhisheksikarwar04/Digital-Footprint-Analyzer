import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ScanForm from '../components/ScanForm';
import { createScan, fetchDemoToken } from '../services/api';

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(form) {
    setLoading(true);
    setError('');
    try {
      const token = await fetchDemoToken();
      const result = await createScan(form, token);
      navigate(`/results/${result.scanId}`, { state: { token } });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to start analysis');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <main className="mx-auto grid min-h-[calc(100vh-81px)] max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <section>
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Threat modeling for personal exposure</span>
          <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-slate-900 dark:text-white">Scan an email and username to quantify breach, exposure, and hygiene risk.</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">DFA runs parallel checks across breach simulation, profile presence, email hygiene, and posture scoring, then returns explainable remediation steps for the end user.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><p className="text-sm text-slate-500 dark:text-slate-400">Weighted engine</p><p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">0-100</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><p className="text-sm text-slate-500 dark:text-slate-400">Async services</p><p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Promise.all</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><p className="text-sm text-slate-500 dark:text-slate-400">Security</p><p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Helmet + TTL</p></div>
          </div>
        </section>
        <ScanForm onSubmit={handleSubmit} loading={loading} error={error} />
      </main>
    </div>
  );
}
