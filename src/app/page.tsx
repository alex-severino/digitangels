import { HomeSlogan } from "@/components/home-slogan";

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
    <main
      data-home
      className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-white"
    >
      <div className="flex min-h-0 w-full shrink items-center justify-center leading-[0]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="block h-auto max-h-full w-auto max-w-full object-contain"
          src="/videos/Hands-Halo.mp4?v=2"
        />
      </div>

      <section className="flex w-full grow shrink-0 flex-col items-center justify-center px-4 py-5 text-center sm:py-6 md:px-5 md:py-8">
        <HomeSlogan />

        <div className="mt-5 flex w-full max-w-6xl flex-col items-center gap-2 sm:mt-6 sm:gap-2.5 md:mt-8">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2 md:gap-x-8">
            {PILL_ROW_1.map((label) => (
              <span
                key={label}
                className="text-[14px] font-medium tracking-[0.08em] text-black sm:text-[17px] md:text-[20px]"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2 md:gap-x-8">
            {PILL_ROW_2.map((label) => (
              <span
                key={label}
                className="text-[14px] font-medium tracking-[0.08em] text-black sm:text-[17px] md:text-[20px]"
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
