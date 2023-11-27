import React, { useRef, useMemo } from 'react';
import { useContributorsOverviewQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import MetricChart from '@modules/analyze/DataView/MetricDetail/MetricChart';
import { useEcologicalType } from './contribution';
import { getPieOption } from '@modules/analyze/DataView/MetricDetail/metricChartOption';

const ContributorContributors: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
  mileage: string[];
}> = ({ label, level, beginDate, endDate, mileage }) => {
  const { t } = useTranslation();
  const ecologicalOptions = useEcologicalType();
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useContributorsOverviewQuery(client, {
    label: label,
    level: level,
    beginDate: beginDate,
    endDate: endDate,
    filterOpts: [{ type: 'mileage_type', values: mileage }],
  });
  const getEcologicalText = (text) => {
    return ecologicalOptions.find((i) => i.value === text)?.text || text;
  };
  const getSeries = useMemo(() => {
    return data?.ecoDistributionOverview?.map(({ subCount, subName }) => {
      return {
        name: getEcologicalText(subName),
        value: subCount,
      };
    });
  }, [data]);
  const unit: string = t('analyze:metric_detail:contributor_unit');
  const formatter = '{b} : {c}' + unit + ' ({d}%)';
  const option = getPieOption({ seriesData: getSeries, formatter });

  return (
    <div className="h-[600px] pt-4" ref={chartRef}>
      <MetricChart
        style={{ height: '100%' }}
        loading={isLoading}
        option={option}
        containerRef={chartRef}
      />
    </div>
  );
};
export default ContributorContributors;
