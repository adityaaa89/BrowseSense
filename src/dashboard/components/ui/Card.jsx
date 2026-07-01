export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-[20px] border border-[#E8ECEF] bg-white p-[24px] shadow-sm flex flex-col ${className}`}>
      {children}
    </div>
  );
}
