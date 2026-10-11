export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black text-[#e4e4e4]">
      <article className="px-4 pb-24 pt-[120px] md:px-8 md:pt-[150px]">
        <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 md:text-[11px]">
          (Legal) — Digitangels
        </p>
        <h1 className="dt-chrome-text mb-16 max-w-[14ch] text-[clamp(3rem,9vw,9rem)] font-semibold leading-[0.85] tracking-[-0.06em]">
          {title}
        </h1>
        <div className="ml-auto max-w-3xl space-y-6 border-t border-white/15 pt-10 text-[16px] leading-7 text-[#e4e4e4]/80 md:text-[18px] md:leading-8">
          {children}
        </div>
      </article>
    </main>
  );
}
