import React from 'react';
import Topic from '@common/components/Topic';
import Overview from './Overview';

import IssueFirstResponse from './IssueFirstResponse';
import IssueOpenTime from './IssueOpenTime';
import IssueCommentCount from './IssueCommentCount';
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
      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <IssueFirstResponse />
        <IssueOpenTime />
        <IssueCommentCount />
        <UpdatedIssuesCount />
      </div>
      <div className="mb-4 grid gap-4 lg:grid-cols-2">
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
