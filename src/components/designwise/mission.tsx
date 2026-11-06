import type { CSSProperties } from "react";
import { Scene } from "@/components/chrome/scene";

// Single words, or a [phrase] that gets swiped with the lime highlighter.
const STATEMENT: (string | [string])[] = [
  "At",
  "DESIGNWISE,",
  "we",
  "help",
  "companies",
  "advance",
  "their",
  ["Design Maturity"],
  "and",
  "make",
  "it",
  "the",
  "guiding",
  "principle",
  "in",
  "crafting",
  ["exceptional Tech products"],
  "and",
  "user",
  "experiences",
];

const PLAIN = STATEMENT.map((part) => (typeof part === "string" ? part : part[0])).join(" ");
const COUNT = PLAIN.split(" ").length;

function Statement() {
  let index = 0;
  const word = (text: string) => (
    <span
      key={index}
      className={`dw-mword ${text === "DESIGNWISE," ? "italic font-semibold" : ""}`}
      style={{ "--i": index++ } as CSSProperties}
    >
      {text}{" "}
    </span>
  );

  return (
    <h2
      className="dw-mission-text text-[clamp(2.1rem,6vw,6.4rem)] leading-[1.02] tracking-[-0.025em]"
      style={{ "--n": COUNT } as CSSProperties}
    >
      <span className="sr-only">{PLAIN}</span>
      <span aria-hidden>
        {STATEMENT.map((part) => {
          if (typeof part === "string") return word(part);
          const words = part[0].split(" ");
          const start = index;
          return (
            <span
              key={`m${start}`}
              className="dw-mark"
              style={{ "--s": start, "--l": words.length } as CSSProperties}
            >
              {words.map(word)}
            </span>
          );
        })}
      </span>
    </h2>
  );
}

export function Mission() {
  return (
    <Scene
      id="mission"
      mode="pin"
      className="dw-mission relative z-10 -mt-[100svh] h-[300svh] rounded-t-[28px] bg-[#c1cdc4] text-[#121713] md:rounded-t-[64px]"
    >
      <div className="sticky top-0 flex h-svh flex-col justify-between overflow-hidden px-5 pt-8 md:px-16 md:pt-14">
        <img
          src="/designwise/images/extra-l8d.png"
          alt=""
          aria-hidden
          className="dw-mission-mark pointer-events-none absolute top-1/2 right-[-12vw] w-[62vw] max-w-[760px] opacity-[0.07] md:right-[-6vw]"
        />

        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#616a63] uppercase md:text-[11px]">
          <span>Our mission</span>
          <span className="hidden md:inline">Scroll to read ↓</span>
        </div>

        <div className="relative">
          <Statement />
        </div>

        <div className="relative -mx-5 mb-20 h-12 md:-mx-16 md:mb-24 md:h-[86px]">
          <p className="relative z-10 flex h-full items-center px-5 text-[14px] font-semibold italic text-[#616a63] md:px-16 md:text-[clamp(1.6rem,2.8vw,2.5rem)]">
            OUR MISSION
          </p>
          <div
            aria-hidden
            className="dw-mission-bar absolute inset-y-0 right-0 w-2/3 rounded-tl-[40px] bg-[#9eaca2] md:rounded-tl-[100px]"
          />
        </div>
      </div>
    </Scene>
  );
}
