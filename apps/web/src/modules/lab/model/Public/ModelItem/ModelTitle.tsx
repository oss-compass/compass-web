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

  const dimensionLogo = {
    '0': (
      <>
        <span className="mr-2 h-4 w-4">
          <IconProductivity />
        </span>
        <h3 className="text-sm text-[#000000]">
          {t('common:topic.productivity')}
        </h3>
      </>
    ),
    '1': (
      <>
        <span className="mr-2 h-4 w-4">
          <IconRobustness />
        </span>
        <h3 className="ml-2 text-sm">{t('common:topic.robustness')}</h3>
      </>
    ),
    '2': (
      <>
        <span className="mr-2 h-4 w-4">
          <IconNicheCreation />
        </span>
        <h3 className="ml-2 text-sm">{t('common:topic.niche_creation')}</h3>
      </>
    ),
  };

  return (
    <>
      <div className="flex items-center">
        {dimensionLogo[`${model.dimension}`]}
      </div>
      <div className="mt-2 flex w-full justify-between">
        <div className="mt-2 text-3xl">{model.modelName}</div>
        <Discuss model={model} />
      </div>
    </>
  );
};

export default ModeTitle;
