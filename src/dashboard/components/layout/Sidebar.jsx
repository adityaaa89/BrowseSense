import { Home, Sparkles, ListChecks, LayoutGrid, Grid, Zap, User } from 'lucide-react';

const navigationItems = [
  { label: 'Overview', icon: Home },
  { label: 'Insights', icon: Sparkles },
  { label: 'Timeline', icon: ListChecks },
  { label: 'Reports', icon: LayoutGrid },
  { label: 'Settings', icon: Grid },
];

export function Sidebar() {
  return (
    <aside className="fixed left-6 top-8 bottom-8 hidden w-[260px] flex-col rounded-[24px] border border-[#E8ECEF] bg-white p-6 shadow-soft lg:flex overflow-y-auto">
      <div className="mb-8 flex items-center gap-3 shrink-0">
        <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-[#9FA1FF] text-white">
          <Zap size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#2F3A44]">BrowseSense</p>
          <p className="text-xs text-[#6D7B87]">Browser analytics</p>
        </div>
      </div>
      
      <nav className="space-y-2 flex-1">
        {navigationItems.map((item) => (
          <button 
            key={item.label} 
            onClick={() => {
              const id = item.label.toLowerCase();
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-left text-sm font-semibold text-[#6D7B87] transition hover:bg-[#F4F7F9] hover:text-[#2F3A44]"
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-8 shrink-0 rounded-[20px] bg-[#F5FAFD] p-4 text-sm text-[#2F3A44]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#9FA1FF] text-white">
            <User size={16} />
          </div>
          <div>
            <p className="font-semibold text-sm">Aditya</p>
            <p className="text-xs text-[#6D7B87]">Offline insights</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
