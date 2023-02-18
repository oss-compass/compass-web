import React from 'react';
import Average from 'public/images/analyze/average.svg';
import Median from 'public/images/analyze/median.svg';
import { useTranslation } from 'next-i18next';
import Tooltip from '@common/components/Tooltip';
import classnames from 'classnames';
import { subscribeKey } from 'valtio/utils';
import { avgAndScoreState } from '@modules/analyze/store';

const MedianAndAvg: React.FC<{
  showAvg: boolean;
  onAvgChange: (pre: boolean) => void;
  showMedian: boolean;
  onMedianChange: (pre: boolean) => void;
}> = ({ showAvg, onAvgChange, showMedian, onMedianChange }) => {
  const { t } = useTranslation();
  subscribeKey(avgAndScoreState, 'showAvg', (v) => {
    if (showAvg !== v) {
      onAvgChange(v);
    }
  });
  subscribeKey(avgAndScoreState, 'showMedian', (v) => {
    if (showMedian !== v) {
      onMedianChange(v);
    }
  });
  return (
    <>
      <Tooltip
        arrow
        title={
          showAvg ? t('analyze:avg_line.hide') : t('analyze:avg_line.show')
        }
      >
        <div
          className={classnames(
            'group ml-2 cursor-pointer p-1 transition md:hidden',
            { 'opacity-60': !showAvg }
          )}
          onClick={() => {
            onAvgChange(!showAvg);
          }}
        >
          <Average />
        </div>
      </Tooltip>
      <Tooltip
        arrow
        title={
          showMedian
            ? t('analyze:median_line.hide')
            : t('analyze:median_line.show')
        }
      >
        <div
          className={classnames(
            'group ml-2 cursor-pointer p-1 transition md:hidden',
            { 'opacity-60': !showMedian }
          )}
          onClick={() => {
            onMedianChange(!showMedian);
          }}
        >
          <Median />
        </div>
      </Tooltip>
    </>
  );
};

export default MedianAndAvg;
