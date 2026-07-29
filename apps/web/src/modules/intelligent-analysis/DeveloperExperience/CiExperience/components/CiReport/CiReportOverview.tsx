import React, { useEffect, useState } from 'react';
import { DownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import type { CiDimKey, CiProblem, CiRepoData, CiRepoKey } from '../../types';
import { DIM_NAME } from '../../helpers';
import { HintIcon } from '../shared';
import ProblemPanel from '../ProblemPanel';
import { CI_JOURNEY } from './journeyData';

type CiReportOverviewProps = {
  data: CiRepoData;
  repo: CiRepoKey;
  day: string;
  /** 展开面板内问题行点击 → 跳转旅程全景图同段同问题 */
  onProblemJump?: (problem: CiProblem) => void;
};

const DIMENSIONS: Array<{
  key: CiDimKey;
  title: string;
  description: string;
}> = [
  {
    key: 'stability',
    title: '稳定性',
    description: '当日稳定性维度评分，取自验证仓评分口径。',
  },
  {
    key: 'efficiency',
    title: '效率',
    description: '当日效率维度评分，取自验证仓评分口径。',
  },
  {
    key: 'interaction',
    title: '交互体验',
    description: '当日交互体验维度评分，取自验证仓评分口径。',
  },
  {
    key: 'cost',
    title: '成本',
    description: '当日成本维度评分，取自验证仓评分口径。',
  },
];

const CiReportOverview: React.FC<CiReportOverviewProps> = ({
  data,
  repo,
  day,
  onProblemJump,
}) => {
  const journey = CI_JOURNEY[repo];
  const board =
    journey.boards[day] ??
    journey.boards[journey.days[journey.days.length - 1]];
  const scores = board?.scores ?? null;
  // 详情面板数据走逐日看板（board.problems / board.metrics），与旅程 scores 并行两套数据源
  const dayBoard =
    data.boards[day] ?? data.boards[data.days[data.days.length - 1]];

  // 选中维度：点击四维卡展开「当日问题清单与结果指标」，再次点击收起
  const [activeDim, setActiveDim] = useState<CiDimKey | null>(null);
  useEffect(() => {
    setActiveDim(null);
  }, [repo]);

  const dimensionScores = DIMENSIONS.map((dimension) => ({
    ...dimension,
    value: scores?.dims[dimension.key]?.score ?? null,
  }));
  const metrics: Array<{
    key: 'overall' | CiDimKey;
    title: string;
    description: string;
    value: number | null;
  }> = [
    {
      key: 'overall',
      title: '综合体验评分',
      description:
        '当日四维加权综合评分，取自验证仓评分口径（日分仅观察、周分为准）。',
      value: scores?.total ?? null,
    },
    ...dimensionScores,
  ];

  const toggleDim = (dim: CiDimKey) => {
    setActiveDim((cur) => (cur === dim ? null : dim));
  };

  return (
    <div>
      <div className="mb-2 text-base font-semibold text-slate-800">
        报告概览
      </div>
      <div className="grid grid-cols-5 gap-4">
        {metrics.map((metric) => {
          const clickable = metric.key !== 'overall' && Boolean(dayBoard);
          const active = clickable && activeDim === metric.key;
          return (
            <div
              key={metric.key}
              role={clickable ? 'button' : undefined}
              tabIndex={clickable ? 0 : undefined}
              aria-pressed={clickable ? active : undefined}
              onClick={
                clickable
                  ? () => toggleDim(metric.key as CiDimKey)
                  : undefined
              }
              onKeyDown={
                clickable
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleDim(metric.key as CiDimKey);
                      }
                    }
                  : undefined
              }
              title={
                clickable
                  ? `点击${active ? '收起' : '展开'}${
                      metric.title
                    } · 当日问题清单与结果指标`
                  : undefined
              }
              className={`flex min-w-0 items-center justify-between gap-2 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition-all duration-200 ${
                active ? 'ring-2 ring-violet-400' : ''
              } ${
                clickable
                  ? 'cursor-pointer hover:shadow-[0_8px_20px_rgba(15,23,42,0.10)]'
                  : ''
              }`}
            >
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-slate-500">
                  <span className="truncate">{metric.title}</span>
                  <Tooltip title={metric.description}>
                    <InfoCircleOutlined className="shrink-0 cursor-help text-slate-400" />
                  </Tooltip>
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <div className="text-2xl font-semibold leading-none text-slate-900">
                    {metric.value ?? '—'}
                  </div>
                  {metric.value != null ? (
                    <div className="text-sm font-medium text-slate-500">
                      分
                    </div>
                  ) : null}
                </div>
              </div>
              {clickable ? (
                <DownOutlined
                  className={`shrink-0 self-center text-[16px] text-blue-600 transition-transform ${
                    active ? 'rotate-180' : ''
                  }`}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      {/* 维度详情：当日问题清单与结果指标（对齐设计稿「稳定性 · 当日问题清单与结果指标」面板） */}
      {activeDim && dayBoard ? (
        <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[15px] font-semibold text-slate-900">
                {DIM_NAME[activeDim]} · 当日问题清单与结果指标
              </h3>
              <HintIcon title="点击其他维度卡切换；再次点击当前卡收起。" />
            </div>
            <button
              type="button"
              onClick={() => setActiveDim(null)}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
            >
              收起 <DownOutlined className="rotate-180 text-[10px]" />
            </button>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <ProblemPanel
              repo={repo}
              board={dayBoard}
              dim={activeDim}
              onProblemJump={onProblemJump}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CiReportOverview;
