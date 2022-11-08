import React from 'react';
import Topic from '@common/components/Topic';
import { Topic as TopicID } from '@modules/analyze/Misc/SideBar/config';

import CodeQuality from './CodeQuality';
import CommunityActivity from './CommunityActivity';
import CommunityServiceSupport from './CommunityServiceSupport';

const OverView = () => {
  return (
    <>
      <Topic id={TopicID.Overview}>OverView</Topic>
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
