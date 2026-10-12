import { About } from "./about";
import { Contact } from "./contact";
import { AREAS, SUPPORT } from "./data";
import { Dock } from "./dock";
import { Reason } from "./elements";
import { Hero } from "./hero";
import { Bridge, Trusted } from "./interludes";
import { Mission } from "./mission";
import { Reasons } from "./reasons";

/** CSS-only intro: a lime curtain counts to 100 and lifts, even without JS. */
function Intro() {
  return (
    <div aria-hidden className="dw-intro fixed inset-0 z-[120] flex flex-col justify-between bg-[#cff63a] p-5 text-[#121713] md:p-10">
      <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase md:text-[11px]">
        <span>Designwise</span>
        <span>Calibrating design maturity</span>
      </div>
      <img
        src="/designwise/images/extra-l8d.png"
        alt=""
        className="dw-intro-mark mx-auto h-[min(34vw,220px)] w-auto"
      />
      <div className="flex items-end justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase md:text-[11px]">
          by digitangels
        </span>
        <span className="dw-intro-count text-[clamp(4.5rem,16vw,14rem)] leading-[0.78] font-semibold tracking-[-0.06em] italic tabular-nums" />
      </div>
    </div>
  );
}

export function DesignwisePage() {
  return (
    <main className="dw overflow-x-clip">
      <Intro />
      <Hero />
      <Mission />
      <About />
      <Reasons />
      <Reason
        id="reason-1"
        n="1"
        kicker="The periodic table of design excellence"
        heading="You are ready for the next level of Design Excellence, and interested in improving the following areas:"
        items={AREAS}
        offset={0}
        theme="dark"
        note="We are happy to offer our support in the multiple areas, or only in some part of one area – flexibility is key! Also, if you have a special request that is not listed above – do let us know, we'll be happy to chat and find out if we can be of help."
      />
      <Bridge />
      <Reason
        id="reason-2"
        n="2"
        kicker="Catalysts for design leadership"
        heading="You feel that your design team needs expert support with certain aspects of Design Maturity / Design Leadership"
        items={SUPPORT}
        offset={AREAS.length}
        theme="light"
        note="Feel free to let us know what design area is most challenging in your company, even if it's not listed in trainings and workshops above. We'll be happy to tailor our support to the specific needs of your design team."
      />
      <Trusted />
      <Contact />
      <Dock />
    </main>
  );
}
