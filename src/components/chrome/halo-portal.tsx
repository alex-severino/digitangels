"use client";

import { useEffect, useRef } from "react";
import { Scene } from "@/components/chrome/scene";

const VIDEO_START = 2;

/**
 * The Hands-Halo film seen through a ring that opens as you scroll, with the
 * brand line splitting apart around it.
 */
export function HaloPortal() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const jump = () => {
      if (video.currentTime < VIDEO_START) video.currentTime = VIDEO_START;
    };
    const keep = () => {
      if (video.currentTime < 0.6) video.currentTime = VIDEO_START;
    };
    video.addEventListener("loadedmetadata", jump);
    video.addEventListener("timeupdate", keep);

    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);

    return () => {
      io.disconnect();
      video.removeEventListener("loadedmetadata", jump);
      video.removeEventListener("timeupdate", keep);
    };
  }, []);

  return (
    <Scene className="dt-portal relative h-[320svh] bg-black text-white">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="dt-portal-mask absolute inset-0">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            className="dt-portal-video absolute inset-0 h-full w-full object-contain grayscale"
            src="/videos/Hands-Halo.mp4?v=5#t=2"
          />
        </div>
        <div className="dt-portal-rim pointer-events-none absolute left-1/2 top-1/2">
          <div className="dt-ring h-full w-full" />
        </div>

        <p className="dt-portal-line dt-portal-line-a pointer-events-none absolute left-0 top-[18svh] whitespace-nowrap px-4 text-[13vw] font-semibold uppercase leading-[0.8] tracking-[-0.06em] mix-blend-difference md:px-8 md:text-[10vw]">
          We help with
        </p>
        <p className="dt-portal-line dt-portal-line-b dt-italic pointer-events-none absolute bottom-[16svh] right-0 whitespace-nowrap px-4 text-right text-[13vw] leading-[0.86] tracking-[-0.04em] mix-blend-difference md:px-8 md:text-[10vw]">
          the digital unknown
        </p>

        <div className="pointer-events-none absolute inset-x-4 bottom-5 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/60 md:inset-x-8 md:text-[11px]">
          <span>(00) — The halo</span>
          <span>Keep scrolling</span>
        </div>
      </div>
    </Scene>
  );
}
