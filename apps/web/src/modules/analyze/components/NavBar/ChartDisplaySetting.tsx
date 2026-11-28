import React from 'react';
import { useSnapshot } from 'valtio';
import Average from 'public/images/analyze/average.svg';
import Median from 'public/images/analyze/median.svg';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import { chartUserSettingState } from '@modules/analyze/store';
import Svg100 from 'public/images/analyze/number-100.svg';
import Svg1 from 'public/images/analyze/number-1.svg';
import YScale from 'public/images/analyze/y-scale.svg';

const AvgItem = () => {
  const { t } = useTranslation();
  const snap = useSnapshot(chartUserSettingState);

  return (
    <button
      type="button"
      aria-pressed={snap.showAvg}
      className={classnames(
        'focus-visible:outline-primary group flex w-full cursor-pointer border-b py-2 pl-3.5 text-left transition focus-visible:outline focus-visible:outline-2',
        [snap.showAvg ? 'text-primary' : 'text-[#585858]']
      )}
      onClick={() => {
        chartUserSettingState.showAvg = !snap.showAvg;
      }}
    >
      <Average className="mr-2" aria-hidden="true" />
      {t('analyze:avg_line.show')}
    </button>
  );
};

const MedianItem = () => {
  const { t } = useTranslation();
  const snap = useSnapshot(chartUserSettingState);

  return (
    <button
      type="button"
      aria-pressed={snap.showMedian}
      className={classnames(
        'focus-visible:outline-primary group flex w-full cursor-pointer border-b py-2 pl-3.5 text-left transition focus-visible:outline focus-visible:outline-2',
        [snap.showMedian ? 'text-primary' : 'text-[#585858]']
      )}
      onClick={() => {
        chartUserSettingState.showMedian = !snap.showMedian;
      }}
    >
      <Median className="mr-2" aria-hidden="true" />
      {t('analyze:median_line.show')}
    </button>
  );
};

const OnePointItem = () => {
  const { t } = useTranslation();
  const snap = useSnapshot(chartUserSettingState);

  return (
    <button
      type="button"
      aria-pressed={!snap.onePointSys}
      className={classnames(
        'focus-visible:outline-primary group flex w-full cursor-pointer border-b py-2 pl-3.5 text-left transition focus-visible:outline focus-visible:outline-2',
        [!snap.onePointSys ? 'text-primary' : 'text-[#585858]']
      )}
      onClick={() => {
        chartUserSettingState.onePointSys = !snap.onePointSys;
      }}
    >
      <Svg100 className="mr-2" aria-hidden="true" />
      <span>{t('analyze:mark.percentage')}</span>
    </button>
  );
};

const YScaleItem = () => {
  const { t } = useTranslation();
  const snap = useSnapshot(chartUserSettingState);

  return (
    <button
      type="button"
      aria-pressed={snap.yAxisScale}
      className={classnames(
        'focus-visible:outline-primary group flex w-full cursor-pointer py-2 pl-3.5 text-left transition focus-visible:outline focus-visible:outline-2',
        [snap.yAxisScale ? 'text-primary' : 'text-[#585858]']
      )}
      onClick={() => {
        chartUserSettingState.yAxisScale = !snap.yAxisScale;
      }}
    >
      <YScale className="mr-2" aria-hidden="true" />
      <span>{t('analyze:y_axis_scale')}</span>
    </button>
  );
};

const ChartDisplaySetting = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="border-b py-2 pl-3.5 font-bold text-gray-900">
        {t('analyze:display')}
      </div>
      <AvgItem />
      <MedianItem />
      <OnePointItem />
      <YScaleItem />
    </>
  );
};

export default ChartDisplaySetting;
