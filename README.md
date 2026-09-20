# Symphony Auditorium — Production Website

A modern, architectural website for **Symphony Auditorium**, a premium event venue in Kerala, India designed for weddings, receptions, cultural programs, and corporate conferences.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **TypeScript**, and **Lucide React**.

---

## 1. Quick Start & Setup

### Prerequisites
- Node.js 18.17+ or 20+ installed
- npm or yarn

### Installation
```bash
# Clone or navigate to the project directory
cd symphony

# Install dependencies
npm install

# Setup environment variables
copy .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Environment Variables

The project includes `.env.example` with documented keys:

```bash
# Site URL for metadata and canonicals
NEXT_PUBLIC_SITE_URL=https://symphonyauditorium.example

# WhatsApp Business number (digits only, with country code, e.g. 919847012345)
NEXT_PUBLIC_WHATSAPP_NUMBER=910000000000

# Dev-only: show badges on fields awaiting client confirmation
NEXT_PUBLIC_SHOW_PLACEHOLDERS=true

# Allow search engine indexing (keep false until official launch)
NEXT_PUBLIC_ALLOW_INDEXING=false

# Optional server-side email provider (e.g. Resend)
# RESEND_API_KEY=re_xxxxxxx
# RESEND_FROM_EMAIL=noreply@symphonyauditorium.example
# RESEND_TO_EMAIL=hello@symphonyauditorium.example
```

---

## 3. Architecture & Page Ecosystem

The website implements all 7 core pages with unified navigation:

| Page | Route | Description |
|---|---|---|
| **Home** | `/` | Hero with stage-light glow, venue highlights, stats, policies, booking terms, story teaser, services preview, closing CTA |
| **Book Now** | `/book-now` | Interactive availability calendar, date selector, multi-action booking sidebar (WhatsApp & Email) |
| **Gallery** | `/gallery` | Tab-filtered gallery grid (Venue, Entrance, Weddings, Banquet Hall), URL sync (`?category=`), accessible lightbox |
| **Services** | `/services` | 6 alternating image/text sections (Weddings, Receptions, Cultural, Corporate, Seminars, Private Celebrations), "How It Works" journey |
| **Catering** | `/catering` | Photography-led hero, 7 dining experience cards, truthful empty-state menu blocks, catering quote request |
| **About** | `/about` | Editorial story, pull-quote, sticky arch-framed image, full venue specifications, facilities checklist |
| **Contact** | `/contact` | Full enquiry form with Zod validation, Indian phone formatting, honeypot protection, Google Maps embed & venue details |

---

## 4. Design System & Creative Direction

The visual language reflects **"The Modern Concert Hall"**:

- **Color Palette**:
  - Deep Symphony Navy: `#0A1128`
  - Royal Navy: `#1C2541`
  - Champagne Gold: `#C8A96E` / `#DFC288`
  - Soft Ivory: `#F9F9F6`
  - Charcoal Ink: `#1C1E21`
  - Muted Slate: `#5C6470`
- **Typography**:
  - Headings: `Cormorant Garamond` (Google Font)
  - Body & UI: `Manrope` (Google Font)
- **Signature Motifs**:
  - **Score Lines**: 3–5 ultra-thin gold lines resembling musical staves (`<ScoreLines />`).
  - **Arch Frames**: Top-curved proscenium image frames (`<ArchImage />`).
  - **Vertical Fluting**: Low-opacity repeating fluting texture on navy sections.
  - **Stage-Light Glow**: Radial champagne gradients highlighting key headlines.

---

## 5. How to Replace Placeholders & Images

### Replacing Placeholders
Refer to [CONTENT_TODO.md](./CONTENT_TODO.md) for a comprehensive list of all placeholder items.
- Contact details, hours, and map coordinates: Edit `src/data/contact.ts`.
- Capacity numbers, policies, and facilities: Edit `src/data/venue.ts`.
- Catering menus: Add items to the `items: []` arrays in `src/data/catering.ts`.

### Adding Real Venue Photos
Place images in the `/public/images/` directory with the following filenames:
- `hero-auditorium.jpg`
- `story-preview.jpg`
- `about-auditorium.jpg`
- `catering-hero.jpg`
- `gallery-01.jpg` through `gallery-12.jpg`
- `services-weddings.jpg`, `services-receptions.jpg`, etc.
- `catering-menu.jpg`, `catering-dining.jpg`, etc.

> **Note on Placeholders**: If any image file is absent, the custom `<PlaceholderImage />` component automatically generates an elegant navy-gold architectural gradient tile with the slot title.

---

## 6. Data Layer & Future Headless CMS / Admin Panel

All content is decoupled from components and stored in typed modules under `src/data/`:
- `src/data/venue.ts` — Specifications, capacities, policies, facilities, payment stages.
- `src/data/gallery.ts` — Gallery items, categories, order indices, and `published` flags.
- `src/data/services.ts` — Event service offerings with deep-linking CTAs.
- `src/data/catering.ts` — Banqueting sections and menu items.
- `src/data/booking.ts` — Indicative calendar availability states (`available`, `booked`, `confirm`, `blocked`).
- `src/data/contact.ts` — Contact info, Google Maps iframe, social profiles.

Every data collection is accessed through helper functions (`getGalleryItems()`, `getServices()`, `getCateringSections()`). These can easily be swapped with queries to a headless CMS (such as Sanity, Strapi, or Supabase) with zero changes to frontend presentation components.

---

## 7. Build Verification & Scripts

```bash
# Type check with TypeScript compiler
npx tsc --noEmit

# Run Next.js production build
npm run build

# Start production server
npm run start
```
