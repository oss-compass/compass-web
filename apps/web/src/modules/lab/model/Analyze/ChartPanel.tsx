import React, { useEffect } from 'react';
import usePageLoadHashScroll from '@common/hooks/usePageLoadHashScroll';
import LabChartNav from './component/LabChartNav';
import CardTotalScore from './component/CardTotalScore';
import LayoutMetricCards from './component/LayoutMetricCards';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import useLabData from './hooks/useLabData';
import { actions } from './state';
import { useLabModelVersion } from '../hooks';

const LoadingUi = () => (
  <div className="rounded-lg bg-white  px-6 py-6 drop-shadow-sm">
    <div className=" flex-1 animate-pulse space-y-4">
      <div className="h-6 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-6 rounded bg-slate-200"></div>
        <div className="col-span-1 h-6 rounded bg-slate-200"></div>
      </div>
      <div className="h-6 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-6 rounded bg-slate-200"></div>
        <div className="col-span-2 h-6 rounded bg-slate-200"></div>
      </div>
      <div className="h-6 rounded bg-slate-200"></div>
    </div>
  </div>
);

const Content = () => {
  usePageLoadHashScroll(false);
  const { data } = useLabModelVersion();
  const isScore = data?.labModelVersion?.isScore;
  const id = useHashchangeEvent();
  useEffect(() => {
    if (id && id.startsWith('comment')) {
      actions.toggleCommentDrawer(true);
    }
  }, [id]);

  return (
    <>
      {isScore && <CardTotalScore className="mb-6" />}
      <LayoutMetricCards />
    </>
  );
};

const ChartPanel = () => {
  const { loading } = useLabData();

  return (
    <>
      <LabChartNav />
      <div className="relative flex min-w-0 flex-1 flex-col px-8 pt-6 pb-10 md:p-0">
        {loading ? <LoadingUi /> : <Content />}
      </div>
    </>
  );
};

export default ChartPanel;
