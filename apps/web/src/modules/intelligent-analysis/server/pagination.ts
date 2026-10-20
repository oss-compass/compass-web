/**
 * Query-string parsing shared by the intelligent-analysis API routes.
 *
 * `Math.max(1, Number(value))` looks defensive but returns `NaN` for a non-numeric value
 * (`Math.max(1, NaN)` is `NaN`), which then turns `slice(start, end)` into an empty page and
 * serialises `page: null` into the response. These helpers fall back to the defaults instead.
 */
export const parsePage = (value: unknown): number => {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return 1;
  return Math.floor(num);
};

export const parsePageSize = (
  value: unknown,
  fallback = 10,
  max = 100
): number => {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return fallback;
  return Math.min(max, Math.floor(num));
};
