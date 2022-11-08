import React from 'react';
import MenuSection from '@modules/analyze/Misc/MenuSection';
import { CommunityActivity } from '@modules/analyze/Misc/SideBar/config';
import ContributorCount from './ContributorCount';
import CommitFrequency from './CommitFrequency';
import UpdatedSince from './UpdatedSince';
// import OrgCount from './OrgCount';
import CreatedSince from './CreatedSince';
import CommentFrequency from './CommentFrequency';
import CodeReviewCount from './CodeReviewCount';
import UpdatedIssuesCount from './UpdatedIssuesCount';
import RecentReleasesCount from './RecentReleasesCount';

const Activity = () => {
  return (
    <>
      <MenuSection id={CommunityActivity.id}>Activity</MenuSection>
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

export default Activity;
