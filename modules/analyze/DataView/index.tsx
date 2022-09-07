import React, { PropsWithChildren } from 'react';
import { Trends } from '../Misc';
import { ContributorCount } from '../CodeQuality';
import { ClosedPrsCount } from '../CommunitySupport';

const Topic: React.FC<PropsWithChildren> = ({ children }) => (
  <h1 className="mt-14 mb-6 text-3xl">{children}</h1>
);

const DataPanel = () => {
  return (
    <>
      <Trends />

      <Topic>Code Quality Guarantee</Topic>
      <ContributorCount />

      <Topic>Community Support</Topic>
      <ClosedPrsCount />
    </>
  );
};

export default DataPanel;
