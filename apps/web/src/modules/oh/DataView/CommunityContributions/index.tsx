import React from 'react';
import RepoTable from './RepoTable';
import SigTable from './SigTable';
import EmployerTable from './EmployerTable';

const CommunityContributions = () => {
  return (
    <>
      <RepoTable />
      <SigTable />
      <EmployerTable />
    </>
  );
};

export default CommunityContributions;
