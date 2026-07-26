"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageModal } from "../../../components/ui/modal";
import { Search } from "lucide-react";

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

    const handleClose = () => {
        setSelectedIndex(null);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {images.map((image, index) => (
                    <div
                        key={image}
                        className="group relative aspect-video cursor-pointer overflow-hidden rounded-md border border-border"
                        onClick={() => setSelectedIndex(index)}
                    >
                        <Image
                            src={image}
                            alt={`${title} screenshot ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25">
                            <Search className="size-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                    </div>
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
