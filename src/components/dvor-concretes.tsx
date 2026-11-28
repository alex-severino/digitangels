"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PANELKA_BUILDS, type ConcreteKind, type Drop } from "@/data/dvor-panelka";
import styles from "./dvor-studies.module.css";

const COLS = 12;
const ROWS = 20;
const TARGET = 12;
const CELL = 100;
const FLASH_DURATION = 360;
const FLASH_COUNT = 3;
const TILE_INTERVAL = 40;
const FACADE = "/projects/dvor/concretes/facade.png";
const CONCRETE = "/projects/dvor/concretes/concrete.jpg";

/** Spawn orientations and names from Unity's PieceData. */
const CONCRETES = {
  single: { name: "Brick", cells: [[0, 0]] },
  shortBar: { name: "Beam", cells: [[0, 0], [1, 0], [2, 0]] },
  corner: { name: "Corner", cells: [[0, 1], [0, 0], [1, 0]] },
  longBar: { name: "Column", cells: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]] },
  cross: { name: "Cross", cells: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]] },
  u: { name: "Bracket", cells: [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1]] },
  slab: { name: "Panel", cells: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]] },
} as const satisfies Record<ConcreteKind, { name: string; cells: Drop["cells"] }>;

const ORNAMENTS = [
  { file: "concrete_I.png", name: "Checker" },
  { file: "concrete_J.png", name: "Window" },
  { file: "concrete_L.png", name: "Ring" },
  { file: "concrete_O.png", name: "Frame" },
  { file: "concrete_S.png", name: "Bracket" },
  { file: "concrete_T.png", name: "Hourglass" },
  { file: "concrete_Z.png", name: "Bars" },
];

const top = (row: number) => (ROWS - 1 - row) * CELL;

