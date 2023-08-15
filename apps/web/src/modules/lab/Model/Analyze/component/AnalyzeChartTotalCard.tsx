import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import { getLineOption, line } from '@common/options';
import { formatISO } from '@common/utils';
import { LabModelVersionReportDetailQuery } from '@oss-compass/graphql';
import { useLabModelDetail } from '../../hooks';

const LabVersionTotalCard = ({
  mainScore,
}: {
  mainScore: LabModelVersionReportDetailQuery['labModelVersionReportDetail']['mainScore'];
}) => {
  const { t } = useTranslation();
  const { data } = useLabModelDetail();
  const modelDetail = data?.labModelDetail;

  const { dates, tabIdent } = mainScore;
  const color = '#5470c6';

  const opts = getLineOption({
    xAxisData: dates.map((i) => formatISO(i)),
    series: line({
      name: tabIdent,
      data: dates,
      color,
    }),
    yAxis: { type: 'value', scale: true },
  });

  return (
    <BaseCard
      title={modelDetail?.name}
      id={mainScore.tabIdent}
      description={''}
      // weight={t(
      //   'metrics_models:collaboration_development_index.metrics.code_merge_ratio_more.weight'
      // )}
      // threshold={t(
      //   'metrics_models:collaboration_development_index.metrics.code_merge_ratio_more.threshold'
      // )}
      // detail={t(
      //   'metrics_models:collaboration_development_index.metrics.code_merge_ratio_more.detail'
      // )}
      // docLink={
      //   '/docs/metrics-models/productivity/collaboration-development-index/#code-merge-ratio'
      // }
      headRight={(ref, fullScreen, setFullScreen) => (
        // <CardDropDownMenu
        //   cardRef={ref}
        //   fullScreen={fullScreen}
        //   onFullScreen={(v) => {
        //     setFullScreen(v);
        //   }}
        //   showAvg={showAvg}
        //   onAvgChange={(b) => setShowAvg(b)}
        //   showMedian={showMedian}
        //   onMedianChange={(b) => setShowMedian(b)}
        //   yAxisScale={yAxisScale}
        //   onYAxisScaleChange={(b) => setYAxisScale(b)}
        // />
        <div></div>
      )}
      // bodyClass={'h-[400px]'}
      bodyRender={(ref, fullScreen) => {
        return (
          <>
            <div className="mb-4">
              {/*<Tab*/}
              {/*  options={tabOptions}*/}
              {/*  value={tab}*/}
              {/*  onChange={(v) => setTab(v as TabValue)}*/}
              {/*/>*/}
            </div>
            <EChartX loading={false} option={opts} containerRef={ref} />
          </>
        );
      }}
    />
  );
};

export default LabVersionTotalCard;
