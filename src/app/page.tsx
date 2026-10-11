import { About } from "@/components/chrome/about";
import { Clients } from "@/components/chrome/clients";
import { Contact } from "@/components/chrome/contact";
import { Disciplines } from "@/components/chrome/disciplines";
import { HaloPortal } from "@/components/chrome/halo-portal";
import { Hero } from "@/components/chrome/hero";
import { Manifesto } from "@/components/chrome/manifesto";
import { Scene } from "@/components/chrome/scene";
import { WorkRail } from "@/components/chrome/work-rail";
import { workCards } from "@/data/work-index";

const HIDDEN_PROJECTS = new Set(["digitangels", "designwise"]);

export default function Home() {
  return (
    <main className="w-full bg-black text-white">
      <Hero />
      <HaloPortal />
      <Manifesto />
      <Disciplines />
      <WorkRail
        cards={workCards.filter((card) => !HIDDEN_PROJECTS.has(card.slug))}
      />
      <Clients />
      <About />
      <Contact />

      <Scene mode="view" as="section" className="dt-fabric relative h-[80svh] overflow-hidden md:h-[110svh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/digitangels/15.png"
          alt="Digitangels wordmark on fabric"
          loading="lazy"
          className="dt-fabric-img absolute inset-0 h-full w-full object-cover"
        />
      </Scene>
    </main>
  );
}
