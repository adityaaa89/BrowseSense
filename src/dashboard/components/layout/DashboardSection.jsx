export function DashboardSection({ children, className = '', ...props }) {
  return (
    <section className={`grid gap-[24px] ${className}`} {...props}>
      {children}
    </section>
  );
}
