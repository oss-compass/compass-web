import React from 'react';
import TopicProductivity from '@modules/analyze/components/SideBar/Collaboration/TopicProductivity';
import TopicRobustness from '@modules/analyze/components/SideBar/Collaboration/TopicRobustness';
import TopicNicheCreation from '@modules/analyze/components/SideBar/Collaboration/TopicNicheCreation';

const Divider = () => (
  <div className="mx-6 mb-4 mt-2 border-b border-gray-200"></div>
);
const Collaboration = () => {
  return (
    <>
      <Divider />
      <TopicProductivity />
      <Divider />
      <TopicRobustness />
      <Divider />
      <TopicNicheCreation />
    </>
  );
};
export default Collaboration;
