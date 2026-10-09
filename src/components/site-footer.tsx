"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/designwise") return null;

  return (
    <footer className="relative overflow-hidden bg-[#0c100d] px-5 py-14 text-[#e4e4e4] md:px-10">
      <div className="dt-draw mb-10 h-px w-full bg-[#cff63a]" />
      <div className="grid gap-8 md:grid-cols-3 md:items-end">
        <nav className="flex flex-col gap-2 text-[13px] font-semibold uppercase tracking-[0.14em]">
          <Link href="/terms" className="w-fit transition-colors hover:text-[#cff63a]">
            Terms and Conditions
          </Link>
          <Link href="/privacy" className="w-fit transition-colors hover:text-[#cff63a]">
            Privacy Policy
          </Link>
        </nav>
        <p className="text-[13px] font-semibold tracking-[0.12em] text-[#e4e4e4]/55 md:text-center">
          © 2026 Digitangels
        </p>
        <p className="text-[13px] leading-relaxed tracking-[0.04em] text-[#e4e4e4]/55 md:text-right">
          12 Mulberry Place, Pinnell Road
          <span className="md:block">London SE9 6AR</span>
        </p>
      </div>
    </footer>
  );
}
