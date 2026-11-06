import type { CSSProperties } from "react";
import { Scene } from "@/components/chrome/scene";
import { LazyVideo } from "@/components/lazy-video";
import { Glyph, ReadAlong } from "./bits";
import { AREAS, DISCIPLINES } from "./data";

const INTRO =
  "DESIGNWISE is the educational wing of Digitangels, dedicated to elevating the understanding and impact of design on the business world. Our team of seasoned Design Leaders, with extensive experience in product, branding, and design management, is passionately committed to advancing design leadership and maturity. We champion the importance of quality design across the tech industry and beyond, helping businesses recognise and harness the power of strategic design.";

const TEAM =
  "From the years of networking, mentoring, and being part of various organisations and communities, we have formed a highly professional team of design practitioners, researchers, educators – where talent knows no bounds and creativity flourishes across vast areas of design expertise. From branding to product and UX/UI design, user research, web design, illustration, animation, design systems, and design management, our team brings a wealth of knowledge and experience to every project.";

// Three tilted orbits, three disciplines each, like electrons around a nucleus.
const ORBITS = [-58, 0, 58];

/**
 * The team constellation as the nucleus of an atom, with every discipline in
 * orbit around it. Words stay facing the viewer and dim as they pass behind.
 */
function Atom() {
  return (
    <div className="dw-atom relative mx-auto aspect-square w-full max-w-[560px]">
      <svg viewBox="-100 -100 200 200" aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
        {ORBITS.map((tilt) => (
          <ellipse
            key={tilt}
            rx="88"
            ry="26"
            transform={`rotate(${tilt})`}
            fill="none"
            stroke="#9eaca2"
            strokeOpacity="0.35"
            strokeWidth="0.4"
            strokeDasharray="1.5 2"
          />
        ))}
      </svg>
      <div className="dw-atom-space absolute inset-0">
        <img
          src="/designwise/images/team-constellation.png"
          alt="A constellation of people linked around the world"
          className="dw-atom-core absolute inset-[27%] h-[46%] w-[46%]"
        />
        {DISCIPLINES.map((name, i) => (
          <span
            key={name}
            className="dw-electron"
            style={
              {
                "--t": `${ORBITS[i % 3]}deg`,
                "--o": `${Math.floor(i / 3) * 120 + (i % 3) * 40}deg`,
                "--dir": i % 3 === 1 ? -1 : 1,
              } as CSSProperties
            }
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

function JoinMarquee() {
  const run = (
    <span className="flex shrink-0 items-center gap-[0.4em] pr-[0.4em]">
      {AREAS.map((area) => (
        <span key={area.symbol} className="flex items-center gap-[0.4em]">
          <span>JOIN US IN REDEFINING EXCELLENCE IN DESIGN!</span>
          <Glyph src={area.icon} className="h-[0.8em] w-[0.8em]" />
        </span>
      ))}
    </span>
  );

  return (
    <div className="dw-join relative overflow-hidden bg-[#cff63a] py-3 text-[#121713] md:py-5">
      <div className="dw-join-skew">
        <div className="dw-marquee flex w-max text-[clamp(1.6rem,4.4vw,4.4rem)] leading-none font-semibold italic">
          {run}
          <span aria-hidden className="flex">{run}</span>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative bg-[#121713] text-[#e4e4e4]">
      <Scene mode="view" className="dw-about-head overflow-clip pt-20 md:pt-32">
        <p
          aria-hidden
          className="dw-about-marquee text-[clamp(5rem,17vw,17rem)] leading-[0.82] font-semibold tracking-[-0.04em] whitespace-nowrap italic"
        >
          ABOUT US <span className="dw-outline">ABOUT US</span> ABOUT US{" "}
          <span className="dw-outline">ABOUT US</span>
        </p>
        <h2 className="sr-only">About us</h2>
      </Scene>

      <div className="grid items-center gap-10 px-5 pt-10 pb-20 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16 md:px-16 md:pt-16 md:pb-32">
        <div className="relative">
          <LazyVideo
            src="/designwise/videos/about.mp4"
            className="mx-auto block aspect-square h-auto w-full max-w-[560px] object-contain"
          />
        </div>
        <ReadAlong
          text={INTRO}
          className="text-[clamp(1.35rem,2.4vw,2.5rem)] leading-[1.22] text-white"
        />
      </div>

      <div className="grid items-center gap-12 px-5 pb-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16 md:px-16 md:pb-36">
        <div className="relative md:order-2">
          <Atom />
        </div>
        <ReadAlong
          text={TEAM}
          className="text-[clamp(1.25rem,2.1vw,2.3rem)] leading-[1.26] text-white md:order-1"
        />
      </div>

      <JoinMarquee />
    </section>
  );
}
