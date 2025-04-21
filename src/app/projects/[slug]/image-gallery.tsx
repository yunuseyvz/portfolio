"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageModal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/ui/blur-fade";
import { Search } from "lucide-react";

// Animation delay increment for staggered animations
const BLUR_FADE_DELAY = 0.04;

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleNext = () => {
        if (selectedIndex !== null && selectedIndex < images.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (selectedIndex !== null && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    // Close the modal
    const handleClose = () => {
        setSelectedIndex(null);
    };

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {images.map((image, index) => (
                    <BlurFade
                        key={image}
                        delay={BLUR_FADE_DELAY * 6 + index * 0.05}
                        className={cn("group relative overflow-hidden rounded-lg shadow hover:shadow-md transition-all")}
                    >
                        <div
                            className="aspect-video cursor-pointer relative"
                            onClick={() => setSelectedIndex(index)}
                        >
                            <Image
                                src={image}
                                alt={`${title} screenshot ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="bg-background/80 backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200">
                                    <Search className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </BlurFade>
                ))}
            </div>

            <ImageModal
                isOpen={selectedIndex !== null}
                onClose={handleClose}
                image={selectedIndex !== null ? images[selectedIndex] : ""}
                alt={`${title} showcase image ${selectedIndex !== null ? selectedIndex + 1 : ""}`}
                onNext={handleNext}
                onPrevious={handlePrevious}
                hasNext={selectedIndex !== null && selectedIndex < images.length - 1}
                hasPrevious={selectedIndex !== null && selectedIndex > 0}
            />
        </>
    );
}