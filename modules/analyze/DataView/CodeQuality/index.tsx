import React from 'react';
import Topic from '@common/components/Topic';
import Overview from './Overview';
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
      <Topic>Code Quality Guarantee</Topic>
      <div className="mb-4">
        <Overview />
      </div>
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
