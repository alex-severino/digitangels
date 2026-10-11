import type { CSSProperties } from "react";

/**
 * Splits text into per-character spans (grouped by word so lines never break
 * mid-word). Each character gets `--i` for staggered CSS animation.
 */
export function Split({
  text,
  className = "",
  offset = 0,
}: {
  text: string;
  className?: string;
  offset?: number;
}) {
  let index = offset;
  return (
    <span className={`dt-split ${className}`} aria-label={text}>
      {text.split(" ").map((word, w) => (
        <span key={w} className="dt-split-word" aria-hidden>
          {word.split("").map((ch, c) => (
            <span
              key={c}
              className="dt-split-ch"
              style={{ "--i": index++ } as CSSProperties}
            >
              {ch}
            </span>
          ))}
          {w < text.split(" ").length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
