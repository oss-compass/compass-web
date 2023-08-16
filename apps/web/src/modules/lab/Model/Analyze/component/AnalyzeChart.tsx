import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useLabModelVersionReportDetailQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import AnalyzeChartTotalCard from './AnalyzeChartTotalCard';
import AnalyzeChartCard from './AnalyzeChartCard';
import AnalyzeChartNav from './AnalyzeChartNav';

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
  const router = useRouter();
  const modelId = Number(router.query.model);
  const versionId = Number(router.query.version);
  const shortCode = router.query.slugs as string;
  console.log('----------router.query----------', router.query);

  const { data, isLoading } = useLabModelVersionReportDetailQuery(
    gqlClient,
    {
      modelId,
      versionId,
      shortCode,
    },
    {
      enabled: Boolean(modelId) && Boolean(versionId) && Boolean(shortCode),
    }
  );

  const mainScore = data?.labModelVersionReportDetail?.mainScore || {};
  const panels = data?.labModelVersionReportDetail?.panels || [];

  const getContent = () => {
    return (
      <>
        <div className="mb-10">
          <AnalyzeChartTotalCard mainScore={mainScore} />
        </div>
        <div className="relative mb-12 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
          {panels?.map?.((panel) => {
            return <AnalyzeChartCard key={panel.metric.id} panel={panel} />;
          })}
        </div>
      </>
    );
  };

  return (
    <>
      <AnalyzeChartNav />
      <div className="relative flex min-w-0 flex-1 flex-col px-10 pt-8 md:p-0">
        {isLoading ? <LoadingUi /> : getContent()}
      </div>
    </>
  );
};

export default AnalyzeChart;
