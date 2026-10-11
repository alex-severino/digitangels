"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LondonTime, Magnetic, Scramble } from "@/components/chrome/fx";
import { Scene } from "@/components/chrome/scene";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/designwise") return null;

  return (
    <Scene
      as="footer"
      mode="view"
      className="dt-footer relative overflow-hidden border-t border-white/15 bg-black px-4 pt-14 text-[#e4e4e4] md:px-8 md:pt-20"
    >
      <div className="grid gap-10 font-mono text-[11px] uppercase tracking-[0.2em] md:grid-cols-4">
        <div className="space-y-2">
          <p className="text-white/40">Say hello</p>
          <a href="mailto:hello@digitangels.com" className="dt-underline block w-fit normal-case tracking-[0.06em]">
            hello@digitangels.com
          </a>
        </div>
        <div className="space-y-2">
          <p className="text-white/40">Studio</p>
          <p className="leading-relaxed">
            12 Mulberry Place, Pinnell Road
            <br />
            London SE9 6AR
          </p>
        </div>
        <nav className="space-y-2">
          <p className="text-white/40">Legal</p>
          <Link href="/terms" className="block w-fit hover:text-white">
            <Scramble text="Terms and Conditions" />
          </Link>
          <Link href="/privacy" className="block w-fit hover:text-white">
            <Scramble text="Privacy Policy" />
          </Link>
        </nav>
        <div className="flex items-start justify-between gap-6 md:flex-col md:items-end">
          <p>
            <span className="text-white/40">London </span>
            <LondonTime />
          </p>
          <Magnetic>
            <button
              type="button"
              data-cursor="Up"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="grid h-20 w-20 place-items-center rounded-full border border-white/40 text-[18px] transition-colors hover:bg-white hover:text-black"
              aria-label="Back to top"
            >
              ↑
            </button>
          </Magnetic>
        </div>
      </div>

      <p className="mt-16 flex justify-between py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        <span>© 2026 Digitangels</span>
        <span>Design Transformation Advisory</span>
      </p>
    </Scene>
  );
}
