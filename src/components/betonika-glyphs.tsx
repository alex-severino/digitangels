import { CHANNELS, COUNTER_LINES, COUNTERS, CUTS, GLYPH_NOTES, GLYPHS, type Box, type BetonikaGlyph } from "@/data/betonika-logo";
import styles from "./betonika-maths.module.css";

const UNIQUE = GLYPHS.filter((g, i) => GLYPHS.findIndex((other) => other.char === g.char) === i);
const PAD = 22;

function inside(box: Box, g: BetonikaGlyph) {
  return box.x >= g.x - 0.5 && box.x + box.w <= g.x + g.width + 0.5 && box.y >= g.y - 0.5 && box.y + box.h <= g.y + g.height + 0.5;
}

/** Every letter of the wordmark, enlarged from the original vectors. */
export function BetonikaGlyphSpecimens() {
  return (
    <ul className={styles.specimens} aria-label="The eleven letters of the Studio Betonika wordmark">
      {UNIQUE.map((g) => {
        const boxes = [...COUNTERS, ...CHANNELS].filter((b) => inside(b, g));
        const cuts = CUTS.filter((b) => inside(b, g));
        const top = g.row === 1 ? 0 : 192.51;
        const x1 = g.x - PAD;
        const x2 = g.x + g.width + PAD;
        return (
          <li key={g.char}>
            <svg viewBox={`${x1} ${top - PAD} ${g.width + PAD * 2} ${172.03 + PAD * 2}`} role="img" aria-label={`The letter ${g.char}`}>
              <line className={styles.specimenMetric} x1={x1} x2={x2} y1={top + 38.4} y2={top + 38.4} />
              <line className={styles.specimenMetric} x1={x1} x2={x2} y1={top + 172.03} y2={top + 172.03} />
              {COUNTER_LINES[g.row].map((y) => (
                <line key={y} className={styles.specimenCounter} x1={x1} x2={x2} y1={y} y2={y} />
              ))}
              <path d={g.d} className={styles.specimenGlyph} />
              {boxes.map((b, i) => (
                <rect key={i} className={styles.specimenBox} x={b.x} y={b.y} width={b.w} height={b.h} />
              ))}
              {cuts.map((b, i) => (
                <rect key={`c${i}`} className={styles.specimenCut} x={b.x} y={b.y} width={b.w} height={b.h} />
              ))}
            </svg>
            <div className={styles.specimenMeta}>
              <span aria-hidden="true">{g.char}</span>
              <span>{g.row === 1 ? "studio" : "betonika"}</span>
            </div>
            <p>{GLYPH_NOTES[g.char]}</p>
          </li>
        );
      })}
      <li className={styles.specimenKey} aria-label="Key">
        <p>Key</p>
        <dl>
          <div><dt><svg viewBox="0 0 40 10" aria-hidden="true"><line className={styles.specimenMetric} x1="0" x2="40" y1="5" y2="5" /></svg></dt><dd>x-height and baseline</dd></div>
          <div><dt><svg viewBox="0 0 40 10" aria-hidden="true"><line className={styles.specimenCounter} x1="0" x2="40" y1="5" y2="5" /></svg></dt><dd>Counter lines</dd></div>
          <div><dt><svg viewBox="0 0 40 20" aria-hidden="true"><rect className={styles.specimenBox} x="1" y="1" width="38" height="18" /></svg></dt><dd>Counter or channel</dd></div>
          <div><dt><svg viewBox="0 0 40 10" aria-hidden="true"><rect className={styles.specimenCut} x="0" y="2" width="40" height="6" /></svg></dt><dd>Cut</dd></div>
        </dl>
        <p>Every opening sits between the two counter lines.</p>
      </li>
    </ul>
  );
}
