import React from 'react';
import {
  Button,
  Checkbox,
  Segmented,
  Select,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { ProgressTab, RepoProgressRow, RepoSortKey } from './types';
import { formatPercent, formatScore, getAverage } from './utils';

const { Title } = Typography;
const { Link } = Typography;

type RepoProgressSectionProps = {
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
  sortedRows: RepoProgressRow[];
  sortArrow: (key: RepoSortKey) => string;
  onSort: (key: RepoSortKey) => void;
  onOpenRepoIssues: (
    row: RepoProgressRow,
    bucket: 'pending' | 'inProgress' | 'resolved' | 'na' | 'total'
  ) => void;
};

const RepoProgressSection: React.FC<RepoProgressSectionProps> = ({
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
  sortedRows,
  sortArrow,
  onSort,
  onOpenRepoIssues,
}) => {
  const tableSummary = sortedRows.reduce(
    (acc, row) => {
      const metrics = row[currentTab];
      acc.pending += metrics.pending;
      acc.inProgress += metrics.inProgress;
      acc.resolved += metrics.resolved;
      acc.total += metrics.total;
      acc.na += metrics.na;
      return acc;
    },
    { pending: 0, inProgress: 0, resolved: 0, total: 0, na: 0 }
  );
  const closeRate =
    tableSummary.total > 0
      ? Number(((tableSummary.resolved / tableSummary.total) * 100).toFixed(1))
      : 0;

  const sortableTitle = (label: string, key: RepoSortKey) => (
    <span className="sortable-col-title">
      {label}
      <span className="sort-arrow">{sortArrow(key)}</span>
    </span>
  );

  const resolvedTitle = (
    <span className="sortable-col-title">
      <span>已闭环</span>
      <Tooltip title="含不需要修复">
        <InfoCircleOutlined className="overview-info-icon" />
      </Tooltip>
      <span className="sort-arrow">{sortArrow('resolved')}</span>
    </span>
  );

  const columns: TableProps<RepoProgressRow>['columns'] = [
    {
      title: '序号',
      key: 'index',
      width: 72,
      render: (_value, _record, index) => (
        <span className="row-num">{index + 1}</span>
      ),
    },
    {
      title: '仓库',
      dataIndex: 'name',
      key: 'name',
      width: 220,
      ellipsis: true,
    },
    {
      title: sortableTitle('责任团队', 'team'),
      dataIndex: 'team',
      key: 'team',
      width: 160,
      ellipsis: true,
      onHeaderCell: () => ({
        onClick: () => onSort('team'),
        className: 'sortable-col',
      }),
    },
    {
      title: sortableTitle('评分', 'score'),
      key: 'score',
      width: 110,
      render: (_value, record) => formatScore(record.score),
      onHeaderCell: () => ({
        onClick: () => onSort('score'),
        className: 'sortable-col',
      }),
    },
    {
      title: sortableTitle('成功率', 'rate'),
      key: 'rate',
      width: 120,
      render: (_value, record) => formatPercent(record.successRate),
      onHeaderCell: () => ({
        onClick: () => onSort('rate'),
        className: 'sortable-col',
      }),
    },
    {
      title: sortableTitle('待处理', 'pending'),
      key: 'pending',
      width: 110,
      render: (_value, record) => {
        const metrics = record[currentTab];
        return (
          <Button
            type="link"
            className="overview-table-link"
            onClick={() => onOpenRepoIssues(record, 'pending')}
          >
            {metrics.pending}
          </Button>
        );
      },
      onHeaderCell: () => ({
        onClick: () => onSort('pending'),
        className: 'sortable-col',
      }),
    },
    {
      title: sortableTitle('进行中', 'inProgress'),
      key: 'inProgress',
      width: 110,
      render: (_value, record) => {
        const metrics = record[currentTab];
        return (
          <Button
            type="link"
            className="overview-table-link"
            onClick={() => onOpenRepoIssues(record, 'inProgress')}
          >
            {metrics.inProgress}
          </Button>
        );
      },
      onHeaderCell: () => ({
        onClick: () => onSort('inProgress'),
        className: 'sortable-col',
      }),
    },
    {
      title: resolvedTitle,
      key: 'resolved',
      width: 110,
      render: (_value, record) => {
        const metrics = record[currentTab];
        return (
          <Button
            type="link"
            className="overview-table-link"
            onClick={() => onOpenRepoIssues(record, 'resolved')}
          >
            {metrics.resolved}
          </Button>
        );
      },
      onHeaderCell: () => ({
        onClick: () => onSort('resolved'),
        className: 'sortable-col',
      }),
    },
    {
      title: sortableTitle('总问题数', 'total'),
      key: 'total',
      width: 120,
      render: (_value, record) => {
        const metrics = record[currentTab];
        return (
          <Button
            type="link"
            className="overview-table-link overview-table-link-strong"
            onClick={() => onOpenRepoIssues(record, 'total')}
          >
            {metrics.total}
          </Button>
        );
      },
      onHeaderCell: () => ({
        onClick: () => onSort('total'),
        className: 'sortable-col',
      }),
    },
    {
      title: sortableTitle('闭环率', 'closeRate'),
      key: 'closeRate',
      width: 120,
      render: (_value, record) => formatPercent(record[currentTab].closeRate),
      onHeaderCell: () => ({
        onClick: () => onSort('closeRate'),
        className: 'sortable-col',
      }),
    },
    {
      title: '不需要修复',
      key: 'na',
      width: 120,
      render: (_value, record) => {
        const metrics = record[currentTab];
        return (
          <Button
            type="link"
            className="overview-table-link overview-table-link-muted"
            onClick={() => onOpenRepoIssues(record, 'na')}
          >
            {metrics.na}
          </Button>
        );
      },
    },
    {
      title: '最新报告',
      key: 'detail',
      width: 180,
      render: (_value, record) => {
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
          <Link
            href={reportUrl}
            target="_blank"
            rel="noreferrer"
            className="overview-table-link"
          >
            {displayText}
          </Link>
        ) : (
          <span className="text-slate-300">--</span>
        );
      },
    },
  ];

  return (
    <>
      <Title level={4} className="oj-section-title">
        各仓库进展
      </Title>
      <div className="section-card">
        <div className="tab-bar">
          <Segmented
            className="overview-segmented"
            value={currentTab}
            onChange={(value) => onTabChange(value as ProgressTab)}
            options={[
              { label: '总体问题', value: 'overall' },
              { label: '阻塞问题', value: 'blocking' },
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

        <Table<RepoProgressRow>
          className="overview-ant-table"
          loading={isLoading}
          dataSource={sortedRows}
          columns={columns}
          rowKey="id"
          pagination={false}
          scroll={{ x: 1250, y: 600 }}
          locale={{ emptyText: '暂无匹配仓库' }}
          summary={
            sortedRows.length > 0
              ? () => (
                  <Table.Summary>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} />
                      <Table.Summary.Cell index={1} colSpan={2}>
                        <strong>总计</strong>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2} colSpan={0} />
                      <Table.Summary.Cell index={3}>
                        {formatScore(
                          getAverage(sortedRows.map((row) => row.score))
                        )}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={4}>
                        {formatPercent(
                          getAverage(sortedRows.map((row) => row.successRate))
                        )}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={5}>
                        {tableSummary.pending}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={6}>
                        {tableSummary.inProgress}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={7}>
                        {tableSummary.resolved}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={8}>
                        {tableSummary.total}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={9}>
                        {formatPercent(closeRate)}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={10}>
                        {tableSummary.na}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={11}>—</Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                )
              : undefined
          }
        />
      </div>
    </>
  );
};

export default RepoProgressSection;
