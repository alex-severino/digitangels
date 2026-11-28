"use client";

import { useEffect, useRef, useState } from "react";

export function LazyVideo({
  src,
  poster,
  label,
  className,
  onAspect,
  eager = false,
}: {
  src: string;
  poster?: string;
  label?: string;
  className?: string;
  onAspect?: (ratio: number) => void;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const onAspectRef = useRef(onAspect);
  const [shouldLoad, setShouldLoad] = useState(eager);

  useEffect(() => {
    onAspectRef.current = onAspect;
  }, [onAspect]);

  useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !shouldLoad) return;

    const report = () => {
      if (el.videoWidth > 0 && el.videoHeight > 0) {
        onAspectRef.current?.(el.videoWidth / el.videoHeight);
      }
    };
    report();
    el.addEventListener("loadedmetadata", report);

    const playIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.muted = true;
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.2 },
    );
    playIo.observe(el);

    return () => {
      el.removeEventListener("loadedmetadata", report);
      playIo.disconnect();
    };
  }, [shouldLoad, src]);

  return (
    <video
      ref={ref}
      className={className ?? "block h-auto w-full"}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload={shouldLoad ? "metadata" : "none"}
      src={shouldLoad ? src : undefined}
    />
  );
}
