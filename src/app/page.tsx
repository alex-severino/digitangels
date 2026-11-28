import { Contact } from "@/components/chrome/contact";
import { Disciplines } from "@/components/chrome/disciplines";
import { HaloPortal } from "@/components/chrome/halo-portal";
import { Hero } from "@/components/chrome/hero";
import { Manifesto } from "@/components/chrome/manifesto";
import { Production } from "@/components/chrome/production";
import { WorkRail } from "@/components/chrome/work-rail";
import { EducationBanner } from "@/components/designwise/education-banner";
import { selectedWorkCards } from "@/data/work-index";

export default function Home() {
  return (
    <main className="w-full bg-black text-white">
      <Hero />
      <HaloPortal />
      <Manifesto />
      <Disciplines />
      <Production />
      <WorkRail cards={selectedWorkCards} />
      <EducationBanner />
      <Contact />

      <section className="dt-fabric relative aspect-[2048/1366] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/digitangels/15.png"
          alt="Digitangels wordmark on fabric"
          loading="lazy"
          className="dt-fabric-img absolute inset-0 h-full w-full object-cover"
        />
      </section>
    </main>
  );
}
