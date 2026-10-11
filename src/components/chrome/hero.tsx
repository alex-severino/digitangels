import Link from "next/link";
import { ChromeHalo } from "@/components/chrome/chrome-halo";
import { Magnetic } from "@/components/chrome/fx";
import { Scene } from "@/components/chrome/scene";
import { Split } from "@/components/chrome/split";

const BADGE = "Digitangels • Our branding • Digitangels • Our branding • ";

export function Hero() {
  return (
    <Scene className="dt-hero relative h-[170svh] bg-black text-white">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="dt-hero-canvas absolute inset-0">
          <ChromeHalo mode="halo" />
        </div>
        <div className="dt-vignette pointer-events-none absolute inset-0" />

        <div className="dt-hero-meta pointer-events-none absolute inset-x-4 top-[84px] grid grid-cols-2 gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60 md:inset-x-8 md:top-[104px] md:grid-cols-4 md:text-[11px]">
          <span>(Est.) Digitangels®</span>
          <span className="text-right md:text-left">51.5072° N, 0.1276° W</span>
          <span className="hidden md:block">Brand × Digital Product</span>
          <span className="hidden text-right md:block">Est. London</span>
        </div>

        <h1 className="dt-hero-title pointer-events-none absolute inset-x-0 bottom-[14svh] px-4 font-semibold uppercase leading-[0.8] tracking-[-0.065em] mix-blend-difference md:bottom-[10svh] md:px-8">
          <span className="block text-[17.5vw] md:text-[13.2vw]">
            <Split text="Design" />
          </span>
          <span className="dt-italic block text-[12vw] normal-case leading-[0.86] tracking-[-0.04em] md:pl-[14vw] md:text-[11.4vw]">
            <Split text="transformation" offset={6} />
          </span>
          <span className="flex items-end justify-between text-[17.5vw] md:text-[13.2vw]">
            <Split text="Advisory" offset={20} />
          </span>
        </h1>

        <Link
          href="/digitangels"
          data-cursor="Brand"
          className="dt-badge absolute right-4 top-[20svh] hidden md:right-10 md:block"
          aria-label="Our branding"
        >
          <Magnetic strength={0.25}>
            <svg viewBox="0 0 200 200" className="dt-badge-spin h-40 w-40 lg:h-48 lg:w-48">
              <defs>
                <path id="badge-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text className="fill-white font-mono text-[13px] uppercase tracking-[0.32em]">
                <textPath href="#badge-path">{BADGE}</textPath>
              </text>
            </svg>
            <span className="absolute inset-0 grid place-items-center">
              <span className="dt-ring w-14 lg:w-16" />
            </span>
          </Magnetic>
        </Link>

        <div className="dt-hero-foot absolute inset-x-4 bottom-5 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/60 md:inset-x-8 md:text-[11px]">
          <span className="max-w-[18rem] leading-relaxed">
            We help with the digital unknown
          </span>
          <a href="#mission" className="flex items-center gap-3 text-white" data-cursor="Dive">
            Scroll
            <span className="dt-scroll-line" aria-hidden />
          </a>
        </div>
      </div>
    </Scene>
  );
}
