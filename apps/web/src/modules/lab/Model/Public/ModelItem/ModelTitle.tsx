import React, { useState } from 'react';
import IconProductivity from '@public/images/analyze/topic/Productivity.svg';
import IconRobustness from '@public/images/analyze/topic/Robustness.svg';
import IconNicheCreation from '@public/images/analyze/topic/NicheCreation.svg';
import { ModelPublicOverview } from '@oss-compass/graphql';
import { useTranslation } from 'next-i18next';
import Discuss from './Discuss';

const ModeTitle: React.FC<{
  model: ModelPublicOverview;
}> = ({ model }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className=" flex items-center">
        <span className="mr-2 h-4 w-4">
          <IconRobustness />
        </span>
        <h3 className="text-sm text-[#000000]">Robustness</h3>
      </div>
      <div className="mt-2 flex w-full justify-between">
        <div className="mt-2 text-3xl">{model.modelName}</div>
        <Discuss />
      </div>
    </>
  );
};

export default ModeTitle;
