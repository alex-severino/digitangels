"use client";

import { Fragment, useEffect, useRef, type CSSProperties } from "react";
import { Magnetic } from "@/components/chrome/fx";
import { Scene } from "@/components/chrome/scene";

const WORD = "DESIGNWISE";

// Where each letter flies once the hero is scrolled away: [vw, svh, deg].
const SCATTER = [
  [-34, -38, -28],
  [-22, 42, 16],
  [-14, -64, -9],
  [-8, 30, 34],
  [-3, -48, -14],
  [3, 56, 12],
  [9, -36, 26],
  [15, 44, -20],
  [24, -58, 8],
  [34, 36, -30],
] as const;

const HANDLES = ["tl", "tc", "tr", "ml", "mr", "bl", "bc", "br"] as const;

/**
 * A design-canvas grid that bends away from the pointer like a lens, with lime
 * nodes lighting up around it. Touch devices get a slow drifting "ghost" pointer.
 */
function GridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const gap = 56;
    const radius = 240;
    const push = 46;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const warp = (x: number, y: number): [number, number, number] => {
      const dx = x - mouse.x;
      const dy = y - mouse.y;
      const d = Math.hypot(dx, dy);
      if (d >= radius || d === 0) return [x, y, 0];
      const f = (1 - d / radius) ** 2;
      return [x + (dx / d) * f * push, y + (dy / d) * f * push, f];
    };

    const draw = (now: number) => {
      if (!fine && !reduced) {
        const t = now / 1000;
        mouse.tx = w * (0.5 + 0.34 * Math.sin(t * 0.45));
        mouse.ty = h * (0.5 + 0.28 * Math.sin(t * 0.31 + 1.2));
      }
      if (mouse.x < -999) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      const ox = (w % gap) / 2;
      const oy = (h % gap) / 2;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(193, 205, 196, 0.1)";
      ctx.beginPath();
      for (let x = ox; x <= w; x += gap) {
        for (let y = 0; y <= h + 12; y += 12) {
          const [px, py] = warp(x, y);
          if (y === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      }
      for (let y = oy; y <= h; y += gap) {
        for (let x = 0; x <= w + 12; x += 12) {
          const [px, py] = warp(x, y);
          if (x === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      }
      ctx.stroke();

      ctx.fillStyle = "#cff63a";
      for (let x = ox; x <= w; x += gap) {
        for (let y = oy; y <= h; y += gap) {
          const [px, py, f] = warp(x, y);
          if (f < 0.02) continue;
          ctx.globalAlpha = Math.min(1, f * 1.6);
          ctx.fillRect(px - 2, py - 2, 4, 4);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const onMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      mouse.tx = event.clientX - box.left;
      mouse.ty = event.clientY - box.top;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (reduced) return () => ro.disconnect();

    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="dw-hero-fade absolute inset-0 h-full w-full"
    />
  );
}

/** Figma-style rulers along the top and left edge that track the pointer. */
function Rulers() {
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);
  const readRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      const { clientX: x, clientY: y } = event;
      if (xRef.current) xRef.current.style.transform = `translateX(${x}px)`;
      if (yRef.current) yRef.current.style.transform = `translateY(${y}px)`;
      if (readRef.current) {
        readRef.current.textContent = `X ${Math.round(x)}  Y ${Math.round(y)}`;
        readRef.current.style.transform = `translate(${x + 22}px, ${y + 22}px)`;
        readRef.current.style.opacity = "1";
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const marks = Array.from({ length: 30 }, (_, i) => i * 100);

  return (
    <div aria-hidden className="dw-hero-fade dw-enter pointer-events-none absolute inset-0 hidden font-mono text-[9px] tracking-[0.1em] text-[#9eaca2] md:block">
      <div className="dw-ruler dw-ruler-x absolute inset-x-0 top-0 h-6 overflow-hidden">
        {marks.map((m) => (
          <span key={m} className="absolute top-0.5" style={{ left: m + 3 }}>
            {m}
          </span>
        ))}
        <span ref={xRef} className="absolute top-0 left-0 h-full w-px bg-[#cff63a]" />
      </div>
      <div className="dw-ruler dw-ruler-y absolute inset-y-0 left-0 w-6 overflow-hidden">
        {marks.map((m) => (
          <span
            key={m}
            className="absolute left-0.5 origin-top-left -rotate-90"
            style={{ top: m + 22 }}
          >
            {m}
          </span>
        ))}
        <span ref={yRef} className="absolute top-0 left-0 h-px w-full bg-[#cff63a]" />
      </div>
      <span className="absolute top-0 left-0 grid h-6 w-6 place-items-center border-r border-b border-[#9eaca2]/25 bg-[#121713]">
        <span className="h-1.5 w-1.5 bg-[#cff63a]" />
      </span>
      <span
        ref={readRef}
        className="absolute top-0 left-0 rounded-sm bg-[#cff63a] px-1.5 py-0.5 whitespace-pre text-[#121713] tabular-nums opacity-0"
      />
    </div>
  );
}

function Title() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sizeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      if (!entry || !sizeRef.current) return;
      const { width, height } = entry.contentRect;
      sizeRef.current.textContent = `${Math.round(width)} × ${Math.round(height)}`;
    });
    ro.observe(el);

    // Letters flick into the italic cut as the pointer sweeps across them.
    const timers = new Map<Element, number>();
    const onOver = (event: PointerEvent) => {
      const letter = (event.target as Element).closest(".dw-letter-in");
      if (!letter) return;
      letter.classList.add("is-hot");
      window.clearTimeout(timers.get(letter));
      timers.set(
        letter,
        window.setTimeout(() => letter.classList.remove("is-hot"), 900),
      );
    };
    el.addEventListener("pointerover", onOver);

    return () => {
      ro.disconnect();
      el.removeEventListener("pointerover", onOver);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    // No z-index or containment on this wrapper: it would isolate the blend.
    <div className="relative mx-auto -mt-[14svh] w-full px-4 md:mt-0 md:px-10">
      <div className="dw-title-blend @container">
        <h1
          ref={titleRef}
          aria-label="Designwise"
          className="dw-title relative w-full text-center"
        >
          {WORD.split("").map((ch, i) => (
            <Fragment key={i}>
              {/* Phones stack the word as DESIGN / WISE so it can run bigger. */}
              {i === 6 ? <br className="md:hidden" /> : null}
              <span
                aria-hidden
                className="dw-letter"
                style={
                  {
                    "--i": i,
                    "--x": SCATTER[i][0],
                    "--y": SCATTER[i][1],
                    "--r": SCATTER[i][2],
                  } as CSSProperties
                }
              >
                <span className="dw-letter-in">{ch}</span>
              </span>
            </Fragment>
          ))}
        </h1>
      </div>

      <div aria-hidden className="dw-select pointer-events-none absolute inset-y-[-0.4rem] inset-x-2 md:inset-x-7">
        {HANDLES.map((h) => (
          <span key={h} className={`dw-handle dw-handle-${h}`} />
        ))}
        <span
          ref={sizeRef}
          className="dw-select-tag absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-sm bg-[#cff63a] px-1.5 py-0.5 font-mono text-[10px] text-[#121713] tabular-nums"
        >
          — × —
        </span>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <a
      href="#mission"
      aria-label="Scroll to our mission"
      data-cursor="Scroll"
      className="dw-badge dw-enter relative grid aspect-square w-[92px] place-items-center md:w-[138px]"
    >
      <svg viewBox="0 0 200 200" aria-hidden className="dw-badge-ring absolute inset-0 h-full w-full">
        <defs>
          <path
            id="dw-badge-path"
            d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
          />
        </defs>
        <text className="fill-[#cecece] font-mono text-[15px]">
          <textPath href="#dw-badge-path" textLength="500" lengthAdjust="spacing">
            DESIGN EDUCATION • FOR TECH AND BEYOND •
          </textPath>
        </text>
      </svg>
      <img
        src="/designwise/images/extra-kkv.png"
        alt=""
        className="dw-badge-mark h-[34%] w-auto"
      />
    </a>
  );
}

export function Hero() {
  return (
    <Scene mode="pin" className="dw-hero relative h-[300svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden bg-[#121713]">
        <GridCanvas />

        <video
          className="dw-hero-video pointer-events-none absolute top-[64%] left-1/2 aspect-square w-[min(120vw,64svh)] max-w-none object-contain md:top-1/2 md:w-[min(70vw,96svh)]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src="/designwise/videos/hero.mp4"
        />

        <Rulers />

        <Title />

        <div className="dw-hero-fade absolute inset-x-4 top-5 z-20 flex items-start justify-between gap-6 md:inset-x-10 md:top-11">
          <a
            href="https://digitangels.com"
            className="dw-enter flex items-center gap-2 md:gap-3"
            style={{ "--d": 1 } as CSSProperties}
          >
            <span className="translate-y-[0.12em] text-[15px] md:text-[clamp(1.1rem,1.5vw,1.6rem)]">
              by
            </span>
            <img
              src="/designwise/images/digitangels-wordmark.png"
              alt="digitangels"
              className="h-5 w-auto md:h-[clamp(28px,2.6vw,42px)]"
            />
          </a>

          <div
            className="dw-enter flex flex-col items-end gap-3 text-right md:gap-4"
            style={{ "--d": 2 } as CSSProperties}
          >
            <p className="hidden text-[clamp(1.1rem,1.5vw,1.6rem)] leading-[1.15] md:block">
              Design Education
              <br />
              for Tech and beyond
            </p>
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="dw-pill dw-pill-ghost inline-flex h-9 items-center px-5 text-[13px] md:h-[42px] md:px-8 md:text-[18px]"
              >
                <span className="dw-pill-label">Contact us</span>
              </a>
            </Magnetic>
          </div>
        </div>

        <p
          className="dw-hero-fade dw-enter absolute top-[4.25rem] left-4 z-20 text-[19px] leading-[1.15] md:hidden"
          style={{ "--d": 3 } as CSSProperties}
        >
          Design Education
          <br />
          for Tech and beyond
        </p>

        <div className="dw-hero-fade absolute inset-x-4 bottom-24 z-20 flex items-end justify-between gap-4 md:inset-x-10 md:bottom-28">
          <div className="dw-enter" style={{ "--d": 4 } as CSSProperties}>
            <p className="mb-3 hidden font-mono text-[10px] tracking-[0.2em] text-[#9eaca2] uppercase md:block">
              London — Worldwide
            </p>
            <p className="text-[19px] leading-[1.12] font-semibold md:text-[clamp(1.4rem,2.3vw,2.4rem)]">
              FOR THE <em className="dw-hl not-italic">SMART.</em>
              <br />
              FOR THE <em className="dw-hl not-italic">INNOVATIVE.</em>
            </p>
          </div>
          <Badge />
        </div>

        <img
          src="/designwise/images/chevron.png"
          alt=""
          aria-hidden
          className="dw-hero-fade designwise-caret absolute bottom-32 left-1/2 z-20 hidden h-9 w-auto -translate-x-1/2 invert md:block"
        />
      </div>
    </Scene>
  );
}
