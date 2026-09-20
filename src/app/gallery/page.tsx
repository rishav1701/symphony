import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GalleryView } from "@/components/gallery/GalleryView";
import { getGalleryItems, getGalleryCategories } from "@/data/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description:
    "Explore the architectural spaces, main auditorium, banquet halls, and wedding setups at Symphony Auditorium.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const [items, categories] = await Promise.all([
    getGalleryItems("all"),
    getGalleryCategories(),
  ]);

  return (
    <div className="pt-24 md:pt-28">
      <Container className="pt-12 pb-6">
        <SectionHeading
          eyebrow="Gallery"
          title="Architecture, Spaces & Celebrations"
          description="Explore our grand auditorium hall, elegant banquet spaces, and beautifully staged events."
          centered
        />
      </Container>

      <Suspense
        fallback={
          <div className="container-sym py-20 text-center text-muted">
            Loading gallery...
          </div>
        }
      >
        <GalleryView initialItems={items} categories={categories} />
      </Suspense>
    </div>
  );
}
