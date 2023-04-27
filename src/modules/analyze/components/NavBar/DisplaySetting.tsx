import React from 'react';
import Average from 'public/images/analyze/average.svg';
import Median from 'public/images/analyze/median.svg';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import { subscribeKey } from 'valtio/utils';
import { avgAndScoreState } from '@modules/analyze/store';
import Svg100 from 'public/images/analyze/number-100.svg';
import Svg1 from 'public/images/analyze/number-1.svg';

const DisplaySetting: React.FC<{
  showAvg: boolean;
  onAvgChange: (pre: boolean) => void;
  showMedian: boolean;
  onMedianChange: (pre: boolean) => void;
  onePoint: boolean;
  onChange: (pre: boolean) => void;
}> = ({
  showAvg,
  onAvgChange,
  showMedian,
  onMedianChange,
  onePoint,
  onChange,
}) => {
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
      <div className="border-b py-2 pl-3.5 font-bold text-gray-900">
        {t('analyze:display')}
      </div>
      <div
        className={classnames(
          'group flex cursor-pointer border-b py-2 pl-3.5 transition',
          { 'text-primary': showAvg }
        )}
        onClick={() => {
          onAvgChange(!showAvg);
        }}
      >
        <Average className="mr-2" />
        {t('analyze:avg_line.show')}
      </div>
      <div
        className={classnames(
          'group flex cursor-pointer border-b py-2 pl-3.5 transition',
          { 'text-primary': showMedian }
        )}
        onClick={() => {
          onMedianChange(!showMedian);
        }}
      >
        <Median className="mr-2" />
        {t('analyze:median_line.show')}
      </div>
      <div
        className={classnames(
          'group flex cursor-pointer border-b py-2 pl-3.5 transition',
          { 'text-primary': !onePoint }
        )}
        data-html2canvas-ignore="true"
        onClick={() => {
          onChange(false);
        }}
      >
        <Svg100 className="mr-2" />
        <span>{t('analyze:mark.percentage')}</span>
      </div>
      <div
        className={classnames(
          'group flex cursor-pointer  py-2 pl-3.5 transition',
          { 'text-primary': onePoint }
        )}
        data-html2canvas-ignore="true"
        onClick={() => {
          onChange(true);
        }}
      >
        <Svg1 className="mr-2" />
        <span>{t('analyze:mark.point')}</span>
      </div>
    </>
  );
};

export default DisplaySetting;
