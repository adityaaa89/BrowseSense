import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { SectionHeader } from '../layout/SectionHeader';

export function WeeklySummaryCard({ analytics }) {
  const data = analytics?.visitsPerDay || [];
  
  const chartData = data.map((d) => ({
    // Short day name, e.g. "Mon"
    day: new Date(d.day).toLocaleDateString('en-US', { weekday: 'short' }),
    visits: d.value,
  }));

  return (
    <Card className="min-h-[340px]">
      <SectionHeader title="Weekly Summary" subtitle="Total visits over the last 7 days" />
      
      <div className="mt-4 h-[220px] w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8ECEF" />
              <XAxis 
                dataKey="day" 
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
                cursor={{ fill: '#F7FAFC' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid #E8ECEF', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="visits" fill="#9FA1FF" radius={[4, 4, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-[#6D7B87]">
            Not enough data to display weekly summary.
          </div>
        )}
      </div>
    </Card>
  );
}
