import { useEffect, useState } from 'react';
import { Activity, BarChart3, RefreshCw, Sparkles } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';

export default function PopupApp() {
  const { analytics, loading, refreshData } = useAnalytics();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (chrome?.runtime?.getURL) {
      // keep popup lightweight and offline-first
    }
  }, []);

  return (
    <div className="w-[360px] bg-slate-950 text-slate-100 p-4 min-h-[360px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-brand-500/20 p-2 text-brand-100">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold">BrowseSense</p>
            <p className="text-xs text-slate-400">Privacy-first insights</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-200 transition hover:border-brand-500"
          disabled={isRefreshing || loading}
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Today</p>
            <p className="mt-1 text-2xl font-semibold">{analytics?.todayVisits ?? 0}</p>
            <p className="text-sm text-slate-400">Today&apos;s visits</p>
          </div>
          <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">
            <Activity size={20} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-800/70 p-3">
            <p className="text-xs text-slate-400">Productivity</p>
            <p className="mt-1 text-lg font-semibold">{analytics?.productivityScore ?? 0}</p>
            <p className="text-xs text-slate-500">{analytics?.productivityScoreDetails?.overallRating ?? 'Poor'}</p>
          </div>
          <div className="rounded-xl bg-slate-800/70 p-3">
            <p className="text-xs text-slate-400">Top category</p>
            <p className="mt-1 text-sm font-semibold">{analytics?.mostVisitedCategory?.name ?? 'None'}</p>
          </div>
        </div>
      </div>

      <a
        href="dashboard.html"
        target="_blank"
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-brand-700"
      >
        <BarChart3 size={16} />
        Open Dashboard
      </a>

      <p className="mt-3 text-center text-xs text-slate-500">Everything stays on this device. No data leaves your browser.</p>
    </div>
  );
}
