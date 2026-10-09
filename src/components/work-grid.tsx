import Link from "next/link";
import { LazyVideo } from "@/components/lazy-video";
import { Reveal } from "@/components/reveal";
import { projectHref, type WorkCard } from "@/data/work-index";

export function WorkGrid({ cards }: { cards: WorkCard[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2">
      {cards.map((card, index) => (
        <li key={card.slug}>
          <Reveal delay={(index % 2) * 90}>
            <Link href={projectHref(card.slug)} className="group block">
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-none tracking-[-0.03em] text-[#121713] transition-transform duration-500 group-hover:translate-x-1">
                  {card.title}
                </h2>
                <span className="text-[12px] font-semibold tracking-[0.16em] text-[#121713]/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="relative aspect-[605/340] overflow-hidden bg-[#121713]">
                <LazyVideo
                  src={card.thumbnail}
                  eager={index < 2}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-[#cff63a]" />
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
