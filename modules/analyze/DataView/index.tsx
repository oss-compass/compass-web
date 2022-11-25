import React from 'react';
import { useConfigContext } from '@modules/analyze/context';
import { checkIsPending } from '@modules/analyze/constant';
import CompareBar from '@modules/analyze/components/CompareBar';
import NoSsr from '@common/components/NoSsr';
import UnderAnalysis from './UnderAnalysis';
import Charts from './Charts';
import Loading from './Loading';

const DataView = () => {
  const { loading, status } = useConfigContext();
  if (loading) {
    return <Loading />;
  }

  if (checkIsPending(status)) {
    return <UnderAnalysis />;
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
