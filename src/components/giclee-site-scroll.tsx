"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Media } from "@/components/project-media";
import type { SiteCapture } from "@/components/giclee-site-visuals";
import styles from "./giclee-site-visuals.module.css";

export function SiteScroll({ capture, label }: { capture: SiteCapture; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"ready" | "playing" | "paused" | "complete">("ready");

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio < 0.55) return;
      setPhase((current) => current === "ready" ? "playing" : current);
      observer.disconnect();
    }, { threshold: 0.55 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { src, width, height, viewportHeight, alt } = capture;
  const travel = ((viewportHeight - height) / height) * 100;
  const action = phase === "playing" ? "Pause" : phase === "complete" ? "Replay" : "Play";

  return (
    <div
      ref={ref}
      className={styles.scroll}
      data-phase={phase}
      style={{ "--travel": `${travel}%` } as CSSProperties}
      onAnimationEnd={() => setPhase("complete")}
    >
      <Media item={{ type: "image", src, width, height, alt }} className={styles.scrollImage} />
      <button
        type="button"
        className={styles.scrollControl}
        aria-label={`${action} ${label} scroll`}
        onClick={() => setPhase(phase === "playing" ? "paused" : "playing")}
      >
        <span aria-hidden="true">{phase === "playing" ? "Ⅱ" : "▶"}</span>
        {action} scroll
      </button>
    </div>
  );
}
