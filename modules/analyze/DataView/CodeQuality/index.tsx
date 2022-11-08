import React from 'react';
import MenuSection from '@modules/analyze/Misc/MenuSection';
import { CodeQualityGuarantee } from '@modules/analyze/Misc/SideBar/config';
import ContributorCount from './ContributorCount';
import CommitFrequency from './CommitFrequency';
import IsMaintained from './IsMaintained';
import PRIssueLinked from './PRIssueLinked';
import CodeReview from './CodeReview';
import CodeMerge from './CodeMerge';
import LocFrequency from './LocFrequency';

const CodeQuality = () => {
  return (
    <>
      <MenuSection id={CodeQualityGuarantee.id}>
        Code Quality Guarantee
      </MenuSection>
      <div className="mb-4 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
        <ContributorCount />
        <CommitFrequency />
        <IsMaintained />
        <PRIssueLinked />
        <CodeReview />
        <CodeMerge />
        <LocFrequency />
      </div>
    </>
  );
};

export default CodeQuality;
