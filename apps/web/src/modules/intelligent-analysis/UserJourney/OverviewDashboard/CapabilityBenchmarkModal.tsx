import React, { useMemo } from 'react';
import { Alert, Modal, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import type {
  CapabilityBenchmarkData,
  CapabilityBenchmarkScoreItem,
  RepoProgressRow,
} from './types';
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
  detailReportUrl?: string;
};

const buildReportUrl = (detailReportUrl?: string, latestReportId?: string) => {
  if (detailReportUrl) return detailReportUrl;
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

const CHART_BARS_HEIGHT_PX = 236;

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
        detailReportUrl: repo.detailReportUrl,
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
        detailReportUrl: benchmark.detailReportUrl,
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
          const href = buildReportUrl(
            record.detailReportUrl,
            record.latestReportId
          );
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
  const maxScore = useMemo(() => {
    const values = chartRows.flatMap((item) => [
      item.cannScore ?? 0,
      item.benchmarkScore ?? 0,
    ]);
    return Math.max(100, ...values);
  }, [chartRows]);

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
      destroyOnHidden
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
              message="已配置对标仓库，但暂未查询到竞品最新报告，已保留能力对标入口。"
            />
          ) : null}
          <div className="benchmark-chart-card">
            <div className="benchmark-chart-header">
              <div className="benchmark-chart-score-hint">
                <span>满分</span>
                <strong>{maxScore}</strong>
              </div>
            </div>
            <div className="benchmark-chart">
              <div className="benchmark-chart-y">
                {[100, 80, 60, 40, 20, 0].map((value) => (
                  <div
                    key={value}
                    className="benchmark-chart-y-row"
                    style={{
                      top: `${((100 - value) / 100) * CHART_BARS_HEIGHT_PX}px`,
                    }}
                  >
                    <span className="benchmark-chart-y-label">{value}</span>
                  </div>
                ))}
              </div>
              <div className="benchmark-chart-plot">
                <div className="benchmark-chart-grid">
                  {[100, 80, 60, 40, 20, 0].map((value) => (
                    <span
                      key={value}
                      className="benchmark-chart-grid-line"
                      style={{
                        top: `${
                          ((100 - value) / 100) * CHART_BARS_HEIGHT_PX
                        }px`,
                      }}
                    />
                  ))}
                </div>
                <div className="benchmark-chart-groups">
                  {chartRows.map((item: CapabilityBenchmarkScoreItem) => {
                    const showCannBar =
                      typeof item.cannScore === 'number' && item.cannScore > 0;
                    const showBenchmarkBar =
                      typeof item.benchmarkScore === 'number' &&
                      item.benchmarkScore > 0;
                    const cannHeight = !showCannBar
                      ? 0
                      : Math.max(
                          14,
                          Math.min(
                            100,
                            Number(
                              (
                                ((item.cannScore ?? 0) / maxScore) *
                                100
                              ).toFixed(2)
                            )
                          )
                        );
                    const benchmarkHeight = !showBenchmarkBar
                      ? 0
                      : Math.max(
                          14,
                          Math.min(
                            100,
                            Number(
                              (
                                ((item.benchmarkScore ?? 0) / maxScore) *
                                100
                              ).toFixed(2)
                            )
                          )
                        );
                    return (
                      <div key={item.key} className="benchmark-chart-group">
                        <div className="benchmark-chart-slot">
                          <div className="benchmark-chart-bars">
                            {showCannBar ? (
                              <div
                                className="benchmark-chart-bar benchmark-chart-bar-cann"
                                style={{ height: `${cannHeight}%` }}
                              >
                                <span className="benchmark-chart-bar-value">
                                  {item.cannScore}
                                </span>
                              </div>
                            ) : (
                              <span className="benchmark-chart-bar-placeholder" />
                            )}
                            {showBenchmarkBar ? (
                              <div
                                className="benchmark-chart-bar benchmark-chart-bar-benchmark"
                                style={{ height: `${benchmarkHeight}%` }}
                              >
                                <span className="benchmark-chart-bar-value">
                                  {item.benchmarkScore}
                                </span>
                              </div>
                            ) : (
                              <span className="benchmark-chart-bar-placeholder" />
                            )}
                          </div>
                        </div>
                        <div className="benchmark-chart-label">
                          {item.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="benchmark-chart-legend">
              <span className="benchmark-chart-legend-item">
                <span className="benchmark-chart-dot benchmark-chart-dot-cann" />
                {repo.name}
              </span>
              <span className="benchmark-chart-legend-item">
                <span className="benchmark-chart-dot benchmark-chart-dot-benchmark" />
                {benchmark.repoName}
              </span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CapabilityBenchmarkModal;
