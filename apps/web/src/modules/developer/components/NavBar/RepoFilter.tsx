import React from 'react';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import { chartUserSettingState } from '@modules/developer/store';
import SoftwareArtifact from 'public/images/analyze/Software-Artifact.svg';
import Governance from 'public/images/analyze/Governance.svg';

const RepoFilter = () => {
  const { t } = useTranslation();
  const snap = useSnapshot(chartUserSettingState);

  return (
    <>
      <div className="border-b py-2 pl-3.5 font-bold text-gray-900">
        {t('analyze:repo_filter')}
      </div>
      <div
        className={classnames(
          'group flex cursor-pointer border-b py-2 pl-3.5 transition',
          { 'text-primary': snap.repoType === 'software-artifact' }
        )}
        onClick={() => {
          chartUserSettingState.repoType = 'software-artifact';
        }}
      >
        <SoftwareArtifact className="mr-2 flex-none" />
        {t('analyze:repos_type.software_artifact_repository')}
      </div>
      <div
        className={classnames(
          'group flex cursor-pointer overflow-clip py-2 pl-3.5 transition',
          { 'text-primary': snap.repoType === 'governance' }
        )}
        onClick={() => {
          chartUserSettingState.repoType = 'governance';
        }}
      >
        <Governance className="mr-2 flex-none" />
        {t('analyze:repos_type.governance_repository')}
      </div>
    </>
  );
};

export default RepoFilter;
