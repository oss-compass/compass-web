import React from 'react';
import TopicProductivity from '@modules/developer/components/SideBar/Collaboration/TopicProductivity';
import TopicRobustness from '@modules/developer/components/SideBar/Collaboration/TopicRobustness';
import TopicNicheCreation from '@modules/developer/components/SideBar/Collaboration/TopicNicheCreation';

const Divider = () => (
  <div className="mx-6 mb-4 mt-2 border-b border-gray-200"></div>
);
const Collaboration = () => {
  return (
    <>
      <Divider />
      <TopicProductivity />
      <TopicRobustness />
      <TopicNicheCreation />
    </>
  );
};
export default Collaboration;
