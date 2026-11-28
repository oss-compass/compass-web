export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

function parsePositiveInteger(value: unknown, fallback: number): number {
  if (Array.isArray(value)) return fallback;

  const numericValue =
    typeof value === 'number'
      ? value
      : typeof value === 'string' && value.trim()
      ? Number(value)
      : NaN;

  // Query arrays and unsafe values must not reach slice(), where they can
  // produce empty pages or overflow the calculated offset.
  if (!Number.isSafeInteger(numericValue) || numericValue <= 0) {
    return fallback;
  }

  return numericValue;
}

export function parsePagination(query: { page?: unknown; pageSize?: unknown }) {
  const page = parsePositiveInteger(query.page, DEFAULT_PAGE);
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    parsePositiveInteger(query.pageSize, DEFAULT_PAGE_SIZE)
  );

  return { page, pageSize };
}
