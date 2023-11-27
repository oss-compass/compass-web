import React, { useRef, useMemo } from 'react';
import { useEcoContributorsOverviewQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import MetricChart from '@modules/analyze/DataView/MetricDetail/MetricChart';
import { useEcologicalType } from './contribution';
import { gradientRamp } from '@common/options';
import type { EChartsOption } from 'echarts';

const ContributorContribution: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
  mileage: string[];
}> = ({ label, level, beginDate, endDate, mileage }) => {
  const { t } = useTranslation();
  const ecologicalOptions = useEcologicalType();
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useEcoContributorsOverviewQuery(client, {
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
    const legend = [];
    const ecoData = [];
    const contributorsData = [];
    if (data?.ecoContributorsOverview?.length > 0) {
      const ecoContributorsOverview = data.ecoContributorsOverview;
      ecoContributorsOverview.forEach((item, i) => {
        const { subTypeName, topContributorDistribution } = item;
        const colorList = gradientRamp[i];
        let count = 0;
        topContributorDistribution.forEach(({ subCount, subName }, index) => {
          count += subCount;
          contributorsData.push({
            parentName: getEcologicalText(subTypeName),
            name: subName,
            value: subCount,
            itemStyle: { color: colorList[index + 1] },
          });
        });
        legend.push({
          name: getEcologicalText(subTypeName),
          itemStyle: { color: colorList[0] },
        });
        ecoData.push({
          name: getEcologicalText(subTypeName),
          value: count,
          itemStyle: { color: colorList[0] },
        });
      });
    }
    return {
      legend,
      ecoData,
      contributorsData,
    };
  }, [data]);
  const unit: string = t('analyze:metric_detail:contribution_unit');
  const formatter = '{b} : {c}' + unit + ' ({d}%)';
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: formatter,
    },
    legend: {
      top: 40,
      left: 'center',
      data: getSeries.legend,
    },
    title: {
      text: t('analyze:metric_detail:global_contribution_distribution'),
      left: 'center',
    },
    series: [
      {
        top: 15,
        name: '生态类型',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '40%'],
        label: {
          position: 'inner',
          fontSize: 12,
          color: '#333',
          formatter: formatter,
        },
        labelLine: {
          show: false,
        },
        labelLayout: {
          hideOverlap: false,
          moveOverlap: 'shiftY',
        },
        data: getSeries.ecoData,
      },
      {
        top: 15,
        name: '贡献者',
        type: 'pie',
        radius: ['50%', '62%'],
        labelLine: {
          length: 30,
        },
        label: {
          formatter: formatter,
          color: '#333',
        },
        data: getSeries.contributorsData,
      },
    ],
  };

  return (
    <div className="h-[600px] w-[50%] flex-1 pt-4" ref={chartRef}>
      <MetricChart
        style={{ height: '100%' }}
        loading={isLoading}
        option={option}
        containerRef={chartRef}
        filterData={getSeries.contributorsData}
      />
    </div>
  );
};
export default ContributorContribution;
