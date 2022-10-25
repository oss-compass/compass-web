import React, { useEffect, useMemo, useRef } from 'react';
import EChartX from '@common/components/EChartX';
import { ChartProps, getLineOption, line } from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/menus';
import { colorGenerator } from '@modules/analyze/options/color';
import {
  getLegendName,
  transToAxis,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import { toFixed } from '@common/utils';

const ContributorCount: React.FC<ChartProps> = ({
  loading = false,
  xAxis,
  comparesYAxis,
}) => {
  const echartsOpts = useMemo(() => {
    const gen = colorGenerator();
    const isCompare = comparesYAxis.length > 1;
    const series = comparesYAxis.reduce<LineSeriesOption[]>(
      (acc, { label, level, yAxisResult }) => {
        const result = yAxisResult.map((item) => {
          const { legendName, data } = item;
          const color = isCompare ? gen(label) : '';
          return line({
            name: getLegendName(legendName, { label, level, isCompare }),
            data: data,
            color,
          });
        });
        acc = [...acc, ...result];
        return acc;
      },
      []
    );

    return getLineOption({ xAxisData: xAxis, series });
  }, [xAxis, comparesYAxis]);

  return (
    <BaseCard
      title="Contributors"
      id={CodeQuality.ContributorCount}
      description={`Determine how many active pr creators, code reviewers, commit authors there are in the past 90 days.`}
    >
      {(containerRef) => (
        <EChartX
          option={echartsOpts}
          loading={loading}
          containerRef={containerRef}
        />
      )}
    </BaseCard>
  );
};

const ContributorCountWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const { xAxis, yResults } = useMemo(() => {
    return transToAxis(data, {
      metricType: 'metricCodequality',
      xAxisKey: 'grimoireCreationDate',
      yAxisOpts: [
        {
          legendName: 'Total',
          valueKey: 'contributorCount',
        },
        {
          legendName: 'Code reviewer',
          valueKey: 'activeC1PrCommentsContributorCount',
        },
        {
          legendName: 'PR creator',
          valueKey: 'activeC1PrCreateContributorCount',
        },
        {
          legendName: 'Commit author',
          valueKey: 'activeC2ContributorCount',
        },
      ],
    });
  }, [data]);

  return (
    <ContributorCount
      loading={isLoading}
      xAxis={xAxis}
      comparesYAxis={yResults}
    />
  );
};

export default ContributorCountWithData;
