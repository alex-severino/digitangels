import { Media, ProjectGallery } from "@/components/project-media";
import { GicleePreflightFilm } from "@/components/giclee-preflight-film";
import {
  HomepageScrollVisual,
  LondonStudioVisual,
  ResponsiveSiteVisual,
  TabletSiteVisual,
} from "@/components/giclee-site-visuals";
import {
  filePreparationVisuals,
  gicleeClub,
  identityVisuals,
  printTest,
  printVisuals,
  serviceContactSheet,
  serviceVisuals,
} from "@/data/giclee-club";
import styles from "./giclee-case-study.module.css";

const FILE_CHECKER = "https://www.gicleeclub.com/ai-preflight";

const workflow = [
  {
    title: "Read the file",
    body: "The browser reads file structure and metadata, then calculates effective resolution from the actual pixels, print size and crop. The artwork stays on the artist’s device.",
  },
  {
    title: "Investigate the options",
    body: "With the artist’s consent, the agent receives selected file facts. It chooses tools to compare sizes, look up studio rules or flag export issues, then grounds its recommendations in the tool results.",
  },
  {
    title: "Hand off to the studio",
    body: "The artist can bring a PDF with the chosen size, resolution and findings to the studio. A printmaker reviews the original artwork and makes the final call on sharpness, colour and finish.",
  },
];

export function GicleeCaseStudy() {
  return (
    <article className={styles.caseStudy}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.heroMeta}>
            <h1>{gicleeClub.title}</h1>
            <span>Fine art print house · London</span>
          </div>
          <div className={styles.heroLead}>
            <p className={styles.heroTitle}>
              <span>Fine art</span>{" "}
              <span className="dt-italic">Agentic AI</span>
            </p>
            <div className={styles.heroSummary}>
              <p>
                We gave Giclée Club a visual identity drawn from the print press
                and built an agentic AI product that investigates how an artwork
                file can go to print.
              </p>
              <a href="#preflight" className={styles.textLink}>
                Meet the preflight agent <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>

        <figure className={styles.heroFilm}>
          <GicleePreflightFilm />
          <figcaption>How preflight works · illustrated workflow</figcaption>
        </figure>
      </header>

      <section id="preflight" className={styles.engine}>
        <div className={styles.lead}>
          <h2>Before the ink</h2>
          <p>
            An artist has a file and a print in mind. They need to know how
            large it can go, what needs fixing and what a printmaker still needs
            to see. We designed preflight around those decisions. The file
            checker and PDF report are live. The agent is in private trial.
          </p>
        </div>

        <ol className={styles.workflow}>
          {workflow.map(({ title, body }) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>

        <aside className={styles.finding} aria-labelledby="giclee-example">
          <div className={styles.measurement}>
            <span><strong>128.3</strong> PPI</span>
            <p>2,400 × 3,000 pixels · cropped to fill A2</p>
          </div>
          <div className={styles.findingCopy}>
            <h3 id="giclee-example">Will this file work at A2?</h3>
            <p>
              In a trial with synthetic file data, the agent called five tools
              to investigate that question. It calculated the effective pixels
              per inch, checked the studio’s requirements and explored other
              print sizes. Each recommendation had to cite the result that
              supported it.
            </p>
            <a href={FILE_CHECKER} className={styles.textLink}>
              Try the live file checker <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
      </section>

      <section className={styles.identity}>
        <div className={styles.lead}>
          <h2>The print test became the identity</h2>
          <p>
            A test sheet makes the qualities of a print visible. We took its
            gradients, registration marks and colour strips into the graphic
            language, turning the accent on the é into a mark of its own. The
            same colours and forms carry through the service, the studio and
            the packaging.
          </p>
        </div>
        <div className={styles.gallery}>
          <figure className={styles.printTest}>
            <Media item={printTest} />
            <figcaption>The print test sheet behind the identity</figcaption>
          </figure>
          <ProjectGallery rows={identityVisuals} eagerFirstRow={false} />
        </div>
      </section>

      <section className={styles.service}>
        <div className={styles.lead}>
          <h2>Make the next decision clear</h2>
          <p>
            Choosing a paper, sizing an image and preparing a file are all
            decisions about the same print. The digital service brings them
            together. Earlier layouts show how we organised specialist
            advice around the questions artists bring to the studio.
          </p>
        </div>
        <div className={`${styles.gallery} ${styles.serviceMedia}`}>
          <ResponsiveSiteVisual />
          <ProjectGallery rows={serviceVisuals} eagerFirstRow={false} />
        </div>
        <div className={styles.serviceNote}>
          <h3>Give artists something they can act on</h3>
          <p>
            A low resolution reading is useful when it comes with options. The
            checker shows how size and placement change the result. The agent
            can compare those paths, explain why a file was flagged or ask for
            a decision about cropping. The report gives the artist and the
            printmaker the same information to start from.
          </p>
        </div>
        <div className={`${styles.gallery} ${styles.serviceMedia}`}>
          <ProjectGallery rows={filePreparationVisuals} eagerFirstRow={false} />
          <TabletSiteVisual />
          <LondonStudioVisual />
          <Media item={serviceContactSheet} />
          <HomepageScrollVisual />
        </div>
      </section>

      <section className={styles.studio}>
        <div className={styles.lead}>
          <h2>From screen to studio</h2>
          <p>
            The artist can arrive at the studio with a chosen size and a report
            that explains what the file supports. The printmaker can start with
            the decisions that need an eye. From the first file check to the
            certificate and the wrapped print, it feels like one service.
          </p>
        </div>
        <div className={styles.gallery}>
          <ProjectGallery rows={printVisuals} eagerFirstRow={false} />
        </div>
        <div className={styles.closing}>
          <a href="https://www.gicleeclub.com" className={styles.textLink}>
            Visit the print house <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </article>
  );
}
