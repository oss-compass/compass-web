import React, { useMemo, useState } from 'react';
import {
  getLineOption,
  line,
  percentageValueFormat,
  legendFormat,
  getTooltipsFormatter,
  getColorWithLabel,
  percentageUnitFormat,
  summaryLine,
  checkFormatPercentageValue,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import EChartX from '@common/components/EChartX';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import useGetRatioLineOption from '@modules/analyze/hooks/useGetRatioLineOption';

const tabOptions = [
  { label: 'code merge ratio', value: '1' },
  { label: 'total pr', value: '2' },
  { label: 'code merge', value: '3' },
];

const chartTabs = {
  '1': {
    legendName: 'code merge ratio',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.codeMergeRatio',
    summaryKey: 'summaryCodequality.codeMergeRatio',
  },
  '2': {
    legendName: 'total pr',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.prCount',
    summaryKey: 'summaryCodequality.prCount',
  },
  '3': {
    legendName: 'code merge',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.codeMergedCount',
    summaryKey: 'summaryCodequality.codeMergedCount',
  },
};

type TabValue = keyof typeof chartTabs;

const CodeMergeRatio = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');
  const tansOpts: TransOpt = chartTabs[tab];
  const { getOptions, setShowMedian, showMedian, showAvg, setShowAvg } =
    useGetRatioLineOption({ tab });

  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.code_merge_ratio'
      )}
      id={CollaborationDevelopment.CodeMergeRatio}
      description={t(
        'metrics_models:collaboration_development_index.metrics.code_merge_ratio_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#code-merge-ratio'
      }
      headRight={
        <>
          <MedianAndAvg
            showAvg={showAvg}
            onAvgChange={(b) => setShowAvg(b)}
            showMedian={showMedian}
            onMedianChange={(b) => setShowMedian(b)}
          />
        </>
      }
      bodyClass={'h-[400px]'}
    >
      {(ref, fullScreen) => {
        return (
          <>
            <div className="mb-4">
              <Tab
                options={tabOptions}
                value={tab}
                onChange={(v) => setTab(v as TabValue)}
              />
            </div>
            <ChartWithData tansOpts={tansOpts} getOptions={getOptions}>
              {(loading, option) => {
                return (
                  <EChartX
                    containerRef={ref}
                    loading={loading}
                    option={option}
                  />
                );
              }}
            </ChartWithData>
          </>
        );
      }}
    </BaseCard>
  );
};

export default CodeMergeRatio;
