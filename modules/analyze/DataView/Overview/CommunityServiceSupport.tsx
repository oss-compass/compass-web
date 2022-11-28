import React, { useMemo, useState } from 'react';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import { Support } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';
import { ChartThemeState } from '@modules/analyze/context';
import { useTranslation } from 'next-i18next';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';

const CommunityServiceSupportOverview = () => {
  const { t } = useTranslation();
  const [onePointSys, setOnePointSys] = useState(false);

  const tansOpts: TransOpts = {
    metricType: 'metricCommunity',
    xAxisKey: 'grimoireCreationDate',
    yAxisOpts: [
      {
        legendName: 'community service and support',
        valueKey: 'communitySupportScore',
      },
    ],
  };

  const getOptions = (
    { xAxis, yResults }: TransResult,
    theme?: ChartThemeState
  ) => {
    const series = genSeries<LineSeriesOption>(
      yResults,
      (
        { legendName, label, compareLabels, level, isCompare, color, data },
        len
      ) => {
        !onePointSys && (data = data.map((i) => transHundredMarkSystem(i)));
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
      },
      theme
    );
    return getLineOption({ xAxisData: xAxis, series });
  };

  return (
    <BaseCard
      title={t('metrics_models:community_service_and_support.title')}
      id={Support.Overview}
      description={t('metrics_models:community_service_and_support.desc')}
      headRight={
        <ScoreConversion
          onePoint={onePointSys}
          onChange={(v) => {
            setOnePointSys(v);
          }}
        />
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

export default CommunityServiceSupportOverview;
