"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Glyph, Pill } from "./bits";
import type { Area } from "./data";

const THEMES = {
  dark: {
    section: "bg-[#121713] text-[#9eaca2]",
    tile: "border-[#9eaca2]/30 text-[#e4e4e4]",
    on: "dw-tile-on-dark",
    body: "text-[#e4e4e4]",
    note: "text-[#e4e4e4]",
    pill: "ghost",
    glyph: "text-[#cff63a]",
  },
  light: {
    section: "bg-[#e8e8e8] text-[#616a63]",
    tile: "border-[#121713]/20 text-[#121713]",
    on: "dw-tile-on-light",
    body: "text-[#121713]",
    note: "text-[#121713]",
    pill: "dark",
    glyph: "text-[#121713]",
  },
} as const;

/**
 * A "periodic table" of what Designwise teaches. Tiles tilt toward the
 * pointer; picking one loads its element sheet into the side panel.
 */
export function Reason({
  id,
  n,
  heading,
  kicker,
  items,
  offset,
  theme,
  note,
}: {
  id: string;
  n: string;
  heading: string;
  kicker: string;
  items: Area[];
  offset: number;
  theme: keyof typeof THEMES;
  note: string;
}) {
  const t = THEMES[theme];
  const [active, setActive] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const item = items[active];

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const tile = (event.target as Element | null)?.closest<HTMLElement>(".dw-tile");
      if (!tile) return;
      const box = tile.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      tile.style.setProperty("--mx", `${x * 100}%`);
      tile.style.setProperty("--my", `${y * 100}%`);
      tile.style.setProperty("--ry", `${(x - 0.5) * 22}deg`);
      tile.style.setProperty("--rx", `${(0.5 - y) * 22}deg`);
    };
    const onOut = (event: PointerEvent) => {
      const tile = (event.target as Element | null)?.closest<HTMLElement>(".dw-tile");
      if (!tile || tile.contains(event.relatedTarget as Node | null)) return;
      tile.style.removeProperty("--rx");
      tile.style.removeProperty("--ry");
    };

    grid.addEventListener("pointermove", onMove);
    grid.addEventListener("pointerout", onOut);
    return () => {
      grid.removeEventListener("pointermove", onMove);
      grid.removeEventListener("pointerout", onOut);
    };
  }, []);

  const pick = (index: number) => {
    setActive(index);
    if (window.matchMedia("(max-width: 767px)").matches) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id={id} className={`relative px-5 pt-20 md:px-10 md:pt-28 ${t.section}`}>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 md:gap-x-12">
        <p className="dw-outline-num text-[clamp(5rem,15vw,14rem)] leading-[0.8] font-semibold italic">
          {n}
        </p>
        <div>
          <p className="mb-4 font-mono text-[10px] tracking-[0.2em] uppercase md:text-[11px]">
            {kicker}
          </p>
          <h2 className="text-[clamp(1.5rem,4.4vw,5rem)] leading-[1.02] tracking-[-0.02em]">
            {heading}
          </h2>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:mt-20 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-10">
        <div ref={gridRef} className="dw-table grid grid-cols-3 gap-2 self-start md:gap-3" role="group" aria-label={kicker}>
          {items.map((el, i) => {
            const on = i === active;
            return (
              <button
                key={el.symbol}
                type="button"
                aria-pressed={on}
                aria-controls={panelId}
                data-cursor="Read"
                onClick={() => pick(i)}
                className={`dw-tile group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[14px] border p-2.5 text-left md:rounded-[18px] md:p-4 ${t.tile} ${on ? t.on : ""} ${el.comingSoon ? "border-dashed" : ""}`}
              >
                <span className="relative z-10 flex items-start justify-between">
                  <span className="font-mono text-[10px] tabular-nums md:text-[12px]">
                    {String(offset + i + 1).padStart(2, "0")}
                  </span>
                  <Glyph src={el.icon} className="h-5 w-5 opacity-70 md:h-8 md:w-8" />
                </span>
                <span className="dw-tile-symbol relative z-10 text-[clamp(2.4rem,7vw,6.4rem)] leading-none font-semibold tracking-[-0.04em]">
                  {el.symbol}
                </span>
                <span className="relative z-10 text-[10px] leading-[1.15] font-semibold uppercase md:text-[13px]">
                  {el.title}
                  {el.comingSoon ? <span className="mt-1 block font-mono text-[9px] tracking-[0.14em] opacity-70 md:text-[10px]">Coming soon</span> : null}
                </span>
              </button>
            );
          })}
        </div>

        <div ref={panelRef} className="scroll-mt-6 md:sticky md:top-8 md:self-start">
          <div
            id={panelId}
            key={item.symbol}
            aria-live="polite"
            className={`dw-sheet relative overflow-hidden rounded-[18px] border p-5 md:rounded-[24px] md:p-9 ${t.tile}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-70 md:text-[11px]">
                  Element {String(offset + active + 1).padStart(2, "0")} / 12
                </p>
                <h3 className="mt-3 text-[clamp(1.6rem,3.2vw,3.2rem)] leading-[1] font-semibold uppercase italic">
                  {item.title}
                </h3>
                {item.comingSoon ? (
                  <p className="mt-3 inline-block rounded-full bg-[#cff63a] px-3 py-1 text-[12px] font-semibold text-[#121713] italic">
                    COMING SOON
                  </p>
                ) : null}
              </div>
              <span className="dw-sheet-symbol grid aspect-square w-16 shrink-0 place-items-center rounded-[10px] border border-current text-[26px] font-semibold md:w-24 md:text-[40px]">
                {item.symbol}
              </span>
            </div>
            <Glyph
              src={item.icon}
              className={`dw-sheet-glyph mx-auto my-8 block h-28 w-28 md:my-10 md:h-40 md:w-40 ${t.glyph}`}
            />
            <div className={`space-y-4 text-[15px] leading-relaxed md:text-[18px] ${t.body}`}>
              {item.body.split("\n\n").map((para, i) => (
                <p key={i} className="dw-sheet-line" style={{ "--i": i } as CSSProperties}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 py-16 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-10 md:py-24">
        <span className="hidden font-mono text-[11px] tracking-[0.2em] uppercase md:block">
          ( Flexibility is key )
        </span>
        <div className="flex flex-col items-start gap-6">
          <p className={`text-[18px] leading-snug md:text-[22px] ${t.note}`}>{note}</p>
          <Pill href="#contact" variant={t.pill} className="h-11 w-full px-10 text-[18px] md:w-auto md:text-[20px]">
            LET&apos;S CHAT
          </Pill>
        </div>
      </div>
    </section>
  );
}
