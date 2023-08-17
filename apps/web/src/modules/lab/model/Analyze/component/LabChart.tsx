import React from 'react';
import useLabData from '../hooks/useLabData';
import LabChartNav from './LabChartNav';
import ChartTotalCard from './ChartTotalCard';
import LabMetricsLayout from './LabMetricsLayout';

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

const AnalyzeChart = () => {
  const { loading } = useLabData();
  const getContent = () => {
    return (
      <>
        <div className="mb-10">
          <ChartTotalCard />
        </div>
        <div className="relative mb-12 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
          <LabMetricsLayout />
        </div>
      </>
    );
  };

  return (
    <>
      <LabChartNav />
      <div className="relative flex min-w-0 flex-1 flex-col px-10 pt-8 md:p-0">
        {loading ? <LoadingUi /> : getContent()}
      </div>
    </>
  );
};

export default AnalyzeChart;
