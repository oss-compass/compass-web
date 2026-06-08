import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Grid, Segmented, Select, Table, Typography } from 'antd';
import { CheckOutlined, FilterFilled, RightOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { SEVERITY_CFG } from './constants';
import { IssueProgressBar } from './ProgressComponents';
import CloseRateTrendModal from './CloseRateTrendModal';
import { CloseRateSparkline } from './CloseRateTrendChart';
import { buildCloseRateTrend } from './closeRateTrend';
import type { CloseRateTrendPoint } from './closeRateTrend';
import type {
  DashboardIssue,
  IssueBucket,
  MetricSummary,
  ProgressTab,
  ProgressView,
  RepoProgressRow,
  RepoSortKey,
  Severity,
  TeamProgressRow,
  TeamSortKey,
} from './types';
import { compassApiUrl } from '../rawData/apiClient';
import {
  buildMetricSummaryFromPainRows,
  compareTeamNames,
  formatExecutionTime,
  formatPercent,
  formatScore,
  normalizeSeverity,
} from './utils';

const { Link, Title } = Typography;
type ProgressMetricSortKey = 'none' | 'pending' | 'inProgress' | 'resolved';
type ProgressMetricSortOrder = 'asc' | 'desc';

type KnownSeverity = Exclude<Severity, ''>;

const SEVERITY_ORDER: KnownSeverity[] = [
  'P0_BLOCKER',
  'P1_CRITICAL',
  'P2_MAJOR',
  'P3_MINOR',
];

const BEAT_REPO_IDS = new Set([
  'cann_atvoss',
  'cann_ops_tensor',
  'cann_ops_rand',
  'cann_ops_fft',
  'cann_ops_collections',
]);

const normalizeRepoId = (value: unknown) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/-/g, '_');

const isBeatRepo = (value: unknown) =>
  BEAT_REPO_IDS.has(normalizeRepoId(value));

const compareBeatLast = (leftId: unknown, rightId: unknown) => {
  const leftBeat = isBeatRepo(leftId);
  const rightBeat = isBeatRepo(rightId);
  if (leftBeat === rightBeat) return 0;
  return leftBeat ? 1 : -1;
};

const PROGRESS_METRIC_OPTIONS: Array<{
  value: ProgressMetricSortKey;
  label: string;
}> = [
  { value: 'none', label: '不排序（默认）' },
  { value: 'pending', label: '待处理' },
  { value: 'inProgress', label: '进行中' },
  { value: 'resolved', label: '已闭环' },
];

const PROGRESS_ORDER_OPTIONS: Array<{
  value: ProgressMetricSortOrder;
  label: string;
}> = [
  { value: 'asc', label: '升序' },
  { value: 'desc', label: '降序' },
];

const PROGRESS_LABEL_MAP: Record<
  Exclude<ProgressMetricSortKey, 'none'>,
  string
> = {
  pending: '待处理',
  inProgress: '进行中',
  resolved: '已闭环',
};

type ProgressSortHeaderProps = {
  sortKey: ProgressMetricSortKey;
  sortOrder: ProgressMetricSortOrder;
  onSortKeyChange: (next: ProgressMetricSortKey) => void;
  onSortOrderChange: (next: ProgressMetricSortOrder) => void;
};

