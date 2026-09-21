import type { CateringSection } from "./types";

/* Admin: edit title, description, image, items. Reorder or unpublish. */
const cateringSections: CateringSection[] = [
  {
    id: "c-menu", order: 1, published: true,
    slug: "menu-options",
    title: "In-House & Outside Catering",
    description:
      "Our in-house catering team serves a delightful variety of cuisines blending local and global flavours with transparent price-per-plate options. Outside catering and food are also warmly welcomed.",
    image: "/images/catering-menu-new.jpg",
    imageAlt: "Catering menu presentation",
    items: [],
  },
  {
    id: "c-dining", order: 2, published: true,
    slug: "dining-arrangements",
    title: "Dining Arrangements",
    description:
      "From seated traditional Sadya to standing buffets and live counters, the halls accommodate seamless dining for up to 3,000 guests.",
    image: "/images/catering-dining-new.jpg",
    imageAlt: "Dining arrangement in the banquet hall",
    items: [],
  },
  {
    id: "c-veg", order: 3, published: true,
    slug: "vegetarian",
    title: "Vegetarian Options",
    description:
      "Extensive vegetarian menus featuring Kerala specialties and contemporary options. Every meal crafted with fresh, locally sourced ingredients.",
    image: "/images/catering-veg-new.jpg",
    imageAlt: "Vegetarian dishes presentation",
    items: [],
  },
  {
    id: "c-nonveg", order: 4, published: true,
    slug: "non-vegetarian",
    title: "Non-Vegetarian Options",
    description:
      "Seafood, poultry, and meat preparations drawing from Kerala's culinary traditions, alongside national and international selections.",
    image: "/images/catering-nonveg-new.jpg",
    imageAlt: "Non-vegetarian dishes presentation",
    items: [],
  },
  {
    id: "c-kerala", order: 5, published: true,
    slug: "traditional-kerala",
    title: "Traditional Kerala Cuisine",
    description:
      "Sadya and traditional Kerala fare served on banana leaves. Ideal for ceremonies and cultural celebrations.",
    image: "/images/catering-kerala-new.jpg",
    imageAlt: "Traditional Kerala sadya on banana leaf",
    items: [],
  },
  {
    id: "c-event", order: 6, published: true,
    slug: "event-catering",
    title: "Event Catering",
    description:
      "Full-service catering coordination for weddings, receptions, and large gatherings. Our team manages setup, service, and cleanup.",
    image: "/images/catering-event-new.jpg",
    imageAlt: "Full event catering service setup",
    items: [],
  },
  {
    id: "c-buffet", order: 7, published: true,
    slug: "buffet-arrangements",
    title: "Buffet Arrangements",
    description:
      "Professionally arranged buffet counters with live cooking stations and a curated selection to serve large gatherings efficiently.",
    image: "/images/catering-buffet-new.jpg",
    imageAlt: "Buffet arrangement with multiple food stations",
    items: [],
  },
];

/** Returns published catering sections sorted by order. */
export async function getCateringSections(): Promise<CateringSection[]> {
  return cateringSections
    .filter((s) => s.published)
    .sort((a, b) => a.order - b.order);
}
