/**
 * Branded headers for projects without a bespoke case study. Each one follows
 * the Giclée Club / Dvor / Studio Betonika header and borrows its colours and
 * motif from the project's own identity (see project-hero.module.css).
 */
export type ProjectHeroLook = "nuData" | "velvetHorizon" | "awu" | "crowdyhouse" | "hypernode";

export type ProjectHeroTheme = {
  look: ProjectHeroLook;
  headline: { lead: string; accent: string };
  /** Shown in the header beside the summary, e.g. confidentiality. */
  note?: string;
};

export const projectHeroes: Partial<Record<string, ProjectHeroTheme>> = {
  "nu-data": {
    look: "nuData",
    headline: { lead: "Ask the", accent: "data." },
    note: "NU Data is under NDA. What you see here is all we can show.",
  },
  "velvet-horizon": {
    look: "velvetHorizon",
    headline: { lead: "Clear and", accent: "blurred." },
  },
  "art-workers-united": {
    look: "awu",
    headline: { lead: "Unite the", accent: "arts." },
  },
  "crowdy-house": {
    look: "crowdyhouse",
    headline: { lead: "Made by", accent: "makers." },
  },
  hypernode: {
    look: "hypernode",
    headline: { lead: "Robust.", accent: "Intuitive." },
  },
};
