import React, { type ReactNode } from 'react';
import { Card, Descriptions, Tooltip } from 'antd';
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
  <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-slate-500">
        <span className="truncate">{label}</span>
        <Tooltip title={description}>
          <InfoCircleOutlined className="shrink-0 cursor-help text-slate-400" />
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
      <div className="text-2xl font-semibold leading-none text-slate-900">
        {value}
      </div>
      {suffix ? (
        <div className="text-sm font-medium text-slate-500">{suffix}</div>
      ) : null}
    </div>
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
  const firstResponseParts = firstResponseValue.match(
    /^(\d+(?:\.\d+)?)\s*(.*)$/
  );
  const firstResponseNumber = firstResponseParts?.[1] ?? firstResponseValue;
  const firstResponseUnit = firstResponseParts?.[2] || undefined;
  const firstResponseDescription = firstResponseMetric
    ? hasFirstResponseMedian
      ? `中位数 ${firstResponseMetric.median} · 均值 ${firstResponseMetric.mean}`
      : firstResponseMetric.caliber_note
    : '当前报告暂无首次响应时间数据';
  const metadataItems = [
    { key: 'community', label: '社区', value: data.community_name },
    { key: 'platform', label: '平台', value: data.platform, mono: true },
    { key: 'sample', label: '样本数量', value: `${context.n_total} 个 Issue` },
    { key: 'version', label: '报告版本', value: version, mono: true },
    {
      key: 'rubric',
      label: '评分规则',
      value: context.rubric_version,
      mono: true,
    },
    { key: 'cadence', label: '报告频率', value: context.cadence },
  ];

  return (
    <Card
      bordered={false}
      className="w-full min-w-0 overflow-x-clip rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 24 }}
    >
      <div className=">lg:flex-row >lg:items-stretch flex flex-col gap-5">
        {/* ── 左侧：报告总览（50%）── */}
        <div className=">lg:w-1/2 flex w-full min-w-0 flex-col">
          <div className="mb-2 text-base font-semibold text-slate-800">
            报告概览
          </div>
          <div className="grid flex-1 grid-cols-2 gap-4">
            <OverviewMetricCard
              label="总体体验分"
              value={context.idx_total}
              suffix="/ 100"
              badge={`评级：${context.grade}`}
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
              value={firstResponseNumber}
              suffix={firstResponseUnit}
              badge="中位数"
              description={firstResponseDescription}
            />
          </div>
        </div>

        {/* ── 右侧：本周关键数据（50%）── */}
        <div className=">lg:w-1/2 flex w-full min-w-0 flex-col">
          {/* 标题行 */}
          <div className="mb-2 flex items-center justify-between">
            <div className="text-base font-semibold text-slate-800">
              本周关键数据
            </div>
            <span className="whitespace-nowrap text-xs text-slate-400">
              更新于：{formatGeneratedAt(data.generated_at)}
            </span>
          </div>
          {/* 内容区 */}
          <div className="flex min-w-0 flex-1 flex-col rounded-2xl border border-slate-200/80 bg-white/90 px-6 py-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
            <Descriptions
              size="small"
              column={2}
              colon
              labelStyle={{ whiteSpace: 'nowrap', flexShrink: 0 }}
              className="[&_.ant-descriptions-item-content]:!overflow-hidden [&_.ant-descriptions-item-content]:!whitespace-nowrap [&_.ant-descriptions-item-content]:!align-middle [&_.ant-descriptions-item-content]:!text-[15px] [&_.ant-descriptions-item-content]:!leading-10 [&_.ant-descriptions-item-content]:!text-slate-700 [&_.ant-descriptions-item-label]:!align-middle [&_.ant-descriptions-item-label]:!text-sm [&_.ant-descriptions-item-label]:!font-medium [&_.ant-descriptions-item-label]:!leading-10 [&_.ant-descriptions-item-label]:!text-slate-400 [&_.ant-descriptions-item]:!pb-1"
              items={metadataItems.map((item) => ({
                key: item.key,
                label: item.label,
                children: (
                  <Tooltip title={item.value}>
                    <span
                      className={`block truncate text-[15px] leading-10 ${
                        item.mono ? 'font-mono' : 'font-medium'
                      }`}
                    >
                      {item.value}
                    </span>
                  </Tooltip>
                ),
              }))}
            />
          </div>
        </div>
      </div>

      {children}
    </Card>
  );
};

export default IssueReportOverview;
