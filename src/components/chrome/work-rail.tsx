"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { LazyVideo } from "@/components/lazy-video";
import { useScrollProgress } from "@/components/chrome/scene";
import { projectHref, type WorkCard } from "@/data/work-index";

/**
 * Pinned horizontal rail: vertical scrolling slides the track sideways. The
 * section height is derived from the track width so the pin lasts exactly as
 * long as the travel.
 */
export function WorkRail({ cards }: { cards: WorkCard[] }) {
  const sceneRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useScrollProgress(sceneRef, "pin");

  useEffect(() => {
    const scene = sceneRef.current;
    const track = trackRef.current;
    if (!scene || !track) return;
    const fit = () => {
      const shift = Math.max(0, track.scrollWidth - window.innerWidth);
      scene.style.setProperty("--shift", `${shift}px`);
      scene.style.height = `${shift + window.innerHeight}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(track);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      id="projects"
      data-scene
      className="dt-rail relative bg-black text-white"
      style={{ height: "400svh" }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="flex justify-between px-4 pt-[96px] font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 md:px-8 md:pt-[112px] md:text-[11px]">
          <span>selected work</span>
          <span>Keep scrolling →</span>
        </div>

        <div className="flex flex-1 items-center">
          <div ref={trackRef} className="dt-rail-track flex items-center gap-[6vw] px-4 md:px-8">
            <div className="w-[78vw] shrink-0 md:w-[46vw]">
              <h2 className="overflow-visible text-[clamp(4rem,14vw,15rem)] font-semibold uppercase leading-none tracking-[-0.07em]">
                <span className="block pb-[0.08em]">Pro</span>
                <span className="dt-italic dt-chrome-text mt-[0.02em] inline-block normal-case leading-[1.2] tracking-[-0.04em] px-[0.22em] pt-[0.12em] pb-[0.38em] -ml-[0.12em]">
                  jects
                </span>
              </h2>
              <p className="mt-8 max-w-[22rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-white/55">
                Brand, product and platform work — from naming to the last pixel.
              </p>
            </div>

            {cards.map((card, index) => (
              <Link
                key={card.slug}
                href={projectHref(card.slug)}
                data-cursor="View"
                className="dt-card group relative w-[84vw] shrink-0 md:w-[58vw] lg:w-[48vw]"
              >
                <span className="dt-card-num dt-outline pointer-events-none absolute -top-[0.42em] left-[-0.04em] z-10 text-[clamp(5rem,13vw,13rem)] font-semibold leading-none tracking-[-0.08em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div
                  className={`dt-card-media relative aspect-[16/10] overflow-hidden bg-[#111] ${
                    card.contain ? "is-contain" : ""
                  }`}
                >
                  <LazyVideo
                    src={card.thumbnail}
                    eager={index < 2}
                    className={`h-full w-full ${
                      card.contain ? "object-contain" : "object-cover"
                    }`}
                  />
                  <div className="dt-card-sheen pointer-events-none absolute inset-0" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <h3 className="text-[clamp(1.6rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
                    <span className="dt-swap">
                      <span>{card.title}</span>
                      <span className="dt-italic" aria-hidden>
                        {card.title}
                      </span>
                    </span>
                  </h3>
                  <ul className="hidden shrink-0 text-right font-mono text-[10px] uppercase leading-[1.7] tracking-[0.16em] text-white/50 md:block">
                    {card.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}

            <div className="flex w-[78vw] shrink-0 flex-col gap-6 md:w-[38vw]">
              <Link
                href="/digitangels"
                data-cursor="Open"
                className="dt-pill-link group flex items-center justify-between border-t border-white/20 py-6"
              >
                <span className="text-[clamp(2rem,4vw,4rem)] font-semibold tracking-[-0.05em]">
                  Our branding
                </span>
                <span className="dt-arrow">→</span>
              </Link>
              <Link
                href="/designwise"
                data-cursor="Learn"
                className="dt-pill-link group flex items-center justify-between border-y border-white/20 py-6"
              >
                <span className="text-[clamp(2rem,4vw,4rem)] font-semibold tracking-[-0.05em]">
                  Design education
                </span>
                <span className="dt-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="px-4 pb-6 md:px-8">
          <div className="h-px w-full bg-white/15">
            <div className="dt-progress h-px bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
