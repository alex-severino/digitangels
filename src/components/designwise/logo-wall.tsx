"use client";

import { useRef, type CSSProperties } from "react";
import { LOGOS } from "./data";

/** Every logo at once on a specimen wall; a soft light follows the pointer. */
export function LogoWall() {
  const ref = useRef<HTMLUListElement>(null);

  const onMove = (event: React.PointerEvent<HTMLUListElement>) => {
    const wall = ref.current;
    if (!wall || event.pointerType !== "mouse") return;
    const box = wall.getBoundingClientRect();
    wall.style.setProperty("--mx", `${event.clientX - box.left}px`);
    wall.style.setProperty("--my", `${event.clientY - box.top}px`);
    wall.style.setProperty("--lit", "1");
  };

  return (
    <ul
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => ref.current?.style.setProperty("--lit", "0")}
      className="dw-wall relative mx-5 mt-10 grid grid-cols-3 border-t border-l border-[#121713]/20 md:mx-16 md:mt-16 lg:grid-cols-6"
    >
      {LOGOS.map(([file, name], i) => (
        <li
          key={file}
          className="dw-wall-cell relative grid aspect-[4/3] place-items-center overflow-hidden border-r border-b border-[#121713]/20"
          style={{ "--i": i } as CSSProperties}
        >
          <span className="dw-wall-fill absolute inset-0 bg-[#121713]" aria-hidden />
          <img
            src={`/designwise/images/${file}`}
            alt={name}
            className="dw-wall-logo absolute top-1/2 left-1/2 max-h-[40%] max-w-[64%] -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
