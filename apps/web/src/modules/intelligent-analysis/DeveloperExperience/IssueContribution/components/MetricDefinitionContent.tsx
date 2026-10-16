// 指标定义 hover 浮窗内容（作者：coder-sett）
// 从 IssueExperiencePath 的关键指标卡片浮窗抽取为共享组件：
// 展示「指标含义」文字 + 「算分算法」评分表，供报告页与总览页共同复用。
// 表格分数列复用 getScoreTone 着色，与评分徽章保持一致视觉语言。
import React from 'react';
import { getScoreTone } from '../presentation';
import type { MetricDefinition } from '../metricDefinitions';

/**
 * 关键指标 hover 浮窗内容：展示「指标含义」文字 + 「算分算法」评分表。
 * 内容限高 + 内部滚动，避免浮窗撑大文档区域出现双滚动条。
 */
const MetricDefinitionContent: React.FC<{
  name: string;
  definition: MetricDefinition;
}> = ({ name, definition }) => (
  <div className="max-h-[70vh] w-[480px] max-w-[86vw] overflow-y-auto overscroll-contain">
    <div className="text-[13px] font-semibold text-slate-900">{name}</div>
    <div className="mt-2">
      <div className="text-[11px] font-semibold text-slate-400">指标含义</div>
      <p className="mt-1 text-[12px] leading-5 text-slate-600">
        {definition.meaning}
      </p>
    </div>
    <div className="mt-3">
      <div className="text-[11px] font-semibold text-slate-400">算分算法</div>
      <div className="mt-1.5 overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full border-collapse text-[12px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-[52px] border-b border-slate-200 px-2 py-1.5 text-center text-[11px] font-semibold text-slate-500">
                分数
              </th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-left text-[11px] font-semibold text-slate-500">
                判定条件
              </th>
            </tr>
          </thead>
          <tbody>
            {definition.rubric.map((row) => {
              const rowTone = getScoreTone(row.score);
              return (
                <tr key={row.score} className="align-top">
                  <td className="border-b border-slate-100 px-2 py-1.5 text-center">
                    <span
                      className={`inline-flex rounded-full border px-1.5 py-0.5 text-[11px] font-bold leading-none ${rowTone.badge}`}
                    >
                      {row.score}
                    </span>
                  </td>
                  <td className="border-b border-slate-100 px-2 py-1.5 leading-5 text-slate-600">
                    {row.condition}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {definition.note ? (
        <p className="mt-2 text-[11px] leading-5 text-slate-500">
          说明：{definition.note}
        </p>
      ) : null}
    </div>
  </div>
);

export default MetricDefinitionContent;
