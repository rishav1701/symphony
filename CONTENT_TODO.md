# Symphony Auditorium — Content To-Do & Client Confirmation Checklist

This document tracks every placeholder data field, asset, and integration requiring client confirmation before official production launch.

All placeholders in code are flagged with `placeholder: true` or clear dev comments. In development mode, setting `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true` in `.env.local` renders subtle visual badges next to unconfirmed items.

---

## 1. Contact & Location Information

| Field | Current Placeholder Value | File Location | Action Required |
|---|---|---|---|
| **Phone Number** | `+91 00000 00000` | `src/data/contact.ts` | Provide official inquiry / booking telephone number. |
| **Email Address** | `hello@symphonyauditorium.example` | `src/data/contact.ts` | Provide official booking / office email address. |
| **Physical Address** | `Address to be confirmed, Kerala, India` | `src/data/contact.ts` | Provide full postal address (building, road, town, PIN code). |
| **WhatsApp Number** | `910000000000` | `.env.local` / `src/data/contact.ts` | Provide active WhatsApp Business number (digits only with country code). |
| **Google Maps Embed** | Default Kerala coordinates | `src/data/contact.ts` | Provide Google Maps iframe embed URL from Google Maps share dialog. |
| **Google Maps Link** | Generic Kerala URL | `src/data/contact.ts` | Provide Google Maps direct share link for navigation. |
| **Visiting Hours** | `Open daily · 9 AM – 9 PM` | `src/data/contact.ts` | Confirm venue visiting and office operating hours. |
| **Social Media Links** | Example homepages | `src/data/contact.ts` | Provide handles / URLs for Instagram, Facebook, and YouTube. |

---

## 2. Venue Specifications & Capacities

| Metric | Current Value | File Location | Status |
|---|---|---|---|
| **Guest / Seating Capacity** | `1,500+` | `src/data/venue.ts` | Confirm maximum auditorium seating capacity. |
| **Dining Hall Capacity** | `500+` | `src/data/venue.ts` | Confirm seated dining hall guest capacity. |
| **Car Parking Spaces** | `50+` | `src/data/venue.ts` | Confirm on-site car parking bays. |
| **Two-Wheeler Parking** | `50+` | `src/data/venue.ts` | Confirm bike parking bays. |
| **Private / Bridal Rooms** | `2` | `src/data/venue.ts` | Confirm number and amenities of green/bridal suites. |
| **Stage Dimensions / Setup** | Proscenium stage | `src/data/venue.ts` | Confirm stage width, depth, height, and lighting rig details. |
| **Power Backup** | Generator backup | `src/data/venue.ts` | Confirm generator capacity (kVA) and automatic switchover. |
| **Air Conditioning** | Central AC | `src/data/venue.ts` | Confirm tonnage and coverage (main hall, dining, green rooms). |

---

## 3. Venue Policies & Terms

| Policy Item | Current Status | File Location | Client Confirmation Needed |
|---|---|---|---|
| **Music & DJ** | `Allowed` | `src/data/venue.ts` | Confirm decibel / curfew restrictions (e.g. 10:00 PM). |
| **External Decoration** | `Allowed` | `src/data/venue.ts` | Confirm approved decorator list or open policy. |
| **Outside Catering** | `On request` | `src/data/venue.ts` | Confirm whether outside caterers are permitted or royalty applies. |
| **Alcohol Service** | `Not allowed` | `src/data/venue.ts` | Confirm licensing rules or strict non-alcoholic policy. |
| **Firecrackers / Pyro** | `Not allowed` | `src/data/venue.ts` | Confirm restrictions on stage fireworks and smoke machines. |
| **Booking Deposit** | 25% Advance | `src/data/venue.ts` | Confirm advance booking percentage. |
| **Intermediate Payment** | 50% (30 days prior) | `src/data/venue.ts` | Confirm payment schedule terms. |
| **Final Settlement** | 25% (On event day) | `src/data/venue.ts` | Confirm settlement timeline and security deposit amount. |

---

## 4. Catering & Menu Offerings

| Section | Current State | File Location | Action Required |
|---|---|---|---|
| **Menu Items** | `[]` (Shows "Menu shared on request") | `src/data/catering.ts` | Provide sample Sadya, buffet, or set menu items if desired. |
| **Catering Pricing** | None displayed | `src/data/catering.ts` | Confirm if per-plate ranges or package pricing should be added. |
| **Approved Caterers** | In-house / partner | `src/data/catering.ts` | List preferred catering partners or kitchen facility specs. |

---

## 5. Visual Assets & Photography

All image slots currently use dynamic architectural SVG/gradient fallbacks (`PlaceholderImage`) when `.jpg` files are absent from `public/images/`.

| File Path | Description | Recommended Dimensions |
|---|---|---|
| `public/images/hero-auditorium.jpg` | Main hero auditorium hall view | 1920 × 1080 (Landscape) |
| `public/images/story-preview.jpg` | Home page story arch image | 800 × 1000 (Portrait) |
| `public/images/about-auditorium.jpg` | About page sticky arch image | 800 × 1000 (Portrait) |
| `public/images/catering-hero.jpg` | Catering hero arch image | 1000 × 1200 (Portrait) |
| `public/images/gallery-01.jpg` – `12.jpg` | Gallery photos across all 4 categories | 800 × 1000 (4:5 Aspect Ratio) |
| `public/images/services-*.jpg` | 6 service category images | 800 × 600 (4:3 Aspect Ratio) |
| `public/images/catering-*.jpg` | 7 dining / food category images | 800 × 500 (16:10 Aspect Ratio) |
| `public/images/og-image.jpg` | Social share Open Graph preview | 1200 × 630 (Landscape) |

---

## 6. Email / Enquiry Integration

| Service | Environment Variable | Status |
|---|---|---|
| **Resend** (Recommended) | `RESEND_API_KEY` | Uncomment in `.env.local` and add API key to activate `/api/enquiry`. |
| **EmailJS** | `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_USER_ID` | Alternative client-side email delivery. |
| **Formspree** | `FORMSPREE_FORM_ID` | Alternative form endpoint. |
| **Client Fallback** | Default Mailto + WhatsApp | **Active now.** Generates pre-filled email and WhatsApp messages. |
