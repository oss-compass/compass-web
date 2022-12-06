import React from 'react';
import { useConfigContext } from '@modules/analyze/context';
import { checkIsPending } from '@modules/analyze/constant';
import CompareBar from '@modules/analyze/components/CompareBar';
import NoSsr from '@common/components/NoSsr';
import UnderAnalysis from '@modules/analyze/DataView/UnderAnalysis';
import ErrorAnalysis from '@modules/analyze/DataView/ErrorAnalysis';
import Loading from '@modules/analyze/DataView/Loading';

import Charts from './Charts';

const DataView = () => {
  const { isError, isLoading, status } = useConfigContext();
  if (isLoading) {
    return <Loading />;
  }

  if (!isError && checkIsPending(status)) {
    return <UnderAnalysis />;
  }

  if (isError) {
    return <ErrorAnalysis />;
  }

  return (
    <NoSsr>
      <div className="mx-auto w-full flex-1">
        <CompareBar lab />
        <Charts />
      </div>
    </NoSsr>
  );
};

export default DataView;
