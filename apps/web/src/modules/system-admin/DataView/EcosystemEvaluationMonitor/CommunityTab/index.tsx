import React from 'react';
import CommunityOverview from './Overview';
import CommunityManagement from './Management';

const CommunityTab: React.FC = () => {
  return (
    <>
      <CommunityOverview />
      <CommunityManagement />
    </>
  );
};

export default CommunityTab;
