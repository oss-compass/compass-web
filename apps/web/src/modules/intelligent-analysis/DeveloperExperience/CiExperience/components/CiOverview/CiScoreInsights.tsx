import React from 'react';
import OverviewScoreInsights, {
  type OverviewScoreCardRepo,
} from '../../../../UserJourney/OverviewDashboard/OverviewScoreInsights';
import { OVERVIEW_SCORE_BANDS } from '../../../../UserJourney/OverviewDashboard/scoreVisuals';
import type { CiRepoSummary } from './communityMetrics';
import type { CiReportHref } from './CiIssueTable';
import { useCiRepoTeams } from './useCiRepoTeams';

const CiScoreInsights: React.FC<{
  repos: CiRepoSummary[];
  reportHref: CiReportHref;
  overallScore: number | null;
}> = ({ repos, reportHref, overallScore }) => {
  const teams = useCiRepoTeams();
  const scoreRepos: OverviewScoreCardRepo[] = repos.flatMap((repo) =>
    repo.scoreOverall == null
      ? []
      : [
          {
            id: repo.repo,
            name: repo.slug,
            team:
              teams.repoInfo[repo.slug]?.teamName ||
              (teams.isLoading
                ? '团队加载中'
                : teams.isError
                ? '团队信息不可用'
                : '未分配团队'),
            reportUrl: reportHref(repo.repo, repo.latestDay),
            latestScore: repo.scoreOverall,
            stageScores: repo.scoreMetrics,
            scoreHistory: repo.scoreHistory,
          },
        ]
  );
  return (
    <OverviewScoreInsights
      repos={scoreRepos}
      overallScore={overallScore}
      scoreBands={OVERVIEW_SCORE_BANDS}
    />
  );
};
export default React.memo(CiScoreInsights);
