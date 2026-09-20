import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Symphony Auditorium",
  tagline: "Events · Weddings · Celebrations",
  description:
    "Symphony Auditorium is a premium event venue in Kerala, India — purpose-built for weddings, receptions, cultural programs, conferences, and private celebrations.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://symphonyauditorium.example",
  ogImage: "/images/og-image.jpg",
  locale: "en_IN",
};
