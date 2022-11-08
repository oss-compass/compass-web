import React from 'react';

import CodeQuality from './CodeQuality';
import CommunityActivity from './CommunityActivity';
import CommunityServiceSupport from './CommunityServiceSupport';

const OverView = () => {
  return (
    <>
      <div className="mb-4">
        <CodeQuality />
      </div>
      <div className="mb-4">
        <CommunityActivity />
      </div>
      <div className="mb-4">
        <CommunityServiceSupport />
      </div>
    </>
  );
};

export default OverView;
