import React from 'react';
import Svg100 from 'public/images/analyze/number-100.svg';
import Svg1 from 'public/images/analyze/number-1.svg';
import { useTranslation } from 'next-i18next';

const ScoreConversion: React.FC<{
  onePoint: boolean;
  onChange: (pre: boolean) => void;
}> = ({ onePoint, onChange }) => {
  const { t } = useTranslation();

  return (
    <div
      className="group cursor-pointer p-2 transition md:hidden"
      onClick={() => {
        onChange(!onePoint);
      }}
    >
      {onePoint ? <Svg1 /> : <Svg100 />}
      <div
        style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 1px 2px 10px' }}
        className="absolute top-[100%] right-1 z-dropdown hidden w-[280px] rounded border border-white bg-white p-2 text-sm group-hover:block"
      >
        {onePoint
          ? t('analyze:score_conversion.on_point')
          : t('analyze:score_conversion.hundred_mark')}
      </div>
    </div>
  );
};

export default ScoreConversion;
