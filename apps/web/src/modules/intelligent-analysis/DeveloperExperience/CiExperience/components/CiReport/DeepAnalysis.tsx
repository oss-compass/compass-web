import React from 'react';
import { Collapsible } from '../shared';
import { fmt } from '../../helpers';
import type { CiReportContext } from '../../reportContext';

// 风险色与标签属于展示约定，分析内容及风险状态来自当日报告 API。
const TONE = {
  crit: { className: 'border-l-rose-400', label: '重点' },
  warn: { className: 'border-l-amber-400', label: '关注' },
  good: { className: 'border-l-emerald-400', label: '平稳' },
  neutral: { className: 'border-l-slate-300', label: '未评估' },
};

const DeepAnalysis: React.FC<{ context?: CiReportContext }> = ({ context }) => (
  <Collapsible
    summary={
      <span className="text-base font-semibold text-slate-900">深度分析</span>
    }
  >
    {!context ? (
      <p className="text-sm text-slate-500">暂无当日分析数据</p>
    ) : (
      <div className="space-y-4">
        <p className="text-xs text-slate-500">
          {context.name} · {context.day} · {context.workflow}
        </p>
        {context.findings.length ? (
          <div className=">lg:grid-cols-2 grid grid-cols-1 gap-3">
            {context.findings.map((finding) => {
              const tone = TONE[finding.tone] || TONE.neutral;
              return (
                <article
                  key={finding.key}
                  className={`rounded-xl border border-l-4 border-slate-200 bg-white p-4 ${tone.className}`}
                >
                  <h3 className="font-semibold text-slate-800">
                    {finding.title}{' '}
                    <span className="text-xs font-normal text-slate-500">
                      {tone.label}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {finding.summary}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {finding.metrics.map((metric) => {
                      const value = fmt(metric.value);
                      return (
                        <li key={metric.label}>
                          {metric.label}：{value.text}
                          {value.demo ? '〔示例〕' : ''}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-3 text-sm text-slate-600">
                    {finding.recommendations.length ? (
                      finding.recommendations.map((item) => (
                        <p key={item}>建议：{item}</p>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400">
                        当前报告未提供改进建议
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">当前报告暂无分析明细</p>
        )}
      </div>
    )}
  </Collapsible>
);
export default DeepAnalysis;
