import React from 'react';
import { useTranslation } from 'next-i18next';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import { CodeQuality } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'total', valueKey: 'contributorCount' },
    {
      legendName: 'code reviewer',
      valueKey: 'activeC1PrCommentsContributorCount',
    },
    {
      legendName: 'pr creator',
      valueKey: 'activeC1PrCreateContributorCount',
    },
    { legendName: 'commit author', valueKey: 'activeC2ContributorCount' },
  ],
};

const getOptions = ({ xAxis, yResults }: TransResult) => {
  const series = genSeries<LineSeriesOption>(
    yResults,
    (
      { legendName, label, compareLabels, level, isCompare, color, data },
      len
    ) => {
      return line({
        name: getLegendName(legendName, {
          label,
          compareLabels,
          level,
          isCompare,
          legendTypeCount: len,
        }),
        data: data,
        color,
      });
    }
  );
  return getLineOption({ xAxisData: xAxis, series });
};

const ContributorCount = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t(
        'metrics_models:code_quality_guarantee.metrics.contributor_count'
      )}
      id={CodeQuality.ContributorCount}
      description={t(
        'metrics_models:code_quality_guarantee.metrics.contributor_count_desc'
      )}
      docLink={
        'docs/metrics-models/productivity/code-quality-guarantee/#contributor-count'
      }
    >
      {(ref) => {
        return (
          <LoadInView containerRef={ref}>
            <Chart getOptions={getOptions} tansOpts={tansOpts} />
          </LoadInView>
        );
      }}
    </BaseCard>
  );
};

export default ContributorCount;
