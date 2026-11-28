"use client";

import { useEffect, useRef, useState } from "react";
import { Media } from "@/components/project-media";
import { dvorScreens } from "@/data/studio-projects";
import styles from "./studio-projects.module.css";

export function DvorGameplayFilm() {
  const [started, setStarted] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (started) frame.current?.focus({ preventScroll: true });
  }, [started]);

  return started ? (
    <iframe
      ref={frame}
      className={styles.gameplayFrame}
      title="Dvor official gameplay film by Studio Betonika"
      src="https://www.youtube-nocookie.com/embed/Vo2kRYIB-5U?autoplay=1"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  ) : (
    <button className={styles.playGameplay} type="button" onClick={() => setStarted(true)}>
      <Media className={styles.gameplayImage} item={{ ...dvorScreens[9], alt: "" }} />
      <span><span aria-hidden="true">▶</span> Play gameplay film</span>
    </button>
  );
}
