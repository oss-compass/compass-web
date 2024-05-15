import React from 'react';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import CodeStatistics from './CodeStatistics';
import CommitterStatistics from './CommitterStatistics';
import CommunityContributions from './CommunityContributions';

const OhDataView = () => {
  const id = useHashchangeEvent();
  let source;
  switch (id) {
    case 'code': {
      source = <CodeStatistics />;
      break;
    }
    case 'committer': {
      source = <CommitterStatistics />;
      break;
    }
    case 'communityContributions': {
      source = <CommunityContributions />;
      break;
    }
    default: {
      source = <CodeStatistics />;
      break;
    }
  }
  return <>{source}</>;
};

export default OhDataView;
