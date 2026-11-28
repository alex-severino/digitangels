import { Scene } from "@/components/chrome/scene";
import { LensPortrait } from "@/components/lens-portrait";

/** Founder section with Angelina’s lens portrait and bio. */
export function About() {
  return (
    <Scene
      as="section"
      mode="view"
      id="angelina"
      className="dt-about relative scroll-mt-[72px] overflow-hidden bg-[#e9e9e6] text-black md:scroll-mt-[88px]"
    >
      <h2 className="dt-about-name pointer-events-none relative z-20 px-4 pt-24 font-semibold uppercase leading-[0.78] tracking-[-0.07em] md:px-8 md:pt-32">
        <span className="block text-[17vw] md:text-[15vw]">Angelina</span>
        <span className="dt-italic block text-right text-[17vw] normal-case tracking-[-0.04em] md:text-[13vw]">
          Severino
        </span>
      </h2>

      <div className="relative -mt-[12vw] grid gap-10 px-4 pb-24 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 md:px-8 md:pb-36">
        <LensPortrait
          src="/images/portrait.png"
          alt="Portrait of Angelina Severino, founder of Digitangels"
          className="md:sticky md:top-24 md:self-start"
        />

        <div className="space-y-8 pt-4 text-[1.1rem] font-light leading-[1.5] md:pt-[16vw] md:text-[1.35rem]">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
            Founder &amp; Design Director
          </p>
          <p className="text-[clamp(1.6rem,2.6vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Digitangels was founded by an award-winning Design Leader with over{" "}
            <span className="dt-italic">15 years</span> across Brand and Digital
            Product.
          </p>
          <p>
            Recognised with the Global Talent UK endorsement for Exceptional
            Talent in Digital Technology and multiple international creative
            awards, nominated and elected a Fellow of the Royal Society of Arts
            (FRSA). Angelina has led Design at the highest level across
            Telecoms, IoT, SaaS, eCommerce, and Advertising – most recently as
            Global Design Lead at Lebara, Europe&apos;s fastest-growing MVNO.
          </p>
          <p className="text-black/70">
            Throughout the years Angelina has built a trusted network of senior
            design practitioners, researchers, creatives, and niche specialists
            – cultivated through work projects, mentoring, public speaking,
            events and conferences, and being an active part of design
            communities across Europe and beyond. Her hand-picked team covers
            Branding, Product and UX/UI Design, Visual Design and Animation,
            Design Systems, Design Management, Research, Accessibility, and AI
            Automation, bringing the depth and breadth of expertise to shape the
            right strategy for every business context.
          </p>
          <a
            href="https://angelinaseverino.com"
            target="_blank"
            rel="noreferrer"
            data-cursor="Visit"
            className="inline-flex min-h-[2.75rem] items-center gap-[0.65rem] font-mono text-[1.52rem] uppercase underline underline-offset-[0.25em] hover:text-[#dddddd]"
          >
            angelinaseverino.com <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </Scene>
  );
}
