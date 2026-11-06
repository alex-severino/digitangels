"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Glyph } from "./bits";
import { EMAIL, MENU } from "./data";

function RoundButton({
  label,
  onClick,
  children,
  className = "",
}: {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full md:h-11 md:w-11 ${className}`}
    >
      {children}
    </button>
  );
}

/** Reads how far down the page you are. */
function MaturityMeter() {
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (pctRef.current) pctRef.current.textContent = `${String(Math.round(p * 100)).padStart(3, "0")}%`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      className="min-w-0 flex-1 px-2 font-mono text-[10px] tracking-[0.14em] text-[#c1cdc4] uppercase md:w-[250px] md:flex-none md:px-3"
      title="Design maturity"
    >
      <div className="flex items-baseline justify-end">
        <span ref={pctRef} className="tabular-nums text-[#cff63a]">000%</span>
      </div>
      <span className="mt-1.5 flex h-[3px] gap-[3px]" aria-hidden>
        <span className="relative block flex-1 overflow-hidden rounded-full bg-white/10">
          <span ref={barRef} className="absolute inset-0 origin-left scale-x-0 bg-[#cff63a]" />
        </span>
      </span>
    </div>
  );
}

function Menu({
  open,
  origin,
  onClose,
}: {
  open: boolean;
  origin: { x: number; y: number };
  onClose: () => void;
}) {
  const firstRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal
      aria-label="Menu"
      inert={!open}
      className={`dw-menu fixed inset-0 z-[70] flex flex-col bg-[#cff63a] px-5 pt-5 pb-8 text-[#121713] md:px-10 md:pt-8 ${open ? "is-open" : ""}`}
      style={{ "--ox": `${origin.x}px`, "--oy": `${origin.y}px` } as CSSProperties}
    >
      <div className="flex items-center justify-between">
        <a href="https://digitangels.com" aria-label="Back to Digitangels" className="flex items-center gap-3 text-[18px]">
          <span aria-hidden>←</span>
          <span
            aria-hidden
            className="block h-[1.15em] aspect-[640/133] bg-current [mask-image:url(/designwise/images/digitangels-wordmark.png)] [mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-image:url(/designwise/images/digitangels-wordmark.png)] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]"
          />
        </a>
        <RoundButton label="Close menu" onClick={onClose} className="bg-[#121713] text-[#cff63a]">
          <span className="relative block h-4 w-4" aria-hidden>
            <span className="absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 -rotate-45 bg-current" />
          </span>
        </RoundButton>
      </div>

      <nav className="my-auto flex flex-col py-10">
        {MENU.map((link, i) => (
          <a
            key={link.href}
            ref={i === 0 ? firstRef : undefined}
            href={link.href}
            onClick={onClose}
            className="dw-menu-link group flex items-center gap-4 border-b border-[#121713]/15 py-2 md:gap-8 md:py-3"
            style={{ "--i": i } as CSSProperties}
          >
            <span className="text-[clamp(2.2rem,7.4vw,7rem)] leading-[1.02] font-semibold tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 group-hover:italic">
              {link.label}
            </span>
            <Glyph
              src={link.icon}
              className="ml-auto h-10 w-10 scale-50 opacity-0 transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100 md:h-20 md:w-20"
            />
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-2 font-mono text-[10px] tracking-[0.2em] uppercase md:flex-row md:justify-between md:text-[11px]">
        <a href={`mailto:${EMAIL}`} className="dt-underline w-fit normal-case tracking-[0.06em]">
          {EMAIL}
        </a>
        <span>Design Education for Tech and beyond</span>
      </div>
    </div>
  );
}

export function Dock() {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <nav
        aria-label="Designwise"
        className="dw-dock fixed inset-x-3 bottom-3 z-50 flex items-center gap-1 rounded-full border border-[#cff63a]/30 bg-[#121713]/80 p-1 backdrop-blur-xl md:inset-x-auto md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:gap-1.5 md:p-1.5"
      >
        <RoundButton
          label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-[#121713] text-[#cff63a] shadow-[inset_0_0_0_1.5px_#cff63a]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
            <path d="M3 10.5 8 5.5 13 10.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </RoundButton>

        <MaturityMeter />

        <a href="#mission" className="dw-pill dw-pill-solid hidden h-11 items-center px-6 text-[16px] lg:inline-flex">
          <span className="dw-pill-label">OUR MISSION</span>
        </a>
        <a href="#reason-1" className="dw-pill dw-pill-solid hidden h-11 items-center px-6 text-[16px] md:inline-flex">
          <span className="dw-pill-label">DESIGN EDUCATION</span>
        </a>

        <RoundButton
          label="Open menu"
          onClick={(event) => {
            const box = event.currentTarget.getBoundingClientRect();
            setOrigin({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
            setOpen(true);
          }}
          className="bg-[#cff63a] text-[#121713]"
        >
          <span className="flex w-4 flex-col gap-[4px]" aria-hidden>
            <span className="block h-0.5 w-4 bg-current" />
            <span className="block h-0.5 w-4 bg-current" />
            <span className="block h-0.5 w-2.5 bg-current" />
          </span>
        </RoundButton>
      </nav>

      <Menu open={open} origin={origin} onClose={close} />
    </>
  );
}
