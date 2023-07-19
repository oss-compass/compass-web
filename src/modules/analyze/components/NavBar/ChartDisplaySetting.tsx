import React from 'react';
import { useSnapshot } from 'valtio';
import Average from 'public/images/analyze/average.svg';
import Median from 'public/images/analyze/median.svg';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import { chatUserSettingState } from '@modules/analyze/store';
import Svg100 from 'public/images/analyze/number-100.svg';
import Svg1 from 'public/images/analyze/number-1.svg';
import YScale from 'public/images/analyze/y-scale.svg';

const AvgItem = () => {
  const { t } = useTranslation();
  const snap = useSnapshot(chatUserSettingState);

  return (
    <div
      className={classnames(
        'group flex cursor-pointer border-b py-2 pl-3.5 transition',
        [snap.showAvg ? 'text-primary' : 'text-gray-500']
      )}
      onClick={() => {
        chatUserSettingState.showAvg = !snap.showAvg;
      }}
    >
      <Average className="mr-2" />
      {t('analyze:avg_line.show')}
    </div>
  );
};

const MedianItem = () => {
  const { t } = useTranslation();
  const snap = useSnapshot(chatUserSettingState);

  return (
    <div
      className={classnames(
        'group flex cursor-pointer border-b py-2 pl-3.5 transition',
        [snap.showMedian ? 'text-primary' : 'text-gray-500']
      )}
      onClick={() => {
        chatUserSettingState.showMedian = !snap.showMedian;
      }}
    >
      <Median className="mr-2" />
      {t('analyze:median_line.show')}
    </div>
  );
};

const OnePointItem = () => {
  const { t } = useTranslation();
  const snap = useSnapshot(chatUserSettingState);

  return (
    <div
      className={classnames(
        'group flex cursor-pointer border-b py-2 pl-3.5 transition',
        [snap.onePointSys ? 'text-primary' : 'text-gray-500']
      )}
      onClick={() => {
        chatUserSettingState.onePointSys = !snap.onePointSys;
      }}
    >
      <Svg100 className="mr-2" />
      <span>{t('analyze:mark.percentage')}</span>
    </div>
  );
};

const YScaleItem = () => {
  const { t } = useTranslation();
  const snap = useSnapshot(chatUserSettingState);

  return (
    <div
      className={classnames(
        'group flex cursor-pointer  py-2 pl-3.5 transition',
        [snap.yAxisScale ? 'text-primary' : 'text-gray-500']
      )}
      onClick={() => {
        chatUserSettingState.yAxisScale = !snap.yAxisScale;
      }}
    >
      <YScale className="mr-2" />
      <span>{t('analyze:y_axis_scale')}</span>
    </div>
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
