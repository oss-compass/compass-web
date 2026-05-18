import React, { useCallback, useMemo, useState } from 'react';
import {
  Button,
  Checkbox,
  Grid,
  Segmented,
  Select,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { InfoCircleOutlined, RightOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import type {
  IssueBucket,
  ProgressTab,
  ProgressView,
  RepoProgressRow,
  RepoSortKey,
  TeamProgressRow,
  TeamSortKey,
} from './types';
import { formatExecutionTime, formatPercent, formatScore } from './utils';

const { Link, Title } = Typography;
const renderTabLabel = (label: string, tooltip: string) => (
  <span className="inline-flex items-center gap-1.5">
    <span>{label}</span>
    <Tooltip title={tooltip}>
      <InfoCircleOutlined className="cursor-help text-[13px] text-slate-400 transition-colors hover:text-slate-600" />
    </Tooltip>
  </span>
);

type RepoProgressSectionProps = {
  progressView: ProgressView;
  onProgressViewChange: (view: ProgressView) => void;
  currentTab: ProgressTab;
  onTabChange: (tab: ProgressTab) => void;
  includeCommonIssues: boolean;
  onIncludeCommonIssuesChange: (next: boolean) => void;
  repoFilter: string;
  repoOptions: Array<{ value: string; label: string }>;
  onRepoFilterChange: (repo: string) => void;
  teamFilter: string;
  teamOptions: string[];
  onTeamFilterChange: (team: string) => void;
  isLoading: boolean;
  teamRows: TeamProgressRow[];
  repoRows: RepoProgressRow[];
  repoSortArrow: (key: RepoSortKey) => string;
  teamSortArrow: (key: TeamSortKey) => string;
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
  onTabChange,
  includeCommonIssues,
  onIncludeCommonIssuesChange,
  repoFilter,
  repoOptions,
  onRepoFilterChange,
  teamFilter,
  teamOptions,
  onTeamFilterChange,
  isLoading,
  teamRows,
  repoRows,
  repoSortArrow,
  teamSortArrow,
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
      rw(200, 190),
      rw(40, 30),
      rw(60, 50),
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
      rw(200, 190),
      rw(40, 30),
      rw(60, 50),
      rw(60, 50),
    ],
    [repoWidthScale]
  );
  const teamScrollX = teamColumnWidths.reduce((sum, w) => sum + w, 0);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

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
          style={{ width: `${Math.max(0, Math.min(value ?? 0, 50))}%` }}
        />
      </div>
    </div>
  );

  const renderCircularProgress = (value: number | null) => {
    const safeValue =
      value == null ? 0 : Math.max(0, Math.min(Number(value.toFixed(1)), 100));
    const ringColor =
      safeValue < 50 ? '#ef4444' : safeValue > 80 ? '#10b981' : '#f59e0b';
    const size = 24;
    const radius = (size - 4) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - safeValue / 100);
    const label = value == null ? '--' : `${safeValue.toFixed(1)}%`;
    return (
      <div className="overview-ring-progress">
        <svg
          width={size}
          height={size}
          className="overview-ring-svg"
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="3"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span
          className="overview-ring-label"
          style={{ color: value == null ? '#94a3b8' : ringColor }}
        >
          {label}
        </span>
      </div>
    );
  };

  const renderIssueProgress = (
    metrics: RepoProgressRow[ProgressTab],
    onBucketClick?: (bucket: IssueBucket) => void
  ) => {
    const total = metrics.pending + metrics.inProgress + metrics.resolved || 1;
    const colorMap: Record<IssueBucket, string> = {
      pending: '#e0962b',
      inProgress: '#2f7be5',
      resolved: '#1ea362',
      na: '#94a3b8',
    };
    const items: Array<{
      key: IssueBucket;
      label: string;
      value: number;
      color: string;
    }> = [
      {
        key: 'pending',
        label: '待处理',
        value: metrics.pending,
        color: colorMap.pending,
      },
      {
        key: 'inProgress',
        label: '进行中',
        value: metrics.inProgress,
        color: colorMap.inProgress,
      },
      {
        key: 'resolved',
        label: '已闭环',
        value: metrics.resolved,
        color: colorMap.resolved,
      },
    ];

    return (
      <div className="overview-progress-cell">
        <div className="overview-progress-bar">
          {items.map((item) => (
            <span
              key={item.key}
              className={`overview-progress-segment overview-progress-${item.key}`}
              style={{ width: `${(item.value / total) * 100}%` }}
            />
          ))}
        </div>
        <div className="overview-progress-meta">
          {items.map((item) =>
            onBucketClick ? (
              <Button
                key={item.key}
                type="link"
                className="overview-progress-link"
                style={{ color: item.color }}
                onClick={() => onBucketClick(item.key)}
              >
                {item.label} {item.value}
              </Button>
            ) : (
              <span
                key={item.key}
                className="overview-progress-text"
                style={{ color: item.color }}
              >
                {item.label} {item.value}
              </span>
            )
          )}
        </div>
      </div>
    );
  };

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
        onHeaderCell: () => ({
          onClick: () => onRepoSort('name'),
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
          onClick: () => onRepoSort('team'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('评分', repoSortArrow('score')),
        key: 'score',
        width: repoColumnWidths[3],
        render: (_value, record) =>
          renderMetricBar(record.score, formatScore, 'overview-bar-blue'),
        onHeaderCell: () => ({
          onClick: () => onRepoSort('score'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('成功率', repoSortArrow('successRate')),
        key: 'successRate',
        width: repoColumnWidths[4],
        render: (_value, record) => formatPercent(record.successRate),
        onHeaderCell: () => ({
          onClick: () => onRepoSort('successRate'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('开发者旅程耗时', repoSortArrow('executionTime')),
        key: 'executionTime',
        width: repoColumnWidths[5],
        render: (_value, record) => formatExecutionTime(record.executionTime),
        onHeaderCell: () => ({
          onClick: () => onRepoSort('executionTime'),
          className: 'sortable-col',
        }),
      },
      {
        title: '问题处理进展',
        key: 'progress',
        width: repoColumnWidths[6],
        render: (_value, record) =>
          renderIssueProgress(record[currentTab], (bucket) =>
            onOpenRepoIssues(record, bucket)
          ),
      },
      {
        title: sortableTitle('总问题数', repoSortArrow('total')),
        key: 'total',
        width: repoColumnWidths[7],
        render: (_value, record) => (
          <Button
            type="link"
            className="overview-table-link overview-table-link-strong"
            onClick={() => onOpenRepoIssues(record, 'total')}
          >
            {record[currentTab].total}
          </Button>
        ),
        onHeaderCell: () => ({
          onClick: () => onRepoSort('total'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('闭环率', repoSortArrow('closeRate')),
        key: 'closeRate',
        width: repoColumnWidths[8],
        render: (_value, record) => {
          const metrics = record[currentTab];
          return renderCircularProgress(
            metrics.total === 0 ? 100 : metrics.closeRate
          );
        },
        onHeaderCell: () => ({
          onClick: () => onRepoSort('closeRate'),
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
    [currentTab, repoColumnWidths, onOpenRepoIssues, onRepoSort, repoSortArrow]
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
          onClick: () => onTeamSort('name'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('负责仓库', teamSortArrow('repoCount')),
        key: 'repoCount',
        width: teamColumnWidths[2],
        render: (_value, record) => `${record.repoCount} 个`,
        onHeaderCell: () => ({
          onClick: () => onTeamSort('repoCount'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('综合评分', teamSortArrow('score')),
        key: 'score',
        width: teamColumnWidths[3],
        render: (_value, record) =>
          renderMetricBar(record.score, formatScore, 'overview-bar-blue'),
        onHeaderCell: () => ({
          onClick: () => onTeamSort('score'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('端到端成功率', teamSortArrow('successRate')),
        key: 'successRate',
        width: teamColumnWidths[4],
        render: (_value, record) => formatPercent(record.successRate),
        onHeaderCell: () => ({
          onClick: () => onTeamSort('successRate'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('开发者旅程耗时', teamSortArrow('executionTime')),
        key: 'executionTime',
        width: teamColumnWidths[5],
        render: (_value, record) => formatExecutionTime(record.executionTime),
        onHeaderCell: () => ({
          onClick: () => onTeamSort('executionTime'),
          className: 'sortable-col',
        }),
      },
      {
        title: '问题处理进展',
        key: 'progress',
        width: teamColumnWidths[6],
        render: (_value, record) =>
          renderIssueProgress(record[currentTab], (bucket) =>
            onOpenTeamIssues(record, bucket)
          ),
      },
      {
        title: sortableTitle('总问题数', teamSortArrow('total')),
        key: 'total',
        width: teamColumnWidths[7],
        render: (_value, record) => (
          <Button
            type="link"
            className="overview-table-link overview-table-link-strong"
            onClick={() => onOpenTeamIssues(record, 'total')}
          >
            {record[currentTab].total}
          </Button>
        ),
        onHeaderCell: () => ({
          onClick: () => onTeamSort('total'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('闭环率', teamSortArrow('closeRate')),
        key: 'closeRate',
        width: teamColumnWidths[8],
        render: (_value, record) => {
          const metrics = record[currentTab];
          return renderCircularProgress(
            metrics.total === 0 ? 100 : metrics.closeRate
          );
        },
        onHeaderCell: () => ({
          onClick: () => onTeamSort('closeRate'),
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
      currentTab,
      expandedRowKeys,
      teamColumnWidths,
      onOpenTeamIssues,
      onTeamSort,
      teamSortArrow,
    ]
  );

  const renderExpandedRepoRows = useCallback(
    (repos: RepoProgressRow[]) => (
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
            {repos.map((repo, index) => (
              <tr
                key={repo.id}
                className="overview-expanded-row"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="overview-expanded-cell overview-expanded-cell-index" />
                <td className="overview-expanded-cell overview-expanded-cell-name">
                  <span className="overview-expanded-repo-name">
                    {repo.name}
                  </span>
                </td>
                <td className="overview-expanded-cell overview-expanded-cell-empty">
                  -
                </td>
                <td className="overview-expanded-cell">
                  {renderMetricBar(
                    repo.score,
                    formatScore,
                    'overview-bar-blue'
                  )}
                </td>
                <td className="overview-expanded-cell">
                  {formatPercent(repo.successRate)}
                </td>
                <td className="overview-expanded-cell">
                  {formatExecutionTime(repo.executionTime)}
                </td>
                <td className="overview-expanded-cell">
                  {renderIssueProgress(repo[currentTab], (bucket) =>
                    onOpenRepoIssues(repo, bucket)
                  )}
                </td>
                <td className="overview-expanded-cell">
                  <Button
                    type="link"
                    className="overview-table-link overview-table-link-strong"
                    onClick={() => onOpenRepoIssues(repo, 'total')}
                  >
                    {repo[currentTab].total}
                  </Button>
                </td>
                <td className="overview-expanded-cell">
                  {renderCircularProgress(
                    repo[currentTab].total === 0
                      ? 100
                      : repo[currentTab].closeRate
                  )}
                </td>
                <td className="overview-expanded-cell">
                  {renderDetailLink(repo)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    [teamColumnWidths, currentTab, onOpenRepoIssues, teamScrollX]
  );

  const teamExpandable = useMemo<TableProps<TeamProgressRow>['expandable']>(
    () => ({
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
    }),
    [
      currentTab,
      expandedRowKeys,
      teamColumnWidths,
      onOpenRepoIssues,
      renderExpandedRepoRows,
    ]
  );

  const emptyText =
    progressView === 'team' ? '暂无匹配责任团队' : '暂无匹配仓库';

  return (
    <>
      <Title level={4} className="oj-section-title">
        进展
      </Title>
      <div className="section-card">
        <div className="overview-top-tabs">
          <Segmented
            className="overview-segmented"
            value={progressView}
            onChange={(value) => onProgressViewChange(value as ProgressView)}
            options={[
              { label: '责任团队进展', value: 'team' },
              { label: '各仓库进展', value: 'repo' },
            ]}
          />
        </div>
        <div className="tab-bar">
          <Segmented
            className="overview-segmented"
            value={currentTab}
            onChange={(value) => onTabChange(value as ProgressTab)}
            options={[
              {
                label: renderTabLabel('总体问题', '含严重程度P0-P5的所有问题'),
                value: 'overall',
              },
              {
                label: renderTabLabel('关键问题', '含严重程度P0-P1的问题'),
                value: 'key',
              },
            ]}
          />
          <Checkbox
            checked={includeCommonIssues}
            onChange={(e) => onIncludeCommonIssuesChange(e.target.checked)}
            className="overview-common-checkbox"
          >
            包含共性问题
          </Checkbox>
          <div className="team-filter overview-filter-group">
            <Select
              value={repoFilter || undefined}
              onChange={(value) => onRepoFilterChange(value ?? '')}
              allowClear
              placeholder="全部仓库"
              className="overview-select"
              popupMatchSelectWidth={false}
              dropdownClassName="overview-select-dropdown"
              options={repoOptions}
            />
            <Select
              value={teamFilter || undefined}
              onChange={(value) => onTeamFilterChange(value ?? '')}
              allowClear
              placeholder="全部团队"
              className="overview-select"
              popupMatchSelectWidth={false}
              dropdownClassName="overview-select-dropdown"
              options={teamOptions.map((team) => ({
                value: team,
                label: team,
              }))}
            />
          </div>
        </div>

        {progressView === 'team' ? (
          <Table<TeamProgressRow>
            className="overview-ant-table"
            loading={isLoading}
            dataSource={teamRows}
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
            dataSource={repoRows}
            columns={repoColumns}
            rowKey="id"
            pagination={false}
            scroll={{ x: repoScrollX }}
            tableLayout="fixed"
            locale={{ emptyText }}
          />
        )}
      </div>
    </>
  );
};

export default RepoProgressSection;
