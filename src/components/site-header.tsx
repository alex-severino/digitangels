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
  if (pathname === "/designwise") return { label: "Designwise", uppercase: false };

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
  const isDesignwise = pathname === "/designwise";
  const largeMobileHalo =
    isHome || pathname === "/terms" || pathname === "/privacy";
  const pageLabel = isDesignwise ? null : pageLabelFromPath(pathname);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [onLight, setOnLight] = useState(false);

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
    if (!isDesignwise) return;

    const sample = () => {
      const header = document.querySelector("header");
      const y = (header?.getBoundingClientRect().height ?? 80) * 0.5;
      const stack = document.elementsFromPoint(window.innerWidth / 2, y);
      const hit = stack.find((el) => el !== header && !header?.contains(el));
      let node: Element | null = hit ?? null;
      let bg = "";
      while (node && node !== document.documentElement) {
        const color = getComputedStyle(node).backgroundColor;
        if (color && color !== "transparent" && color !== "rgba(0, 0, 0, 0)") {
          bg = color;
          break;
        }
        node = node.parentElement;
      }
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return;
      const luminance =
        (0.2126 * Number(match[1]) +
          0.7152 * Number(match[2]) +
          0.0722 * Number(match[3])) /
        255;
      setOnLight(luminance > 0.55);
    };

    sample();
    window.addEventListener("scroll", sample, { passive: true });
    window.addEventListener("resize", sample);
    return () => {
      window.removeEventListener("scroll", sample);
      window.removeEventListener("resize", sample);
    };
  }, [isDesignwise]);

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
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${
          isDesignwise ? "bg-transparent" : "bg-black"
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="relative flex h-20 items-center justify-start px-5 md:h-[108px] md:px-8">
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
              src="/icon.png"
              alt="Digitangels"
              width={192}
              height={192}
              priority
              className={`w-auto md:hidden ${
                isDesignwise && onLight && !open ? "" : "invert"
              } ${largeMobileHalo ? "h-[47.88px]" : "h-[38.304px]"}`}
            />
            <Image
              src="/images/digitangels_logo.png"
              alt="Digitangels"
              width={240}
              height={80}
              priority
              className={`hidden w-auto md:block md:h-[72px] ${
                isDesignwise && onLight && !open ? "" : "invert"
              }`}
              aria-hidden
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
            className="absolute right-5 top-1/2 z-10 flex h-[45.9px] w-[45.9px] -translate-y-1/2 cursor-pointer items-center justify-center md:right-8 md:h-[51px] md:w-[51px]"
          >
            <span className="relative block h-[25.92px] w-[37.44px] md:h-[28.8px] md:w-[41.6px]">
              <span
                className={`absolute left-0 block h-[4.32px] w-full rounded-none transition-all duration-300 ease-out md:h-[4.8px] ${
                  isDesignwise && onLight && !open ? "bg-black" : "bg-white"
                } ${
                  open
                    ? "top-[10.8px] rotate-45 md:top-[12px]"
                    : "top-0 rotate-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[10.8px] block h-[4.32px] w-full rounded-none transition-all duration-300 ease-out md:top-[12px] md:h-[4.8px] ${
                  isDesignwise && onLight && !open ? "bg-black" : "bg-white"
                } ${open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`}
              />
              <span
                className={`absolute left-0 block h-[4.32px] w-full rounded-none transition-all duration-300 ease-out md:h-[4.8px] ${
                  isDesignwise && onLight && !open ? "bg-black" : "bg-white"
                } ${
                  open
                    ? "top-[10.8px] -rotate-45 md:top-[12px]"
                    : "top-[21.6px] rotate-0 md:top-[24px]"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {isDesignwise ? null : (
        <div className="h-20 shrink-0 bg-black md:h-[108px]" aria-hidden />
      )}

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
                  if (isHome && link.href.includes("#")) {
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
              className="uppercase transition-opacity hover:text-white hover:opacity-100"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/privacy"
              onClick={() => setOpen(false)}
              className="uppercase transition-opacity hover:text-white hover:opacity-100"
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
