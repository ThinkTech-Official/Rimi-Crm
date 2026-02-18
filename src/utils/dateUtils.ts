/**
 * Converts a Date object to a string in YYYY-MM-DD format based on local time.
 * This prevents the one-day shift caused by UTC conversion.
 */
export const toLocalIsoDate = (date: Date | null | undefined): string => {
  if (!date || isNaN(date.getTime())) return "";
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  
  return `${year}-${month}-${day}`;
};
