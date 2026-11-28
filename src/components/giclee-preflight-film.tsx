"use client";

import { useEffect, useRef, useState } from "react";
import { Media } from "@/components/project-media";
import { preflightFilm } from "@/data/giclee-club";
import styles from "./giclee-case-study.module.css";

export function GicleePreflightFilm() {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (started) videoRef.current?.focus({ preventScroll: true });
  }, [started]);

  if (started) {
    return (
      <video
        ref={videoRef}
        className={styles.heroVideo}
        src={preflightFilm.src}
        poster={preflightFilm.poster}
        aria-label={preflightFilm.alt}
        tabIndex={0}
        autoPlay
        controls
        muted
        playsInline
      />
    );
  }

  return (
    <button type="button" className={styles.filmStart} onClick={() => setStarted(true)}>
      <Media
        item={{
          type: "image",
          src: preflightFilm.poster,
          width: 3840,
          height: 1750,
        }}
        priority
        className={styles.heroVideo}
      />
      <span className={styles.filmAction}>
        <span aria-hidden="true">▶</span> Play preflight film
      </span>
    </button>
  );
}
