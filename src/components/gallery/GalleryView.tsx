"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { GalleryItem, GalleryCategory } from "@/data/types";
import { GalleryFilters } from "./GalleryFilters";
import { GalleryGrid } from "./GalleryGrid";

type GalleryViewProps = {
  initialItems: GalleryItem[];
  categories: (GalleryCategory & { count: number })[];
};

export function GalleryView({ initialItems, categories }: GalleryViewProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  const filteredItems = useMemo(() => {
    if (!categoryParam || categoryParam === "all") return initialItems;
    return initialItems.filter((item) => item.category === categoryParam);
  }, [initialItems, categoryParam]);

  return (
    <div className="space-y-8">
      <GalleryFilters
        categories={categories}
        activeCategory={categoryParam}
      />
      <div className="container-sym pb-20">
        <GalleryGrid items={filteredItems} />
      </div>
    </div>
  );
}
