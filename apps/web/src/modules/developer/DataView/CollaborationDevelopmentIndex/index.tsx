import React from 'react';
import { useTranslation } from 'next-i18next';
import SectionTitle from '@modules/developer/components/SectionTitle';
import { Section } from '@modules/developer/components/SideBar/config';

import TotalScore from './TotalScore';

import ContributorCount from './ContributorCount';
import CommitFrequency from './CommitFrequency';
import IsMaintained from './IsMaintained';
import PRIssueLinked from './PRIssueLinked';
import CommitPRLinkedRatio from './CommitPRLinkedRatio';
import CodeReviewRatio from './CodeReviewRatio';
import CodeMergeRatio from './CodeMergeRatio';
import LocFrequency from './LocFrequency';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLine from '@modules/developer/components/ConnectLine';

const CollaborationDevelopmentIndexOverview = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionTitle id={Section.CollaborationDevelopmentIndex}>
        {t('metrics_models:collaboration_development_index.title')}
      </SectionTitle>

      <div className="mb-4">
        <TotalScore />
      </div>

      <div className="relative mb-12 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
        <ConnectLine />
        <ContributorCount />
        <CommitFrequency />
        <IsMaintained />
        <CommitPRLinkedRatio />
        <PRIssueLinked />
        <CodeReviewRatio />
        <CodeMergeRatio />
        <LocFrequency />
      </div>
    </>
  );
};

export default withErrorBoundary(CollaborationDevelopmentIndexOverview, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
