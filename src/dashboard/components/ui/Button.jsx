export function Button({ children, variant = 'primary', onClick, className = '' }) {
  const baseStyle = 'inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition shadow-sm';
  const variants = {
    primary: 'bg-[#9FA1FF] text-white hover:bg-[#B5BAFF]',
    secondary: 'border border-[#E8ECEF] bg-white text-[#2F3A44] hover:border-[#9FA1FF]',
    outline: 'border border-[#E8ECEF] bg-transparent text-[#2F3A44] hover:bg-[#F4F7F9]',
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
