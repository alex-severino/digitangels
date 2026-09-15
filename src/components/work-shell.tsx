export function WorkShell({
  children,
  sectionIntro,
  tags,
  links,
}: {
  children: React.ReactNode;
  sectionIntro?: string;
  tags?: string[];
  links?: Array<{ label: string; href: string }>;
}) {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-8 md:px-[75px] md:pt-10">
        <h1 className="sr-only">Projects</h1>

        {sectionIntro ? (
          <p className="mx-auto mb-6 max-w-[1310px] text-[15px] leading-[1.35] text-black/75 md:text-[16px]">
            {sectionIntro}
          </p>
        ) : null}

        {links && links.length > 0 ? (
          <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] font-semibold tracking-[0.06em] text-black underline-offset-4 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}

        {tags && tags.length > 0 ? (
          <div className="mb-12 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/25 px-3 py-1 text-[11px] font-medium tracking-[0.06em] text-black/70"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {children}
      </section>
    </main>
  );
}
