import React from 'react';
import BaseCard from '@common/components/BaseCard';
import { Activity } from '@modules/analyze/Misc/SideBar/menus';

const OrgCount = () => {
  return (
    <BaseCard title="Org count" id={Activity.OrgCount} description="">
      {(containerRef) => <div></div>}
    </BaseCard>
  );
};

export default OrgCount;
