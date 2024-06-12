import React from 'react';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import ContributeOverview from '@modules/oh/DataView/Contribute/ContributeOverview';
import CodeStatistics from '@modules/oh/DataView/Contribute/CodeStatistics';
import CommitterStatistics from '@modules/oh/DataView/Contribute/CommitterStatistics';
import CommunityContributions from '@modules/oh/DataView/Contribute/CommunityContributions';
import CommunityOverview from '@modules/oh/DataView/Community/CommunityOverview';
import CommunityManagement from '@modules/oh/DataView/Community/CommunityManagement';
import SigCenter from '@modules/oh/DataView/Community/SigCenter';
import Process from '@modules/oh/DataView/HatchingTreatment/Process';
import OutProcess from '@modules/oh/DataView/HatchingTreatment/OutProcess';
import Workbench from '@modules/oh/DataView/HatchingTreatment/Workbench';
import Work from '@modules/oh/DataView/HatchingTreatment/Work';
import EvaluationApplication from '@modules/oh/DataView/HatchingTreatment/EvaluationApplication';

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
    case 'work': {
      source = <Work />;
      break;
    }
    case 'evaluationApplication': {
      source = <EvaluationApplication />;
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
