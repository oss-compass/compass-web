import React from 'react';
import HatchingManagement from './HatchingManagement';
import HatchingOverview from './HatchingOverview';

const HatchingTab: React.FC = () => {
  return (
    <>
      <HatchingOverview />
      <HatchingManagement />
    </>
  );
};

export default HatchingTab;
