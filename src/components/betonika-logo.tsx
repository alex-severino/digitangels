import { COLORWAYS, GLYPHS, HOUSE, LIT_WINDOW, LOGO_HEIGHT, LOGO_WIDTH, WINDOWS } from "@/data/betonika-logo";

export type BetonikaColorway = (typeof COLORWAYS)[number];

/** The Studio Betonika lockup, drawn from the original Figma vectors. */
export function BetonikaLockup({
  colorway = COLORWAYS[0],
  label = "Studio Betonika",
  className,
}: {
  colorway?: BetonikaColorway;
  label?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${LOGO_WIDTH} ${LOGO_HEIGHT}`}
      role="img"
      aria-label={label}
    >
      <BetonikaHouseShapes colorway={colorway} />
      {GLYPHS.map((glyph, index) => (
        <path key={index} d={glyph.d} fill={colorway.body} />
      ))}
    </svg>
  );
}

/** The house symbol on its own: a 4 × 4 window grid with one light on. */
export function BetonikaHouse({
  colorway = COLORWAYS[0],
  label = "Studio Betonika house symbol",
  className,
}: {
  colorway?: BetonikaColorway;
  label?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox={`${HOUSE.x} ${HOUSE.y} ${HOUSE.size} ${HOUSE.size}`}
      role="img"
      aria-label={label}
    >
      <BetonikaHouseShapes colorway={colorway} />
    </svg>
  );
}

function BetonikaHouseShapes({ colorway }: { colorway: BetonikaColorway }) {
  return (
    <>
      <rect x={HOUSE.x} y={HOUSE.y} width={HOUSE.size} height={HOUSE.size} fill={colorway.body} />
      {WINDOWS.map((w, index) => (
        <rect key={index} x={w.x} y={w.y} width={w.size} height={w.size} fill={colorway.windows} />
      ))}
      <rect x={LIT_WINDOW.x} y={LIT_WINDOW.y} width={LIT_WINDOW.size} height={LIT_WINDOW.size} fill={colorway.lit} />
    </>
  );
}
