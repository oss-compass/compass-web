import React, { useState } from 'react';
import type {
  CiDimKey,
  CiPri,
  CiJourneyFocus,
  CiProblem,
  CiRepoData,
  CiRepoKey,
  CiJourney,
} from '../../types';
import { problemKey } from '../../helpers';
import { Collapsible, EmptyState } from '../shared';
import Appendix from '../Appendix';
import CiReportOverview from './CiReportOverview';
import CiJourneyPanorama from './CiJourneyPanorama';
import DailyDrilldown from './DailyDrilldown';

import { CiPainTrackingProvider } from '../PainTracking';
import { uniqueProblems } from '../PainTracking/model';
import type { CiReportContext } from '../../reportContext';
import { CiRepositoryProvider } from '../../repository';

type CiReportProps = {
  journey: CiJourney;
  context?: CiReportContext;
  data: CiRepoData;
  repo: CiRepoKey;
  day: string;
  org?: string;
};

const CiReport: React.FC<CiReportProps> = ({
  data,
  journey,
  context,
  repo,
  day,
  org,
}) => {
  const scope = {
    org: data.org || org || '',
    repo,
    workflow: data.workflow,
    day,
  };
  const journeyBoard = journey.boards[day];
  const problems = uniqueProblems([
    ...(data.boards[day]?.problems ?? []),
    ...(journeyBoard?.stages.flatMap((stage) => stage.problems) ?? []),
    ...(journeyBoard?.unsegProblems ?? []),
  ]).sort((a, b) => a.pri.localeCompare(b.pri) || b.impact.prs - a.impact.prs);
  const [dimension, setDimension] = useState<CiDimKey | null>(null);
  const [priority, setPriority] = useState<CiPri | null>(null);
  const resetFilters = () => {
    setDimension(null);
    setPriority(null);
  };
  const [journeyFocus, setJourneyFocus] = useState<CiJourneyFocus | null>(null);
  const handleProblemJump = (p: CiProblem) => {
    setJourneyFocus({
      seg: p.seg || '__unseg',
      probKey: problemKey(p),
      nonce: Date.now(),
    });
  };

  if (!data.days.length) {
    return (
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
        <h2 className="mb-3 text-base font-semibold text-slate-900">报告</h2>
        <EmptyState>该仓库数据落库中，暂无报告内容。</EmptyState>
      </section>
    );
  }

  return (
    <CiRepositoryProvider value={data.repository_url}>
      <div className="flex flex-col gap-4">
        <CiPainTrackingProvider
          key={JSON.stringify(scope)}
          scope={scope}
          repo={repo}
          problems={problems}
          activeDimension={dimension}
          activePriority={priority}
          onResetFilters={resetFilters}
          onProblemJump={handleProblemJump}
        >
          <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-4">
            <CiReportOverview
              journey={journey}
              context={context}
              day={day}
              board={data.boards[day]}
              onProblemJump={handleProblemJump}
              problems={problems}
              activeDimension={dimension}
              activePriority={priority}
              onFilterChange={(nextDimension, nextPriority) => {
                setDimension(nextDimension);
                setPriority(nextPriority);
              }}
            />

            <div className="mt-2 border-slate-100 pt-5">
              <CiJourneyPanorama
                journey={journey}
                repo={repo}
                workflow={data.workflow}
                day={day}
                focus={journeyFocus}
              />
            </div>
          </div>
        </CiPainTrackingProvider>
        <DailyDrilldown data={data} day={day} />

        <Collapsible
          className="!rounded-xl !border-slate-200"
          summary={
            <span className="inline-block py-2 text-base font-semibold text-slate-900">
              评分口径与数据来源
            </span>
          }
        >
          <Appendix context={context} />
        </Collapsible>
      </div>
    </CiRepositoryProvider>
  );
};

export default CiReport;
