import React, { useId, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { CiDimKey, CiPri, CiProblem, CiJourney } from '../../types';
import { DIM_NAME } from '../../helpers';
import type { CiReportContext } from '../../reportContext';
import CiScoreDetails from '../CiScoreDetails';
import CiMetricDetails, { type CiMetricDetailsBoard } from './CiMetricDetails';

type CiReportOverviewProps = {
  journey: CiJourney;
  context?: CiReportContext;
  day: string;
  board?: CiMetricDetailsBoard;
  onProblemJump?: (problem: CiProblem) => void;
  problems: CiProblem[];
  activeDimension: CiDimKey | null;
  activePriority: CiPri | null;
  onFilterChange: (dimension: CiDimKey | null, priority: CiPri | null) => void;
};

const DIMENSIONS: CiDimKey[] = [
  'stability',
  'efficiency',
  'interaction',
  'cost',
];
const PRIORITIES: CiPri[] = ['P0', 'P1', 'P2'];
const PRIORITY_CLASS: Record<CiPri, string> = {
  P0: 'bg-rose-50 text-rose-700 hover:bg-rose-100',
  P1: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
  P2: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
};
const CARD_CLASS =
  'flex min-w-0 items-stretch justify-between gap-x-3 rounded-2xl border px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.05)] md:gap-x-2 md:px-3';

const ScoreValue: React.FC<{
  score: number | null | undefined;
  overall?: boolean;
}> = ({ score, overall = false }) => (
  <span className="mt-3 flex items-baseline gap-1.5">
    <span
      className={`font-semibold tabular-nums leading-none text-slate-900 ${
        score == null ? 'text-base' : 'text-2xl'
      }`}
    >
      {score ?? '未评估'}
    </span>
    {score != null ? (
      <span className="text-sm font-medium text-slate-500">
        {overall ? '/ 100' : '分'}
      </span>
    ) : null}
  </span>
);

const CiReportOverview: React.FC<CiReportOverviewProps> = ({
  journey,
  context,
  day,
  board,
  onProblemJump,
  problems,
  activeDimension,
  activePriority,
  onFilterChange,
}) => {
  const scores = journey.boards[day]?.scores;
  const [scoreDetailsOpen, setScoreDetailsOpen] = useState(false);
  const detailsId = useId();
  const expanded = scoreDetailsOpen ? 'overall' : activeDimension;
  const selectDimension = (
    dimension: CiDimKey | null,
    priority: CiPri | null
  ) => {
    setScoreDetailsOpen(false);
    onFilterChange(dimension, priority);
  };
  const closeDetails = () => {
    setScoreDetailsOpen(false);
    onFilterChange(null, null);
  };

  return (
    <section aria-label="报告概览">
      <h2 className="mb-3 text-base font-semibold text-slate-800">报告概览</h2>
      <div className="grid grid-cols-5 gap-4 md:grid-cols-2 md:gap-3 xl:grid-cols-3">
        <button
          type="button"
          aria-label={`综合体验评分，${scores?.total ?? '未评估'}${
            scores?.total != null ? '分' : ''
          }，查看评分说明`}
          aria-expanded={expanded === 'overall'}
          aria-controls={detailsId}
          onClick={() => {
            setScoreDetailsOpen((open) => !open);
            onFilterChange(null, null);
          }}
          className={`${CARD_CLASS} flex-col !justify-center text-left transition-colors hover:border-slate-300 focus-visible:outline-blue-600 md:col-span-2 ${
            expanded === 'overall'
              ? 'border-blue-300 bg-blue-50/50'
              : 'border-slate-200/80 bg-white/90'
          }`}
        >
          <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
            综合体验评分{' '}
            <DownOutlined
              aria-hidden
              className={`text-xs text-slate-400 transition-transform ${
                expanded === 'overall' ? 'rotate-180' : ''
              }`}
            />
          </span>
          <ScoreValue score={scores?.total} overall />
        </button>
        {DIMENSIONS.map((dimension) => {
          const score = scores?.dims[dimension]?.score;
          const active = activeDimension === dimension;
          const priorities = PRIORITIES.map((priority) => ({
            priority,
            count: problems.filter(
              (problem) =>
                problem.dimkey === dimension && problem.pri === priority
            ).length,
          })).filter(({ count }) => count > 0);
          return (
            <div
              key={dimension}
              className={`${CARD_CLASS} ${
                active
                  ? 'border-blue-300 bg-blue-50/50'
                  : 'border-slate-200/80 bg-white/90'
              }`}
            >
              <button
                type="button"
                aria-label={`${DIM_NAME[dimension]}，${score ?? '未评估'}${
                  score != null ? '分' : ''
                }`}
                aria-pressed={active && activePriority === null}
                aria-expanded={active}
                aria-controls={detailsId}
                onClick={() => selectDimension(active ? null : dimension, null)}
                className="flex min-w-0 flex-1 flex-col justify-center rounded text-left focus-visible:outline-blue-600"
              >
                <span className="text-sm font-medium text-slate-500">
                  {DIM_NAME[dimension]}
                  <DownOutlined
                    aria-hidden
                    className={`ml-1 text-[10px] text-slate-400 transition-transform ${
                      active ? 'rotate-180' : ''
                    }`}
                  />
                </span>
                <ScoreValue score={score} />
              </button>
              {priorities.length ? (
                <div className="flex shrink-0 flex-col justify-center gap-1">
                  {priorities.map(({ priority, count }) => {
                    const selected = active && activePriority === priority;
                    return (
                      <button
                        key={priority}
                        type="button"
                        aria-label={`筛选${DIM_NAME[dimension]} ${priority} 问题，${count} 项`}
                        aria-pressed={selected}
                        onClick={() =>
                          selectDimension(dimension, selected ? null : priority)
                        }
                        className={`inline-flex items-center justify-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium tabular-nums transition-colors focus-visible:outline-blue-600 ${
                          selected
                            ? 'bg-blue-100 text-blue-700'
                            : PRIORITY_CLASS[priority]
                        }`}
                      >
                        <span>{priority}</span>
                        <span>·</span>
                        <span>{count}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {expanded ? (
        <section
          id={detailsId}
          aria-label={
            expanded === 'overall'
              ? '综合评分详情'
              : `${DIM_NAME[expanded]}详情`
          }
          className="mt-4 min-w-0 rounded-xl border border-slate-200 bg-slate-50/40 p-4 md:p-3"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="text-base font-semibold text-slate-900">
                {expanded === 'overall'
                  ? '综合评分详情'
                  : `${DIM_NAME[expanded]}详情`}
              </h3>
              <span className="text-xs text-slate-500">{day}</span>
            </div>
            <button
              type="button"
              onClick={closeDetails}
              aria-label="收起指标详情"
              className="rounded px-2 py-1 text-sm text-slate-500 hover:bg-slate-100 focus-visible:outline-blue-600"
            >
              收起{' '}
              <DownOutlined aria-hidden className="ml-1 rotate-180 text-xs" />
            </button>
          </div>
          {expanded === 'overall' ? (
            <div className="max-h-96 overflow-y-auto">
              <CiScoreDetails context={context} />
            </div>
          ) : (
            <CiMetricDetails
              dimension={expanded}
              priority={activePriority}
              board={board}
              problems={problems}
              onClearPriority={() => selectDimension(expanded, null)}
              onProblemJump={onProblemJump}
            />
          )}
        </section>
      ) : null}
    </section>
  );
};

export default CiReportOverview;
