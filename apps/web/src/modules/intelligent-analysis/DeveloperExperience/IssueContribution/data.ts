import type { IssueReportApiResponse, IssueReportFilters } from './types';

const REPORT_API_PATH =
  '/dev/api/intelligent-analysis/experience/issue-contribution/reports';

export const fetchIssueReportData = async (
  filters: IssueReportFilters,
  signal?: AbortSignal
): Promise<IssueReportApiResponse> => {
  const search = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });

  const query = search.toString();
  const response = await fetch(
    query ? `${REPORT_API_PATH}?${query}` : REPORT_API_PATH,
    { signal }
  );

  if (!response.ok) {
    throw new Error(`Issue report request failed: ${response.status}`);
  }

  return response.json() as Promise<IssueReportApiResponse>;
};
