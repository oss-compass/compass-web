import React from 'react';
import type { CiReportContext } from '../reportContext';
import { DIM_NAME } from '../helpers';
import type { CiDimKey } from '../types';

const CiScoreDetails: React.FC<{ context?: CiReportContext }> = ({
  context,
}) => {
  if (!context)
    return <p className="text-sm text-slate-500">暂无评分口径数据</p>;
  return (
    <div className="space-y-3 text-sm text-slate-600">
      <p>
        观测日：{context.day} · 评分版本：{context.caliber || '未提供'}
      </p>
      {context.score_note ? <p>{context.score_note}</p> : null}
      {context.rules ? (
        <p className="whitespace-pre-wrap">{context.rules}</p>
      ) : (
        <p>当前报告未提供评分公式与阈值。</p>
      )}
      {context.score_dimensions.map((dim) => (
        <div key={dim.key}>
          <p className="font-semibold">
            {DIM_NAME[dim.key as CiDimKey] || dim.key}：{dim.score ?? '未评估'}
          </p>
          <ul className="mt-1 list-inside list-disc">
            {dim.metrics.map((metric) => (
              <li key={metric.label}>
                {metric.label}：{metric.score ?? '未评估'}
                {metric.weight != null ? ` · 权重 ${metric.weight}` : ''}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default CiScoreDetails;
