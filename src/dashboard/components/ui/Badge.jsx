const categoryBadgeColors = {
  Programming: 'bg-[#E4F0FF] text-[#2563eb]',
  Documentation: 'bg-[#DFF6FA] text-[#06b6d4]',
  Learning: 'bg-[#ECF8E8] text-[#16a34a]',
  AI: 'bg-[#F0E7FF] text-[#8b5cf6]',
  Entertainment: 'bg-[#FFF0E6] text-[#f97316]',
  Social: 'bg-[#FFF2F2] text-[#ef4444]',
  Shopping: 'bg-[#F3F4F6] text-[#64748b]',
  Productivity: 'bg-[#E6FFFA] text-[#0f766e]',
  Other: 'bg-[#F3F4F6] text-[#64748b]',
};

export function Badge({ category, className = '' }) {
  const colorClass = categoryBadgeColors[category] || categoryBadgeColors.Other;
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${colorClass} ${className}`}>
      {category}
    </span>
  );
}
