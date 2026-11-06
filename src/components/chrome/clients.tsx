import type { CSSProperties } from "react";
import { InView } from "@/components/chrome/scene";

function MastercardMark() {
  return (
    <svg
      viewBox="0 0 132 82"
      className="relative z-10 h-9 w-auto max-w-[70%] transition-transform duration-500 group-hover:scale-110 md:h-14"
      aria-hidden
    >
      <defs>
        <clipPath id="dt-mc-overlap">
          <circle cx="85" cy="41" r="36" />
        </clipPath>
      </defs>
      <circle
        cx="47"
        cy="41"
        r="36"
        className="fill-white transition-colors duration-500 group-hover:fill-[#EB001B]"
      />
      <circle
        cx="85"
        cy="41"
        r="36"
        className="fill-white transition-colors duration-500 group-hover:fill-[#F79E1B]"
      />
      <circle cx="47" cy="41" r="36" fill="#000" clipPath="url(#dt-mc-overlap)" />
    </svg>
  );
}

const CLIENTS: { name: string; file?: string; mark?: "mastercard" }[] = [
  { file: "coca-cola.png", name: "Coca-Cola" },
  { file: "lebara.png", name: "Lebara" },
  { file: "yamaha.png", name: "Yamaha" },
  { file: "starcom.png", name: "Starcom" },
  { file: "tbwa.png", name: "TBWA" },
  { file: "volkswagen.png", name: "Volkswagen" },
  { file: "kia.png", name: "Kia" },
  { file: "duracell.png", name: "Duracell" },
  { file: "finlandia.png", name: "Finlandia" },
  { file: "adidas.png", name: "Adidas" },
  { file: "verve.png", name: "Verve" },
  { file: "hyundai.png", name: "Hyundai" },
  { file: "ddb.png", name: "DDB" },
  { name: "Mastercard", mark: "mastercard" },
  { file: "nestle.png", name: "Nestlé" },
];

export function Clients() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 text-white md:px-8 md:py-36">
      <h2 className="font-semibold uppercase leading-[0.8] tracking-[-0.07em]">
        <span className="block text-[clamp(3.6rem,11vw,12rem)]">Companies</span>
        <span className="dt-italic dt-chrome-text mt-[0.04em] block whitespace-nowrap py-[0.14em] pr-[0.12em] text-[clamp(2.4rem,7.2vw,8rem)] normal-case leading-[0.9] tracking-[-0.04em]">
          who trust us
        </span>
      </h2>

      <InView className="dt-logos mt-16 grid grid-cols-3 border-l border-t border-white/15 md:mt-24 md:grid-cols-5">
        {CLIENTS.map((client, i) => (
          <div
            key={client.name}
            className="dt-logo group relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-r border-white/15 md:aspect-[16/10]"
            style={{ "--i": i } as CSSProperties}
          >
            {client.mark === "mastercard" ? (
              <MastercardMark />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/images/clients/${client.file}`}
                alt={client.name}
                loading="lazy"
                className="relative z-10 h-8 w-auto max-w-[60%] object-contain brightness-0 invert transition-[filter,transform] duration-500 group-hover:scale-110 group-hover:invert-0 md:h-12"
              />
            )}
            <span className="absolute bottom-2 left-2 z-10 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35 transition-colors duration-500 group-hover:text-black/50">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </InView>
    </section>
  );
}
