"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { LondonTime, Scramble } from "@/components/chrome/fx";

const NAV_LINKS = [
  { href: "/#projects", label: "Work", index: "01" },
  { href: "/designwise", label: "Design education", index: "02" },
  { href: "/digitangels", label: "Our branding", index: "03" },
  { href: "/#about", label: "About", index: "04" },
  { href: "/#contact", label: "Contact", index: "05" },
] as const;

const MENU_LINKS = [
  { href: "/#projects", label: "Projects", index: "01" },
  { href: "/designwise", label: "Design Education", index: "02" },
  { href: "/digitangels", label: "Our Branding", index: "03" },
  { href: "/#about", label: "About", index: "04" },
  { href: "/#contact", label: "Contact", index: "05" },
] as const;

function scrollToHash(href: string) {
  const id = href.split("#")[1];
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  // The overlay menu only exists below md; close it if the viewport grows.
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (pathname.startsWith("/designwise")) return null;

  const onNav = (href: string) => (event: React.MouseEvent) => {
    setOpen(false);
    if (isHome && href.startsWith("/#")) {
      event.preventDefault();
      scrollToHash(href);
    }
  };

  return (
    <>
      <header className="dt-header fixed inset-x-0 top-0 z-[60] text-white mix-blend-difference">
        <div className="flex h-[72px] items-center justify-between gap-6 px-4 md:h-[88px] md:px-8">
          <Link
            href="/"
            aria-label="Digitangels home"
            className="relative shrink-0"
            onClick={(event) => {
              setOpen(false);
              if (!isHome) return;
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Image
              src="/designwise/images/digitangels-wordmark.png"
              alt="Digitangels"
              width={640}
              height={133}
              priority
              className="h-[24px] w-auto brightness-0 invert md:h-[32px]"
            />
          </Link>

          <p className="hidden font-mono text-[11px] uppercase tracking-[0.22em] lg:block">
            London <LondonTime />
          </p>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.22em] md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onNav(link.href)}
                  className="dt-underline"
                >
                  <Scramble text={link.label} />
                </Link>
              ))}
            </nav>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] md:hidden"
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="relative block h-11 w-11 rounded-full border border-white">
                <span
                  className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-white transition-transform duration-500 ${
                    open ? "-translate-y-1/2 rotate-45" : "-translate-y-[4px]"
                  }`}
                />
                <span
                  className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-white transition-transform duration-500 ${
                    open ? "-translate-y-1/2 -rotate-45" : "translate-y-[3px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`dt-menu fixed inset-0 z-50 bg-black text-white ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <div className="dt-menu-ring-bg pointer-events-none absolute right-[-20vmin] top-1/2 -translate-y-1/2">
          <div className="dt-ring dt-ring-flip w-[90vmin]" />
        </div>

        <div className="relative flex h-full flex-col justify-end px-4 pb-10 pt-28 md:px-8">
          <nav className="flex flex-col">
            {MENU_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onNav(link.href)}
                className="dt-menu-link group flex items-baseline gap-4 border-t border-white/15 py-2 md:gap-8"
                style={{ "--i": i } as CSSProperties}
              >
                <span className="w-8 font-mono text-[11px] tracking-[0.2em] text-white/45">
                  {link.index}
                </span>
                <span className="dt-swap text-[clamp(2.6rem,8.4vw,8rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
                  <span>{link.label}</span>
                  <span className="dt-italic dt-chrome-text" aria-hidden>
                    {link.label}
                  </span>
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
            <a href="mailto:hello@digitangels.com" className="hover:text-white">
              hello@digitangels.com
            </a>
            <Link href="/terms" onClick={() => setOpen(false)} className="hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" onClick={() => setOpen(false)} className="hover:text-white">
              Privacy
            </Link>
            <span className="ml-auto">© Digitangels 2026</span>
          </div>
        </div>
      </div>
    </>
  );
}
