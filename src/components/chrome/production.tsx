"use client";

import { useState, type CSSProperties } from "react";
import { Scene } from "@/components/chrome/scene";
import styles from "./production.module.css";

const SERVICES = [
  {
    id: "discover",
    title: "Decide what to build",
    description:
      "Test the idea with users, assess the commercial case and define the first version worth building.",
  },
  {
    id: "ship",
    title: "Build it. Ship it.",
    description:
      "Design, engineer and launch products that work with the data, APIs and systems you already use.",
  },
  {
    id: "ai",
    title: "Put AI to work",
    description:
      "Build AI products and agents that choose tools, work through evidence and bring decisions to the right person.",
  },
] as const;

export function Production() {
  const [active, setActive] = useState<(typeof SERVICES)[number]["id"]>("discover");

  return (
    <section id="production" className={styles.section} aria-labelledby="production-title">
      <Scene as="div" mode="view" className={styles.stage}>
        <div className={styles.scaffold} data-stage={active} aria-hidden="true">
          <div className={styles.optic}>
            {[-3, -2, -1, 0, 1, 2, 3].map((layer) => (
              <div
                key={layer}
                className={styles.plate}
                style={{ "--layer": layer } as CSSProperties}
              />
            ))}
          </div>
        </div>
        <h2 id="production-title" className={styles.title}>
          <span>From Design</span>{" "}
          <span className="dt-italic">to Production</span>
        </h2>
        <p className={styles.intro}>
          We take products from the first decision to software people can use.
        </p>
      </Scene>

      <ul className={styles.services}>
        {SERVICES.map(({ id, title, description }) => (
          <li key={id}>
            <button
              type="button"
              aria-pressed={active === id}
              onClick={() => setActive(id)}
              className={styles.service}
            >
              <span className={styles.serviceTitle}>{title}</span>
              <span className={styles.serviceCopy}>{description}</span>
              <span className={styles.indicator} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
