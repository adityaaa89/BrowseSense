import { Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { SectionHeader } from '../layout/SectionHeader';

export function InsightCard({ analytics }) {
  const insights = (analytics?.insights || []).slice(0, 3);

  return (
    <Card className="h-[420px] flex flex-col">
      <SectionHeader title="Quick Insights" actionLabel="Read More" />
      
      <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-y-auto scrollbar-hide">
        {insights.map((insight, index) => (
          <div 
            key={index} 
            className="flex min-h-[48px] items-center gap-3 rounded-2xl bg-gradient-to-r from-[#F7FAFC] to-white border border-[#E8ECEF] p-3 shadow-sm shrink-0"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#AEE2FF] text-[#9FA1FF]">
              <Sparkles size={14} />
            </div>
            <p className="text-xs font-medium leading-relaxed text-[#2F3A44] flex-1 line-clamp-2">
              {insight}
            </p>
          </div>
        ))}
        {insights.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-xs text-[#6D7B87]">
            Not enough data to generate insights yet.
          </div>
        )}
      </div>
    </Card>
  );
}
