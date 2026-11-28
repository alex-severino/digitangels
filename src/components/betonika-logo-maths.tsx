"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  CHANNELS,
  COUNTER_LINES,
  COUNTERS,
  CUTS,
  GLYPH_NOTES,
  GLYPHS,
  HOUSE,
  LIT_WINDOW,
  LOGO_HEIGHT as H,
  LOGO_WIDTH as W,
  WINDOWS,
} from "@/data/betonika-logo";
import styles from "./betonika-maths.module.css";

const VIEW = { x: -90, y: -96, width: W + 90 + 262, height: H + 96 + 214 };
// Lines that would cut through the house start at the s and b instead.
const WORD_START = 370.39;

const LAYERS = [
  { key: "grid", label: "Grid" },
  { key: "metrics", label: "Type lines" },
  { key: "counter", label: "Counter lines" },
  { key: "align", label: "Shared edges" },
  { key: "anatomy", label: "Construction" },
] as const;
type LayerKey = (typeof LAYERS)[number]["key"];

const METRICS = [
  { y: 0, name: "Ascender", dy: -7 },
  { y: 38.4, name: "x-height", dy: 20 },
  { y: 172.03, name: "Baseline", dy: -7, start: WORD_START },
  { y: 192.51, name: "Ascender", dy: 20, start: WORD_START },
  { y: 230.91, name: "x-height", dy: 20, start: WORD_START },
  { y: H, name: "Baseline", dy: -7 },
];

const ALIGNMENTS = [
  { pair: "s·b", xs: [370.39, 505.93], note: "Share both edges" },
  { pair: "t·e", xs: [522.34], note: "Share a left edge" },
  { pair: "u·t", xs: [778.7], note: "Share a right edge" },
  { pair: "d·o", xs: [796.73, 932.23], note: "Share both edges" },
  { pair: "i·n", xs: [949.75], note: "Start together" },
  { pair: "o·i", xs: [1141.34], note: "The first row ends where the second i ends" },
  { pair: "a", xs: [1431.41], note: "The final a closes the block" },
];

const WINDOW_LINES_X = [...new Set(WINDOWS.flatMap((w) => [w.x, w.x + w.size]))];
const WINDOW_LINES_Y = [...new Set(WINDOWS.flatMap((w) => [w.y, w.y + w.size]))];

// The k's two arms, extended until they meet inside the stem.
const K_MEET = { x: 1184.77, y: 297.8 };
const K_ARMS = [
  { x: 1272, y: 392.49 },
  { x: 1272, y: 202.59 },
];

function Bracket({ x, y1, y2, label }: { x: number; y1: number; y2: number; label: string }) {
  const mid = (y1 + y2) / 2;
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2} />
      <line x1={x - 6} y1={y1} x2={x + 6} y2={y1} />
      <line x1={x - 6} y1={y2} x2={x + 6} y2={y2} />
      <text x={x - 10} y={mid} textAnchor="middle" fontSize={15} transform={`rotate(-90 ${x - 10} ${mid})`}>{label}</text>
    </g>
  );
}

