import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { HomeSlogan } from "@/components/home-slogan";
import { Reveal } from "@/components/reveal";
import { WorkGrid } from "@/components/work-grid";
import { workCards } from "@/data/work-index";

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

const HIDDEN_PROJECTS = new Set(["digitangels", "designwise"]);

const CLIENTS = [
  ["coca-cola.png", "Coca-Cola"],
  ["lebara.png", "Lebara"],
  ["yamaha.png", "Yamaha"],
  ["starcom.png", "Starcom"],
  ["tbwa.png", "TBWA"],
  ["volkswagen.png", "Volkswagen"],
  ["kia.png", "Kia"],
  ["duracell.png", "Duracell"],
  ["finlandia.png", "Finlandia"],
  ["adidas.png", "Adidas"],
  ["verve.png", "Verve"],
  ["hyundai.png", "Hyundai"],
  ["ddb.png", "DDB"],
  ["mastercard.png", "Mastercard"],
  ["nestle.png", "Nestlé"],
] as const;

function Marquee() {
  const loop = [...DISCIPLINES, ...DISCIPLINES];
  return (
    <div className="overflow-hidden border-y border-[#cff63a]/25 bg-[#121713] py-4">
      <div className="dt-marquee flex w-max items-center gap-8 pr-8">
        {loop.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="flex items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#e4e4e4]"
          >
            {label}
            <span className="h-1.5 w-1.5 rounded-full bg-[#cff63a]" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="w-full bg-[#121713] text-[#e4e4e4]">
      <section className="relative overflow-hidden px-5 pb-16 pt-6 md:px-10 md:pb-24 md:pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full border border-[#cff63a]/30 md:h-[640px] md:w-[640px]"
        />
        <div
          aria-hidden
          className="dt-spin pointer-events-none absolute -right-16 top-16 h-[360px] w-[360px] rounded-full border border-dashed border-[#cff63a]/50 md:h-[560px] md:w-[560px]"
        />

        <div className="relative grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="mb-6 text-[12px] font-semibold uppercase tracking-[0.32em] text-[#cff63a]">
              Digitangels
            </p>
            <HomeSlogan />
            <div className="dt-draw mt-8 h-[3px] w-40 bg-[#cff63a]" />
            <Link
              href="/digitangels"
              className="group mt-8 inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#e4e4e4]"
            >
              <span className="relative">
                Our branding
                <span className="absolute top-full left-0 mt-1 h-px w-full origin-left scale-x-0 bg-[#cff63a] transition-transform duration-500 group-hover:scale-x-100" />
              </span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="relative">
            <div className="dt-pulse-ring absolute -inset-3 rounded-[2rem] border border-[#cff63a]/40" />
            <div className="relative overflow-hidden rounded-[1.6rem] bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="aspect-[16/10] w-full object-cover"
                src="/videos/Hands-Halo.mp4?v=5"
              />
            </div>
          </div>
        </div>

        <a
          href="#mission"
          className="mt-14 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#cff63a]"
        >
          <span className="dt-pulse-ring inline-block h-8 w-px bg-[#cff63a]" />
          Scroll
        </a>
      </section>

      <Marquee />

      <section
        id="mission"
        className="scroll-mt-24 px-5 py-24 md:px-10 md:py-36"
      >
        <Reveal>
          <p className="max-w-[1400px] text-[clamp(1.7rem,4.2vw,3.6rem)] font-medium leading-[1.12] tracking-[-0.03em]">
            At the heart of Digitangels is a simple truth: Design is the
            strategic platform through which a customer experiences a business
            – and the quality of that experience determines whether an
            organisation grows, stalls, or stands still. We help organisations
            treat Design as a driving force that shapes culture, direction, and
            growth from within – uniting Brand and Digital Product into a
            single vision, and building the systems and standards that sustain
            that excellence at scale.
          </p>
        </Reveal>
      </section>

      <section
        id="projects"
        className="scroll-mt-24 bg-[#e4e4e4] px-5 py-20 text-[#121713] md:px-10 md:py-28"
      >
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="text-[clamp(3rem,8vw,7rem)] font-semibold uppercase leading-none tracking-[-0.05em]">
              Projects
            </h2>
            <span className="hidden text-[12px] font-semibold uppercase tracking-[0.22em] text-[#121713]/55 md:block">
              Selected work
            </span>
          </div>
        </Reveal>
        <WorkGrid
          cards={workCards.filter((card) => !HIDDEN_PROJECTS.has(card.slug))}
        />
      </section>

      <section className="overflow-hidden px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="mb-10 text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.04em]">
            Companies who trust us
          </h2>
        </Reveal>
        <div className="overflow-hidden">
          <div className="dt-marquee flex w-max items-center gap-16 pr-16">
            {[...CLIENTS, ...CLIENTS].map(([file, name], index) => (
              <img
                key={`${file}-${index}`}
                src={`/images/clients/${file}`}
                alt={name}
                className="h-10 w-auto max-w-[140px] object-contain brightness-0 invert md:h-14"
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-24 bg-[#e4e4e4] px-5 py-20 text-[#121713] md:px-10 md:py-28"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="absolute -left-3 top-6 h-[calc(100%-1.5rem)] w-px bg-[#cff63a] md:-left-6" />
              <Image
                src="/images/portrait.png"
                alt="Portrait of Angelina Severino, founder of Digitangels"
                width={700}
                height={1080}
                unoptimized
                className="h-auto w-full grayscale"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.28em] text-[#121713]/50">
              About
            </p>
            <div className="space-y-6 text-[1.15rem] font-light leading-[1.45] md:text-[1.45rem]">
              <p>
                Digitangels was founded by Angelina Severino, an award-winning
                Design Leader with over 15 years of experience across Brand and
                Digital Product. Recognised with the Global Talent UK award for
                Exceptional Talent in Digital Technology and multiple
                international creative awards, Angelina has led Design at the
                highest level across Telecoms, IoT, SaaS, eCommerce, and
                Advertising - most recently as Global Design Lead at Lebara,
                Europe&apos;s fastest-growing MVNO.
              </p>
              <a
                href="https://angelinaseverino.com"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-[15px] font-semibold uppercase tracking-[0.16em]"
              >
                angelinaseverino.com
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <p>
                Throughout the years Angelina has built a trusted network of
                senior design practitioners, researchers, creatives, and niche
                specialists – cultivated through work projects, mentoring,
                public speaking, events and conferences, and being an active
                part of design communities across Europe and beyond. This
                hand-picked team covers Branding, Product and UX/UI Design,
                Visual Design and Animation, Design Systems, Design Management,
                Research, Accessibility, and AI Automation, bringing the depth
                and breadth of expertise to shape the right strategy for every
                business context.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-24 px-5 py-24 md:px-10 md:py-32"
      >
        <Reveal>
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-[#cff63a]">
            Contact
          </p>
          <a
            href="mailto:hello@digitangels.com"
            className="block w-fit text-[clamp(1.8rem,4vw,3.4rem)] font-semibold tracking-[-0.04em] text-[#e4e4e4]"
          >
            hello@digitangels.com
          </a>
        </Reveal>
        <ContactForm />
      </section>

      <section className="w-full overflow-hidden">
        <Image
          src="/projects/digitangels/15.png"
          alt="Digitangels wordmark on fabric"
          width={2048}
          height={1366}
          className="h-auto w-full scale-[1.02] transition-transform duration-[1.6s] ease-out hover:scale-105"
        />
      </section>
    </main>
  );
}
