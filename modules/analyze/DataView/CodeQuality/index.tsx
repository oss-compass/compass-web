import React from 'react';
import SectionTitle from '@modules/analyze/Misc/SectionTitle';
import { Section } from '@modules/analyze/Misc/SideBar/config';

import CodeQualityOverview from '../Overview/CodeQuality';

import ContributorCount from './ContributorCount';
import CommitFrequency from './CommitFrequency';
import IsMaintained from './IsMaintained';
import PRIssueLinked from './PRIssueLinked';
import CommitPRLinkedRatio from './CommitPRLinkedRatio';
import CodeReviewRatio from './CodeReviewRatio';
import CodeMergeRatio from './CodeMergeRatio';
import LocFrequency from './LocFrequency';

const CodeQuality = () => {
  return (
    <>
      <SectionTitle id={Section.CodeQualityGuarantee}>
        Code Quality Guarantee
      </SectionTitle>

      <div className="mb-4">
        <CodeQualityOverview />
      </div>

      <div className="mb-4 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
        <ContributorCount />
        <CommitFrequency />
        <IsMaintained />
        <CommitPRLinkedRatio />
        <PRIssueLinked />
        <CodeReviewRatio />
        <CodeMergeRatio />
        <LocFrequency />
      </div>
    </>
  );
};

export default CodeQuality;
