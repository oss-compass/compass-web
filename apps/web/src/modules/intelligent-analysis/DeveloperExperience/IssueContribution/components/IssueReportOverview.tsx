import React, { type ReactNode } from 'react';
import { Card, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { IssueReportRecord } from '../types';
import { formatGeneratedAt } from '../presentation';

type IssueReportOverviewProps = {
  report: IssueReportRecord;
  children?: ReactNode;
};

type OverviewMetricCardProps = {
  label: string;
  value: string | number;
  suffix?: string;
  description: string;
  badge?: string;
  accent?: boolean;
};

const OverviewMetricCard: React.FC<OverviewMetricCardProps> = ({
  label,
  value,
  suffix,
  description,
  badge,
  accent = false,
}) => (
  <div className="flex min-w-0 flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
    <div className="flex items-start justify-between gap-2">
      <div className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-slate-500">
        <span className="truncate">{label}</span>
        <Tooltip title={description}>
          <button
            type="button"
            aria-label={`查看${label}口径：${description}`}
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <InfoCircleOutlined />
          </button>
        </Tooltip>
      </div>
      {badge ? (
        <span
          className={`inline-flex shrink-0 items-center rounded-full border px-2 py-1 text-[11px] font-medium leading-4 ${
            accent
              ? 'border-amber-200 bg-amber-50 text-amber-700'
              : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}
        >
          {badge}
        </span>
      ) : null}
    </div>

    <div className="mt-3 flex items-baseline gap-1.5">
      <span className="text-2xl font-semibold leading-none text-slate-900">
        {value}
      </span>
      {suffix ? (
        <span className="text-sm font-medium text-slate-500">{suffix}</span>
      ) : null}
    </div>

    <p className="mt-2 line-clamp-1 text-[11px] leading-5 text-slate-400">
      {description}
    </p>
  </div>
);

const IssueReportOverview: React.FC<IssueReportOverviewProps> = ({
  report,
  children,
}) => {
  const { data, version } = report;
  const context = data.report_context;
  const firstResponseMetric = context.ref_metrics.find((metric) =>
    metric.name_cn.includes('首次响应')
  );
  const hasFirstResponseMedian =
    firstResponseMetric?.median && firstResponseMetric.median !== '—';
  const firstResponseValue = firstResponseMetric
    ? hasFirstResponseMedian
      ? firstResponseMetric.median
      : firstResponseMetric.mean
    : '—';
  const firstResponseDescription = firstResponseMetric
    ? hasFirstResponseMedian
      ? `中位数 ${firstResponseMetric.median} · 均值 ${firstResponseMetric.mean}`
      : firstResponseMetric.caliber_note
    : '当前报告暂无首次响应时间数据';
  const metadataItems = [
    { label: '社区', value: data.community_name },
    { label: '平台', value: data.platform, mono: true },
    { label: '报告周期', value: context.period_label },
    { label: '样本数量', value: `${context.n_total} 个 Issue` },
    { label: '报告版本', value: version, mono: true },
    { label: '评分规则', value: context.rubric_version, mono: true },
    { label: '数据结构', value: data.schema_version, mono: true },
    { label: '报告频率', value: context.cadence },
    {
      label: '数据完整性',
      value: `${context.data_completeness.toFixed(1)} / 100`,
    },
    { label: '结论置信度', value: context.confidence },
  ];

  return (
    <Card
      bordered={false}
      className="w-full min-w-0 overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 24 }}
    >
      <div className=">lg:flex-row >lg:items-stretch flex flex-col gap-5">
        <section
          aria-labelledby="issue-report-overview-title"
          className=">lg:w-1/2 flex w-full min-w-0 flex-col"
        >
          <div className="mb-2 flex min-h-6 items-center justify-between gap-3">
            <h1
              id="issue-report-overview-title"
              className="text-base font-semibold text-slate-800"
            >
              报告总览
            </h1>
            <span className=">sm:inline hidden truncate text-xs text-slate-400">
              {data.community_name}
            </span>
          </div>

          <div className=">sm:grid-cols-2 grid flex-1 grid-cols-1 gap-4">
            <OverviewMetricCard
              label="总体体验分"
              value={context.idx_total}
              suffix="/ 100"
              badge={context.grade}
              description={context.delta_total}
              accent
            />
            <OverviewMetricCard
              label="Issue 总数"
              value={context.n_total}
              description={`Open ${context.n_open} / Closed ${context.n_closed}`}
            />
            <OverviewMetricCard
              label="关闭率"
              value={context.close_rate.toFixed(1)}
              suffix="%"
              description={`${context.n_closed} 个 Issue 已关闭`}
            />
            <OverviewMetricCard
              label="首次响应时间"
              value={firstResponseValue}
              badge="中位数"
              description={firstResponseDescription}
            />
          </div>
        </section>

        <section
          aria-labelledby="issue-report-metadata-title"
          className=">lg:w-1/2 flex w-full min-w-0 flex-col"
        >
          <div className="mb-2 flex min-h-6 items-center justify-between gap-3">
            <h2
              id="issue-report-metadata-title"
              className="text-base font-semibold text-slate-800"
            >
              本周关键数据
            </h2>
            <span className=">sm:inline hidden whitespace-nowrap text-xs text-slate-400">
              更新于：{formatGeneratedAt(data.generated_at)}
            </span>
          </div>

          <div className="flex min-w-0 flex-1 rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
            <dl className=">sm:grid-cols-2 grid w-full grid-cols-1 gap-x-8">
              {metadataItems.map((item) => (
                <div
                  key={item.label}
                  className="flex min-w-0 items-center justify-between gap-3 border-b border-slate-100 py-3"
                >
                  <dt className="shrink-0 text-xs font-medium text-slate-400">
                    {item.label}
                  </dt>
                  <dd
                    className={`min-w-0 truncate text-right text-sm font-medium text-slate-700 ${
                      item.mono ? 'font-mono' : ''
                    }`}
                  >
                    <Tooltip title={item.value}>
                      <span className="block truncate">{item.value}</span>
                    </Tooltip>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      {children}
    </Card>
  );
};

export default IssueReportOverview;
