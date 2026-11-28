"use client";

import { useState } from "react";
import styles from "./dvor-studies.module.css";

const CANVAS = { w: 2560, h: 1300 };
const CARD = { w: 320, h: 180 };
const SHOT = "/projects/dvor/press/screenshots";
const UX = "/projects/dvor/ux";

type Node = { id: string; n: string; name: string; note?: string; x: number; y: number; src: string; source: "In game" | "Figma"; alt: string };

const NODES: Node[] = [
  { id: "analytics", n: "00", name: "Analytics", note: "First launch only", x: 40, y: 70, src: `${UX}/analytics.png`, source: "Figma", alt: "Analytics consent: anonymous play data, changeable in Settings" },
  { id: "menu", n: "01", name: "Main menu", note: "Start · Daily · Leaderboard · Settings · Quit", x: 40, y: 545, src: `${SHOT}/01_dvor_mainmenu.png`, source: "In game", alt: "Main menu with Start, Daily Challenge, Leaderboard, Settings and Quit" },
  { id: "seasons", n: "02", name: "Season select", note: "Choose the starting atmosphere", x: 600, y: 70, src: `${SHOT}/09_dvor_seasonselector.png`, source: "In game", alt: "Season selector over the summer courtyard" },
  { id: "tutorial", n: "03", name: "Tutorial", note: "Explains gaps and the Panelka", x: 1000, y: 70, src: `${SHOT}/05_dvor_tutorial.png`, source: "In game", alt: "Panelka tutorial on the playfield" },
  { id: "run", n: "04", name: "Panelka run", note: "Four seasons, twelve speed levels", x: 1400, y: 70, src: `${SHOT}/03_dvor_winter.png`, source: "In game", alt: "A winter Panelka run with the façade forming" },
  { id: "pause", n: "05", name: "Pause", x: 1800, y: 70, src: `${SHOT}/02_dvor_pause.png`, source: "In game", alt: "Pause menu over the playfield" },
  { id: "gameover", n: "06", name: "Game over", note: "Changes with the result ↓", x: 2200, y: 70, src: `${UX}/gameover-newpb.png`, source: "Figma", alt: "Game over design with a new high score badge" },
  { id: "dailyBrief", n: "07", name: "Daily brief", note: "Same pieces. One try.", x: 600, y: 390, src: `${UX}/tutorial-daily.png`, source: "Figma", alt: "Daily Challenge brief: same pieces, one attempt, one worldwide leaderboard" },
  { id: "dailyRun", n: "08", name: "Daily run", note: "Seeded sequence, one attempt", x: 1000, y: 390, src: `${SHOT}/10_dvor_autumn.png`, source: "In game", alt: "An autumn run on the playfield" },
  { id: "leaderboard", n: "09", name: "Leaderboard", note: "Panelka and Daily, all platforms", x: 1400, y: 710, src: `${SHOT}/06_dvor_leaderboard.png`, source: "In game", alt: "Leaderboard with Panelka and Daily Challenge tabs" },
  { id: "settings", n: "10", name: "Settings", note: "DAS / ARR presets and sliders", x: 600, y: 1030, src: `${SHOT}/04_dvor_settings.png`, source: "In game", alt: "Settings for gameplay, audio and visuals" },
  { id: "controls", n: "11", name: "Controls", note: "Keyboard and gamepad", x: 1000, y: 1030, src: `${SHOT}/07_dvor_controls.png`, source: "In game", alt: "Control mapping for keyboard and gamepad" },
];

type Edge = { from: string; to: string; d: string; label?: string; lx?: number; ly?: number; anchor?: "start" | "middle" | "end"; both?: boolean };

const cx = (id: string) => NODES.find((n) => n.id === id)!;
const right = (id: string) => cx(id).x + CARD.w;
const midY = (id: string) => cx(id).y + CARD.h / 2;
const BUS = 400;

