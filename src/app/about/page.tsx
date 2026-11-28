import type { Metadata } from "next";
import { About } from "@/components/chrome/about";
import { Clients } from "@/components/chrome/clients";
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

      <section id="alex" className={styles.alex} aria-labelledby="alex-name">
        <p className={styles.eyebrow}>Product &amp; engineering</p>
        <h2 id="alex-name" className={styles.alexName}>
          Alex <em className="dt-italic">Severino</em>
        </h2>

        <div className={styles.profileLayout}>
          <div className={styles.portrait}>
            <LensPortrait
              src="/images/alex-severino-centered.png"
              alt="Portrait of Alex Severino"
              position="object-center"
            />
          </div>

          <div className={styles.story}>
            <p className={styles.storyLead}>
              Alex turns product ideas into working software.
            </p>
            <p>
              At Digitangels, Alex works alongside Angelina to test ideas with
              users, decide what’s worth building and define the first release.
              He writes production code, connects it to the data and APIs a
              business already uses, and takes the product through to launch.
            </p>
            <p>
              He also designs and builds AI agents for workflows that need them.
              Alex defines which tools an agent can use, writes rules to check
              its results and makes sure it shows the evidence for its
              recommendations. He works with the client to decide when the
              agent can act and when a person should make the call.
            </p>
            <div className={styles.actions}>
              <a className={styles.github} href="https://github.com/alex-severino">
                Alex on GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Clients />
    </main>
  );
}
