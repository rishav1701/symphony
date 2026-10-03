import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Symphony Convention Centre",
  tagline: "Banquet Halls · Wedding Venue · Convention Hall",
  description:
    "Symphony Convention Centre at Pineapple Junction, Punalur, features the Main Opera Hall with seating for 2,100+ and floating capacity up to 4,000, the Mini Opera Hall with seating for 250+, a separate dining facility, and approximately 500 parking capacity.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://symphonyconventioncentre.com",
  ogImage: "/images/og-image.jpg",
  locale: "en_IN",
};

