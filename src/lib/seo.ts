import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { contactInfo } from "@/data/contact";

/**
 * Build page-level metadata for Next.js App Router.
 */
export function buildMetadata(page: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = `${siteConfig.url}${page.path}`;
  return {
    title: `${page.title} | ${siteConfig.name}`,
    description: page.description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: page.ogImage || siteConfig.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
      images: [page.ogImage || siteConfig.ogImage],
    },
  };
}

/**
 * Build JSON-LD structured data for the venue.
 * Omits any property that is still a placeholder.
 */
export function buildJsonLd(): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  };

  // Only include contact info if not placeholder
  if (!contactInfo.placeholder) {
    jsonLd.telephone = contactInfo.phone;
    jsonLd.email = contactInfo.email;
    jsonLd.address = {
      "@type": "PostalAddress",
      addressLocality: "Punalur, Kollam",
      addressRegion: "Kerala",
      addressCountry: "IN",
      streetAddress: contactInfo.address,
    };
  }

  return jsonLd;
}
