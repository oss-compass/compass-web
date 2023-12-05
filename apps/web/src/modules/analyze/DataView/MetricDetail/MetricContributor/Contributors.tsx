import React, { useRef, useMemo } from 'react';
import { useContributorsOverviewQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import MetricChart from '@modules/analyze/DataView/MetricDetail/MetricChart';
import { gradientRamp } from '@common/options';
import type { EChartsOption } from 'echarts';
import { useGetEcologicalText } from './contribution';

const ContributorContributors: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
  mileage: string[];
}> = ({ label, level, beginDate, endDate, mileage }) => {
  const { t } = useTranslation();
  const getEcologicalText = useGetEcologicalText();
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useContributorsOverviewQuery(client, {
    label: label,
    level: level,
    beginDate: beginDate,
    endDate: endDate,
    filterOpts: [{ type: 'mileage_type', values: mileage }],
  });

  const getSeries = useMemo(() => {
    const legend = [];
    const ecoData = [];
    const contributorsData = [];
    if (data?.orgContributorsDistribution?.length > 0) {
      const orgContributorsDistribution = data.orgContributorsDistribution;
      orgContributorsDistribution.forEach((item, i) => {
        const { subTypeName, topContributorDistribution } = item;
        const name = getEcologicalText(subTypeName);
        const colorList = gradientRamp[i];
        let count = 0;
        topContributorDistribution.forEach(({ subCount, subName }, index) => {
          count += subCount;
          contributorsData.push({
            parentName: name,
            name: subName,
            value: subCount,
            itemStyle: { color: colorList[index + 1] },
          });
        });
        legend.push({
          name: name,
          itemStyle: { color: colorList[0] },
        });
        ecoData.push({
          name: name,
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
  const unit: string = t('analyze:metric_detail:contributor_unit');
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
      text: t('analyze:metric_detail:contributor_distribution'),
      left: 'center',
    },
    series: [
      {
        top: 15,
        name: '',
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
        name: '',
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
    <div className="h-[600px] pt-4" ref={chartRef}>
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
export default ContributorContributors;
