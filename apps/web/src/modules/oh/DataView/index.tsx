import React from 'react';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import ContributeOverview from './ContributeOverview';
import CodeStatistics from './CodeStatistics';
import CommitterStatistics from './CommitterStatistics';
import CommunityContributions from './CommunityContributions';
import CommunityOverview from './CommunityOverview';
import CommunityManagement from './CommunityManagement';
import SigCenter from './SigCenter';
import Process from '@modules/oh/Process';
import OutProcess from '@modules/oh/OutProcess';
import Workbench from '@modules/oh/Workbench';

const OhDataView = () => {
  const id = useHashchangeEvent();
  let source;
  switch (id) {
    case 'contributeOverview': {
      source = <ContributeOverview />;
      break;
    }
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
    case 'communityOverview': {
      source = <CommunityOverview />;
      break;
    }
    case 'sigCenter': {
      source = <SigCenter />;
      break;
    }
    case 'communityManagement': {
      source = <CommunityManagement />;
      break;
    }
    case 'process': {
      source = <Process />;
      break;
    }
    case 'outProcess': {
      source = <OutProcess />;
      break;
    }
    case 'workbench': {
      source = <Workbench />;
      break;
    }
    default: {
      source = <CommunityOverview />;
      break;
    }
  }
  return <>{source}</>;
};

export default OhDataView;
