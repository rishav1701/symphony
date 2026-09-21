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
    src: "/images/gallery-one.jpg", alt: "Symphony Convention Centre grand entrance with arched doorway",
    width: 800, height: 1000,
  },
  {
    id: "g-02", order: 2, published: true,
    title: "Main Hall Overview", category: "venue-overview",
    src: "/images/gallery-two.jpg", alt: "Panoramic view of the main auditorium hall",
    width: 800, height: 1000,
  },
  {
    id: "g-03", order: 3, published: true,
    title: "Stage Setup", category: "venue-overview",
    src: "/images/gallery-three.jpg", alt: "Proscenium stage with professional lighting",
    width: 800, height: 1000,
  },
  {
    id: "g-04", order: 4, published: true,
    title: "Wedding Décor", category: "real-weddings",
    src: "/images/gallery-four.jpg", alt: "Wedding stage decorated with floral arrangements",
    width: 800, height: 1000,
  },
  {
    id: "g-05", order: 5, published: true,
    title: "Banquet Dining", category: "banquet-hall",
    src: "/images/gallery-five.jpg", alt: "Banquet hall with seated dining arrangement",
    width: 800, height: 1000,
  },
  {
    id: "g-06", order: 6, published: true,
    title: "Exterior at Dusk", category: "entrance-exterior",
    src: "/images/gallery-six.jpg", alt: "Building exterior illuminated at twilight",
    width: 800, height: 1000,
  },
  {
    id: "g-07", order: 7, published: true,
    title: "Ceremony in Progress", category: "real-weddings",
    src: "/images/gallery-seven.jpg", alt: "Wedding ceremony on the main stage",
    width: 800, height: 1000,
  },
  {
    id: "g-08", order: 8, published: true,
    title: "Ceiling Detail", category: "venue-overview",
    src: "/images/gallery-eight.jpg", alt: "Coffered ceiling with integrated lighting",
    width: 800, height: 1000,
  },
  {
    id: "g-09", order: 9, published: true,
    title: "Reception Setup", category: "banquet-hall",
    src: "/images/gallery-nine.jpg", alt: "Banquet hall configured for a reception",
    width: 800, height: 1000,
  },
  {
    id: "g-10", order: 10, published: true,
    title: "Parking Area", category: "entrance-exterior",
    src: "/images/gallery-ten.jpg", alt: "Spacious parking area at the venue",
    width: 800, height: 1000,
  },
  {
    id: "g-11", order: 11, published: true,
    title: "Wedding Stage Close-up", category: "real-weddings",
    src: "/images/gallery-eleven.jpg", alt: "Close-up of wedding stage floral arrangement",
    width: 800, height: 1000,
  },
  {
    id: "g-12", order: 12, published: true,
    title: "Hall Seating", category: "venue-overview",
    src: "/images/gallery-twelve.jpg", alt: "Rows of seating in the auditorium",
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
