/* ───────────────────────────────────────────────────────────
 *  Symphony Convention Centre — Shared TypeScript types
 *  All data contracts live here so components and data files
 *  share a single source of truth.
 * ─────────────────────────────────────────────────────────── */

/* ── Base ────────────────────────────────────────────────── */

/** Every publishable record has an id, ordering, and visibility flag. */
export type Publishable = {
  id: string;
  order: number;
  /** Set to false to hide from the front-end without deleting. */
  published: boolean;
};

/** Mark any field whose value is unconfirmed / placeholder. */
export type Placeholderable = {
  /** When true the value is a placeholder awaiting client confirmation. */
  placeholder: boolean;
};

/* ── Site / Brand ────────────────────────────────────────── */

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  locale: string;
};

/* ── Navigation ──────────────────────────────────────────── */

export type NavLink = {
  label: string;
  href: string;
  /** If true, renders as a CTA button instead of a plain link. */
  isCta?: boolean;
};

/* ── Venue ────────────────────────────────────────────────── */

export type SiteStat = Placeholderable & {
  id: string;
  /** The large display value, e.g. "1500+" */
  value: string;
  /** Short label, e.g. "Guest Capacity" */
  label: string;
  /** One-line description */
  description: string;
  /** Lucide icon name */
  icon?: string;
};

export type Specification = Placeholderable & {
  id: string;
  value: string;
  label: string;
  detail: string;
};

export type Facility = {
  id: string;
  name: string;
  available: boolean;
};

export type PolicyStatus = "allowed" | "not-allowed" | "on-request";

export type VenuePolicy = Placeholderable & {
  id: string;
  rule: string;
  status: PolicyStatus;
  /** Lucide icon name */
  icon: string;
};

export type PaymentStage = Placeholderable & {
  id: string;
  percentage: string;
  label: string;
  description: string;
};

/* ── Gallery ──────────────────────────────────────────────── */

export type GalleryCategoryId =
  | "all"
  | "venue-overview"
  | "entrance-exterior"
  | "real-weddings"
  | "banquet-hall";

export type GalleryCategory = {
  id: GalleryCategoryId;
  label: string;
};

export type GalleryItem = Publishable & {
  title: string;
  category: GalleryCategoryId;
  /** Path to the image file in /public/images/ */
  src: string;
  alt: string;
  width: number;
  height: number;
};

/* ── Services ─────────────────────────────────────────────── */

export type Service = Publishable & {
  slug: string;
  title: string;
  description: string;
  /** Path to the image file */
  image: string;
  imageAlt: string;
  cta?: { label: string; href: string };
};

/* ── Catering ─────────────────────────────────────────────── */

export type CateringSection = Publishable & {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Menu items — empty array means "Menu shared on request". */
  items: string[];
};

/* ── Events ───────────────────────────────────────────────── */

export type EventType = {
  id: string;
  label: string;
  /** Query-string value used by ?type= deep links */
  queryValue: string;
};

/* ── Booking ──────────────────────────────────────────────── */

export type BookingStatus = "available" | "booked" | "blocked" | "confirm";

export type BookingDay = {
  /** Format: YYYY-MM-DD */
  date: string;
  status: BookingStatus;
  note?: string;
};

/* ── Contact ──────────────────────────────────────────────── */

export type SocialLink = {
  platform: string;
  url: string;
  /** Lucide icon name */
  icon: string;
};

export type ContactInfo = Placeholderable & {
  phone: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  mapLinkUrl: string;
  hours: string;
  whatsapp: string;
  socialLinks: SocialLink[];
};

/* ── Enquiry ──────────────────────────────────────────────── */

export type EnquiryPayload = {
  name: string;
  email: string;
  phone: string;
  eventDate?: string;
  eventType?: string;
  guestCount?: number;
  message?: string;
};

export interface EnquiryProvider {
  send(payload: EnquiryPayload): Promise<{ ok: boolean; message?: string }>;
}
