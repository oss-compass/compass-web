import React from 'react';
import { MetricQuery, SummaryQuery } from '@oss-compass/graphql';
import useMetricQueryData from '@modules/developer/hooks/useMetricQueryData';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import { Level } from '@modules/developer/constant';
import DeveloperDashboard from './DeveloperDashboard';
import Calendar from './Calendar';
import Languages from './Languages';
import LineChart from './LineChart';
import TopRepo from './TopRepo';
import Radar from './Radar';
import Cloud from './Cloud';

import ConnectLineMini from '@modules/developer/components/ConnectLineMini';

const Overview: React.FC<{
  data: DeepReadonly<
    { label: string; level: Level; result: MetricQuery | undefined }[]
  >;
}> = ({ data }) => {
  if (data.length == 1) {
    return (
      <>
        <div className="flex gap-4 md:flex-col">
          <div className="min-w-0 flex-1 ">
            <LineChart />
          </div>
        </div>
      </>
    );
  }

  return null;
};

const OverviewSummary = () => {
  const { items, loading } = useMetricQueryData();
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="relative mb-4 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
      <DeveloperDashboard />
      <Languages />
      <TopRepo />
      {/* <ConnectLineMini /> */}
      <Calendar />
      <Radar />
      <Cloud />
    </div>
  );
};
const Loading = () => (
  <div className="h-[430px] animate-pulse rounded border bg-white p-10 px-6 py-6 shadow">
    <div className="flex-1 space-y-4">
      <div className="h-4 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-4 rounded bg-slate-200"></div>
        <div className="col-span-1 h-4 rounded bg-slate-200"></div>
      </div>
      <div className="h-4 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-4 rounded bg-slate-200"></div>
        <div className="col-span-2 h-4 rounded bg-slate-200"></div>
      </div>
      <div className="h-4 rounded bg-slate-200"></div>
      <div className="h-4 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-4 rounded bg-slate-200"></div>
        <div className="col-span-1 h-4 rounded bg-slate-200"></div>
      </div>
      <div className="h-4 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-4 rounded bg-slate-200"></div>
        <div className="col-span-2 h-4 rounded bg-slate-200"></div>
      </div>
      <div className="h-4 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-4 rounded bg-slate-200"></div>
        <div className="col-span-2 h-4 rounded bg-slate-200"></div>
      </div>
      <div className="h-4 rounded bg-slate-200"></div>
    </div>
  </div>
);
export default withErrorBoundary(OverviewSummary, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
