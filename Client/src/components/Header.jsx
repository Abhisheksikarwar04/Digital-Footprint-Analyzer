import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { dark, toggleTheme } = useTheme();
  return (
    <header className="border-b border-slate-300 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Digital Footprint Analyzer</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">MERN security intelligence dashboard</p>
        </div>
        <button
          onClick={toggleTheme}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-cyan-500 dark:border-slate-700 dark:text-slate-200"
        >
          {dark ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </header>
  );
}
