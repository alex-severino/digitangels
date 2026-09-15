"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const hideMenu = pathname === "/";
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (hideMenu) setOpen(false);
  }, [hideMenu]);

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
        <div className="relative flex h-16 items-center justify-center px-5 md:h-[72px] md:px-8">
          <Link href="/" className="relative z-10" onClick={() => setOpen(false)}>
            <Image
              src="/images/digitangels_logo.png"
              alt="Digitangels"
              width={240}
              height={80}
              priority
              className="h-8 w-auto invert md:h-10"
            />
          </Link>

          <button
            type="button"
            tabIndex={hideMenu ? -1 : undefined}
            aria-hidden={hideMenu}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => {
              if (hideMenu) return;
              setOpen((v) => !v);
            }}
            className={`absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center md:right-8 ${
              hideMenu ? "invisible pointer-events-none" : ""
            }`}
          >
            <span className="relative block h-[18px] w-[26px]">
              <span
                className={`absolute left-0 block h-[3px] w-full rounded-none bg-white transition-all duration-300 ease-out ${
                  open ? "top-[7.5px] rotate-45" : "top-0 rotate-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7.5px] block h-[3px] w-full rounded-none bg-white transition-all duration-300 ease-out ${
                  open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[3px] w-full rounded-none bg-white transition-all duration-300 ease-out ${
                  open ? "top-[7.5px] -rotate-45" : "top-[15px] rotate-0"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <div className="h-16 shrink-0 md:h-[72px]" aria-hidden />

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
                onClick={() => setOpen(false)}
                className="text-[24px] font-medium tracking-tight text-white transition-opacity hover:opacity-70 md:text-[32px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
