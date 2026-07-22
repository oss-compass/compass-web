import type { NextApiRequest, NextApiResponse } from 'next';
import { getIssueOverview } from '@modules/intelligent-analysis/DeveloperExperience/IssueContribution/serverData';
import type { IssueOverviewApiResponse } from '@modules/intelligent-analysis/DeveloperExperience/IssueContribution/types';

const getSingleQueryValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const issueContributionOverview = (
  request: NextApiRequest,
  response: NextApiResponse<IssueOverviewApiResponse | { error: string }>
) => {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const overview = getIssueOverview({
    org: getSingleQueryValue(request.query.org),
  });

  response.setHeader('Cache-Control', 'no-store');
  response.status(200).json({ overview });
};

export default issueContributionOverview;
