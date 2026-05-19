import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchOverviewCards,
  fetchOverviewCommonIssues,
  fetchOverviewSummary,
} from '../rawData/apiClient';
import CommonIssuesSection from './CommonIssuesSection';
import { SEVERITY_RANK, STATUS_RANK } from './constants';
import DashboardStyles from './DashboardStyles';
import IssueDetailModal from './IssueDetailModal';
import OverviewSummarySection from './OverviewSummarySection';
import RepoProgressSection from './RepoProgressSection';
import type {
  CommonIssueGroup,
  DashboardIssue,
  IssueBucket,
  IssueModalState,
  IssueSourceMode,
  ProgressTab,
  ProgressView,
  RepoProgressRow,
  RepoSortKey,
  TeamProgressRow,
  TeamSortKey,
} from './types';
import {
  buildMetricSummaryFromPainRows,
  compareTeamNames,
  getAverage,
  getRepoSortValue,
  getTeamSortValue,
  mergeMetricSummaries,
  normalizeSeverity,
  toDashboardIssue,
} from './utils';

type OverviewDashboardProps = {
  org?: string;
};

const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ org }) => {
  const [issueModal, setIssueModal] = useState<IssueModalState>({
    open: false,
    title: '',
    issues: [],
  });
  const [progressView, setProgressView] = useState<ProgressView>('team');
  const [currentTab, setCurrentTab] = useState<ProgressTab>('overall');
  const [issueSourceMode, setIssueSourceMode] =
    useState<IssueSourceMode>('overall');
  const [repoFilter, setRepoFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [repoSortKey, setRepoSortKey] = useState<RepoSortKey>('team');
  const [repoSortAsc, setRepoSortAsc] = useState(true);
  const [teamSortKey, setTeamSortKey] = useState<TeamSortKey>('name');
  const [teamSortAsc, setTeamSortAsc] = useState(true);

  const { data: cardsResp, isLoading } = useQuery({
    queryKey: [
      'overview-cards-page',
      org,
      currentTab,
      repoFilter,
      teamFilter,
      issueSourceMode,
    ],
    queryFn: () =>
      fetchOverviewCards({
        viewType: 'repo',
        org,
        tab: currentTab,
        includeCommonIssues: true,
        commonOnly:
          issueSourceMode === 'common'
            ? true
            : issueSourceMode === 'non-common'
            ? false
            : undefined,
        team: teamFilter || undefined,
        repo: repoFilter || undefined,
        page: 1,
        size: 200,
      }),
  });

  const { data: summaryResp } = useQuery({
    queryKey: ['overview-summary', org, issueSourceMode],
    queryFn: () =>
      fetchOverviewSummary({
        org,
        includeCommonIssues: true,
        commonOnly:
          issueSourceMode === 'common'
            ? true
            : issueSourceMode === 'non-common'
            ? false
            : undefined,
      }),
  });

  const { data: commonIssuesResp } = useQuery({
    queryKey: ['overview-common-issues', org],
    queryFn: () =>
      fetchOverviewCommonIssues({
        org,
      }),
  });

  const repoRows = useMemo<RepoProgressRow[]>(() => {
    return (cardsResp?.items ?? [])
      .map((card) => {
        const issues = toDashboardIssue(card);
        const metrics = buildMetricSummaryFromPainRows(issues);
        return {
          id: card.id,
          name: card.name,
          team: card.team || card.sig,
          score: card.latestScore ?? issues[0]?.score ?? null,
          successRate: card.latestSuccessRate ?? issues[0]?.successRate ?? null,
          executionTime: card.latestExecutionTime ?? null,
          latestReportId: card.latestReportId,
          detailReportUrl: card.detailReportUrl,
          overall: metrics,
          key: metrics,
          issues,
        };
      })
      .filter((row) => issueSourceMode === 'overall' || row.issues.length > 0);
  }, [cardsResp, issueSourceMode]);

  const teamRows = useMemo<TeamProgressRow[]>(() => {
    const groups = new Map<string, TeamProgressRow>();

    repoRows.forEach((row) => {
      const teamName = row.team?.trim() || '未分配团队';
      const existing = groups.get(teamName);
      if (existing) {
        existing.repoCount += 1;
        existing.repos.push(row);
        existing.issues.push(...row.issues);
        existing.score =
          getAverage(existing.repos.map((repo) => repo.score)) ??
          existing.score;
        existing.successRate =
          getAverage(existing.repos.map((repo) => repo.successRate)) ??
          existing.successRate;
        existing.executionTime =
          getAverage(existing.repos.map((repo) => repo.executionTime)) ??
          existing.executionTime;
        existing.overall = mergeMetricSummaries(
          existing.repos.map((repo) => repo.overall)
        );
        existing.key = mergeMetricSummaries(
          existing.repos.map((repo) => repo.key)
        );
        return;
      }

      groups.set(teamName, {
        id: teamName,
        name: teamName,
        repoCount: 1,
        score: row.score,
        successRate: row.successRate,
        executionTime: row.executionTime,
        overall: row.overall,
        key: row.key,
        issues: [...row.issues],
        repos: [row],
      });
    });

    return Array.from(groups.values()).sort((left, right) =>
      compareTeamNames(left.name, right.name)
    );
  }, [repoRows]);

  const teamOptions = useMemo(() => {
    const fromApi = (cardsResp?.teamOptions ?? []).filter(Boolean);
    if (fromApi.length) return fromApi;
    return Array.from(new Set(repoRows.map((row) => row.team))).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [cardsResp, repoRows]);

  const repoOptions = useMemo(
    () =>
      cardsResp?.repoOptions?.length
        ? cardsResp.repoOptions
        : Array.from(
            new Map(
              repoRows.map((row) => [row.id, row.name] as const)
            ).entries()
          )
            .map(([value, label]) => ({ value, label }))
            .sort((a, b) => a.label.localeCompare(b.label)),
    [cardsResp, repoRows]
  );

  const cachedRepoOptions = useRef<Array<{ value: string; label: string }>>([]);
  useEffect(() => {
    if (repoOptions.length > 0 && cachedRepoOptions.current.length === 0) {
      cachedRepoOptions.current = repoOptions;
    }
  }, [repoOptions]);
  const displayRepoOptions =
    cachedRepoOptions.current.length > 0
      ? cachedRepoOptions.current
      : repoOptions;

  const sortedRepoRows = useMemo(() => {
    const rows = [...repoRows];
    rows.sort((left, right) => {
      const a = getRepoSortValue(left, repoSortKey, currentTab);
      const b = getRepoSortValue(right, repoSortKey, currentTab);
      if (typeof a === 'string' && typeof b === 'string') {
        const result =
          repoSortKey === 'team'
            ? compareTeamNames(a, b) || left.name.localeCompare(right.name)
            : a.localeCompare(b);
        return repoSortAsc ? result : -result;
      }
      if (a === b) return 0;
      return repoSortAsc ? (a > b ? 1 : -1) : a < b ? 1 : -1;
    });
    return rows;
  }, [currentTab, repoRows, repoSortAsc, repoSortKey]);

  const sortedTeamRows = useMemo(() => {
    const rows = [...teamRows];
    rows.sort((left, right) => {
      const a = getTeamSortValue(left, teamSortKey, currentTab);
      const b = getTeamSortValue(right, teamSortKey, currentTab);
      if (typeof a === 'string' && typeof b === 'string') {
        const result = compareTeamNames(a, b);
        return teamSortAsc ? result : -result;
      }
      if (a === b) return 0;
      return teamSortAsc ? (a > b ? 1 : -1) : a < b ? 1 : -1;
    });
    return rows;
  }, [currentTab, teamRows, teamSortAsc, teamSortKey]);

  const overviewSummary = useMemo(
    () =>
      summaryResp?.overviewSummary ?? {
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0,
        na: 0,
        closeRate: 0,
      },
    [summaryResp]
  );
  const keyIssueSummary = useMemo(
    () =>
      summaryResp?.keyIssueSummary ?? {
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0,
        na: 0,
        closeRate: 0,
      },
    [summaryResp]
  );
  const summaryScore = useMemo(
    () => summaryResp?.summaryScore ?? null,
    [summaryResp]
  );
  const summarySuccessRate = useMemo(
    () => summaryResp?.summarySuccessRate ?? null,
    [summaryResp]
  );
  const summaryAvgExecutionTime = useMemo(
    () => summaryResp?.summaryAvgExecutionTime ?? null,
    [summaryResp]
  );
  const summaryRepoCount = useMemo(
    () => summaryResp?.repoCount ?? 0,
    [summaryResp]
  );

  const commonIssues = useMemo<CommonIssueGroup[]>(
    () => (commonIssuesResp?.items ?? []) as unknown as CommonIssueGroup[],
    [commonIssuesResp]
  );

  const openIssueModal = (title: string, issues: DashboardIssue[]) => {
    setIssueModal({
      open: true,
      title,
      issues: [...issues].sort((left, right) => {
        const teamResult = compareTeamNames(left.team, right.team);
        if (teamResult !== 0) {
          return teamResult;
        }
        if (
          STATUS_RANK[left.normalizedStatus] !==
          STATUS_RANK[right.normalizedStatus]
        ) {
          return (
            STATUS_RANK[right.normalizedStatus] -
            STATUS_RANK[left.normalizedStatus]
          );
        }
        return (
          (SEVERITY_RANK[normalizeSeverity(right.severity)] ?? 0) -
          (SEVERITY_RANK[normalizeSeverity(left.severity)] ?? 0)
        );
      }),
    });
  };

  const openRepoIssues = (
    row: RepoProgressRow,
    bucket: IssueBucket | 'total'
  ) => {
    let issues = row.issues;
    if (bucket === 'pending') {
      issues = issues.filter((issue) => issue.normalizedStatus === 'pending');
    } else if (bucket === 'inProgress') {
      issues = issues.filter(
        (issue) => issue.normalizedStatus === 'inProgress'
      );
    } else if (bucket === 'resolved') {
      issues = issues.filter(
        (issue) =>
          issue.normalizedStatus === 'resolved' ||
          issue.normalizedStatus === 'na'
      );
    } else if (bucket === 'na') {
      issues = issues.filter((issue) => issue.normalizedStatus === 'na');
    }

    const bucketLabel =
      bucket === 'pending'
        ? '待处理'
        : bucket === 'inProgress'
        ? '进行中'
        : bucket === 'resolved'
        ? '已闭环'
        : bucket === 'na'
        ? '不需要修复'
        : '总问题数';

    openIssueModal(`${row.name} · ${bucketLabel}`, issues);
  };

  const openTeamIssues = (
    row: TeamProgressRow,
    bucket: IssueBucket | 'total'
  ) => {
    let issues = row.issues;
    if (bucket === 'pending') {
      issues = issues.filter((issue) => issue.normalizedStatus === 'pending');
    } else if (bucket === 'inProgress') {
      issues = issues.filter(
        (issue) => issue.normalizedStatus === 'inProgress'
      );
    } else if (bucket === 'resolved') {
      issues = issues.filter(
        (issue) =>
          issue.normalizedStatus === 'resolved' ||
          issue.normalizedStatus === 'na'
      );
    } else if (bucket === 'na') {
      issues = issues.filter((issue) => issue.normalizedStatus === 'na');
    }

    const bucketLabel =
      bucket === 'pending'
        ? '待处理'
        : bucket === 'inProgress'
        ? '进行中'
        : bucket === 'resolved'
        ? '已闭环'
        : bucket === 'na'
        ? '不需要修复'
        : '总问题数';

    openIssueModal(`${row.name} · ${bucketLabel}`, issues);
  };

  const handleRepoSort = (key: RepoSortKey) => {
    if (repoSortKey === key) {
      setRepoSortAsc((prev) => !prev);
      return;
    }
    setRepoSortKey(key);
    setRepoSortAsc(true);
  };

  const handleTeamSort = (key: TeamSortKey) => {
    if (teamSortKey === key) {
      setTeamSortAsc((prev) => !prev);
      return;
    }
    setTeamSortKey(key);
    setTeamSortAsc(true);
  };

  const repoSortArrow = (key: RepoSortKey) =>
    repoSortKey === key ? (repoSortAsc ? '↑' : '↓') : '';
  const teamSortArrow = (key: TeamSortKey) =>
    teamSortKey === key ? (teamSortAsc ? '↑' : '↓') : '';

  return (
    <div className="oj-page">
      <div className="detail-panel-body">
        <OverviewSummarySection
          overviewSummary={overviewSummary}
          keyIssueSummary={keyIssueSummary}
          summaryScore={summaryScore}
          summarySuccessRate={summarySuccessRate}
          summaryAvgExecutionTime={summaryAvgExecutionTime}
          repoCount={summaryRepoCount}
          issueSourceMode={issueSourceMode}
          currentTab={currentTab}
          onIssueSourceModeChange={setIssueSourceMode}
          onTabChange={setCurrentTab}
        />

        <RepoProgressSection
          progressView={progressView}
          onProgressViewChange={setProgressView}
          currentTab={currentTab}
          repoFilter={repoFilter}
          repoOptions={displayRepoOptions}
          onRepoFilterChange={setRepoFilter}
          teamFilter={teamFilter}
          teamOptions={teamOptions}
          onTeamFilterChange={setTeamFilter}
          isLoading={isLoading}
          teamRows={sortedTeamRows}
          repoRows={sortedRepoRows}
          repoSortArrow={repoSortArrow}
          teamSortArrow={teamSortArrow}
          teamSortKey={teamSortKey}
          teamSortAsc={teamSortAsc}
          onRepoSort={handleRepoSort}
          onTeamSort={handleTeamSort}
          onOpenRepoIssues={openRepoIssues}
          onOpenTeamIssues={openTeamIssues}
        />

        <CommonIssuesSection
          commonIssues={commonIssues}
          onOpenIssueModal={openIssueModal}
        />

        <IssueDetailModal
          state={issueModal}
          onClose={() => setIssueModal({ open: false, title: '', issues: [] })}
        />
        <DashboardStyles />
      </div>
    </div>
  );
};

export default OverviewDashboard;
