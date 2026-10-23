export const ALL_PAIN_FILTER = '__ALL__';

// Local filters may narrow an entry scope, never widen it.
export const resolvePainFilter = (
  selected: string,
  entry: string | undefined,
  entries: string[] | undefined,
  available: string[]
) => {
  const allowed = entry ? [entry] : entries?.length ? entries : available;
  const value =
    entry || (allowed.includes(selected) ? selected : ALL_PAIN_FILTER);
  return {
    allowed,
    value,
    state: value === ALL_PAIN_FILTER ? undefined : value,
    states: value === ALL_PAIN_FILTER && entries?.length ? entries : undefined,
    fixed: !!entry,
  };
};
