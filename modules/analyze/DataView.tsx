import React from 'react';
import { ClosedPrsCount, Trends } from '@modules/analyze/charts';

const DataPanel = () => {
  return (
    <>
      <Trends />

      <h1>Code Quality Guarantee</h1>

      <h1>Community Support</h1>

      <ClosedPrsCount />
    </>
  );
};

export default DataPanel;
