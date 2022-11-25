import React from 'react';
import SectionTitle from '@modules/analyze/components/SectionTitle';
import { Section } from '@modules/analyze/components/SideBar/config';

import CommunityServiceSupport from '../Overview/CommunityServiceSupport';

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
  return (
    <>
      <SectionTitle id={Section.CommunityServiceAndSupport}>
        Community Service and Support
      </SectionTitle>

      <div className="mb-4">
        <CommunityServiceSupport />
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
