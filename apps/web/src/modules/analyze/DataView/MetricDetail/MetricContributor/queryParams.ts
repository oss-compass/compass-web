import type { FilterOptionInput, SortOptionInput } from '@oss-compass/graphql';
import { safeJsonParse } from '@common/utils/json';

type QueryParam = string | string[] | undefined | null;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const isMileage = (value: unknown): value is string[] =>
  isStringArray(value) &&
  value.every(
    (item) => item === 'core' || item === 'regular' || item === 'guest'
  );

const isFilterOpts = (value: unknown): value is FilterOptionInput[] =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      isRecord(item) &&
      typeof item.type === 'string' &&
      isStringArray(item.values)
  );

const isSortOpts = (value: unknown): value is SortOptionInput =>
  isRecord(value) &&
  // These are the sort types written by ContributorTable, including filtered contributions.
  (value.type === 'contribution' || value.type === 'contribution_filterd') &&
  (value.direction === 'asc' || value.direction === 'desc');

export const parseMileage = (value: QueryParam): string[] =>
  safeJsonParse(value, ['core', 'regular'], isMileage);

export const parseFilterOpts = (value: QueryParam): FilterOptionInput[] =>
  safeJsonParse(value, [], isFilterOpts);

export const parseSortOpts = (value: QueryParam): SortOptionInput | null =>
  safeJsonParse<SortOptionInput | null>(value, null, isSortOpts);
