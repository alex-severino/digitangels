"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { workCards } from "@/data/work-index";

const NAV_LINKS = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
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

  if (pathname === "/digitangels") {
    const title = workCards.find((card) => card.slug === "digitangels")?.title;
    return title
      ? { label: toTitleCase(title), uppercase: false }
      : { label: "Digitangels", uppercase: false };
  }

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-black transition-transform duration-300 ease-out ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="relative flex h-20 items-center justify-start px-5 md:h-[108px] md:px-8">
          <Link
            href="/"
            className="relative z-10 shrink-0"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/digitangels_logo.png"
              alt="Digitangels"
              width={240}
              height={80}
              priority
              className={`w-auto invert md:h-[72px] ${
                isHome ? "h-[30px]" : "h-[24px]"
              }`}
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
              className={`absolute inset-x-16 truncate text-center font-bold tracking-tight text-white sm:inset-x-32 md:inset-x-44 ${
                pageLabel.uppercase
                  ? "text-[16px] uppercase sm:text-[19px] md:text-[24px]"
                  : "text-[13px] sm:text-[15px] md:text-[24px]"
              }`}
            >
              {pageLabel.label}
            </button>
          ) : null}

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="absolute right-5 top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center md:right-8"
          >
            <span className="relative block h-[36px] w-[52px]">
              <span
                className={`absolute left-0 block h-[6px] w-full rounded-none bg-white transition-all duration-300 ease-out ${
                  open ? "top-[15px] rotate-45" : "top-0 rotate-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[15px] block h-[6px] w-full rounded-none bg-white transition-all duration-300 ease-out ${
                  open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[6px] w-full rounded-none bg-white transition-all duration-300 ease-out ${
                  open ? "top-[15px] -rotate-45" : "top-[30px] rotate-0"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <div className="h-20 shrink-0 md:h-[108px]" aria-hidden />

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 bg-black/40"
          onClick={() => setOpen(false)}
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-[min(100%,33.333vw)] min-w-[240px] flex-col bg-black px-8 pb-12 pt-24 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-10 md:pt-28 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-5 md:gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  setOpen(false);
                  if (isHome) {
                    event.preventDefault();
                    scrollToHash(link.href);
                  }
                }}
                className="text-[24px] font-medium uppercase tracking-tight text-white transition-opacity hover:opacity-70 md:text-[32px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-2 pt-10 text-[12px] font-medium tracking-[0.04em] text-white/70 md:text-[13px]">
            <Link
              href="/terms"
              onClick={() => setOpen(false)}
              className="transition-opacity hover:text-white hover:opacity-100"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/privacy"
              onClick={() => setOpen(false)}
              className="transition-opacity hover:text-white hover:opacity-100"
            >
              Privacy Policy
            </Link>
            <p className="mt-3 text-white/50">© Digitangels 2026</p>
          </div>
        </aside>
      </div>
    </>
  );
}
