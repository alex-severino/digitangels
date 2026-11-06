"use client";

import { useEffect, useRef } from "react";
import { Scene } from "@/components/chrome/scene";

/**
 * Founder section. The portrait is shown in hard black and white; a halo-shaped
 * lens follows the pointer and reveals the original colour beneath it.
 */
export function About() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const onMove = (event: PointerEvent) => {
      const box = frame.getBoundingClientRect();
      frame.style.setProperty("--lx", `${event.clientX - box.left}px`);
      frame.style.setProperty("--ly", `${event.clientY - box.top}px`);
    };
    const onEnter = () => frame.classList.add("is-lens");
    const onLeave = () => frame.classList.remove("is-lens");

    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerenter", onEnter);
    frame.addEventListener("pointerleave", onLeave);
    frame.addEventListener("pointerdown", onEnter);
    return () => {
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerenter", onEnter);
      frame.removeEventListener("pointerleave", onLeave);
      frame.removeEventListener("pointerdown", onEnter);
    };
  }, []);

  return (
    <Scene
      as="section"
      mode="view"
      id="about"
      className="dt-about relative scroll-mt-0 overflow-hidden bg-[#e9e9e6] text-black"
    >
      <h2 className="dt-about-name pointer-events-none relative z-20 px-4 pt-24 font-semibold uppercase leading-[0.78] tracking-[-0.07em] md:px-8 md:pt-32">
        <span className="block text-[19vw] md:text-[15vw]">Angelina</span>
        <span className="dt-italic block text-right text-[17vw] normal-case tracking-[-0.04em] md:text-[13vw]">
          Severino
        </span>
      </h2>

      <div className="relative -mt-[12vw] grid gap-10 px-4 pb-24 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 md:px-8 md:pb-36">
        <div
          ref={frameRef}
          data-cursor-hide
          className="dt-lens-frame relative aspect-[700/1080] w-full overflow-hidden bg-[#111] md:sticky md:top-24 md:self-start"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/portrait.png"
            alt="Portrait of Angelina Severino, founder of Digitangels"
            className="dt-lens-base absolute inset-0 h-full w-full object-cover object-top"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/portrait.png"
            alt=""
            aria-hidden
            className="dt-lens-color absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="dt-lens-ring pointer-events-none absolute" aria-hidden>
            <div className="dt-ring h-full w-full" />
          </div>
          <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 mix-blend-difference">
            Hover / touch — reveal
          </span>
        </div>

        <div className="space-y-8 pt-4 text-[1.1rem] font-light leading-[1.5] md:pt-[16vw] md:text-[1.35rem]">
          <p className="text-[clamp(1.6rem,2.6vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Digitangels was founded by an award-winning Design Leader.
            Award-winning Design Leader with over{" "}
            <span className="dt-italic">15 years</span> across Brand and Digital
            Product.
          </p>
          <p>
            Recognised with the Global Talent UK endorsement for Exceptional
            Talent in Digital Technology and multiple international creative
            awards, Angelina has led Design at the highest level across
            Telecoms, IoT, SaaS, eCommerce, and Advertising – most recently as
            Global Design Lead at Lebara, Europe&apos;s fastest-growing MVNO.
          </p>
          <p className="text-black/70">
            Throughout the years Angelina has built a trusted network of senior
            design practitioners, researchers, creatives, and niche specialists
            – cultivated through work projects, mentoring, public speaking,
            events and conferences, and being an active part of design
            communities across Europe and beyond. Her hand-picked team covers
            Branding, Product and UX/UI Design, Visual Design and Animation,
            Design Systems, Design Management, Research, Accessibility, and AI
            Automation, bringing the depth and breadth of expertise to shape the
            right strategy for every business context.
          </p>
          <a
            href="https://angelinaseverino.com"
            target="_blank"
            rel="noreferrer"
            data-cursor="Visit"
            className="dt-underline inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em]"
          >
            angelinaseverino.com <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </Scene>
  );
}
