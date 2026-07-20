import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import ReportSectionCard from '../../components/ReportSectionCard';
import { getPriorityTone } from '../presentation';
import type { IssueReportPain } from '../types';

type IssueProblemsProps = {
  pains: IssueReportPain[];
  recommendationIds: string[];
};

const IssueProblems: React.FC<IssueProblemsProps> = ({
  pains,
  recommendationIds,
}) => (
  <ReportSectionCard
    id="main-problems"
    cardIndex={1}
    title="主要问题"
    description="按影响与紧迫程度整理本周最值得维护者关注的体验阻塞。"
    headerMeta={
      <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
        {pains.filter((pain) => pain.prio === 'P0').length} 个 P0
      </span>
    }
    bodyPadding={false}
  >
    <div className="overflow-x-auto">
      <table className="w-full min-w-[880px] table-fixed border-collapse">
        <colgroup>
          <col style={{ width: '116px' }} />
          <col style={{ width: '23%' }} />
          <col />
          <col />
          <col style={{ width: '190px' }} />
        </colgroup>
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
            <th className="px-4 py-3">优先级</th>
            <th className="px-4 py-3">问题</th>
            <th className="px-4 py-3">关键证据</th>
            <th className="px-4 py-3">体验影响</th>
            <th className="px-4 py-3">建议动作</th>
          </tr>
        </thead>
        <tbody>
          {pains.map((pain) => {
            const tone = getPriorityTone(pain.prio);
            const linked = recommendationIds.includes(pain.rec_id);
            return (
              <tr
                key={pain.id}
                className="border-b border-slate-100 align-top transition-colors last:border-b-0 hover:bg-slate-50/50"
              >
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold ${tone.badge}`}
                  >
                    {pain.prio}
                  </span>
                  <div className="mt-1.5 font-mono text-[11px] font-semibold text-slate-400">
                    {pain.id}
                  </div>
                  <div className="mt-1 whitespace-nowrap text-[10px] text-slate-400">
                    {pain.state}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-[13px] font-semibold leading-6 text-slate-900">
                    {pain.title}
                  </p>
                </td>
                <td className="px-4 py-4 text-xs leading-5 text-slate-600">
                  {pain.evidence}
                </td>
                <td className="px-4 py-4 text-xs leading-5 text-slate-600">
                  {pain.impact}
                </td>
                <td className="px-4 py-4">
                  <p className="text-xs font-medium leading-5 text-slate-700">
                    {pain.action}
                  </p>
                  {linked ? (
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById('weekly-actions')
                          ?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          })
                      }
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 transition-colors hover:text-sky-700"
                    >
                      {pain.rec_id}
                      <ArrowRightOutlined className="text-[9px]" />
                    </button>
                  ) : (
                    <div className="mt-2 text-[11px] text-slate-400">
                      {pain.rec_id}（未进入 Top 3）
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </ReportSectionCard>
);

export default IssueProblems;
