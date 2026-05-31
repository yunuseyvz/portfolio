"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageModal } from "../../../components/ui/modal";
import { cn } from "../../../lib/utils";
import { Discipline } from "../../../data/projects";
import { Search } from "lucide-react";

export interface CollageImage {
  /** dark-mode (or only) source */
  src: string;
  /** optional light-mode source */
  srcLight?: string;
}

interface ProjectCollageProps {
  images: CollageImage[];
  title: string;
  discipline: Discipline;
}

/**
 * A masthead collage that fuses the cover image and every gallery shot
 * into one composition. The first image is the hero "feature" tile; the
 * rest fill in around it. Any tile opens a lightbox spanning all images.
 */
export function ProjectCollage({ images, title, discipline }: ProjectCollageProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isDesign = discipline === "design";

  if (images.length === 0) return null;

  const open = (i: number) => setSelectedIndex(i);
  const close = () => setSelectedIndex(null);
  const next = () =>
    setSelectedIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i));
  const prev = () =>
    setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i));

  // How many tiles we render before collapsing into a "+N" overlay.
  // Feature tile (1) + up to 4 supporting tiles = 5 visible.
  const MAX_VISIBLE = 5;
  const visible = images.slice(0, MAX_VISIBLE);
  const remaining = images.length - visible.length;
  const count = visible.length;

  const gap = isDesign ? "gap-2.5" : "gap-1.5";
  const radius = isDesign ? "rounded-xl" : "rounded-md";

  const Tile = ({
    img,
    index,
    className,
    showCount,
  }: {
    img: CollageImage;
    index: number;
    className?: string;
    showCount?: number;
  }) => (
    <button
      type="button"
      onClick={() => open(index)}
      className={cn(
        "group relative overflow-hidden border cursor-pointer",
        radius,
        isDesign
          ? "border-pink-500/15 dark:border-pink-400/15"
          : "border-cyan-500/15 dark:border-cyan-400/15",
        // playful tilt for the design world's feature tile
        isDesign && index === 0 && "rotate-[-0.6deg] hover:rotate-0 transition-transform duration-500",
        className
      )}
    >
      <Image
        src={img.src}
        alt={`${title} image ${index + 1}`}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className={cn(
          "object-cover transition-transform duration-500 group-hover:scale-[1.04]",
          img.srcLight ? "dark:block hidden" : "block"
        )}
      />
      {img.srcLight && (
        <Image
          src={img.srcLight}
          alt={`${title} image ${index + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04] dark:hidden block"
        />
      )}

      {/* "+N more" overlay on the last visible tile */}
      {showCount && showCount > 0 ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-[1px]">
          <span className="text-white text-lg font-semibold">+{showCount}</span>
        </div>
      ) : (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="bg-background/80 backdrop-blur-md rounded-full p-2.5 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200">
            <Search className="w-5 h-5" />
          </div>
        </div>
      )}
    </button>
  );

  /* ── Layouts by count ──────────────────────────────────────── */
  let layout: React.ReactNode;

  if (count === 1) {
    layout = (
      <div className="relative w-full aspect-video">
        <Tile img={visible[0]} index={0} className="absolute inset-0" />
      </div>
    );
  } else if (count === 2) {
    layout = (
      <div className={cn("grid grid-cols-2", gap)}>
        {visible.map((img, i) => (
          <div key={i} className="relative aspect-4/3">
            <Tile img={img} index={i} className="absolute inset-0" />
          </div>
        ))}
      </div>
    );
  } else if (count === 3) {
    layout = (
      <div className={cn("grid grid-cols-2 grid-rows-2 h-72 sm:h-96", gap)}>
        <Tile img={visible[0]} index={0} className="row-span-2" />
        <Tile img={visible[1]} index={1} />
        <Tile img={visible[2]} index={2} />
      </div>
    );
  } else if (count === 4) {
    layout = (
      <div className={cn("grid grid-cols-3 grid-rows-2 h-72 sm:h-96", gap)}>
        <Tile img={visible[0]} index={0} className="col-span-2 row-span-2" />
        <Tile img={visible[1]} index={1} />
        <Tile img={visible[2]} index={2} />
        <Tile img={visible[3]} index={3} className="col-span-2" />
      </div>
    );
  } else {
    // 5 visible: feature 2x2 + four supporting tiles
    layout = (
      <div className={cn("grid grid-cols-4 grid-rows-2 h-80 sm:h-[26rem]", gap)}>
        <Tile img={visible[0]} index={0} className="col-span-2 row-span-2" />
        <Tile img={visible[1]} index={1} />
        <Tile img={visible[2]} index={2} />
        <Tile img={visible[3]} index={3} />
        <Tile
          img={visible[4]}
          index={4}
          showCount={remaining > 0 ? remaining : undefined}
        />
      </div>
    );
  }

  return (
    <>
      {layout}

      <ImageModal
        isOpen={selectedIndex !== null}
        onClose={close}
        image={selectedIndex !== null ? images[selectedIndex].src : ""}
        alt={`${title} image ${selectedIndex !== null ? selectedIndex + 1 : ""}`}
        onNext={next}
        onPrevious={prev}
        hasNext={selectedIndex !== null && selectedIndex < images.length - 1}
        hasPrevious={selectedIndex !== null && selectedIndex > 0}
      />
    </>
  );
}
