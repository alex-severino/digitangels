import type { CSSProperties } from "react";
import type { ProjectHeroTheme } from "@/data/project-heroes";
import type { Project } from "@/data/projects";
import styles from "./project-hero.module.css";

/** The first sentence leads the header; the rest of the description follows below. */
function splitDescription(text: string): [string, string] {
  const match = text.match(/^([\s\S]+?[.!?])\s+(?=[A-Z“"‘'])/);
  return match ? [match[1], text.slice(match[0].length)] : [text, ""];
}

/** Rounded bumps around a rectangle: NU Data's scalloped card shape. */
function scallops(x: number, y: number, w: number, h: number, r: number) {
  const dots: [number, number][] = [];
  const step = r * 1.7;
  for (let i = x; i <= x + w; i += step) dots.push([i, y], [i, y + h]);
  for (let j = y + step; j < y + h; j += step) dots.push([x, j], [x + w, j]);
  return dots;
}

/** The pink scalloped card from the NU Data slides, bleeding off the corner. */
function NuDataScallop() {
  return (
    <svg className={styles.nuScallop} viewBox="0 0 440 170" aria-hidden="true">
      <g fill="#f2a6c9">
        <rect x="20" y="0" width="420" height="138" />
        {scallops(20, 0, 420, 138, 16).map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="16" />
        ))}
      </g>
    </svg>
  );
}

/** Points rising like the dashboard's emissions scatter, ending in the AI star. */
const SIGNAL = Array.from({ length: 18 }, (_, i) => {
  const t = i / 17;
  const rise = (Math.exp(2.6 * t) - 1) / (Math.exp(2.6) - 1);
  return {
    x: 16 + t * 236,
    y: 276 - 214 * rise + (((i * 37) % 7) - 3) * 2.4,
    opacity: 0.35 + 0.65 * t,
  };
});

function NuDataSignal() {
  return (
    <svg className={styles.nuSignal} viewBox="0 0 360 300" aria-hidden="true">
      {SIGNAL.map(({ x, y, opacity }, i) => (
        <circle
          key={x}
          className={styles.nuDot}
          style={{ "--i": i } as CSSProperties}
          cx={x}
          cy={y}
          r="5"
          fill="#6580b9"
          opacity={opacity}
        />
      ))}
      {/* Groups hold the placement so CSS transforms can animate the shapes. */}
      <g transform="translate(178 -50)">
        <path
          className={styles.nuBlob}
          fill="#dd723f"
          d="M28 118 C46 84 104 84 124 112 C146 144 128 196 86 202 C40 208 8 156 28 118 Z"
        />
      </g>
      <g transform="translate(164 -48)">
        <path
          className={styles.nuStar}
          fill="#766fd7"
          stroke="#766fd7"
          strokeWidth="10"
          strokeLinejoin="round"
          d="M118 66 C124 106 140 122 180 128 C140 134 124 150 118 190 C112 150 96 134 56 128 C96 122 112 106 118 66 Z"
        />
      </g>
    </svg>
  );
}

/**
 * Header for projects without a bespoke case study, built like the Giclée
 * Club, Dvor and Studio Betonika headers and dressed in each project's own
 * colours and motif.
 */
export function BrandedProjectHero({ project, theme }: { project: Project; theme: ProjectHeroTheme }) {
  const [summary, rest] = splitDescription(project.description);

  return (
    <header className={`${styles.hero} ${styles[theme.look]}`}>
      {theme.look === "nuData" ? <NuDataScallop /> : null}
      <div className={styles.kicker}>
        <h1>{project.title}</h1>
        <span>{project.categories.slice(0, 3).join(" · ")}</span>
      </div>

      <div className={styles.heroLead}>
        <p className={styles.title}>
          {theme.headline.lead} <em>{theme.headline.accent}</em>
        </p>
        {theme.look === "nuData" ? <NuDataSignal /> : null}
        <div className={styles.summary}>
          <p>{summary}</p>
          {theme.note ? <p className={styles.note}>{theme.note}</p> : null}
          {project.link ? (
            <a className={styles.link} href={project.link.href} target="_blank" rel="noreferrer">
              {project.link.label} ↗
            </a>
          ) : null}
        </div>
      </div>

      <div className={styles.details}>
        {rest ? <p>{rest}</p> : <span />}
        <ul>
          {project.roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
      </div>
    </header>
  );
}
