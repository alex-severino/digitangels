export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white text-black">
      <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <h1 className="mb-10 text-[28px] font-bold tracking-tight md:text-[40px]">
          {title}
        </h1>
        <div className="space-y-6 text-[16px] leading-7 text-black/80 md:text-[18px] md:leading-8">
          {children}
        </div>
      </article>
    </main>
  );
}
