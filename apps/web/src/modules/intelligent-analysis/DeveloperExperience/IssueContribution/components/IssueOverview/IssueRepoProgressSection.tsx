import { buildIssueTaskManagementHref } from '../../../routes';
import { formatScore } from '../../presentation';
import React from 'react';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';
import { Pagination, Segmented, Skeleton, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import { useQueries, useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { CloseRateSparkline } from '../../../../UserJourney/OverviewDashboard/CloseRateTrendChart';
import { OJ_TREND_COLORS } from '../../../../UserJourney/OverviewDashboard/constants';
import { groupOperatorRepos } from '../../../../UserJourney/OverviewDashboard/operatorCategories';
import {
  ProgressSortHeader,
  type ProgressMetricSortKey,
  type ProgressMetricSortOrder,
} from '../../../../UserJourney/OverviewDashboard/RepoProgressSection';
import { IssueProgressBar } from '../../../../UserJourney/OverviewDashboard/ProgressComponents';
import {
  fetchIssueOverviewRepos,
  fetchIssueOverviewTeams,
  fetchIssueOverviewTrends,
} from '../../data';
import type { IssueOverviewRepo } from '../../types';
import IssuePainDetailModal from './IssuePainDetailModal';

const { Title } = Typography;
const REPO_PAGE_SIZE = 20;

type ProgressView = 'team' | 'repo';
type ProgressBucket = 'pending' | 'inProgress' | 'resolved';
type TeamTableSortKey =
  | 'name'
  | 'repoCount'
  | 'score'
  | 'painTotal'
  | 'closeRate'
  | 'report';
type TableSortOrder = 'ascend' | 'descend' | null;

type ProgressCounts = {
  painPending: number;
  painInProgress: number;
  painResolved: number;
};

type DetailTarget =
  | { type: 'team'; name: string; bucket?: ProgressBucket }
  | {
      type: 'category';
      name: string;
      repos: IssueOverviewRepo[];
      bucket?: ProgressBucket;
    }
  | { type: 'repo'; repo: IssueOverviewRepo; bucket?: ProgressBucket };

const PROGRESS_BUCKET_LABELS: Record<ProgressBucket, string> = {
  pending: '待处理',
  inProgress: '进行中',
  resolved: '已闭环',
};

type TeamRow = {
  id: string;
  name: string;
  repoCount: number;
  score: number | null;
  painTotal: number;
  painPending: number;
  painInProgress: number;
  painResolved: number;
  closeRate: number;
  scoreTrend: number[];
  scoreTrendPeriods: string[];
  repos: IssueOverviewRepo[];
};

type Props = {
  expandAllTeams?: boolean;
  org?: string;
  /** 痛点弹窗阶段筛选项，来自 pain-summary。 */
  stageOptions?: string[];
  repoManagementHref: string;
  reportHref: (
    community: string,
    period?: string,
    stageId?: string,
    painId?: string
  ) => string;
  onOpenScoreTrend: (repo: IssueOverviewRepo) => void;
  onOpenAggregateScoreTrend: (
    name: string,
    values: number[],
    periods: string[]
  ) => void;
  onReadyChange?: (ready: boolean) => void;
};

const TEAM_COLUMN_WIDTHS = [64, 210, 110, 138, 230, 110, 100, 110] as const;
const TEAM_TABLE_WIDTH = TEAM_COLUMN_WIDTHS.reduce(
  (total, width) => total + width,
  0
);

const reportDateLabel = (period: string) => {
  const [, endDate] = String(period || '').split('_to_');
  return endDate || period || '-';
};

const reportSortName = (repo: IssueOverviewRepo) =>
  `${repo.repoShort}_${repo.period}`;

const teamReportSortName = (team: TeamRow) =>
  team.repos.map(reportSortName).sort((a, b) => a.localeCompare(b))[0] ?? '';

const progressSortValue = (
  row: ProgressCounts,
  key: Exclude<ProgressMetricSortKey, 'none'>
) =>
  key === 'pending'
    ? row.painPending
    : key === 'inProgress'
    ? row.painInProgress
    : row.painResolved;

export const buildAggregateRow = (
  name: string,
  repos: IssueOverviewRepo[]
): TeamRow => {
  const painTotal = repos.reduce((sum, repo) => sum + repo.painTotal, 0);
  const painPending = repos.reduce((sum, repo) => sum + repo.painPending, 0);
  const painInProgress = repos.reduce(
    (sum, repo) => sum + repo.painInProgress,
    0
  );
  const painResolved = repos.reduce((sum, repo) => sum + repo.painResolved, 0);
  const trackableTotal = painPending + painInProgress + painResolved;
  // 分队评分按仓库等权平均，与顶部 KPI、综合体验评分分布卡片保持同一口径；
  // 不用仓内 Issue 数加权，避免问题量大的仓库单方面左右分队整体体验分。
  const scoredRepos = repos.filter((repo) => repo.idxTotal != null);
  const scoresByPeriod = new Map<string, number[]>();
  repos.forEach((repo) => {
    (repo.idxTrendPeriods ?? []).forEach((period, index) => {
      const score = (repo.idxTrend ?? [])[index];
      if (!period || !Number.isFinite(score)) return;
      scoresByPeriod.set(period, [
        ...(scoresByPeriod.get(period) ?? []),
        score,
      ]);
    });
  });
  const scoreTrendPeriods = Array.from(scoresByPeriod.keys()).sort((a, b) =>
    a.localeCompare(b)
  );
  const scoreTrend = scoreTrendPeriods.map((period) => {
    const values = scoresByPeriod.get(period) ?? [];
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  });
  return {
    id: name,
    name,
    repoCount: repos.length,
    score: scoredRepos.length
      ? scoredRepos.reduce((sum, repo) => sum + repo.idxTotal, 0) /
        scoredRepos.length
      : null,
    painTotal,
    painPending,
    painInProgress,
    painResolved,
    closeRate: trackableTotal ? (painResolved / trackableTotal) * 100 : 100,
    scoreTrend,
    scoreTrendPeriods,
    repos,
  };
};

const IssueRepoProgressSection: React.FC<Props> = ({
  expandAllTeams = false,
  org,
  stageOptions = [],
  repoManagementHref,
  reportHref,
  onOpenScoreTrend,
  onOpenAggregateScoreTrend,
  onReadyChange,
}) => {
  const [view, setView] = React.useState<ProgressView>('team');
  const [expandedRowKeys, setExpandedRowKeys] = React.useState<React.Key[]>([]);
  const [collapsedCategories, setCollapsedCategories] = React.useState<
    string[]
  >([]);
  const [progressSortKey, setProgressSortKey] =
    React.useState<ProgressMetricSortKey>('none');
  const [progressSortOrder, setProgressSortOrder] =
    React.useState<ProgressMetricSortOrder>('desc');
  const [teamTableSort, setTeamTableSort] = React.useState<{
    key?: TeamTableSortKey;
    order: TableSortOrder;
  }>({ order: null });
  const [repoPage, setRepoPage] = React.useState(1);
  const [detailTarget, setDetailTarget] = React.useState<DetailTarget | null>(
    null
  );

  const teamsQuery = useQuery({
    queryKey: ['issue-overview-v2-teams', org],
    queryFn: ({ signal }) => fetchIssueOverviewTeams(org, signal),
    staleTime: 0,
    refetchOnMount: 'always',
  });
  const teamItems = React.useMemo(
    () => teamsQuery.data?.items ?? [],
    [teamsQuery.data]
  );
  const teamRepoQueries = useQueries({
    queries: teamItems.map<UseQueryOptions<IssueOverviewRepo[]>>((team) => ({
      queryKey: ['issue-overview-v2-team-repos', org, team.name],
      queryFn: async ({ signal }): Promise<IssueOverviewRepo[]> => {
        const page = await fetchIssueOverviewRepos(
          {
            org,
            team: team.name,
            page: 1,
            pageSize: 100,
            sort: 'repo',
            order: 'asc',
          },
          signal
        );
        if (!page.items.length) return [];
        const trend = await fetchIssueOverviewTrends(
          { org, weeks: 104, repos: page.items.map((repo) => repo.repoShort) },
          signal
        );
        return page.items.map((repo) => {
          const values = trend.repos?.[repo.community];
          if (!values?.length) return repo;
          const valid = values
            .map((value, index) => ({ value, period: trend.periods[index] }))
            .filter(
              (item): item is { value: number; period: string } =>
                item.value != null && Number.isFinite(item.value)
            );
          return {
            ...repo,
            idxTrend: valid.map((item) => item.value),
            idxTrendPeriods: valid.map((item) => item.period),
          };
        });
      },
      enabled:
        !!team.name && (expandAllTeams || expandedRowKeys.includes(team.name)),
      staleTime: 0,
    })),
  });
  const teamReposByName = React.useMemo(() => {
    const map = new Map<string, IssueOverviewRepo[]>();
    teamRepoQueries.forEach((query, index) => {
      if (query.data) map.set(teamItems[index]?.name, query.data);
    });
    return map;
  }, [teamItems, teamRepoQueries]);
  const teamLoadingByName = React.useMemo(() => {
    const map = new Map<string, boolean>();
    teamRepoQueries.forEach((query, index) => {
      if (teamItems[index]?.name) {
        map.set(teamItems[index].name, query.isLoading);
      }
    });
    return map;
  }, [teamItems, teamRepoQueries]);

  const repoQuery = useQuery({
    queryKey: ['issue-overview-v2-repos', org, repoPage],
    queryFn: ({ signal }) =>
      fetchIssueOverviewRepos(
        {
          org,
          page: repoPage,
          pageSize: REPO_PAGE_SIZE,
          sort: 'score',
          order: 'desc',
        },
        signal
      ),
    enabled: view === 'repo',
    staleTime: 0,
    refetchOnMount: 'always',
  });
  const repoPageItems = React.useMemo(
    () => repoQuery.data?.items ?? [],
    [repoQuery.data]
  );
  const repoTrendQuery = useQuery({
    queryKey: [
      'issue-overview-v2-repo-trends',
      org,
      repoPageItems.map((repo) => repo.repoShort).join(','),
    ],
    queryFn: ({ signal }) =>
      fetchIssueOverviewTrends(
        {
          org,
          weeks: 104,
          repos: repoPageItems.map((repo) => repo.repoShort),
        },
        signal
      ),
    enabled: view === 'repo' && repoPageItems.length > 0,
    staleTime: 0,
  });
  const repoRows = React.useMemo(() => {
    const trend = repoTrendQuery.data;
    if (!trend?.repos) return repoPageItems;
    return repoPageItems.map((repo) => {
      const values = trend.repos?.[repo.community];
      if (!values?.length) return repo;
      const valid = values
        .map((value, index) => ({ value, period: trend.periods[index] }))
        .filter(
          (item): item is { value: number; period: string } =>
            item.value != null && Number.isFinite(item.value)
        );
      return {
        ...repo,
        idxTrend: valid.map((item) => item.value),
        idxTrendPeriods: valid.map((item) => item.period),
      };
    });
  }, [repoPageItems, repoTrendQuery.data]);

  const teamRows = React.useMemo<TeamRow[]>(
    () =>
      teamItems.map((team) => {
        const periods = team.scoreTrendPeriods ?? [];
        const valid = (team.scoreTrend ?? [])
          .map((value, index) => ({ value, period: periods[index] }))
          .filter(
            (item): item is { value: number; period: string } =>
              item.value != null && Number.isFinite(item.value) && !!item.period
          );
        return {
          id: team.name,
          name: team.name,
          repoCount: team.repoCount,
          score: team.score,
          painTotal: team.painTotal,
          painPending: team.painPending,
          painInProgress: team.painInProgress,
          painResolved: team.painResolved,
          closeRate: team.closeRate,
          scoreTrend: valid.map((item) => item.value),
          scoreTrendPeriods: valid.map((item) => item.period),
          repos: teamReposByName.get(team.name) ?? [],
        };
      }),
    [teamItems, teamReposByName]
  );

  // 详情弹窗的基础筛选条件：团队/分组/仓库 + 进展阶段，列表与 Issue 均由服务端分页。
  const detailQuery = React.useMemo(() => {
    if (!detailTarget) return { org };
    const state = detailTarget.bucket;
    if (detailTarget.type === 'team') {
      return { org, team: detailTarget.name, state };
    }
    if (detailTarget.type === 'category') {
      return {
        org,
        repos: Array.from(
          new Set(detailTarget.repos.map((repo) => repo.repoShort))
        ),
        state,
      };
    }
    return { org, repo: detailTarget.repo.repoShort, state };
  }, [detailTarget, org]);

  const teamReposFetching = teamRepoQueries.some(
    (query) => query.isLoading || query.isFetching
  );
  React.useEffect(() => {
    const teamReady =
      !teamsQuery.isLoading &&
      !teamsQuery.isFetching &&
      (!expandAllTeams || !teamReposFetching);
    const repoReady =
      view !== 'repo' ||
      (!repoQuery.isFetching &&
        (repoPageItems.length === 0 || !repoTrendQuery.isFetching));
    onReadyChange?.(teamReady && repoReady);
  }, [
    expandAllTeams,
    onReadyChange,
    repoPageItems.length,
    repoQuery.isFetching,
    repoTrendQuery.isFetching,
    teamReposFetching,
    teamsQuery.isFetching,
    teamsQuery.isLoading,
    view,
  ]);

  const openPainDetails = (target: DetailTarget) => {
    setDetailTarget(target);
  };

  const progressSorter = React.useCallback(
    <T extends ProgressCounts>(left: T, right: T) => {
      if (progressSortKey === 'none') return 0;
      const direction = progressSortOrder === 'asc' ? 1 : -1;
      return (
        (progressSortValue(left, progressSortKey) -
          progressSortValue(right, progressSortKey)) *
        direction
      );
    },
    [progressSortKey, progressSortOrder]
  );

  const progressHeader = React.useMemo(
    () => (
      <ProgressSortHeader
        label="问题处理进展"
        sortKey={progressSortKey}
        sortOrder={progressSortOrder}
        onSortKeyChange={(key) => {
          setTeamTableSort({ order: null });
          setProgressSortKey(key);
        }}
        onSortOrderChange={setProgressSortOrder}
      />
    ),
    [progressSortKey, progressSortOrder]
  );

  const sortByProgress = React.useCallback(
    <T extends ProgressCounts>(rows: T[]): T[] =>
      progressSortKey === 'none' ? rows : [...rows].sort(progressSorter),
    [progressSortKey, progressSorter]
  );

  const sortExpandedTeamRepos = React.useCallback(
    (teamRepos: IssueOverviewRepo[]) => {
      if (progressSortKey !== 'none') return sortByProgress(teamRepos);
      if (!teamTableSort.key || !teamTableSort.order) return teamRepos;
      const direction = teamTableSort.order === 'ascend' ? 1 : -1;
      const value = (repo: IssueOverviewRepo): string | number => {
        switch (teamTableSort.key) {
          case 'score':
            return repo.idxTotal ?? -1;
          case 'painTotal':
            return repo.painTotal;
          case 'closeRate':
            return repo.painCloseRate;
          case 'report':
            return reportSortName(repo);
          // 团队名称和仓库数在单仓行没有可比较的同名值，统一以仓库名
          // 作为稳定的展开区排序字段。
          case 'name':
          case 'repoCount':
          default:
            return repo.repoShort;
        }
      };
      return [...teamRepos].sort((left, right) => {
        const leftValue = value(left);
        const rightValue = value(right);
        const result =
          typeof leftValue === 'string' && typeof rightValue === 'string'
            ? leftValue.localeCompare(rightValue, 'zh-CN')
            : Number(leftValue) - Number(rightValue);
        return result === 0
          ? left.repoShort.localeCompare(right.repoShort, 'zh-CN')
          : result * direction;
      });
    },
    [progressSortKey, sortByProgress, teamTableSort]
  );
  const displayedTeamRows = React.useMemo(
    () =>
      sortByProgress(teamRows).map((team) => ({
        ...team,
        repos: sortExpandedTeamRepos(team.repos),
      })),
    [sortByProgress, sortExpandedTeamRepos, teamRows]
  );

  const progressCell = (
    pending: number,
    inProgress: number,
    resolved: number,
    onBucketClick?: (bucket: ProgressBucket) => void
  ) => (
    <div
      onClick={onBucketClick ? (event) => event.stopPropagation() : undefined}
    >
      <IssueProgressBar
        pending={pending}
        inProgress={inProgress}
        resolved={resolved}
        onBucketClick={
          onBucketClick
            ? (bucket) => onBucketClick(bucket as ProgressBucket)
            : undefined
        }
      />
    </div>
  );
  const closeRateCell = (rate: number) => (
    <span className="overview-close-rate-value text-sm font-semibold text-[var(--overview-slateDark)]">
      {rate.toFixed(0)}%
    </span>
  );
  const repoScoreCell = React.useCallback(
    (repo: IssueOverviewRepo) => (
      <div className="overview-close-rate-cell">
        {repo.idxTrend.length > 1 ? (
          <button
            type="button"
            className="bm-trend-sparkline"
            title="查看得分趋势"
            onClick={(event) => {
              event.stopPropagation();
              onOpenScoreTrend(repo);
            }}
          >
            <CloseRateSparkline
              values={repo.idxTrend}
              stroke={OJ_TREND_COLORS.scoreLine}
              minValue={0}
              maxValue={100}
            />
          </button>
        ) : null}
        <span className="text-sm font-semibold text-[var(--overview-slateDark)]">
          {formatScore(repo.idxTotal)}
        </span>
      </div>
    ),
    [onOpenScoreTrend]
  );
  const aggregateScoreCell = React.useCallback(
    (row: TeamRow) => (
      <div className="overview-close-rate-cell">
        {row.scoreTrend.length > 1 ? (
          <button
            type="button"
            className="bm-trend-sparkline"
            title="查看得分趋势"
            onClick={(event) => {
              event.stopPropagation();
              onOpenAggregateScoreTrend(
                row.name,
                row.scoreTrend,
                row.scoreTrendPeriods
              );
            }}
          >
            <CloseRateSparkline
              values={row.scoreTrend}
              stroke={OJ_TREND_COLORS.scoreLine}
              minValue={0}
              maxValue={100}
            />
          </button>
        ) : null}
        <span className="text-sm font-semibold text-[var(--overview-slateDark)]">
          {formatScore(row.score)}
        </span>
      </div>
    ),
    [onOpenAggregateScoreTrend]
  );

  const repoColumns = React.useMemo<TableProps<IssueOverviewRepo>['columns']>(
    () => [
      {
        title: '序号',
        key: 'index',
        width: TEAM_COLUMN_WIDTHS[0],
        align: 'center',
        render: (_value, _record, index) => (
          <span className="row-num">
            {(repoPage - 1) * REPO_PAGE_SIZE + index + 1}
          </span>
        ),
      },
      {
        title: '仓库',
        dataIndex: 'repoShort',
        key: 'repoShort',
        width: 170,
        sorter: (a, b) => a.repoShort.localeCompare(b.repoShort),
        render: (value) => (
          <span className="font-semibold text-[var(--overview-slateDark)]">
            {value}
          </span>
        ),
      },
      {
        title: '责任团队',
        dataIndex: 'teamName',
        key: 'teamName',
        width: 150,
        ellipsis: true,
        sorter: (a, b) => a.teamName.localeCompare(b.teamName, 'zh-CN'),
      },
      {
        title: '综合体验评分',
        dataIndex: 'idxTotal',
        key: 'idxTotal',
        width: 138,
        sorter: (a, b) => (a.idxTotal ?? -1) - (b.idxTotal ?? -1),
        render: (_value: number, record) => repoScoreCell(record),
      },
      {
        title: progressHeader,
        key: 'progress',
        width: 230,
        render: (_value, record) =>
          progressCell(
            record.painPending,
            record.painInProgress,
            record.painResolved,
            (bucket) => openPainDetails({ type: 'repo', repo: record, bucket })
          ),
      },
      {
        title: '问题数',
        key: 'painTotal',
        width: 105,
        sorter: (a, b) => a.painTotal - b.painTotal,
        render: (_value, record) => (
          <button
            type="button"
            className="overview-table-link overview-table-link-strong"
            onClick={() => openPainDetails({ type: 'repo', repo: record })}
          >
            {record.painTotal}
          </button>
        ),
      },
      {
        title: '闭环率',
        dataIndex: 'painCloseRate',
        key: 'closeRate',
        width: 95,
        sorter: (a, b) => a.painCloseRate - b.painCloseRate,
        render: (value: number) => closeRateCell(value),
      },
      {
        title: '最新报告',
        key: 'report',
        width: 100,
        fixed: 'right',
        sorter: (a, b) =>
          reportSortName(a).localeCompare(reportSortName(b), 'zh-CN'),
        render: (_value, record) => (
          <Link
            href={reportHref(record.community, record.period)}
            className="overview-table-link"
          >
            {reportDateLabel(record.period)}
          </Link>
        ),
      },
    ],
    [progressHeader, repoPage, repoScoreCell, reportHref]
  );

  const teamColumns = React.useMemo<TableProps<TeamRow>['columns']>(
    () => [
      {
        title: '序号',
        key: 'index',
        width: 64,
        align: 'center',
        render: (_value, _record, index) => (
          <span className="row-num">{index + 1}</span>
        ),
      },
      {
        title: '责任团队',
        dataIndex: 'name',
        key: 'name',
        width: TEAM_COLUMN_WIDTHS[1],
        align: 'left',
        sorter: (a, b) => a.name.localeCompare(b.name, 'zh-CN'),
        sortOrder: teamTableSort.key === 'name' ? teamTableSort.order : null,
        render: (value, record) => (
          <span className="overview-expand-label">
            <RightOutlined
              className={`overview-expand-icon ${
                expandedRowKeys.includes(record.id) ? 'is-expanded' : ''
              }`}
            />
            <span>{value}</span>
          </span>
        ),
      },
      {
        title: '负责仓库',
        dataIndex: 'repoCount',
        key: 'repoCount',
        width: TEAM_COLUMN_WIDTHS[2],
        sorter: (a, b) => a.repoCount - b.repoCount,
        sortOrder:
          teamTableSort.key === 'repoCount' ? teamTableSort.order : null,
        render: (value: number) => `${value} 个`,
      },
      {
        title: '综合体验评分',
        dataIndex: 'score',
        key: 'score',
        width: TEAM_COLUMN_WIDTHS[3],
        sorter: (a, b) => (a.score ?? -1) - (b.score ?? -1),
        sortOrder: teamTableSort.key === 'score' ? teamTableSort.order : null,
        render: (_value: number, record) => aggregateScoreCell(record),
      },
      {
        title: progressHeader,
        key: 'progress',
        width: TEAM_COLUMN_WIDTHS[4],
        render: (_value, record) =>
          progressCell(
            record.painPending,
            record.painInProgress,
            record.painResolved,
            (bucket) =>
              openPainDetails({
                type: 'team',
                name: record.name,
                bucket,
              })
          ),
      },
      {
        title: '问题数',
        key: 'painTotal',
        width: TEAM_COLUMN_WIDTHS[5],
        sorter: (a, b) => a.painTotal - b.painTotal,
        sortOrder:
          teamTableSort.key === 'painTotal' ? teamTableSort.order : null,
        render: (_value, record) => (
          <button
            type="button"
            className="overview-table-link overview-table-link-strong"
            onClick={(event) => {
              event.stopPropagation();
              openPainDetails({ type: 'team', name: record.name });
            }}
          >
            {record.painTotal}
          </button>
        ),
      },
      {
        title: '闭环率',
        dataIndex: 'closeRate',
        key: 'closeRate',
        width: TEAM_COLUMN_WIDTHS[6],
        sorter: (a, b) => a.closeRate - b.closeRate,
        sortOrder:
          teamTableSort.key === 'closeRate' ? teamTableSort.order : null,
        render: (value: number) => closeRateCell(value),
      },
      {
        title: '最新报告',
        key: 'report',
        width: TEAM_COLUMN_WIDTHS[7],
        sorter: (a, b) =>
          teamReportSortName(a).localeCompare(teamReportSortName(b), 'zh-CN'),
        sortOrder: teamTableSort.key === 'report' ? teamTableSort.order : null,
        render: () => (
          <span className="text-[var(--overview-slateLight)]">-</span>
        ),
      },
    ],
    [aggregateScoreCell, expandedRowKeys, progressHeader, teamTableSort]
  );

  const renderExpandedRepoRow = (
    repo: IssueOverviewRepo,
    index: number,
    nested = false
  ) => (
    <tr
      key={`${repo.community}-${repo.period}`}
      className="overview-expanded-row"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <td className="overview-expanded-cell overview-expanded-cell-index" />
      <td className="overview-expanded-cell overview-expanded-cell-name">
        <span
          className="overview-expanded-repo-name"
          style={nested ? { paddingLeft: 20 } : undefined}
        >
          {repo.repoShort}
        </span>
      </td>
      <td className="overview-expanded-cell overview-expanded-cell-empty">-</td>
      <td className="overview-expanded-cell">{repoScoreCell(repo)}</td>
      <td className="overview-expanded-cell">
        {progressCell(
          repo.painPending,
          repo.painInProgress,
          repo.painResolved,
          (bucket) => openPainDetails({ type: 'repo', repo, bucket })
        )}
      </td>
      <td className="overview-expanded-cell">
        <button
          type="button"
          className="overview-table-link overview-table-link-strong"
          onClick={() => openPainDetails({ type: 'repo', repo })}
        >
          {repo.painTotal}
        </button>
      </td>
      <td className="overview-expanded-cell">
        {closeRateCell(repo.painCloseRate)}
      </td>
      <td className="overview-expanded-cell">
        <Link
          href={reportHref(repo.community, repo.period)}
          className="overview-table-link"
        >
          {reportDateLabel(repo.period)}
        </Link>
      </td>
    </tr>
  );

  const renderExpandedTeam = (team: TeamRow) => {
    if (teamLoadingByName.get(team.name)) {
      return (
        <div className="overview-expanded-rows px-4 py-3">
          <Skeleton active title={false} paragraph={{ rows: 3 }} />
        </div>
      );
    }
    if (!team.repos.length) {
      return (
        <div className="overview-expanded-rows px-4 py-3 text-sm text-[var(--overview-slateLight)]">
          暂无仓库数据
        </div>
      );
    }
    const grouped = team.name === '算子';
    const sections = grouped
      ? groupOperatorRepos(team.repos)
      : [{ key: 'all', label: '', repos: team.repos }];
    return (
      <div className="overview-expanded-rows">
        <table
          className="overview-expanded-table"
          style={{ minWidth: TEAM_TABLE_WIDTH }}
        >
          <colgroup>
            {TEAM_COLUMN_WIDTHS.map((width, index) => (
              <col key={index} style={{ width }} />
            ))}
          </colgroup>
          <tbody>
            {sections.map((section) => {
              const aggregate = buildAggregateRow(section.label, section.repos);
              const latestRepo = [...section.repos].sort(
                (left, right) =>
                  right.period.localeCompare(left.period) ||
                  right.repoShort.localeCompare(left.repoShort, 'zh-CN')
              )[0];
              return (
                <React.Fragment key={section.key}>
                  {grouped ? (
                    <tr className="overview-category-row">
                      <td className="overview-expanded-cell" />
                      <td className="overview-expanded-cell overview-expanded-cell-name">
                        <button
                          type="button"
                          className="overview-expand-label w-full text-left text-sm text-[var(--overview-slateDark)]"
                          aria-expanded={
                            !collapsedCategories.includes(section.key)
                          }
                          onClick={() =>
                            setCollapsedCategories((previous) =>
                              previous.includes(section.key)
                                ? previous.filter((key) => key !== section.key)
                                : [...previous, section.key]
                            )
                          }
                        >
                          <RightOutlined
                            className={`overview-expand-icon ${
                              collapsedCategories.includes(section.key)
                                ? ''
                                : 'is-expanded'
                            }`}
                          />
                          {section.label}
                        </button>
                      </td>
                      <td className="overview-expanded-cell">
                        {section.repos.length} 个
                      </td>
                      <td className="overview-expanded-cell">
                        {section.repos.length
                          ? aggregateScoreCell(aggregate)
                          : '-'}
                      </td>
                      <td className="overview-expanded-cell">
                        {section.repos.length
                          ? progressCell(
                              aggregate.painPending,
                              aggregate.painInProgress,
                              aggregate.painResolved,
                              (bucket) =>
                                openPainDetails({
                                  type: 'category',
                                  name: section.label,
                                  repos: section.repos,
                                  bucket,
                                })
                            )
                          : '-'}
                      </td>
                      <td className="overview-expanded-cell">
                        {section.repos.length ? (
                          <button
                            type="button"
                            className="overview-table-link overview-table-link-strong"
                            onClick={() =>
                              openPainDetails({
                                type: 'category',
                                name: section.label,
                                repos: section.repos,
                              })
                            }
                          >
                            {aggregate.painTotal}
                          </button>
                        ) : (
                          0
                        )}
                      </td>
                      <td className="overview-expanded-cell">
                        {section.repos.length
                          ? closeRateCell(aggregate.closeRate)
                          : '-'}
                      </td>
                      <td className="overview-expanded-cell">
                        {latestRepo ? (
                          <Link
                            href={reportHref(
                              latestRepo.community,
                              latestRepo.period
                            )}
                            className="overview-table-link"
                          >
                            {reportDateLabel(latestRepo.period)}
                          </Link>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ) : null}
                  {(!grouped || !collapsedCategories.includes(section.key)) &&
                    section.repos.map((repo, index) =>
                      renderExpandedRepoRow(repo, index, grouped)
                    )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <Title level={4} className="oj-section-title">
        各仓库对比
      </Title>
      <div className="section-card">
        <div className="tab-bar progress-toolbar-row">
          <Segmented
            className="overview-segmented"
            value={view}
            onChange={(value) => setView(value as ProgressView)}
            options={[
              { label: '责任团队', value: 'team' },
              { label: '仓库', value: 'repo' },
            ]}
          />
          <Link
            href={repoManagementHref}
            className="ml-auto inline-flex items-center rounded-full border border-[rgba(var(--overview-slateBorder-rgb),0.8)] bg-[linear-gradient(180deg,var(--overview-white)_0%,var(--overview-slateSoft)_100%)] px-3 py-1.5 text-sm font-semibold text-[var(--overview-slateDark)] shadow-[0_2px_6px_rgba(var(--overview-text-rgb),0.06)] transition-colors hover:bg-[var(--overview-slateSoft)]"
          >
            仓库管理
          </Link>
          <Link
            href={buildIssueTaskManagementHref({ org })}
            className="inline-flex items-center rounded-full border border-[rgba(var(--overview-slateBorder-rgb),0.8)] bg-[linear-gradient(180deg,var(--overview-white)_0%,var(--overview-slateSoft)_100%)] px-3 py-1.5 text-sm font-semibold text-[var(--overview-slateDark)] shadow-[0_2px_6px_rgba(var(--overview-text-rgb),0.06)] transition-colors hover:bg-[var(--overview-slateSoft)]"
          >
            任务管理
          </Link>
        </div>
        {view === 'team' ? (
          <Table<TeamRow>
            className="overview-ant-table"
            dataSource={displayedTeamRows}
            columns={teamColumns}
            rowKey="id"
            pagination={false}
            tableLayout="fixed"
            scroll={{ x: TEAM_TABLE_WIDTH }}
            locale={{ emptyText: '暂无责任团队数据' }}
            onChange={(_pagination, _filters, sorter) => {
              const activeSorter = Array.isArray(sorter) ? sorter[0] : sorter;
              setProgressSortKey('none');
              setTeamTableSort({
                key: activeSorter.columnKey as TeamTableSortKey | undefined,
                order: activeSorter.order ?? null,
              });
            }}
            expandable={{
              expandedRowKeys: expandAllTeams
                ? teamRows.map((team) => team.id)
                : expandedRowKeys,
              expandRowByClick: true,
              showExpandColumn: false,
              onExpandedRowsChange: (keys) => setExpandedRowKeys([...keys]),
              expandedRowRender: renderExpandedTeam,
              rowExpandable: (team) => team.repoCount > 0,
            }}
          />
        ) : (
          <>
            <Table<IssueOverviewRepo>
              className="overview-ant-table"
              dataSource={sortByProgress(repoRows)}
              columns={repoColumns}
              rowKey={(repo) => `${repo.community}-${repo.period}`}
              loading={repoQuery.isLoading || repoTrendQuery.isLoading}
              pagination={false}
              tableLayout="fixed"
              scroll={{ x: 1152 }}
              locale={{ emptyText: '暂无仓库数据' }}
            />
            <div className="mt-3 flex items-center justify-end gap-3">
              <span className="text-xs text-[var(--overview-slate)]">
                共 {repoQuery.data?.total ?? 0} 个仓库
              </span>
              <Pagination
                current={repoPage}
                pageSize={REPO_PAGE_SIZE}
                total={repoQuery.data?.total ?? 0}
                showSizeChanger={false}
                size="small"
                onChange={setRepoPage}
              />
            </div>
          </>
        )}
      </div>
      <IssuePainDetailModal
        open={detailTarget !== null}
        onClose={() => setDetailTarget(null)}
        query={detailQuery}
        stageOptions={stageOptions}
        org={org}
        reportHref={reportHref}
        title={
          detailTarget
            ? `${
                detailTarget.type === 'team' || detailTarget.type === 'category'
                  ? detailTarget.name
                  : detailTarget.repo.repoShort
              } · ${
                detailTarget.bucket
                  ? PROGRESS_BUCKET_LABELS[detailTarget.bucket]
                  : '问题数'
              }`
            : '问题详情'
        }
      />
    </>
  );
};

export default IssueRepoProgressSection;
