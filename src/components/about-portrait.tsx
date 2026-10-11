export function AboutPortrait() {
  return (
    <div className="dt-portrait relative aspect-[1/1] min-h-[26.67rem] w-full overflow-hidden bg-[#111] md:min-h-[53.33rem]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/portrait.png"
        alt="Portrait of Angelina Severino, founder of Digitangels"
        className="absolute inset-0 h-full w-full object-cover object-[center_top] grayscale"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[-0.06em] left-0 z-10 px-2 font-semibold uppercase leading-[0.76] tracking-[-0.07em] text-white mix-blend-difference text-[clamp(3.6rem,8vw,7rem)]"
      >
        Angelina
      </span>
    </div>
  );
}
