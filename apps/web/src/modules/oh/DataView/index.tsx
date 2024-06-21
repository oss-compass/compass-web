import React from 'react';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import { componentMap } from '@modules/oh/SideBar/MenuItems';

// import Process from '@modules/oh/DataView/HatchingTreatment/Process';
// import OutProcess from '@modules/oh/DataView/HatchingTreatment/OutProcess';
// import Work from '@modules/oh/DataView/HatchingTreatment/Work';
// import EvaluationApplication from '@modules/oh/DataView/HatchingTreatment/EvaluationApplication';

const OhDataView = () => {
  const id = useHashchangeEvent();

  const source = componentMap[id] || componentMap['communityOverview'];
  return <>{source}</>;
};

export default OhDataView;
