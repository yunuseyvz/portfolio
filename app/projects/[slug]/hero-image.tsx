"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageModal } from "../../../components/ui/modal";
import { Search } from "lucide-react";

interface HeroImageProps {
  image: string;
  title: string;
}

export function HeroImage({ image, title }: HeroImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="group relative cursor-pointer overflow-hidden rounded-md border border-border"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={image}
          alt={title}
          width={1200}
          height={600}
          className="aspect-[21/9] w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25">
          <Search className="size-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={image}
        alt={title}
      />
    </>
  );
}
