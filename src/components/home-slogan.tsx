"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const VIDEO_START = 2;

const LINES = [
  { text: "Design", fit: 4.05 },
  { text: "Transformation", fit: 9.35 },
  { text: "Advisory", fit: 5.15 },
] as const;

export function HomeSlogan() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onMove = (event: PointerEvent) => {
      const box = root.getBoundingClientRect();
      root.style.setProperty("--mx", `${event.clientX - box.left}px`);
      root.style.setProperty("--my", `${event.clientY - box.top}px`);
    };

    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const jumpToHands = () => {
      if (video.currentTime < VIDEO_START) video.currentTime = VIDEO_START;
    };

    const keepOnHands = () => {
      if (video.currentTime < 0.6) video.currentTime = VIDEO_START;
    };

    jumpToHands();
    video.addEventListener("loadedmetadata", jumpToHands);
    video.addEventListener("playing", jumpToHands);
    video.addEventListener("timeupdate", keepOnHands);
    return () => {
      video.removeEventListener("loadedmetadata", jumpToHands);
      video.removeEventListener("playing", jumpToHands);
      video.removeEventListener("timeupdate", keepOnHands);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="dt-halo relative -mt-[72px] h-[100svh] min-h-[36rem] overflow-hidden bg-black md:-mt-[88px]"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/Hands-Halo.mp4?v=6#t=2"
      />

      <h1 className="relative z-20 flex h-full w-full flex-col justify-center px-4 pt-[72px] text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.9)] md:px-8 md:pt-[88px]">
        {LINES.map((line, index) => (
          <span
            key={line.text}
            className="dt-rise block w-full whitespace-nowrap leading-[0.82] font-semibold uppercase tracking-[-0.06em]"
            style={{
              animationDelay: `${140 + index * 130}ms`,
              fontSize: `calc((100vw - 4rem) / ${line.fit})`,
            }}
          >
            {line.text}
          </span>
        ))}
      </h1>

      <div className="dt-halo-spot pointer-events-none absolute inset-0 z-[1]" />

      <div
        aria-hidden
        className="dt-scan pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white to-transparent mix-blend-overlay"
      />

      <p className="absolute top-[88px] left-4 z-30 text-[11px] font-semibold uppercase tracking-[0.34em] text-white/80 md:top-[108px] md:left-8">
        Digitangels
      </p>

      <p className="absolute top-[88px] right-4 z-30 hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60 md:top-[108px] md:right-8 md:block">
        London
      </p>

      <Link
        href="/digitangels"
        className="absolute bottom-8 left-4 z-30 text-[12px] font-semibold uppercase tracking-[0.22em] text-white md:bottom-10 md:left-8"
      >
        Our branding →
      </Link>

      <a
        href="#mission"
        className="absolute bottom-8 right-4 z-30 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70 [writing-mode:vertical-rl] md:bottom-10 md:right-8"
      >
        Scroll
      </a>
    </section>
  );
}
