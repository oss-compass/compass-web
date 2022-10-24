import React from 'react';
import Topic from '@common/components/Topic';
import Overview from './Overview';
import ContributorCount from './ContributorCount';
import CommitFrequency from './CommitFrequency';
import UpdatedSince from './UpdatedSince';
// import OrgCount from './OrgCount';
import CreatedSince from './CreatedSince';
import CommentFrequency from './CommentFrequency';
import CodeReviewCount from './CodeReviewCount';
import UpdatedIssuesCount from './UpdatedIssuesCount';
import RecentReleasesCount from './RecentReleasesCount';

const CommunityActivity = () => {
  return (
    <>
      <Topic id="community_activity">Community Activity</Topic>
      <div className="mb-4">
        <Overview />
      </div>
      <div className="mb-4 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
        <ContributorCount />
        <CommitFrequency />
        <UpdatedSince />
        {/*<OrgCount />*/}
        <CreatedSince />
        <CommentFrequency />
        <CodeReviewCount />
        <UpdatedIssuesCount />
        <RecentReleasesCount />
      </div>
    </>
  );
};

export default CommunityActivity;
