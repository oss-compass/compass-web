import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getIssueReport,
  getIssueReportCatalog,
} from '@modules/intelligent-analysis/DeveloperExperience/IssueContribution/serverData';
import type {
  IssueReportApiResponse,
  IssueReportFilters,
} from '@modules/intelligent-analysis/DeveloperExperience/IssueContribution/types';

const getSingleQueryValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const issueContributionReports = (
  request: NextApiRequest,
  response: NextApiResponse<IssueReportApiResponse | { error: string }>
) => {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const filters: IssueReportFilters = {
    org: getSingleQueryValue(request.query.org),
    platform: getSingleQueryValue(request.query.platform),
    community: getSingleQueryValue(request.query.community),
    period: getSingleQueryValue(request.query.period),
    version: getSingleQueryValue(request.query.version),
  };
  const catalog = getIssueReportCatalog({ org: filters.org });
  const report = getIssueReport(filters) ?? null;

  response.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=600'
  );
  response.status(200).json({ catalog, report });
};

export default issueContributionReports;
