"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { LazyVideo } from "@/components/lazy-video";

const AREAS = [
  {
    title: "PRODUCT BRANDING",
    image: "/designwise/images/areas/branding.png",
    body: "Branding is all about creating a real connection with people. It's not only a logo, color palette or even the product anymore – it's about a whole experience. Branding gives tech products a personality – something we can relate to, and trust. It's what sets one app apart from another in our minds.\n\nIn a world where we're bombarded with choices, that connection can make all the difference. Branding is the heart and soul of why we choose one tech product over another.",
  },
  {
    title: "DESIGN SYSTEMS",
    image: "/designwise/images/areas/systems.png",
    body: "Design System for product designs serves as a foundational framework, ensuring consistency, efficiency, and scalability across all the design tokens such as color, typography, spacing, components, patterns, etc.\n\nWe teach how to build Design Systems based on Figma Variables, which streamlines the design and development processes, inspires collaboration among team members, and ultimately enhances user experience by establishing coherent and cohesive interfaces.",
  },
  {
    title: "PRODUCT DESIGN",
    image: "/designwise/images/areas/product.png",
    body: "Product Design in Tech is a digital solution crafted with heart, purpose, and business goals in mind. Collaborating closely with our diverse team, we will show how to bring ideas to life, one iteration at a time. It's a journey of discovery and innovation, where every click, swipe, and tap is infused with purpose and meaning.\n\nWe teach how to listen, research, learn, and adapt, staying grounded in the real world while embracing the ever-changing landscape of business and user needs.",
  },
  {
    title: "UX/UI DESIGN",
    image: "/designwise/images/areas/uxui.png",
    body: "Every pixel tells a story, and every interaction is an opportunity to delight. We teach how to create interfaces, by crafting experiences that resonate with users on a deep, emotional level. It's about understanding the human behind the screen – what they need, what they love, what brings them joy.\n\nWe will show you how to sketch, wireframe, prototype, and test the designs until they feel just right for the users. Our amazing UX/UI educational team creates pathways that feel intuitive, seamless, and downright magical.",
  },
  {
    title: "DIGITAL DESIGN",
    image: "/designwise/images/areas/digital.png",
    body: "Digital design is a special field where functionality meets artistry. Be is web design, illustrations, animations, marketing and social media materials for tech products – our diverse team of talented creators will pour their minds and souls to teach you how to bring your ideas to life with passion and precision.\n\nIt's a continuous exploration of new techniques, trends, and possibilities. We're always learning, always growing, always striving to push the boundaries of what's possible to achieve with digital design.",
  },
  {
    title: "DESIGN MANAGEMENT",
    image: "/designwise/images/areas/management.png",
    body: "The biggest win from design management done right, is when creativity and strategy intertwine to shape the future of product. How we see it, it's much more than just overseeing design projects. It's mainly about inspiring a culture of innovation, collaboration, and integration of design in all areas of product development.\n\nWe will work closely with design and development teams in your company, ensuring that design isn't just a box to tick – it's a driving force with clear roadmaps and strategies.",
  },
] as const;

