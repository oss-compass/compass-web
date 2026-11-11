import React from 'react';
import type { OverviewScoreInsightRepo } from '../rawData/apiClient';
import OverviewScoreInsights from './OverviewScoreInsights';

/** 社区入门的数据适配；分布、排名及弹窗与其他总览共用。 */
const CommunityScoreInsights: React.FC<{
  repos: OverviewScoreInsightRepo[];
  overallScore: number | null;
  isLoading?: boolean;
}> = ({ repos, ...props }) => (
  <OverviewScoreInsights
    {...props}
    repos={repos.map((repo) => ({
      ...repo,
      reportUrl: `/intelligent-analysis/community-experience?project=${encodeURIComponent(
        repo.latestReportId
      )}`,
    }))}
  />
);
export default React.memo(CommunityScoreInsights);
