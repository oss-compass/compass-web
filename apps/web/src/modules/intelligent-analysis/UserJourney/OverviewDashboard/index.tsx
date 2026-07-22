import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import {
  fetchOverviewCards,
  fetchOverviewCapabilityBenchmarkDetails,
  fetchOverviewCapabilityBenchmarkSummary,
  fetchOverviewCloseRateTrends,
  fetchOverviewCommonIssues,
  fetchOverviewSummary,
} from '../rawData/apiClient';
import {
  CapabilityBenchmarkDetails,
  CapabilityBenchmarkOverview,
} from './CapabilityBenchmark';
import CommonIssuesSection from './CommonIssuesSection';
import ExperienceScoreRuleQASection from './ExperienceScoreRuleQASection';
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
  Severity,
  TeamProgressRow,
  TeamSortKey,
  TrendWindow,
} from './types';
import {
  buildMetricSummaryFromPainRows,
  compareTeamNames,
  getAverage,
  getRepoSortValue,
  getTeamSortValue,
  mergeMetricSummaries,
  normalizeHardwareEnv,
  normalizeSeverity,
  isKeyIssue,
  toDashboardIssue,
} from './utils';
import { buildTeamScoreTrend, buildTeamSuccessRateTrend } from './scoreTrend';
import OverviewModuleTabs, { type OverviewModule } from './OverviewModuleTabs';
import CiOverview from '@modules/intelligent-analysis/DeveloperExperience/CiExperience/components/CiOverview';
import IssueOverview from '@modules/intelligent-analysis/DeveloperExperience/IssueContribution/components/IssueOverview';
import { CI_DATA } from '@modules/intelligent-analysis/DeveloperExperience/CiExperience/data';

type OverviewDashboardProps = {
  org?: string;
};

