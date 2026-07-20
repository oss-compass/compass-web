import React from 'react';
import { Card, Descriptions, Tooltip } from 'antd';
import { ExportOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { CiRepoData } from '../types';

type CiReportOverviewProps = {
  data: CiRepoData;
};

const CONFIDENCE_TEXT =
  'run 级 高（全量）· job 级 中（抽样 46 run = 26 失败 + 18 成功 + 2 取消）';

type Metric = {
  key: string;
  title: string;
  value: string;
  suffix?: string;
  description: string;
};

const CiReportOverview: React.FC<CiReportOverviewProps> = ({ data }) => {
  const metrics: Metric[] = [
    {
      key: 'runs',
      title: 'Run 数',
      value: String(data.runs),
      suffix: 'run',
      description: '观察窗内触发的全部 run（run 级全量口径）。',
    },
    {
      key: 'prs',
      title: 'PR 数',
      value: String(data.prs),
      suffix: 'PR',
      description: '观察窗内涉及的 PR 数（按 pull_request_id 聚合）。',
    },
    {
      key: 'finFail',
      title: '完结失败率',
      value: data.finFail,
      description: '完结 run 中 FAILED 占比；取消 / 在跑不计入分母。',
    },
    {
      key: 'runsPerPR',
      title: 'run/PR 均值',
      value: data.runsPerPR,
      description: '平均每个 PR 触发的 run 数，反映人肉 /compile 重试强度。',
    },
  ];

  return (
    <Card
      bordered={false}
      className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 24 }}
    >
      <div className="flex flex-col gap-5 >lg:flex-row >lg:items-stretch">
        {/* ── 左侧：报告概览 ── */}
        <div className="flex w-full flex-col >lg:w-1/2">
          <div className="mb-2 text-base font-semibold text-slate-800">
            报告概览
          </div>
          <div className="grid flex-1 grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.key}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.05)]"
              >
                <div className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-slate-500">
                  <span className="truncate">{metric.title}</span>
                  <Tooltip title={metric.description}>
                    <InfoCircleOutlined className="shrink-0 cursor-help text-slate-400" />
                  </Tooltip>
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <div className="text-2xl font-semibold leading-none text-slate-900">
                    {metric.value}
                  </div>
                  {metric.suffix ? (
                    <div className="text-sm font-medium text-slate-500">
                      {metric.suffix}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 右侧：报告元数据 ── */}
        <div className="flex w-full flex-col >lg:w-1/2">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-base font-semibold text-slate-800">
              报告元数据
            </div>
            <span className="whitespace-nowrap text-xs text-slate-400">
              更新于：2026-07-14
            </span>
          </div>
          <div className="flex flex-1 flex-col rounded-2xl border border-slate-200/80 bg-white/90 px-6 py-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
            <Descriptions
              size="small"
              column={1}
              colon
              labelStyle={{ whiteSpace: 'nowrap', flexShrink: 0 }}
              className="[&_.ant-descriptions-item-content]:!text-[14px] [&_.ant-descriptions-item-content]:!leading-relaxed [&_.ant-descriptions-item-content]:!text-slate-700 [&_.ant-descriptions-item-label]:!text-sm [&_.ant-descriptions-item-label]:!font-medium [&_.ant-descriptions-item-label]:!text-slate-400 [&_.ant-descriptions-item]:!pb-2.5"
              items={[
                {
                  key: 'period',
                  label: '观察周期',
                  children: '2026W29（观察窗代周期）',
                },
                { key: 'version', label: '报告版本', children: 'v1.1' },
                {
                  key: 'window',
                  label: '观察窗口',
                  children: data.window,
                },
                {
                  key: 'confidence',
                  label: '置信度',
                  children: CONFIDENCE_TEXT,
                },
                {
                  key: 'export',
                  label: '导出报告',
                  children: (
                    <Tooltip title="暂未接入功能">
                      <button
                        type="button"
                        className="inline-flex cursor-pointer items-center gap-1.5 text-[14px] font-medium text-[#1677ff] hover:underline"
                      >
                        <ExportOutlined />
                        导出 md
                      </button>
                    </Tooltip>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CiReportOverview;
