import React from 'react';
import { useConfigContext } from '@modules/analyze/context';
import { checkIsPending } from '@modules/analyze/constant';
import CompareBar from '@modules/analyze/Misc/CompareBar';
import NoSsr from '@common/components/NoSsr';
import UnderAnalysis from './UnderAnalysis';
import Charts from './Charts';
import DataViewLoading from './DataViewLoading';

const DataView = () => {
  const { loading, status } = useConfigContext();
  if (loading) {
    return <DataViewLoading />;
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
