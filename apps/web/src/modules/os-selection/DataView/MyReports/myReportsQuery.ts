import { FilterOptionInput, SortOptionInput } from '@oss-compass/graphql';

export type MyReportsTableQuery = {
  page?: number;
  per?: number;
  filterOpts?: FilterOptionInput[];
  sortOpts?: SortOptionInput | null;
  [key: string]: unknown;
};

/**
 * Build the "My Reports" page query from the table state.
 *
 * The page always scopes results to the current user, so the user condition
 * is forced first. Column filters coming from the table state are kept and
 * forwarded after it; a user filter picked through the applicant column is
 * dropped because the forced current-user condition already takes
 * precedence (the backend chains filter_opts with AND semantics).
 */
export const buildMyReportsQuery = <T extends MyReportsTableQuery>(
  query: T,
  userName?: string
): T & { reportTypeList: number[]; filterOpts: FilterOptionInput[] } => {
  return {
    ...query,
    reportTypeList: [0],
    filterOpts: [
      { type: 'user', values: [userName] },
      ...(query.filterOpts || []).filter((opt) => opt.type !== 'user'),
    ],
  };
};
