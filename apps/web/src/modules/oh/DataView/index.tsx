import React from 'react';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import { componentMap } from '@modules/oh/SideBar/MenuItems';

const OhDataView = () => {
  const id = useHashchangeEvent() || 'hatchTable';
  const source = componentMap[id];

  return <>{source}</>;
};

export default OhDataView;