function shuffleUpperTiles() {
  const tiles = Array.from({ length: COLS * (ROWS - TARGET) }, (_, i) => i);
  for (let i = tiles.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  return tiles;
}

function outline(cells: Drop["cells"], height: number) {
  const edges = new Map<string, Set<string>>();

  // Opposing edges between adjacent cells cancel out. Only the perimeter remains.
  for (const [column, row] of cells) {
    const x = column * CELL;
    const y = (height - 1 - row) * CELL;
    const corners = [`${x} ${y}`, `${x + CELL} ${y}`, `${x + CELL} ${y + CELL}`, `${x} ${y + CELL}`];
    corners.forEach((start, i) => {
      const end = corners[(i + 1) % corners.length];
      const reverse = edges.get(end);
      if (reverse?.delete(start)) {
        if (reverse.size === 0) edges.delete(end);
      } else {
        if (!edges.has(start)) edges.set(start, new Set());
        edges.get(start)!.add(end);
      }
    });
  }

  const start = edges.keys().next().value!;
  const path = [`M${start}`];
  let point = start;
  do {
    point = edges.get(point)!.values().next().value!;
    path.push(`L${point}`);
  } while (point !== start);

  return `${path.join(" ")}Z`;
}

function MiniConcrete({ kind }: { kind: ConcreteKind }) {
  const { cells } = CONCRETES[kind];
  const width = Math.max(...cells.map(([x]) => x)) + 1;
  const height = Math.max(...cells.map(([, y]) => y)) + 1;
  return (
    <svg viewBox={`${((width - 5) * CELL) / 2 - 12} ${((height - 3) * CELL) / 2 - 12} 524 324`} aria-hidden="true">
      <path d={outline(cells, height)} className={styles.concreteShape} />
    </svg>
  );
}

export function DvorConcretes() {
  const [build, setBuild] = useState(0);
  const [placed, setPlaced] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [playback, setPlayback] = useState<"idle" | "playing" | "paused">("idle");
  const [reveal, setReveal] = useState<number[] | null>(null);
  const [reduced, setReduced] = useState(false);
  const board = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(query.matches);
      if (query.matches) setReveal(null);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = board.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const drops = PANELKA_BUILDS[build];
  const preview = placed === null;
  const step = placed ?? drops.length;
  const complete = step === drops.length;
  const showingFullWall = complete && !preview && !reveal;
  const playing = playback === "playing";
  const current = drops[step];
  const placedDrops = drops.slice(0, step);
  const locked = placedDrops.flatMap((drop) => drop.cells);
  const rowLimit = Math.floor(locked.length / COLS);
  const filled = new Set(locked.map(([x, y]) => y * COLS + x));
  let cleanRows = 0;
  while (cleanRows < rowLimit && Array.from({ length: COLS }, (_, column) => filled.has(cleanRows * COLS + column)).every(Boolean)) {
    cleanRows += 1;
  }
  const falling = playback !== "idle" && !reduced ? current : undefined;
  const fallRows = falling ? ROWS - Math.min(...falling.cells.map(([, y]) => y)) : 0;
  const next = drops[step + (falling ? 1 : 0)];
  const last = playing && step > 0 ? drops[step - 1] : undefined;

  function placeConcrete() {
    const nextStep = preview ? 1 : step + 1;
    setPlaced(nextStep);
    if (nextStep === drops.length) {
      setPlayback("idle");
      if (!reduced) setReveal(shuffleUpperTiles());
    }
  }

  function toggleBuild() {
    if (complete) {
      if (!preview) setBuild((value) => (value + 1) % PANELKA_BUILDS.length);
      setPlaced(0);
    }
    setPlayback(playing ? "paused" : "playing");
  }

  function advance() {
    setPlayback("idle");
    if (complete && !preview) {
      setReveal(null);
      setPlaced(0);
    } else {
      placeConcrete();
    }
  }

  return (
    <div className={styles.concretes}>
      <div className={styles.cabinet}>
        <div className={styles.hud}>
          <div className={styles.buildLabel}><span>Assembly study</span><span>12 columns × 20 rows</span></div>
          <div className={styles.readout}>
            <p aria-live="polite">{preview ? "Finished wall" : reveal ? "Revealing façade" : complete ? "Panelka complete" : "Clean rows"}</p>
            <p className={styles.rowCount}>{String(cleanRows).padStart(2, "0")}<span>/{TARGET}</span></p>
            <div className={styles.rowMeter} aria-hidden="true">
              {Array.from({ length: TARGET }, (_, i) => <span key={i} data-filled={i < cleanRows} />)}
            </div>
            <p className={styles.buildNote}>Fill twelve uninterrupted rows to complete the façade.</p>
          </div>
          <div className={styles.queue}>
            <div>
              <span>{complete ? "Concretes placed" : "Next concrete"}</span>
              <strong>{next ? CONCRETES[next.kind].name : step}</strong>
            </div>
            {next && <MiniConcrete kind={next.kind} />}
          </div>
          <div className={styles.buildActions}>
            {!reduced && (
              <button type="button" className={styles.buildPrimary} onClick={toggleBuild} disabled={reveal !== null}>
                {preview ? "Play build" : complete ? "Play another build" : playing ? "Pause build" : step || playback === "paused" ? "Resume build" : "Play build"}
              </button>
            )}
            <button type="button" className={reduced ? styles.buildPrimary : styles.buildSecondary} onClick={advance}>
              {complete && !preview ? "Reset" : "Drop one"}
            </button>
          </div>
        </div>

        <div className={styles.elevation}>
          <div ref={board} className={styles.board} data-reveal-paused={!visible}>
            <svg viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`} role="img" aria-label={`Panelka wall with ${cleanRows} of twelve clean rows built`}>
              <defs>
                <clipPath id="dvor-locked">
                  {placedDrops.map((drop, index) => <path key={index} d={outline(drop.cells, ROWS)} />)}
                </clipPath>
                {reveal && (
                  <mask id="dvor-panelka-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width={COLS * CELL} height={(ROWS - TARGET) * CELL}>
                    {reveal.map((tile, order) => (
                      <rect
                        key={tile}
                        className={styles.panelkaTile}
                        x={(tile % COLS) * CELL}
                        y={Math.floor(tile / COLS) * CELL}
                        width={CELL}
                        height={CELL}
                        fill="white"
                        style={{ "--tile-delay": `${FLASH_DURATION * FLASH_COUNT + order * TILE_INTERVAL}ms` } as CSSProperties}
                        onAnimationEnd={order === reveal.length - 1 ? () => setReveal(null) : undefined}
                      />
                    ))}
                  </mask>
                )}
              </defs>
              <rect width={COLS * CELL} height={ROWS * CELL} fill="#e1d8ca" />
              <image className={styles.boardTexture} href={CONCRETE} width={COLS * CELL} height={ROWS * CELL} preserveAspectRatio="xMidYMid slice" />
              <image href={FACADE} width={COLS * CELL} height={ROWS * CELL} preserveAspectRatio="none" clipPath={showingFullWall ? undefined : "url(#dvor-locked)"} />
              {reveal && (
                <>
                  <rect
                    className={styles.panelkaFlash}
                    y={top(TARGET - 1)}
                    width={COLS * CELL}
                    height={TARGET * CELL}
                    style={{ animationDuration: `${FLASH_DURATION}ms`, animationIterationCount: FLASH_COUNT }}
                  />
                  <image href={FACADE} width={COLS * CELL} height={ROWS * CELL} preserveAspectRatio="none" mask="url(#dvor-panelka-reveal)" />
                </>
              )}
              <line className={styles.targetLine} x1={0} x2={COLS * CELL} y1={top(TARGET - 1)} y2={top(TARGET - 1)} />
              {last && <path key={`flash-${build}-${step}`} d={outline(last.cells, ROWS)} className={styles.flash} />}
              {falling && (
                <path
                  key={`fall-${build}-${step}`}
                  d={outline(falling.cells, ROWS)}
                  className={`${styles.falling} ${styles.concreteShape}`}
                  style={{ "--fall": `${-fallRows * CELL}px`, "--dur": `${250 + fallRows * 18}ms`, animationPlayState: visible && playing ? "running" : "paused" } as CSSProperties}
                  onAnimationEnd={placeConcrete}
                />
              )}
            </svg>
            <ol className={styles.ruler} aria-hidden="true">
              {[20, 16, 12, 8, 4, 0].map((row) => <li key={row} data-target={row === TARGET} style={{ top: `${(1 - row / ROWS) * 100}%` }}>{String(row).padStart(2, "0")}</li>)}
            </ol>
          </div>
        </div>
      </div>

      <div className={styles.specimens}>
        <p className={styles.specimensHead}>The seven concretes <span>As they enter the game</span></p>
        <ul className={styles.lineup} aria-label="The seven concretes">
          {(Object.keys(CONCRETES) as ConcreteKind[]).map((kind) => (
            <li key={kind}>
              <MiniConcrete kind={kind} />
              <p>{CONCRETES[kind].name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.ornaments}>
        <p className={styles.ornamentsLead}>Façade ornaments</p>
        <ul aria-label="The seven ornament tiles">
          {ORNAMENTS.map(({ file, name }) => (
            <li key={file}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/projects/dvor/pieces/${file}`} alt={`${name} ornament tile`} width={200} height={200} loading="lazy" decoding="async" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
