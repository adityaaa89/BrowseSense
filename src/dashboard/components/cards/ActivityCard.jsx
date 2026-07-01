import { useState } from 'react';
import { Card } from '../ui/Card';
import { SectionHeader } from '../layout/SectionHeader';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';

export function ActivityCard({ analytics }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recentVisits = (analytics?.recentActivity || []).slice(0, 6);

  // Filter today's visits for the modal
  const todayVisits = (analytics?.classifiedVisits || []).filter((visit) => {
    const now = new Date();
    const target = new Date(visit.timestamp);
    return now.toDateString() === target.toDateString();
  });

  return (
    <>
      <Card className="h-[420px] flex flex-col">
        <SectionHeader 
          title="Recent Activity" 
          actionLabel="View All" 
          onAction={() => setIsModalOpen(true)}
        />
        
        <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
          {recentVisits.map((visit, index) => {
            const domain = visit.domain || visit.url;
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
            
            return (
              <div key={`${visit.id}-${index}`} className="flex items-center gap-3 rounded-2xl bg-[#F7FAFC] p-3">
                <div
                  className="h-8 w-8 shrink-0 rounded-xl border border-[#E8ECEF] bg-white p-1 bg-center bg-no-repeat bg-contain"
                  style={{ backgroundImage: `url(${faviconUrl})` }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-[#2F3A44]" title={visit.title}>
                    {visit.title || 'Untitled'}
                  </p>
                  <p className="truncate text-[10px] text-[#6D7B87] mt-0.5" title={domain}>
                    {domain}
                  </p>
                </div>
                <div className="shrink-0 hidden sm:block">
                  <Badge category={visit.category} />
                </div>
                <div className="shrink-0 text-[10px] font-medium text-[#6D7B87] text-right ml-2">
                  {visit.displayTime || new Date(visit.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Today's History">
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 scrollbar-hide">
          {todayVisits.length > 0 ? (
            todayVisits.map((visit, index) => {
              const domain = visit.domain || visit.url;
              const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
              
              return (
                <div key={`modal-${visit.id}-${index}`} className="flex items-center gap-3 rounded-2xl bg-[#F7FAFC] p-3">
                  <div
                    className="h-8 w-8 shrink-0 rounded-xl border border-[#E8ECEF] bg-white p-1 bg-center bg-no-repeat bg-contain"
                    style={{ backgroundImage: `url(${faviconUrl})` }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#2F3A44]" title={visit.title}>
                      {visit.title || 'Untitled'}
                    </p>
                    <p className="truncate text-[10px] text-[#6D7B87] mt-0.5" title={domain}>
                      {domain}
                    </p>
                  </div>
                  <div className="shrink-0 hidden sm:block">
                    <Badge category={visit.category} />
                  </div>
                  <div className="shrink-0 text-[10px] font-medium text-[#6D7B87] text-right ml-2">
                    {visit.displayTime || new Date(visit.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-center text-[#6D7B87] py-4">No activity recorded today.</p>
          )}
        </div>
      </Modal>
    </>
  );
}
