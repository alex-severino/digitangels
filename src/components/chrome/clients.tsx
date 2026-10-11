import type { CSSProperties } from "react";
import { InView } from "@/components/chrome/scene";

const CLIENTS = [
  ["coca-cola.png", "Coca-Cola"],
  ["lebara.png", "Lebara"],
  ["yamaha.png", "Yamaha"],
  ["starcom.png", "Starcom"],
  ["tbwa.png", "TBWA"],
  ["volkswagen.png", "Volkswagen"],
  ["kia.png", "Kia"],
  ["duracell.png", "Duracell"],
  ["finlandia.png", "Finlandia"],
  ["adidas.png", "Adidas"],
  ["verve.png", "Verve"],
  ["hyundai.png", "Hyundai"],
  ["ddb.png", "DDB"],
  ["mastercard.png", "Mastercard"],
  ["nestle.png", "Nestlé"],
] as const;

const FACTS = [
  ["15+", "Years across Brand and Digital Product"],
  ["UK", "Global Talent — Exceptional Talent in Digital Technology"],
  ["05", "Sectors: Telecoms, IoT, SaaS, eCommerce, Advertising"],
] as const;

export function Clients() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 text-white md:px-8 md:py-36">
      <div className="mb-14 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 md:mb-20 md:text-[11px]">
        <span>(04) — Companies who trust us</span>
        <span>{CLIENTS.length} names</span>
      </div>

      <InView className="dt-facts grid gap-10 md:grid-cols-3 md:gap-6">
        {FACTS.map(([big, small], i) => (
          <div key={big} className="dt-fact" style={{ "--i": i } as CSSProperties}>
            <p className="dt-chrome-text text-[clamp(5rem,13vw,12rem)] font-semibold leading-[0.8] tracking-[-0.08em]">
              {big}
            </p>
            <p className="mt-4 max-w-[18rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-white/55">
              {small}
            </p>
          </div>
        ))}
      </InView>

      <InView className="dt-logos mt-20 grid grid-cols-3 border-l border-t border-white/15 md:mt-28 md:grid-cols-5">
        {CLIENTS.map(([file, name], i) => (
          <div
            key={file}
            className="dt-logo group relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-r border-white/15 md:aspect-[16/10]"
            style={{ "--i": i } as CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/clients/${file}`}
              alt={name}
              loading="lazy"
              className="relative z-10 h-8 w-auto max-w-[60%] object-contain brightness-0 invert transition-[filter,transform] duration-500 group-hover:scale-110 group-hover:invert-0 md:h-12"
            />
            <span className="absolute bottom-2 left-2 z-10 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35 transition-colors duration-500 group-hover:text-black/50">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </InView>
    </section>
  );
}
