import type {
  SiteStat,
  Specification,
  Facility,
  VenuePolicy,
  PaymentStage,
} from "./types";

/* ── Stats (homepage highlight cards - 1 row of 4) ────────── */

export const venueStats: SiteStat[] = [
  {
    id: "seating-capacity",
    value: "2,000+",
    label: "Seating Capacity",
    description: "Up to 3,000 floating guest capacity in Main Hall",
    icon: "Users",
    placeholder: false,
  },
  {
    id: "weddings-hosted",
    value: "250+",
    label: "Weddings Hosted",
    description: "Milestone ceremonies celebrated with warm hospitality",
    icon: "Sparkles",
    placeholder: false,
  },
  {
    id: "car-parking",
    value: "500",
    label: "Car Parking",
    description: "Spacious dedicated vehicle parking area",
    icon: "Car",
    placeholder: false,
  },
  {
    id: "years-business",
    value: "8+ Years",
    label: "In Business",
    description: "Established 2018 in Chemmanthoor, Punalur",
    icon: "Building",
    placeholder: false,
  },
];

/* ── Specifications (shared on Home + About) ──────────────── */

export const specifications: Specification[] = [
  {
    id: "spec-main-hall",
    value: "2,000",
    label: "Main Hall Seating",
    detail: "2,000 Seated · 3,000 Floating capacity",
    placeholder: false,
  },
  {
    id: "spec-mini-hall",
    value: "150",
    label: "Mini Hall Seating",
    detail: "150 Seated · 200 Floating capacity",
    placeholder: false,
  },
  {
    id: "spec-parking",
    value: "500",
    label: "Car Parking",
    detail: "Convenient vehicle parking on premises",
    placeholder: false,
  },
  {
    id: "spec-rooms",
    value: "3",
    label: "Guest Rooms",
    detail: "3 AC and Non-AC rooms for comfortable stay",
    placeholder: false,
  },
  {
    id: "spec-bridal",
    value: "1",
    label: "Bridal Suite",
    detail: "Private suite for pre-ceremony calm & touch-ups",
    placeholder: false,
  },
  {
    id: "spec-power",
    value: "100%",
    label: "Electricity Back-Up",
    detail: "Full generator power backup guaranteed",
    placeholder: false,
  },
  {
    id: "spec-pricing",
    value: "Time-Based",
    label: "Rental Pricing",
    detail: "Transparent pricing & competitive packages",
    placeholder: false,
  },
  {
    id: "spec-cuisine",
    value: "Both",
    label: "Allowed Cuisine",
    detail: "In-house team & outside catering allowed",
    placeholder: false,
  },
];

/* ── Facilities checklist (About page) ────────────────────── */

export const facilities: Facility[] = [
  { id: "f-main-hall", name: "Symphony Main Hall (2,000 Seating / 3,000 Floating)", available: true },
  { id: "f-mini-hall", name: "Symphony Mini Hall (150 Seating / 200 Floating)", available: true },
  { id: "f-rooms", name: "3 Guest Rooms (AC & Non-AC)", available: true },
  { id: "f-bridal", name: "Private Bridal Suite", available: true },
  { id: "f-parking", name: "500 Car Dedicated Parking", available: true },
  { id: "f-generator", name: "Uninterrupted Electricity Back-Up", available: true },
  { id: "f-dj", name: "Professional DJ Setup & Sound System", available: true },
  { id: "f-lighting", name: "Professional Stage & Event Lighting", available: true },
  { id: "f-spaces", name: "Elegant Indoor & Curated Outdoor Areas", available: true },
  { id: "f-catering", name: "In-House Catering & Outside Food Allowed", available: true },
  { id: "f-decor", name: "Outside Decorators Allowed", available: true },
  { id: "f-alcohol", name: "Outside Alcohol Allowed", available: true },
];

/* ── Policies (homepage / info section) ───────────────────── */

export const venuePolicies: VenuePolicy[] = [
  {
    id: "p-decor",
    rule: "Outside decorators allowed",
    status: "allowed",
    icon: "Sparkles",
    placeholder: false,
  },
  {
    id: "p-dj",
    rule: "Outside DJ allowed",
    status: "allowed",
    icon: "Music",
    placeholder: false,
  },
  {
    id: "p-food",
    rule: "Outside food & catering allowed",
    status: "allowed",
    icon: "ChefHat",
    placeholder: false,
  },
  {
    id: "p-alcohol",
    rule: "Outside alcohol allowed",
    status: "allowed",
    icon: "Wine",
    placeholder: false,
  },
  {
    id: "p-valet",
    rule: "Valet parking service",
    status: "not-allowed",
    icon: "Car",
    placeholder: false,
  },
  {
    id: "p-cancellation",
    rule: "Cancellation policy (Non-refundable)",
    status: "not-allowed",
    icon: "Flame",
    placeholder: false,
  },
];

/* ── Payment terms ────────────────────────────────────────── */

export const paymentStages: PaymentStage[] = [
  {
    id: "pay-1",
    percentage: "10%",
    label: "On booking",
    description: "Secures your date and confirms the booking",
    placeholder: false,
  },
  {
    id: "pay-2",
    percentage: "90%",
    label: "On event date",
    description: "Settled on the scheduled date of your event",
    placeholder: false,
  },
  {
    id: "pay-3",
    percentage: "Policy",
    label: "Cancellation policy",
    description: "Advance payments are strictly non-refundable",
    placeholder: false,
  },
];
