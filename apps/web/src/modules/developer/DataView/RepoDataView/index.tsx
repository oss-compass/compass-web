import React from 'react';
import { useTranslation } from 'next-i18next';
import SectionTitle from '@modules/developer/components/SectionTitle';
import { Section } from '@modules/developer/components/SideBar/config';
import TotalScore from './TotalScore';
import TotalScoreRepo from './TotalScoreRepo';

import ContributorCount from './ContributorCount';
import CommitFrequency from './CommitFrequency';
import IsMaintained from './IsMaintained';
import PRIssueLinked from './PRIssueLinked';
import CommitPRLinkedRatio from './CommitPRLinkedRatio';
import CodeReviewRatio from './CodeReviewRatio';
import CodeMergeRatio from './CodeMergeRatio';
import CommunityRepos from './CommunityRepos';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLineMini from '@modules/developer/components/ConnectLineMini';

const CollaborationDevelopmentIndexOverview = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="mb-4">
        <CommunityRepos />
        <ConnectLineMini />
        <TotalScore />
        <ConnectLineMini />
        <TotalScoreRepo />
      </div>
      {/* 
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
      </div> */}
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
