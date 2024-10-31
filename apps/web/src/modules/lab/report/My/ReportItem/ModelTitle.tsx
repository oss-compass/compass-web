import React, { useState } from 'react';
import IconProductivity from '@public/images/analyze/topic/Productivity.svg';
import IconRobustness from '@public/images/analyze/topic/Robustness.svg';
import IconNicheCreation from '@public/images/analyze/topic/NicheCreation.svg';
import { MyModelVersion } from '@oss-compass/graphql';
import { useTranslation } from 'next-i18next';
import Discuss from './Discuss';
import ModelItemMore from './ModelItemMore';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import TriggerConfirmBtn from '../TriggerConfirmBtn';
import ForkFrom from '@modules/lab/model/components/ForkFrom';

const ModeTitle: React.FC<{
  model: MyModelVersion;
  event$?: EventEmitter<string>;
  simple?: boolean;
}> = ({ model, event$, simple = false }) => {
  const { t } = useTranslation();
  // const permissions = model?.permissions;
  const { triggerUpdatedAt, triggerStatus, modelId, versionId, id } = model;
  const parentLabModel = model?.parentLabModel;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex justify-between">
          <div onClick={() => {}} className="mt-2 cursor-pointer text-3xl">
            {model.modelName + ` (${model.version})`}
          </div>
          {parentLabModel?.id && !simple ? (
            <div className="pt-5">
              <ForkFrom id={parentLabModel?.id} name={parentLabModel?.name} />
            </div>
          ) : (
            ''
          )}
        </div>
        {!simple && (
          <div className="flex gap-1">
            <TriggerConfirmBtn
              reportId={id}
              modelId={modelId}
              versionId={versionId}
              triggerStatus={triggerStatus}
              triggerUpdatedAt={triggerUpdatedAt}
              event$={event$}
            />
            <Discuss model={model} />

            <ModelItemMore model={model} event$={event$} />
          </div>
        )}
      </div>
    </>
  );
};

export default ModeTitle;
