import React from 'react';
import { useStatusContext } from '@modules/developer/context';
import { checkIsPending } from '@modules/developer/constant';
import UnderAnalysis from './Status/UnderAnalysis';
import NotFoundAnalysis from './Status/NotFoundAnalysis';
import LoadingAnalysis from './Status/LoadingAnalysis';
import Charts from './Charts';

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
      <Charts />
    </div>
  );
};

export default DataView;
