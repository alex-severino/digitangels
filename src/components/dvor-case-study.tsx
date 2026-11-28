import Link from "next/link";
import { DvorConcretes } from "@/components/dvor-concretes";
import { DvorGameOverSpec } from "@/components/dvor-game-over";
import { DvorGameplayFilm } from "@/components/dvor-gameplay-film";
import { DvorSeasonStudy } from "@/components/dvor-season-study";
import { DvorUxBoard } from "@/components/dvor-ux-board";
import { DvorUxFlow } from "@/components/dvor-ux-flow";
import { Media } from "@/components/project-media";
import { dvorCover, dvorScreens, dvorTrailer, dvorWordmark, GAMEPLAY_URL, STEAM_URL } from "@/data/studio-projects";
import kit from "./dvor-studies.module.css";
import styles from "./studio-projects.module.css";

const KIT = "/projects/dvor/kit";

const FACTS = [
  ["Developer", "Studio Betonika"],
  ["Genre", "Falling-block puzzle"],
  ["Platforms", "Steam · Mac and PC"],
  ["Released", "1 September 2026"],
  ["Modes", "Panelka · Daily Challenge"],
  ["Built with", "Unity · C# · FMOD"],
] as const;

const SWATCHES = [
  ["Frieze red", "#9C1520"],
  ["Separator grey", "#979696"],
  ["Window fill", "#AEAEAE"],
  ["Window ring", "#979494"],
  ["Panel", "#CFCECE"],
  ["Playground ink", "#1B1B1B"],
] as const;

