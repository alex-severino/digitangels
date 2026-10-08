import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { HomeSlogan } from "@/components/home-slogan";
import { WorkGrid } from "@/components/work-grid";
import { workCards } from "@/data/work-index";

const PILL_ROW_1 = [
  "BRANDING",
  "DIGITAL",
  "DESIGN SYSTEMS",
  "ACCESSIBILITY",
  "AI AUTOMATION",
] as const;

const PILL_ROW_2 = [
  "DESIGN ORG",
  "DESIGN OPS",
  "UX RESEARCH",
  "DESIGN MATURITY",
  "DESIGN INTEGRATION",
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

function PillRow({ labels }: { labels: readonly string[] }) {
  return (
    <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[14px] font-medium tracking-[0.08em] text-black sm:text-[17px] md:gap-x-4 md:text-[20px]">
      {labels.map((label, index) => (
        <span
          key={label}
          className="inline-flex items-center gap-x-3 whitespace-nowrap md:gap-x-4"
        >
          {label}
          {index < labels.length - 1 ? (
            <svg
              aria-hidden
              viewBox="0 0 8 8"
              className="h-[5px] w-[5px] shrink-0 self-center md:h-[6px] md:w-[6px]"
            >
              <circle cx="4" cy="4" r="4" fill="currentColor" />
            </svg>
          ) : null}
        </span>
      ))}
    </p>
  );
}

export default function Home() {
  return (
    <main className="w-full bg-black">
      <section className="relative flex min-h-[calc(100svh-5rem)] w-full flex-col bg-white md:min-h-[calc(100svh-108px)]">
        <div className="flex w-full shrink-0 items-center justify-center bg-black leading-[0]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="block h-auto w-full object-contain"
            src="/videos/Hands-Halo.mp4?v=5"
          />
        </div>

        <div className="flex flex-1 flex-col items-center bg-white px-4 pb-16 pt-2 text-center md:px-5 md:pb-20 md:pt-3">
          <Link
            href="/digitangels"
            className="group inline-flex items-center gap-2 self-end pb-1.5 text-[14px] font-semibold tracking-[0.18em] text-black sm:text-[16px] md:text-[18px]"
          >
            <span className="relative">
              OUR BRANDING
              <span
                aria-hidden
                className="absolute top-full left-0 mt-0.5 h-[3px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </span>
            <svg
              viewBox="0 0 24 24"
              className="h-[1em] w-[1em] shrink-0"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 12h14M14 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </Link>

          <div className="mt-6 w-full md:mt-8">
            <HomeSlogan />
          </div>

          <div className="mt-5 flex w-full max-w-6xl flex-col items-center gap-2 sm:mt-6 md:mt-8">
            <div className="w-full md:hidden">
              <PillRow labels={[...PILL_ROW_1, ...PILL_ROW_2]} />
            </div>
            <div className="hidden w-full flex-col items-center gap-2 md:flex">
              <PillRow labels={PILL_ROW_1} />
              <PillRow labels={PILL_ROW_2} />
            </div>
          </div>
        </div>

        <a
          href="#mission"
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-black transition-opacity hover:opacity-60 md:bottom-6"
          aria-label="Scroll down"
        >
          <svg
            viewBox="0 0 28 16"
            fill="none"
            aria-hidden
            className="h-[34.56px] w-[60.48px] overflow-visible md:h-[48px] md:w-[84px]"
          >
            <path
              d="M2 2L14 14L26 2"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="square"
            />
          </svg>
        </a>
      </section>

      <section
        id="mission"
        className="scroll-mt-20 bg-black px-4 py-20 text-[#e4e4e4] md:scroll-mt-[108px] md:px-5 md:py-28"
      >
        <p className="text-[clamp(1.85rem,5.4vw,4.75rem)] font-normal leading-[1.08] tracking-tight text-[#E4E4E4]">
          At the heart of Digitangels is a simple truth: Design is the
          strategic platform through which a customer experiences a
          business – and the quality of that experience determines whether
          an organisation grows, stalls, or stands still. We help
          organisations treat Design as a driving force that shapes
          culture, direction, and growth from within – uniting Brand and
          Digital Product into a single vision, and building the systems
          and standards that sustain that excellence at scale.
        </p>
      </section>

      <section
        id="projects"
        className="scroll-mt-20 bg-[#C9C9C9] px-5 pb-20 pt-16 md:scroll-mt-[108px] md:px-[75px] md:pb-28 md:pt-24"
      >
        <h2 className="mb-10 text-center text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase tracking-tight text-black md:mb-14">
          Projects
        </h2>
        <WorkGrid
          cards={workCards.filter((card) => !HIDDEN_PROJECTS.has(card.slug))}
        />
      </section>

      <section className="bg-black px-5 pb-20 pt-4 text-[#e4e4e4] md:px-[75px] md:pb-28 md:pt-8">
        <h2 className="mb-12 text-center text-[clamp(2rem,5vw,4.5rem)] font-bold tracking-tight md:mb-20">
          Companies who trust us
        </h2>
        <div className="grid grid-cols-3 items-center gap-x-4 gap-y-10 md:grid-cols-5 md:gap-x-12 md:gap-y-16">
          {CLIENTS.map(([file, name]) => (
            <div
              key={file}
              className="flex h-12 items-center justify-center md:h-20"
            >
              <img
                src={`/images/clients/${file}`}
                alt={name}
                className="max-h-9 w-auto max-w-[110px] object-contain brightness-[0.894] md:max-h-16 md:max-w-[180px]"
              />
            </div>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-20 bg-white px-5 pb-20 pt-16 text-black md:scroll-mt-[108px] md:px-[75px] md:pb-28 md:pt-24"
      >
        <h2 className="mb-10 text-center text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase tracking-tight md:mb-14">
          About
        </h2>
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] md:gap-16">
          <Image
            src="/images/portrait.png"
            alt="Portrait of Angelina Severino, founder of Digitangels"
            width={700}
            height={1080}
            unoptimized
            className="h-auto w-full grayscale"
          />
          <div className="text-[1.4667rem] font-light leading-[1.35] text-black md:text-[1.65rem]">
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
              className="group mt-6 inline-flex items-center gap-2 pb-1.5 text-[19px] font-semibold uppercase tracking-[0.18em] text-black md:mt-8 md:text-[24px]"
            >
              <span className="relative">
                ANGELINASEVERINO.COM
                <span
                  aria-hidden
                  className="absolute top-full left-0 mt-0.5 h-[3px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </span>
              <svg
                viewBox="0 0 24 24"
                className="h-[1em] w-[1em] shrink-0"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 12h14M14 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </a>
            <p className="mt-6">
              Throughout the years Angelina has built a trusted network of
              senior design practitioners, researchers, creatives, and niche
              specialists – cultivated through work projects, mentoring, public
              speaking, events and conferences, and being an active part of
              design communities across Europe and beyond. This hand-picked
              team covers Branding, Product and UX/UI Design, Visual Design and
              Animation, Design Systems, Design Management, Research,
              Accessibility, and AI Automation, bringing the depth and breadth
              of expertise to shape the right strategy for every business
              context.
            </p>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-20 bg-black px-5 pb-24 pt-16 text-[#e4e4e4] md:scroll-mt-[108px] md:px-[75px] md:pb-32 md:pt-24"
      >
        <h2 className="mb-5 text-center text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase tracking-tight md:mb-7">
          Contact
        </h2>
        <a
          href="mailto:hello@digitangels.com"
          className="mx-auto mb-0 block w-fit select-text text-center text-[22px] font-medium tracking-tight text-[#e4e4e4] underline-offset-4 hover:underline md:text-[36px]"
        >
          hello@{"\u200b"}digitangels.com
        </a>
        <ContactForm />
      </section>

      <section className="w-full bg-black leading-[0]">
        <Image
          src="/projects/digitangels/15.png"
          alt="Digitangels wordmark on fabric"
          width={2048}
          height={1366}
          className="h-auto w-full"
        />
      </section>
    </main>
  );
}
