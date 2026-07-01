import { useEffect, useState } from 'react';
import { buildAnalytics } from '../utils/analytics.js';
import { loadHistoryFromStorage, refreshHistory } from '../services/historyService.js';

export function useHistoryAnalytics() {
  const [history, setHistory] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    setIsLoading(true);
    const refreshedHistory = await refreshHistory();
    setHistory(refreshedHistory);
    setAnalytics(buildAnalytics(refreshedHistory));
    setIsLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const storedHistory = await loadHistoryFromStorage();
      if (!isMounted) return;
      setHistory(storedHistory);
      setAnalytics(buildAnalytics(storedHistory));
      setIsLoading(false);
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { history, analytics, isLoading, refresh };
}
