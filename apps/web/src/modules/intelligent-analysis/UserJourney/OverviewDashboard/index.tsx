import { toRepoProgressRow } from './cardRows';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ConfigProvider } from 'antd';
import { OVERVIEW_ANT_THEME } from './theme';
import {
  fetchOverviewCards,
  fetchOverviewCapabilityBenchmarkDetails,
  fetchOverviewCapabilityBenchmarkSummary,
  fetchOverviewCloseRateTrends,
  fetchOverviewCommonIssues,
  fetchOverviewScoreInsights,
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
import CommunityScoreInsights from './CommunityScoreInsights';
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
  compareTeamNames,
  normalizeHardwareEnv,
  normalizeSeverity,
} from './utils';
import {
  buildTeamScannedRepoCountTrend,
  buildTeamScore95PlusRepoCountTrend,
  buildTeamScoreTrend,
  buildTeamSuccessRateTrend,
} from './scoreTrend';
import OverviewModuleTabs, { type OverviewModule } from './OverviewModuleTabs';
import CiOverviewPanel from '@modules/intelligent-analysis/DeveloperExperience/CiExperience/components/CiOverviewPanel';
import IssueOverview from '@modules/intelligent-analysis/DeveloperExperience/IssueContribution/components/IssueOverview';

type OverviewDashboardProps = {
  org?: string;
};

const parseOverviewModule = (raw: unknown): OverviewModule | undefined => {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value === 'community-onboarding' || value === 'issue' || value === 'ci'
    ? value
    : undefined;
};

const moduleFromAsPath = (asPath: string): OverviewModule | undefined => {
  const query = asPath.split('?')[1]?.split('#')[0] ?? '';
  return parseOverviewModule(new URLSearchParams(query).get('module'));
};

const moduleFromBrowserLocation = (): OverviewModule | undefined =>
  typeof window === 'undefined'
    ? undefined
    : parseOverviewModule(
        new URLSearchParams(window.location.search).get('module')
      );

