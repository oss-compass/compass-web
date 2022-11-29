import React, { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import { CodeQuality } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';

import { LineSeriesOption } from 'echarts';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';

const CodeQualityOverview = () => {
  const { t } = useTranslation();
  const [onePointSys, setOnePointSys] = useState(false);

  const tansOpts: TransOpts = {
    metricType: 'metricCodequality',
    xAxisKey: 'grimoireCreationDate',
    yAxisOpts: [
      {
        legendName: 'code quality guarantee',
        valueKey: 'codeQualityGuarantee',
      },
    ],
  };

  const getOptions = ({ xAxis, yResults }: TransResult) => {
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
      }
    );
    return getLineOption({ xAxisData: xAxis, series });
  };

  return (
    <BaseCard
      title={t('metrics_models:code_quality_guarantee.title')}
      id={CodeQuality.Overview}
      description={t('metrics_models:code_quality_guarantee.desc')}
      docLink={'docs/metrics-models/productivity/code-quality-guarantee/'}
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

export default CodeQualityOverview;
