import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useLabModelVersionReportDetailQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import AnalyzeChartTotalCard from './AnalyzeChartTotalCard';
import AnalyzeChartCard from './AnalyzeChartCard';
import AnalyzeChartNav from './AnalyzeChartNav';
import mockData from './data.json';

const AnalyzeChart = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const modelId = Number(router.query.model);
  const versionId = Number(router.query.version);
  const shortCode = router.query.shortCode as string;

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

  const mainScore = mockData?.labModelVersionReportDetail?.mainScore;
  const panels = mockData?.labModelVersionReportDetail?.panels;

  return (
    <>
      <AnalyzeChartNav />
      <div className="relative flex min-w-0 flex-1 flex-col px-10 pt-8 md:p-0">
        <div className="mb-10">
          <AnalyzeChartTotalCard mainScore={mainScore} />
        </div>
        <div className="relative mb-12 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
          {panels?.map?.((panel) => {
            return <AnalyzeChartCard key={panel.metric.id} panel={panel} />;
          })}
        </div>
      </div>
    </>
  );
};

export default AnalyzeChart;
