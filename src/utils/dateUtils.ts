/**
 * Parses a calendar date into a Date at LOCAL midnight.
 *
 * `new Date("2025-03-01")` is specified to parse as UTC midnight, but every
 * formatter here reads local components. West of UTC those disagree: in
 * Eastern time that value is Feb 28 19:00, so `.getDate()` returns 28 and all
 * arithmetic built on it lands a day early. Timezones ahead of UTC hide this
 * completely, which is why it survives local development.
 *
 * Use this whenever a YYYY-MM-DD string has to become a Date for calculation.
 */
export const parseLocalDate = (
  value: string | Date | null | undefined,
): Date | null => {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;

  // Date-only strings get built explicitly so they land on local midnight.
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (match) {
    const [, y, m, d] = match;
    const parsed = new Date(Number(y), Number(m) - 1, Number(d));
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  const fallback = new Date(value);
  return isNaN(fallback.getTime()) ? null : fallback;
};

/**
 * Adds months, clamping to the last day of the target month instead of
 * overflowing. JS rolls Jan 31 + 1 month into Mar 3; this returns Feb 28.
 */
export const addMonthsClamped = (date: Date, months: number): Date => {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDayOfTarget = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    0,
  ).getDate();
  target.setDate(Math.min(date.getDate(), lastDayOfTarget));
  return target;
};

/**
 * Adds years, clamping Feb 29 to Feb 28 in non-leap years.
 */
export const addYearsClamped = (date: Date, years: number): Date =>
  addMonthsClamped(date, years * 12);

/**
 * Adds whole days.
 */
export const addDays = (date: Date, days: number): Date => {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + days);
  return next;
};

/**
 * Whole days between two calendar dates, ignoring time and DST.
 */
export const daysBetween = (start: Date, end: Date): number => {
  const a = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const b = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round((b - a) / 86400000);
};

/**
 * Converts a Date object to a string in YYYY-MM-DD format based on local time.
 * This prevents the one-day shift caused by UTC conversion.
 */
export const toLocalIsoDate = (date: Date | null | undefined | string): string => {
  if (!date || isNaN(new Date(date).getTime())) return "";
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Formats a date string or object into a standardized display format (MMM DD, YYYY).
 */
export const formatDate = (date: string | Date | null | undefined): string => {
  return formatDateToDDMMYYYY(date);
};

/**
 * Checks if the first date is after the second date.
 */
export const isAfterDate = (date: string | Date, compareDate: string | Date): boolean => {
  const d1 = new Date(date);
  const d2 = new Date(compareDate);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;

  // Strip time for pure date comparison
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  return d1.getTime() > d2.getTime();
};

/**
 * Formats a date string or object into a standardized display format (DD-MM-YYYY)
 * using native JS methods to avoid external dependencies.
 */
export const formatDateToDDMMYYYY = (date: string | Date | null | undefined): string => {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};
