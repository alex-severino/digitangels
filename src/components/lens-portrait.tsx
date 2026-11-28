"use client";

import { useEffect, useRef } from "react";

type LensPortraitProps = {
  src: string;
  alt: string;
  /** Extra classes for the frame, e.g. sticky positioning. */
  className?: string;
  /** Tailwind object-position class for both image layers. */
  position?: string;
};

/**
 * Black-and-white portrait. A halo-shaped lens follows the pointer and
 * softens the contrast of the portrait beneath it.
 */
export function LensPortrait({ src, alt, className = "", position = "object-top" }: LensPortraitProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const onMove = (event: PointerEvent) => {
      const box = frame.getBoundingClientRect();
      frame.style.setProperty("--lx", `${event.clientX - box.left}px`);
      frame.style.setProperty("--ly", `${event.clientY - box.top}px`);
    };
    const onEnter = () => frame.classList.add("is-lens");
    const onLeave = () => frame.classList.remove("is-lens");

    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerenter", onEnter);
    frame.addEventListener("pointerleave", onLeave);
    frame.addEventListener("pointerdown", onEnter);
    return () => {
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerenter", onEnter);
      frame.removeEventListener("pointerleave", onLeave);
      frame.removeEventListener("pointerdown", onEnter);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      data-cursor-hide
      className={`dt-lens-frame relative aspect-[700/1080] w-full overflow-hidden bg-[#111] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`dt-lens-base absolute inset-0 h-full w-full object-cover ${position}`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        className={`dt-lens-color absolute inset-0 h-full w-full object-cover ${position}`}
      />
      <div className="dt-lens-ring pointer-events-none absolute" aria-hidden>
        <div className="dt-ring h-full w-full" />
      </div>
      <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 mix-blend-difference">
        Hover / touch — reveal
      </span>
    </div>
  );
}
