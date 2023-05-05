import React from 'react';
import Average from 'public/images/analyze/average.svg';
import Median from 'public/images/analyze/median.svg';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import { subscribeKey } from 'valtio/utils';
import { avgAndScoreState } from '@modules/analyze/store';
import SoftwareArtifact from 'public/images/analyze/Software-Artifact.svg';
import Governance from 'public/images/analyze/Governance.svg';

const RepoFilter: React.FC<{
  repoType: string;
  onRepoChange: (pre: string) => void;
}> = ({ repoType, onRepoChange }) => {
  const { t } = useTranslation();
  subscribeKey(avgAndScoreState, 'repoType', (v) => {
    if (repoType !== v) {
      onRepoChange(v);
    }
  });
  return (
    <>
      <div className="border-b py-2 pl-3.5 font-bold text-gray-900">
        {t('analyze:repo_filter')}
      </div>
      <div
        className={classnames(
          'group flex cursor-pointer border-b py-2 pl-3.5 transition',
          { 'text-primary': repoType === 'software-artifact' }
        )}
        onClick={() => {
          onRepoChange('software-artifact');
        }}
      >
        <SoftwareArtifact className="mr-2 flex-none" />
        {t('analyze:repos_type.software_artifact_repository')}
      </div>
      <div
        className={classnames(
          'group flex cursor-pointer overflow-clip py-2 pl-3.5 transition',
          { 'text-primary': repoType === 'governance' }
        )}
        onClick={() => {
          onRepoChange('governance');
        }}
      >
        <Governance className="mr-2 flex-none" />
        {t('analyze:repos_type.governance_repository')}
      </div>
    </>
  );
};

export default RepoFilter;
