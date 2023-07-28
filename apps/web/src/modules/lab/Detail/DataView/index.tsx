import React from 'react';
import { useStatusContext } from '@modules/analyze/context';
import { checkIsPending } from '@modules/analyze/constant';
import CompareBar from '@modules/analyze/components/CompareBar';
import NoSsr from '@common/components/NoSsr';
import {
  UnderAnalysis,
  NotFoundAnalysis,
  ErrorAnalysis,
  LoadingAnalysis,
} from '@modules/analyze/DataView/Status';

import Charts from './Charts';
import { FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';

const LabNotice = () => {
  return (
    <div className="mb-4 flex items-center rounded border border-[#DDCAA0] bg-[#FFEBBC] py-2 px-3 text-sm text-[#876E35]">
      <FaInfoCircle className="mr-2 text-[#F9A001]" /> Based on
      <span className="ml-2 font-bold">Starter Project Health</span>, an
      experimental CHAOSS model in Lab,
      <Link
        href="https://chaoss.community/kb/metrics-model-starter-project-health/"
        className="ml-2 underline"
      >
        know more about the model
      </Link>
    </div>
  );
};

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
