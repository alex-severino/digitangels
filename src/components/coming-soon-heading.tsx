"use client";

import { useLayoutEffect, useRef, useState } from "react";

const FULL_SIZE_REM = 7.5;
const HALF_SIZE_REM = 3.75;

function isWrapping(element: HTMLElement): boolean {
  const range = document.createRange();
  range.selectNodeContents(element);
  return range.getClientRects().length > 1;
}

export function ComingSoonHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [fontSizeRem, setFontSizeRem] = useState(FULL_SIZE_REM);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateSize = () => {
      el.style.fontSize = `${FULL_SIZE_REM}rem`;
      const wraps = isWrapping(el);
      const nextSize = wraps ? HALF_SIZE_REM : FULL_SIZE_REM;
      el.style.fontSize = `${nextSize}rem`;
      setFontSizeRem(nextSize);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    if (el.parentElement) {
      observer.observe(el.parentElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <h1
      ref={ref}
      className="w-full max-w-full px-4 text-center font-semibold uppercase leading-none tracking-tight text-black"
      style={{ fontSize: `${fontSizeRem}rem` }}
    >
      Coming soon
    </h1>
  );
}
