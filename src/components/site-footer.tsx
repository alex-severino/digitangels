"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/designwise") return null;

  return (
    <footer className="w-full bg-black px-5 py-10 text-[#e4e4e4] md:px-8">
      <div className="flex flex-col items-center gap-2 text-center md:grid md:grid-cols-3 md:items-center md:gap-4">
        <nav className="order-1 flex items-center justify-center gap-x-5 text-[13px] font-bold uppercase tracking-[0.04em] md:justify-start md:gap-x-0 md:flex-col md:items-start md:gap-1 md:text-left md:text-[14px] md:tracking-[0.06em]">
          <Link
            href="/terms"
            className="whitespace-nowrap underline-offset-4 hover:underline"
          >
            Terms and Conditions
          </Link>
          <Link
            href="/privacy"
            className="whitespace-nowrap underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
        </nav>
        <p className="order-3 whitespace-nowrap text-[13px] leading-relaxed font-bold tracking-[0.02em] text-[#B0B0B0] md:order-2 md:text-[14px]">
          © 2026 Digitangels
        </p>
        <p className="order-2 whitespace-nowrap text-[13px] leading-snug font-bold tracking-[0.02em] text-[#B0B0B0] md:order-3 md:whitespace-normal md:text-right md:text-[14px] md:leading-relaxed">
          12 Mulberry Place, Pinnell Road<span className="md:hidden">,</span>{" "}
          <span className="md:block">LONDON SE9 6AR</span>
        </p>
      </div>
    </footer>
  );
}
