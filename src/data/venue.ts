import type {
  SiteStat,
  Specification,
  Facility,
  VenuePolicy,
  PaymentStage,
} from "./types";

/* ── Stats (homepage highlight cards) ─────────────────────── */
/* Admin: edit value, label, description. placeholder flips to false once confirmed. */

export const venueStats: SiteStat[] = [
  {
    id: "guest-capacity",
    value: "1 500+",
    label: "Guest Capacity",
    description: "Spacious hall for large-scale events",
    icon: "Users",
    placeholder: true,
  },
  {
    id: "dining-capacity",
    value: "500+",
    label: "Dining Capacity",
    description: "Seated dining arrangements available",
    icon: "UtensilsCrossed",
    placeholder: true,
  },
  {
    id: "car-parking",
    value: "50+",
    label: "Car Parking",
    description: "Dedicated parking area for guests",
    icon: "Car",
    placeholder: true,
  },
  {
    id: "bike-parking",
    value: "50+",
    label: "Bike Parking",
    description: "Separate two-wheeler parking",
    icon: "Bike",
    placeholder: true,
  },
  {
    id: "air-conditioning",
    value: "AC",
    label: "Fully Air-Conditioned",
    description: "Climate-controlled throughout",
    icon: "Wind",
    placeholder: true,
  },
  {
    id: "private-rooms",
    value: "2",
    label: "Private Rooms",
    description: "Dedicated spaces for bridal or VIP use",
    icon: "DoorOpen",
    placeholder: true,
  },
  {
    id: "accessibility",
    value: "Ground Floor",
    label: "Easy Accessibility",
    description: "Step-free access on the ground level",
    icon: "Accessibility",
    placeholder: true,
  },
  {
    id: "power-backup",
    value: "Backup",
    label: "Power Generator",
    description: "Uninterrupted power supply guaranteed",
    icon: "Zap",
    placeholder: true,
  },
];

/* ── Specifications (shared on Home + About) ──────────────── */

export const specifications: Specification[] = [
  {
    id: "spec-seating",
    value: "1 500+",
    label: "Seating Capacity",
    detail: "Theatre-style or custom layouts",
    placeholder: true,
  },
  {
    id: "spec-dining",
    value: "500+",
    label: "Dining Capacity",
    detail: "Seated dining with flexible arrangements",
    placeholder: true,
  },
  {
    id: "spec-parking",
    value: "100+",
    label: "Parking Spaces",
    detail: "Cars and two-wheelers combined",
    placeholder: true,
  },
  {
    id: "spec-ac",
    value: "Full",
    label: "Air Conditioning",
    detail: "Central AC across all halls",
    placeholder: true,
  },
  {
    id: "spec-rooms",
    value: "2",
    label: "Private Rooms",
    detail: "Green rooms for hosts and performers",
    placeholder: true,
  },
  {
    id: "spec-access",
    value: "GF",
    label: "Accessibility",
    detail: "Ground-floor, step-free entry",
    placeholder: true,
  },
  {
    id: "spec-stage",
    value: "1",
    label: "Main Stage",
    detail: "Proscenium stage with lighting rig",
    placeholder: true,
  },
  {
    id: "spec-power",
    value: "Gen",
    label: "Power Backup",
    detail: "Automatic generator switchover",
    placeholder: true,
  },
];

/* ── Facilities checklist (About page) ────────────────────── */

export const facilities: Facility[] = [
  { id: "f-ac", name: "Central Air Conditioning", available: true },
  { id: "f-stage", name: "Proscenium Stage", available: true },
  { id: "f-sound", name: "Built-in Sound System", available: true },
  { id: "f-lighting", name: "Professional Lighting", available: true },
  { id: "f-parking", name: "On-site Parking", available: true },
  { id: "f-generator", name: "Backup Generator", available: true },
  { id: "f-rooms", name: "Private Green Rooms", available: true },
  { id: "f-wifi", name: "Wi-Fi", available: true },
  { id: "f-restrooms", name: "Modern Restrooms", available: true },
  { id: "f-wheelchair", name: "Wheelchair Accessible", available: true },
];

/* ── Policies (homepage section) ──────────────────────────── */

export const venuePolicies: VenuePolicy[] = [
  {
    id: "p-music",
    rule: "Music and DJ",
    status: "allowed",
    icon: "Music",
    placeholder: true,
  },
  {
    id: "p-decor",
    rule: "External decoration",
    status: "allowed",
    icon: "Sparkles",
    placeholder: true,
  },
  {
    id: "p-catering",
    rule: "Outside catering",
    status: "on-request",
    icon: "ChefHat",
    placeholder: true,
  },
  {
    id: "p-alcohol",
    rule: "Alcohol service",
    status: "on-request",
    icon: "Wine",
    placeholder: true,
  },
  {
    id: "p-fireworks",
    rule: "Fireworks or pyrotechnics",
    status: "not-allowed",
    icon: "Flame",
    placeholder: true,
  },
  {
    id: "p-pets",
    rule: "Pets on the premises",
    status: "not-allowed",
    icon: "PawPrint",
    placeholder: true,
  },
];

/* ── Payment terms ────────────────────────────────────────── */

export const paymentStages: PaymentStage[] = [
  {
    id: "pay-1",
    percentage: "25%",
    label: "On booking",
    description: "Secures your date and initiates the booking",
    placeholder: true,
  },
  {
    id: "pay-2",
    percentage: "50%",
    label: "Before event date",
    description: "Due before the scheduled event",
    placeholder: true,
  },
  {
    id: "pay-3",
    percentage: "25%",
    label: "After event",
    description: "Settled after the event concludes",
    placeholder: true,
  },
];
