import type { CSSProperties } from "react";
import { Scene } from "@/components/chrome/scene";

const DISCIPLINES = [
  "Branding",
  "Digital",
  "Design systems",
  "Accessibility",
  "AI automation",
  "Design org",
  "Design ops",
  "UX research",
  "Design maturity",
  "Design integration",
] as const;

/** A chrome type drum that turns one face per discipline as you scroll. */
export function Disciplines() {
  return (
    <Scene
      className="dt-drum-scene relative h-[300svh] bg-[#e9e9e6] text-black"
      style={{ "--count": DISCIPLINES.length } as CSSProperties}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="dt-drum-stage relative flex flex-1 items-center justify-center pt-[96px] md:pt-[112px]">
          <div className="dt-drum-band pointer-events-none absolute inset-x-0 top-1/2" aria-hidden />
          <ul className="dt-drum">
            {DISCIPLINES.map((label, i) => (
              <li
                key={label}
                className="dt-drum-face"
                style={{ "--i": i } as CSSProperties}
              >
                <span className="dt-drum-index font-mono">{String(i + 1).padStart(2, "0")}</span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4 pb-6 md:px-8">
          <div className="h-px w-full bg-black/15">
            <div className="dt-progress h-px bg-black" />
          </div>
        </div>
      </div>
    </Scene>
  );
}
