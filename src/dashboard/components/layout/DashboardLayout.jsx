import { Sidebar } from './Sidebar';

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#AEE2FF] text-[#2F3A44]">
      {/* Sidebar is fixed on desktop */}
      <Sidebar />
      
      {/* Main Content Area */}
      {/* On desktop, add left margin to account for fixed sidebar (260px + 24px gap = 284px) */}
      <main className="mx-auto max-w-[1200px] px-6 py-8 lg:ml-[308px] lg:px-0">
        <div className="flex flex-col gap-[24px]">
          {children}
        </div>
      </main>
    </div>
  );
}
