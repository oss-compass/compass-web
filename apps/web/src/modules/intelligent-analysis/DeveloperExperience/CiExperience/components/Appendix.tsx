import React from 'react';
import type { CiReportContext } from '../reportContext';
import type { CiRepoData } from '../types';
import { fmt } from '../helpers';
import CiScoreDetails from './CiScoreDetails';

const Appendix: React.FC<{
  context?: CiReportContext;
  repositories?: Record<string, CiRepoData>;
}> = ({ context, repositories }) => {
  if (repositories)
    return (
      <div className="space-y-3 text-sm text-slate-600">
        <p>
          以下范围取自当前加载的后端数据；指标与评分口径详见对应仓库日报告。
        </p>
        {Object.entries(repositories).map(([repo, data]) => (
          <p key={repo}>
            {data.name} · {data.days[0] || '未提供'} 至{' '}
            {data.days[data.days.length - 1] || '未提供'} · {data.days.length}{' '}
            个观测日
          </p>
        ))}
      </div>
    );
  if (!context)
    return <p className="text-sm text-slate-500">暂无当日口径与来源数据</p>;
  return (
    <div className="space-y-5 text-sm text-slate-600">
      <section>
        <h3 className="mb-2 font-semibold text-slate-800">当日评分口径</h3>
        <CiScoreDetails context={context} />
      </section>
      <section>
        <h3 className="mb-2 font-semibold text-slate-800">当日指标</h3>
        {context.metrics.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>维度</th>
                  <th>指标</th>
                  <th>观测值</th>
                </tr>
              </thead>
              <tbody>
                {context.metrics.map((metric, index) => {
                  const value = fmt(metric.value);
                  return (
                    <tr key={`${metric.dimension}:${metric.label}:${index}`}>
                      <td className="py-2 pr-4">{metric.dimension}</td>
                      <td className="pr-4">{metric.label}</td>
                      <td>
                        {value.text}
                        {value.demo ? '〔示例〕' : ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>当前报告未提供指标明细</p>
        )}
      </section>
      <section>
        <h3 className="mb-2 font-semibold text-slate-800">当日问题分类</h3>
        <p className="mb-2 text-xs text-slate-500">
          {context.taxonomy_note}共 {context.problem_count} 个问题。
        </p>
        {context.taxonomy.length ? (
          context.taxonomy.map((row) => (
            <p key={`${row.classification}:${row.mechanism}`}>
              {row.classification} · {row.mechanism}：{row.problem_count} 个问题
              · {row.owners.join('、') || '责任方未提供'}
            </p>
          ))
        ) : (
          <p>当日报告无问题卡</p>
        )}
      </section>
      <section>
        <h3 className="mb-2 font-semibold text-slate-800">数据来源与范围</h3>
        <p>
          {context.name} · {context.day} · {context.workflow}
        </p>
        <p>字典版本：{context.dict_version || '未提供'}</p>
        <p>
          生成时间：{context.generated_at || '未提供'} · 入库时间：
          {context.uploaded_at || '未提供'}
        </p>
      </section>
    </div>
  );
};
export default Appendix;