const SUPPORT = [
  {
    title: "DESIGN AUDIT",
    image: "/designwise/images/areas/audit.png",
    body: "Sometimes, to unlock the full potential of your product team, you need a fresh expert look at their design assets and design processes – design audit.\n\nWe'll work closely with your team to understand your goals, challenges, and aspirations, then roll up our sleeves to identify areas for improvement and innovation. From refining your visual identity to optimising user experiences, or internal workflows, our goal is simple: to elevate your design to new heights and drive tangible results for your business.",
  },
  {
    title: "DESIGN SPRINTS FACILITATION",
    image: "/designwise/images/areas/sprints.png",
    body: "Ready to turbocharge your design process? In just a few days we will orchestrate dynamic design sprints to ignite innovation and drive results.\n\nIt is a four-day process steeped in design methodology and fueled by the principles of design thinking, and it is your team's ticket to validating ideas and solving complex problems with clarity and efficiency. From understanding the end-user's pain points to prototyping realistic solutions and gathering real-time feedback, this design sprint will propel your team closer to innovative breakthroughs.",
  },
  {
    title: "EDUCATIONAL TRAININGS",
    image: "/designwise/images/areas/trainings.png",
    body: "Welcome to our educational hub where we offer cutting-edge design trainings covering Design Maturity, Design Systems, Diversity, Equity, and Inclusion (DEI) in design, Branding in Product, Design Thinking principles and Design Processes.\n\nOur programs empower your team to elevate their design capabilities and drive impactful innovation. Whether they are seasoned designers or new to the field, our trainings provide the tools and insights needed to thrive in today's dynamic design landscape.",
  },
  {
    title: "WORKSHOPS",
    image: "/designwise/images/areas/workshops.png",
    body: "During our immersive design workshops, hands-on learning meets most relevant expertise. We offer a wide range of topics, from levelling up Design Maturity and mastering Design Systems to exploring Diversity, Equity, and Inclusion (DEI) in design, refining Branding strategies in product design, and harnessing the power of Design Thinking principles.\n\nIn our workshops, participants engage in dynamic activities, collaborative exercises, and real-world case studies to deepen their understanding and practical application of key design concepts.",
  },
  {
    title: "MENTORSHIP",
    image: "/designwise/images/areas/mentorship.png",
    body: "Our design mentorship program is tailored specifically for tech companies seeking to elevate their design capabilities. Whether you're a burgeoning startup or an established tech giant, our experienced mentors are here to provide personalised guidance and support to your design teams or individuals. We bring years of industry experience and expertise to the table, offering insights into best practices, emerging trends, and strategies for success.\n\nWe'll work closely with your team to identify areas for growth, overcome challenges, and unlock the full potential of your design talent.",
  },
] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShown(entry.isIntersecting),
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function useInView(threshold = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShown(entry.intersectionRatio >= threshold),
      { threshold: [0, threshold] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, shown };
}

function ShrinkingWord() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;
      el.style.fontSize = "100px";
      el.style.marginLeft = "0px";
      const cs = getComputedStyle(el);
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;
      ctx.font = cs.font;
      ctx.letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
      const metrics = ctx.measureText(el.textContent.trim());
      const leftGap = Math.max(0, -metrics.actualBoundingBoxLeft);
      const ink = metrics.actualBoundingBoxRight - metrics.actualBoundingBoxLeft;
      el.dataset.base = String((parent.clientWidth / ink) * 100);
      el.dataset.ink = String(ink);
      el.dataset.gap = String(leftGap);
      apply();
    };

    const apply = () => {
      const base = Number(el.dataset.base || 0);
      if (!base) return;
      const mission = document.getElementById("mission");
      const missionTop = mission
        ? mission.getBoundingClientRect().top + window.scrollY
        : window.innerHeight;
      const end = mission
        ? missionTop + mission.offsetHeight * 0.92
        : window.innerHeight;
      const distance = Math.max(window.innerHeight, end);
      const shrink = Math.max(0, 1 - window.scrollY / distance);
      const fontSize = base * shrink;
      el.style.fontSize = `${fontSize}px`;
      el.style.opacity = shrink === 0 ? "0" : "1";
      const scale = fontSize / 100;
      const inkW = Number(el.dataset.ink) * scale;
      const gap = Number(el.dataset.gap) * scale;
      const parentW = el.parentElement?.clientWidth ?? 0;
      el.style.marginLeft = `${(parentW - inkW) / 2 + gap}px`;
    };

    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("scroll", apply, { passive: true });
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("scroll", apply);
    };
  }, []);

  return (
    <h1
      ref={ref}
      className="w-max whitespace-nowrap pt-[0.03em] text-[17vw] font-semibold leading-[1.05] text-[#cecece]"
    >
      DESIGNWISE
    </h1>
  );
}

