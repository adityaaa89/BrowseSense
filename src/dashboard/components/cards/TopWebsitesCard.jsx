import { Card } from '../ui/Card';
import { SectionHeader } from '../layout/SectionHeader';

export function TopWebsitesCard({ analytics }) {
  const topSites = (analytics?.top10Websites || []).slice(0, 5);
  const maxVisits = topSites.length > 0 ? Math.max(...topSites.map((s) => s.value)) : 1;

  return (
    <Card>
      <SectionHeader title="Top Websites" actionLabel="View All" />
      
      <div className="grid gap-4 mt-2">
        {topSites.map((site) => {
          const percentage = Math.round((site.value / maxVisits) * 100);
          const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(site.name)}&sz=64`;
          
          return (
            <div key={site.name} className="flex items-center gap-4 text-sm">
              <div
                className="h-6 w-6 shrink-0 rounded border border-[#E8ECEF] bg-[#F7FAFC] bg-center bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(${faviconUrl})` }}
              />
              <div className="w-[140px] shrink-0 font-medium text-[#2F3A44] truncate">
                {site.name}
              </div>
              <div className="flex-1">
                <div className="h-2 w-full rounded-full bg-[#AEE2FF] overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-[#9FA1FF] transition-all duration-500" 
                    style={{ width: `${percentage}%` }} 
                  />
                </div>
              </div>
              <div className="w-16 shrink-0 text-right font-medium text-[#6D7B87]">
                {site.value} visits
              </div>
            </div>
          );
        })}
        {topSites.length === 0 && (
          <p className="text-sm text-[#6D7B87] py-4 text-center">No data available.</p>
        )}
      </div>
    </Card>
  );
}
