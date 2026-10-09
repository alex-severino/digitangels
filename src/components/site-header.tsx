"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { workCards } from "@/data/work-index";

const NAV_LINKS = [
  { href: "/#projects", label: "Projects", index: "01" },
  { href: "/designwise", label: "Design Education", index: "02" },
  { href: "/#about", label: "About", index: "03" },
  { href: "/#contact", label: "Contact", index: "04" },
] as const;

const SLUG_ALIASES: Record<string, string> = {
  "alex-de-alma": "velvet-horizon",
};

function toTitleCase(value: string) {
  return value.replace(/[^\s:]+/g, (word) => {
    const i = word.search(/[A-Za-zÀ-ÿ]/);
    if (i < 0) return word;
    return (
      word.slice(0, i) +
      word.charAt(i).toUpperCase() +
      word.slice(i + 1).toLowerCase()
    );
  });
}

function pageLabelFromPath(pathname: string) {
  if (pathname === "/terms")
    return { label: "Terms and Conditions", uppercase: true };
  if (pathname === "/privacy")
    return { label: "Privacy Policy", uppercase: true };
  if (pathname === "/digitangels")
    return { label: "Our branding", uppercase: false };

  const match = pathname.match(/^\/projects\/([^/]+)\/?$/);
  if (!match) return null;
  const slug = SLUG_ALIASES[match[1]] ?? match[1];
  const title = workCards.find((card) => card.slug === slug)?.title;
  if (!title) return null;
  return { label: toTitleCase(title), uppercase: false };
}

function scrollToHash(href: string) {
  const id = href.split("#")[1];
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDesignwise = pathname === "/designwise";
  const pageLabel = pageLabelFromPath(pathname);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (open) {
        setHidden(false);
        lastY = y;
        return;
      }
      if (y < 24) {
        setHidden(false);
      } else if (y > lastY + 4) {
        setHidden(true);
      } else if (y < lastY - 4) {
        setHidden(false);
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  if (isDesignwise) return null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#121713]/75 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="relative flex h-[72px] items-center px-5 md:h-[88px] md:px-8">
          <Link
            href="/"
            className="relative z-10 shrink-0"
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
              className="h-[28px] w-auto brightness-0 invert md:h-[40px]"
            />
          </Link>

          {pageLabel ? (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setHidden(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="absolute inset-x-24 truncate text-center text-[13px] font-medium tracking-tight text-[#e4e4e4] md:inset-x-48 md:text-[16px]"
            >
              {pageLabel.label}
            </button>
          ) : null}

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="absolute right-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#cff63a]/50 md:right-8"
          >
            <span className="relative block h-[14px] w-[18px]">
              <span
                className={`absolute left-0 block h-px w-full bg-[#cff63a] transition-all duration-300 ${
                  open ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-px w-full bg-[#e4e4e4] transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-[#cff63a] transition-all duration-300 ${
                  open ? "top-[7px] -rotate-45" : "top-[14px]"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <div className="h-[72px] shrink-0 md:h-[88px]" aria-hidden />

      <div
        className={`fixed inset-0 z-40 bg-[#121713] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <div className="flex h-full flex-col justify-end px-6 pb-16 pt-28 md:px-16">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  setOpen(false);
                  if (isHome && link.href.includes("#")) {
                    event.preventDefault();
                    scrollToHash(link.href);
                  }
                }}
                className="group flex items-baseline gap-5 text-[#e4e4e4] transition-colors hover:text-[#cff63a]"
                style={{
                  transitionDelay: open ? `${60 + i * 50}ms` : "0ms",
                  transform: open ? "none" : "translateY(16px)",
                  opacity: open ? 1 : 0,
                  transitionProperty: "color, transform, opacity",
                  transitionDuration: "700ms",
                }}
              >
                <span className="text-[12px] font-semibold tracking-[0.2em] text-[#cff63a]">
                  {link.index}
                </span>
                <span className="text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-none tracking-[-0.04em]">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-12 flex flex-wrap gap-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#e4e4e4]/50">
            <Link href="/terms" onClick={() => setOpen(false)} className="hover:text-[#cff63a]">
              Terms
            </Link>
            <Link href="/privacy" onClick={() => setOpen(false)} className="hover:text-[#cff63a]">
              Privacy
            </Link>
            <span className="ml-auto">© Digitangels 2026</span>
          </div>
        </div>
      </div>
    </>
  );
}
