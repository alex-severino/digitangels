import type { CSSProperties, ReactNode } from "react";
import { Scene } from "@/components/chrome/scene";

/** One of the Designwise area icons, recoloured to `currentColor` via a mask. */
export function Glyph({ src, className = "" }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`dw-glyph ${className}`}
      style={{ "--src": `url(${src})` } as CSSProperties}
    />
  );
}

/** Words brighten one by one as the paragraph scrolls through the viewport. */
export function ReadAlong({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <Scene
      as="p"
      mode="view"
      className={`dw-read ${className}`}
      style={{ "--n": words.length } as CSSProperties}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="dw-rword"
          style={{ "--i": i } as CSSProperties}
        >
          {word}{" "}
        </span>
      ))}
    </Scene>
  );
}

export function Pill({
  href,
  variant,
  className = "",
  children,
}: {
  href: string;
  variant: "ghost" | "solid" | "dark";
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={`dw-pill dw-pill-${variant} inline-flex ${className}`}>
      <span className="dw-pill-label">{children}</span>
    </a>
  );
}
