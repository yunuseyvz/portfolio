"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  // Handle escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Handle client-side portal mounting
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div 
            className={cn(
              "relative bg-background rounded-lg shadow-lg max-w-[90vw] max-h-[90vh]",
              className
            )}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute right-2 top-2 z-10 rounded-full p-2 bg-background/50 hover:bg-background/80 text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function ImageModal({
  isOpen,
  onClose,
  image,
  alt,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  alt: string;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}) {
  // Track image loading state
  const [isLoading, setIsLoading] = React.useState(true);

  // Reset loading state when image changes
  React.useEffect(() => {
    setIsLoading(true);
  }, [image]);

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && onNext && hasNext) onNext();
      if (e.key === "ArrowLeft" && onPrevious && hasPrevious) onPrevious();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onNext, onPrevious, hasNext, hasPrevious]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="overflow-hidden p-0">
      <div className="relative max-w-[90vw] max-h-[90vh] overflow-hidden">
        {onPrevious && hasPrevious && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 bg-background/30 hover:bg-background/50 text-foreground/70 hover:text-foreground transition-all hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" 
                 role="status" 
                 aria-label="Loading image">
            </div>
          </div>
        )}
        
        <AnimatePresence mode="wait">
          <motion.img 
            key={image}
            src={image} 
            alt={alt} 
            className="object-contain max-w-full max-h-[90vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onLoad={() => setIsLoading(false)}
          />
        </AnimatePresence>

        {onNext && hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 bg-background/30 hover:bg-background/50 text-foreground/70 hover:text-foreground transition-all hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </Modal>
  );
}