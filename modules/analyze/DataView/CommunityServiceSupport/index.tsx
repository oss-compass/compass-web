import React from 'react';
import MenuSection from '@modules/analyze/Misc/MenuSection';
import { CommunityServiceAndSupport } from '@modules/analyze/Misc/SideBar/config';

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
      <MenuSection id={CommunityServiceAndSupport.id}>
        Community Service and Support
      </MenuSection>
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
