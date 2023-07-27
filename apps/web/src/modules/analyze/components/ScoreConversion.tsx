import React from 'react';
import Svg100 from 'public/images/analyze/number-100.svg';
import Svg1 from 'public/images/analyze/number-1.svg';
import { useTranslation } from 'next-i18next';
import Tooltip from '@common/components/Tooltip';
import { subscribeKey } from 'valtio/utils';
import { chartUserSettingState } from '@modules/analyze/store';

const ScoreConversion: React.FC<{
  onePoint: boolean;
  onChange: (pre: boolean) => void;
}> = ({ onePoint, onChange }) => {
  const { t } = useTranslation();
  const unsubscribe = subscribeKey(
    chartUserSettingState,
    'onePointSys',
    (v) => {
      if (onePoint !== v) {
        onChange(v);
      }
    }
  );
  return (
    <Tooltip
      arrow
      title={
        onePoint
          ? t('analyze:score_conversion.on_point')
          : t('analyze:score_conversion.hundred_mark')
      }
    >
      <div
        className="group ml-2 cursor-pointer p-1 transition md:hidden"
        data-html2canvas-ignore="true"
        onClick={() => {
          onChange(!onePoint);
        }}
      >
        {onePoint ? (
          <div className="flex items-center">
            <Svg1 />
            <span className="text-gray58 ml-2 text-xs">
              {t('analyze:mark.point')}
            </span>
          </div>
        ) : (
          <div className="flex items-center">
            <Svg100 />
            <span className="text-gray58 ml-2 text-xs">
              {t('analyze:mark.percentage')}
            </span>
          </div>
        )}
        {/* <div
          style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 1px 2px 10px' }}
          className="absolute top-[100%] right-1 z-dropdown hidden w-[280px] rounded border border-white bg-white p-2 text-sm group-hover:block"
        ></div> */}
      </div>
    </Tooltip>
  );
};

export default ScoreConversion;
