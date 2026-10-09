const LINES = ["Design", "Transformation", "Advisory"] as const;

export function HomeSlogan() {
  return (
    <h1 className="text-left font-semibold uppercase leading-[0.86] tracking-[-0.045em] text-[#e4e4e4]">
      {LINES.map((line, index) => (
        <span key={line} className="block overflow-hidden">
          <span
            className="dt-word block text-[clamp(3.4rem,12vw,9.5rem)]"
            style={{ animationDelay: `${180 + index * 140}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
