import { contactInfo } from "@/data/contact";

const DEFAULT_MESSAGE =
  "Hello Symphony Auditorium, I would like to enquire about booking the venue.";

/**
 * Builds a WhatsApp URL with an optional pre-filled message.
 * @param message - URL-encoded message text
 */
export function buildWhatsAppUrl(message?: string): string {
  const number = contactInfo.whatsapp;
  const text = encodeURIComponent(message || DEFAULT_MESSAGE);
  return `https://wa.me/${number}?text=${text}`;
}

/**
 * Builds a WhatsApp URL with booking details.
 */
export function buildBookingWhatsAppUrl(details: {
  date: string;
  name: string;
  phone: string;
  email: string;
  eventType?: string;
  guestCount?: string;
}): string {
  const lines = [
    `Hello Symphony Auditorium, I would like to enquire about booking the venue on ${details.date}.`,
    "",
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Email: ${details.email}`,
    `Event type: ${details.eventType || "—"}`,
    `Guest count: ${details.guestCount || "—"}`,
  ];
  return buildWhatsAppUrl(lines.join("\n"));
}
