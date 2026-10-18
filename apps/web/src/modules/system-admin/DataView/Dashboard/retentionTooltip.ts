/**
 * Value of the admin dashboard retention tooltip.
 *
 * Retention values are percentages. A point without data arrives as `null` (or an empty
 * string); `Number(null)` / `Number('')` are 0 and `Number(undefined)` is NaN, so the tooltip
 * used to print a missing point as `0.00%` or `undefined%`.
 */
export const formatRetentionTooltipValue = (raw: unknown): string => {
  if (raw === null || raw === undefined || raw === '') {
    return '-';
  }
  const value =
    Array.isArray(raw) && raw.length > 1 ? Number(raw[1]) : Number(raw);
  return Number.isFinite(value) ? `${value.toFixed(2)}%` : '-';
};
