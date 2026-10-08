import Link from "next/link";
import { LazyVideo } from "@/components/lazy-video";
import { projectHref, type WorkCard } from "@/data/work-index";

export function WorkGrid({ cards }: { cards: WorkCard[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
      {cards.map((card, index) => (
        <li key={card.slug}>
          <Link href={projectHref(card.slug)} className="group block">
            <h2 className="mb-3 text-[29px] font-medium leading-[1.35] tracking-tight text-black md:text-[40px]">
              {card.title}
            </h2>
            <div
              className={`aspect-[605/340] overflow-hidden ${
                card.slug === "designwise" ? "bg-[#121412]" : "bg-[#C9C9C9]"
              }`}
            >
              <LazyVideo
                src={card.thumbnail}
                eager={index < 2}
                className={`h-full w-full transition-opacity duration-300 group-hover:opacity-90 ${
                  card.slug === "designwise" ? "object-contain" : "object-cover"
                }`}
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
