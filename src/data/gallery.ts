import type { GalleryItem, GalleryCategory, GalleryCategoryId } from "./types";

export const galleryCategories: GalleryCategory[] = [
  { id: "all", label: "All" },
  { id: "venue-overview", label: "Venue Overview" },
  { id: "entrance-exterior", label: "Entrance & Exterior" },
  { id: "real-weddings", label: "Real Weddings" },
  { id: "banquet-hall", label: "Banquet Hall" },
];

/* Admin: add / reorder / unpublish items. src points to /public/images/. */
const galleryItems: GalleryItem[] = [
  {
    id: "g-01", order: 1, published: true,
    title: "Grand Entrance", category: "entrance-exterior",
    src: "/images/gallery-01.jpg", alt: "Symphony Auditorium grand entrance with arched doorway",
    width: 800, height: 1000,
  },
  {
    id: "g-02", order: 2, published: true,
    title: "Main Hall Overview", category: "venue-overview",
    src: "/images/gallery-02.jpg", alt: "Panoramic view of the main auditorium hall",
    width: 800, height: 1000,
  },
  {
    id: "g-03", order: 3, published: true,
    title: "Stage Setup", category: "venue-overview",
    src: "/images/gallery-03.jpg", alt: "Proscenium stage with professional lighting",
    width: 800, height: 1000,
  },
  {
    id: "g-04", order: 4, published: true,
    title: "Wedding Décor", category: "real-weddings",
    src: "/images/gallery-04.jpg", alt: "Wedding stage decorated with floral arrangements",
    width: 800, height: 1000,
  },
  {
    id: "g-05", order: 5, published: true,
    title: "Banquet Dining", category: "banquet-hall",
    src: "/images/gallery-05.jpg", alt: "Banquet hall with seated dining arrangement",
    width: 800, height: 1000,
  },
  {
    id: "g-06", order: 6, published: true,
    title: "Exterior at Dusk", category: "entrance-exterior",
    src: "/images/gallery-06.jpg", alt: "Building exterior illuminated at twilight",
    width: 800, height: 1000,
  },
  {
    id: "g-07", order: 7, published: true,
    title: "Ceremony in Progress", category: "real-weddings",
    src: "/images/gallery-07.jpg", alt: "Wedding ceremony on the main stage",
    width: 800, height: 1000,
  },
  {
    id: "g-08", order: 8, published: true,
    title: "Ceiling Detail", category: "venue-overview",
    src: "/images/gallery-08.jpg", alt: "Coffered ceiling with integrated lighting",
    width: 800, height: 1000,
  },
  {
    id: "g-09", order: 9, published: true,
    title: "Reception Setup", category: "banquet-hall",
    src: "/images/gallery-09.jpg", alt: "Banquet hall configured for a reception",
    width: 800, height: 1000,
  },
  {
    id: "g-10", order: 10, published: true,
    title: "Parking Area", category: "entrance-exterior",
    src: "/images/gallery-10.jpg", alt: "Spacious parking area at the venue",
    width: 800, height: 1000,
  },
  {
    id: "g-11", order: 11, published: true,
    title: "Wedding Stage Close-up", category: "real-weddings",
    src: "/images/gallery-11.jpg", alt: "Close-up of wedding stage floral arrangement",
    width: 800, height: 1000,
  },
  {
    id: "g-12", order: 12, published: true,
    title: "Hall Seating", category: "venue-overview",
    src: "/images/gallery-12.jpg", alt: "Rows of seating in the auditorium",
    width: 800, height: 1000,
  },
];

/** Returns published gallery items sorted by order. */
export async function getGalleryItems(
  category?: GalleryCategoryId
): Promise<GalleryItem[]> {
  const published = galleryItems
    .filter((i) => i.published)
    .sort((a, b) => a.order - b.order);

  if (!category || category === "all") return published;
  return published.filter((i) => i.category === category);
}

/** Returns all categories with published-item counts. */
export async function getGalleryCategories(): Promise<
  (GalleryCategory & { count: number })[]
> {
  const published = galleryItems.filter((i) => i.published);
  return galleryCategories.map((cat) => ({
    ...cat,
    count:
      cat.id === "all"
        ? published.length
        : published.filter((i) => i.category === cat.id).length,
  }));
}
