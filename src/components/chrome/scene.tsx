"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * One shared scroll loop for the whole site. Every registered element gets a
 * `--p` custom property (0 → 1) so effects can be written in plain CSS with
 * `calc(var(--p) * …)` and never cause a React render.
 *
 * - `pin`:  progress across a tall section with a sticky child (0 when its top
 *           hits the viewport top, 1 when its bottom hits the viewport bottom).
 * - `view`: progress from entering the bottom of the viewport to leaving the top.
 *
 * The root element also receives `--v`, a smoothed scroll velocity used for
 * skew / stretch effects.
 */

type Mode = "pin" | "view";
type Entry = { el: HTMLElement; mode: Mode };

const entries = new Set<Entry>();
let frame = 0;
let lastY = 0;
let velocity = 0;

function measure() {
  frame = 0;
  const vh = window.innerHeight;
  for (const { el, mode } of entries) {
    const box = el.getBoundingClientRect();
    if (box.bottom < -vh || box.top > vh * 2) continue;
    const p =
      mode === "pin"
        ? -box.top / Math.max(1, box.height - vh)
        : (vh - box.top) / (vh + box.height);
    el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
  }

  const y = window.scrollY;
  velocity += (y - lastY - velocity) * 0.18;
  lastY = y;
  const v = Math.max(-40, Math.min(40, velocity));
  document.documentElement.style.setProperty("--v", (v / 40).toFixed(3));
  if (Math.abs(velocity) > 0.05) schedule();
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(measure);
}

let listening = false;
function listen() {
  if (listening) return;
  listening = true;
  lastY = window.scrollY;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}

export function useScrollProgress(
  ref: React.RefObject<HTMLElement | null>,
  mode: Mode = "pin",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const entry = { el, mode };
    entries.add(entry);
    listen();
    schedule();
    return () => {
      entries.delete(entry);
    };
  }, [ref, mode]);
}

export function Scene({
  as: Tag = "section",
  mode = "pin",
  className = "",
  style,
  id,
  children,
}: {
  as?: ElementType;
  mode?: Mode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, mode);
  return (
    <Tag
      ref={ref}
      id={id}
      data-scene
      className={className}
      style={{ "--p": 0, ...style }}
    >
      {children}
    </Tag>
  );
}

/** Adds `is-in` once the element scrolls into view (for CSS-driven reveals). */
export function InView({
  as: Tag = "div",
  className = "",
  threshold = 0.2,
  children,
}: {
  as?: ElementType;
  className?: string;
  threshold?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