const ProgressSortHeader: React.FC<ProgressSortHeaderProps> = ({
  sortKey,
  sortOrder,
  onSortKeyChange,
  onSortOrderChange,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleDocClick = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const titleSuffix =
    sortKey === 'none'
      ? '设置排序'
      : `已按${PROGRESS_LABEL_MAP[sortKey]}${
          sortOrder === 'asc' ? '正序' : '逆序'
        }排序`;

  return (
    <span
      ref={wrapperRef}
      className="inline-flex items-center gap-1"
      style={{ position: 'relative' }}
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <span>问题处理进展</span>
      <button
        type="button"
        aria-label="设置问题处理进展排序"
        title={titleSuffix}
        className={`inline-flex h-5 w-5 items-center justify-center rounded transition-colors ${
          sortKey !== 'none'
            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
        }`}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <FilterFilled className="text-[12px]" />
      </button>
      {open ? (
        <div
          className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            zIndex: 1050,
            width: 220,
          }}
          onClick={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="mb-2 text-xs font-semibold text-slate-500">
            排序指标
          </div>
          <div className="flex flex-col gap-1">
            {PROGRESS_METRIC_OPTIONS.map((option) => {
              const active = sortKey === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                    active
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onSortKeyChange(option.value);
                  }}
                >
                  <span>{option.label}</span>
                  {active ? <CheckOutlined className="text-xs" /> : null}
                </button>
              );
            })}
          </div>
          <div className="mb-2 mt-3 text-xs font-semibold text-slate-500">
            排序方向
          </div>
          <div className="grid grid-cols-2 gap-2">
            {PROGRESS_ORDER_OPTIONS.map((option) => {
              const active = sortOrder === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`flex items-center justify-center rounded-md border px-3 py-2 text-sm transition-colors ${
                    active
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onSortOrderChange(option.value);
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </span>
  );
};

type RepoProgressSectionProps = {
  progressView: ProgressView;
  onProgressViewChange: (view: ProgressView) => void;
  currentTab: ProgressTab;
  onTabChange: (tab: ProgressTab) => void;
  captureMode?: boolean;
  autoExpandAllTeams?: boolean;
  org?: string;
  commonOnly?: boolean | null;
  repoFilter: string;
  repoOptions: Array<{ value: string; label: string }>;
  onRepoFilterChange: (repo: string) => void;
  teamFilter: string;
  teamOptions: string[];
  onTeamFilterChange: (team: string) => void;
  isLoading: boolean;
  teamRows: TeamProgressRow[];
  repoRows: RepoProgressRow[];
  repoSortKey: RepoSortKey;
  repoSortAsc: boolean;
  repoSortArrow: (key: RepoSortKey) => string;
  teamSortArrow: (key: TeamSortKey) => string;
  teamSortKey: TeamSortKey;
  teamSortAsc: boolean;
  onRepoSort: (key: RepoSortKey) => void;
  onTeamSort: (key: TeamSortKey) => void;
  onOpenRepoIssues: (
    row: RepoProgressRow,
    bucket: 'pending' | 'inProgress' | 'resolved' | 'na' | 'total'
  ) => void;
  onOpenTeamIssues: (
    row: TeamProgressRow,
    bucket: IssueBucket | 'total'
  ) => void;
};

const RepoProgressSection: React.FC<RepoProgressSectionProps> = ({
  progressView,
  onProgressViewChange,
  currentTab,
  onTabChange: _onTabChange,
  captureMode = false,
  autoExpandAllTeams = false,
  org,
  commonOnly,
  repoFilter,
  repoOptions,
  onRepoFilterChange,
  teamFilter,
  teamOptions,
  onTeamFilterChange,
  isLoading,
  teamRows,
  repoRows,
  repoSortKey,
  repoSortAsc,
  repoSortArrow,
  teamSortArrow,
  teamSortKey,
  teamSortAsc,
  onRepoSort,
  onTeamSort,
  onOpenRepoIssues,
  onOpenTeamIssues,
}) => {
  const screens = Grid.useBreakpoint();
  const repoWidthScale = screens.xxl
    ? 1
    : screens.xl
    ? 0.92
    : screens.lg
    ? 0.86
    : 0.78;
  const rw = (base: number, min: number) =>
    Math.max(min, Math.round(base * repoWidthScale));
  const repoColumnWidths = useMemo<number[]>(
    () => [
      rw(40, 30),
      rw(80, 70),
      rw(60, 50),
      rw(70, 60),
      rw(70, 60),
      rw(70, 60),
      rw(160, 140),
      rw(40, 30),
      rw(80, 70),
      rw(60, 50),
    ],
    [repoWidthScale]
  );
  const repoScrollX = repoColumnWidths.reduce((sum, w) => sum + w, 0);
  const teamColumnWidths = useMemo<number[]>(
    () => [
      rw(40, 30),
      rw(80, 70),
      rw(60, 50),
      rw(70, 60),
      rw(70, 60),
      rw(70, 60),
      rw(160, 140),
      rw(40, 30),
      rw(80, 70),
      rw(60, 50),
    ],
    [repoWidthScale]
  );
  const teamScrollX = teamColumnWidths.reduce((sum, w) => sum + w, 0);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [progressSortKey, setProgressSortKey] =
    useState<ProgressMetricSortKey>('none');
  const [progressSortOrder, setProgressSortOrder] =
    useState<ProgressMetricSortOrder>('desc');
  const [closeRateModal, setCloseRateModal] = useState<{
    open: boolean;
    title: string;
    points: CloseRateTrendPoint[];
  }>({ open: false, title: '', points: [] });

  const [severityFilters, setSeverityFilters] = useState<KnownSeverity[]>(() =>
    currentTab === 'key'
      ? ['P0_BLOCKER', 'P1_CRITICAL']
      : ['P0_BLOCKER', 'P1_CRITICAL', 'P2_MAJOR', 'P3_MINOR']
  );
  const [exportingCsv, setExportingCsv] = useState(false);

  const severityFilterSet = useMemo(
    () => new Set(severityFilters),
    [severityFilters]
  );

  const getFilteredIssues = useCallback(
    (issues: DashboardIssue[]) => {
      if (!severityFilters.length) return issues;
      return issues.filter((issue) =>
        severityFilterSet.has(
          normalizeSeverity(issue.severity) as KnownSeverity
        )
      );
    },
    [severityFilterSet, severityFilters.length]
  );

  const repoDerived = useMemo(() => {
    const map = new Map<
      string,
      {
        issues: DashboardIssue[];
        metrics: MetricSummary;
        trend: CloseRateTrendPoint[];
      }
    >();
    repoRows.forEach((row) => {
      const issues = getFilteredIssues(row.issues);
      map.set(row.id, {
        issues,
        metrics: buildMetricSummaryFromPainRows(issues),
        trend: buildCloseRateTrend(issues, 7),
      });
    });
    return map;
  }, [getFilteredIssues, repoRows]);

  const teamDerived = useMemo(() => {
    const map = new Map<
      string,
      {
        issues: DashboardIssue[];
        metrics: MetricSummary;
        trend: CloseRateTrendPoint[];
      }
    >();
    teamRows.forEach((row) => {
      const issues = getFilteredIssues(row.issues);
      map.set(row.id, {
        issues,
        metrics: buildMetricSummaryFromPainRows(issues),
        trend: buildCloseRateTrend(issues, 7),
      });
    });
    return map;
  }, [getFilteredIssues, teamRows]);

  const sortedByProgressMetric = useCallback(
    <T extends RepoProgressRow | TeamProgressRow>(rows: T[]) => {
      if (progressSortKey === 'none') return rows;
      const direction = progressSortOrder === 'asc' ? 1 : -1;
      return [...rows].sort((left, right) => {
        if (!('repos' in left) && !('repos' in right)) {
          const beatCmp = compareBeatLast(left.id, right.id);
          if (beatCmp !== 0) return beatCmp;
        }

        const leftMetrics =
          ('repos' in left ? teamDerived : repoDerived).get(left.id)?.metrics ??
          buildMetricSummaryFromPainRows(getFilteredIssues(left.issues));
        const rightMetrics =
          ('repos' in right ? teamDerived : repoDerived).get(right.id)
            ?.metrics ??
          buildMetricSummaryFromPainRows(getFilteredIssues(right.issues));

        const leftValue = leftMetrics[progressSortKey] ?? 0;
        const rightValue = rightMetrics[progressSortKey] ?? 0;
        if (leftValue !== rightValue) {
          return (leftValue - rightValue) * direction;
        }
        return String(left.name || '').localeCompare(
          String(right.name || ''),
          'zh-Hans-CN',
          {
            sensitivity: 'base',
          }
        );
      });
    },
    [
      getFilteredIssues,
      progressSortKey,
      progressSortOrder,
      repoDerived,
      teamDerived,
    ]
  );

  const handleRepoSortWithReset = useCallback(
    (key: RepoSortKey) => {
      setProgressSortKey('none');
      onRepoSort(key);
    },
    [onRepoSort]
  );

  const handleTeamSortWithReset = useCallback(
    (key: TeamSortKey) => {
      setProgressSortKey('none');
      onTeamSort(key);
    },
    [onTeamSort]
  );

  const progressHeaderTitle = (
    <ProgressSortHeader
      sortKey={progressSortKey}
      sortOrder={progressSortOrder}
      onSortKeyChange={setProgressSortKey}
      onSortOrderChange={setProgressSortOrder}
    />
  );

  const renderMetricBar = (
    value: number | null,
    formatter: (next: number | null) => string,
    colorClassName: string
  ) => (
    <div className="overview-bar-cell">
      <span className="overview-bar-value">{formatter(value)}</span>
      <div className="overview-bar-track" style={{ maxWidth: 44 }}>
        <span
          className={`overview-bar-fill ${colorClassName}`}
          style={{ width: `${Math.max(0, Math.min(value ?? 0, 100))}%` }}
        />
      </div>
    </div>
  );

  const renderDetailLink = (record: RepoProgressRow) => {
    const fileKey = record.latestReportId;
    const reportUrl = fileKey
      ? `/intelligent-analysis/community-experience?project=${encodeURIComponent(
          fileKey
        )}`
      : '';
    const displayText = (() => {
      if (!fileKey) return '';
      const last = fileKey.lastIndexOf('_');
      if (last <= 0) return fileKey;
      const prev = fileKey.lastIndexOf('_', last - 1);
      if (prev < 0 || prev + 1 >= fileKey.length) return fileKey;
      return fileKey.slice(prev + 1);
    })();

    return fileKey ? (
      <Link href={reportUrl} className="overview-table-link">
        {displayText}
      </Link>
    ) : (
      <span className="text-slate-300">--</span>
    );
  };

  const sortableTitle = (label: string, arrow: string) => (
    <span className="sortable-col-title">
      {label}
      <span className="sort-arrow">{arrow}</span>
    </span>
  );

  const repoColumns = useMemo<TableProps<RepoProgressRow>['columns']>(
    () => [
      {
        title: '序号',
        key: 'index',
        width: repoColumnWidths[0],
        render: (_value, _record, index) => (
          <span className="row-num">{index + 1}</span>
        ),
      },
      {
        title: sortableTitle('仓库', repoSortArrow('name')),
        dataIndex: 'name',
        key: 'name',
        width: repoColumnWidths[1],
        ellipsis: true,
        render: (value, record) => (
          <span className="inline-flex flex-col">
            <span>{value}</span>
            {isBeatRepo(record.id) ? (
              <span className="text-slate-400">(仅支持950，内测中)</span>
            ) : null}
          </span>
        ),
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('name'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('责任团队', repoSortArrow('team')),
        dataIndex: 'team',
        key: 'team',
        width: repoColumnWidths[2],
        ellipsis: true,
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('team'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('综合体验评分', repoSortArrow('score')),
        key: 'score',
        width: repoColumnWidths[3],
        render: (_value, record) =>
          isBeatRepo(record.id) ? (
            <span className="text-slate-400">-</span>
          ) : (
            renderMetricBar(record.score, formatScore, 'overview-bar-blue')
          ),
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('score'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('端到端成功率', repoSortArrow('successRate')),
        key: 'successRate',
        width: repoColumnWidths[4],
        render: (_value, record) =>
          isBeatRepo(record.id) ? (
            <span className="text-slate-400">-</span>
          ) : (
            formatPercent(record.successRate)
          ),
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('successRate'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('开发者旅程耗时', repoSortArrow('executionTime')),
        key: 'executionTime',
        width: repoColumnWidths[5],
        render: (_value, record) =>
          isBeatRepo(record.id) ? (
            <span className="text-slate-400">-</span>
          ) : (
            formatExecutionTime(record.executionTime)
          ),
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('executionTime'),
          className: 'sortable-col',
        }),
      },
      {
        title: progressHeaderTitle,
        key: 'progress',
        width: repoColumnWidths[6],
        render: (_value, record) => {
          if (isBeatRepo(record.id)) {
            return <span className="text-slate-400">-</span>;
          }
          const derived = repoDerived.get(record.id);
          const metrics = derived?.metrics ?? record.overall;
          const rowForModal = derived
            ? ({ ...record, issues: derived.issues } as RepoProgressRow)
            : record;
          return (
            <IssueProgressBar
              pending={metrics.pending}
              inProgress={metrics.inProgress}
              resolved={metrics.resolved}
              onBucketClick={(bucket) => onOpenRepoIssues(rowForModal, bucket)}
            />
          );
        },
      },
      {
        title: sortableTitle('总问题数', repoSortArrow('total')),
        key: 'total',
        width: repoColumnWidths[7],
        render: (_value, record) => {
          if (isBeatRepo(record.id)) {
            return <span className="text-slate-400">-</span>;
          }
          const derived = repoDerived.get(record.id);
          const metrics = derived?.metrics ?? record.overall;
          const rowForModal = derived
            ? ({ ...record, issues: derived.issues } as RepoProgressRow)
            : record;
          return (
            <button
              type="button"
              className="overview-table-link overview-table-link-strong"
              onClick={() => onOpenRepoIssues(rowForModal, 'total')}
            >
              {metrics.total}
            </button>
          );
        },
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('total'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('闭环率', repoSortArrow('closeRate')),
        key: 'closeRate',
        width: repoColumnWidths[8],
        render: (_value, record) => {
          if (isBeatRepo(record.id)) {
            return <span className="text-slate-400">-</span>;
          }
          const derived = repoDerived.get(record.id);
          const metrics = derived?.metrics ?? record.overall;
          const trendPoints =
            derived?.trend ?? buildCloseRateTrend(record.issues, 7);
          const displayRate = metrics.total === 0 ? 100 : metrics.closeRate;
          const sparkValues =
            metrics.total === 0
              ? Array.from({ length: 5 }, () => 100)
              : trendPoints.slice(-5).map((point) => point.closeRate);
          return (
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="inline-flex items-center rounded-md transition-colors hover:bg-slate-50"
                title="查看闭环率趋势"
                onClick={(event) => {
                  event.stopPropagation();
                  const modalPoints =
                    metrics.total === 0
                      ? trendPoints.map((point) => ({
                          ...point,
                          closeRate: point.total === 0 ? 100 : point.closeRate,
                        }))
                      : trendPoints;
                  setCloseRateModal({
                    open: true,
                    title: `${record.name} · 闭环率趋势`,
                    points: modalPoints,
                  });
                }}
              >
                <CloseRateSparkline values={sparkValues} />
              </button>
              <span className="text-sm font-semibold tabular-nums text-slate-700">
                {formatPercent(displayRate)}
              </span>
            </div>
          );
        },
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('closeRate'),
          className: 'sortable-col',
        }),
      },
      {
        title: '详细报告',
        key: 'detail',
        width: repoColumnWidths[9],
        render: (_value, record) => renderDetailLink(record),
      },
    ],
    [
      repoColumnWidths,
      onOpenRepoIssues,
      handleRepoSortWithReset,
      repoSortArrow,
      progressHeaderTitle,
      repoDerived,
    ]
  );

  const teamColumns = useMemo<TableProps<TeamProgressRow>['columns']>(
    () => [
      {
        title: '序号',
        key: 'index',
        width: teamColumnWidths[0],
        render: (_value, _record, index) => (
          <span className="row-num">{index + 1}</span>
        ),
      },
      {
        title: sortableTitle('责任团队', teamSortArrow('name')),
        dataIndex: 'name',
        key: 'name',
        width: teamColumnWidths[1],
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
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('name'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('负责仓库', teamSortArrow('repoCount')),
        key: 'repoCount',
        width: teamColumnWidths[2],
        render: (_value, record) => `${record.repoCount} 个`,
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('repoCount'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('综合体验评分', teamSortArrow('score')),
        key: 'score',
        width: teamColumnWidths[3],
        render: (_value, record) =>
          renderMetricBar(record.score, formatScore, 'overview-bar-blue'),
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('score'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('端到端成功率', teamSortArrow('successRate')),
        key: 'successRate',
        width: teamColumnWidths[4],
        render: (_value, record) => formatPercent(record.successRate),
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('successRate'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('开发者旅程耗时', teamSortArrow('executionTime')),
        key: 'executionTime',
        width: teamColumnWidths[5],
        render: (_value, record) => formatExecutionTime(record.executionTime),
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('executionTime'),
          className: 'sortable-col',
        }),
      },
      {
        title: progressHeaderTitle,
        key: 'progress',
        width: teamColumnWidths[6],
        render: (_value, record) => {
          const derived = teamDerived.get(record.id);
          const metrics = derived?.metrics ?? record.overall;
          const rowForModal = derived
            ? ({ ...record, issues: derived.issues } as TeamProgressRow)
            : record;
          return (
            <IssueProgressBar
              pending={metrics.pending}
              inProgress={metrics.inProgress}
              resolved={metrics.resolved}
              onBucketClick={(bucket) => onOpenTeamIssues(rowForModal, bucket)}
            />
          );
        },
      },
      {
        title: sortableTitle('总问题数', teamSortArrow('total')),
        key: 'total',
        width: teamColumnWidths[7],
        render: (_value, record) => {
          const derived = teamDerived.get(record.id);
          const metrics = derived?.metrics ?? record.overall;
          const rowForModal = derived
            ? ({ ...record, issues: derived.issues } as TeamProgressRow)
            : record;
          return (
            <button
              type="button"
              className="overview-table-link overview-table-link-strong"
              onClick={() => onOpenTeamIssues(rowForModal, 'total')}
            >
              {metrics.total}
            </button>
          );
        },
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('total'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('闭环率', teamSortArrow('closeRate')),
        key: 'closeRate',
        width: teamColumnWidths[8],
        render: (_value, record) => {
          const derived = teamDerived.get(record.id);
          const metrics = derived?.metrics ?? record.overall;
          const trendPoints =
            derived?.trend ?? buildCloseRateTrend(record.issues, 7);
          const displayRate = metrics.total === 0 ? 100 : metrics.closeRate;
          const sparkValues =
            metrics.total === 0
              ? Array.from({ length: 5 }, () => 100)
              : trendPoints.slice(-5).map((point) => point.closeRate);
          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center rounded-md p-1 transition-colors hover:bg-slate-50"
                title="查看闭环率趋势"
                onClick={(event) => {
                  event.stopPropagation();
                  const modalPoints =
                    metrics.total === 0
                      ? trendPoints.map((point) => ({
                          ...point,
                          closeRate: point.total === 0 ? 100 : point.closeRate,
                        }))
                      : trendPoints;
                  setCloseRateModal({
                    open: true,
                    title: `${record.name} · 闭环率趋势`,
                    points: modalPoints,
                  });
                }}
              >
                <CloseRateSparkline values={sparkValues} />
              </button>
              <span className="text-sm font-semibold tabular-nums text-slate-700">
                {formatPercent(displayRate)}
              </span>
            </div>
          );
        },
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('closeRate'),
          className: 'sortable-col',
        }),
      },
      {
        title: '最新报告',
        key: 'detail',
        width: teamColumnWidths[9],
        render: () => <span className="text-slate-400">-</span>,
      },
    ],
    [
      expandedRowKeys,
      teamColumnWidths,
      onOpenTeamIssues,
      handleTeamSortWithReset,
      teamSortArrow,
      progressHeaderTitle,
      teamDerived,
    ]
  );

  const getRepoSortValueWithMetrics = useCallback(
    (row: RepoProgressRow, sortKey: RepoSortKey) => {
      const beat = isBeatRepo(row.id);
      const metrics = repoDerived.get(row.id)?.metrics ?? row.overall;
      switch (sortKey) {
        case 'name':
          return row.name;
        case 'team':
          return row.team;
        case 'score':
          return row.score ?? -1;
        case 'successRate':
          return row.successRate ?? -1;
        case 'executionTime':
          return row.executionTime ?? -1;
        case 'total':
          return beat ? -1 : metrics.total;
        case 'closeRate':
          return beat ? -1 : metrics.total === 0 ? 100 : metrics.closeRate;
        default:
          return row.name;
      }
    },
    [repoDerived]
  );

  const getTeamSortValueWithMetrics = useCallback(
    (row: TeamProgressRow, sortKey: TeamSortKey) => {
      const metrics = teamDerived.get(row.id)?.metrics ?? row.overall;
      switch (sortKey) {
        case 'name':
          return row.name;
        case 'repoCount':
          return row.repoCount;
        case 'score':
          return row.score ?? -1;
        case 'successRate':
          return row.successRate ?? -1;
        case 'executionTime':
          return row.executionTime ?? -1;
        case 'total':
          return metrics.total;
        case 'closeRate':
          return metrics.total === 0 ? 100 : metrics.closeRate;
        default:
          return row.name;
      }
    },
    [teamDerived]
  );

  const sortedRepoRowsBySortKey = useMemo(() => {
    const rows = [...repoRows];
    rows.sort((left, right) => {
      const beatCmp = compareBeatLast(left.id, right.id);
      if (beatCmp !== 0) return beatCmp;

      const a = getRepoSortValueWithMetrics(left, repoSortKey);
      const b = getRepoSortValueWithMetrics(right, repoSortKey);
      if (typeof a === 'string' && typeof b === 'string') {
        const result =
          repoSortKey === 'team'
            ? compareTeamNames(a, b) || left.name.localeCompare(right.name)
            : a.localeCompare(b);
        return repoSortAsc ? result : -result;
      }
      const na = Number(a);
      const nb = Number(b);
      const safeA = Number.isFinite(na) ? na : 0;
      const safeB = Number.isFinite(nb) ? nb : 0;
      if (safeA === safeB) return 0;
      return repoSortAsc ? safeA - safeB : safeB - safeA;
    });
    return rows;
  }, [
    compareTeamNames,
    getRepoSortValueWithMetrics,
    repoRows,
    repoSortAsc,
    repoSortKey,
  ]);

  const sortedTeamRowsBySortKey = useMemo(() => {
    const rows = [...teamRows];
    rows.sort((left, right) => {
      const a = getTeamSortValueWithMetrics(left, teamSortKey);
      const b = getTeamSortValueWithMetrics(right, teamSortKey);
      if (typeof a === 'string' && typeof b === 'string') {
        const result = compareTeamNames(a, b);
        return teamSortAsc ? result : -result;
      }
      const na = Number(a);
      const nb = Number(b);
      const safeA = Number.isFinite(na) ? na : 0;
      const safeB = Number.isFinite(nb) ? nb : 0;
      if (safeA === safeB) return 0;
      return teamSortAsc ? safeA - safeB : safeB - safeA;
    });
    return rows;
  }, [
    compareTeamNames,
    getTeamSortValueWithMetrics,
    teamRows,
    teamSortAsc,
    teamSortKey,
  ]);

  const displayedRepoRows = useMemo(
    () => sortedByProgressMetric(sortedRepoRowsBySortKey),
    [sortedByProgressMetric, sortedRepoRowsBySortKey]
  );

  const displayedTeamRows = useMemo(
    () => sortedByProgressMetric(sortedTeamRowsBySortKey),
    [sortedByProgressMetric, sortedTeamRowsBySortKey]
  );

  useEffect(() => {
    if (!autoExpandAllTeams || progressView !== 'team') return;
    const nextKeys = displayedTeamRows.map((row) => row.id);
    setExpandedRowKeys((prev) => {
      if (
        prev.length === nextKeys.length &&
        prev.every((key, index) => key === nextKeys[index])
      ) {
        return prev;
      }
      return nextKeys;
    });
  }, [autoExpandAllTeams, displayedTeamRows, progressView]);

  const renderExpandedRepoRows = useCallback(
    (repos: RepoProgressRow[]) => {
      // 按 teamSortKey 对仓库列表排序（repoCount 不适用于单仓库，跳过）
      let sortedRepos = [...repos];
      if (teamSortKey !== 'repoCount') {
        const repoKey = teamSortKey as RepoSortKey;
        sortedRepos.sort((a, b) => {
          const beatCmp = compareBeatLast(a.id, b.id);
          if (beatCmp !== 0) return beatCmp;

          const va = getRepoSortValueWithMetrics(a, repoKey);
          const vb = getRepoSortValueWithMetrics(b, repoKey);
          let cmp = 0;
          if (typeof va === 'string' && typeof vb === 'string') {
            cmp =
              repoKey === 'team'
                ? compareTeamNames(va, vb) || a.name.localeCompare(b.name)
                : va.localeCompare(vb);
          } else {
            cmp = (va as number) - (vb as number);
          }
          return teamSortAsc ? cmp : -cmp;
        });
      }
      const visibleRepos = sortedByProgressMetric(sortedRepos);
      return (
        <div className="overview-expanded-rows">
          <table
            className="overview-expanded-table"
            style={{ minWidth: teamScrollX }}
          >
            <colgroup>
              {teamColumnWidths.map((width, index) => (
                <col key={index} style={{ width }} />
              ))}
            </colgroup>
            <tbody>
              {visibleRepos.map((repo, index) => (
                <tr
                  key={repo.id}
                  className="overview-expanded-row"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="overview-expanded-cell overview-expanded-cell-index" />
                  <td className="overview-expanded-cell overview-expanded-cell-name">
                    <span className="overview-expanded-repo-name">
                      <span className="inline-flex flex-col">
                        <span>{repo.name}</span>
                        {isBeatRepo(repo.id) ? (
                          <span className="text-slate-400">
                            （仅支持950，内测中）
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </td>
                  <td className="overview-expanded-cell overview-expanded-cell-empty">
                    -
                  </td>
                  <td className="overview-expanded-cell">
                    {isBeatRepo(repo.id) ? (
                      <span className="text-slate-400">-</span>
                    ) : (
                      renderMetricBar(
                        repo.score,
                        formatScore,
                        'overview-bar-blue'
                      )
                    )}
                  </td>
                  <td className="overview-expanded-cell">
                    {isBeatRepo(repo.id) ? (
                      <span className="text-slate-400">-</span>
                    ) : (
                      formatPercent(repo.successRate)
                    )}
                  </td>
                  <td className="overview-expanded-cell">
                    {isBeatRepo(repo.id) ? (
                      <span className="text-slate-400">-</span>
                    ) : (
                      formatExecutionTime(repo.executionTime)
                    )}
                  </td>
                  <td className="overview-expanded-cell">
                    {(() => {
                      if (isBeatRepo(repo.id)) {
                        return <span className="text-slate-400">-</span>;
                      }
                      const derived = repoDerived.get(repo.id);
                      const metrics = derived?.metrics ?? repo.overall;
                      const rowForModal = derived
                        ? ({
                            ...repo,
                            issues: derived.issues,
                          } as RepoProgressRow)
                        : repo;
                      return (
                        <IssueProgressBar
                          pending={metrics.pending}
                          inProgress={metrics.inProgress}
                          resolved={metrics.resolved}
                          onBucketClick={(bucket) =>
                            onOpenRepoIssues(rowForModal, bucket)
                          }
                        />
                      );
                    })()}
                  </td>
                  <td className="overview-expanded-cell">
                    {(() => {
                      if (isBeatRepo(repo.id)) {
                        return <span className="text-slate-400">-</span>;
                      }
                      const derived = repoDerived.get(repo.id);
                      const metrics = derived?.metrics ?? repo.overall;
                      const rowForModal = derived
                        ? ({
                            ...repo,
                            issues: derived.issues,
                          } as RepoProgressRow)
                        : repo;
                      return (
                        <button
                          type="button"
                          className="overview-table-link overview-table-link-strong"
                          onClick={() => onOpenRepoIssues(rowForModal, 'total')}
                        >
                          {metrics.total}
                        </button>
                      );
                    })()}
                  </td>
                  <td className="overview-expanded-cell">
                    {(() => {
                      if (isBeatRepo(repo.id)) {
                        return <span className="text-slate-400">-</span>;
                      }
                      const derived = repoDerived.get(repo.id);
                      const metrics = derived?.metrics ?? repo.overall;
                      const trendPoints =
                        derived?.trend ?? buildCloseRateTrend(repo.issues, 7);
                      const displayRate =
                        metrics.total === 0 ? 100 : metrics.closeRate;
                      const sparkValues =
                        metrics.total === 0
                          ? Array.from({ length: 5 }, () => 100)
                          : trendPoints
                              .slice(-5)
                              .map((point) => point.closeRate);
                      return (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md p-1 transition-colors hover:bg-slate-50"
                            title="查看闭环率趋势"
                            onClick={(event) => {
                              event.stopPropagation();
                              const modalPoints =
                                metrics.total === 0
                                  ? trendPoints.map((point) => ({
                                      ...point,
                                      closeRate:
                                        point.total === 0
                                          ? 100
                                          : point.closeRate,
                                    }))
                                  : trendPoints;
                              setCloseRateModal({
                                open: true,
                                title: `${repo.name} · 闭环率趋势`,
                                points: modalPoints,
                              });
                            }}
                          >
                            <CloseRateSparkline values={sparkValues} />
                          </button>
                          <span className="text-sm font-semibold tabular-nums text-slate-700">
                            {formatPercent(displayRate)}
                          </span>
                        </div>
                      );
                    })()}
                  </td>
                  <td className="overview-expanded-cell">
                    {renderDetailLink(repo)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    [
      compareTeamNames,
      getRepoSortValueWithMetrics,
      onOpenRepoIssues,
      repoDerived,
      sortedByProgressMetric,
      teamColumnWidths,
      teamScrollX,
      teamSortKey,
      teamSortAsc,
    ]
  );

  const teamExpandable = useMemo<TableProps<TeamProgressRow>['expandable']>(
    () =>
      captureMode
        ? undefined
        : {
            expandedRowKeys,
            expandRowByClick: true,
            showExpandColumn: false,
            onExpand: (expanded, record) => {
              setExpandedRowKeys((prev) =>
                expanded
                  ? [...prev, record.id]
                  : prev.filter((key) => key !== record.id)
              );
            },
            expandedRowRender: (record) => renderExpandedRepoRows(record.repos),
          },
    [
      captureMode,
      currentTab,
      expandedRowKeys,
      teamColumnWidths,
      onOpenRepoIssues,
      renderExpandedRepoRows,
    ]
  );

  const emptyText =
    progressView === 'team' ? '暂无匹配责任团队' : '暂无匹配仓库';

  const SUMMARY_SELECT_H = 32;
  const filterSelectCls =
    '[&_.ant-select-arrow]:text-slate-500 [&_.ant-select-selection-item]:!text-sm [&_.ant-select-selection-item]:!font-semibold [&_.ant-select-selection-item]:!text-slate-900 [&_.ant-select-selector]:!rounded-r-2xl [&_.ant-select-selector]:!rounded-l-none [&_.ant-select-selector]:!border [&_.ant-select-selector]:!border-l-0 [&_.ant-select-selector]:!border-slate-200/80 [&_.ant-select-selector]:!bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] [&_.ant-select-selector]:!px-3 [&_.ant-select-selector]:!shadow-[0_2px_6px_rgba(15,23,42,0.06)] [&_.ant-select-selection-item]:!flex [&_.ant-select-selection-item]:!items-center';
  const FilterLabelTag: React.FC<{ text: string }> = ({ text }) => (
    <span
      style={{ height: SUMMARY_SELECT_H, lineHeight: `${SUMMARY_SELECT_H}px` }}
      className="inline-flex items-center whitespace-nowrap rounded-l-2xl border border-r-0 border-slate-200/80 bg-slate-50 px-2.5 text-xs font-medium text-slate-500 shadow-[0_2px_6px_rgba(15,23,42,0.06)]"
    >
      {text}
    </span>
  );

  const downloadBlob = (blob: Blob, filename: string) => {
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(href);
  };

  const parseFilenameFromDisposition = (value: string | null) => {
    if (!value) return '';
    const match = value.match(/filename="([^"]+)"/i);
    if (match?.[1]) return match[1];
    return '';
  };

  const handleExportCsv = async () => {
    if (exportingCsv) return;
    setExportingCsv(true);
    try {
      const search = new URLSearchParams();
      if (org) search.set('org', org);
      search.set('tab', currentTab);
      search.set('include_common_issues', 'true');
      if (commonOnly !== undefined && commonOnly !== null) {
        search.set('common_only', String(commonOnly));
      }
      if (teamFilter) search.set('team', teamFilter);
      if (repoFilter) search.set('repo', repoFilter);
      search.set('view', progressView);

      severityFilters.forEach((sev) => search.append('severity', sev));

      const isRepoView = progressView === 'repo';
      search.set('sort_key', isRepoView ? repoSortKey : teamSortKey);
      search.set(
        'sort_order',
        isRepoView
          ? repoSortAsc
            ? 'asc'
            : 'desc'
          : teamSortAsc
          ? 'asc'
          : 'desc'
      );
      search.set('progress_metric', progressSortKey);
      search.set('progress_metric_order', progressSortOrder);

      const url = compassApiUrl(
        `/overview/progress/export-csv?${search.toString()}`
      );
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`导出失败：${res.status} ${res.statusText}`);
      }
      const blob = await res.blob();
      const filename =
        parseFilenameFromDisposition(res.headers.get('content-disposition')) ||
        `progress_${progressView}.csv`;
      downloadBlob(blob, filename);
    } finally {
      setExportingCsv(false);
    }
  };

  return (
    <>
      <Title level={4} className="oj-section-title">
        进展
      </Title>
      <div className="section-card">
        <div className="tab-bar progress-toolbar-row">
          <Segmented
            className="overview-segmented"
            value={progressView}
            onChange={(value) => onProgressViewChange(value as ProgressView)}
            options={[
              { label: '责任团队', value: 'team' },
              { label: '仓库', value: 'repo' },
            ]}
          />
          <div className="team-filter overview-filter-group">
            <div className="flex items-center">
              <FilterLabelTag text="仓库" />
              <Select
                value={repoFilter || undefined}
                onChange={(value) => onRepoFilterChange(value ?? '')}
                allowClear
                placeholder="全部仓库"
                style={{ height: SUMMARY_SELECT_H }}
                className={`${filterSelectCls} min-w-[140px]`}
                popupMatchSelectWidth={false}
                popupClassName="overview-select-dropdown"
                getPopupContainer={(node) => node.parentElement ?? node}
                options={repoOptions}
              />
            </div>
            <div className="flex items-center">
              <FilterLabelTag text="团队" />
              <Select
                value={teamFilter || undefined}
                onChange={(value) => onTeamFilterChange(value ?? '')}
                allowClear
                placeholder="全部团队"
                style={{ height: SUMMARY_SELECT_H }}
                className={`${filterSelectCls} min-w-[140px]`}
                popupMatchSelectWidth={false}
                popupClassName="overview-select-dropdown"
                getPopupContainer={(node) => node.parentElement ?? node}
                options={teamOptions.map((team) => ({
                  value: team,
                  label: team,
                }))}
              />
            </div>
            <div className="flex items-center">
              <FilterLabelTag text="严重程度" />
              <Select
                mode="multiple"
                value={severityFilters}
                onChange={(values) =>
                  setSeverityFilters(values as Exclude<Severity, ''>[])
                }
                allowClear
                placeholder="全部严重程度"
                maxTagCount="responsive"
                style={{ height: SUMMARY_SELECT_H }}
                className={`${filterSelectCls} min-w-[220px]`}
                popupMatchSelectWidth={false}
                popupClassName="overview-select-dropdown"
                getPopupContainer={(node) => node.parentElement ?? node}
                options={SEVERITY_ORDER.map((severity) => ({
                  value: severity,
                  label: SEVERITY_CFG[severity].label,
                }))}
              />
            </div>
            <button
              type="button"
              disabled={exportingCsv}
              className="inline-flex items-center rounded-full border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-[0_2px_6px_rgba(15,23,42,0.06)] transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleExportCsv}
            >
              {exportingCsv ? '导出中...' : '导出'}
            </button>
          </div>
        </div>

        {progressView === 'team' ? (
          <Table<TeamProgressRow>
            className="overview-ant-table"
            loading={isLoading}
            dataSource={displayedTeamRows}
            columns={teamColumns}
            rowKey="id"
            pagination={false}
            scroll={{ x: teamScrollX }}
            tableLayout="fixed"
            locale={{ emptyText }}
            expandable={teamExpandable}
          />
        ) : (
          <Table<RepoProgressRow>
            className="overview-ant-table"
            loading={isLoading}
            dataSource={displayedRepoRows}
            columns={repoColumns}
            rowKey="id"
            pagination={false}
            scroll={{ x: repoScrollX }}
            tableLayout="fixed"
            locale={{ emptyText }}
          />
        )}
      </div>
      <CloseRateTrendModal
        open={closeRateModal.open}
        title={closeRateModal.title}
        points={closeRateModal.points}
        onClose={() =>
          setCloseRateModal({ open: false, title: '', points: [] })
        }
      />
    </>
  );
};

export default RepoProgressSection;
