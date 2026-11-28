import Link from "next/link";
import { BetonikaGlyphSpecimens } from "@/components/betonika-glyphs";
import { BetonikaHouse, BetonikaLockup } from "@/components/betonika-logo";
import { BetonikaLogoMaths } from "@/components/betonika-logo-maths";
import { Media } from "@/components/project-media";
import { COLORWAYS } from "@/data/betonika-logo";
import { STUDIO_URL, studioDesktop, studioMobile, studioMotion } from "@/data/studio-projects";
import styles from "./studio-projects.module.css";

export function StudioBetonikaCaseStudy() {
  return (
    <article className={`${styles.caseStudy} ${styles.studioCase}`}>
      <header className={`${styles.hero} ${styles.studioHero}`}>
        <div className={styles.kicker}><h1>Studio Betonika</h1><span>Type · motion · web</span></div>
        <div className={styles.heroLead}>
          <p className={styles.title}>Cast in <em>type.</em></p>
          <p>
            Angelina Severino took the geometry of a concrete apartment block
            and turned it into a name, a symbol and custom lettering for an
            independent game studio. One lit window gives the whole thing life.
          </p>
        </div>
        <div className={styles.logoPanel}>
          <BetonikaLockup className={styles.heroLogo} label="Studio Betonika lockup: a façade with one lit window beside the squared wordmark" />
        </div>
      </header>

      <section className={`${styles.section} ${styles.mathsSection}`}>
        <div className={styles.sectionLead}>
          <h2>How the façade lines up.</h2>
          <p>
            The lockup is held together by a few shared lines. The house runs
            from the x-height of “studio” to the baseline of “betonika”, and
            the lit window sits on its diagonal. The two rows share their edges,
            and every opening sits between the same two counter lines. The
            letters were tuned by eye, so the guides show alignment, not
            measurement.
          </p>
        </div>
        <BetonikaLogoMaths />
      </section>

      <section className={`${styles.section} ${styles.paper}`}>
        <div className={styles.sectionLead}>
          <h2>Build the letter like a wall.</h2>
          <p>
            The wordmark has the proportions of a façade. Strokes are broad and
            straight, openings are square, and the curves are replaced with
            cuts. Each letter below is drawn from the source vectors, with its
            counters, cuts and counter lines marked.
          </p>
        </div>
        <BetonikaGlyphSpecimens />
      </section>

      <section className={`${styles.section} ${styles.studioMotion}`}>
        <div className={styles.sectionLead}>
          <h2>Somebody’s home.</h2>
          <p>
            The mark uses a four-by-four grid with a single warm window. The
            animation takes its rhythm from lights coming on in a building at
            dusk. The lockup comes in three colourways from the studio files,
            and the house also works as a symbol on its own.
          </p>
        </div>
        <figure className={styles.motionFrame}>
          <Media item={studioMotion} className={styles.motionFilm} />
          <figcaption>Original logo animation from Angelina Severino’s portfolio.</figcaption>
        </figure>
        <ul className={styles.colorways} aria-label="Studio Betonika colourways">
          {COLORWAYS.map((colorway) => (
            <li key={colorway.name} style={{ background: colorway.ground }}>
              <BetonikaLockup colorway={colorway} label={`Studio Betonika lockup, ${colorway.name.toLowerCase()} colourway`} />
              <p>
                <strong>{colorway.name}</strong>
                <span><i style={{ background: colorway.body }} />{colorway.body}</span>
                <span><i style={{ background: colorway.windows }} />{colorway.windows}</span>
                <span><i style={{ background: colorway.lit }} />{colorway.lit}</span>
              </p>
            </li>
          ))}
          <li className={styles.houseTile}>
            <BetonikaHouse />
            <p><strong>Symbol</strong><span>Sixteen windows, one lit</span></p>
          </li>
        </ul>
      </section>

      <section className={`${styles.section} ${styles.paper}`}>
        <div className={styles.sectionLead}>
          <h2>The studio, online.</h2>
          <div>
            <p>
              The live site starts with the lit façade. Its square grid,
              concrete tones and restrained type set the stage for Dvor. In
              the site’s Next.js implementation, the window grid and the
              wordmark are rendered separately so the windows can animate
              without changing the lettering.
            </p>
            <a className={styles.link} href={STUDIO_URL}>Visit Studio Betonika ↗</a>
          </div>
        </div>
        <div className={styles.website}>
          <figure><Media item={studioDesktop} /><figcaption>Desktop homepage</figcaption></figure>
          <figure><Media item={studioMobile} /><figcaption>Mobile homepage</figcaption></figure>
        </div>
        <Link className={styles.link} href="/projects/dvor">See how the studio’s first game was made →</Link>
      </section>
    </article>
  );
}
