"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/data/types";
import { VenueImage } from "@/components/shared/VenueImage";

type GalleryLightboxProps = {
  items: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
};

export function GalleryLightbox({
  items,
  initialIndex,
  onClose,
}: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [isVisible, setIsVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef(0);

  const current = items[index];

  // Open animation
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.classList.add("scroll-locked");
    requestAnimationFrame(() => setIsVisible(true));

    return () => {
      document.body.classList.remove("scroll-locked");
      previousFocusRef.current?.focus();
    };
  }, []);

  const close = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  }, [items.length]);

  const next = useCallback(() => {
    setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
  }, [items.length]);

  // Keyboard
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          close();
          break;
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [close, prev, next]);

  // Touch swipe
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
  }

  // Click outside
  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) close();
  }

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image: ${current.title}`}
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-navy/95 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOverlayClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button
        onClick={close}
        className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors rounded focus-visible:outline-2 focus-visible:outline-gold"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm font-sans">
        {index + 1} / {items.length}
      </div>

      {/* Prev */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded focus-visible:outline-2 focus-visible:outline-gold"
        aria-label="Previous image"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Image */}
      <div
        className={`relative max-w-5xl max-h-[80vh] mx-16 transition-all duration-200 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <VenueImage
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          className="max-h-[80vh] w-auto h-auto rounded"
          sizes="90vw"
          priority
        />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/80 to-transparent rounded-b">
          <h3 className="font-serif text-xl text-white font-medium">
            {current.title}
          </h3>
          <span className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-white/50">
            {current.category.replace(/-/g, " ")}
          </span>
        </div>
      </div>

      {/* Next */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded focus-visible:outline-2 focus-visible:outline-gold"
        aria-label="Next image"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}
