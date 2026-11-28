"use client";

import { useState } from "react";
import styles from "./dvor-studies.module.css";

const DESIGNS = {
  pb: { src: "/projects/dvor/ux/gameover-pb.png", title: "Personal best shown", alt: "Game over design showing the player’s personal best above their score" },
  newpb: { src: "/projects/dvor/ux/gameover-newpb.png", title: "New high score", alt: "Game over design with a red New High Score badge" },
  rank: { src: "/projects/dvor/ux/gameover-top10.png", title: "Ranked result", alt: "Game over design used behind the ranking pop-up" },
} as const;
type Design = keyof typeof DESIGNS;

const RULES: { mode: string; result: string; flow: string; design?: Design }[] = [
  { mode: "Panelka / Olympics", result: "No PB", flow: "Game over: score, PB, buttons", design: "pb" },
  { mode: "Panelka / Olympics", result: "New PB, not top 100", flow: "Same + NEW PERSONAL BEST badge", design: "newpb" },
  { mode: "Panelka / Olympics", result: "Top 100, not top 10", flow: "Same + congrats pop-up: rank, close only", design: "rank" },
  { mode: "Panelka / Olympics", result: "Top 10", flow: "Same + congrats pop-up: rank, VIEW LEADERBOARD, close", design: "rank" },
  { mode: "Daily Challenge", result: "Any", flow: "Straight to leaderboard, congrats pop-up if top 10 today" },
  { mode: "Sprint", result: "No PB", flow: "Sprint result panel: time, PB, Play again, Main menu" },
  { mode: "Sprint", result: "New PB, not top 100", flow: "Same + NEW PERSONAL BEST" },
  { mode: "Sprint", result: "Top 100, not top 10", flow: "Same + congrats pop-up: rank, close only" },
  { mode: "Sprint", result: "Top 10", flow: "Same + congrats pop-up: rank, VIEW LEADERBOARD, close" },
];

export function DvorGameOverSpec() {
  const [active, setActive] = useState<Design>("newpb");

  return (
    <div className={styles.spec}>
      <table className={styles.specTable}>
        <caption>Game over flow spec, from the UX board</caption>
        <thead>
          <tr><th scope="col">Mode</th><th scope="col">Result</th><th scope="col">What the player sees</th></tr>
        </thead>
        <tbody>
          {RULES.map((rule, i) => (
            <tr
              key={i}
              data-active={rule.design === active}
              tabIndex={rule.design ? 0 : undefined}
              onMouseEnter={() => rule.design && setActive(rule.design)}
              onFocus={() => rule.design && setActive(rule.design)}
            >
              <td>{rule.mode}</td>
              <td>{rule.result}</td>
              <td>{rule.flow}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.specDesigns}>
        <figure className={styles.specPreview}>
          {(Object.keys(DESIGNS) as Design[]).map((key) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={key} src={DESIGNS[key].src} alt={DESIGNS[key].alt} data-active={active === key} loading="lazy" decoding="async" width={2371} height={1334} />
          ))}
          <figcaption>Figma · {DESIGNS[active].title}</figcaption>
        </figure>
        <div className={styles.specTabs} role="group" aria-label="Game over designs">
          {(Object.keys(DESIGNS) as Design[]).map((key) => (
            <button key={key} type="button" aria-pressed={active === key} onClick={() => setActive(key)}>
              {DESIGNS[key].title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
