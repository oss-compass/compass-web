import React, { useEffect, useMemo, useRef, useState } from 'react';
import { EChartsOption } from 'echarts';
import { Support } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import { ChartDataProvider } from '@modules/analyze/options';
import ChartOptionContainer from '@modules/analyze/components/Container/ChartOptionContainer';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import { DataContainerResult } from '@modules/analyze/type';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';
import { getYAxisWithUnit } from '@common/options';

const IssueFirstResponse = () => {
  const { t, i18n } = useTranslation();
  const tabOptions = [
    { label: t('analyze:average'), value: '1' },
    { label: t('analyze:median'), value: '2' },
  ];

  const chartTabs = {
    '1': {
      legendName: t('analyze:average'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCommunity.issueFirstReponseAvg',
      summaryKey: 'summaryCommunity.issueFirstReponseAvg',
    },
    '2': {
      legendName: t('analyze:median'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCommunity.issueFirstReponseMid',
      summaryKey: 'summaryCommunity.issueFirstReponseMid',
    },
  };

  type TabValue = keyof typeof chartTabs;

  const [tab, setTab] = useState<TabValue>('1');
  const tansOpts: TransOpt = chartTabs[tab];

  const indicators = t('analyze:negative_indicators');
  const unit = t('analyze:unit_label', {
    unit: t('analyze:unit_day'),
  });

  const {
    getOptions,
    showAvg,
    showMedian,
    setShowMedian,
    setShowAvg,
    yAxisScale,
    setYAxisScale,
  } = useGetLineOption({ indicators });

  const appendOptions = (
    options: EChartsOption,
    result: DataContainerResult
  ): EChartsOption => {
    return {
      ...options,
      ...getYAxisWithUnit({
        result,
        indicators,
        unit,
        namePaddingLeft: i18n.language === 'zh' ? 0 : 35,
        scale: yAxisScale,
      }),
    };
  };

  return (
    <BaseCard
      title={t(
        'metrics_models:community_service_and_support.metrics.issue_first_response'
      )}
      id={Support.IssueFirstResponse}
      description={t(
        'metrics_models:community_service_and_support.metrics.issue_first_response_desc'
      )}
      weight={t(
        'metrics_models:community_service_and_support.metrics.issue_first_response_more.weight'
      )}
      threshold={t(
        'metrics_models:community_service_and_support.metrics.issue_first_response_more.threshold'
      )}
      detail={t(
        'metrics_models:community_service_and_support.metrics.issue_first_response_more.detail'
      )}
      docLink={
        '/docs/metrics-models/productivity/community-service-and-support/#issue-first-response'
      }
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
          yAxisScale={yAxisScale}
          onYAxisScaleChange={(b) => setYAxisScale(b)}
          yKey={tansOpts['yKey']}
        />
      )}
      bodyClass={'h-[400px]'}
    >
      {(ref) => {
        return (
          <>
            <div className="mb-4">
              <Tab
                options={tabOptions}
                value={tab}
                onChange={(v) => setTab(v as TabValue)}
              />
            </div>
            <ChartDataProvider tansOpts={tansOpts}>
              {({ loading, result }) => {
                return (
                  <ChartOptionContainer
                    data={result}
                    indicators={indicators}
                    optionCallback={getOptions}
                  >
                    {({ option }) => {
                      const opts = appendOptions(option, result);
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
            </ChartDataProvider>
          </>
        );
      }}
    </BaseCard>
  );
};

export default IssueFirstResponse;
