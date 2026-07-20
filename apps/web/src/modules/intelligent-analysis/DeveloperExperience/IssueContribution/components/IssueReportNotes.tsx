import React from 'react';
import {
  InfoCircleOutlined,
  SafetyCertificateOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import ReportSectionCard from '../../components/ReportSectionCard';
import type { IssueReportRecord } from '../types';

type IssueReportNotesProps = {
  report: IssueReportRecord;
};

const IssueReportNotes: React.FC<IssueReportNotesProps> = ({ report }) => {
  const context = report.data.report_context;

  const rows: Array<{
    icon: React.ReactNode;
    label: string;
    text: React.ReactNode;
  }> = [
    {
      icon: <InfoCircleOutlined className="text-sky-500" />,
      label: '判断口径',
      text: '本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。',
    },
    {
      icon: <WarningOutlined className="text-amber-500" />,
      label: '平台边界',
      text: context.platform_limitations,
    },
  ];

  return (
    <ReportSectionCard
      id="data-notes"
      cardIndex={4}
      title="数据说明"
      description="明确样本范围、判断来源与平台限制，避免对低置信度结果作过度解读。"
      headerMeta={
        <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
          置信度 {context.confidence}
        </span>
      }
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <SafetyCertificateOutlined className="text-emerald-600" />
          数据完整性
        </div>
        <div className="flex min-w-[220px] flex-1 items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
            <span
              className="block h-full rounded-full bg-[linear-gradient(90deg,#0ea5e9_0%,#10b981_100%)]"
              style={{ width: `${context.data_completeness}%` }}
            />
          </div>
          <span className="text-sm font-bold tabular-nums text-slate-900">
            {context.data_completeness.toFixed(1)}
            <span className="text-[11px] font-medium text-slate-400"> /100</span>
          </span>
        </div>
        <p className="w-full text-[11px] leading-5 text-slate-400">
          完整性用于提示可用字段覆盖，不等同于结论置信度；本期置信度仍为
          {context.confidence}。
        </p>
      </div>

      <dl className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
        {rows.map((row) => (
          <div
            key={row.label}
            className=">sm:flex-row >sm:gap-4 flex flex-col gap-1 px-4 py-3"
          >
            <dt className=">sm:w-24 flex shrink-0 items-center gap-2 text-xs font-semibold text-slate-500">
              {row.icon}
              {row.label}
            </dt>
            <dd className="min-w-0 flex-1 text-xs leading-5 text-slate-600">
              {row.text}
            </dd>
          </div>
        ))}
      </dl>
    </ReportSectionCard>
  );
};

export default IssueReportNotes;
