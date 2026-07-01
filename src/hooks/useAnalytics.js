import { useEffect, useMemo, useState } from 'react';
import { buildAnalytics } from '../utils/analytics.js';
import { loadHistoryFromStorage, refreshHistory } from '../services/historyService.js';

export function useAnalytics() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const stored = await loadHistoryFromStorage();
    setHistory(stored);
    setLoading(false);
  };

  const refreshData = async () => {
    setRefreshing(true);
    const refreshed = await refreshHistory();
    setHistory(refreshed);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const analytics = useMemo(() => buildAnalytics(history), [history]);

  return { analytics, loading, refreshing, refreshData, loadData };
}
