import { Scene } from "@/components/chrome/scene";
import { LazyVideo } from "@/components/lazy-video";

const FORKS = [
  {
    href: "#reason-1",
    n: "1",
    kicker: "Reason 01 · 6 elements",
    text: "You are ready for the next level of Design Excellence",
    tone: "bg-[#121713] text-[#c1cdc4]",
    accent: "text-[#cff63a]",
  },
  {
    href: "#reason-2",
    n: "2",
    kicker: "Reason 02 · 5 catalysts",
    text: "Your design team needs expert support with Design Maturity / Leadership",
    tone: "bg-[#e8e8e8] text-[#616a63]",
    accent: "text-[#121713]",
  },
] as const;

/**
 * The reasons sculpture as an ink etching: the video is inverted and multiplied
 * onto the sage so its dark background vanishes, then annotated like a plate
 * in a design textbook — one callout per reason.
 */
// The plate and its annotations are separate layers in the same spot: the
// plate's blend must reach the section background, so it can't be nested
// inside anything that transforms.
function Specimen() {
  return (
    <div
      aria-hidden
      className="relative -mx-5 mt-6 aspect-[5/4] md:mx-0 md:mr-[5vw] md:-mt-[4vw] md:ml-auto md:w-[min(56vw,820px)]"
    >
      <div className="dw-specimen dw-specimen-wrap absolute inset-0 overflow-hidden">
        <LazyVideo
          src="/designwise/videos/reasons.mp4"
          className="dw-specimen-video absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="dw-specimen-wrap absolute inset-0">
        <svg viewBox="0 0 125 100" className="absolute inset-0 h-full w-full overflow-visible text-[#121713]">
          <ellipse
            className="dw-specimen-orbit"
            cx="62.5"
            cy="54"
            rx="60"
            ry="15"
            transform="rotate(-7 62.5 54)"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="0.3"
          />
          {/* Registration marks on the corners the callouts leave free. */}
          {["M109 6 H115 V12", "M10 88 V94 H16"].map((d) => (
            <path key={d} d={d} fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.35" />
          ))}
          <path className="dw-leader" pathLength={1} d="M42 46 L24 24 H0" fill="none" stroke="currentColor" strokeWidth="0.35" />
          <path className="dw-leader" pathLength={1} d="M84 66 L102 84 H125" fill="none" stroke="currentColor" strokeWidth="0.35" />
          <circle className="dw-pin" cx="42" cy="46" r="1.4" />
          <circle className="dw-pin" cx="84" cy="66" r="1.4" />
        </svg>

        <span className="dw-callout absolute bottom-[77%] left-5 md:left-0">
          <span className="block font-mono text-[9px] tracking-[0.2em] text-[#616a63] uppercase md:text-[10px]">Reason 01</span>
          <span className="block text-[14px] font-semibold italic md:text-[clamp(1rem,1.3vw,1.35rem)]">Design Excellence</span>
        </span>
        <span className="dw-callout absolute top-[85%] right-5 text-right md:right-0">
          <span className="block font-mono text-[9px] tracking-[0.2em] text-[#616a63] uppercase md:text-[10px]">Reason 02</span>
          <span className="block text-[14px] font-semibold italic md:text-[clamp(1rem,1.3vw,1.35rem)]">Design Leadership</span>
        </span>
      </div>
    </div>
  );
}

export function Reasons() {
  return (
    <section id="reasons" className="relative overflow-clip bg-[#c1cdc4] text-[#121713]">
      <Scene mode="view" className="dw-reasons relative px-5 pt-20 pb-16 md:px-16 md:pt-28 md:pb-24">
        <p className="dw-reasons-lead relative z-10 text-[clamp(1.8rem,4.8vw,5.4rem)] leading-[1.05]">
          Most probably, you came here for
        </p>
        <h2 className="relative z-10 mt-2 flex flex-wrap items-center gap-x-[0.22em] text-[19vw] leading-[0.82] font-semibold tracking-[-0.05em] italic md:text-[clamp(5.5rem,12.5vw,15rem)]">
          <span className="dw-two inline-block">2</span>
          <span className="relative inline-block">
            <span
              aria-hidden
              className="dw-reasons-bar absolute inset-x-[-0.1em] bottom-[0.06em] -z-0 h-[0.42em] bg-[#9eaca2]"
            />
            <span className="relative">REASONS</span>
          </span>
        </h2>
        <Specimen />
      </Scene>

      <div className="dw-fork flex flex-col md:h-[78svh] md:min-h-[520px] md:flex-row">
        {FORKS.map((fork) => (
          <a
            key={fork.n}
            href={fork.href}
            data-cursor="Go"
            className={`dw-fork-side group relative flex min-h-[64svh] flex-col justify-between overflow-hidden p-5 md:min-h-0 md:p-10 ${fork.tone}`}
          >
            <span className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase md:text-[11px]">
              <span>{fork.kicker}</span>
              <span className={`dw-chev h-8 w-6 ${fork.accent}`} aria-hidden />
            </span>
            <span
              aria-hidden
              className={`dw-fork-n pointer-events-none absolute right-[-0.08em] bottom-[-0.2em] text-[clamp(16rem,40vw,40rem)] leading-none font-semibold italic ${fork.accent}`}
            >
              {fork.n}
            </span>
            <span className="relative z-10 max-w-[11em] text-[clamp(1.6rem,3vw,3.2rem)] leading-[1.05]">
              {fork.text}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
