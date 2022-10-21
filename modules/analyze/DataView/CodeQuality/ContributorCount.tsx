import React, { useEffect, useMemo, useRef } from 'react';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import EChartX from '@common/components/EChartX';
import {
  ChartComponentProps,
  getLineOption,
  line,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/menus';
import {
  pickKeyGroupToYAxis,
  pickKeyToXAxis,
  pickKeyToYAxis,
} from '@modules/analyze/options/metric';
import { colorGenerator } from '@modules/analyze/options/color';

const ContributorCount: React.FC<ChartComponentProps> = ({
  loading = false,
  xAxis,
  yAxis,
}) => {
  const echartsOpts = useMemo(() => {
    const gen = colorGenerator();
    const series = yAxis.map(({ name, label, data }) => {
      const color = gen(label);
      return line({ name, data, color });
    });
    return getLineOption({ xAxisData: xAxis, series });
  }, [xAxis, yAxis]);

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

  const xAxis = useMemo(() => {
    return pickKeyToXAxis(data, {
      typeKey: 'metricCodequality',
      valueKey: 'grimoireCreationDate',
    });
  }, [data]);

  const yAxis = useMemo(() => {
    return pickKeyGroupToYAxis(data, [
      {
        typeKey: 'metricCodequality',
        valueKey: 'contributorCount',
        legendName: 'Total',
      },
      {
        typeKey: 'metricCodequality',
        valueKey: 'activeC1PrCommentsContributorCount',
        legendName: 'PR comments',
      },
      {
        typeKey: 'metricCodequality',
        valueKey: 'activeC1PrCreateContributorCount',
        legendName: 'PR create',
      },
    ]);
  }, [data]);

  return <ContributorCount loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default ContributorCountWithData;
