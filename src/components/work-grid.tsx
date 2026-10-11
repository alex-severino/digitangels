import Link from "next/link";
import { LazyVideo } from "@/components/lazy-video";
import { Reveal } from "@/components/reveal";
import { projectHref, type WorkCard } from "@/data/work-index";

export function WorkGrid({ cards }: { cards: WorkCard[] }) {
  return (
    <ul className="border-t border-black/15">
      {cards.map((card, index) => {
        const flip = index % 2 === 1;
        return (
          <li key={card.slug} className="border-b border-black/15">
            <Reveal delay={(index % 2) * 70}>
              <Link
                href={projectHref(card.slug)}
                className={`group grid items-stretch md:grid-cols-2 ${
                  flip ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="flex min-h-[12rem] flex-col justify-between px-4 py-8 md:min-h-[22rem] md:px-8 md:py-10">
                  <span className="text-[12px] font-semibold tracking-[0.2em] text-black/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="max-w-[14ch] text-[clamp(2rem,4.6vw,4.4rem)] font-semibold leading-[0.9] tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-2">
                    {card.title}
                  </h2>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black md:aspect-auto">
                  <LazyVideo
                    src={card.thumbnail}
                    eager={index < 2}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                </div>
              </Link>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
