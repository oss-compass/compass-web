import React from 'react';
import { useTranslation } from 'next-i18next';
import SectionTitle from '@modules/developer/components/SectionTitle';
import { Section } from '@modules/developer/components/SideBar/config';

import TotalScore from './TotalScore';

import ContributorCount from './ContributorCount';
import CommitFrequency from './CommitFrequency';
import UpdatedSince from './UpdatedSince';
import OrgCount from './OrgCount';
import CommentFrequency from './CommentFrequency';
import CodeReviewCount from './CodeReviewCount';
import UpdatedIssuesCount from './UpdatedIssuesCount';
import RecentReleasesCount from './RecentReleasesCount';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLineMini from '@modules/developer/components/ConnectLineMini';
import TotalScoreRepo from './TotalScoreRepo';

const CommunityActivity = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* <SectionTitle id={Section.CommunityActivity}>
        {t('metrics_models:activity.title')}
      </SectionTitle> */}

      <div className="mb-4">
        <TotalScore />
        <ConnectLineMini />
        <TotalScoreRepo />
      </div>
      {/* <div className="relative mb-4 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
        <ConnectLine />
        <ContributorCount />
        <CommitFrequency />
        <UpdatedSince />
        <OrgCount />
        <CommentFrequency />
        <CodeReviewCount />
        <UpdatedIssuesCount />
        <RecentReleasesCount />
      </div> */}
    </>
  );
};

export default withErrorBoundary(CommunityActivity, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
