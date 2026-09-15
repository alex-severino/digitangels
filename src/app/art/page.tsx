import type { Metadata } from "next";
import Image from "next/image";
import { WorkShell } from "@/components/work-shell";
import {
  ART_COLLAB,
  ART_INTRO,
  artImages,
  artLinks,
  artTags,
} from "@/data/work-index";

export const metadata: Metadata = {
  title: "Art",
  description: "POSTERESS — graphic design and typography by Digitangels.",
};

function PosterRow({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {images.map((src) => (
        <div key={src} className="overflow-hidden bg-black/5">
          <Image
            src={src}
            alt=""
            width={714}
            height={1020}
            className="h-auto w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default function ArtPage() {
  return (
    <WorkShell
      active="art"
      sectionIntro={ART_INTRO}
      links={artLinks}
      tags={artTags}
    >
      <div className="space-y-10 md:space-y-14">
        <PosterRow images={artImages.row1} />

        <div className="mx-auto max-w-[941px] overflow-hidden">
          <Image
            src={artImages.hero}
            alt=""
            width={2048}
            height={1461}
            className="h-auto w-full object-cover"
          />
        </div>

        <PosterRow images={artImages.row3} />

        <div>
          <p className="mb-8 max-w-3xl text-[15px] leading-[1.35] text-black/75 md:text-[16px]">
            {ART_COLLAB}
          </p>
          <PosterRow images={artImages.row4} />
        </div>
      </div>
    </WorkShell>
  );
}
