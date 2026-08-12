import React from 'react';
import { AimOutlined, WarningOutlined } from '@ant-design/icons';
import {
  cleanReportText,
  getPriorityTone,
  getScoreTone,
} from '../presentation';
import type { IssueExperienceReportData } from '../types';
import HintIcon from './HintIcon';

type ReportContext = IssueExperienceReportData['report_context'];

type IssueExecutiveSummaryProps = {
  context: ReportContext;
};

const IssueExecutiveSummary: React.FC<IssueExecutiveSummaryProps> = ({
  context,
}) => {
  const shortStageRows = context.short_stage_rows ?? [];
  const topRecs = context.top_recs ?? [];
  const stageLabelByName = new Map(
    (context.stages ?? []).map((stage) => [
      stage.name,
      `${stage.id} · ${stage.name}`,
    ])
  );

  if (!shortStageRows.length && !topRecs.length) return null;

  return (
    <section
      id="issue-executive-summary"
      aria-labelledby="issue-executive-summary-title"
      className="mt-6 border-t border-slate-100 pt-6"
    >
      <div className="mb-3">
        <div className="flex items-center gap-1.5">
          <h2
            id="issue-executive-summary-title"
            className="text-xl font-semibold text-slate-900"
          >
            执行摘要
          </h2>
          <HintIcon title="本周最需要关注的薄弱环节，以及对应的重点改进建议；完整行动清单见下方“本周行动清单”。" />
        </div>
      </div>

      <div className=">xl:grid-cols-2 grid grid-cols-1 gap-4">
        {shortStageRows.length ? (
          <div className=">md:p-5 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                <WarningOutlined className="text-rose-500" />
                当前主要短板集中在{shortStageRows.length}个环节
              </h3>
              <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-600">
                短板 {shortStageRows.length}
              </span>
            </div>
            <ul className="mt-3 space-y-2.5">
              {shortStageRows.map((row) => {
                const prioTone = getPriorityTone(row.prio);
                const scoreTone = getScoreTone(row.score);
                return (
                  <li
                    key={`${row.prio}-${row.stage}`}
                    className="flex items-stretch overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_20px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
                  >
                    <div className="flex w-[70px] shrink-0 flex-col items-center justify-center gap-0.5 border-r border-slate-100 bg-slate-50/70 py-3">
                      <span
                        className={`text-[22px] font-bold tabular-nums leading-none ${scoreTone.text}`}
                      >
                        {row.score}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        得分
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-md border px-1.5 py-0.5 text-[11px] font-bold ${prioTone.badge}`}
                        >
                          {row.prio}
                        </span>
                        <span className="truncate text-sm font-semibold text-slate-800">
                          {row.stage}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[13px] leading-6 text-slate-500">
                        {cleanReportText(row.problem)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {topRecs.length ? (
          <div className=">md:p-5 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                <AimOutlined className="text-emerald-500" />
                本周建议 {topRecs.length} 个 REC
              </h3>
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                REC {topRecs.length}
              </span>
            </div>
            <ul className="mt-3 space-y-2.5">
              {topRecs.map((rec) => {
                const prioTone = getPriorityTone(rec.prio);
                const stageLabel = rec.stage_name
                  ? stageLabelByName.get(rec.stage_name) ?? rec.stage_name
                  : '';
                return (
                  <li
                    key={rec.id}
                    className="flex items-stretch overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_20px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
                  >
                    <div className="flex w-[70px] shrink-0 flex-col items-center justify-center gap-1 border-r border-slate-100 bg-slate-50/70 py-3">
                      <AimOutlined className="text-base text-emerald-500" />
                      <span className="font-mono text-[10px] font-semibold text-slate-400">
                        {rec.id}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-md border px-1.5 py-0.5 text-[11px] font-bold ${prioTone.badge}`}
                        >
                          {rec.prio}
                        </span>
                        {stageLabel ? (
                          <span className="truncate text-sm font-semibold text-slate-800">
                            {stageLabel}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1.5 text-[13px] leading-6 text-slate-500">
                        {cleanReportText(rec.action_short || rec.action)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default IssueExecutiveSummary;
