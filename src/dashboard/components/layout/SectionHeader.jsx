export function SectionHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4 shrink-0">
      <div>
        <h2 className="text-sm font-semibold text-[#2F3A44]">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-[#6D7B87]">{subtitle}</p>}
      </div>
      {actionLabel && (
        <button 
          className="text-sm font-semibold text-[#9FA1FF] transition hover:text-[#B5BAFF]"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
