import type { CSSProperties } from "react";
import { InView } from "@/components/chrome/scene";

function MastercardMark() {
  return (
    <svg
      viewBox="0 0 132 82"
      className="relative z-10 h-9 w-auto max-w-[70%] transition-transform duration-500 group-hover:scale-110 md:h-14"
      role="img"
      aria-label="Mastercard"
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
        className="fill-white transition-colors duration-500 group-hover:fill-black"
      />
      <circle
        cx="85"
        cy="41"
        r="36"
        className="fill-white transition-colors duration-500 group-hover:fill-black"
      />
      <circle
        cx="47"
        cy="41"
        r="36"
        className="fill-black transition-colors duration-500 group-hover:fill-white"
        clipPath="url(#dt-mc-overlap)"
      />
    </svg>
  );
}

const COMPANIES: ({ name: string; file: string } | { name: "Mastercard" })[] = [
  { file: "steam.svg", name: "Steam" },
  { file: "coca-cola.png", name: "Coca-Cola" },
  { file: "meta.svg", name: "Meta" },
  { file: "lebara.png", name: "Lebara" },
  { file: "bbdo.svg", name: "BBDO" },
  { file: "yamaha.png", name: "Yamaha" },
  { file: "tiktok.svg", name: "TikTok" },
  { file: "volkswagen.png", name: "Volkswagen" },
  { file: "dominos.svg", name: "Domino’s Pizza" },
  { file: "adidas.png", name: "Adidas" },
  { file: "google.svg", name: "Google" },
  { file: "nestle.png", name: "Nestlé" },
  { file: "playstation.svg", name: "PlayStation" },
  { file: "tbwa.png", name: "TBWA" },
  { file: "verve.png", name: "Verve" },
  { file: "starcom.png", name: "Starcom" },
  { file: "xbox.svg", name: "Xbox" },
  { file: "duracell.png", name: "Duracell" },
  { file: "amazon.svg", name: "Amazon" },
  { file: "kia.png", name: "Kia" },
  { name: "Mastercard" },
  { file: "kwalee.svg", name: "Kwalee" },
  { file: "finlandia.png", name: "Finlandia" },
  { file: "ddb.png", name: "DDB" },
  { file: "hyundai.png", name: "Hyundai" },
];

export function Clients() {
  return (
    <section id="companies" aria-labelledby="companies-heading" className="relative overflow-hidden bg-black px-4 py-24 text-white md:px-8 md:py-36">
      <h2 id="companies-heading" className="font-semibold uppercase leading-[0.8] tracking-[-0.07em]">
        <span className="block text-[clamp(3.6rem,11vw,12rem)]">Companies</span>{" "}
        <span className="dt-italic dt-chrome-text mt-[0.04em] block text-balance py-[0.14em] pr-[0.12em] text-[clamp(2.4rem,7.2vw,8rem)] normal-case leading-[0.9] tracking-[-0.04em]">
          we worked with
        </span>
      </h2>
      <p className="mt-5 max-w-[42ch] text-lg leading-snug text-white/75 md:mt-8 md:text-xl">
        Work across Digitangels, our previous roles and the platforms we’ve built for.
      </p>

      <InView as="ul" className="dt-logos mt-10 grid grid-cols-3 border-l border-t border-white/15 md:mt-16 md:grid-cols-5">
        {COMPANIES.map((company, i) => (
          <li
            key={company.name}
            className="dt-logo group relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-r border-white/15 motion-reduce:transition-none md:aspect-[16/10]"
            style={{ "--i": i } as CSSProperties}
          >
            {"file" in company ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/images/clients/${company.file}`}
                alt={company.name}
                loading="lazy"
                className="relative z-10 h-8 w-auto max-w-[60%] object-contain brightness-0 invert transition-[filter,transform] duration-500 group-hover:scale-110 group-hover:invert-0 md:h-12"
              />
            ) : (
              <MastercardMark />
            )}
          </li>
        ))}
      </InView>
    </section>
  );
}