export function BetonikaLogoMaths() {
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({ grid: true, metrics: true, counter: true, align: true, anatomy: true });
  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sheet.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const glyph = active === null ? null : GLYPHS[active];
  const markers = ALIGNMENTS.flatMap((a) => a.xs.map((x) => ({ x, pair: a.pair }))).sort((a, b) => a.x - b.x);
  const litCx = LIT_WINDOW.x + LIT_WINDOW.size / 2;
  const litCy = LIT_WINDOW.y + LIT_WINDOW.size / 2;
  const layer = (key: LayerKey, i: number) => ({ className: styles.layer, "data-layer": key, "data-on": layers[key], style: { "--i": i } as CSSProperties });

  return (
    <div className={styles.maths}>
      <div className={styles.toolbar} role="group" aria-label="Construction layers">
        {LAYERS.map(({ key, label }) => (
          <button key={key} type="button" className={styles.chip} data-layer={key} aria-pressed={layers[key]} onClick={() => setLayers((prev) => ({ ...prev, [key]: !prev[key] }))}>
            <span aria-hidden="true" />{label}
          </button>
        ))}
      </div>

      <div ref={sheet} className={styles.sheetScroll}>
        <div className={styles.sheet} data-visible={visible}>
          <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`} role="img" aria-labelledby="betonika-maths-title">
            <title id="betonika-maths-title">
              Construction drawing of the Studio Betonika lockup: shared type lines, the counter lines every opening sits between, the edges the two rows share and the construction of the house symbol
            </title>
            <defs>
              <pattern id="sb-grid-minor" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M10 0H0V10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
              <pattern id="sb-grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#sb-grid-minor)" />
                <path d="M100 0H0V100" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </pattern>
            </defs>

            <g {...layer("grid", 0)}>
              <rect x={-40} y={-40} width={W + 80} height={H + 80} fill="url(#sb-grid-major)" />
            </g>

            <g className={styles.logo}>
              <rect x={HOUSE.x} y={HOUSE.y} width={HOUSE.size} height={HOUSE.size} className={styles.body} />
              {WINDOWS.map((w, i) => (
                <rect key={i} x={w.x} y={w.y} width={w.size} height={w.size} className={styles.window} />
              ))}
              <rect x={LIT_WINDOW.x} y={LIT_WINDOW.y} width={LIT_WINDOW.size} height={LIT_WINDOW.size} className={styles.lit} />
              {GLYPHS.map((g, i) => (
                <path
                  key={i}
                  d={g.d}
                  className={styles.glyph}
                  data-active={active === i}
                  tabIndex={0}
                  role="button"
                  aria-label={`Letter ${g.char}, row ${g.row}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                />
              ))}
            </g>

            <g {...layer("metrics", 1)}>
              {METRICS.map((m, i) => (
                <g key={i}>
                  <line x1={"start" in m ? m.start : -40} y1={m.y} x2={W + 20} y2={m.y} />
                  <text x={W + 26} y={m.y + m.dy} fontSize={17}>{m.name.toUpperCase()}</text>
                </g>
              ))}
              <Bracket x={-30} y1={HOUSE.y} y2={H} label="HOUSE · X-HEIGHT TO BASELINE" />
            </g>

            <g {...layer("counter", 2)}>
              {[1, 2].flatMap((row) => COUNTER_LINES[row as 1 | 2].map((y, i) => (
                <g key={`${row}-${i}`}>
                  <line x1={WORD_START} y1={y} x2={W + 20} y2={y} />
                  <text x={W + 26} y={y + 6} fontSize={17}>COUNTER LINE</text>
                </g>
              )))}
            </g>

            <g {...layer("align", 3)}>
              {markers.map(({ x, pair }, i) => {
                const cy = H + (i % 2 === 1 ? 168 : 124);
                return (
                  <g key={`${pair}-${x}`}>
                    <line x1={x} y1={-36} x2={x} y2={cy - 21} />
                    <circle cx={x} cy={cy} r={21} />
                    <text x={x} y={cy + 6} textAnchor="middle" fontSize={16}>{pair}</text>
                  </g>
                );
              })}
            </g>

            <g {...layer("anatomy", 4)}>
              {WINDOW_LINES_X.map((x) => <line key={`wx${x}`} className={styles.fine} x1={x} y1={HOUSE.y} x2={x} y2={H} />)}
              {WINDOW_LINES_Y.map((y) => <line key={`wy${y}`} className={styles.fine} x1={0} y1={y} x2={HOUSE.size} y2={y} />)}
              <line x1={0} y1={HOUSE.y} x2={HOUSE.size} y2={H} />
              <line x1={HOUSE.size} y1={HOUSE.y} x2={0} y2={H} />
              <circle cx={litCx} cy={litCy} r={36} />
              <line x1={litCx} y1={litCy - 36} x2={litCx} y2={-34} />
              <text x={litCx + 8} y={-42} fontSize={17}>THE LIT WINDOW SITS ON THE DIAGONAL</text>
              {[HOUSE.y, H].flatMap((y) => [0, HOUSE.size].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r={7} />))}

              {COUNTERS.map((c, i) => (
                <g key={`c${i}`}>
                  <rect x={c.x} y={c.y} width={c.w} height={c.h} className={styles.outline} />
                  <path className={styles.fine} d={`M${c.x} ${c.y}L${c.x + c.w} ${c.y + c.h}M${c.x + c.w} ${c.y}L${c.x} ${c.y + c.h}`} />
                </g>
              ))}
              {CHANNELS.map((c, i) => <rect key={`ch${i}`} x={c.x} y={c.y} width={c.w} height={c.h} className={styles.outline} />)}
              {CUTS.map((c, i) => <rect key={`cut${i}`} x={c.x} y={c.y} width={c.w} height={c.h} className={styles.cut} />)}

              {K_ARMS.map((end, i) => <line key={`k${i}`} x1={K_MEET.x} y1={K_MEET.y} x2={end.x} y2={end.y} />)}
              <circle cx={K_MEET.x} cy={K_MEET.y} r={6} />
              <line className={styles.fine} x1={K_MEET.x} y1={K_MEET.y + 6} x2={K_MEET.x} y2={H + 42} />
              <text x={K_MEET.x} y={H + 62} textAnchor="middle" fontSize={16}>THE ARMS MEET IN THE STEM</text>
            </g>

            {glyph ? (
              <g className={styles.focus}>
                <rect x={glyph.x} y={glyph.y} width={glyph.width} height={glyph.height} />
              </g>
            ) : null}
          </svg>
        </div>
      </div>

      <div className={styles.readouts}>
        <div className={styles.readout} aria-live="polite">
          {glyph ? (
            <>
              <svg viewBox={`${glyph.x - 4} ${glyph.y - 4} ${glyph.width + 8} ${glyph.height + 8}`} aria-hidden="true">
                <path d={glyph.d} />
              </svg>
              <dl>
                <div><dt>Letter</dt><dd>{glyph.char}</dd></div>
                <div><dt>Word</dt><dd>{glyph.row === 1 ? "studio" : "betonika"}</dd></div>
              </dl>
              <p>{GLYPH_NOTES[glyph.char]}</p>
            </>
          ) : (
            <p className={styles.hint}>Hover over, tap or tab to a letter to read it.</p>
          )}
        </div>
        <ul className={styles.legend} aria-label="Edges the two rows share">
          {ALIGNMENTS.map((a) => (
            <li key={a.pair}>
              <span className={styles.marker} aria-hidden="true">{a.pair}</span>
              <em>{a.note}</em>
            </li>
          ))}
        </ul>
        <div className={styles.titleBlock}>
          <p>Drawn over the original vector lockup.</p>
          <p>The guides show what lines up, not what it measures. The letters were tuned by eye.</p>
        </div>
      </div>
    </div>
  );
}
