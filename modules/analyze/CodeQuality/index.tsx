import React from 'react';
import Topic from '@common/components/Topic';
import Overview from './Overview';
import ContributorCount from './ContributorCount';
import CommitFrequency from './CommitFrequency';

const CodeQuality = () => {
  return (
    <>
      <Topic>Code Quality Guarantee</Topic>
      <div className="grid gap-4 lg:grid-cols-2">
        <Overview />
        <ContributorCount />
        <CommitFrequency />
      </div>
    </>
  );
};

export default CodeQuality;
