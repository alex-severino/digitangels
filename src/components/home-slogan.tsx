"use client";

import { useLayoutEffect, useRef } from "react";

function FitLine({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      const available = parent.clientWidth;
      if (available <= 0) return;
      el.style.fontSize = "16px";
      const measured = el.scrollWidth;
      if (measured <= 0) return;
      el.style.fontSize = `${(16 * available) / measured}px`;
      if (el.scrollWidth > available) {
        el.style.fontSize = `${parseFloat(el.style.fontSize) * (available / el.scrollWidth)}px`;
      }
    };

    fit();
    void document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [text]);

  return (
    <span
      ref={ref}
      className="inline-block whitespace-nowrap font-bold uppercase leading-[0.9] tracking-tight text-black"
    >
      {text}
    </span>
  );
}

export function HomeSlogan() {
  return (
    <h1 className="w-full px-8 text-center md:px-16 lg:px-24">
      <span className="block md:hidden">
        <FitLine text="Design" />
        <FitLine text="Transformation" />
        <FitLine text="Advisory" />
      </span>
      <span className="hidden md:block">
        <FitLine text="Design Transformation Advisory" />
      </span>
    </h1>
  );
}
