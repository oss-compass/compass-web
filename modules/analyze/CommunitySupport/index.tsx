import React from 'react';
import Topic from '@common/components/Topic';
import Overview from './Overview';

import IssueFirstResponse from './IssueFirstResponse';
import IssueOpenTime from './IssueOpenTime';
import IssueCommentFrequency from './IssueCommentFrequency';
import UpdatedIssuesCount from './UpdatedIssuesCount';

import PrOpenTime from './PrOpenTime';
import CodeReviewCount from './CodeReviewCount';
import ClosedPrsCount from './ClosedPrsCount';

const CommunitySupport = () => {
  return (
    <>
      <Topic>Community Support</Topic>
      <div className="mb-4">
        <Overview />
      </div>
      <div className="mb-4 grid min-w-0 gap-4 lg:grid-cols-2">
        <IssueFirstResponse />
        <IssueOpenTime />
        <IssueCommentFrequency />
        <UpdatedIssuesCount />
      </div>
      <div className="mb-4 grid min-w-0 gap-4 lg:grid-cols-2">
        <PrOpenTime />
        <CodeReviewCount />
      </div>
      <div className="mb-4">
        <ClosedPrsCount />
      </div>
    </>
  );
};

export default CommunitySupport;
