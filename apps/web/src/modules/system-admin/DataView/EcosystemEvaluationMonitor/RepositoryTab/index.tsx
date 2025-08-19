import React from 'react';
import RepositoryOverview from './Overview';
import RepositoryManagement from './Management';

const RepositoryTab: React.FC = () => {
  return (
    <>
      <RepositoryOverview />
      <RepositoryManagement />
    </>
  );
};

export default RepositoryTab;