const EDGES: Edge[] = [
  { from: "analytics", to: "menu", d: `M200 300V535`, label: "CONTINUE", lx: 214, ly: 425 },
  { from: "menu", to: "seasons", d: `M360 ${midY("menu")}H${BUS}V${midY("seasons")}H590`, label: "START", lx: 410, ly: midY("seasons") - 12 },
  { from: "menu", to: "dailyBrief", d: `M${BUS} ${midY("menu")}V${midY("dailyBrief")}H590`, label: "DAILY CHALLENGE", lx: 410, ly: midY("dailyBrief") - 12 },
  { from: "menu", to: "leaderboard", d: `M${BUS} ${midY("menu")}V${midY("leaderboard")}H1390`, label: "LEADERBOARD", lx: 410, ly: midY("leaderboard") - 12 },
  { from: "menu", to: "settings", d: `M${BUS} ${midY("menu")}V${midY("settings")}H590`, label: "SETTINGS", lx: 410, ly: midY("settings") - 12 },
  { from: "menu", to: "quit", d: `M200 ${cx("menu").y + CARD.h + 52}V${cx("menu").y + CARD.h + 130}`, label: "QUIT → DESKTOP", lx: 214, ly: cx("menu").y + CARD.h + 112 },
  { from: "seasons", to: "tutorial", d: `M${right("seasons")} ${midY("seasons")}H990` },
  { from: "tutorial", to: "run", d: `M${right("tutorial")} ${midY("tutorial")}H1390` },
  { from: "run", to: "pause", d: `M${right("run")} ${midY("run") - 18}H1790`, both: true, label: "ESC ⇄", lx: 1760, ly: midY("run") - 30, anchor: "middle" },
  { from: "run", to: "gameover", d: `M1560 70V34H2360V60`, label: "TOP OUT", lx: 1960, ly: 24, anchor: "middle" },
  { from: "dailyBrief", to: "dailyRun", d: `M${right("dailyBrief")} ${midY("dailyBrief")}H990` },
  { from: "dailyRun", to: "leaderboard", d: `M${right("dailyRun")} ${midY("dailyRun")}H1560V700`, label: "STRAIGHT TO RESULTS", lx: 1336, ly: midY("dailyRun") - 12 },
  { from: "gameover", to: "leaderboard", d: `M2360 ${cx("gameover").y + CARD.h + 60}V${midY("leaderboard")}H1730`, label: "VIEW LEADERBOARD · TOP 10", lx: 2346, ly: midY("leaderboard") - 12, anchor: "end" },
  { from: "settings", to: "controls", d: `M${right("settings")} ${midY("settings")}H990` },
];

export function DvorUxFlow() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const focus = hovered ?? focused;
  const linked = (e: Edge) => focus !== null && (e.from === focus || e.to === focus);
  const near = new Set(focus ? [focus, ...EDGES.filter(linked).flatMap((e) => [e.from, e.to])] : []);

  return (
    <div className={styles.flowScroll}>
      <div className={styles.flow} style={{ aspectRatio: `${CANVAS.w} / ${CANVAS.h}` }} data-focus={focus !== null}>
        <svg className={styles.flowEdges} viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`} aria-hidden="true">
          <defs>
            <marker id="dvor-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill="currentColor" />
            </marker>
          </defs>
          {EDGES.map((e) => (
            <g key={`${e.from}-${e.to}`} className={styles.edge} data-on={linked(e)}>
              <path d={e.d} markerEnd="url(#dvor-arrow)" markerStart={e.both ? "url(#dvor-arrow)" : undefined} />
              {e.label ? <text x={e.lx} y={e.ly} textAnchor={e.anchor ?? "start"}>{e.label}</text> : null}
            </g>
          ))}
        </svg>
        {NODES.map((node) => (
          <figure
            key={node.id}
            className={styles.node}
            data-near={near.has(node.id)}
            tabIndex={0}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setFocused(node.id)}
            onBlur={() => setFocused(null)}
            style={{
              left: `${(node.x / CANVAS.w) * 100}%`,
              top: `${(node.y / CANVAS.h) * 100}%`,
              width: `${(CARD.w / CANVAS.w) * 100}%`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={node.src} alt={node.alt} loading="lazy" decoding="async" width={1920} height={1080} />
            <em className={styles.source} data-source={node.source}>{node.source}</em>
            <figcaption title={node.note}>{node.n} · {node.name}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
