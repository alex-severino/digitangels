export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#121713] text-[#e4e4e4]">
      <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <div className="dt-draw mb-8 h-px w-24 bg-[#cff63a]" />
        <h1 className="mb-10 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.04em]">
          {title}
        </h1>
        <div className="space-y-6 text-[16px] leading-7 text-[#e4e4e4]/80 md:text-[18px] md:leading-8">
          {children}
        </div>
      </article>
    </main>
  );
}