const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ org }) => {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<OverviewModule>(
    'community-onboarding'
  );
  const [issueModal, setIssueModal] = useState<IssueModalState>({
    open: false,
    title: '',
    issues: [],
  });
  const [progressView, setProgressView] = useState<ProgressView>('team');
  const [currentTab, setCurrentTab] = useState<ProgressTab>('overall');
  const [issueSourceMode, setIssueSourceMode] =
    useState<IssueSourceMode>('overall');
  const [includeCommonIssues, setIncludeCommonIssues] = useState(true);
  const [trendWindow, setTrendWindow] = useState<TrendWindow>({
    kind: 'weeks',
    weeks: 7,
  });
  const [repoFilter, setRepoFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [hardwareEnvFilter, setHardwareEnvFilter] = useState('');
  const [repoSortKey, setRepoSortKey] = useState<RepoSortKey>('closeRate');
  const [repoSortAsc, setRepoSortAsc] = useState(true);
  const [teamSortKey, setTeamSortKey] = useState<TeamSortKey>('closeRate');
  const [teamSortAsc, setTeamSortAsc] = useState(true);
  const autoExpandAllTeams = useMemo(() => {
    const raw = router.query.expandAllTeams;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return value === '1' || value === 'true';
  }, [router.query.expandAllTeams]);
  const captureMode = useMemo(() => {
    const raw = router.query.captureMode;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return value === '1' || value === 'true';
  }, [router.query.captureMode]);
  const captureIncludeCommonIssues = useMemo(() => {
    const raw = router.query.includeCommonIssues;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return !(value === '0' || value === 'false');
  }, [router.query.includeCommonIssues]);
  useEffect(() => {
    if (!captureMode) return;
    setIncludeCommonIssues(captureIncludeCommonIssues);
  }, [captureIncludeCommonIssues, captureMode]);
  const { data: cardsResp, isLoading } = useQuery({
    queryKey: [
      'overview-cards-page',
      org,
      currentTab,
      repoFilter,
      teamFilter,
      hardwareEnvFilter,
      issueSourceMode,
      includeCommonIssues,
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
            : includeCommonIssues
            ? undefined
            : false,
        team: teamFilter || undefined,
        repo: repoFilter || undefined,
        hardwareEnv: hardwareEnvFilter || undefined,
        page: 1,
        size: 200,
      }),
  });

  const { data: cardsOverallResp } = useQuery({
    queryKey: [
      'overview-cards-page',
      org,
      'overall',
      repoFilter,
      teamFilter,
      hardwareEnvFilter,
      issueSourceMode,
      includeCommonIssues,
    ],
    queryFn: () =>
      fetchOverviewCards({
        viewType: 'repo',
        org,
        tab: 'overall',
        includeCommonIssues: true,
        commonOnly:
          issueSourceMode === 'common'
            ? true
            : issueSourceMode === 'non-common'
            ? false
            : includeCommonIssues
            ? undefined
            : false,
        team: teamFilter || undefined,
        repo: repoFilter || undefined,
        hardwareEnv: hardwareEnvFilter || undefined,
        page: 1,
        size: 200,
      }),
  });

  const commonOnly = useMemo(() => {
    if (issueSourceMode === 'common') return true;
    if (issueSourceMode === 'non-common') return false;
    return includeCommonIssues ? undefined : false;
  }, [includeCommonIssues, issueSourceMode]);

  const trendWindowKey = useMemo(() => {
    if (trendWindow.kind === 'weeks') return `weeks:${trendWindow.weeks}`;
    return `range:${trendWindow.start}:${trendWindow.end}`;
  }, [trendWindow]);

  const { data: summaryResp } = useQuery({
    queryKey: ['overview-summary', org, issueSourceMode, includeCommonIssues],
    queryFn: () =>
      fetchOverviewSummary({
        org,
        includeCommonIssues: true,
        commonOnly:
          issueSourceMode === 'common'
            ? true
            : issueSourceMode === 'non-common'
            ? false
            : includeCommonIssues
            ? undefined
            : false,
      }),
  });

  const { data: closeRateTrendsResp, isLoading: isCloseRateTrendsLoading } =
    useQuery({
      queryKey: [
        'overview-close-rate-trends-v2',
        org,
        issueSourceMode,
        includeCommonIssues,
        trendWindowKey,
      ],
      queryFn: () =>
        fetchOverviewCloseRateTrends({
          org,
          includeCommonIssues: true,
          commonOnly:
            issueSourceMode === 'common'
              ? true
              : issueSourceMode === 'non-common'
              ? false
              : includeCommonIssues
              ? undefined
              : false,
          weeks: trendWindow.kind === 'weeks' ? trendWindow.weeks : undefined,
          startDate:
            trendWindow.kind === 'range' ? trendWindow.start : undefined,
          endDate: trendWindow.kind === 'range' ? trendWindow.end : undefined,
          countChildPains: true,
        }),
    });

  const { data: commonIssuesResp } = useQuery({
    queryKey: ['overview-common-issues', org],
    queryFn: () =>
      fetchOverviewCommonIssues({
        org,
      }),
  });

  const {
    data: capabilityBenchmarkSummaryResp,
    isLoading: isBenchmarkSummaryLoading,
  } = useQuery({
    queryKey: ['overview-capability-benchmark-summary', org],
    queryFn: async () => {
      try {
        return await fetchOverviewCapabilityBenchmarkSummary();
      } catch (error) {
        if (
          error instanceof Error &&
          (error.message.includes('404') ||
            error.message.includes('Failed to fetch'))
        ) {
          return {
            pairCount: 0,
            totalScoreResult: {
              lead: 0,
              tie: 0,
              lag: 0,
              total: 0,
              leadRepos: [],
              lagRepos: [],
            },
            stageScoreResults: [],
          };
        }
        throw error;
      }
    },
  });

  const {
    data: capabilityBenchmarkDetailsResp,
    isLoading: isBenchmarkDetailsLoading,
  } = useQuery({
    queryKey: ['overview-capability-benchmark-details', org],
    queryFn: async () => {
      try {
        return await fetchOverviewCapabilityBenchmarkDetails();
      } catch (error) {
        if (
          error instanceof Error &&
          (error.message.includes('404') ||
            error.message.includes('Failed to fetch'))
        ) {
          return {
            pairCount: 0,
            detailRows: [],
          };
        }
        throw error;
      }
    },
  });

  const repoRows = useMemo<RepoProgressRow[]>(() => {
    return (cardsResp?.items ?? []).map((card) => {
      const issues = toDashboardIssue(card);
      const metrics = buildMetricSummaryFromPainRows(issues);
      return {
        id: card.id,
        name: card.name,
        team: card.team || card.sig,
        hardwareEnv: normalizeHardwareEnv(
          card.hardwareEnv || issues[0]?.chipModel || ''
        ),
        score: card.latestScore ?? issues[0]?.score ?? null,
        successRate: card.latestSuccessRate ?? issues[0]?.successRate ?? null,
        executionTime: card.latestExecutionTime ?? null,
        latestReportId: card.latestReportId,
        detailReportUrl: card.detailReportUrl,
        scoreHistory: card.scoreHistory ?? [],
        overall: metrics,
        key: metrics,
        issues,
        benchmark: card.benchmark
          ? {
              repoKey: card.benchmark.repoKey,
              repoName: card.benchmark.repoName,
              latestReportId: card.benchmark.latestReportId,
              detailReportUrl: card.benchmark.detailReportUrl,
              latestScore: card.benchmark.latestScore ?? null,
              latestSuccessRate: card.benchmark.latestSuccessRate ?? null,
              latestExecutionTime: card.benchmark.latestExecutionTime ?? null,
              hardwareEnv: normalizeHardwareEnv(
                card.benchmark.hardwareEnv || ''
              ),
              scoreBreakdown: (card.benchmark.scoreBreakdown ?? []).map(
                (item) => ({
                  key: item.key,
                  label: item.label,
                  cannScore: item.cannScore ?? null,
                  benchmarkScore: item.benchmarkScore ?? null,
                })
              ),
            }
          : null,
      };
    });
  }, [cardsResp]);

  const summaryIssues = useMemo<DashboardIssue[]>(() => {
    const items = cardsOverallResp?.items ?? [];
    if (!items.length) return [];
    return items.flatMap((card) => toDashboardIssue(card));
  }, [cardsOverallResp]);

  const keySummaryIssues = useMemo<DashboardIssue[]>(
    () => summaryIssues.filter((issue) => isKeyIssue(issue)),
    [summaryIssues]
  );

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

  const hardwareEnvOptions = useMemo(() => {
    const fromApi = Array.from(
      new Set(
        (cardsResp?.hardwareOptions ?? [])
          .map((item) => normalizeHardwareEnv(item))
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b));
    if (fromApi.length) return fromApi;
    return Array.from(
      new Set(
        repoRows
          .map((row) => normalizeHardwareEnv(row.hardwareEnv))
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [cardsResp, repoRows]);

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

  const overviewTrend = useMemo(
    () => closeRateTrendsResp?.overall ?? [],
    [closeRateTrendsResp]
  );
  const summaryScoreTrend = useMemo(
    () => buildTeamScoreTrend(repoRows, 7),
    [repoRows]
  );
  const summarySuccessRateTrend = useMemo(
    () => buildTeamSuccessRateTrend(repoRows, 7),
    [repoRows]
  );
  const keyIssueTrend = useMemo(
    () => closeRateTrendsResp?.key ?? [],
    [closeRateTrendsResp]
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

  const openSummaryIssues = (
    card: 'primary' | 'secondary',
    bucket: IssueBucket | 'total',
    severity?: Severity
  ) => {
    const baseIssues = card === 'secondary' ? keySummaryIssues : summaryIssues;
    let issues = baseIssues;

    if (severity) {
      issues = issues.filter((issue) => issue.severity === severity);
    }

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

    const baseTitle =
      issueSourceMode === 'common'
        ? card === 'secondary'
          ? '关键共性问题'
          : '共性问题'
        : card === 'secondary'
        ? '关键问题'
        : '总体问题';

    const severityPrefix = severity ? `${severity.split('_')[0]} · ` : '';
    openIssueModal(`${baseTitle} · ${severityPrefix}${bucketLabel}`, issues);
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
      <header className=">md:px-6 sticky top-0 z-30 flex h-16 flex-none items-center gap-3 border-b border-slate-200/90 bg-white/95 px-4 shadow-[0_1px_0_rgba(15,23,42,0.02)] backdrop-blur">
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <OverviewModuleTabs
            active={activeModule}
            onChange={setActiveModule}
          />
        </div>
        {org ? (
          <div className=">md:flex ml-4 hidden flex-none items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            {org}
          </div>
        ) : null}
      </header>
      <div className="detail-panel-body">
        {activeModule === 'community-onboarding' ? (
          <>
            <OverviewSummarySection
              overviewSummary={overviewSummary}
              overviewTrend={overviewTrend}
              overviewIssues={summaryIssues}
              summaryScore={summaryScore}
              summarySuccessRate={summarySuccessRate}
              summaryScoreTrend={summaryScoreTrend}
              summarySuccessRateTrend={summarySuccessRateTrend}
              summaryAvgExecutionTime={summaryAvgExecutionTime}
              repoCount={summaryRepoCount}
              issueSourceMode={issueSourceMode}
              includeCommonIssues={includeCommonIssues}
              commonIssues={commonIssues}
              trendWindow={trendWindow}
              isTrendLoading={isCloseRateTrendsLoading}
              onTrendWindowChange={setTrendWindow}
              onIssueSourceModeChange={setIssueSourceMode}
              onIncludeCommonIssuesChange={setIncludeCommonIssues}
              onOpenIssues={openSummaryIssues}
            />

            <CapabilityBenchmarkOverview
              data={capabilityBenchmarkSummaryResp ?? null}
              isLoading={isBenchmarkSummaryLoading}
            />

            <RepoProgressSection
              captureMode={captureMode}
              progressView={progressView}
              onProgressViewChange={setProgressView}
              currentTab={currentTab}
              onTabChange={setCurrentTab}
              hideBeatRepos={captureMode}
              org={org}
              commonOnly={commonOnly}
              repoFilter={repoFilter}
              repoOptions={displayRepoOptions}
              onRepoFilterChange={setRepoFilter}
              teamFilter={teamFilter}
              teamOptions={teamOptions}
              onTeamFilterChange={setTeamFilter}
              hardwareEnvFilter={hardwareEnvFilter}
              hardwareEnvOptions={hardwareEnvOptions}
              onHardwareEnvFilterChange={setHardwareEnvFilter}
              isLoading={isLoading}
              teamRows={sortedTeamRows}
              repoRows={sortedRepoRows}
              autoExpandAllTeams={autoExpandAllTeams}
              repoSortKey={repoSortKey}
              repoSortAsc={repoSortAsc}
              repoSortArrow={repoSortArrow}
              teamSortArrow={teamSortArrow}
              teamSortKey={teamSortKey}
              teamSortAsc={teamSortAsc}
              onRepoSort={handleRepoSort}
              onTeamSort={handleTeamSort}
              onOpenRepoIssues={openRepoIssues}
              onOpenTeamIssues={openTeamIssues}
            />

            <CapabilityBenchmarkDetails
              data={capabilityBenchmarkDetailsResp ?? null}
              isLoading={isBenchmarkDetailsLoading}
            />

            <CommonIssuesSection
              commonIssues={commonIssues}
              onOpenIssueModal={openIssueModal}
            />

            {!captureMode && <ExperienceScoreRuleQASection />}
          </>
        ) : null}

        {activeModule === 'ci' ? <CiOverview data={CI_DATA} /> : null}

        {activeModule === 'issue' ? <IssueOverview org={org} /> : null}

        <IssueDetailModal
          state={issueModal}
          onClose={() => setIssueModal({ open: false, title: '', issues: [] })}
        />
        <DashboardStyles captureMode={captureMode} />
      </div>
    </div>
  );
};

export default OverviewDashboard;
