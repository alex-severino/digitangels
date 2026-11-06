"use client";

import { useEffect, useRef, useState } from "react";

/**
 * First-visit intro: a spinning chrome ring and a 000 → 100 counter, then the
 * overlay closes like an iris onto the page. Visitors who have already seen it
 * this session skip straight in (the inline script in the root layout hides it
 * before paint via `html[data-seen]`).
 */
export function Preloader() {
  const countRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"count" | "out" | "gone">("count");

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.seen) {
      // Already hidden by `html[data-seen]` in CSS.
      html.dataset.ready = "1";
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 300 : 2100;
    const start = performance.now();
    let raf = 0;
    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    const tick = (now: number) => {
      const elapsed = now - start;
      // Hold at 90 until the window has loaded, but never longer than 4.5s.
      const cap = loaded || elapsed > 4500 ? 1 : 0.9;
      const t = Math.min(cap, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      if (countRef.current) {
        countRef.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      }
      if (t >= 1) {
        try {
          sessionStorage.setItem("dt-seen", "1");
        } catch {}
        setPhase("out");
        html.dataset.ready = "1";
        window.setTimeout(() => setPhase("gone"), 1300);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`dt-preloader ${phase === "out" ? "is-out" : ""}`}
      aria-hidden
    >
      <div className="absolute inset-x-4 top-5 flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 md:inset-x-8">
        <span>Digitangels®</span>
        <span>Calibrating the halo</span>
      </div>

      <div className="dt-preloader-ring">
        <div className="dt-ring dt-ring-flip w-[min(56vmin,420px)]" />
      </div>

      <div className="absolute inset-x-4 bottom-5 flex items-end justify-between overflow-visible md:inset-x-8">
        <p className="max-w-[16rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-white/50">
          Design Transformation Advisory
          <br />
          London — Worldwide
        </p>
        <span
          ref={countRef}
          className="dt-chrome-text block shrink-0 overflow-visible font-sans text-[clamp(4.2rem,14vw,13rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums px-[0.18em] pb-[0.2em] pt-[0.08em]"
        >
          000
        </span>
      </div>
    </div>
  );
}
