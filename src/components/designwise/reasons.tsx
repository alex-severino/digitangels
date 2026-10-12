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

export function Reasons() {
  return (
    <section id="reasons" className="relative overflow-clip bg-[#c1cdc4] text-[#121713]">
      <Scene mode="view" className="dw-reasons px-5 pt-20 pb-14 md:px-16 md:pt-32 md:pb-20">
        <p className="dw-reasons-lead text-[clamp(1.8rem,4.8vw,5.4rem)] leading-[1.05]">
          Most probably, you came here for
        </p>
        <h2 className="relative mt-2 flex flex-wrap items-center gap-x-[0.12em] text-[19vw] md:text-[clamp(5.5rem,12.5vw,15rem)] leading-[0.82] font-semibold tracking-[-0.05em] italic">
          <span className="dw-two inline-block">2</span>
          <span className="dw-porthole relative inline-block aspect-square w-[0.92em] overflow-hidden rounded-full bg-[#121713]">
            <LazyVideo
              src="/designwise/videos/reasons.mp4"
              className="absolute inset-[-6%] h-[112%] w-[112%] object-cover"
            />
          </span>
          <span className="relative inline-block">
            <span
              aria-hidden
              className="dw-reasons-bar absolute inset-x-[-0.1em] bottom-[0.06em] -z-0 h-[0.42em] bg-[#9eaca2]"
            />
            <span className="relative">REASONS</span>
          </span>
        </h2>
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
