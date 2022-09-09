import React from 'react';
import Topic from '@common/components/Topic';
import Overview from './Overview';
import ClosedPrsCount from './ClosedPrsCount';

const CommunitySupport = () => {
  return (
    <>
      <Topic>Community Support</Topic>
      <div className="mb-4">
        <Overview />
      </div>
      <div className="mb-4">
        <ClosedPrsCount />
      </div>
    </>
  );
};

export default CommunitySupport;
