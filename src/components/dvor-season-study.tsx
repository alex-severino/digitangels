"use client";

import { useState, type CSSProperties } from "react";
import { Media } from "@/components/project-media";
import { SOUNDTRACK_URL } from "@/data/studio-projects";
import styles from "./studio-projects.module.css";

const SEASONS = [
  {
    name: "Spring", tone: "#cadc9d", layer: "/projects/dvor/season-art/Spring_Background.png",
    facade: "/projects/dvor/season-art/Spring_Panelkas.png", audio: "/projects/dvor/soundtrack/spring.wav",
  },
  {
    name: "Summer", tone: "#f4ca61", layer: "/projects/dvor/season-art/Summer_Background.png",
    facade: "/projects/dvor/season-art/Summer_Panelkas.png", audio: "/projects/dvor/soundtrack/summer.wav",
  },
  {
    name: "Autumn", tone: "#efa477", layer: "/projects/dvor/season-art/Autumn.png",
    facade: null, audio: "/projects/dvor/soundtrack/autumn.wav",
  },
  {
    name: "Winter", tone: "#aadce9", layer: "/projects/dvor/season-art/Winter.png",
    facade: null, audio: "/projects/dvor/soundtrack/winter.wav",
  },
] as const;

export function DvorSeasonStudy() {
  const [active, setActive] = useState(1);
  const season = SEASONS[active];

  return (
    <div className={styles.seasonStudy} style={{ "--season-tone": season.tone } as CSSProperties}>
      <div className={styles.seasonPicker} role="group" aria-label="Choose a season">
        {SEASONS.map(({ name }, index) => (
          <button key={name} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
            {name}
          </button>
        ))}
      </div>
      <figure key={season.name} className={styles.seasonImage}>
        <Media className={styles.seasonLayer} item={{ type: "image", src: season.layer, alt: `Dvor’s original ${season.name.toLowerCase()} courtyard artwork`, width: 3840, height: 2160 }} />
        {season.facade ? (
          <Media className={styles.facadeLayer} item={{ type: "image", src: season.facade, alt: "", width: 3840, height: 2160 }} />
        ) : null}
      </figure>
      <div className={styles.soundDesk}>
        <div><h3>{season.name}</h3><p>Original soundtrack · 18-second excerpt</p></div>
        <audio key={season.audio} aria-label={`Listen to the ${season.name.toLowerCase()} soundtrack excerpt`} controls preload="none" src={season.audio} />
        <a className={styles.link} href={SOUNDTRACK_URL}>Full soundtrack ↗</a>
      </div>
    </div>
  );
}
