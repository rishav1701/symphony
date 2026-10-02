/**
 * Date utility functions for the admin calendar system.
 * Handles range expansion, month matrix generation,
 * and ISO date formatting.
 */

/* ── Constants ──────────────────────────────────────────── */

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ── ISO Date Helpers ────────────────────────────────────── */

/** Format a date as YYYY-MM-DD. */
export function toISO(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Parse an ISO date string to { year, month (0-indexed), day }. */
export function parseISO(dateStr: string): { year: number; month: number; day: number } {
  const [y, m, d] = dateStr.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

/** Format ISO date for display: "03 Oct 2026" */
export function formatDisplay(dateStr: string): string {
  const { year, month, day } = parseISO(dateStr);
  return `${String(day).padStart(2, "0")} ${MONTH_NAMES[month].slice(0, 3)} ${year}`;
}

/** Format ISO date for long display: "Saturday, 3 October 2026" */
export function formatDisplayLong(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const { year, month, day } = parseISO(dateStr);
  return `${dayNames[d.getDay()]}, ${day} ${MONTH_NAMES[month]} ${year}`;
}

/* ── Date Range Expansion ────────────────────────────────── */

/**
 * Expand a date range (inclusive) into an array of ISO date strings.
 * If `to` is before `from`, they are swapped.
 */
export function expandRange(from: string, to: string): string[] {
  const dates: string[] = [];
  const start = new Date(from + "T00:00:00");
  const end = new Date(to + "T00:00:00");

  // Swap if needed
  const lo = start <= end ? start : end;
  const hi = start <= end ? end : start;

  const cursor = new Date(lo);
  while (cursor <= hi) {
    dates.push(
      toISO(cursor.getFullYear(), cursor.getMonth(), cursor.getDate())
    );
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

/* ── Calendar Matrix ─────────────────────────────────────── */

export type CalendarCell = {
  /** Day of month (1-31), or null for padding cells */
  day: number | null;
  /** ISO date string, or null for padding */
  date: string | null;
};

/**
 * Generate a 2D calendar matrix for a given month.
 * Each row has 7 cells (Sunday–Saturday).
 * Padding cells have `day: null, date: null`.
 */
export function buildMonthMatrix(year: number, month: number): CalendarCell[][] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0=Sun

  const matrix: CalendarCell[][] = [];
  let row: CalendarCell[] = [];

  // Leading padding
  for (let i = 0; i < firstDayOfWeek; i++) {
    row.push({ day: null, date: null });
  }

  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    row.push({ day: d, date: toISO(year, month, d) });
    if (row.length === 7) {
      matrix.push(row);
      row = [];
    }
  }

  // Trailing padding
  if (row.length > 0) {
    while (row.length < 7) {
      row.push({ day: null, date: null });
    }
    matrix.push(row);
  }

  return matrix;
}

/* ── Miscellaneous ───────────────────────────────────────── */

/** Get today's ISO date string. */
export function todayISO(): string {
  const now = new Date();
  return toISO(now.getFullYear(), now.getMonth(), now.getDate());
}

/** Check if a date string is in the past. */
export function isPast(dateStr: string): boolean {
  return dateStr < todayISO();
}

/** Check if a date string is today. */
export function isDateToday(dateStr: string): boolean {
  return dateStr === todayISO();
}

/** Deduplicate and sort an array of ISO date strings. */
export function dedupeSort(dates: string[]): string[] {
  return [...new Set(dates)].sort();
}
