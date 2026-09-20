import type { BookingDay } from "./types";

/**
 * Sample availability data.
 * In production this would come from a database or API.
 * The current month (September 2026) is seeded for demonstration.
 * Dates without a record default to "confirm" (not "available")
 * so the site never over-promises availability.
 */
const bookingData: BookingDay[] = [
  // September 2026 sample data
  { date: "2026-09-05", status: "booked", note: "Private event" },
  { date: "2026-09-06", status: "booked" },
  { date: "2026-09-10", status: "available" },
  { date: "2026-09-11", status: "available" },
  { date: "2026-09-12", status: "booked" },
  { date: "2026-09-13", status: "booked" },
  { date: "2026-09-17", status: "available" },
  { date: "2026-09-18", status: "available" },
  { date: "2026-09-19", status: "blocked" },
  { date: "2026-09-20", status: "available" },
  { date: "2026-09-24", status: "available" },
  { date: "2026-09-25", status: "confirm" },
  { date: "2026-09-26", status: "available" },
  { date: "2026-09-27", status: "booked" },
  // October 2026
  { date: "2026-10-03", status: "available" },
  { date: "2026-10-04", status: "available" },
  { date: "2026-10-10", status: "booked" },
  { date: "2026-10-11", status: "available" },
  { date: "2026-10-17", status: "available" },
  { date: "2026-10-18", status: "confirm" },
  { date: "2026-10-24", status: "available" },
  { date: "2026-10-25", status: "available" },
  { date: "2026-10-31", status: "booked" },
];

/**
 * Returns availability records for a given month.
 * @param year  Full year, e.g. 2026
 * @param month 0-indexed month (0 = January)
 */
export async function getBookingAvailability(
  year: number,
  month: number
): Promise<BookingDay[]> {
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  return bookingData.filter((d) => d.date.startsWith(prefix));
}
