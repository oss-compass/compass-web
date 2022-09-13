import React from 'react';
import Topic from '@common/components/Topic';
import Overview from './Overview';
import ContributorCount from './ContributorCount';
import CommitFrequency from './CommitFrequency';
import CreatedSince from './CreatedSince';
import UpdatedSince from './UpdatedSince';
import CommentFrequency from './CommentFrequency';
import CodeReviewCount from './CodeReviewCount';

const CommunityActivity = () => {
  return (
    <>
      <Topic>Community Activity</Topic>
      <div className="mb-4">
        <Overview />
      </div>
      <div className="mb-4 grid min-w-0 gap-4 lg:grid-cols-2">
        <ContributorCount />
        <CommitFrequency />
        <CodeReviewCount />
        <CreatedSince />
        <UpdatedSince />
        <CommentFrequency />
      </div>
      <div className="mb-4 grid min-w-0 gap-4 lg:grid-cols-2"></div>
      <div className="mb-4"></div>
    </>
  );
};

export default CommunityActivity;
