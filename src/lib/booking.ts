/**
 * Calendar and booking helper functions.
 */

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

const DAY_NAMES_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

export { MONTH_NAMES, DAY_NAMES, DAY_NAMES_SHORT };

/** Get the number of days in a given month (0-indexed month). */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Get the day of week (0=Sun) for the first day of a month. */
export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/** Format a date as YYYY-MM-DD. */
export function formatDateISO(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Format a date for display: "Sunday, 20 September 2026". */
export function formatDateDisplay(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const dayName = DAY_NAMES[d.getDay()];
  const day = d.getDate();
  const month = MONTH_NAMES[d.getMonth()];
  const year = d.getFullYear();
  return `${dayName}, ${day} ${month} ${year}`;
}

/** Check if a date is in the past (before today). */
export function isPastDate(year: number, month: number, day: number): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(year, month, day);
  return date < today;
}

/** Check if a date is today. */
export function isToday(year: number, month: number, day: number): boolean {
  const today = new Date();
  return (
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day
  );
}

/** Get the max allowed month (18 months from now). */
export function getMaxMonth(): { year: number; month: number } {
  const now = new Date();
  const future = new Date(now.getFullYear(), now.getMonth() + 18, 1);
  return { year: future.getFullYear(), month: future.getMonth() };
}

/** Check if navigation to a month is allowed. */
export function canNavigateToMonth(
  year: number,
  month: number,
  direction: "prev" | "next"
): boolean {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  if (direction === "prev") {
    return year > currentYear || (year === currentYear && month > currentMonth);
  }

  const max = getMaxMonth();
  return year < max.year || (year === max.year && month < max.month);
}
