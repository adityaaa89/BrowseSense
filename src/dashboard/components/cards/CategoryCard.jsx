import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '../ui/Card';
import { SectionHeader } from '../layout/SectionHeader';
import { CATEGORY_COLORS } from '../../../constants/categories';
import { Modal } from '../ui/Modal';

export function CategoryCard({ analytics }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allData = analytics?.categoryDistribution || [];
  const data = allData.slice(0, 5);
  const total = allData.reduce((sum, item) => sum + item.value, 0) || 1;

  return (
    <>
      <Card className="h-[420px] flex flex-col">
        <SectionHeader 
          title="Top Categories" 
          actionLabel="View More" 
          onAction={() => setIsModalOpen(true)}
        />
        
        <div className="flex-1 min-h-0 flex flex-col items-center">
          <div className="h-[140px] w-full shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={data} 
                  dataKey="value" 
                  nameKey="name" 
                  innerRadius={45} 
                  outerRadius={65} 
                  paddingAngle={4}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#64748b'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 w-full flex-1 min-h-0 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
            {data.map((category) => {
              const percentage = Math.round((category.value / total) * 100);
              return (
                <div key={category.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span 
                        className="inline-block h-2.5 w-2.5 rounded-full" 
                        style={{ backgroundColor: CATEGORY_COLORS[category.name] || '#64748b' }} 
                      />
                      <span className="font-medium text-[#2F3A44] truncate">{category.name}</span>
                    </div>
                    <span className="text-[#6D7B87]">{percentage}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#AEE2FF] overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: CATEGORY_COLORS[category.name] || '#64748b' 
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="All Categories">
        <div className="space-y-4">
          {allData.map((category) => {
            const percentage = Math.round((category.value / total) * 100);
            return (
              <div key={category.name} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span 
                      className="inline-block h-3 w-3 rounded-full" 
                      style={{ backgroundColor: CATEGORY_COLORS[category.name] || '#64748b' }} 
                    />
                    <span className="font-semibold text-[#2F3A44]">{category.name}</span>
                  </div>
                  <span className="font-medium text-[#6D7B87]">{percentage}% ({category.value} visits)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#AEE2FF] overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all" 
                    style={{ 
                      width: `${percentage}%`, 
                      backgroundColor: CATEGORY_COLORS[category.name] || '#64748b' 
                    }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}
