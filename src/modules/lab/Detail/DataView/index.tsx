import React from 'react';
import { useConfigContext } from '@modules/analyze/context';
import { checkIsPending } from '@modules/analyze/constant';
import CompareBar from '@modules/analyze/components/CompareBar';
import NoSsr from '@common/components/NoSsr';
import UnderAnalysis from '@modules/analyze/DataView/UnderAnalysis';
import ErrorAnalysis from '@modules/analyze/DataView/ErrorAnalysis';
import Loading from '@modules/analyze/DataView/Loading';

import Charts from './Charts';
import { FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';

const LabNotice = () => {
  return (
    <div className="mb-4 flex items-center rounded border border-[#DDCAA0] bg-[#FFEBBC] py-2 px-3 text-sm text-[#876E35]">
      <FaInfoCircle className="mr-2 text-[#F9A001]" /> Based on
      <span className="ml-2 font-bold">Starter Project Health</span>, an
      experimental CHAOSS model in Lab,
      <Link href="https://chaoss.community/kb/metrics-model-starter-project-health/">
        <a className="ml-2 underline">know more about the model</a>
      </Link>
    </div>
  );
};

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
      <LabNotice />
      <div className="mx-auto w-full flex-1">
        <CompareBar lab />
        <Charts />
      </div>
    </NoSsr>
  );
};

export default DataView;
