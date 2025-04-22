import React from 'react';
import TopicProductivity from '@modules/developer/components/SideBar/Contributor/TopicProductivity';
import TopicRobustness from '@modules/developer/components/SideBar/Contributor/TopicRobustness';
import TopicNicheCreation from '@modules/developer/components/SideBar/Contributor/TopicNicheCreation';

const Divider = () => (
  <div className="mx-6 mb-4 mt-2 border-b border-gray-200"></div>
);
const Contributor = () => {
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
export default Contributor;
