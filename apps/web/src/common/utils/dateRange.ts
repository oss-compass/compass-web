const YMD_RE = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;

const parseYmdDate = (text: string): Date | null => {
  const match = text.match(YMD_RE);
  if (!match) {
    return null;
  }
  const year = Number(match[1]);
  const month = Number(match[3]);
  const day = Number(match[4]);
  // Same semantics as `new Date('YYYY-MM-DD')`: the date is read as UTC midnight.
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date;
};

/**
 * Parse the `?range=YYYY-MM-DD ~ YYYY-MM-DD` value used by the analysis pages.
 *
 * The shape regex alone used to be the only validation, so a calendar-invalid value such as
 * `2026-13-45` produced `new Date('2026-13-45')` = Invalid Date (and `2026-02-30` silently
 * rolled over to 2026-03-02). Consumers turn these dates into request parameters with
 * `.toISOString()`, which throws `RangeError: Invalid time value` for an Invalid Date and
 * breaks the page (e.g. `modules/developer/hooks/useLabelStatus.ts`).
 */
export const isDateRange = (range: string) => {
  if (!range?.includes(' ~ ')) {
    return false;
  }
  const [start, end] = range.split(' ~ ');
  const startDate = parseYmdDate(start);
  const endDate = parseYmdDate(end);
  if (!startDate || !endDate) {
    return false;
  }
  return { start: startDate, end: endDate };
};
