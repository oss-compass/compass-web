import type {
  IssueOverviewApiResponse,
  IssueReportApiResponse,
  IssueReportFilters,
} from './types';

const REPORT_API_PATH =
  '/api/intelligent-analysis/experience/issue-contribution/reports';
const OVERVIEW_API_PATH =
  '/api/intelligent-analysis/experience/issue-contribution/overview';

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

export const fetchIssueOverview = async (
  org?: string,
  signal?: AbortSignal
): Promise<IssueOverviewApiResponse> => {
  const query = org ? `?org=${encodeURIComponent(org)}` : '';
  const response = await fetch(`${OVERVIEW_API_PATH}${query}`, { signal });

  if (!response.ok) {
    throw new Error(`Issue overview request failed: ${response.status}`);
  }

  return response.json() as Promise<IssueOverviewApiResponse>;
};
