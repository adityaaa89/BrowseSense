import { Download } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function HeroCard({ analytics, onExport }) {
  return (
    <Card className="justify-between bg-gradient-to-br from-white to-[#F5FAFD]">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9FA1FF]">Today</p>
          <h1 className="mt-2 text-2xl font-semibold text-[#2F3A44] leading-tight">
            Your browser productivity snapshot
          </h1>
          <p className="mt-2 text-sm text-[#6D7B87] max-w-md">
            View your key browsing metrics with a calm, data-focused experience.
          </p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="primary" onClick={onExport} className="py-2.5 px-5">
            <Download size={16} className="mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#E8ECEF] pt-6">
        <div>
          <p className="text-xs font-semibold text-[#6D7B87]">Visits today</p>
          <p className="mt-1 text-2xl font-semibold text-[#2F3A44]">{analytics?.todayVisits ?? 0}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#6D7B87]">Peak hour</p>
          <p className="mt-1 text-2xl font-semibold text-[#2F3A44]">
            {analytics?.mostActiveHour?.hour !== undefined && analytics?.mostActiveHour?.hour !== 'N/A' 
              ? `${analytics.mostActiveHour.hour}:00` 
              : 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#6D7B87]">Productivity</p>
          <p className="mt-1 text-2xl font-semibold text-[#2F3A44]">{analytics?.productivityScore ?? 0}</p>
        </div>
      </div>
    </Card>
  );
}