const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ org }) => {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<OverviewModule | null>(
    () =>
      parseOverviewModule(router.query.module) ??
      moduleFromAsPath(router.asPath) ??
      moduleFromBrowserLocation() ??
      (router.isReady ? 'community-onboarding' : null)
  );
  // 报告页「返回看板」携带 module 参数时，切换到对应模块 tab
  const queryModule = useMemo(() => {
    return (
      parseOverviewModule(router.query.module) ??
      moduleFromAsPath(router.asPath)
    );
  }, [router.asPath, router.query.module]);
  useEffect(() => {
    if (queryModule) {
      setActiveModule(queryModule);
    } else if (router.isReady) {
      setActiveModule('community-onboarding');
    }
  }, [queryModule, router.isReady]);
  const onboardingEnabled = activeModule === 'community-onboarding';
  // 切换模块 tab 时同步更新路由上的 module 参数，避免刷新/返回时回到旧模块
  const handleModuleChange = React.useCallback(
    (module: OverviewModule) => {
      setActiveModule(module);
      router.replace(
        { pathname: router.pathname, query: { ...router.query, module } },
        undefined,
        { shallow: true }
      );
    },
    [router]
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
  const [operatingSystemFilter, setOperatingSystemFilter] = useState('');
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
  const [cardsPage, setCardsPage] = useState(1);
  const [severityFilters, setSeverityFilters] = useState<string[]>([]);
  const [progressSort, setProgressSort] = useState<{
    key: string;
    order: 'asc' | 'desc';
  }>({ key: 'none', order: 'desc' });
  const handleProgressSortChange = React.useCallback(
    (key: string, order: 'asc' | 'desc') => {
      setProgressSort((previous) =>
        previous.key === key && previous.order === order
          ? previous
          : { key, order }
      );
    },
    []
  );
  const cardsParams = useMemo(
    () => ({
      viewType: progressView,
      org,
      tab: currentTab,
      includeCommonIssues: true,
      commonOnly:
        issueSourceMode === 'common'
          ? true
          : issueSourceMode === 'non-common' || !includeCommonIssues
          ? false
          : undefined,
      team: teamFilter || undefined,
      repo: repoFilter || undefined,
      hardwareEnv: hardwareEnvFilter || undefined,
      operatingSystem: operatingSystemFilter || undefined,
      summaryOnly: true,
      hideBeat: captureMode,
      severity: severityFilters,
      sortBy:
        progressSort.key !== 'none'
          ? progressSort.key
          : progressView === 'team'
          ? teamSortKey
          : repoSortKey,
      sortOrder:
        progressSort.key !== 'none'
          ? progressSort.order
          : (progressView === 'team' ? teamSortAsc : repoSortAsc)
          ? ('asc' as const)
          : ('desc' as const),
      size: 20,
    }),
    [
      progressView,
      org,
      currentTab,
      issueSourceMode,
      includeCommonIssues,
      teamFilter,
      repoFilter,
      hardwareEnvFilter,
      operatingSystemFilter,
      captureMode,
      severityFilters,
      progressSort,
      teamSortKey,
      repoSortKey,
      teamSortAsc,
      repoSortAsc,
    ]
  );
  useEffect(() => {
    setCardsPage(1);
  }, [cardsParams]);
  const {
    data: cardsResp,
    isFetching: isLoading,
    error: cardsError,
  } = useQuery({
    queryKey: ['overview-card-summaries-v2', cardsParams, cardsPage],
    queryFn: ({ signal }) =>
      fetchOverviewCards({ ...cardsParams, page: cardsPage }, signal),
    enabled: onboardingEnabled,
    keepPreviousData: true,
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
    enabled: onboardingEnabled,
  });

  const { data: scoreInsightsResp, isLoading: isScoreInsightsLoading } =
    useQuery({
      queryKey: ['overview-score-insights', org],
      queryFn: () => fetchOverviewScoreInsights({ org }),
      enabled: onboardingEnabled,
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
      enabled: onboardingEnabled,
    });

  const { data: commonIssuesResp } = useQuery({
    queryKey: ['overview-common-issues', org],
    queryFn: () =>
      fetchOverviewCommonIssues({
        org,
      }),
    enabled: onboardingEnabled,
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
    enabled: onboardingEnabled,
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
    enabled: onboardingEnabled,
  });

  const trendRepos = useMemo<RepoProgressRow[]>(
    () =>
      (scoreInsightsResp?.repos ?? [])
        .filter(
          (repo) =>
            (!teamFilter || repo.team === teamFilter) &&
            (!repoFilter || repo.id === repoFilter) &&
            (!hardwareEnvFilter ||
              normalizeHardwareEnv(repo.hardwareEnv) ===
                normalizeHardwareEnv(hardwareEnvFilter)) &&
            (!operatingSystemFilter ||
              repo.operatingSystem === operatingSystemFilter)
        )
        .map((repo) =>
          toRepoProgressRow({
            ...repo,
            sig: repo.team,
            painPoints: [],
            scoreHistory: repo.scoreHistory,
            totalPainPoints: 0,
            pendingPainPoints: 0,
            inProgressPainPoints: 0,
            closedPainPoints: 0,
            naPainPoints: 0,
            closeRate: 0,
          })
        ),
    [
      scoreInsightsResp,
      teamFilter,
      repoFilter,
      hardwareEnvFilter,
      operatingSystemFilter,
    ]
  );
  const repoRows = useMemo<RepoProgressRow[]>(
    () =>
      (cardsResp?.items ?? []).map((card) =>
        toRepoProgressRow(
          card,
          trendRepos.find((repo) => repo.id === card.id)?.scoreHistory
        )
      ),
    [cardsResp, trendRepos]
  );
  const summaryIssues: DashboardIssue[] = [];
  const teamRows = useMemo<TeamProgressRow[]>(
    () =>
      (cardsResp?.teamItems ?? []).map((team) => ({
        ...team,
        summaryOnly: true,
        issues: [],
        repos: [],
        trendRepos: trendRepos.filter(
          (repo) => (repo.team || '未分配团队') === team.name
        ),
      })),
    [cardsResp, trendRepos]
  );

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

  const operatingSystemOptions = useMemo(() => {
    const fromApi = (cardsResp?.operatingSystemOptions ?? []).filter(Boolean);
    if (fromApi.length) return fromApi;
    return Array.from(
      new Set(repoRows.map((row) => row.operatingSystem).filter(Boolean))
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
  const summaryRepoCount = useMemo(
    () => summaryResp?.repoCount ?? 0,
    [summaryResp]
  );
  const score95PlusRepoCount = useMemo(
    () => summaryResp?.score95PlusRepoCount ?? 0,
    [summaryResp]
  );

  const overviewTrend = useMemo(
    () => closeRateTrendsResp?.overall ?? [],
    [closeRateTrendsResp]
  );
  const summaryScoreTrend = useMemo(
    () => buildTeamScoreTrend(trendRepos, 7),
    [trendRepos]
  );
  const summarySuccessRateTrend = useMemo(
    () => buildTeamSuccessRateTrend(trendRepos, 7),
    [trendRepos]
  );
  const score95PlusRepoCountTrend = useMemo(
    () => buildTeamScore95PlusRepoCountTrend(trendRepos, 7),
    [trendRepos]
  );
  const repoCountTrend = useMemo(
    () => buildTeamScannedRepoCountTrend(trendRepos, 7),
    [trendRepos]
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
    setIssueModal({
      open: true,
      title: `${baseTitle} · ${severityPrefix}${bucketLabel}`,
      issues: [],
      scope: {
        tab: card === 'secondary' ? 'key' : 'overall',
        common_only: commonOnly,
        bucket,
        severity: severity ? [severity] : undefined,
      },
    });
  };

  const openRepoIssues = (
    row: RepoProgressRow,
    bucket: IssueBucket | 'total'
  ) => {
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

    setIssueModal({
      open: true,
      title: `${row.name} · ${bucketLabel}`,
      issues: [],
      scope: {
        tab: currentTab,
        common_only: commonOnly,
        hardware_env: hardwareEnvFilter || undefined,
        operating_system: operatingSystemFilter || undefined,
        severity: severityFilters,
        bucket,
        repo: row.id,
      },
    });
  };

  const openTeamIssues = (
    row: TeamProgressRow,
    bucket: IssueBucket | 'total'
  ) => {
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

    setIssueModal({
      open: true,
      title: `${row.name} · ${bucketLabel}`,
      issues: [],
      scope: {
        tab: currentTab,
        common_only: commonOnly,
        hardware_env: hardwareEnvFilter || undefined,
        operating_system: operatingSystemFilter || undefined,
        severity: severityFilters,
        bucket,
        team: row.name,
        repo_ids: row.id.startsWith('category:')
          ? row.repos.map((repo) => repo.id)
          : undefined,
      },
    });
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
    <ConfigProvider
      theme={
        onboardingEnabled || activeModule === 'issue'
          ? OVERVIEW_ANT_THEME
          : undefined
      }
    >
      <div className="oj-page">
        <header className=">md:px-6 sticky top-0 z-30 flex h-12 flex-none items-center gap-3 border-b border-[var(--overview-slateBorder)] bg-[var(--overview-slateSoft)] px-4 shadow-[0_1px_4px_rgba(var(--overview-text-rgb),0.04)]">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <OverviewModuleTabs
              active={activeModule ?? 'community-onboarding'}
              onChange={handleModuleChange}
            />
          </div>
          {org ? (
            <div className=">md:flex ml-4 hidden flex-none items-center gap-2 rounded-full border border-[var(--overview-blueSoft)] bg-[var(--overview-blueSoft)] px-3 py-1 text-xs font-semibold text-[var(--overview-blueDark)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--overview-blue)]" />
              {org}
            </div>
          ) : null}
        </header>
        <div className="detail-panel-body">
          {activeModule === 'community-onboarding' ? (
            <div className="detail-panel-content">
              <OverviewSummarySection
                overviewSummary={overviewSummary}
                overviewTrend={overviewTrend}
                overviewIssues={summaryIssues}
                severitySummary={summaryResp?.severitySummary}
                summaryScore={summaryScore}
                summarySuccessRate={summarySuccessRate}
                summaryScoreTrend={summaryScoreTrend}
                summarySuccessRateTrend={summarySuccessRateTrend}
                score95PlusRepoCountTrend={score95PlusRepoCountTrend}
                repoCountTrend={repoCountTrend}
                repoCount={summaryRepoCount}
                score95PlusRepoCount={score95PlusRepoCount}
                issueSourceMode={issueSourceMode}
                includeCommonIssues={includeCommonIssues}
                commonIssues={commonIssues}
                trendWindow={trendWindow}
                isTrendLoading={isCloseRateTrendsLoading}
                onTrendWindowChange={setTrendWindow}
                onIssueSourceModeChange={setIssueSourceMode}
                onIncludeCommonIssuesChange={setIncludeCommonIssues}
                onOpenIssues={openSummaryIssues}
                scoreInsightsSlot={
                  <CommunityScoreInsights
                    repos={scoreInsightsResp?.repos ?? []}
                    overallScore={scoreInsightsResp?.overallScore ?? null}
                    isLoading={isScoreInsightsLoading}
                  />
                }
                benchmarkSlot={
                  <CapabilityBenchmarkOverview
                    data={capabilityBenchmarkSummaryResp ?? null}
                    isLoading={isBenchmarkSummaryLoading}
                  />
                }
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
                operatingSystemFilter={operatingSystemFilter}
                operatingSystemOptions={operatingSystemOptions}
                onOperatingSystemFilterChange={setOperatingSystemFilter}
                isLoading={isLoading}
                teamRows={teamRows}
                repoRows={repoRows}
                remoteCards={{
                  params: cardsParams,
                  page: cardsPage,
                  total: cardsResp?.total ?? 0,
                  error:
                    cardsError instanceof Error
                      ? cardsError.message
                      : undefined,
                  onPageChange: setCardsPage,
                  severityFilters,
                  onSeverityChange: setSeverityFilters,
                  onProgressSortChange: handleProgressSortChange,
                }}
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
            </div>
          ) : null}

          {activeModule === 'ci' ? <CiOverviewPanel org={org} /> : null}

          {activeModule === 'issue' ? (
            <div className="detail-panel-content">
              <IssueOverview org={org} />
            </div>
          ) : null}

          <IssueDetailModal
            state={issueModal}
            onClose={() =>
              setIssueModal({ open: false, title: '', issues: [] })
            }
          />
          <DashboardStyles captureMode={captureMode} />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default OverviewDashboard;
