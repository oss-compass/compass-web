import React from 'react';

import CollaborationDevelopmentIndex from './CollaborationDevelopmentIndex';
import CommunityActivity from './CommunityActivity';
import CommunityServiceSupport from './CommunityServiceSupport';

const OverView = () => {
  return (
    <>
      <div className="mb-4">
        <CollaborationDevelopmentIndex />
      </div>
      <div className="mb-4">
        <CommunityServiceSupport />
      </div>
      <div className="mb-4">
        <CommunityActivity />
      </div>
    </>
  );
};

export default OverView;
