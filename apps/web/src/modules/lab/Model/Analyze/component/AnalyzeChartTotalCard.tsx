import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import { getLineOption, line } from '@common/options';
import { formatISO } from '@common/utils';
import { LabModelVersionReportDetailQuery } from '@oss-compass/graphql';
import CardHeadButtons from './CardHeadButtons';
import { useLabModelDetail } from '../../hooks';

const LabVersionTotalCard = ({
  mainScore,
}: {
  mainScore: LabModelVersionReportDetailQuery['labModelVersionReportDetail']['mainScore'];
}) => {
  const { t } = useTranslation();
  const { data } = useLabModelDetail();
  const modelDetail = data?.labModelDetail;

  const { dates, tabIdent, values } = mainScore;
  const color = '#5470c6';

  const opts = getLineOption({
    xAxisData: dates.map((i) => formatISO(i)),
    series: line({
      name: tabIdent,
      data: values,
      color,
    }),
    yAxis: { type: 'value', scale: true },
  });

  return (
    <BaseCard
      title={modelDetail?.name}
      id={mainScore.tabIdent}
      description={''}
      headRight={(ref, fullScreen, setFullScreen) => <CardHeadButtons />}
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
