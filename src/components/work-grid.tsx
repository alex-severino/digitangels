import Link from "next/link";
import type { WorkCard } from "@/data/work-index";

export function WorkGrid({ cards }: { cards: WorkCard[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
      {cards.map((card) => (
        <li key={card.slug}>
          <Link href={`/projects/${card.slug}`} className="group block">
            <h2 className="mb-3 text-[36px] font-medium tracking-tight text-black md:text-[40px]">
              {card.title}
            </h2>
            <div
              className={`aspect-[605/340] overflow-hidden ${
                card.slug === "designwise" ? "bg-[#121412]" : "bg-black/5"
              }`}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className={`h-full w-full transition-opacity duration-300 group-hover:opacity-90 ${
                  card.slug === "designwise" ? "object-contain" : "object-cover"
                }`}
                src={card.thumbnail}
              />
            </div>
            <div className="mt-2.5 flex flex-wrap gap-[7px] sm:gap-[12px]">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center justify-center rounded-full border border-[#979797] px-3.5 py-1.5 text-[13px] font-medium text-[#979797] sm:text-[15px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