function AreaList({
  items,
  light,
}: {
  items: readonly {
    title: string;
    image: string;
    body: string;
    comingSoon?: boolean;
  }[];
  light?: boolean;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const line = light ? "border-[#9eaca2]" : "border-[#c1cdc4]";
  const copy = light ? "text-[#121713]" : "text-[#e4e4e4]";
  const title = light ? "text-[#121713]" : "text-[#e4e4e4]";

  return (
    <ul>
      {items.map((item) => {
        const isOpen = open === item.title;
        return (
          <li key={item.title} className={`border-t last:border-b ${line}`}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : item.title)}
              className={`flex w-full items-center gap-4 px-4 py-4 text-left text-[1.15rem] font-semibold italic leading-[1.35] md:gap-16 md:px-[35px] md:py-5 md:text-[clamp(1.35rem,2.08vw,2.5rem)] md:leading-[1.5] ${title}`}
            >
              <span
                className={`w-6 shrink-0 text-center text-[24px] font-normal not-italic leading-none transition-transform duration-300 md:w-8 md:text-[30px] ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
              <span>
                {item.title}
                {item.comingSoon ? (
                  <span className="ml-4 font-semibold italic text-[#9eaca2]">
                    COMING SOON
                  </span>
                ) : null}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden" aria-hidden={!isOpen}>
                <div className="grid items-center gap-6 px-4 pb-7 md:grid-cols-[minmax(0,1fr)_minmax(110px,200px)] md:gap-16 md:px-0 md:pr-[35px] md:pb-10 md:pl-[83px]">
                  <p className={`whitespace-pre-line text-[15px] leading-relaxed md:text-[20px] ${copy}`}>
                    {item.body}
                  </p>
                  <img
                    src={item.image}
                    alt=""
                    className="mx-auto aspect-square w-full max-w-[200px] object-contain"
                  />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ButtonLabel({ children }: { children: ReactNode }) {
  return <span className="translate-y-[0.1em]">{children}</span>;
}

function ChatLink({ light }: { light?: boolean }) {
  return (
    <a
      href="#contact"
      className={`inline-flex h-[44px] w-full max-w-[256px] items-center justify-center rounded-[25px] text-[18px] font-semibold italic md:w-[256px] md:text-[20px] ${
        light
          ? "bg-[#121713] text-[#cff63a]"
          : "border-2 border-[#cff63a] bg-[#121713] text-[#cff63a]"
      }`}
    >
      <ButtonLabel>LET&apos;S CHAT</ButtonLabel>
    </a>
  );
}

const enterEase =
  "transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none";

const MENU_LINKS = [
  { href: "#about", label: "ABOUT" },
  { href: "#mission", label: "OUR MISSION" },
  { href: "#1", label: "DESIGN EDUCATION" },
  { href: "#contact", label: "CONTACT" },
] as const;

function RoundIconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black shadow-[inset_0_0_0_2px_#cff63a] md:h-11 md:w-11"
    >
      {children}
    </button>
  );
}

function DesignwiseNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (open) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 bg-[#121713] px-5 pt-4 pb-8 text-[#f2f2f2] md:px-8">
        <div className="flex items-center justify-between">
          <a
            href="https://digitangels.com"
            aria-label="Back to Digitangels"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-3 text-[19.2px] text-[#c1cdc4]"
          >
            <svg
              viewBox="0 0 28 16"
              aria-hidden="true"
              className="h-[0.55em] w-auto translate-y-[0.09em]"
              fill="none"
            >
              <path
                d="M10.5 1.75 2.25 8l8.25 6.25"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 8h23"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
            <span
              aria-hidden="true"
              className="block h-[1.15em] aspect-[640/133] bg-current [mask-image:url(/designwise/images/digitangels-wordmark.png)] [mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-image:url(/designwise/images/digitangels-wordmark.png)] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]"
            />
          </a>
          <RoundIconButton label="Close menu" onClick={() => setOpen(false)}>
            <span className="relative block h-4 w-4">
              <span className="absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 rotate-45 bg-[#cff63a]" />
              <span className="absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 -rotate-45 bg-[#cff63a]" />
            </span>
          </RoundIconButton>
        </div>
        <nav className="mt-4 flex flex-col items-start">
          {MENU_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-0.5 text-[26px] leading-[1.45] font-semibold text-[#f2f2f2] md:text-[32px] md:leading-[1.5]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-end justify-between gap-1.5 bg-gradient-to-t from-[#121713] from-35% to-transparent px-3 pb-3 pt-10 md:bottom-[37px] md:justify-end md:gap-2.5 md:bg-none md:px-6 md:pt-0 md:pb-0">
      <RoundIconButton
        label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M3 10.5 8 5.5 13 10.5"
            fill="none"
            stroke="#cff63a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </RoundIconButton>
      <a
        href="#mission"
        className="inline-flex h-10 min-w-0 flex-1 items-center justify-center rounded-full bg-[#cff63a] px-2 text-[11px] font-semibold italic text-black shadow-[inset_0_0_0_2px_#000] md:h-11 md:w-[256px] md:flex-none md:px-0 md:text-[20px]"
      >
        <ButtonLabel>OUR MISSION</ButtonLabel>
      </a>
      <a
        href="#1"
        className="inline-flex h-10 min-w-0 flex-1 items-center justify-center rounded-full bg-[#cff63a] px-2 text-[11px] font-semibold italic text-black shadow-[inset_0_0_0_2px_#000] md:h-11 md:w-[256px] md:flex-none md:px-0 md:text-[20px]"
      >
        <ButtonLabel>
          <span className="md:hidden">EDUCATION</span>
          <span className="hidden md:inline">DESIGN EDUCATION</span>
        </ButtonLabel>
      </a>
      <RoundIconButton label="Open menu" onClick={() => setOpen(true)}>
        <span className="flex w-4 flex-col gap-[4px]">
          <span className="block h-0.5 w-4 bg-[#cff63a]" />
          <span className="block h-0.5 w-4 bg-[#cff63a]" />
          <span className="block h-0.5 w-4 bg-[#cff63a]" />
        </span>
      </RoundIconButton>
    </nav>
  );
}

export function DesignwisePage() {
  const missionBar = useInView(0.55);
  const joinBar = useInView(0.6);
  const reasonsBar = useInView(0.45);

  return (
    <main className="overflow-x-hidden bg-[#121713] text-[#cecece]">
      <DesignwiseNav />

      <section className="sticky top-0 z-0 flex h-svh flex-col overflow-hidden bg-[#121713] pt-3 md:pt-5">
        <div className="relative z-20 -mb-1 w-full shrink-0 overflow-visible md:-mb-4">
          <ShrinkingWord />
        </div>

        <div className="relative z-0 min-h-0 flex-1">
          <video
            className="pointer-events-none absolute top-[40%] left-1/2 z-0 aspect-square w-[min(72vw,520px)] -translate-x-1/2 -translate-y-1/2 object-contain md:top-[46%] md:w-[min(46vw,768px)]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src="/designwise/videos/hero.mp4"
          />

          <div className="absolute inset-x-4 top-2 z-10 flex flex-col items-start gap-3 md:hidden">
            <p className="text-[22px] leading-[1.15] font-normal text-[#cecece]">
              Design Education
              <br />
              for Tech and beyond
            </p>
            <a
              href="#contact"
              className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full border border-[#cff63a] px-5 text-[13px] font-semibold italic text-[#cff63a]"
            >
              <ButtonLabel>CONTACT US</ButtonLabel>
            </a>
          </div>

          <div className="absolute top-0 left-5 z-10 hidden items-center gap-3 md:left-6 md:flex">
            <span className="translate-y-[0.14em] text-[clamp(1.25rem,1.8vw,2.1875rem)] font-normal text-[#cecece]">
              by
            </span>
            <a href="https://digitangels.com" className="inline-flex">
              <img
                src="/designwise/images/digitangels-wordmark.png"
                alt="digitangels"
                className="h-[53px] w-auto"
              />
            </a>
          </div>

          <div className="absolute top-0 right-5 z-10 hidden max-w-[46vw] text-right md:right-6 md:block">
            <p className="text-[clamp(1.15rem,1.8vw,2.1875rem)] leading-[1.2] font-normal text-[#cecece]">
              Design Education
              <br />
              for Tech and beyond
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex h-[42px] items-center justify-center rounded-full border border-[#cff63a] px-8 text-[20px] font-semibold italic text-[#cff63a]"
            >
              <ButtonLabel>CONTACT US</ButtonLabel>
            </a>
          </div>

          <div className="absolute bottom-[5.75rem] left-4 z-10 md:hidden">
            <a
              href="https://digitangels.com"
              className="mb-4 flex items-center gap-2"
            >
              <span className="translate-y-[0.14em] text-[16px] font-normal text-[#cecece]">
                by
              </span>
              <img
                src="/designwise/images/digitangels-wordmark.png"
                alt="digitangels"
                className="h-6 w-auto"
              />
            </a>
            <p className="text-[22px] leading-[1.15] font-semibold text-[#cecece]">
              FOR THE SMART.
              <br />
              FOR THE INNOVATIVE.
            </p>
          </div>

          <p className="absolute bottom-8 left-6 z-10 hidden text-[35.2px] leading-[1.2] font-semibold text-[#cecece] md:block">
            FOR THE SMART.
            <br />
            FOR THE INNOVATIVE.
          </p>
        </div>
      </section>

      <div className="relative z-10">
      <section
        id="mission"
        className="relative scroll-mt-20 overflow-hidden bg-[#c1cdc4] px-5 pt-12 pb-0 text-[#121713] md:scroll-mt-28 md:px-16 md:pt-24"
      >
        <Reveal>
          <h2 className="text-[clamp(2.1rem,5.4vw,5.125rem)] font-normal leading-[1.05]">
            At DESIGNWISE, we help companies advance their Design Maturity and
            make it the guiding principle in crafting exceptional Tech products
            and user experiences
          </h2>
        </Reveal>
        <div ref={missionBar.ref} className="relative -mx-5 mt-12 h-[72px] md:-mx-16 md:mt-24 md:h-[86px]">
          <p className="relative z-10 flex h-full w-[42%] items-center px-4 text-[17px] leading-tight font-semibold italic text-[#616a63] md:w-1/3 md:px-16 md:text-[clamp(1.6rem,2.8vw,2.5rem)] md:leading-normal">
            OUR MISSION
          </p>
          <div
            aria-hidden
            className={`absolute inset-y-0 right-0 w-2/3 rounded-tl-[100px] bg-[#9eaca2] ${enterEase} ${
              missionBar.shown ? "translate-x-0" : "translate-x-full"
            }`}
          />
        </div>
      </section>

      <section id="about" className="scroll-mt-20 bg-[#121713] md:scroll-mt-28">
        <div className="relative px-5 pt-10 md:px-16">
          <p className="mb-4 text-right text-[clamp(1.4rem,2.4vw,2.5rem)] font-semibold italic text-white/45">
            ABOUT US
          </p>
          <LazyVideo
            src="/designwise/videos/about.mp4"
            className="mx-auto block h-auto w-full max-w-[640px] object-contain"
          />
        </div>

        <div className="px-5 py-14 md:px-16 md:py-20">
          <Reveal>
            <p className="text-[clamp(1.35rem,2.35vw,2.5rem)] font-normal leading-[1.25] text-white">
              DESIGNWISE is the educational wing of Digitangels, dedicated to
              elevating the understanding and impact of design on the business
              world. Our team of seasoned Design Leaders, with extensive
              experience in product, branding, and design management, is
              passionately committed to advancing design leadership and
              maturity. We champion the importance of quality design across the
              tech industry and beyond, helping businesses recognise and
              harness the power of strategic design.
            </p>
          </Reveal>

          <div className="mt-14 grid items-center gap-10 md:mt-20 md:grid-cols-[minmax(220px,334px)_minmax(0,1fr)] md:gap-16">
            <Reveal>
              <img
                src="/designwise/images/team-constellation.png"
                alt="A constellation of people linked around the world"
                className="mx-auto w-full max-w-[334px]"
              />
            </Reveal>
            <Reveal delay={80}>
              <p className="text-[clamp(1.25rem,2.1vw,2.5rem)] font-normal leading-[1.28] text-white">
                From the years of networking, mentoring, and being part of
                various organisations and communities, we have formed a highly
                professional team of design practitioners, researchers,
                educators – where talent knows no bounds and creativity
                flourishes across vast areas of design expertise. From branding
                to product and UX/UI design, user research, web design,
                illustration, animation, design systems, and design management,
                our team brings a wealth of knowledge and experience to every
                project.
              </p>
            </Reveal>
          </div>
        </div>

        <div ref={joinBar.ref} className="relative h-[86px] overflow-hidden">
          <div
            className={`absolute inset-y-0 right-0 flex w-full items-center rounded-tl-[40px] bg-[#cff63a] px-5 md:w-max md:max-w-full md:rounded-tl-[64px] md:px-16 ${enterEase} ${
              joinBar.shown ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <p className="text-[14px] leading-snug font-semibold italic text-[#121713] md:whitespace-nowrap md:text-[clamp(0.95rem,2.5vw,2.5rem)]">
              JOIN US IN REDIFINING EXCELLENCE IN DESIGN!
            </p>
          </div>
        </div>
      </section>

      <section
        id="reasons"
        className="relative scroll-mt-20 overflow-hidden bg-[#c1cdc4] px-5 py-16 text-[#121713] md:scroll-mt-28 md:px-16 md:py-24"
      >
        <Reveal>
          <h2 className="text-[clamp(2rem,4.8vw,5.4rem)] font-normal leading-[1.05]">
            Most probably, you came here for
          </h2>
        </Reveal>
        <div ref={reasonsBar.ref} className="relative mt-4">
          <div
            aria-hidden
            className={`pointer-events-none absolute bottom-[0.08em] left-1/2 z-0 h-[72px] w-screen origin-left -translate-x-1/2 bg-[#9eaca2] md:h-[86px] ${enterEase} ${
              reasonsBar.shown ? "scale-x-100" : "scale-x-0"
            }`}
          />
          <h2 className="relative z-10 text-[clamp(3.4rem,22vw,12.5rem)] font-semibold italic leading-[0.85] tracking-tight md:text-[clamp(4.5rem,14vw,12.5rem)]">
            2 REASONS
          </h2>
        </div>
        <img
          src="/designwise/images/chevron.png"
          alt=""
          className="designwise-caret pointer-events-none absolute right-3 bottom-4 z-10 h-12 w-auto md:right-8 md:bottom-8 md:h-[120px]"
        />
      </section>

      <div className="bg-[#121713] py-8 md:py-0">
        <LazyVideo
          src="/designwise/videos/reasons.mp4"
          className="mx-auto block h-auto w-full max-w-[720px] object-contain"
        />
      </div>

      <section
        id="1"
        className="scroll-mt-20 bg-[#121713] px-6 pt-16 pb-0 md:scroll-mt-28 md:px-[35px] md:pt-24 md:pb-0"
      >
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 md:gap-x-16">
          <p className="font-semibold text-[clamp(4.5rem,18vw,12.5rem)] italic leading-[0.9] text-[#9eaca2] md:text-[clamp(6.5rem,10.4vw,12.5rem)]">
            1
          </p>
          <h2 className="pt-2 text-[clamp(1.45rem,6.2vw,5.375rem)] font-normal leading-[1.05] text-[#9eaca2] md:pt-3 md:text-[clamp(1.85rem,4.5vw,5.375rem)] md:leading-none">
            You are ready for the next level of Design Excellence, and
            interested in improving the following areas:
          </h2>
        </div>

        <div className="-mx-6 mt-12 md:-mx-[35px] md:mt-16">
          <AreaList items={AREAS} />
        </div>

        <div className="-mx-6 flex flex-col items-start gap-[26px] px-6 pt-12 pb-16 min-[1100px]:-mx-[35px] min-[1100px]:pt-[70px] min-[1100px]:pr-[21px] min-[1100px]:pb-[85px] min-[1100px]:pl-[57.4%]">
          <p className="w-full text-left text-[20px] leading-6 font-normal text-[#e4e4e4]">
            We are happy to offer our support in the multiple areas, or only in
            some part of one area – flexibility is key! Also, if you have a
            special request that is not listed above – do let us know,
            we&apos;ll be happy to chat and find out if we can be of help.
          </p>
          <ChatLink />
        </div>
      </section>

      <div className="bg-[#e8e8e8]">
        <LazyVideo
          src="/designwise/videos/bridge.mp4"
          className="mx-auto block h-auto w-full max-w-[720px] object-contain"
        />
      </div>

      <section
        id="2"
        className="scroll-mt-20 bg-[#e8e8e8] px-6 pt-16 pb-0 text-[#616a63] md:scroll-mt-28 md:px-[35px] md:pt-24 md:pb-0"
      >
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 md:gap-x-16">
          <p className="font-semibold text-[clamp(4.5rem,18vw,12.5rem)] italic leading-[0.9] text-[#616a63] md:text-[clamp(6.5rem,10.4vw,12.5rem)]">
            2
          </p>
          <h2 className="pt-2 text-[clamp(1.45rem,6.2vw,5.375rem)] font-normal leading-[1.05] text-[#616a63] md:pt-3 md:text-[clamp(1.85rem,4.5vw,5.375rem)] md:leading-none">
            You feel that your design team needs expert support with certain
            aspects of Design Maturity / Design Leadership
          </h2>
        </div>

        <div className="-mx-6 mt-12 md:-mx-[35px] md:mt-16">
          <AreaList items={SUPPORT} light />
        </div>

        <div className="-mx-6 flex flex-col items-start gap-[26px] px-6 pt-12 pb-16 min-[1100px]:-mx-[35px] min-[1100px]:pt-[70px] min-[1100px]:pr-[21px] min-[1100px]:pb-[85px] min-[1100px]:pl-[57.4%]">
          <p className="w-full text-left text-[20px] leading-6 font-normal text-[#121713]">
            Feel free to let us know what design area is most challenging in
            your company, even if it&apos;s not listed in trainings and
            workshops above. We&apos;ll be happy to tailor our support to the
            specific needs of your design team.
          </p>
          <ChatLink light />
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-20 bg-[#121713] px-5 pt-16 pb-28 text-white md:scroll-mt-28 md:px-16 md:py-24"
      >
        <Reveal>
          <h2 className="text-center text-[22px] font-semibold leading-tight text-[#f2f2f2] min-[810px]:whitespace-nowrap min-[810px]:text-[30px] min-[810px]:leading-none min-[1440px]:text-[70px]">
            LET&apos;S GET TO KNOW EACH OTHER
          </h2>
          <p className="mt-4 text-center text-[14px] leading-snug font-semibold text-[#f2f2f2] min-[810px]:mt-5 min-[810px]:whitespace-nowrap min-[810px]:text-[20px] min-[810px]:leading-none min-[1440px]:text-[40px]">
            Drop us a line on{" "}
            <a href="mailto:designwise@digitangels.com" className="text-[#cff63a]">
              designwise@digitangels.com
            </a>{" "}
            or fill a short form below:
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl items-center gap-10 md:mt-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)]">
          <LazyVideo
            src="/designwise/videos/contact.mp4"
            className="mx-auto block h-auto w-full max-w-[400px] object-contain"
          />
          <DesignwiseForm />
        </div>
      </section>
      </div>
    </main>
  );
}

function DesignwiseForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [honeypot, setHoneypot] = useState("");
  const loadedAt = useRef(Date.now());

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: "Designwise",
          inbox: "designwise",
          message: form.message,
          _hp: honeypot,
          _t: Date.now() - loadedAt.current,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-lg bg-[#ebebeb] px-4 py-3 text-[16px] text-[#121614] outline-none placeholder:text-[#121614]/60";

  return (
    <form onSubmit={handleSubmit} className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden
        className="absolute -left-[9999px] opacity-0"
      />
      <input
        required
        placeholder="Name"
        aria-label="Name"
        value={form.name}
        onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        className={field}
      />
      <input
        required
        type="email"
        placeholder="Email"
        aria-label="Email"
        value={form.email}
        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        className={field}
      />
      <textarea
        required
        placeholder="Message"
        aria-label="Message"
        rows={6}
        value={form.message}
        onChange={(event) =>
          setForm((prev) => ({ ...prev, message: event.target.value }))
        }
        className={`${field} resize-none sm:col-span-2`}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-[#cff63a] py-3 text-[16px] text-[#121614] disabled:opacity-60 sm:col-span-2"
      >
        <span className="inline-block translate-y-[0.12em]">
          {status === "sending" ? "Sending" : "Send"}
        </span>
      </button>
      {status === "success" ? (
        <p className="text-[15px] text-[#cff63a] sm:col-span-2">
          Thank you. We&apos;ll be in touch.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-[15px] text-[#cff63a] sm:col-span-2">
          Something went wrong. Email us at designwise@digitangels.com.
        </p>
      ) : null}
    </form>
  );
}
