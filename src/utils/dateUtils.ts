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
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
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
