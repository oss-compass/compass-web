export function safeJsonParse<T>(
  value: string | string[] | undefined | null,
  fallback: T,
  validator?: (parsed: unknown) => parsed is T
): T;
export function safeJsonParse(
  value: string | string[] | undefined | null,
  fallback: unknown,
  validator?: (parsed: unknown) => boolean
): unknown {
  if (typeof value !== 'string' || !value) {
    return fallback;
  }
  try {
    const parsed: unknown = JSON.parse(value);
    return !validator || validator(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}
