import type { Metadata } from "next";
import { About } from "@/components/chrome/about";
import { Clients } from "@/components/chrome/clients";
import { Scene } from "@/components/chrome/scene";
import { LensPortrait } from "@/components/lens-portrait";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Angelina Severino and Alex Severino, the design and engineering team behind Digitangels.",
};

export default function AboutPage() {
  return (
    <main className={styles.about}>
      <header className={styles.masthead}>
        <div className={styles.signal} aria-hidden="true" />
        <p className={styles.eyebrow}>Design &amp; AI transformation advisory</p>
        <div className={styles.mastheadLayout}>
          <h1 className={styles.headline}>
            About <em className="dt-italic">Us</em>
          </h1>
          <div className={styles.intro}>
            <p>
              Digitangels is a London consultancy led by design director
              Angelina Severino. We work across brand, digital product and AI,
              and take the work through to production.
            </p>
            <nav className={styles.profiles} aria-label="On this page">
              <a href="#angelina">
                Angelina Severino <span aria-hidden="true">↓</span>
              </a>
              <a href="#alex">
                Alex Severino <span aria-hidden="true">↓</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      <About />

      {/* Same presentation as Angelina's section: the name slides apart on
          scroll and the portrait tucks up under it. */}
      <Scene
        as="section"
        mode="view"
        id="alex"
        className={`dt-about relative scroll-mt-[72px] overflow-hidden text-white md:scroll-mt-[88px] ${styles.alex}`}
      >
        <h2 className="dt-about-name pointer-events-none relative z-20 px-4 pt-24 font-semibold uppercase leading-[0.78] tracking-[-0.07em] md:px-8 md:pt-32">
          <span className="block text-[17vw] md:text-[15vw]">Alex</span>
          <span className={`dt-italic block text-[17vw] normal-case tracking-[-0.04em] md:text-[13vw] ${styles.surname}`}>
            Severino
          </span>
        </h2>

        <div className="relative -mt-[12vw] grid gap-10 px-4 pb-24 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 md:px-8 md:pb-36">
          <LensPortrait
            src="/images/alex-severino-centered.png"
            alt="Portrait of Alex Severino"
            position="object-top"
            /* Frame ends just above the arm (skin starts at row 1461 of 1559). */
            className="aspect-[1009/1452]! md:sticky md:top-24 md:self-start"
          />

          <div className="space-y-8 pt-4 text-[1.1rem] font-light leading-[1.5] text-[#f1f1f1] md:pt-[16vw] md:text-[1.35rem]">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
              Co-founder &amp; Product Advisor
            </p>
            <p className="text-[clamp(1.6rem,2.6vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
              Alex takes your product from <span className="dt-italic">0 to 1</span>,
              owning the strategy and shipping the code himself.
            </p>
            <p>
              He helps you decide what’s worth building, then builds it. Alex
              tests ideas with your users, defines the first release and writes
              the production code, connecting it to the data and APIs your
              business already relies on. Because one person owns both the
              product decisions and the code, nothing gets lost between
              strategy and launch.
            </p>
            <p>
              When a workflow needs AI, he designs and builds agents you can
              trust. Alex decides which tools an agent may use, writes checks
              for its results and makes it show the evidence behind every
              recommendation. You choose where the agent can act on its own and
              where a person makes the call.
            </p>
            <p className="text-white/70">
              He has taken products from first idea to launch in ad technology,
              games, fine-art printing, EV charging and education, for both
              businesses and consumers. Along the way he has managed technology
              partners, modelled what a product costs to run and built for web,
              PC and console. He works in English, Dutch, Portuguese and
              Spanish.
            </p>
            <div className={styles.actions}>
              <a className={styles.github} href="https://github.com/alex-severino">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.github} href="https://www.linkedin.com/in/alexseverinowork/">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </Scene>

      <Clients />
    </main>
  );
}
