import React, { ReactNode } from 'react';
import { Trans } from 'react-i18next';
import { useTranslation } from 'next-i18next';
import transMetricToAxis from '@common/transform/transMetricToAxis';
import transSummaryToAxis from '@common/transform/transSummaryToAxis';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import LinkLegacy from '@common/components/LinkLegacy';
import { chatUserSettingState } from '@modules/analyze/store';
import { useSnapshot } from 'valtio';
import { TransOpt, DataContainerResult, YResult } from '@modules/analyze/type';
import { isNull, isUndefined } from 'lodash';
import { DebugLogger } from '@common/debug';

const logger = new DebugLogger('ChartDataContainer');

const isEmptyData = (result: YResult[]) => {
  return result.every((r) => {
    return r.data.every((i) => {
      return isNull(i) || isUndefined(i);
    });
  });
};

const Empty = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="absolute left-0 right-0  bottom-0 z-10 flex h-[350px] w-full flex-col items-center justify-center bg-[rgba(255,255,255,.8)]">
      <p className="text-xs text-gray-400">
        {t('analyze:there_is_currently_no_data_in_the_chart')}
      </p>
      <p className="text-xs text-gray-400">
        <Trans
          i18nKey="please_contact_us_if_you_have"
          ns="analyze"
          values={{
            e: t('analyze:contact_us'),
          }}
          components={{
            l: (
              <LinkLegacy
                href={
                  i18n.language === 'en'
                    ? 'docs/community/'
                    : 'docs/zh/community/'
                }
              />
            ),
          }}
        />
      </p>
    </div>
  );
};

export const ChartDataProvider: React.FC<{
  _tracing?: string;
  tansOpts: TransOpt;
  children:
    | ((args: {
        loading: boolean;
        isEmpty: boolean;
        result: DataContainerResult;
      }) => ReactNode)
    | ReactNode;
}> = ({ children, tansOpts, _tracing }) => {
  const data = useMetricQueryData();
  const loading = data?.loading;
  const snap = useSnapshot(chatUserSettingState);
  const { xAxis, yResults } = transMetricToAxis(
    data?.items,
    tansOpts,
    snap.repoType
  );
  const { summaryMean, summaryMedian } = transSummaryToAxis(
    data?.summary,
    xAxis,
    tansOpts.summaryKey
  );
  const compareLabels = yResults.map((i) => i.label);
  const isCompare = yResults.length > 1;
  const isEmpty = isEmptyData(yResults);

  if (_tracing) {
    logger.debug(_tracing, { loading, data });
  }

  if (isEmpty && !loading) {
    return <Empty />;
  }

  const childProps = {
    loading,
    isEmpty,
    result: {
      compareLabels,
      isCompare,
      xAxis,
      yResults,
      summaryMean,
      summaryMedian,
    },
  };
  return (
    <>{typeof children === 'function' ? children(childProps) : children}</>
  );
};
