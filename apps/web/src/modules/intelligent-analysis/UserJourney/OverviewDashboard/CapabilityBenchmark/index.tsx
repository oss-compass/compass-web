import React from 'react';
import { createPortal } from 'react-dom';
import { CheckOutlined, FilterFilled } from '@ant-design/icons';
import { Skeleton, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import type {
  OverviewCapabilityBenchmarkDetails,
  OverviewCapabilityBenchmarkSummary,
} from '../../rawData/apiClient';
import { formatScore } from '../utils';

const { Link } = Typography;

type CapabilityBenchmarkProps = {
  data?: OverviewCapabilityBenchmarkSummary | null;
  isLoading?: boolean;
};

type CapabilityBenchmarkDetailsProps = {
  data?: OverviewCapabilityBenchmarkDetails | null;
  isLoading?: boolean;
};

type BenchmarkDetailRow =
  OverviewCapabilityBenchmarkDetails['detailRows'][number];

const STATUS_LABEL: Record<'lead' | 'tie' | 'lag', string> = {
  lead: '领先',
  tie: '持平',
  lag: '落后',
};

const STATUS_CLASS: Record<string, string> = {
  lead: 'capability-status-lead',
  tie: 'capability-status-tie',
  lag: 'capability-status-lag',
  unknown: 'capability-status-unknown',
};

const formatPairScore = (left: number | null, right: number | null) =>
  `${formatScore(left)}/${formatScore(right)}`;

const getScoreSortValue = (value: number | null | undefined) =>
  typeof value === 'number' && Number.isFinite(value) ? value : -1;

const compareBenchmarkRowsByStageResult = (
  left: BenchmarkDetailRow,
  right: BenchmarkDetailRow,
  order: 'asc' | 'desc'
) => {
  const leftStage = left.stageResult;
  const rightStage = right.stageResult;
  const priority =
    order === 'desc'
      ? (['lead', 'tie', 'lag'] as const)
      : (['lag', 'tie', 'lead'] as const);

  for (const key of priority) {
    if (leftStage[key] !== rightStage[key]) {
      return rightStage[key] - leftStage[key];
    }
  }

  const scoreDiff =
    order === 'desc'
      ? getScoreSortValue(right.cannScore) - getScoreSortValue(left.cannScore)
      : getScoreSortValue(left.cannScore) - getScoreSortValue(right.cannScore);
  if (scoreDiff !== 0) return scoreDiff;
  return left.cannRepoName.localeCompare(right.cannRepoName);
};

const compareBenchmarkRowsByScore = (
  left: BenchmarkDetailRow,
  right: BenchmarkDetailRow,
  order: 'asc' | 'desc'
) => {
  const priority =
    order === 'desc'
      ? (['lead', 'tie', 'lag', 'unknown'] as const)
      : (['lag', 'tie', 'lead', 'unknown'] as const);
  const leftPriority = priority.indexOf(left.scoreStatus);
  const rightPriority = priority.indexOf(right.scoreStatus);

  if (leftPriority !== rightPriority) {
    return leftPriority - rightPriority;
  }

  const scoreDiff =
    order === 'desc'
      ? getScoreSortValue(right.cannScore) - getScoreSortValue(left.cannScore)
      : getScoreSortValue(left.cannScore) - getScoreSortValue(right.cannScore);
  if (scoreDiff !== 0) return scoreDiff;
  return left.cannRepoName.localeCompare(right.cannRepoName);
};

const percent = (value: number, total: number) => {
  if (!total) return 0;
  return Math.max(0, Math.min(100, (value / total) * 100));
};

const getStageCell = (row: BenchmarkDetailRow, key: string) =>
  row.stageScores.find((item) => item.key === key);

const TeamFilterHeader: React.FC<{
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (next: string) => void;
}> = ({ value, options, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLSpanElement>(null);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const [popupStyle, setPopupStyle] = React.useState<React.CSSProperties>({});

  const updatePopupPosition = React.useCallback(() => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const width = 220;
    setPopupStyle({
      position: 'fixed',
      top: rect.bottom + 4,
      left: Math.max(
        8,
        Math.min(rect.right - width, window.innerWidth - width - 8)
      ),
      zIndex: 1050,
      width,
    });
  }, []);

  React.useEffect(() => {
    if (!open) return undefined;
    const handleDocClick = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (
        !wrapperRef.current.contains(event.target as Node) &&
        !popupRef.current?.contains(event.target as Node)
      ) {
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

  React.useEffect(() => {
    if (!open) return undefined;
    updatePopupPosition();
    window.addEventListener('resize', updatePopupPosition);
    window.addEventListener('scroll', updatePopupPosition, true);
    return () => {
      window.removeEventListener('resize', updatePopupPosition);
      window.removeEventListener('scroll', updatePopupPosition, true);
    };
  }, [open, updatePopupPosition]);

  const allOptions = [{ value: '', label: '全部团队' }, ...options];
  const currentLabel =
    options.find((option) => option.value === value)?.label || '全部团队';

  return (
    <span
      ref={wrapperRef}
      className="inline-flex items-center gap-1"
      style={{ position: 'relative' }}
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <span>责任团队</span>
      <button
        type="button"
        aria-label="筛选责任团队"
        title={`当前：${currentLabel}`}
        className={`inline-flex h-5 w-5 items-center justify-center rounded transition-colors ${
          value
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
      {open && typeof document !== 'undefined'
        ? createPortal(
            <div
              ref={popupRef}
              className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg"
              style={popupStyle}
              onClick={(event) => event.stopPropagation()}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="mb-2 text-xs font-semibold text-slate-500">
                责任团队
              </div>
              <div className="flex max-h-72 flex-col gap-1 overflow-auto">
                {allOptions.map((option) => {
                  const active = value === option.value;
                  return (
                    <button
                      key={option.value || '__all__'}
                      type="button"
                      className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                        active
                          ? 'border-blue-200 bg-blue-50 text-blue-700'
                          : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                      }`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onChange(option.value);
                      }}
                    >
                      <span className="min-w-0 truncate">{option.label}</span>
                      {active ? (
                        <CheckOutlined className="ml-2 text-xs" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>,
            document.body
          )
        : null}
    </span>
  );
};

const Legend: React.FC<{
  compact?: boolean;
  withThreshold?: boolean;
  countLabel?: boolean;
}> = ({ compact = false, withThreshold = false, countLabel = false }) => (
  <span className={`capability-legend${compact ? ' compact' : ''}`}>
    <span>
      <i className="capability-dot capability-dot-lead" />
      {withThreshold ? '领先 >5' : countLabel ? '领先仓数' : '领先'}
    </span>
    <span>
      <i className="capability-dot capability-dot-tie" />
      {withThreshold ? '持平 -5~5' : countLabel ? '持平仓数' : '持平'}
    </span>
    <span>
      <i className="capability-dot capability-dot-lag" />
      {withThreshold ? '落后 <-5' : countLabel ? '落后仓数' : '落后'}
    </span>
  </span>
);

const EmptyState = () => (
  <div className="capability-empty">暂无已完成配对的能力对标数据</div>
);

const CapabilityLoadingState = () => (
  <div className="capability-loading">
    <Skeleton active paragraph={{ rows: 4 }} title={false} />
  </div>
);

const CapabilityBenchmarkOverview: React.FC<CapabilityBenchmarkProps> = ({
  data,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="capability-overview-grid">
        <div className="capability-card">
          <div className="capability-card-title">
            <span>各仓库综合体验评分对标结果</span>
            <Legend compact countLabel />
          </div>
          <CapabilityLoadingState />
        </div>
        <div className="capability-card">
          <div className="capability-card-title">
            <span>所有仓库各阶段评分对标结果</span>
            <Legend compact countLabel />
          </div>
          <CapabilityLoadingState />
        </div>
      </div>
    );
  }

  if (!data?.pairCount) {
    return (
      <div className="capability-overview-grid">
        <div className="capability-card">
          <div className="capability-card-title">
            各仓库综合体验评分对标结果
          </div>
          <EmptyState />
        </div>
        <div className="capability-card">
          <div className="capability-card-title">
            所有仓库各阶段评分对标结果
          </div>
          <EmptyState />
        </div>
      </div>
    );
  }

  const total = data.totalScoreResult;
  const totalItems = [
    { key: 'lead' as const, label: '领先仓数', value: total.lead },
    { key: 'tie' as const, label: '持平仓数', value: total.tie },
    { key: 'lag' as const, label: '落后仓数', value: total.lag },
  ];

  return (
    <div className="capability-overview-grid">
      <div className="capability-card">
        <div className="capability-card-title">
          <span>各仓库综合体验评分对标结果</span>
          <Legend compact countLabel />
        </div>
        <div className="capability-stat-grid">
          {totalItems.map((item) => (
            <div
              key={item.key}
              className={`capability-stat-card capability-stat-${item.key}`}
            >
              <span className="capability-stat-value">{item.value}</span>
              <span className="capability-stat-label">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="capability-summary-box">
          总结：当前在
          {total.leadRepos.length ? (
            total.leadRepos.slice(0, 8).map((repo) => (
              <span key={repo} className="capability-repo-tag lead">
                {repo}
              </span>
            ))
          ) : (
            <span className="capability-muted"> 无 </span>
          )}
          等仓库评分优于竞品，在
          {total.lagRepos.length ? (
            total.lagRepos.slice(0, 8).map((repo) => (
              <span key={repo} className="capability-repo-tag lag">
                {repo}
              </span>
            ))
          ) : (
            <span className="capability-muted"> 无 </span>
          )}
          等仓库评分落后竞品。
        </div>
      </div>

      <div className="capability-card">
        <div className="capability-card-title">
          <span>所有仓库各阶段评分对标结果</span>
          <Legend compact countLabel />
        </div>
        <div className="capability-stage-list">
          {data.stageScoreResults.map((item) => (
            <div key={item.key} className="capability-stage-row">
              <div className="capability-stage-label" title={item.label}>
                <strong>{item.shortLabel}</strong>
                <span>{item.description}</span>
              </div>
              <div className="capability-stage-track">
                {(['lead', 'tie', 'lag'] as const).map((key) => {
                  const value = item[key];
                  return (
                    <span
                      key={key}
                      className={`capability-stage-segment ${key}`}
                      style={{ width: `${percent(value, item.total)}%` }}
                      title={`${STATUS_LABEL[key]}：${value}`}
                    >
                      {value || ''}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CapabilityBenchmarkDetails: React.FC<CapabilityBenchmarkDetailsProps> = ({
  data,
  isLoading = false,
}) => {
  const [teamFilter, setTeamFilter] = React.useState('');
  const [sortConfig, setSortConfig] = React.useState<{
    key: 'stageResult' | 'score';
    order: 'asc' | 'desc';
  }>({ key: 'stageResult', order: 'desc' });
  const stageColumns = React.useMemo(
    () =>
      data?.detailRows.find((row) => row.stageScores.length)?.stageScores ?? [],
    [data?.detailRows]
  );
  const teamOptions = React.useMemo(
    () =>
      Array.from(
        new Set(
          (data?.detailRows ?? [])
            .map((row) => row.teamName.trim())
            .filter(Boolean)
        )
      )
        .sort((left, right) => left.localeCompare(right))
        .map((team) => ({ value: team, label: team })),
    [data?.detailRows]
  );
  const displayRows = React.useMemo(
    () =>
      [...(data?.detailRows ?? [])]
        .filter((row) => !teamFilter || row.teamName === teamFilter)
        .sort((left, right) =>
          sortConfig.key === 'stageResult'
            ? compareBenchmarkRowsByStageResult(left, right, sortConfig.order)
            : compareBenchmarkRowsByScore(left, right, sortConfig.order)
        ),
    [data?.detailRows, sortConfig, teamFilter]
  );
  const toggleSort = React.useCallback((key: 'stageResult' | 'score') => {
    setSortConfig((previous) => ({
      key,
      order: previous.key === key && previous.order === 'desc' ? 'asc' : 'desc',
    }));
  }, []);
  const columns = React.useMemo<TableProps<BenchmarkDetailRow>['columns']>(
    () => [
      {
        title: '序号',
        key: 'index',
        fixed: 'left',
        width: 52,
        render: (_value, _record, index) => (
          <span className="row-num">{index + 1}</span>
        ),
      },
      {
        title: '仓库对标',
        key: 'repoPair',
        fixed: 'left',
        width: 230,
        align: 'left',
        render: (_value, record) => (
          <div className="capability-repo-pair">
            <span className="capability-repo-name">{record.cannRepoName}</span>
            <span className="capability-vs">vs</span>
            <span className="capability-repo-name muted">
              {record.benchmarkRepoName}
            </span>
          </div>
        ),
      },
      {
        title: (
          <TeamFilterHeader
            value={teamFilter}
            options={teamOptions}
            onChange={setTeamFilter}
          />
        ),
        dataIndex: 'teamName',
        key: 'teamName',
        width: 120,
        align: 'left',
        ellipsis: true,
        render: (value) => (
          <span className="capability-team-text">{value || '--'}</span>
        ),
      },
      {
        title: (
          <span className="sortable-col-title">
            <span>综合体验评分</span>
            {sortConfig.key === 'score' ? (
              <span className="sort-arrow">
                {sortConfig.order === 'asc' ? '↑' : '↓'}
              </span>
            ) : null}
          </span>
        ),
        key: 'score',
        width: 96,
        onCell: (record) => ({
          className: STATUS_CLASS[record.scoreStatus],
        }),
        render: (_value, record) => (
          <span className="capability-status-value">
            {formatPairScore(record.cannScore, record.benchmarkScore)}
          </span>
        ),
        onHeaderCell: () => ({
          onClick: () => toggleSort('score'),
          className: 'sortable-col',
        }),
      },
      ...stageColumns.map((stage) => ({
        title: (
          <span className="capability-stage-head">
            <strong>{stage.shortLabel}</strong>
            <span>{stage.description}</span>
          </span>
        ),
        key: stage.key,
        width: 96,
        onCell: (record: BenchmarkDetailRow) => ({
          className:
            STATUS_CLASS[getStageCell(record, stage.key)?.status ?? 'unknown'],
        }),
        render: (_value: unknown, record: BenchmarkDetailRow) => {
          const cell = getStageCell(record, stage.key);
          return (
            <span className="capability-status-value">
              {formatPairScore(
                cell?.cannScore ?? null,
                cell?.benchmarkScore ?? null
              )}
            </span>
          );
        },
      })),
      {
        title: (
          <span className="sortable-col-title">
            <span className="capability-stage-result-title">
              <span>各阶段评分对标结果</span>
              <span>（领先/持平/落后）</span>
            </span>
            {sortConfig.key === 'stageResult' ? (
              <span className="sort-arrow">
                {sortConfig.order === 'asc' ? '↑' : '↓'}
              </span>
            ) : null}
          </span>
        ),
        key: 'stageResult',
        width: 150,
        render: (_value, record) => (
          <span className="capability-record">
            <span className="lead">{record.stageResult.lead}</span>
            <span className="slash">/</span>
            <span className="tie">{record.stageResult.tie}</span>
            <span className="slash">/</span>
            <span className="lag">{record.stageResult.lag}</span>
          </span>
        ),
        onHeaderCell: () => ({
          onClick: () => toggleSort('stageResult'),
          className: 'sortable-col',
        }),
      },
      {
        title: '对比报告',
        key: 'report',
        width: 92,
        render: (_value, record) =>
          record.compareReportUrl ? (
            <Link
              href={record.compareReportUrl}
              className="overview-table-link"
            >
              查看
            </Link>
          ) : (
            <span className="capability-muted">--</span>
          ),
      },
    ],
    [sortConfig, stageColumns, teamFilter, teamOptions, toggleSort]
  );

  return (
    <div className="capability-detail-section">
      <div className="capability-section-title-row">
        <Typography.Title level={4} className="oj-section-title">
          各仓库体验对标详情
        </Typography.Title>
      </div>
      <div className="section-card">
        <div className="capability-detail-card-header">
          <Legend withThreshold />
        </div>
        <Table<BenchmarkDetailRow>
          className="overview-ant-table capability-detail-table"
          rowKey="id"
          dataSource={displayRows}
          columns={columns}
          loading={isLoading}
          pagination={false}
          scroll={{ x: 900 }}
          tableLayout="fixed"
          locale={{ emptyText: '暂无已完成配对的能力对标数据' }}
        />
      </div>
    </div>
  );
};

export { CapabilityBenchmarkDetails, CapabilityBenchmarkOverview };

export default CapabilityBenchmarkOverview;
