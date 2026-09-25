import React from 'react';
import { useStatusContext } from '@modules/analyze/context';
import { checkIsPending } from '@modules/analyze/constant';
import CompareBar from '@modules/analyze/components/CompareBar';
import UnderAnalysis from './Status/UnderAnalysis';
import NotFoundAnalysis from './Status/NotFoundAnalysis';
import LoadingAnalysis from './Status/LoadingAnalysis';
import Charts from './Charts';
import ReportPrint from '@modules/analyze/components/ReportPrint';

const DataView = () => {
  const { notFound, isLoading, status } = useStatusContext();

  if (isLoading) {
    return <LoadingAnalysis />;
  }

  if (!notFound && checkIsPending(status)) {
    return <UnderAnalysis />;
  }

  if (notFound) {
    return <NotFoundAnalysis />;
  }

  return (
    <div className="mx-auto w-full flex-1">
      <CompareBar />
      <div className="mt-4 flex justify-end px-4">
        <ReportPrint />
      </div>
      <Charts />
    </div>
  );
};

export default DataView;
