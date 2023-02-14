import React from 'react';
import { useTranslation } from 'next-i18next';

import SectionTitle from '@modules/analyze/components/SectionTitle';
import { Section } from '@modules/analyze/components/SideBar/config';

import TotalScore from './TotalScore';

import IssueFirstResponse from './IssueFirstResponse';
import BugIssueOpenTime from './BugIssueOpenTime';
import CommentFrequency from './CommentFrequency';
import UpdatedIssuesCount from './UpdatedIssuesCount';

import PrOpenTime from './PrOpenTime';
import CodeReviewCount from './CodeReviewCount';
import ClosedPrsCount from './ClosedPrsCount';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';

const CommunitySupport = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionTitle id={Section.CommunityServiceAndSupport}>
        {t('metrics_models:community_service_and_support.title')}
      </SectionTitle>

      <div className="mb-4">
        <TotalScore />
      </div>

      <div className="mb-4 grid min-w-0 grid-cols-2 gap-4  md:grid-cols-1">
        <UpdatedIssuesCount />
        <ClosedPrsCount />
        <IssueFirstResponse />
        <BugIssueOpenTime />
        <PrOpenTime />
        <CommentFrequency />
        <CodeReviewCount />
      </div>
    </>
  );
};

export default withErrorBoundary(CommunitySupport, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
