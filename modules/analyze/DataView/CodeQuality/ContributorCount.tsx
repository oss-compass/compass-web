import React, { useMemo, useRef } from 'react';
import {
  ChartProps,
  genSeries,
  getLineOption,
  line,
} from '@modules/analyze/options';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/menus';
import EChartX from '@common/components/EChartX';
import {
  getLegendName,
  TransOpts,
  TransResult,
  transToAxis,
} from '@modules/analyze/DataTransform/transToAxis';
import { EChartsOption, LineSeriesOption } from 'echarts';
import LazyLoadCard from '@modules/analyze/components/LazyLoadCard';
import { useInViewport } from 'ahooks';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'Total', valueKey: 'contributorCount' },
    {
      legendName: 'Code reviewer',
      valueKey: 'activeC1PrCommentsContributorCount',
    },
    {
      legendName: 'PR creator',
      valueKey: 'activeC1PrCreateContributorCount',
    },
    { legendName: 'Commit author', valueKey: 'activeC2ContributorCount' },
  ],
};

const getOptions = ({ xAxis, yResults }: TransResult) => {
  const series = genSeries<LineSeriesOption>(
    yResults,
    ({ legendName, label, level, isCompare, color, data }) => {
      return line({
        name: getLegendName(legendName, { label, level, isCompare }),
        data: data,
        color,
      });
    }
  );
  return getLineOption({ xAxisData: xAxis, series });
};

const Chart: React.FC<ChartProps> = ({ containerRef }) => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const { xAxis, yResults } = useMemo(() => {
    return transToAxis(data, tansOpts);
  }, [data]);

  const echartsOpts = useMemo(() => {
    return getOptions({ xAxis, yResults });
  }, [xAxis, yResults]);

  return (
    <EChartX
      option={echartsOpts}
      loading={isLoading}
      containerRef={containerRef}
    />
  );
};

const ContributorCount = () => {
  return (
    <LazyLoadCard
      title="Contributors"
      id={CodeQuality.ContributorCount}
      description={
        'Determine how many active pr creators, code reviewers, commit authors there are in the past 90 days.'
      }
    >
      <Chart />
    </LazyLoadCard>
  );
};
export default ContributorCount;
