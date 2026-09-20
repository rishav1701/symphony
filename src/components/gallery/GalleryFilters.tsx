"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import type { GalleryCategory } from "@/data/types";

type GalleryFiltersProps = {
  categories: (GalleryCategory & { count: number })[];
  activeCategory: string;
};

export function GalleryFilters({
  categories,
  activeCategory,
}: GalleryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = useCallback(
    (categoryId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (categoryId === "all") {
        params.delete("category");
      } else {
        params.set("category", categoryId);
      }
      router.replace(`/gallery?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div
      className="sticky top-[72px] z-20 bg-ivory/95 backdrop-blur-sm border-b border-line py-4"
      role="tablist"
      aria-label="Gallery categories"
    >
      <div className="container-sym overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelect(cat.id)}
                className={clsx(
                  "relative px-5 py-2.5 rounded-sm font-sans text-xs font-semibold tracking-[0.08em] uppercase transition-all duration-200 whitespace-nowrap",
                  isActive
                    ? "bg-navy text-white"
                    : "bg-white text-ink/70 hover:text-ink border border-line hover:border-navy/20"
                )}
              >
                {cat.label}
                <span className="ml-1.5 text-[10px] opacity-60">
                  {cat.count}
                </span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
