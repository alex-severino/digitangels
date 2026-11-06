import type { CSSProperties } from "react";
import { Scene } from "@/components/chrome/scene";

const TRUTH =
  "Design is the strategic platform through which a customer experiences a business —";

const EMPHASIS = new Set(["strategic", "platform", "experiences", "business"]);

export function Manifesto() {
  const words = TRUTH.split(" ");
  return (
    <Scene
      id="mission"
      className="dt-manifesto relative h-[280svh] scroll-mt-0 bg-black text-white"
      style={{ "--n": words.length } as CSSProperties}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-4 md:px-8">
        <h2 className="max-w-[18ch] text-[clamp(2.4rem,7.4vw,8rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
          {words.map((word, i) => (
            <span
              key={i}
              className={`dt-word ${EMPHASIS.has(word) ? "dt-italic dt-word-em" : ""}`}
              style={{ "--i": i } as CSSProperties}
            >
              {word}{" "}
            </span>
          ))}
        </h2>

        <p className="dt-manifesto-coda mt-10 max-w-[40rem] self-end text-[1rem] font-light leading-[1.5] text-white/70 md:mt-14 md:text-[1.2rem]">
          and the quality of that experience determines whether an organisation
          grows or stalls. We help organisations treat Design as a
          driving force that shapes culture, direction, and growth from within –
          uniting Brand and Digital Product into a single vision, and building the
          systems and standards that sustain that excellence at scale.
        </p>
      </div>
    </Scene>
  );
}
