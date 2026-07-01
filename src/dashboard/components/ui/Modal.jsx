import { X } from 'lucide-react';
import { useEffect } from 'react';

export function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg rounded-[24px] border border-[#E8ECEF] bg-white shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between border-b border-[#E8ECEF] px-6 py-4 shrink-0">
          <h2 className="text-lg font-semibold text-[#2F3A44]">{title}</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-[#6D7B87] transition hover:bg-[#F4F7F9] hover:text-[#2F3A44]"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6 flex-1 scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
}
