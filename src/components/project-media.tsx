"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaItem, MediaRow, ProjectBlock } from "@/data/projects";

function AutoVideo({
  src,
  className,
  onAspect,
}: {
  src: string;
  className?: string;
  onAspect?: (ratio: number) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const onAspectRef = useRef(onAspect);
  onAspectRef.current = onAspect;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});

    const report = () => {
      if (el.videoWidth > 0 && el.videoHeight > 0) {
        onAspectRef.current?.(el.videoWidth / el.videoHeight);
      }
    };
    report();
    el.addEventListener("loadedmetadata", report);
    return () => el.removeEventListener("loadedmetadata", report);
  }, [src]);

  return (
    <video
      ref={ref}
      className={className ?? "block h-auto w-full"}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function Media({
  item,
  className,
  onAspect,
}: {
  item: MediaItem;
  className?: string;
  onAspect?: (ratio: number) => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const onAspectRef = useRef(onAspect);
  onAspectRef.current = onAspect;

  useEffect(() => {
    if (item.type !== "image") return;
    const img = imgRef.current;
    if (!img) return;
    const report = () => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        onAspectRef.current?.(img.naturalWidth / img.naturalHeight);
      }
    };
    if (img.complete) report();
    img.addEventListener("load", report);
    return () => img.removeEventListener("load", report);
  }, [item.src, item.type]);

  if (item.type === "video") {
    return <AutoVideo src={item.src} className={className} onAspect={onAspect} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={item.src}
      alt=""
      className={className ?? "block h-auto w-full"}
      loading="eager"
    />
  );
}

function DualRow({ items }: { items: MediaItem[] }) {
  const [ratios, setRatios] = useState<(number | null)[]>(() =>
    items.map(() => null),
  );

  const ready = ratios.every((r): r is number => typeof r === "number" && r > 0);

  return (
    <div className="flex w-full flex-col md:flex-row md:items-start">
      {items.map((item, index) => (
        <div
          key={item.src}
          className="min-w-0 w-full"
          style={
            ready
              ? {
                  flexGrow: ratios[index]!,
                  flexShrink: 1,
                  flexBasis: 0,
                }
              : { flex: "1 1 0%" }
          }
        >
          <Media
            item={item}
            className="block h-auto w-full"
            onAspect={(ratio) => {
              setRatios((prev) => {
                if (prev[index] === ratio) return prev;
                const next = [...prev];
                next[index] = ratio;
                return next;
              });
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function ProjectGallery({
  rows,
  isLastSection = true,
}: {
  rows: MediaRow[];
  isLastSection?: boolean;
}) {
  return (
    <div className="flex w-full flex-col">
      {rows.map((row, i) => {
        const isLast = isLastSection && i === rows.length - 1;
        const spacing = isLast
          ? undefined
          : ({ marginBottom: "1%" } as const);

        if (row.length > 1) {
          return (
            <div key={i} style={spacing}>
              <DualRow items={row} />
            </div>
          );
        }

        return (
          <div key={i} className="flex w-full" style={spacing}>
            <div className="w-full">
              <Media item={row[0]} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SectionCopy({
  title,
  body,
  textColor = "#000",
}: {
  title?: string;
  body: string;
  textColor?: string;
}) {
  return (
    <div style={{ color: textColor }}>
      {title ? (
        <h3 className="mb-4 text-[22px] font-semibold tracking-tight md:text-[28px]">
          {title}
        </h3>
      ) : null}
      <p className="whitespace-pre-line text-[15px] leading-7 md:text-[17px] md:leading-8">
        {body}
      </p>
    </div>
  );
}

export function ProjectBlocks({
  blocks,
  flush = false,
}: {
  blocks: ProjectBlock[];
  /** When true, no gap between blocks (AWU / Designwise) */
  flush?: boolean;
}) {
  return (
    <div className="flex w-full flex-col">
      {blocks.map((block, i) => {
        const spacing =
          flush || i === blocks.length - 1
            ? undefined
            : ({ marginBottom: "1%" } as const);

        if (block.kind === "band") {
          const prev = i > 0 ? blocks[i - 1] : undefined;
          const next = i < blocks.length - 1 ? blocks[i + 1] : undefined;
          const samePrev =
            prev?.kind === "band" && prev.background === block.background;
          const sameNext =
            next?.kind === "band" && next.background === block.background;

          return (
            <section
              key={i}
              className="w-full"
              style={{ backgroundColor: block.background, ...spacing }}
            >
              <div
                className={`mx-auto ${
                  samePrev ? "pt-4 md:pt-6" : "pt-10 md:pt-16"
                } ${
                  sameNext ? "pb-4 md:pb-6" : "pb-10 md:pb-16"
                } ${
                  block.inset ? "w-[min(100%,1040px)] px-5" : "w-full"
                }`}
              >
                <Media item={block.media} className="block h-auto w-full" />
                {block.caption ? (
                  <p
                    className="mx-auto mt-6 max-w-[940px] text-center text-[15px] leading-7 md:text-[17px] md:leading-8"
                    style={{ color: block.captionColor ?? "#000" }}
                  >
                    {block.caption}
                  </p>
                ) : null}
              </div>
            </section>
          );
        }

        if (block.kind === "media") {
          return (
            <div
              key={i}
              className={`w-full ${block.inset ? "px-[calc((100%-min(100%,1040px))/2)]" : ""}`}
              style={spacing}
            >
              {block.items.length > 1 ? (
                <DualRow items={block.items} />
              ) : (
                <Media item={block.items[0]} className="block h-auto w-full" />
              )}
            </div>
          );
        }

        if (block.kind === "split") {
          const mediaFirst = block.mediaSide === "left";
          return (
            <section
              key={i}
              className="w-full"
              style={{
                backgroundColor: block.background ?? "transparent",
                ...spacing,
              }}
            >
              <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 py-12 md:grid-cols-2 md:gap-12 md:px-10 md:py-16">
                <div className={mediaFirst ? "order-1" : "order-1 md:order-2"}>
                  <Media item={block.media} className="block h-auto w-full" />
                </div>
                <div className={mediaFirst ? "order-2" : "order-2 md:order-1"}>
                  <SectionCopy
                    title={block.title}
                    body={block.body}
                    textColor={block.textColor}
                  />
                </div>
              </div>
            </section>
          );
        }

        const mediaFirst = block.mediaSide === "left";
        return (
          <section
            key={i}
            className="w-full"
            style={{
              backgroundColor: block.background ?? "transparent",
              ...spacing,
            }}
          >
            <div className="mx-auto grid max-w-[1200px] items-start gap-8 px-6 py-12 md:grid-cols-2 md:gap-10 md:px-10 md:py-16">
              <div className={mediaFirst ? "order-1" : "order-1 md:order-2"}>
                <Media item={block.primary} className="block h-auto w-full" />
              </div>
              <div
                className={`flex flex-col gap-6 ${
                  mediaFirst ? "order-2" : "order-2 md:order-1"
                }`}
              >
                <SectionCopy
                  title={block.title}
                  body={block.body}
                  textColor={block.textColor}
                />
                {block.secondary && block.secondary.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {block.secondary.map((item) => (
                      <Media
                        key={item.src}
                        item={item}
                        className="block h-auto w-full"
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
