import React, { useMemo, useState } from 'react';
import { EChartsOption } from 'echarts';
import { Activity } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import ChartDataContainer from '@modules/analyze/components/Container/ChartDataContainer';
import ChartOptionContainer from '@modules/analyze/components/Container/ChartOptionContainer';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt } from '@modules/analyze/type';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';
import { getYAxisWithUnit } from '@common/options';
import { convertMonthsToDays } from '@common/utils/format';
import { DataContainerResult } from '@modules/analyze/type';

// convert months to days.
const convertResult = (result: DataContainerResult) => {
  result.summaryMean = result.summaryMean.map((value) =>
    convertMonthsToDays(value)
  );
  result.summaryMedian = result.summaryMean.map((value) =>
    convertMonthsToDays(value)
  );
  result.yResults = result.yResults.map((item) => {
    item.data = item.data.map((value) => convertMonthsToDays(value));
    return item;
  });
  return result;
};

const UpdatedSince = () => {
  const { t, i18n } = useTranslation();

  const tansOpts: TransOpt = {
    legendName: t('metrics_models:community_activity.metrics.updated_since'),
    xKey: 'grimoireCreationDate',
    yKey: 'metricActivity.updatedSince',
    summaryKey: 'summaryActivity.updatedSince',
  };

  const indicators = t('analyze:negative_indicators');
  const unit = t('analyze:unit_label', {
    unit: t('analyze:unit_day'),
  });

  const { getOptions, showAvg, showMedian, setShowMedian, setShowAvg } =
    useGetLineOption({ indicators });

  const appendOptions = (options: EChartsOption): EChartsOption => {
    return {
      ...options,
      ...getYAxisWithUnit({
        indicators,
        unit,
        namePaddingLeft: i18n.language === 'zh' ? 0 : 35,
        shortenYaxisNumberLabel: true,
      }),
    };
  };

  return (
    <BaseCard
      title={t('metrics_models:community_activity.metrics.updated_since')}
      id={Activity.UpdatedSince}
      description={t(
        'metrics_models:community_activity.metrics.updated_since_desc'
      )}
      docLink={'/docs/metrics-models/robustness/activity/#updated-since'}
      headRight={(ref, fullScreen, setFullScreen) => (
        <CardDropDownMenu
          cardRef={ref}
          fullScreen={fullScreen}
          onFullScreen={(b) => {
            setFullScreen(b);
          }}
          showAvg={showAvg}
          onAvgChange={(b) => setShowAvg(b)}
          showMedian={showMedian}
          onMedianChange={(b) => setShowMedian(b)}
        />
      )}
    >
      {(ref) => {
        return (
          <ChartDataContainer tansOpts={tansOpts}>
            {({ loading, result }) => {
              const convertData = convertResult(result);
              return (
                <ChartOptionContainer
                  data={convertData}
                  indicators={indicators}
                  optionCallback={getOptions}
                >
                  {({ option }) => {
                    const opts = appendOptions(option);
                    return (
                      <EChartX
                        loading={loading}
                        option={opts}
                        containerRef={ref}
                      />
                    );
                  }}
                </ChartOptionContainer>
              );
            }}
          </ChartDataContainer>
        );
      }}
    </BaseCard>
  );
};

export default UpdatedSince;
