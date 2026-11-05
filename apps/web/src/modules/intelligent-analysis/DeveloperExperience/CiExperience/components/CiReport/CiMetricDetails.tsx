import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import type { CiBoard, CiDimKey, CiPri, CiProblem } from '../../types';
import { priBadgeClass } from '../../helpers';
import { Collapsible, ValText } from '../shared';
import DiagBlock from '../DiagBlock';
import { CiPainTrackingButton } from '../PainTracking';
import { trackingProblemKey } from '../PainTracking/model';

export type CiMetricDetailsBoard = Pick<CiBoard, 'metrics' | 'diag'>;

type CiMetricDetailsProps = {
  dimension: CiDimKey;
  priority: CiPri | null;
  board?: CiMetricDetailsBoard;
  problems: CiProblem[];
  onClearPriority: () => void;
  onProblemJump?: (problem: CiProblem) => void;
};

const CiMetricDetails: React.FC<CiMetricDetailsProps> = ({
  dimension,
  priority,
  board,
  problems,
  onClearPriority,
  onProblemJump,
}) => {
  const metrics = board?.metrics?.[dimension] ?? [];
  const relatedProblems = problems.filter(
    (problem) =>
      problem.dimkey === dimension && (!priority || problem.pri === priority)
  );

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start gap-5 lg:grid-cols-1">
      <div className="min-w-0">
        <h4 className="mb-3 text-sm font-semibold text-slate-800">指标明细</h4>
        {metrics.length ? (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full min-w-[580px] border-collapse text-sm md:block md:min-w-0">
              <thead className="bg-slate-50 text-xs text-slate-500 md:hidden">
                <tr>
                  <th className="px-3 py-2.5 text-left font-medium">指标</th>
                  <th className="px-3 py-2.5 text-right font-medium">当日值</th>
                  <th className="px-3 py-2.5 text-right font-medium">
                    基线 / 对比值
                  </th>
                  <th className="px-3 py-2.5 text-left font-medium">步骤</th>
                </tr>
              </thead>
              <tbody className="md:block">
                {metrics.map((metric, index) => (
                  <tr
                    key={`${metric.label}-${index}`}
                    className="border-t border-slate-100 align-top md:grid md:grid-cols-2"
                  >
                    <td className="px-3 py-2.5 text-slate-700 md:col-span-2">
                      <span className="inline-flex flex-wrap items-center gap-1.5">
                        {metric.label}
                        {metric.seg ? (
                          <span className="hidden text-xs font-normal text-slate-500 md:inline">
                            {metric.seg}
                          </span>
                        ) : null}
                        {metric.score ? (
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">
                            入分
                          </span>
                        ) : null}
                        {metric.note ? (
                          <Tooltip title={metric.note}>
                            <button
                              type="button"
                              aria-label={`${metric.label}说明`}
                              className="rounded text-xs text-slate-400 focus-visible:outline-blue-600"
                            >
                              <InfoCircleOutlined />
                            </button>
                          </Tooltip>
                        ) : null}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums md:pt-0 md:text-left">
                      <span className="mb-1 hidden text-xs text-slate-500 md:block">
                        当日值
                      </span>
                      <ValText
                        value={metric.cur}
                        className="font-medium text-slate-900"
                      />
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-slate-500 md:pt-0 md:text-left">
                      <span className="mb-1 hidden text-xs text-slate-500 md:block">
                        基线 / 对比值
                      </span>
                      <ValText value={metric.base} />
                    </td>
                    <td className="px-3 py-2.5 text-slate-500 md:hidden">
                      {metric.seg || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-lg border border-slate-200 bg-white px-4 py-5 text-sm text-slate-500">
            暂无该维度的指标数据
          </p>
        )}
        {board?.diag?.[dimension] ? (
          <Collapsible key={dimension} className="mt-3" summary="诊断细分">
            <div className="[&_p]:!text-sm [&_table]:!text-sm [&_th]:!text-xs">
              <DiagBlock dimKey={dimension} diag={board.diag} />
            </div>
          </Collapsible>
        ) : null}
      </div>
      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-slate-800">
            相关问题{' '}
            <span className="ml-1 font-normal text-slate-500">
              {relatedProblems.length} 项
            </span>
          </h4>
          {priority ? (
            <button
              type="button"
              onClick={onClearPriority}
              className="rounded text-xs text-blue-600 hover:underline focus-visible:outline-blue-600"
            >
              {priority} · 清除筛选
            </button>
          ) : null}
        </div>
        {relatedProblems.length ? (
          <div className="space-y-2">
            {relatedProblems.map((problem) => (
              <div
                key={trackingProblemKey(problem)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                        priBadgeClass[problem.pri]
                      }`}
                    >
                      {problem.pri}
                    </span>
                    {onProblemJump ? (
                      <button
                        type="button"
                        aria-label={`定位问题：${problem.kb}`}
                        onClick={() => onProblemJump(problem)}
                        className="break-words rounded text-left text-sm font-medium text-slate-800 hover:text-blue-600 focus-visible:outline-blue-600"
                      >
                        {problem.kb}
                      </button>
                    ) : (
                      <span className="text-sm font-medium text-slate-800">
                        {problem.kb}
                      </span>
                    )}
                  </div>
                  <CiPainTrackingButton problem={problem} />
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                  {problem.title}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 break-words text-xs text-slate-500">
                  <span>
                    {problem.seg_cross?.join('、') ||
                      problem.seg ||
                      '跨段/未映射'}
                  </span>
                  <span>
                    {problem.impact.runs} 次执行 · {problem.impact.prs} 个 PR
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-slate-200 bg-white px-4 py-5 text-sm text-slate-500">
            {priority ? '该优先级暂无问题' : '该维度当日暂无问题'}
          </p>
        )}
      </div>
    </div>
  );
};

export default CiMetricDetails;
