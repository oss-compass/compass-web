import React from 'react';
import ReportSectionCard from '../../components/ReportSectionCard';
import {
  cleanReportText,
  getPriorityTone,
  normalizeGoal,
} from '../presentation';
import type { IssueReportRecommendation } from '../types';

type IssueActionsProps = {
  recommendations: IssueReportRecommendation[];
};

const IssueActions: React.FC<IssueActionsProps> = ({ recommendations }) => (
  <ReportSectionCard
    id="weekly-actions"
    cardIndex={2}
    title="本周行动清单"
    description="把诊断收束为可执行的触发条件、承接方和验收目标；候选负责人仅用于协作建议，不代表责任已经确认。"
    headerMeta={
      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
        TOP {recommendations.length} ACTIONS
      </span>
    }
    bodyPadding={false}
  >
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] table-fixed border-collapse">
        <colgroup>
          <col style={{ width: '92px' }} />
          <col style={{ width: '120px' }} />
          <col />
          <col style={{ width: '200px' }} />
          <col style={{ width: '27%' }} />
        </colgroup>
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
            <th className="px-4 py-3">REC</th>
            <th className="px-4 py-3">影响环节</th>
            <th className="px-4 py-3">具体动作</th>
            <th className="px-4 py-3">承接方 / 触发</th>
            <th className="px-4 py-3">验收目标</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((recommendation, index) => {
            const tone = getPriorityTone(recommendation.prio);
            return (
              <tr
                key={recommendation.id}
                className="border-b border-slate-100 align-top transition-colors last:border-b-0 hover:bg-slate-50/50"
              >
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border text-xs font-black ${tone.badge}`}
                  >
                    {index + 1}
                  </span>
                  <div className="mt-1.5 font-mono text-[10px] font-semibold text-slate-400">
                    {recommendation.id}
                  </div>
                  <span
                    className={`mt-1 inline-flex rounded-full border px-1.5 py-0.5 text-[10px] font-bold ${tone.badge}`}
                  >
                    {recommendation.prio}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="text-[13px] font-semibold text-slate-800">
                    {recommendation.stage_name}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400">
                    对应 {recommendation.pp_id}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-[13px] font-semibold leading-6 text-slate-900">
                    {recommendation.action_title}
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-slate-600">
                    {recommendation.action}
                  </p>
                </td>
                <td className="px-4 py-4 text-xs leading-5">
                  <div className="font-medium text-slate-700">
                    {recommendation.owner_team}
                  </div>
                  {recommendation.owner_candidate ? (
                    <div className="mt-0.5 text-slate-500">
                      候选：{recommendation.owner_candidate}
                    </div>
                  ) : null}
                  <div className="mt-1.5 text-slate-400">
                    触发：{recommendation.trigger}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-xs font-semibold leading-5 text-slate-700">
                    {normalizeGoal(recommendation.goal)}
                  </p>
                  <p className="mt-2 border-t border-slate-100 pt-2 text-[11px] leading-5 text-slate-500">
                    <span className="font-semibold text-slate-400">
                      给分依据：
                    </span>
                    {cleanReportText(recommendation.metric_evidence)}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </ReportSectionCard>
);

export default IssueActions;
