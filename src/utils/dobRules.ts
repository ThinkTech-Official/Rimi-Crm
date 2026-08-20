/**
 * Minimum age an applicant may be, in days.
 *
 * Every product states this as "at least 15 days of age ... according to the
 * effective date" — age is measured at the START OF COVER, not today. That
 * matters whenever cover starts in the future: someone born 10 days ago is 40
 * days old by an effective date 30 days out, and is eligible. Measuring from
 * today would wrongly reject them.
 */
export const MIN_APPLICANT_AGE_DAYS = 15;

/** Midnight of the given date, so comparisons ignore the time of day. */
const atMidnight = (d: Date): Date => {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  return out;
};

/**
 * The most recent date of birth worth offering in the picker.
 *
 * Pass the policy's effective date and it becomes "effective date minus 15
 * days" — a DOB later than this can never satisfy the minimum age. With no
 * effective date chosen yet it falls back to today, which is the loosest safe
 * bound: cover cannot start in the past, so anything ruled out here is ruled out
 * under any effective date.
 *
 * This is a convenience bound only. The binding rule is each product's own
 * validator, which also carries that product's maximum age (80 / 86 / 65).
 */
export function latestAllowedDob(effectiveDate?: string | Date | null): Date {
  const basis =
    effectiveDate && !Number.isNaN(new Date(effectiveDate as any).getTime())
      ? new Date(effectiveDate as any)
      : new Date();
  const d = atMidnight(basis);
  d.setDate(d.getDate() - MIN_APPLICANT_AGE_DAYS);
  return d;
}

/**
 * Shared date-of-birth validator: rejects unparseable and future dates.
 *
 * Deliberately does NOT enforce the minimum age. Each product already applies
 * that alongside its own maximum age and its own wording, and duplicating it
 * here would surface a second, less specific message ahead of theirs.
 *
 * Empty is treated as valid so the separate `required` rule owns that case and
 * the user does not see two errors for one empty field.
 */
export function validateDob(
  value: string | Date | null | undefined,
  t: (s: string) => string,
): true | string {
  if (!value) return true;

  const dob = new Date(value as any);
  if (Number.isNaN(dob.getTime())) return t('Enter a valid date of birth');

  if (atMidnight(dob).getTime() > atMidnight(new Date()).getTime()) {
    return t('Date of birth cannot be in the future');
  }
  return true;
}

/**
 * Minimum-age check against the effective date, matching the wording the other
 * products already use. Returns null when acceptable.
 */
export function minAgeError(
  value: string | Date | null | undefined,
  effectiveDate: string | Date | null | undefined,
  t: (s: string) => string,
): string | null {
  if (!value || !effectiveDate) return null;
  const dob = new Date(value as any);
  const eff = new Date(effectiveDate as any);
  if (Number.isNaN(dob.getTime()) || Number.isNaN(eff.getTime())) return null;

  const days = Math.floor(
    (atMidnight(eff).getTime() - atMidnight(dob).getTime()) / 86400000,
  );
  return days < MIN_APPLICANT_AGE_DAYS
    ? t('Age must be at least 15 days according to the effective date.')
    : null;
}