export function DvorCaseStudy() {
  return (
    <article className={`${styles.caseStudy} ${styles.dvorCase}`}>
      <header className={`${styles.hero} ${styles.dvorHero}`}>
        <div className={styles.kicker}><h1>Dvor</h1><span>Game design · Unity · original score</span></div>
        <div className={styles.heroLead}>
          <p className={styles.title}>Build a <em>courtyard.</em></p>
          <div>
            <p>
              Dvor takes its name from the courtyards between Soviet apartment
              blocks. It turns a falling-block puzzle into a place to build.
              As each piece locks, a concrete façade starts to take shape.
            </p>
            <a className={styles.link} href={STEAM_URL}>Dvor on Steam ↗</a>
          </div>
        </div>
      </header>
      <Media item={dvorCover} priority />

      <section className={`${styles.section} ${styles.trailers}`}>
        <div className={styles.sectionLead}>
          <h2>Meet the courtyard.</h2>
          <p>
            The reveal trailer sets the atmosphere. The gameplay film shows
            the decisions that make the wall come together, one drop at a time.
          </p>
        </div>
        <div className={styles.screenings}>
          <figure>
            <video className={styles.trailerFilm} src={dvorTrailer.src} poster={dvorTrailer.poster} aria-label={dvorTrailer.alt} controls playsInline preload="none" width={1920} height={1080} />
            <figcaption>Official launch trailer</figcaption>
          </figure>
          <figure>
            <DvorGameplayFilm />
            <figcaption>Gameplay <a href={GAMEPLAY_URL}>Watch on YouTube ↗</a></figcaption>
          </figure>
        </div>
      </section>

      <section id="dvor-sketch" className={`${styles.section} ${styles.sketchSection}`}>
        <figure className={kit.sketchPlate}>
          <Media item={{ type: "image", src: "/projects/dvor/sketch/dvor-graphite-mural.png", alt: "Detailed graphite drawing of Dvor’s courtyard, with five gray bands running down the central building and curving outward at its base", width: 1536, height: 1024 }} />
          <figcaption>Courtyard study with Dvor’s five-band façade mural.</figcaption>
        </figure>
      </section>

      <section className={`${styles.section} ${styles.paper}`}>
        <div className={styles.sectionLead}>
          <h2>What is a Panelka?</h2>
          <p>
            Panelka is a prefabricated apartment block. In Dvor, seven
            shapes called concretes fall into place to build one. As a
            piece locks, it reveals the part of the façade it filled.
            Complete twelve rows without a gap to finish the wall.
          </p>
        </div>
        <DvorConcretes />
      </section>

      <section className={`${styles.section} ${styles.rules}`}>
        <div className={styles.sectionLead}>
          <h2>Leave a gap. Change the game.</h2>
          <p>
            A clean wall builds upwards in Panelka. A gap changes the rules
            until the player clears back down to it. Reaching the target height
            with a clean wall triggers the Panelka reward. The board is both
            the puzzle and the thing the player is trying to build.
          </p>
        </div>
        <div className={styles.ruleProofs}>
          <figure><Media item={dvorScreens[4]} /><figcaption>The tutorial explains what a gap does to the wall.</figcaption></figure>
          <figure><Media item={dvorScreens[7]} /><figcaption>The Gold Transformation changes the façade and the atmosphere.</figcaption></figure>
        </div>
      </section>

      <section className={`${styles.section} ${styles.uxSection}`}>
        <div className={styles.sectionLead}>
          <h2>Every screen, mapped.</h2>
          <p>
            Follow Dvor from the first launch through a run, its results and the
            settings menu. Hover over a screen or focus it with the keyboard to
            trace its routes.
          </p>
        </div>
        <DvorUxFlow />

        <div className={`${styles.sectionLead} ${styles.subLead}`}>
          <h3>Nine ways a run can end.</h3>
          <p>
            The game-over screen changes with the result. A personal best earns
            a badge. A top-100 rank opens a pop-up with the player’s position.
            A top-10 rank adds a shortcut to the leaderboard. The Daily
            Challenge goes straight to the results.
          </p>
        </div>
        <DvorGameOverSpec />
        <details className={kit.uxArchive}>
          <summary>Open the original Figma wireframes</summary>
          <DvorUxBoard />
        </details>
      </section>

      <section className={`${styles.section} ${styles.atmosphere}`}>
        <div className={styles.sectionLead}>
          <h2>Four seasons. Four sounds.</h2>
          <p>
            The courtyard changes as the player progresses. Colour, lighting,
            weather and music all mark the shift. Explore the original Unity
            artwork and hear an excerpt of the score for each season.
          </p>
        </div>
        <DvorSeasonStudy />
      </section>

      <section className={`${styles.section} ${styles.paper}`}>
        <div className={styles.sectionLead}>
          <h2>A kit of courtyard parts.</h2>
          <p>
            The menus use the same parts as the courtyard. A red frieze frames
            every panel. Rows of brackets, crosses and rings separate the menu
            items. The slide and the swing stay in the courtyard in every
            season.
          </p>
        </div>
        <ul className={kit.kit} aria-label="Courtyard kit of parts">
          <li data-span="3">
            <Media item={{ type: "image", src: `${KIT}/slide.svg`, alt: "Playground slide drawing", width: 839, height: 516 }} />
            <p><span>Slide</span><span>839 × 516</span></p>
          </li>
          <li data-span="3">
            <Media item={{ type: "image", src: `${KIT}/swing.svg`, alt: "Playground swing drawing", width: 754, height: 387 }} />
            <p><span>Swing</span><span>754 × 387</span></p>
          </li>
          <li data-span="2">
            <Media item={{ type: "image", src: `${KIT}/frieze-top.svg`, alt: "Red zigzag frieze used along the top of every panel", width: 629, height: 82 }} />
            <p><span>Frieze · top</span><span>629 × 82</span></p>
          </li>
          <li data-span="2">
            <Media item={{ type: "image", src: `${KIT}/frieze-top.svg`, alt: "The same frieze flipped to run along the bottom of every panel", width: 629, height: 82 }} className={kit.mirrored} />
            <p><span>Frieze · bottom, flipped</span><span>629 × 82</span></p>
          </li>
          <li data-span="2">
            <Media item={{ type: "image", src: `${KIT}/round-window.svg`, alt: "Round window from the courtyard buildings", width: 278, height: 278 }} className="block h-auto w-[min(100%,9rem)] justify-self-center" />
            <p><span>Round window</span><span>278 × 278</span></p>
          </li>
          <li data-span="2" data-repeat>
            <Media item={{ type: "image", src: `${KIT}/separator-brackets.svg`, alt: "Separator: a row of five concrete brackets", width: 468, height: 68 }} />
            <p><span>Separator · brackets</span><span>468 × 68</span></p>
          </li>
          <li data-span="2" data-repeat>
            <div className="flex justify-center gap-[6%] self-center">
              {Array.from({ length: 5 }, (_, i) => (
                <Media key={i} item={{ type: "image", src: `${KIT}/concrete-cross.svg`, alt: i === 0 ? "Separator: a row of five concrete crosses" : "", width: 60, height: 60 }} className="block h-[clamp(1.4rem,2.6vw,2.4rem)] w-auto" />
              ))}
            </div>
            <p><span>Separator · crosses</span><span>60 × 60 each</span></p>
          </li>
          <li data-span="2" data-repeat>
            <Media item={{ type: "image", src: `${KIT}/separator-rings.svg`, alt: "Separator: a row of five rings", width: 390, height: 62 }} />
            <p><span>Separator · rings</span><span>390 × 62</span></p>
          </li>
          <li data-span="6" style={{ gridColumn: "1 / -1" }}>
            <div className={kit.swatches}>
              {SWATCHES.map(([name, hex]) => (
                <span key={hex}><i style={{ background: hex }} />{name}<br />{hex}</span>
              ))}
            </div>
            <p><span>Kit colours</span><span>From the source SVGs</span></p>
          </li>
        </ul>
      </section>

      <section className={`${styles.section} ${styles.paper}`}>
        <div className={styles.sectionLead}>
          <h2>The systems behind the wall.</h2>
          <p>
            The game was built and shipped in Unity with C#. The board tracks
            the cells you fill. The façade renders those placements as part of
            a building, while the atmosphere gives each stage of the run its
            own visual and musical character.
          </p>
        </div>
        <dl className={styles.systems}>
          <div><dt>A level change can leave the score playing.</dt><dd>Unity passes the atmosphere state to FMOD. Faster tiers within one season keep the same track running. When the season changes, the game starts the new track without waiting for the old loop to finish.</dd></div>
          <div><dt>One puzzle for the day.</dt><dd>The Daily Challenge uses a date-based seed so everyone gets the same piece sequence. The leaderboard gives that shared puzzle a competitive result.</dd></div>
          <div><dt>The player sets the pace of the controls.</dt><dd>Rebindable inputs and adjustable repeat timing let players choose how quickly a held direction begins to move and how fast it repeats.</dd></div>
        </dl>
      </section>

      <section className={`${styles.section} ${styles.release}`}>
        <div className={styles.sectionLead}>
          <h2>From courtyard to release.</h2>
          <div>
            <p>
              The same concrete panels and painted stripes carry from the
              game into the release artwork. Dvor shipped on Steam for PC and
              Mac, with its own identity, control system and original score.
            </p>
            <a className={styles.link} href={STEAM_URL}>Play Dvor on Steam ↗</a>
            <Link className={styles.link} href="/projects/studio-betonika">Explore the Studio Betonika identity →</Link>
          </div>
        </div>
        <dl className={kit.facts}>
          {FACTS.map(([term, value]) => (
            <div key={term}><dt>{term}</dt><dd>{value}</dd></div>
          ))}
        </dl>
        <div className={styles.releaseArt}>
          <Media item={{ type: "image", src: "/projects/dvor/press/key-art/dvor_vertical.png", alt: "Dvor vertical launch key art", width: 2400, height: 3600 }} />
          <Media item={{ type: "image", src: "/projects/dvor/press/key-art/dvor_square.png", alt: "Square Dvor launch artwork in the concrete and rainbow-stripe identity", width: 2048, height: 2048 }} />
          <div className={styles.logoSpecimens}>
            <div><Media item={{ ...dvorWordmark, alt: "Black Dvor wordmark" }} /></div>
            <div><Media item={{ ...dvorWordmark, alt: "White Dvor wordmark" }} /></div>
          </div>
        </div>
      </section>
    </article>
  );
}
