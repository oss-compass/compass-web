import React from 'react';
import { useConfigContext } from '@modules/analyze/context';
import { checkIsPending } from '@modules/analyze/constant';
import CompareBar from '@modules/analyze/Misc/CompareBar';
import NoSsr from '@common/components/NoSsr';
import UnderAnalysis from './UnderAnalysis';
import Charts from './Charts';

const Loading = () => (
  <div className="flex flex-1 flex-col bg-white">
    <div className="animate-pulse p-10">
      <div className="flex-1 space-y-4 ">
        <div className="h-4 rounded bg-slate-200"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-4 rounded bg-slate-200"></div>
          <div className="col-span-1 h-4 rounded bg-slate-200"></div>
        </div>
        <div className="h-4 rounded bg-slate-200"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 h-4 rounded bg-slate-200"></div>
          <div className="col-span-2 h-4 rounded bg-slate-200"></div>
        </div>
        <div className="h-4 rounded bg-slate-200"></div>
      </div>
    </div>
  </div>
);

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
