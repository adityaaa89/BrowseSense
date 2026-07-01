import { useAnalytics } from '../hooks/useAnalytics';
import { exportAnalytics } from '../utils/exporters';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardSection } from './components/layout/DashboardSection';
import { HeroCard } from './components/cards/HeroCard';
import { ProductivityCard } from './components/cards/ProductivityCard';
import { CategoryCard } from './components/cards/CategoryCard';
import { ActivityCard } from './components/cards/ActivityCard';
import { InsightCard } from './components/cards/InsightCard';
import { TopWebsitesCard } from './components/cards/TopWebsitesCard';
import { TimelineCard } from './components/cards/TimelineCard';
import { WeeklySummaryCard } from './components/cards/WeeklySummaryCard';

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#AEE2FF] text-[#2F3A44]">
      <div className="inline-flex items-center gap-3 rounded-[20px] border border-[#E8ECEF] bg-white px-6 py-5 shadow-sm">
        <div className="h-3 w-3 animate-pulse rounded-full bg-[#9FA1FF]" />
        <span className="text-sm font-semibold">Loading dashboard…</span>
      </div>
    </div>
  );
}

export default function DashboardApp() {
  const { analytics, loading } = useAnalytics();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <DashboardLayout>
      {/* Row 1: Hero and Productivity (70% / 30%) */}
      <DashboardSection className="grid-cols-1 lg:grid-cols-[2.5fr_1fr]" id="overview">
        <HeroCard analytics={analytics} onExport={() => exportAnalytics(analytics)} />
        <ProductivityCard analytics={analytics} />
      </DashboardSection>

      {/* Row 2: Categories, Activity, Insights (1/3 each) */}
      <DashboardSection className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" id="insights">
        <CategoryCard analytics={analytics} />
        <ActivityCard analytics={analytics} />
        <InsightCard analytics={analytics} />
      </DashboardSection>

      {/* Row 3: Top Websites */}
      <DashboardSection className="grid-cols-1" id="reports">
        <TopWebsitesCard analytics={analytics} />
      </DashboardSection>

      {/* Row 4: Timeline */}
      <DashboardSection className="grid-cols-1" id="timeline">
        <TimelineCard analytics={analytics} />
      </DashboardSection>

      {/* Row 5: Weekly Summary */}
      <DashboardSection className="grid-cols-1" id="settings">
        <WeeklySummaryCard analytics={analytics} />
      </DashboardSection>
    </DashboardLayout>
  );
}
