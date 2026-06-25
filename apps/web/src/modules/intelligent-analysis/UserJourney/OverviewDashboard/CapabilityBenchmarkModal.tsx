import React, { useMemo } from 'react';
import { Alert, Modal, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import type { RepoProgressRow } from './types';
import CapabilityBenchmarkChartCard from './CapabilityBenchmarkChartCard';
import {
  formatExecutionTime,
  formatPercent,
  formatScore,
  getReportDisplayText,
} from './utils';

const { Link, Text } = Typography;

type CapabilityBenchmarkModalProps = {
  open: boolean;
  repo: RepoProgressRow | null;
  onClose: () => void;
};

type BenchmarkSummaryRow = {
  key: string;
  repoName: string;
  isBenchmark?: boolean;
  score: number | null;
  successRate: number | null;
  executionTime: number | null;
  hardwareEnv: string;
  latestReportId?: string;
};

const buildReportUrl = (latestReportId?: string) => {
  if (!latestReportId) return '';
  return `/intelligent-analysis/community-experience?project=${encodeURIComponent(
    latestReportId
  )}`;
};

const buildCompareReportUrl = (
  primaryReportId?: string,
  benchmarkReportId?: string
) => {
  if (!primaryReportId || !benchmarkReportId) return '';
  return `/intelligent-analysis/community-experience?project=${encodeURIComponent(
    primaryReportId
  )}&project=${encodeURIComponent(benchmarkReportId)}`;
};

const CapabilityBenchmarkModal: React.FC<CapabilityBenchmarkModalProps> = ({
  open,
  repo,
  onClose,
}) => {
  const benchmark = repo?.benchmark ?? null;
  const summaryRows = useMemo<BenchmarkSummaryRow[]>(() => {
    if (!repo || !benchmark) return [];
    return [
      {
        key: 'cann',
        repoName: repo.name,
        isBenchmark: false,
        score: repo.score,
        successRate: repo.successRate,
        executionTime: repo.executionTime,
        hardwareEnv: repo.hardwareEnv || '--',
        latestReportId: repo.latestReportId,
      },
      {
        key: 'benchmark',
        repoName: benchmark.repoName,
        isBenchmark: true,
        score: benchmark.latestScore ?? null,
        successRate: benchmark.latestSuccessRate ?? null,
        executionTime: benchmark.latestExecutionTime ?? null,
        hardwareEnv: benchmark.hardwareEnv || '--',
        latestReportId: benchmark.latestReportId,
      },
    ];
  }, [benchmark, repo]);

  const summaryColumns = useMemo<TableProps<BenchmarkSummaryRow>['columns']>(
    () => [
      {
        title: '仓库',
        dataIndex: 'repoName',
        key: 'repoName',
        ellipsis: true,
        render: (value, record) => (
          <div className="benchmark-repo-cell">
            <span>{value}</span>
            {record.isBenchmark ? (
              <span className="ant-tag ant-tag-purple overview-benchmark-tag benchmark-inline-tag">
                竞品
              </span>
            ) : null}
          </div>
        ),
      },
      {
        title: '综合体验得分',
        dataIndex: 'score',
        key: 'score',
        width: 120,
        render: (value) => formatScore(value),
      },
      {
        title: '端到端成功率',
        dataIndex: 'successRate',
        key: 'successRate',
        width: 120,
        render: (value) => formatPercent(value),
      },
      {
        title: '开发者旅程耗时',
        dataIndex: 'executionTime',
        key: 'executionTime',
        width: 140,
        render: (value) => formatExecutionTime(value),
      },
      {
        title: '硬件环境',
        dataIndex: 'hardwareEnv',
        key: 'hardwareEnv',
        width: 140,
        render: (value) => value || '--',
      },
      {
        title: '详细报告',
        key: 'detailReport',
        width: 130,
        render: (_value, record) => {
          const href = buildReportUrl(record.latestReportId);
          const displayText = getReportDisplayText(record.latestReportId);
          if (!href) return <span className="text-slate-300">--</span>;
          return (
            <Link href={href} className="overview-table-link">
              {displayText || '查看报告'}
            </Link>
          );
        },
      },
    ],
    []
  );

  const chartRows = benchmark?.scoreBreakdown ?? [];
  const compareReportUrl = useMemo(
    () =>
      buildCompareReportUrl(repo?.latestReportId, benchmark?.latestReportId),
    [benchmark?.latestReportId, repo?.latestReportId]
  );

  return (
    <Modal
      open={open}
      title={
        <div className="benchmark-modal-title">
          <span>能力对标</span>
          {repo && benchmark ? (
            <div className="benchmark-modal-subtitle-row">
              <Text type="secondary" className="benchmark-modal-subtitle">
                <strong>{repo.name}</strong>
                <span className="benchmark-modal-subtitle-vs">vs</span>
                <strong>{benchmark.repoName}</strong>
              </Text>
              {compareReportUrl ? (
                <Link
                  href={compareReportUrl}
                  className="benchmark-subtitle-link"
                >
                  查看对比报告
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      }
      onCancel={onClose}
      footer={null}
      width={1080}
      destroyOnClose
    >
      {!repo || !benchmark ? null : (
        <div className="benchmark-modal-body">
          <div className="benchmark-summary-shell">
            <Table<BenchmarkSummaryRow>
              className="overview-ant-table benchmark-summary-table"
              rowKey="key"
              dataSource={summaryRows}
              columns={summaryColumns}
              pagination={false}
              size="middle"
              tableLayout="fixed"
            />
          </div>
          {!benchmark.latestReportId ? (
            <Alert
              type="info"
              showIcon
              message="已配置对标仓库，但暂未查询到竞品最新报告。"
            />
          ) : null}
          <CapabilityBenchmarkChartCard
            rows={chartRows}
            primaryLegend={repo.name}
            secondaryLegend={benchmark.repoName}
            emptyText="暂无能力对比数据"
          />
        </div>
      )}
    </Modal>
  );
};

export default CapabilityBenchmarkModal;
