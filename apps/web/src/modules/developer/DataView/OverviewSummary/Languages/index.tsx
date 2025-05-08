import React from 'react';
import { MetricQuery, SummaryQuery } from '@oss-compass/graphql';
import useMetricQueryData from '@modules/developer/hooks/useMetricQueryData';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import { Level } from '@modules/developer/constant';
import Languages from './Languages';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import BaseCard from '@modules/developer/components/DeveloperCard';

const Overview: React.FC<{
  data: DeepReadonly<
    { label: string; level: Level; result: MetricQuery | undefined }[]
  >;
}> = ({ data }) => {
  if (data.length == 1) {
    return (
      <BaseCard
        title={'编程语言'}
        description=""
        className="h-[300px]"
        bodyClass="h-[220px]"
        headRight={(ref, fullScreen, setFullScreen) => (
          <>
            <CardDropDownMenu
              cardRef={ref}
              fullScreen={fullScreen}
              onFullScreen={(b) => {
                setFullScreen(b);
              }}
              enableReferenceLineSwitch={false}
            />
          </>
        )}
      >
        {(containerRef) => (
          <Languages />
          // <EChartX
          //   option={echartsOpts}
          //   loading={loading}
          //   containerRef={containerRef}
          // />
        )}
      </BaseCard>
    );
  }

  return null;
};

const OverviewSummary = () => {
  const { items, loading } = useMetricQueryData();
  if (loading) {
    return <Loading />;
  }
  return <Overview data={items} />;
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
