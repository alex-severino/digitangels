import { ComingSoonHeading } from "@/components/coming-soon-heading";

const PILL_ROW_1 = [
  "BRANDING",
  "DIGITAL",
  "DESIGN SYSTEMS",
  "AI AUTOMATION",
] as const;

const PILL_ROW_2 = [
  "DESIGN ORG",
  "DESIGN OPS",
  "DESIGN MATURITY",
  "DESIGN INTEGRATION",
] as const;

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col overflow-x-hidden bg-white md:min-h-screen">
      <div className="w-full shrink-0 leading-[0]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="block h-auto w-full"
            src="/videos/Hands-Halo.mp4?v=2"
          />
      </div>

      <section className="flex flex-col items-center px-4 py-8 text-center sm:py-10 md:flex-1 md:justify-center md:px-8 md:py-14">
        <div className="mb-8 w-full md:mb-10">
          <ComingSoonHeading />
        </div>

        <h2 className="text-[clamp(1.6rem,9vw,3.25rem)] font-bold leading-[1.12] tracking-[0.08em] text-black uppercase md:tracking-[0.12em]">
          <span className="block md:inline">Design</span>
          <span className="block md:inline md:before:content-['_']">
            Transformation
          </span>
          <span className="block md:inline md:before:content-['_']">
            Advisory
          </span>
        </h2>

        <div className="mt-8 flex w-full max-w-6xl flex-col items-center gap-2.5 sm:mt-10 sm:gap-3.5 md:mt-12">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2.5 md:gap-3.5">
            {PILL_ROW_1.map((label) => (
              <span
                key={label}
                className="rounded-full border border-black/25 px-5 py-1.5 text-[14px] font-medium tracking-[0.08em] text-black sm:px-6 sm:py-2 sm:text-[17px] md:px-7 md:py-2.5 md:text-[20px]"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2.5 md:gap-3.5">
            {PILL_ROW_2.map((label) => (
              <span
                key={label}
                className="rounded-full border border-black/25 px-5 py-1.5 text-[14px] font-medium tracking-[0.08em] text-black sm:px-6 sm:py-2 sm:text-[17px] md:px-7 md:py-2.5 md:text-[20px]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
