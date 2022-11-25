import React from 'react';
import BaseCard from '@common/components/BaseCard';
import { Activity } from '@modules/analyze/components/SideBar/config';

const OrgCount = () => {
  return (
    <BaseCard title="Org Count" id={Activity.OrgCount} description="">
      {(containerRef) => <div></div>}
    </BaseCard>
  );
};

export default OrgCount;
