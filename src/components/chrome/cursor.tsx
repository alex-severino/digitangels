"use client";

import { useEffect, useRef } from "react";

/**
 * A halo cursor: an exact dot plus a lagging ring that swells over anything
 * interactive. Elements can set `data-cursor="Label"` to print a word inside
 * the ring. Only mounts its behaviour on fine pointers.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!ring || !dot || !label) return;

    document.documentElement.classList.add("has-cursor");
    const pos = { x: -100, y: -100, rx: -100, ry: -100 };
    let raf = 0;

    const loop = () => {
      pos.rx += (pos.x - pos.rx) * 0.16;
      pos.ry += (pos.y - pos.ry) * 0.16;
      ring.style.transform = `translate3d(${pos.rx}px, ${pos.ry}px, 0)`;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
      const target = event.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest(
        "a, button, input, textarea, label, [role='button']",
      );
      const text = labelled?.dataset.cursor ?? "";
      if (label.textContent !== text) label.textContent = text;
      const hidden = target?.closest("[data-cursor-hide]");
      ring.dataset.state = hidden ? "hide" : text ? "label" : interactive ? "hover" : "";
      dot.style.opacity = hidden ? "0" : "";
    };

    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");
    const onLeave = () => {
      pos.x = -100;
      pos.y = -100;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="dt-cursor-ring" aria-hidden>
        <div className="dt-cursor-ring-inner">
          <span ref={labelRef} />
        </div>
      </div>
      <div ref={dotRef} className="dt-cursor-dot" aria-hidden />
    </>
  );
}
