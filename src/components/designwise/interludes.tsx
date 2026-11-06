import { Scene } from "@/components/chrome/scene";
import { LazyVideo } from "@/components/lazy-video";
import { LogoWall } from "./logo-wall";

/** An iris opens from the dark Reason 1 onto the light Reason 2. */
export function Bridge() {
  return (
    <Scene mode="pin" className="dw-bridge relative h-[240svh] bg-[#121713]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-x-5 top-6 flex justify-between font-mono text-[10px] tracking-[0.2em] text-[#9eaca2] uppercase md:inset-x-10 md:top-10 md:text-[11px]">
          <span>Reason 01 ✓</span>
          <span>Loading reason 02</span>
        </div>
        <p
          aria-hidden
          className="dw-bridge-ghost absolute inset-0 grid place-items-center text-[clamp(10rem,46vw,44rem)] leading-none font-semibold tracking-[-0.06em] text-transparent italic"
        >
          1→2
        </p>
        <div className="dw-iris absolute inset-0 grid place-items-center bg-[#e8e8e8]">
          <LazyVideo
            src="/designwise/videos/bridge.mp4"
            className="dw-bridge-video block aspect-square w-[min(110vw,86svh)] max-w-none object-contain"
          />
          <p className="dw-bridge-cap absolute inset-x-5 bottom-8 text-center text-[clamp(1.1rem,2vw,1.8rem)] font-semibold text-[#616a63] italic md:bottom-12">
            ONE MORE REASON ↓
          </p>
        </div>
      </div>
    </Scene>
  );
}

export function Trusted() {
  return (
    <Scene mode="view" className="dw-trusted relative overflow-clip bg-[#cff63a] py-20 text-[#121713] md:py-32">
      <div className="flex flex-col gap-4 px-5 md:flex-row md:items-end md:justify-between md:px-16">
        <h2 className="max-w-[12em] text-[clamp(2.2rem,5.6vw,6rem)] leading-[0.98] tracking-[-0.03em]">
          Companies who have <em className="font-semibold">trusted us</em>
        </h2>
      </div>

      <LogoWall />
    </Scene>
  );
}
