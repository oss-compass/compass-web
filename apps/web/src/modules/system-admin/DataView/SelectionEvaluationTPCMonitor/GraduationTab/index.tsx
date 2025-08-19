import React from 'react';
import GraduationOverview from './GraduationOverview';
import GraduationManagement from './GraduationManagement';

const GraduationTab: React.FC = () => {
  return (
    <>
      <GraduationOverview />
      <GraduationManagement />
    </>
  );
};

export default GraduationTab;
