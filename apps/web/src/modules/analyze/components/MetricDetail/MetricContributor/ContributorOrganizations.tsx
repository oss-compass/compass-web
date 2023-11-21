import React, { useRef, useMemo } from 'react';
import { useOrgContributorsOverviewQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import MetricChart from '@modules/analyze/components/MetricDetail/MetricChart';
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
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useOrgContributorsOverviewQuery(client, {
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
    if (data?.orgContributorsOverview?.length > 0) {
      const ecoContributorsOverview = data.orgContributorsOverview;
      ecoContributorsOverview.forEach((item, i) => {
        const { subTypeName, topContributorDistribution } = item;
        const colorList = gradientRamp[i];
        let count = 0;
        topContributorDistribution.forEach(({ subCount, subName }, index) => {
          count += subCount;
          contributorsData.push({
            parentName: subTypeName,
            name: subName,
            value: subCount,
            itemStyle: { color: colorList[index + 1] },
          });
        });
        legend.push({
          name: subTypeName,
          itemStyle: { color: colorList[0] },
        });
        ecoData.push({
          name: subTypeName,
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

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      top: '2%',
      left: 'center',
      data: getSeries.legend,
    },
    series: [
      {
        name: '生态类型',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '45%'],
        label: {
          position: 'inner',
          fontSize: 12,
          color: '#333',
          formatter: '{b}: {c} ({d}%)',
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
        name: '贡献者',
        type: 'pie',
        radius: ['55%', '67%'],
        labelLine: {
          length: 30,
        },
        label: {
          formatter: '{b}: {c} ({d}%)',
          color: '#333',
        },
        data: getSeries.contributorsData,
      },
    ],
  };

  return (
    <div className="flex-1 pt-4" ref={chartRef}>
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
