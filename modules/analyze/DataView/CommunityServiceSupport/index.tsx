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
      <Topic id={'community_service_support'}>
        Community Service and Support
      </Topic>
      <div className="mb-4">
        <Overview />
      </div>
      <div className="mb-4 grid min-w-0 grid-cols-2 gap-4  md:grid-cols-1">
        <IssueFirstResponse />
        <IssueOpenTime />
        <IssueCommentFrequency />
        <UpdatedIssuesCount />
        <PrOpenTime />
        <CodeReviewCount />
        <ClosedPrsCount />
      </div>
    </>
  );
};

export default CommunitySupport;
