"use client";

import { useState } from "react";
import type { GalleryItem } from "@/data/types";
import { VenueImage } from "@/components/shared/VenueImage";
import { GalleryLightbox } from "./GalleryLightbox";
import { Reveal } from "@/components/shared/Reveal";

type GalleryGridProps = {
  items: GalleryItem[];
};

export function GalleryGrid({ items }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-muted">
          No images in this category yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={i * 40}>
            <button
              type="button"
              className="group relative w-full aspect-[4/5] overflow-hidden rounded card cursor-pointer text-left"
              onClick={() => setLightboxIndex(i)}
              aria-label={`View ${item.title}`}
            >
              <VenueImage
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300 max-md:opacity-100" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 max-md:translate-y-0">
                <h3 className="font-serif text-lg text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-md:opacity-100">
                  {item.title}
                </h3>
                <span className="font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-md:opacity-100">
                  {item.category.replace(/-/g, " ")}
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={items}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
