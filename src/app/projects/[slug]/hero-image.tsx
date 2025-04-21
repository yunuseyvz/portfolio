"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageModal } from "@/components/ui/modal";
import BlurFade from "@/components/ui/blur-fade";
import { Search } from "lucide-react";

interface HeroImageProps {
  image: string;
  imageLight?: string;
  title: string;
  delay: number;
}

export function HeroImage({ image, imageLight, title, delay }: HeroImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Use light image if provided, otherwise fall back to the default image
  const lightImageSrc = imageLight || image;

  return (
    <>
      <BlurFade className="w-full mb-8" delay={delay}>
        <div className="container-fluid max-w-6xl mx-auto px-4">
          <div 
            className="rounded-lg overflow-hidden shadow-md relative group cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            {/* Dark mode image */}
            <Image
              src={image}
              alt={title}
              width={1200}
              height={600}
              className="object-cover w-full h-auto aspect-[21/9] dark:block hidden transition-transform duration-300 group-hover:scale-[1.02]"
            />
            {/* Light mode image -- doesn't work?? */}
            <Image
              src={lightImageSrc}
              alt={title}
              width={1200}
              height={600}
              className="object-cover w-full h-auto aspect-[21/9] dark:hidden block transition-transform duration-300 group-hover:scale-[1.02]"
            />
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="bg-background/80 backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200">
                <Search className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={image}
        alt={title}
      />
    </>
  );
}