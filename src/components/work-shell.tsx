"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { workFilters, type WorkFilter } from "@/data/work-index";

export function WorkFilterNav({ active }: { active: WorkFilter }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <nav className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-5 md:gap-x-8">
      {workFilters.map((filter) => {
        const isActive = filter.id === active;
        return (
          <Link
            key={filter.id}
            href={filter.href}
            className="group relative pb-1 text-[16px] tracking-[0.02em] text-black md:text-[20px]"
          >
            {filter.label}
            <span
              aria-hidden
              className={`absolute bottom-0 left-0 h-[1.5px] w-full origin-left bg-black transition-transform duration-500 ease-out ${
                isActive && ready
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}

export function WorkShell({
  active,
  children,
  sectionIntro,
  tags,
  links,
}: {
  active: WorkFilter;
  children: React.ReactNode;
  sectionIntro?: string;
  tags?: string[];
  links?: Array<{ label: string; href: string }>;
}) {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-12 md:px-[75px] md:pt-16">
        <h1 className="mb-10 text-center text-[40px] font-normal leading-none tracking-tight text-black md:mb-12 md:text-[64px]">
          Projects
        </h1>

        <WorkFilterNav active={active} />

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
