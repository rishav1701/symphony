import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Symphony Convention Centre",
  tagline: "Banquet Halls · Wedding Venue · Convention Hall",
  description:
    "Symphony Convention Centre is a premier banquet hall and wedding venue in Chemmanthoor, Punalur, Kollam. Featuring a 2,000-seat Main Hall, 150-seat Mini Hall, 3 AC rooms, and 500-vehicle parking.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://symphonyconventioncentre.com",
  ogImage: "/images/og-image.jpg",
  locale: "en_IN",
};

