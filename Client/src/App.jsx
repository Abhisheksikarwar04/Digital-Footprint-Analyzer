import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results/:scanId" element={<ResultsPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
