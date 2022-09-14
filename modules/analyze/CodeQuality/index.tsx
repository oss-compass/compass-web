import React from 'react';
import Topic from '@common/components/Topic';
import Overview from './Overview';
import ContributorCount from './ContributorCount';
import CommitFrequency from './CommitFrequency';
import IsMaintained from './IsMaintained';
import PRIssueLinked from './PRIssueLinked';
import CodeReviewRatio from './CodeReviewRatio';
import CodeMergeRatio from './CodeMergeRatio';
import LocFrequency from './LocFrequency';

const CodeQuality = () => {
  return (
    <>
      <Topic>Code Quality Guarantee</Topic>
      <div className="mb-4">
        <Overview />
      </div>
      <div className="mb-4 grid min-w-0 gap-4 lg:grid-cols-2">
        <ContributorCount />
        <CommitFrequency />
        <IsMaintained />
        <PRIssueLinked />
        <CodeReviewRatio />
      </div>
      <div className="mb-4">
        <CodeMergeRatio />
      </div>
      <h3>Code Changes Lines</h3>
      <LocFrequency />
    </>
  );
};

export default CodeQuality;
