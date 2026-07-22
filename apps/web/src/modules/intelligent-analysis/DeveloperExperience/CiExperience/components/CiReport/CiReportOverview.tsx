import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import type { CiDimKey, CiRepoKey } from '../../types';
import { CI_JOURNEY } from './journeyData';

type CiReportOverviewProps = {
  repo: CiRepoKey;
  day: string;
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

const CiReportOverview: React.FC<CiReportOverviewProps> = ({ repo, day }) => {
  const journey = CI_JOURNEY[repo];
  const board =
    journey.boards[day] ??
    journey.boards[journey.days[journey.days.length - 1]];
  const scores = board?.scores ?? null;
  const dimensionScores = DIMENSIONS.map((dimension) => ({
    ...dimension,
    value: scores?.dims[dimension.key]?.score ?? null,
  }));
  const metrics = [
    {
      key: 'overall',
      title: '综合体验评分',
      description:
        '当日四维加权综合评分，取自验证仓评分口径（日分仅观察、周分为准）。',
      value: scores?.total ?? null,
    },
    ...dimensionScores,
  ];

  return (
    <div>
      <div className="mb-2 text-base font-semibold text-slate-800">
        报告概览
      </div>
      <div className="grid grid-cols-5 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.key}
            className="flex min-w-0 flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.05)]"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-slate-500">
                <span className="truncate">{metric.title}</span>
                <Tooltip title={metric.description}>
                  <InfoCircleOutlined className="shrink-0 cursor-help text-slate-400" />
                </Tooltip>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <div className="text-2xl font-semibold leading-none text-slate-900">
                {metric.value ?? '—'}
              </div>
              {metric.value != null ? (
                <div className="text-sm font-medium text-slate-500">分</div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CiReportOverview;
