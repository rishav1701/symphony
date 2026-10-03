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
    value: "2,100+",
    label: "Seating Capacity",
    description: "Main Opera Hall · up to 4,000 floating guests",
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
    value: "≈500",
    label: "Parking Capacity",
    description: "Approximate parking capacity",
    icon: "Car",
    placeholder: false,
  },
  {
    id: "years-business",
    value: "7 Years",
    label: "In Business",
    description: "Established 2019 in Pineapple Junction, Punalur",
    icon: "Building",
    placeholder: false,
  },
];

/* ── Specifications (shared on Home + About) ──────────────── */

export const specifications: Specification[] = [
  {
    id: "spec-main-hall",
    value: "2,100+",
    label: "Main Opera Hall Seating",
    detail: "2,100+ seated · up to 4,000 floating",
    placeholder: false,
  },
  {
    id: "spec-mini-hall",
    value: "250+",
    label: "Mini Opera Hall Seating",
    detail: "250+ seating capacity",
    placeholder: false,
  },
  {
    id: "spec-parking",
    value: "≈500",
    label: "Parking Capacity",
    detail: "Approximate parking capacity",
    placeholder: false,
  },
  {
    id: "spec-rooms",
    value: "Available",
    label: "Executive Rooms",
    detail: "For ladies and gents",
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
    value: "Rent",
    label: "Time-Based",
    detail: "Transparent pricing",
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
  { id: "f-main-hall", name: "Main Opera Hall (2,100+ Seating / Up to 4,000 Floating)", available: true },
  { id: "f-mini-hall", name: "Mini Opera Hall (250+ Seating)", available: true },
  { id: "f-dining", name: "Separate Dining Facility", available: true },
  { id: "f-large-stages", name: "Very Large Stages", available: true },
  { id: "f-rooms", name: "Executive Rooms for Ladies and Gents", available: true },
  { id: "f-bridal", name: "Private Bridal Suite", available: true },
  { id: "f-parking", name: "Approximately 500 Parking Capacity", available: true },
  { id: "f-washrooms", name: "Well-Maintained Gents’ and Ladies’ Washrooms", available: true },
  { id: "f-air-conditioning", name: "Fully Centralized Air-Conditioning Across All Floors", available: true },
  { id: "f-elevators", name: "Elevators", available: true },
  { id: "f-vehicle-access", name: "Vehicle Entry and Access to All Floor Levels", available: true },
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
