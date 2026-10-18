import { format } from 'date-fns';

/**
 * Format a date for the `begin_date` / `end_date` request parameters of the developer
 * contribution API.
 *
 * The values come from the local date picker / `subMonths(new Date(), 6)`, so they have to be
 * formatted as the local calendar date. `toISOString().split('T')[0]` converts to UTC first,
 * which shifts the day for every timezone east of UTC during the first hours of the day
 * (e.g. 2026-10-16 05:00 in UTC+8 became 2026-10-15).
 */
export const formatDateParam = (date: Date | null | undefined): string =>
  date ? format(date, 'yyyy-MM-dd') : '';
