import type { EnquiryPayload, EnquiryProvider } from "@/data/types";
import { contactInfo } from "@/data/contact";

/**
 * Builds a mailto: link with pre-filled subject and body.
 */
export function buildMailto(payload: EnquiryPayload): string {
  const subject = encodeURIComponent(
    `Event Enquiry — ${payload.eventType || "General"} — Symphony Auditorium`
  );

  const bodyLines = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    payload.eventDate ? `Event Date: ${payload.eventDate}` : null,
    payload.eventType ? `Event Type: ${payload.eventType}` : null,
    payload.guestCount ? `Guest Count: ${payload.guestCount}` : null,
    payload.message ? `\nMessage:\n${payload.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const body = encodeURIComponent(bodyLines);
  return `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
}

/**
 * Builds a mailto: link specifically for booking inquiries.
 */
export function buildBookingMailto(details: {
  date: string;
  name: string;
  phone: string;
  email: string;
  eventType?: string;
  guestCount?: string;
}): string {
  return buildMailto({
    name: details.name,
    phone: details.phone,
    email: details.email,
    eventDate: details.date,
    eventType: details.eventType,
    guestCount: details.guestCount ? Number(details.guestCount) : undefined,
  });
}

/* ── Provider Adapters (uncomment to enable) ──────────────── */

// --- Resend ---
// export class ResendProvider implements EnquiryProvider {
//   async send(payload: EnquiryPayload) {
//     const res = await fetch("/api/enquiry", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     const data = await res.json();
//     return { ok: res.ok, message: data.message };
//   }
// }

// --- EmailJS ---
// export class EmailJSProvider implements EnquiryProvider {
//   async send(payload: EnquiryPayload) {
//     // Requires: EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID
//     const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
//         template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
//         user_id: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
//         template_params: payload,
//       }),
//     });
//     return { ok: res.ok };
//   }
// }

// --- Formspree ---
// export class FormspreeProvider implements EnquiryProvider {
//   async send(payload: EnquiryPayload) {
//     const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
//     const res = await fetch(`https://formspree.io/f/${formId}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     return { ok: res.ok };
//   }
// }

/** Suppress unused import warning */
export type { EnquiryProvider };
