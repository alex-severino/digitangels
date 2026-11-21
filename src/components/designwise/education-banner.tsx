import { LazyVideo } from "@/components/lazy-video";
import { GridCanvas, Title } from "./hero";
import "@/app/designwise/designwise.css";

export function EducationBanner() {
  return (
    <section
      aria-label="Designwise — our educational wing"
      className="dw dw-education relative isolate flex aspect-video min-h-[400px] w-full items-center overflow-hidden"
    >
      <GridCanvas />
      <LazyVideo
        src="/designwise/videos/hero.mp4"
        className="pointer-events-none absolute top-1/2 left-1/2 aspect-square h-[90%] w-auto max-w-full -translate-x-1/2 -translate-y-1/2 object-contain"
      />
      <Title compact />
      <p className="absolute top-6 left-4 z-10 text-[18px] leading-tight md:top-10 md:left-10 md:text-[clamp(1.1rem,1.5vw,1.6rem)]">
        Our Educational Wing
      </p>
      <div className="absolute right-4 bottom-6 z-10 md:right-10 md:bottom-10">
        <a
          href="https://designwise.digitangels.com"
          className="dw-pill dw-pill-solid inline-flex h-12 gap-4 px-6 text-[16px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cff63a] md:h-14 md:px-8 md:text-[20px]"
        >
          <span className="dw-pill-label">Learn More</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6 shrink-0" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 12h16m-6-6 6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
