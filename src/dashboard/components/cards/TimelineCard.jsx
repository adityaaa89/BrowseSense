import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { SectionHeader } from '../layout/SectionHeader';

export function TimelineCard({ analytics }) {
  const data = analytics?.visitsPerHour || [];
  
  // Format data for chart display
  const chartData = data.map((d) => ({
    time: `${d.hour}:00`,
    visits: d.value,
  }));

  return (
    <Card className="min-h-[340px]">
      <SectionHeader title="Daily Timeline" subtitle="Visits per hour" />
      
      <div className="mt-4 h-[220px] w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9FA1FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9FA1FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8ECEF" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6D7B87', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6D7B87', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #E8ECEF', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="visits" 
                stroke="#9FA1FF" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorVisits)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-[#6D7B87]">
            Not enough data to display timeline.
          </div>
        )}
      </div>
    </Card>
  );
}
