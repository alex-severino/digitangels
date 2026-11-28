"use client";

import { useState } from "react";
import styles from "./dvor-studies.module.css";

const BOARD = "/projects/dvor/ux/ux-map.png";
const WIDTH = 4044;
const HEIGHT = 3701;

type Frame = { name: string; alt: string; origin: readonly [number, number] };

const GROUPS = [
  {
    label: "Start a run",
    note: "The first flow established the route from the main menu to a season, then back out through Pause.",
    frames: [
      { name: "Main menu", alt: "Title screen with four menu choices set into the courtyard façade.", origin: [213, 254] },
      { name: "Season selection", alt: "Season selector with Spring, Summer, Autumn and Winter above Play and Back.", origin: [771, 254] },
      { name: "Pause", alt: "Pause menu with Resume, Restart and Main Menu.", origin: [1329, 254] },
    ],
  },
  {
    label: "Finish a run",
    note: "The results had to make a personal best and a worldwide ranking legible at a glance.",
    frames: [
      { name: "Score and personal best", alt: "Game Over screen showing final score and existing personal best.", origin: [1887, 922] },
      { name: "New personal best", alt: "Game Over screen announcing a new high score.", origin: [1887, 588] },
      { name: "Worldwide rank", alt: "Game Over screen with a worldwide rank pop-up and a route to the leaderboard.", origin: [1887, 254] },
    ],
  },
  {
    label: "Settings and rankings",
    note: "The board worked through control timing, ranked results and what to show when there were no records yet.",
    frames: [
      { name: "Settings", alt: "Settings wireframe with ghost piece, repeat timing and volume options.", origin: [766, 2672] },
      { name: "Leaderboard", alt: "Leaderboard wireframe showing tabs for modes and a populated table.", origin: [763, 3052] },
      { name: "Empty leaderboard", alt: "Daily Challenge leaderboard with a No Records Yet message.", origin: [1329, 3052] },
    ],
  },
] as const;

function BoardFrame({ name, alt, origin: [x, y] }: Frame) {
  const frameWidth = 511;
  const frameHeight = 287;
  return (
    <figure className={styles.draftFrame}>
      <div className={styles.draftCrop} style={{ aspectRatio: `${frameWidth} / ${frameHeight}` }}>
        {/* Each window shares the same untouched export and exposes one frame. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BOARD}
          alt={alt}
          width={WIDTH}
          height={HEIGHT}
          loading="lazy"
          decoding="async"
          style={{
            width: `${(WIDTH / frameWidth) * 100}%`,
            top: `${(-y / frameHeight) * 100}%`,
            left: `${(-x / frameWidth) * 100}%`,
          }}
        />
      </div>
      <figcaption>{name}</figcaption>
    </figure>
  );
}

export function DvorUxBoard() {
  const [group, setGroup] = useState(0);
  const selection = GROUPS[group];

  return (
    <div className={styles.draftBoard}>
      <div className={styles.draftHeader}>
        <p>Working board · Figma</p>
        <a href={BOARD} target="_blank" rel="noreferrer">Open full board <span aria-hidden="true">↗</span></a>
      </div>
      <div className={styles.draftActions} role="group" aria-label="Working board views">
        {GROUPS.map(({ label }, i) => (
          <button key={label} type="button" aria-controls="dvor-ux-frames" aria-pressed={i === group} onClick={() => setGroup(i)}>
            {label}
          </button>
        ))}
      </div>
      <div id="dvor-ux-frames">
        <div className={styles.draftFrames} data-sequence={group === 0 || undefined}>
          {selection.frames.map((frame) => <BoardFrame key={frame.name} {...frame} />)}
        </div>
        <p className={styles.draftNote} aria-live="polite">{selection.note}</p>
      </div>
    </div>
  );
}
