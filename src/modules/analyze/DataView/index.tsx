import React from 'react';
import { useStatusContext } from '@modules/analyze/context';
import { checkIsPending } from '@modules/analyze/constant';
import CompareBar from '@modules/analyze/components/CompareBar';
import NoSsr from '@common/components/NoSsr';
import UnderAnalysis from './Status/UnderAnalysis';
import NotFoundAnalysis from './Status/NotFoundAnalysis';
import LoadingAnalysis from './Status/LoadingAnalysis';
import Charts from './Charts';

const DataView = () => {
  const { notFound, isLoading, status } = useStatusContext();

  console.log('--------------------------------', {
    notFound,
    isLoading,
    status,
  });

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
    <NoSsr>
      <div className="mx-auto w-full flex-1">
        <CompareBar />
        <Charts />
      </div>
    </NoSsr>
  );
};

export default DataView;
