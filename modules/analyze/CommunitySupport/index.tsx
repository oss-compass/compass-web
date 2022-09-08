import React from 'react';
import Topic from '@common/components/Topic';
import Overview from './Overview';
import ClosedPrsCount from './ClosedPrsCount';

const CommunitySupport = () => {
  return (
    <>
      <Topic>Community Support</Topic>
      <div className="grid gap-4">
        <Overview />
        <ClosedPrsCount />
      </div>
    </>
  );
};

export default CommunitySupport;
