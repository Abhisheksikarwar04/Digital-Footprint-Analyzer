import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import Header from '../components/Header';
import RiskGauge from '../components/RiskGauge';
import BreakdownChart from '../components/BreakdownChart';
import BreachList from '../components/BreachList';
import Recommendations from '../components/Recommendations';
import ProfileList from '../components/ProfileList';
import { fetchDemoToken, getScan } from '../services/api';

export default function ResultsPage() {
  const { scanId } = useParams();
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    let timer;

    async function load() {
      try {
        const token = location.state?.token || await fetchDemoToken();
        const data = await getScan(scanId, token);
        if (!active) return;
        setResult(data);
        if (data.status === 'processing') {
          timer = setTimeout(load, 1500);
        }
      } catch (err) {
        if (!active) return;
        setError(err.response?.data?.message || 'Unable to load result');
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [scanId, location.state]);

  const breakdownRows = useMemo(() => result ? Object.entries(result.breakdown || {}) : [], [result]);

  function exportPdf() {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Digital Footprint Analyzer Report', 14, 20);
    doc.setFontSize(12);
    doc.text(`Risk Score: ${result.riskScore ?? 0}`, 14, 34);
    doc.text(`Risk Level: ${result.riskLevel ?? 'N/A'}`, 14, 42);
    let y = 56;
    breakdownRows.forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 14, y);
      y += 8;
    });
    y += 8;
    (result.recommendations || []).forEach((item) => {
      doc.text(`- ${item}`, 14, y, { maxWidth: 180 });
      y += 12;
    });
    doc.save(`dfa-${scanId}.pdf`);
  }

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        {loading ? <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">Analyzing footprint...</div> : null}
        {error ? <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-red-700 dark:text-red-300">{error}</div> : null}
        {result ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Scan status</p>
                <h2 className="mt-2 text-3xl font-black capitalize text-slate-900 dark:text-white">{result.status}</h2>
              </div>
              <button onClick={exportPdf} className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-cyan-500 dark:border-slate-700 dark:text-slate-200">Export PDF</button>
            </div>

            {result.status === 'completed' ? (
              <>
                <div className="grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
                  <RiskGauge score={result.riskScore} level={result.riskLevel} />
                  <BreakdownChart breakdown={result.breakdown} />
                </div>
                <section className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Breakdown values</h3>
                  <div className="grid gap-4 md:grid-cols-5">
                    {breakdownRows.map(([key, value]) => (
                      <div key={key} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-sm uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">{key}</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Breaches</h3>
                  <BreachList breaches={result.breaches || []} />
                </section>
                <section className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Public profiles</h3>
                  <ProfileList profiles={result.profiles || []} />
                </section>
                <section className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Recommendations</h3>
                  <Recommendations recommendations={result.recommendations || []} />
                </section>
              </>
            ) : null}
          </>
        ) : null}
      </main>
    </div>
  );
}
