import type { Service } from "./types";

/* Admin: edit slug, title, description, image, cta. Reorder or unpublish. */
const services: Service[] = [
  {
    id: "s-weddings", order: 1, published: true,
    slug: "weddings",
    title: "Weddings",
    description:
      "A stage set for your most meaningful celebration. Symphony offers the space, the infrastructure, and the atmosphere for weddings of every scale — intimate or grand.",
    image: "/images/third-image.png",
    imageAlt: "Wedding ceremony at Symphony Convention Centre",
    cta: { label: "Enquire about weddings", href: "/contact?type=wedding" },
  },
  {
    id: "s-receptions", order: 2, published: true,
    slug: "receptions",
    title: "Receptions",
    description:
      "Host your reception in a space designed for gathering, dining, and celebration. Flexible seating, professional lighting, and catering support included.",
    image: "/images/fourth-image.png",
    imageAlt: "Reception event at Symphony Convention Centre",
    cta: { label: "Enquire about receptions", href: "/contact?type=reception" },
  },
  {
    id: "s-cultural", order: 3, published: true,
    slug: "cultural-events",
    title: "Cultural Events",
    description:
      "From classical performances to community programs, the auditorium's acoustics and stage setup support a wide range of cultural events.",
    image: "/images/fifth-image.png",
    imageAlt: "Cultural event performance on stage",
    cta: { label: "Enquire about cultural events", href: "/contact?type=cultural-event" },
  },
  {
    id: "s-corporate", order: 4, published: true,
    slug: "corporate-events",
    title: "Corporate Events",
    description:
      "Professional event hosting with modern AV capabilities, flexible layouts, and the amenities your team and guests expect.",
    image: "/images/coorporate-events.png",
    imageAlt: "Corporate event setup with stage and seating",
    cta: { label: "Enquire about corporate events", href: "/contact?type=corporate-event" },
  },
  {
    id: "s-seminars", order: 5, published: true,
    slug: "seminars",
    title: "Seminars",
    description:
      "Lecture-hall seating, presentation-ready infrastructure, and a focused environment suited for seminars, workshops, and conferences.",
    image: "/images/seminar-image.png",
    imageAlt: "Seminar setup with rows of seating",
    cta: { label: "Enquire about seminars", href: "/contact?type=conference" },
  },
  {
    id: "s-private", order: 6, published: true,
    slug: "private-celebrations",
    title: "Private Celebrations",
    description:
      "Birthdays, anniversaries, engagements — private celebrations deserve a setting that feels special without being overwhelming.",
    image: "/images/private-celebrations.jpg",
    imageAlt: "Private celebration setup at Symphony Convention Centre",
    cta: { label: "Enquire about celebrations", href: "/contact?type=birthday" },
  },
];

/** Returns published services sorted by order. */
export async function getServices(): Promise<Service[]> {
  return services.filter((s) => s.published).sort((a, b) => a.order - b.order);
}
