"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const GLYPHS = "ÅDIGTNELS/\\*+#01°◯";

/** Text that decodes through random glyphs whenever it (or its link) is hovered. */
export function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.closest("a, button") ?? el;
    if (!el || !host) return;
    let raf = 0;

    const run = () => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const step = (now: number) => {
        const progress = (now - start) / 420;
        const solved = Math.floor(progress * text.length);
        el.textContent = text
          .split("")
          .map((ch, i) =>
            i < solved || ch === " "
              ? ch
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join("");
        if (solved < text.length) raf = requestAnimationFrame(step);
        else el.textContent = text;
      };
      raf = requestAnimationFrame(step);
    };

    host.addEventListener("pointerenter", run);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointerenter", run);
    };
  }, [text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  );
}

/** Pulls its child toward the pointer while hovered. */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const x = event.clientX - (box.left + box.width / 2);
      const y = event.clientY - (box.top + box.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`dt-magnetic inline-block ${className}`}>
      {children}
    </div>
  );
}

/** Live London clock. Renders nothing on the server to avoid a mismatch. */
export function LondonTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={`tabular-nums ${className}`} suppressHydrationWarning>
      {time || "--:--:--"}
    </span>
  );
}
