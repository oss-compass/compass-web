import React from 'react';
import AnalysisStatus from './Status/AnalysisStatus';
import CompareBar from '@modules/analyze/components/CompareBar';
import Charts from './Charts';

const DataView = () => {
  return (
    <AnalysisStatus>
      <div className="mx-auto w-full flex-1">
        <CompareBar />
        <Charts />
      </div>
    </AnalysisStatus>
  );
};

export default DataView;
