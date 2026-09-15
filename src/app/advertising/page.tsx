import type { Metadata } from "next";
import Image from "next/image";
import { WorkShell } from "@/components/work-shell";
import { advertisingItems } from "@/data/work-index";

export const metadata: Metadata = {
  title: "Advertising",
  description:
    "Award-winning brand and art direction across Coca-Cola, Nestlé, Adidas, and more.",
};

export default function AdvertisingPage() {
  return (
    <WorkShell active="advertising">
      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {advertisingItems.map((item) => (
          <li key={item.src}>
            <div className="overflow-hidden bg-black/5">
              <Image
                src={item.src}
                alt={item.title}
                width={1416}
                height={796}
                className="h-auto w-full object-cover"
              />
            </div>
            <h2 className="mt-3 text-[16px] font-medium tracking-tight text-black md:text-[18px]">
              {item.title}
            </h2>
          </li>
        ))}
      </ul>
    </WorkShell>
  );
}
