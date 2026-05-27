const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;
const DATE_TIME_RE = /^(\d{4}-\d{2}-\d{2})(?:[ T](\d{2}:\d{2}))?/;

const pad2 = (value: number): string => String(value).padStart(2, '0');

export const formatLocalDateTime = (
  value?: string | null,
  options?: { emptyText?: string }
): string => {
  const emptyText = options?.emptyText ?? '';
  const normalized = String(value || '').trim();
  if (!normalized) return emptyText;
  if (DATE_ONLY_RE.test(normalized)) return normalized;

  const hasTimePart = /[ T]\d{2}:\d{2}/.test(normalized);
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    const matched = normalized.match(DATE_TIME_RE);
    if (!matched) return normalized;
    return matched[2] ? `${matched[1]} ${matched[2]}` : matched[1];
  }

  const datePart = `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
    date.getDate()
  )}`;
  if (!hasTimePart) return datePart;

  return `${datePart} ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
};
